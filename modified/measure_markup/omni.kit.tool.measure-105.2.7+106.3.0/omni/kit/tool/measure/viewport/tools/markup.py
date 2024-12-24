
from typing import Any, Dict, List, Tuple, Optional, Sequence

import omni.kit.raycast.query
import numpy as np
from pxr import Gf, UsdGeom

import carb.profiler
from omni.ui import scene as sc
from omni import ui

from ._scene_widget import MeasureSceneLabel
from .viewport_mode_model import ViewportModeModel

from ..manipulator_items import PositionItem, PrimRefItem
from ..snap.manager import MeasureSnapProviderManager

from ...common import MeasureCreationState, MeasureAxis, MeasureMode, SnapMode
from ...common.utils import flatten
from ...manager import MeasurementManager, ReferenceManager
from ...system import MeasurePayload


class MarkupModel(ViewportModeModel):
    _mode = MeasureMode.MARKUP

    def __init__(self, viewport_api):
        super().__init__(viewport_api, mode=self._mode)

        ui.Button(
                        tooltip="markup",
                        text="Open Markup2",
                        width=50, height=50,
                        #clicked_fn=lambda: self._on_markup_button_clicked()
                        #clicked_fn=lambda: MarkupListWindow(),
                    )