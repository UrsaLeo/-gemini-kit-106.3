# Copyright (c) 2021, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

"""Streaming extension manager."""

from typing import Dict, Optional, Union

import carb.settings

import omni.ext
import omni.kit.app
from omni.services.core import main

from .services.api import router as api_router


class StreamingManagerExtension(omni.ext.IExt):
    """Streaming extension manager."""

    def __init__(self) -> None:
        """Constructor."""
        super().__init__()
        self._settings: Optional[carb.settings.ISettings] = None
        self._desired_render_settings: Dict[str, Union[bool, int]] = {
            # Desired render setting commented out, as Omniverse Kit's GPU
            # foundation causes interference starting with version 105.0:
            # "/app/asyncRendering": False,
            "/app/renderer/skipWhileMinimized": False,
            "/app/renderer/sleepMsOnFocus": 0,
            "/app/renderer/sleepMsOutOfFocus": 0,
            "/app/runLoops/main/rateLimitEnabled": False,
            "/app/runLoops/main/rateLimitFrequency": 60,
            "/app/runLoops/main/rateLimitUseBusyLoop": False,
            "/app/runLoops/rendering_0/rateLimitEnabled": False,
        }
        self._previous_render_settings: Dict[str, Union[bool, int]] = {}
        self._router_prefix: Optional[str] = None

    def on_startup(self, ext_id: str) -> None:
        self._settings = carb.settings.get_settings()
        self._save_initial_render_settings()
        self._apply_desired_render_settings()

        # Register API services:
        self._router_prefix = self._settings.get_as_string("/exts/omni.services.streaming.manager/routerPrefix")
        main.register_router(router=api_router, prefix=self._router_prefix, tags=["streaming"])

    def on_shutdown(self) -> None:
        self._restore_initial_render_settings()

        # Unregister API services:
        main.deregister_router(router=api_router, prefix=self._router_prefix)

    def _save_initial_render_settings(self) -> None:
        """Save the initial render settings."""
        for setting_key in list(self._desired_render_settings.keys()):
            setting_value = self._settings.get(setting_key)
            if setting_value is not None:
                self._previous_render_settings[setting_key] = setting_value

    def _apply_desired_render_settings(self) -> None:
        """Apply the desired render settings for streaming."""
        for setting_key, desired_value in self._desired_render_settings.items():
            self._settings.set(setting_key, desired_value)

    def _restore_initial_render_settings(self) -> None:
        """Restore the initial render settings."""
        for setting_key, value in self._previous_render_settings.items():
            self._settings.set(setting_key, value)
