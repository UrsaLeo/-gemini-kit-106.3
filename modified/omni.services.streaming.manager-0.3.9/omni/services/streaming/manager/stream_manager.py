# Copyright (c) 2021, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

"""Stream Extension Manager."""

from typing import Dict, List, Optional

import carb
import carb.events

import omni.kit.app

from .stream_interface import StreamInterface
from .stream_menu import StreamMenu
from .utils import singleton


@singleton
class StreamManager:
    """Stream Extension Manager."""

    ENABLE_MENU_ITEMS = True
    """Flag indicating whether the "Streaming" menu should be enabled in the application UI."""

    def __init__(self) -> None:
        """Constructor."""
        self._registered_stream_interfaces: Dict[str, StreamInterface] = {}
        self._enabled_stream_interface_id: Optional[str] = None
        self._menu: Optional[StreamMenu] = StreamMenu(self) if self.ENABLE_MENU_ITEMS else None

    def shutdown(self) -> None:
        """Destructor."""
        for stream_interface_id in list(self._registered_stream_interfaces.keys()):
            self.unregister_stream_interface(stream_interface_id)
            self._registered_stream_interfaces = {}
        if self._enabled_stream_interface_id:
            self._enabled_stream_interface_id = None
        if self._menu:
            self._menu.shutdown()
            self._menu = None

    def register_stream_interface(self, stream_interface: StreamInterface) -> bool:
        """
        Register the given stream interface with the manager.

        Args:
            stream_interface (StreamInterface): Stream interface to register with the manager.

        Returns:
            bool: A flag indicating if the registration was successful.

        """
        stream_interface_id = stream_interface.id
        if stream_interface_id in self._registered_stream_interfaces:
            carb.log_warn(f"Stream interface \"{stream_interface_id}\" was already registered.")
            return False

        self._registered_stream_interfaces[stream_interface_id] = stream_interface
        stream_interface.on_register()
        if self._menu:
            self._menu.update()

        return True

    def unregister_stream_interface(self, stream_interface_id: str) -> bool:
        """
        Unregister the given stream interface from the manager.

        Args:
            stream_interface_id (str): Stream interface to unregister from the manager.

        Returns:
            bool: A flag indicating if the unregistration was successful.

        """
        if stream_interface_id not in self._registered_stream_interfaces:
            carb.log_warn(f"Stream interface \"{stream_interface_id}\" was not registered.")
            return False

        stream_interface = self._registered_stream_interfaces[stream_interface_id]
        if stream_interface.id == self._enabled_stream_interface_id:
            self.disable_stream_interface(stream_interface_id=stream_interface.id)
        stream_interface.on_unregister()
        self._registered_stream_interfaces.pop(stream_interface_id)
        if self._menu:
            self._menu.update()
        return True

    def enable_stream_interface(self, stream_interface_id: str) -> bool:
        """
        Enable the given stream interface.

        Args:
            stream_interface_id (str): Unique identifier of the stream interface to enable.

        Returns:
            bool: A flag indicating if the enabling was successful.

        """
        if stream_interface_id not in self._registered_stream_interfaces:
            carb.log_warn(f"Stream interface \"{stream_interface_id}\" was not registered.")
            return False

        if self._enabled_stream_interface_id == stream_interface_id:
            carb.log_warn(f"Stream interface \"{stream_interface_id}\" is already enabled.")
            return False

        if self._enabled_stream_interface_id is not None:
            self.disable_stream_interface(self._enabled_stream_interface_id)

        stream_interface_to_enable = self._registered_stream_interfaces[stream_interface_id]
        stream_interface_to_enable.on_enable()
        self._enabled_stream_interface_id = stream_interface_to_enable.id
        if self._menu:
            self._menu.update()
        return True

    def disable_stream_interface(self, stream_interface_id: str) -> bool:
        """
        Disable the given stream interface.

        Args:
            stream_interface_id (str): Unique identifier of the stream interface to disable.

        Returns:
            bool: A flag indicating if the disabling was successful.

        """
        if stream_interface_id not in self._registered_stream_interfaces:
            carb.log_warn(f"Stream interface \"{stream_interface_id}\" was not registered.")
            return False

        if self._enabled_stream_interface_id != stream_interface_id:
            carb.log_warn(f"Stream interface \"{stream_interface_id}\" was not enabled.")
            return False

        enabled_stream_interface = self._registered_stream_interfaces[stream_interface_id]
        enabled_stream_interface.on_disable()

        # Disable the extension using the Extension Manager:
        if enabled_stream_interface.extension_id:
            extension_manager = omni.kit.app.get_app_interface().get_extension_manager()
            extension_manager.set_extension_enabled(
                extension_id=enabled_stream_interface.extension_id,
                enabled=False,
            )

        self._enabled_stream_interface_id = None
        if self._menu:
            self._menu.update()
        return True

    def get_enabled_stream_interface_id(self) -> Optional[str]:
        """
        Return the unique identifier of the stream interface currently enabled, or ``None`` if no stream interface is
        currently enabled.

        Args:
            None

        Returns:
            Optional[str]: The unique identifier of the stream interface currently enabled, or ``None`` if no stream
                interface is currently enabled.

        """
        return self._enabled_stream_interface_id

    def get_registered_stream_interfaces(self) -> List[StreamInterface]:
        """
        Return the list of stream interfaces currently registered with the manager.

        Args:
            None

        Returns:
            List[StreamInterface]: The list of stream interfaces currently registered with the manager.

        """
        return list(self._registered_stream_interfaces.values())


def get_stream_manager() -> StreamManager:
    """
    Return the instance of the ``StreamManager`` to use throughout the application.

    Args:
        None

    Returns:
        StreamManager: The instance of the ``StreamManager`` to use throughout the application.

    """
    return StreamManager()
