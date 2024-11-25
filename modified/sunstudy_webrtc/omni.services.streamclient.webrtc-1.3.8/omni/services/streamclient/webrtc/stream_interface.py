# Copyright (c) 2021, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

"""WebRTC stream interface."""

from typing import List

from omni.services.streaming.manager import StreamInterface

from .services.browser_frontend import redirect_url, router_prefix


class WebRTCStreamInterface(StreamInterface):
    """WebRTC stream interface."""

    @property
    def id(self) -> str:
        return "WebRTC"

    @property
    def menu_label(self) -> str:
        return "WebRTC"

    @property
    def module_name(self) -> str:
        return __name__

    @property
    def stream_urls(self) -> List[str]:
        frontend_path = f"{router_prefix}{redirect_url}"
        return [f"{host}{frontend_path}" for host in self.local_hosts]
