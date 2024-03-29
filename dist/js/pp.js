var AF_URL_SCHEME = "(https:\\/\\/)(([^\\.][^\\.]+).)(.*\\/)(.*)",
    VALID_AF_URL_PARTS_LENGTH = 5,
    GOOGLE_CLICK_ID = "gclid",
    ASSOCIATED_AD_KEYWORD = "keyword",
    AF_KEYWORDS = "af_keywords",
    AF_CUSTOM_EXCLUDE_PARAMS_KEYS = [
        "pid",
        "c",
        "af_channel",
        "af_ad",
        "af_adset",
        "deep_link_value",
        "af_sub1",
        "af_sub2",
        "af_sub3",
        "af_sub4",
        "af_sub5",
    ],
    GCLID_EXCLUDE_PARAMS_KEYS = [
        "pid",
        "c",
        "af_channel",
        "af_ad",
        "af_adset",
        "deep_link_value",
    ],
    stringifyParameters = function () {
        var t =
                arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
            e = Object.keys(t).reduce(function (e, o) {
                return t[o] && (e += "&".concat(o, "=").concat(t[o])), e;
            }, "");
        return console.debug("Generated OneLink parameters", e), e;
    },
    getParameterValue = function (t) {
        var e =
            arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : { keys: [], overrideValues: {}, defaultValue: "" };
        if (
            !(
                (null != e && e.keys && Array.isArray(e.keys)) ||
                (null != e && e.defaultValue)
            )
        )
            return (
                console.error("Parameter config structure is wrong", e), null
            );
        var o = e.keys,
            i = void 0 === o ? [] : o,
            n = e.overrideValues,
            r = void 0 === n ? {} : n,
            a = e.defaultValue,
            l = void 0 === a ? "" : a,
            s = i.find(function (e) {
                return !!t[e];
            });
        if (s) {
            var h = t[s];
            return r[h] || h || l;
        }
        return l;
    },
    getURLParametersKV = function (t) {
        var e = t
            .replace("?", "")
            .split("&")
            .reduce(function (t, e) {
                var o = e.split("=");
                return o[0] && o[1] && (t[[o[0]]] = o[1]), t;
            }, {});
        return console.debug("Generated current parameters object", e), e;
    },
    isSkippedURL = function (t) {
        var e = t.url,
            o = t.skipKeys,
            i = t.errorMsg;
        if (e) {
            var n = e.toLowerCase();
            if (n) {
                var r = o.find(function (t) {
                    return n.includes(t.toLowerCase());
                });
                return r && console.debug(i, r), !!r;
            }
        }
        return !1;
    },
    getGoogleClickIdParameters = function (t, e) {
        var o = e[GOOGLE_CLICK_ID],
            i = {};
        if (o) {
            console.debug("This user comes from Google AdWords"), (i[t] = o);
            var n = e[ASSOCIATED_AD_KEYWORD];
            n &&
                (console.debug("There is a keyword associated with the ad"),
                (i[AF_KEYWORDS] = n));
        } else console.debug("This user comes from SRN or custom network");
        return i;
    };
function _typeof(t) {
    "@babel/helpers - typeof";
    return (_typeof =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                  return typeof t;
              }
            : function (t) {
                  return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
              })(t);
}
function QRCode() {
    var t,
        e,
        o =
            "object" ==
                ("undefined" == typeof global
                    ? "undefined"
                    : _typeof(global)) &&
            global &&
            global.Object === Object &&
            global,
        i =
            "object" ==
                ("undefined" == typeof self ? "undefined" : _typeof(self)) &&
            self &&
            self.Object === Object &&
            self,
        n = o || i || Function("return this")(),
        r =
            "object" ==
                ("undefined" == typeof exports
                    ? "undefined"
                    : _typeof(exports)) &&
            exports &&
            !exports.nodeType &&
            exports,
        a =
            r &&
            "object" ==
                ("undefined" == typeof module
                    ? "undefined"
                    : _typeof(module)) &&
            module &&
            !module.nodeType &&
            module,
        l = n.QRCode;
    function s(t, e, o) {
        (this.mode = u.MODE_8BIT_BYTE), (this.data = t), (this.parsedData = []);
        for (var i = 0, n = this.data.length; i < n; i++) {
            var r = [],
                a = this.data.charCodeAt(i);
            e
                ? (r[0] = a)
                : a > 65536
                ? ((r[0] = 240 | ((1835008 & a) >>> 18)),
                  (r[1] = 128 | ((258048 & a) >>> 12)),
                  (r[2] = 128 | ((4032 & a) >>> 6)),
                  (r[3] = 128 | (63 & a)))
                : a > 2048
                ? ((r[0] = 224 | ((61440 & a) >>> 12)),
                  (r[1] = 128 | ((4032 & a) >>> 6)),
                  (r[2] = 128 | (63 & a)))
                : a > 128
                ? ((r[0] = 192 | ((1984 & a) >>> 6)), (r[1] = 128 | (63 & a)))
                : (r[0] = a),
                this.parsedData.push(r);
        }
        (this.parsedData = Array.prototype.concat.apply([], this.parsedData)),
            o ||
                this.parsedData.length == this.data.length ||
                (this.parsedData.unshift(191),
                this.parsedData.unshift(187),
                this.parsedData.unshift(239));
    }
    function h(t, e) {
        (this.typeNumber = t),
            (this.errorCorrectLevel = e),
            (this.modules = null),
            (this.moduleCount = 0),
            (this.dataCache = null),
            (this.dataList = []);
    }
    (s.prototype = {
        getLength: function (t) {
            return this.parsedData.length;
        },
        write: function (t) {
            for (var e = 0, o = this.parsedData.length; e < o; e++)
                t.put(this.parsedData[e], 8);
        },
    }),
        (h.prototype = {
            addData: function (t, e, o) {
                var i = new s(t, e, o);
                this.dataList.push(i), (this.dataCache = null);
            },
            isDark: function (t, e) {
                if (
                    t < 0 ||
                    this.moduleCount <= t ||
                    e < 0 ||
                    this.moduleCount <= e
                )
                    throw new Error(t + "," + e);
                return this.modules[t][e][0];
            },
            getEye: function (t, e) {
                if (
                    t < 0 ||
                    this.moduleCount <= t ||
                    e < 0 ||
                    this.moduleCount <= e
                )
                    throw new Error(t + "," + e);
                var o = this.modules[t][e];
                if (o[1]) {
                    var i = "P" + o[1] + "_" + o[2];
                    return (
                        "A" == o[2] && (i = "A" + o[1]),
                        { isDark: o[0], type: i }
                    );
                }
                return null;
            },
            getModuleCount: function () {
                return this.moduleCount;
            },
            make: function () {
                this.makeImpl(!1, this.getBestMaskPattern());
            },
            makeImpl: function (t, e) {
                (this.moduleCount = 4 * this.typeNumber + 17),
                    (this.modules = new Array(this.moduleCount));
                for (var o = 0; o < this.moduleCount; o++) {
                    this.modules[o] = new Array(this.moduleCount);
                    for (var i = 0; i < this.moduleCount; i++)
                        this.modules[o][i] = [];
                }
                this.setupPositionProbePattern(0, 0, "TL"),
                    this.setupPositionProbePattern(
                        this.moduleCount - 7,
                        0,
                        "BL"
                    ),
                    this.setupPositionProbePattern(
                        0,
                        this.moduleCount - 7,
                        "TR"
                    ),
                    this.setupPositionAdjustPattern("A"),
                    this.setupTimingPattern(),
                    this.setupTypeInfo(t, e),
                    this.typeNumber >= 7 && this.setupTypeNumber(t),
                    null == this.dataCache &&
                        (this.dataCache = h.createData(
                            this.typeNumber,
                            this.errorCorrectLevel,
                            this.dataList
                        )),
                    this.mapData(this.dataCache, e);
            },
            setupPositionProbePattern: function (t, e, o) {
                for (var i = -1; i <= 7; i++)
                    if (!(t + i <= -1 || this.moduleCount <= t + i))
                        for (var n = -1; n <= 7; n++)
                            e + n <= -1 ||
                                this.moduleCount <= e + n ||
                                ((0 <= i && i <= 6 && (0 == n || 6 == n)) ||
                                (0 <= n && n <= 6 && (0 == i || 6 == i)) ||
                                (2 <= i && i <= 4 && 2 <= n && n <= 4)
                                    ? ((this.modules[t + i][e + n][0] = !0),
                                      (this.modules[t + i][e + n][2] = o),
                                      (this.modules[t + i][e + n][1] =
                                          -0 == i || -0 == n || 6 == i || 6 == n
                                              ? "O"
                                              : "I"))
                                    : (this.modules[t + i][e + n][0] = !1));
            },
            getBestMaskPattern: function () {
                for (var t = 0, e = 0, o = 0; o < 8; o++) {
                    this.makeImpl(!0, o);
                    var i = b.getLostPoint(this);
                    (0 == o || t > i) && ((t = i), (e = o));
                }
                return e;
            },
            createMovieClip: function (t, e, o) {
                var i = t.createEmptyMovieClip(e, o);
                this.make();
                for (var n = 0; n < this.modules.length; n++)
                    for (
                        var r = 1 * n, a = 0;
                        a < this.modules[n].length;
                        a++
                    ) {
                        var l = 1 * a;
                        this.modules[n][a][0] &&
                            (i.beginFill(0, 100),
                            i.moveTo(l, r),
                            i.lineTo(l + 1, r),
                            i.lineTo(l + 1, r + 1),
                            i.lineTo(l, r + 1),
                            i.endFill());
                    }
                return i;
            },
            setupTimingPattern: function () {
                for (var t = 8; t < this.moduleCount - 8; t++)
                    null == this.modules[t][6][0] &&
                        (this.modules[t][6][0] = t % 2 == 0);
                for (var e = 8; e < this.moduleCount - 8; e++)
                    null == this.modules[6][e][0] &&
                        (this.modules[6][e][0] = e % 2 == 0);
            },
            setupPositionAdjustPattern: function (t) {
                for (
                    var e = b.getPatternPosition(this.typeNumber), o = 0;
                    o < e.length;
                    o++
                )
                    for (var i = 0; i < e.length; i++) {
                        var n = e[o],
                            r = e[i];
                        if (null == this.modules[n][r][0])
                            for (var a = -2; a <= 2; a++)
                                for (var l = -2; l <= 2; l++)
                                    -2 == a ||
                                    2 == a ||
                                    -2 == l ||
                                    2 == l ||
                                    (0 == a && 0 == l)
                                        ? ((this.modules[n + a][r + l][0] = !0),
                                          (this.modules[n + a][r + l][2] = t),
                                          (this.modules[n + a][r + l][1] =
                                              -2 == a ||
                                              -2 == l ||
                                              2 == a ||
                                              2 == l
                                                  ? "O"
                                                  : "I"))
                                        : (this.modules[n + a][r + l][0] = !1);
                    }
            },
            setupTypeNumber: function (t) {
                for (
                    var e = b.getBCHTypeNumber(this.typeNumber), o = 0;
                    o < 18;
                    o++
                ) {
                    var i = !t && 1 == ((e >> o) & 1);
                    this.modules[Math.floor(o / 3)][
                        (o % 3) + this.moduleCount - 8 - 3
                    ][0] = i;
                }
                for (o = 0; o < 18; o++) {
                    i = !t && 1 == ((e >> o) & 1);
                    this.modules[(o % 3) + this.moduleCount - 8 - 3][
                        Math.floor(o / 3)
                    ][0] = i;
                }
            },
            setupTypeInfo: function (t, e) {
                for (
                    var o = (this.errorCorrectLevel << 3) | e,
                        i = b.getBCHTypeInfo(o),
                        n = 0;
                    n < 15;
                    n++
                ) {
                    var r = !t && 1 == ((i >> n) & 1);
                    n < 6
                        ? (this.modules[n][8][0] = r)
                        : n < 8
                        ? (this.modules[n + 1][8][0] = r)
                        : (this.modules[this.moduleCount - 15 + n][8][0] = r);
                }
                for (n = 0; n < 15; n++) {
                    r = !t && 1 == ((i >> n) & 1);
                    n < 8
                        ? (this.modules[8][this.moduleCount - n - 1][0] = r)
                        : n < 9
                        ? (this.modules[8][15 - n - 1 + 1][0] = r)
                        : (this.modules[8][15 - n - 1][0] = r);
                }
                this.modules[this.moduleCount - 8][8][0] = !t;
            },
            mapData: function (t, e) {
                for (
                    var o = -1,
                        i = this.moduleCount - 1,
                        n = 7,
                        r = 0,
                        a = this.moduleCount - 1;
                    a > 0;
                    a -= 2
                )
                    for (6 == a && a--; ; ) {
                        for (var l = 0; l < 2; l++)
                            if (null == this.modules[i][a - l][0]) {
                                var s = !1;
                                r < t.length && (s = 1 == ((t[r] >>> n) & 1)),
                                    b.getMask(e, i, a - l) && (s = !s),
                                    (this.modules[i][a - l][0] = s),
                                    -1 == --n && (r++, (n = 7));
                            }
                        if ((i += o) < 0 || this.moduleCount <= i) {
                            (i -= o), (o = -o);
                            break;
                        }
                    }
            },
        }),
        (h.PAD0 = 236),
        (h.PAD1 = 17),
        (h.createData = function (t, e, o) {
            for (
                var i = w.getRSBlocks(t, e), n = new O(), r = 0;
                r < o.length;
                r++
            ) {
                var a = o[r];
                n.put(a.mode, 4),
                    n.put(a.getLength(), b.getLengthInBits(a.mode, t)),
                    a.write(n);
            }
            var l = 0;
            for (r = 0; r < i.length; r++) l += i[r].dataCount;
            if (n.getLengthInBits() > 8 * l)
                throw new Error(
                    "code length overflow. (" +
                        n.getLengthInBits() +
                        ">" +
                        8 * l +
                        ")"
                );
            for (
                n.getLengthInBits() + 4 <= 8 * l && n.put(0, 4);
                n.getLengthInBits() % 8 != 0;

            )
                n.putBit(!1);
            for (
                ;
                !(
                    n.getLengthInBits() >= 8 * l ||
                    (n.put(h.PAD0, 8), n.getLengthInBits() >= 8 * l)
                );

            )
                n.put(h.PAD1, 8);
            return h.createBytes(n, i);
        }),
        (h.createBytes = function (t, e) {
            for (
                var o = 0,
                    i = 0,
                    n = 0,
                    r = new Array(e.length),
                    a = new Array(e.length),
                    l = 0;
                l < e.length;
                l++
            ) {
                var s = e[l].dataCount,
                    h = e[l].totalCount - s;
                (i = Math.max(i, s)),
                    (n = Math.max(n, h)),
                    (r[l] = new Array(s));
                for (var u = 0; u < r[l].length; u++)
                    r[l][u] = 255 & t.buffer[u + o];
                o += s;
                var d = b.getErrorCorrectPolynomial(h),
                    g = new S(r[l], d.getLength() - 1).mod(d);
                a[l] = new Array(d.getLength() - 1);
                for (u = 0; u < a[l].length; u++) {
                    var c = u + g.getLength() - a[l].length;
                    a[l][u] = c >= 0 ? g.get(c) : 0;
                }
            }
            var p = 0;
            for (u = 0; u < e.length; u++) p += e[u].totalCount;
            var f = new Array(p),
                m = 0;
            for (u = 0; u < i; u++)
                for (l = 0; l < e.length; l++)
                    u < r[l].length && (f[m++] = r[l][u]);
            for (u = 0; u < n; u++)
                for (l = 0; l < e.length; l++)
                    u < a[l].length && (f[m++] = a[l][u]);
            return f;
        });
    for (
        var u = {
                MODE_NUMBER: 1,
                MODE_ALPHA_NUM: 2,
                MODE_8BIT_BYTE: 4,
                MODE_KANJI: 8,
            },
            d = { L: 1, M: 0, Q: 3, H: 2 },
            g = 0,
            c = 1,
            p = 2,
            f = 3,
            m = 4,
            _ = 5,
            v = 6,
            C = 7,
            b = {
                PATTERN_POSITION_TABLE: [
                    [],
                    [6, 18],
                    [6, 22],
                    [6, 26],
                    [6, 30],
                    [6, 34],
                    [6, 22, 38],
                    [6, 24, 42],
                    [6, 26, 46],
                    [6, 28, 50],
                    [6, 30, 54],
                    [6, 32, 58],
                    [6, 34, 62],
                    [6, 26, 46, 66],
                    [6, 26, 48, 70],
                    [6, 26, 50, 74],
                    [6, 30, 54, 78],
                    [6, 30, 56, 82],
                    [6, 30, 58, 86],
                    [6, 34, 62, 90],
                    [6, 28, 50, 72, 94],
                    [6, 26, 50, 74, 98],
                    [6, 30, 54, 78, 102],
                    [6, 28, 54, 80, 106],
                    [6, 32, 58, 84, 110],
                    [6, 30, 58, 86, 114],
                    [6, 34, 62, 90, 118],
                    [6, 26, 50, 74, 98, 122],
                    [6, 30, 54, 78, 102, 126],
                    [6, 26, 52, 78, 104, 130],
                    [6, 30, 56, 82, 108, 134],
                    [6, 34, 60, 86, 112, 138],
                    [6, 30, 58, 86, 114, 142],
                    [6, 34, 62, 90, 118, 146],
                    [6, 30, 54, 78, 102, 126, 150],
                    [6, 24, 50, 76, 102, 128, 154],
                    [6, 28, 54, 80, 106, 132, 158],
                    [6, 32, 58, 84, 110, 136, 162],
                    [6, 26, 54, 82, 110, 138, 166],
                    [6, 30, 58, 86, 114, 142, 170],
                ],
                G15: 1335,
                G18: 7973,
                G15_MASK: 21522,
                getBCHTypeInfo: function (t) {
                    for (
                        var e = t << 10;
                        b.getBCHDigit(e) - b.getBCHDigit(b.G15) >= 0;

                    )
                        e ^= b.G15 << (b.getBCHDigit(e) - b.getBCHDigit(b.G15));
                    return ((t << 10) | e) ^ b.G15_MASK;
                },
                getBCHTypeNumber: function (t) {
                    for (
                        var e = t << 12;
                        b.getBCHDigit(e) - b.getBCHDigit(b.G18) >= 0;

                    )
                        e ^= b.G18 << (b.getBCHDigit(e) - b.getBCHDigit(b.G18));
                    return (t << 12) | e;
                },
                getBCHDigit: function (t) {
                    for (var e = 0; 0 != t; ) e++, (t >>>= 1);
                    return e;
                },
                getPatternPosition: function (t) {
                    return b.PATTERN_POSITION_TABLE[t - 1];
                },
                getMask: function (t, e, o) {
                    switch (t) {
                        case g:
                            return (e + o) % 2 == 0;
                        case c:
                            return e % 2 == 0;
                        case p:
                            return o % 3 == 0;
                        case f:
                            return (e + o) % 3 == 0;
                        case m:
                            return (
                                (Math.floor(e / 2) + Math.floor(o / 3)) % 2 == 0
                            );
                        case _:
                            return ((e * o) % 2) + ((e * o) % 3) == 0;
                        case v:
                            return (((e * o) % 2) + ((e * o) % 3)) % 2 == 0;
                        case C:
                            return (((e * o) % 3) + ((e + o) % 2)) % 2 == 0;
                        default:
                            throw new Error("bad maskPattern:" + t);
                    }
                },
                getErrorCorrectPolynomial: function (t) {
                    for (var e = new S([1], 0), o = 0; o < t; o++)
                        e = e.multiply(new S([1, y.gexp(o)], 0));
                    return e;
                },
                getLengthInBits: function (t, e) {
                    if (1 <= e && e < 10)
                        switch (t) {
                            case u.MODE_NUMBER:
                                return 10;
                            case u.MODE_ALPHA_NUM:
                                return 9;
                            case u.MODE_8BIT_BYTE:
                            case u.MODE_KANJI:
                                return 8;
                            default:
                                throw new Error("mode:" + t);
                        }
                    else if (e < 27)
                        switch (t) {
                            case u.MODE_NUMBER:
                                return 12;
                            case u.MODE_ALPHA_NUM:
                                return 11;
                            case u.MODE_8BIT_BYTE:
                                return 16;
                            case u.MODE_KANJI:
                                return 10;
                            default:
                                throw new Error("mode:" + t);
                        }
                    else {
                        if (!(e < 41)) throw new Error("type:" + e);
                        switch (t) {
                            case u.MODE_NUMBER:
                                return 14;
                            case u.MODE_ALPHA_NUM:
                                return 13;
                            case u.MODE_8BIT_BYTE:
                                return 16;
                            case u.MODE_KANJI:
                                return 12;
                            default:
                                throw new Error("mode:" + t);
                        }
                    }
                },
                getLostPoint: function (t) {
                    for (var e = t.getModuleCount(), o = 0, i = 0; i < e; i++)
                        for (var n = 0; n < e; n++) {
                            for (
                                var r = 0, a = t.isDark(i, n), l = -1;
                                l <= 1;
                                l++
                            )
                                if (!(i + l < 0 || e <= i + l))
                                    for (var s = -1; s <= 1; s++)
                                        n + s < 0 ||
                                            e <= n + s ||
                                            (0 == l && 0 == s) ||
                                            (a == t.isDark(i + l, n + s) &&
                                                r++);
                            r > 5 && (o += 3 + r - 5);
                        }
                    for (i = 0; i < e - 1; i++)
                        for (n = 0; n < e - 1; n++) {
                            var h = 0;
                            t.isDark(i, n) && h++,
                                t.isDark(i + 1, n) && h++,
                                t.isDark(i, n + 1) && h++,
                                t.isDark(i + 1, n + 1) && h++,
                                (0 != h && 4 != h) || (o += 3);
                        }
                    for (i = 0; i < e; i++)
                        for (n = 0; n < e - 6; n++)
                            t.isDark(i, n) &&
                                !t.isDark(i, n + 1) &&
                                t.isDark(i, n + 2) &&
                                t.isDark(i, n + 3) &&
                                t.isDark(i, n + 4) &&
                                !t.isDark(i, n + 5) &&
                                t.isDark(i, n + 6) &&
                                (o += 40);
                    for (n = 0; n < e; n++)
                        for (i = 0; i < e - 6; i++)
                            t.isDark(i, n) &&
                                !t.isDark(i + 1, n) &&
                                t.isDark(i + 2, n) &&
                                t.isDark(i + 3, n) &&
                                t.isDark(i + 4, n) &&
                                !t.isDark(i + 5, n) &&
                                t.isDark(i + 6, n) &&
                                (o += 40);
                    var u = 0;
                    for (n = 0; n < e; n++)
                        for (i = 0; i < e; i++) t.isDark(i, n) && u++;
                    return (o += 10 * (Math.abs((100 * u) / e / e - 50) / 5));
                },
            },
            y = {
                glog: function (t) {
                    if (t < 1) throw new Error("glog(" + t + ")");
                    return y.LOG_TABLE[t];
                },
                gexp: function (t) {
                    for (; t < 0; ) t += 255;
                    for (; t >= 256; ) t -= 255;
                    return y.EXP_TABLE[t];
                },
                EXP_TABLE: new Array(256),
                LOG_TABLE: new Array(256),
            },
            A = 0;
        A < 8;
        A++
    )
        y.EXP_TABLE[A] = 1 << A;
    for (A = 8; A < 256; A++)
        y.EXP_TABLE[A] =
            y.EXP_TABLE[A - 4] ^
            y.EXP_TABLE[A - 5] ^
            y.EXP_TABLE[A - 6] ^
            y.EXP_TABLE[A - 8];
    for (A = 0; A < 255; A++) y.LOG_TABLE[y.EXP_TABLE[A]] = A;
    function S(e, o) {
        if (e.length == t) throw new Error(e.length + "/" + o);
        for (var i = 0; i < e.length && 0 == e[i]; ) i++;
        this.num = new Array(e.length - i + o);
        for (var n = 0; n < e.length - i; n++) this.num[n] = e[n + i];
    }
    function w(t, e) {
        (this.totalCount = t), (this.dataCount = e);
    }
    function O() {
        (this.buffer = []), (this.length = 0);
    }
    (S.prototype = {
        get: function (t) {
            return this.num[t];
        },
        getLength: function () {
            return this.num.length;
        },
        multiply: function (t) {
            for (
                var e = new Array(this.getLength() + t.getLength() - 1), o = 0;
                o < this.getLength();
                o++
            )
                for (var i = 0; i < t.getLength(); i++)
                    e[o + i] ^= y.gexp(y.glog(this.get(o)) + y.glog(t.get(i)));
            return new S(e, 0);
        },
        mod: function (t) {
            if (this.getLength() - t.getLength() < 0) return this;
            for (
                var e = y.glog(this.get(0)) - y.glog(t.get(0)),
                    o = new Array(this.getLength()),
                    i = 0;
                i < this.getLength();
                i++
            )
                o[i] = this.get(i);
            for (i = 0; i < t.getLength(); i++)
                o[i] ^= y.gexp(y.glog(t.get(i)) + e);
            return new S(o, 0).mod(t);
        },
    }),
        (w.RS_BLOCK_TABLE = [
            [1, 26, 19],
            [1, 26, 16],
            [1, 26, 13],
            [1, 26, 9],
            [1, 44, 34],
            [1, 44, 28],
            [1, 44, 22],
            [1, 44, 16],
            [1, 70, 55],
            [1, 70, 44],
            [2, 35, 17],
            [2, 35, 13],
            [1, 100, 80],
            [2, 50, 32],
            [2, 50, 24],
            [4, 25, 9],
            [1, 134, 108],
            [2, 67, 43],
            [2, 33, 15, 2, 34, 16],
            [2, 33, 11, 2, 34, 12],
            [2, 86, 68],
            [4, 43, 27],
            [4, 43, 19],
            [4, 43, 15],
            [2, 98, 78],
            [4, 49, 31],
            [2, 32, 14, 4, 33, 15],
            [4, 39, 13, 1, 40, 14],
            [2, 121, 97],
            [2, 60, 38, 2, 61, 39],
            [4, 40, 18, 2, 41, 19],
            [4, 40, 14, 2, 41, 15],
            [2, 146, 116],
            [3, 58, 36, 2, 59, 37],
            [4, 36, 16, 4, 37, 17],
            [4, 36, 12, 4, 37, 13],
            [2, 86, 68, 2, 87, 69],
            [4, 69, 43, 1, 70, 44],
            [6, 43, 19, 2, 44, 20],
            [6, 43, 15, 2, 44, 16],
            [4, 101, 81],
            [1, 80, 50, 4, 81, 51],
            [4, 50, 22, 4, 51, 23],
            [3, 36, 12, 8, 37, 13],
            [2, 116, 92, 2, 117, 93],
            [6, 58, 36, 2, 59, 37],
            [4, 46, 20, 6, 47, 21],
            [7, 42, 14, 4, 43, 15],
            [4, 133, 107],
            [8, 59, 37, 1, 60, 38],
            [8, 44, 20, 4, 45, 21],
            [12, 33, 11, 4, 34, 12],
            [3, 145, 115, 1, 146, 116],
            [4, 64, 40, 5, 65, 41],
            [11, 36, 16, 5, 37, 17],
            [11, 36, 12, 5, 37, 13],
            [5, 109, 87, 1, 110, 88],
            [5, 65, 41, 5, 66, 42],
            [5, 54, 24, 7, 55, 25],
            [11, 36, 12, 7, 37, 13],
            [5, 122, 98, 1, 123, 99],
            [7, 73, 45, 3, 74, 46],
            [15, 43, 19, 2, 44, 20],
            [3, 45, 15, 13, 46, 16],
            [1, 135, 107, 5, 136, 108],
            [10, 74, 46, 1, 75, 47],
            [1, 50, 22, 15, 51, 23],
            [2, 42, 14, 17, 43, 15],
            [5, 150, 120, 1, 151, 121],
            [9, 69, 43, 4, 70, 44],
            [17, 50, 22, 1, 51, 23],
            [2, 42, 14, 19, 43, 15],
            [3, 141, 113, 4, 142, 114],
            [3, 70, 44, 11, 71, 45],
            [17, 47, 21, 4, 48, 22],
            [9, 39, 13, 16, 40, 14],
            [3, 135, 107, 5, 136, 108],
            [3, 67, 41, 13, 68, 42],
            [15, 54, 24, 5, 55, 25],
            [15, 43, 15, 10, 44, 16],
            [4, 144, 116, 4, 145, 117],
            [17, 68, 42],
            [17, 50, 22, 6, 51, 23],
            [19, 46, 16, 6, 47, 17],
            [2, 139, 111, 7, 140, 112],
            [17, 74, 46],
            [7, 54, 24, 16, 55, 25],
            [34, 37, 13],
            [4, 151, 121, 5, 152, 122],
            [4, 75, 47, 14, 76, 48],
            [11, 54, 24, 14, 55, 25],
            [16, 45, 15, 14, 46, 16],
            [6, 147, 117, 4, 148, 118],
            [6, 73, 45, 14, 74, 46],
            [11, 54, 24, 16, 55, 25],
            [30, 46, 16, 2, 47, 17],
            [8, 132, 106, 4, 133, 107],
            [8, 75, 47, 13, 76, 48],
            [7, 54, 24, 22, 55, 25],
            [22, 45, 15, 13, 46, 16],
            [10, 142, 114, 2, 143, 115],
            [19, 74, 46, 4, 75, 47],
            [28, 50, 22, 6, 51, 23],
            [33, 46, 16, 4, 47, 17],
            [8, 152, 122, 4, 153, 123],
            [22, 73, 45, 3, 74, 46],
            [8, 53, 23, 26, 54, 24],
            [12, 45, 15, 28, 46, 16],
            [3, 147, 117, 10, 148, 118],
            [3, 73, 45, 23, 74, 46],
            [4, 54, 24, 31, 55, 25],
            [11, 45, 15, 31, 46, 16],
            [7, 146, 116, 7, 147, 117],
            [21, 73, 45, 7, 74, 46],
            [1, 53, 23, 37, 54, 24],
            [19, 45, 15, 26, 46, 16],
            [5, 145, 115, 10, 146, 116],
            [19, 75, 47, 10, 76, 48],
            [15, 54, 24, 25, 55, 25],
            [23, 45, 15, 25, 46, 16],
            [13, 145, 115, 3, 146, 116],
            [2, 74, 46, 29, 75, 47],
            [42, 54, 24, 1, 55, 25],
            [23, 45, 15, 28, 46, 16],
            [17, 145, 115],
            [10, 74, 46, 23, 75, 47],
            [10, 54, 24, 35, 55, 25],
            [19, 45, 15, 35, 46, 16],
            [17, 145, 115, 1, 146, 116],
            [14, 74, 46, 21, 75, 47],
            [29, 54, 24, 19, 55, 25],
            [11, 45, 15, 46, 46, 16],
            [13, 145, 115, 6, 146, 116],
            [14, 74, 46, 23, 75, 47],
            [44, 54, 24, 7, 55, 25],
            [59, 46, 16, 1, 47, 17],
            [12, 151, 121, 7, 152, 122],
            [12, 75, 47, 26, 76, 48],
            [39, 54, 24, 14, 55, 25],
            [22, 45, 15, 41, 46, 16],
            [6, 151, 121, 14, 152, 122],
            [6, 75, 47, 34, 76, 48],
            [46, 54, 24, 10, 55, 25],
            [2, 45, 15, 64, 46, 16],
            [17, 152, 122, 4, 153, 123],
            [29, 74, 46, 14, 75, 47],
            [49, 54, 24, 10, 55, 25],
            [24, 45, 15, 46, 46, 16],
            [4, 152, 122, 18, 153, 123],
            [13, 74, 46, 32, 75, 47],
            [48, 54, 24, 14, 55, 25],
            [42, 45, 15, 32, 46, 16],
            [20, 147, 117, 4, 148, 118],
            [40, 75, 47, 7, 76, 48],
            [43, 54, 24, 22, 55, 25],
            [10, 45, 15, 67, 46, 16],
            [19, 148, 118, 6, 149, 119],
            [18, 75, 47, 31, 76, 48],
            [34, 54, 24, 34, 55, 25],
            [20, 45, 15, 61, 46, 16],
        ]),
        (w.getRSBlocks = function (e, o) {
            var i = w.getRsBlockTable(e, o);
            if (i == t)
                throw new Error(
                    "bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + o
                );
            for (var n = i.length / 3, r = [], a = 0; a < n; a++)
                for (
                    var l = i[3 * a + 0],
                        s = i[3 * a + 1],
                        h = i[3 * a + 2],
                        u = 0;
                    u < l;
                    u++
                )
                    r.push(new w(s, h));
            return r;
        }),
        (w.getRsBlockTable = function (e, o) {
            switch (o) {
                case d.L:
                    return w.RS_BLOCK_TABLE[4 * (e - 1) + 0];
                case d.M:
                    return w.RS_BLOCK_TABLE[4 * (e - 1) + 1];
                case d.Q:
                    return w.RS_BLOCK_TABLE[4 * (e - 1) + 2];
                case d.H:
                    return w.RS_BLOCK_TABLE[4 * (e - 1) + 3];
                default:
                    return t;
            }
        }),
        (O.prototype = {
            get: function (t) {
                var e = Math.floor(t / 8);
                return 1 == ((this.buffer[e] >>> (7 - (t % 8))) & 1);
            },
            put: function (t, e) {
                for (var o = 0; o < e; o++)
                    this.putBit(1 == ((t >>> (e - o - 1)) & 1));
            },
            getLengthInBits: function () {
                return this.length;
            },
            putBit: function (t) {
                var e = Math.floor(this.length / 8);
                this.buffer.length <= e && this.buffer.push(0),
                    t && (this.buffer[e] |= 128 >>> this.length % 8),
                    this.length++;
            },
        });
    var k = [
        [17, 14, 11, 7],
        [32, 26, 20, 14],
        [53, 42, 32, 24],
        [78, 62, 46, 34],
        [106, 84, 60, 44],
        [134, 106, 74, 58],
        [154, 122, 86, 64],
        [192, 152, 108, 84],
        [230, 180, 130, 98],
        [271, 213, 151, 119],
        [321, 251, 177, 137],
        [367, 287, 203, 155],
        [425, 331, 241, 177],
        [458, 362, 258, 194],
        [520, 412, 292, 220],
        [586, 450, 322, 250],
        [644, 504, 364, 280],
        [718, 560, 394, 310],
        [792, 624, 442, 338],
        [858, 666, 482, 382],
        [929, 711, 509, 403],
        [1003, 779, 565, 439],
        [1091, 857, 611, 461],
        [1171, 911, 661, 511],
        [1273, 997, 715, 535],
        [1367, 1059, 751, 593],
        [1465, 1125, 805, 625],
        [1528, 1190, 868, 658],
        [1628, 1264, 908, 698],
        [1732, 1370, 982, 742],
        [1840, 1452, 1030, 790],
        [1952, 1538, 1112, 842],
        [2068, 1628, 1168, 898],
        [2188, 1722, 1228, 958],
        [2303, 1809, 1283, 983],
        [2431, 1911, 1351, 1051],
        [2563, 1989, 1423, 1093],
        [2699, 2099, 1499, 1139],
        [2809, 2213, 1579, 1219],
        [2953, 2331, 1663, 1273],
    ];
    function L() {
        var t = !1,
            e = navigator.userAgent;
        if (/android/i.test(e)) {
            t = !0;
            var o = e.toString().match(/android ([0-9]\.[0-9])/i);
            o && o[1] && (t = parseFloat(o[1]));
        }
        return t;
    }
    var T =
        "undefined" == typeof CanvasRenderingContext2D
            ? (function () {
                  var t = function (t, e) {
                      (this._el = t), (this._htOption = e);
                  };
                  return (
                      (t.prototype.draw = function (t) {
                          var e = this._htOption,
                              o = this._el,
                              i = t.getModuleCount(),
                              n = Math.round(e.width / i),
                              r = Math.round((e.height - e.titleHeight) / i);
                          n <= 1 && (n = 1),
                              r <= 1 && (r = 1),
                              (this._htOption.width = n * i),
                              (this._htOption.height = r * i + e.titleHeight),
                              (this._htOption.quietZone = Math.round(
                                  this._htOption.quietZone
                              ));
                          var a = [],
                              l = "",
                              s = Math.round(n * e.dotScale),
                              h = Math.round(r * e.dotScale);
                          s < 4 && ((s = 4), (h = 4));
                          var u = e.colorDark,
                              d = e.colorLight;
                          if (e.backgroundImage) {
                              e.autoColor
                                  ? ((e.colorDark =
                                        "rgba(0, 0, 0, .6);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#99000000', EndColorStr='#99000000');"),
                                    (e.colorLight =
                                        "rgba(255, 255, 255, .7);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#B2FFFFFF', EndColorStr='#B2FFFFFF');"))
                                  : (e.colorLight = "rgba(0,0,0,0)");
                              var g =
                                  '<div style="display:inline-block; z-index:-10;position:absolute;"><img src="' +
                                  e.backgroundImage +
                                  '" widht="' +
                                  (e.width + 2 * e.quietZone) +
                                  '" height="' +
                                  (e.height + 2 * e.quietZone) +
                                  '" style="opacity:' +
                                  e.backgroundImageAlpha +
                                  ";filter:alpha(opacity=" +
                                  100 * e.backgroundImageAlpha +
                                  '); "/></div>';
                              a.push(g);
                          }
                          if (
                              (e.quietZone &&
                                  (l =
                                      "display:inline-block; width:" +
                                      (e.width + 2 * e.quietZone) +
                                      "px; height:" +
                                      (e.width + 2 * e.quietZone) +
                                      "px;background:" +
                                      e.quietZoneColor +
                                      "; text-align:center;"),
                              a.push('<div style="font-size:0;' + l + '">'),
                              a.push(
                                  '<table  style="font-size:0;border:0;border-collapse:collapse; margin-top:' +
                                      e.quietZone +
                                      'px;" border="0" cellspacing="0" cellspadding="0" align="center" valign="middle">'
                              ),
                              a.push(
                                  '<tr height="' +
                                      e.titleHeight +
                                      '" align="center"><td style="border:0;border-collapse:collapse;margin:0;padding:0" colspan="' +
                                      i +
                                      '">'
                              ),
                              e.title)
                          ) {
                              var c = e.titleColor,
                                  p = e.titleFont;
                              a.push(
                                  '<div style="width:100%;margin-top:' +
                                      e.titleTop +
                                      "px;color:" +
                                      c +
                                      ";font:" +
                                      p +
                                      ";background:" +
                                      e.titleBackgroundColor +
                                      '">' +
                                      e.title +
                                      "</div>"
                              );
                          }
                          e.subTitle &&
                              a.push(
                                  '<div style="width:100%;margin-top:' +
                                      (e.subTitleTop - e.titleTop) +
                                      "px;color:" +
                                      e.subTitleColor +
                                      "; font:" +
                                      e.subTitleFont +
                                      '">' +
                                      e.subTitle +
                                      "</div>"
                              ),
                              a.push("</td></tr>");
                          for (var f = 0; f < i; f++) {
                              a.push(
                                  '<tr style="border:0; padding:0; margin:0;" height="7">'
                              );
                              for (var m = 0; m < i; m++) {
                                  var _ = t.isDark(f, m),
                                      v = t.getEye(f, m);
                                  if (v) {
                                      _ = v.isDark;
                                      var C = v.type,
                                          b = e[C] || e[C.substring(0, 2)] || u;
                                      a.push(
                                          '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
                                              n +
                                              "px;height:" +
                                              r +
                                              'px;"><span style="width:' +
                                              n +
                                              "px;height:" +
                                              r +
                                              "px;background-color:" +
                                              (_ ? b : d) +
                                              ';display:inline-block"></span></td>'
                                      );
                                  } else {
                                      var y = e.colorDark;
                                      6 == f
                                          ? ((y = e.timing_H || e.timing || u),
                                            a.push(
                                                '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
                                                    n +
                                                    "px;height:" +
                                                    r +
                                                    "px;background-color:" +
                                                    (_ ? y : d) +
                                                    ';"></td>'
                                            ))
                                          : 6 == m
                                          ? ((y = e.timing_V || e.timing || u),
                                            a.push(
                                                '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
                                                    n +
                                                    "px;height:" +
                                                    r +
                                                    "px;background-color:" +
                                                    (_ ? y : d) +
                                                    ';"></td>'
                                            ))
                                          : a.push(
                                                '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
                                                    n +
                                                    "px;height:" +
                                                    r +
                                                    'px;"><div style="display:inline-block;width:' +
                                                    s +
                                                    "px;height:" +
                                                    h +
                                                    "px;background-color:" +
                                                    (_ ? y : e.colorLight) +
                                                    ';"></div></td>'
                                            );
                                  }
                              }
                              a.push("</tr>");
                          }
                          if ((a.push("</table>"), a.push("</div>"), e.logo)) {
                              var A = new Image();
                              null != e.crossOrigin &&
                                  (A.crossOrigin = e.crossOrigin),
                                  (A.src = e.logo);
                              var S = e.width / 3.5,
                                  w = e.height / 3.5;
                              S != w && (S = w),
                                  e.logoWidth && (S = e.logoWidth),
                                  e.logoHeight && (w = e.logoHeight);
                              var O =
                                  "position:relative; z-index:1;display:table-cell;top:-" +
                                  ((e.height - e.titleHeight) / 2 +
                                      w / 2 +
                                      e.quietZone) +
                                  "px;text-align:center; width:" +
                                  S +
                                  "px; height:" +
                                  w +
                                  "px;line-height:" +
                                  S +
                                  "px; vertical-align: middle;";
                              e.logoBackgroundTransparent ||
                                  (O += "background:" + e.logoBackgroundColor),
                                  a.push(
                                      '<div style="' +
                                          O +
                                          '"><img  src="' +
                                          e.logo +
                                          '"  style="max-width: ' +
                                          S +
                                          "px; max-height: " +
                                          w +
                                          'px;" /> <div style=" display: none; width:1px;margin-left: -1px;"></div></div>'
                                  );
                          }
                          e.onRenderingStart && e.onRenderingStart(e),
                              (o.innerHTML = a.join(""));
                          var k = o.childNodes[0],
                              L = (e.width - k.offsetWidth) / 2,
                              T = (e.height - k.offsetHeight) / 2;
                          L > 0 &&
                              T > 0 &&
                              (k.style.margin = T + "px " + L + "px"),
                              this._htOption.onRenderingEnd &&
                                  this._htOption.onRenderingEnd(
                                      this._htOption,
                                      null
                                  );
                      }),
                      (t.prototype.clear = function () {
                          this._el.innerHTML = "";
                      }),
                      t
                  );
              })()
            : (function () {
                  function t() {
                      if ("svg" == this._htOption.drawer) {
                          var t = this._oContext.getSerializedSvg(!0);
                          (this.dataURL = t), (this._el.innerHTML = t);
                      } else
                          try {
                              var e = this._elCanvas.toDataURL("image/png");
                              this.dataURL = e;
                          } catch (t) {
                              console.error(t);
                          }
                      this._htOption.onRenderingEnd &&
                          (this.dataURL ||
                              console.error(
                                  "Can not get base64 data, please check: 1. Published the page and image to the server 2. The image request support CORS 3. Configured `crossOrigin:'anonymous'` option"
                              ),
                          this._htOption.onRenderingEnd(
                              this._htOption,
                              this.dataURL
                          ));
                  }
                  if (n._android && n._android <= 2.1) {
                      var e = 1 / window.devicePixelRatio,
                          o = CanvasRenderingContext2D.prototype.drawImage;
                      CanvasRenderingContext2D.prototype.drawImage = function (
                          t,
                          i,
                          n,
                          r,
                          a,
                          l,
                          s,
                          h,
                          u
                      ) {
                          if ("nodeName" in t && /img/i.test(t.nodeName))
                              for (var d = arguments.length - 1; d >= 1; d--)
                                  arguments[d] = arguments[d] * e;
                          else
                              void 0 === h &&
                                  ((arguments[1] *= e),
                                  (arguments[2] *= e),
                                  (arguments[3] *= e),
                                  (arguments[4] *= e));
                          o.apply(this, arguments);
                      };
                  }
                  var i = function (t, e) {
                      (this._bIsPainted = !1),
                          (this._android = L()),
                          (this._el = t),
                          (this._htOption = e),
                          "svg" == this._htOption.drawer
                              ? ((this._oContext = {}), (this._elCanvas = {}))
                              : ((this._elCanvas =
                                    document.createElement("canvas")),
                                this._el.appendChild(this._elCanvas),
                                (this._oContext =
                                    this._elCanvas.getContext("2d"))),
                          (this._bSupportDataURI = null),
                          (this.dataURL = null);
                  };
                  return (
                      (i.prototype.draw = function (t) {
                          var e = this._htOption;
                          e.title ||
                              e.subTitle ||
                              ((e.height -= e.titleHeight),
                              (e.titleHeight = 0));
                          var o = t.getModuleCount(),
                              i = Math.round(e.width / o),
                              n = Math.round((e.height - e.titleHeight) / o);
                          i <= 1 && (i = 1),
                              n <= 1 && (n = 1),
                              (e.width = i * o),
                              (e.height = n * o + e.titleHeight),
                              (e.quietZone = Math.round(e.quietZone)),
                              (this._elCanvas.width =
                                  e.width + 2 * e.quietZone),
                              (this._elCanvas.height =
                                  e.height + 2 * e.quietZone),
                              "canvas" != this._htOption.drawer &&
                                  (this._oContext = new C2S(
                                      this._elCanvas.width,
                                      this._elCanvas.height
                                  )),
                              this.clear();
                          var r = this._oContext;
                          (r.lineWidth = 0),
                              (r.fillStyle = e.colorLight),
                              r.fillRect(
                                  0,
                                  0,
                                  this._elCanvas.width,
                                  this._elCanvas.height
                              );
                          var a = this;
                          function l() {
                              e.quietZone > 0 &&
                                  e.quietZoneColor &&
                                  ((r.lineWidth = 0),
                                  (r.fillStyle = e.quietZoneColor),
                                  r.fillRect(
                                      0,
                                      0,
                                      a._elCanvas.width,
                                      e.quietZone
                                  ),
                                  r.fillRect(
                                      0,
                                      e.quietZone,
                                      e.quietZone,
                                      a._elCanvas.height - 2 * e.quietZone
                                  ),
                                  r.fillRect(
                                      a._elCanvas.width - e.quietZone,
                                      e.quietZone,
                                      e.quietZone,
                                      a._elCanvas.height - 2 * e.quietZone
                                  ),
                                  r.fillRect(
                                      0,
                                      a._elCanvas.height - e.quietZone,
                                      a._elCanvas.width,
                                      e.quietZone
                                  ));
                          }
                          if (e.backgroundImage) {
                              var s = new Image();
                              (s.onload = function () {
                                  (r.globalAlpha = 1),
                                      (r.globalAlpha = e.backgroundImageAlpha);
                                  var o = r.imageSmoothingQuality,
                                      i = r.imageSmoothingEnabled;
                                  (r.imageSmoothingEnabled = !0),
                                      (r.imageSmoothingQuality = "high"),
                                      r.drawImage(
                                          s,
                                          0,
                                          e.titleHeight,
                                          e.width + 2 * e.quietZone,
                                          e.height +
                                              2 * e.quietZone -
                                              e.titleHeight
                                      ),
                                      (r.imageSmoothingEnabled = i),
                                      (r.imageSmoothingQuality = o),
                                      (r.globalAlpha = 1),
                                      h.call(a, t);
                              }),
                                  null != e.crossOrigin &&
                                      (s.crossOrigin = e.crossOrigin),
                                  (s.originalSrc = e.backgroundImage),
                                  (s.src = e.backgroundImage);
                          } else h.call(a, t);
                          function h(t) {
                              e.onRenderingStart && e.onRenderingStart(e);
                              for (var a = 0; a < o; a++)
                                  for (var s = 0; s < o; s++) {
                                      var h,
                                          u,
                                          d = s * i + e.quietZone,
                                          g = a * n + e.quietZone,
                                          c = t.isDark(a, s),
                                          p = t.getEye(a, s),
                                          f = e.dotScale;
                                      (r.lineWidth = 0),
                                          p
                                              ? ((h =
                                                    e[p.type] ||
                                                    e[p.type.substring(0, 2)] ||
                                                    e.colorDark),
                                                (u = e.colorLight))
                                              : e.backgroundImage
                                              ? ((u = "rgba(0,0,0,0)"),
                                                6 == a
                                                    ? e.autoColor
                                                        ? ((h =
                                                              e.timing_H ||
                                                              e.timing ||
                                                              e.autoColorDark),
                                                          (u =
                                                              e.autoColorLight))
                                                        : (h =
                                                              e.timing_H ||
                                                              e.timing ||
                                                              e.colorDark)
                                                    : 6 == s
                                                    ? e.autoColor
                                                        ? ((h =
                                                              e.timing_V ||
                                                              e.timing ||
                                                              e.autoColorDark),
                                                          (u =
                                                              e.autoColorLight))
                                                        : (h =
                                                              e.timing_V ||
                                                              e.timing ||
                                                              e.colorDark)
                                                    : e.autoColor
                                                    ? ((h = e.autoColorDark),
                                                      (u = e.autoColorLight))
                                                    : (h = e.colorDark))
                                              : ((h =
                                                    6 == a
                                                        ? e.timing_H ||
                                                          e.timing ||
                                                          e.colorDark
                                                        : (6 == s &&
                                                              (e.timing_V ||
                                                                  e.timing)) ||
                                                          e.colorDark),
                                                (u = e.colorLight)),
                                          (r.strokeStyle = c ? h : u),
                                          (r.fillStyle = c ? h : u),
                                          p
                                              ? ((f =
                                                    "AO" == p.type
                                                        ? e.dotScaleAO
                                                        : "AI" == p.type
                                                        ? e.dotScaleAI
                                                        : 1),
                                                e.backgroundImage && e.autoColor
                                                    ? ((h =
                                                          ("AO" == p.type
                                                              ? e.AI
                                                              : e.AO) ||
                                                          e.autoColorDark),
                                                      (u = e.autoColorLight))
                                                    : (h =
                                                          ("AO" == p.type
                                                              ? e.AI
                                                              : e.AO) || h),
                                                (c = p.isDark),
                                                r.fillRect(
                                                    d + (i * (1 - f)) / 2,
                                                    e.titleHeight +
                                                        g +
                                                        (n * (1 - f)) / 2,
                                                    i * f,
                                                    n * f
                                                ))
                                              : 6 == a
                                              ? ((f = e.dotScaleTiming_H),
                                                r.fillRect(
                                                    d + (i * (1 - f)) / 2,
                                                    e.titleHeight +
                                                        g +
                                                        (n * (1 - f)) / 2,
                                                    i * f,
                                                    n * f
                                                ))
                                              : 6 == s
                                              ? ((f = e.dotScaleTiming_V),
                                                r.fillRect(
                                                    d + (i * (1 - f)) / 2,
                                                    e.titleHeight +
                                                        g +
                                                        (n * (1 - f)) / 2,
                                                    i * f,
                                                    n * f
                                                ))
                                              : (e.backgroundImage,
                                                r.fillRect(
                                                    d + (i * (1 - f)) / 2,
                                                    e.titleHeight +
                                                        g +
                                                        (n * (1 - f)) / 2,
                                                    i * f,
                                                    n * f
                                                )),
                                          1 == e.dotScale ||
                                              p ||
                                              (r.strokeStyle = e.colorLight);
                                  }
                              if (
                                  (e.title &&
                                      ((r.fillStyle = e.titleBackgroundColor),
                                      r.fillRect(
                                          0,
                                          0,
                                          this._elCanvas.width,
                                          e.titleHeight + e.quietZone
                                      ),
                                      (r.font = e.titleFont),
                                      (r.fillStyle = e.titleColor),
                                      (r.textAlign = "center"),
                                      r.fillText(
                                          e.title,
                                          this._elCanvas.width / 2,
                                          +e.quietZone + e.titleTop
                                      )),
                                  e.subTitle &&
                                      ((r.font = e.subTitleFont),
                                      (r.fillStyle = e.subTitleColor),
                                      r.fillText(
                                          e.subTitle,
                                          this._elCanvas.width / 2,
                                          +e.quietZone + e.subTitleTop
                                      )),
                                  e.logo)
                              ) {
                                  var m = new Image(),
                                      _ = this;
                                  (m.onload = function () {
                                      !(function (t) {
                                          var o,
                                              i,
                                              n = Math.round(e.width / 3.5),
                                              a = Math.round(e.height / 3.5);
                                          n !== a && (n = a),
                                              e.logoMaxWidth
                                                  ? (n = Math.round(
                                                        e.logoMaxWidth
                                                    ))
                                                  : e.logoWidth &&
                                                    (n = Math.round(
                                                        e.logoWidth
                                                    )),
                                              e.logoMaxHeight
                                                  ? (a = Math.round(
                                                        e.logoMaxHeight
                                                    ))
                                                  : e.logoHeight &&
                                                    (a = Math.round(
                                                        e.logoHeight
                                                    )),
                                              void 0 === t.naturalWidth
                                                  ? ((o = t.width),
                                                    (i = t.height))
                                                  : ((o = t.naturalWidth),
                                                    (i = t.naturalHeight)),
                                              (e.logoMaxWidth ||
                                                  e.logoMaxHeight) &&
                                                  (e.logoMaxWidth &&
                                                      o <= n &&
                                                      (n = o),
                                                  e.logoMaxHeight &&
                                                      i <= a &&
                                                      (a = i),
                                                  o <= n &&
                                                      i <= a &&
                                                      ((n = o), (a = i)));
                                          var s =
                                                  (e.width +
                                                      2 * e.quietZone -
                                                      n) /
                                                  2,
                                              h =
                                                  (e.height +
                                                      e.titleHeight +
                                                      2 * e.quietZone -
                                                      a) /
                                                  2,
                                              u = Math.min(n / o, a / i),
                                              d = o * u,
                                              g = i * u;
                                          (e.logoMaxWidth || e.logoMaxHeight) &&
                                              ((n = d),
                                              (a = g),
                                              (s =
                                                  (e.width +
                                                      2 * e.quietZone -
                                                      n) /
                                                  2),
                                              (h =
                                                  (e.height +
                                                      e.titleHeight +
                                                      2 * e.quietZone -
                                                      a) /
                                                  2)),
                                              e.logoBackgroundTransparent ||
                                                  ((r.fillStyle =
                                                      e.logoBackgroundColor),
                                                  r.fillRect(s, h, n, a));
                                          var c = r.imageSmoothingQuality,
                                              p = r.imageSmoothingEnabled;
                                          (r.imageSmoothingEnabled = !0),
                                              (r.imageSmoothingQuality =
                                                  "high"),
                                              r.drawImage(
                                                  t,
                                                  s + (n - d) / 2,
                                                  h + (a - g) / 2,
                                                  d,
                                                  g
                                              ),
                                              (r.imageSmoothingEnabled = p),
                                              (r.imageSmoothingQuality = c),
                                              l(),
                                              (_._bIsPainted = !0),
                                              _.makeImage();
                                      })(m);
                                  }),
                                      (m.onerror = function (t) {
                                          console.error(t);
                                      }),
                                      null != e.crossOrigin &&
                                          (m.crossOrigin = e.crossOrigin),
                                      (m.originalSrc = e.logo),
                                      (m.src = e.logo);
                              } else
                                  l(),
                                      (this._bIsPainted = !0),
                                      this.makeImage();
                          }
                      }),
                      (i.prototype.makeImage = function () {
                          this._bIsPainted &&
                              function (t, e) {
                                  var o = this;
                                  if (
                                      ((o._fFail = e),
                                      (o._fSuccess = t),
                                      null === o._bSupportDataURI)
                                  ) {
                                      var i = document.createElement("img"),
                                          n = function () {
                                              (o._bSupportDataURI = !1),
                                                  o._fFail && o._fFail.call(o);
                                          };
                                      return (
                                          (i.onabort = n),
                                          (i.onerror = n),
                                          (i.onload = function () {
                                              (o._bSupportDataURI = !0),
                                                  o._fSuccess &&
                                                      o._fSuccess.call(o);
                                          }),
                                          void (i.src =
                                              "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
                                      );
                                  }
                                  !0 === o._bSupportDataURI && o._fSuccess
                                      ? o._fSuccess.call(o)
                                      : !1 === o._bSupportDataURI &&
                                        o._fFail &&
                                        o._fFail.call(o);
                              }.call(this, t);
                      }),
                      (i.prototype.isPainted = function () {
                          return this._bIsPainted;
                      }),
                      (i.prototype.clear = function () {
                          this._oContext.clearRect(
                              0,
                              0,
                              this._elCanvas.width,
                              this._elCanvas.height
                          ),
                              (this._bIsPainted = !1);
                      }),
                      (i.prototype.remove = function () {
                          this._oContext.clearRect(
                              0,
                              0,
                              this._elCanvas.width,
                              this._elCanvas.height
                          ),
                              (this._bIsPainted = !1),
                              (this._el.innerHTML = "");
                      }),
                      (i.prototype.round = function (t) {
                          return t ? Math.floor(1e3 * t) / 1e3 : t;
                      }),
                      i
                  );
              })();
    function D(t, e) {
        for (
            var o = e.correctLevel,
                i = 1,
                n = (function (t) {
                    var e = encodeURI(t)
                        .toString()
                        .replace(/\%[0-9a-fA-F]{2}/g, "a");
                    return e.length + (e.length != t.length ? 3 : 0);
                })(t),
                r = 0,
                a = k.length;
            r < a;
            r++
        ) {
            var l = 0;
            switch (o) {
                case d.L:
                    l = k[r][0];
                    break;
                case d.M:
                    l = k[r][1];
                    break;
                case d.Q:
                    l = k[r][2];
                    break;
                case d.H:
                    l = k[r][3];
            }
            if (n <= l) break;
            i++;
        }
        if (i > k.length)
            throw new Error(
                "Too long data. the CorrectLevel." +
                    ["M", "L", "H", "Q"][o] +
                    " limit length is " +
                    l
            );
        return (
            0 != e.version &&
                (i <= e.version
                    ? ((i = e.version), (e.runVersion = i))
                    : (console.warn(
                          "QR Code version " +
                              e.version +
                              " too small, run version use " +
                              i
                      ),
                      (e.runVersion = i))),
            i
        );
    }
    ((e = function (e, o) {
        if (
            ((this._htOption = {
                width: 256,
                height: 256,
                typeNumber: 4,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: d.H,
                dotScale: 1,
                dotScaleTiming: 1,
                dotScaleTiming_H: t,
                dotScaleTiming_V: t,
                dotScaleA: 1,
                dotScaleAO: t,
                dotScaleAI: t,
                quietZone: 0,
                quietZoneColor: "rgba(0,0,0,0)",
                title: "",
                titleFont: "normal normal bold 16px Arial",
                titleColor: "#000000",
                titleBackgroundColor: "#ffffff",
                titleHeight: 0,
                titleTop: 30,
                subTitle: "",
                subTitleFont: "normal normal normal 14px Arial",
                subTitleColor: "#4F4F4F",
                subTitleTop: 60,
                logo: t,
                logoWidth: t,
                logoHeight: t,
                logoMaxWidth: t,
                logoMaxHeight: t,
                logoBackgroundColor: "#ffffff",
                logoBackgroundTransparent: !1,
                PO: t,
                PI: t,
                PO_TL: t,
                PI_TL: t,
                PO_TR: t,
                PI_TR: t,
                PO_BL: t,
                PI_BL: t,
                AO: t,
                AI: t,
                timing: t,
                timing_H: t,
                timing_V: t,
                backgroundImage: t,
                backgroundImageAlpha: 1,
                autoColor: !1,
                autoColorDark: "rgba(0, 0, 0, .6)",
                autoColorLight: "rgba(255, 255, 255, .7)",
                onRenderingStart: t,
                onRenderingEnd: t,
                version: 0,
                tooltip: !1,
                binary: !1,
                drawer: "canvas",
                crossOrigin: null,
                utf8WithoutBOM: !0,
            }),
            "string" == typeof o && (o = { text: o }),
            o)
        )
            for (var i in o) this._htOption[i] = o[i];
        (this._htOption.version < 0 || this._htOption.version > 40) &&
            (console.warn(
                "QR Code version '" +
                    this._htOption.version +
                    "' is invalidate, reset to 0"
            ),
            (this._htOption.version = 0)),
            (this._htOption.dotScale < 0 || this._htOption.dotScale > 1) &&
                (console.warn(
                    this._htOption.dotScale +
                        " , is invalidate, dotScale must greater than 0, less than or equal to 1, now reset to 1. "
                ),
                (this._htOption.dotScale = 1)),
            (this._htOption.dotScaleTiming < 0 ||
                this._htOption.dotScaleTiming > 1) &&
                (console.warn(
                    this._htOption.dotScaleTiming +
                        " , is invalidate, dotScaleTiming must greater than 0, less than or equal to 1, now reset to 1. "
                ),
                (this._htOption.dotScaleTiming = 1)),
            this._htOption.dotScaleTiming_H
                ? (this._htOption.dotScaleTiming_H < 0 ||
                      this._htOption.dotScaleTiming_H > 1) &&
                  (console.warn(
                      this._htOption.dotScaleTiming_H +
                          " , is invalidate, dotScaleTiming_H must greater than 0, less than or equal to 1, now reset to 1. "
                  ),
                  (this._htOption.dotScaleTiming_H = 1))
                : (this._htOption.dotScaleTiming_H =
                      this._htOption.dotScaleTiming),
            this._htOption.dotScaleTiming_V
                ? (this._htOption.dotScaleTiming_V < 0 ||
                      this._htOption.dotScaleTiming_V > 1) &&
                  (console.warn(
                      this._htOption.dotScaleTiming_V +
                          " , is invalidate, dotScaleTiming_V must greater than 0, less than or equal to 1, now reset to 1. "
                  ),
                  (this._htOption.dotScaleTiming_V = 1))
                : (this._htOption.dotScaleTiming_V =
                      this._htOption.dotScaleTiming),
            (this._htOption.dotScaleA < 0 || this._htOption.dotScaleA > 1) &&
                (console.warn(
                    this._htOption.dotScaleA +
                        " , is invalidate, dotScaleA must greater than 0, less than or equal to 1, now reset to 1. "
                ),
                (this._htOption.dotScaleA = 1)),
            this._htOption.dotScaleAO
                ? (this._htOption.dotScaleAO < 0 ||
                      this._htOption.dotScaleAO > 1) &&
                  (console.warn(
                      this._htOption.dotScaleAO +
                          " , is invalidate, dotScaleAO must greater than 0, less than or equal to 1, now reset to 1. "
                  ),
                  (this._htOption.dotScaleAO = 1))
                : (this._htOption.dotScaleAO = this._htOption.dotScaleA),
            this._htOption.dotScaleAI
                ? (this._htOption.dotScaleAI < 0 ||
                      this._htOption.dotScaleAI > 1) &&
                  (console.warn(
                      this._htOption.dotScaleAI +
                          " , is invalidate, dotScaleAI must greater than 0, less than or equal to 1, now reset to 1. "
                  ),
                  (this._htOption.dotScaleAI = 1))
                : (this._htOption.dotScaleAI = this._htOption.dotScaleA),
            (this._htOption.backgroundImageAlpha < 0 ||
                this._htOption.backgroundImageAlpha > 1) &&
                (console.warn(
                    this._htOption.backgroundImageAlpha +
                        " , is invalidate, backgroundImageAlpha must between 0 and 1, now reset to 1. "
                ),
                (this._htOption.backgroundImageAlpha = 1)),
            (this._htOption.height =
                this._htOption.height + this._htOption.titleHeight),
            "string" == typeof e && (e = document.getElementById(e)),
            (!this._htOption.drawer ||
                ("svg" != this._htOption.drawer &&
                    "canvas" != this._htOption.drawer)) &&
                (this._htOption.drawer = "canvas"),
            (this._android = L()),
            (this._el = e),
            (this._oQRCode = null);
        var n = {};
        for (var i in this._htOption) n[i] = this._htOption[i];
        (this._oDrawing = new T(this._el, n)),
            this._htOption.text && this.makeCode(this._htOption.text);
    }).prototype.makeCode = function (t) {
        (this._oQRCode = new h(
            D(t, this._htOption),
            this._htOption.correctLevel
        )),
            this._oQRCode.addData(
                t,
                this._htOption.binary,
                this._htOption.utf8WithoutBOM
            ),
            this._oQRCode.make(),
            this._htOption.tooltip && (this._el.title = t),
            this._oDrawing.draw(this._oQRCode);
    }),
        (e.prototype.makeImage = function () {
            "function" == typeof this._oDrawing.makeImage &&
                (!this._android || this._android >= 3) &&
                this._oDrawing.makeImage();
        }),
        (e.prototype.clear = function () {
            this._oDrawing.remove();
        }),
        (e.prototype.resize = function (t, e) {
            (this._oDrawing._htOption.width = t),
                (this._oDrawing._htOption.height = e),
                this._oDrawing.draw(this._oQRCode);
        }),
        (e.prototype.noConflict = function () {
            return n.QRCode === this && (n.QRCode = l), e;
        }),
        (e.CorrectLevel = d),
        "function" == typeof define && (define.amd || define.cmd)
            ? define([], function () {
                  return e;
              })
            : a
            ? (((a.exports = e).QRCode = e), (r.QRCode = e))
            : (n.QRCode = e);
}
var version = "2.2.0",
    formatVersion = version.replace(/\./g, "_");
QRCode(),
    (window.AF_SMART_SCRIPT = {
        generateOneLinkURL: function () {
            var t,
                e,
                o =
                    arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : { afParameters: {} },
                i = o.oneLinkURL,
                n = o.afParameters,
                r = (n = void 0 === n ? {} : n).mediaSource,
                a = n.campaign,
                l = n.channel,
                s = n.ad,
                h = n.adSet,
                u = n.deepLinkValue,
                d = n.afSub1,
                g = n.afSub2,
                c = n.afSub3,
                p = n.afSub4,
                f = n.afSub5,
                m = n.afCustom,
                _ = n.googleClickIdKey,
                v = o.referrerSkipList,
                C = void 0 === v ? [] : v,
                b = o.urlSkipList,
                y = void 0 === b ? [] : b,
                A =
                    null === (t = i || "") || void 0 === t
                        ? void 0
                        : t.toString().match(AF_URL_SCHEME);
            if (
                !A ||
                (null == A ? void 0 : A.length) < VALID_AF_URL_PARTS_LENGTH
            )
                return (
                    console.error(
                        "oneLinkURL is missing or not in the correct format, can't generate URL",
                        i
                    ),
                    null
                );
            if (
                0 ===
                    (null == r
                        ? void 0
                        : null === (e = r.keys) || void 0 === e
                        ? void 0
                        : e.length) &&
                (null == r || !r.defaultValue)
            )
                return (
                    console.error(
                        "mediaSource is missing (default value was not supplied), can't generate URL",
                        r
                    ),
                    null
                );
            if (
                isSkippedURL({
                    url: document.referrer,
                    skipKeys: C,
                    errorMsg:
                        "Generate url is skipped. HTTP referrer contains key:",
                })
            )
                return null;
            if (
                isSkippedURL({
                    url: document.URL,
                    skipKeys: y,
                    errorMsg: "Generate url is skipped. URL contains string:",
                })
            )
                return null;
            var S = {
                    af_js_web: !0,
                    af_ss_ver: window.AF_SMART_SCRIPT.version,
                },
                w = getURLParametersKV(window.location.search);
            if (r) {
                var O = getParameterValue(w, r);
                if (!O)
                    return (
                        console.error(
                            "mediaSource was not found in the URL and default value was not supplied, can't generate URL",
                            r
                        ),
                        null
                    );
                S.pid = O;
            }
            if (
                (a && (S.c = getParameterValue(w, a)),
                l && (S.af_channel = getParameterValue(w, l)),
                s && (S.af_ad = getParameterValue(w, s)),
                h && (S.af_adset = getParameterValue(w, h)),
                u && (S.deep_link_value = getParameterValue(w, u)),
                [d, g, c, p, f].forEach(function (t, e) {
                    t && (S["af_sub".concat(e + 1)] = getParameterValue(w, t));
                }),
                _)
            )
                if (
                    GCLID_EXCLUDE_PARAMS_KEYS.find(function (t) {
                        return t === _;
                    })
                )
                    console.debug(
                        "Google Click Id ParamKey can't override AF Parameters keys",
                        _
                    );
                else {
                    var k = getGoogleClickIdParameters(_, w);
                    Object.keys(k).forEach(function (t) {
                        S[t] = k[t];
                    });
                }
            Array.isArray(m) &&
                m.forEach(function (t) {
                    if (null != t && t.paramKey) {
                        var e = AF_CUSTOM_EXCLUDE_PARAMS_KEYS.find(function (
                            e
                        ) {
                            return e === (null == t ? void 0 : t.paramKey);
                        });
                        (null == t ? void 0 : t.paramKey) === _ || e
                            ? console.debug(
                                  "Custom parameter ParamKey can't override Google-Click-Id or AF Parameters keys",
                                  t
                              )
                            : (S[[t.paramKey]] = getParameterValue(w, t));
                    }
                });
            var L = i + stringifyParameters(S).replace("&", "?");
            console.debug("Generated OneLink URL", L),
                (window.AF_SMART_SCRIPT.displayQrCode = function (t) {
                    return L
                        ? new QRCode(document.getElementById(t), {
                              text: "".concat(L, "&af_ss_qr=true"),
                          })
                        : (console.debug("ClickURL is not valid"), null);
                });
            var T = (function () {
                if (!L) return console.debug("ClickURL is not valid"), null;
                var t = new URL(L);
                return (t.hostname = "impressions.onelink.me"), t.href;
            })();
            return (
                T &&
                    (window.AF_SMART_SCRIPT.fireImpressionsLink = function () {
                        var t = new Image(1, 1);
                        (t.style.display = "none"),
                            (t.style.position = "absolute"),
                            (t.style.left = "-1px"),
                            (t.style.top = "-1px"),
                            (t.src = T);
                    }),
                { clickURL: L }
            );
        },
        version: formatVersion,
    });
