import omni.ui as ui
from omni.kit.waypoint.core.widgets.list_window import WaypointListWindow as ListWindow

def open_waypoint():
    print("Opening waypoint")
    print("Entering way points")
    if not ui.Workspace.get_window("Waypoints"):
        ListWindow()
    waypoint_window = ui.Workspace.get_window("Waypoints")
    if waypoint_window:
        waypoint_window.visible = not waypoint_window.visible

def open_markup():
    print("Opening markuup")
    toggle_window_visibility("Markups")

def open_sensors():
    print("Opening sensors")
    toggle_window_visibility("Sensors")

def open_sun_study():
    print("Opening sensors")
    toggle_window_visibility("Sun Study")

def exit():
    print("Closing chatbot")

def toggle_window_visibility(window_name, hide_artifacts=False):
    win = ui.Workspace.get_window(window_name)
    if not win:
        print(f"Window {window_name} not found")
        return

    if hide_artifacts:
        artifact_win = ui.Workspace.get_window("Artifact")
        if artifact_win and artifact_win.visible:
            return

    win.visible = not win.visible


window_actions = {
    "open waypoint": open_waypoint,
    "open markup": open_markup,
    "open sensors": open_sensors,
    "open sun study" : open_sun_study,
    "exit":exit,
}

def open_windows(message):
    action = message.lower().strip()  # Normalize and strip any extra spaces
    print(f"Action: {action}")  # Debugging print statement

    try:
        # Directly access and call the function
        window_actions[action]()
    except KeyError:
        print("Unknown command")

twin_to_chat_instance = {
    "b7586e58-9a07-47f6-8049-43d6d6f2c5e5": "37",  # Glass Factory (Aluminium Factory)
    "ed02afb1-ac52-4275-a1dd-c072487d9d16": "38",  # Oil and Gas
    "431e6077-4ffd-45ab-ae76-56260dd50dab": "39",  # Auto mobile Factory
    "9332e77d-fb20-4221-8cf2-9a2c8ef80e22": "40",  # Canon
    "ff87718d-63d9-4ceb-bd82-c2da9c8eca0a": "41",  # Flogistix (Veterans Building)
    "bb748cd5-cf5f-4bd3-80e5-e10965c24841": "42",  # NV5
    "50f54285-1daa-4c09-86c7-ba720fff4448": "42",  # Demo Client NV5 (copy of ...841)
    "bb9da2c6-4a1d-4efa-8c0f-222b44bbf136": "43",   # Esamur (Water Plant)
    "afc3e440-0798-4ac3-bfcf-206bc3eef3f3": "43"   # Esamur (Water Plant)
}

# Function to retrieve the chat instance ID for a given twin version ID
def get_chat_instance_id(twin_version_id):
    return twin_to_chat_instance.get(twin_version_id, "0000")
