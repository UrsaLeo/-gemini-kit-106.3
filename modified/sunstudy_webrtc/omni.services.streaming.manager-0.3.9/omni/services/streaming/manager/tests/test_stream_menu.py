# Copyright (c) 2022-2023, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

import webbrowser

from unittest.mock import patch

import omni.kit.test

from omni.services.streaming.manager import StreamMenu, StreamManager

from .test_stream_manager import MockStreamImplementation


class StreamMenuTestCase(omni.kit.test.AsyncTestCase):
    """Streaming Menu test case."""

    def setUp(self) -> None:
        super().setUp()
        self._stream_manager = StreamManager()
        self._stream_menu = StreamMenu(stream_manager=self._stream_manager)
        self._mock_stream_interface = MockStreamImplementation()

    def tearDown(self) -> None:
        super().tearDown()
        if self._stream_menu:
            self._stream_menu.shutdown()
            self._stream_menu = None
        if self._stream_manager:
            self._stream_manager.shutdown()
            self._stream_manager = None
        self._mock_stream_interface = None

    def _register_mock_stream_interface(self) -> None:
        """Helper method to register a mock streaming interface."""
        self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)

    def _unregister_mock_stream_interface(self) -> None:
        """Helper method to unregister a mock streaming interface."""
        self._stream_manager.unregister_stream_interface(stream_interface_id=self._mock_stream_interface.id)

    def test_stream_menu_has_stream_url_menu_items(self) -> None:
        """Validate that the stream menu contains some items."""
        if self._stream_menu._copy_stream_url_submenu:
            self.assertGreater(
                a=len(self._stream_menu._copy_stream_url_submenu.sub_menu),
                b=0,
                msg=f"Expected the \"{StreamMenu.STREAM_URLS_LABEL}\" submenu to have items.",
            )

    def test_stream_menu_has_a_view_online_documentation_item(self) -> None:
        """Validate that the stream menu has an item redirecting to the online documentation."""
        self.assertIsNotNone(self._stream_menu._view_online_documentation_menu_item)

    def test_online_documentation_link_to_documentation(self) -> None:
        """Validate that clicking the 'Online documentation' item opens a web browser to the online doc page."""
        self._register_mock_stream_interface()

        with patch.object(webbrowser, "open") as mock_webbrowser_open:
            self._stream_menu._on_online_documentation_click()

        mock_webbrowser_open.assert_called_with(
            url="https://docs.omniverse.nvidia.com/prod_extensions/prod_extensions/ext_livestream/overview.html"
        )

        self._unregister_mock_stream_interface()

    def test_registering_a_streaming_interface_adds_it_to_the_menu_items(self) -> None:
        """Validate that registering a streaming interface adds it to the Stream menu."""
        self._register_mock_stream_interface()
        self._stream_menu._build_streaming_interface_menu()

        self.assertIn(member=self._mock_stream_interface.id, container=self._stream_menu._stream_menu_items)

        self._unregister_mock_stream_interface()
