import omni.ui as ui
import os
import subprocess
import asyncio
from omni.kit.window.popup_dialog import MessageDialog
import ul.gemini.chatbot as chatbot
from .styles import style_system, style_system_show_window
from omni.ui import color as cl
from .styles import style_system, style_system_show_window
from .utils import get_public_ip_from_turnserver_conf
import requests

base_path = os.path.join(os.path.dirname(__file__), "data", "Icons")

button_click_count = 0


# Used to add a simple button with the given clicked_fn to the toolbar
class SimpleClickAction:
    def __init__(self, name, icon, tooltip, clicked_fn):
        self.name = name
        self.icon = icon
        self.tooltip = tooltip
        self.clicked_fn = clicked_fn

    def build(self):
        global base_path
        ui.Button(
            "",
            tooltip=self.tooltip,
            clicked_fn=self.clicked_fn,
            image_url=os.path.join(base_path, self.icon),
            width=50,
            height=50,
        )


# Used to allow switching an extension on and off.
# Can optionallly provide an init functiion that will be called the first time the functionality is used
# Whether this initialization happens on click or when tool bar is created is defined in iniit_on_click
# When switching on extension, the windows in show_windows will be made visible and the windows in
# hide_windows will be made invisible, giving fine-grained control over the behaviour of the toolbar.


class ExtensionVisibilityAction:
    initialized = False
    extension_visible = False
    _simple_tool_bar = None
    _monitor_task = None

    def __init__(self, name, icon, tooltip, init_fn, show_windows, hide_windows, init_on_click=False):
        self.name = name
        self.show_windows = show_windows
        self.hide_windows = hide_windows
        self.icon = icon
        self.tooltip = tooltip
        self.init_fn = init_fn
        if not init_on_click and init_fn:
            init_fn()
            self.initialized = True

    async def async_init(self):
        self.init_fn()

    def init_fn(self):
        asyncio.ensure_future(self.async_init())

    def build(self):
        global base_path
        self.toolbarButton=ui.Button(
            "",
            tooltip=self.tooltip,
            clicked_fn=self.clicked_fn,
            image_url=os.path.join(base_path, self.icon),
            width=50,
            height=50,
            background_color= cl("#000000")
        )

    def clicked_fn(self):
        if not self.initialized and self.init_fn:
            self.init_fn()
            self.initialized = True

        global button_click_count
        if "Model Exploder" in self.show_windows:
            button_click_count += 1

        # Change visibility for Model Exploder to avoid double click issue, since it is initially visible
        if button_click_count == 1:
            window = ui.Workspace.get_window("Model Exploder")
            if window:
                window.visible = False
                button_click_count += 1

        any_visible = any(
            ui.Workspace.get_window(window).visible
            for window in self.show_windows
            if ui.Workspace.get_window(window) is not None
        )

        if any_visible:
            self.hide_extension_windows()
        else:
            self.show_extension_windows()

        if "Sensors" in self.show_windows:
            annotation_window = ui.Workspace.get_window("Annotation")
            if annotation_window.visible:
                annotation_window.visible = False
            markup_window = ui.Workspace.get_window("Markups")
            if markup_window.visible:
                markup_window.visible = False

        if "Annotation" in self.show_windows or "Waypoints" in self.show_windows:
            sensor_window = ui.Workspace.get_window("Sensors")
            if sensor_window and sensor_window.visible:
                sensor_window.visible = False

            exploder_window = ui.Workspace.get_window("Model Exploder")
            if exploder_window and exploder_window.visible:
                exploder_window.visible = False

            ai_window = ui.Workspace.get_window("Gemini AI")
            if ai_window and ai_window.visible:
                ai_window.visible = False

        if any(item in self.show_windows for item in ["VR", "Model Exploder"]):

            markup_window = ui.Workspace.get_window("Markups")
            if markup_window.visible:
                markup_window.visible = False

    def show_extension_windows(self):
        main_windows = ["Sun Study", "Waypoints"]

        # Hide the other window in 'main_windows' and reset its visibility state
        for window_name in main_windows:
            window = ui.Workspace.get_window(window_name)
            if window:
                if window_name in self.show_windows:
                    window.visible = True
                    self.extension_visible = True
                else:
                    window.visible = False
                    for action in Toolbar._actions:
                        if isinstance(action, ExtensionVisibilityAction) and action.show_windows == [window_name]:
                            action.extension_visible = False

        # Show the windows specific to the current extension
        for window_name in self.show_windows:
            window = ui.Workspace.get_window(window_name)
            if window:
                window.visible = True

        self.extension_visible = True

    def hide_extension_windows(self):
        if not self.show_windows:
            return
        for window in self.show_windows:
            window = ui.Workspace.get_window(window)
            if window and window.visible:
                window.visible = False
        self.extension_visible = False

        if "Annotation" in self.show_windows:
            markup_window = ui.Workspace.get_window("Markups")
            if markup_window.visible:
                markup_window.visible = False


class Toolbar:
    _simple_toolbar = None
    _actions = []

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, trace):
        if self._simple_toolbar:
            self._simple_toolbar.visible = not self._simple_toolbar.visible  # TBD check this logic
        else:
            self._simple_toolbar = ui.ToolBar("simple toolbar", noTabBar=True)

            with self._simple_toolbar.frame:
                with ui.HStack(spacing=15, height=28,style=style_system):
                    ui.Spacer()
                    for action in self._actions:
                        print("action:" + str(action))
                        action.build()
                    with ui.HStack(spacing=5, height=50):
                        ui.Spacer()
                        with ui.HStack(spacing=5,style=style_system):
                            self.chatbot_label = ui.Label(
                                "AI Assist:\nHow can I help?",
                                style={
                                    "color": cl.grey,
                                    "font_size": 16,
                                    "alignment": ui.Alignment.RIGHT_BOTTOM,
                                    "margin": 5,
                                },
                                width=ui.Percent(60),
                            )
                            self.chatbot_button = ui.Button(
                                "",
                                image_url=os.path.join(base_path, "AIAssist.png"),
                                height=50,
                                witth=50,
                                clicked_fn=self.show_chatbot_window,
                                style=style_system,
                            )

        self._simple_toolbar.dock_in_window("Viewport", ui.DockPosition.BOTTOM)
        self._simple_toolbar.frame.set_style({"Window": {"background_color": cl("#000000")}})
        print(exc_value)

    def extensionVisibilityAction(self, name, icon, tooltip, init_fn, show_windows, hide_windows, init_on_click=False):
        self._actions.append(
            ExtensionVisibilityAction(name, icon, tooltip, init_fn, show_windows, hide_windows, init_on_click)
        )

    def simpleClickAction(self, name, icon, tooltip, clicked_fn):
        self._actions.append(SimpleClickAction(name, icon, tooltip, clicked_fn))

    def show_chatbot_window(self):
        windows = ui.Workspace.get_windows()
        # Check if "AI Assist" window already exists
        window_name = "Gemini AI"
        ai_assist_window = next((window for window in windows if window.title == window_name), None)

        if ai_assist_window:
            ai_assist_window.visible = True

            markup_window = ui.Workspace.get_window("Markups")
            if markup_window and markup_window.visible:
                markup_window.visible = False

        else:
            # If the window does not exist, create a new one
            extension_instance = chatbot.MyExtension()
            extension_instance.on_startup(extension_instance)
            ai_assist_window = ui.Workspace.get_window(window_name)
            if ai_assist_window:
                ai_assist_window.visible = True

    # A Shortcut to add the quit application action
    def quitApplicationAction(self):
        self._actions.append(SimpleClickAction("Quit", os.path.join(base_path, "Quit.png"), "Quit Application", self._quit_application))

    def _quit_application(self):
        def on_confirm_quit():
            """Logic to execute when user confirms quitting."""
            config_file_path = r"C:\cygwin64\home\Administrator\turnserver\turnserver.conf"
            public_ip = get_public_ip_from_turnserver_conf(config_file_path)
            print(f"Public IP is: {public_ip}")

            twin_server_url = "http://3.15.101.114:8080/shutdown"

            try:
                # Post request for shutting down the instance
                response = requests.post(
                    twin_server_url,
                    json={"public_ip": public_ip},
                    timeout=5  # Optional: Add a timeout to avoid hanging indefinitely
                )

                if response.status_code == 200:
                    print("Shutdown the instance successfully")
                else:
                    print(f"Failed to shutdown. Status code: {response.status_code}")

            except requests.exceptions.RequestException as e:
                print(f"Request failed: {e}")

            finally:
                # Always kill the Omniverse processes, even if the request fails
                omniverse_processes = ["Kit.exe", "kit.exe"]
                for process in omniverse_processes:
                    subprocess.call(["taskkill", "/f", "/im", process])

        def on_cancel_quit():
            """Logic to execute when user cancels quitting."""
            print("Quit operation canceled by user.")
            dialog_window.visible = False  # Close the dialog

        def confirm_and_close():
            """Helper to handle confirmation and closing."""
            on_confirm_quit()
            dialog_window.visible = False  # Close the dialog

        dialog_window = ui.Window(
            "Confirm Quit",
            width=800,
            height=200,
            visible=True,
            position=(200, 300)  # Set the x and y coordinates for the window's position
        )

        with dialog_window.frame:
            with ui.VStack():
                # Add confirmation message with increased font size
                ui.Label(
                    "Are you sure you want to quit?\n\n"
                    "Note: If you press Yes, the connection will close, and you will see a black screen within 20 seconds.",
                    alignment=ui.Alignment.CENTER,
                    style={"font_size": 18}  # Set font size
                )

                # Add buttons for "Yes" and "No"
                with ui.HStack(height=30, spacing=10):
                    ui.Button("Yes", clicked_fn=confirm_and_close)
                    ui.Button("No", clicked_fn=on_cancel_quit)
