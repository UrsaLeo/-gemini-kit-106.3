# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.8] - 2023-08-03
### Changed
- OM-103988: Updated to build with a newer version of Kit 105.0.2

## [1.3.7] - 2023-03-01
### Changed
- Changed base class of test cases from `AsyncTestCaseFailOnLogError` to `AsyncTestCase`.

## [1.3.6] - 2022-06-03
### Changed
- Updated extension metadata.

## [1.3.5] - 2022-03-29
### Changed
- Enabled zipping of extension licenses.

## [1.3.4] - 2022-03-28
### Changed
- Updated extension documentation and metadata.

## [1.3.3] - 2022-03-24
### Changed
- Enabled mouse input handling in a similar way to the traditional Native handlers.

## [1.3.2] - 2022-03-23
### Added
- Updated Kit SDK to leverage the `APP_STARTED` event.

## [1.3.1] - 2022-03-05
### Added
- Added unit tests for `StreamMenu`.

## [1.3.0] - 2022-03-05
### Added
- Updated stream interface to include stream URLs in application menu.

## [1.2.1] - 2021-12-14
### Changed
- Changed UI of the video player to make it fit more adequately the resolution of the remote application.

## [1.2.0] - 2021-12-11
### Added
- Added integration into the Stream Manager feature, to ensure only a single streaming extension can be enabled at any given time.

## [1.1.1] - 2021-12-06
### Added
- Added link to online documentation about the extension, containing additional information about its configuration options.
### Changed
- Updated extension metadata.

## [1.1.0] - 2021-12-05
### Added
- Added ability to provide custom STUN and TURN servers for WebRTC streaming.
- Added additional test coverage for WebRTC streaming.
### Changed
- Changed configuration to disable viewport throttling when main application window is out-of-focus during streaming.

## [1.0.7] - 2021-10-14
### Added
- Added documentation about where to find additional configuration options for the extension.

## [1.0.6] - 2021-09-14
### Fixed
- Format POST requests sent to the WebRTC API to contain the "Content-Type" HTTP Header to "application/json" in order to avoid issues with FastAPI otherwise failing to correctly interpret the request.

## [1.0.5] - 2021-07-21
### Changed
- Added a message to inform Users when it is unlikely that a valid WebRTC server URL was provided.

## [1.0.4] - 2021-05-11
### Changed
- Remove externally-hosted front-end libraries, making the experience entirely self-hosted.

## [1.0.3] - 2021-04-27
### Changed
- Enhanced API documentation.

## [1.0.2] - 2021-04-27
### Changed
- Enhanced logs with location of the WebRTC frontend at startup of the extension.

## [1.0.1] - 2021-04-27
### Changed
- Simplification of minimal API surface to enable the WebRTC livestream experience.

## [1.0.0] - 2021-04-21
### Added
- Initial release.
