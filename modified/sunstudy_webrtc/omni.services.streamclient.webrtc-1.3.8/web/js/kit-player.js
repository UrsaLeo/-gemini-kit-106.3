!(function (e) {
    var t = {};
    function i(s) {
        if (t[s]) return t[s].exports;
        var n = (t[s] = { i: s, l: !1, exports: {} });
        return e[s].call(n.exports, n, n.exports, i), (n.l = !0), n.exports;
    }
    (i.m = e),
        (i.c = t),
        (i.d = function (e, t, s) {
            i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: s });
        }),
        (i.r = function (e) {
            "undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
                Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (i.t = function (e, t) {
            if ((1 & t && (e = i(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var s = Object.create(null);
            if (
                (i.r(s),
                Object.defineProperty(s, "default", { enumerable: !0, value: e }),
                2 & t && "string" != typeof e)
            )
                for (var n in e)
                    i.d(
                        s,
                        n,
                        function (t) {
                            return e[t];
                        }.bind(null, n)
                    );
            return s;
        }),
        (i.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return i.d(t, "a", t), t;
        }),
        (i.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (i.p = ""),
        i((i.s = 26));
})([
    ,
    ,
    ,
    ,
    ,
    /*!************************************!*\
  !*** ./ragnarok-core/src/utils.ts ***!
  \************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./logger */ 6),
            n = i(/*! ./version */ 19),
            r = i(/*! ./genversion */ 29),
            o = i(/*! ./settings */ 8);
        function a(e) {
            return "0x" + ("00000000" + e.toString(16).toUpperCase()).slice(-8);
        }
        function d() {
            return !!window.yandex || /YaBrowser/.test(navigator.userAgent);
        }
        function h() {
            return !!window.chrome;
        }
        function l() {
            const e = h(),
                t = window.navigator,
                i = t.vendor,
                s = t.userAgent.indexOf("OPR") > -1;
            return !!t.userAgent.match("CriOS") || (null != e && "Google Inc." === i && !1 === s && !v() && !d());
        }
        function c() {
            return /^(?!.*chrome).*safari/i.test(navigator.userAgent);
        }
        function u() {
            return /iPhone|iPod/.test(navigator.userAgent);
        }
        function m() {
            return c() && !u() && b();
        }
        function g() {
            return c() && b();
        }
        function p() {
            return window.webOSSystem || /NetCast|Web0S|WebOS/.test(navigator.userAgent);
        }
        function A() {
            return /^(?!.*(?:Quest|Android)).*SamsungBrowser/.test(navigator.userAgent);
        }
        function v() {
            return /Edg/.test(navigator.userAgent);
        }
        (t.IsValidIPv4 = function (e) {
            return !!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                e
            );
        }),
            (t.GetRandNumericString = function (e) {
                let t = 1;
                for (let i = 1; i < e; i++) t *= 10;
                let i = "" + Math.floor(Math.random() * t);
                return (i = i.padEnd(e, "0")), i;
            }),
            (t.GetHexString = a),
            (t.IsYandex = d),
            (t.IsChromium = h),
            (t.IsChrome = l),
            (t.IsSafari = c),
            (t.IsiPhone = u),
            (t.IsiPad = m),
            (t.IsiOS = g),
            (t.IsWebOS = p),
            (t.IsTizen = A),
            (t.IsIEdge = v),
            (t.DefaultHttpRequestOptions = { method: "GET", headers: {}, body: "", retryCount: 0, timeout: 0 }),
            (t.performHttpRequest = function (e, i = t.DefaultHttpRequestOptions, n, r) {
                var o;
                let a = void 0 === i.retryCount ? 1 : i.retryCount + 1;
                const d = a;
                let h = !1,
                    l = void 0;
                const c = null !== (o = i.backOffDelay) && void 0 !== o ? o : 500;
                let u = c;
                const m = new Promise((t, o) => {
                    const m = (e) => {
                            (l = void 0), o(e);
                        },
                        g = () => m({ aborted: !0, retries: d - a - 1 }),
                        p = () => {
                            if (h) return void g();
                            let o = new XMLHttpRequest();
                            o.onreadystatechange = () => {
                                var e;
                                h
                                    ? g()
                                    : 4 == o.readyState &&
                                      (a--,
                                      0 == o.status
                                          ? a > 0
                                              ? (s.Log.d("utils", "Network error, retries left: " + a),
                                                window.setTimeout(p, u),
                                                (u += c))
                                              : m({ code: 3237089282, retries: d - a - 1 })
                                          : ((e = { status: o.status, data: o.responseText, retries: d - a - 1 }),
                                            (l = void 0),
                                            t(e)));
                            };
                            const A = () => {
                                    var t, s;
                                    o.open(null !== (t = i.method) && void 0 !== t ? t : "GET", e, !0),
                                        i.timeout && (o.timeout = i.timeout),
                                        void 0 !== i.headers &&
                                            Object.keys(i.headers).forEach((e) => {
                                                o.setRequestHeader(e, i.headers[e]);
                                            }),
                                        navigator.onLine
                                            ? ((l = () => o.abort()),
                                              o.send(null !== (s = i.body) && void 0 !== s ? s : ""))
                                            : m({ code: 3237089281, description: "No network", retries: d - a - 1 });
                                },
                                v = (e, t) => {
                                    if (t) {
                                        i.headers = i.headers || {};
                                        let s = e + t;
                                        i.headers.Authorization = s;
                                    }
                                    A();
                                };
                            if (r)
                                switch (r.type) {
                                    case 0:
                                        void 0 !== n && n
                                            ? n().then(
                                                  (e) => {
                                                      v("JarvisAuth auth=", e);
                                                  },
                                                  () => {
                                                      m({
                                                          code: 3237093377,
                                                          description: "Auth token not updated",
                                                          retries: d - a - 1,
                                                      });
                                                  }
                                              )
                                            : A();
                                        break;
                                    case 1:
                                        v("GFNJWT ", r.token);
                                        break;
                                    case 2:
                                        v("GFNPartnerJWT auth=", r.token);
                                }
                            else A();
                        };
                    p();
                });
                return Object.assign(m, {
                    abort: () => {
                        (h = !0), null == l || l();
                    },
                });
            }),
            (t.CLIENT_VERSION = "16.0"),
            (t.CLIENT_IDENTIFICATION = "GFN-PC");
        let f = void 0;
        function S() {
            return (
                f ||
                    (f = (function () {
                        let e = "Unknown",
                            t = "Unknown";
                        try {
                            if (navigator.platform.includes("Win")) {
                                e = "Windows";
                                let i = navigator.userAgent;
                                switch (i.substring(i.indexOf("(") + 1, i.indexOf(";"))) {
                                    case "Win16":
                                        t = "3.11";
                                        break;
                                    case "Windows 95":
                                    case "Win95":
                                    case "Windows_95":
                                        t = "95";
                                        break;
                                    case "Windows 98":
                                    case "Win98":
                                        t = "98";
                                        break;
                                    case "Windows NT 5.0":
                                    case "Windows 2000":
                                        t = "2000";
                                        break;
                                    case "Windows NT 5.1":
                                    case "Windows XP":
                                        t = "XP";
                                        break;
                                    case "Windows NT 5.2":
                                        t = "Server 2003";
                                        break;
                                    case "Windows NT 6.0":
                                        t = "Vista";
                                        break;
                                    case "Windows NT 6.1":
                                        t = "7";
                                        break;
                                    case "Windows NT 6.2":
                                    case "WOW64":
                                        t = "8";
                                        break;
                                    case "Windows 10.0":
                                    case "Windows NT 10.0":
                                        t = "10";
                                        break;
                                    case "Windows NT 4.0":
                                    case "WinNT4.0":
                                    case "WinNT":
                                    case "Windows NT":
                                        t = "NT 4.0";
                                        break;
                                    case "Windows ME":
                                        t = "ME";
                                }
                            } else if (g()) {
                                e = "iOS";
                                let i = navigator.userAgent.split(" ");
                                i.length > 5 && "OS" === i[4] && (t = i[5]);
                            } else if (navigator.platform.includes("Mac")) {
                                e = "MacOSX";
                                let i = navigator.userAgent,
                                    s = i.substring(0, i.indexOf(")"));
                                t = s.substring(s.lastIndexOf(" ") + 1);
                            } else if (navigator.userAgent.includes("CrOS") || navigator.platform.includes("Chrom")) {
                                e = "ChromeOS";
                                let i = navigator.userAgent,
                                    s = i.substring(0, i.indexOf(")"));
                                t = s.substring(s.lastIndexOf(" ") + 1);
                            } else if (p()) {
                                if (((e = "WebOS"), window.webOSSystem)) {
                                    t = JSON.parse(window.webOSSystem.deviceInfo).platformVersion;
                                }
                            } else
                                A()
                                    ? (e = "Tizen")
                                    : (navigator.platform.includes("Linux") || navigator.platform.includes("Ubuntu")) &&
                                      (e = "Linux");
                        } catch (e) {
                            s.Log.e("utils", "Exception in getting useragent: ", e);
                        }
                        return { name: e, version: t };
                    })()),
                f
            );
        }
        t.getPlatform = S;
        let w = void 0;
        function C() {
            return (
                w ||
                    (w = (function () {
                        let e = "Unknown",
                            t = "Unknown";
                        try {
                            if (l()) {
                                e = "Chrome";
                                const i = navigator.userAgent.match(/(?:Chrome|CriOS)\/([^ ]*)/);
                                i && (t = i[1]);
                            } else if (c()) {
                                e = "Safari";
                                const i = navigator.userAgent.match(/Version\/([^ ]*).*?Safari\/([^ ]*)/);
                                if (i) {
                                    t = i[1];
                                    return { name: e, version: t, webkit: i[2] };
                                }
                            } else if (d()) {
                                e = "Yandex";
                                const i = navigator.userAgent.match(/YaBrowser\/([^ ]*)/);
                                i && (t = i[1]);
                            } else if (v()) {
                                e = "Edge";
                                const i = navigator.userAgent.match(/(?:Edge|Edg)\/([^ ]*)/);
                                i && (t = i[1]);
                            }
                        } catch (e) {
                            s.Log.e("utils", "Exception in getting browser: ", e);
                        }
                        return { name: e, version: t };
                    })()),
                w
            );
        }
        function b() {
            var e, t;
            return null ===
                (t = null === (e = window.matchMedia) || void 0 === e ? void 0 : e.call(window, "(pointer:coarse)")) ||
                void 0 === t
                ? void 0
                : t.matches;
        }
        function E(e, t) {
            for (let i = 0; i < t.length && i < e.length; ++i) {
                const s = e[i],
                    n = t[i];
                if (s > n) return !0;
                if (s < n) return !1;
            }
            return !0;
        }
        function I(e) {
            return e[0] < e[1] ? [e[1], e[0]] : e;
        }
        function y(e, t, i, s, n) {
            if (t) {
                let [e, t] = I([s, n]);
                return e / t > 2 ? { width: 1376, height: 640 } : { width: 1280, height: 720 };
            }
            if (i) {
                if (0 != e) return { width: 1024, height: 768 };
                let [t, i] = I([s, n]);
                return t <= 1024
                    ? { width: 1024, height: 768 }
                    : t < 1366
                    ? { width: 1112, height: 834 }
                    : { width: 1600, height: 1200 };
            }
            {
                const t = [
                        [1920, 1200],
                        [1920, 1080],
                        [1280, 1024],
                        [1600, 1200],
                    ],
                    i = [
                        [1280, 800],
                        [1280, 720],
                        [1280, 1024],
                        [1024, 768],
                    ];
                let r = [s, n];
                return (
                    (r = (function (e, t) {
                        if (0 == t.length) return e;
                        class i {
                            constructor(e, t) {
                                (this.w = e), (this.h = t), (this.a = e / t);
                            }
                            clip(e) {
                                return Math.abs(e.a - this.a) < 0.05
                                    ? e
                                    : e.a > this.a
                                    ? new i(Math.floor(e.w * (this.a / e.a)), e.h)
                                    : new i(e.w, Math.floor(e.h * (e.a / this.a)));
                            }
                            toTuple() {
                                return [this.w, this.h];
                            }
                        }
                        const s = t.map((e) => new i(e[0], e[1])),
                            n = new i(e[0], e[1]);
                        let r = s[0];
                        for (let e = 1; e < s.length; e++) {
                            let t = s[e];
                            Math.abs(n.a - t.a) < Math.abs(n.a - r.a) && (r = t);
                        }
                        const o = r.clip(n);
                        return o.w > r.w ? r.toTuple() : o.toTuple();
                    })(r, 0 == e ? t : i)),
                    { width: r[0], height: r[1] }
                );
            }
        }
        function k() {
            return c()
                ? (getComputedStyle(document.documentElement).getPropertyValue("--sat") ||
                      (document.documentElement.style.setProperty("--sat", "env(safe-area-inset-top)"),
                      document.documentElement.style.setProperty("--sar", "env(safe-area-inset-right)"),
                      document.documentElement.style.setProperty("--sab", "env(safe-area-inset-bottom)"),
                      document.documentElement.style.setProperty("--sal", "env(safe-area-inset-left)")),
                  {
                      top: parseInt(getComputedStyle(document.documentElement).getPropertyValue("--sat")),
                      left: parseInt(getComputedStyle(document.documentElement).getPropertyValue("--sal")),
                      bottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue("--sab")),
                      right: parseInt(getComputedStyle(document.documentElement).getPropertyValue("--sar")),
                  })
                : { top: 0, left: 0, bottom: 0, right: 0 };
        }
        function T(e, t, i) {
            return e < t ? t : e > i ? i : e;
        }
        (t.getBrowser = C),
            (t.getAppUserAgent = function () {
                const e = t.CLIENT_IDENTIFICATION,
                    i = t.CLIENT_VERSION,
                    s = S(),
                    o = C();
                return (
                    e +
                    "/" +
                    i +
                    " (WebRTC) Ragnarok/" +
                    r.version +
                    " " +
                    s.name +
                    "/" +
                    s.version +
                    " " +
                    o.name +
                    "/" +
                    o.version +
                    " (" +
                    n.CHANGELIST +
                    ")"
                );
            }),
            (t.IsTouchDevice = b),
            (t.IsTouchCapable = function () {
                var e, t;
                return (
                    !!window.TouchEvent &&
                    (null ===
                        (t =
                            null === (e = window.matchMedia) || void 0 === e
                                ? void 0
                                : e.call(window, "(any-pointer:coarse)")) || void 0 === t
                        ? void 0
                        : t.matches)
                );
            }),
            (t.IsTV = function () {
                const e = S().name;
                return "Tizen" === e || "WebOS" === e;
            }),
            (t.getNewGuid = function () {
                let e = new Uint8Array(36);
                window.crypto.getRandomValues(e);
                let t = "";
                for (let i = 0; i < 36; i++) {
                    let s = e[i] % 16;
                    8 == i || 13 == i || 18 == i || 23 == i
                        ? (t += "-")
                        : 14 == i
                        ? (t += "4")
                        : 19 == i
                        ? ((s = (3 & s) | 8), (t += s.toString(16)))
                        : (t += s.toString(16));
                }
                return t;
            }),
            (t.isChromeVersionAtLeast = function (e, t, i, n, r) {
                if ("Chrome" != e.name) return !1;
                const o = [t, null != i ? i : 0, null != n ? n : 0, null != r ? r : 0];
                try {
                    return E(
                        e.version.split(".").map((e) => Number.parseInt(e)),
                        o
                    );
                } catch (e) {
                    s.Log.w("utils", "Failed to parse Chrome version");
                }
                return !0;
            }),
            (t.isSafariVersionAtLeast = function (e, t, i, n) {
                if ("Safari" != e.name) return !1;
                const r = [t, null != i ? i : 0, null != n ? n : 0];
                try {
                    return E(
                        e.version.split(".").map((e) => Number.parseInt(e)),
                        r
                    );
                } catch (e) {
                    s.Log.w("utils", "Failed to parse Safari application version");
                }
                return !0;
            }),
            (t.isSafariWebKitVersionAtLeast = function (e, t, i, n) {
                if ("Safari" != e.name || !e.webkit) return !1;
                const r = [t, null != i ? i : 0, null != n ? n : 0];
                try {
                    return E(
                        e.webkit.split(".").map((e) => Number.parseInt(e)),
                        r
                    );
                } catch (e) {
                    s.Log.w("utils", "Failed to parse Safari WebKit version");
                }
                return !0;
            }),
            (t.customFetch = function (e, t = 500, i = {}) {
                const s = new AbortController();
                return (
                    window.setTimeout(() => {
                        s.abort();
                    }, t),
                    fetch(e, Object.assign(Object.assign({}, i), { signal: s.signal }))
                        .then((e) => e)
                        .catch((e) => {
                            throw e;
                        })
                );
            }),
            (t.ChooseStreamingResolutionImpl = y),
            (t.ChooseStreamingResolution = function (e = 0) {
                return y(e, u(), m(), screen.width, screen.height);
            }),
            (t.GetSafeAreas = k),
            (t.WarpTouch = function (e) {
                let t = k();
                (t.top = Math.max(t.top, 21)), (t.bottom = T(t.bottom, 0, 10));
                let i = { x: e.clientX, y: e.clientY },
                    s = 0.5;
                if (t.top > 0 && e.clientY - e.radiusY < t.top) {
                    const i = e.clientY - Math.min(e.radiusY, 21);
                    let n = (t.top - i) / e.radiusY;
                    (n = T(n, 0, 1)), (s -= n * n * 0.5);
                } else if (t.bottom > 0 && e.clientY + e.radiusY > window.innerHeight - t.bottom) {
                    let i = (e.clientY + Math.min(e.radiusY, 10) - (window.innerHeight - t.bottom)) / e.radiusY;
                    (i = T(i, 0, 1)), (s += i * i * 0.5);
                }
                return (i.y = T(i.y - e.radiusY + 2 * s * e.radiusY, 0, window.innerHeight)), i;
            }),
            (t.convertErrorOnConnectivityTest = function (e) {
                let t = e;
                if (
                    o.RagnarokSettings.ragnarokConfig.offlineErrorsStreaming &&
                    o.RagnarokSettings.ragnarokConfig.offlineErrorsStreaming.includes(a(e))
                )
                    t = 15868418;
                else if (
                    o.RagnarokSettings.ragnarokConfig.offlineErrorsSessionSetup &&
                    o.RagnarokSettings.ragnarokConfig.offlineErrorsSessionSetup.includes(a(e))
                )
                    t = 15868417;
                else
                    switch (e) {
                        case 3237093906:
                        case 3237093899:
                            t = 15868418;
                            break;
                        case 3237089282:
                            t = 15868417;
                    }
                return t !== e && s.Log.i("utils", "Connectivity test errorCode changed " + a(e) + "->" + a(t)), t;
            }),
            (t.convertErrorOnSleep = function (e) {
                let t = e;
                if (
                    o.RagnarokSettings.ragnarokConfig.sleepErrorsStreaming &&
                    o.RagnarokSettings.ragnarokConfig.sleepErrorsStreaming.includes(a(e))
                )
                    t = 15867908;
                else if (
                    o.RagnarokSettings.ragnarokConfig.sleepErrorsSessionSetup &&
                    o.RagnarokSettings.ragnarokConfig.sleepErrorsSessionSetup.includes(a(e))
                )
                    t = 15867909;
                else
                    switch (e) {
                        case 3237093906:
                            g() && (t = 15867908);
                            break;
                        case 3237093654:
                            t = 15867909;
                    }
                return t !== e && s.Log.i("utils", "ErrorCode changed " + a(e) + "->" + a(t)), t;
            }),
            (t.shouldRunConnectivityTest = function (e) {
                let t = !0;
                switch (e) {
                    case 0:
                    case 15868704:
                    case 15867905:
                    case 15867906:
                    case 15867908:
                    case 15867909:
                        t = !1;
                }
                return t;
            }),
            (t.setUint64 = function (e, t, i, s, n = 1) {
                const r = 4294967295 & Math.floor(e * n),
                    o = Math.floor((e / 4294967296) * n);
                s
                    ? (t.setUint32(i, r, !0), t.setUint32(i + 4, o, !0))
                    : (t.setUint32(i, o, !1), t.setUint32(i + 4, r, !1));
            }),
            (t.getUint64 = function (e, t, i) {
                let s = 0,
                    n = 0;
                return (
                    i
                        ? ((s = e.getUint32(t, !0)), (n = e.getUint32(t + 4, !0)))
                        : ((n = e.getUint32(t, !1)), (s = e.getUint32(t + 4, !1))),
                    4294967296 * n + s
                );
            }),
            (t.canResume = function (e) {
                let t = !1;
                switch (e) {
                    case 3237093896:
                    case 3237093897:
                    case 3237093898:
                    case 3237093906:
                    case 3237093899:
                    case 3237093901:
                    case 15868418:
                        t = !0;
                        break;
                    case 15867908:
                        g() && (t = !0);
                }
                return t;
            });
    },
    /*!*************************************!*\
  !*** ./ragnarok-core/src/logger.ts ***!
  \*************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./settings */ 8);
        class n {
            constructor() {
                (this.eventEmitter = null),
                    (this._nop = (e, t, ...i) => {}),
                    (this._d = (e, t, ...i) => this.emitLogMsg("DEBUG", e, t, i)),
                    (this._i = (e, t, ...i) => this.emitLogMsg("INFO", e, t, i)),
                    (this._w = (e, t, ...i) => this.emitLogMsg("WARN", e, t, i)),
                    (this._e = (e, t, ...i) => this.emitLogMsg("ERROR", e, t, i)),
                    (this._nopf = (e, ...t) => ""),
                    (this._f = (e, ...t) => this.formatString(e, ...t));
            }
            initLogger(e) {
                this.eventEmitter = e;
            }
            get d() {
                return s.RagnarokSettings.consoleLoggingEnabled
                    ? console.debug.bind(console, "%s DEBUG [%s] %s@@", this.renderDate(new Date()))
                    : s.RagnarokSettings.loggingEnabled
                    ? this._d
                    : this._nop;
            }
            get w() {
                return s.RagnarokSettings.consoleLoggingEnabled
                    ? console.warn.bind(console, "%s WARN  [%s] %s@@", this.renderDate(new Date()))
                    : s.RagnarokSettings.loggingEnabled
                    ? this._w
                    : this._nop;
            }
            get i() {
                return s.RagnarokSettings.consoleLoggingEnabled
                    ? console.info.bind(console, "%s INFO  [%s] %s@@", this.renderDate(new Date()))
                    : s.RagnarokSettings.loggingEnabled
                    ? this._i
                    : this._nop;
            }
            get e() {
                return s.RagnarokSettings.consoleLoggingEnabled
                    ? console.error.bind(console, "%s ERROR [%s] %s@@", this.renderDate(new Date()))
                    : this._e;
            }
            get format() {
                return this._f;
            }
            commit(e) {
                this.eventEmitter && this.eventEmitter.emit("Log", e);
            }
            stringifyArgs(...e) {
                return e.length ? "##" + JSON.stringify(e) : "";
            }
            formatString(e, ...t) {
                return e.replace(/{(\d+)}/g, function (e, i, s, n) {
                    return void 0 !== t[i] ? t[i] : e;
                });
            }
            emitLogMsg(e, t, i, s) {
                let n = `${i}${this.stringifyArgs(...s)}`,
                    r = { timeStamp: this.renderDate(new Date()), logLevel: e, logtag: "R/" + t, logstr: n };
                this.commit(r);
            }
            renderDate(e) {
                const t = (e, t, i) => {
                    const s = t - e.length;
                    if (s > 0) {
                        let t = "";
                        for (let e = 0; e < s; e++) t += i;
                        return (t += e), t;
                    }
                    return e;
                };
                let i = "";
                return (
                    (i =
                        t(e.getFullYear().toString(), 4, "0") +
                        "-" +
                        ((e) => t((e.getMonth() + 1).toString(), 2, "0"))(e) +
                        "-" +
                        ((e) => t(e.getDate().toString(), 2, "0"))(e) +
                        " " +
                        ((e) => t(e.getHours().toString(), 2, "0"))(e) +
                        ":" +
                        ((e) => t(e.getMinutes().toString(), 2, "0"))(e) +
                        ":" +
                        ((e) => t(e.getSeconds().toString(), 2, "0"))(e) +
                        "." +
                        ((e) => t(e.getMilliseconds().toString(), 3, "0"))(e)),
                    i
                );
            }
        }
        (t.LogImpl = n), (t.Log = new n());
    },
    ,
    /*!***************************************!*\
  !*** ./ragnarok-core/src/settings.ts ***!
  \***************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.RagnarokSettings = {
                ragnarokConfig: {},
                commonConfig: {},
                clientConfigOverride: "",
                devMode: !1,
                leanMode: !1,
                loggingEnabled: !0,
                consoleLoggingEnabled: !1,
                gamepadEnabled: !0,
                webrtcStatsEnabled: !0,
                statsUploadEnabled: !0,
                micEnabled: !0,
                maxBitrate: 0,
                resWidth: 0,
                resHeight: 0,
                gamepadRaf: !1,
                gamepadPollInterval: 4,
                webSocketSignaling: !0,
                advancedGestures: !0,
                forceTouchCapable: !1,
                touchLaunchMode: 0,
                touchWarp: !0,
                latencyTest: !1,
                gamepadTesterEnabled: !1,
            }),
            (t.ConfigureRagnarokSettings = function (e) {
                var i, s, n, r, o, a, d, h, l, c, u, m, g, p, A, v, f, S;
                if (
                    (e.clientConfigOverride && (t.RagnarokSettings.clientConfigOverride = e.clientConfigOverride),
                    e.remoteConfigData &&
                        (e.remoteConfigData.ragnarok &&
                            ((t.RagnarokSettings.ragnarokConfig = JSON.parse(e.remoteConfigData.ragnarok)),
                            (t.RagnarokSettings.webSocketSignaling =
                                null !== (i = t.RagnarokSettings.ragnarokConfig.webSocketSignaling) && void 0 !== i
                                    ? i
                                    : t.RagnarokSettings.webSocketSignaling)),
                        e.remoteConfigData.common &&
                            (t.RagnarokSettings.commonConfig = JSON.parse(e.remoteConfigData.common))),
                    e.overrideData)
                ) {
                    const i = e.overrideData.toLowerCase(),
                        w = new URLSearchParams(i);
                    "lean" === w.get("mode")
                        ? ((t.RagnarokSettings.leanMode = !0),
                          (t.RagnarokSettings.loggingEnabled = !1),
                          (t.RagnarokSettings.gamepadEnabled = !1),
                          (t.RagnarokSettings.webrtcStatsEnabled = !1),
                          (t.RagnarokSettings.statsUploadEnabled = !1),
                          (t.RagnarokSettings.micEnabled = !1),
                          (t.RagnarokSettings.devMode = !0))
                        : "dev" === w.get("mode") && (t.RagnarokSettings.devMode = !0);
                    const C = (e) =>
                            (function (e) {
                                if (e)
                                    switch (e) {
                                        case "enable":
                                        case "on":
                                        case "1":
                                        case "true":
                                            return !0;
                                        case "disable":
                                        case "off":
                                        case "0":
                                        case "false":
                                            return !1;
                                    }
                            })(w.get(e)),
                        b = (e) =>
                            (function (e) {
                                if (e) {
                                    const t = Number.parseInt(e);
                                    if (!Number.isNaN(t)) return t;
                                }
                            })(w.get(e));
                    (t.RagnarokSettings.loggingEnabled =
                        null !== (s = C("log")) && void 0 !== s ? s : t.RagnarokSettings.loggingEnabled),
                        (t.RagnarokSettings.consoleLoggingEnabled =
                            t.RagnarokSettings.loggingEnabled &&
                            (null !== (n = C("console")) && void 0 !== n
                                ? n
                                : t.RagnarokSettings.consoleLoggingEnabled)),
                        (t.RagnarokSettings.gamepadEnabled =
                            null !== (r = C("gamepad")) && void 0 !== r ? r : t.RagnarokSettings.gamepadEnabled),
                        (t.RagnarokSettings.webrtcStatsEnabled =
                            null !== (o = C("webrtcstats")) && void 0 !== o
                                ? o
                                : t.RagnarokSettings.webrtcStatsEnabled),
                        (t.RagnarokSettings.statsUploadEnabled =
                            null !== (a = C("statsupload")) && void 0 !== a
                                ? a
                                : t.RagnarokSettings.statsUploadEnabled),
                        (t.RagnarokSettings.micEnabled =
                            null !== (d = C("mic")) && void 0 !== d ? d : t.RagnarokSettings.micEnabled),
                        (t.RagnarokSettings.mouseFilter =
                            null !== (h = C("mousefilter")) && void 0 !== h ? h : t.RagnarokSettings.mouseFilter),
                        (t.RagnarokSettings.unadjustedMovement =
                            null !== (l = C("unadjustedmovement")) && void 0 !== l
                                ? l
                                : t.RagnarokSettings.unadjustedMovement),
                        (t.RagnarokSettings.maxBitrate =
                            null !== (c = b("maxbitrate")) && void 0 !== c ? c : t.RagnarokSettings.maxBitrate),
                        (t.RagnarokSettings.gamepadTesterEnabled =
                            null !== (u = C("gamepadtest")) && void 0 !== u
                                ? u
                                : t.RagnarokSettings.gamepadTesterEnabled);
                    const E = w.get("resolution");
                    if (E) {
                        const e = E.split("x");
                        if (2 == e.length) {
                            const i = parseInt(e[0]),
                                s = parseInt(e[1]);
                            i && s
                                ? ((t.RagnarokSettings.resWidth = i), (t.RagnarokSettings.resHeight = s))
                                : console.log("Invalid resolution in query param: " + E);
                        } else console.log("Invalid resolution in query param: " + E);
                    }
                    (t.RagnarokSettings.gamepadRaf =
                        null !== (m = C("gamepadraf")) && void 0 !== m ? m : t.RagnarokSettings.gamepadRaf),
                        (t.RagnarokSettings.gamepadPollInterval =
                            null !== (g = b("gamepadpoll")) && void 0 !== g
                                ? g
                                : t.RagnarokSettings.gamepadPollInterval),
                        (t.RagnarokSettings.webSocketSignaling =
                            null !== (p = C("websocketsignaling")) && void 0 !== p
                                ? p
                                : t.RagnarokSettings.webSocketSignaling),
                        (t.RagnarokSettings.advancedGestures =
                            null !== (A = C("advancedgestures")) && void 0 !== A
                                ? A
                                : t.RagnarokSettings.advancedGestures),
                        (t.RagnarokSettings.forceTouchCapable =
                            null !== (v = C("forcetouchdevice")) && void 0 !== v
                                ? v
                                : t.RagnarokSettings.forceTouchCapable);
                    const I = C("touchlaunch");
                    void 0 !== I && (t.RagnarokSettings.touchLaunchMode = I ? 1 : 2);
                    let y = C("touch");
                    void 0 !== y &&
                        ((t.RagnarokSettings.touchLaunchMode = y ? 1 : 2), (t.RagnarokSettings.forceTouchCapable = y)),
                        (t.RagnarokSettings.touchWarp =
                            null !== (f = C("touchwarp")) && void 0 !== f ? f : t.RagnarokSettings.touchWarp),
                        (t.RagnarokSettings.latencyTest =
                            null !== (S = C("latency")) && void 0 !== S ? S : t.RagnarokSettings.latencyTest);
                }
            });
    },
    /*!****************************************!*\
  !*** ./ragnarok-core/src/analytics.ts ***!
  \****************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./utils */ 5);
        (t.getRagnarokExceptionEvent = function (e, t, i, s, n, r, o, a, d) {
            return {
                name: "Ragnarok_Exception_Event",
                gdprLevel: "technical",
                sessionId: e,
                subSessionId: t,
                message: i,
                stacktrace: s,
                filename: n,
                lineno: r,
                colno: o,
                handled: a ? "TRUE" : "FALSE",
                category: null != d ? d : "",
            };
        }),
            (t.getRagnarokHttpEvent = function (e, t, i, s) {
                return {
                    name: "Ragnarok_Http_Event",
                    gdprLevel: "functional",
                    url: e,
                    verb: t,
                    statusCode: "0",
                    requestStatusCode: "",
                    sessionId: i,
                    subSessionId: s,
                    requestId: "",
                    serverId: "",
                    callDuration: 0,
                };
            }),
            (t.getRagnarokStreamExitEvent = function (e, t, i, n, r, o, a, d) {
                return {
                    name: "Ragnarok_Stream_Exit_Event",
                    gdprLevel: "functional",
                    result: e.error ? s.GetHexString(e.error.code) : s.GetHexString(0),
                    sessionId: e.sessionId,
                    subSessionId: e.subSessionId,
                    zoneAddress: t,
                    streamDuration: Math.round(i),
                    frameCount: n,
                    isResume: o,
                    codec: r,
                    connectivity: null != a ? a : "undefined",
                    sleep: null != d ? d : "UNDEFINED",
                };
            }),
            (t.getRagnarokDebugEvent = function (e, t, i, s, n, r, o) {
                return {
                    name: "Ragnarok_Debug_Event",
                    gdprLevel: "technical",
                    sessionId: e,
                    subSessionId: t,
                    key1: null != i ? i : "",
                    key2: null != s ? s : "",
                    key3: null != n ? n : "",
                    key4: null != r ? r : "",
                    key5: null != o ? o : "",
                };
            }),
            (t.getRagnarokSleepEvent = function (e, t, i, s, n, r) {
                return {
                    name: "Ragnarok_Sleep_Event",
                    gdprLevel: "technical",
                    sessionId: e,
                    subSessionId: t,
                    error: i,
                    sleepTime: s,
                    timeToSleep: n,
                    eventSequence: r,
                };
            }),
            (t.getClientMetricEvent = function (e, t, i, s, n, r, o, a) {
                return {
                    name: "ClientMetricEvent",
                    gdprLevel: "technical",
                    module: "Ragnarok",
                    sessionId: e,
                    subSessionId: t,
                    metricName: i,
                    valueString: s,
                    valueDouble: n,
                    valueInt1: r,
                    valueInt2: o,
                    valueInt3: a,
                };
            });
    },
    /*!***********************************************!*\
  !*** ./ragnarok-core/src/latencyindicator.ts ***!
  \***********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./utils */ 5);
        class n {
            constructor() {
                (this.indicatorContext = null), (this.currentColor = "");
            }
            static getInstance() {
                return n.singleton || (n.singleton = new n()), n.singleton;
            }
            initialize(e) {
                (this.indicatorElement = this.createLatencyIndicator(e)),
                    (this.indicatorElement.style.display = "block"),
                    (this.indicatorContext = this.indicatorElement.getContext("webgl")),
                    this.toggleIndicator();
            }
            toggleIndicator() {
                "white" === this.currentColor ? this.renderRed() : this.renderWhite();
            }
            createLatencyIndicator(e) {
                let t = "ragnarok-latency-indicator",
                    i = document.getElementById(t);
                if (i && i instanceof HTMLCanvasElement && i.parentElement === e.parentElement) return i;
                {
                    if (i)
                        do {
                            (t = "ragnarok-latency-indicator" + Math.round(1e4 * Math.random())),
                                (i = document.getElementById(t));
                        } while (i);
                    let n = document.createElement("canvas");
                    return (
                        (n.id = t),
                        (n.style.position = "fixed"),
                        s.IsiOS()
                            ? ((n.style.bottom = "env(safe-area-inset-bottom, 0)"),
                              (n.style.right = "max(24px, env(safe-area-inset-right, 0))"))
                            : ((n.style.bottom = "0"), (n.style.right = "0")),
                        (n.style.width = "40px"),
                        (n.style.height = "40px"),
                        (n.style.zIndex = "300"),
                        (n.style.pointerEvents = "none"),
                        e.insertAdjacentElement("afterend", n),
                        n
                    );
                }
            }
            renderWhite() {
                this.indicatorContext &&
                    (this.indicatorContext.clearColor(1, 1, 1, 1),
                    this.indicatorContext.clear(this.indicatorContext.COLOR_BUFFER_BIT),
                    (this.currentColor = "white"));
            }
            renderRed() {
                this.indicatorContext &&
                    (this.indicatorContext.clearColor(1, 0, 0, 1),
                    this.indicatorContext.clear(this.indicatorContext.COLOR_BUFFER_BIT),
                    (this.currentColor = "red"));
            }
        }
        t.LatencyIndicator = n;
    },
    ,
    /*!***********************************************!*\
  !*** ./ragnarok-core/src/ragnarokprofiler.ts ***!
  \***********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./logger */ 6),
            n = "RProfiler";
        class r {
            constructor() {
                (this.profiling = !1),
                    (this.rworker = null),
                    (this.streamBeginTs = 0),
                    (this.wsHandler = null),
                    (this.pendingErrors = []),
                    (this.perf = { RAFTS: 0, DCSend: 0, GetStats: 0, FrameInfo: 0 });
                try {
                    (this.rworker = new Worker("./js/ragnarokworker.js")),
                        (this.rworker.onmessage = this.onWorkerMessage.bind(this)),
                        (this.rworker.onerror = this.onWorkerError.bind(this));
                } catch (e) {
                    console.log("Creation of worker failed: exception" + e.message);
                }
            }
            startWebSocket(e, t) {
                this.wsHandler = t;
                let i = { startWebSocket: { signInURL: e } };
                this.rworker && (this.rworker.postMessage(i), s.Log.d(n, "starting web socket"));
            }
            stopWebSocket() {
                let e = { stopWebSocket: !0 };
                this.rworker && (s.Log.d(n, "stopping web socket"), this.rworker.postMessage(e)),
                    (this.wsHandler = null);
            }
            initialize(e, t) {
                if (((this.telemetry = t), this.pendingErrors.length > 0)) {
                    for (const e of this.pendingErrors) this.emitError(e);
                    this.pendingErrors = [];
                }
                if (
                    ((this.profiling = !1),
                    this.resetPerf(),
                    0 === this.streamBeginTs && this.updateStreamTime(),
                    this.rworker)
                ) {
                    let t = { initMessage: { sessionId: e } };
                    this.rworker.postMessage(t), s.Log.d(n, "Initializing ragnarok worker");
                } else s.Log.e(n, "Worker creation has failed, cannot initialize");
            }
            deinitialize() {
                this.telemetry = void 0;
            }
            startProfiling(e, t) {
                this.profiling = !1;
                let i = { startStats: { statsHeader: e, uploadURL: t } };
                this.rworker && (s.Log.d(n, "starting stats collection"), this.rworker.postMessage(i));
            }
            stopProfiling() {
                this.profiling = !1;
                let e = { stopStats: !0 };
                this.rworker && (s.Log.d(n, "stopping stats collection"), this.rworker.postMessage(e));
            }
            updateStreamTime() {
                this.streamBeginTs = performance.now();
            }
            resetPerf() {
                (this.perf.RAFTS = 0), (this.perf.DCSend = 0), (this.perf.GetStats = 0), (this.perf.FrameInfo = 0);
            }
            sendOverWs(e) {
                if (this.rworker) {
                    let t = { send: e };
                    this.rworker.postMessage(t);
                }
            }
            onWorkerMessage(e) {
                let t = e.data;
                t.statsStarted
                    ? ((this.profiling = !0), s.Log.d(n, "Ragnarok worker initialized"))
                    : t.log
                    ? s.Log.i("RWorker", t.log)
                    : t.exception
                    ? s.Log.i("RWorker", t.exception)
                    : t.wsClose
                    ? this.wsHandler
                        ? this.wsHandler.closeHandler(t.wsClose)
                        : s.Log.e(n, "No callbacks set.")
                    : t.wsMessage
                    ? this.wsHandler
                        ? this.wsHandler.messageHandler(t.wsMessage)
                        : s.Log.e(n, "No callbacks set.")
                    : t.wsOpening
                    ? this.wsHandler
                        ? this.wsHandler.openingHandler()
                        : s.Log.e(n, "No callbacks set.")
                    : t.wsOpen && (this.wsHandler ? this.wsHandler.openHandler() : s.Log.e(n, "No callbacks set."));
            }
            onWorkerError(e) {
                this.telemetry ? this.emitError(e) : this.pendingErrors.push(e);
            }
            emitError(e) {
                this.telemetry.emitExceptionEvent(void 0, e.message, e.filename, e.lineno, e.colno, !0, "WorkerError");
            }
            onPreRender() {
                if (this.profiling) {
                    if (0 != this.perf.RAFTS) {
                        let e = { perf: this.perf };
                        this.rworker && this.rworker.postMessage(e), this.resetPerf();
                    }
                    this.perf.RAFTS = this.getStreamTime();
                }
            }
            addDataChannelSendTime(e) {
                this.profiling && (this.perf.DCSend += e);
            }
            addGetStatsTime(e) {
                this.profiling && (this.perf.GetStats += e);
            }
            addStatsReport(e, t) {
                if (this.profiling) {
                    let i = { webrtcStats: { type: t, buffer: e } };
                    this.rworker && this.rworker.postMessage(i, [e]);
                }
            }
            addQualityScore(e) {
                if (this.profiling) {
                    let t = {
                        sq: {
                            latencyScore: e.latencyScore,
                            bandwidthScore: e.bandwidthScore,
                            qualityScore: e.qualityScore,
                            networkLossScore: e.networkLossScore,
                            timestamp: this.getStreamTime(),
                        },
                    };
                    this.rworker && this.rworker.postMessage(t);
                }
            }
            addMainThreadBlockDuration(e, t) {
                if (this.profiling) {
                    let i = { duration: { timestamp: t - this.streamBeginTs, duration: e } };
                    this.rworker && this.rworker.postMessage(i);
                }
            }
            onFrameInfo(e, t) {
                if (this.profiling) {
                    let i = Math.min(e, 15) << 4,
                        s = Math.min(t, 15);
                    this.perf.FrameInfo = i | s;
                }
            }
            onEvent(e) {
                if (this.profiling) {
                    let t = { clientEvent: { TS: this.getStreamTime(), eventtype: e } };
                    this.rworker && this.rworker.postMessage(t);
                }
            }
            getStreamTime() {
                return performance.now() - this.streamBeginTs;
            }
            getStreamBeginTime() {
                return this.streamBeginTs;
            }
        }
        (t.RagnarokProfilerImpl = r), (t.RagnarokProfiler = new r());
    },
    ,
    ,
    ,
    ,
    /*!********************************!*\
  !*** ./ragnarok-core/index.ts ***!
  \********************************/
    /*! no static exports found */
    /*! exports used: ConfigureRagnarokSettings, GridApp */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        function s(e) {
            for (var i in e) t.hasOwnProperty(i) || (t[i] = e[i]);
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
            (window.Ragnarok = window.Ragnarok || {}),
            s(i(/*! ./src/gridapp */ 27)),
            s(i(/*! ./src/interfaces */ 18)),
            s(i(/*! ./src/analytics */ 9)),
            s(i(/*! ./src/rerrorcode */ 48)),
            s(i(/*! ./src/version */ 19));
        var n = i(/*! ./src/utils */ 5);
        (t.CLIENT_VERSION = n.CLIENT_VERSION),
            (t.CLIENT_IDENTIFICATION = n.CLIENT_IDENTIFICATION),
            (t.ChooseStreamingResolution = n.ChooseStreamingResolution),
            (t.GetSafeAreas = n.GetSafeAreas),
            (t.performHttpRequest = n.performHttpRequest),
            (t.GetRandNumericString = n.GetRandNumericString),
            (t.GetHexString = n.GetHexString),
            (t.IsValidIPv4 = n.IsValidIPv4),
            (t.IsiOS = n.IsiOS),
            (t.IsWebOS = n.IsWebOS),
            s(i(/*! ./src/virtualgamepad */ 22)),
            s(i(/*! ./src/settings */ 8)),
            s(i(/*! ./src/eventemitter */ 21)),
            s(i(/*! ./src/platform */ 23));
    },
    /*!*****************************************!*\
  !*** ./ragnarok-core/src/interfaces.ts ***!
  \*****************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        t.defaultInputConfigFlags = { allowUnconfined: !1, preventNavigation: !1 };
    },
    /*!**************************************!*\
  !*** ./ragnarok-core/src/version.ts ***!
  \**************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.CHANGELIST = "Local");
    },
    /*!********************************************!*\
  !*** ./ragnarok-core/src/touchlistener.ts ***!
  \********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./settings */ 8),
            n = i(/*! ./logger */ 6),
            r = i(/*! ./latencyindicator */ 10),
            o = i(/*! ./utils */ 5),
            a = "touchlistener";
        t.MAX_TOUCH_COUNT = 40;
        class d {
            constructor(e, t) {
                (this.clientX = 0),
                    (this.clientY = 0),
                    (this.radiusX = 0),
                    (this.radiusY = 0),
                    (this.warp = !1),
                    (this.identifier = e.identifier),
                    (this.protocolId = t),
                    (this.clientX = e.pageX),
                    (this.clientY = e.pageY),
                    (this.radiusX = e.radiusX),
                    (this.radiusY = e.radiusY),
                    s.RagnarokSettings.touchWarp ? this.warpTouch() : (this.warp = !1);
            }
            update(e) {
                (this.clientX = e.pageX),
                    (this.clientY = e.pageY),
                    (this.radiusX = e.radiusX),
                    (this.radiusY = e.radiusY),
                    this.warp && this.warpTouch();
            }
            warpTouch() {
                const e = o.WarpTouch(this);
                (this.warp = Math.abs(e.y - this.clientY) > 0.01), (this.clientX = e.x), (this.clientY = e.y);
            }
        }
        t.TouchListener = class {
            constructor(e, t, i, s, n) {
                (this.target = e),
                    (this.videoAddEventListener = t),
                    (this.videoRemoveEventListener = i),
                    (this.touchDataHandler = s),
                    (this.gestureHandler = n),
                    (this.scaleX = 0),
                    (this.scaleY = 0),
                    (this.leftMargin = 1),
                    (this.topMargin = 1),
                    (this.activeTouches = new Map()),
                    (this.activeProtocolIds = new Set()),
                    (this.droppedEventsCount = 0),
                    (this.touchStartListener = (e) => {
                        let t = !1;
                        const i = e.changedTouches;
                        let s = [];
                        for (let e = 0; e < i.length; e++) {
                            const n = i[e];
                            if (this.shouldHandleTouch(n)) {
                                (t = !0), r.LatencyIndicator.getInstance().toggleIndicator();
                                let e = this.addNewTouch(n);
                                s.push(e);
                            }
                        }
                        this.sendTouches(s, 1, e.timeStamp),
                            this.gestureHandler.shouldPreventDefault() && t && e.preventDefault();
                    }),
                    (this.touchMoveListener = (e) => {
                        let t = !1;
                        const i = e.changedTouches;
                        let s = [];
                        for (let e = 0; e < i.length; e++) {
                            const n = i[e];
                            if (this.shouldHandleTouch(n)) {
                                let e = this.activeTouches.get(n.identifier);
                                e && ((t = !0), e.update(n), s.push(e));
                            }
                        }
                        this.sendTouches(s, 4, e.timeStamp),
                            this.gestureHandler.shouldPreventDefault() && t && e.preventDefault();
                    }),
                    (this.touchCancelListener = (e) => {
                        this.touchEnd(e, 8);
                    }),
                    (this.touchEndListener = (e) => {
                        this.touchEnd(e, 2);
                    });
            }
            static isSupported() {
                return s.RagnarokSettings.forceTouchCapable || o.IsTouchCapable();
            }
            addNewTouch(e) {
                let t = 0;
                for (; this.activeProtocolIds.has(t); ) t++;
                let i = new d(e, t);
                return this.activeTouches.set(e.identifier, i), this.activeProtocolIds.add(t), i;
            }
            removeTouch(e) {
                let t = this.activeTouches.get(e);
                t && (this.activeTouches.delete(e), this.activeProtocolIds.delete(t.protocolId));
            }
            shouldHandleTouch(e) {
                return e.target === this.target;
            }
            sendTouches(e, i, s) {
                var r;
                let o = 0;
                for (let d of e) {
                    if (o > t.MAX_TOUCH_COUNT)
                        return void n.Log.e(
                            a,
                            `Generated more touch data than we can send: ${e.length - o} extra events`
                        );
                    const h =
                        null === (r = this.activeTouches.get(d.identifier)) || void 0 === r ? void 0 : r.protocolId;
                    if (void 0 === h) {
                        n.Log.e(a, "Invalid local touch ID: " + d.identifier);
                        continue;
                    }
                    let l = this.scaleX * (d.clientX - this.leftMargin),
                        c = this.scaleY * (d.clientY - this.topMargin);
                    const u = this.scaleX * d.radiusX,
                        m = (this.scaleY, d.radiusY, 0 - u),
                        g = 65535 + u;
                    if (l < m || l > g || c < m || c > g)
                        switch (i) {
                            case 2:
                            case 8:
                                break;
                            case 1:
                            case 4:
                            default:
                                continue;
                        }
                    if (
                        ((l = Math.min(Math.max(l, 0), 65535)),
                        (c = Math.min(Math.max(c, 0), 65535)),
                        !this.touchDataHandler.addTouchEvent(o, h, i, l, c, d.radiusX, d.radiusY, s))
                    ) {
                        this.droppedEventsCount += e.length - o;
                        break;
                    }
                    o++;
                }
                0 != o &&
                    (o > e.length
                        ? n.Log.w(a, `Generated too many touch points: ${o} instead of ${e.length}`)
                        : this.touchDataHandler.sendTouchPacket(o) || n.Log.e(a, "Failed to send touch events"));
            }
            touchEnd(e, t) {
                let i = !1,
                    s = [];
                const n = e.changedTouches;
                let o = [];
                for (let e = 0; e < n.length; e++) {
                    const t = n[e];
                    if (this.shouldHandleTouch(t)) {
                        let e = this.activeTouches.get(t.identifier);
                        s.push(t.identifier),
                            e && ((i = !0), r.LatencyIndicator.getInstance().toggleIndicator(), e.update(t), o.push(e));
                    }
                }
                this.sendTouches(o, t, e.timeStamp);
                for (const e of s) this.removeTouch(e);
                this.gestureHandler.shouldPreventDefault() && i && e.preventDefault();
            }
            start() {
                this.droppedEventsCount = 0;
                const e = { passive: !1 };
                this.videoAddEventListener("touchstart", this.touchStartListener, e),
                    this.videoAddEventListener("touchmove", this.touchMoveListener, e),
                    this.videoAddEventListener("touchcancel", this.touchCancelListener, e),
                    this.videoAddEventListener("touchend", this.touchEndListener, e);
            }
            stop() {
                this.activeTouches.size &&
                    (this.sendTouches(Array.from(this.activeTouches.values()), 8, performance.now()),
                    this.activeTouches.clear(),
                    this.activeProtocolIds.clear()),
                    this.droppedEventsCount && n.Log.w(a, `Dropped ${this.droppedEventsCount} touch events in total.`);
                const e = { passive: !1 };
                this.videoRemoveEventListener("touchstart", this.touchStartListener, e),
                    this.videoRemoveEventListener("touchmove", this.touchMoveListener, e),
                    this.videoRemoveEventListener("touchcancel", this.touchCancelListener, e),
                    this.videoRemoveEventListener("touchend", this.touchEndListener, e);
            }
            updateVideoState(e, t) {
                const i = this.target.getBoundingClientRect();
                (this.leftMargin = i.left + window.pageXOffset + e.leftPadding),
                    (this.topMargin = i.top + window.pageYOffset + e.topPadding),
                    (this.scaleX = 65535 / e.displayVideoWidth),
                    (this.scaleY = 65535 / e.displayVideoHeight),
                    (this.scaleX /= t),
                    (this.scaleY /= t);
            }
        };
    },
    /*!*******************************************!*\
  !*** ./ragnarok-core/src/eventemitter.ts ***!
  \*******************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        t.EventEmitter = class {
            constructor() {
                this.handlers = new Map();
            }
            addListener(e, t) {
                let i = this.handlers.get(e);
                void 0 !== i ? i.push(t) : this.handlers.set(e, [t]);
            }
            removeListener(e, t) {
                let i = this.handlers.get(e);
                if (i && i.length) {
                    let e = 0;
                    for (; e < i.length; e++)
                        if (i[e] === t) {
                            i.splice(e, 1);
                            break;
                        }
                }
            }
            hasListener(e) {
                const t = this.handlers.get(e);
                return void 0 !== t && t.length > 0;
            }
            emit(e, ...t) {
                try {
                    let i = this.handlers.get(e);
                    i &&
                        i.forEach(function (e) {
                            window.setTimeout(e, 0, ...t);
                        });
                } catch (e) {
                    console.log("Exception in emit: " + e);
                }
            }
        };
    },
    /*!*********************************************!*\
  !*** ./ragnarok-core/src/virtualgamepad.ts ***!
  \*********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./latencyindicator */ 10);
        t.VirtualGamepadHandler = class {
            constructor(e) {
                this.virtualGamepad = e;
            }
            enable() {
                this.virtualGamepad.v_enabled = !0;
            }
            disable() {
                this.virtualGamepad.v_enabled = !1;
            }
            updateInput(e, t, i) {
                this.virtualGamepad.v_enabled &&
                    (s.LatencyIndicator.getInstance().toggleIndicator(),
                    (this.virtualGamepad.v_buttons = e),
                    (this.virtualGamepad.v_trigger = t),
                    (this.virtualGamepad.v_axes = i),
                    (this.virtualGamepad.v_updated = !0));
            }
        };
    },
    /*!***************************************!*\
  !*** ./ragnarok-core/src/platform.ts ***!
  \***************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        class s {
            constructor() {
                (this.voiceIsChromeOS = !1),
                    (this.voiceIsChrome = !1),
                    (this.voiceIsFirefox = !1),
                    (this.voiceIsFirefoxAndroid = !1),
                    (this.voiceIsAndroid = !1),
                    (this.voiceIsMicrosoft = !1),
                    (this.voiceIsApple = !1),
                    (this.isBrowserEdge = !1),
                    (this.isBrowserEdgeLegacy = !1),
                    (this.isBrowserEdgeiOS = !1),
                    (this.isBrowserSafari = !1),
                    (this.isBrowserChrome = !1),
                    (this.isBrowserChromeiOS = !1),
                    (this.isBrowserNetscape = !1),
                    (this.isBrowserFirefoxiOS = !1),
                    (this.isBrowserFirefoxTV = !1),
                    (this.isBrowserOpera = !1),
                    (this.isBrowserOperaTouch = !1),
                    (this.isBrowserBrave = !1),
                    (this.isBrowserYandex = !1),
                    (this.isBrowserSamsungChromium = !1),
                    (this.isPlatformMacIntel = !1),
                    (this.isPlatformiPhone = !1),
                    (this.isPlatformLinuxX86 = !1),
                    (this.isPlatformLinuxArm = !1),
                    (this.isPlatformLinuxArm64 = !1),
                    (this.isPlatformWin = !1),
                    (this.isPlatformiPad = !1),
                    (this.isPlatformChromiumOS = !1),
                    (this.isPlatformChromeOS = !1),
                    (this.isPlatformLinux = !1),
                    (this.isPlatformFreeBsdX86 = !1),
                    (this.isPlatAndroid = !1),
                    (this.isPlatformWebOS = !1),
                    (this.isPluginChromeNative = !1),
                    (this.isPluginChromePDF = !1),
                    (this.isPluginChromiumPDF = !1),
                    (this.isPluginEdgePDF = !1),
                    (this.isBrandChrome = !1),
                    (this.isBrandEdge = !1),
                    (this.isBrandChromium = !1),
                    (this.isMobile = !1),
                    (this.isGLXbox = !1),
                    (this.isGLApple = !1),
                    (this.isHEModelXbox = !1),
                    (this.isHEPlatformWindows = !1),
                    (this.isHEPlatformMac = !1),
                    (this.isHEPlatformChromeOS = !1),
                    (this.isHEPlatformAndroid = !1),
                    (this.avifSupported = !1),
                    (this.platformDetails = { os: "Unknown", browser: "Unknown", forging: !0, confidence: 0 });
            }
            detectPlatformDetails() {
                return new Promise((e, t) => {
                    const i = () => {
                            this.checkVoices(), this.beginChecking().then(() => e(this.platformDetails));
                        },
                        s = window.speechSynthesis;
                    s && void 0 === s.onvoiceschanged
                        ? i()
                        : ((s.onvoiceschanged = () => {
                              i();
                          }),
                          setTimeout(i, 150));
                });
            }
            getDetails() {
                return this.platformDetails;
            }
            checkVoices() {
                let e = 0;
                const t = window.speechSynthesis;
                if (t) {
                    const i = t.getVoices();
                    e = i && i.length;
                    for (const e of i) {
                        const t = e.voiceURI;
                        t.startsWith("Chrome OS")
                            ? (this.voiceIsChromeOS = !0)
                            : t.startsWith("Google")
                            ? (this.voiceIsChrome = !0)
                            : t.startsWith("Microsoft")
                            ? (this.voiceIsMicrosoft = !0)
                            : t.includes("moz-tts")
                            ? (t.includes("android") && ((this.voiceIsFirefoxAndroid = !0), (this.isPlatAndroid = !0)),
                              (this.voiceIsFirefox = !0))
                            : t.startsWith("com.apple") && (this.voiceIsApple = !0),
                            t.includes("Microsoft")
                                ? (this.voiceIsMicrosoft = !0)
                                : t.includes("com.apple")
                                ? (this.voiceIsApple = !0)
                                : "English United States" == t && (this.voiceIsAndroid = !0);
                    }
                }
                return (this.voiceCheckSucceded = e > 0), e;
            }
            async beginChecking() {
                this.checkWindowProperties(),
                    this.checkPlatform(),
                    this.checkApplePay(),
                    this.checkGlDebugInfo(),
                    this.checkPlugins(),
                    this.checkBrands(),
                    navigator.maxTouchPoints && navigator.maxTouchPoints > 0 && (this.isMobile = !0),
                    await this.checkHighEntropy(),
                    await this.checkAvif(),
                    this.createPlatformDetails();
            }
            checkWindowProperties() {
                const e = window,
                    t = e.hasOwnProperty;
                t.call(e, "MSMediaKeys")
                    ? (this.isBrowserEdgeLegacy = !0)
                    : t.call(e, "_firefoxTV_cachedScrollPosition")
                    ? (this.isBrowserFirefoxTV = !0)
                    : e.safari
                    ? (this.isBrowserSafari = !0)
                    : e.opr
                    ? (this.isBrowserOpera = !0)
                    : e.oprt
                    ? (this.isBrowserOperaTouch = !0)
                    : e.navigator.brave
                    ? (this.isBrowserBrave = !0)
                    : e.yandex
                    ? (this.isBrowserYandex = !0)
                    : e.QuickAccess
                    ? (this.isBrowserSamsungChromium = !0)
                    : e.chrome
                    ? (this.isBrowserChrome = !0)
                    : e.netscape
                    ? (this.isBrowserNetscape = !0)
                    : e.__firefox__
                    ? (this.isBrowserFirefoxiOS = !0)
                    : e.__edgeActiveElement
                    ? (this.isBrowserEdgeiOS = !0)
                    : e.__gCrWeb && (this.isBrowserChromeiOS = !0),
                    void 0 !== e.contacts
                        ? (this.isPlatAndroid = !0)
                        : (t.call(e, "onwebOSAccessibilityAlertDone") || e.webOSSystem) && (this.isPlatformWebOS = !0);
            }
            checkPlatform() {
                const e = navigator.platform;
                "MacIntel" === e
                    ? (this.isPlatformMacIntel = !0)
                    : "iPhone" === e
                    ? (this.isPlatformiPhone = !0)
                    : "Linux x86_64" === e
                    ? (this.isPlatformLinuxX86 = !0)
                    : "Linux armv8l" === e || "Linux armv71" === e
                    ? (this.isPlatformLinuxArm = !0)
                    : "Linux aarch64" === e
                    ? (this.isPlatformLinuxArm64 = !0)
                    : "Win32" === e
                    ? (this.isPlatformWin = !0)
                    : "iPad" === e
                    ? (this.isPlatformiPad = !0)
                    : "Chromium OS" === e
                    ? (this.isPlatformChromiumOS = !0)
                    : "ChromeOS" === e
                    ? (this.isPlatformChromeOS = !0)
                    : "Linux" === e
                    ? (this.isPlatformLinux = !0)
                    : "FreeBSD amd64" === e
                    ? (this.isPlatformFreeBsdX86 = !0)
                    : "Windows" === e && ((this.isPlatformWin = !0), (this.isForged = !0));
            }
            checkApplePay() {
                const e = window;
                !(!e.ApplePaySession || !e.ApplePaySession.canMakePayments) && (this.isBrowserSafari = !0);
            }
            checkGlDebugInfo() {
                const e = document.createElement("canvas"),
                    t = this.glDebugInfo(e);
                t.rendererName.includes("SraKmd")
                    ? (this.isGLXbox = !0)
                    : "Apple GPU" === t.rendererName && (this.isGLApple = !0);
            }
            glDebugInfo(e, t = "webgl") {
                const i = e && e.getContext(t),
                    s = i && i.getExtension("WEBGL_debug_renderer_info");
                return s
                    ? {
                          vendorName: i && i.getParameter(s.UNMASKED_VENDOR_WEBGL),
                          rendererName: i && i.getParameter(s.UNMASKED_RENDERER_WEBGL),
                      }
                    : { vendorName: "", rendererName: "" };
            }
            checkBrands() {
                var e;
                const t = (null === (e = navigator.userAgentData) || void 0 === e ? void 0 : e.brands) || [];
                for (const e of t) {
                    const t = e.brand;
                    "Google Chrome" === t
                        ? (this.isBrandChrome = !0)
                        : "Microsoft Edge" === t
                        ? (this.isBrandEdge = !0)
                        : "Chromium" === t && (this.isBrandChromium = !0);
                }
            }
            checkPlugins() {
                const e = navigator.plugins;
                for (const t of e) {
                    const e = t.name;
                    "Native Client" === e
                        ? (this.isPluginChromeNative = !0)
                        : e.startsWith("Microsoft Edge PDF")
                        ? ((this.isPluginEdgePDF = !0), (this.isBrowserEdge = !0))
                        : e.startsWith("Chrome PDF")
                        ? (this.isPluginChromePDF = !0)
                        : e.startsWith("Chromium PDF") && (this.isPluginChromiumPDF = !0);
                }
            }
            async supportsAvif() {
                if (!window.createImageBitmap) return !1;
                const e = await fetch(
                    "data:image/avif;base64,AAAAFGZ0eXBhdmlmAAAAAG1pZjEAAACgbWV0YQAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAC8AAAAGwAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAARWlwcnAAAAAoaXBjbwAAABRpc3BlAAAAAAAAAAQAAAAEAAAADGF2MUOBAAAAAAAAFWlwbWEAAAAAAAAAAQABAgECAAAAI21kYXQSAAoIP8R8hAQ0BUAyDWeeUy0JG+QAACANEkA="
                ).then((e) => e.blob());
                return createImageBitmap(e).then(
                    () => !0,
                    () => !1
                );
            }
            async checkAvif() {
                this.avifSupported = await this.supportsAvif();
            }
            async checkHighEntropy() {
                if (navigator.userAgentData)
                    try {
                        const e = await navigator.userAgentData.getHighEntropyValues([
                                "platform",
                                "architecture",
                                "uaFullVersion",
                                "platformVersion",
                                "model",
                            ]),
                            t = e.model,
                            i = e.platform;
                        "Xbox" === t && (this.isHEModelXbox = !0),
                            "Windows" === i
                                ? (this.isHEPlatformWindows = !0)
                                : "macOS" === i
                                ? (this.isHEPlatformMac = !0)
                                : "Chrome OS" === i
                                ? (this.isHEPlatformChromeOS = !0)
                                : "Android" === i && (this.isHEPlatformAndroid = !0);
                    } catch (e) {}
            }
            createPlatformDetails() {
                var e, t, i, s, n, r;
                this.determineResult(),
                    (this.platformDetails.os = null !== (e = this.osName) && void 0 !== e ? e : "Unknown"),
                    (this.platformDetails.browser = null !== (t = this.browserName) && void 0 !== t ? t : "Unknown"),
                    (this.platformDetails.confidence =
                        null !==
                            (n =
                                null !==
                                    (s =
                                        null !== (i = this.confidenceLevel) && void 0 !== i
                                            ? i
                                            : "Unknown" === this.osName
                                            ? 0
                                            : void 0) && void 0 !== s
                                    ? s
                                    : "Unknown" === this.browserName
                                    ? 5
                                    : void 0) && void 0 !== n
                            ? n
                            : 10),
                    (this.platformDetails.forging = null !== (r = this.isForged) && void 0 !== r && r);
            }
            determineResult() {
                this.voiceIsChromeOS
                    ? ((this.osName = "ChromeOS"), (this.browserName = "Chrome"))
                    : this.voiceIsChrome
                    ? ((this.browserName = "Chrome"),
                      this.voiceIsMicrosoft
                          ? (this.osName = "Windows")
                          : this.isHEPlatformMac || this.isPlatformMacIntel
                          ? (this.osName = "MacOSX")
                          : this.isHEPlatformChromeOS
                          ? ((this.osName = "ChromeOS"), (this.isForged = !0), (this.confidenceLevel = 7))
                          : this.isPlatformLinux ||
                            this.isPlatformLinuxX86 ||
                            this.isPlatformLinuxArm ||
                            this.isPlatformLinuxArm64
                          ? (this.osName = "Linux")
                          : this.isPlatformFreeBsdX86
                          ? (this.osName = "FreeBSD")
                          : this.isPlatformChromeOS || this.isPlatformChromiumOS
                          ? ((this.osName = "ChromeOS"), (this.isForged = !0), (this.confidenceLevel = 7))
                          : ((this.osName = "Unknown"), (this.confidenceLevel = 5)))
                    : this.voiceIsFirefox
                    ? ((this.browserName = "Firefox"),
                      this.voiceIsMicrosoft
                          ? (this.osName = "Windows")
                          : this.voiceIsApple
                          ? (this.osName = "MacOSX")
                          : this.voiceIsFirefoxAndroid
                          ? (this.osName = "Android")
                          : ((this.osName = "Unknown"), (this.confidenceLevel = 5)))
                    : this.voiceIsMicrosoft
                    ? this.isHEPlatformMac || this.isPlatformMacIntel
                        ? ((this.browserName = "Edge"), (this.osName = "MacOSX"))
                        : this.isHEPlatformWindows || this.isPlatformWin
                        ? this.determineWindowsBrowser()
                        : (this.determineWindowsBrowser(), (this.isForged = !0), (this.confidenceLevel = 5))
                    : this.voiceIsApple
                    ? this.determineAppleBrowser()
                    : this.voiceIsAndroid
                    ? this.determineAndroidBrowser()
                    : this.isHEModelXbox || this.isHEPlatformWindows || this.isPlatformWin || this.isGLXbox
                    ? this.determineWindowsBrowser()
                    : this.isHEPlatformMac ||
                      this.isPlatformiPad ||
                      this.isPlatformiPhone ||
                      this.isPlatformMacIntel ||
                      this.isGLApple
                    ? this.determineAppleBrowser()
                    : this.isHEPlatformChromeOS
                    ? ((this.osName = "ChromeOS"), (this.browserName = "Chrome"))
                    : this.isHEPlatformAndroid || this.isPlatAndroid
                    ? this.determineAndroidBrowser()
                    : this.isPlatformWebOS
                    ? ((this.osName = "WebOS"), (this.browserName = "Chromium"))
                    : this.isPlatformLinuxArm ||
                      this.isPlatformLinuxArm64 ||
                      this.isPlatformLinuxX86 ||
                      this.isPlatformLinux
                    ? this.determineLinuxOrAndroidBrowser()
                    : this.isPlatformFreeBsdX86
                    ? this.determineFreeBsdBrowser()
                    : this.isBrowserChromeiOS || this.isBrowserFirefoxiOS || this.isBrowserEdgeiOS
                    ? ((this.isPlatformiPhone = !0), this.determineAppleBrowser(), (this.confidenceLevel = 7))
                    : this.isBrowserSamsungChromium
                    ? (this.determineAndroidBrowser(), (this.confidenceLevel = 7))
                    : ((this.osName = "Unknown"), (this.browserName = "Unknown"), (this.confidenceLevel = 0));
            }
            determineLinuxOrAndroidBrowser() {
                this.isBrowserFirefoxTV
                    ? ((this.browserName = "Firefox"), (this.osName = "FireTV"))
                    : ((this.osName = "Unknown"), (this.browserName = "Unknown"), (this.confidenceLevel = 0));
            }
            determineFreeBsdBrowser() {
                (this.osName = "FreeBSD"),
                    this.isBrowserChrome
                        ? (this.browserName = "Chrome")
                        : this.isBrowserNetscape
                        ? (this.browserName = "Firefox")
                        : ((this.browserName = "Unknown"), (this.confidenceLevel = 3));
            }
            determineAndroidBrowser() {
                (this.osName = "Android"),
                    this.isBrowserNetscape
                        ? (this.browserName = "Firefox")
                        : this.isBrowserSamsungChromium
                        ? (this.browserName = "Samsung")
                        : this.isBrandEdge
                        ? (this.browserName = "Edge")
                        : this.isBrandChrome
                        ? (this.browserName = "Chrome")
                        : this.isBrandChromium
                        ? (this.browserName = "Chromium")
                        : this.isBrowserBrave
                        ? (this.browserName = "Brave")
                        : this.isBrowserYandex
                        ? (this.browserName = "Yandex")
                        : this.isBrowserChrome
                        ? this.avifSupported
                            ? (this.browserName = "Chrome")
                            : this.isMobile
                            ? (this.browserName = "Edge")
                            : (this.browserName = "Silk")
                        : ((this.browserName = "Chrome"), (this.confidenceLevel = 7));
            }
            determineWindowsBrowser() {
                (this.osName = "Windows"),
                    this.isBrowserNetscape
                        ? (this.browserName = "Firefox")
                        : this.isBrowserChrome
                        ? this.isPluginEdgePDF
                            ? (this.browserName = "Edge")
                            : this.isPluginChromePDF
                            ? (this.browserName = "Chrome")
                            : this.isPluginChromiumPDF
                            ? (this.browserName = "Chromium")
                            : this.isHEModelXbox || this.isGLXbox
                            ? ((this.osName = "Xbox"), (this.browserName = "Edge"))
                            : this.isBrandEdge
                            ? (this.browserName = "Edge")
                            : this.isBrandChrome
                            ? (this.browserName = "Chrome")
                            : this.isBrandChromium
                            ? (this.browserName = "Chromium")
                            : this.avifSupported
                            ? ((this.browserName = "Chrome"), (this.confidenceLevel = 7))
                            : ((this.browserName = "Edge"), (this.osName = "Unknown"))
                        : this.isBrowserOpera
                        ? (this.browserName = "Opera")
                        : this.isBrowserBrave
                        ? (this.browserName = "Brave")
                        : this.isBrowserYandex
                        ? (this.browserName = "Yandex")
                        : this.isBrowserEdgeLegacy
                        ? this.isGLXbox
                            ? ((this.osName = "Xbox"), (this.browserName = "Edge_Legacy"))
                            : (this.browserName = "Edge_Legacy")
                        : ((this.browserName = "Chrome"), (this.confidenceLevel = 5));
            }
            determineAppleBrowser() {
                this.isPlatformiPhone
                    ? ((this.osName = "iOS"), this.determineIOSBrowser())
                    : this.isPlatformMacIntel
                    ? this.isMobile
                        ? ((this.osName = "iPadOS"), this.determineIOSBrowser())
                        : ((this.osName = "MacOSX"),
                          this.isBrowserBrave
                              ? (this.browserName = "Brave")
                              : this.isBrowserYandex
                              ? (this.browserName = "Yandex")
                              : this.isBrowserChrome
                              ? this.isPluginEdgePDF
                                  ? (this.browserName = "Edge")
                                  : this.isPluginChromeNative
                                  ? (this.browserName = "Chrome")
                                  : this.isBrandEdge
                                  ? (this.browserName = "Edge")
                                  : this.isBrandChrome
                                  ? (this.browserName = "Chrome")
                                  : this.isBrandChromium
                                  ? (this.browserName = "Chromium")
                                  : this.avifSupported
                                  ? ((this.browserName = "Chrome"), (this.confidenceLevel = 7))
                                  : (this.browserName = "Edge")
                              : this.isBrowserNetscape
                              ? (this.browserName = "Firefox")
                              : this.isBrowserOpera
                              ? (this.browserName = "Opera")
                              : this.isBrowserSafari
                              ? (this.browserName = "Safari")
                              : ((this.browserName = "Unknown"), (this.confidenceLevel = 5)))
                    : this.isPlatformiPad
                    ? ((this.osName = "iPadOS"), this.determineIOSBrowser())
                    : ((this.isForged = !0),
                      this.isGLApple
                          ? ((this.osName = "iOS"), this.determineIOSBrowser())
                          : this.isMobile
                          ? ((this.osName = "iOS"), (this.browserName = "Unknown"), (this.confidenceLevel = 5))
                          : ((this.osName = "MacOSX"), (this.browserName = "Unknown"), (this.confidenceLevel = 5)));
            }
            determineIOSBrowser() {
                this.isBrowserFirefoxiOS
                    ? (this.browserName = "Firefox")
                    : this.isBrowserOperaTouch
                    ? (this.browserName = "Opera")
                    : this.isBrowserBrave
                    ? (this.browserName = "Brave")
                    : this.isBrowserYandex
                    ? (this.browserName = "Yandex")
                    : this.isBrowserEdgeiOS
                    ? (this.browserName = "Edge")
                    : this.isBrowserChromeiOS
                    ? (this.browserName = "Chrome")
                    : this.isBrowserSafari
                    ? (this.browserName = "Safari")
                    : ((this.browserName = "Unknown"), (this.confidenceLevel = 5));
            }
        }
        t.getPlatformDetails = function () {
            return new s().detectPlatformDetails();
        };
    },
    ,
    ,
    /*!***************************!*\
  !*** ./src/kit-player.ts ***!
  \***************************/
    /*! no exports provided */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is an entry point */ function (e, t, i) {
        "use strict";
        i.r(t);
        var s = i(/*! @gamestream/ragnarok */ 17),
            n = function (e, t, i, s) {
                return new (i || (i = Promise))(function (n, r) {
                    function o(e) {
                        try {
                            d(s.next(e));
                        } catch (e) {
                            r(e);
                        }
                    }
                    function a(e) {
                        try {
                            d(s.throw(e));
                        } catch (e) {
                            r(e);
                        }
                    }
                    function d(e) {
                        var t;
                        e.done
                            ? n(e.value)
                            : ((t = e.value),
                              t instanceof i
                                  ? t
                                  : new i(function (e) {
                                        e(t);
                                    })).then(o, a);
                    }
                    d((s = s.apply(e, t || [])).next());
                });
            };
        let r;
        function o(e) {
            return new URLSearchParams(location.search).get(e);
        }
        class a {
            constructor(e) {
                (this.isStreamTest = !1),
                    (this.tracksMap = new Map()),
                    (this.totalTracks = 0),
                    (this.continueShownOnce = !1),
                    (this.options = e),
                    (this.sessionStartParams = {}),
                    (this.sessionId = null),
                    (this.sessionsToDelete = 0),
                    this.instantiateGridApp();
            }
            instantiateGridApp() {
                (this.gridApp = new s.GridApp(this.options.iceServers)),
                    this.gridApp.addListener("SessionStartResult", this.onSessionStartResult.bind(this)),
                    this.gridApp.addListener("SessionStopResult", this.onSessionStopResult.bind(this)),
                    this.gridApp.addListener("ActiveSessionsResult", this.onActiveSessionResult.bind(this)),
                    this.gridApp.addListener("StreamStopped", this.onStreamStopped.bind(this)),
                    this.gridApp.addListener("StreamingEvent", this.onStreamingEvent.bind(this)),
                    this.gridApp.addListener("GetSessionResult", this.onGetSessionResult.bind(this)),
                    this.gridApp.addListener("Log", this.onLogEvent.bind(this));
            }
            handleActiveSessions(e) {
                for (let t = 0; t < e.length; t++)
                    if (
                        this.sessionStartParams.appId == e[t].appId &&
                        ("ready_for_connection" == e[t].state || "streaming" == e[t].state || "paused" == e[t].state)
                    )
                        return (
                            2 == this.sessionStartParams.appLaunchMode &&
                                2 != e[t].appLaunchMode &&
                                (this.sessionStartParams.appLaunchMode = 0),
                            void this.gridApp.resumeSession(this.sessionStartParams, e[t].sessionId)
                        );
                this.sessionsToDelete = e.length;
                for (let t = 0; t < e.length; t++) this.gridApp.stopSession(e[t].sessionId);
            }
            resetTrackInfo() {
                (this.totalTracks = 0), (this.continueShownOnce = !1), this.tracksMap.clear(), this.hideOverlay();
            }
            showContinueIfNeeded(e) {
                if (this.continueShownOnce) e || this.gridApp.stopSession(this.sessionId);
                else if (this.totalTracks === this.tracksMap.size) {
                    this.continueShownOnce = !0;
                    for (let e of this.tracksMap.entries())
                        if (!e[1]) {
                            this.showOverlay();
                            break;
                        }
                }
            }
            playTrack(e, t) {
                const i = t.play();
                i
                    ? i
                          .then(() => {
                              t instanceof HTMLVideoElement && this.gridApp.toggleUserInput(!0),
                                  this.tracksMap.set(e, !0),
                                  this.showContinueIfNeeded(!0);
                          })
                          .catch((t) => {
                              this.tracksMap.set(e, !1), this.showContinueIfNeeded(!1);
                          })
                    : (t instanceof HTMLVideoElement && this.gridApp.toggleUserInput(!0),
                      this.tracksMap.set(e, !0),
                      this.showContinueIfNeeded(!0));
            }
            playMedia() {
                if (this.startResult)
                    for (const e of this.startResult.streams)
                        for (const t of e.tracks)
                            "video" === t.kind
                                ? this.playTrack(t.trackId, this.options.videoElement)
                                : "audio" === t.kind && this.playTrack(t.trackId, this.options.audioElement);
            }
            playMediaOnContinue() {
                this.playMedia(), this.hideOverlay();
            }
            showOverlay() {
                document.getElementById("overlay").style.display = "block";
            }
            hideOverlay() {
                document.getElementById("overlay").style.display = "none";
            }
            onSessionStartResult(e) {
                if (e.error)
                    if (3237093643 == e.error.code)
                        e.sessionList
                            ? e.sessionList.length && this.handleActiveSessions(e.sessionList)
                            : this.gridApp.getActiveSessions();
                    else if (3237093682 == e.error.code);
                    else if (15867905 == e.error.code || 15867906 == e.error.code);
                    else {
                        if (3237093377 == e.error.code) {
                            if (navigator.onLine) return;
                            e.error.code = 3237089281;
                        }
                        let t = "";
                        0 == t.length && (t = "Session setup failed.");
                    }
                else {
                    this.gridApp.isMicSupported() && this.gridApp.setMicRecordingEnabled(!0),
                        (this.sessionId = e.sessionId),
                        (this.startResult = e);
                    for (let e of this.startResult.streams) this.totalTracks += e.tracks.length;
                    this.playMedia();
                }
            }
            onSessionStopResult(e) {
                this.sessionId == e.sessionId
                    ? ((this.sessionId = ""), !this.isStreamTest || (this.isStreamTest && e.framesDecoded))
                    : this.sessionsToDelete > 0 &&
                      (this.sessionsToDelete--, 0 === this.sessionsToDelete && this.begin());
            }
            onStreamStopped(e) {
                if ((this.resetTrackInfo(), e.error)) {
                    let t = o("resume");
                    if (15868704 == e.error.code);
                    else if (!this.isStreamTest && t && e.isResumable)
                        window.setTimeout(() => this.gridApp.getActiveSessions(), 15e3);
                    else {
                        let e = "";
                        0 == e.length && (e = "Stream stopped.");
                    }
                }
            }
            onActiveSessionResult(e) {
                e.error || (e.sessionList.length ? this.handleActiveSessions(e.sessionList) : this.begin());
            }
            onStreamingEvent(e) {
                e.streamingState && ("reconnecting" === e.streamingState.state || e.streamingState.state);
            }
            onGetSessionResult(e) {
                e.error ||
                    ("initializing" == e.state || "resuming" == e.state
                        ? window.setTimeout(() => this.gridApp.getSession(e.sessionId), 1e3)
                        : "ready_for_connection" == e.state &&
                          this.gridApp.resumeSession(this.sessionStartParams, e.sessionId));
            }
            onLogEvent(e) {
                let t = e.timeStamp;
                (t += " " + e.logLevel + " " + e.logtag + " "), (t += e.logstr), console.log(t);
            }
            configureGridApp(e) {
                return new Promise((t, i) => {
                    let s = { serverAddress: e, deviceHashId: "", textInputElement: void 0 },
                        n = new URLSearchParams(location.search),
                        r = 2;
                    switch (n.get("cursor")) {
                        case "hw":
                            r = 1;
                            break;
                        case "free":
                            r = 2;
                    }
                    let o = { cursorType: r, allowUnconfined: null !== n.get("allowunconfined") };
                    this.gridApp.initialize(s, o) ? t() : i();
                });
            }
            getGridApp() {
                return this.gridApp;
            }
            begin() {
                this.gridApp.startSession(this.sessionStartParams);
            }
            startButtonClick() {
                return n(this, void 0, void 0, function* () {
                    Object(s.ConfigureRagnarokSettings)({});
                    let e = o("server");
                    try {
                        this.configureGridApp(e)
                            .then(() => {
                                (this.sessionStartParams = {
                                    streamParams: [
                                        {
                                            width: this.options.videoElement.width,
                                            height: this.options.videoElement.height,
                                            fps: this.options.fps,
                                            maxBitrateKbps: this.options.maxBitrateKbps,
                                            videoTagId: this.options.videoElementId,
                                            audioTagId: this.options.audioElementId,
                                        },
                                    ],
                                    keyboardLayout: "en-US",
                                }),
                                    this.sessionStartParams.streamParams.push({
                                        width: this.options.videoElement.width,
                                        height: this.options.videoElement.height,
                                        fps: this.options.fps,
                                        maxBitrateKbps: this.options.maxBitrateKbps,
                                        videoTagId: this.options.videoElementId,
                                        audioTagId: this.options.audioElementId,
                                    }),
                                    this.begin();
                            })
                            .catch((e) => {
                                console.error("Something unexpected happened", e);
                            });
                    } catch (e) {
                        console.error("Exception in start button click: ", e);
                    }
                });
            }
            stopButtonClick() {
                this.resetTrackInfo(), this.sessionId && this.gridApp.stopSession(this.sessionId);
            }
        }
        function d(e) {
            if (68 == e.keyCode && e.ctrlKey && e.shiftKey) {
                const e = prompt("Enter Client Ime text", "");
                e &&
                    r.getGridApp().sendTextInput(
                        (function (e) {
                            const t = new TextEncoder().encode(e),
                                i = new ArrayBuffer(t.byteLength),
                                s = new DataView(i);
                            for (let e = 0; e < t.byteLength; e++) s.setUint8(e, t[e]);
                            return i;
                        })(e)
                    );
            }
        }
        window.SetupWebRTCPlayer =
            window.SetupWebRTCPlayer ||
            function (e) {
                return n(this, void 0, void 0, function* () {
                    if (
                        ((e.videoElement = document.getElementById(e.videoElementId)),
                        !(null !== e.videoElement && e.videoElement instanceof HTMLVideoElement))
                    )
                        throw new Error(
                            'SetupWebRTCPlayer expected to receive a "videoElement" instance of an HTMLVideoElement in which to play the video stream.'
                        );
                    {
                        const t = e.videoWidth || e.videoElement.width;
                        if (!("number" == typeof t && t > 0))
                            throw new Error(
                                `Expected video width to be provided with a value greater than 0px (received "${t}").`
                            );
                        (e.videoElement.style.width = t + "px"), (e.videoElement.width = t);
                        const i = e.videoHeight || e.videoElement.height;
                        if (!("number" == typeof i && i > 0))
                            throw new Error(
                                `Expected video height to be provided with a value greater than 0px (received "${i}").`
                            );
                        (e.videoElement.style.height = i + "px"), (e.videoElement.height = i);
                        const s = () =>
                                n(this, void 0, void 0, function* () {
                                    return (yield fetch("/streaming/initialize-webrtc-stream", {
                                        method: "POST",
                                        headers: { Accept: "application/json", "Content-Type": "application/json" },
                                        body: JSON.stringify({ width: t, height: i }),
                                    })).json();
                                }),
                            r = () =>
                                n(this, void 0, void 0, function* () {
                                    return (yield fetch("/streaming/ice-servers", {
                                        headers: { Accept: "application/json", "Content-Type": "application/json" },
                                    })).json();
                                }),
                            [o] = yield Promise.all([r(), s()]);
                        e.iceServers = [...o.iceServers, ...(Array.isArray(e.iceServers) ? e.iceServers : [])];
                    }
                    if (
                        ((e.audioElement = document.getElementById(e.audioElementId)),
                        null === e.audioElement || !(e.audioElement instanceof HTMLAudioElement))
                    )
                        throw new Error(
                            'SetupWebRTCPlayer expected to receive an "audioElement" instance of an HTMLAudioElement in which to play the audio stream.'
                        );
                    if (!(e.playElement instanceof HTMLElement))
                        throw new Error(
                            'SetupWebRTCPlayer expected to receive a "playElement" instance of an HTMLElement to play the stream.'
                        );
                    if (!(e.stopElement instanceof HTMLElement))
                        throw new Error(
                            'SetupWebRTCPlayer expected to receive a "stopElement" instance of an HTMLElement to stop the stream.'
                        );
                    return (
                        (e = Object.assign(
                            {
                                fps: 60,
                                maxBitrateKbps: 0,
                                videoWidth: e.videoElement.width,
                                videoHeight: e.videoElement.height,
                                iceServers: e.iceServers,
                            },
                            e
                        )),
                        new Promise((t) => {
                            !(function (e) {
                                e.videoElement.addEventListener("keydown", d),
                                    e.videoElement.addEventListener("keyup", d);
                                const t = new URLSearchParams(location.search);
                                t.set("mode", "lean"),
                                    t.set("cursor", "free"),
                                    t.set("log", "0"),
                                    t.set("log", "1"),
                                    t.set("resolution", `${e.videoWidth}x${e.videoHeight}`),
                                    t.set("console", "disable"),
                                    t.set("console", "enable"),
                                    t.set("gamepad", "enable"),
                                    t.set("webrtcstats", "enable"),
                                    t.set("statsupload", "enable"),
                                    t.set("advancedgestures", "enable"),
                                    t.set("touch", "enable");
                                const i = { overrideData: t.toString() };
                                Object(s.ConfigureRagnarokSettings)(i),
                                    (r = new a(e)),
                                    e.stopElement.addEventListener("click", () => r.stopButtonClick()),
                                    e.playElement.addEventListener("click", () => {
                                        r.playMediaOnContinue();
                                    }),
                                    "function" == typeof e.onComplete && e.onComplete(r);
                            })(
                                Object.assign(Object.assign({}, e), {
                                    onComplete: (i) => {
                                        null !== e.videoElement &&
                                            (e.videoElement.addEventListener("contextmenu", (e) => {
                                                e.preventDefault();
                                            }),
                                            e.videoElement.addEventListener("mousedown", (e) => {
                                                1 === e.button && e.preventDefault();
                                            })),
                                            i.startButtonClick(),
                                            i.playMediaOnContinue(),
                                            t(i);
                                    },
                                })
                            );
                        })
                    );
                });
            };
    },
    /*!**************************************!*\
  !*** ./ragnarok-core/src/gridapp.ts ***!
  \**************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./interfaces */ 18),
            n = i(/*! ./gridserver */ 28),
            r = i(/*! ./streamclient */ 30),
            o = i(/*! ./analytics */ 9),
            a = i(/*! ./telemetryhandler */ 42),
            d = i(/*! ./miccapturer */ 43),
            h = i(/*! ./logger */ 6),
            l = i(/*! ./eventemitter */ 21),
            c = i(/*! ./utils */ 5),
            u = i(/*! ./settings */ 8),
            m = i(/*! ./sleepdetector */ 44),
            g = i(/*! ./gamepadtester */ 45),
            p = i(/*! ./gamepadhandler */ 46),
            A = i(/*! ./audiorecorder */ 47),
            v = i(/*! ./platform */ 23),
            f = "gridapp";
        class S extends l.EventEmitter {
            constructor(e = []) {
                super(),
                    (this.inputEnabled = !1),
                    (this.micEnabled = !1),
                    (this.sleepDetector = new m.SleepDetector(this)),
                    (this.gamepadTester = new g.GamepadTester()),
                    (this.platformDetails = void 0),
                    (this.iceServers = []),
                    v.getPlatformDetails().then((e) => {
                        this.platformDetails = e;
                    }),
                    (this.currentSession = null),
                    (this.streamClient = null),
                    (this.gridServer = null),
                    (this.initializeParams = {
                        clientIdentification: c.CLIENT_IDENTIFICATION,
                        clientVersion: c.CLIENT_VERSION,
                        deviceHashId: "",
                        serverAddress: "",
                    }),
                    (this.sessionStartParams = null),
                    (this.startTime = performance.now()),
                    (this.endTime = this.startTime),
                    (this.unloadFunc = this.unload.bind(this)),
                    (this.unhandledExceptionFunc = this.unhandledException.bind(this)),
                    (this.framesDecoded = 0),
                    (this.telemetry = new a.TelemetryHandler("", "", this)),
                    (this.isResume = "FALSE"),
                    (this.sessionId = ""),
                    (this.subSessionId = ""),
                    (this.inputConfigFlags = s.defaultInputConfigFlags),
                    (this.micCapturer = new d.MicCapturer()),
                    (this.audioRecorder = new A.AudioRecorder()),
                    (this.iceServers = e),
                    window.addEventListener("error", this.unhandledExceptionFunc);
                const t = window.zoneless;
                (this.gamepadHandler = new p.GamepadHandler(t)),
                    u.RagnarokSettings.gamepadTesterEnabled &&
                        (this.gamepadHandler.addGamepadDataHandler(this.gamepadTester),
                        this.gamepadHandler.enableUserInput());
            }
            resetSubSessionId(e) {
                var t;
                (this.subSessionId = e),
                    this.telemetry.setSubSessionId(this.subSessionId),
                    null === (t = this.gridServer) || void 0 === t || t.setSubSessionId(e),
                    this.sleepDetector.setSubSessionId(e);
            }
            resetSessionId(e) {
                (this.sessionId = e), this.sleepDetector.setSessionId(e);
            }
            unhandledException(e) {
                return (
                    h.Log.e(f, "window unhandled error at " + e.filename + " " + e.lineno + ":" + e.colno),
                    this.telemetry.emitExceptionEvent(
                        e.error,
                        e.error && e.error.message ? e.error.message : e.message,
                        e.filename,
                        e.lineno,
                        e.colno,
                        !1
                    ),
                    !1
                );
            }
            unload(e) {
                var t, i;
                if (this.streamClient) {
                    this.micCapturer.shutdown(),
                        (this.framesDecoded = null !== this.streamClient ? this.streamClient.getFramesDecoded() : 0),
                        (this.endTime = performance.now());
                    let e = o.getRagnarokStreamExitEvent(
                        { sessionId: this.sessionId, subSessionId: this.subSessionId },
                        null !== (i = null === (t = this.gridServer) || void 0 === t ? void 0 : t.getServerId()) &&
                            void 0 !== i
                            ? i
                            : this.initializeParams.serverAddress,
                        this.endTime - this.startTime,
                        this.framesDecoded,
                        null !== this.streamClient ? this.streamClient.getVideoCodec() : "",
                        this.isResume
                    );
                    this.emit("AnalyticsEvent", e);
                    let s = !1;
                    this.initializeParams.clientShutDownCallback &&
                        this.initializeParams.clientShutDownCallback(e) &&
                        (s = !0),
                        h.Log.d(f, "gridapp unload called, shutdownCallbackSuccess " + s),
                        this.stopStreamClient(0);
                }
            }
            initialize(e, t = s.defaultInputConfigFlags) {
                if (
                    (h.Log.initLogger(this),
                    h.Log.d(f, "UserAgent: " + navigator.userAgent),
                    h.Log.d(f, "x-nv-client-identity: " + c.getAppUserAgent()),
                    !e)
                )
                    return h.Log.e(f, "undefined init params"), !1;
                if (!e.serverAddress || !e.serverAddress.length)
                    return h.Log.e(f, "Server Address required for initializing."), !1;
                if (
                    (Object.keys(e).forEach((t) => {
                        this.initializeParams[t] = e[t] || this.initializeParams[t];
                    }),
                    c.IsValidIPv4(this.initializeParams.serverAddress))
                )
                    h.Log.d(f, "creating passthru server"), (this.gridServer = new n.PassThruServer(this));
                else if (this.initializeParams.serverAddress.startsWith("mockpm://"))
                    h.Log.d(f, "Creating MockPM server"),
                        (this.gridServer = new n.MockPMServer(this)),
                        (this.initializeParams.serverAddress = this.initializeParams.serverAddress.replace(
                            "mockpm://",
                            ""
                        ));
                else {
                    if (!this.initializeParams.authTokenCallback)
                        return (
                            h.Log.e(f, "No callbacks registered for getting auth token, cannot initialize gridServer"),
                            !1
                        );
                    this.gridServer = new n.GridServer(this);
                }
                return (
                    h.Log.d(f, "initializing grid server"),
                    this.gridServer.initialize(this.initializeParams),
                    (this.inputConfigFlags = t),
                    !0
                );
            }
            downloadAudio() {
                var e;
                null === (e = this.audioRecorder) || void 0 === e || e.downloadAudio();
            }
            getActiveSessions() {
                var e;
                null === (e = this.gridServer) || void 0 === e || e.getAllActiveSessions();
            }
            onSessionStartException(e) {
                let t = {
                    sessionId: this.sessionId,
                    subSessionId: this.subSessionId,
                    error: { code: 3237089284, description: "Quitting due to exception" },
                };
                this.onSessionStart(t);
                let i = "Exception happened in session call";
                h.Log.e(f, i + ": " + e), this.telemetry.emitExceptionEvent(e, i, f + ".ts", 0, 0, !0);
            }
            runSession(e, t) {
                var i;
                try {
                    (this.startTime = performance.now()),
                        this.resetSubSessionId(c.getNewGuid()),
                        this.sleepDetector.startSleepDetectionTimer(),
                        h.Log.d(
                            f,
                            "Session params: " +
                                JSON.stringify(
                                    null === (i = this.sessionStartParams) || void 0 === i ? void 0 : i.sessionParams
                                )
                        ),
                        this.gridServer && this.sessionStartParams
                            ? this.gridServer
                                  .putOrPostSession(this.sessionStartParams.sessionParams, e, t)
                                  .then(
                                      (e) => (
                                          this.resetSessionId(e.sessionId),
                                          this.telemetry.setSessionId(this.sessionId),
                                          h.Log.d(
                                              f,
                                              "Received session: " +
                                                  this.sessionId +
                                                  " subSessionId: " +
                                                  this.subSessionId
                                          ),
                                          "ready_for_connection" == e.state
                                              ? (h.Log.d(f, "Sesison is ready for connection skipping polling"),
                                                (this.currentSession = e),
                                                new Promise((t, i) => {
                                                    t(e);
                                                }))
                                              : this.gridServer
                                              ? this.gridServer.getSession(this.sessionId, !0)
                                              : (h.Log.e(f, "gridserver not initialized"),
                                                Promise.reject({
                                                    code: 3237093380,
                                                    description: "gridserver not initialized",
                                                }))
                                      )
                                  )
                                  .then((e) => {
                                      (this.currentSession = e),
                                          h.Log.d(f, "Session " + this.sessionId + " is ready for streaming"),
                                          this.startStreaming();
                                  })
                                  .catch((e) => {
                                      if ((e.sessionId && this.resetSessionId(e.sessionId), e.code)) {
                                          (15867905 != e.code && 15867906 != e.code) ||
                                              this.sendDeleteRequest(this.sessionId),
                                              h.Log.e(f, "session request failed. error: " + c.GetHexString(e.code));
                                          let t = {
                                              sessionId: this.sessionId,
                                              subSessionId: this.subSessionId,
                                              error: e,
                                              sessionList: e.sessionList,
                                          };
                                          this.onSessionStart(t);
                                      } else this.onSessionStartException(e);
                                  })
                            : h.Log.e(f, "gridserver not initialized");
                } catch (e) {
                    this.onSessionStartException(e);
                }
            }
            startSession(e) {
                if (
                    ((this.sessionStartParams = this.validateSessionParams(e)), 0 != u.RagnarokSettings.touchLaunchMode)
                ) {
                    let e = "";
                    1 == u.RagnarokSettings.touchLaunchMode
                        ? ((this.sessionStartParams.sessionParams.appLaunchMode = 2), (e = "touch friendly mode"))
                        : ((this.sessionStartParams.sessionParams.appLaunchMode = 0), (e = "default mode")),
                        h.Log.d(f, "Overriding app launch mode to " + e);
                }
                u.RagnarokSettings.resWidth &&
                    u.RagnarokSettings.resHeight &&
                    this.sessionStartParams.sessionParams.streamParams.forEach((e) => {
                        (e.width = u.RagnarokSettings.resWidth),
                            (e.height = u.RagnarokSettings.resHeight),
                            h.Log.i(f, "Overriding stream resolution to : " + e.width + "x" + e.height);
                    }),
                    this.runSession(n.SESSIONMODIFY_ACTION.UNKNOWN, void 0);
            }
            getSession(e) {
                this.resetSessionId(e),
                    this.gridServer &&
                        this.gridServer
                            .getSession(e, !1)
                            .then((e) => {
                                let t = {
                                    sessionId: e.sessionId,
                                    appId: e.appId,
                                    subSessionId: this.subSessionId,
                                    state: e.state,
                                    status: e.state,
                                };
                                this.emit("GetSessionResult", t);
                            })
                            .catch((t) => {
                                let i = { sessionId: e, subSessionId: this.subSessionId, error: t };
                                this.emit("GetSessionResult", i);
                            });
            }
            resume() {
                this.resumeSession(this.sessionStartParams.sessionParams, this.sessionId);
            }
            resumeSession(e, t) {
                (this.sessionStartParams = this.validateSessionParams(e)),
                    this.resetSessionId(t),
                    (this.isResume = "TRUE"),
                    this.micEnabled && this.micCapturer.enableMic(),
                    this.runSession(n.SESSIONMODIFY_ACTION.RESUME, this.sessionId);
            }
            stopSession(e, t) {
                var i, s;
                if (
                    (void 0 !== t && h.Log.i(f, "Client stopping session with code: " + c.GetHexString(t)),
                    e === this.sessionId || void 0 === e)
                ) {
                    (this.inputEnabled = !1),
                        this.micCapturer.shutdown(),
                        (this.framesDecoded = null !== this.streamClient ? this.streamClient.getFramesDecoded() : 0),
                        this.sleepDetector.stopSleepDetectionTimer(),
                        window.removeEventListener("unload", this.unloadFunc),
                        (this.endTime = performance.now());
                    let e = o.getRagnarokStreamExitEvent(
                        { sessionId: this.sessionId, subSessionId: this.subSessionId, error: t ? { code: t } : void 0 },
                        null !== (s = null === (i = this.gridServer) || void 0 === i ? void 0 : i.getServerId()) &&
                            void 0 !== s
                            ? s
                            : this.initializeParams.serverAddress,
                        this.endTime - this.startTime,
                        this.framesDecoded,
                        null !== this.streamClient ? this.streamClient.getVideoCodec() : "",
                        this.isResume
                    );
                    this.streamClient
                        ? (this.emit("AnalyticsEvent", e),
                          this.stopStreamClient(null != t ? t : 0),
                          this.sendDeleteRequest(this.sessionId))
                        : this.gridServer && this.gridServer.cancelSessionSetup();
                } else e && this.sendDeleteRequest(e);
            }
            startStreaming() {
                var e, t;
                let i = {
                    sessionId: this.sessionId,
                    subSessionId: this.subSessionId,
                    queuePosition: 0,
                    eta: 0,
                    state: "StartingStreamer",
                };
                this.emit("ProgressUpdate", i),
                    (this.streamClient = new r.StreamClient(
                        this,
                        this.inputConfigFlags,
                        2 ==
                            (null ===
                                (t =
                                    null === (e = this.sessionStartParams) || void 0 === e
                                        ? void 0
                                        : e.sessionParams) || void 0 === t
                                ? void 0
                                : t.appLaunchMode),
                        this.gamepadTester,
                        this.gamepadHandler,
                        this.telemetry,
                        this.audioRecorder,
                        this.initializeParams.textInputElement,
                        this.iceServers
                    )),
                    this.sessionStartParams &&
                        this.streamClient.start(
                            this.currentSession,
                            this.sessionStartParams.validatedStreamParams[0].videoElement,
                            this.sessionStartParams.validatedStreamParams[0].audioElement,
                            this.micCapturer,
                            this.sessionStartParams.sessionParams.streamParams[0].maxBitrateKbps
                        ),
                    window.addEventListener("unload", this.unloadFunc);
            }
            notifyClientWithError(e, t, i) {
                if ((this.emit("AnalyticsEvent", e), this.stopStreamClient(t.error ? t.error.code : 0), i))
                    this.emit("SessionStartResult", t);
                else {
                    if (t.error) {
                        const e = c.canResume(t.error.code);
                        (t.isResumable = e), h.Log.i(f, "canResume " + e);
                    }
                    this.emit("StreamStopped", t);
                }
            }
            checkConnectivity(e, t, i) {
                if (c.shouldRunConnectivityTest(t.error.code)) {
                    let s = 1500;
                    u.RagnarokSettings.ragnarokConfig.connectivityCheckTimeout &&
                        0 !== u.RagnarokSettings.ragnarokConfig.connectivityCheckTimeout &&
                        ((s = u.RagnarokSettings.ragnarokConfig.connectivityCheckTimeout),
                        h.Log.i(f, "connectivity timeout changed to: " + s));
                    const n =
                        ("http:" === window.location.protocol ? "http://" : "https://") +
                        this.initializeParams.serverAddress;
                    h.Log.i(f, "connectivity url: " + n);
                    const r = performance.now();
                    c.customFetch(n, s, { method: "OPTIONS" })
                        .then((s) => {
                            if ((s.status >= 200 && s.status < 300) || 403 == s.status) {
                                const t = 25 * Math.ceil((performance.now() - r) / 25);
                                e.connectivity = "online(" + String(t) + ")";
                            } else e.connectivity = "offline_wrong_status(" + String(s.status) + ")";
                            this.notifyClientWithError(e, t, i);
                        })
                        .catch((s) => {
                            "AbortError" === s.name
                                ? (e.connectivity = "timeout")
                                : ((e.connectivity = "offline(" + s.name + ":" + s.message + ")"),
                                  (t.error.code = c.convertErrorOnConnectivityTest(t.error.code)),
                                  (e.result = c.GetHexString(t.error.code))),
                                this.notifyClientWithError(e, t, i);
                        });
                } else this.notifyClientWithError(e, t, i);
            }
            stopStreamClient(e) {
                this.streamClient && (this.streamClient.stop(e), (this.streamClient = null));
            }
            onSessionStart(e) {
                var t, i, s, n, r;
                if (!e.error || (3237093643 != e.error.code && 3237093682 != e.error.code)) {
                    this.endTime = performance.now();
                    let s = {
                        name: "Ragnarok_Launch_Event",
                        gdprLevel: "functional",
                        result: e.error ? c.GetHexString(e.error.code) : c.GetHexString(0),
                        sessionId: e.sessionId,
                        subSessionId: this.subSessionId,
                        zoneAddress:
                            null !== (i = null === (t = this.gridServer) || void 0 === t ? void 0 : t.getServerId()) &&
                            void 0 !== i
                                ? i
                                : this.initializeParams.serverAddress,
                        launchDuration: Math.round(this.endTime - this.startTime),
                        isResume: this.isResume,
                        codec: null !== this.streamClient ? this.streamClient.getVideoCodec() : "H264",
                    };
                    (this.startTime = performance.now()), this.emit("AnalyticsEvent", s);
                    try {
                        this.telemetry.emitDebugEvent(
                            "Navigator",
                            navigator.userAgent,
                            navigator.platform,
                            navigator.oscpu,
                            String(navigator.maxTouchPoints)
                        ),
                            this.platformDetails &&
                                this.telemetry.emitDebugEvent(
                                    "NavigatorPlatform",
                                    this.platformDetails.browser,
                                    this.platformDetails.os,
                                    String(this.platformDetails.forging),
                                    String(this.platformDetails.confidence)
                                );
                    } catch (e) {}
                }
                if (e.error) {
                    let t = this.sleepDetector.wasSleepExit(e.error.code);
                    if (
                        (t && (e.error.code = c.convertErrorOnSleep(e.error.code)),
                        window.removeEventListener("unload", this.unloadFunc),
                        3237093643 != e.error.code && 3237093682 != e.error.code)
                    ) {
                        (this.framesDecoded = null !== this.streamClient ? this.streamClient.getFramesDecoded() : 0),
                            (this.endTime = performance.now());
                        let i = o.getRagnarokStreamExitEvent(
                            e,
                            null !== (n = null === (s = this.gridServer) || void 0 === s ? void 0 : s.getServerId()) &&
                                void 0 !== n
                                ? n
                                : this.initializeParams.serverAddress,
                            this.endTime - this.startTime,
                            this.framesDecoded,
                            null !== this.streamClient ? this.streamClient.getVideoCodec() : "",
                            this.isResume,
                            "online",
                            t ? "TRUE" : "FALSE"
                        );
                        this.checkConnectivity(i, e, !0);
                    } else this.stopStreamClient(e.error.code), this.emit("SessionStartResult", e);
                } else
                    this.emit("SessionStartResult", e),
                        this.inputEnabled &&
                            (null === (r = this.streamClient) || void 0 === r || r.toggleUserInput(!0));
            }
            onStreamStop(e) {
                var t, i;
                h.Log.d(f, "streaming terminated. resetting stream client");
                let s = "UNDEFINED";
                e.error &&
                    ((s = this.sleepDetector.wasSleepExit(e.error.code) ? "TRUE" : "FALSE"),
                    "TRUE" === s && (e.error.code = c.convertErrorOnSleep(e.error.code))),
                    this.micCapturer.shutdown(),
                    window.removeEventListener("unload", this.unloadFunc),
                    (this.framesDecoded = null !== this.streamClient ? this.streamClient.getFramesDecoded() : 0),
                    (this.endTime = performance.now());
                let n = o.getRagnarokStreamExitEvent(
                    e,
                    null !== (i = null === (t = this.gridServer) || void 0 === t ? void 0 : t.getServerId()) &&
                        void 0 !== i
                        ? i
                        : this.initializeParams.serverAddress,
                    this.endTime - this.startTime,
                    this.framesDecoded,
                    null !== this.streamClient ? this.streamClient.getVideoCodec() : "",
                    this.isResume,
                    "online",
                    s
                );
                this.checkConnectivity(n, e, !1);
            }
            validateSessionParams(e) {
                let t = { sessionParams: e, validatedStreamParams: [] };
                return (
                    (t.validatedStreamParams = e.streamParams.map((e) => {
                        const t = document.getElementById(e.videoTagId);
                        if (null == t || !(t instanceof HTMLVideoElement))
                            throw new Error("Didn't find video element for videoTagId: " + e.videoTagId);
                        const i = document.getElementById(e.audioTagId);
                        if (null == i || !(i instanceof HTMLAudioElement))
                            throw new Error("Didn't find audio element for audioTagId: " + e.audioTagId);
                        return { videoElement: t, audioElement: i };
                    })),
                    t
                );
            }
            sendDeleteRequest(e) {
                this.gridServer &&
                    this.gridServer.sendDeleteRequest(e).then(
                        () => {
                            h.Log.d(f, "Successfully sent Delete Request to server. " + e);
                            let t = {
                                sessionId: e,
                                subSessionId: this.subSessionId,
                                framesDecoded: this.framesDecoded,
                            };
                            this.emit("SessionStopResult", t);
                        },
                        (t) => {
                            h.Log.e(f, "sending Deleting request failed." + e);
                            let i = {
                                sessionId: e,
                                subSessionId: this.subSessionId,
                                error: t,
                                framesDecoded: this.framesDecoded,
                            };
                            this.emit("SessionStopResult", i);
                        }
                    );
            }
            isMicSupported() {
                return this.micCapturer.isMicSupported();
            }
            setMicRecordingEnabled(e) {
                e
                    ? ((this.micEnabled = !0), this.micCapturer.startMicCaptureOnDefaultDevice())
                    : ((this.micEnabled = !1), this.micCapturer.stopMicRecording());
            }
            getMicState() {
                this.micCapturer.getMicState();
            }
            sendCustomMessage(e) {
                var t;
                null === (t = this.streamClient) || void 0 === t || t.sendCustomMessage(e);
            }
            toggleUserInput(e) {
                var t;
                null === (t = this.streamClient) || void 0 === t || t.toggleUserInput(e), (this.inputEnabled = e);
            }
            getVirtualGamepadHandler() {
                var e;
                return null === (e = this.streamClient) || void 0 === e ? void 0 : e.getVirtualGamepadHandler();
            }
            setAuthInfo(e) {
                var t;
                null === (t = this.gridServer) || void 0 === t || t.setAuthInfo(e);
            }
            sendTextInput(e) {
                var t;
                null === (t = this.streamClient) || void 0 === t || t.sendTextInput(e);
            }
            setVirtualKeyboardState(e) {
                var t;
                null === (t = this.streamClient) || void 0 === t || t.setVirtualKeyboardState(e);
            }
            setVideoTransforms(e, t, i) {
                var s;
                null === (s = this.streamClient) || void 0 === s || s.setVideoTransforms(e, t, i);
            }
            toggleOnScreenStats() {
                var e;
                null === (e = this.streamClient) || void 0 === e || e.toggleOnScreenStats();
            }
            setKeyboardLayout(e) {
                h.Log.i(f, "Setting keyboard layout to " + e),
                    this.sendCustomMessage({ messageType: "kbLayout", messageRecipient: "KBLayoutChange", data: e });
            }
        }
        t.GridApp = S;
    },
    /*!*****************************************!*\
  !*** ./ragnarok-core/src/gridserver.ts ***!
  \*****************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./analytics */ 9),
            n = i(/*! ./logger */ 6),
            r = i(/*! ./utils */ 5),
            o = i(/*! ./settings */ 8),
            a = "gridserver";
        function d(e) {
            (e["Content-Type"] = "application/json"),
                (e["x-nv-client-identity"] = r.getAppUserAgent()),
                (e["NV-Device-OS"] = (function () {
                    let e = "UNKNOWN";
                    switch (r.getPlatform().name) {
                        case "ChromeOS":
                            e = "CHROMEOS";
                            break;
                        case "Windows":
                            e = "WINDOWS";
                            break;
                        case "MacOSX":
                            e = "MACOS";
                            break;
                        case "Linux":
                            e = "LINUX";
                            break;
                        case "iOS":
                            (e = "IOS"), r.IsiPad() && (e = "IPADOS");
                    }
                    return e;
                })()),
                (e["NV-Device-Type"] = (function () {
                    let e = "UNKNOWN";
                    return (e = r.IsiPhone() ? "PHONE" : r.IsiPad() ? "TABLET" : "DESKTOP"), e;
                })()),
                (e["NV-Client-Streamer"] = "WEBRTC"),
                (e["NV-Client-Type"] = "BROWSER");
        }
        t.SESSIONMODIFY_ACTION = { UNKNOWN: 0, PAUSE: 1, RESUME: 2, SESSION_RATING: 3, JOIN: 4, FORWARD: 5 };
        class h {
            constructor(e) {
                var t, i, s, n, a, h, l, c, u, m, g, p, A, v;
                (this.eventEmitter = e), (this.httpRequestOptions = r.DefaultHttpRequestOptions);
                let f = 0;
                void 0 !==
                    (null === (t = o.RagnarokSettings.commonConfig.pmCommunication) || void 0 === t
                        ? void 0
                        : t.httpConnectionTimeout) &&
                    (f += o.RagnarokSettings.commonConfig.pmCommunication.httpConnectionTimeout),
                    void 0 !==
                        (null === (i = o.RagnarokSettings.commonConfig.pmCommunication) || void 0 === i
                            ? void 0
                            : i.httpDataReceiveTimeout) &&
                        (f += o.RagnarokSettings.commonConfig.pmCommunication.httpDataReceiveTimeout),
                    (this.httpRequestOptions.timeout = f ? 1e3 * f : 1e4),
                    (this.httpRequestOptions.retryCount =
                        null !==
                            (n =
                                null === (s = o.RagnarokSettings.commonConfig.pmCommunication) || void 0 === s
                                    ? void 0
                                    : s.httpRetryCount) && void 0 !== n
                            ? n
                            : 3),
                    (this.httpRequestOptions.backOffDelay =
                        null !==
                            (h =
                                null === (a = o.RagnarokSettings.commonConfig.pmCommunication) || void 0 === a
                                    ? void 0
                                    : a.httpBackOffDelay) && void 0 !== h
                            ? h
                            : 500),
                    (this.authRequestFunc = null),
                    (this.sessionControlServerMap = new Map()),
                    (this.initParams = null),
                    (this.protocol = ""),
                    (this.overrideSignallingInfo = !0),
                    "http:" === window.location.protocol && (this.overrideSignallingInfo = !1),
                    (this.subSessionId = ""),
                    d(this.httpRequestOptions.headers),
                    (this.queuePosition = Number.MAX_VALUE),
                    (this.pollingOptions = {
                        minInterval:
                            null !==
                                (c =
                                    null === (l = o.RagnarokSettings.commonConfig.pmCommunication) || void 0 === l
                                        ? void 0
                                        : l.pollingIntervalMin) && void 0 !== c
                                ? c
                                : 1e3,
                        maxInterval:
                            null !==
                                (m =
                                    null === (u = o.RagnarokSettings.commonConfig.pmCommunication) || void 0 === u
                                        ? void 0
                                        : u.pollingIntervalMax) && void 0 !== m
                                ? m
                                : 1e4,
                        step:
                            null !==
                                (p =
                                    null === (g = o.RagnarokSettings.commonConfig.pmCommunication) || void 0 === g
                                        ? void 0
                                        : g.pollingIntervalStep) && void 0 !== p
                                ? p
                                : 1e3,
                        queueSizePerStep:
                            null !==
                                (v =
                                    null === (A = o.RagnarokSettings.commonConfig.pmCommunication) || void 0 === A
                                        ? void 0
                                        : A.pollingQueueSizePerStep) && void 0 !== v
                                ? v
                                : 50,
                    }),
                    (this.authInfo = { type: 0 }),
                    (this.cancelledSetup = !1);
            }
            initialize(e) {
                (this.initParams = e),
                    (this.authRequestFunc = e.authTokenCallback),
                    (this.protocol = "https://"),
                    this.initParams.deviceHashId &&
                        (this.httpRequestOptions.headers["X-Device-Id"] = this.initParams.deviceHashId),
                    n.Log.d(a, "grid server initialized");
            }
            static convertSessionStateToString(e) {
                switch (e) {
                    case 1:
                        return "initializing";
                    case 2:
                        return "ready_for_connection";
                    case 3:
                        return "streaming";
                    case 4:
                    case 5:
                        return "paused";
                    case 6:
                        return "resuming";
                    case 7:
                        return "finished";
                    default:
                        return "unknown";
                }
            }
            extractSessionInformation(e) {
                let t = {
                    sessionId: e.sessionId,
                    subSessionId: this.subSessionId,
                    signalConnectionInfo: { ip: "", port: 0, protocol: "" },
                    mediaConnectionInfo: [],
                    streamInfo: [],
                    appId: 0,
                    state: h.convertSessionStateToString(e.status),
                    appLaunchMode: 0,
                };
                if (((t.appId = e.sessionRequestData ? e.sessionRequestData.appId : 0), e.connectionInfo)) {
                    let i = e.connectionInfo;
                    for (let s = 0; s < i.length; s++) {
                        let r = i[s];
                        if (14 == r.usage)
                            if (
                                ((t.signalConnectionInfo.ip = r.ip),
                                (t.signalConnectionInfo.port = r.port),
                                (t.signalConnectionInfo.protocol = 5 == r.appLevelProtocol ? "https" : "http"),
                                5 != r.appLevelProtocol && this.overrideSignallingInfo)
                            )
                                if (
                                    ((t.signalConnectionInfo.port = 49300),
                                    (t.signalConnectionInfo.protocol = "https"),
                                    r.ip.includes(".com") || r.ip.includes(".net"))
                                )
                                    t.signalConnectionInfo.ip = r.ip;
                                else {
                                    let i = r.ip.split(".");
                                    t.signalConnectionInfo.ip = i[0] + "-" + i[1] + "-" + i[2] + "-" + i[3];
                                    let s = e.sessionControlInfo.ip.indexOf(".");
                                    (t.signalConnectionInfo.ip += e.sessionControlInfo.ip.substring(s)),
                                        n.Log.d(
                                            a,
                                            "The overridden signal connection address is " + t.signalConnectionInfo.ip
                                        );
                                }
                            else
                                (t.signalConnectionInfo.ip = r.ip),
                                    (t.signalConnectionInfo.port = r.port),
                                    (t.signalConnectionInfo.protocol = 5 == r.appLevelProtocol ? "https" : "http");
                        else {
                            if (15 != r.usage) {
                                if (2 == r.usage) {
                                    let i = { ip: r.ip, port: r.port };
                                    t.mediaConnectionInfo.push(i),
                                        (t.signalConnectionInfo.port = 49300),
                                        (t.signalConnectionInfo.protocol = "https");
                                    let s = r.ip.split(".");
                                    t.signalConnectionInfo.ip = s[0] + "-" + s[1] + "-" + s[2] + "-" + s[3];
                                    let o = e.sessionControlInfo.ip.indexOf(".");
                                    (t.signalConnectionInfo.ip += e.sessionControlInfo.ip.substring(o)),
                                        n.Log.d(
                                            a,
                                            "The overridden signal connection address is " + t.signalConnectionInfo.ip
                                        );
                                    break;
                                }
                                continue;
                            }
                            {
                                let e = { ip: r.ip, port: r.port };
                                t.mediaConnectionInfo.push(e);
                            }
                        }
                    }
                }
                if (e.monitorSettings) {
                    e.monitorSettings.forEach(function (e) {
                        t.streamInfo.push({ width: e.widthInPixels, height: e.heightInPixels, fps: e.framesPerSecond });
                    });
                }
                if (e.sessionRequestData)
                    switch (e.sessionRequestData.appLaunchMode) {
                        case 3:
                            t.appLaunchMode = 2;
                            break;
                        case 2:
                            t.appLaunchMode = 1;
                    }
                return t;
            }
            extractSessionList(e) {
                let t = [];
                return (
                    e.forEach((e) => {
                        let i = this.extractSessionInformation(e),
                            s = {
                                sessionId: i.sessionId,
                                appId: i.appId,
                                state: i.state,
                                appLaunchMode: i.appLaunchMode,
                            };
                        t.push(s),
                            e.sessionControlInfo &&
                                this.sessionControlServerMap.set(e.sessionId, {
                                    server: e.sessionControlInfo.ip,
                                    port: e.sessionControlInfo.port,
                                });
                    }),
                    t
                );
            }
            getAllActiveSessions() {
                if (null == this.initParams) return void n.Log.e(a, "GridServer:: InitParams null");
                n.Log.d(a, "GridServer:: GetActiveSessions++");
                let e,
                    t = this.protocol + this.initParams.serverAddress + "/v2/session",
                    i = s.getRagnarokHttpEvent(t, "GET", "", this.subSessionId),
                    o = performance.now();
                r
                    .performHttpRequest(t, this.httpRequestOptions, this.authRequestFunc, this.authInfo)
                    .then((t) => {
                        let s;
                        if (
                            ((e = performance.now()),
                            n.Log.d(a, "ActiveSessionRequest completed"),
                            n.Log.d(a, "status code: " + t.status),
                            n.Log.d(a, "data " + t.data),
                            void 0 !== t.status && (i.statusCode = String(t.status)),
                            void 0 !== t.data &&
                                ((s = JSON.parse(t.data)),
                                s.requestStatus &&
                                    ((i.requestId = s.requestStatus.requestId),
                                    (i.serverId = s.requestStatus.serverId),
                                    (i.requestStatusCode = String(s.requestStatus.statusDescription)))),
                            (i.callDuration = Math.round(e - o)),
                            this.eventEmitter.emit("AnalyticsEvent", i),
                            200 != t.status)
                        )
                            throw { code: 3237089283, description: "httperror" };
                        if (s.sessions) {
                            let e = { sessionList: this.extractSessionList(s.sessions) };
                            this.eventEmitter.emit("ActiveSessionsResult", e);
                        }
                    })
                    .catch((t) => {
                        t instanceof SyntaxError
                            ? (n.Log.e(a, "ActiveSessions Response: " + t + ": " + JSON.stringify(t)),
                              (t = { code: 3237093379, description: "invalid response" }))
                            : t.code
                            ? (n.Log.e(a, "ActiveSessions request failed with " + r.GetHexString(t.code)),
                              3237089281 === t.code && (t.code = 15868417))
                            : (n.Log.e(a, "ActiveSessions network error"),
                              (t = { code: 3237089282, description: "ActiveSessions network error" })),
                            (e = performance.now()),
                            (i.callDuration = Math.round(e - o)),
                            this.eventEmitter.emit("AnalyticsEvent", i),
                            n.Log.e(a, "GetActiveSession failed");
                        let s = { sessionList: [], error: t };
                        this.eventEmitter.emit("ActiveSessionsResult", s);
                    }),
                    n.Log.d(a, "GridServer:: GetActiveSessions--");
            }
            getSessionRequestData(e, t) {
                var i, s;
                let d = 1;
                switch (e.appLaunchMode) {
                    case 2:
                        n.Log.d(a, "Sending TouchFriendly launch mode to server"), (d = 3);
                        break;
                    case 1:
                        d = 2;
                        break;
                    default:
                        d = r.IsTouchDevice() || r.IsTV() ? 2 : 1;
                }
                let h = {
                    audioMode: 2,
                    remoteControllersBitmap: 0,
                    sdrHdrMode: 0,
                    networkTestSessionId: null,
                    availableSupportedControllers: [2],
                    clientVersion: t.clientVersion,
                    deviceHashId: t.deviceHashId,
                    internalTitle: null,
                    clientPlatformName: "browser",
                    metaData: [
                        { key: "isAppLaunchEnabled", value: "True" },
                        { key: "GSStreamerType", value: "WebRTC" },
                        { key: "SubSessionId", value: this.subSessionId },
                        { key: "wssignaling", value: o.RagnarokSettings.webSocketSignaling ? "1" : "0" },
                    ],
                    surroundAudioInfo: 0,
                    clientTimezoneOffset: 60 * new Date().getTimezoneOffset() * 1e3 * -1,
                    preferredController: 2,
                    clientIdentification: t.clientIdentification,
                    parentSessionId: null,
                    appId: e.appId,
                    streamerVersion: 1,
                    clientRequestMonitorSettings: [
                        {
                            heightInPixels: e.streamParams[0].height,
                            framesPerSecond: e.streamParams[0].fps,
                            widthInPixels: e.streamParams[0].width,
                        },
                    ],
                    appLaunchMode: d,
                    sdkVersion: "1.0",
                    enchancedStreamMode: 1,
                    useOps: !0,
                    clientDisplayHdrCapabilities: null,
                    accountLinked: null !== (i = e.accountLinked) && void 0 !== i && i,
                    partnerCustomData: null !== (s = e.partnerCustomData) && void 0 !== s ? s : "",
                };
                for (const t in e.metaData) {
                    let i = { key: t, value: e.metaData[t] };
                    h.metaData.push(i);
                }
                return h;
            }
            getActionString(e) {
                let i = "";
                switch (e) {
                    case t.SESSIONMODIFY_ACTION.RESUME:
                        i = "RESUME";
                        break;
                    case t.SESSIONMODIFY_ACTION.PAUSE:
                        i = "PAUSE";
                }
                return i;
            }
            getCancelError(e) {
                n.Log.e(a, "Cancelled session setup");
                let t = { code: 15867905, description: "cancelled session setup" };
                return 1 == e && (t.code = 15867906), t;
            }
            putOrPostSession(e, t, i) {
                var o, d;
                if (null == this.initParams) return n.Log.e(a, "GridServer:: InitParams null"), new Promise(() => {});
                this.cancelledSetup = !1;
                let h,
                    l = this.getSessionRequestData(e, this.initParams),
                    c = { sessionRequestData: l };
                if (i) {
                    const e = [];
                    let i = { action: t, data: this.getActionString(t), sessionRequestData: l, metaData: e };
                    h = JSON.stringify(i);
                } else h = JSON.stringify(c);
                let u = {
                    method: i ? "PUT" : "POST",
                    headers: this.httpRequestOptions.headers,
                    body: h,
                    retryCount: this.httpRequestOptions.retryCount,
                    timeout: this.httpRequestOptions.timeout,
                };
                n.Log.d(a, " The serialized " + (i ? "PUT" : "POST") + " request object : " + u.body);
                let m = this.protocol + this.initParams.serverAddress + "/v2/session";
                return (
                    i && (m += "/" + i),
                    (m +=
                        "?keyboardLayout=" +
                        (null !== (o = e.keyboardLayout) && void 0 !== o
                            ? o
                            : "MacOSX" == r.getPlatform().name
                            ? "m-us"
                            : "en_US")),
                    (m += "&languageCode=" + (null !== (d = e.clientLocale) && void 0 !== d ? d : "en_US")),
                    new Promise((e, t) => {
                        const o = i ? "PUT" : "POST";
                        let d,
                            h = s.getRagnarokHttpEvent(m, o, i || "", this.subSessionId),
                            l = performance.now();
                        r.performHttpRequest(m, u, i ? null : this.authRequestFunc, i ? void 0 : this.authInfo)
                            .then((i) => {
                                let s, r;
                                if (
                                    (n.Log.d(a, o + " session request completed"),
                                    n.Log.d(a, "status code: " + i.status),
                                    n.Log.d(a, "data " + i.data),
                                    (d = performance.now()),
                                    void 0 !== i.status && (h.statusCode = String(i.status)),
                                    void 0 !== i.data &&
                                        ((s = JSON.parse(i.data)),
                                        s.requestStatus &&
                                            ((this.serverId = s.requestStatus.serverId),
                                            (h.requestId = s.requestStatus.requestId),
                                            (h.serverId = s.requestStatus.serverId),
                                            (h.requestStatusCode = String(s.requestStatus.statusDescription)))),
                                    void 0 !== s.session &&
                                        ((r = this.extractSessionInformation(s.session)),
                                        s.session.sessionControlInfo &&
                                            this.sessionControlServerMap.set(r.sessionId, {
                                                server: s.session.sessionControlInfo.ip,
                                                port: s.session.sessionControlInfo.port,
                                            }),
                                        (h.sessionId = r.sessionId),
                                        n.Log.d(a, "Received session: " + r.sessionId)),
                                    (h.callDuration = Math.round(d - l)),
                                    this.eventEmitter.emit("AnalyticsEvent", h),
                                    this.cancelledSetup)
                                )
                                    t(this.getCancelError(0));
                                else if (200 === i.status) e(r);
                                else {
                                    let e;
                                    n.Log.e(a, "session request failed. http error: ", i.status),
                                        void 0 !== s.otherUserSessions &&
                                            ((e = this.extractSessionList(s.otherUserSessions)),
                                            n.Log.d(a, "Received " + e.length + " other sessions")),
                                        t(
                                            this.getErrorFromServerResponse(
                                                s.requestStatus.statusCode,
                                                null == r ? void 0 : r.sessionId,
                                                e
                                            )
                                        );
                                }
                            })
                            .catch((e) => {
                                this.cancelledSetup
                                    ? (e = this.getCancelError(0))
                                    : e instanceof SyntaxError
                                    ? (n.Log.e(a, "Session Response: " + e + ": " + JSON.stringify(e)),
                                      (e = { code: 3237093379, description: "invalid response" }))
                                    : e.code
                                    ? (n.Log.e(a, "session request failed with " + r.GetHexString(e.code)),
                                      3237089281 === e.code && (e.code = 15868417))
                                    : (n.Log.e(a, "session request did not complete"),
                                      (e = { code: 3237089282, description: "networkerror" })),
                                    (d = performance.now()),
                                    i && (h.sessionId = i),
                                    (h.callDuration = Math.round(d - l)),
                                    this.eventEmitter.emit("AnalyticsEvent", h),
                                    t(e);
                            });
                    })
                );
            }
            getErrorFromServerResponse(e, t, i) {
                let s = { code: 3237093632, sessionId: t, description: "Server http error", sessionList: i };
                return e > 0 && e < 255 && (s.code = 3237093632 + e), s;
            }
            updateSessionSetupProgress(e) {
                let t = "Configuring";
                switch (e.seatSetupInfo.seatSetupStep) {
                    case 1:
                        (t = "InQueue"),
                            e.seatSetupInfo.queuePosition < this.queuePosition &&
                                (this.queuePosition = e.seatSetupInfo.queuePosition);
                        break;
                    case 5:
                        t = "PreviousSessionCleanup";
                        break;
                    default:
                        this.queuePosition = 0;
                }
                let i = {
                    sessionId: e.sessionId,
                    subSessionId: this.subSessionId,
                    queuePosition: "InQueue" === t ? this.queuePosition : 0,
                    eta: e.seatSetupInfo.seatSetupEta,
                    state: t,
                };
                this.eventEmitter.emit("ProgressUpdate", i);
            }
            getPollingInterval(e) {
                let t = this.pollingOptions.minInterval;
                return (
                    1 == e.seatSetupInfo.seatSetupStep &&
                        0 != this.pollingOptions.queueSizePerStep &&
                        (t +=
                            Math.floor(e.seatSetupInfo.queuePosition / this.pollingOptions.queueSizePerStep) *
                            this.pollingOptions.step),
                    Math.min(t, this.pollingOptions.maxInterval)
                );
            }
            getUrlForSession(e) {
                if (null == this.initParams) return n.Log.e(a, "GridServer:: InitParams null"), "";
                let t = this.protocol;
                if (this.sessionControlServerMap.has(e)) {
                    let i = this.sessionControlServerMap.get(e);
                    void 0 !== i && ((t += i.server), 0 != i.port && (t += ":" + i.port));
                } else
                    n.Log.d(a, "Session control info not found for session: " + e + " using default server"),
                        (t += this.initParams.serverAddress);
                return (t += "/v2/session/" + e), t;
            }
            getSession(e, t) {
                let i = this.getUrlForSession(e),
                    o = 0;
                return new Promise((d, h) => {
                    let l,
                        c = s.getRagnarokHttpEvent(i, "GET", e, this.subSessionId),
                        u = performance.now(),
                        m = () => {
                            n.Log.d(a, "getSession isPoll " + t),
                                r
                                    .performHttpRequest(i, this.httpRequestOptions, null)
                                    .then((s) => {
                                        let r, g;
                                        if (
                                            ((l = performance.now()),
                                            void 0 !== s.status && (c.statusCode = String(s.status)),
                                            void 0 !== s.data &&
                                                ((r = JSON.parse(s.data)),
                                                r.requestStatus &&
                                                    ((c.requestId = r.requestStatus.requestId),
                                                    (c.serverId = r.requestStatus.serverId),
                                                    (c.requestStatusCode = String(r.requestStatus.statusDescription)))),
                                            void 0 !== r.session)
                                        ) {
                                            (g = this.extractSessionInformation(r.session)),
                                                (this.serverId = r.session.sessionControlInfo.ip
                                                    ? r.session.sessionControlInfo.ip.split(".")[0].toUpperCase()
                                                    : this.serverId);
                                            let e = this.sessionControlServerMap.get(g.sessionId);
                                            const t = r.session.sessionControlInfo;
                                            e &&
                                                t &&
                                                (e.server !== t.ip || e.port !== t.port) &&
                                                (n.Log.i(
                                                    a,
                                                    `Session: ${g.sessionId} is forwarded from zone ${e.server}:${e.port} to ${t.ip}:${t.port}`
                                                ),
                                                (e.server = t.ip),
                                                (e.port = t.port)),
                                                (c.sessionId = g.sessionId);
                                        }
                                        (c.callDuration = Math.round(l - u)),
                                            (o = r.session.seatSetupInfo.seatSetupStep),
                                            this.cancelledSetup
                                                ? (this.eventEmitter.emit("AnalyticsEvent", c),
                                                  h(this.getCancelError(o)))
                                                : 200 === s.status
                                                ? 1 == r.session.status || 6 == r.session.status
                                                    ? t
                                                        ? (this.updateSessionSetupProgress(r.session),
                                                          (i = this.getUrlForSession(e)),
                                                          (c.url = i),
                                                          window.setTimeout(
                                                              () => m(),
                                                              this.getPollingInterval(r.session)
                                                          ))
                                                        : this.eventEmitter.emit("AnalyticsEvent", c)
                                                    : 2 == r.session.status || 3 == r.session.status
                                                    ? (this.eventEmitter.emit("AnalyticsEvent", c), d(g))
                                                    : (n.Log.e(
                                                          a,
                                                          "Unexpected sessions state. Server response: " + s.data
                                                      ),
                                                      this.eventEmitter.emit("AnalyticsEvent", c),
                                                      h({ code: 3237093378, description: "unexpected session state" }))
                                                : (n.Log.e(a, "GetSession failure response: code: " + s.status),
                                                  n.Log.e(a, " data: " + s.data),
                                                  this.eventEmitter.emit("AnalyticsEvent", c),
                                                  h(this.getErrorFromServerResponse(r.requestStatus.statusCode)));
                                    })
                                    .catch((t) => {
                                        this.cancelledSetup
                                            ? (t = this.getCancelError(o))
                                            : t instanceof SyntaxError
                                            ? (n.Log.e(a, "GetSession Response: " + t + ": " + JSON.stringify(t)),
                                              (t = { code: 3237093379, description: "invalid response" }))
                                            : t.code
                                            ? (n.Log.e(a, "getsession request failed with " + r.GetHexString(t.code)),
                                              3237089281 === t.code && (t.code = 15868417))
                                            : (t = { code: 3237089282, description: "getSession network error" }),
                                            (l = performance.now()),
                                            (c.statusCode = "0"),
                                            (c.requestStatusCode = ""),
                                            (c.sessionId = e),
                                            (c.callDuration = Math.round(l - u)),
                                            this.eventEmitter.emit("AnalyticsEvent", c),
                                            h(t);
                                    });
                        };
                    m();
                });
            }
            sendDeleteRequest(e) {
                let t = this.getUrlForSession(e);
                return new Promise((i, o) => {
                    n.Log.d(a, "sending delete request for session" + e);
                    let d,
                        h = s.getRagnarokHttpEvent(t, "DELETE", e, this.subSessionId),
                        l = {
                            method: "DELETE",
                            headers: this.httpRequestOptions.headers,
                            body: "",
                            retryCount: this.httpRequestOptions.retryCount,
                            timeout: this.httpRequestOptions.timeout,
                        },
                        c = performance.now();
                    r.performHttpRequest(t, l, null)
                        .then((t) => {
                            let s;
                            (d = performance.now()),
                                void 0 !== t.status && (h.statusCode = String(t.status)),
                                void 0 !== t.data &&
                                    ((s = JSON.parse(t.data)),
                                    s.requestStatus &&
                                        ((h.requestId = s.requestStatus.requestId),
                                        (h.serverId = s.requestStatus.serverId),
                                        (h.requestStatusCode = String(s.requestStatus.statusDescription)))),
                                (h.callDuration = Math.round(d - c)),
                                this.eventEmitter.emit("AnalyticsEvent", h),
                                200 == t.status
                                    ? (n.Log.d(a, "DETELE /v2/" + e + " succeeded"), i())
                                    : (n.Log.e(a, "DETELE /v2/" + e + " failed. http code: " + t.status),
                                      o(this.getErrorFromServerResponse(s.requestStatus.statusCode)));
                        })
                        .catch((t) => {
                            t instanceof SyntaxError
                                ? (n.Log.e(a, "Delete Response: " + t + ": " + JSON.stringify(t)),
                                  (t = { code: 3237093379, description: "invalid response" }))
                                : t.code
                                ? n.Log.e(a, "delete request failed with " + r.GetHexString(t.code))
                                : (n.Log.e(a, "delete network error"),
                                  (t = { code: 3237089282, description: "delete network error" })),
                                (d = performance.now()),
                                (h.sessionId = e),
                                (h.callDuration = Math.round(d - c)),
                                this.eventEmitter.emit("AnalyticsEvent", h),
                                o(t);
                        });
                });
            }
            setSubSessionId(e) {
                this.subSessionId = e;
            }
            setAuthInfo(e) {
                this.authInfo = e;
            }
            cancelSessionSetup() {
                n.Log.i(a, "cancelSessionSetup"), (this.cancelledSetup = !0);
            }
            getServerId() {
                return this.serverId;
            }
        }
        t.GridServer = h;
        t.MockPMServer = class extends h {
            constructor(e) {
                super(e), (this.overrideSignallingInfo = !1);
            }
            initialize(e) {
                super.initialize(e), (this.authRequestFunc = this.generateAuthToken), (this.protocol = "http://");
            }
            generateAuthToken() {
                return new Promise((e, t) => {
                    window.setTimeout(() => {
                        n.Log.d(a, "Generated dummy auth token"), e("JARVIS auth =testauthToken");
                    }, 0);
                });
            }
        };
        t.PassThruServer = class extends h {
            constructor(e) {
                super(e);
            }
            getAllActiveSessions() {
                window.setTimeout(() => {
                    n.Log.d(a, "Passthru: returning empty session list");
                    this.eventEmitter.emit("ActiveSessionsResult", { sessionList: [] });
                }, 1);
            }
            putOrPostSession(e, t, i) {
                return (
                    n.Log.d(a, "passthru: Create a new session"),
                    new Promise((t, i) => {
                        window.setTimeout(() => {
                            let i = {
                                sessionId: "PassThruSessionId",
                                subSessionId: this.subSessionId,
                                appId: parseInt(e.appId),
                                state: "ready_for_connection",
                                signalConnectionInfo: { ip: "", port: 49300, protocol: "http" },
                                mediaConnectionInfo: [],
                                streamInfo: [],
                                appLaunchMode: e.appLaunchMode ? e.appLaunchMode : 0,
                            };
                            this.initParams
                                ? (i.signalConnectionInfo.ip = this.initParams.serverAddress)
                                : n.Log.e(a, "GridServer:: InitParams null"),
                                i.streamInfo.push(e.streamParams[0]),
                                n.Log.d(a, "Passthru: returning a fake session: " + i.sessionId),
                                t(i);
                        }, 1);
                    })
                );
            }
            getSession(e, t) {
                return new Promise((e, t) => {
                    t({ code: -1, description: "PassthruPollingNotSupported" });
                });
            }
            sendDeleteRequest(e) {
                return new Promise((e, t) => {
                    e();
                });
            }
        };
    },
    /*!*****************************************!*\
  !*** ./ragnarok-core/src/genversion.ts ***!
  \*****************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.version = "Local");
    },
    /*!*******************************************!*\
  !*** ./ragnarok-core/src/streamclient.ts ***!
  \*******************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./utils */ 5),
            n = i(/*! ./analytics */ 9),
            r = i(/*! ./serverclienterrormap */ 31),
            o = i(/*! ./inputhandler */ 32),
            a = i(/*! ./logger */ 6),
            d = i(/*! ./clientstatsservice */ 37),
            h = i(/*! ./ragnarokprofiler */ 12),
            l = i(/*! ./settings */ 8),
            c = i(/*! ./nvstconfig */ 41),
            u = "streamclient",
            m = 1,
            g = 2,
            p = 4,
            A = 8,
            v = 16,
            f = 32,
            S = 64;
        class w {
            constructor(e, t, i, s, n, r, o, a, d) {
                (this.name = ""),
                    (this.hangingGetTimerId = 0),
                    (this.remotePeerId = -1),
                    (this.profilerRunning = !1),
                    (this.maxBitrate = 0),
                    (this.webSocketGotOpening = !1),
                    (this.webSocketDirtyCloseCount = 0),
                    (this.signInTimeoutId = 0),
                    (this.gotOffer = !1),
                    (this.gotLocalCandidate = !1),
                    (this.gotRemoteCandidate = !1),
                    (this.gotAudioTrack = !1),
                    (this.gotVideoTrack = !1),
                    (this.cursorChannelState = 0),
                    (this.inputChannelState = 0),
                    (this.controlChannelState = 0),
                    (this.audioTrackMuted = !0),
                    (this.trackIdsExpected = []),
                    (this.streamsAttached = []),
                    (this.signInUrl = ""),
                    (this.signInRetries = 0),
                    (this.isAckSupportedOnWs = !1),
                    (this.signalingAckId = 1),
                    (this.timeTakenBySetRemoteDescriptionCall = 0),
                    (this.timeTakenBySetLocalDescriptionCall = 0),
                    (this.timeTakenByCreateAnswerCall = 0),
                    (this.signInTimerStart = 0),
                    (this.streamBeginTimerStart = Date.now()),
                    (this.signInDuration = 0),
                    (this.streamBeginDuration = 0),
                    (this.iceServers = []),
                    (this.eventEmitter = e),
                    (this.id = 0),
                    (this.nvstConfig = c.getDefaultNvstConfig()),
                    (this.session = null),
                    (this.videoElement = null),
                    (this.audioElement = null),
                    (this.peerId = -1),
                    (this.connectionUrl = ""),
                    (this.inputChannel = null),
                    (this.cursorChannel = null),
                    (this.statsChannel = null),
                    (this.controlChannel = null),
                    (this.inputHandler = null),
                    (this.stopNotified = !1),
                    (this.startNotified = !1),
                    (this.iceCandidateFlag = 0),
                    (this.httpHeaders = {}),
                    (this.userAgent = ""),
                    (this.telemetry = r),
                    (this.configFlags = t),
                    (this.micCapturer = null),
                    (this.debugMessageElement = null),
                    (this.debugMessageTimeoutId = 0),
                    (this.streamBeginTimeoutId = 0),
                    (this.heartbeatIntervalId = 0),
                    (this.callbacks = e),
                    (this.perfIndicator = !1),
                    (this.gpuViewCapture = !1),
                    (this.sendRawTouchInput = i),
                    (this.gamepadTester = s),
                    (this.gamepadHandler = n),
                    (this.audioRecorder = o),
                    (this.textInputElement = a),
                    (this.iceServers = d || []);
            }
            getNextAckId() {
                return this.signalingAckId++;
            }
            setSignInfo() {
                (this.name = "peer-" + s.GetRandNumericString(10)),
                    a.Log.d(u, "Generated stream client name is: " + this.name),
                    (this.signInUrl =
                        this.connectionUrl +
                        "/sign_in?peer_id=" +
                        this.name +
                        "&version=2&resolution=" +
                        this.nvstConfig.clientViewportHt +
                        "p@" +
                        this.nvstConfig.maxFps +
                        "," +
                        this.nvstConfig.clientViewportWd),
                    a.Log.d(u, "sign in url: " + this.signInUrl);
            }
            start(e, t, i, n, r) {
                (this.nvstConfig = c.getDefaultNvstConfig(e.streamInfo[0])),
                    (this.session = e),
                    (this.videoElement = t),
                    (this.audioElement = i),
                    (this.micCapturer = n),
                    (this.userAgent = s.getAppUserAgent()),
                    a.Log.d(u, "StreamClient: serialized session : " + JSON.stringify(e)),
                    l.RagnarokSettings.maxBitrate
                        ? ((this.maxBitrate = l.RagnarokSettings.maxBitrate),
                          a.Log.d(u, "Using max bitrate from settings: " + this.maxBitrate))
                        : r && ((this.maxBitrate = r), a.Log.d(u, "Using max bitrate from client: " + this.maxBitrate)),
                    h.RagnarokProfiler.initialize(this.session.sessionId, this.telemetry);
                let o = e.signalConnectionInfo.protocol;
                "https" == o && (this.httpHeaders["x-nv-sessionid"] = e.sessionId),
                    l.RagnarokSettings.webSocketSignaling && (o = o.replace("http", "ws")),
                    (this.connectionUrl = o + "://" + e.signalConnectionInfo.ip + ":" + e.signalConnectionInfo.port),
                    this.signInToConnectionServer(),
                    h.RagnarokProfiler.updateStreamTime();
                const d = document.createElement("div");
                (d.style.position = "absolute"),
                    (d.style.zIndex = "300"),
                    (d.style.left = "0"),
                    (d.style.top = "0"),
                    (d.style.width = "100%"),
                    (d.style.display = "none"),
                    (d.style.fontSize = "3em"),
                    (d.style.color = "white"),
                    (d.style.backgroundColor = "gray"),
                    (d.style.textAlign = "center"),
                    this.videoElement.insertAdjacentElement("afterend", d),
                    (this.debugMessageElement = d);
            }
            stop(e) {
                this.telemetry.emitMetricEvent(
                    "StreamTimers",
                    s.GetHexString(e),
                    0,
                    this.signInDuration,
                    this.streamBeginDuration,
                    0
                );
                const t = (t) => {
                    a.Log.i(u, "mic permission " + t),
                        this.telemetry.emitMetricEvent(
                            "PeerAPIDurationsAndMic",
                            s.GetHexString(e),
                            this.timeTakenByCreateAnswerCall,
                            this.timeTakenBySetRemoteDescriptionCall,
                            this.timeTakenBySetLocalDescriptionCall,
                            t
                        );
                };
                this.micCapturer.getCurrentMicStatus().then((e) => {
                    t(e);
                }),
                    this.notifyStart({ code: 15867905, description: "Session stopped before stream connected" }),
                    this.debugMessageTimeoutId &&
                        (clearTimeout(this.debugMessageTimeoutId), (this.debugMessageTimeoutId = 0)),
                    this.debugMessageElement && (this.debugMessageElement.remove(), (this.debugMessageElement = null)),
                    (this.stopNotified = !0);
                try {
                    this.sendControlMessage({ exitMessage: { code: r.getClientTerminationReason(e) } });
                } catch (e) {
                    let t = "Send termination reason to server exception";
                    a.Log.e(u, t + ": " + e);
                }
                if (
                    (this.stopInputHanlder(),
                    this.signInRequest && (this.signInRequest.abort(), (this.signInRequest = void 0)),
                    this.hangingGetXhr && (this.hangingGetXhr.abort(), (this.hangingGetXhr = void 0)),
                    0 !== this.hangingGetTimerId &&
                        (clearTimeout(this.hangingGetTimerId), (this.hangingGetTimerId = 0)),
                    this.inputChannel && this.inputChannel.close(),
                    this.statsService && this.statsService.stop(),
                    this.pc && this.pc.close(),
                    0 !== this.streamBeginTimeoutId &&
                        (window.clearTimeout(this.streamBeginTimeoutId), (this.streamBeginTimeoutId = 0)),
                    0 !== this.heartbeatIntervalId &&
                        (window.clearInterval(this.heartbeatIntervalId), (this.heartbeatIntervalId = 0)),
                    0 !== this.signInTimeoutId &&
                        (window.clearTimeout(this.signInTimeoutId), (this.signInTimeoutId = 0)),
                    h.RagnarokProfiler.stopProfiling(),
                    l.RagnarokSettings.webSocketSignaling)
                )
                    h.RagnarokProfiler.stopWebSocket();
                else if (0 != this.id) {
                    let e,
                        t = this.connectionUrl + "/sign_out?peer_id=" + this.id,
                        i = n.getRagnarokHttpEvent(t, "GET", this.session.sessionId, this.session.subSessionId),
                        r = performance.now();
                    s.performHttpRequest(t, { headers: this.httpHeaders })
                        .then((t) => {
                            void 0 !== t.status && (i.statusCode = String(t.status)),
                                (e = performance.now()),
                                (i.callDuration = Math.round(e - r)),
                                (i.serverId = String(t.retries)),
                                this.eventEmitter.emit("AnalyticsEvent", i),
                                200 == t.status
                                    ? a.Log.d(u, "Successfully signed out from streaming server")
                                    : a.Log.e(u, "Error during signout from streaming server: " + t.status);
                        })
                        .catch((t) => {
                            var s;
                            (e = performance.now()),
                                (i.callDuration = Math.round(e - r)),
                                (i.serverId = String(null !== (s = t.retries) && void 0 !== s ? s : 0)),
                                this.eventEmitter.emit("AnalyticsEvent", i),
                                a.Log.e(u, "Network error while sending the singout request");
                        });
                }
                h.RagnarokProfiler.deinitialize(),
                    this.gotVideoTrack &&
                        this.audioTrackMuted &&
                        (a.Log.e(u, "Audio track muted"), this.telemetry.emitDebugEvent("Audio track muted")),
                    this.webSocketDirtyCloseCount > 0 &&
                        this.telemetry.emitMetricEvent("WebSocketClose", "", 0, this.webSocketDirtyCloseCount, 0, 0),
                    this.destroyAudioRecorder();
            }
            addHttpHeaders(e) {
                Object.keys(this.httpHeaders).forEach((t) => {
                    e.setRequestHeader(t, this.httpHeaders[t]);
                });
            }
            messageHandler(e) {
                if (!this.startNotified)
                    if ((a.Log.i(u, "Message Received: " + JSON.stringify(e)), e.peer_info))
                        this.isAckSupportedOnWs || void 0 === e.ackid || (this.isAckSupportedOnWs = !0),
                            (e.peer_info.name !== this.name && 0 !== this.id) ||
                                ((this.id = e.peer_info.id), a.Log.d(u, "Server provided client id: " + this.id));
                    else if (e.peer_msg) {
                        let t = e.peer_msg.from;
                        this.handlePeerMessage(t, e.peer_msg.msg);
                    }
            }
            signInTimeout() {
                (this.signInTimeoutId = 0),
                    this.webSocketGotOpening
                        ? (a.Log.i(u, "Streamer timed out before signing in."), this.notifyStart({ code: 3237093907 }))
                        : (a.Log.i(u, "Worker didn't start opening the web socket when signing in"),
                          this.notifyStart({ code: 3237093908 }));
            }
            closeHandler(e) {
                if (e.error && 0 !== this.signInTimeoutId) {
                    const e = 3;
                    this.signInRetries++,
                        this.signInRetries <= e
                            ? (this.setSignInfo(), h.RagnarokProfiler.startWebSocket(this.signInUrl, this))
                            : (window.clearTimeout(this.signInTimeoutId),
                              (this.signInTimeoutId = 0),
                              a.Log.i(u, "There was an error when attempting to sign in."),
                              this.notifyStart({ code: 3237093890 }));
                }
                e.wasClean || this.webSocketDirtyCloseCount++;
            }
            openingHandler() {
                this.webSocketGotOpening = !0;
            }
            openHandler() {
                0 !== this.signInTimeoutId &&
                    (window.clearTimeout(this.signInTimeoutId),
                    (this.signInTimeoutId = 0),
                    (this.signInDuration = Date.now() - this.signInTimerStart)),
                    this.startNotified || 0 !== this.streamBeginTimeoutId || this.startStreamBeginTimeout();
            }
            signInToConnectionServer() {
                this.setSignInfo();
                let e = 1e4;
                if (
                    (l.RagnarokSettings.ragnarokConfig.signInTimeout &&
                        0 !== l.RagnarokSettings.ragnarokConfig.signInTimeout &&
                        ((e = l.RagnarokSettings.ragnarokConfig.signInTimeout),
                        a.Log.i(u, "signin timeout changed to: " + e)),
                    l.RagnarokSettings.webSocketSignaling)
                )
                    (this.signInTimeoutId = window.setTimeout(() => this.signInTimeout(), e)),
                        (this.signInTimerStart = Date.now()),
                        (this.webSocketGotOpening = !1),
                        h.RagnarokProfiler.startWebSocket(this.signInUrl, this);
                else {
                    let t,
                        i = n.getRagnarokHttpEvent(
                            this.signInUrl,
                            "GET",
                            this.session.sessionId,
                            this.session.subSessionId
                        ),
                        r = performance.now();
                    const o = (e, s) => {
                            (this.signInRequest = void 0),
                                (i.statusCode = String(e)),
                                (i.serverId = String(s)),
                                (t = performance.now()),
                                (i.callDuration = Math.round(t - r)),
                                this.eventEmitter.emit("AnalyticsEvent", i);
                        },
                        d = (e, t) => {
                            o(e, null != t ? t : 0),
                                a.Log.e(u, "Sign in request failed. status:" + e),
                                this.notifyStart({ code: 3237093890 });
                        },
                        h = 3;
                    (this.signInRequest = s.performHttpRequest(this.signInUrl, {
                        method: "POST",
                        headers: this.httpHeaders,
                        retryCount: h,
                        timeout: e / (h + 1),
                        body: "unused",
                    })),
                        this.signInRequest
                            .then((e) => {
                                if (200 === e.status) {
                                    o(e.status, e.retries), a.Log.d(u, "Sign in response: [" + e.data + "]");
                                    let t = e.data.split("\n");
                                    (this.id = parseInt(t[0].split(",")[1])),
                                        a.Log.d(u, "server provided client id: " + this.id),
                                        this.startStreamBeginTimeout(),
                                        this.performHangingGetRequest();
                                } else d(e.status, e.retries);
                            })
                            .catch((e) => {
                                if (
                                    !(null == e ? void 0 : e.aborted) &&
                                    (d(0, null == e ? void 0 : e.retries), null == e ? void 0 : e.stack)
                                ) {
                                    let t = "exception while performing streamer sign in request";
                                    a.Log.e(u, t + ": " + e),
                                        this.telemetry.emitExceptionEvent(e, t, u + ".ts", 0, 0, !0);
                                }
                            });
                }
            }
            startStreamBeginTimeout() {
                (this.streamBeginTimeoutId = window.setTimeout(() => this.streamBeginTimeout(), 3e4)),
                    (this.streamBeginTimerStart = Date.now());
            }
            streamBeginTimeout() {
                (this.streamBeginTimeoutId = 0), a.Log.i(u, "Stream timed out before starting");
                let e = 3237093895;
                this.id
                    ? this.gotOffer
                        ? this.gotAudioTrack
                            ? this.gotVideoTrack
                                ? this.gotRemoteCandidate
                                    ? this.gotLocalCandidate
                                        ? 0 === this.inputChannelState
                                            ? (e = 3237093919)
                                            : 0 === this.cursorChannelState
                                            ? (e = 3237093920)
                                            : 0 === this.controlChannelState && (e = 3237093921)
                                        : (e = 3237093903)
                                    : (e = 3237093904)
                                : (e = 3237093905)
                            : (e = 3237093914)
                        : (e = 3237093913)
                    : (e = 3237093912),
                    this.stopStreamWithError(e);
            }
            stopStreamDueToChannelClosing() {
                (s.IsChrome() || s.IsYandex()) && "closed" === this.pc.signalingState
                    ? this.stopStreamWithError(15867908)
                    : this.stopStreamWithError(15867907);
            }
            stopStreamWithError(e) {
                var t;
                if ((this.stopInputHanlder(), !this.stopNotified)) {
                    if (((this.stopNotified = !0), this.startNotified)) {
                        let i = {
                            sessionId: this.session.sessionId,
                            subSessionId: this.session.subSessionId,
                            error: { code: e },
                        };
                        this.telemetry.emitDebugEvent(
                            "SignalingState",
                            s.GetHexString(e),
                            null === (t = this.pc) || void 0 === t ? void 0 : t.signalingState
                        ),
                            a.Log.i(u, "Stopping stream signalingState: " + this.pc.signalingState),
                            this.callbacks.onStreamStop(i);
                    } else this.notifyStart({ code: e });
                    a.Log.e(u, "Stopping Stream with error " + s.GetHexString(e));
                }
            }
            getStreamAfterRenaming() {
                let e = [];
                for (const t of this.streamsAttached) {
                    let i = { streamId: t.streamId, tracks: Array.from(t.tracks) };
                    "stream_id" === i.streamId && 2 === this.streamsAttached.length
                        ? (i.streamId = "app_video_stream")
                        : "stream_id" === i.streamId
                        ? (i.streamId = "app_media_stream")
                        : "second_stream_id" === i.streamId && (i.streamId = "app_audio_stream"),
                        e.push(i);
                }
                return e;
            }
            notifyStart(e) {
                if (!this.startNotified) {
                    (this.streamBeginDuration = Date.now() - this.streamBeginTimerStart),
                        l.RagnarokSettings.statsUploadEnabled && void 0 === e && this.startProfiler(),
                        (this.startNotified = !0),
                        0 !== this.streamBeginTimeoutId &&
                            (window.clearTimeout(this.streamBeginTimeoutId), (this.streamBeginTimeoutId = 0));
                    let t = {
                        sessionId: this.session.sessionId,
                        subSessionId: this.session.subSessionId,
                        streams: this.getStreamAfterRenaming(),
                        error: e,
                    };
                    this.callbacks.onSessionStart(t);
                }
            }
            sendControlMessage(e) {
                var t;
                try {
                    if ("open" === (null === (t = this.controlChannel) || void 0 === t ? void 0 : t.readyState)) {
                        let t = performance.now();
                        this.controlChannel.send(JSON.stringify(e));
                        let i = performance.now() - t;
                        this.updateDcTimeDuration(i);
                    } else a.Log.w(u, "Couldn't send control channel message");
                } catch (e) {
                    let t = "sendControlMessage exception";
                    a.Log.e(u, t + ": " + e), this.telemetry.emitExceptionEvent(e, t, u + ".ts", 0, 0, !0);
                }
            }
            updateDcTimeDuration(e) {
                var t;
                h.RagnarokProfiler.addDataChannelSendTime(e),
                    null === (t = this.statsService) || void 0 === t || t.updateDcSendDuration(e);
            }
            updateBlockedDuration(e) {
                var t;
                null === (t = this.statsService) || void 0 === t || t.updateBlockedDuration(e);
            }
            sendTimerEvent(e) {
                let t = r.getRNotificationCode(e.timerNotification.code);
                if (0 === t)
                    return void a.Log.e(
                        u,
                        "Unknown timerNotification from server. servercode: " + e.timerNotification.code
                    );
                this.inputHandler && 2 === t && this.inputHandler.setUserIdleTimeoutPending(!0),
                    a.Log.d(
                        u,
                        "Timer Notification Event. Code: " + t + " timeleft : " + e.timerNotification.secondsLeft
                    );
                let i = { streamingWarnings: { code: t, secondsLeft: e.timerNotification.secondsLeft } };
                this.eventEmitter.emit("StreamingEvent", i);
            }
            emitCustomMessageEvent(e) {
                this.eventEmitter.emit("CustomMessage", JSON.parse(e));
            }
            performHangingGetRequest() {
                this.hangingGetTimerId = 0;
                let e = n.getRagnarokHttpEvent("", "GET", this.session.sessionId, this.session.subSessionId),
                    t = performance.now(),
                    i = !1,
                    s = !1;
                const r = new XMLHttpRequest();
                (this.hangingGetXhr = r),
                    (r.onloadend = () => {
                        if (i) return;
                        if (200 == r.status) {
                            a.Log.d(u, "hanging get request succeeded response:\n" + r.responseText);
                            let e = r.getResponseHeader("Pragma");
                            if ((a.Log.d(u, "peer Id header" + e), null != e && e.length)) {
                                let t = parseInt(e);
                                t != this.id &&
                                    (a.Log.d(u, "*[Message] <\n" + r.responseText + "\n>"),
                                    this.handlePeerMessage(t, r.responseText));
                            } else a.Log.e(u, "hanging get response doesnt have peer id");
                        } else if (!s && 504 !== r.status) {
                            0 === r.status
                                ? a.Log.e(u, "hanging get request failed without a response")
                                : a.Log.e(u, "hanging get request failed. status: " + r.status),
                                (e.statusCode = String(r.status));
                            const i = performance.now();
                            (e.callDuration = Math.round(i - t)), this.eventEmitter.emit("AnalyticsEvent", e);
                        }
                        const n = s || 200 === r.status || 504 === r.status ? 0 : 2e3;
                        this.hangingGetTimerId = window.setTimeout(() => this.performHangingGetRequest(), n);
                    }),
                    (r.onabort = () => {
                        i = !0;
                    }),
                    (r.ontimeout = () => {
                        s = !0;
                    });
                let o = this.connectionUrl + "/wait?peer_id=" + this.id;
                (e.url = o),
                    a.Log.d(u, "performing hanging get: " + o),
                    r.open("GET", o),
                    (r.timeout = 1e4),
                    this.addHttpHeaders(r),
                    r.send();
            }
            createPeerConnection(e) {
                a.Log.d(u, "attempting peer connection to: " + e);
                try {
                    const h = { iceServers: this.iceServers };
                    let c = { optional: [{ DtlsSrtpKeyAgreement: !0 }] };
                    a.Log.d(u, "* configuration:" + JSON.stringify(h)),
                        a.Log.d(u, "* options      :" + JSON.stringify(c)),
                        0 === this.maxBitrate &&
                            ((this.maxBitrate =
                                ((t = this.nvstConfig.clientViewportWd),
                                (i = this.nvstConfig.clientViewportHt),
                                30 == (n = this.nvstConfig.maxFps)
                                    ? Math.round((t * i * n * 0.32) / 1200)
                                    : Math.round((t * i * n * 0.256) / 1200))),
                            a.Log.d(u, "Using calculated max bitrate: " + this.maxBitrate)),
                        (this.remotePeerId = e),
                        (this.pc = new RTCPeerConnection(h));
                    const w = (e) => {
                        (this.iceCandidateFlag |= v),
                            0 == (this.iceCandidateFlag & p)
                                ? this.stopStreamWithError(3237093894)
                                : this.statsService && 0 == this.statsService.packetsReceived()
                                ? this.stopStreamWithError(3237093900)
                                : this.statsService && 0 == this.statsService.getFramesDecoded()
                                ? this.stopStreamWithError(3237093901)
                                : e
                                ? this.stopStreamWithError(3237093906)
                                : this.stopStreamWithError(3237093899);
                    };
                    (this.pc.onconnectionstatechange = (e) => {
                        if (this.pc)
                            switch ((a.Log.d(u, "pc state: " + this.pc.connectionState), this.pc.connectionState)) {
                                case "connected":
                                case "disconnected":
                                    break;
                                case "failed":
                                    w(!1);
                            }
                        else a.Log.e(u, "pc is null");
                    }),
                        (this.pc.oniceconnectionstatechange = (e) => {
                            if (this.pc)
                                switch (
                                    (a.Log.d(u, "peer iceConnectionState state: " + this.pc.iceConnectionState),
                                    this.pc.iceConnectionState)
                                ) {
                                    case "new":
                                        this.iceCandidateFlag |= m;
                                        break;
                                    case "checking":
                                        this.iceCandidateFlag |= g;
                                        break;
                                    case "connected":
                                        this.iceCandidateFlag & f &&
                                            this.eventEmitter.emit("StreamingEvent", {
                                                streamingState: { state: "reconnected" },
                                            }),
                                            (this.iceCandidateFlag |= p);
                                        break;
                                    case "completed":
                                        this.iceCandidateFlag |= A;
                                        break;
                                    case "failed":
                                        w(!0);
                                        break;
                                    case "disconnected":
                                        this.iceCandidateFlag & p &&
                                            this.eventEmitter.emit("StreamingEvent", {
                                                streamingState: { state: "reconnecting" },
                                            }),
                                            (this.iceCandidateFlag |= f);
                                        break;
                                    case "closed":
                                        (this.iceCandidateFlag |= S),
                                            0 != (this.iceCandidateFlag & f) && this.stopStreamWithError(3237093892);
                                }
                            else a.Log.e(u, "pc is null");
                        }),
                        (this.pc.ondatachannel = (e) => {
                            a.Log.d(u, "Server created a DataChannel: " + e.channel.label),
                                "control_channel" == e.channel.label &&
                                    ((e.channel.onopen = () => {
                                        a.Log.d(u, "Control channel opened"),
                                            (this.controlChannel = e.channel),
                                            (this.controlChannelState = 1),
                                            this.checkAndNotifyStartToClient();
                                    }),
                                    (e.channel.onclosing = () => {
                                        a.Log.d(u, "control channel closing"), (this.controlChannelState = 2);
                                    }),
                                    (e.channel.onerror = (e) => {
                                        2 === this.controlChannelState
                                            ? this.stopStreamDueToChannelClosing()
                                            : (this.emitChannelErrorEvent("control", e),
                                              this.stopStreamWithError(3237093898));
                                    }),
                                    (e.channel.onclose = () => {
                                        a.Log.d(u, "Control channel closed"), (this.controlChannelState = 3);
                                    }),
                                    (e.channel.onmessage = (e) => {
                                        try {
                                            let t = JSON.parse(e.data);
                                            a.Log.d(u, "Received message on control channel"),
                                                t.exitMessage
                                                    ? this.stopStreamWithError(
                                                          r.getRErrorCodeForExitMessage(t.exitMessage)
                                                      )
                                                    : t.timerNotification
                                                    ? this.sendTimerEvent(t)
                                                    : t.debugMessage
                                                    ? this.showDebugMessage(t.debugMessage.message)
                                                    : t.customMessage
                                                    ? this.emitCustomMessageEvent(t.customMessage)
                                                    : a.Log.d(u, "Received Unknown message");
                                        } catch (e) {
                                            let t = "Error in control_channel message handling";
                                            a.Log.e(u, t + ": " + e),
                                                this.telemetry.emitExceptionEvent(e, t, u + ".ts", 0, 0, !0);
                                        }
                                    }));
                        }),
                        a.Log.d(u, "* creating input channel");
                    let C = { ordered: !0, reliable: !0, priority: 256 };
                    a.Log.d(u, "* createdInputChannel * "),
                        (this.inputChannel = this.pc.createDataChannel("input_channel_v1", C)),
                        this.inputChannel
                            ? ((this.inputChannel.onopen = () => {
                                  a.Log.d(u, "input channel opened"),
                                      (this.inputHandler = new o.InputHandler(
                                          this,
                                          this.videoElement,
                                          this.inputChannel,
                                          this.telemetry,
                                          this.eventEmitter,
                                          this.configFlags,
                                          this.sendRawTouchInput,
                                          this.gamepadTester,
                                          this.gamepadHandler,
                                          this.textInputElement
                                      )),
                                      this.configFlags.allowUnconfined || this.inputHandler.setCursorConfinement(!0),
                                      (this.inputChannelState = 1),
                                      this.checkAndNotifyStartToClient();
                              }),
                              (this.inputChannel.onclosing = () => {
                                  a.Log.d(u, "input channel closing"), (this.inputChannelState = 2);
                              }),
                              (this.inputChannel.onclose = () => {
                                  a.Log.d(u, "input channel closed"), (this.inputChannelState = 3);
                              }),
                              (this.inputChannel.onerror = (e) => {
                                  var t;
                                  2 === this.inputChannelState
                                      ? this.stopStreamDueToChannelClosing()
                                      : (this.emitChannelErrorEvent(
                                            "input",
                                            e,
                                            null === (t = this.inputChannel) || void 0 === t ? void 0 : t.bufferedAmount
                                        ),
                                        this.stopStreamWithError(3237093896));
                              }))
                            : a.Log.e(u, "input channel is null"),
                        l.RagnarokSettings.webrtcStatsEnabled &&
                            (a.Log.d(u, "starting stats service"),
                            (this.statsService = new d.ClientStatsService(
                                this.eventEmitter,
                                this,
                                this.pc,
                                this.telemetry
                            )));
                    let b = { ordered: !0, reliable: !0, binary: !0, priority: 256 };
                    (this.cursorChannel = this.pc.createDataChannel("cursor_channel", b)),
                        this.cursorChannel &&
                            ((this.cursorChannel.binaryType = "arraybuffer"),
                            (this.cursorChannel.onopen = (e) => {
                                a.Log.d(u, "cursor channel opened"),
                                    (this.cursorChannelState = 1),
                                    this.checkAndNotifyStartToClient();
                            }),
                            (this.cursorChannel.onclosing = () => {
                                a.Log.d(u, "cursor channel closing"), (this.cursorChannelState = 2);
                            }),
                            (this.cursorChannel.onclose = (e) => {
                                a.Log.d(u, "cursor channel closed"), (this.cursorChannelState = 3);
                            }),
                            (this.cursorChannel.onerror = (e) => {
                                2 === this.cursorChannelState
                                    ? (a.Log.d(u, "cursor channel closing"), this.stopStreamDueToChannelClosing())
                                    : (this.emitChannelErrorEvent("cursor", e), this.stopStreamWithError(3237093897));
                            }),
                            (this.cursorChannel.onmessage = (e) => {
                                this.onCursorMessage(e);
                            })),
                        s.IsChrome() ||
                            this.pc.addEventListener("icecandidate", (e) => {
                                a.Log.d(u, "* event: icecandidate ----\x3e "),
                                    this.pc &&
                                        this.pc.canTrickleIceCandidates &&
                                        this.pc.onicecandidate &&
                                        this.pc.onicecandidate(e);
                            }),
                        (this.pc.onsignalingstatechange = (e) => {
                            a.Log.i(u, "onsignalingstatechange: " + this.pc.signalingState);
                        }),
                        (this.pc.onicecandidate = (t) => {
                            if ((a.Log.d(u, "* pc.onicecandidate event=" + t), t.candidate)) {
                                if ("tcp" === t.candidate.protocol) return void a.Log.d(u, "Ignoring TCP candidate");
                                a.Log.d(u, "# pc.onicecandidate " + t.candidate.candidate);
                                const i = {
                                    sdpMLineIndex: t.candidate.sdpMLineIndex,
                                    sdpMid: t.candidate.sdpMid,
                                    candidate: t.candidate.candidate,
                                };
                                this.sendDataToPeer(e, i), (this.gotLocalCandidate = !0);
                            } else a.Log.d(u, "# End of candidates.");
                        }),
                        (this.pc.onicecandidateerror = (e) => {
                            a.Log.w(
                                u,
                                `Ice candidate error, host: ${e.address}:${e.port}, stun server: ${e.url}, error: ${e.errorCode} ${e.errorText}`
                            );
                        }),
                        l.RagnarokSettings.micEnabled &&
                            this.micCapturer &&
                            this.micCapturer.initialize(
                                this.pc,
                                this.eventEmitter,
                                this.videoElement,
                                this.audioElement,
                                this.session.sessionId,
                                this.session.subSessionId
                            ),
                        (this.pc.ontrack = (e) => {
                            const t = e.streams[0];
                            a.Log.d(
                                u,
                                "Received remote stream:" +
                                    t.id +
                                    " kind: " +
                                    e.track.kind +
                                    " trackid: " +
                                    e.track.id +
                                    " streams: " +
                                    e.streams.length +
                                    " iceCandidateFlag: " +
                                    s.GetHexString(this.iceCandidateFlag)
                            );
                            let i = { kind: "video" === e.track.kind ? "video" : "audio", trackId: e.track.id };
                            const n = () => "stream_id" === t.id || "app_media_stream" === t.id,
                                r = () => "second_stream_id" === t.id || "app_audio_stream" === t.id;
                            "video" === e.track.kind && n()
                                ? ((this.gotVideoTrack = !0), (this.videoElement.srcObject = t))
                                : "audio" === e.track.kind &&
                                  (n() || r()) &&
                                  ((this.gotAudioTrack = !0),
                                  r() && (this.audioElement.srcObject = t),
                                  this.signalAudioPacketsReceived(t),
                                  this.audioRecorder &&
                                      (this.audioRecorder.audioStream = new MediaStream(t.getAudioTracks())));
                            let o = this.streamsAttached.find((e) => e.streamId === t.id);
                            o ? o.tracks.push(i) : this.streamsAttached.push({ streamId: t.id, tracks: [i] }),
                                this.checkAndNotifyStartToClient();
                        });
                } catch (e) {
                    let t = "Exception in creating peer connection";
                    a.Log.e(u, t + ": " + e), this.telemetry.emitExceptionEvent(e, t, u + ".ts", 0, 0, !0);
                }
                var t, i, n;
            }
            createAudioRecorder() {
                var e;
                null === (e = this.audioRecorder) || void 0 === e || e.createRecorder();
            }
            startAudioRecord(e) {
                var t;
                null === (t = this.audioRecorder) || void 0 === t || t.startRecord(e);
            }
            destroyAudioRecorder() {
                var e;
                null === (e = this.audioRecorder) || void 0 === e || e.destroyRecorder();
            }
            stopInputHanlder() {
                this.inputHandler && (this.inputHandler.uninitialize(), (this.inputHandler = null));
            }
            onCursorMessage(e) {
                let t = new Uint8Array(e.data);
                if (this.inputHandler) {
                    const e = 0,
                        i = 1,
                        s = 10;
                    switch (t[0]) {
                        case e:
                        case i:
                            let n = t[1],
                                r = t[2],
                                o = t[3],
                                a = t[4],
                                d = 5,
                                h = () => {
                                    const e = t[d] + (t[d + 1] << 8);
                                    return (d += 2), e;
                                },
                                l = "";
                            if (0 != a) {
                                let e = t.subarray(d, d + a);
                                (d += a), (l = new TextDecoder("utf-8").decode(e));
                            }
                            const c = h();
                            let u = "";
                            if (0 != c) {
                                let e = t.subarray(d, d + c);
                                (d += c), (u = new TextDecoder("utf-8").decode(e));
                            }
                            let m = null,
                                g = null;
                            d + 4 <= t.byteLength && ((m = h()), (g = h())),
                                t[0] == e
                                    ? this.inputHandler.handleSystemCursor(n, m, g)
                                    : this.inputHandler.handleBitmapCursor(n, r, o, l, u, m, g);
                            break;
                        case s:
                            if (this.configFlags.allowUnconfined) {
                                let e = t[1];
                                this.inputHandler.setCursorConfinement(1 == e);
                            }
                    }
                }
            }
            updateIceCandidate(e) {
                if ((a.Log.d(u, "checking for ice candidate update"), this.session.mediaConnectionInfo.length)) {
                    let t = e.split(" ");
                    (t[0] = "candidate:" + s.GetRandNumericString(10)),
                        (t[3] = t[3].slice(0, 4) + s.GetRandNumericString(6)),
                        (t[4] = this.session.mediaConnectionInfo[0].ip),
                        (t[5] = "" + this.session.mediaConnectionInfo[0].port);
                    for (let e = 6; e < t.length - 1; e++) "network-id" === t[e] && (t[e + 1] = t[e + 1] + "1");
                    let i = t.join(" ");
                    return a.Log.d(u, "Ice candidate overridden to: " + i), i;
                }
                return a.Log.d(u, "using server provided ice candidates"), e;
            }
            didReceiveExpectedTracks() {
                let e = [];
                for (const t of this.streamsAttached) for (const i of t.tracks) e.push(i.trackId);
                if (this.trackIdsExpected.length !== e.length) return !1;
                for (const t of this.trackIdsExpected) if (!e.some((e) => e === t)) return !1;
                return a.Log.d(u, "All tracks received"), !0;
            }
            cacheTrackIdsExpected() {
                let e = this.pc.getTransceivers();
                if (0 === e.length)
                    return a.Log.d(u, "No tracks to cache"), void this.notifyStart({ code: 3237093909 });
                for (const t of e) this.trackIdsExpected.push(t.receiver.track.id);
                a.Log.d(u, "tracks expected: " + JSON.stringify(this.trackIdsExpected));
            }
            handlePeerMessage(e, t) {
                var i;
                a.Log.d(u, "* handlePeerMessage from remote peer " + e);
                try {
                    const n = JSON.parse(t);
                    if ("offer" === n.type) {
                        this.gotOffer = !0;
                        let t = void 0;
                        if (n.nvstSdp) {
                            const e = null !== (i = n.nvstServerOverrides) && void 0 !== i ? i : "";
                            if (((t = this.handleNvstSdp(n.nvstSdp, e)), !t)) return;
                        }
                        this.createPeerConnection(e);
                        let r = Date.now();
                        const o = new RTCSessionDescription({ type: n.type, sdp: n.sdp });
                        this.pc
                            .setRemoteDescription(o)
                            .then(() => {
                                (this.timeTakenBySetRemoteDescriptionCall = Date.now() - r),
                                    this.cacheTrackIdsExpected(),
                                    a.Log.d(
                                        u,
                                        "onRemoteSdpSuccess , duration " + this.timeTakenBySetRemoteDescriptionCall
                                    );
                                let i = {
                                    mandatory: {
                                        OfferToReceiveAudio: !0,
                                        OfferToReceiveVideo: !0,
                                        audio: !0,
                                        video: { width: { min: "" }, height: { min: "" }, frameRate: { min: "" } },
                                    },
                                };
                                (i.mandatory.video.width.min = this.nvstConfig.clientViewportWd.toString()),
                                    (i.mandatory.video.height.min = this.nvstConfig.clientViewportHt.toString()),
                                    (i.mandatory.video.frameRate.min = this.nvstConfig.maxFps.toString()),
                                    a.Log.d(u, "* mediaConstraints >>> " + JSON.stringify(i));
                                (r = Date.now()),
                                    this.pc
                                        .createAnswer(i)
                                        .then((i) => {
                                            (this.timeTakenByCreateAnswerCall = Date.now() - r),
                                                a.Log.d(
                                                    u,
                                                    "* respond to remote peer with an ANSWER , duration " +
                                                        this.timeTakenByCreateAnswerCall
                                                );
                                            let n = Math.max(this.maxBitrate, 4e3).toString(),
                                                o = "" + Math.max(4e3, Math.round(this.maxBitrate / 4));
                                            a.Log.d(u, "* setLocalDescription >>> : \n" + i.sdp),
                                                void 0 !== i.sdp &&
                                                    ((i.sdp = w.GetMediaBitrateUpdatedSDP(i.sdp, "video", n)),
                                                    s.IsChrome() &&
                                                        (i.sdp = w.GetGoogBitrateUpdatedSDP(
                                                            i.sdp,
                                                            "video",
                                                            "4000",
                                                            n,
                                                            o
                                                        )),
                                                    (i.sdp = w.AddOpusStereoSupported(i.sdp, "audio")),
                                                    a.Log.d(u, "* >>> MODIFIED SDP : \n" + i.sdp)),
                                                (r = Date.now()),
                                                this.pc
                                                    .setLocalDescription(i)
                                                    .then(() => {
                                                        (this.timeTakenBySetLocalDescriptionCall = Date.now() - r),
                                                            a.Log.d(
                                                                u,
                                                                "setLocalDescription succeeded , duration " +
                                                                    this.timeTakenBySetLocalDescriptionCall
                                                            ),
                                                            void 0 === i.sdp ||
                                                                s.IsChrome() ||
                                                                (i.sdp = w.GetGoogBitrateUpdatedSDP(
                                                                    i.sdp,
                                                                    "video",
                                                                    "4000",
                                                                    n,
                                                                    o
                                                                ));
                                                        const d = { type: i.type, sdp: i.sdp, nvstSdp: t };
                                                        this.sendDataToPeer(e, d),
                                                            a.Log.i(
                                                                u,
                                                                "attached streams: " +
                                                                    JSON.stringify(this.streamsAttached)
                                                            ),
                                                            this.checkAndNotifyStartToClient();
                                                    })
                                                    .catch((e) => {
                                                        a.Log.e(u, "setLocalDescription failed. Error: " + e),
                                                            this.stopStreamWithError(3237093902);
                                                    });
                                        })
                                        .catch((e) => {
                                            a.Log.d(u, "Create answer error:", e);
                                        });
                            })
                            .catch((e) => {
                                a.Log.e(u, "onRemoteSdpError: ", e), this.stopStreamWithError(3237093902);
                            });
                    } else if (n.candidate) {
                        a.Log.d(u, "Adding ICE candidate ");
                        let e = this.updateIceCandidate(n.candidate);
                        a.Log.d(u, "updated ice candidate: " + e);
                        let t = new RTCIceCandidate({ sdpMLineIndex: n.sdpMLineIndex, candidate: e });
                        this.pc
                            .addIceCandidate(t)
                            .then(() => {
                                a.Log.d(u, "add ice candidate succeeded"), (this.gotRemoteCandidate = !0);
                            })
                            .catch((e) => {
                                a.Log.e(u, "add ice candidate failed " + e),
                                    this.telemetry.emitDebugEvent(
                                        "AddCandidateFailed",
                                        null == e ? void 0 : e.name,
                                        null == e ? void 0 : e.message
                                    );
                            }),
                            a.Log.d(u, "add ice candidate --");
                    }
                } catch (e) {
                    if ("BYE" === t) this.stopStreamWithError(15868672);
                    else {
                        let t = "Invalid handlePeerMessage Response";
                        a.Log.e(u, t + ": " + e), this.telemetry.emitExceptionEvent(e, t, u + ".ts", 0, 0, !0);
                    }
                }
            }
            handleNvstSdp(e, t) {
                var i;
                const s = c.handleNvstOffer(this.nvstConfig, e, t);
                return s.config && s.answer
                    ? ((this.nvstConfig = s.config), s.answer)
                    : void this.notifyStart({ code: null !== (i = s.error) && void 0 !== i ? i : 3237093910 });
            }
            toggleOnScreenStats() {
                this.statsService && this.statsService.isRunning()
                    ? this.statsService.toggleOnScreenStats()
                    : this.showDebugMessage("Stats is OFF. Please enable by ctrl+alt+F5/F6");
            }
            toggleProfiler() {
                this.profilerRunning
                    ? (h.RagnarokProfiler.stopProfiling(),
                      (this.profilerRunning = !1),
                      this.disableWebRTCStats(),
                      this.showDebugMessage("Profiler: OFF, Stats: OFF"))
                    : (this.startProfiler(),
                      this.enableWebRTCStats(),
                      this.showDebugMessage("Profiler: ON, Stats: ON"));
            }
            toggleWebRTCStats() {
                this.statsService && this.statsService.isRunning()
                    ? (this.disableWebRTCStats(), this.showDebugMessage("Stats: OFF"))
                    : (this.enableWebRTCStats(), this.showDebugMessage("Stats: ON"));
            }
            enableWebRTCStats() {
                this.statsService && !this.statsService.isRunning() && this.statsService.startStats();
            }
            disableWebRTCStats() {
                this.statsService && this.statsService.isRunning() && this.statsService.stopStats();
            }
            sendDataToPeer(e, t) {
                const i = JSON.stringify(t);
                if (l.RagnarokSettings.webSocketSignaling) {
                    let t = {
                        peer_msg: { from: this.id, to: e, msg: i },
                        ackid: this.isAckSupportedOnWs ? this.getNextAckId() : void 0,
                    };
                    a.Log.d(
                        u,
                        "* sendDataToPeer - remote peer " +
                            e +
                            " data to send (len: " +
                            i.length +
                            ") <\n" +
                            JSON.stringify(t) +
                            "\n>"
                    ),
                        h.RagnarokProfiler.sendOverWs(t);
                } else {
                    let t,
                        s = n.getRagnarokHttpEvent("", "POST", this.session.sessionId, this.session.subSessionId),
                        r = performance.now();
                    try {
                        let n = this.connectionUrl + "/message?peer_id=" + this.id + "&to=" + e;
                        s.url = n;
                        let o = new XMLHttpRequest();
                        (o.onreadystatechange = () => {
                            4 == o.readyState &&
                                ((s.statusCode = String(o.status)),
                                (t = performance.now()),
                                (s.callDuration = Math.round(t - r)),
                                200 == o.status
                                    ? a.Log.d(u, "successfully sent message to peer: " + e)
                                    : (this.eventEmitter.emit("AnalyticsEvent", s),
                                      a.Log.e(u, "failed to send message to peer: " + e)));
                        }),
                            o.open("POST", n, !0),
                            o.setRequestHeader("Content-Type", "text/plain"),
                            this.addHttpHeaders(o),
                            a.Log.d(u, "* sendDataToPeer - remote peer " + e + " data to send <\n" + i + "\n>"),
                            o.send(i);
                    } catch (e) {
                        let t = "send to peer error";
                        a.Log.e(u, t + ": " + e), this.telemetry.emitExceptionEvent(e, t, u + ".ts", 0, 0, !0);
                    }
                }
            }
            getFramesDecoded() {
                return this.statsService ? this.statsService.getFramesDecoded() : 0;
            }
            getVideoCodec() {
                return this.statsService ? this.statsService.getVideoCodec() : "UNKNOWN";
            }
            toggleUserInput(e) {
                a.Log.d(u, "calling toggleUserInput " + (null !== this.inputHandler) + " " + e),
                    this.inputHandler && this.inputHandler.toggleUserInput(e);
            }
            showDebugMessage(e) {
                this.debugMessageElement &&
                    ((this.debugMessageElement.innerHTML = e),
                    (this.debugMessageElement.style.display = "block"),
                    this.debugMessageTimeoutId && clearTimeout(this.debugMessageTimeoutId),
                    (this.debugMessageTimeoutId = window.setTimeout(() => {
                        this.debugMessageElement && (this.debugMessageElement.style.display = "none");
                    }, 1e3)));
            }
            startProfiler() {
                let e, t;
                if (l.RagnarokSettings.webSocketSignaling) {
                    let t = { stats: { from: this.id, to: this.remotePeerId } };
                    const s = JSON.stringify(t),
                        n = s.length,
                        r = n + 2;
                    e = new ArrayBuffer(r);
                    let o = new DataView(e);
                    o.setUint16(0, n);
                    for (var i = 2; i < r; ++i) o.setUint8(i, s.charCodeAt(i - 2));
                } else t = this.connectionUrl + "/stats?peer_id=" + this.id + "&to=" + this.remotePeerId;
                h.RagnarokProfiler.startProfiling(e, t), (this.profilerRunning = !0);
            }
            static GetMediaBitrateUpdatedSDP(e, t, i) {
                let s = e.split("\r\n"),
                    n = -1;
                for (let e = 0; e < s.length; e++)
                    if (0 === s[e].indexOf("m=" + t)) {
                        n = e;
                        break;
                    }
                if (-1 === n) return a.Log.e(u, "Could not find m=", t), e;
                for (
                    a.Log.d(u, "Found m=", t, " at line:", n), n++;
                    0 === s[n].indexOf("i=") || 0 === s[n].indexOf("c=");

                )
                    n++;
                if (0 === s[n].indexOf("b"))
                    return a.Log.d(u, "Override b=AS: line at line", n), (s[n] = "b=AS:" + i), s.join("\r\n");
                a.Log.d(u, "Adding new b line before line", n);
                let r = s.slice(0, n);
                return r.push("b=AS:" + i), (r = r.concat(s.slice(n, s.length))), r.join("\r\n");
            }
            static AddOpusStereoSupported(e, t) {
                let i = e.split("\r\n"),
                    s = -1;
                for (let e = 0; e < i.length; e++)
                    if (0 === i[e].indexOf("m=" + t)) {
                        s = e;
                        break;
                    }
                if (-1 === s) return a.Log.d(u, "Could not find m=", t), e;
                a.Log.d(u, "Found m=", t, " at line:", s);
                let n = i[s].split(" ")[3];
                for (let e = s; e < i.length; e++)
                    if (0 === i[e].indexOf("a=fmtp:" + n + " ")) {
                        s = e;
                        break;
                    }
                if (s === i.length) return a.Log.e(u, "Could not find fmtp for m=", t, ": ", n), e;
                let r = i[s];
                a.Log.d(u, "Found fmtp=", r), (r += ";stereo=1"), a.Log.d(u, "Modified fmtp = " + r);
                let o = i.slice(0, s - 1);
                return o.push(r), (o = o.concat(i.slice(s))), o.join("\r\n");
            }
            static GetGoogBitrateUpdatedSDP(e, t, i, s, n) {
                let r = e.split("\r\n"),
                    o = -1;
                for (let e = 0; e < r.length; e++)
                    if (0 === r[e].indexOf("m=" + t)) {
                        o = e;
                        break;
                    }
                if (-1 === o) return a.Log.e(u, "Could not find m=", t), e;
                a.Log.d(u, "Found m=", t, " at line:", o), o++;
                let d = "";
                (d += ";x-google-max-bitrate=" + s),
                    (d += ";x-google-min-bitrate=" + i),
                    (d += ";x-google-start-bitrate=" + n);
                let h = new Set();
                for (; o < r.length && 0 !== r[o].indexOf("m="); ) {
                    const e = r[o];
                    if (0 === e.indexOf("a=rtpmap:") && e.indexOf("H264/") > 0) {
                        const t = e.slice(9, e.indexOf(" "));
                        h.add(t);
                    } else if (0 === e.indexOf("a=fmtp:")) {
                        const t = e.slice(7, e.indexOf(" "));
                        h.has(t) && (r[o] += d);
                    }
                    o++;
                }
                return r.join("\r\n");
            }
            getMaxBitRate() {
                return this.maxBitrate;
            }
            getVirtualGamepadHandler() {
                var e;
                return null === (e = this.inputHandler) || void 0 === e ? void 0 : e.getVirtualGamepadHandler();
            }
            getVideoElement() {
                return this.videoElement;
            }
            togglePerfIndicator() {
                this.perfIndicator = !this.perfIndicator;
                let e = { perfIndicator: { on: this.perfIndicator } };
                this.sendControlMessage(e);
            }
            sendLatencyTrigger() {
                this.sendControlMessage({ latencyTrigger: !0 });
            }
            sendPcmDumpTrigger() {
                this.sendControlMessage({ pcmDumpTrigger: !0 });
            }
            toggleGpuViewCapture() {
                this.gpuViewCapture = !this.gpuViewCapture;
                let e = { gpuViewCapture: { on: this.gpuViewCapture } };
                this.sendControlMessage(e),
                    a.Log.i(u, "GPU view capture toggle detected " + (this.gpuViewCapture ? "ON" : "OFF"));
            }
            sendTextInput(e) {
                var t;
                null === (t = this.inputHandler) || void 0 === t || t.sendTextInput(e);
            }
            setVirtualKeyboardState(e) {
                var t;
                null === (t = this.inputHandler) || void 0 === t || t.setVirtualKeyboardState(e);
            }
            setVideoTransforms(e, t, i) {
                var s;
                null === (s = this.inputHandler) || void 0 === s || s.applyVideoTransforms(e, t, i);
            }
            sendCustomMessage(e) {
                const t = { customMessage: JSON.stringify(e) };
                this.sendControlMessage(t);
            }
            emitChannelErrorEvent(e, t, i) {
                const s = null == t ? void 0 : t.error;
                this.stopNotified ||
                    this.telemetry.emitDebugEvent(
                        "ChannelError",
                        e,
                        null == s ? void 0 : s.name,
                        null == s ? void 0 : s.message,
                        null == i ? void 0 : i.toString()
                    ),
                    a.Log.e(
                        u,
                        "Data channel error on " +
                            e +
                            ": " +
                            (null == s ? void 0 : s.name) +
                            ", " +
                            (null == s ? void 0 : s.message)
                    );
            }
            checkAndNotifyStartToClient() {
                this.trackIdsExpected.length > 0 &&
                    this.controlChannelState >= 1 &&
                    this.cursorChannelState >= 1 &&
                    this.inputChannelState >= 1 &&
                    this.didReceiveExpectedTracks() &&
                    this.notifyStart();
            }
            signalAudioPacketsReceived(e) {
                let t = (function (e) {
                    let t = null,
                        i = e.getAudioTracks();
                    i.length && (t = i[0]);
                    return t;
                })(e);
                t &&
                    (t.onunmute = () => {
                        this.audioTrackMuted = !1;
                    });
            }
        }
        t.StreamClient = w;
    },
    /*!***************************************************!*\
  !*** ./ragnarok-core/src/serverclienterrormap.ts ***!
  \***************************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./utils */ 5),
            n = i(/*! ./logger */ 6),
            r = "serverclienterrormap",
            o = 256,
            a = 257,
            d = 258,
            h = 259,
            l = 260,
            c = 261,
            u = 262,
            m = 263,
            g = 264,
            p = 265,
            A = 266,
            v = 267,
            f = 268,
            S = 512,
            w = 513,
            C = 514,
            b = 515,
            E = 516,
            I = 517,
            y = 518,
            k = 519,
            T = 520,
            L = 768,
            P = 33025,
            D = 33026,
            M = 33027,
            R = 33028,
            x = 33029,
            B = 33030,
            O = 33031,
            F = 33032,
            H = 33034,
            N = 33035,
            U = 33040,
            G = 33041,
            V = 33042,
            _ = 0,
            W = 32768,
            X = 32769,
            Y = 32770,
            q = 32772,
            z = 32773,
            j = 32776,
            K = 2147680256,
            Q = 2147680257,
            $ = 2147680258,
            J = 2147680259,
            Z = 2147680260,
            ee = 2147680262,
            te = 2147680263,
            ie = 2147680264,
            se = 2147680265,
            ne = 2147680266,
            re = 2147680267,
            oe = 2147680268,
            ae = 2147680269,
            de = 2147680270,
            he = 2147680271,
            le = 2147680275,
            ce = 2147680277,
            ue = 2147680278,
            me = 2147680279,
            ge = 2147680280,
            pe = 2147680281,
            Ae = 2147680283,
            ve = 2147680284,
            fe = 2147680285,
            Se = 2147680286,
            we = 2147680287,
            Ce = 2147680288,
            be = 2147680291,
            Ee = 2147745794,
            Ie = 2147745796,
            ye = 2147745797,
            ke = 2147745803,
            Te = 2147745804,
            Le = 2147745805,
            Pe = 2147745806,
            De = 2147745807,
            Me = 1,
            Re = 2,
            xe = 3,
            Be = 4,
            Oe = 5,
            Fe = 6;
        function He(e) {
            let t = 15868672;
            switch (e) {
                case o:
                    t = 15868704;
                    break;
                case a:
                    t = 15868705;
                    break;
                case d:
                    t = 15868706;
                    break;
                case h:
                    t = 15868707;
                    break;
                case l:
                    t = 15868708;
                    break;
                case c:
                    t = 15868709;
                    break;
                case u:
                    t = 15868710;
                    break;
                case m:
                    t = 15868711;
                    break;
                case g:
                    t = 15868712;
                    break;
                case p:
                    t = 15868713;
                    break;
                case A:
                    t = 15868714;
                    break;
                case v:
                    t = 15868715;
                    break;
                case f:
                    t = 15868716;
                    break;
                case S:
                    t = 15868736;
                    break;
                case w:
                    t = 15868737;
                    break;
                case C:
                    t = 15868738;
                    break;
                case b:
                    t = 15868739;
                    break;
                case E:
                    t = 15868740;
                    break;
                case I:
                    t = 15868741;
                    break;
                case y:
                    t = 15868742;
                    break;
                case k:
                    t = 15868743;
                    break;
                case T:
                    t = 15868744;
                    break;
                case P:
                    t = 3237094145;
                    break;
                case D:
                    t = 3237094146;
                    break;
                case M:
                    t = 3237094147;
                    break;
                case R:
                    t = 3237094148;
                    break;
                case x:
                    t = 3237094149;
                    break;
                case B:
                    t = 3237094150;
                    break;
                case O:
                    t = 3237094151;
                    break;
                case F:
                    t = 3237094152;
                    break;
                case H:
                    t = 3237094153;
                    break;
                case N:
                    t = 3237094154;
                    break;
                case U:
                    t = 3237094155;
                    break;
                case G:
                    t = 3237094156;
                    break;
                case V:
                    t = 3237094157;
                    break;
                case W:
                    t = 3237094158;
                    break;
                case L:
                    t = 15868717;
                    break;
                default:
                    n.Log.d(r, "Server termination reason not mapped to RErrorCode: " + s.GetHexString(e));
            }
            return t;
        }
        function Ne(e) {
            let t = 15868672;
            switch (e) {
                case K:
                    t = 15868704;
                    break;
                case Q:
                    t = 15868705;
                    break;
                case $:
                    t = 3237093635;
                    break;
                case J:
                    t = 3237094152;
                    break;
                case Z:
                    t = 15868706;
                    break;
                case ee:
                    t = 15868707;
                    break;
                case te:
                    t = 15868708;
                    break;
                case ie:
                    t = 15868736;
                    break;
                case se:
                    t = 15868737;
                    break;
                case ne:
                    t = 15868738;
                    break;
                case re:
                    t = 15868739;
                    break;
                case oe:
                    t = 15868741;
                    break;
                case ae:
                    t = 15868740;
                    break;
                case de:
                    t = 15868742;
                    break;
                case he:
                    t = 3237094147;
                    break;
                case le:
                    t = 15868743;
                    break;
                case ce:
                    t = 15868709;
                    break;
                case ue:
                    t = 15868744;
                    break;
                case me:
                    t = 15868710;
                    break;
                case ge:
                    t = 15868711;
                    break;
                case pe:
                    t = 15868712;
                    break;
                case Ae:
                    t = 3237094155;
                    break;
                case ve:
                    t = 3237094156;
                    break;
                case fe:
                    t = 3237094157;
                    break;
                case Se:
                    t = 3237093678;
                    break;
                case we:
                    t = 15868715;
                    break;
                case Ce:
                    t = 15868716;
                    break;
                case be:
                    t = 15868704;
                    break;
                case Ee:
                    t = 3237093892;
                    break;
                case Ie:
                    t = 3237094158;
                    break;
                case ye:
                case ke:
                    t = 3237093892;
                    break;
                case Te:
                    t = 3237094146;
                    break;
                case Le:
                    t = 3237094148;
                    break;
                case Pe:
                    t = 3237094149;
                    break;
                case De:
                    t = 3237094150;
                    break;
                default:
                    n.Log.d(r, "Server NvstResult not mapped to RErrorCode: " + s.GetHexString(e));
            }
            return t;
        }
        (t.getRNotificationCode = function (e) {
            let t = 0;
            switch ((n.Log.d(r, "TimerNotificationServerCode : " + e), e)) {
                case Me:
                case Re:
                    t = 1;
                    break;
                case xe:
                    break;
                case Be:
                    t = 2;
                    break;
                case Oe:
                    break;
                case Fe:
                    t = 3;
            }
            return t;
        }),
            (t.getClientTerminationReason = function (e) {
                if ((15868672 ^ e) >> 8 == 0) return o;
                let t = X;
                switch (e) {
                    case 0:
                    case 15867908:
                    case 15868418:
                        t = _;
                        break;
                    case 3237093894:
                    case 3237093899:
                        t = j;
                        break;
                    case 3237093898:
                        t = q;
                        break;
                    case 3237093900:
                        t = z;
                        break;
                    case 3237093901:
                        t = Y;
                        break;
                    default:
                        n.Log.d(r, "RErrorCode not mapped to client termination reason: " + s.GetHexString(e));
                }
                return t;
            }),
            (t.getRErrorCodeForExitMessage = function (e) {
                if (e.stopData) {
                    const t = (function (e) {
                        if (e.length < 2) return null;
                        const t = atob(e);
                        let i = 0;
                        const s = () => {
                            const e = 256 * t.charCodeAt(i) + t.charCodeAt(i + 1);
                            return (i += 2), e;
                        };
                        if (0 == s()) return e.length < i + 2 ? null : s();
                        return null;
                    })(e.stopData);
                    if (t) return n.Log.d(r, "Got error from stopData as termination reason: " + t), He(t);
                }
                return e.nvstResult
                    ? (n.Log.d(r, "Got error from nvstResult: " + e.nvstResult), Ne(e.nvstResult))
                    : e.code
                    ? (n.Log.d(r, "Got error from legacy code: " + e.code), He(e.code))
                    : 15868672;
            }),
            (t.getRErrorCode = He),
            (t.getRErrorCodeForNvstResult = Ne);
    },
    /*!*******************************************!*\
  !*** ./ragnarok-core/src/inputhandler.ts ***!
  \*******************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./logger */ 6),
            n = i(/*! ./utils */ 5),
            r = i(/*! ./gesturedetector */ 33),
            o = i(/*! ./touchlistener */ 20),
            a = i(/*! ./ragnarokprofiler */ 12),
            d = i(/*! ./keycodes */ 34),
            h = i(/*! ./settings */ 8),
            l = i(/*! ./latencyindicator */ 10),
            c = i(/*! ./inputpackethandler */ 35),
            u = "inputhandler",
            m = {
                imageStr:
                    "AAABAAEAICACAAEAAQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAOAAAADAAAABwAAAAYAAAAOAAABDAAAAZwAAAHYAAAB4AAAAf+AAAH/AAAB/gAAAfwAAAH4AAAB8AAAAeAAAAHAAAABgAAAAQAAAAAAAAAAAAAAAAAAAA////////////////////////////////////////////5////8P///+D////h////wf//98P///OD///xh///8Af///AP///wAH//8AD///AB///wA///8Af///AP///wH///8D////B////w////8f////P////3/////////8=",
                hotspotX: 2,
                hotspotY: 1,
                mimeTypeStr: "image/x-icon",
            },
            g = [
                { imageStr: "", hotspotX: 0, hotspotY: 0, mimeTypeStr: "" },
                m,
                {
                    imageStr:
                        "AAABAAEAICACAAEAAQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfvwAAAAAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAfPwAAAAAAAAAAAAAAAAAA/////////////////////////////////////+BA///Agf///z////8/////P////z////8/////P////z////8/////P////z////8/////P////z////8/////P////z////8/////P////z///+BA///Agf////////////8=",
                    hotspotX: 8,
                    hotspotY: 13,
                    mimeTypeStr: "image/x-icon",
                },
                {
                    imageStr:
                        "AAABAAEAICACAAEAAQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8AAAzzAAAHDgAABfoAAAb2AAADbAAAAfgAAABgAAAAYAAAAGAAAABgAAAAYAAAAGAAAABgAAAB+AAAA/wAAAaWAAAH/gAABWoAAA//AAAP/wAAAAAAAAAAAAA//////////////////////////////////////////+AAf//gAH//4AB//+AAf//wAP//8AD///gB///8A////gf///8P////D////w////8P////D////gf///wD///4Af//8AD///AA///gAH//4AB//+AAf//gAH///////8=",
                    hotspotX: 7,
                    hotspotY: 12,
                    mimeTypeStr: "image/x-icon",
                },
                {
                    imageStr:
                        "AAABAAEAICACAAEAAQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAABjAAABgMAAAQBAAAIAIAACACAABAAQAAAIAAAEABAAAgAgAAIAIAABgMAAAICAAABjAAAAFAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////4////5T///53P//+97///fff//333//79+//+AAP//v37//999///fff//53P///d3///5T////j////////8=",
                    hotspotX: 8,
                    hotspotY: 8,
                    mimeTypeStr: "image/x-icon",
                },
                {
                    imageStr:
                        "AAABAAEAICACAAEAAQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AAAAiAAAAPgAAABwAAAYIAAAOCAAADAgAABwcAAAYNgAAOCoABDA+AAZwAAAHYAAAB4AAAAf+AAAH/AAAB/gAAAfwAAAH4AAAB8AAAAeAAAAHAAAABgAAAAQAAAAAAAAAAAAAAAAAAAA///////////////////////+A////gP///4D///+A///5wf//8OP//+Dj///h4///wcH/98OA//ODgP/xh4D/8AeA//AP///wAH//8AD///AB///wA///8Af///AP///wH///8D////B////w////8f////P////3/////////8=",
                    hotspotX: 2,
                    hotspotY: 1,
                    mimeTypeStr: "image/x-icon",
                },
                {
                    imageStr:
                        "AAABAAEAICACAAEAAQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAB+AAAAPgAAAB4AAABuAAAA5gAAAcIAAEOAAABnAAAAdgAAAHgAAAB8AAAAfgAAAH8AAAAAAAAAAAAAA/////////////////////////////////////////////////////////////////////////////////wA///+AP///wD///+A////gP///wD//34A//88GP//GDz//wB+//8A////Af///wH///8A////AH///wA////////8=",
                    hotspotX: 9,
                    hotspotY: 8,
                    mimeTypeStr: "image/x-icon",
                },
                {
                    imageStr:
                        "AAABAAEAICACAAEAAQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAAAH4AAAB8AAAAeAAAAHYAAABnAAAAQ4AAAAHCAAAA5gAAAG4AAAAeAAAAPgAAAH4AAAD+AAAAAAAAAAAAA////////////////////////////////////////////////////////////////////////////////wA///8Af///AP///wH///8B////AP///wB+//8YPP//PBj//34A////AP///4D///+A////AP///gD///wA///////8=",
                    hotspotX: 9,
                    hotspotY: 9,
                    mimeTypeStr: "image/x-icon",
                },
                {
                    imageStr:
                        "AAABAAEAICACAAEAAQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAEAABgBgAA4AcAAeAHgAPv98AH7/fgA+/3wAHgB4AA4AcAAGAGAAAgBAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////+/3///P8///j/H//w/w//4P8H/8AAA/+AAAH/AAAA/4AAAf/AAAP/4P8H//D/D//4/x///P8///7/f//////8=",
                    hotspotX: 13,
                    hotspotY: 8,
                    mimeTypeStr: "image/x-icon",
                },
                {
                    imageStr:
                        "AAABAAEAICACAAEAAQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAADgAAAB8AAAA/gAAAf8AAAP/gAAAAAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAAAAAA/+AAAH/AAAA/gAAAHwAAAA4AAAAEAAAAAAAAAAAAAA//////////////////////////////////////+/////H////g////wH///4A///8AH//+AA///AAH///g////4P///+D////g////4P///+D////g////4P///AAH//4AD///AB///4A////Af///4P////H////7////////8=",
                    hotspotX: 9,
                    hotspotY: 12,
                    mimeTypeStr: "image/x-icon",
                },
                {
                    imageStr:
                        "AAABAAEAICACAAEAAQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAABwAAAA+AAAAHAAAABwAAAAcAAAAHAAAABwAAAgACAAf3fwAP93+AB/d/AAIAAgAABwAAAAcAAAAHAAAABwAAAAcAAAAPgAAABwAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////f////j////wf///4D///8Af///wf///8H///vB7//zwef/4AAD/8AAAf+AAAD/wAAB/+AAA//zwef/+8Hv///B////wf///wB///+A////wf///+P////3///////////////////////8=",
                    hotspotX: 13,
                    hotspotY: 12,
                    mimeTypeStr: "image/x-icon",
                },
                m,
                {
                    imageStr:
                        "AAABAAEAICACAAEAAQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH+AAAB/gAAA/4AAAP/AAAH/wAAB/8AAA//gAAP/4AAH/+AADttgABzbYAAY2wAAANsAAADYAAAAwAAAAMAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////+Af///AD///wA///4AP//+AB///AAf//wAH//4AA//+AAP//AAD//gAA//wAAP/8IAH//mAH///gD///4H///+H////z////////8=",
                    hotspotX: 8,
                    hotspotY: 3,
                    mimeTypeStr: "image/x-icon",
                },
                {
                    imageStr:
                        "AAABAAEAICACAAEAAQAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAGAAAAAAAAAAAAAAAAAAAABgAAAAYAAAYHAAAOAYAADADAABwwwAAYMMAAODDABDAZgAZwDwAHYAAAB4AAAAf+AAAH/AAAB/gAAAfwAAAH4AAAB8AAAAeAAAAHAAAABgAAAAQAAAAAAAAAAAAAAAAAAAA/////////////+f////D////5//////////n////w///58P//8PB//+D4P//hzB//wYYf98OGH/ODhh/xh8A/8Afgf/AP8P/wAH//8AD///AB///wA///8Af///AP///wH///8D////B////w////8f////P////3/////////8=",
                    hotspotX: 2,
                    hotspotY: 1,
                    mimeTypeStr: "image/x-icon",
                },
            ];
        class p {
            constructor() {
                (this.x = 0), (this.y = 0);
            }
            getX() {
                return this.x;
            }
            getY() {
                return this.y;
            }
            update(e, t, i) {
                return (this.x = e), (this.y = t), !0;
            }
        }
        class A {
            constructor() {
                (this.lastX = 0),
                    (this.lastY = 0),
                    (this.lastTs = 0),
                    (this.estimatedAccelX = 0),
                    (this.estimatedAccelY = 0),
                    (this.ignoredX = 0),
                    (this.ignoredY = 0),
                    (this.oldX = 0),
                    (this.oldY = 0),
                    (this.consecutiveZero = !1);
            }
            getX() {
                return this.lastX;
            }
            getY() {
                return this.lastY;
            }
            update(e, t, i) {
                if (0 === e && 0 === t)
                    return this.consecutiveZero ? ((this.oldX = 0), (this.oldY = 0)) : (this.consecutiveZero = !0), !1;
                if (((this.consecutiveZero = !1), 0 === this.oldX && 0 === this.oldY)) {
                    if (i < this.lastTs) return (this.oldX = e), (this.oldY = t), !1;
                } else (e += this.oldX), (t += this.oldY), (this.oldX = 0), (this.oldY = 0);
                const s = e * this.lastX + t * this.lastY,
                    n = e * e + t * t,
                    r = this.lastX * this.lastX + this.lastY * this.lastY;
                let o = !0;
                if (i - this.lastTs < 0.95 && s < 0 && 0 !== r && s * s > 0.81 * n * r) {
                    const e = Math.sqrt(n) / Math.sqrt(r);
                    let t = Math.abs(e - Math.trunc(e));
                    t > 0.5 && (t = 1 - t), t < 0.1 && (o = !1);
                }
                const a = e - this.lastX,
                    d = t - this.lastY,
                    h = a * a + d * d;
                if (o) {
                    const s = 1 + 0.1 * Math.max(1, Math.min(16, i - this.lastTs)),
                        n = 2 * s * Math.abs(this.estimatedAccelX),
                        r = 2 * s * Math.abs(this.estimatedAccelY),
                        a = Math.max(8100, n * n + r * r);
                    if (((o = h < a), !o && (this.ignoredX || this.ignoredY))) {
                        const i = e - this.ignoredX,
                            s = t - this.ignoredY;
                        o = i * i + s * s < a;
                    }
                }
                return o
                    ? ((this.estimatedAccelX = 0.4 * this.estimatedAccelX + 0.6 * a),
                      (this.estimatedAccelY = 0.4 * this.estimatedAccelY + 0.6 * d),
                      (this.lastX = e),
                      (this.lastY = t),
                      (this.lastTs = i),
                      (this.ignoredX = 0),
                      (this.ignoredY = 0),
                      !0)
                    : ((this.ignoredX = e), (this.ignoredY = t), !1);
            }
        }
        t.MouseFilter = A;
        t.InputHandler = class {
            constructor(e, t, i, a, d, g, f, S, w, C) {
                var b, E, I, y, k, T, L, P, D, M, R, x, B, O, F, H, N, U, G;
                (this.allowPointerLock = !1),
                    (this.fullscreen = !1),
                    (this.supportsRawUpdate = !1),
                    (this.supportsCoalescedEvents = !1),
                    (this.supportsPointerLock = !1),
                    (this.isUserInputEnable = !1),
                    (this.isVirtualKeyboardVisible = !1),
                    (this.unadjustedMovementAllowed = !1),
                    (this.unadjustedMovementActive = !1),
                    (this.pointerLockReturnsPromise = !1),
                    (this.rawUpdateState = 0),
                    (this.rawCoalesceInterval = 0),
                    (this.useVkCodes = !0),
                    (this.statsGestureTimerId = 0),
                    (this.touchTimerId = 0),
                    (this.videoZoomFactor = 1),
                    (this.videoOffsetX = 0),
                    (this.videoOffsetY = 0),
                    (this.zoomInProgress = !1),
                    (this.touchDelay = new v()),
                    (this.gamepadTesterEnabled = !1),
                    (this.kbEventsReceived = { keydowns: 0, keyups: 0 }),
                    (this.triggerState = 0),
                    (this.textCompositionStarted = !1),
                    (this.streamClient = e),
                    (this.videoTagElement = t),
                    (this.telemetry = a),
                    (this.platform = n.getPlatform()),
                    (this.videoState = {
                        displayVideoWidth: t.clientWidth || window.screen.width,
                        displayVideoHeight: t.clientHeight || window.screen.height,
                        scalingFactor: 1,
                        leftPadding: 0,
                        topPadding: 0,
                        videoWidth: 0,
                        videoHeight: 0,
                        viewportHeight: 0,
                    });
                const V = window.zoneless;
                (this.windowAddEventListener =
                    null !==
                        (E =
                            null === (b = null == V ? void 0 : V.windowAddEventListener) || void 0 === b
                                ? void 0
                                : b.bind(window)) && void 0 !== E
                        ? E
                        : window.addEventListener.bind(window)),
                    (this.windowRemoveEventListener =
                        null !==
                            (y =
                                null === (I = null == V ? void 0 : V.windowRemoveEventListener) || void 0 === I
                                    ? void 0
                                    : I.bind(window)) && void 0 !== y
                            ? y
                            : window.removeEventListener.bind(window)),
                    (this.documentAddEventListener =
                        null !==
                            (T =
                                null === (k = null == V ? void 0 : V.documentAddEventListener) || void 0 === k
                                    ? void 0
                                    : k.bind(document)) && void 0 !== T
                            ? T
                            : document.addEventListener.bind(document)),
                    (this.documentRemoveEventListener =
                        null !==
                            (P =
                                null === (L = null == V ? void 0 : V.documentRemoveEventListener) || void 0 === L
                                    ? void 0
                                    : L.bind(document)) && void 0 !== P
                            ? P
                            : document.removeEventListener.bind(document)),
                    (this.videoAddEventListener =
                        null !==
                            (x =
                                null !==
                                    (M =
                                        null === (D = null == V ? void 0 : V.videoAddEventListener) || void 0 === D
                                            ? void 0
                                            : D.bind(t)) && void 0 !== M
                                    ? M
                                    : n.IsTV() ||
                                      null === (R = null == V ? void 0 : V.documentAddEventListener) ||
                                      void 0 === R
                                    ? void 0
                                    : R.bind(document)) && void 0 !== x
                            ? x
                            : t.addEventListener.bind(t)),
                    (this.videoRemoveEventListener =
                        null !==
                            (H =
                                null !==
                                    (O =
                                        null === (B = null == V ? void 0 : V.videoRemoveEventListener) || void 0 === B
                                            ? void 0
                                            : B.bind(t)) && void 0 !== O
                                    ? O
                                    : n.IsTV() ||
                                      null === (F = null == V ? void 0 : V.documentRemoveEventListener) ||
                                      void 0 === F
                                    ? void 0
                                    : F.bind(document)) && void 0 !== H
                            ? H
                            : t.removeEventListener.bind(t)),
                    (this.keydownFunc = this.keydown.bind(this)),
                    (this.keyupFunc = this.keyup.bind(this)),
                    (this.mousedownFunc = this.mousedown.bind(this)),
                    (this.mouseupFunc = this.mouseup.bind(this)),
                    (this.mousewheelFunc = this.mousewheel.bind(this)),
                    (this.pointerMoveFunc = this.pointermove.bind(this)),
                    (this.pointerRawUpdateFunc = this.pointerrawupdate.bind(this)),
                    (this.freeMouseMoveFunc = this.freeMouseMove.bind(this)),
                    (this.fullscreenEventFunc = this.fullscreenEventHandler.bind(this)),
                    (this.pointerLockEventFunc = this.pointerLockChange.bind(this)),
                    (this.pointerLockErrorFunc = this.pointerLockError.bind(this)),
                    (this.preRenderFunc = this.preRender.bind(this)),
                    (this.videoBlurFunc = this.onVideoBlur.bind(this)),
                    (this.videoFocusFunc = this.onVideoFocus.bind(this)),
                    (this.resizedFunc = this.resized.bind(this)),
                    (this.viewportResizedFunc = this.viewportResized.bind(this)),
                    (this.popStateFunc = this.popstate.bind(this)),
                    (this.idleInputListenerFunc = this.idleInputListener.bind(this)),
                    (this.textInputFunc = this.textInputHandler.bind(this)),
                    (this.textCompositionFunc = this.textCompositionHandler.bind(this)),
                    (this.rendering = !1),
                    (this.cursorType = null !== (N = g.cursorType) && void 0 !== N ? N : 0),
                    s.Log.i(u, "Using cursor type: " + this.cursorType),
                    (this.cursorState = {
                        absPositioning: !1,
                        confined: !1,
                        absX: 0,
                        absY: 0,
                        remX: 0,
                        remY: 0,
                        style: this.makeCursorUrl(m.imageStr, m.mimeTypeStr, m.hotspotX, m.hotspotY) + ", auto",
                        hotspotX: 0,
                        hotspotY: 0,
                        width: 0,
                        height: 0,
                    }),
                    (this.cursorCanvasState = {
                        dpiRatio: 1,
                        cursorScaling: 1,
                        dirty: !1,
                        imageChanged: !1,
                        imageDimensionsChanged: !1,
                        showing: !1,
                    }),
                    (this.cursorCache = []),
                    (this.cursorStyles = [
                        "none",
                        "default",
                        "text",
                        "wait",
                        "crosshair",
                        "progress",
                        "nwse-resize",
                        "nesw-resize",
                        "ew-resize",
                        "ns-resize",
                        "move",
                        "default",
                        "pointer",
                        "help",
                    ]),
                    (this.cursorCanvasId = "canvasId1"),
                    0 == this.cursorType
                        ? (this.cursorCanvas = this.getCursorCanvas(this.videoTagElement))
                        : (this.cursorCanvas = null),
                    (this.gamepadTester = S),
                    (this.preventNavigation = !!g.preventNavigation),
                    (this.measurements = {
                        baseTime: 0,
                        baseTotalVideoFrames: 0,
                        animationFrameCount: 0,
                        sendInputCount: 0,
                        sendInputOver5ms: 0,
                        sendInputOver10ms: 0,
                        singleDroppedFrames: 0,
                        multiDroppedFrames: 0,
                        aggregatedCount: 0,
                        oversizedEventCount: 0,
                    }),
                    (this.moveEventBuffer = new c.MoveEventBuffer(36)),
                    (this.packetHandler = new c.InputPacketHandler(
                        this,
                        this.moveEventBuffer,
                        this.measurements,
                        this.videoState,
                        this.streamClient,
                        i,
                        this.telemetry
                    )),
                    f
                        ? o.TouchListener.isSupported()
                            ? ((this.touchListener = this.createTouchListener()), s.Log.i(u, "Using touch input type"))
                            : s.Log.w(u, "Device doesnt support touch input, fallback to mouse input")
                        : s.Log.i(u, "Using mouse input type"),
                    r.GestureDetector.isSupported() && (this.gestureDetector = this.createGestureDetector()),
                    (this.eventEmitter = d),
                    (this.pointerLockElement = null),
                    (this.lastLockKeysState = 0),
                    (this.pressedKeys = new Set()),
                    (this.focused = !1);
                const _ = this.platform.name;
                if (
                    ((this.supportsNumAndScrollLock = "Windows" == _),
                    (this.supportsRawUpdate = "onpointerrawupdate" in this.videoTagElement),
                    (this.supportsCoalescedEvents =
                        (null === PointerEvent || void 0 === PointerEvent ? void 0 : PointerEvent.prototype) &&
                        "getCoalescedEvents" in PointerEvent.prototype),
                    s.Log.i(
                        u,
                        "Coalesced events are " + (this.supportsCoalescedEvents ? "supported" : "not supported")
                    ),
                    (this.supportsPointerLock = "Tizen" != _ && "WebOS" != _),
                    (this.isChromeOs = "ChromeOS" == _),
                    (this.isMacOs = "MacOSX" == _),
                    (this.isChromium = n.IsChromium()),
                    (this.isTouchDevice = n.IsTouchDevice()),
                    this.supportsNumAndScrollLock
                        ? (s.Log.d(u, "Supported lock keys: all"), (this.ignoredLockKeys = [20, 144, 145]))
                        : this.isChromeOs || "Linux" == _
                        ? (s.Log.d(u, "Supported lock keys: none (ChromeOS/Linux)"), (this.ignoredLockKeys = []))
                        : (s.Log.d(u, "Supported lock keys: caps lock"), (this.ignoredLockKeys = [20])),
                    (this.isSafari = n.IsSafari()),
                    (this.inputEnabledStateBeforeUserIdlePendingOverlay = !0),
                    (this._isUserIdleTimeoutPending = !1),
                    (this.historyProtected = !1),
                    (this.localStats = { rafTime: 0, droppedVideoFrames: 0, totalVideoFrames: 0 }),
                    PerformanceObserver)
                ) {
                    this.perf = new PerformanceObserver((e) => this.perfCallback(e));
                } else this.perf = null;
                if (this.supportsRawUpdate) {
                    const e = (function () {
                        const e = h.RagnarokSettings.ragnarokConfig.mouseCoalesceInterval;
                        if (void 0 !== e) {
                            return new Map([
                                [0, 0],
                                [4, 1],
                                [8, 2],
                                [16, 3],
                            ]).get(e);
                        }
                        return;
                    })();
                    void 0 !== e ? this.setRawUpdate(e) : this.isChromeOs ? this.setRawUpdate(3) : this.setRawUpdate(1);
                    const t = void 0 !== e;
                    s.Log.i(
                        u,
                        "Sending mouse events every " + this.rawCoalesceInterval + "ms" + (t ? " (overridden)" : "")
                    );
                }
                if (
                    null !== (U = h.RagnarokSettings.unadjustedMovement) && void 0 !== U
                        ? U
                        : "Windows" == n.getPlatform().name
                        ? n.isChromeVersionAtLeast(n.getBrowser(), 84, 0, 4147, 78)
                        : ("ChromeOS" == n.getPlatform().name || "MacOSX" == n.getPlatform().name) &&
                          n.isChromeVersionAtLeast(n.getBrowser(), 86, 0, 4240, 198)
                ) {
                    this.unadjustedMovementAllowed = !0;
                    const e = "dec9bee4abc",
                        t = location.hostname.includes("nvidia.com")
                            ? "ArIrjFqL8/s7AFULcH29ExstG9vnBTbRLfOf6udiD4WYFGdYq1+5UexxwJgJ3WJwLjueIIlSlDtx6DoByja2QAQAAABneyJvcmlnaW4iOiJodHRwczovL2dlZm9yY2Vub3ctc3RhZ2UubnZpZGlhLmNvbTo0NDMiLCJmZWF0dXJlIjoiUG9pbnRlckxvY2tPcHRpb25zIiwiZXhwaXJ5IjoxNjEyOTE1MTk5fQ=="
                            : location.hostname.includes("geforcenow.com")
                            ? "AgNFe6dOu1noxdb4vSQycYq3+7CXyAPeXQobs5Gi2CKwv37lfIbKk+RK9JpoVsvbqljESenD7DF5cbnEiiG4qQkAAAByeyJvcmlnaW4iOiJodHRwczovL3BsYXkuZ2Vmb3JjZW5vdy5jb206NDQzIiwiZmVhdHVyZSI6IlBvaW50ZXJMb2NrT3B0aW9ucyIsImV4cGlyeSI6MTYxMjkxNTE5OSwiaXNTdWJkb21haW4iOnRydWV9"
                            : void 0;
                    if (t) {
                        if (!document.getElementById(e)) {
                            const i = document.createElement("meta");
                            (i.id = e),
                                i.setAttribute("http-equiv", "origin-trial"),
                                i.setAttribute("content", t),
                                document.head.appendChild(i);
                        }
                    } else s.Log.w(u, "Unadjusted movement was enabled with no origin trial");
                }
                const W = n.getBrowser(),
                    X =
                        "ChromeOS" == _ &&
                        n.isChromeVersionAtLeast(W, 84, 0, 4147, 94) &&
                        !n.isChromeVersionAtLeast(W, 88, 0, 4324, 139),
                    Y = "Windows" == _ || !X || !n.isChromeVersionAtLeast(W, 84, 0, 4147, 94);
                (null !== (G = h.RagnarokSettings.mouseFilter) && void 0 !== G ? G : Y)
                    ? (this.mouseFilter = new A())
                    : (this.mouseFilter = new p()),
                    ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach(
                        (e) => document.addEventListener(e, this.fullscreenEventFunc)
                    ),
                    ["pointerlockchange", "mozpointerlockchange"].forEach((e) =>
                        document.addEventListener(e, this.pointerLockEventFunc)
                    ),
                    ["pointerlockerror", "mozpointerlockerror"].forEach((e) =>
                        document.addEventListener(e, this.pointerLockErrorFunc)
                    ),
                    s.Log.d(u, "input handler initialized"),
                    this.cursorCanvas && this.setCursorCanvasPosition(this.cursorCanvas, this.videoTagElement),
                    window.ResizeObserver
                        ? ((this.resizeObserver = new ResizeObserver((e) => {
                              this.resized();
                          })),
                          this.resizeObserver.observe(this.videoTagElement))
                        : window.addEventListener("resize", this.resizedFunc),
                    n.IsiOS() &&
                        window.IntersectionObserver &&
                        ((this.intersectionObserver = new IntersectionObserver(
                            (e) => {
                                this.resized();
                            },
                            { threshold: [1] }
                        )),
                        this.intersectionObserver.observe(this.videoTagElement)),
                    this.videoTagElement.addEventListener("resize", this.resizedFunc);
                let q = window.visualViewport;
                q &&
                    ((this.videoState.viewportHeight = q.height),
                    q.addEventListener("resize", this.viewportResizedFunc)),
                    this.fullscreenEventHandler({}),
                    this.changeFocusHandling(!0),
                    (this.focused = !0),
                    this.perf &&
                        PerformanceObserver.supportedEntryTypes &&
                        PerformanceObserver.supportedEntryTypes.includes("longtask") &&
                        this.perf.observe({ entryTypes: ["longtask"] }),
                    (this.gamepadHandler = w),
                    this.gamepadHandler.addGamepadDataHandler(this.packetHandler),
                    this.gamepadHandler.addTelemetry(this.telemetry),
                    h.RagnarokSettings.latencyTest && l.LatencyIndicator.getInstance().initialize(this.videoTagElement),
                    n.IsTV() && (this.textInputElement = C);
            }
            get isUserIdleTimeoutPending() {
                return this._isUserIdleTimeoutPending;
            }
            uninitialize() {
                var e, t, i;
                this.telemetry.emitDebugEvent(
                    "KbEvents",
                    String(this.kbEventsReceived.keydowns),
                    String(this.kbEventsReceived.keyups),
                    String(this.packetHandler.kbEventCount.keydowns),
                    String(this.packetHandler.kbEventCount.keyups)
                ),
                    null === (e = this.intersectionObserver) || void 0 === e || e.disconnect(),
                    null === (t = this.resizeObserver) || void 0 === t || t.disconnect(),
                    this.packetHandler.stop(),
                    this.perf && this.perf.disconnect(),
                    this.toggleUserInput(!1),
                    window.removeEventListener("resize", this.resizedFunc),
                    this.videoTagElement.removeEventListener("resize", this.resizedFunc),
                    null === (i = window.visualViewport) ||
                        void 0 === i ||
                        i.removeEventListener("resize", this.viewportResizedFunc),
                    this.gamepadHandler.disconnectAllGamepads(),
                    ["pointerlockerror", "mozpointerlockerror"].forEach((e) =>
                        document.removeEventListener(e, this.pointerLockErrorFunc)
                    ),
                    ["pointerlockchange", "mozpointerlockchange"].forEach((e) =>
                        document.removeEventListener(e, this.pointerLockEventFunc)
                    ),
                    ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach(
                        (e) => document.removeEventListener(e, this.fullscreenEventFunc)
                    ),
                    this.changeFocusHandling(!1),
                    s.Log.d(u, "input processing stopped");
            }
            createGestureDetector() {
                const e = this.videoTagElement;
                return new r.GestureDetector(e, this.videoAddEventListener, this.videoRemoveEventListener, this);
            }
            createTouchListener() {
                return new o.TouchListener(
                    this.videoTagElement,
                    this.videoAddEventListener,
                    this.videoRemoveEventListener,
                    this.packetHandler,
                    this
                );
            }
            changeFocusHandling(e) {
                this.cursorCanvas
                    ? this.changeElementFocusHandling(window, e)
                    : this.changeElementFocusHandling(this.videoTagElement, e);
            }
            changeElementFocusHandling(e, t) {
                t
                    ? (e.addEventListener("blur", this.videoBlurFunc), e.addEventListener("focus", this.videoFocusFunc))
                    : (e.removeEventListener("blur", this.videoBlurFunc),
                      e.removeEventListener("focus", this.videoFocusFunc));
            }
            updateLockKeysState(e) {
                if (this.isChromeOs && 20 === e.keyCode) return;
                if (n.IsiOS() && 20 !== e.keyCode) return;
                let t = 0;
                (t |= 16),
                    e.getModifierState("CapsLock") && (t |= 1),
                    this.supportsNumAndScrollLock &&
                        ((t |= 32),
                        (t |= 64),
                        e.getModifierState("NumLock") && (t |= 2),
                        e.getModifierState("ScrollLock") && (t |= 4)),
                    t != this.lastLockKeysState &&
                        ((this.lastLockKeysState = t), this.packetHandler.sendLockKeyState(t));
            }
            preRender(e) {
                if ((a.RagnarokProfiler.onPreRender(), !h.RagnarokSettings.leanMode)) {
                    const e = window.performance.now();
                    if (this.videoTagElement.getVideoPlaybackQuality) {
                        const e = this.videoTagElement.getVideoPlaybackQuality(),
                            t = e.droppedVideoFrames,
                            i = t - this.localStats.droppedVideoFrames,
                            s = e.totalVideoFrames - this.localStats.totalVideoFrames;
                        (this.localStats.droppedVideoFrames = t),
                            (this.localStats.totalVideoFrames = e.totalVideoFrames),
                            1 == i
                                ? this.measurements.singleDroppedFrames++
                                : i > 1 && (this.measurements.multiDroppedFrames += i),
                            a.RagnarokProfiler.onFrameInfo(s, i);
                    }
                    this.localStats.rafTime = e;
                }
                window.setTimeout(() => this.postRender()),
                    this.cursorCanvasState.dirty &&
                        ((this.cursorCanvasState.dirty = !1),
                        this.drawCursor(this.cursorState.absPositioning, this.cursorState.absX, this.cursorState.absY));
            }
            postRender() {
                this.rendering && window.requestAnimationFrame(this.preRenderFunc),
                    0 === this.rawUpdateState && this.packetHandler.sendScheduledPackets(),
                    this.gamepadHandler.postRender(),
                    h.RagnarokSettings.leanMode || this.handleMeasurements();
            }
            handleMeasurements() {
                const e = window.performance.now();
                e > this.measurements.baseTime + 1e4
                    ? (0 !== this.measurements.baseTime &&
                          s.Log.i(
                              u,
                              "measurements over 10 seconds: animationFrames: " +
                                  this.measurements.animationFrameCount +
                                  ", inputs: " +
                                  this.measurements.sendInputCount +
                                  ", inputs > 5ms: " +
                                  this.measurements.sendInputOver5ms +
                                  ", inputs > 10ms: " +
                                  this.measurements.sendInputOver10ms +
                                  ", video frames: " +
                                  (this.localStats.totalVideoFrames - this.measurements.baseTotalVideoFrames) +
                                  ", single-frame drops: " +
                                  this.measurements.singleDroppedFrames +
                                  ", multi-frame drops: " +
                                  this.measurements.multiDroppedFrames +
                                  ", aggregated: " +
                                  this.measurements.aggregatedCount +
                                  ", oversized: " +
                                  this.measurements.oversizedEventCount
                          ),
                      (this.measurements.baseTime = e),
                      (this.measurements.baseTotalVideoFrames = this.localStats.totalVideoFrames),
                      (this.measurements.animationFrameCount = 1),
                      (this.measurements.sendInputCount = 0),
                      (this.measurements.sendInputOver5ms = 0),
                      (this.measurements.sendInputOver10ms = 0),
                      (this.measurements.singleDroppedFrames = 0),
                      (this.measurements.multiDroppedFrames = 0),
                      (this.measurements.aggregatedCount = 0),
                      (this.measurements.oversizedEventCount = 0))
                    : (this.measurements.animationFrameCount += 1);
            }
            virtualGamepadUpdateHandler() {
                this.packetHandler.channelOpen() && this.gamepadHandler.virtualGamepadUpdateHandler();
            }
            resized(e) {
                var t;
                this.updateVideoState(this.videoTagElement),
                    this.cursorCanvas &&
                        (this.setCursorCanvasPosition(this.cursorCanvas, this.videoTagElement),
                        this.focused && this.cursorState.absPositioning && this.scheduleCursorDraw()),
                    null === (t = this.touchListener) ||
                        void 0 === t ||
                        t.updateVideoState(this.videoState, this.videoZoomFactor);
            }
            viewportResized(e) {
                (this.videoState.viewportHeight = window.visualViewport.height),
                    this.applyVideoTransforms(this.videoOffsetX, this.videoOffsetY, this.videoZoomFactor);
            }
            popstate(e) {
                s.Log.d(u, "Preventing Back navigation"), history.pushState(null, document.title, location.href);
            }
            getVirtualKeycode(e) {
                if (this.useVkCodes) {
                    let t = e.code ? d.CODE_TO_VK_MAP.get(e.code) : d.KEY_TO_VK_MAP.get(e.key);
                    return null != t ? t : 0;
                }
                return e.keyCode;
            }
            keydown(e) {
                this.kbEventsReceived.keydowns++;
                let t = !1;
                if (!this.focused) return;
                if ((e.preventDefault(), this.updateLockKeysState(e), "CapsLock" == e.code && "Alphanumeric" == e.key))
                    t = !0;
                else if (this.ignoredLockKeys.includes(e.keyCode)) return;
                const i = this.getVirtualKeycode(e);
                if (0 === i || this.pressedKeys.has(i)) return;
                this.pressedKeys.add(i);
                let n = !1;
                if (187 == e.keyCode && 1 == this.triggerState)
                    (this.triggerState = 2),
                        s.Log.i(u, "Sending latencyTrigger to nvrtcStreamer"),
                        this.streamClient.sendLatencyTrigger();
                else if (e.ctrlKey && e.altKey) {
                    if (117 == e.keyCode) this.streamClient.toggleOnScreenStats();
                    else if (h.RagnarokSettings.devMode)
                        if (68 == e.keyCode && 0 == this.triggerState)
                            (this.triggerState = 1),
                                this.streamClient.sendPcmDumpTrigger(),
                                s.Log.i(u, "creating and starting audio recorder"),
                                this.streamClient.createAudioRecorder(),
                                this.streamClient.startAudioRecord(this.triggerState);
                        else if (118 == e.keyCode || 192 == e.keyCode) this.streamClient.togglePerfIndicator();
                        else if (56 == e.keyCode) this.streamClient.toggleGpuViewCapture();
                        else if (115 == e.keyCode) this.streamClient.toggleProfiler();
                        else if (116 == e.keyCode) this.streamClient.toggleWebRTCStats();
                        else if (120 == e.keyCode) {
                            this.unadjustedMovementAllowed = !this.unadjustedMovementAllowed;
                            const e = "UnadjustedMovement: " + (this.unadjustedMovementAllowed ? "ON" : "OFF");
                            this.streamClient.showDebugMessage(e), s.Log.i(u, e);
                        } else if (71 == e.keyCode)
                            (this.gamepadTesterEnabled = !this.gamepadTesterEnabled),
                                this.gamepadTester.toggleGamepadTester(this.videoTagElement),
                                this.gamepadTesterEnabled
                                    ? this.gamepadHandler.addGamepadDataHandler(this.gamepadTester)
                                    : this.gamepadHandler.removeGamepadDataHandler(this.gamepadTester);
                        else if ("Digit0" == e.code) {
                            let e = "UNSUPPORTED";
                            if (this.supportsRawUpdate)
                                switch ((this.setRawUpdate((this.rawUpdateState + 1) % 4), this.rawUpdateState)) {
                                    case 1:
                                        e = "4ms";
                                        break;
                                    case 2:
                                        e = "8ms";
                                        break;
                                    case 3:
                                        e = "16ms";
                                        break;
                                    default:
                                        e = "OFF";
                                }
                            const t = "Non-vsync mouse events: " + e;
                            this.streamClient.showDebugMessage(t), s.Log.i(u, t);
                        } else if ("Minus" == e.code) {
                            this.useVkCodes = !this.useVkCodes;
                            const e = "Position dependent keys: " + (this.useVkCodes ? "ON" : "OFF");
                            this.streamClient.showDebugMessage(e), s.Log.i(u, e);
                        } else n = !0;
                } else n = !0;
                n &&
                    (l.LatencyIndicator.getInstance().toggleIndicator(),
                    this.packetHandler.sendKeyboardEvent(3, i, this.getModifierFlags(e), e.timeStamp)),
                    ("Hankaku" != e.key && "Zenkaku" != e.key) || (192 == i && (t = !0)),
                    t &&
                        (this.packetHandler.sendKeyboardEvent(4, i, this.getModifierFlags(e), e.timeStamp),
                        this.pressedKeys.delete(i));
            }
            keyup(e) {
                if (
                    (this.kbEventsReceived.keyups++,
                    this.updateLockKeysState(e),
                    this.ignoredLockKeys.includes(e.keyCode))
                )
                    return;
                const t = this.getVirtualKeycode(e);
                this.pressedKeys.has(t) &&
                    (this.pressedKeys.delete(t),
                    l.LatencyIndicator.getInstance().toggleIndicator(),
                    this.packetHandler.sendKeyboardEvent(4, t, this.getModifierFlags(e), e.timeStamp));
            }
            mousedown(e) {
                if (
                    (2 == this.triggerState &&
                        (s.Log.i(u, "destroying previous audio recorder and starting new one"),
                        this.streamClient.destroyAudioRecorder(),
                        this.streamClient.createAudioRecorder(),
                        this.streamClient.startAudioRecord(this.triggerState)),
                    (this.focused = !0),
                    this.touchTimerId)
                ) {
                    window.clearTimeout(this.touchTimerId),
                        (this.touchTimerId = 0),
                        this.setCursorPosFromOffset(e.offsetX, e.offsetY),
                        this.scheduleCursorDraw();
                    const t = this.cursorState.absX,
                        i = this.cursorState.absY;
                    this.cursorState.absPositioning && this.packetHandler.sendCursorPos(!0, t, i, e.timeStamp);
                } else if (!this.shouldPointerLock() || this.isPointerLocked())
                    l.LatencyIndicator.getInstance().toggleIndicator(),
                        this.packetHandler.sendMouseDown(e.button, e.timeStamp);
                else {
                    this.updatePointerLock(!0),
                        this.setCursorPosFromOffset(e.offsetX, e.offsetY),
                        this.scheduleCursorDraw();
                    const t = this.cursorState.absX,
                        i = this.cursorState.absY;
                    this.packetHandler.sendCursorPos(!0, t, i, e.timeStamp);
                }
            }
            mouseup(e) {
                l.LatencyIndicator.getInstance().toggleIndicator(),
                    this.packetHandler.sendMouseUp(e.button, e.timeStamp);
            }
            mousewheel(e) {
                this.packetHandler.sendMouseWheel(e.deltaY, e.timeStamp);
            }
            freeMouseMove(e) {
                this.setCursorPosFromOffset(e.offsetX, e.offsetY),
                    this.packetHandler.sendCursorPos(!0, this.cursorState.absX, this.cursorState.absY, e.timeStamp);
            }
            handlePointerEvent(e) {
                if (e instanceof PointerEvent) {
                    if (!e.isPrimary) return;
                    if (this.touchListener && "mouse" !== e.pointerType) return;
                    e.preventDefault();
                }
                let t = performance.now();
                if (!this.focused || (this.shouldPointerLock() && !this.isPointerLocked())) return;
                if (0 === e.movementX && 0 === e.movementY) return;
                let i = 1,
                    s = 0;
                const n = this.cursorState.absPositioning,
                    r = this.moveEventBuffer.moveEventIndex,
                    o = (e) => {
                        if (!this.mouseFilter.update(e.movementX, e.movementY, e.timeStamp)) return;
                        let r = this.mouseFilter.getX(),
                            o = this.mouseFilter.getY();
                        if (n)
                            this.cursorState.confined
                                ? this.setCursorPosFromMovement(r, o)
                                : this.setCursorPosFromOffset(e.offsetX, e.offsetY),
                                (this.cursorCanvasState.dirty = !0),
                                (r = this.cursorState.absX),
                                (o = this.cursorState.absY);
                        else if (this.isChromium && !this.isMacOs) {
                            let e = this.cursorCanvasState.dpiRatio;
                            (r += this.cursorState.remX),
                                (o += this.cursorState.remY),
                                (this.cursorState.remX = r % e),
                                (this.cursorState.remY = o % e),
                                (r /= e),
                                (o /= e);
                        }
                        const a = s % i != 0;
                        this.moveEventBuffer.addMoveEvent(n, r, o, e.timeStamp, 0, t, a), s++;
                    };
                if (e instanceof PointerEvent && this.supportsCoalescedEvents) {
                    const t = e.getCoalescedEvents(),
                        s = t.length > 72 ? 1 : Math.max(36 - this.moveEventBuffer.moveEventIndex - 4, 1);
                    t.length > s && ((i = Math.ceil(t.length / s)), (this.measurements.aggregatedCount += t.length));
                    for (let e of t) o(e);
                } else o(e);
                this.packetHandler.protocolVersion > 1 &&
                    0 === r &&
                    this.moveEventBuffer.moveEventIndex > r &&
                    this.moveEventBuffer.setGroupSize(r, this.moveEventBuffer.moveEventIndex - r);
            }
            pointermove(e) {
                this.handlePointerEvent(e);
            }
            pointerrawupdate(e) {
                const t = this.packetHandler.hasScheduledPackets();
                if ((this.handlePointerEvent(e), !t && this.packetHandler.hasScheduledPackets())) {
                    const e = performance.now() - this.packetHandler.lastMoveSendTime;
                    e >= this.rawCoalesceInterval
                        ? this.packetHandler.sendScheduledPackets()
                        : this.packetHandler.timeScheduledPackets(this.rawCoalesceInterval - e);
                }
            }
            setCursorPosFromOffset(e, t) {
                this.setCursorPosFromDisplayVideo(e - this.videoState.leftPadding, t - this.videoState.topPadding);
            }
            setCursorPosFromMovement(e, t) {
                let i = this.isChromium && !this.isMacOs ? this.cursorCanvasState.dpiRatio : 1;
                this.setCursorPosFromDisplayVideo(this.cursorState.absX + e / i, this.cursorState.absY + t / i);
            }
            setCursorPosFromServer(e, t) {
                this.setCursorPosFromDisplayVideo(
                    (e * this.videoState.displayVideoWidth) / 65535,
                    (t * this.videoState.displayVideoHeight) / 65535
                );
            }
            setCursorPosFromDisplayVideo(e, t) {
                (this.cursorState.absX = Math.min(Math.max(e, 0), this.videoState.displayVideoWidth)),
                    (this.cursorState.absY = Math.min(Math.max(t, 0), this.videoState.displayVideoHeight));
            }
            getCursorCanvas(e) {
                let t = document.getElementById(this.cursorCanvasId);
                if (t && t instanceof HTMLCanvasElement && t.parentElement === e.parentElement) return t;
                if (t) {
                    let e;
                    do {
                        (e = "canvasId" + Math.round(1e4 * Math.random())), (t = document.getElementById(e));
                    } while (t);
                    this.cursorCanvasId = e;
                }
                return this.createCursorCanvasElement(e);
            }
            createCursorCanvasElement(e) {
                let t = document.createElement("canvas");
                return (
                    (t.id = this.cursorCanvasId),
                    (t.style.touchAction = "none"),
                    (t.style.pointerEvents = "none"),
                    (t.style.willChange = "transform"),
                    this.setCursorCanvasPosition(t, e),
                    e.insertAdjacentElement("afterend", t),
                    t
                );
            }
            setCursorCanvasPosition(e, t) {
                const i = t.getBoundingClientRect(),
                    s = this.getTranslationLimits(),
                    n =
                        i.left +
                        window.pageXOffset -
                        this.videoOffsetX +
                        s.horizontal +
                        (this.videoZoomFactor - 1) * this.videoState.leftPadding,
                    r =
                        i.top +
                        window.pageYOffset -
                        this.videoOffsetY +
                        s.vertical +
                        (this.videoZoomFactor - 1) * this.videoState.topPadding;
                (e.style.position = "absolute"),
                    (e.style.left = n + "px"),
                    (e.style.top = r + "px"),
                    (e.style.zIndex = "200"),
                    this.updateCursorCanvasState(e);
            }
            clientAspectGreater(e, t) {
                return !(Math.abs(e - t) < 0.01) && e > t;
            }
            updateVideoState(e) {
                if (e.videoWidth <= 0 || e.videoHeight <= 0) return;
                let t,
                    i,
                    s = 1,
                    n = 0,
                    r = 0,
                    o = e.videoWidth / e.videoHeight,
                    a = e.clientWidth / e.clientHeight;
                if (this.clientAspectGreater(a, o)) {
                    (s = e.clientHeight / e.videoHeight),
                        (t = e.videoWidth * s),
                        (i = e.videoHeight * s),
                        (r = (e.clientWidth - t) / 2);
                } else {
                    (s = e.clientWidth / e.videoWidth),
                        (t = e.videoWidth * s),
                        (i = e.videoHeight * s),
                        (n = (e.clientHeight - i) / 2);
                }
                let d = 1,
                    h = 1;
                this.videoState.displayVideoWidth &&
                    this.videoState.displayVideoHeight &&
                    ((d = t / this.videoState.displayVideoWidth),
                    (h = i / this.videoState.displayVideoHeight),
                    (this.cursorState.absX *= d),
                    (this.cursorState.absY *= h)),
                    (this.videoState.displayVideoWidth = t),
                    (this.videoState.displayVideoHeight = i),
                    (this.videoState.scalingFactor = s),
                    (this.videoState.topPadding = n),
                    (this.videoState.leftPadding = r),
                    (this.videoState.videoWidth = e.videoWidth),
                    (this.videoState.videoHeight = e.videoHeight),
                    this.applyVideoTransforms(this.videoOffsetX * d, this.videoOffsetY * h, this.videoZoomFactor);
            }
            updateCursorCanvasState(e) {
                let t = e.getContext("2d");
                t &&
                    ((this.cursorCanvasState.dpiRatio = window.devicePixelRatio),
                    (this.cursorCanvasState.graphicsContext = t),
                    (this.cursorCanvasState.cursorScaling = this.getCursorScaling()),
                    (this.cursorCanvasState.imageChanged = !0),
                    (this.cursorCanvasState.imageDimensionsChanged = !0));
            }
            getCursorScaling() {
                const e = this.cursorCanvasState.dpiRatio;
                return e >= 1.499 && e < 1.999 ? 2 : Math.max(1, Math.floor(e + 0.001));
            }
            drawCursor(e, t, i) {
                if (this.cursorCanvas)
                    if (!this.touchListener && e) {
                        const e = this.getTranslationLimits();
                        this.drawCursorPadded(
                            t * this.videoZoomFactor + this.videoOffsetX - e.horizontal,
                            i * this.videoZoomFactor + this.videoOffsetY - e.vertical,
                            this.videoState.leftPadding,
                            this.videoState.topPadding
                        );
                    } else this.hideCursor(this.cursorCanvas);
            }
            parseStyle(e, t = -1) {
                if (e && e.startsWith("url")) {
                    let i,
                        s = e.indexOf(")"),
                        n = e.substring(4, s),
                        r = !1;
                    if (t > -1) {
                        const e = this.cursorCache[t].imageElement;
                        if (e) {
                            if (((i = e), 0 === i.width && 0 === i.height))
                                return void (this.cursorState.imagePendingDecode = i);
                            r = !0;
                        } else (i = new Image()), (this.cursorCache[t].imageElement = i);
                    } else i = new Image();
                    r || (!i.decode && i.decoding && (i.decoding = "sync"), (i.src = n));
                    let o = () => {
                        let t = e.indexOf(",", s + 1);
                        t < 0 && (t = e.length);
                        let n = e.substring(s + 1, t).trim(),
                            r = n.indexOf(" "),
                            o = n.indexOf(",", r + 1);
                        o < 0 && (o = n.length);
                        let a = n.substring(0, r),
                            d = n.substring(r + 1, o);
                        0 != i.width &&
                            0 != i.height &&
                            ((this.cursorCanvasState.imageChanged = !0),
                            (this.cursorCanvasState.imageDimensionsChanged =
                                !this.cursorState.image ||
                                i.width !== this.cursorState.image.width ||
                                i.height !== this.cursorState.image.height),
                            (this.cursorState.image = i),
                            (this.cursorState.hotspotX = 0 | parseInt(a)),
                            (this.cursorState.hotspotY = 0 | parseInt(d)),
                            (this.cursorState.width = i.width * this.cursorCanvasState.cursorScaling),
                            (this.cursorState.height = i.height * this.cursorCanvasState.cursorScaling),
                            this.scheduleCursorDraw());
                    };
                    !r && i.decode
                        ? ((this.cursorState.imagePendingDecode = i),
                          i
                              .decode()
                              .then(() => {
                                  this.cursorState.imagePendingDecode === i &&
                                      ((this.cursorState.imagePendingDecode = void 0), o());
                              })
                              .catch((e) => {
                                  this.cursorState.imagePendingDecode === i &&
                                      ((this.cursorState.imagePendingDecode = void 0),
                                      this.parseStyle(
                                          this.makeCursorUrl(m.imageStr, m.mimeTypeStr, m.hotspotX, m.hotspotY)
                                      ));
                              }))
                        : ((this.cursorState.imagePendingDecode = void 0), o());
                } else if (e && "none" === e) this.hideCursor(this.cursorCanvas);
                else {
                    let t = this.cursorStyles.indexOf(e);
                    if (t) {
                        let e = g[t];
                        if (e)
                            return void this.parseStyle(
                                this.makeCursorUrl(e.imageStr, e.mimeTypeStr, e.hotspotX, e.hotspotY)
                            );
                    }
                    this.parseStyle(this.makeCursorUrl(m.imageStr, m.mimeTypeStr, m.hotspotX, m.hotspotY));
                }
            }
            drawCursorPadded(e, t, i, s) {
                if (!this.cursorCanvas) return;
                const n = this.cursorCanvasState.dpiRatio,
                    r = this.cursorCanvasState.cursorScaling / n;
                let o = (e - this.cursorState.hotspotX * r + i) * n,
                    a = (t - this.cursorState.hotspotY * r + s) * n;
                if (
                    (this.zoomInProgress || ((o = Math.round(o)), (a = Math.round(a))),
                    (o /= n),
                    (a /= n),
                    this.cursorCanvasState.imageChanged && this.cursorState.image)
                ) {
                    this.cursorCanvasState.imageChanged = !1;
                    const e = this.cursorCanvasState.graphicsContext;
                    e.clearRect(0, 0, this.cursorCanvas.width, this.cursorCanvas.height),
                        this.cursorCanvasState.imageDimensionsChanged &&
                            ((this.cursorCanvasState.imageDimensionsChanged = !1),
                            (this.cursorCanvas.style.width = this.cursorState.width / n + "px"),
                            (this.cursorCanvas.style.height = this.cursorState.height / n + "px"),
                            (this.cursorCanvas.width = Math.ceil(this.cursorState.width)),
                            (this.cursorCanvas.height = Math.ceil(this.cursorState.height)),
                            e.scale(1, 1),
                            (e.imageSmoothingEnabled = !1)),
                        e.drawImage(this.cursorState.image, 0, 0, this.cursorState.width, this.cursorState.height);
                }
                this.cursorCanvasState.showing ||
                    ((this.cursorCanvasState.showing = !0), (this.cursorCanvas.style.visibility = "visible")),
                    (this.cursorCanvas.style.transform = "translate(" + o + "px, " + a + "px)");
            }
            hideCursor(e) {
                this.cursorCanvasState.showing &&
                    ((this.cursorCanvasState.showing = !1),
                    (e.style.visibility = "hidden"),
                    (this.cursorState.image = void 0));
            }
            updateCursorStyle(e) {
                this.cursorState.style = e;
            }
            handleSystemCursor(e, t, i) {
                this.cursorState.absPositioning ||
                    0 === e ||
                    null === t ||
                    null === i ||
                    this.setCursorPosFromServer(t, i),
                    this.setCursorMovementAbsolute("none" != this.cursorStyles[e]),
                    this.updatePointerLock(),
                    this.updateCursorStyle(this.cursorStyles[e]),
                    this.updateHardwareCursor(),
                    this.scheduleCursorDraw();
            }
            handleBitmapCursor(e, t, i, n, r, o, a) {
                let d;
                r.length > 0 && (this.cursorCache[e] = { imageStr: r, hotspotX: t, hotspotY: i, mimeTypeStr: n }),
                    (d = this.cursorCache[e]),
                    void 0 !== d
                        ? (this.cursorState.absPositioning ||
                              0 === e ||
                              null === o ||
                              null === a ||
                              this.setCursorPosFromServer(o, a),
                          this.setCursorStyleImageInternal(d, e))
                        : s.Log.e(u, "Undefined cursor from cache: ", e);
            }
            makeCursorUrl(e, t, i, s) {
                return "url(" + ("data:" + t + ";base64," + e) + ") " + i + " " + s;
            }
            setCursorStyleImageInternal(e, t) {
                this.setCursorMovementAbsolute(!0), this.updatePointerLock();
                let i = this.makeCursorUrl(e.imageStr, e.mimeTypeStr, e.hotspotX, e.hotspotY) + ", auto";
                this.updateCursorStyle(i), this.updateHardwareCursor(), this.parseStyle(i, t);
            }
            updateHardwareCursor() {
                const e = this.videoTagElement;
                !this.isUserInputEnable || (this.shouldPointerLock() && !this.isPointerLocked()) || 2 == this.cursorType
                    ? (e.style.cursor = "default")
                    : this.cursorCanvas
                    ? (e.style.cursor = "none")
                    : (e.style.cursor = this.cursorState.style);
            }
            scheduleCursorDraw() {
                this.cursorCanvasState.dirty = !0;
            }
            setCursorMovementAbsolute(e) {
                (this.cursorState.absPositioning = e), e || ((this.cursorState.remX = 0), (this.cursorState.remY = 0));
            }
            setCursorConfinement(e) {
                (this.cursorState.confined = e), this.updatePointerLock();
            }
            fullscreenEventHandler(e) {
                const t = window.document,
                    i = !!(
                        document.fullscreen ||
                        1 == t.webkitIsFullScreen ||
                        t.mozFullScreen ||
                        t.msFullscreenElement
                    );
                if (
                    (s.Log.d(u, "fullscreenchange: " + (i ? "fullscreen" : "not fullscreen")),
                    (this.fullscreen = i),
                    i ? this.updatePointerLock(!0) : ((this.allowPointerLock = !1), this.updatePointerLock()),
                    this.resized(e),
                    i)
                ) {
                    if (window.isSecureContext) {
                        const e = window.navigator.keyboard;
                        e &&
                            e.lock &&
                            e.lock([
                                "Escape",
                                "BrowserBack",
                                "BrowserForward",
                                "BrowserRefresh",
                                "BrowserHome",
                                "BrowserFavorites",
                                "BrowserSearch",
                                "BrowserStop",
                                "Sleep",
                                "Power",
                                "WakeUp",
                                "KeyT",
                                "KeyZ",
                                "Slash",
                                "Digit1",
                                "Digit2",
                                "Digit3",
                                "Digit4",
                                "Digit5",
                                "Digit6",
                                "Digit7",
                                "Digit8",
                                "Digit9",
                                "KeyM",
                                "KeyD",
                                "KeyN",
                                "KeyS",
                                "KeyK",
                                "KeyL",
                                "Space",
                                "PrintScreen",
                                "LaunchApp1",
                                "LaunchApp2",
                                "LaunchMail",
                                "Comma",
                                "Semicolon",
                                "ArrowLeft",
                                "ArrowRight",
                                "BracketLeft",
                                "BracketRight",
                                "KeyW",
                                "KeyQ",
                                "KeyR",
                                "KeyY",
                                "KeyO",
                                "KeyP",
                                "KeyF",
                                "KeyG",
                            ]);
                    }
                    (this.videoTagElement.onclick = null),
                        this.videoTagElement.removeAttribute("controls"),
                        this.updateHardwareCursor();
                } else if ((this.releasePressedKeys(), window.isSecureContext)) {
                    const e = window.navigator.keyboard;
                    e && e.unlock && e.unlock();
                }
            }
            pointerLockChange(e) {
                document.pointerLockElement instanceof HTMLElement
                    ? (this.pointerLockElement = document.pointerLockElement)
                    : ((this.pointerLockElement = null),
                      this.shouldPointerLock() &&
                          (s.Log.i(u, "User left pointer lock"),
                          (this.allowPointerLock = !1),
                          this.updateHardwareCursor()));
            }
            pointerLockError(e) {
                this.pointerLockReturnsPromise ||
                    ((this.pointerLockElement = null),
                    this.unadjustedMovementAllowed
                        ? ((this.unadjustedMovementAllowed = !1),
                          s.Log.e(u, "Pointer Locking Error: retrying in case unadjustedMovement is not supported."),
                          this.updatePointerLock())
                        : (s.Log.e(u, "Pointer Locking Error: aborted"), this.handlePointerLockFailed()));
            }
            handlePointerLockFailed() {
                this.updateHardwareCursor();
            }
            shouldPointerLock() {
                return (
                    this.supportsPointerLock &&
                    this.isUserInputEnable &&
                    2 != this.cursorType &&
                    this.focused &&
                    (!this.cursorState.absPositioning || this.cursorState.confined)
                );
            }
            isPointerLocked() {
                return null !== this.pointerLockElement;
            }
            updatePointerLock(e) {
                e && (this.allowPointerLock = !0);
                const t = this.shouldPointerLock(),
                    i = this.isPointerLocked(),
                    n = this.unadjustedMovementAllowed && !this.cursorState.absPositioning,
                    r = this.unadjustedMovementActive;
                if (!this.allowPointerLock || !t || (i && n === r))
                    !t &&
                        i &&
                        ((this.pointerLockElement = null), document.exitPointerLock && document.exitPointerLock());
                else {
                    const e = this.videoTagElement;
                    if (((this.pointerLockElement = e), e.requestPointerLock))
                        if (this.isChromium) {
                            const t = { unadjustedMovement: n },
                                i = e.requestPointerLock(t);
                            i &&
                                ((this.pointerLockReturnsPromise = !0),
                                i
                                    .then(() => {
                                        this.unadjustedMovementActive = n;
                                    })
                                    .catch((e) => {
                                        (this.pointerLockElement = null),
                                            "NotSupportedError" === e.name && n
                                                ? (s.Log.i(u, "Unadjusted movement is unsupported, trying again"),
                                                  (this.unadjustedMovementAllowed = !1),
                                                  this.updatePointerLock())
                                                : (s.Log.e(u, `Pointer lock failed: ${e.name}, ${e.message}`),
                                                  this.handlePointerLockFailed());
                                    }));
                        } else e.requestPointerLock();
                }
            }
            enableBackPrevention() {
                this.historyProtected ||
                    ((this.historyProtected = !0),
                    history.pushState(null, document.title, location.href),
                    window.addEventListener("popstate", this.popStateFunc));
            }
            disableBackPrevention() {
                this.historyProtected &&
                    (window.removeEventListener("popstate", this.popStateFunc),
                    history.back(),
                    (this.historyProtected = !1));
            }
            enableUserInput() {
                var e, t, i;
                (this.rendering = !0),
                    window.requestAnimationFrame(this.preRenderFunc),
                    this.gamepadHandler.enableUserInput(),
                    n.IsiOS() ||
                        (this.videoAddEventListener("mousedown", this.mousedownFunc),
                        this.videoAddEventListener("mouseup", this.mouseupFunc)),
                    this.documentAddEventListener("wheel", this.mousewheelFunc),
                    this.addMoveListener(),
                    this.documentAddEventListener("keydown", this.keydownFunc),
                    this.documentAddEventListener("keyup", this.keyupFunc),
                    null === (e = this.textInputElement) ||
                        void 0 === e ||
                        e.addEventListener("input", this.textInputFunc),
                    null === (t = this.textInputElement) ||
                        void 0 === t ||
                        t.addEventListener("compositionstart", this.textCompositionFunc),
                    null === (i = this.textInputElement) ||
                        void 0 === i ||
                        i.addEventListener("compositionend", this.textCompositionFunc),
                    this.cursorCanvas &&
                        ((this.cursorCanvas.style.display = "block"), (this.videoTagElement.style.cursor = "none")),
                    !this.gestureDetector || (this.touchListener && !this.isVirtualKeyboardVisible)
                        ? this.touchListener && this.touchListener.start()
                        : this.gestureDetector.start(),
                    this.preventNavigation && this.enableBackPrevention();
            }
            disableUserInput() {
                var e, t, i;
                (this.rendering = !1),
                    this.gamepadHandler.disableUserInput(),
                    n.IsiOS() ||
                        (this.videoRemoveEventListener("mousedown", this.mousedownFunc),
                        this.videoRemoveEventListener("mouseup", this.mouseupFunc)),
                    this.documentRemoveEventListener("wheel", this.mousewheelFunc),
                    this.removeMoveListener(),
                    this.documentRemoveEventListener("keydown", this.keydownFunc),
                    this.documentRemoveEventListener("keyup", this.keyupFunc),
                    null === (e = this.textInputElement) ||
                        void 0 === e ||
                        e.removeEventListener("input", this.textInputFunc),
                    null === (t = this.textInputElement) ||
                        void 0 === t ||
                        t.removeEventListener("compositionstart", this.textCompositionFunc),
                    null === (i = this.textInputElement) ||
                        void 0 === i ||
                        i.removeEventListener("compositionend", this.textCompositionFunc),
                    this.cursorCanvas &&
                        ((this.cursorCanvas.style.display = "none"), (this.videoTagElement.style.cursor = "default")),
                    this.gestureDetector && this.gestureDetector.stop(),
                    this.touchListener && this.touchListener.stop(),
                    this.preventNavigation && this.disableBackPrevention(),
                    0 !== this.statsGestureTimerId &&
                        (window.clearTimeout(this.statsGestureTimerId), (this.statsGestureTimerId = 0)),
                    0 !== this.touchTimerId && (window.clearTimeout(this.touchTimerId), (this.touchTimerId = 0)),
                    this.touchDelay.clear();
            }
            toggleUserInput(e) {
                s.Log.d(u, "toggleUserInput " + this.isUserInputEnable + " " + e),
                    this.isUserInputEnable != e &&
                        ((this.isUserInputEnable = e),
                        e ? this.enableUserInput() : this.disableUserInput(),
                        this.updatePointerLock());
            }
            setRawUpdate(e) {
                if (this.supportsRawUpdate && this.rawUpdateState !== e)
                    switch (
                        (this.isUserInputEnable && this.removeMoveListener(),
                        (this.rawUpdateState = e),
                        this.isUserInputEnable && this.addMoveListener(),
                        e)
                    ) {
                        case 1:
                            this.rawCoalesceInterval = 4;
                            break;
                        case 2:
                            this.rawCoalesceInterval = 8;
                            break;
                        case 3:
                            this.rawCoalesceInterval = 16;
                            break;
                        default:
                            this.rawCoalesceInterval = 0;
                    }
            }
            addMoveListener() {
                2 == this.cursorType
                    ? this.videoAddEventListener("mousemove", this.freeMouseMoveFunc)
                    : 0 !== this.rawUpdateState
                    ? this.videoAddEventListener("pointerrawupdate", this.pointerRawUpdateFunc)
                    : this.videoAddEventListener(this.getMoveEventName(), this.pointerMoveFunc);
            }
            removeMoveListener() {
                2 == this.cursorType
                    ? this.videoRemoveEventListener("mousemove", this.freeMouseMoveFunc)
                    : 0 !== this.rawUpdateState
                    ? this.videoRemoveEventListener("pointerrawupdate", this.pointerRawUpdateFunc)
                    : this.videoRemoveEventListener(this.getMoveEventName(), this.pointerMoveFunc);
            }
            onVideoBlur(e) {
                (this.focused = !1), s.Log.d(u, "lost focus"), this.releasePressedKeys();
            }
            onVideoFocus(e) {
                (this.focused = !0), this.fullscreen && this.updatePointerLock(!0), s.Log.d(u, "got focus");
            }
            getShiftModifierFlag(e) {
                let t = void 0;
                if (n.IsiOS()) {
                    const i = '!@#$%^&*()~_+{}|:"<>?',
                        s = "1234567890`-=[]\\;',./";
                    1 === e.key.length && (i.includes(e.key) ? (t = 1) : s.includes(e.key) && (t = 0));
                }
                return void 0 === t && e.shiftKey && (t = 1), null != t ? t : 0;
            }
            getModifierFlags(e) {
                let t = 0;
                return (
                    e.ctrlKey && (t |= 2),
                    e.altKey && (t |= 4),
                    e.metaKey && (t |= 8),
                    (t |= this.getShiftModifierFlag(e)),
                    t
                );
            }
            sendHeartbeatEvent() {
                this.inputEnabledStateBeforeUserIdlePendingOverlay ||
                    (this.toggleUserInput(!1), (this.inputEnabledStateBeforeUserIdlePendingOverlay = !0)),
                    this.packetHandler.sendHeartbeatEvent();
            }
            clearIdleTimeout() {
                this.setUserIdleTimeoutPending(!1);
                this.eventEmitter.emit("StreamingEvent", { streamingWarnings: { code: 4 } }), this.sendHeartbeatEvent();
            }
            getIdleEvents() {
                return [this.getMoveEventName(), "pointerdown", "touchstart"];
            }
            idleInputListener() {
                this._isUserIdleTimeoutPending && this.clearIdleTimeout();
            }
            setUserIdleTimeoutPending(e) {
                (this._isUserIdleTimeoutPending = e),
                    e &&
                        !this.isUserInputEnable &&
                        ((this.inputEnabledStateBeforeUserIdlePendingOverlay = !1), this.toggleUserInput(!0)),
                    e
                        ? this.getIdleEvents().forEach((e) =>
                              this.documentAddEventListener(e, this.idleInputListenerFunc)
                          )
                        : this.getIdleEvents().forEach((e) =>
                              this.documentRemoveEventListener(e, this.idleInputListenerFunc)
                          );
            }
            releasePressedKeys() {
                0 != this.pressedKeys.size &&
                    (s.Log.i(u, "releasing " + this.pressedKeys.size + " pressed keys"),
                    this.pressedKeys.forEach((e) => {
                        this.packetHandler.sendKeyboardEvent(4, e, 0);
                    }),
                    this.pressedKeys.clear());
            }
            getMoveEventName() {
                return this.isSafari ? "mousemove" : "pointermove";
            }
            perfCallback(e) {
                e.getEntriesByType("longtask").forEach((e) => {
                    let t = Math.round(e.duration);
                    a.RagnarokProfiler.addMainThreadBlockDuration(t, e.startTime),
                        this.streamClient.updateBlockedDuration(t),
                        s.Log.i(u, "Main thread was blocked for " + t + "ms");
                });
            }
            getVirtualGamepadHandler() {
                return this.gamepadHandler.getVirtualGamepadHandler();
            }
            sendTextInput(e) {
                this.packetHandler.sendTextInput(e);
            }
            sendTextInputElementContent() {
                const e = new TextEncoder().encode(this.textInputElement.value);
                this.sendTextInput(e.buffer), (this.textInputElement.value = "");
            }
            textCompositionHandler(e) {
                if ("compositionstart" === e.type) this.textCompositionStarted = !0;
                else {
                    (this.textCompositionStarted = !1), this.sendTextInputElementContent();
                    const e = { compositionText: "" };
                    this.eventEmitter.emit("TextComposition", e);
                }
            }
            textInputHandler() {
                if (this.textCompositionStarted) {
                    const e = { compositionText: this.textInputElement.value };
                    this.eventEmitter.emit("TextComposition", e);
                } else this.sendTextInputElementContent();
            }
            setVirtualKeyboardState(e) {
                s.Log.i(u, "set virtual keyboard state " + e),
                    this.isVirtualKeyboardVisible !== e &&
                        ((this.isVirtualKeyboardVisible = e),
                        this.gestureDetector &&
                            this.touchListener &&
                            (this.isVirtualKeyboardVisible
                                ? (this.touchListener.stop(), this.gestureDetector.start())
                                : (this.gestureDetector.stop(),
                                  1 !== this.videoZoomFactor && this.applyVideoTransforms(0, 0, 1),
                                  this.touchListener.start())));
            }
            getTranslationLimits() {
                return {
                    horizontal: (this.videoState.displayVideoWidth * (this.videoZoomFactor - 1)) / 2,
                    vertical: (this.videoState.displayVideoHeight * (this.videoZoomFactor - 1)) / 2,
                };
            }
            touchMove(e, t, i) {
                this.touchDelay.flushImmediately();
                const s = e.getBoundingClientRect(),
                    n = (t.clientX - s.left) / this.videoZoomFactor,
                    r = (t.clientY - s.top) / this.videoZoomFactor;
                this.setCursorPosFromOffset(n, r),
                    this.scheduleCursorDraw(),
                    this.packetHandler.sendCursorPos(!0, this.cursorState.absX, this.cursorState.absY, i);
            }
            applyVideoTransforms(e, t, i) {
                this.videoZoomFactor = i;
                let s = this.getTranslationLimits();
                (s.horizontal -= this.videoState.leftPadding), (s.vertical -= this.videoState.topPadding);
                let n = Math.max(
                        0,
                        this.videoState.displayVideoHeight -
                            this.videoState.viewportHeight +
                            2 * this.videoState.topPadding
                    ),
                    r = Math.max(s.vertical + n, 0),
                    o = Math.max(s.vertical, 0);
                (s.horizontal = Math.max(s.horizontal, 0)),
                    (e = Math.min(Math.max(e, -1 * s.horizontal), s.horizontal)),
                    (t = Math.min(Math.max(t, -1 * r), o)),
                    (this.videoTagElement.style.transform = `translate3d(${e}px,${t}px,0px) scale3d(${i},${i},1)`),
                    (this.videoOffsetX = e),
                    (this.videoOffsetY = t),
                    this.scheduleCursorDraw();
            }
            shouldPreventDefault() {
                return this._isUserIdleTimeoutPending ? (this.clearIdleTimeout(), !1) : this.focused;
            }
            tap(e, t, i, s) {
                switch ((this.touchDelay.flushImmediately(), s)) {
                    case 1:
                        this.touchMove(e, i, t),
                            this.touchDelay.delay(() => {
                                this.packetHandler.sendMouseDown(0, t),
                                    this.touchDelay.delay(() => {
                                        this.packetHandler.sendMouseUp(0, t);
                                    });
                            });
                        break;
                    case 2:
                        0 === this.statsGestureTimerId
                            ? (this.statsGestureTimerId = window.setTimeout(() => {
                                  (this.statsGestureTimerId = 0),
                                      this.packetHandler.sendMouseDown(2, t),
                                      this.packetHandler.sendMouseUp(2, t);
                              }, 300))
                            : (window.clearTimeout(this.statsGestureTimerId),
                              (this.statsGestureTimerId = 0),
                              this.streamClient.toggleOnScreenStats());
                        break;
                    case 3:
                        this.packetHandler.sendMouseDown(1, t), this.packetHandler.sendMouseUp(1, t);
                        break;
                    case 4:
                        this.packetHandler.sendMouseDown(3, t), this.packetHandler.sendMouseUp(3, t);
                        break;
                    case 5:
                        this.packetHandler.sendMouseDown(4, t), this.packetHandler.sendMouseUp(4, t);
                }
            }
            holdBegin(e, t, i) {
                1 === this.videoZoomFactor &&
                    (this.touchMove(e, i, t),
                    this.touchDelay.delay(() => {
                        this.packetHandler.sendMouseDown(0, t);
                    }));
            }
            holdEnd(e, t) {
                1 === this.videoZoomFactor &&
                    (this.touchDelay.flushImmediately(), this.packetHandler.sendMouseUp(0, t));
            }
            drag(e, t, i) {
                1 === this.videoZoomFactor && void 0 === this.touchListener
                    ? this.touchMove(e, i, t)
                    : this.applyVideoTransforms(
                          this.videoOffsetX + i.deltaX,
                          this.videoOffsetY + i.deltaY,
                          this.videoZoomFactor
                      );
            }
            scroll(e, t, i) {
                i.length > 0 && this.packetHandler.sendMouseWheel(Math.sign(i[0].deltaY), t);
            }
            panZoom(e, t, i) {
                if (2 === i.length) {
                    this.zoomInProgress = !0;
                    const e = i[0],
                        t = i[1],
                        s = Math.hypot(e.clientX - t.clientX, e.clientY - t.clientY),
                        n = Math.hypot(
                            e.clientX - e.deltaX - (t.clientX - t.deltaX),
                            e.clientY - e.deltaY - (t.clientY - t.deltaY)
                        ),
                        r = this.videoTagElement.getBoundingClientRect(),
                        o = this.getTranslationLimits();
                    let a = this.videoZoomFactor * (s / n);
                    a = Math.min(Math.max(a, 1), 3);
                    let d = (e.clientX + t.clientX) / 2 - r.left;
                    (d += this.videoOffsetX - o.horizontal - (r.width - d) / this.videoZoomFactor),
                        (d = (a / this.videoZoomFactor - 1) * d * -1),
                        (d += this.videoOffsetX + (e.deltaX + t.deltaX) / 2);
                    let h = (e.clientY + t.clientY) / 2 - r.top;
                    (h += this.videoOffsetY - o.vertical - (r.height - h) / this.videoZoomFactor),
                        (h = (a / this.videoZoomFactor - 1) * h * -1),
                        (h += this.videoOffsetY + (e.deltaY + t.deltaY) / 2),
                        this.applyVideoTransforms(d, h, a);
                }
            }
            panZoomEnd(e, t) {
                (this.zoomInProgress = !1),
                    this.videoZoomFactor < 1.1
                        ? this.applyVideoTransforms(this.videoOffsetX, this.videoOffsetY, 1)
                        : this.scheduleCursorDraw();
            }
        };
        class v {
            constructor() {
                (this.timerId = 0), (this.flushing = !1);
            }
            flushImmediately() {
                (this.flushing = !0), this.resetTimer(), this.callCallback(), (this.flushing = !1);
            }
            clear() {
                (this.callback = void 0), this.resetTimer();
            }
            delay(e) {
                this.flushing
                    ? e()
                    : (this.flushImmediately(),
                      (this.callback = e),
                      (this.timerId = window.setTimeout(() => {
                          (this.timerId = 0), this.callCallback();
                      }, v.TOUCH_DELAY_MS)));
            }
            callCallback() {
                const e = this.callback;
                e && ((this.callback = void 0), e());
            }
            resetTimer() {
                0 !== this.timerId && (window.clearTimeout(this.timerId), (this.timerId = 0));
            }
        }
        v.TOUCH_DELAY_MS = 30;
    },
    /*!**********************************************!*\
  !*** ./ragnarok-core/src/gesturedetector.ts ***!
  \**********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./latencyindicator */ 10),
            n = i(/*! ./settings */ 8),
            r = i(/*! ./utils */ 5);
        function o(e, t = !1) {
            let i = t ? r.WarpTouch(e) : { x: e.clientX, y: e.clientY };
            return { identifier: e.identifier, clientX: i.x, clientY: i.y, deltaX: 0, deltaY: 0 };
        }
        t.maximumTapDurationMs = 500;
        t.GestureDetector = class {
            constructor(e, i, r, a) {
                (this.target = e),
                    (this.videoAddEventListener = i),
                    (this.videoRemoveEventListener = r),
                    (this.gestureHandler = a),
                    (this.allowableMovement = 10),
                    (this.currentTouches = []),
                    (this.tapTimerId = 0),
                    (this.maxTouchCount = 0),
                    (this.activeGesture = 0),
                    (this.touchStartListener = (e) => {
                        let i = !1;
                        const r = e.changedTouches;
                        for (let a = 0; a < r.length; a++) {
                            const d = r[a];
                            d.target === this.target &&
                                ((i = !0),
                                s.LatencyIndicator.getInstance().toggleIndicator(),
                                0 === this.currentTouches.length
                                    ? ((this.activeGesture = 1),
                                      (this.tapTimerId = window.setTimeout(() => {
                                          (this.tapTimerId = 0),
                                              1 === this.maxTouchCount &&
                                                  ((this.activeGesture = 2),
                                                  n.RagnarokSettings.advancedGestures &&
                                                      this.gestureHandler.holdBegin(this.target, e.timeStamp, o(d)));
                                      }, t.maximumTapDurationMs)))
                                    : 1 !== this.activeGesture &&
                                      (2 === this.activeGesture || 4 === this.activeGesture
                                          ? n.RagnarokSettings.advancedGestures &&
                                            this.gestureHandler.holdEnd(this.target, e.timeStamp)
                                          : 6 === this.activeGesture &&
                                            n.RagnarokSettings.advancedGestures &&
                                            this.gestureHandler.panZoomEnd(this.target, e.timeStamp),
                                      (this.activeGesture = 0)),
                                this.currentTouches.push(o(d)),
                                this.currentTouches.length > this.maxTouchCount &&
                                    (this.maxTouchCount = this.currentTouches.length));
                        }
                        this.gestureHandler.shouldPreventDefault() && i && e.preventDefault();
                    }),
                    (this.touchMoveListener = (e) => {
                        let t = !1;
                        for (let e of this.currentTouches) (e.deltaX = 0), (e.deltaY = 0);
                        const i = e.changedTouches;
                        let s = [];
                        for (let e = 0; e < i.length; e++) {
                            const n = i[e],
                                r = this.currentTouches.findIndex((e) => e.identifier == n.identifier);
                            if (-1 != r) {
                                t = !0;
                                const e = this.currentTouches[r],
                                    i = n.clientX - e.clientX,
                                    o = n.clientY - e.clientY;
                                let a = !1;
                                if (
                                    (0 !== this.tapTimerId
                                        ? (Math.abs(i) > this.allowableMovement ||
                                              Math.abs(o) > this.allowableMovement) &&
                                          (window.clearTimeout(this.tapTimerId), (this.tapTimerId = 0), (a = !0))
                                        : (a = !0),
                                    a)
                                ) {
                                    const e = {
                                        identifier: n.identifier,
                                        clientX: n.clientX,
                                        clientY: n.clientY,
                                        deltaX: i,
                                        deltaY: o,
                                    };
                                    s.push(r), (this.currentTouches[r] = e);
                                }
                            }
                        }
                        s.length > 0 &&
                            0 === this.tapTimerId &&
                            0 !== this.activeGesture &&
                            (1 === this.currentTouches.length
                                ? (1 === this.activeGesture
                                      ? (this.activeGesture = 3)
                                      : 2 === this.activeGesture && (this.activeGesture = 4),
                                  n.RagnarokSettings.advancedGestures &&
                                      this.gestureHandler.drag(this.target, e.timeStamp, this.currentTouches[0]))
                                : 2 === this.currentTouches.length
                                ? 5 === this.activeGesture
                                    ? n.RagnarokSettings.advancedGestures &&
                                      this.gestureHandler.scroll(this.target, e.timeStamp, this.currentTouches)
                                    : 6 === this.activeGesture
                                    ? n.RagnarokSettings.advancedGestures &&
                                      this.gestureHandler.panZoom(this.target, e.timeStamp, this.currentTouches)
                                    : 1 === this.activeGesture &&
                                      (this.currentTouches[0].deltaY * this.currentTouches[1].deltaY > 0 &&
                                      (Math.sign(this.currentTouches[0].deltaX) ===
                                          Math.sign(this.currentTouches[1].deltaX) ||
                                          (Math.abs(this.currentTouches[0].deltaX) < this.allowableMovement &&
                                              Math.abs(this.currentTouches[1].deltaX) < this.allowableMovement))
                                          ? ((this.activeGesture = 5),
                                            n.RagnarokSettings.advancedGestures &&
                                                this.gestureHandler.scroll(
                                                    this.target,
                                                    e.timeStamp,
                                                    this.currentTouches
                                                ))
                                          : ((this.activeGesture = 6),
                                            n.RagnarokSettings.advancedGestures &&
                                                this.gestureHandler.panZoom(
                                                    this.target,
                                                    e.timeStamp,
                                                    this.currentTouches
                                                )))
                                : (this.activeGesture = 0)),
                            this.gestureHandler.shouldPreventDefault() && t && e.preventDefault();
                    }),
                    (this.touchCancelListener = (e) => {
                        this.endTouches(e, !1);
                    }),
                    (this.touchEndListener = (e) => {
                        this.endTouches(e, !0);
                    });
            }
            static isSupported() {
                return n.RagnarokSettings.forceTouchCapable || r.IsTouchCapable();
            }
            endTouches(e, t) {
                let i = !1;
                const r = e.changedTouches;
                for (let a = 0; a < r.length; a++) {
                    const d = r[a],
                        h = this.currentTouches.findIndex((e) => e.identifier == d.identifier);
                    -1 != h &&
                        ((i = !0),
                        s.LatencyIndicator.getInstance().toggleIndicator(),
                        this.currentTouches.splice(h, 1),
                        0 === this.currentTouches.length
                            ? (0 !== this.tapTimerId
                                  ? (window.clearTimeout(this.tapTimerId),
                                    (this.tapTimerId = 0),
                                    t &&
                                        this.gestureHandler.tap(this.target, e.timeStamp, o(d, !0), this.maxTouchCount))
                                  : (2 !== this.activeGesture && 4 !== this.activeGesture) ||
                                    (n.RagnarokSettings.advancedGestures &&
                                        this.gestureHandler.holdEnd(this.target, e.timeStamp)),
                              (this.maxTouchCount = 0),
                              (this.activeGesture = 0))
                            : 5 === this.activeGesture
                            ? (this.activeGesture = 0)
                            : 6 === this.activeGesture &&
                              (n.RagnarokSettings.advancedGestures &&
                                  this.gestureHandler.panZoomEnd(this.target, e.timeStamp),
                              (this.activeGesture = 0)));
                }
                this.gestureHandler.shouldPreventDefault() && i && e.preventDefault();
            }
            start() {
                const e = { passive: !n.RagnarokSettings.advancedGestures };
                this.videoAddEventListener("touchstart", this.touchStartListener, e),
                    this.videoAddEventListener("touchmove", this.touchMoveListener, e),
                    this.videoAddEventListener("touchcancel", this.touchCancelListener, e),
                    this.videoAddEventListener("touchend", this.touchEndListener, e);
            }
            stop() {
                if (
                    (this.videoRemoveEventListener("touchstart", this.touchStartListener),
                    this.videoRemoveEventListener("touchmove", this.touchMoveListener),
                    this.videoRemoveEventListener("touchcancel", this.touchCancelListener),
                    this.videoRemoveEventListener("touchend", this.touchEndListener),
                    (this.currentTouches = []),
                    0 !== this.tapTimerId && (window.clearTimeout(this.tapTimerId), (this.tapTimerId = 0)),
                    (this.maxTouchCount = 0),
                    n.RagnarokSettings.advancedGestures)
                )
                    switch (this.activeGesture) {
                        case 6:
                            this.gestureHandler.panZoomEnd(this.target, performance.now());
                            break;
                        case 2:
                        case 4:
                            this.gestureHandler.holdEnd(this.target, performance.now());
                    }
                this.activeGesture = 0;
            }
        };
    },
    /*!***************************************!*\
  !*** ./ragnarok-core/src/keycodes.ts ***!
  \***************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.CODE_TO_VK_MAP = new Map([
                ["Escape", 27],
                ["Digit0", 48],
                ["Digit1", 49],
                ["Digit2", 50],
                ["Digit3", 51],
                ["Digit4", 52],
                ["Digit5", 53],
                ["Digit6", 54],
                ["Digit7", 55],
                ["Digit8", 56],
                ["Digit9", 57],
                ["Minus", 189],
                ["Equal", 187],
                ["Backspace", 8],
                ["Tab", 9],
                ["KeyQ", 81],
                ["KeyW", 87],
                ["KeyE", 69],
                ["KeyR", 82],
                ["KeyT", 84],
                ["KeyY", 89],
                ["KeyU", 85],
                ["KeyI", 73],
                ["KeyO", 79],
                ["KeyP", 80],
                ["BracketLeft", 219],
                ["BracketRight", 221],
                ["Enter", 13],
                ["ControlLeft", 162],
                ["KeyA", 65],
                ["KeyS", 83],
                ["KeyD", 68],
                ["KeyF", 70],
                ["KeyG", 71],
                ["KeyH", 72],
                ["KeyJ", 74],
                ["KeyK", 75],
                ["KeyL", 76],
                ["Semicolon", 186],
                ["Quote", 222],
                ["Backquote", 192],
                ["ShiftLeft", 160],
                ["Backslash", 220],
                ["KeyZ", 90],
                ["KeyX", 88],
                ["KeyC", 67],
                ["KeyV", 86],
                ["KeyB", 66],
                ["KeyN", 78],
                ["KeyM", 77],
                ["Comma", 188],
                ["Period", 190],
                ["Slash", 191],
                ["ShiftRight", 161],
                ["NumpadMultiply", 106],
                ["AltLeft", 164],
                ["Space", 32],
                ["CapsLock", 20],
                ["F1", 112],
                ["F2", 113],
                ["F3", 114],
                ["F4", 115],
                ["F5", 116],
                ["F6", 117],
                ["F7", 118],
                ["F8", 119],
                ["F9", 120],
                ["F10", 121],
                ["Pause", 19],
                ["ScrollLock", 145],
                ["Numpad7", 103],
                ["Numpad8", 104],
                ["Numpad9", 105],
                ["NumpadSubtract", 109],
                ["Numpad4", 100],
                ["Numpad5", 101],
                ["Numpad6", 102],
                ["NumpadAdd", 107],
                ["Numpad1", 97],
                ["Numpad2", 98],
                ["Numpad3", 99],
                ["Numpad0", 96],
                ["NumpadDecimal", 110],
                ["PrintScreen", 42],
                ["IntlBackslash", 226],
                ["F11", 122],
                ["F12", 123],
                ["NumpadEqual", 187],
                ["F13", 124],
                ["F14", 125],
                ["F15", 126],
                ["F16", 127],
                ["F17", 128],
                ["F18", 129],
                ["F19", 130],
                ["F20", 131],
                ["F21", 132],
                ["F22", 133],
                ["F23", 134],
                ["F24", 135],
                ["KanaMode", 233],
                ["Lang2", 25],
                ["Lang1", 21],
                ["Convert", 234],
                ["NonConvert", 235],
                ["IntlYen", 193],
                ["NumpadComma", 188],
                ["NumpadEnter", 13],
                ["ControlRight", 163],
                ["NumpadDivide", 111],
                ["PrintScreen", 42],
                ["AltRight", 165],
                ["NumLock", 144],
                ["Pause", 19],
                ["Home", 36],
                ["ArrowUp", 38],
                ["PageUp", 33],
                ["ArrowLeft", 37],
                ["ArrowRight", 39],
                ["End", 35],
                ["ArrowDown", 40],
                ["PageDown", 34],
                ["Insert", 45],
                ["Delete", 46],
                ["MetaLeft", 91],
                ["OSLeft", 91],
                ["MetaRight", 92],
                ["OSRight", 92],
                ["Lang2", 25],
                ["Lang1", 21],
                ["NumpadClear", 12],
                ["NumpadClearEntry", 12],
            ])),
            (t.KEY_TO_VK_MAP = new Map([
                ["HanjaMode", 25],
                ["HangulMode", 21],
            ]));
    },
    /*!*************************************************!*\
  !*** ./ragnarok-core/src/inputpackethandler.ts ***!
  \*************************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./logger */ 6),
            n = i(/*! ./utils */ 5),
            r = i(/*! ./inputpacketinfo */ 36),
            o = i(/*! ./touchlistener */ 20),
            a = "inputpackethandler",
            d = r.SENT_TIMESTAMP_LEN + 1;
        class h extends DataView {
            constructor(e, t, i, s) {
                super(e, t, i),
                    (this.shift = 0),
                    (this.setUint8 = (e, t) => super.setUint8(e + this.shift, t)),
                    (this.setUint16 = (e, t, i) => super.setUint16(e + this.shift, t, i)),
                    (this.setUint32 = (e, t, i) => super.setUint32(e + this.shift, t, i)),
                    (this.setInt8 = (e, t) => super.setInt8(e + this.shift, t)),
                    (this.setInt16 = (e, t, i) => super.setInt16(e + this.shift, t, i)),
                    (this.setInt32 = (e, t, i) => super.setInt32(e + this.shift, t, i)),
                    (this.setFloat32 = (e, t, i) => super.setFloat32(e + this.shift, t, i)),
                    (this.setFloat64 = (e, t, i) => super.setFloat64(e + this.shift, t, i)),
                    (this.shift = null != s ? s : 0);
            }
        }
        function l(e) {
            return e ? 26 : 22;
        }
        t.InputPacketHandler = class {
            constructor(e, t, i, s, n, a, h) {
                (this._lastMoveSendTime = 0),
                    (this._protocolVersion = 0),
                    (this.buffer = new ArrayBuffer(1150)),
                    (this.bufferView = new DataView(this.buffer)),
                    (this.touchBuffer = new ArrayBuffer(d + 8 + 16 * o.MAX_TOUCH_COUNT)),
                    (this.touchBufferView = new DataView(this.touchBuffer)),
                    (this.gamepadBufferView = new DataView(new ArrayBuffer(161))),
                    (this.tempBuffer = new ArrayBuffer(100)),
                    (this.sendTimerId = 0),
                    (this.kbEventsSentToServer = { keydowns: 0, keyups: 0 }),
                    (this.prependScheduledMoves = this.prependScheduledMovesV2),
                    (this.getTempPacket = this.getTempPacketV2),
                    (this.inputHandler = e),
                    (this.moveEventBuffer = t),
                    (this.streamClient = n),
                    (this.videoState = s),
                    (this.inputChannel = a),
                    (this.inputChannel.onmessage = (e) => this.onMessage(e)),
                    (this.telemetry = h),
                    (this.measurements = i),
                    this.touchBufferView.setUint8(r.SENT_TIMESTAMP_LEN, 34),
                    this.touchBufferView.setUint32(d, 24, !0);
            }
            sendLockKeyState(e) {
                const t = this.getTempPacket(5);
                t.setUint32(0, 19, !0), t.setUint8(4, e);
                try {
                    this.sendInput(t), s.Log.d(a, "synchronized lock key states. Binary Value: " + e.toString(2));
                } catch (e) {
                    let t = "LockKeys state synchronize exception";
                    s.Log.e(a, t + ": " + e), this.telemetry.emitExceptionEvent(e, t, a + ".ts", 0, 0, !0);
                }
            }
            onMessage(e) {
                if (0 === this._protocolVersion) {
                    const t = new DataView(e.data);
                    (this._protocolVersion = t.getUint16(0, !0)),
                        2 == this._protocolVersion
                            ? (this.moveEventBuffer.supportsGrouping = !0)
                            : this._protocolVersion > 2 &&
                              ((this.moveEventBuffer.supportsGrouping = !0),
                              (this.prependScheduledMoves = this.prependScheduledMovesV3),
                              (this.getTempPacket = this.getTempPacketV3)),
                        s.Log.i(a, "Using protocol version " + this._protocolVersion);
                }
            }
            sendMouseDown(e, t) {
                const i = this.getTempPacket(18);
                i.setUint32(0, 8, !0),
                    i.setUint8(4, e + 1),
                    i.setUint8(5, 0),
                    i.setUint32(6, 0),
                    n.setUint64(t, i, 10, !1, 1e3);
                try {
                    this.sendInput(i);
                } catch (e) {
                    let t = "send mousedown exception";
                    s.Log.e(a, t + ": " + e), this.telemetry.emitExceptionEvent(e, t, a + ".ts", 0, 0, !0);
                }
            }
            sendMouseUp(e, t) {
                const i = this.getTempPacket(18);
                i.setUint32(0, 9, !0),
                    i.setUint8(4, e + 1),
                    i.setUint8(5, 0),
                    i.setUint32(6, 0),
                    n.setUint64(t, i, 10, !1, 1e3);
                try {
                    this.sendInput(i);
                } catch (e) {
                    let t = "send mouseup exception";
                    s.Log.e(a, t + ": " + e), this.telemetry.emitExceptionEvent(e, t, a + ".ts", 0, 0, !0);
                }
            }
            sendMouseWheel(e, t) {
                const i = this.getTempPacket(22);
                i.setUint32(0, 10, !0),
                    i.setUint16(4, 0, !1),
                    i.setUint16(6, -e, !1),
                    i.setUint16(8, 0, !1),
                    i.setUint32(10, 0),
                    n.setUint64(t, i, 14, !1, 1e3);
                try {
                    this.sendInput(i);
                } catch (e) {
                    let t = "send mousewheel exception";
                    s.Log.e(a, t + ": " + e), this.telemetry.emitExceptionEvent(e, t, a + ".ts", 0, 0, !0);
                }
            }
            sendCursorPos(e, t, i, n = 0) {
                const r = l(e),
                    o = this.getTempPacket(r);
                this.fillMovePacket(o, 0, e, t, i, n);
                try {
                    this.channelOpen() && this.sendInput(o);
                } catch (e) {
                    let t = "send CursorPos exception";
                    s.Log.e(a, t + ": " + e), this.telemetry.emitExceptionEvent(e, t, a + ".ts", 0, 0, !0);
                }
            }
            fillMouseGroupHeader(e, t, i, s, o) {
                return (
                    e.setUint8(t + 0, 32),
                    e.setUint16(t + 1, i, !1),
                    n.setUint64(o, e, t + 3, !1, 1e3),
                    n.setUint64(s, e, t + 11, !1, 1e3),
                    t + r.MOUSE_GROUP_HEADER_LEN
                );
            }
            fillMouseGroupPacketV2(e, t, i, s) {
                const n = this.moveEventBuffer.moveEvents[i],
                    o = t;
                t += r.MOUSE_GROUP_HEADER_LEN;
                for (let s = 0; s < n.groupSize; ++s) {
                    const n = this.moveEventBuffer.moveEvents[i + s];
                    e.setUint8(t, l(n.absPos)),
                        t++,
                        (t = this.fillMovePacket(e, t, n.absPos, n.x, n.y, n.captureTimestamp));
                }
                const a = t - o;
                return this.fillMouseGroupHeader(e, o, a, n.callbackTimestamp, s), t;
            }
            fillMovePacket(e, t, i, s, r, o = 0) {
                let a = this.videoState.displayVideoWidth,
                    d = this.videoState.displayVideoHeight,
                    h = 7;
                i && (h = 5);
                let c = 0;
                return (
                    5 == h && (c = 4),
                    e.setUint32(t + 0, h, !0),
                    e.setUint16(t + 4, s, !1),
                    e.setUint16(t + 6, r, !1),
                    e.setUint16(t + 8, 0, !1),
                    e.setUint32(t + 10 + c, 0, !1),
                    n.setUint64(o, e, t + 14 + c, !1, 1e3),
                    c && (e.setUint16(t + 10, a, !1), e.setUint16(t + 12, d, !1)),
                    t + l(i)
                );
            }
            sendKeyboardEvent(e, t, i, r = 0) {
                if (4 !== e && 3 !== e) return void s.Log.e(a, "Unexpected packedId: " + e);
                const o = this.getTempPacket(18);
                o.setUint32(0, e, !0),
                    o.setUint16(4, t, !1),
                    o.setUint16(6, i, !1),
                    o.setUint16(8, 0, !1),
                    n.setUint64(r, o, 10, !1, 1e3),
                    this.sendInput(o) &&
                        (4 === e
                            ? this.kbEventsSentToServer.keyups++
                            : 3 === e && this.kbEventsSentToServer.keydowns++);
            }
            sendHeartbeatEvent() {
                const e = this.getTempPacket(10);
                e.setUint32(0, 2, !0);
                try {
                    this.inputChannel.send(e), s.Log.d(a, "heartbeat sent ");
                } catch (e) {
                    let t = "heartbeat exception";
                    s.Log.e(a, t + ": " + e), this.telemetry.emitExceptionEvent(e, t, a + ".ts", 0, 0, !0);
                }
            }
            sendInput(e) {
                if ((this.hasScheduledPackets() && (e = this.prependScheduledMoves(e)), void 0 === e)) return !1;
                const t = window.performance.now();
                if (this.inputHandler.isUserIdleTimeoutPending) return this.inputHandler.clearIdleTimeout(), !1;
                let i = !1;
                this._protocolVersion > 2 &&
                    (e.byteOffset < r.SENT_TIMESTAMP_LEN
                        ? s.Log.w(a, "Unable to prepend send timestamp")
                        : ((e = new DataView(
                              e.buffer,
                              e.byteOffset - r.SENT_TIMESTAMP_LEN,
                              r.SENT_TIMESTAMP_LEN + e.byteLength
                          )).setUint8(0, 35),
                          n.setUint64(performance.now(), e, 1, !1, 1e3)));
                try {
                    let s = performance.now();
                    this.inputChannel.send(e);
                    let n = performance.now();
                    this.streamClient.updateDcTimeDuration(n - s);
                    const r = window.performance.now();
                    this.measurements.sendInputCount += 1;
                    const o = r - t;
                    o > 5 && (this.measurements.sendInputOver5ms += 1),
                        o > 10 && (this.measurements.sendInputOver10ms += 1),
                        (i = !0);
                } catch (e) {
                    if (e.stack && !e.stack.includes("Could not send data")) {
                        let t = "sendinput exception";
                        s.Log.e(a, t + ": " + e), this.telemetry.emitExceptionEvent(e, t, a + ".ts", 0, 0, !0);
                    }
                }
                return i;
            }
            getScheduledPacketSizeV2() {
                let e = 1,
                    t = 0;
                for (; t < this.moveEventBuffer.moveEventIndex; ) {
                    e += 2;
                    const i = this.moveEventBuffer.moveEvents[t].groupSize;
                    if (i > 0) {
                        e += r.MOUSE_GROUP_HEADER_LEN;
                        for (let s = 0; s < i; s++) e += 1 + l(this.moveEventBuffer.moveEvents[t + s].absPos);
                        t += i;
                    } else (e += l(this.moveEventBuffer.moveEvents[t].absPos)), t++;
                }
                return e;
            }
            getScheduledPacketSizeV3() {
                let e = 0;
                for (let t = 0; t < this.moveEventBuffer.moveEventIndex; t++) {
                    this.moveEventBuffer.moveEvents[t].groupSize > 0 && (e += r.CHROME_CALLBACK_LEN),
                        (e += 3 + l(this.moveEventBuffer.moveEvents[t].absPos));
                }
                return e;
            }
            hasScheduledPackets() {
                return this.moveEventBuffer.moveEventIndex > 0;
            }
            timeScheduledPackets(e) {
                this.sendTimerId = window.setTimeout(() => {
                    (this.sendTimerId = 0), this.sendScheduledPackets();
                }, e);
            }
            sendScheduledPackets() {
                this.sendInput();
            }
            prependScheduledMovesV2(e) {
                0 !== this.sendTimerId && (window.clearTimeout(this.sendTimerId), (this.sendTimerId = 0));
                const t = performance.now();
                this._lastMoveSendTime = t;
                const i = e ? 2 + e.byteLength : 0,
                    s = this.getScheduledPacketSizeV2() + i;
                let n;
                s > this.buffer.byteLength
                    ? ((n = new DataView(new ArrayBuffer(s))), this.measurements.oversizedEventCount++)
                    : (n = new DataView(this.buffer, 0, s)),
                    n.setUint8(0, 255);
                let r = 1,
                    o = 0;
                for (; o < this.moveEventBuffer.moveEventIndex; ) {
                    const e = r;
                    r += 2;
                    const i = this.moveEventBuffer.moveEvents[o];
                    i.groupSize > 0
                        ? ((r = this.fillMouseGroupPacketV2(n, r, o, t)), (o += i.groupSize))
                        : ((r = this.fillMovePacket(n, r, i.absPos, i.x, i.y, i.captureTimestamp)), o++),
                        n.setUint16(e, r - e - 2);
                }
                if ((this.moveEventBuffer.clear(), e)) {
                    n.setUint16(r, e.byteLength), (r += 2);
                    for (let t = 0; t < e.byteLength; t++) n.setUint8(r + t, e.getUint8(t));
                    r += e.byteLength;
                }
                return n;
            }
            prependScheduledMovesV3(e) {
                var t;
                if (e && e.buffer != this.buffer) return this.sendScheduledPackets(), e;
                0 !== this.sendTimerId && (window.clearTimeout(this.sendTimerId), (this.sendTimerId = 0)),
                    (this._lastMoveSendTime = performance.now());
                const i =
                        this.getScheduledPacketSizeV3() +
                        (null !== (t = null == e ? void 0 : e.byteLength) && void 0 !== t ? t : 0),
                    s = r.SENT_TIMESTAMP_LEN + i;
                let o;
                if (s > this.buffer.byteLength) {
                    if (
                        ((o = new DataView(new ArrayBuffer(s), s - i, i)), this.measurements.oversizedEventCount++, e)
                    ) {
                        const t = o.byteLength - e.byteLength;
                        for (let i = 0; i < e.byteLength; i++) o.setUint8(t + i, e.getUint8(i));
                    }
                } else o = new DataView(this.buffer, this.buffer.byteLength - i, i);
                let a = 0;
                for (let e = 0; e < this.moveEventBuffer.moveEventIndex; e++) {
                    const t = this.moveEventBuffer.moveEvents[e];
                    t.groupSize > 0 &&
                        (o.setUint8(a, 36),
                        n.setUint64(t.callbackTimestamp, o, a + 1, !1, 1e3),
                        (a += r.CHROME_CALLBACK_LEN)),
                        o.setUint8(a, 33),
                        o.setUint16(a + 1, l(t.absPos)),
                        (a = this.fillMovePacket(o, a + 3, t.absPos, t.x, t.y, t.captureTimestamp));
                }
                return this.moveEventBuffer.clear(), o;
            }
            getTempPacketV2(e) {
                return new h(this.tempBuffer, 0, e);
            }
            getTempPacketV3(e) {
                e += 1;
                const t = this.buffer.byteLength - e;
                let i = new h(this.buffer, t, e, 1);
                return this.bufferView.setUint8(t, 34), i;
            }
            sendTextInput(e) {
                let t = 0;
                let i = new DataView(e, 0, e.byteLength),
                    n = new ArrayBuffer(1020);
                for (; t < e.byteLength; ) {
                    let r = 0;
                    if (e.byteLength - t <= 1016) r = e.byteLength - t;
                    else {
                        r = t + 1016;
                        let e = !1;
                        for (let t = 0; t < 4; t++) {
                            if (128 != (192 & i.getUint8(r))) {
                                e = !0;
                                break;
                            }
                            r--;
                        }
                        if (!e) {
                            s.Log.e(
                                a,
                                "Couldn't find valid utf-8 code point at the end of of chunk in string during packetization"
                            );
                            break;
                        }
                        r -= t;
                    }
                    let o = new DataView(n, 0, r + 4);
                    o.setUint32(0, 23, !0),
                        new Uint8Array(n).set(new Uint8Array(e, t, r), 4),
                        (t += r),
                        this.sendInput(o);
                }
            }
            channelOpen() {
                return "open" === this.inputChannel.readyState;
            }
            stop() {
                this.inputChannel.bufferedAmount > 0 &&
                    s.Log.w(
                        a,
                        "Input channel had buffered data remaining: " + this.inputChannel.bufferedAmount + " bytes"
                    );
            }
            get protocolVersion() {
                return this._protocolVersion;
            }
            get lastMoveSendTime() {
                return this._lastMoveSendTime;
            }
            get kbEventCount() {
                return this.kbEventsSentToServer;
            }
            toHexString(e) {
                let t = new Uint8Array(e);
                return Array.prototype.map
                    .call(t, function (e) {
                        return ("0" + (255 & e).toString(16)).slice(-2);
                    })
                    .join("");
            }
            populateMultiGamepadPacket(e, t, i, s, r, o, a = 0, d = 0) {
                e.setUint32(t, 12, !0),
                    e.setInt16(t + 4, 26, !0),
                    e.setInt16(t + 6, i, !0),
                    e.setInt16(t + 8, d, !0),
                    e.setInt16(t + 6 + 4, 20, !0),
                    e.setInt16(t + 6 + 6, s, !0),
                    e.setInt16(t + 6 + 8, r, !0),
                    e.setInt16(t + 6 + 10, Math.round(32767.5 * (o[0] + 1)) - 32768, !0),
                    e.setInt16(t + 6 + 12, Math.round(32767.5 * (1 - o[1])) - 32768, !0),
                    e.setInt16(t + 6 + 14, Math.round(32767.5 * (o[2] + 1)) - 32768, !0),
                    e.setInt16(t + 6 + 16, Math.round(32767.5 * (1 - o[3])) - 32768, !0),
                    e.setInt16(t + 6 + 18, 0, !0),
                    e.setInt16(t + 6 + 20, 85, !0),
                    e.setInt16(t + 6 + 22, 0, !0),
                    n.setUint64(a, e, t + 6 + 24, !0, 1e3);
            }
            getMultiGamepadPacket(e, t, i, s, n = 0, r = 0) {
                const o = this.getTempPacket(38);
                return this.populateMultiGamepadPacket(o, 0, i, e, t, s, n, r), o;
            }
            gamepadBitmapUpdateHandler(e) {
                const t = this.getMultiGamepadPacket(0, 0, 0, {}, 0, e);
                this.sendInput(t);
            }
            gamepadStateUpdateHandler(e, t, i, s, n, o = 0, a) {
                if (this._protocolVersion > 2) {
                    const d = 41,
                        h = r.SENT_TIMESTAMP_LEN + d * e;
                    this.gamepadBufferView.setUint8(h, 33),
                        this.gamepadBufferView.setUint16(h + 1, 38),
                        this.populateMultiGamepadPacket(this.gamepadBufferView, h + 3, t, i, s, n, o, a);
                } else if (2 == this._protocolVersion) {
                    const r = 1 + 40 * e;
                    this.gamepadBufferView.setUint16(r, 38),
                        this.populateMultiGamepadPacket(this.gamepadBufferView, r + 2, t, i, s, n, o, a);
                } else {
                    const e = this.getMultiGamepadPacket(i, s, t, n, o, a);
                    this.sendInput(e);
                }
            }
            virtualGamepadUpdateHandler(e, t, i, s, n = 0) {
                const r = this.getMultiGamepadPacket(e, t, i, s, 0, n);
                this.sendInput(r);
            }
            finalizeGamepadData(e) {
                if (this._protocolVersion < 2) return;
                this.sendScheduledPackets();
                let t = null;
                if (this._protocolVersion > 2) {
                    const i = 41;
                    t = new DataView(this.gamepadBufferView.buffer, r.SENT_TIMESTAMP_LEN, e * i);
                } else if (2 == this._protocolVersion) {
                    this.gamepadBufferView.setUint8(0, 255);
                    const i = 40;
                    t = new DataView(this.gamepadBufferView.buffer, 0, 1 + e * i);
                }
                t && this.sendInput(t);
            }
            connectUnsupportedGamepad(e) {}
            disconnectUnsupportedGamepad(e) {}
            addTouchEvent(e, t, i, s, r, a, h, l) {
                if (e >= o.MAX_TOUCH_COUNT) return !1;
                const c = d + 8 + 16 * e;
                return (
                    this.touchBufferView.setUint8(c + 0, t),
                    this.touchBufferView.setUint8(c + 1, i),
                    this.touchBufferView.setUint16(c + 2, s, !1),
                    this.touchBufferView.setUint16(c + 4, r, !1),
                    this.touchBufferView.setUint8(c + 6, a),
                    this.touchBufferView.setUint8(c + 7, h),
                    n.setUint64(l, this.touchBufferView, c + 8, !1, 1e3),
                    !0
                );
            }
            sendTouchPacket(e) {
                let t = 8 + 16 * e;
                this.touchBufferView.setUint16(d + 4, t, !1), this.touchBufferView.setUint16(d + 6, e, !1);
                let i = d;
                this._protocolVersion >= 3 && (t++, i--);
                const s = new DataView(this.touchBufferView.buffer, i, t);
                return this.sendScheduledPackets(), this.sendInput(s);
            }
        };
        t.MoveEventBuffer = class {
            constructor(e) {
                (this.supportsGrouping = !1), (this._moveEventIndex = 0), (this._moveEvents = new Array(e));
                for (let e = 0; e < this.moveEvents.length; e++)
                    this._moveEvents[e] = {
                        absPos: !1,
                        x: 0,
                        y: 0,
                        captureTimestamp: 0,
                        groupSize: 0,
                        callbackTimestamp: 0,
                    };
            }
            get moveEvents() {
                return this._moveEvents;
            }
            get moveEventIndex() {
                return this._moveEventIndex;
            }
            clear() {
                this._moveEventIndex = 0;
            }
            setGroupSize(e, t) {
                this._moveEvents[e].groupSize = t;
            }
            addMoveEvent(e, t, i, s, n, r, o) {
                if (o && this._moveEventIndex > 0) {
                    const s = this._moveEvents[this._moveEventIndex - 1];
                    if (s.absPos === e && s.callbackTimestamp === r)
                        return void (e ? ((s.x = t), (s.y = i)) : ((s.x += t), (s.y += i)));
                }
                const a = this.supportsGrouping ? n : 0;
                if (this._moveEventIndex == this._moveEvents.length)
                    this._moveEvents.push({
                        absPos: e,
                        x: t,
                        y: i,
                        captureTimestamp: s,
                        groupSize: a,
                        callbackTimestamp: r,
                    }),
                        this._moveEventIndex++;
                else {
                    const n = this._moveEvents[this._moveEventIndex++];
                    (n.absPos = e),
                        (n.x = t),
                        (n.y = i),
                        (n.captureTimestamp = s),
                        (n.groupSize = a),
                        (n.callbackTimestamp = r);
                }
            }
        };
    },
    /*!**********************************************!*\
  !*** ./ragnarok-core/src/inputpacketinfo.ts ***!
  \**********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.CHROME_CALLBACK_LEN = 9),
            (t.SENT_TIMESTAMP_LEN = 9),
            (t.MOUSE_GROUP_HEADER_LEN = 19);
    },
    /*!*************************************************!*\
  !*** ./ragnarok-core/src/clientstatsservice.ts ***!
  \*************************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./logger */ 6),
            n = i(/*! ./qoscalculator */ 38),
            r = i(/*! ./streamstats */ 39),
            o = i(/*! ./ragnarokprofiler */ 12),
            a = i(/*! ./utils */ 5),
            d = i(/*! ./settings */ 8),
            h = i(/*! ./binaryreport */ 40),
            l = "clientstatsservice";
        t.ClientStatsService = class {
            constructor(e, t, i, s) {
                (this.statsIntervalId = 0),
                    (this.deprecatedstatsIntervalId = 0),
                    (this.videoPacketsReceived = 0),
                    (this.videoFramesDecoded = 0),
                    (this.audioCodecType = ""),
                    (this.videoCodecType = ""),
                    (this.initTypeId = !1),
                    (this.typeToIdMap = new Map()),
                    (this.bweMb = 0),
                    (this.jitter = 0),
                    (this.rtd = 0),
                    (this.mediaType = "video"),
                    (this.showStreamStats = !1),
                    (this.nextStreamStatsTs = 0),
                    (this.eventEmitter = e),
                    (this.streamClient = t),
                    (this.telemetry = s),
                    (this.keyDeprecatedStats = {
                        ts: 0,
                        timingFrameInfo: "",
                        targetDelayMs: 0,
                        minPlayoutDelayMs: 0,
                        currentDelayMs: 0,
                        type: "keyDeprecatedStats",
                    }),
                    (this.qosCalculator = new n.QosCalculator(t.getMaxBitRate())),
                    (this.streamStats = new r.StreamStats(this.streamClient.getVideoElement())),
                    (this.peerConnection = i),
                    this.createStatsDataChannel(),
                    (this.shouldEmitInternalStatsEvent = this.eventEmitter.hasListener("StreamingStats")),
                    (this.binaryReport = new h.BinaryReport(
                        o.RagnarokProfiler.getStreamBeginTime() + performance.timeOrigin
                    )),
                    (this.inboundVideoCounts = {
                        fallbackDecoder: 0,
                        currReportFailed: 0,
                        prevReportFailed: 0,
                        success: 0,
                    });
            }
            initMap() {
                this.peerConnection
                    .getStats(null)
                    .then((e) => {
                        for (let t of e.values())
                            if (this.isTypeWhitelisted(t.type)) {
                                this.typeToIdMap.get(t.type)
                                    ? this.typeToIdMap.get(t.type).push(t.id)
                                    : this.typeToIdMap.set(t.type, new Array(t.id));
                            }
                        (this.initTypeId = !0), (this.reportCache = e), this.processStatsReport(e);
                    })
                    .catch((e) => this.emitStatsException(e, "init"));
            }
            createStatsDataChannel() {
                (this.statsChannel = this.peerConnection.createDataChannel("stats_channel", {
                    ordered: !1,
                    reliable: !1,
                    maxRetransmits: 0,
                    binary: !0,
                })),
                    this.statsChannel
                        ? ((this.statsChannel.binaryType = "arraybuffer"),
                          (this.statsChannel.onopen = () => {
                              s.Log.d(l, "stats channel opened"), this.setIntervals();
                          }),
                          (this.statsChannel.onclose = () => {
                              s.Log.d(l, "stats channel closed"), this.clearIntervals();
                          }),
                          (this.statsChannel.onerror = (e) => {
                              this.streamClient.emitChannelErrorEvent("stats", e), this.clearIntervals();
                          }),
                          (this.statsChannel.onmessage = (e) => {
                              var t = new DataView(e.data);
                              let i = t.getUint8(0);
                              if (2 == i) {
                                  (this.bweMb = t.getFloat64(1, !0) / 1e6),
                                      (this.jitter = 1e3 * t.getFloat64(9, !0)),
                                      (this.rtd = t.getFloat64(17, !0));
                                  let e = this.streamStats.updateBwu(
                                      this.bweMb,
                                      this.streamClient.getMaxBitRate() / 1e3
                                  );
                                  this.streamStats.updateJitter(this.jitter),
                                      this.streamStats.updateRtd(this.rtd),
                                      this.qosCalculator.calculateBandwidthScoreV2(this.bweMb, e),
                                      this.qosCalculator.calculateLatencyScoreV2(this.rtd);
                              } else s.Log.e(l, "Received unsupported stats version: " + i);
                          }))
                        : s.Log.e(l, "stats channel is null");
            }
            setIntervals() {
                (this.statsIntervalId = window.setInterval(() => {
                    this.sendClientStats();
                }, 96)),
                    a.IsChrome() &&
                        (this.deprecatedstatsIntervalId = window.setInterval(() => {
                            this.saveDeprecatedStats();
                        }, 201));
            }
            clearIntervals() {
                this.statsIntervalId && (clearInterval(this.statsIntervalId), (this.statsIntervalId = 0)),
                    this.deprecatedstatsIntervalId &&
                        (clearInterval(this.deprecatedstatsIntervalId), (this.deprecatedstatsIntervalId = 0));
            }
            reset() {
                (this.deprecatedstatsIntervalId = 0),
                    (this.statsIntervalId = 0),
                    (this.keyDeprecatedStats = {
                        ts: 0,
                        timingFrameInfo: "",
                        targetDelayMs: 0,
                        minPlayoutDelayMs: 0,
                        currentDelayMs: 0,
                        type: "keyDeprecatedStats",
                    }),
                    (this.audioCodecType = ""),
                    (this.videoPacketsReceived = 0),
                    (this.videoFramesDecoded = 0),
                    (this.videoCodecType = ""),
                    (this.qosCalculator = new n.QosCalculator(this.streamClient.getMaxBitRate())),
                    (this.streamStats = new r.StreamStats(this.streamClient.getVideoElement())),
                    (this.reportCache = void 0);
            }
            isRunning() {
                return 0 != this.statsIntervalId;
            }
            stopStats() {
                this.clearIntervals(), this.reset(), this.setOnScreenStats(!1);
            }
            startStats() {
                this.isRunning() || this.setIntervals();
            }
            stop() {
                this.stopStats(),
                    this.telemetry.emitMetricEvent(
                        "InboundVideoStats",
                        "",
                        this.inboundVideoCounts.success,
                        this.inboundVideoCounts.currReportFailed,
                        this.inboundVideoCounts.fallbackDecoder,
                        this.inboundVideoCounts.prevReportFailed
                    );
            }
            isTypeWhitelisted(e) {
                let t = ["track", "transport", "inbound-rtp", "candidate-pair"];
                for (var i of t) if (i === e) return !0;
                return !1;
            }
            resetTypeIds() {
                this.initTypeId = !1;
            }
            processStatsReport(e) {
                const t = performance.now();
                if (
                    (t >= this.nextStreamStatsTs &&
                        "video" === this.mediaType &&
                        (this.updateOnScreenStats(e),
                        this.showStreamStats && this.streamStats.drawStatsOnScreen(d.RagnarokSettings.devMode),
                        (this.reportCache = e),
                        (this.nextStreamStatsTs = t + 1e3)),
                    this.convertReportToBinary(e),
                    "video" === this.mediaType)
                ) {
                    this.streamStats.updateWindowResolution(),
                        this.streamStats.updateQScore(this.qosCalculator.GetStreamQuality());
                    const e = this.qosCalculator.GetStreamQuality();
                    this.eventEmitter.emit("StreamingQuality", e),
                        this.shouldEmitInternalStatsEvent &&
                            this.eventEmitter.emit("StreamingStats", this.streamStats.getStreamingStats()),
                        o.RagnarokProfiler.addQualityScore(e);
                }
                let i = performance.now() - t;
                o.RagnarokProfiler.addGetStatsTime(i),
                    this.streamStats.updateStatsDuration(i),
                    (this.mediaType = "video" === this.mediaType ? "audio" : "video");
            }
            convertReportToBinary(e) {
                for (let t of this.typeToIdMap.entries()) {
                    let i = t[0];
                    for (let s of t[1]) {
                        const t = e.get(s);
                        this.binaryReport.convert(i, t);
                    }
                }
            }
            updateDcSendDuration(e) {
                this.streamStats.updateDcSendDuration(e);
            }
            updateBlockedDuration(e) {
                this.streamStats.updateMainThreadBlockDuration(e);
            }
            sendClientStats() {
                if (this.initTypeId) {
                    const e = this.peerConnection.getReceivers().find((e) => e.track.kind === this.mediaType);
                    if (!e) return;
                    e.getStats()
                        .then((e) => this.processStatsReport(e))
                        .catch((e) => this.emitStatsException(e, "standard"));
                } else this.initMap();
            }
            toggleOnScreenStats() {
                this.setOnScreenStats(!this.showStreamStats);
            }
            setOnScreenStats(e) {
                (this.showStreamStats = e),
                    this.streamStats.setShown(e),
                    e &&
                        (this.streamStats.drawStatsOnScreen(d.RagnarokSettings.devMode),
                        (this.nextStreamStatsTs = performance.now()));
            }
            updateOnScreenStats(e) {
                this.updateInBoundVideoRtpStats(e), this.updateCandidatePairStats(e), this.updateTrackStats(e);
            }
            updateInBoundVideoRtpStats(e) {
                var t;
                const i = this.typeToIdMap.get("inbound-rtp");
                if (!i || !this.reportCache) return;
                const s = i
                    .map((t) => e.get(t))
                    .find(
                        (e) =>
                            "video" === (null == e ? void 0 : e.kind) || "video" === (null == e ? void 0 : e.mediaType)
                    );
                if (!s) return void this.inboundVideoCounts.currReportFailed++;
                const n = s.decoderImplementation;
                if (null == n ? void 0 : n.indexOf) {
                    -1 !== n.indexOf("fallback") && this.inboundVideoCounts.fallbackDecoder++;
                }
                const r = this.reportCache.get(s.id);
                if (!r) return void this.inboundVideoCounts.prevReportFailed++;
                this.inboundVideoCounts.success++;
                let o = s.codecId;
                o && (this.videoCodecType = e.get(o).mimeType),
                    this.qosCalculator.calculateNetworkLossScore(s, r),
                    (this.videoFramesDecoded = s.framesDecoded),
                    (this.videoPacketsReceived = s.packetsReceived),
                    this.streamStats.updateFps(s, r),
                    this.streamStats.updatepacketLoss(s.packetsLost),
                    this.streamStats.updateAvgDecodeTime(s),
                    this.videoFramesDecoded &&
                        this.streamStats.updateCumulativeAvgDecodeTime(
                            (1e3 * s.totalDecodeTime) / this.videoFramesDecoded
                        );
                let a = null === (t = e.get(s.trackId)) || void 0 === t ? void 0 : t.framesReceived;
                a && this.streamStats.updateInterFrameDelay(s.totalInterFrameDelay, a),
                    this.streamStats.updateFrameLoss(s.pliCount);
            }
            updateCandidatePairStats(e) {
                const t = this.typeToIdMap.get("candidate-pair");
                if (!t || !this.reportCache) return;
                const i = t.map((t) => e.get(t)).find((e) => e);
                if (!i) return;
                const s = this.reportCache.get(i.id);
                s && this.streamStats.updateAvgStreamingRate(i, s);
            }
            updateTrackStats(e) {
                let t = this.typeToIdMap.get("track");
                if (!t) return;
                const i = t
                    .map((t) => e.get(t))
                    .find(
                        (e) =>
                            "video" === (null == e ? void 0 : e.kind) || void 0 !== (null == e ? void 0 : e.frameHeight)
                    );
                i &&
                    (this.streamStats.updateStreamingResolution(i.frameWidth, i.frameHeight),
                    this.streamStats.updateFrameDecoded(i.framesDecoded),
                    this.streamStats.updateFrameReceived(i.framesReceived),
                    this.streamStats.updateFramesDropped(i.framesDropped));
            }
            saveDeprecatedStats() {
                this.peerConnection.getStats((e) => {
                    for (let t of e.result())
                        if ("ssrc" == t.type)
                            for (let e of t.names()) {
                                "video" === t.stat("mediaType") &&
                                    ((this.keyDeprecatedStats.ts = o.RagnarokProfiler.getStreamTime()),
                                    (this.keyDeprecatedStats.timingFrameInfo = t.stat("googTimingFrameInfo")),
                                    (this.keyDeprecatedStats.targetDelayMs = +t.stat("googTargetDelayMs")),
                                    (this.keyDeprecatedStats.minPlayoutDelayMs = +t.stat("googMinPlayoutDelayMs")),
                                    (this.keyDeprecatedStats.currentDelayMs = +t.stat("googCurrentDelayMs")));
                                break;
                            }
                    this.binaryReport.convert("deprecated", this.keyDeprecatedStats);
                });
            }
            emitStatsException(e, t) {
                this.telemetry.emitExceptionEvent(e, `Exception in ${t} getStats`, l + ".ts", 0, 0, !0, "getStats");
            }
            getFramesDecoded() {
                return this.videoFramesDecoded;
            }
            getVideoCodec() {
                return this.videoCodecType;
            }
            getAudioCodec() {
                return this.audioCodecType;
            }
            packetsReceived() {
                return this.videoPacketsReceived;
            }
        };
    },
    /*!********************************************!*\
  !*** ./ragnarok-core/src/qoscalculator.ts ***!
  \********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        t.QosCalculator = class {
            constructor(e) {
                (this.maxBitrate = e / 1e3),
                    (this.minBitrate = 0),
                    (this.maxLatency = 250),
                    (this.minLatency = 10),
                    (this.iirFilterFactor = 16),
                    (this.qualityScore = 100),
                    (this.latencyScore = 100),
                    (this.bandwidthScore = 100),
                    (this.networkLossScore = 100),
                    (this.maxQosScore = 100),
                    (this.lowBandwidthUtilThreshold = 25);
            }
            calculateLatencyScore(e) {
                if (e.currentRoundTripTime > this.maxLatency) this.latencyScore = 0;
                else {
                    let t = 1e3 * e.currentRoundTripTime,
                        i = (100 * (this.maxLatency - t)) / (this.maxLatency - this.minLatency);
                    if (void 0 === i || isNaN(i)) return;
                    (this.latencyScore = this.applyIIRFilter(this.latencyScore, i, this.iirFilterFactor)),
                        (this.latencyScore = Math.min(this.latencyScore, this.maxQosScore));
                }
            }
            calculateLatencyScoreV2(e) {
                let t = 0;
                if (e < this.maxLatency) {
                    let i = e;
                    (t = (100 * (this.maxLatency - i)) / (this.maxLatency - this.minLatency)),
                        (void 0 === t || isNaN(t)) && (t = 0);
                }
                (this.latencyScore = this.applyIIRFilter(this.latencyScore, t, this.iirFilterFactor)),
                    (this.latencyScore = Math.min(this.latencyScore, this.maxQosScore));
            }
            calculateBandwidthScoreV2(e, t) {
                let i = 100;
                if (
                    (t >= this.lowBandwidthUtilThreshold &&
                        (i = ((e - this.minBitrate) / (this.maxBitrate - this.minBitrate)) * 100),
                    i > 100 && (i = 100),
                    void 0 === i || isNaN(i))
                )
                    return 0;
                (this.bandwidthScore = this.applyIIRFilter(this.bandwidthScore, i, this.iirFilterFactor)),
                    (this.bandwidthScore = Math.min(this.bandwidthScore, this.maxQosScore));
            }
            calculateNetworkLossScore(e, t) {
                let i = t.packetsReceived,
                    s = t.packetsLost,
                    n = e.packetsReceived - i,
                    r = e.packetsLost - s,
                    o = 100 - 100 * (r / (n + r));
                (isNaN(o) || void 0 === o) && (o = 0);
                let a = t.pliCount,
                    d = e.pliCount - a;
                d > 0 && (o = 0);
                for (let e = 0; e < d + 1; e++)
                    this.networkLossScore = this.applyIIRFilter(this.networkLossScore, o, this.iirFilterFactor / 2);
            }
            GetStreamQuality() {
                let e = Math.min(this.latencyScore, this.networkLossScore, this.bandwidthScore);
                return (
                    (this.qualityScore = this.applyIIRFilter(this.qualityScore, e, this.iirFilterFactor / 4)),
                    {
                        latencyScore: this.latencyScore,
                        networkLossScore: this.networkLossScore,
                        bandwidthScore: this.bandwidthScore,
                        qualityScore: this.qualityScore,
                    }
                );
            }
            applyIIRFilter(e, t, i) {
                return (e * (i - 1)) / i + t / i;
            }
        };
    },
    /*!******************************************!*\
  !*** ./ragnarok-core/src/streamstats.ts ***!
  \******************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./utils */ 5);
        class n {
            constructor() {
                (this.prevSum = 0), (this.currentSum = 0), (this.prevCount = 0), (this.currentCount = 0);
            }
            update(e, t) {
                if (0 == this.prevSum && 0 == this.prevCount) return (this.prevSum = e), void (this.prevCount = t);
                (this.currentCount = t), (this.currentSum = e);
            }
            getRollingAvg() {
                const e = this.currentCount - this.prevCount;
                return 0 != e ? (this.currentSum - this.prevSum) / e : 0;
            }
            reset() {
                (this.prevSum = this.currentSum), (this.prevCount = this.currentCount);
            }
        }
        t.StreamStats = class {
            constructor(e) {
                (this.streamingQuality = { qualityScore: 0, bandwidthScore: 0, networkLossScore: 0, latencyScore: 0 }),
                    (this.fps = ""),
                    (this.avgStreamingRate = ""),
                    (this.bwu = 4),
                    (this.bweMb = 0),
                    (this.frameDecoded = 0),
                    (this.frameReceived = 0),
                    (this.framesDropped = 0),
                    (this.avgVideoJitterBufferDelay = 0),
                    (this.rtd = 0),
                    (this.packetLoss = 0),
                    (this.windowResolution = ""),
                    (this.streamingResolution = ""),
                    (this.inputEventProcessed = 0),
                    (this.interFrameDelay = 0),
                    (this.videoElement = e),
                    (this.mainThreadblockedDuration = 0),
                    (this.dcSendDuration = { value: 0, count: 0, max: 0 }),
                    (this.getstatsDuration = { value: 0, count: 0, max: 0 }),
                    (this.decodeTimeAvg = new n());
                let t = document.getElementById("overlay-543d9968");
                t || ((t = this.createOverlayNode()), this.videoElement.insertAdjacentElement("afterend", t)),
                    (this.overlayElement = t),
                    (this.cumulativeAvgDecodeTime = 0),
                    (this.frameLost = 0);
            }
            updateFps(e, t) {
                let i = e.framesDecoded,
                    s = e.framesDecoded,
                    n = t.timestamp,
                    r = ((i - s) / (e.timestamp - n)) * 1e3,
                    o = Math.floor(r);
                this.fps = o.toString();
            }
            updateAvgDecodeTime(e) {
                e && this.decodeTimeAvg.update(e.totalDecodeTime, e.framesDecoded);
            }
            updateCumulativeAvgDecodeTime(e) {
                this.cumulativeAvgDecodeTime = e;
            }
            updateAvgStreamingRate(e, t) {
                let i = e.bytesReceived,
                    s = t.bytesReceived,
                    n = e.timestamp,
                    r = t.timestamp;
                if (n == r) return;
                let o = (i - s) / (125 * (n - r));
                this.avgStreamingRate = o.toFixed(2);
            }
            updateBwu(e, t) {
                return (
                    e > t && (e = t), e && (this.bwu = (+this.avgStreamingRate / e) * 100), (this.bweMb = e), this.bwu
                );
            }
            updatepacketLoss(e) {
                e && (this.packetLoss = e);
            }
            updateFrameDecoded(e) {
                e && (this.frameDecoded = e);
            }
            updateFrameReceived(e) {
                e && (this.frameReceived = e);
            }
            updateFramesDropped(e) {
                e && (this.framesDropped = e);
            }
            updateWindowResolution() {
                let e = window.innerWidth * window.devicePixelRatio,
                    t = window.innerHeight * window.devicePixelRatio;
                this.windowResolution = e.toString() + "X" + t.toString();
            }
            updateStreamingResolution(e, t) {
                e && t && (this.streamingResolution = e.toString() + "X" + t.toString());
            }
            updateQScore(e) {
                e && (this.streamingQuality = e);
            }
            updateInputEventProcessed() {}
            updateRtd(e) {
                this.rtd = e;
            }
            updateJitter(e) {
                this.avgVideoJitterBufferDelay = e;
            }
            updateInterFrameDelay(e, t) {
                let i = 1e3 * e;
                this.interFrameDelay = i / (t - 1);
            }
            getStreamingStats() {
                let e = this.streamingResolution.split("X");
                return {
                    fps: 0 | +this.fps,
                    cumulativeAvgDecodeTime: this.cumulativeAvgDecodeTime,
                    avgDecodeTime: 1e3 * this.decodeTimeAvg.getRollingAvg(),
                    bwe: this.bweMb,
                    bwu: this.bwu,
                    width: 0 | +e[0],
                    height: 0 | +e[1],
                };
            }
            drawStatsOnScreen(e) {
                (this.overlayElement.innerText = this.getText(e)),
                    (this.dcSendDuration = { value: 0, count: 0, max: 0 }),
                    (this.getstatsDuration = { value: 0, count: 0, max: 0 }),
                    this.decodeTimeAvg.reset();
            }
            setShown(e) {
                this.overlayElement.style.display = e ? "block" : "none";
            }
            createOverlayNode() {
                var e = document.createElement("div");
                return (
                    (e.id = "overlay-543d9968"),
                    (e.style.display = "none"),
                    (e.style.position = "fixed"),
                    s.IsiOS()
                        ? ((e.style.top = "env(safe-area-inset-top, 0)"),
                          (e.style.left = "max(24px, env(safe-area-inset-left, 0))"))
                        : ((e.style.top = "0"), (e.style.left = "0")),
                    (e.style.backgroundColor = "rgba(0,0,0,0.5)"),
                    (e.style.zIndex = "300"),
                    (e.style.fontSize = "12px"),
                    (e.style.fontFamily = "monospace"),
                    (e.style.color = "white"),
                    (e.style.whiteSpace = "pre"),
                    (e.style.lineHeight = "100%"),
                    (e.style.pointerEvents = "none"),
                    e
                );
            }
            updateDcSendDuration(e) {
                (this.dcSendDuration.value += e),
                    (this.dcSendDuration.count += 1),
                    (this.dcSendDuration.max = Math.max(e, this.dcSendDuration.max));
            }
            updateStatsDuration(e) {
                (this.getstatsDuration.value += e),
                    (this.getstatsDuration.count += 1),
                    (this.getstatsDuration.max = Math.max(e, this.getstatsDuration.max));
            }
            updateMainThreadBlockDuration(e) {
                this.mainThreadblockedDuration = Math.max(e, this.mainThreadblockedDuration);
            }
            getAvg(e) {
                let t = 0;
                return e.count > 0 && (t = e.value / e.count), t.toFixed(2);
            }
            getMax(e) {
                return e.max.toFixed(2);
            }
            updateFrameLoss(e) {
                void 0 === e || isNaN(e) || (this.frameLost = e);
            }
            getText(e) {
                let t = `${this.fps}fps j:${this.avgVideoJitterBufferDelay.toFixed(2)}ms r:${
                        this.avgStreamingRate
                    }Mbps bwu:${this.bwu.toFixed(2)}\n`,
                    i = `fd:${this.frameDecoded.toString()} fr:${this.frameReceived.toString()} fdr:${this.framesDropped.toString()} ft:${this.interFrameDelay.toFixed(
                        2
                    )}\n`,
                    s = `rtd:${this.rtd.toString()}ms pl:${this.packetLoss.toString()} d:${(
                        1e3 * this.decodeTimeAvg.getRollingAvg()
                    ).toFixed(2)} fl:${this.frameLost}\n`,
                    n = `wr:${this.windowResolution} sr:${this.streamingResolution} sq:${Math.floor(
                        this.streamingQuality.qualityScore
                    )}\n`,
                    r = `dc:${this.getAvg(this.dcSendDuration)}ms (${this.getMax(this.dcSendDuration)}ms) blocked:${
                        this.mainThreadblockedDuration
                    }\n`,
                    o = `stats:${this.getAvg(this.getstatsDuration)}ms (${this.getMax(this.getstatsDuration)}ms)\n`,
                    a = `latency:${this.streamingQuality.latencyScore.toFixed(
                        1
                    )} network:${this.streamingQuality.networkLossScore.toFixed(
                        1
                    )} bwe:${this.streamingQuality.bandwidthScore.toFixed(1)}`,
                    d = t + i + s + n;
                return e && (d += r + o + a), d;
            }
        };
    },
    /*!*******************************************!*\
  !*** ./ragnarok-core/src/binaryreport.ts ***!
  \*******************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./ragnarokprofiler */ 12),
            n = i(/*! ./utils */ 5);
        t.BinaryReport = class {
            constructor(e) {
                this.beginTime = e;
            }
            convert(e, t) {
                if (void 0 !== t)
                    switch (e) {
                        case "track":
                            this.SendTrackToWorker(t);
                            break;
                        case "inbound-rtp":
                            this.SendIbrtpToWorker(t);
                            break;
                        case "deprecated":
                            this.sendDeprStats(t);
                    }
            }
            getVal(e) {
                return void 0 === e || isNaN(e) ? 0 : e;
            }
            getRelativeTimestamp(e) {
                return n.IsSafari()
                    ? performance.now() - s.RagnarokProfiler.getStreamBeginTime()
                    : this.getVal(e) - this.beginTime;
            }
            SendTrackToWorker(e) {
                null != e.audioLevel ? this.sendAudioTrack(e) : this.sendVideoTrack(e);
            }
            sendAudioTrack(e) {
                let t = new ArrayBuffer(88),
                    i = new DataView(t);
                i.setFloat64(0, this.getVal(e.audioLevel), !0),
                    n.setUint64(this.getVal(e.concealedSamples), i, 8, !0),
                    n.setUint64(this.getVal(e.concealmentEvents), i, 16, !0),
                    n.setUint64(this.getVal(e.insertedSamplesForDeceleration), i, 24, !0),
                    i.setFloat64(32, this.getVal(e.jitterBufferDelay), !0),
                    n.setUint64(this.getVal(e.jitterBufferEmittedCount), i, 40, !0),
                    n.setUint64(this.getVal(e.removedSamplesForAcceleration), i, 48, !0),
                    n.setUint64(this.getVal(e.silentConcealedSamples), i, 56, !0),
                    i.setFloat64(64, this.getVal(e.totalSamplesReceived), !0),
                    i.setFloat64(72, this.getVal(e.totalSamplesDuration), !0),
                    i.setFloat64(80, this.getRelativeTimestamp(e.timestamp), !0),
                    s.RagnarokProfiler.addStatsReport(t, 4);
            }
            sendVideoTrack(e) {
                let t = new ArrayBuffer(44),
                    i = new DataView(t);
                i.setUint32(0, this.getVal(e.framesDecoded), !0),
                    i.setUint32(4, this.getVal(e.framesDropped), !0),
                    i.setUint32(8, this.getVal(e.frameHeight), !0),
                    i.setUint32(12, this.getVal(e.frameWidth), !0),
                    i.setUint32(16, this.getVal(e.framesReceived), !0),
                    i.setFloat64(20, this.getVal(e.jitterBufferDelay), !0),
                    n.setUint64(this.getVal(e.jitterBufferEmittedCount), i, 28, !0),
                    i.setFloat64(36, this.getRelativeTimestamp(e.timestamp), !0),
                    s.RagnarokProfiler.addStatsReport(t, 3);
            }
            SendIbrtpToWorker(e) {
                "audio" === e.kind || "audio" === e.mediaType ? this.sendAudioRtp(e) : this.sendVideoRtp(e);
            }
            sendAudioRtp(e) {
                let t = new ArrayBuffer(48),
                    i = new DataView(t);
                n.setUint64(this.getVal(e.packetsReceived), i, 0, !0),
                    n.setUint64(this.getVal(e.bytesReceived), i, 8, !0),
                    n.setUint64(this.getVal(e.packetsLost), i, 16, !0),
                    i.setFloat64(24, this.getVal(e.lastPacketReceivedTimestamp), !0),
                    i.setFloat64(32, this.getVal(e.jitter), !0),
                    i.setFloat64(40, this.getRelativeTimestamp(e.timestamp), !0),
                    s.RagnarokProfiler.addStatsReport(t, 2);
            }
            sendVideoRtp(e) {
                let t = new ArrayBuffer(68),
                    i = new DataView(t);
                i.setUint32(0, this.getVal(e.framesDecoded), !0),
                    i.setUint32(4, this.getVal(e.keyFramesDecoded), !0),
                    i.setUint32(8, this.getVal(e.nackCount), !0),
                    i.setInt32(12, this.getVal(e.packetsLost), !0),
                    i.setInt32(16, this.getVal(e.pliCount), !0),
                    n.setUint64(this.getVal(e.bytesReceived), i, 20, !0),
                    n.setUint64(this.getVal(e.packetsReceived), i, 28, !0),
                    i.setFloat64(36, this.getVal(e.totalDecodeTime), !0),
                    i.setFloat64(44, this.getVal(e.totalInterFrameDelay), !0),
                    i.setFloat64(52, this.getVal(e.totalSquaredInterFrameDelay), !0),
                    i.setFloat64(60, this.getRelativeTimestamp(e.timestamp), !0),
                    s.RagnarokProfiler.addStatsReport(t, 1);
            }
            sendDeprStats(e) {
                var t = e.timingFrameInfo.split(",", 15);
                if (t.length < 15) return;
                let i = new ArrayBuffer(70),
                    n = new DataView(i);
                n.setUint32(0, this.getVal(e.targetDelayMs), !0),
                    n.setUint32(4, this.getVal(e.minPlayoutDelayMs), !0),
                    n.setUint32(8, this.getVal(e.currentDelayMs), !0),
                    n.setFloat64(12, this.getVal(e.ts), !0),
                    n.setFloat64(20, this.getVal(parseFloat(t[3])), !0),
                    n.setFloat64(28, this.getVal(parseFloat(t[4])), !0),
                    n.setFloat64(36, this.getVal(parseFloat(t[8])), !0),
                    n.setFloat64(44, this.getVal(parseFloat(t[9])), !0),
                    n.setFloat64(52, this.getVal(parseFloat(t[10])), !0),
                    n.setFloat64(60, this.getVal(parseFloat(t[11])), !0),
                    n.setUint8(68, this.getVal(parseFloat(t[13]))),
                    n.setUint8(69, this.getVal(parseFloat(t[14]))),
                    s.RagnarokProfiler.addStatsReport(i, 0);
            }
        };
    },
    /*!*****************************************!*\
  !*** ./ragnarok-core/src/nvstconfig.ts ***!
  \*****************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./logger */ 6),
            n = i(/*! ./settings */ 8),
            r = i(/*! ./utils */ 5),
            o = "nvstconfig";
        function a(e) {
            return e.split(/\r?\n/);
        }
        function d(e, t, i, n) {
            const r = /^([^[.]+)(?:\[(\d+)\])?\.([^:]+): *(.+)$/;
            for (const d of a(e)) {
                const e = r.exec(d);
                if (e) {
                    const r = e[1],
                        a = void 0 !== e[2] ? Number.parseInt(e[2]) : void 0,
                        d = e[3],
                        c = e[4],
                        u = r + "." + d,
                        m = h(r),
                        g = l(t, m, a),
                        p = l(i, m, a);
                    if (!g || !p) return s.Log.e(o, `Override from ${n} specified unknown stream ${m}[${a}]`), !1;
                    if (!p.has(u)) return s.Log.e(o, `Override from ${n} specified unknown config ${u}:${c}`), !1;
                    s.Log.d(o, `Override from ${n}: ${u}:${c}`), g.set(u, c);
                }
            }
            return !0;
        }
        function h(e) {
            switch (e) {
                case "video":
                case "vqos":
                case "qscore":
                case "bwe":
                case "clientPerfBr":
                case "packetPacing":
                    return "video";
                case "audio":
                case "aqos":
                case "audioBitrate":
                    return "audio";
                case "ri":
                    return "application";
                case "mic":
                    return "mic";
                default:
                    return;
            }
        }
        function l(e, t, i) {
            var s;
            return void 0 === t
                ? e.generalAttributes
                : null === (s = e.media.filter((e) => e.mediaType === t)[null != i ? i : 0]) || void 0 === s
                ? void 0
                : s.attributes;
        }
        function c(e, t) {
            let i = `v=0\no=${e.origin}\ns=-\nt=${e.time}\n`;
            const s = (e, t) => {
                for (const [s, n] of e) n !== t.get(s) && (i += `a=${s}:${n}\n`);
            };
            s(e.generalAttributes, t.generalAttributes);
            for (const n of e.media) {
                (i += `m=${n.mediaType} 0 RTP/AVP\n`), (i += `a=msid:${n.msid}\n`);
                const e = t.media.find((e) => e.msid === n.msid);
                s(n.attributes, e.attributes);
            }
            return i;
        }
        (t.getDefaultNvstConfig = function (e) {
            var t, i, s;
            return {
                clientViewportWd: null !== (t = null == e ? void 0 : e.width) && void 0 !== t ? t : 0,
                clientViewportHt: null !== (i = null == e ? void 0 : e.height) && void 0 !== i ? i : 0,
                maxFps: null !== (s = null == e ? void 0 : e.fps) && void 0 !== s ? s : 0,
            };
        }),
            (t.handleNvstOffer = function (e, t, i) {
                const h = (function (e) {
                    let t = { origin: "", time: "", generalAttributes: new Map(), media: [] },
                        i = new Map(),
                        n = void 0,
                        r = void 0,
                        d = !1;
                    const h = () => {
                        if (d) {
                            if (!r || !n) return s.Log.e(o, "Did not receive msid for stream"), !1;
                            t.media.push({ mediaType: r, msid: n, attributes: i }), (r = void 0), (n = void 0);
                        } else (t.generalAttributes = i), (d = !0);
                        return (i = new Map()), !0;
                    };
                    for (const l of a(e)) {
                        if (l.length < 2 || "=" !== l[1]) continue;
                        const e = l[0],
                            a = l.substr(2);
                        if ("m" == e) {
                            if (!h()) return;
                            const e = a.split(" ");
                            r = e[0];
                        } else if ("a" == e) {
                            const e = a.split(":", 2);
                            if (1 === e.length) continue;
                            if (2 !== e.length) return void s.Log.e(o, "Received malformed SDP attribute: " + a);
                            const t = e[0],
                                r = e[1];
                            if ("msid" === t) {
                                if (void 0 !== n) return void s.Log.e(o, "Duplicate MSID: " + r);
                                n = r;
                            } else i.set(t, r);
                        } else if ("t" == e) {
                            if (d) return void s.Log.e(o, "Unexpected time line in media block");
                            t.time = a;
                        } else if ("o" == e) {
                            if (d) return void s.Log.e(o, "Unexpected origin line in media block");
                            t.origin = a;
                        }
                    }
                    if (!h()) return;
                    if ("" === t.time || "" === t.origin)
                        return void s.Log.e(o, "Didn't receive time or origin field from the server");
                    return t;
                })(t);
                if (!h) return { error: 3237093911 };
                const l = (function (e, t) {
                    const i = { origin: e.origin, time: e.time, generalAttributes: new Map(), media: [] },
                        s = "Safari" === r.getBrowser().name;
                    i.generalAttributes.set("general.clientSupportsIntraRefresh", s ? "0" : "1");
                    let n = !0;
                    for (const s of e.media) {
                        const e = new Map();
                        if (
                            "video" === s.mediaType &&
                            n &&
                            ((n = !1),
                            e.set("video.clientViewportWd", t.clientViewportWd.toString()),
                            e.set("video.clientViewportHt", t.clientViewportHt.toString()),
                            e.set("video.maxFPS", t.maxFps.toString()),
                            e.set("video.clientViewportWd", "1280"),
                            e.set("video.clientViewportHt", "720"),
                            e.set("video.encoderPreset", "6"),
                            e.set("video.rtpNackQueueLength", "1024"),
                            e.set("video.rtpNackMaxPacketCount", "25"),
                            e.set("video.maxFPS", "60"),
                            console.log({ attributes: e }),
                            r.IsiPhone())
                        ) {
                            const i = (t.clientViewportWd / t.clientViewportHt) * 100;
                            e.set("vqos.drc.stepDownResolutionAlignment", "16"),
                                e.set("vqos.drc.stepDownMinHeight", "480"),
                                e.set("vqos.drc.stepDownTargetAspectRatioX100", i.toFixed(0));
                        }
                        i.media.push({ mediaType: s.mediaType, msid: s.msid, attributes: e });
                    }
                    return i;
                })(h, e);
                return d(
                    null !==
                        (m =
                            null === (u = n.RagnarokSettings.ragnarokConfig.nvscClientConfigFields) || void 0 === u
                                ? void 0
                                : u.join("\n")) && void 0 !== m
                        ? m
                        : "",
                    l,
                    h,
                    "remoteconfig"
                )
                    ? d(i, l, h, "server")
                        ? d(n.RagnarokSettings.clientConfigOverride, l, h, "client")
                            ? (function (e, t) {
                                  let i = !0;
                                  const s = (e, t) => {
                                      const s = e.attributes.get(t);
                                      if (s) {
                                          const e = parseInt(s);
                                          if (!Number.isNaN(e)) return e;
                                      }
                                      return (i = !1), 0;
                                  };
                                  let n = !0;
                                  for (const i of t.media)
                                      "video" === i.mediaType &&
                                          n &&
                                          ((n = !1),
                                          (e.clientViewportWd = s(i, "video.clientViewportWd")),
                                          (e.clientViewportHt = s(i, "video.clientViewportHt")),
                                          (e.maxFps = s(i, "video.maxFPS")));
                                  return i;
                              })(e, l)
                                ? { config: e, answer: c(l, h) }
                                : { error: 3237093918 }
                            : { error: 3237093917 }
                        : { error: 3237093916 }
                    : { error: 3237093915 };
                var u, m;
            });
    },
    /*!***********************************************!*\
  !*** ./ragnarok-core/src/telemetryhandler.ts ***!
  \***********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./analytics */ 9);
        t.TelemetryHandler = class {
            constructor(e, t, i) {
                (this.exceptionCounts = new Map()),
                    (this.totalExceptionCount = 0),
                    (this.sessionId = e),
                    (this.subSessionId = t),
                    (this.eventEmitter = i);
            }
            emitExceptionEvent(e, t, i, n, r, o, a) {
                var d, h;
                if (this.totalExceptionCount >= 50) return;
                const l = null !== (d = this.exceptionCounts.get(t)) && void 0 !== d ? d : 0;
                if (l >= 10) return;
                this.totalExceptionCount++, this.exceptionCounts.set(t, l + 1);
                const c = s.getRagnarokExceptionEvent(
                    this.sessionId,
                    this.subSessionId,
                    t,
                    null !== (h = null == e ? void 0 : e.stack) && void 0 !== h ? h : "",
                    i,
                    n,
                    r,
                    o,
                    a
                );
                this.eventEmitter.emit("AnalyticsEvent", c);
            }
            emitDebugEvent(e, t, i, n, r) {
                const o = s.getRagnarokDebugEvent(this.sessionId, this.subSessionId, e, t, i, n, r);
                this.eventEmitter.emit("AnalyticsEvent", o);
            }
            emitMetricEvent(e, t, i, n, r, o) {
                const a = s.getClientMetricEvent(this.sessionId, this.subSessionId, e, t, i, n, r, o);
                this.eventEmitter.emit("AnalyticsEvent", a);
            }
            setSessionId(e) {
                (this.sessionId = e), this.clearExceptionCounts();
            }
            setSubSessionId(e) {
                this.subSessionId = e;
            }
            clearExceptionCounts() {
                this.exceptionCounts.clear(), (this.totalExceptionCount = 0);
            }
        };
    },
    /*!******************************************!*\
  !*** ./ragnarok-core/src/miccapturer.ts ***!
  \******************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./logger */ 6),
            n = i(/*! ./utils */ 5),
            r = i(/*! ./analytics */ 9),
            o = "miccapturer";
        t.MicCapturer = class {
            constructor() {
                (this.eventEmitter = null),
                    (this.micSupported = !1),
                    (this.currentState = 0),
                    (this.micEnabled = !1),
                    (this.peerConnection = null),
                    (this.micCaptureStream = null),
                    (this.micCaptureStarting = !1),
                    (this.micSupported = !1),
                    (this.paused = !1),
                    (this.videoElement = null),
                    (this.audioElement = null),
                    (this.sessionId = ""),
                    (this.subSessionId = ""),
                    (this.micSupported =
                        null != navigator.mediaDevices && (window.AudioContext || window.webkitAudioContext || !1));
            }
            getMicStateEnum(e) {
                let t = 2;
                return "granted" == e ? (t = 5) : "prompt" == e && (t = 1), t;
            }
            getCurrentMicStatus() {
                return window.navigator.permissions
                    ? window.navigator.permissions
                          .query({ name: "microphone" })
                          .then((e) => this.getMicStateEnum(e.state))
                          .catch((e) => 0)
                    : Promise.resolve(0);
            }
            getMicState() {
                this.micCaptureStarting ||
                3 == this.currentState ||
                2 == this.currentState ||
                6 == this.currentState ||
                7 == this.currentState
                    ? this.updateState(this.currentState)
                    : this.getCurrentMicStatus().then((e) => {
                          0 !== e && this.updateState(e);
                      });
            }
            isMicSupported() {
                return this.micSupported;
            }
            updateState(e) {
                (this.currentState = e),
                    this.eventEmitter && this.eventEmitter.emit("MicCapture", { state: this.currentState });
            }
            startMicCaptureOnDefaultDevice() {
                if (!this.micSupported)
                    return s.Log.e(o, "Mic is not supported on this device"), void this.updateState(6);
                if (((this.micEnabled = !0), null != this.micCaptureStream || this.micCaptureStarting)) return;
                (this.micCaptureStarting = !0), (this.paused = !1), (this.currentState = 1);
                let e = { sampleRate: 48e3 };
                "ChromeOS" == n.getPlatform().name && (e.googAutoGainControl2 = !1),
                    (navigator.mediaDevices.ondevicechange = () => {
                        null != this.micCaptureStream ||
                            this.micCaptureStarting ||
                            (s.Log.d(o, "Mic stream not started, attempting to start mic capture stream"),
                            this.startMicCaptureOnDefaultDevice());
                    }),
                    navigator.mediaDevices
                        .getUserMedia({ audio: e })
                        .then((e) => {
                            (s.Log.d(o, "Mic capture stream obtained"),
                            (this.currentState = 5),
                            (this.micCaptureStarting = !1),
                            (this.micCaptureStream = e),
                            (this.micCaptureStream.oninactive = () => {
                                s.Log.d(o, "Mic stream became inactive"), (this.micCaptureStream = null);
                            }),
                            this.paused)
                                ? (s.Log.d(o, "Mic stream has been paused, will stop capture"),
                                  (this.micCaptureStream = null),
                                  this.updateState(7))
                                : this.peerConnection
                                      .getSenders()[0]
                                      .replaceTrack(e.getTracks()[0])
                                      .then(() => {
                                          if (
                                              (s.Log.i(o, "Mic stream setup successful"),
                                              n.IsiOS() && 0 == this.videoElement.muted)
                                          ) {
                                              let e = null;
                                              this.audioElement.srcObject
                                                  ? (e = this.audioElement.play())
                                                  : this.videoElement.srcObject &&
                                                    ((e = this.videoElement.play()),
                                                    s.Log.i(o, "Replay video element")),
                                                  e
                                                      ? e
                                                            .then(() => {
                                                                s.Log.d(o, "WAR succeeded.");
                                                            })
                                                            .catch((e) => {
                                                                if (this.eventEmitter)
                                                                    try {
                                                                        this.eventEmitter.emit(
                                                                            "AnalyticsEvent",
                                                                            r.getRagnarokDebugEvent(
                                                                                this.sessionId,
                                                                                this.subSessionId,
                                                                                "WAR: Play Error",
                                                                                null == e ? void 0 : e.name,
                                                                                null == e ? void 0 : e.message
                                                                            )
                                                                        ),
                                                                            s.Log.e(
                                                                                o,
                                                                                "play error: " +
                                                                                    (null == e ? void 0 : e.name) +
                                                                                    ", " +
                                                                                    (null == e ? void 0 : e.message)
                                                                            );
                                                                    } catch (e) {}
                                                            })
                                                      : s.Log.e(o, "Play promise not returned");
                                          }
                                          this.updateState(3);
                                      })
                                      .catch((e) => {
                                          s.Log.e(o, "Replace track failed: error " + e),
                                              (this.micCaptureStream = null),
                                              this.updateState(7);
                                      });
                        })
                        .catch((e) => {
                            (this.micCaptureStarting = !1),
                                e instanceof DOMException && "NotAllowedError" === e.name
                                    ? (s.Log.e(o, "Mic permission was denied"), this.updateState(2))
                                    : e instanceof DOMException && "NotFoundError" === e.name
                                    ? (s.Log.e(o, "No suitable device found"), this.updateState(4))
                                    : (s.Log.e(o, "Error occured in starting mic stream"), this.updateState(7));
                        });
            }
            getSilenceMediaStream() {
                var e = window.AudioContext || window.webkitAudioContext || !1;
                if (e) {
                    let t = new e({ latencyHint: "playback", sampleRate: 48e3 })
                        .createMediaStreamDestination()
                        .stream.getAudioTracks()[0];
                    return (t.enabled = !0), new MediaStream([t]);
                }
                throw new Error("Mic stream is not supported");
            }
            initialize(e, t, i, n, r, a) {
                if (
                    ((this.peerConnection = e),
                    (this.eventEmitter = t),
                    (this.videoElement = i),
                    (this.audioElement = n),
                    (this.sessionId = r),
                    (this.subSessionId = a),
                    this.micSupported)
                ) {
                    let e = this.getSilenceMediaStream();
                    if (null == e)
                        return void s.Log.w(o, "Could not obtain silence stream, in-game chat will be disabled");
                    this.peerConnection.addStream(e), this.micEnabled && this.startMicCaptureOnDefaultDevice();
                } else
                    s.Log.w(o, "Mic capture not supported (insecure origin?), voice chat will be disabled for session");
            }
            stopMicRecording() {
                if (this.micSupported)
                    if (
                        ((this.micEnabled = !1),
                        (this.paused = !0),
                        (navigator.mediaDevices.ondevicechange = () => {}),
                        this.peerConnection)
                    ) {
                        s.Log.d(o, "Pausing mic capture");
                        let e = this.getSilenceMediaStream();
                        this.peerConnection
                            .getSenders()[0]
                            .replaceTrack(e.getTracks()[0])
                            .then(() => {
                                s.Log.d(o, "Mic capture paused successfully"), (this.currentState = 5);
                            })
                            .catch((e) => {
                                s.Log.e(o, "Mic pause failed: error " + e), (this.currentState = 7);
                            })
                            .finally(() => {
                                let e = this.micCaptureStream;
                                (this.micCaptureStream = null),
                                    e &&
                                        e.getTracks().forEach((e) => {
                                            e.stop();
                                        }),
                                    this.updateState(this.currentState);
                            });
                    } else
                        s.Log.e(o, "pc not yet initialized"),
                            (this.currentState = 0),
                            this.updateState(this.currentState);
                else this.updateState(6);
            }
            shutdown() {
                if (null != this.micCaptureStream) {
                    let e = this.micCaptureStream;
                    (this.micCaptureStream = null),
                        navigator.mediaDevices && (navigator.mediaDevices.ondevicechange = () => {}),
                        e.getTracks().forEach((e) => {
                            e.stop();
                        });
                }
                (this.micEnabled = !1), this.updateState(5);
            }
            enableMic() {
                this.micEnabled = !0;
            }
        };
    },
    /*!********************************************!*\
  !*** ./ragnarok-core/src/sleepdetector.ts ***!
  \********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./analytics */ 9),
            n = i(/*! ./logger */ 6),
            r = "sleepdetector";
        t.SleepDetector = class {
            constructor(e) {
                (this.sessionId = ""),
                    (this.subSessionId = ""),
                    (this.lastTimeSelfPing = 0),
                    (this.lastSubSessionIdSentOnSleep = ""),
                    (this.lastSessionErrorCode = 0),
                    (this.lastSessionErrorTs = 0),
                    (this.sleepDetectIntervalId = 0),
                    (this.lastSleepDetectionTs = 0),
                    (this.sleepTime = 0),
                    (this.eventEmitter = e);
            }
            startSleepDetectionTimer() {
                this.stopSleepDetectionTimer(),
                    (this.lastTimeSelfPing = new Date().getTime()),
                    (this.lastSessionErrorCode = 0),
                    (this.lastSessionErrorTs = 0),
                    (this.lastSleepDetectionTs = 0),
                    (this.sleepTime = 0),
                    n.Log.i(r, "startSleepDetectionTimer"),
                    (this.sleepDetectIntervalId = window.setInterval(() => this.periodicSelfPing(), 1e4));
            }
            stopSleepDetectionTimer() {
                n.Log.i(r, "stopSleepDetectionTimer"),
                    this.sleepDetectIntervalId &&
                        (window.clearInterval(this.sleepDetectIntervalId), (this.sleepDetectIntervalId = 0));
            }
            reportSleepEvent(e) {
                this.lastSubSessionIdSentOnSleep !== this.subSessionId &&
                    (this.eventEmitter.emit(
                        "AnalyticsEvent",
                        s.getRagnarokSleepEvent(
                            this.sessionId,
                            this.subSessionId,
                            String(this.lastSessionErrorCode),
                            this.sleepTime,
                            this.lastTimeSelfPing - this.lastSessionErrorTs,
                            e
                        )
                    ),
                    (this.lastSubSessionIdSentOnSleep = this.subSessionId)),
                    this.stopSleepDetectionTimer();
            }
            didSleep(e) {
                return e - this.lastTimeSelfPing - 1e4 > 1e4;
            }
            setSleepTime() {
                this.sleepTime = this.lastSleepDetectionTs - this.lastTimeSelfPing - 1e4;
            }
            periodicSelfPing() {
                try {
                    let e = new Date().getTime();
                    this.didSleep(e) && ((this.lastSleepDetectionTs = e), this.setSleepTime()),
                        this.didSleep(e) && 0 != this.lastSessionErrorCode
                            ? this.reportSleepEvent(
                                  this.lastTimeSelfPing - this.lastSessionErrorTs > 0 ? "epsp" : "esp"
                              )
                            : e - this.lastTimeSelfPing > 36e5 && this.stopSleepDetectionTimer(),
                        (this.lastTimeSelfPing = e);
                } catch (e) {}
            }
            wasSleepExit(e) {
                if (15868704 === e || 0 === e) return this.stopSleepDetectionTimer(), !1;
                let t = new Date().getTime();
                return (
                    (this.lastSessionErrorCode = e),
                    (this.lastSessionErrorTs = t),
                    n.Log.i(r, "sleep " + String(t - this.lastTimeSelfPing) + " " + this.lastSleepDetectionTs),
                    this.didSleep(t)
                        ? ((this.lastSleepDetectionTs = t), this.setSleepTime(), this.reportSleepEvent("pse"))
                        : 0 !== this.lastSleepDetectionTs &&
                          t - this.lastSleepDetectionTs < 2e4 &&
                          this.reportSleepEvent("pspe"),
                    0 !== this.lastSleepDetectionTs
                );
            }
            setSessionId(e) {
                this.sessionId = e;
            }
            setSubSessionId(e) {
                this.subSessionId = e;
            }
        };
    },
    /*!********************************************!*\
  !*** ./ragnarok-core/src/gamepadtester.ts ***!
  \********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./settings */ 8),
            n = i(/*! ./logger */ 6);
        t.GamepadTester = class {
            constructor() {
                (this.gamepadTesterElementId = "gamepadTester"),
                    (this.visible = !1),
                    (this.gamepads = []),
                    (this.unsupportedGamepads = []),
                    s.RagnarokSettings.gamepadTesterEnabled &&
                        (document.body.appendChild(this.initGamepadTesterElement()), this.start());
            }
            gamepadBitmapUpdateHandler(e) {
                for (let t = 0; t < 4; t++) 0 == (e & (1 << t)) && (this.gamepads[t] = null);
            }
            gamepadStateUpdateHandler(e, t, i, s, n, r, o, a) {
                this.gamepads[t] = { index: t, buttons: i, trigger: s, axes: n, name: a };
            }
            connectUnsupportedGamepad(e) {
                e.index <= 3 &&
                    (this.unsupportedGamepads[e.index] = {
                        index: e.index,
                        buttons: -1,
                        trigger: -1,
                        axes: [-1],
                        name: e.id,
                    });
            }
            disconnectUnsupportedGamepad(e) {
                e <= 3 && (this.unsupportedGamepads[e] = null);
            }
            initGamepadTesterElement() {
                let e = document.createElement("div");
                (e.id = this.gamepadTesterElementId),
                    (e.className = "genericdiv"),
                    (e.style.display = "block"),
                    (this.visible = !0);
                let t = document.createElement("p");
                (t.style.color = "white"),
                    (t.style.position = "relative"),
                    (t.innerHTML = "Connected GamePads:"),
                    e.appendChild(t);
                let i = document.createElement("style");
                return (
                    i.appendChild(document.createTextNode(".gamepad:nth-child(even) { float:left; clear: left; }")),
                    i.appendChild(document.createTextNode(".gamepad:nth-child(odd) { float:right; clear: right; }")),
                    document.head.appendChild(i),
                    e
                );
            }
            toggleGamepadTester(e) {
                let t = document.getElementById(this.gamepadTesterElementId);
                t
                    ? (t.remove(), (this.gamepads = []), (this.visible = !1))
                    : (e.insertAdjacentElement("afterend", this.initGamepadTesterElement()), this.start());
            }
            start() {
                let e,
                    t = document.getElementById(this.gamepadTesterElementId);
                if (null == t) return void n.Log.e("gamepadTester", "Cannot obtain id gamepadTester element from DOM");
                let i = 0.49 * window.innerWidth,
                    s = 0.4 * window.innerHeight,
                    r = 0.3 * i,
                    o = 0.7 * i,
                    a = 0.8 * s,
                    d = 0.8 * s,
                    h = 0.07 * i;
                const l = (e) => {
                        (e.style.position = "absolute"),
                            (e.style.width = "2%"),
                            (e.style.height = "3.5%"),
                            (e.style.backgroundColor = "red"),
                            (e.style.borderRadius = "50%"),
                            (e.style.transform = "translate(-50%, -50%)");
                    },
                    c = (e) => {
                        let i = ((e) =>
                            e ? { left: { X: e.axes[0], Y: e.axes[1] }, right: { X: e.axes[2], Y: e.axes[3] } } : null)(
                            e
                        );
                        if (null === t.querySelector(".gamepad" + e.index).querySelector(".leftStick")) {
                            let s = document.createElement("div");
                            (s.className = "gamepadJoystickPointer leftStick"),
                                l(s),
                                (s.style.left = r + i.left.X * h + "px"),
                                (s.style.top = a + i.left.Y * h + "px"),
                                t
                                    .querySelector(".gamepad" + e.index)
                                    .querySelector(".gamepadContainer")
                                    .appendChild(s);
                        } else {
                            let s = t.querySelector(".gamepad" + e.index).querySelector(".leftStick");
                            (s.style.opacity = "1"),
                                (s.style.left = r + h * i.left.X + "px"),
                                (s.style.top = a + i.left.Y * h + "px");
                        }
                        if (null === t.querySelector(".gamepad" + e.index).querySelector(".rightStick")) {
                            let s = document.createElement("div");
                            (s.className = "gamepadJoystickPointer rightStick"),
                                l(s),
                                (s.style.left = o + i.right.X * h + "px"),
                                (s.style.top = d + i.right.Y * h + "px"),
                                t
                                    .querySelector(".gamepad" + e.index)
                                    .querySelector(".gamepadContainer")
                                    .appendChild(s);
                        } else {
                            let s = t.querySelector(".gamepad" + e.index).querySelector(".rightStick");
                            (s.style.opacity = "1"),
                                (s.style.left = (o + i.right.X * h).toString() + "px"),
                                (s.style.top = (d + i.right.Y * h).toString() + "px");
                        }
                    },
                    u = (e, t, i) => {
                        var s = e.getContext("2d");
                        switch ((s.beginPath(), (s.fillStyle = i ? "green" : "grey"), t)) {
                            case 0:
                                s.moveTo(0.14 * e.width, 0.48 * e.height),
                                    s.lineTo(0.19 * e.width, 0.48 * e.height),
                                    s.lineTo(0.165 * e.width, 0.54 * e.height),
                                    s.lineTo(0.14 * e.width, 0.48 * e.height);
                                break;
                            case 1:
                                s.moveTo(0.14 * e.width, 0.66 * e.height),
                                    s.lineTo(0.19 * e.width, 0.66 * e.height),
                                    s.lineTo(0.165 * e.width, 0.61 * e.height),
                                    s.lineTo(0.14 * e.width, 0.66 * e.height);
                                break;
                            case 2:
                                s.moveTo(0.09 * e.width, 0.55 * e.height),
                                    s.lineTo(0.09 * e.width, 0.61 * e.height),
                                    s.lineTo(0.135 * e.width, 0.57 * e.height),
                                    s.lineTo(0.09 * e.width, 0.55 * e.height);
                                break;
                            case 3:
                                s.moveTo(0.24 * e.width, 0.55 * e.height),
                                    s.lineTo(0.24 * e.width, 0.61 * e.height),
                                    s.lineTo(0.195 * e.width, 0.57 * e.height),
                                    s.lineTo(0.24 * e.width, 0.55 * e.height);
                                break;
                            case 4:
                                s.arc(0.7 * e.width, 0.4 * e.height, 0.02 * e.width, 0, 2 * Math.PI);
                                break;
                            case 5:
                                s.arc(0.3 * e.width, 0.4 * e.height, 0.02 * e.width, 0, 2 * Math.PI);
                                break;
                            case 6:
                                s.arc(0.3 * e.width, 0.8 * e.height, 0.07 * e.width, 0, 2 * Math.PI);
                                break;
                            case 7:
                                s.arc(0.7 * e.width, 0.8 * e.height, 0.07 * e.width, 0, 2 * Math.PI);
                                break;
                            case 8:
                                s.rect(0.13 * e.width, 0.23 * e.height, 0.07 * e.width, 0.05 * e.height);
                                break;
                            case 9:
                                s.rect(0.815 * e.width, 0.23 * e.height, 0.07 * e.width, 0.05 * e.height);
                                break;
                            case 12:
                                s.arc(0.85 * e.width, 0.65 * e.height, 0.02 * e.width, 0, 2 * Math.PI);
                                break;
                            case 13:
                                s.arc(0.9 * e.width, 0.55 * e.height, 0.02 * e.width, 0, 2 * Math.PI);
                                break;
                            case 14:
                                s.arc(0.8 * e.width, 0.55 * e.height, 0.02 * e.width, 0, 2 * Math.PI);
                                break;
                            case 15:
                                s.arc(0.85 * e.width, 0.45 * e.height, 0.02 * e.width, 0, 2 * Math.PI);
                                break;
                            case -1:
                                s.rect(0.155 * e.width, 0.07 * e.height, 0.02 * e.width, 0.12 * e.height);
                                break;
                            case -2:
                                s.rect(0.84 * e.width, 0.07 * e.height, 0.02 * e.width, 0.12 * e.height);
                        }
                        s.closePath(), s.fill();
                    },
                    m = (e) => {
                        if (null === t.querySelector(".gamepad" + e.index)) {
                            let n = document.createElement("div");
                            n.className = "gamepad gamepad" + e.index;
                            let r = document.createElement("p");
                            (r.className = "active"), (r.style.margin = "0px");
                            let o = document.createElement("span");
                            (o.className = "gamepadPlayerNumber"),
                                (o.style.color = "white"),
                                (o.style.position = "relative"),
                                (o.innerHTML = `P${e.index + 1}|${e.name}`),
                                (o.style.fontSize = "1.5vw"),
                                r.appendChild(o),
                                n.appendChild(r);
                            let a = document.createElement("div");
                            (a.className = "gamepadContainer"),
                                (a.style.position = "relative"),
                                (a.style.width = i + 2 + "px"),
                                (a.style.height = s + "px");
                            let d = document.createElement("canvas");
                            (d.className = "canvas"),
                                (d.style.width = i + "px"),
                                (d.style.height = s + "px"),
                                (d.style.border = "1px solid white"),
                                a.appendChild(d),
                                n.appendChild(a),
                                t.appendChild(n);
                        }
                    },
                    g = () => {
                        if (this.visible) {
                            for (let e = 0; e < this.gamepads.length; e++) {
                                let i = this.gamepads[e];
                                if (i) {
                                    t.querySelector(".gamepad" + i.index) || m(i), c(i);
                                    let e = t.querySelector(".gamepad" + i.index).querySelector("canvas");
                                    for (let t = 0; t < 16; t++)
                                        0 != (i.buttons & (1 << t)) ? u(e, t, !0) : u(e, t, !1);
                                    0 != (255 & i.trigger) ? u(e, -1, !0) : u(e, -1, !1),
                                        0 != (65280 & i.trigger) ? u(e, -2, !0) : u(e, -2, !1);
                                } else if (this.unsupportedGamepads[e]) {
                                    if (!t.querySelector(".gamepad" + e)) {
                                        m(this.unsupportedGamepads[e]);
                                        let i = t.querySelector(".gamepad" + e).querySelector("canvas"),
                                            s = i.getContext("2d");
                                        (s.font = "20px Arial"),
                                            (s.fillStyle = "white"),
                                            (s.textAlign = "center"),
                                            s.fillText("Unsupported Gamepad", i.width / 2, i.height / 2);
                                    }
                                } else {
                                    let i = t.querySelector(".gamepad" + e);
                                    i && t.removeChild(i);
                                }
                            }
                            e = window.requestAnimationFrame(g);
                        } else window.cancelAnimationFrame(e);
                    };
                g();
            }
            finalizeGamepadData(e) {}
            virtualGamepadUpdateHandler(e, t, i, s, n) {}
        };
    },
    /*!*********************************************!*\
  !*** ./ragnarok-core/src/gamepadhandler.ts ***!
  \*********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./logger */ 6),
            n = i(/*! ./utils */ 5),
            r = i(/*! ./virtualgamepad */ 22),
            o = i(/*! ./settings */ 8),
            a = i(/*! ./latencyindicator */ 10),
            d = "gamepadhandler";
        class h {
            constructor(e) {
                (this.buttons = e.getButtonMapping(e.device)),
                    (this.axes = e.getAxesMapping(e.device)),
                    (this.triggers = e.getTriggerMapping(e.device)),
                    (this.timestamp = performance.now());
            }
            controllerAxesDiffer(e, t) {
                for (let i = 0; i < e.length; i++) if (Math.abs(e[i] - t[i]) > 0.01) return !0;
                return !1;
            }
            equalTo(e) {
                return (
                    this.buttons == e.buttons &&
                    this.triggers == e.triggers &&
                    !this.controllerAxesDiffer(this.axes, e.axes)
                );
            }
        }
        t.GamepadHandler = class {
            constructor(e) {
                (this.gamepadBitmap = 0),
                    (this.gamepadTimer = 0),
                    (this.isUserInputEnable = !1),
                    (this.windowAddEventListener =
                        e && e.windowAddEventListener
                            ? e.windowAddEventListener.bind(window)
                            : window.addEventListener.bind(window)),
                    (this.windowRemoveEventListener =
                        e && e.windowRemoveEventListener
                            ? e.windowRemoveEventListener.bind(window)
                            : window.removeEventListener.bind(window)),
                    (this.gamepadConnectedFunc = this.gamepadConnected.bind(this)),
                    (this.gamepadDisconnectedFunc = this.gamepadDisconnected.bind(this)),
                    (this.gamepadTickFunc = this.gamepadTick.bind(this)),
                    (this.gamepadDetails = []),
                    (this.gamepadPollInterval = 100),
                    (this.gamepadSnapshotPrevious = []),
                    (this.gamepadTimestamps = []),
                    (this.gamepadDataHandlers = []),
                    (this.isSafari = n.IsSafari()),
                    (this.isSafari14 = n.isSafariVersionAtLeast(n.getBrowser(), 14, 0)),
                    (this.inputEnabledStateBeforeUserIdlePendingOverlay = !0);
                const t = n.getPlatform().name;
                (this.isChromeOs = "ChromeOS" == t),
                    (this.virtualGamepad = {
                        v_index: 0,
                        v_enabled: !1,
                        v_connected: !1,
                        v_buttons: 0,
                        v_trigger: 0,
                        v_axes: [],
                        v_updated: !1,
                    }),
                    (this.virtualGamepadHandler = new r.VirtualGamepadHandler(this.virtualGamepad)),
                    s.Log.d(d, "gamepad handler initialized");
            }
            connectVirtualGamepad() {
                return (
                    !this.virtualGamepad.v_connected &&
                    (s.Log.i(d, "Adding virtual gamepad " + this.virtualGamepad.v_index),
                    (this.virtualGamepad.v_connected = !0),
                    this.addGamepadCommon(this.virtualGamepad.v_index, !1),
                    !0)
                );
            }
            disconnectVirtualGamepad() {
                return (
                    !!this.virtualGamepad.v_connected &&
                    (s.Log.i(d, "Removing virtual gamepad " + this.virtualGamepad.v_index),
                    (this.virtualGamepad.v_connected = !1),
                    this.removeGamepadCommon(this.virtualGamepad.v_index))
                );
            }
            getGamepadBitMask(e) {
                return 1 << e;
            }
            getMsBitMask(e) {
                return 1 << (e + 8);
            }
            addGamepadCommon(e, t) {
                0 == this.gamepadBitmap &&
                    ((this.gamepadPollInterval = o.RagnarokSettings.gamepadPollInterval), this.resetGamepadTimer()),
                    (this.gamepadBitmap |= this.getGamepadBitMask(e));
                const i = this.getMsBitMask(e);
                t ? (this.gamepadBitmap |= i) : (this.gamepadBitmap &= ~i);
            }
            removeGamepadCommon(e) {
                if (e === this.virtualGamepad.v_index) {
                    let t = !!this.gamepadDetails[e];
                    if (this.virtualGamepad.v_connected || t) return !1;
                }
                return (
                    (this.gamepadBitmap &= ~this.getGamepadBitMask(e)),
                    (this.gamepadBitmap &= ~this.getMsBitMask(e)),
                    0 == this.gamepadBitmap && ((this.gamepadPollInterval = 100), this.resetGamepadTimer()),
                    !0
                );
            }
            removeGamepadDataHandler(e) {
                const t = this.gamepadDataHandlers.indexOf(e);
                t > -1 && this.gamepadDataHandlers.splice(t, 1);
            }
            addGamepadDataHandler(e) {
                this.gamepadDataHandlers.push(e);
            }
            addTelemetry(e) {
                this.telemetry = e;
            }
            getStandardGamepadDetail(e) {
                return {
                    device: e,
                    standard: !0,
                    getButtonMapping: this.getStandardButtons,
                    getTriggerMapping: this.getStandardTrigger,
                    getAxesMapping: this.getStandardAxes,
                };
            }
            getShieldGamepadDetail(e) {
                return {
                    device: e,
                    standard: !0,
                    getButtonMapping: this.getStandardButtons,
                    getTriggerMapping: this.getShieldTrigger,
                    getAxesMapping: this.getStandardAxes,
                };
            }
            getSafari13GamepadDetail(e) {
                return {
                    device: e,
                    standard: !0,
                    getButtonMapping: this.getSafari13Buttons,
                    getTriggerMapping: this.getStandardTrigger,
                    getAxesMapping: this.getSafari13Axes,
                };
            }
            getDualSenseGamepadDetail(e) {
                return {
                    device: e,
                    standard: !1,
                    getButtonMapping: this.getDualSenseButtons.bind(this),
                    getTriggerMapping: this.getAxesTrigger.bind(this, 3, 4),
                    getAxesMapping: this.get0125Axes,
                };
            }
            getXboxSeriesGamepadDetail(e) {
                return {
                    device: e,
                    standard: !1,
                    getButtonMapping: this.getXboxSeriesButtons.bind(this),
                    getTriggerMapping: this.getAxesTrigger.bind(this, 3, 4),
                    getAxesMapping: this.get0125Axes,
                };
            }
            getXboxSeriesWiredGamepadDetail(e) {
                return {
                    device: e,
                    standard: !1,
                    getButtonMapping: this.getXboxSeriesWiredButtons.bind(this),
                    getTriggerMapping: this.getAxesTrigger.bind(this, 2, 5),
                    getAxesMapping: this.get0134Axes,
                };
            }
            getGamepadDetail(e) {
                return this.isSafari14
                    ? this.getStandardGamepadDetail(e)
                    : this.isSafari
                    ? this.getSafari13GamepadDetail(e)
                    : this.isShieldGamepad(e)
                    ? this.getShieldGamepadDetail(e)
                    : this.isStandardGamepad(e)
                    ? this.getStandardGamepadDetail(e)
                    : this.isDualSenseGamepad(e)
                    ? this.getDualSenseGamepadDetail(e)
                    : this.isXboxSeries(e)
                    ? this.getXboxSeriesGamepadDetail(e)
                    : this.isXboxSeriesWired(e)
                    ? this.getXboxSeriesWiredGamepadDetail(e)
                    : (s.Log.e(d, "Unknown gamepad type, ignoring" + e), null);
            }
            gamepadBitmapUpdateHandler() {
                for (const e of this.gamepadDataHandlers) e.gamepadBitmapUpdateHandler(this.gamepadBitmap);
            }
            gamepadConnected(e) {
                this.addGamepad(e.gamepad, e.gamepad.index) && this.gamepadBitmapUpdateHandler();
            }
            gamepadDisconnected(e) {
                this.deleteGamepad(e.gamepad.index) && this.gamepadBitmapUpdateHandler();
            }
            resetGamepadTimer() {
                0 != this.gamepadTimer && clearInterval(this.gamepadTimer),
                    this.isUserInputEnable
                        ? (this.gamepadTimer = window.setInterval(this.gamepadTickFunc, this.gamepadPollInterval))
                        : (this.gamepadTimer = 0);
            }
            disconnectAllGamepads() {
                this.gamepadBitmap &&
                    ((this.gamepadBitmap = 0),
                    (this.virtualGamepad.v_connected = !1),
                    this.gamepadBitmapUpdateHandler(),
                    (this.gamepadPollInterval = 100),
                    this.resetGamepadTimer());
            }
            isSuitableGamepad(e) {
                return (
                    !("standard" != e.mapping && !this.isSafari) ||
                    !!this.isDualSenseGamepad(e) ||
                    !(!this.isXboxSeries(e) && !this.isXboxSeriesWired(e))
                );
            }
            isStandardGamepad(e) {
                return "standard" == e.mapping;
            }
            isShieldGamepad(e) {
                return "standard" == e.mapping && e.id.includes("Vendor: 0955");
            }
            isDualSenseGamepad(e) {
                return "standard" != e.mapping && e.id.includes("Vendor: 054c") && e.id.includes("Product: 0ce6");
            }
            isXboxSeries(e) {
                return "standard" != e.mapping && e.id.includes("Vendor: 045e") && e.id.includes("Product: 0b13");
            }
            isXboxSeriesWired(e) {
                return (
                    this.isChromeOs &&
                    "standard" != e.mapping &&
                    e.id.includes("Vendor: 045e") &&
                    e.id.includes("Product: 0b12")
                );
            }
            isXinputGamepad(e) {
                return e.id.includes("Xbox") || e.id.includes("xinput");
            }
            addGamepad(e, t) {
                if (this.isSuitableGamepad(e)) {
                    const i = this.getGamepadDetail(e);
                    if (i) {
                        const n = this.gamepadBitmap,
                            r = !!this.gamepadDetails[t];
                        (this.gamepadDetails[t] = i),
                            void 0 === this.gamepadTimestamps[t] && (this.gamepadTimestamps[t] = 0);
                        const o = this.isXinputGamepad(e);
                        this.addGamepadCommon(t, o);
                        const a = n !== this.gamepadBitmap;
                        if (a) {
                            const e = r ? "Changing" : "Adding";
                            s.Log.i(d, `${e} gamepad ${t} (Xinput: ${o}) with id ${i.device.id}`);
                        }
                        return a;
                    }
                    for (const t of this.gamepadDataHandlers) t.connectUnsupportedGamepad(e);
                    return this.deleteGamepad(t);
                }
                for (const t of this.gamepadDataHandlers) t.connectUnsupportedGamepad(e);
                return this.deleteGamepad(t);
            }
            deleteGamepad(e) {
                var t;
                let i = this.gamepadDetails[e];
                if (i) {
                    s.Log.i(d, `Removing gamepad ${e} with id ${i.device.id}`);
                    const n = this.gamepadSnapshotPrevious[e];
                    if (n) {
                        const e = performance.now() - n.timestamp;
                        e >= 3e3 &&
                            n.axes.some((e) => Math.abs(e) > 0.5) &&
                            (s.Log.w(d, `Gamepad had stuck axes for ${e}ms: ${n.axes.join()}`),
                            null === (t = this.telemetry) ||
                                void 0 === t ||
                                t.emitDebugEvent("GamepadStuck", i.device.id, e.toString(), n.axes.join()));
                    }
                    return (
                        delete this.gamepadDetails[e],
                        delete this.gamepadTimestamps[e],
                        delete this.gamepadSnapshotPrevious[e],
                        this.removeGamepadCommon(e)
                    );
                }
                return !1;
            }
            scangamepads() {
                let e = !1;
                this.virtualGamepad.v_enabled && !this.virtualGamepad.v_connected
                    ? (e = this.connectVirtualGamepad())
                    : !this.virtualGamepad.v_enabled &&
                      this.virtualGamepad.v_connected &&
                      (e = this.disconnectVirtualGamepad());
                let t = navigator.getGamepads();
                for (var i = 0; i < t.length; i++) {
                    let s = t[i];
                    s ? this.addGamepad(s, s.index) && (e = !0) : this.deleteGamepad(i) && (e = !0);
                }
                e && this.gamepadBitmapUpdateHandler();
            }
            getStandardButtons(e) {
                let t = e.buttons;
                return (
                    (t[0].value ? 4096 : 0) |
                    (t[1].value ? 8192 : 0) |
                    (t[2].value ? 16384 : 0) |
                    (t[3].value ? 32768 : 0) |
                    (t[4].value ? 256 : 0) |
                    (t[5].value ? 512 : 0) |
                    (t[8] && t[8].value ? 32 : 0) |
                    (t[9] && t[9].value ? 16 : 0) |
                    (t[10] && t[10].value ? 64 : 0) |
                    (t[11] && t[11].value ? 128 : 0) |
                    (t[12] && t[12].value ? 1 : 0) |
                    (t[13] && t[13].value ? 2 : 0) |
                    (t[14] && t[14].value ? 4 : 0) |
                    (t[15] && t[15].value ? 8 : 0) |
                    0
                );
            }
            getStandardTrigger(e) {
                let t = Math.round(255 * e.buttons[6].value);
                return ((255 & Math.round(255 * e.buttons[7].value)) << 8) | (255 & t);
            }
            getShieldTrigger(e) {
                let t = Math.round(255 * e.buttons[7].value);
                return ((255 & Math.round(255 * e.buttons[6].value)) << 8) | (255 & t);
            }
            getAxesTrigger(e, t, i) {
                let s = Math.round(127.5 * (i.axes[e] + 1));
                return ((255 & Math.round(127.5 * (i.axes[t] + 1))) << 8) | (255 & s);
            }
            getStandardAxes(e) {
                return e.axes;
            }
            getSafari13Axes(e) {
                return [e.axes[0], -e.axes[1], e.axes[2], -e.axes[3]];
            }
            get0125Axes(e) {
                return [e.axes[0], e.axes[1], e.axes[2], e.axes[5]];
            }
            get0134Axes(e) {
                return [e.axes[0], e.axes[1], e.axes[3], e.axes[4]];
            }
            getSafari13Buttons(e) {
                let t = e.buttons,
                    i = e.axes;
                return (
                    (t[0].value ? 4096 : 0) |
                    (t[1].value ? 8192 : 0) |
                    (t[2].value ? 16384 : 0) |
                    (t[3].value ? 32768 : 0) |
                    (t[4].value ? 256 : 0) |
                    (t[5].value ? 512 : 0) |
                    (i[5] > 0 ? 1 : 0) |
                    (i[5] < 0 ? 2 : 0) |
                    (i[4] < 0 ? 4 : 0) |
                    (i[4] > 0 ? 8 : 0) |
                    0
                );
            }
            getDpadFromAxis(e) {
                switch (Number.parseFloat(e.toFixed(5))) {
                    case 0.71429:
                        return 4;
                    case -0.42857:
                        return 8;
                    case -1:
                        return 1;
                    case 0.14286:
                        return 2;
                    case 1.28571:
                        return 0;
                    case 1:
                        return 5;
                    case -0.71429:
                        return 9;
                    case 0.42857:
                        return 6;
                    case -0.14286:
                        return 10;
                    default:
                        return 0;
                }
            }
            getDpadFromTwoAxes(e, t) {
                return (t < 0 ? 1 : 0) | (t > 0 ? 2 : 0) | (e < 0 ? 4 : 0) | (e > 0 ? 8 : 0) | 0;
            }
            getDualSenseButtons(e) {
                let t = e.buttons;
                const i = this.isChromeOs
                    ? this.getDpadFromTwoAxes(e.axes[6], e.axes[7])
                    : this.getDpadFromAxis(e.axes[9]);
                return (
                    (t[1].value ? 4096 : 0) |
                    (t[2].value ? 8192 : 0) |
                    (t[0].value ? 16384 : 0) |
                    (t[3].value ? 32768 : 0) |
                    (t[4].value ? 256 : 0) |
                    (t[5].value ? 512 : 0) |
                    (t[8].value ? 32 : 0) |
                    (t[9].value ? 16 : 0) |
                    (t[10].value ? 64 : 0) |
                    (t[11].value ? 128 : 0) |
                    i
                );
            }
            getXboxSeriesButtons(e) {
                let t = e.buttons;
                const i = this.getDpadFromAxis(e.axes[9]);
                return (
                    (t[0].value ? 4096 : 0) |
                    (t[1].value ? 8192 : 0) |
                    (t[3].value ? 16384 : 0) |
                    (t[4].value ? 32768 : 0) |
                    (t[6].value ? 256 : 0) |
                    (t[7].value ? 512 : 0) |
                    (t[10].value ? 32 : 0) |
                    (t[11].value ? 16 : 0) |
                    (t[13].value ? 64 : 0) |
                    (t[14].value ? 128 : 0) |
                    i
                );
            }
            getXboxSeriesWiredButtons(e) {
                let t = e.buttons;
                const i = this.getDpadFromTwoAxes(e.axes[6], e.axes[7]);
                return (
                    (t[0].value ? 4096 : 0) |
                    (t[1].value ? 8192 : 0) |
                    (t[2].value ? 16384 : 0) |
                    (t[3].value ? 32768 : 0) |
                    (t[4].value ? 256 : 0) |
                    (t[5].value ? 512 : 0) |
                    (t[6].value ? 32 : 0) |
                    (t[7].value ? 16 : 0) |
                    (t[9].value ? 64 : 0) |
                    (t[10].value ? 128 : 0) |
                    i
                );
            }
            postRender() {
                o.RagnarokSettings.gamepadEnabled && o.RagnarokSettings.gamepadRaf && this.gamepadTick();
            }
            virtualGamepadUpdateHandler() {
                for (const e of this.gamepadDataHandlers)
                    e.virtualGamepadUpdateHandler(
                        this.virtualGamepad.v_buttons,
                        this.virtualGamepad.v_trigger,
                        this.virtualGamepad.v_index,
                        this.virtualGamepad.v_axes,
                        this.gamepadBitmap
                    );
            }
            gamepadTick() {
                this.scangamepads();
                let e = 0;
                for (let t of this.gamepadDetails) {
                    if (!t) continue;
                    let i = t.device;
                    if (!this.isSuitableGamepad(i)) continue;
                    if ("Tizen" != n.getPlatform().name) {
                        if (t.device.timestamp <= this.gamepadTimestamps[i.index]) continue;
                        this.gamepadTimestamps[i.index] = t.device.timestamp;
                    }
                    const s = this.gamepadSnapshotPrevious[i.index],
                        r = new h(t);
                    if (s && s.equalTo(r)) continue;
                    this.gamepadSnapshotPrevious[i.index] = r;
                    let o = t.getTriggerMapping(i),
                        a = t.getButtonMapping(i),
                        d = t.getAxesMapping(i);
                    for (const s of this.gamepadDataHandlers)
                        s.gamepadStateUpdateHandler(e, i.index, a, o, d, t.device.timestamp, this.gamepadBitmap, i.id);
                    e++;
                }
                if (e) {
                    a.LatencyIndicator.getInstance().toggleIndicator();
                    for (const t of this.gamepadDataHandlers) t.finalizeGamepadData(e);
                }
                this.virtualGamepad.v_connected &&
                    this.virtualGamepad.v_updated &&
                    (this.virtualGamepadUpdateHandler(), (this.virtualGamepad.v_updated = !1));
            }
            enableUserInput() {
                (this.isUserInputEnable = !0),
                    o.RagnarokSettings.gamepadEnabled &&
                        (this.windowAddEventListener("gamepadconnected", this.gamepadConnectedFunc),
                        this.windowAddEventListener("gamepaddisconnected", this.gamepadDisconnectedFunc),
                        this.resetGamepadTimer());
            }
            disableUserInput() {
                (this.isUserInputEnable = !1),
                    o.RagnarokSettings.gamepadEnabled &&
                        (this.windowRemoveEventListener("gamepadconnected", this.gamepadConnectedFunc),
                        this.windowRemoveEventListener("gamepaddisconnected", this.gamepadDisconnectedFunc),
                        this.resetGamepadTimer());
            }
            getVirtualGamepadHandler() {
                return this.virtualGamepadHandler;
            }
        };
    },
    /*!********************************************!*\
  !*** ./ragnarok-core/src/audiorecorder.ts ***!
  \********************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        const s = i(/*! ./logger */ 6),
            n = "audiorecorder";
        t.AudioRecorder = class {
            constructor() {
                (this.isRecording = !1),
                    (this.recordedBlobs = []),
                    (this.recordedBlobsArray = []),
                    (this.timerID = 0),
                    (this.dumpCount = 0);
            }
            createRecorder() {
                if ((s.Log.i(n, "Creating MediaRecorder"), this.audioStream)) {
                    try {
                        this.mediaRecorder = new MediaRecorder(this.audioStream);
                    } catch (e) {
                        return void s.Log.e(n, "MediaRecorder creation failed: " + e);
                    }
                    this.mediaRecorder &&
                        ((this.mediaRecorder.onstart = () => {}),
                        (this.mediaRecorder.onstop = () => {
                            s.Log.i(n, "Stopping MediaRecorder");
                        }),
                        (this.mediaRecorder.ondataavailable = (e) => {
                            e.data &&
                                e.data.size > 0 &&
                                (this.recordedBlobs.push(e.data),
                                this.recordedBlobsArray.push(this.recordedBlobs),
                                ++this.dumpCount,
                                (this.recordedBlobs = []));
                        }),
                        s.Log.i(n, "Created MediaRecorder: " + this.mediaRecorder)),
                        (this.isRecording = !1);
                } else s.Log.e(n, "No media stream, MediaRecorder creation failed");
            }
            startRecord(e) {
                let t;
                if (1 == e) t = 18e5;
                else {
                    if (2 != e) return;
                    t = 2e3;
                }
                this.mediaRecorder &&
                    !this.isRecording &&
                    (this.mediaRecorder.start(),
                    (this.isRecording = !0),
                    (this.timerID = window.setTimeout(() => {
                        s.Log.i(n, "Recording time exceeded, stopping media recorder"), this.destroyRecorder();
                    }, t)),
                    s.Log.i(n, "Started MediaRecorder"));
            }
            destroyRecorder() {
                var e;
                null === (e = this.mediaRecorder) || void 0 === e || e.stop(),
                    (this.mediaRecorder = void 0),
                    0 !== this.timerID && (window.clearTimeout(this.timerID), (this.timerID = 0));
            }
            downloadAudio() {
                for (let e = 0; e < this.dumpCount; ++e) {
                    const t = new Blob(this.recordedBlobsArray[e], { type: "audio/webm" }),
                        i = window.URL.createObjectURL(t),
                        s = document.createElement("a");
                    (s.style.display = "none"),
                        (s.href = i),
                        (s.download = "audioCapture_" + e + ".wmv"),
                        document.body.appendChild(s),
                        s.click(),
                        URL.revokeObjectURL(i),
                        document.body.removeChild(s);
                }
                (this.dumpCount = 0), (this.recordedBlobsArray = []), s.Log.i(n, "Download finished");
            }
        };
    },
    /*!*****************************************!*\
  !*** ./ragnarok-core/src/rerrorcode.ts ***!
  \*****************************************/
    /*! no static exports found */
    /*! all exports used */
    /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
    },
]);
//# sourceMappingURL=kit-player.js.map
