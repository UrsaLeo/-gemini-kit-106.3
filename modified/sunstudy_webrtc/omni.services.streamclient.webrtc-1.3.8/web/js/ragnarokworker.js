!(function (e) {
    var t = {};
    function s(n) {
        if (t[n]) return t[n].exports;
        var a = (t[n] = { i: n, l: !1, exports: {} });
        return e[n].call(a.exports, a, a.exports, s), (a.l = !0), a.exports;
    }
    (s.m = e),
        (s.c = t),
        (s.d = function (e, t, n) {
            s.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
        }),
        (s.r = function (e) {
            "undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
                Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (s.t = function (e, t) {
            if ((1 & t && (e = s(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (
                (s.r(n),
                Object.defineProperty(n, "default", { enumerable: !0, value: e }),
                2 & t && "string" != typeof e)
            )
                for (var a in e)
                    s.d(
                        n,
                        a,
                        function (t) {
                            return e[t];
                        }.bind(null, a)
                    );
            return n;
        }),
        (s.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return s.d(t, "a", t), t;
        }),
        (s.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (s.p = ""),
        s((s.s = 50));
})({
    50:
        /*!*********************************************!*\
  !*** ./ragnarok-core/src/ragnarokworker.ts ***!
  \*********************************************/
        /*! no static exports found */
        /*! all exports used */
        /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, s) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 });
            const n = s(/*! ./webrtcbinarystats */ 51),
                a = self;
            let r = [],
                i = [],
                o = new n.WebrtcBinaryStats(),
                l = "",
                c = "",
                u = !1,
                f = null,
                d = null,
                p = !1,
                g = [],
                h = 0,
                S = 0,
                b = [],
                y = [],
                m = new Date().getTime(),
                v = [],
                w = !1,
                k = 0;
            function M(e) {
                let t = { log: e };
                a.postMessage(t);
            }
            function U(e) {
                let t = { exception: e };
                a.postMessage(t);
            }
            function T() {
                (r = []), (i = []), o.resetLists(), (b = []), (y = []);
            }
            function C(e, t, s, n, a, r) {
                for (let n = 0; n < 4; n++) e.setUint8(t + n, s.charCodeAt(n));
                e.setUint8(t + 4, n), e.setUint16(t + 5, a, !0), e.setUint16(t + 7, r, !0);
            }
            function O() {
                if ((r.length || i.length) && (!u || (u && f)))
                    try {
                        let e = 13 * r.length,
                            t = 72 * i.length,
                            s = 12 * b.length,
                            n = 10 * y.length,
                            a = 9;
                        u && f && (a += f.length),
                            e && (a += 9 + e),
                            t && (a += 9 + t),
                            s && (a += 9 + s),
                            n && (a += 9 + n),
                            (a += o.size());
                        let d = new ArrayBuffer(a),
                            p = new DataView(d),
                            g = 0;
                        u && f && (new Uint8Array(d).set(f), (g += f.length)),
                            C(p, g, "BPRF", 1, 0, 0),
                            (g += 9),
                            e &&
                                (C(p, g, "PERF", 2, r.length, 13),
                                (g += 9),
                                (function (e, t) {
                                    for (let s = 0; s < r.length; s++)
                                        e.setFloat64(t, r[s].RAFTS, !0),
                                            e.setUint16(t + 8, Math.min(1e3 * r[s].DCSend, 65535), !0),
                                            e.setUint16(t + 10, Math.min(1e3 * r[s].GetStats, 65535), !0),
                                            e.setUint8(t + 12, r[s].FrameInfo),
                                            (t += 13);
                                })(p, g),
                                (g += e)),
                            t &&
                                (C(p, g, "EVNT", 1, i.length, 72),
                                (g += 9),
                                (function (e, t) {
                                    for (let s = 0; s < i.length; s++) {
                                        e.setFloat64(t, i[s].TS, !0), (t += 8);
                                        let n = i[s].eventtype,
                                            a = 0;
                                        for (; a < n.length && a < 63; a++) e.setUint8(t + a, n.charCodeAt(a));
                                        e.setUint8(t + a, 0), (t += 64);
                                    }
                                })(p, g),
                                (g += t)),
                            s &&
                                (C(p, g, "SQEV", 1, b.length, 12),
                                (g += 9),
                                (function (e, t) {
                                    for (let s = 0; s < b.length; s++)
                                        e.setUint8(t, b[s].qualityScore),
                                            e.setUint8(t + 1, b[s].bandwidthScore),
                                            e.setUint8(t + 2, b[s].latencyScore),
                                            e.setUint8(t + 3, b[s].networkLossScore),
                                            e.setFloat64(t + 4, b[s].timestamp, !0),
                                            (t += 12);
                                })(p, g),
                                (g += s)),
                            n &&
                                (C(p, g, "MTBD", 1, y.length, 10),
                                (g += 9),
                                (function (e, t) {
                                    for (let s = 0; s < y.length; s++)
                                        e.setFloat64(t, y[s].timestamp, !0),
                                            e.setUint16(t + 8, Math.min(1e3 * y[s].duration, 65535), !0),
                                            (t += 10);
                                })(p, g),
                                (g += n));
                        let h = new Uint8Array(d);
                        o.write(h, g),
                            u && f
                                ? R({ stats: d })
                                : (function (e) {
                                      let t = !1,
                                          s = new XMLHttpRequest();
                                      (s.onreadystatechange = () => {
                                          4 == s.readyState &&
                                              (200 == s.status ||
                                                  M(
                                                      t
                                                          ? "Perf/stats upload timed out"
                                                          : "Perf/stats upload failed. status code: " + s.statusText
                                                  ));
                                      }),
                                          (s.ontimeout = () => {
                                              t = !0;
                                          }),
                                          s.open("POST", c),
                                          (s.timeout = 5e3),
                                          (c.includes(".com") || c.includes(".net")) &&
                                              s.setRequestHeader("x-nv-sessionid", l),
                                          s.send(e);
                                  })(d);
                    } catch (e) {
                        U("Exception in perf/stats upload. Error : " + e.message + " stack: " + e.stack);
                    }
                T();
            }
            function P(e) {
                void 0 !== e.ackid &&
                    w &&
                    (function (e) {
                        void 0 !== e.ackid && (M("add in ack cache: " + e.ackid), v.push(e));
                    })(e),
                    d && (e.stats ? d.send(e.stats) : d.send(JSON.stringify(e)));
            }
            function z(e) {
                let t = { wsMessage: e };
                a.postMessage(t);
            }
            function A() {
                try {
                    let e;
                    c.includes("wss") && (e = "x-nv-sessionid." + l);
                    let t = new WebSocket(c, e);
                    (t.onopen = (e) => {
                        M("WebSocket connection established."), (m = new Date().getTime());
                        if ((a.postMessage({ wsOpen: !0 }), t === d)) {
                            for (const e of v) t.send(JSON.stringify(e));
                            for (const e of g) P(e);
                            g = [];
                        }
                    }),
                        (t.onclose = (e) => {
                            M("WebSocket connection closed");
                            let s = { wsClose: { error: p, code: e.code, reason: e.reason, wasClean: e.wasClean } };
                            a.postMessage(s), t === d && (d = null), (p = !1);
                        }),
                        (t.onerror = (e) => {
                            M("WebSocket error"), (p = !0);
                        }),
                        (t.onmessage = (e) => {
                            m = new Date().getTime();
                            let t = JSON.parse(e.data);
                            w && x(),
                                void 0 === t.ackid || w || ((w = !0), M("MonitorHeartBeats started"), x()),
                                t.hb ||
                                    (w
                                        ? (void 0 !== t.ack &&
                                              (function (e) {
                                                  for (let t = v.length - 1; t >= 0; t--)
                                                      v[t].ackid <= e &&
                                                          (M("remove from ack cache: " + v[t].ackid), v.splice(t, 1));
                                              })(t.ack),
                                          void 0 !== t.ackid
                                              ? (k < t.ackid && (z(t), (k = t.ackid)),
                                                (function () {
                                                    if (d) {
                                                        let e = { ack: k },
                                                            t = JSON.stringify(e);
                                                        M("sendAckToServer: " + t), d.send(t);
                                                    }
                                                })())
                                              : z(t))
                                        : z(t));
                        }),
                        (d = t);
                } catch (e) {
                    (d = null), U("WebSocket creation exception: " + e.message);
                }
            }
            function R(e) {
                w || d || A(), d && d.readyState === WebSocket.OPEN ? P(e) : g.push(e);
            }
            function W() {
                0 !== S && (self.clearTimeout(S), (S = 0));
            }
            function x() {
                W(),
                    (S = self.setTimeout(
                        () => (M("Missed heartbeat " + (null == d ? void 0 : d.readyState)), d || A(), void x()),
                        3e3
                    ));
            }
            a.onmessage = function (e) {
                try {
                    let t = e.data;
                    if (t.initMessage) (l = t.initMessage.sessionId), M("Worker initialized");
                    else if (t.perf) r.push(t.perf);
                    else if (t.clientEvent) i.push(t.clientEvent);
                    else if (t.startStats) {
                        t.startStats.statsHeader
                            ? (f = new Uint8Array(t.startStats.statsHeader))
                            : t.startStats.uploadURL && (c = t.startStats.uploadURL);
                        let e = { statsStarted: !0 };
                        (h = self.setInterval(() => O(), 5e3)), a.postMessage(e), M("Stats upload started");
                    } else if (t.stopStats) self.clearInterval(h), T(), M("Stats upload stopped");
                    else if (t.webrtcStats) t.webrtcStats.buffer && o.addReport(t.webrtcStats);
                    else if (t.sq) b.push(t.sq);
                    else if (t.startWebSocket) {
                        (u = !0), (c = t.startWebSocket.signInURL), A();
                        const e = { wsOpening: !0 };
                        a.postMessage(e);
                    } else
                        t.stopWebSocket
                            ? ((k = 0),
                              (w = !1),
                              (v = []),
                              (g = []),
                              W(),
                              null == d || d.close(),
                              M("Worker uninitialized"))
                            : t.send
                            ? R(t.send)
                            : t.duration && y.push(t.duration);
                } catch (e) {
                    U("Worker onmessage exception: " + e.message);
                }
            };
        },
    51:
        /*!************************************************!*\
  !*** ./ragnarok-core/src/webrtcbinarystats.ts ***!
  \************************************************/
        /*! no static exports found */
        /*! all exports used */
        /*! ModuleConcatenation bailout: Module is not an ECMAScript module */ function (e, t, s) {
            "use strict";
            Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.ChunkHeaderSize = 9),
                (t.statsConfig = {
                    depr: { size: 70, version: 1, name: "DEPR" },
                    rtpv: { size: 68, version: 2, name: "RTPV" },
                    rtpa: { size: 48, version: 1, name: "RTPA" },
                    traa: { size: 88, version: 1, name: "TRAA" },
                    trav: { size: 44, version: 1, name: "TRAV" },
                    none: { size: 0, version: 1, name: "" },
                });
            t.WebrtcBinaryStats = class {
                constructor() {
                    (this.statsMap = new Map()), this.resetLists();
                }
                size() {
                    let e = 0;
                    for (let [t, s] of this.statsMap) for (let t of s) e += t.byteLength;
                    return (e += this.statsMap.size * t.ChunkHeaderSize), e;
                }
                addReport(e) {
                    let t = this.statsMap.get(e.type);
                    t ? t.push(e.buffer) : this.statsMap.set(e.type, new Array(e.buffer));
                }
                write(e, t) {
                    let s = t;
                    for (let [t, n] of this.statsMap)
                        (s += this.createHeader(e, s, t, n.length)), (s += this.writeStatsToBuffer(e, n, s));
                    return s;
                }
                resetLists() {
                    this.statsMap.clear();
                }
                createHeader(e, s, n, a) {
                    let r = this.getStatsConfig(n),
                        i = r.name,
                        o = new DataView(e.buffer);
                    for (let e = 0; e < 4; e++) o.setUint8(s + e, i.charCodeAt(e));
                    return (
                        o.setUint8(s + 4, r.version),
                        o.setUint16(s + 5, a, !0),
                        o.setUint16(s + 7, r.size, !0),
                        t.ChunkHeaderSize
                    );
                }
                getStatsConfig(e) {
                    switch (e) {
                        case 0:
                            return t.statsConfig.depr;
                        case 1:
                            return t.statsConfig.rtpv;
                        case 2:
                            return t.statsConfig.rtpa;
                        case 3:
                            return t.statsConfig.trav;
                        case 4:
                            return t.statsConfig.traa;
                        default:
                            return t.statsConfig.none;
                    }
                }
                writeStatsToBuffer(e, t, s) {
                    let n = 0;
                    for (let a of t) {
                        let t = new Uint8Array(a);
                        e.set(t, s + n), (n += a.byteLength);
                    }
                    return n;
                }
            };
        },
});
//# sourceMappingURL=ragnarokworker.js.map
