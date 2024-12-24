import copy
import asyncio
from pathlib import Path

import omni.kit.app
import omni.ui as ui
from omni.ui.tests.test_base import OmniUiTest
from omni.kit import ui_test

import carb

from ..playlist_card_markup import MarkupCard
from .. import extension

CURRENT_PATH = Path(__file__).parent
TEST_DATA_PATH = CURRENT_PATH.parent.parent.parent.parent.parent.joinpath("data").joinpath("tests")
VISIBILITY_PATH = "/persistent/app/viewport/displayOptions"

class TestMarkupPlaylistCard(OmniUiTest):
    # Before running each test
    async def setUp(self):
        await super().setUp()
        self._golden_img_dir = TEST_DATA_PATH.absolute().joinpath("golden_img").absolute()
        self._setting = carb.settings.get_settings()
        self._visibility_value = self._setting.get(VISIBILITY_PATH)
        self._setting.set(VISIBILITY_PATH, 0)
        self._context = omni.usd.get_context()
        await self._context.new_stage_async()

    # After running each test
    async def tearDown(self):
        self._setting.set(VISIBILITY_PATH, self._visibility_value)
        await super().tearDown()

    async def test_card(self):
        _, markup = omni.kit.commands.execute(
            "CreateMarkupEntry",
            entry_name="stuff"
        )
        ext_instance = extension.get_instance()
        ext_instance.create_markup()
        markup = list(ext_instance.get_markups())[0]
        ext_instance.end_edit_markup(markup, save=True)

        card = MarkupCard.create(MarkupCard.PLAYLIST_CARD_TYPE_MARKUP, path=markup.path)
        MarkupCard.accept("/OmniverseKit_Persp")

        self.assertEqual(card.menu_text, "Markups")
        self.assertEqual(card.icon[-3:], "svg")

        ext_instance.current_markup = None

        card.active()
        self.assertEqual(ext_instance.current_markup, markup)
        card.clean()
        self.assertEqual(ext_instance.current_markup, None)
