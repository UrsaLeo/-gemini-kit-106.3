# Copyright (c) 2021, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.

import omni.kit.test

from omni.services.streaming.manager import StreamInterface, StreamManager


class MockStreamImplementation(StreamInterface):

    def __init__(self, id: str = "MockStreamImplementation") -> None:
        super().__init__()

        self._id = id

        self.on_register_called = False
        self.on_unregister_called = False
        self.on_enable_called = False
        self.on_disable_called = False

    @property
    def id(self) -> str:
        return self._id

    @property
    def menu_label(self) -> str:
        return "Mock Stream Implementation"

    @property
    def module_name(self) -> str:
        return __name__

    def on_register(self) -> None:
        self.on_register_called = True

    def on_unregister(self) -> None:
        self.on_unregister_called = True

    def on_enable(self) -> None:
        self.on_enable_called = True

    def on_disable(self) -> None:
        self.on_disable_called = True


class StreamManagerTestCase(omni.kit.test.AsyncTestCase):

    def setUp(self) -> None:
        super().setUp()
        self._stream_manager = StreamManager()
        self._mock_stream_interface = MockStreamImplementation()

    def tearDown(self) -> None:
        super().tearDown()
        self._stream_manager.shutdown()
        self._stream_manager = None
        self._mock_stream_interface = None

    def test_stream_manager_has_no_enabled_interfaces_by_default(self) -> None:
        self.assertIsNone(self._stream_manager.get_enabled_stream_interface_id())

    def test_stream_manager_has_no_registered_interfaces_by_default(self) -> None:
        self.assertCountEqual(self._stream_manager.get_registered_stream_interfaces(), [])

    def test_registering_a_stream_interface_makes_it_accessible_via_the_manager(self) -> None:
        self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)
        registered_interfaces = self._stream_manager.get_registered_stream_interfaces()
        self.assertEqual(len(registered_interfaces), 1)
        self.assertIsInstance(registered_interfaces[0], MockStreamImplementation)

    def test_registering_a_stream_interface_returns_a_successful_flag(self) -> None:
        registration_successful = self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)
        self.assertTrue(registration_successful)

    def test_unregistering_a_stream_interface_returns_a_successful_flag(self) -> None:
        self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)
        unregistration_successful = self._stream_manager.unregister_stream_interface(stream_interface_id=self._mock_stream_interface.id)
        self.assertTrue(unregistration_successful)

    def test_registering_the_same_stream_interface_multiple_times_fails(self) -> None:
        first_registration_successful = self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)
        second_registration_successful = self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)
        self.assertTrue(first_registration_successful)
        self.assertFalse(second_registration_successful)

    def test_unregistering_an_unregistered_stream_interface_fails(self) -> None:
        unregistration_successful = self._stream_manager.unregister_stream_interface(stream_interface_id="[non-existing-id]")
        self.assertFalse(unregistration_successful)

    def test_enabling_an_enabled_stream_interface_fails(self) -> None:
        self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)
        first_enabling_successful = self._stream_manager.enable_stream_interface(stream_interface_id=self._mock_stream_interface.id)
        second_enabling_successful = self._stream_manager.enable_stream_interface(stream_interface_id=self._mock_stream_interface.id)
        self.assertTrue(first_enabling_successful)
        self.assertFalse(second_enabling_successful)

    def test_disabling_an_disabled_stream_interface_fails(self) -> None:
        self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)
        disabling_successful = self._stream_manager.disable_stream_interface(stream_interface_id=self._mock_stream_interface.id)
        self.assertFalse(disabling_successful)

    def test_registering_a_stream_interface_calls_its_on_register_method(self) -> None:
        self.assertFalse(self._mock_stream_interface.on_register_called)
        self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)
        self.assertTrue(self._mock_stream_interface.on_register_called)

    def test_unregistering_a_stream_interface_calls_its_on_unregister_method(self) -> None:
        self.assertFalse(self._mock_stream_interface.on_register_called)
        self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)
        self._stream_manager.unregister_stream_interface(stream_interface_id=self._mock_stream_interface.id)
        self.assertTrue(self._mock_stream_interface.on_register_called)

    def test_enabling_a_stream_interface_calls_its_on_enable_method(self) -> None:
        self.assertFalse(self._mock_stream_interface.on_enable_called)
        self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)
        self._stream_manager.enable_stream_interface(stream_interface_id=self._mock_stream_interface.id)
        self.assertTrue(self._mock_stream_interface.on_enable_called)

    def test_disabling_a_stream_interface_calls_its_on_disable_method(self) -> None:
        self.assertFalse(self._mock_stream_interface.on_disable_called)
        self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)
        self._stream_manager.enable_stream_interface(stream_interface_id=self._mock_stream_interface.id)
        self._stream_manager.disable_stream_interface(stream_interface_id=self._mock_stream_interface.id)
        self.assertTrue(self._mock_stream_interface.on_disable_called)

    def test_unregistering_an_enabled_stream_interface_calls_its_on_disable_method(self) -> None:
        self.assertFalse(self._mock_stream_interface.on_disable_called)
        self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)
        self._stream_manager.enable_stream_interface(stream_interface_id=self._mock_stream_interface.id)
        unregistration_successful = self._stream_manager.unregister_stream_interface(stream_interface_id=self._mock_stream_interface.id)
        self.assertTrue(unregistration_successful)
        self.assertTrue(self._mock_stream_interface.on_disable_called)

    def test_enabling_a_stream_interface_lists_it_as_enabled(self) -> None:
        self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)
        self._stream_manager.enable_stream_interface(stream_interface_id=self._mock_stream_interface.id)
        self.assertEqual(self._stream_manager.get_enabled_stream_interface_id(), self._mock_stream_interface.id)

    def test_disabling_a_stream_interface_lists_it_as_disabled(self) -> None:
        self._stream_manager.register_stream_interface(stream_interface=self._mock_stream_interface)
        self._stream_manager.enable_stream_interface(stream_interface_id=self._mock_stream_interface.id)
        self.assertEqual(self._stream_manager.get_enabled_stream_interface_id(), self._mock_stream_interface.id)
        self._stream_manager.disable_stream_interface(stream_interface_id=self._mock_stream_interface.id)
        self.assertIsNone(self._stream_manager.get_enabled_stream_interface_id())

    def test_enabling_a_stream_interface_disables_the_previous(self) -> None:
        mock_interface_a = MockStreamImplementation(id="MockA")
        mock_interface_b = MockStreamImplementation(id="MockB")

        self._stream_manager.register_stream_interface(stream_interface=mock_interface_a)
        self._stream_manager.register_stream_interface(stream_interface=mock_interface_b)

        enabling_successful = self._stream_manager.enable_stream_interface(stream_interface_id=mock_interface_a.id)
        self.assertTrue(enabling_successful)
        self.assertTrue(mock_interface_a.on_register_called)
        self.assertTrue(mock_interface_a.on_enable_called)
        self.assertFalse(mock_interface_a.on_disable_called)
        self.assertFalse(mock_interface_a.on_unregister_called)
        self.assertEqual(self._stream_manager.get_enabled_stream_interface_id(), mock_interface_a.id)

        enabling_successful = self._stream_manager.enable_stream_interface(stream_interface_id=mock_interface_b.id)
        self.assertTrue(enabling_successful)
        self.assertTrue(mock_interface_b.on_register_called)
        self.assertTrue(mock_interface_b.on_enable_called)
        self.assertFalse(mock_interface_b.on_disable_called)
        self.assertFalse(mock_interface_b.on_unregister_called)
        self.assertEqual(self._stream_manager.get_enabled_stream_interface_id(), mock_interface_b.id)

        # Validate that the stream interface previously enabled was disabled:
        self.assertTrue(mock_interface_a.on_disable_called)
