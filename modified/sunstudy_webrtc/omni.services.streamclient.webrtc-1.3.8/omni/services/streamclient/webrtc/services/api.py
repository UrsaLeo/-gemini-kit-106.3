# Copyright (c) 2021, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

"""REST API for the WebRTC streaming client service."""

from typing import Dict, List, Optional, Union

from pydantic import BaseModel, Field

import carb.settings

import omni.appwindow
import omni.kit.app
from omni.services.core import routers


class InitializeStreamRequestModel(BaseModel):
    """Request to initialize the WebRTC stream."""

    width: int = Field(
        ...,
        title="Width",
        description="Width of the application window to stream (in pixels).",
        gt=0,
    )
    height: int = Field(
        ...,
        title="Height",
        description="Height of the application window to stream (in pixels).",
        gt=0,
    )


class InitializeStreamResponseModel(BaseModel):
    """Response to the request to initialize the WebRTC stream."""

    success: bool = Field(
        ...,
        title="Success",
        description="Flag indicating if the request was successful.",
    )
    errorMessage: Optional[str] = Field(
        None,
        title="Error message",
        description="Details about the error that occurred, in case of failure.",
    )


class IceServer(BaseModel):
    """Model representing an ICE server, as defined in WebRTC Peer Connection format."""

    urls: List[str] = Field(
        [],
        title="Server URLs",
        description="List of URLs of STUN or TURN servers for the entry.",
    )
    username: Optional[str] = Field(
        None,
        title="Username",
        description="Username to use when authenticating against the list of STUN or TURN servers.",
    )
    credential: Optional[str] = Field(
        None,
        title="Credential",
        description="Credential to use when authenticating against the list of STUN or TURN servers.",
    )


class IceServersResponseModel(BaseModel):
    """Response to the request to list ICE servers for the WebRTC stream."""

    iceServers: List[IceServer] = Field(
        [],
        title="ICE servers",
        description="List of ICE servers to use to establish the WebRTC session.",
    )


router = routers.ServiceAPIRouter()


@router.post(
    "/initialize-webrtc-stream",
    summary="Initialize a WebRTC session",
    description="Initialize the application for a WebRTC streaming session.",
    response_model=InitializeStreamResponseModel,
)
def initialize_webrtc_stream(data: InitializeStreamRequestModel) -> InitializeStreamResponseModel:
    try:
        app_window = omni.appwindow.get_default_app_window()
        app_window.resize(data.width, data.height)
        return InitializeStreamResponseModel(success=True)
    except Exception as exc:
        return InitializeStreamRequestModel(success=False, errorMessage=str(exc))


@router.get(
    "/ice-servers",
    summary="Get a list of ICE servers",
    description="Return the list of ICE servers to use for a WebRTC streaming session.",
    response_model=IceServersResponseModel,
)
def get_ice_servers() -> IceServersResponseModel:
    extension_manager = omni.kit.app.get_app().get_extension_manager()
    extension_id: str = extension_manager.get_extension_id_by_module(__name__)
    extension_name = extension_id.split("-")[0]

    ice_servers: List[IceServer] = []
    configured_servers: List[Dict[str, Union[str, List[str]]]] = carb.settings.get_settings() \
        .get(f"exts/{extension_name}/ice_servers") or []
    for configured_server in configured_servers:
        ice_servers.append(
            IceServer(
                urls=configured_server.get("urls", []),
                username=configured_server.get("username", None),
                credential=configured_server.get("credential", None),
            )
        )

    return IceServersResponseModel(iceServers=ice_servers)
