# WebRTC streaming client service [omni.services.streamclient.webrtc]

## About

After enabling this extension, navigate to this URL to load a single-page web application demonstrating WebRTC streaming capabilities of your Kit instance:

- From Kit: http://localhost:8011/streaming/webrtc-client
- From Create: http://localhost:8111/streaming/webrtc-client
- From Isaac Sim: http://localhost:8211/streaming/webrtc-client
- From Kaolin: http://localhost:8311/streaming/webrtc-client

For convenience, the URLs where the web application is exposed are available from the "Streaming > Local Stream URLs" top-level menu, where they can be copied to the clipboard for sharing.

## Usage

Alternatively, you can also connect to a remote WebRTC streaming instance by providing its public IP address as the `?server=12.345.678.901` query string parameter.

Additional information about the extension and its configuration options can be found online at https://docs.omniverse.nvidia.com/prod_extensions/prod_extensions/ext_livestream/webrtc.html.

## Customizing the Extension

Should you want to customize the livestream front-end experience to suit your needs, follow these steps:
- Enable this extension
- Copy the `web/index.html` page located in this extension's folder into another location on your machine.
- Customize the content of the HTML file to fit your needs, using the API documentation included in the source. To change the size of the Kit instance streamed to the web client, specify a dimension to the `<video>` element in `web/index.html`. For example: `<video id="remote-video" width="1280" height="800"></video>`.

### Notes

The extension prevents the default cursor from being drawn on the Kit instance by setting the `app.window.drawMouse` option to `false` by default. This prevents the mouse cursor from appearing twice in the stream (once being the client cursor, the second being the remote mouse cursor captured from the Kit instance).

Should your experience rely on providing custom cursors to Users, you may wish to do the opposite instead: stream the remote Kit cursor, and hide the browser's cursor.

## Limitations and Known Issues

- Closing the Kit instance while a client is actively using the session may lead to the instance hanging at close.
- Using Google Chrome may result in a better user experience.
- Changing the width and height of the Kit instance after initialization of the frontend client may result in undefined behavior(s).
