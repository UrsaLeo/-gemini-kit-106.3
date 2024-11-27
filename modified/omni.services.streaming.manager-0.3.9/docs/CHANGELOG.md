# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.9] - 2023-10-04
### Added
- Added test cases to handle streaming menu items.

## [0.3.8] - 2023-03-09
### Changed
- Updated test cases to handle API changes in Kit SDK.

## [0.3.7] - 2023-03-01
### Changed
- Updated base class of test cases from `AsyncTestCaseFailOnLogError` to `AsyncTestCase`.

## [0.3.6] - 2023-01-09
### Changed
- Updated desired render settings for streaming to handle rendering changes in Omniverse Kit 105.0.

## [0.3.5] - 2022-10-07
### Changed
- Changed format of response payload when returning stream health information.

## [0.3.4] - 2022-09-22
### Changed
- Removed the `toggleable` property from the extension, as Kit SDK changed the behavior of the setting leading to a requirement to force-reload the entire application for changes to take effect.

## [0.3.3] - 2022-06-28
### Added
- Added ability to cache responses from the `/streaming/healthcheck` API, in order to allow protection against potentially high volume of requests.

## [0.3.2] - 2022-06-27
### Changed
- Account for `__http_status__` potentially still being named `status` in certain application configurations, due to a breaking change in HTTP/HTTPS transport.

## [0.3.1] - 2022-06-20
### Changed
- Changed tests to look for the `__http_status__` property in responses instead of `status`, due to a breaking change in HTTP/HTTPS transport.

## [0.3.0] - 2022-06-11
### Added
- Added a `/streaming/healthcheck` API to query for the health of the streaming extension currently enabled.

## [0.2.3] - 2022-06-03
### Changed
- Updated extension metadata.

## [0.2.2] - 2022-03-29
### Changed
- Enabled zipping of extension licenses.

## [0.2.1] - 2022-03-05
### Added
- Added unit tests for `StreamMenu`.

## [0.2.0] - 2022-03-05
### Added
- Updated stream interface to include stream URLs in application menu.
### Changed
- Updated inline code documentation for cross-referencing of components when using Sphinx documentation publishing.

## [0.1.1] - 2021-12-12
### Added
- Added more tests.

## [0.1.0] - 2021-12-11
### Added
- Initial commit.
