# Copyright (c) 2021, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

import carb.settings

import omni.kit.test
from omni.services.client import AsyncClient
from omni.services.streamclient.webrtc.services.browser_frontend import example_page, redirect_url, router_prefix


class BrowserFrontendServiceTestCase(omni.kit.test.AsyncTestCase):

    async def setUp(self) -> None:
        super().setUp()
        frontend_port = carb.settings.get_settings().get_as_int("exts/omni.services.transport.server.http/port")
        frontend_prefix = f"http://localhost:{frontend_port}{router_prefix}"
        self._redirect_page_path = f"{frontend_prefix}{example_page}"
        self._client_page_path = f"{frontend_prefix}{redirect_url}"

    async def _get_page_content(self, uri: str) -> str:
        client = AsyncClient(uri=uri)
        page_content = await client.get()
        await client.stop_async()
        return page_content

    async def test_redirect_page_is_available(self) -> None:
        redirect_page_content = await self._get_page_content(uri=self._redirect_page_path)
        self.assertTrue(len(redirect_page_content) > 0)

    async def test_client_page_is_available(self) -> None:
        client_page_content = await self._get_page_content(uri=self._client_page_path)
        self.assertTrue(len(client_page_content) > 0)

    async def test_redirect_page_serves_same_content_as_demo_page(self) -> None:
        redirect_page_content = await self._get_page_content(uri=self._redirect_page_path)
        client_page_content = await self._get_page_content(uri=self._client_page_path)
        self.assertEqual(redirect_page_content, client_page_content)
