# Copyright (c) 2021, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

from typing import Optional
import carb.settings

import omni.kit.test
from omni.services.client import AsyncClient
from omni.services.streamclient.webrtc.services.browser_frontend import router_prefix
from omni.services.transport.client.base.exceptions import BaseServiceError


class APIServiceTestCase(omni.kit.test.AsyncTestCase):

    async def setUp(self) -> None:
        super().setUp()
        frontend_port = carb.settings.get_settings().get_as_int("exts/omni.services.transport.server.http/port")
        frontend_prefix = f"http://localhost:{frontend_port}{router_prefix}"
        self._ice_servers_path = f"{frontend_prefix}/ice-servers"
        self._initialize_webrtc_stream_path = f"{frontend_prefix}/initialize-webrtc-stream"
        self._client: Optional[AsyncClient] = None

    async def tearDown(self) -> None:
        super().tearDown()
        if self._client:
            await self._client.stop_async()
            self._client = None

    async def test_list_ice_servers(self) -> None:
        self._client = AsyncClient(uri=self._ice_servers_path)
        ice_servers_response = await self._client.get()
        self.assertIsInstance(ice_servers_response, dict)
        self.assertTrue(
            expr="iceServers" in ice_servers_response,
            msg="Expected to find a \"iceServers\" key in the JSON response."
        )
        self.assertIsInstance(ice_servers_response["iceServers"], list)

    async def test_ice_servers_contains_at_least_one_entry_by_default(self) -> None:
        self._client = AsyncClient(uri=self._ice_servers_path)
        ice_servers_response = await self._client.get()
        ice_servers = ice_servers_response["iceServers"]
        self.assertTrue(
            expr=len(ice_servers) > 0,
            msg="Expected to find at least 1 ICE server entry by default."
        )
        self.assertTrue(
            expr=len(ice_servers[0]["urls"]) > 0,
            msg="Expected to find at least 1 URL in the default ICE server."
        )

    async def test_default_ice_servers_are_correctly_formatted(self) -> None:
        self._client = AsyncClient(uri=self._ice_servers_path)
        ice_servers_response = await self._client.get()
        ice_servers = ice_servers_response["iceServers"]
        for ice_server in ice_servers:
            for ice_server_url in ice_server["urls"]:
                formatted_server_url: str = ice_server_url.lower()
                ice_server_url_contains_correct_prefix: str = formatted_server_url.startswith("stun") \
                    or formatted_server_url.startswith("turn")
                self.assertTrue(
                    expr=ice_server_url_contains_correct_prefix,
                    msg=f"Expected ICE server URL to start with either \"stun\" or \"turn\": \"{formatted_server_url}\".",
                )

    async def test_initializing_the_wrtc_stream_resizes_the_app_to_desired_size(self) -> None:
        desired_width = 123
        desired_height = 345
        self._client = AsyncClient(uri=self._initialize_webrtc_stream_path)
        result = await self._client.post(width=desired_width, height=desired_height)
        self.assertTrue(
            expr="success" in result,
            msg="Expected to find a \"success\" key in the JSON response."
        )
        self.assertTrue(result["success"], "Expected the response to return a successful message.")

    async def test_initializing_the_wrtc_stream_with_a_null_size_fails(self) -> None:
        self._client = AsyncClient(uri=self._initialize_webrtc_stream_path)
        with self.assertRaises(BaseServiceError):
            await self._client.post(width=0, height=0)

    async def test_initializing_the_wrtc_stream_with_a_negative_size_fails(self) -> None:
        self._client = AsyncClient(uri=self._initialize_webrtc_stream_path)
        with self.assertRaises(BaseServiceError):
            await self._client.post(width=-1, height=-1)
