# Copyright (c) 2022-2023, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

"""Streaming Manager Service API test case."""

from typing import Dict, Union

import carb.settings

import omni.kit.app
import omni.kit.test

from omni.services.client import AsyncClient
from omni.services.streaming.manager import StreamManager
from omni.services.transport.client.base.exceptions import BaseServiceError


class StreamManagerServiceAPITestCase(omni.kit.test.AsyncTestCase):
    """Streaming Manager Service API test case."""

    def setUp(self) -> None:
        super().setUp()
        self._stream_manager = StreamManager()
        self._test_streaming_extension_name = "omni.services.streamclient.webrtc"

        self._settings = carb.settings.get_settings()
        router_prefix = self._settings.get_as_string("/exts/omni.services.streaming.manager/routerPrefix")
        http_port = self._settings.get_as_int("/exts/omni.services.transport.server.http/port")
        self._healthcheck_endpoint = f"http://localhost:{http_port}{router_prefix}/healthcheck"

        # Disable caching of the `/healthcheck` endpoint response, so that values always reflect the current state of
        # the streaming extension under test:
        self._settings.set_float("exts/omni.services.streaming.manager/healthCheckCacheDuration", -1.0)

    def tearDown(self) -> None:
        super().tearDown()
        self._stream_manager.shutdown()
        self._stream_manager = None

    async def _get_healthcheck_information(self, raise_for_status: bool = True) -> Dict[str, Union[bool, int, str]]:
        """
        Return the response from a call to the healthcheck API.

        Args:
            raise_for_status (bool): Flag indicating whether to raise an exception if the status of the response is not
                an HTTP 200.

        Returns:
            Dict[str, Union[bool, int, str]]: The response from a call to the healthcheck API.

        """
        client = AsyncClient(uri=self._healthcheck_endpoint, raise_for_status=raise_for_status)
        healthcheck_information: Dict[str, Union[bool, int, str]] = await client.get()
        await client.stop_async()
        return healthcheck_information

    def _enable_streaming_extension(self) -> None:
        """Enable a streaming extension on which to perform a healthcheck."""
        omni.kit.app.get_app_interface().get_extension_manager().set_extension_enabled_immediate(
            extension_id=self._test_streaming_extension_name,
            enabled=True,
        )

    def _disable_streaming_extension(self) -> None:
        """Disable the streaming extension on which to perform a healthcheck."""
        omni.kit.app.get_app_interface().get_extension_manager().set_extension_enabled_immediate(
            extension_id=self._test_streaming_extension_name,
            enabled=False,
        )

    async def test_healthcheck_responds_with_http_417_when_no_extension_is_enabled(self) -> None:
        """Validate that the healthcheck responds with HTTP status code 417 when no streaming extension is enabled."""
        with self.assertRaises(
            expected_exception=BaseServiceError,
            msg="Exception Failed"
        ) as ctx:
            await self._get_healthcheck_information()

        self.assertTrue(
            expr="417" in str(ctx.exception),
            msg="Expected to find HTTP status code '417' in exception message",
        )
        self.assertTrue(
            expr="Expectation Failed" in str(ctx.exception),
            msg="Expected to find 'Expectation Failed' in exception message",
        )

    async def test_healthcheck_responds_with_http_200_when_a_streaming_extension_is_enabled(self) -> None:
        """Validate that the healthcheck responds with HTTP status code 200 when a streaming extension is enabled."""
        self._enable_streaming_extension()
        response = await self._get_healthcheck_information(raise_for_status=False)
        self._disable_streaming_extension()

        status_key = "__http_status__"
        if "status" in response:
            status_key = "status"
        self.assertIn(member=status_key, container=response)
        self.assertEqual(response[status_key], 200)

    async def test_healthcheck_responds_with_the_id_of_the_enabled_streaming_extension(self) -> None:
        """Validate that the healthcheck responds with the ID of the enabled streaming extension."""
        self._enable_streaming_extension()
        response = await self._get_healthcheck_information(raise_for_status=False)
        self._disable_streaming_extension()

        self.assertIn(member="enabledStreamingExtensionID", container=response)
        self.assertIn(
            member=self._test_streaming_extension_name,
            container=response["enabledStreamingExtensionID"],
        )

    # async def test_healthcheck_response_matches_the_expected_schema(self) -> None:
    #     """Validate that the healthcheck response matches the expected schema."""
    #     try:
    #         self._enable_streaming_extension()
    #         response = await self._get_healthcheck_information(raise_for_status=False)
    #     finally:
    #         self._disable_streaming_extension()

    #     # status_key = "__http_status__"
    #     # if "status" in response:
    #     #     status_key = "status"
    #     # self.assertIn(member=status_key, container=response)
    #     self.assertIn(member="enabledStreamingExtensionID", container=response)
    #     self.assertIn(member="isHealthy", container=response)
    #     # self.assertIsInstance(obj=response[status_key], cls=int)
    #     self.assertIsInstance(obj=response["enabledStreamingExtensionID"], cls=str)
    #     self.assertIsInstance(obj=response["isHealthy"], cls=bool)
