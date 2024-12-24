from typing import Optional, Dict, Union

import carb.settings
from omni import ui
from omni.kit.browser.core import DetailDelegate

from .hover import MarkupItemHoverWidget
from ..extension import get_instance as get_markup_instance, SETTINGS_MARKUP_EDITING
from ..model import MarkupItem, MarkupModel


class MarkupDelegate(DetailDelegate):
    """
    Represent to show detail for a markup in stage.
    Args:
        stage_model (StageMaterialModel): Stage material model.
        on_preview_material_fn (callable): Function call to preview material on/off. Function signure:
            vois on_preview_material_fn(item: Optional[MaterialPrimDetailItem])
    """

    def __init__(self, model: MarkupModel):
        self._markup_instance = get_markup_instance()
        self._hover_widgets: Dict[MarkupItem, MarkupItemHoverWidget] = {}

        self._selection_widgets: Dict[MarkupItem, ui.Widget] = {}

        self._settings = carb.settings.get_settings()
        super().__init__(model)

    def destroy(self) -> None:
        self._markup_instance = None
        for widget in self._hover_widgets.values():
            widget.destroy()
        self._hover_widgets.clear()
        self._selection_widgets.clear()
        super().destroy()

    def get_label(self, item: MarkupItem) -> str:
        return item.name

    def on_right_click(self, item: MarkupItem) -> None:
        self._hover_widgets[item].visible = False
        self.show_context_menu(item)

    def on_click(self, item: MarkupItem) -> None:
        super().on_click(item)

    def on_hover(self, item: MarkupItem, hovered: bool) -> None:
        self._hover_widgets[item].visible = hovered

    def build_thumbnail(self, item: MarkupItem) -> Union[ui.Image, ui.ImageWithProvider]:
        """
        Display thumbnail per detail item
        Args:
            item (MarkupItem): detail item to display
        """
        with ui.ZStack():
            with ui.HStack():
                if item.thumbnail_provider:
                    image = ui.ImageWithProvider(
                        item.thumbnail_provider,
                        alignment=ui.Alignment.CENTER,
                        fill_policy=ui.IwpFillPolicy.IWP_PRESERVE_ASPECT_FIT,
                        style_type_name_override="GridView.Image",
                    )
                else: # pragma: no cover
                    image = ui.Image(
                        item.markup.thumbnail if item.markup.thumbnail else '',
                        fill_policy=ui.FillPolicy.STRETCH,
                        style_type_name_override="GridView.Image",
                    )
            self._build_hover_widget(item)
            self._selection_widgets[item] = ui.Rectangle(style_type_name_override="GridView.Item.Selection")

        return image

    def show_context_menu(self, item: MarkupItem) -> None: # pragma: no cover
        pass

    def _on_edit_begin(self, item: MarkupItem) -> None:
        # Widgets status controller by _on_markup_editing_changed
        pass

    def _on_edit_end(self, item: MarkupItem) -> None: # pragma: no cover
        # Widgets status controller by _on_markup_editing_changed
        pass

    def _build_hover_widget(self, item: MarkupItem):
        # Toolbar when item hovered
        self._hover_widgets[item] = MarkupItemHoverWidget(item, on_edit_begin_fn=self._on_edit_begin)
        self._hover_widgets[item].visible = False
