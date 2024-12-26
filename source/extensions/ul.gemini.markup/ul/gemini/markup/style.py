import carb.tokens
from omni import ui
from omni.ui import color as cl

ICON_PATH = carb.tokens.get_tokens_interface().resolve("${omni.kit.markup.core}/icons")



class Colors:
    Background = ui.color.shade(0xFF23211F, light=0xFF535354)
    Selected = ui.color.shade(0xFFFFC734, light=0xFFC5911A)
    Edit = ui.color.shade(0xFF17BDEF)


MARKUP_BROWSER_WIDGET_STYLES = {
    "GridView.Image:selected": {"border_width": 0, "border_color": 0, "border_radius": 3.0},
    "GridView.Item.Selection": {"background_color": 0},
    "GridView.Item.Selection:checked": {"border_width": 2, "border_color": Colors.Edit, "border_radius": 3.0},
    "GridView.Item.Selection:selected": {"border_width": 2, "border_color": Colors.Selected, "border_radius": 3.0},
    "GridView.Hover.Frame": {"background_color": Colors.Background},
    "GridView.Hover.Button": {"background_color": 0, "padding": 0, "stack_direction": ui.Direction.TOP_TO_BOTTOM},
    "GridView.Hover.Button.Image::edit": {"image_url": "${omni.kit.markup.core}/icons/lock_dark.svg", "alignment": int(ui.Alignment.CENTER)},
    "GridView.Hover.Button.Image::delete": {
        "image_url": "${omni.kit.markup.core}/icons/remove_dark.svg",
        "alignment": int(ui.Alignment.CENTER),
    },
    "GridView.Edit.Frame": {"background_color": 0x7F7F7F7F},
    "GridView.Edit.Button": {"background_color": 0, "padding": 0, "stack_direction": ui.Direction.TOP_TO_BOTTOM},
    "GridView.Edit.Button:hovered": {"background_color": 0xAFAFAFAF},
    "GridView.Edit.Button.Image::apply": {"image_url": "${omni.kit.markup.core}/icons/apply.svg", "alignment": int(ui.Alignment.H_CENTER)},
    "GridView.Edit.Button.Image::new": {
        "image_url": "${omni.kit.markup.core}/icons/markup_add_viewport.svg",
        "alignment": int(ui.Alignment.H_CENTER),
    },
    "GridView.Edit.Button.Image::cancel": {"image_url": "${omni.kit.markup.core}/icons/cancel.svg", "alignment": int(ui.Alignment.H_CENTER)},
    "GridView.Edit.Button.Label": {"alignment": int(ui.Alignment.CENTER), "font_size": 12},
}


LIST_WINDOW_STYLES = {
    "Window": {"background_color": Colors.Background, "padding": 0, "margin": 0},
    "Button": {"background_color": Colors.Background},
    "Separator": {"color": 0xFF535354, "border_width": 2},
    "Warning": {"background_color": Colors.Background, "color": 0xFF7C7C7C, "font_size": 20},
    "GridView.Image:selected": {"border_width": 0, "border_color": 0, "border_radius": 3.0},
    "Button.Close": {
        "stack_direction": ui.Direction.BACK_TO_FRONT,
        "background_color": cl.transparent,
        "border_width": 1,
        "border_radius": 2,
        "border_color": cl.transparent,
    },
    "Button.Close:hovered": {"border_color": 0xFF535354},
    "Button.Close.Image": {"image_url": "${omni.kit.markup.core}/icons/close.svg"},
}

POSITIONER_STYLE = {"Rectangle": {"background_color": 0, "border_width": 0}}

EDIT_WINDOW_STYLES = {
    "Window": {"background_color": Colors.Background, "padding": 0, "margin": 0},
    **MARKUP_BROWSER_WIDGET_STYLES,
}

UI_STYLES = {
    "Add.Button": {"background_color": 0xFF343432, "padding": 4, "stack_direction": ui.Direction.LEFT_TO_RIGHT, "margin": 0, "border_radius": 2, "corner_flag": ui.CornerFlag.ALL},
    "Add.Button.Image": {"image_url": "${omni.kit.markup.core}/icons/markup_add.svg", "padding": 0, "margin": 0, "background_color": 0, "alignment": ui.Alignment.CENTER,},
    "Add.Button.Label": {"padding": 0, "margin": 0, "background_color": 0, "alignment": ui.Alignment.CENTER,},
    "Add.Button:hovered": {"background_color": 0xAFAFAFAF},
    "Export.Button": {"background_color": 0xFF343432, "padding": 2, "stack_direction": ui.Direction.BACK_TO_FRONT, "margin": 0, "border_radius": 2, "corner_flag": ui.CornerFlag.ALL},
    "Export.Button.Image": {"image_url": "${omni.kit.markup.core}/icons/markup_export.svg", "padding": 4, "margin": 0, "background_color": 0, "alignment": ui.Alignment.CENTER,},
    "Export.Button.Label": {"padding": 4, "margin": 0, "background_color": 0, "alignment": ui.Alignment.CENTER,},
    "Export.Button:hovered": {"background_color": 0xAFAFAFAF},
}
