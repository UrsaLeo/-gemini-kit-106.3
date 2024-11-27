# Copyright (c) 2021, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

"""Menu for the Steaming features."""

from typing import Dict, List, Optional
import webbrowser

import carb

from omni.kit.menu.utils import MenuItemDescription
try:
    import omni.kit.ui
except Exception:
    pass

from .stream_interface import StreamInterface


class StreamMenu:
    """
    Menu for the Steaming features.

    The goal of the menu is to offer Users with information about the various streaming features available, as well as a
    way to toggle between the various ones that have been registered.
    """

    ADD_STREAMING_INTERFACE_SUBMENU = False
    """Flag indicating whether to enable the 'Streaming interfaces' submenu."""

    MENU_PATH_PREFIX = "Streaming"
    """Prefix of the "Streaming" menu items in the application UI."""

    VIEW_ONLINE_DOCUMENTATION_LABEL = "View Online Documentation"
    """Label for the 'View Online Documentation' item."""

    STREAM_URLS_LABEL = "Local Stream URLs"
    """Label for the 'Local Stream URLs' submenu."""

    def __init__(self, stream_manager) -> None:
        """
        Constructor.

        Args:
            stream_manager (StreamManager): A reference to the stream manager handling the states of the various
                streaming solutions.

        Returns:
            None

        """
        self._stream_manager = stream_manager

        self._stream_interface_menu_path_prefix = f"{self.MENU_PATH_PREFIX}Stream over "

        self._stream_menu_items: Dict[str, carb.Subscription] = {}
        self._other_menu_items: List[carb.Subscription] = []
        self._copy_stream_url_submenu: Optional[MenuItemDescription] = None
        self._view_online_documentation_menu_item: Optional[MenuItemDescription] = None
        self._menu_items: List[MenuItemDescription] = []
        self._editor_menu = omni.kit.ui.get_editor_menu()

        self.update()

    def shutdown(self) -> None:
        """Shutdown the streaming menu system."""
        if self._stream_menu_items:
            self._stream_menu_items = None
        if self._other_menu_items:
            self._other_menu_items = None
        if self._menu_items:
            omni.kit.menu.utils.remove_menu_items(menu=self._menu_items, name=self.MENU_PATH_PREFIX)
            self._menu_items = None
        if self._copy_stream_url_submenu:
            self._copy_stream_url_submenu = None
        if self._view_online_documentation_menu_item:
            self._view_online_documentation_menu_item = None
        if self._editor_menu:
            self._editor_menu = None
        if self._stream_manager:
            self._stream_manager = None

    def update(self) -> None:
        """Rebuild the menu system to reflect the current state of the streaming solutions."""
        if not self._editor_menu:
            return

        self._stream_menu_items = {}
        self._other_menu_items = []
        if self._menu_items:
            omni.kit.menu.utils.remove_menu_items(menu=self._menu_items, name=self.MENU_PATH_PREFIX)
            self._menu_items = []
        self._copy_stream_url_submenu = None
        self._view_online_documentation_menu_item = None

        # Add menu items for the streaming interfaces that have been registered:
        if self.ADD_STREAMING_INTERFACE_SUBMENU:
            self._build_streaming_interface_menu()

        # Add a "Copy Stream URL" submenu:
        self._build_copy_stream_url_submenu()

        # # Add a "View Online Documentation" menu item:
        self._view_online_documentation_menu_item = MenuItemDescription(
            name=self.VIEW_ONLINE_DOCUMENTATION_LABEL,
            onclick_fn=self._on_online_documentation_click,
            appear_after=[self.STREAM_URLS_LABEL],
        )

        self._menu_items = []
        if self._copy_stream_url_submenu:
            self._menu_items.append(self._copy_stream_url_submenu)
        if self._view_online_documentation_menu_item:
            if self._menu_items:
                # Add a separator, to distinguish the item from the previous one:
                self._menu_items.append(MenuItemDescription())
            self._menu_items.append(self._view_online_documentation_menu_item)

        if self._menu_items:
            omni.kit.menu.utils.add_menu_items(menu=self._menu_items, name=self.MENU_PATH_PREFIX)

    def _build_streaming_interface_menu(self) -> None:
        """Build menu items for the streaming interfaces that have been registered."""
        stream_interfaces: List[StreamInterface] = self._stream_manager.get_registered_stream_interfaces()
        stream_interfaces.sort(key=lambda stream_interface: stream_interface.menu_label)

        for stream_interface in stream_interfaces:
            item_menu_path = f"{self._stream_interface_menu_path_prefix}{stream_interface.menu_label}"
            self._stream_menu_items[stream_interface.id] = self._editor_menu.add_item(
                menu_path=item_menu_path,
                on_click=self._on_stream_interface_click,
                toggle=True,
                value=stream_interface.id == self._stream_manager.get_enabled_stream_interface_id(),
            )

    def _build_copy_stream_url_submenu(self) -> None:
        """Build menu items to copy the IP addresses where the stream is available."""
        stream_interfaces: List[StreamInterface] = self._stream_manager.get_registered_stream_interfaces()
        selected_stream_interface: Optional[StreamInterface] = None
        for stream_interface in stream_interfaces:
            if stream_interface.id == self._stream_manager.get_enabled_stream_interface_id():
                selected_stream_interface = stream_interface
                break

        if not selected_stream_interface:
            return

        def _on_menu_click(stream_url: str) -> None:
            try:
                import pyperclip
                pyperclip.copy(stream_url)
            except ImportError:
                carb.log_warn("Could not import pyperclip.")

        individual_menu_items: List[MenuItemDescription] = []
        for stream_url in selected_stream_interface.stream_urls:
            individual_menu_items.append(
                MenuItemDescription(
                    name=stream_url,
                    glyph="copy.svg",
                    onclick_fn=lambda url=stream_url: _on_menu_click(stream_url=url),
                )
            )

        self._copy_stream_url_submenu = MenuItemDescription(
            name=self.STREAM_URLS_LABEL,
            enabled=len(individual_menu_items) > 0,
            sub_menu=individual_menu_items,
        )

    def _on_stream_interface_click(self, menu_path: str, checked: bool) -> None:
        """
        Callback executed upon clicking one of the items of the streaming interface menu.

        Args:
            menu_path (str): Path of the item in the menu.
            checked (bool): Flag indicating whether the item was checked or unchecked.

        Returns:
            None

        """
        selected_streaming_interface_menu_label = menu_path.replace(self._stream_interface_menu_path_prefix, "")

        stream_interfaces: List[StreamInterface] = self._stream_manager.get_registered_stream_interfaces()
        for stream_interface in stream_interfaces:
            if stream_interface.menu_label == selected_streaming_interface_menu_label:
                if checked:
                    self._stream_manager.enable_stream_interface(stream_interface_id=stream_interface.id)
                else:
                    self._stream_manager.disable_stream_interface(stream_interface_id=stream_interface.id)
                break

    def _on_online_documentation_click(self) -> None:
        """Callback executed upon clicking the "View Online Documentation" menu item."""
        webbrowser.open(
            url="https://docs.omniverse.nvidia.com/prod_extensions/prod_extensions/ext_livestream/overview.html",
        )
