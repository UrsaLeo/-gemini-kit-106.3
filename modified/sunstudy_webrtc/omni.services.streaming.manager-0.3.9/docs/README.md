# Streaming Extension Manager [omni.services.streaming.manager]

## About

Extension manager for streaming capabilities, used to ensure that only a single streaming extension can be enabled at any given time in order to:
 * Limit resource consumption on the host
 * Prevent accidental corruption of shared resources if enabling more than one streaming extension
 * Rationalizing settings and configuration common to all streaming workflows, to avoid code duplication.
