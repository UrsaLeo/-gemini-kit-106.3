# Copyright (c) 2022, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

"""API for the streaming healthcheck service."""

from typing import List, Optional

from fastapi import HTTPException
from pydantic import BaseModel, Field

import omni.kit.app
from omni.services.core import routers

from ..stream_manager import get_stream_manager
from ..stream_interface import StreamInterface
from ..stream_manager import StreamManager
from ..utils import async_cache


class GetStreamingHealthcheckResponseModel(BaseModel):
    """Response to the request to obtain health information about the streaming extension currently endabled."""

    enabledStreamingExtensionID: Optional[str] = Field(
        ...,
        title="ID of the streaming extension currently enabled",
        description="Unique identifier of the streaming extension currently enabled.",
    )
    isHealthy: bool = Field(
        ...,
        title="Flag indicating whether the streaming extension currently enabled is in a healthy state.",
        description="Flag indicating whether the streaming extension currently enabled is in a healthy state.",
    )


router = routers.ServiceAPIRouter()


@router.get(
    "/healthcheck",
    summary="Healthcheck endpoint for the streaming feature currently enabled",
    description="Return information about the status and health of the streaming extension currently enabled.",
    response_model=GetStreamingHealthcheckResponseModel,
)
@async_cache()
async def get_healthcheck() -> GetStreamingHealthcheckResponseModel:
    stream_manager: StreamManager = get_stream_manager()
    registered_stream_interfaces: List[StreamInterface] = stream_manager.get_registered_stream_interfaces()
    enabled_stream_interface_id: Optional[str] = stream_manager.get_enabled_stream_interface_id()

    enabled_streaming_extension_id: str = "(unknown)"
    is_healthy = False
    for registered_stream_interface in registered_stream_interfaces:
        if registered_stream_interface.id == enabled_stream_interface_id:
            enabled_streaming_extension_id = registered_stream_interface.extension_id
            enabled_stream_extension_name = enabled_streaming_extension_id.split("-")[0]
            extension_manager = omni.kit.app.get_app_interface().get_extension_manager()

            extension_is_enabled = extension_manager.is_extension_enabled(ext_name=enabled_stream_extension_name)
            extension_is_healthy = await registered_stream_interface.is_healthy()

            is_healthy = extension_is_enabled and extension_is_healthy
            break

    if is_healthy:
        return GetStreamingHealthcheckResponseModel(
            enabledStreamingExtensionID=enabled_streaming_extension_id,
            isHealthy=is_healthy,
        )
    raise HTTPException(
        status_code=417,  # HTTP 417: Expectation Failed
        detail=f"Extension \"{enabled_streaming_extension_id}\" is unhealthy.",
    )
