from pathlib import Path
from typing import Optional, TYPE_CHECKING
from weakref import ref

import carb
import carb.dictionary
import carb.events
import carb.settings

import omni.ui as ui
import omni.kit.app

from omni.kit.playlist.core import PlaylistModel, PlaylistPlayer, PlayMode
from ..playlist_card_markup import MarkupCard

if TYPE_CHECKING: # pragma: no cover
    from .list_window import MarkupListWindow

from ..common import CURRENT_TOOL_PATH
from ..style import ICON_PATH

IMAGE_SIZE = 16

PLAYBAR_STYLE = {
    "Button": {
        "padding": 4,
        "marging": 0,
    },
    "Button.Image:disabled": {
        "color": 0xFF6E6E6E,
    },
    "Button.Image::previous": {
        "image_url": f"{ICON_PATH}/StepBackward.svg",
    },
    "Button.Image::play": {
        "image_url": f"{ICON_PATH}/Play.svg",
    },
    "Button.Image::pause": {
        "image_url": f"{ICON_PATH}/Pause.svg",
        "color": 0xFFFFC734,
    },
    "Button.Image::next": {
        "image_url": f"{ICON_PATH}/StepForward.svg",
    },
}

SETTINGS_MARKUP_ROOT = "/exts/omni.kit.markup.core/"
SETTINGS_MARKUP_ACTIVE = SETTINGS_MARKUP_ROOT + "active_markup"
SETTINGS_MARKUP_EDITING = SETTINGS_MARKUP_ROOT + "editing_markup"

MARKUP_PLAY_NEXT_EVENT: int = carb.events.type_from_string("markup.playlist.NEXT")
MARKUP_PLAY_PREVIOUS_EVENT: int = carb.events.type_from_string("markup.playlist.PREVIOUS")
MARKUP_PLAY_PLAY_EVENT: int = carb.events.type_from_string("markup.playlist.PLAY")
MARKUP_PLAY_STOP_EVENT: int = carb.events.type_from_string("markup.playlist.STOP")

SETTING_PLAY_NEXT_ENABLED = "/app/markup/playlist/next/enabled"
SETTING_PLAY_PREVIOUS_ENABLED = "/app/markup/playlist/previous/enabled"
SETTING_PLAY_PLAY_ENABLED = "/app/markup/playlist/play/enabled"
SETTING_PLAY_PLAYING = "/app/markup/playlist/playing"

EXTENSION_NAME = "markup"


class PlayBar:
    _window: "ref[MarkupListWindow]"

    def __init__(self):
        self._player: Optional[PlaylistPlayer] = None
        self._playlist_model: Optional[PlaylistModel] = None

        self._settings = carb.settings.get_settings()
        event_stream = omni.kit.app.get_app().get_message_bus_event_stream()
        self._play_next_event_sub = event_stream.create_subscription_to_pop_by_type(
            MARKUP_PLAY_NEXT_EVENT, lambda e: self.__on_next())
        self._play_previous_event_sub = event_stream.create_subscription_to_pop_by_type(
            MARKUP_PLAY_PREVIOUS_EVENT, lambda e: self.__on_previous())
        self._play_play_event_sub = event_stream.create_subscription_to_pop_by_type(
            MARKUP_PLAY_PLAY_EVENT, lambda e: self.__start_play())
        self._play_stop_event_sub = event_stream.create_subscription_to_pop_by_type(
            MARKUP_PLAY_STOP_EVENT, lambda e: self.__stop_play())

        self._update_current_tool_sub = omni.kit.app.SettingChangeSubscription(
            CURRENT_TOOL_PATH, lambda *_: self._on_current_tool_changed()
        )

        self.__build_ui()

    def destroy(self):
        self._update_current_tool_sub = None

    def __del__(self): # pragma: no cover
        self.destroy()

    def bind_widget(self, widget: "MarkupListWindow"):
        self._window = ref(widget)

    def __build_ui(self):
        with ui.HStack(spacing=8, height=30, style=PLAYBAR_STYLE):
            ui.Spacer()
            self._previous_button = ui.Button(
                "", image_width=IMAGE_SIZE, image_height=IMAGE_SIZE, name="previous", clicked_fn=self.__on_previous, identifier="PlayBarPrevious"
            )
            self._play_button = ui.Button(
                "", image_width=IMAGE_SIZE, image_height=IMAGE_SIZE, name="play", clicked_fn=self.__on_play, identifier="PlayBarPlay"
            )
            self._next_button = ui.Button(
                "", image_width=IMAGE_SIZE, image_height=IMAGE_SIZE, name="next", clicked_fn=self.__on_next, identifier="PlayBarNext"
            )
            ui.Spacer()

    def __on_previous(self):
        self.__step(-1)

    def __on_next(self):
        self.__step(1)

    def __step(self, step):
        if bool(self._settings.get(SETTINGS_MARKUP_EDITING)):
            return
        window = self._window()
        if not window or not window.widgets: # pragma: no cover
            return

        if window.selected_index is None:
            window.selected_index = 0

        val = (window.selected_index + step) % len(window.widgets)
        window.selected_index = val

    def __on_play(self):
        window = self._window()
        if not window or not window.widgets: # pragma: no cover
            return

        if window.selected_index is None:
            window.selected_index = 0

        if self._player:
            # Stop playing
            self._player.stop()
            self._player = None
        else:
            self._playlist_model = self.__create_playlist_model()
            if self._playlist_model:
                self._player = PlaylistPlayer.create(
                    self._playlist_model, window.selected_index, self._on_started, self._on_stopped, self._on_playing
                )
                if self._player:
                    if not self._player.play(): # pragma: no cover
                        self._player.destroy()
                        self._player = None

    def _on_current_tool_changed(self):
        new_tool = self._settings.get_as_string(CURRENT_TOOL_PATH)
        if (new_tool != EXTENSION_NAME and self._player):
            self._player.stop()
            self._player = None

    def _on_started(self):
        current_tool = self._settings.get_as_string(CURRENT_TOOL_PATH)
        if (current_tool != EXTENSION_NAME):
            self._settings.set(CURRENT_TOOL_PATH, EXTENSION_NAME)

        # Disable previous and next button
        self._previous_button.enabled = False
        self._next_button.enabled = False
        # Use stop instead of play
        self._play_button.name = "pause"

        # Hide the MarkupToolbar


    def _on_stopped(self):
        if self._player:
            self._player.destroy()
            self._player = None
        self._in_playing = False

        # Enable previous and next button
        self._previous_button.enabled = True
        self._next_button.enabled = True
        # Use play instead of stop
        self._play_button.name = "play"

        # upon completion of playthrough, return to navigation
        self._settings.set(CURRENT_TOOL_PATH, "navigation")

    def _on_playing(self, index: int):
        window = self._window()
        if not window or not window.widgets: # pragma: no cover
            return

        window.selected_index = index

    def __create_playlist_model(self):
        window = self._window()
        if not window or not window.widgets: # pragma: no cover
            carb.log_warn("No markups defined!")
            return None

        # Create playlist model
        if self._playlist_model is not None: # pragma: no cover
            self._playlist_model = None
        self._playlist_model = PlaylistModel("_markups_menubar", system=True, transition_type=PlayMode.TRANSITION_CUT)

        for item in window.widgets:
            card = MarkupCard.create(MarkupCard.PLAYLIST_CARD_TYPE_MARKUP, path=item.markup.path)
            self._playlist_model.insert_item(card)

        return self._playlist_model
