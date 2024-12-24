
import carb.tokens
from . import get_instance as get_markup_instance
from omni.kit.playlist.core.playlist_card import PlaylistCard

class MarkupCard(PlaylistCard):
    PLAYLIST_CARD_TYPE_MARKUP = "markup"

    def __init__(self, type: str, path: str, name: str=None):
        super().__init__(type, path, name=name)
        if self._markup_instance:
            markup = self._markup_instance.get_markup_from_prim_path(self.path)
            if markup:
                self.name = markup.name

    @classmethod
    def accept(cls, camera_path: str) -> bool:
        inst = get_markup_instance()
        return bool(inst) and inst.is_markup_prim(camera_path)

    @property
    def menu_text(self) -> str:
        return "Markups"

    @property
    def icon(self):
        return carb.tokens.get_tokens_interface().resolve("${omni.kit.markup.playlist}/data/icons/Markup_light.svg")

    def active(self, without_camera=False):
        if self._markup_instance:
            markup = self._markup_instance.get_markup(self.name)
            if markup:
                self._markup_instance.recall_markup(markup, without_camera=without_camera)

    def clean(self, without_camera=False):
        if self._markup_instance:
            self._markup_instance.recall_markup(None)

    @property
    def _markup_instance(self):
        return get_markup_instance()
