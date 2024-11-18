# Copyright (c) 2021, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

"""Interface for a streaming feature."""

from abc import ABC, abstractmethod
from typing import List

import carb.settings

import omni.kit.app

from .utils import get_ip_addresses


class StreamInterface(ABC):
    """
    Interface for a streaming feature.

    This interface defines the minimum requirements that a streaming feature should offer in order to be categorized as
    a streaming extension integrated into a Kit-based application. This makes it possible for the ``StreamManager`` to
    automatically handle disabling a streaming extension that was already enabled prior to enabling a new one upon
    request by either the User, or through system APIs. In addition, this also makes it possible to list all registered
    streaming extensions in order to feature them in application menus, and to present Users with workflows to
    facilitate discovery of various capabilities.
    """

    @property
    @abstractmethod
    def id(self) -> str:
        """
        Return a unique identifier for the streaming capability.

        Args:
            None

        Returns:
            str: A unique identifier for the streaming capability.

        """
        pass

    @property
    @abstractmethod
    def menu_label(self) -> str:
        """
        Return a unique label for the streaming capability, used in the menu system to allow Users to select/deselect
        the capability.

        Args:
            None

        Returns:
            str: A unique label for the streaming capability, as it will appear in the menu system.

        """
        pass

    @property
    @abstractmethod
    def module_name(self) -> str:
        """
        Return the name of the module where the stream interface is defined.

        This is ultimately used to infer the unique identifier of the Extension hosting the stream interface, so Kit
        Extensions can be toggled on or off using the Extension Manager.

        Args:
            None

        Returns:
            str: The :py:attr:`__name__` of the module where the stream interface is defined.

        """
        pass

    @property
    def extension_id(self) -> str:
        """
        Return the unique identifier of the Extension where the stream interface is defined.

        Args:
            None

        Returns:
            str: The unique identifier of the Extension where the stream interface is defined.

        """
        extension_manager = omni.kit.app.get_app().get_extension_manager()
        return extension_manager.get_extension_id_by_module(self.module_name)

    @property
    def local_ips(self) -> List[str]:
        """
        Return the list of IP addresses of the current host interface.

        Args:
            None

        Returns:
            List[str]: The list of IP addresses of the current host interface.

        """
        return get_ip_addresses()

    @property
    def local_hosts(self) -> List[str]:
        """
        Return the hosts where the stream is available.

        Args:
            None

        Returns:
            List[str]: The hosts where the stream is available.

        """
        def _generate_hosts_for_host_with_port(port_number: int) -> List[str]:
            return [f"{ip}:{port_number}" for ip in self.local_ips]

        settings = carb.settings.get_settings()
        hosts = []

        # HTTP configuration:
        http_enabled = settings.get_as_bool("exts/omni.services.transport.server.http/http/enabled")
        if http_enabled:
            http_port = settings.get_as_int("exts/omni.services.transport.server.http/port")
            hosts.extend(_generate_hosts_for_host_with_port(port_number=http_port))

        # HTTPS configuration:
        https_enabled = settings.get_as_bool("exts/omni.services.transport.server.http/https/enabled")
        if https_enabled:
            https_port = settings.get_as_int("exts/omni.services.transport.server.http/https/port")
            hosts.extend(_generate_hosts_for_host_with_port(port_number=https_port))

        return hosts

    @property
    def stream_urls(self) -> List[str]:
        """
        Return the URLs where the stream is available.

        Args:
            None

        Returns:
            List[str]: The list of URLs where the stream is available.

        """
        return []

    async def is_healthy(self) -> bool:
        """
        Return a flag indicating whether the stream interface is in a healthy state.

        Args:
            None

        Returns:
            bool: A flag indicating whether the stream interface is in a healthy state.

        """
        return True

    def on_register(self) -> None:
        """Callback executed upon registration of the streaming capability."""
        pass

    def on_unregister(self) -> None:
        """Callback executed upon unregistration of the streaming capability."""
        pass

    def on_enable(self) -> None:
        """Callback executed upon enabling of the streaming capability."""
        pass

    def on_disable(self) -> None:
        """Callback executed upon disabling of the streaming capability."""
        pass
