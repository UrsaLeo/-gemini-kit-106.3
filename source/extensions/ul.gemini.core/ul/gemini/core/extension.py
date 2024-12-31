import os
import asyncio
import omni.kit.app
import carb.events
import carb.settings
import omni.ext
import omni.ui as ui
import carb.settings     #CR: Duplicate remove
from omni.ui import color as cl
import omni.usd
from pxr import Usd, UsdGeom, Sdf, Gf
from omni.usd import get_context
from omni.kit.viewport.utility import get_active_viewport, create_viewport_window, get_active_viewport_window
#from omni.kit.markup.core.widgets.list_window import MarkupListWindow
from ul.gemini.markup.widgets.list_window import MarkupListWindow
from omni.kit.window.section.ui.section_tool_window import SectionToolWindow

# from omni.kit.tool.measure.interface.panel import MeasurePanel

import omni.kit.commands
from omni.kit.menu.utils import MenuLayout, MenuItemDescription
from .utils import get_local_transform_xform, zoom_camera, connectVRAPP


import subprocess
import asyncio   #CR: Duplicate
import time
####################################################################################
from omni.kit.manipulator.camera import ViewportCameraManipulator
import omni.ui.scene

from omni.kit.widget.viewport import ViewportWidget

import ul.gemini.services.gdn_services as gdn_services  # import get_partner_secure_data,get_integration_entity_type_list,get_rfi_details,get_submittals_details,get_procore_document_structure,get_source_list,should_open_artifact_window
import ul.gemini.services.artifact_services as artifact_services
import ul.gemini.services.core_services as core_services
import omni.kit.window.toolbar
from omni.kit.window.toolbar.builtin_tools.transform_button_group import (
    TransformButtonGroup,
)
import threading
from .camera import CameraChanger

from .toolbar import ExtensionVisibilityAction, Toolbar

from omni.kit.waypoint.core.widgets.list_window import WaypointListWindow
from omni.kit.variant.presenter.window import VariantPresenterWindow
from syntway.model_exploder.window import Window as ModelExploderWindow

import omni.appwindow
import carb.input
from carb.input import KeyboardEventType

from .inactivity_detector import InactivityTracker



# Any class derived from `omni.ext.IExt` in top level module (defined in `python.modules` of `extension.toml`) will be
# instantiated when extension gets enabled and `on_startup(ext_id)` will be called. Later when extension gets disabled
# on_shutdown() is called.


# Create a wrapper method to take in the inputs as (base_path, "../../../data/Nav_Loading.png")  and retern a relative path as self.getpath((base_path, "../../../data/Nav_Loading.png"))

base_path = os.path.dirname(__file__)
loading_screen_path = os.path.join(base_path, "../../../data/Nav_Loading.png")
partner_secure_data = None




class ULExtension(omni.ext.IExt):

    _camera_changer = CameraChanger() #CR: Remove
    _stage_subscription = None

    #CR: Combine all start up UI settings

    _file_menu_list = [MenuItemDescription(name="UrsaLeo AI Assit - Comming Soon")]
    omni.kit.menu.utils.add_menu_items(_file_menu_list, "Help")
    _menu_layout = [
        MenuLayout.Menu("Help"),
        MenuLayout.Menu("Window", remove=True),
        MenuLayout.Menu("Edit", remove=True),
        MenuLayout.Menu("Create", remove=True),
        MenuLayout.Menu("Rendering", remove=True),
        MenuLayout.Menu("Tools", remove=True),
        MenuLayout.Menu("File", remove=True),
        MenuLayout.Menu("Layout", remove=True),
    ]
    omni.kit.menu.utils.add_layout(_menu_layout)

    async def loading_screen(self):
        window_flags = ui.WINDOW_FLAGS_NO_RESIZE
        window_flags |= ui.WINDOW_FLAGS_NO_SCROLLBAR
        window_flags |= ui.WINDOW_FLAGS_MODAL
        window_flags |= ui.WINDOW_FLAGS_NO_CLOSE
        window_flags |= ui.WINDOW_FLAGS_NO_MOVE

        viewport_window = get_active_viewport_window()
        position_x = viewport_window.width / 2 - viewport_window.width * .425
        #position_y = viewport_window.height / 2 - viewport_window.height * 1

        self._window = ui.Window(
            "Rendering the Digital Twin",
            width=viewport_window.height * 0.54,
            height=viewport_window.height * 0.54,

            flags=window_flags,
            position_x=position_x,
            position_y=40,
        )
        with self._window.frame:
            with ui.VStack():
                self.image = ui.Image(loading_screen_path, fill_policy=ui.FillPolicy.STRETCH)
        self._window.visible = True

        settings = carb.settings.get_settings()
        settings.set("/app/viewport/content.emptyStageOnStart", True)

    def setup_viewport_settings(self):
        win = ui.Workspace.get_window("Main ToolBar")
        win.visible = False
        # print("persistent settings are stored in: {}".format(settings.get("/app/userConfigPath")))
        self.setup_viewport_select_op()

    def setup_viewport_select_op(self):

        print("Change selection")
        toolbar = omni.kit.window.toolbar.get_instance()
        print("Changing to select tool")
        button = toolbar.get_widget("select_op")
        button.model.set_value(True)
        settings = carb.settings.get_settings()
        # Changing the setting for whether to move in local or global mode.
        settings.set(TransformButtonGroup.TRANSFORM_MOVE_MODE_SETTING, "local")
        settings.set(TransformButtonGroup.TRANSFORM_MOVE_MODE_SETTING, "global")


    def set_workspace_visible():
        ui.Workspace.get_window("Measure").visible = True

    def create_new_toolbar(self):
        #Initialize Markup here, since corresponding Tollbar button was removed
        markup_window = MarkupListWindow()
        markup_window.visible = True
        
        viewport_window = get_active_viewport_window()
        waypoint_window = WaypointListWindow()
        waypoint_window.height = viewport_window.height / 3 * 1.45

        with Toolbar() as tb:
            tb.extensionVisibilityAction(
                "Waypoints",
                os.path.join(os.path.dirname(__file__), "data", "Icons", "Waypoint.png"),
                "Waypoints",
                lambda: waypoint_window,
                ["Waypoints"],
                [],
            )
            tb.extensionVisibilityAction(
                "Annotation",
                os.path.join(os.path.dirname(__file__), "data", "Icons", "Measurement.png"),
                "Take Measurements and Add Markups",
                None,
                ["Annotation"],
                ["Property", "Attachment"],
                True,
            )
            tb.extensionVisibilityAction(
                "Sun Study",
                os.path.join(os.path.dirname(__file__), "data", "Icons", "Sun01.png"),
                "View Effect of Sun Light by Time of Day",
                None,
                ["Sun Study"],
                [],
            )
            tb.extensionVisibilityAction(
                "Sensors",
                os.path.join(os.path.dirname(__file__), "data", "Icons", "Sensors_2.png"),
                "View Sensor Data Panel",
                None,
                ["Sensors"],
                ["Attachment"],
            )
            tb.extensionVisibilityAction(
                "Model Exploder",
                os.path.join(os.path.dirname(__file__), "data", "Icons", "ExpadingViewsIcon.png"),
                "Model Exploder",
                lambda: ModelExploderWindow("Model Exploder", self._manager.get_enabled_extension_id("syntway.model_exploder")),
                ["Model Exploder"],
                [],
                True,
            )
            tb.extensionVisibilityAction(
                "VR",
                os.path.join(os.path.dirname(__file__), "data", "Icons", "vricon.png"),
                "Virtual Reality",
                connectVRAPP,
                ["VR"],
                ["Artifact"],
                True
            )

            if partner_secure_data["twinVersionId"] == "1b75f4cf-4855-453a-ac8d-fab23f9923bb":
                # Used only for 1 twin now, so we just need to hard code it
                tb.extensionVisibilityAction(
                    "Variants",
                    os.path.join(os.path.dirname(__file__), "data", "Icons", "Variant.png"),
                    "Variant Presenter Tool Tip",
                    lambda: VariantPresenterWindow(),
                    ["Variant Presenter"],
                    [],
                )
            tb.quitApplicationAction()

    def on_stage_event(self, event: carb.events.IEvent):
        def init_measure():
            self._manager.set_extension_enabled_immediate("omni.kit.tool.measure", True)


        if event.type == int(omni.usd.StageEventType.ASSETS_LOADED):
            print("I am clossing since asset is loaded !!")
            self._stage_subscription.unsubscribe()
            self._stage_subscription = None
            self._window.visible = False

            sensor_window = ui.Workspace.get_window("Sensors")
            if sensor_window:
                sensor_window.visible = False

            annotation_window = ui.Workspace.get_window("Annotation")
            if annotation_window:
                annotation_window.visible = False

            markup_window = ui.Workspace.get_window("Markups")
            if markup_window:
                markup_window.visible = False

            # we are doing this after asset is loaded to avoid the "render context changed" message
            #init_measure()

            #Docking markup
            measure_window = ui.Workspace.get_window("Annotation")
            markup_window = ui.Workspace.get_window("Markups")

            if measure_window and markup_window:
                markup_window.dock_in(measure_window, ui.DockPosition.BOTTOM)

            window = ui.Workspace.get_window("Property")
            if window:
                window.visible = False

            self._detector = InactivityTracker(30)


    async def load_usd_to_viewport(self):
        asyncio.ensure_future(self.loading_screen())

        file_path = core_services.get_usd_path()

        print(f"Attempting to load USD file: {file_path}")

        success, error = await omni.usd.get_context().open_stage_async(
            file_path, omni.usd.UsdContextInitialLoadSet.LOAD_ALL
        )
        if not success:
            print(error)
            raise SystemExit("Coould not load USD file: {file_path}")

        self.stage = omni.usd.get_context().get_stage()

        self.post_usd_load_operations()

    def post_usd_load_operations(self):
        self._camera_changer.initialize_camera_prim_paths()

        if not ui.Workspace.get_window("Markups"):
            print("Creating MarkUps")
            self._list_window_instance = ui.Workspace.get_window("Markups") or MarkupListWindow()

    def setup_hotkey(self):
        self.keyboard = omni.appwindow.get_default_app_window().get_keyboard()
        self.keyboard_sub_id = carb.input.acquire_input_interface().subscribe_to_keyboard_events(
            self.keyboard, self._on_keyboard_event
        )

    def _on_keyboard_event(self, event, *args, **kwargs):
        if event.input == carb.input.KeyboardInput.F:
            if event.type == KeyboardEventType.KEY_PRESS or event.type == KeyboardEventType.KEY_REPEAT:
                zoom_camera()

    def on_startup(self, ext_id):

        global partner_secure_data

        self._ext_id = ext_id
        self._count = 0
        self._manager = omni.kit.app.get_app().get_extension_manager()

        self.loading_stage = False  # Flag to indicate if a stage loading operation is in progress

        partner_secure_data = gdn_services.get_partner_secure_data()


        self.create_new_toolbar()
        self.stage_stream = omni.usd.get_context().get_stage_event_stream()
        # self.update_subscription = self.update_stream.create_subscription_to_pop(self.on_update_once, name="MyExtensionUpdateOnce")

        self._stage_subscription = self.stage_stream.create_subscription_to_pop(
            self.on_stage_event, name="MyExtensionOnStageEvent"
        )

        self.setup_viewport_settings()

        asyncio.ensure_future(self.load_usd_to_viewport())

        self.setup_hotkey()

        # self.setup_viewport_settings()

    def on_shutdown(self):
        self._camera_changer = None
