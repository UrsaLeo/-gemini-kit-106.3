# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [105.2.7] - 2024-10-04
### Changed
- Updated to support Kit 106.3.0

## [105.2.6] - 2024-07-17
### Changed
- Updated to support Kit 106.0.1

## [105.2.5] - 2024-03-21
### Changed
- [DRIVE-16966] Fixed a bug that caused the docked window not getting resized properly.

## [105.2.4] - 2024-01-12
### Changed
- Properly cleaning up settings subscriptions.

## [105.2.3] - 2024-01-11
### Changed
- Version update for 105.2 release.

## [105.1.78] - 2023-11-28
### Changed
- Reverted section plane awareness as it was incorrect, and newer version of omni.kit.raycast.query now provides such awareness when creating Ray.

## [105.1.77] - 2023-11-28
### Changed
- OMFP-3976: Fixed Area Measurement when clicking on the same spot multiple times.

## [105.1.76] - 2023-11-15
### Changed
- OMFP-3012: Added scroll frame to the Measrure Tool window.

## [105.1.75] - 2023-11-14
### Changed
- OMFP-3871: Fixed measure points not updating correctly when rejoining a live session.

## [105.1.74] - 2023-11-08
### Changed
- Fixed a bug that caused latency issues when in a live session.

## [105.1.73] - 2023-11-07
### Changed
- OM-114135: Remove golden image from tests in favor of data-based validation.

## [105.1.72] - 2023-11-06
### Fixed
- Minor Bugfixes

## [105.1.71] - 2023-11-06
### Fixed
- Fixed flickering measure icons in the viewport

## [105.1.70] - 2023-11-03
### Fixed
- Fixed measure tool breaking when grouping or renaming prims

## [105.1.69] - 2023-11-03
### Fixed
- OMFP-3686: disable image comparison tests on linux

## [105.1.68] - 2023-11-03
### Added
- OMFP-1128: add live session tests
- OMFP-1171: add test changing units on display panel
- add a new command; CreateMeasurementPointToPointCommand
- add ensuring measurement unit in a test before checking computed value
- refact: separate test_measure.py to individual modules

## [105.1.67] - 2023-11-02
### Fixed
- Changed file browser open to work with linux

## [105.1.66] - 2023-10-31
### Added
- Add action display name to show well in Actions/Hotkeys window

## [105.1.65] - 2023-10-27
### Changed
- Fixed an issue where mouse clicks were sometimes not properly recognizes.

## [105.1.64] - 2023-10-27
### Changed
- OM-113426: Fix ETM error with Frame (Go To) test

## [105.1.63] - 2023-10-26
### Changed
- OMFP-3230: Fix division by zero error

## [105.1.62] - 2023-10-26
### Changed
- OMFP-2245: [USD Explorer] Measure - GoTo option in Measure panel zooms out of the measurement (added unit testS)

## [105.1.61] - 2023-10-26
### Changed
- OMFP-3263: Fix selection issues

## [105.1.60] - 2023-10-25
### Changed
- OMFP-1021: Added more hotkeys.

## [105.1.59] - 2023-10-24
### Changed
- OM-112690: Do not snap to points that are behind section plane.

## [105.1.58] - 2023-10-24
### Changed
- OMFP-3150: Fixed an issue with the selection state being restored badly

## [105.1.57] - 2023-10-24
### Changed
- OMFP-3095: Change default unit type from centimeters to meters

## [105.1.56] - 2023-10-23
### Changed
- OMFP-2953: Fix selection issues - hardcoded to not allow selection in 'review' mode

## [105.1.55] - 2023-10-23
### Added
- OMFP-2708 Added test for renaming measurements
### Fixed
- Fixed some inconsistencies with root path

## [105.1.54] - 2023-10-23
### Changed
- Converted viewport query to omni.kit.raycast.query.
- Converted Edge, Vertex and Mid-point snap to use primitive_id (face id) provided by raycast query.
- Swapped Center snap and Pivot snap to better reflect what they actually do.
### Fixed
- Fixed Pivot snap when the prim has non-identity transforms on its ancestor prims.

## [105.1.53] - 2023-10-20
### Changed
- OMFP-2708: Fix renaming measurements to not throw errors

## [105.1.52] - 2023-10-20
### Changed
- OMFP-2523: Fix error when clicking on the start point in a area measure mode.

## [105.1.51] - 2023-10-20
### Changed
- OMFP-1103: Reintroduced the warp dependency and added Min/Max modes back in.

## [105.1.50] - 2023-10-19
### Changed
- OMFP-2657: Fixed bad window scale when the window became undocked.

## [105.1.49] - 2023-10-19
### Changed
- OMFP-2103: "Press To Complete (Enter)" button correctly updates position when navbar/timeline are toggled
- Minor cleanup of unused code

## [105.1.48] - 2023-10-19
### Changed
- OMFP-1103: Removed the warp dependency.

## [105.1.47] - 2023-10-17
### Changed
- OMFP-2822: Restore the correct selection state upon existing the measure tool

## [105.1.46] - 2023-10-17
### Changed
- OMFP-2700: Measure Snap to Perpendicular should turn on Surface snap

## [105.1.45] - 2023-10-17
### Changed
- Changed warp dependency from `omni.warp` to `omni.warp.core`.

## [105.1.44] - 2023-10-17
### Changed
- OMFP-2500: Hide measure prims in stage

## [105.1.43] - 2023-10-17
### Changed
- OMFP-1841: State management fixes.

## [105.1.42] - 2023-10-16
### Changed
- OMFP-1103: Fix min/max measureing modes.
- OMFP-2537: Fix error when clicking on the start point in a multi measure.
- OMFP-2559: Fix flickering issues in the UI.

## [105.1.41] - 2023-10-13
### Changed
- OMFP-2533: Skipped measure update during camera manipulation.

## [105.1.40] - 2023-10-12
### Changed
- OMFP-2401: Surface snap is no longer always-on and has to be exclusively enabled like other snap modes.

## [105.1.39] - 2023-10-12
### Changed
- OMFP-794: add background for snap mode labels

## [105.1.38] - 2023-10-12
### Added
- OMFP-1395: Prim with measurement Relationship does not delete the measurement

## [105.1.37] - 2023-10-12
### Changed
- OMFP-811: Escape Key resets tool. If tool is already reset, the tool will exit. Improved UX for subtool creation.
- OMFP-2103: Click to complete button to physically finish a measurement (Multi-point, Area)

## [105.1.36] - 2023-10-12
### Changed
- OMFP-2210: Measure radio buttons layout and spacing

## [105.1.35] - 2023-10-11
### Fixed
- OMFP-2245: [USD Explorer] Measure - GoTo option in Measure panel zooms out of the measurement (feedback from pshipkov)

## [105.1.34] - 2023-10-11
### Fixed
- OMFP-2245: [USD Explorer] Measure - GoTo option in Measure panel zooms out of the measurement (feedback from cperrella)

## [105.1.33] - 2023-10-11
### Changed
- OMFP-2103: [USD Explorer] Measure - Pressing Enter in Multi-point and Area measure modes finalizes the measurement

## [105.1.32] - 2023-10-11
### Changed
- OMFP-2245: [USD Explorer] Measure - GoTo option in Measure panel zooms out of the measurement

## [105.1.31] - 2023-10-10
### Changed
- OMFP-794: Change snap mode icons

## [105.1.30] - 2023-10-10
### Changed
- OMFP-2206: Measure radio buttons are the incorrect style

## [105.1.29] - 2023-10-10
### Changed
- OMFP-799: Passing None to frame_viewport_prims ensures grabbing current viewport API

## [105.1.28] - 2023-10-09
### Changed
- OMFP-2054: If measure panel is not docked, place panel to the right side of viewport when initialized.

## [105.1.27] - 2023-10-06
### Changed
- OMFP-2102: Finalize automatically for point-to-point, angle, and, diameter subtools.

## [105.1.26] - 2023-10-06
### Changed
- OMFP-842: Add visible rubber band for Diameter tool creation.

## [105.1.25] - 2023-10-06
### Changed
- OMFP-1855: Removed blocking mechanism that prevented creating measurements on read-only files.

## [105.1.24] - 2023-10-06
### Fixed
- OMFP-2010: Fixed Area tool not being calculated correctly

## [105.1.23] - 2023-10-06
### Fixed
- OMFP-1103: Fixed cases when measuring 2 objects that are not point based meshes, e.g. payloads or references

## [105.1.22] - 2023-10-05
### Changed
- OMFP-789: When a Measure subtool is disabled, we revert the current tool to `navigation`.

## [105.1.21] - 2023-10-05
### Changed
- OMFP-1283: Re-enabled Area tests.

## [105.1.20] - 2023-10-05
### Fixed
- OMFP-1022: Drawing tool will properly clear when changing off of measure tool for another viewport tool.

## [105.1.19] - 2023-10-04
### Changed
- OMFP-1680: Fix visualization issues on angle tool, diameter tool.

## [105.1.18] - 2023-10-03
### Changed
- OMFP-1283: Code coverage improvements.

## [105.1.17] - 2023-10-03
### Fixed
- Snap mode default is back to vertex mode

## [105.1.16] - 2023-10-03
### Changed
- OMFP-1680: Corrected visibility issues on diameter measurements.

## [105.1.15] - 2023-10-02
### Added
- Go to button for each measurement which will frame the view on that measurement

## [105.1.14] - 2023-10-02
### Fixed
- Changed snap mode selection to combo box
- Search bar now resizes to maxium width

## [105.1.13] - 2023-09-28
### Fixed
- Fixed update measure subtool highlighting

## [105.1.12] - 2023-09-28
### Fixed
- Fixed bug where if a stage is opened with measurements, viewport selection stops working

## [105.1.11] - 2023-09-28
### Changed
- Added support to syncronize the current tool for Kit applications.

## [105.1.10] - 2023-09-28
### Changed
- Improved change tracking and performance when a prim that's being measured has changed.
### Fixed
- Changing the transform of the ancestor prim of a measured prim now updates the measurement correctly.

## [105.1.9] - 2023-09-28
### Changed
- Point to point enabled by default.
- Vertex snap on by default.
- Snap modes and other Measure Tool settings are now persistent.
- Fix multiple Measure Tool preferences on reload.

## [105.1.8] - 2023-09-27
### Changed
- Performance optimization for Diameter measurement (similar to Angle).

## [105.1.7] - 2023-09-27
### Changed
- Used sc.Arc for Angle measurement visualization.
- Only updating instead of recreating ui.scene items upon Angle measurement change.

## [105.1.6] - 2023-08-30
### Changed
- Removed Measure Selected from startup tool, as it is not an interactive method.

## [105.1.5] - 2023-08-24
### Fixed
- OM-93372: Startup tool is now enabled on window open versus application open.

## [105.1.4] - 2023-07-31
### Fixed
- Fixed startup tool not being validated if launching through a toolbar button.

## [105.1.3] - 2023-07-24
### Fixed
- OM-102756: Fixed label flickering for created measurements when hovering.

## [105.1.2] - 2023-07-21
### Fixed
- OM-102740: Added Diameter as a startup tool in the Preferences panel.

## [105.1.1] - 2023-07-20
### Fixed
- OM-101932: Fixed startup tool not reading the persistent app setting versus extension-level setting.

## [105.1.0] - 2023-07-06
### Changed
- Kit version to 105.1.0
### Fixed
- OM-101932: Fixed startup tool not reading the persistent app setting versus extension-level setting.


## [105.0.33] - 2023-06-09
### Fixed
- Fixed Angle measurement allowing the option to change unit type, when it will always be represented as Degrees.

## [105.0.32] - 2023-06-05
### Added
- OM-93372: Added the ability to set a default enabled tool on first launch of Measure's window.
## [105.0.31] - 2023-06-05
### Fixed
- OM-96493: Fixed Secondary Angle measurement value type in Measure Manager
- OM-96497: Fixed Area measurement value type in Measure Manager

## [105.0.30] - 2023-06-02
### Fixed
- OM-96954: Remove scypi to improve startup speeds
- OM-95365: Add unique identifiers to buttons

## [105.0.29] - 2023-05-18
### Fixed
- OM-95456: Measurements made on prims that do not have a default transform now draw correctly when saving.

## [105.0.28] - 2023-05-15
### Fixed
- OM-94765: Deleting a measurement from manager no longer retains the highlighted prim association. Resets Viewport selection state.

## [105.0.27] - 2023-05-10
### Fixed
- OM-94248: Layer event callback now handles NoneType appropriately.

## [105.0.26] - 2023-05-10
### Fixed
- OM-93369: Reset buttons now are disabled during measurement creation
### Added
- Hover state of measurement now shows prim relationship to measurement.



## [105.0.25] - 2023-05-03
### Fixed
- OM-92964: Fixed issue by ensuring the tree view is cleared of its selection before delete of the measurement.

## [105.0.24] - 2023-05-03
### Updated
- Add logic for constrained delaunay. Nothing actionable.

## [105.0.23] - 2023-04-27
### Updated
- Added platform flag to extension.toml

## [105.0.22] - 2023-04-27
### Updated
- Adding extra flags to the repo toml.
## [105.0.21] - 2023-04-26
### Updated
- add more info to repo.toml to enforce pip install of scipy to each respective platform.

## [105.0.20] - 2023-04-26
### Updated
- try to enforce pip install of scipy to each respective platform.

## [105.0.19] - 2023-04-25
### Updated
- removed stripping *.so from linux packaging

## [105.0.18] - 2023-04-25
### Changed
- Kit SDK Update
- Updated measurement undo logic to support new added subtools
- Updated logic for the selection state in the viewport when creating and selecting measurements.

### Added
- Ability to export CSV of measurements in the current stage
- Measurement Management system.
- Ability to save subtools [Point to Point, Multipoint, Angle, Area] to USD.

### Fixed
- OM-88316: Ensure that the Perpendicular mode for Point-To-Point is only available for that mode.

### Removed
- Omnigraph dependency. Measurements are now completely primitive based and managed by the new Management System.

## [105.0.16] - 2023-04-03
### Updated
- Updated Kit SDK (105.0)

## [105.0.15] - 2023-03-14
### Fixed
- OM-86076: Simplified C++ logic and fixed label display for XYZ world/local for measure selected.

## [105.0.14] - 2023-03-13
### Fixed
- OM-84919: Updated the logic to reset the XYZ value to None if not in specified subtool on tool changed

## [105.0.13] - 2023-03-09
### Fixed
- OM-84939: Fixed the ability to delete a measurement without affecting any underlying selected prims. Updated the undo command to reflect these changes.

## [105.0.12] - 2023-03-08
### Fixed
- OM-76816: Added escape key interaction to reset measurement creation state when creating a measurement with measure subtool.

## [105.0.11] - 2023-03-07
### Changed
- Extra insurance that deleting a measurement during hover state does not fail.
- Updated omnigraph input for distance to be double instead of float.

## [105.0.10] - 2023-03-07
### Changed
- OM-85201: Changed default Measure Selected mode to Center
### Fixed
- OM-84929: Cleared measurement selected state when the deleting a measurement during hover state.

## [105.0.9] - 2023-02-24
### Changed
- Display notification for subtools during live session denoting that it is only visible to local user.

## [105.0.8] - 2023-02-23
### Changed
- Replace integrated sidecar functionality with omni.view.sidecar reference.

## [105.0.7] - 2023-02-23
### Fixed
- OM-83787: Fixed issue where deleting a measurement in live session does not propogate to other users.

## [105.0.6] - 2023-02-21
### Changed
- Skip test_measure_selected_delete and test_viewport_ui tests for ETM
- Update Kit SDK to latest
- Added additional pausing in tests to be sure content settles between tests
- Forced version bump for content update
- Updated omnigraph setup to not use bundles as it is currently a bug with OmniGraph and FSD (kit 105)
- vs2019 update + update all repo tools

## [105.0.0] - 2023-02-14
### Changed
- Updated to Kit 105.
### Removed
- Removed the requirement of Prim node as it is now deprecated.

## [104.0.47] - 2023-02-16
### Changed
- Updated kit version to latest for 104.
- Added additional pausing in tests to be sure content settles.

## [104.0.46] - 2023-02-16
### Changed
- Forced version bump for content update (kit 104).

## [104.0.45] - 2023-02-16
### Changed
- Updated omnigraph setup to not use bundles as it is currently a bug with OmniGraph and FSD (kit 104).

## [104.0.44] - 2023-02-15
### Changed
- Updated OmniGraph setup for Measure Selected. Now no longer uses backdoor to change OG settings on the fly.

## [104.0.43] - 2023-02-07
### Fixed
- Fixed issue with Measure Selected graph setting persistent Action Graph values without resetting back to their defaults.

## [104.0.42] - 2023-02-02
### Changed
- Optimized method for querying a snap position without the requirement of an entire stage BVH rebuild.

## [104.0.41] - 2023-01-27
### Fixed
- Fixed Area tool constrain plane visuals when stage up axis is Z.

## [104.0.40] - 2023-01-17
### Added
- Mark area subtool with a visual when constrain to plane (x,y,z only) is selected.
- Snap targets now provide individual visual indicators.
- Added Area tool 'dynamic' mode that determines the plane of measure by the first three points placed.
### Changed
- Updated label positioning for the point-to-point subtool.
- Moved the 'Measurements' visibility option to the 'Show By Type' submenu.

## [104.0.39] - 2022-12-02
### Fixed
- Fixed sidecar logic to determine omniverse:// path or local disk path before finding sidecar files.

## [104.0.38] - 2022-11-16
### Changed
- Disabled sidecar generation for Create. Measurements write to current authoring layer.
- Locked snap mode when user starts creating a measurement with a sub-tool.
- Updated UI styles and replaced Measure Selected Icon.
- Cleared Extension instance reference on extension shutdown.
### Fixed
- Fixed selection state logic that attempts to enable a layer that doesn't have a `visible` attribute.

## [104.0.37] - 2022-11-09
### Changed
- Reduced extension dependencies
- Function documentation
- Hard-code omnigraph settings to support legacy nodes (Pre update)
- Updated tests

## [104.0.36] - 2022-11-03
### Changed
- Updated UI Styling.
- Updated BVH refresh rate when trying to snap. This corrects cases where scaled prims may fail when placing points.
### Fixed
- Fixed the Display option eyeball value not drawing correctly for the value it represents.
- Fixed legacy omnigraph settings to allow for drawing saved Measure Selected items.

### Added
- Added sidecar logic.

## [104.0.35] - 2022-10-27
### Fixed
- Fixed Area calculation being incorrect.
- Fixed labels for Area default was too large for small sized measurements.

## [104.0.34] - 2022-10-26
### Fixed
- Fixed bug with PivotSnapProvider having the same ID as CenterSnapProvider.

## [104.0.33] - 2022-10-26
### Changed
Updated UI layout for subtools and snaps group.
### Fixed
- Fixed bug with Perpendicular mode where snaps would still override the functionality if enabled.

## [104.0.32] - 2022-10-24
### Fixed
- Fix Vertex, Edge, Midpoint snapping crashes with large point-count meshes.

## [104.0.31] - 2022-10-24
### Added
- Added state mahcine to drive UI and viewport tools.
- Implemented snapping for measure creation modes: Pivot, Center, Vertex, Edge, Midpoint
- Added the following tools: Point-to-point, Multipoint, Angle, Area.  (View Only)
### Changed
- Set measurement visibility to use the Kit display menu
- Updated UI
- Updated Tests for new tooling

## [104.0.30] - 2022-10-04
# Fixed
- Fix test logic for changed classes.

## [104.0.29] - 2022-09-27
### Changed
- Measure built against Kit 104. Include extension Test suite.

## [104.0.28] - 2022-09-26
### Fixed
- Fix test crash issue on VP1 only.

## [104.0.27] - 2022-08-31
### Changed
- Attempting to get a valid Linux build published.

## [104.0.26] - 2022-08-30
### Changed
- Implement custom node logic for determining if a measurement needs to be updated or not.

## [104.0.25] - 2022-08-29
### Fixed
- Fix for Graphs on creation not serializing the data required for operation after a file is saved or opened.

## [104.0.24] - 2022-08-19
### Changed
- Using USD file units as the default for measuring. Superceeds last known user setting.
### Fixed
- Fixed Measure display persisting after deletion/undo and between file opening.

## [104.0.23] - 2022-07-29
### Added
- Added Tests
- Implement undo stack for deleting a measurement.
### Changed
- Changed Menu location to be under 'Tools'
- Modify Label colors for consistency
- UI overhaul to align with the rest of Kit.

## [104.0.22] - 2022-07-21
### Changed
- Measure VP2 support for Kit 103.5
- Changed order of Distance type to Min (Default), Max and Center.
### Fixed
- Fixed deletion method with new drawing schema

## [104.0.21] - 2022-07-20
### Removed
- Removed print statements from extension.py as it seems to cause issues when enabling/disabling from the toolbar.

## [104.0.20] - 2022-07-20
### Fixed
- Fixed distance radio button indication when resetting to default values.
- Fixed Label background sizing with measurement values being 5+ characters in length.
### Added
- Add support for making measurements to Cylinder, Capsule, and Cone Shapes. Shapes are however limited.

## [104.0.19] - 2022-07-19
### Changed
- Using calculated length of a measurement versus value passed as it is not deterministic by unit type.
### Fixed
- Fixed serialization load/save.

## [104.0.18] - 2022-07-18
### Changed
- Added early out's for measurement computes if the measurement is not visible.

## [104.0.17] - 2022-07-11
### Fixed
- Fixed issue with the way visibility was being toggled.

## [104.0.16] - 2022-07-05
### Fixed
- Fixed correction of prim path to measure not grabbing the default prim path as its base

## [104.0.15] - 2022-07-01
### Changed
- Made calculations for Closest/Furthest/Center only happen when required. Optimized math calls.

## [104.0.14] - 2022-07-01
### Added
- Added functionality to enable/disable visibility using Measure's stage root visibility toggle.
- Added check if visuals are disabled and a measurement is created we re-enable the visuals globally.

## [104.0.13] - 2022-06-29
### Changed
- Added serialization / deserialization for last known session settings and functionality to revert to default
- Set up a global visible/nonvisible toggle button for measurements
- Updated radio button sized to conform to the size defined in OV Code
### Fixed
- Fixed color and unit property setting on launch passing the wrong argument types

## [104.0.12] - 2022-06-24
### Fixed
- Fix label overlap bug
### Added
- Add camera to closest point on spline for dynamic label drawing

## [104.0.11] - 2022-06-08
### Changed
- Kit-sdk change

## [104.0.10] - 2022-06-08
### Changed
- Performance improvement on the compute node

## [104.0.9] - 2022-06-03
### Fixed
- Bugifx to use View eyeball icon

## [104.0.8] - 2022-06-02
### Fixed
- Remove measure line for deleted prims

## [104.0.7] - 2022-06-01
### Changed
- Add xform support
- Add visibility logic

## [104.0.6] - 2022-05-26
### Fixed
- Fix crash bug

## [104.0.5] - 2022-05-16
### Changed
- Fix stage hierarchy
- Disable picking options for release

## [104.0.4] - 2022-05-09
### Changed
- UI changes
### Added
- Add measure preview when selecting
- Add multiple measure
- Add style controls
### Fixed
- Fix transforms
- Fix min/max
- Bugfixes

## [104.0.3] - 2022-04-08
### Added
- Added new section for measure selected options.
- Added continious measure mode, cursor change and viewport notifications.
- Added units.
### Fixed
- Bugfixes.

## [104.0.2] - 2022-01-16
### Added
- Added witness lines for world axis projection modes.
### Fixed
- Bugfixes.
## [104.0.1] - 2022-01-09
### Added
- Initial build.
