from typing import Optional, Callable, Any
import copy
from omni import ui
from omni.kit.browser.core import BrowserWidget

from .delegate import MarkupDelegate
from ..model import MarkupModel
from ..style import MARKUP_BROWSER_WIDGET_STYLES


class MarkupBrowserWidget(BrowserWidget):
    """
    Represent markup browser widget.
    """

    def __init__(
        self,
        model: Optional[MarkupModel] = None,
        delegate: Optional[MarkupDelegate] = None,
        max_thumbnail_size: int = 320,
        on_markup_selection_changed: Optional[Callable[[Any], Any]] = None,
    ):
        self._model = model or MarkupModel()
        self._delegate = delegate or MarkupDelegate(self._model)
        style = copy.copy(MARKUP_BROWSER_WIDGET_STYLES)
        super().__init__(
            self._model,
            detail_delegate=self._delegate,
            min_thumbnail_size=160,
            max_thumbnail_size=max_thumbnail_size,
            detail_thumbnail_size=160,
            thumbnail_aspect=16.0 / 9.0,
            style=style,
        )

        self.show_widgets(collection=False, category=False)
        self.collection_index = 0
        if self._detail_view:
            self._detail_view.set_selection_changed_fn(on_markup_selection_changed)
        if self._detail_scrolling_frame:
            self._detail_scrolling_frame.vertical_scrollbar_policy = ui.ScrollBarPolicy.SCROLLBAR_AS_NEEDED

    def destroy(self) -> None:
        super().destroy()
        if self._detail_view:
            self._detail_view.set_selection_changed_fn(None)
        self._model.destroy()
        self._delegate.destroy()
