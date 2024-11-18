import omni.kit.commands
from omni.kit.viewport.utility import get_active_viewport, frame_viewport_selection
from omni.kit.notification_manager import post_notification, NotificationStatus
import omni.usd

from pxr import Gf, Usd, UsdGeom

import omni.ui as ui
import json
import aiohttp
from pxr import Sdf, UsdGeom, Usd
import subprocess
import psutil
import omni.kit.notification_manager as nm
import os
import requests
import ul.gemini.services.artifact_services as artifact_services
from omni.kit.window.popup_dialog import PopupDialog


def get_local_transform_xform(prim: Usd.Prim) -> tuple[Gf.Vec3d, Gf.Rotation, Gf.Vec3d]:
    """
    Get the local transformation of a prim using Xformable.
    See https://openusd.org/release/api/class_usd_geom_xformable.html
    Args:
        prim: The prim to calculate the local transformation.
    Returns:
        A tuple of:
        - Translation vector.
        - Rotation quaternion, i.e. 3d vector plus angle.
        - Scale vector.
    """
    xform = UsdGeom.Xformable(prim)
    local_transformation: Gf.Matrix4d = xform.GetLocalTransformation()
    translation: Gf.Vec3d = local_transformation.ExtractTranslation()
    rotation: Gf.Rotation = local_transformation.ExtractRotation()
    scale: Gf.Vec3d = Gf.Vec3d(*(v.GetLength() for v in local_transformation.ExtractRotationMatrix()))
    return translation, rotation, scale


def zoom_camera():
    viewport = get_active_viewport()
    ctx = omni.usd.get_context()

    selected_prims = ctx.get_selection().get_selected_prim_paths()

    if len(selected_prims) == 1:
        ctx.get_selection().set_selected_prim_paths([selected_prims[0]], True)
        frame_viewport_selection(viewport)
    else:
        post_notification(
            "Please select only one prim to zoom to",
            duration=2,
            status=NotificationStatus.WARNING,
        )


def show_auth_code_popup(auth_code):
    # Create the popup dialog
    popup = PopupDialog(
        title="Authentication Code",
        width=250,

    )

    # Display the auth code in the popup's window frame
    with popup.window.frame:
        with ui.VStack(alignment=ui.Alignment.CENTER):
            ui.Label("Your Authentication Code is:", style={"font_size": 18})
            ui.Label(auth_code, style={"font_size": 48, "font_weight": "bold"})
            ui.Label("Enter this code in you app\n\n", style={"font_size": 18})
            ui.Label("After you connect press Start VR\n\n", style={"font_size": 18})

    # Show the popup
    popup.show()

def connectVRAPP():
        partner_secure_data =  artifact_services.get_partner_secure_data()
        twin_version_id = partner_secure_data['twinVersionId']
        print("im here inside connecting")
        ok_button = nm.NotificationButtonInfo("OK", on_complete=None)
        cancel_button = nm.NotificationButtonInfo("CANCEL", on_complete=None)
        SVROpen=is_steamvr_running()
        print(f"Stream VR Open Status:{SVROpen}")
        steam_vr_path = r"C:\Program Files (x86)\Steam\steamapps\common\SteamVR\bin\win64\vrstartup.exe"
        config_file_path = r"C:\cygwin64\home\Administrator\turnserver\turnserver.conf"
        public_ip = get_public_ip_from_turnserver_conf(config_file_path)
        print(f"Public IP is:{public_ip}")
        # Request authentication code from the server
        auth_server_url = "http://54.193.157.81:3000/request-auth-code"
        response = requests.post(
            auth_server_url,
            json={
                "publicIP": public_ip,
                "twinversionId": twin_version_id
            }
        )

        if response.status_code == 200:
            auth_code = response.json().get('authCode', 'No auth code received')
            print(f"Authentication Code: {auth_code}")
        else:
            auth_code = 'Failed to retrieve auth code'
            print(f"Failed to retrieve authentication code. Status code: {response.status_code}")

        if  os.path.exists(steam_vr_path):
            show_auth_code_popup(auth_code)
            #nm.post_notification(f"Authentication Code: {auth_code}",hide_after_timeout=False,duration=10,status=nm.NotificationStatus.INFO,button_infos=[ok_button, cancel_button])
            if(SVROpen):
                subprocess.Popen([steam_vr_path])
                print("SteamVR is starting...")
                nm.post_notification("Starting Streaming VR Please Wait",hide_after_timeout=True,duration=10,status=nm.NotificationStatus.INFO,button_infos=[ok_button, cancel_button])

            else:
                nm.post_notification("Process Already Started",hide_after_timeout=True,duration=3,status=nm.NotificationStatus.INFO,button_infos=[ok_button, cancel_button])
        else:
            nm.post_notification("Please install SteamVR",hide_after_timeout=True,duration=10,status=nm.NotificationStatus.INFO,button_infos=[ok_button, cancel_button])

def is_steamvr_running():
        """Method to check if SteamVR (vrserver.exe) is running."""
        for proc in psutil.process_iter(['pid', 'name']):
            if proc.info['name'] == "vrserver.exe":
                print("SteamVR is running.")
                return False
        print("SteamVR is not running.")
        return True

def get_public_ip_from_turnserver_conf(config_file_path):
    try:
        # Read the configuration file
        with open(config_file_path, 'r') as file:
            lines = file.readlines()

        # Look for the 'realm=' line to get the public IP
        for line in lines:
            if line.startswith('realm='):
                public_ip = line.split('=')[1].strip()
                return public_ip

        return None  # If 'realm=' is not found
    except Exception as e:
        print(f"Error occurred while reading the config file: {str(e)}")
        return None
