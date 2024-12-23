from enum import Enum


MARKUP_ROOT_PRIM_PATH = "/Viewport_Markups"
SETTINGS_MARKUP_ROOT = "/exts/omni.kit.markup.core/"
APPLICATION_MODE = "/app/application_mode"
CURRENT_TOOL_PATH = "/app/viewport/currentTool"
SETTINGS_MARKUP_ACTIVE = SETTINGS_MARKUP_ROOT + "active_markup"
SETTINGS_MARKUP_EDITING = SETTINGS_MARKUP_ROOT + "editing_markup"

class ApproveType(Enum):
    NONE = -1
    REJECTED = 0
    APPROVED = 1
