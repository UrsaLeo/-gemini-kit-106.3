## CREATE AND LAUNCH CONTAINER IN LINUX

```bash
git clone https://github.com/UrsaLeo/-gemini-kit-106.3.git
cd ./-gemini-kit-106.3
nano tools/containers/entrypoint.sh.j2
```


* In entrypoint.sh.j2, modify public url for turnserver: `turn:<public url>` for both TCP and UDP.
* Run `./repo.sh build`
* Run `./repo.sh package --container --name container_name`
* Install turnserver, if not installed.
* Configure it: `nano /etc/turnserver.conf`. Use this config:

```bash
listening-port=3478
listening-ip=<local ip>
relay-ip=<local ip>
fingerprint
user=admin:admin
lt-cred-mech
realm=<public ip>
total-quota=1000000
cli-password=1234
log-file=/var/tmp/turn.log
min-port=35152
max-port=65535
```
* Launch turnserver: `turnserver -o -c turnserver.conf`
* Check if it is running: `ps aux | grep turnserver`
* Launch vncserver, if you need to check streaming in localhost: `vncserver`

* Run `./repo.sh launch --container`

* if you need to launch app streaming without container, go to `_build/linux-x86_64/release`.
Run `nano ./rtc.sh`. Paste there this code:
```bash
#!/bin/bash
./kit/kit apps/my_company.my_editor.kit \
 --/app/window/dpiScaleOverride=1.0 \
 --/app/livestream/allowResize=true \
 --enable omni.services.streamclient.webrtc \
 --/exts/omni.services.streamclient.webrtc/ice_servers/1/urls/0="turn:<public_ip>:3478?transport=udp" \
 --/exts/omni.services.streamclient.webrtc/ice_servers/1/urls/1="turn:<public_ip>:3478?transport=tcp" \
 --/exts/omni.services.streamclient.webrtc/ice_servers/1/username="admin" \
 --/exts/omni.services.streamclient.webrtc/ice_servers/1/credential="admin" \
 --ext-folder ../../../modified/sunstudy_webrtc \
 --no-window \
 --allow-root
 ```

 Then run `./rtc.sh`