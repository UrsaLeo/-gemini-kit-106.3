# Copyright (c) 2021, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

from functools import wraps
import socket
import time
from typing import Any, Callable, Dict, List, Set

import carb.settings


def singleton(class_: Any) -> Any:
    """
    Singleton decorator.

    Example:
        The following creates a Singleton instance from the ``SampleResourceManager`` using a decorator syntax:

        .. code-block:: python
            :linenos:
            :emphasize-lines: 4

            from omni.services.streaming.manager import singleton


            @singleton
            class SampleResourceManager:

                def __init__(self) -> None:
                    self._some_shared_resource = 42

                def get_resource(self) -> int:
                    return self._some_shared_resource

    Args:
        class_ (Any): Class to make into a Singleton.

    Returns:
        Any: The Singleton instance of the given class.

    """
    instances: Dict[Any, Any] = {}

    def _get_instance(*args, **kwargs) -> Any:
        if class_ not in instances:
            instances[class_] = class_(*args, **kwargs)
        return instances[class_]

    return _get_instance


def get_ip_addresses() -> List[str]:
    """
    Return the list of IP addresses of the current host interface.

    Args:
        None

    Returns:
        List[str]: The list of IP addresses of the current host interface.

    """
    ip_addresses: Set[str] = set()
    for ip in socket.gethostbyname_ex(socket.gethostname())[2]:
        ip_addresses.add(ip)
    return sorted(list(ip_addresses))


def async_cache():
    """Decorator implementing a single-value cache with time-to-live."""
    result: Any = None
    expiration_time = 0.0
    settings = carb.settings.get_settings()

    def decorator(callback: Callable):
        @wraps(callback)
        async def inner(*args: Any, **kwargs: Any) -> Any:
            nonlocal expiration_time, result
            if expiration_time < time.time():
                result = await callback(*args, **kwargs)
                expiration_time = time.time() + settings.get_as_float(
                    "exts/omni.services.streaming.manager/healthCheckCacheDuration"
                )
            return result
        return inner

    return decorator
