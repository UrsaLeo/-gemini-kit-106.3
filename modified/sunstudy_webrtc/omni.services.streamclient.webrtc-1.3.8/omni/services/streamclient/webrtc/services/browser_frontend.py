# Copyright (c) 2021, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

"""Front-end routing for the WebRTC streaming client service."""

import socket

from fastapi import Request
from fastapi.responses import RedirectResponse

from omni.services.core import routers


router = routers.ServiceAPIRouter()

router_prefix = "/streaming"
redirect_url = "/webrtc-client"
example_page = "/webrtc-demo"


@router.get(
    redirect_url,
    summary="Redirect to a WebRTC stream client",
    description="Redirect to the WebRTC client page showcasing a streamable player.",
)
def redirect_to_demo_page(request: Request) -> RedirectResponse:
    url_scheme = request.url.scheme
    server_hostname = socket.getfqdn(request.url.hostname)
    server_port = request.url.port
    server_ip = socket.gethostbyname(server_hostname)

    # NOTE: Identifying the local IP address of the node is not without issue.
    # While the Ragnarok WebRTC library does not support "127.0.0.1" as a valid host IP address, it is also possible for
    # any other local IP address to be mapped back to "127.0.0.1" as a redirection.
    hostname, aliases, ip_addresses = socket.gethostbyname_ex(server_hostname)
    for ip_address in ip_addresses:
        if not ip_address.startswith("127."):
            server_ip = ip_address
            break

    return RedirectResponse(
        f"{url_scheme}://{server_ip}:{server_port}{router_prefix}{example_page}/?server={server_ip}"
    )
