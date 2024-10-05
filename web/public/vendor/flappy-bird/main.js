var outerPadding = 0;
/*!
 * @license CreateJS
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2011-2013 gskinner.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
(this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c) {
        this.initialize(a, b, c);
      },
      b = a.prototype;
    (b.type = null),
      (b.target = null),
      (b.currentTarget = null),
      (b.eventPhase = 0),
      (b.bubbles = !1),
      (b.cancelable = !1),
      (b.timeStamp = 0),
      (b.defaultPrevented = !1),
      (b.propagationStopped = !1),
      (b.immediatePropagationStopped = !1),
      (b.removed = !1),
      (b.initialize = function (a, b, c) {
        (this.type = a),
          (this.bubbles = b),
          (this.cancelable = c),
          (this.timeStamp = new Date().getTime());
      }),
      (b.preventDefault = function () {
        this.defaultPrevented = !0;
      }),
      (b.stopPropagation = function () {
        this.propagationStopped = !0;
      }),
      (b.stopImmediatePropagation = function () {
        this.immediatePropagationStopped = this.propagationStopped = !0;
      }),
      (b.remove = function () {
        this.removed = !0;
      }),
      (b.clone = function () {
        return new a(this.type, this.bubbles, this.cancelable);
      }),
      (b.toString = function () {
        return "[Event (type=" + this.type + ")]";
      }),
      (createjs.Event = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function () {},
      b = a.prototype;
    (a.initialize = function (a) {
      (a.addEventListener = b.addEventListener),
        (a.on = b.on),
        (a.removeEventListener = a.off = b.removeEventListener),
        (a.removeAllEventListeners = b.removeAllEventListeners),
        (a.hasEventListener = b.hasEventListener),
        (a.dispatchEvent = b.dispatchEvent),
        (a._dispatchEvent = b._dispatchEvent),
        (a.willTrigger = b.willTrigger);
    }),
      (b._listeners = null),
      (b._captureListeners = null),
      (b.initialize = function () {}),
      (b.addEventListener = function (a, b, c) {
        var d;
        d = c
          ? (this._captureListeners = this._captureListeners || {})
          : (this._listeners = this._listeners || {});
        var e = d[a];
        return (
          e && this.removeEventListener(a, b, c),
          (e = d[a]),
          e ? e.push(b) : (d[a] = [b]),
          b
        );
      }),
      (b.on = function (a, b, c, d, e, f) {
        return (
          b.handleEvent && ((c = c || b), (b = b.handleEvent)),
          (c = c || this),
          this.addEventListener(
            a,
            function (a) {
              b.call(c, a, e), d && a.remove();
            },
            f
          )
        );
      }),
      (b.removeEventListener = function (a, b, c) {
        var d = c ? this._captureListeners : this._listeners;
        if (d) {
          var e = d[a];
          if (e)
            for (var f = 0, g = e.length; g > f; f++)
              if (e[f] == b) {
                1 == g ? delete d[a] : e.splice(f, 1);
                break;
              }
        }
      }),
      (b.off = b.removeEventListener),
      (b.removeAllEventListeners = function (a) {
        a
          ? (this._listeners && delete this._listeners[a],
            this._captureListeners && delete this._captureListeners[a])
          : (this._listeners = this._captureListeners = null);
      }),
      (b.dispatchEvent = function (a, b) {
        if ("string" == typeof a) {
          var c = this._listeners;
          if (!c || !c[a]) return !1;
          a = new createjs.Event(a);
        }
        if (((a.target = b || this), a.bubbles && this.parent)) {
          for (var d = this, e = [d]; d.parent; ) e.push((d = d.parent));
          var f,
            g = e.length;
          for (f = g - 1; f >= 0 && !a.propagationStopped; f--)
            e[f]._dispatchEvent(a, 1 + (0 == f));
          for (f = 1; g > f && !a.propagationStopped; f++)
            e[f]._dispatchEvent(a, 3);
        } else this._dispatchEvent(a, 2);
        return a.defaultPrevented;
      }),
      (b.hasEventListener = function (a) {
        var b = this._listeners,
          c = this._captureListeners;
        return !!((b && b[a]) || (c && c[a]));
      }),
      (b.willTrigger = function (a) {
        for (var b = this; b; ) {
          if (b.hasEventListener(a)) return !0;
          b = b.parent;
        }
        return !1;
      }),
      (b.toString = function () {
        return "[EventDispatcher]";
      }),
      (b._dispatchEvent = function (a, b) {
        var c,
          d = 1 == b ? this._captureListeners : this._listeners;
        if (a && d) {
          var e = d[a.type];
          if (!e || !(c = e.length)) return;
          (a.currentTarget = this),
            (a.eventPhase = b),
            (a.removed = !1),
            (e = e.slice());
          for (var f = 0; c > f && !a.immediatePropagationStopped; f++) {
            var g = e[f];
            g.handleEvent ? g.handleEvent(a) : g(a),
              a.removed && (this.off(a.type, g, 1 == b), (a.removed = !1));
          }
        }
      }),
      (createjs.EventDispatcher = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    createjs.indexOf = function (a, b) {
      for (var c = 0, d = a.length; d > c; c++) if (b === a[c]) return c;
      return -1;
    };
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function () {
      throw "UID cannot be instantiated";
    };
    (a._nextID = 0),
      (a.get = function () {
        return a._nextID++;
      }),
      (createjs.UID = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function () {
      throw "Ticker cannot be instantiated.";
    };
    (a.RAF_SYNCHED = "synched"),
      (a.RAF = "raf"),
      (a.TIMEOUT = "timeout"),
      (a.useRAF = !1),
      (a.timingMode = null),
      (a.maxDelta = 0),
      (a.removeEventListener = null),
      (a.removeAllEventListeners = null),
      (a.dispatchEvent = null),
      (a.hasEventListener = null),
      (a._listeners = null),
      createjs.EventDispatcher.initialize(a),
      (a._addEventListener = a.addEventListener),
      (a.addEventListener = function () {
        return !a._inited && a.init(), a._addEventListener.apply(a, arguments);
      }),
      (a._paused = !1),
      (a._inited = !1),
      (a._startTime = 0),
      (a._pausedTime = 0),
      (a._ticks = 0),
      (a._pausedTicks = 0),
      (a._interval = 50),
      (a._lastTime = 0),
      (a._times = null),
      (a._tickTimes = null),
      (a._timerId = null),
      (a._raf = !0),
      (a.init = function () {
        a._inited ||
          ((a._inited = !0),
          (a._times = []),
          (a._tickTimes = []),
          (a._startTime = a._getTime()),
          a._times.push((a._lastTime = 0)),
          a.setInterval(a._interval));
      }),
      (a.reset = function () {
        if (a._raf) {
          var b =
            window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            window.msCancelAnimationFrame;
          b && b(a._timerId);
        } else clearTimeout(a._timerId);
        a.removeAllEventListeners("tick");
      }),
      (a.setInterval = function (b) {
        (a._interval = b), a._inited && a._setupTick();
      }),
      (a.getInterval = function () {
        return a._interval;
      }),
      (a.setFPS = function (b) {
        a.setInterval(1e3 / b);
      }),
      (a.getFPS = function () {
        return 1e3 / a._interval;
      }),
      (a.getMeasuredTickTime = function (b) {
        var c = 0,
          d = a._tickTimes;
        if (d.length < 1) return -1;
        b = Math.min(d.length, b || 0 | a.getFPS());
        for (var e = 0; b > e; e++) c += d[e];
        return c / b;
      }),
      (a.getMeasuredFPS = function (b) {
        var c = a._times;
        return c.length < 2
          ? -1
          : ((b = Math.min(c.length - 1, b || 0 | a.getFPS())),
            1e3 / ((c[0] - c[b]) / b));
      }),
      (a.setPaused = function (b) {
        a._paused = b;
      }),
      (a.getPaused = function () {
        return a._paused;
      }),
      (a.getTime = function (b) {
        return a._getTime() - a._startTime - (b ? a._pausedTime : 0);
      }),
      (a.getEventTime = function (b) {
        return (a._lastTime || a._startTime) - (b ? a._pausedTime : 0);
      }),
      (a.getTicks = function (b) {
        return a._ticks - (b ? a._pausedTicks : 0);
      }),
      (a._handleSynch = function () {
        var b = a._getTime() - a._startTime;
        (a._timerId = null),
          a._setupTick(),
          b - a._lastTime >= 0.97 * (a._interval - 1) && a._tick();
      }),
      (a._handleRAF = function () {
        (a._timerId = null), a._setupTick(), a._tick();
      }),
      (a._handleTimeout = function () {
        (a._timerId = null), a._setupTick(), a._tick();
      }),
      (a._setupTick = function () {
        if (null == a._timerId) {
          var b = a.timingMode || (a.useRAF && a.RAF_SYNCHED);
          if (b == a.RAF_SYNCHED || b == a.RAF) {
            var c =
              window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              window.msRequestAnimationFrame;
            if (c)
              return (
                (a._timerId = c(b == a.RAF ? a._handleRAF : a._handleSynch)),
                (a._raf = !0),
                void 0
              );
          }
          (a._raf = !1),
            (a._timerId = setTimeout(a._handleTimeout, a._interval));
        }
      }),
      (a._tick = function () {
        var b = a._getTime() - a._startTime,
          c = b - a._lastTime,
          d = a._paused;
        if (
          (a._ticks++,
          d && (a._pausedTicks++, (a._pausedTime += c)),
          (a._lastTime = b),
          a.hasEventListener("tick"))
        ) {
          var e = new createjs.Event("tick"),
            f = a.maxDelta;
          (e.delta = f && c > f ? f : c),
            (e.paused = d),
            (e.time = b),
            (e.runTime = b - a._pausedTime),
            a.dispatchEvent(e);
        }
        for (
          a._tickTimes.unshift(a._getTime() - b);
          a._tickTimes.length > 100;

        )
          a._tickTimes.pop();
        for (a._times.unshift(b); a._times.length > 100; ) a._times.pop();
      });
    var b =
      window.performance &&
      (performance.now ||
        performance.mozNow ||
        performance.msNow ||
        performance.oNow ||
        performance.webkitNow);
    (a._getTime = function () {
      return (b && b.call(performance)) || new Date().getTime();
    }),
      (createjs.Ticker = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c, d, e, f, g, h, i, j) {
        this.initialize(a, b, c, d, e, f, g, h, i, j);
      },
      b = (a.prototype = new createjs.Event());
    (b.stageX = 0),
      (b.stageY = 0),
      (b.rawX = 0),
      (b.rawY = 0),
      (b.nativeEvent = null),
      (b.pointerID = 0),
      (b.primary = !1),
      (b.addEventListener = null),
      (b.removeEventListener = null),
      (b.removeAllEventListeners = null),
      (b.dispatchEvent = null),
      (b.hasEventListener = null),
      (b._listeners = null),
      createjs.EventDispatcher.initialize(b),
      (b._get_localX = function () {
        return this.currentTarget.globalToLocal(this.rawX, this.rawY).x;
      }),
      (b._get_localY = function () {
        return this.currentTarget.globalToLocal(this.rawX, this.rawY).y;
      });
    try {
      Object.defineProperties(b, {
        localX: {
          get: b._get_localX,
        },
        localY: {
          get: b._get_localY,
        },
      });
    } catch (c) {}
    (b.Event_initialize = b.initialize),
      (b.initialize = function (a, b, c, d, e, f, g, h, i, j) {
        this.Event_initialize(a, b, c),
          (this.stageX = d),
          (this.stageY = e),
          (this.nativeEvent = f),
          (this.pointerID = g),
          (this.primary = h),
          (this.rawX = null == i ? d : i),
          (this.rawY = null == j ? e : j);
      }),
      (b.clone = function () {
        return new a(
          this.type,
          this.bubbles,
          this.cancelable,
          this.stageX,
          this.stageY,
          this.target,
          this.nativeEvent,
          this.pointerID,
          this.primary,
          this.rawX,
          this.rawY
        );
      }),
      (b.toString = function () {
        return (
          "[MouseEvent (type=" +
          this.type +
          " stageX=" +
          this.stageX +
          " stageY=" +
          this.stageY +
          ")]"
        );
      }),
      (createjs.MouseEvent = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c, d, e, f) {
        this.initialize(a, b, c, d, e, f);
      },
      b = a.prototype;
    (a.identity = null),
      (a.DEG_TO_RAD = Math.PI / 180),
      (b.a = 1),
      (b.b = 0),
      (b.c = 0),
      (b.d = 1),
      (b.tx = 0),
      (b.ty = 0),
      (b.alpha = 1),
      (b.shadow = null),
      (b.compositeOperation = null),
      (b.initialize = function (a, b, c, d, e, f) {
        return (
          (this.a = null == a ? 1 : a),
          (this.b = b || 0),
          (this.c = c || 0),
          (this.d = null == d ? 1 : d),
          (this.tx = e || 0),
          (this.ty = f || 0),
          this
        );
      }),
      (b.prepend = function (a, b, c, d, e, f) {
        var g = this.tx;
        if (1 != a || 0 != b || 0 != c || 1 != d) {
          var h = this.a,
            i = this.c;
          (this.a = h * a + this.b * c),
            (this.b = h * b + this.b * d),
            (this.c = i * a + this.d * c),
            (this.d = i * b + this.d * d);
        }
        return (
          (this.tx = g * a + this.ty * c + e),
          (this.ty = g * b + this.ty * d + f),
          this
        );
      }),
      (b.append = function (a, b, c, d, e, f) {
        var g = this.a,
          h = this.b,
          i = this.c,
          j = this.d;
        return (
          (this.a = a * g + b * i),
          (this.b = a * h + b * j),
          (this.c = c * g + d * i),
          (this.d = c * h + d * j),
          (this.tx = e * g + f * i + this.tx),
          (this.ty = e * h + f * j + this.ty),
          this
        );
      }),
      (b.prependMatrix = function (a) {
        return (
          this.prepend(a.a, a.b, a.c, a.d, a.tx, a.ty),
          this.prependProperties(a.alpha, a.shadow, a.compositeOperation),
          this
        );
      }),
      (b.appendMatrix = function (a) {
        return (
          this.append(a.a, a.b, a.c, a.d, a.tx, a.ty),
          this.appendProperties(a.alpha, a.shadow, a.compositeOperation),
          this
        );
      }),
      (b.prependTransform = function (b, c, d, e, f, g, h, i, j) {
        if (f % 360)
          var k = f * a.DEG_TO_RAD,
            l = Math.cos(k),
            m = Math.sin(k);
        else (l = 1), (m = 0);
        return (
          (i || j) && ((this.tx -= i), (this.ty -= j)),
          g || h
            ? ((g *= a.DEG_TO_RAD),
              (h *= a.DEG_TO_RAD),
              this.prepend(l * d, m * d, -m * e, l * e, 0, 0),
              this.prepend(
                Math.cos(h),
                Math.sin(h),
                -Math.sin(g),
                Math.cos(g),
                b,
                c
              ))
            : this.prepend(l * d, m * d, -m * e, l * e, b, c),
          this
        );
      }),
      (b.appendTransform = function (b, c, d, e, f, g, h, i, j) {
        if (f % 360)
          var k = f * a.DEG_TO_RAD,
            l = Math.cos(k),
            m = Math.sin(k);
        else (l = 1), (m = 0);
        return (
          g || h
            ? ((g *= a.DEG_TO_RAD),
              (h *= a.DEG_TO_RAD),
              this.append(
                Math.cos(h),
                Math.sin(h),
                -Math.sin(g),
                Math.cos(g),
                b,
                c
              ),
              this.append(l * d, m * d, -m * e, l * e, 0, 0))
            : this.append(l * d, m * d, -m * e, l * e, b, c),
          (i || j) &&
            ((this.tx -= i * this.a + j * this.c),
            (this.ty -= i * this.b + j * this.d)),
          this
        );
      }),
      (b.rotate = function (a) {
        var b = Math.cos(a),
          c = Math.sin(a),
          d = this.a,
          e = this.c,
          f = this.tx;
        return (
          (this.a = d * b - this.b * c),
          (this.b = d * c + this.b * b),
          (this.c = e * b - this.d * c),
          (this.d = e * c + this.d * b),
          (this.tx = f * b - this.ty * c),
          (this.ty = f * c + this.ty * b),
          this
        );
      }),
      (b.skew = function (b, c) {
        return (
          (b *= a.DEG_TO_RAD),
          (c *= a.DEG_TO_RAD),
          this.append(
            Math.cos(c),
            Math.sin(c),
            -Math.sin(b),
            Math.cos(b),
            0,
            0
          ),
          this
        );
      }),
      (b.scale = function (a, b) {
        return (
          (this.a *= a),
          (this.d *= b),
          (this.c *= a),
          (this.b *= b),
          (this.tx *= a),
          (this.ty *= b),
          this
        );
      }),
      (b.translate = function (a, b) {
        return (this.tx += a), (this.ty += b), this;
      }),
      (b.identity = function () {
        return (
          (this.alpha = this.a = this.d = 1),
          (this.b = this.c = this.tx = this.ty = 0),
          (this.shadow = this.compositeOperation = null),
          this
        );
      }),
      (b.invert = function () {
        var a = this.a,
          b = this.b,
          c = this.c,
          d = this.d,
          e = this.tx,
          f = a * d - b * c;
        return (
          (this.a = d / f),
          (this.b = -b / f),
          (this.c = -c / f),
          (this.d = a / f),
          (this.tx = (c * this.ty - d * e) / f),
          (this.ty = -(a * this.ty - b * e) / f),
          this
        );
      }),
      (b.isIdentity = function () {
        return (
          0 == this.tx &&
          0 == this.ty &&
          1 == this.a &&
          0 == this.b &&
          0 == this.c &&
          1 == this.d
        );
      }),
      (b.transformPoint = function (a, b, c) {
        return (
          (c = c || {}),
          (c.x = a * this.a + b * this.c + this.tx),
          (c.y = a * this.b + b * this.d + this.ty),
          c
        );
      }),
      (b.decompose = function (b) {
        null == b && (b = {}),
          (b.x = this.tx),
          (b.y = this.ty),
          (b.scaleX = Math.sqrt(this.a * this.a + this.b * this.b)),
          (b.scaleY = Math.sqrt(this.c * this.c + this.d * this.d));
        var c = Math.atan2(-this.c, this.d),
          d = Math.atan2(this.b, this.a);
        return (
          c == d
            ? ((b.rotation = d / a.DEG_TO_RAD),
              this.a < 0 &&
                this.d >= 0 &&
                (b.rotation += b.rotation <= 0 ? 180 : -180),
              (b.skewX = b.skewY = 0))
            : ((b.skewX = c / a.DEG_TO_RAD), (b.skewY = d / a.DEG_TO_RAD)),
          b
        );
      }),
      (b.reinitialize = function (a, b, c, d, e, f, g, h, i) {
        return (
          this.initialize(a, b, c, d, e, f),
          (this.alpha = null == g ? 1 : g),
          (this.shadow = h),
          (this.compositeOperation = i),
          this
        );
      }),
      (b.copy = function (a) {
        return this.reinitialize(
          a.a,
          a.b,
          a.c,
          a.d,
          a.tx,
          a.ty,
          a.alpha,
          a.shadow,
          a.compositeOperation
        );
      }),
      (b.appendProperties = function (a, b, c) {
        return (
          (this.alpha *= a),
          (this.shadow = b || this.shadow),
          (this.compositeOperation = c || this.compositeOperation),
          this
        );
      }),
      (b.prependProperties = function (a, b, c) {
        return (
          (this.alpha *= a),
          (this.shadow = this.shadow || b),
          (this.compositeOperation = this.compositeOperation || c),
          this
        );
      }),
      (b.clone = function () {
        return new a().copy(this);
      }),
      (b.toString = function () {
        return (
          "[Matrix2D (a=" +
          this.a +
          " b=" +
          this.b +
          " c=" +
          this.c +
          " d=" +
          this.d +
          " tx=" +
          this.tx +
          " ty=" +
          this.ty +
          ")]"
        );
      }),
      (a.identity = new a()),
      (createjs.Matrix2D = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b) {
        this.initialize(a, b);
      },
      b = a.prototype;
    (b.x = 0),
      (b.y = 0),
      (b.initialize = function (a, b) {
        return (this.x = null == a ? 0 : a), (this.y = null == b ? 0 : b), this;
      }),
      (b.copy = function (a) {
        return this.initialize(a.x, a.y);
      }),
      (b.clone = function () {
        return new a(this.x, this.y);
      }),
      (b.toString = function () {
        return "[Point (x=" + this.x + " y=" + this.y + ")]";
      }),
      (createjs.Point = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c, d) {
        this.initialize(a, b, c, d);
      },
      b = a.prototype;
    (b.x = 0),
      (b.y = 0),
      (b.width = 0),
      (b.height = 0),
      (b.initialize = function (a, b, c, d) {
        return (
          (this.x = a || 0),
          (this.y = b || 0),
          (this.width = c || 0),
          (this.height = d || 0),
          this
        );
      }),
      (b.copy = function (a) {
        return this.initialize(a.x, a.y, a.width, a.height);
      }),
      (b.clone = function () {
        return new a(this.x, this.y, this.width, this.height);
      }),
      (b.toString = function () {
        return (
          "[Rectangle (x=" +
          this.x +
          " y=" +
          this.y +
          " width=" +
          this.width +
          " height=" +
          this.height +
          ")]"
        );
      }),
      (createjs.Rectangle = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c, d, e, f, g) {
        this.initialize(a, b, c, d, e, f, g);
      },
      b = a.prototype;
    (b.target = null),
      (b.overLabel = null),
      (b.outLabel = null),
      (b.downLabel = null),
      (b.play = !1),
      (b._isPressed = !1),
      (b._isOver = !1),
      (b.initialize = function (a, b, c, d, e, f, g) {
        a.addEventListener &&
          ((this.target = a),
          (a.cursor = "pointer"),
          (this.overLabel = null == c ? "over" : c),
          (this.outLabel = null == b ? "out" : b),
          (this.downLabel = null == d ? "down" : d),
          (this.play = e),
          this.setEnabled(!0),
          this.handleEvent({}),
          f &&
            (g && ((f.actionsEnabled = !1), f.gotoAndStop && f.gotoAndStop(g)),
            (a.hitArea = f)));
      }),
      (b.setEnabled = function (a) {
        var b = this.target;
        a
          ? (b.addEventListener("rollover", this),
            b.addEventListener("rollout", this),
            b.addEventListener("mousedown", this),
            b.addEventListener("pressup", this))
          : (b.removeEventListener("rollover", this),
            b.removeEventListener("rollout", this),
            b.removeEventListener("mousedown", this),
            b.removeEventListener("pressup", this));
      }),
      (b.toString = function () {
        return "[ButtonHelper]";
      }),
      (b.handleEvent = function (a) {
        var b,
          c = this.target,
          d = a.type;
        "mousedown" == d
          ? ((this._isPressed = !0), (b = this.downLabel))
          : "pressup" == d
          ? ((this._isPressed = !1),
            (b = this._isOver ? this.overLabel : this.outLabel))
          : "rollover" == d
          ? ((this._isOver = !0),
            (b = this._isPressed ? this.downLabel : this.overLabel))
          : ((this._isOver = !1),
            (b = this._isPressed ? this.overLabel : this.outLabel)),
          this.play
            ? c.gotoAndPlay && c.gotoAndPlay(b)
            : c.gotoAndStop && c.gotoAndStop(b);
      }),
      (createjs.ButtonHelper = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c, d) {
        this.initialize(a, b, c, d);
      },
      b = a.prototype;
    (a.identity = null),
      (b.color = null),
      (b.offsetX = 0),
      (b.offsetY = 0),
      (b.blur = 0),
      (b.initialize = function (a, b, c, d) {
        (this.color = a),
          (this.offsetX = b),
          (this.offsetY = c),
          (this.blur = d);
      }),
      (b.toString = function () {
        return "[Shadow]";
      }),
      (b.clone = function () {
        return new a(this.color, this.offsetX, this.offsetY, this.blur);
      }),
      (a.identity = new a("transparent", 0, 0, 0)),
      (createjs.Shadow = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a) {
        this.initialize(a);
      },
      b = (a.prototype = new createjs.EventDispatcher());
    (b.complete = !0),
      (b.framerate = 0),
      (b._animations = null),
      (b._frames = null),
      (b._images = null),
      (b._data = null),
      (b._loadCount = 0),
      (b._frameHeight = 0),
      (b._frameWidth = 0),
      (b._numFrames = 0),
      (b._regX = 0),
      (b._regY = 0),
      (b.initialize = function (a) {
        var b, c, d, e;
        if (null != a) {
          if (
            ((this.framerate = a.framerate || 0),
            a.images && (c = a.images.length) > 0)
          )
            for (e = this._images = [], b = 0; c > b; b++) {
              var f = a.images[b];
              if ("string" == typeof f) {
                var g = f;
                (f = document.createElement("img")), (f.src = g);
              }
              e.push(f),
                f.getContext ||
                  f.complete ||
                  (this._loadCount++,
                  (this.complete = !1),
                  (function (a) {
                    f.onload = function () {
                      a._handleImageLoad();
                    };
                  })(this));
            }
          if (null == a.frames);
          else if (a.frames instanceof Array)
            for (
              this._frames = [], e = a.frames, b = 0, c = e.length;
              c > b;
              b++
            ) {
              var h = e[b];
              this._frames.push({
                image: this._images[h[4] ? h[4] : 0],
                rect: new createjs.Rectangle(h[0], h[1], h[2], h[3]),
                regX: h[5] || 0,
                regY: h[6] || 0,
              });
            }
          else
            (d = a.frames),
              (this._frameWidth = d.width),
              (this._frameHeight = d.height),
              (this._regX = d.regX || 0),
              (this._regY = d.regY || 0),
              (this._numFrames = d.count),
              0 == this._loadCount && this._calculateFrames();
          if (((this._animations = []), null != (d = a.animations))) {
            this._data = {};
            var i;
            for (i in d) {
              var j = {
                  name: i,
                },
                k = d[i];
              if ("number" == typeof k) e = j.frames = [k];
              else if (k instanceof Array)
                if (1 == k.length) j.frames = [k[0]];
                else
                  for (
                    j.speed = k[3], j.next = k[2], e = j.frames = [], b = k[0];
                    b <= k[1];
                    b++
                  )
                    e.push(b);
              else {
                (j.speed = k.speed), (j.next = k.next);
                var l = k.frames;
                e = j.frames = "number" == typeof l ? [l] : l.slice(0);
              }
              (j.next === !0 || void 0 === j.next) && (j.next = i),
                (j.next === !1 || (e.length < 2 && j.next == i)) &&
                  (j.next = null),
                j.speed || (j.speed = 1),
                this._animations.push(i),
                (this._data[i] = j);
            }
          }
        }
      }),
      (b.getNumFrames = function (a) {
        if (null == a)
          return this._frames ? this._frames.length : this._numFrames;
        var b = this._data[a];
        return null == b ? 0 : b.frames.length;
      }),
      (b.getAnimations = function () {
        return this._animations.slice(0);
      }),
      (b.getAnimation = function (a) {
        return this._data[a];
      }),
      (b.getFrame = function (a) {
        var b;
        return this._frames && (b = this._frames[a]) ? b : null;
      }),
      (b.getFrameBounds = function (a, b) {
        var c = this.getFrame(a);
        return c
          ? (b || new createjs.Rectangle()).initialize(
              -c.regX,
              -c.regY,
              c.rect.width,
              c.rect.height
            )
          : null;
      }),
      (b.toString = function () {
        return "[SpriteSheet]";
      }),
      (b.clone = function () {
        var b = new a();
        return (
          (b.complete = this.complete),
          (b._animations = this._animations),
          (b._frames = this._frames),
          (b._images = this._images),
          (b._data = this._data),
          (b._frameHeight = this._frameHeight),
          (b._frameWidth = this._frameWidth),
          (b._numFrames = this._numFrames),
          (b._loadCount = this._loadCount),
          b
        );
      }),
      (b._handleImageLoad = function () {
        0 == --this._loadCount &&
          (this._calculateFrames(),
          (this.complete = !0),
          this.dispatchEvent("complete"));
      }),
      (b._calculateFrames = function () {
        if (!this._frames && 0 != this._frameWidth) {
          this._frames = [];
          for (
            var a = 0,
              b = this._frameWidth,
              c = this._frameHeight,
              d = 0,
              e = this._images;
            d < e.length;
            d++
          ) {
            for (
              var f = e[d],
                g = 0 | (f.width / b),
                h = 0 | (f.height / c),
                i =
                  this._numFrames > 0
                    ? Math.min(this._numFrames - a, g * h)
                    : g * h,
                j = 0;
              i > j;
              j++
            )
              this._frames.push({
                image: f,
                rect: new createjs.Rectangle(
                  (j % g) * b,
                  (0 | (j / g)) * c,
                  b,
                  c
                ),
                regX: this._regX,
                regY: this._regY,
              });
            a += i;
          }
          this._numFrames = a;
        }
      }),
      (createjs.SpriteSheet = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function a(a, b, c) {
      (this.f = a), (this.params = b), (this.path = null == c ? !0 : c);
    }
    a.prototype.exec = function (a) {
      this.f.apply(a, this.params);
    };
    var b = function () {
        this.initialize();
      },
      c = b.prototype;
    (b.getRGB = function (a, b, c, d) {
      return (
        null != a &&
          null == c &&
          ((d = b), (c = 255 & a), (b = 255 & (a >> 8)), (a = 255 & (a >> 16))),
        null == d
          ? "rgb(" + a + "," + b + "," + c + ")"
          : "rgba(" + a + "," + b + "," + c + "," + d + ")"
      );
    }),
      (b.getHSL = function (a, b, c, d) {
        return null == d
          ? "hsl(" + (a % 360) + "," + b + "%," + c + "%)"
          : "hsla(" + (a % 360) + "," + b + "%," + c + "%," + d + ")";
      }),
      (b.Command = a),
      (b.BASE_64 = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        F: 5,
        G: 6,
        H: 7,
        I: 8,
        J: 9,
        K: 10,
        L: 11,
        M: 12,
        N: 13,
        O: 14,
        P: 15,
        Q: 16,
        R: 17,
        S: 18,
        T: 19,
        U: 20,
        V: 21,
        W: 22,
        X: 23,
        Y: 24,
        Z: 25,
        a: 26,
        b: 27,
        c: 28,
        d: 29,
        e: 30,
        f: 31,
        g: 32,
        h: 33,
        i: 34,
        j: 35,
        k: 36,
        l: 37,
        m: 38,
        n: 39,
        o: 40,
        p: 41,
        q: 42,
        r: 43,
        s: 44,
        t: 45,
        u: 46,
        v: 47,
        w: 48,
        x: 49,
        y: 50,
        z: 51,
        0: 52,
        1: 53,
        2: 54,
        3: 55,
        4: 56,
        5: 57,
        6: 58,
        7: 59,
        8: 60,
        9: 61,
        "+": 62,
        "/": 63,
      }),
      (b.STROKE_CAPS_MAP = ["butt", "round", "square"]),
      (b.STROKE_JOINTS_MAP = ["miter", "round", "bevel"]);
    var d = createjs.createCanvas
      ? createjs.createCanvas()
      : document.createElement("canvas");
    if (d.getContext) {
      var e = (b._ctx = d.getContext("2d"));
      (b.beginCmd = new a(e.beginPath, [], !1)),
        (b.fillCmd = new a(e.fill, [], !1)),
        (b.strokeCmd = new a(e.stroke, [], !1)),
        (d.width = d.height = 1);
    }
    (c._strokeInstructions = null),
      (c._strokeStyleInstructions = null),
      (c._strokeIgnoreScale = !1),
      (c._fillInstructions = null),
      (c._fillMatrix = null),
      (c._instructions = null),
      (c._oldInstructions = null),
      (c._activeInstructions = null),
      (c._active = !1),
      (c._dirty = !1),
      (c.initialize = function () {
        this.clear(), (this._ctx = b._ctx);
      }),
      (c.isEmpty = function () {
        return !(
          this._instructions.length ||
          this._oldInstructions.length ||
          this._activeInstructions.length
        );
      }),
      (c.draw = function (a) {
        this._dirty && this._updateInstructions();
        for (var b = this._instructions, c = 0, d = b.length; d > c; c++)
          b[c].exec(a);
      }),
      (c.drawAsPath = function (a) {
        this._dirty && this._updateInstructions();
        for (var b, c = this._instructions, d = 0, e = c.length; e > d; d++)
          ((b = c[d]).path || 0 == d) && b.exec(a);
      }),
      (c.moveTo = function (b, c) {
        return (
          this._activeInstructions.push(new a(this._ctx.moveTo, [b, c])), this
        );
      }),
      (c.lineTo = function (b, c) {
        return (
          (this._dirty = this._active = !0),
          this._activeInstructions.push(new a(this._ctx.lineTo, [b, c])),
          this
        );
      }),
      (c.arcTo = function (b, c, d, e, f) {
        return (
          (this._dirty = this._active = !0),
          this._activeInstructions.push(
            new a(this._ctx.arcTo, [b, c, d, e, f])
          ),
          this
        );
      }),
      (c.arc = function (b, c, d, e, f, g) {
        return (
          (this._dirty = this._active = !0),
          null == g && (g = !1),
          this._activeInstructions.push(
            new a(this._ctx.arc, [b, c, d, e, f, g])
          ),
          this
        );
      }),
      (c.quadraticCurveTo = function (b, c, d, e) {
        return (
          (this._dirty = this._active = !0),
          this._activeInstructions.push(
            new a(this._ctx.quadraticCurveTo, [b, c, d, e])
          ),
          this
        );
      }),
      (c.bezierCurveTo = function (b, c, d, e, f, g) {
        return (
          (this._dirty = this._active = !0),
          this._activeInstructions.push(
            new a(this._ctx.bezierCurveTo, [b, c, d, e, f, g])
          ),
          this
        );
      }),
      (c.rect = function (b, c, d, e) {
        return (
          (this._dirty = this._active = !0),
          this._activeInstructions.push(new a(this._ctx.rect, [b, c, d, e])),
          this
        );
      }),
      (c.closePath = function () {
        return (
          this._active &&
            ((this._dirty = !0),
            this._activeInstructions.push(new a(this._ctx.closePath, []))),
          this
        );
      }),
      (c.clear = function () {
        return (
          (this._instructions = []),
          (this._oldInstructions = []),
          (this._activeInstructions = []),
          (this._strokeStyleInstructions =
            this._strokeInstructions =
            this._fillInstructions =
            this._fillMatrix =
              null),
          (this._active = this._dirty = this._strokeIgnoreScale = !1),
          this
        );
      }),
      (c.beginFill = function (b) {
        return (
          this._active && this._newPath(),
          (this._fillInstructions = b
            ? [new a(this._setProp, ["fillStyle", b], !1)]
            : null),
          (this._fillMatrix = null),
          this
        );
      }),
      (c.beginLinearGradientFill = function (b, c, d, e, f, g) {
        this._active && this._newPath();
        for (
          var h = this._ctx.createLinearGradient(d, e, f, g),
            i = 0,
            j = b.length;
          j > i;
          i++
        )
          h.addColorStop(c[i], b[i]);
        return (
          (this._fillInstructions = [
            new a(this._setProp, ["fillStyle", h], !1),
          ]),
          (this._fillMatrix = null),
          this
        );
      }),
      (c.beginRadialGradientFill = function (b, c, d, e, f, g, h, i) {
        this._active && this._newPath();
        for (
          var j = this._ctx.createRadialGradient(d, e, f, g, h, i),
            k = 0,
            l = b.length;
          l > k;
          k++
        )
          j.addColorStop(c[k], b[k]);
        return (
          (this._fillInstructions = [
            new a(this._setProp, ["fillStyle", j], !1),
          ]),
          (this._fillMatrix = null),
          this
        );
      }),
      (c.beginBitmapFill = function (b, c, d) {
        this._active && this._newPath(), (c = c || "");
        var e = this._ctx.createPattern(b, c);
        return (
          (this._fillInstructions = [
            new a(this._setProp, ["fillStyle", e], !1),
          ]),
          (this._fillMatrix = d ? [d.a, d.b, d.c, d.d, d.tx, d.ty] : null),
          this
        );
      }),
      (c.endFill = function () {
        return this.beginFill();
      }),
      (c.setStrokeStyle = function (c, d, e, f, g) {
        return (
          this._active && this._newPath(),
          (this._strokeStyleInstructions = [
            new a(this._setProp, ["lineWidth", null == c ? "1" : c], !1),
            new a(
              this._setProp,
              [
                "lineCap",
                null == d ? "butt" : isNaN(d) ? d : b.STROKE_CAPS_MAP[d],
              ],
              !1
            ),
            new a(
              this._setProp,
              [
                "lineJoin",
                null == e ? "miter" : isNaN(e) ? e : b.STROKE_JOINTS_MAP[e],
              ],
              !1
            ),
            new a(this._setProp, ["miterLimit", null == f ? "10" : f], !1),
          ]),
          (this._strokeIgnoreScale = g),
          this
        );
      }),
      (c.beginStroke = function (b) {
        return (
          this._active && this._newPath(),
          (this._strokeInstructions = b
            ? [new a(this._setProp, ["strokeStyle", b], !1)]
            : null),
          this
        );
      }),
      (c.beginLinearGradientStroke = function (b, c, d, e, f, g) {
        this._active && this._newPath();
        for (
          var h = this._ctx.createLinearGradient(d, e, f, g),
            i = 0,
            j = b.length;
          j > i;
          i++
        )
          h.addColorStop(c[i], b[i]);
        return (
          (this._strokeInstructions = [
            new a(this._setProp, ["strokeStyle", h], !1),
          ]),
          this
        );
      }),
      (c.beginRadialGradientStroke = function (b, c, d, e, f, g, h, i) {
        this._active && this._newPath();
        for (
          var j = this._ctx.createRadialGradient(d, e, f, g, h, i),
            k = 0,
            l = b.length;
          l > k;
          k++
        )
          j.addColorStop(c[k], b[k]);
        return (
          (this._strokeInstructions = [
            new a(this._setProp, ["strokeStyle", j], !1),
          ]),
          this
        );
      }),
      (c.beginBitmapStroke = function (b, c) {
        this._active && this._newPath(), (c = c || "");
        var d = this._ctx.createPattern(b, c);
        return (
          (this._strokeInstructions = [
            new a(this._setProp, ["strokeStyle", d], !1),
          ]),
          this
        );
      }),
      (c.endStroke = function () {
        return this.beginStroke(), this;
      }),
      (c.curveTo = c.quadraticCurveTo),
      (c.drawRect = c.rect),
      (c.drawRoundRect = function (a, b, c, d, e) {
        return this.drawRoundRectComplex(a, b, c, d, e, e, e, e), this;
      }),
      (c.drawRoundRectComplex = function (b, c, d, e, f, g, h, i) {
        var j = (e > d ? d : e) / 2,
          k = 0,
          l = 0,
          m = 0,
          n = 0;
        0 > f && (f *= k = -1),
          f > j && (f = j),
          0 > g && (g *= l = -1),
          g > j && (g = j),
          0 > h && (h *= m = -1),
          h > j && (h = j),
          0 > i && (i *= n = -1),
          i > j && (i = j),
          (this._dirty = this._active = !0);
        var o = this._ctx.arcTo,
          p = this._ctx.lineTo;
        return (
          this._activeInstructions.push(
            new a(this._ctx.moveTo, [b + d - g, c]),
            new a(o, [b + d + g * l, c - g * l, b + d, c + g, g]),
            new a(p, [b + d, c + e - h]),
            new a(o, [b + d + h * m, c + e + h * m, b + d - h, c + e, h]),
            new a(p, [b + i, c + e]),
            new a(o, [b - i * n, c + e + i * n, b, c + e - i, i]),
            new a(p, [b, c + f]),
            new a(o, [b - f * k, c - f * k, b + f, c, f]),
            new a(this._ctx.closePath)
          ),
          this
        );
      }),
      (c.drawCircle = function (a, b, c) {
        return this.arc(a, b, c, 0, 2 * Math.PI), this;
      }),
      (c.drawEllipse = function (b, c, d, e) {
        this._dirty = this._active = !0;
        var f = 0.5522848,
          g = (d / 2) * f,
          h = (e / 2) * f,
          i = b + d,
          j = c + e,
          k = b + d / 2,
          l = c + e / 2;
        return (
          this._activeInstructions.push(
            new a(this._ctx.moveTo, [b, l]),
            new a(this._ctx.bezierCurveTo, [b, l - h, k - g, c, k, c]),
            new a(this._ctx.bezierCurveTo, [k + g, c, i, l - h, i, l]),
            new a(this._ctx.bezierCurveTo, [i, l + h, k + g, j, k, j]),
            new a(this._ctx.bezierCurveTo, [k - g, j, b, l + h, b, l])
          ),
          this
        );
      }),
      (c.inject = function (b, c) {
        return (
          (this._dirty = this._active = !0),
          this._activeInstructions.push(new a(b, [c])),
          this
        );
      }),
      (c.drawPolyStar = function (b, c, d, e, f, g) {
        (this._dirty = this._active = !0),
          null == f && (f = 0),
          (f = 1 - f),
          null == g ? (g = 0) : (g /= 180 / Math.PI);
        var h = Math.PI / e;
        this._activeInstructions.push(
          new a(this._ctx.moveTo, [b + Math.cos(g) * d, c + Math.sin(g) * d])
        );
        for (var i = 0; e > i; i++)
          (g += h),
            1 != f &&
              this._activeInstructions.push(
                new a(this._ctx.lineTo, [
                  b + Math.cos(g) * d * f,
                  c + Math.sin(g) * d * f,
                ])
              ),
            (g += h),
            this._activeInstructions.push(
              new a(this._ctx.lineTo, [
                b + Math.cos(g) * d,
                c + Math.sin(g) * d,
              ])
            );
        return this;
      }),
      (c.decodePath = function (a) {
        for (
          var c = [
              this.moveTo,
              this.lineTo,
              this.quadraticCurveTo,
              this.bezierCurveTo,
              this.closePath,
            ],
            d = [2, 2, 4, 6, 0],
            e = 0,
            f = a.length,
            g = [],
            h = 0,
            i = 0,
            j = b.BASE_64;
          f > e;

        ) {
          var k = a.charAt(e),
            l = j[k],
            m = l >> 3,
            n = c[m];
          if (!n || 3 & l) throw "bad path data (@" + e + "): " + k;
          var o = d[m];
          m || (h = i = 0), (g.length = 0), e++;
          for (var p = (1 & (l >> 2)) + 2, q = 0; o > q; q++) {
            var r = j[a.charAt(e)],
              s = r >> 5 ? -1 : 1;
            (r = ((31 & r) << 6) | j[a.charAt(e + 1)]),
              3 == p && (r = (r << 6) | j[a.charAt(e + 2)]),
              (r = (s * r) / 10),
              q % 2 ? (h = r += h) : (i = r += i),
              (g[q] = r),
              (e += p);
          }
          n.apply(this, g);
        }
        return this;
      }),
      (c.clone = function () {
        var a = new b();
        return (
          (a._instructions = this._instructions.slice()),
          (a._activeInstructions = this._activeInstructions.slice()),
          (a._oldInstructions = this._oldInstructions.slice()),
          this._fillInstructions &&
            (a._fillInstructions = this._fillInstructions.slice()),
          this._strokeInstructions &&
            (a._strokeInstructions = this._strokeInstructions.slice()),
          this._strokeStyleInstructions &&
            (a._strokeStyleInstructions =
              this._strokeStyleInstructions.slice()),
          (a._active = this._active),
          (a._dirty = this._dirty),
          (a._fillMatrix = this._fillMatrix),
          (a._strokeIgnoreScale = this._strokeIgnoreScale),
          a
        );
      }),
      (c.toString = function () {
        return "[Graphics]";
      }),
      (c.mt = c.moveTo),
      (c.lt = c.lineTo),
      (c.at = c.arcTo),
      (c.bt = c.bezierCurveTo),
      (c.qt = c.quadraticCurveTo),
      (c.a = c.arc),
      (c.r = c.rect),
      (c.cp = c.closePath),
      (c.c = c.clear),
      (c.f = c.beginFill),
      (c.lf = c.beginLinearGradientFill),
      (c.rf = c.beginRadialGradientFill),
      (c.bf = c.beginBitmapFill),
      (c.ef = c.endFill),
      (c.ss = c.setStrokeStyle),
      (c.s = c.beginStroke),
      (c.ls = c.beginLinearGradientStroke),
      (c.rs = c.beginRadialGradientStroke),
      (c.bs = c.beginBitmapStroke),
      (c.es = c.endStroke),
      (c.dr = c.drawRect),
      (c.rr = c.drawRoundRect),
      (c.rc = c.drawRoundRectComplex),
      (c.dc = c.drawCircle),
      (c.de = c.drawEllipse),
      (c.dp = c.drawPolyStar),
      (c.p = c.decodePath),
      (c._updateInstructions = function () {
        (this._instructions = this._oldInstructions.slice()),
          this._instructions.push(b.beginCmd),
          this._appendInstructions(this._fillInstructions),
          this._appendInstructions(this._strokeInstructions),
          this._appendInstructions(
            this._strokeInstructions && this._strokeStyleInstructions
          ),
          this._appendInstructions(this._activeInstructions),
          this._fillInstructions &&
            this._appendDraw(b.fillCmd, this._fillMatrix),
          this._strokeInstructions &&
            this._appendDraw(
              b.strokeCmd,
              this._strokeIgnoreScale && [1, 0, 0, 1, 0, 0]
            );
      }),
      (c._appendInstructions = function (a) {
        a && this._instructions.push.apply(this._instructions, a);
      }),
      (c._appendDraw = function (b, c) {
        c
          ? this._instructions.push(
              new a(this._ctx.save, [], !1),
              new a(this._ctx.transform, c, !1),
              b,
              new a(this._ctx.restore, [], !1)
            )
          : this._instructions.push(b);
      }),
      (c._newPath = function () {
        this._dirty && this._updateInstructions(),
          (this._oldInstructions = this._instructions),
          (this._activeInstructions = []),
          (this._active = this._dirty = !1);
      }),
      (c._setProp = function (a, b) {
        this[a] = b;
      }),
      (createjs.Graphics = b);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    var a = function () {
        this.initialize();
      },
      b = (a.prototype = new createjs.EventDispatcher());
    (a._MOUSE_EVENTS = [
      "click",
      "dblclick",
      "mousedown",
      "mouseout",
      "mouseover",
      "pressmove",
      "pressup",
      "rollout",
      "rollover",
    ]),
      (a.suppressCrossDomainErrors = !1);
    var c = createjs.createCanvas
      ? createjs.createCanvas()
      : document.createElement("canvas");
    c.getContext &&
      ((a._hitTestCanvas = c),
      (a._hitTestContext = c.getContext("2d")),
      (c.width = c.height = 1)),
      (a._nextCacheID = 1),
      (b.alpha = 1),
      (b.cacheCanvas = null),
      (b.id = -1),
      (b.mouseEnabled = !0),
      (b.tickEnabled = !0),
      (b.name = null),
      (b.parent = null),
      (b.regX = 0),
      (b.regY = 0),
      (b.rotation = 0),
      (b.scaleX = 1),
      (b.scaleY = 1),
      (b.skewX = 0),
      (b.skewY = 0),
      (b.shadow = null),
      (b.visible = !0),
      (b.x = 0),
      (b.y = 0),
      (b.compositeOperation = null),
      (b.snapToPixel = !1),
      (b.filters = null),
      (b.cacheID = 0),
      (b.mask = null),
      (b.hitArea = null),
      (b.cursor = null),
      (b._cacheOffsetX = 0),
      (b._cacheOffsetY = 0),
      (b._cacheScale = 1),
      (b._cacheDataURLID = 0),
      (b._cacheDataURL = null),
      (b._matrix = null),
      (b._rectangle = null),
      (b._bounds = null),
      (b.initialize = function () {
        (this.id = createjs.UID.get()),
          (this._matrix = new createjs.Matrix2D()),
          (this._rectangle = new createjs.Rectangle());
      }),
      (b.isVisible = function () {
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY
        );
      }),
      (b.draw = function (a, b) {
        var c = this.cacheCanvas;
        if (b || !c) return !1;
        var d,
          e = this._cacheScale,
          f = this._cacheOffsetX,
          g = this._cacheOffsetY;
        return (
          (d = this._applyFilterBounds(f, g, 0, 0)) && ((f = d.x), (g = d.y)),
          a.drawImage(c, f, g, c.width / e, c.height / e),
          !0
        );
      }),
      (b.updateContext = function (a) {
        var b,
          c = this.mask,
          d = this;
        c &&
          c.graphics &&
          !c.graphics.isEmpty() &&
          ((b = c.getMatrix(c._matrix)),
          a.transform(b.a, b.b, b.c, b.d, b.tx, b.ty),
          c.graphics.drawAsPath(a),
          a.clip(),
          b.invert(),
          a.transform(b.a, b.b, b.c, b.d, b.tx, b.ty)),
          (b = d._matrix
            .identity()
            .appendTransform(
              d.x,
              d.y,
              d.scaleX,
              d.scaleY,
              d.rotation,
              d.skewX,
              d.skewY,
              d.regX,
              d.regY
            )),
          createjs.Stage._snapToPixelEnabled && d.snapToPixel
            ? a.transform(
                b.a,
                b.b,
                b.c,
                b.d,
                0 | (b.tx + 0.5),
                0 | (b.ty + 0.5)
              )
            : a.transform(b.a, b.b, b.c, b.d, b.tx, b.ty),
          (a.globalAlpha *= d.alpha),
          d.compositeOperation &&
            (a.globalCompositeOperation = d.compositeOperation),
          d.shadow && this._applyShadow(a, d.shadow);
      }),
      (b.cache = function (a, b, c, d, e) {
        (e = e || 1),
          this.cacheCanvas ||
            (this.cacheCanvas = createjs.createCanvas
              ? createjs.createCanvas()
              : document.createElement("canvas")),
          (this._cacheWidth = c),
          (this._cacheHeight = d),
          (this._cacheOffsetX = a),
          (this._cacheOffsetY = b),
          (this._cacheScale = e),
          this.updateCache();
      }),
      (b.updateCache = function (b) {
        var c,
          d = this.cacheCanvas,
          e = this._cacheScale,
          f = this._cacheOffsetX * e,
          g = this._cacheOffsetY * e,
          h = this._cacheWidth,
          i = this._cacheHeight;
        if (!d) throw "cache() must be called before updateCache()";
        var j = d.getContext("2d");
        (c = this._applyFilterBounds(f, g, h, i)) &&
          ((f = c.x), (g = c.y), (h = c.width), (i = c.height)),
          (h = Math.ceil(h * e)),
          (i = Math.ceil(i * e)),
          h != d.width || i != d.height
            ? ((d.width = h), (d.height = i))
            : b || j.clearRect(0, 0, h + 1, i + 1),
          j.save(),
          (j.globalCompositeOperation = b),
          j.setTransform(e, 0, 0, e, -f, -g),
          this.draw(j, !0),
          this._applyFilters(),
          j.restore(),
          (this.cacheID = a._nextCacheID++);
      }),
      (b.uncache = function () {
        (this._cacheDataURL = this.cacheCanvas = null),
          (this.cacheID = this._cacheOffsetX = this._cacheOffsetY = 0),
          (this._cacheScale = 1);
      }),
      (b.getCacheDataURL = function () {
        return this.cacheCanvas
          ? (this.cacheID != this._cacheDataURLID &&
              (this._cacheDataURL = this.cacheCanvas.toDataURL()),
            this._cacheDataURL)
          : null;
      }),
      (b.getStage = function () {
        for (var a = this; a.parent; ) a = a.parent;
        return a instanceof createjs.Stage ? a : null;
      }),
      (b.localToGlobal = function (a, b) {
        var c = this.getConcatenatedMatrix(this._matrix);
        return null == c
          ? null
          : (c.append(1, 0, 0, 1, a, b), new createjs.Point(c.tx, c.ty));
      }),
      (b.globalToLocal = function (a, b) {
        var c = this.getConcatenatedMatrix(this._matrix);
        return null == c
          ? null
          : (c.invert(),
            c.append(1, 0, 0, 1, a, b),
            new createjs.Point(c.tx, c.ty));
      }),
      (b.localToLocal = function (a, b, c) {
        var d = this.localToGlobal(a, b);
        return c.globalToLocal(d.x, d.y);
      }),
      (b.setTransform = function (a, b, c, d, e, f, g, h, i) {
        return (
          (this.x = a || 0),
          (this.y = b || 0),
          (this.scaleX = null == c ? 1 : c),
          (this.scaleY = null == d ? 1 : d),
          (this.rotation = e || 0),
          (this.skewX = f || 0),
          (this.skewY = g || 0),
          (this.regX = h || 0),
          (this.regY = i || 0),
          this
        );
      }),
      (b.getMatrix = function (a) {
        var b = this;
        return (a ? a.identity() : new createjs.Matrix2D())
          .appendTransform(
            b.x,
            b.y,
            b.scaleX,
            b.scaleY,
            b.rotation,
            b.skewX,
            b.skewY,
            b.regX,
            b.regY
          )
          .appendProperties(b.alpha, b.shadow, b.compositeOperation);
      }),
      (b.getConcatenatedMatrix = function (a) {
        a ? a.identity() : (a = new createjs.Matrix2D());
        for (var b = this; null != b; )
          a
            .prependTransform(
              b.x,
              b.y,
              b.scaleX,
              b.scaleY,
              b.rotation,
              b.skewX,
              b.skewY,
              b.regX,
              b.regY
            )
            .prependProperties(b.alpha, b.shadow, b.compositeOperation),
            (b = b.parent);
        return a;
      }),
      (b.hitTest = function (b, c) {
        var d = a._hitTestContext;
        d.setTransform(1, 0, 0, 1, -b, -c), this.draw(d);
        var e = this._testHit(d);
        return d.setTransform(1, 0, 0, 1, 0, 0), d.clearRect(0, 0, 2, 2), e;
      }),
      (b.set = function (a) {
        for (var b in a) this[b] = a[b];
        return this;
      }),
      (b.getBounds = function () {
        if (this._bounds) return this._rectangle.copy(this._bounds);
        var a = this.cacheCanvas;
        if (a) {
          var b = this._cacheScale;
          return this._rectangle.initialize(
            this._cacheOffsetX,
            this._cacheOffsetY,
            a.width / b,
            a.height / b
          );
        }
        return null;
      }),
      (b.getTransformedBounds = function () {
        return this._getBounds();
      }),
      (b.setBounds = function (a, b, c, d) {
        null == a && (this._bounds = a),
          (this._bounds = (this._bounds || new createjs.Rectangle()).initialize(
            a,
            b,
            c,
            d
          ));
      }),
      (b.clone = function () {
        var b = new a();
        return this.cloneProps(b), b;
      }),
      (b.toString = function () {
        return "[DisplayObject (name=" + this.name + ")]";
      }),
      (b.cloneProps = function (a) {
        (a.alpha = this.alpha),
          (a.name = this.name),
          (a.regX = this.regX),
          (a.regY = this.regY),
          (a.rotation = this.rotation),
          (a.scaleX = this.scaleX),
          (a.scaleY = this.scaleY),
          (a.shadow = this.shadow),
          (a.skewX = this.skewX),
          (a.skewY = this.skewY),
          (a.visible = this.visible),
          (a.x = this.x),
          (a.y = this.y),
          (a._bounds = this._bounds),
          (a.mouseEnabled = this.mouseEnabled),
          (a.compositeOperation = this.compositeOperation);
      }),
      (b._applyShadow = function (a, b) {
        (b = b || Shadow.identity),
          (a.shadowColor = b.color),
          (a.shadowOffsetX = b.offsetX),
          (a.shadowOffsetY = b.offsetY),
          (a.shadowBlur = b.blur);
      }),
      (b._tick = function (a) {
        var b = this._listeners;
        if (b && b.tick) {
          var c = new createjs.Event("tick");
          (c.params = a), this._dispatchEvent(c, this, 2);
        }
      }),
      (b._testHit = function (b) {
        try {
          var c = b.getImageData(0, 0, 1, 1).data[3] > 1;
        } catch (d) {
          if (!a.suppressCrossDomainErrors)
            throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
        }
        return c;
      }),
      (b._applyFilters = function () {
        if (this.filters && 0 != this.filters.length && this.cacheCanvas)
          for (
            var a = this.filters.length,
              b = this.cacheCanvas.getContext("2d"),
              c = this.cacheCanvas.width,
              d = this.cacheCanvas.height,
              e = 0;
            a > e;
            e++
          )
            this.filters[e].applyFilter(b, 0, 0, c, d);
      }),
      (b._applyFilterBounds = function (a, b, c, d) {
        var e,
          f,
          g = this.filters;
        if (!g || !(f = g.length)) return null;
        for (var h = 0; f > h; h++) {
          var i = this.filters[h],
            j = i.getBounds && i.getBounds();
          j &&
            (e || (e = this._rectangle.initialize(a, b, c, d)),
            (e.x += j.x),
            (e.y += j.y),
            (e.width += j.width),
            (e.height += j.height));
        }
        return e;
      }),
      (b._getBounds = function (a, b) {
        return this._transformBounds(this.getBounds(), a, b);
      }),
      (b._transformBounds = function (a, b, c) {
        if (!a) return a;
        var d = a.x,
          e = a.y,
          f = a.width,
          g = a.height,
          h = c ? this._matrix.identity() : this.getMatrix(this._matrix);
        (d || e) && h.appendTransform(0, 0, 1, 1, 0, 0, 0, -d, -e),
          b && h.prependMatrix(b);
        var i = f * h.a,
          j = f * h.b,
          k = g * h.c,
          l = g * h.d,
          m = h.tx,
          n = h.ty,
          o = m,
          p = m,
          q = n,
          r = n;
        return (
          (d = i + m) < o ? (o = d) : d > p && (p = d),
          (d = i + k + m) < o ? (o = d) : d > p && (p = d),
          (d = k + m) < o ? (o = d) : d > p && (p = d),
          (e = j + n) < q ? (q = e) : e > r && (r = e),
          (e = j + l + n) < q ? (q = e) : e > r && (r = e),
          (e = l + n) < q ? (q = e) : e > r && (r = e),
          a.initialize(o, q, p - o, r - q)
        );
      }),
      (b._hasMouseEventListener = function () {
        for (var b = a._MOUSE_EVENTS, c = 0, d = b.length; d > c; c++)
          if (this.hasEventListener(b[c])) return !0;
        return !!this.cursor;
      }),
      (createjs.DisplayObject = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    var a = function () {
        this.initialize();
      },
      b = (a.prototype = new createjs.DisplayObject());
    (b.children = null),
      (b.mouseChildren = !0),
      (b.tickChildren = !0),
      (b.DisplayObject_initialize = b.initialize),
      (b.initialize = function () {
        this.DisplayObject_initialize(), (this.children = []);
      }),
      (b.isVisible = function () {
        var a = this.cacheCanvas || this.children.length;
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          a
        );
      }),
      (b.DisplayObject_draw = b.draw),
      (b.draw = function (a, b) {
        if (this.DisplayObject_draw(a, b)) return !0;
        for (var c = this.children.slice(0), d = 0, e = c.length; e > d; d++) {
          var f = c[d];
          f.isVisible() &&
            (a.save(), f.updateContext(a), f.draw(a), a.restore());
        }
        return !0;
      }),
      (b.addChild = function (a) {
        if (null == a) return a;
        var b = arguments.length;
        if (b > 1) {
          for (var c = 0; b > c; c++) this.addChild(arguments[c]);
          return arguments[b - 1];
        }
        return (
          a.parent && a.parent.removeChild(a),
          (a.parent = this),
          this.children.push(a),
          a
        );
      }),
      (b.addChildAt = function (a, b) {
        var c = arguments.length,
          d = arguments[c - 1];
        if (0 > d || d > this.children.length) return arguments[c - 2];
        if (c > 2) {
          for (var e = 0; c - 1 > e; e++) this.addChildAt(arguments[e], d + e);
          return arguments[c - 2];
        }
        return (
          a.parent && a.parent.removeChild(a),
          (a.parent = this),
          this.children.splice(b, 0, a),
          a
        );
      }),
      (b.removeChild = function (a) {
        var b = arguments.length;
        if (b > 1) {
          for (var c = !0, d = 0; b > d; d++)
            c = c && this.removeChild(arguments[d]);
          return c;
        }
        return this.removeChildAt(createjs.indexOf(this.children, a));
      }),
      (b.removeChildAt = function (a) {
        var b = arguments.length;
        if (b > 1) {
          for (var c = [], d = 0; b > d; d++) c[d] = arguments[d];
          c.sort(function (a, b) {
            return b - a;
          });
          for (var e = !0, d = 0; b > d; d++) e = e && this.removeChildAt(c[d]);
          return e;
        }
        if (0 > a || a > this.children.length - 1) return !1;
        var f = this.children[a];
        return f && (f.parent = null), this.children.splice(a, 1), !0;
      }),
      (b.removeAllChildren = function () {
        for (var a = this.children; a.length; ) a.pop().parent = null;
      }),
      (b.getChildAt = function (a) {
        return this.children[a];
      }),
      (b.getChildByName = function (a) {
        for (var b = this.children, c = 0, d = b.length; d > c; c++)
          if (b[c].name == a) return b[c];
        return null;
      }),
      (b.sortChildren = function (a) {
        this.children.sort(a);
      }),
      (b.getChildIndex = function (a) {
        return createjs.indexOf(this.children, a);
      }),
      (b.getNumChildren = function () {
        return this.children.length;
      }),
      (b.swapChildrenAt = function (a, b) {
        var c = this.children,
          d = c[a],
          e = c[b];
        d && e && ((c[a] = e), (c[b] = d));
      }),
      (b.swapChildren = function (a, b) {
        for (
          var c, d, e = this.children, f = 0, g = e.length;
          g > f &&
          (e[f] == a && (c = f), e[f] == b && (d = f), null == c || null == d);
          f++
        );
        f != g && ((e[c] = b), (e[d] = a));
      }),
      (b.setChildIndex = function (a, b) {
        var c = this.children,
          d = c.length;
        if (!(a.parent != this || 0 > b || b >= d)) {
          for (var e = 0; d > e && c[e] != a; e++);
          e != d && e != b && (c.splice(e, 1), c.splice(b, 0, a));
        }
      }),
      (b.contains = function (a) {
        for (; a; ) {
          if (a == this) return !0;
          a = a.parent;
        }
        return !1;
      }),
      (b.hitTest = function (a, b) {
        return null != this.getObjectUnderPoint(a, b);
      }),
      (b.getObjectsUnderPoint = function (a, b) {
        var c = [],
          d = this.localToGlobal(a, b);
        return this._getObjectsUnderPoint(d.x, d.y, c), c;
      }),
      (b.getObjectUnderPoint = function (a, b) {
        var c = this.localToGlobal(a, b);
        return this._getObjectsUnderPoint(c.x, c.y);
      }),
      (b.DisplayObject_getBounds = b.getBounds),
      (b.getBounds = function () {
        return this._getBounds(null, !0);
      }),
      (b.getTransformedBounds = function () {
        return this._getBounds();
      }),
      (b.clone = function (b) {
        var c = new a();
        if ((this.cloneProps(c), b))
          for (
            var d = (c.children = []), e = 0, f = this.children.length;
            f > e;
            e++
          ) {
            var g = this.children[e].clone(b);
            (g.parent = c), d.push(g);
          }
        return c;
      }),
      (b.toString = function () {
        return "[Container (name=" + this.name + ")]";
      }),
      (b.DisplayObject__tick = b._tick),
      (b._tick = function (a) {
        if (this.tickChildren)
          for (var b = this.children.length - 1; b >= 0; b--) {
            var c = this.children[b];
            c.tickEnabled && c._tick && c._tick(a);
          }
        this.DisplayObject__tick(a);
      }),
      (b._getObjectsUnderPoint = function (b, c, d, e, f) {
        var g = createjs.DisplayObject._hitTestContext,
          h = this._matrix;
        f = f || (e && this._hasMouseEventListener());
        for (var i = this.children, j = i.length, k = j - 1; k >= 0; k--) {
          var l = i[k],
            m = l.hitArea;
          if (l.visible && (m || l.isVisible()) && (!e || l.mouseEnabled))
            if (!m && l instanceof a) {
              var n = l._getObjectsUnderPoint(b, c, d, e, f);
              if (!d && n) return e && !this.mouseChildren ? this : n;
            } else {
              if (!f && !l._hasMouseEventListener()) continue;
              if (
                (l.getConcatenatedMatrix(h),
                m &&
                  (h.appendTransform(
                    m.x,
                    m.y,
                    m.scaleX,
                    m.scaleY,
                    m.rotation,
                    m.skewX,
                    m.skewY,
                    m.regX,
                    m.regY
                  ),
                  (h.alpha = m.alpha)),
                (g.globalAlpha = h.alpha),
                g.setTransform(h.a, h.b, h.c, h.d, h.tx - b, h.ty - c),
                (m || l).draw(g),
                !this._testHit(g))
              )
                continue;
              if (
                (g.setTransform(1, 0, 0, 1, 0, 0), g.clearRect(0, 0, 2, 2), !d)
              )
                return e && !this.mouseChildren ? this : l;
              d.push(l);
            }
        }
        return null;
      }),
      (b._getBounds = function (a, b) {
        var c = this.DisplayObject_getBounds();
        if (c) return this._transformBounds(c, a, b);
        var d,
          e,
          f,
          g,
          h = b ? this._matrix.identity() : this.getMatrix(this._matrix);
        a && h.prependMatrix(a);
        for (var i = this.children.length, j = 0; i > j; j++) {
          var k = this.children[j];
          if (k.visible && (c = k._getBounds(h))) {
            var l = c.x,
              m = c.y,
              n = l + c.width,
              o = m + c.height;
            (d > l || null == d) && (d = l),
              (n > e || null == e) && (e = n),
              (f > m || null == f) && (f = m),
              (o > g || null == g) && (g = o);
          }
        }
        return null == e
          ? null
          : this._rectangle.initialize(d, f, e - d, g - f);
      }),
      (createjs.Container = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a) {
        this.initialize(a);
      },
      b = (a.prototype = new createjs.Container());
    (a._snapToPixelEnabled = !1),
      (b.autoClear = !0),
      (b.canvas = null),
      (b.mouseX = 0),
      (b.mouseY = 0),
      (b.snapToPixelEnabled = !1),
      (b.mouseInBounds = !1),
      (b.tickOnUpdate = !0),
      (b.mouseMoveOutside = !1),
      (b.nextStage = null),
      (b._pointerData = null),
      (b._pointerCount = 0),
      (b._primaryPointerID = null),
      (b._mouseOverIntervalID = null),
      (b.Container_initialize = b.initialize),
      (b.initialize = function (a) {
        this.Container_initialize(),
          (this.canvas = "string" == typeof a ? document.getElementById(a) : a),
          (this._pointerData = {}),
          this.enableDOMEvents(!0);
      }),
      (b.update = function () {
        if (this.canvas) {
          this.tickOnUpdate &&
            (this.dispatchEvent("tickstart"),
            this.tickEnabled && this._tick(arguments.length ? arguments : null),
            this.dispatchEvent("tickend")),
            this.dispatchEvent("drawstart"),
            (a._snapToPixelEnabled = this.snapToPixelEnabled),
            this.autoClear && this.clear();
          var b = this.canvas.getContext("2d");
          b.save(),
            this.updateContext(b),
            this.draw(b, !1),
            b.restore(),
            this.dispatchEvent("drawend");
        }
      }),
      (b.handleEvent = function (a) {
        "tick" == a.type && this.update(a);
      }),
      (b.clear = function () {
        if (this.canvas) {
          var a = this.canvas.getContext("2d");
          a.setTransform(1, 0, 0, 1, 0, 0),
            a.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1);
        }
      }),
      (b.toDataURL = function (a, b) {
        b || (b = "image/png");
        var c,
          d = this.canvas.getContext("2d"),
          e = this.canvas.width,
          f = this.canvas.height;
        if (a) {
          c = d.getImageData(0, 0, e, f);
          var g = d.globalCompositeOperation;
          (d.globalCompositeOperation = "destination-over"),
            (d.fillStyle = a),
            d.fillRect(0, 0, e, f);
        }
        var h = this.canvas.toDataURL(b);
        return (
          a &&
            (d.clearRect(0, 0, e + 1, f + 1),
            d.putImageData(c, 0, 0),
            (d.globalCompositeOperation = g)),
          h
        );
      }),
      (b.enableMouseOver = function (a) {
        if (
          (this._mouseOverIntervalID &&
            (clearInterval(this._mouseOverIntervalID),
            (this._mouseOverIntervalID = null),
            0 == a && this._testMouseOver(!0)),
          null == a)
        )
          a = 20;
        else if (0 >= a) return;
        var b = this;
        this._mouseOverIntervalID = setInterval(function () {
          b._testMouseOver();
        }, 1e3 / Math.min(50, a));
      }),
      (b.enableDOMEvents = function (a) {
        null == a && (a = !0);
        var b,
          c,
          d = this._eventListeners;
        if (!a && d) {
          for (b in d) (c = d[b]), c.t.removeEventListener(b, c.f, !1);
          this._eventListeners = null;
        } else if (a && !d && this.canvas) {
          var e = window.addEventListener ? window : document,
            f = this;
          (d = this._eventListeners = {}),
            (d.mouseup = {
              t: e,
              f: function (a) {
                f._handleMouseUp(a);
              },
            }),
            (d.mousemove = {
              t: e,
              f: function (a) {
                f._handleMouseMove(a);
              },
            }),
            (d.dblclick = {
              t: this.canvas,
              f: function (a) {
                f._handleDoubleClick(a);
              },
            }),
            (d.mousedown = {
              t: this.canvas,
              f: function (a) {
                f._handleMouseDown(a);
              },
            });
          for (b in d) (c = d[b]), c.t.addEventListener(b, c.f, !1);
        }
      }),
      (b.clone = function () {
        var b = new a(null);
        return this.cloneProps(b), b;
      }),
      (b.toString = function () {
        return "[Stage (name=" + this.name + ")]";
      }),
      (b._getElementRect = function (a) {
        var b;
        try {
          b = a.getBoundingClientRect();
        } catch (c) {
          b = {
            top: a.offsetTop,
            left: a.offsetLeft,
            width: a.offsetWidth,
            height: a.offsetHeight,
          };
        }
        var d =
            (window.pageXOffset || document.scrollLeft || 0) -
            (document.clientLeft || document.body.clientLeft || 0),
          e =
            (window.pageYOffset || document.scrollTop || 0) -
            (document.clientTop || document.body.clientTop || 0),
          f = window.getComputedStyle ? getComputedStyle(a) : a.currentStyle,
          g = parseInt(f.paddingLeft) + parseInt(f.borderLeftWidth),
          h = parseInt(f.paddingTop) + parseInt(f.borderTopWidth),
          i = parseInt(f.paddingRight) + parseInt(f.borderRightWidth),
          j = parseInt(f.paddingBottom) + parseInt(f.borderBottomWidth);
        return {
          left: b.left + d + g,
          right: b.right + d - i,
          top: b.top + e + h,
          bottom: b.bottom + e - j,
        };
      }),
      (b._getPointerData = function (a) {
        var b = this._pointerData[a];
        return (
          b ||
            ((b = this._pointerData[a] =
              {
                x: 0,
                y: 0,
              }),
            null == this._primaryPointerID && (this._primaryPointerID = a),
            (null == this._primaryPointerID || -1 == this._primaryPointerID) &&
              (this._primaryPointerID = a)),
          b
        );
      }),
      (b._handleMouseMove = function (a) {
        a || (a = window.event),
          this._handlePointerMove(-1, a, a.pageX, a.pageY);
      }),
      (b._handlePointerMove = function (a, b, c, d) {
        if (this.canvas) {
          var e = this._getPointerData(a),
            f = e.inBounds;
          if (
            (this._updatePointerPosition(a, b, c, d),
            f || e.inBounds || this.mouseMoveOutside)
          ) {
            -1 == a &&
              e.inBounds == !f &&
              this._dispatchMouseEvent(
                this,
                f ? "mouseleave" : "mouseenter",
                !1,
                a,
                e,
                b
              ),
              this._dispatchMouseEvent(this, "stagemousemove", !1, a, e, b),
              this._dispatchMouseEvent(e.target, "pressmove", !0, a, e, b);
            var g = e.event;
            g &&
              g.hasEventListener("mousemove") &&
              g.dispatchEvent(
                new createjs.MouseEvent(
                  "mousemove",
                  !1,
                  !1,
                  e.x,
                  e.y,
                  b,
                  a,
                  a == this._primaryPointerID,
                  e.rawX,
                  e.rawY
                ),
                e.target
              ),
              this.nextStage && this.nextStage._handlePointerMove(a, b, c, d);
          }
        }
      }),
      (b._updatePointerPosition = function (a, b, c, d) {
        var e = this._getElementRect(this.canvas);
        (c -= e.left), (d -= e.top);
        var f = this.canvas.width,
          g = this.canvas.height;
        (c /= (e.right - e.left) / f), (d /= (e.bottom - e.top) / g);
        var h = this._getPointerData(a);
        (h.inBounds = c >= 0 && d >= 0 && f - 1 >= c && g - 1 >= d)
          ? ((h.x = c), (h.y = d))
          : this.mouseMoveOutside &&
            ((h.x = 0 > c ? 0 : c > f - 1 ? f - 1 : c),
            (h.y = 0 > d ? 0 : d > g - 1 ? g - 1 : d)),
          (h.posEvtObj = b),
          (h.rawX = c),
          (h.rawY = d),
          a == this._primaryPointerID &&
            ((this.mouseX = h.x),
            (this.mouseY = h.y),
            (this.mouseInBounds = h.inBounds));
      }),
      (b._handleMouseUp = function (a) {
        this._handlePointerUp(-1, a, !1);
      }),
      (b._handlePointerUp = function (a, b, c) {
        var d = this._getPointerData(a);
        this._dispatchMouseEvent(this, "stagemouseup", !1, a, d, b);
        var e = d.target;
        e &&
          (this._getObjectsUnderPoint(d.x, d.y, null, !0) == e &&
            this._dispatchMouseEvent(e, "click", !0, a, d, b),
          this._dispatchMouseEvent(e, "pressup", !0, a, d, b));
        var f = d.event;
        f &&
          f.hasEventListener("mouseup") &&
          f.dispatchEvent(
            new createjs.MouseEvent(
              "mouseup",
              !1,
              !1,
              d.x,
              d.y,
              b,
              a,
              a == this._primaryPointerID,
              d.rawX,
              d.rawY
            ),
            e
          ),
          c
            ? (a == this._primaryPointerID && (this._primaryPointerID = null),
              delete this._pointerData[a])
            : (d.event = d.target = null),
          this.nextStage && this.nextStage._handlePointerUp(a, b, c);
      }),
      (b._handleMouseDown = function (a) {
        this._handlePointerDown(-1, a, a.pageX, a.pageY);
      }),
      (b._handlePointerDown = function (a, b, c, d) {
        null != d && this._updatePointerPosition(a, b, c, d);
        var e = this._getPointerData(a);
        this._dispatchMouseEvent(this, "stagemousedown", !1, a, e, b),
          (e.target = this._getObjectsUnderPoint(e.x, e.y, null, !0)),
          (e.event = this._dispatchMouseEvent(
            e.target,
            "mousedown",
            !0,
            a,
            e,
            b
          )),
          this.nextStage && this.nextStage._handlePointerDown(a, b, c, d);
      }),
      (b._testMouseOver = function (a) {
        if (
          -1 == this._primaryPointerID &&
          (a ||
            this.mouseX != this._mouseOverX ||
            this.mouseY != this._mouseOverY ||
            !this.mouseInBounds)
        ) {
          var b,
            c,
            d,
            e,
            f = this._getPointerData(-1),
            g = f.posEvtObj,
            h = -1,
            i = "";
          (a || (this.mouseInBounds && g && g.target == this.canvas)) &&
            ((b = this._getObjectsUnderPoint(
              this.mouseX,
              this.mouseY,
              null,
              !0
            )),
            (this._mouseOverX = this.mouseX),
            (this._mouseOverY = this.mouseY));
          var j = this._mouseOverTarget || [],
            k = j[j.length - 1],
            l = (this._mouseOverTarget = []);
          for (c = b; c; )
            l.unshift(c), null != c.cursor && (i = c.cursor), (c = c.parent);
          for (
            this.canvas.style.cursor = i, d = 0, e = l.length;
            e > d && l[d] == j[d];
            d++
          )
            h = d;
          for (
            k != b && this._dispatchMouseEvent(k, "mouseout", !0, -1, f, g),
              d = j.length - 1;
            d > h;
            d--
          )
            this._dispatchMouseEvent(j[d], "rollout", !1, -1, f, g);
          for (d = l.length - 1; d > h; d--)
            this._dispatchMouseEvent(l[d], "rollover", !1, -1, f, g);
          k != b && this._dispatchMouseEvent(b, "mouseover", !0, -1, f, g);
        }
      }),
      (b._handleDoubleClick = function (a) {
        var b = this._getPointerData(-1),
          c = this._getObjectsUnderPoint(b.x, b.y, null, !0);
        this._dispatchMouseEvent(c, "dblclick", !0, -1, b, a),
          this.nextStage && this.nextStage._handleDoubleClick(a);
      }),
      (b._dispatchMouseEvent = function (a, b, c, d, e, f) {
        if (a && (c || a.hasEventListener(b))) {
          var g = new createjs.MouseEvent(
            b,
            c,
            !1,
            e.x,
            e.y,
            f,
            d,
            d == this._primaryPointerID,
            e.rawX,
            e.rawY
          );
          return a.dispatchEvent(g), g;
        }
      }),
      (createjs.Stage = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    var a = function (a) {
        this.initialize(a);
      },
      b = (a.prototype = new createjs.DisplayObject());
    (b.image = null),
      (b.snapToPixel = !0),
      (b.sourceRect = null),
      (b.DisplayObject_initialize = b.initialize),
      (b.initialize = function (a) {
        this.DisplayObject_initialize(),
          "string" == typeof a
            ? ((this.image = document.createElement("img")),
              (this.image.src = a))
            : (this.image = a);
      }),
      (b.isVisible = function () {
        var a =
          this.cacheCanvas ||
          (this.image &&
            (this.image.complete ||
              this.image.getContext ||
              this.image.readyState >= 2));
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          a
        );
      }),
      (b.DisplayObject_draw = b.draw),
      (b.draw = function (a, b) {
        if (this.DisplayObject_draw(a, b)) return !0;
        var c = this.sourceRect;
        return (
          c
            ? a.drawImage(
                this.image,
                c.x,
                c.y,
                c.width,
                c.height,
                0,
                0,
                c.width,
                c.height
              )
            : a.drawImage(this.image, 0, 0),
          !0
        );
      }),
      (b.DisplayObject_getBounds = b.getBounds),
      (b.getBounds = function () {
        var a = this.DisplayObject_getBounds();
        if (a) return a;
        var b = this.sourceRect || this.image,
          c =
            this.image &&
            (this.image.complete ||
              this.image.getContext ||
              this.image.readyState >= 2);
        return c ? this._rectangle.initialize(0, 0, b.width, b.height) : null;
      }),
      (b.clone = function () {
        var b = new a(this.image);
        return (
          this.sourceRect && (b.sourceRect = this.sourceRect.clone()),
          this.cloneProps(b),
          b
        );
      }),
      (b.toString = function () {
        return "[Bitmap (name=" + this.name + ")]";
      }),
      (createjs.Bitmap = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b) {
        this.initialize(a, b);
      },
      b = (a.prototype = new createjs.DisplayObject());
    (b.currentFrame = 0),
      (b.currentAnimation = null),
      (b.paused = !0),
      (b.spriteSheet = null),
      (b.snapToPixel = !0),
      (b.offset = 0),
      (b.currentAnimationFrame = 0),
      (b.framerate = 0),
      (b._advanceCount = 0),
      (b._animation = null),
      (b._currentFrame = null),
      (b.DisplayObject_initialize = b.initialize),
      (b.initialize = function (a, b) {
        this.DisplayObject_initialize(),
          (this.spriteSheet = a),
          b && this.gotoAndPlay(b);
      }),
      (b.isVisible = function () {
        var a = this.cacheCanvas || this.spriteSheet.complete;
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          a
        );
      }),
      (b.DisplayObject_draw = b.draw),
      (b.draw = function (a, b) {
        if (this.DisplayObject_draw(a, b)) return !0;
        this._normalizeFrame();
        var c = this.spriteSheet.getFrame(0 | this._currentFrame);
        if (!c) return !1;
        var d = c.rect;
        return (
          a.drawImage(
            c.image,
            d.x,
            d.y,
            d.width,
            d.height,
            -c.regX,
            -c.regY,
            d.width,
            d.height
          ),
          !0
        );
      }),
      (b.play = function () {
        this.paused = !1;
      }),
      (b.stop = function () {
        this.paused = !0;
      }),
      (b.gotoAndPlay = function (a) {
        (this.paused = !1), this._goto(a);
      }),
      (b.gotoAndStop = function (a) {
        (this.paused = !0), this._goto(a);
      }),
      (b.advance = function (a) {
        var b = (this._animation && this._animation.speed) || 1,
          c = this.framerate || this.spriteSheet.framerate,
          d = c && null != a ? a / (1e3 / c) : 1;
        this._animation
          ? (this.currentAnimationFrame += d * b)
          : (this._currentFrame += d * b),
          this._normalizeFrame();
      }),
      (b.DisplayObject_getBounds = b.getBounds),
      (b.getBounds = function () {
        return (
          this.DisplayObject_getBounds() ||
          this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle)
        );
      }),
      (b.clone = function () {
        var b = new a(this.spriteSheet);
        return this.cloneProps(b), b;
      }),
      (b.toString = function () {
        return "[Sprite (name=" + this.name + ")]";
      }),
      (b.DisplayObject__tick = b._tick),
      (b._tick = function (a) {
        this.paused || this.advance(a && a[0] && a[0].delta),
          this.DisplayObject__tick(a);
      }),
      (b._normalizeFrame = function () {
        var a,
          b = this._animation,
          c = this.paused,
          d = this._currentFrame,
          e = this.currentAnimationFrame;
        if (b)
          if (((a = b.frames.length), (0 | e) >= a)) {
            var f = b.next;
            if (this._dispatchAnimationEnd(b, d, c, f, a - 1));
            else {
              if (f) return this._goto(f, e - a);
              (this.paused = !0),
                (e = this.currentAnimationFrame = b.frames.length - 1),
                (this._currentFrame = b.frames[e]);
            }
          } else this._currentFrame = b.frames[0 | e];
        else if (
          ((a = this.spriteSheet.getNumFrames()),
          d >= a &&
            !this._dispatchAnimationEnd(b, d, c, a - 1) &&
            (this._currentFrame -= a) >= a)
        )
          return this._normalizeFrame();
        this.currentFrame = 0 | this._currentFrame;
      }),
      (b._dispatchAnimationEnd = function (a, b, c, d, e) {
        var f = a ? a.name : null;
        if (this.hasEventListener("animationend")) {
          var g = new createjs.Event("animationend");
          (g.name = f), (g.next = d), this.dispatchEvent(g);
        }
        var h = this._animation != a || this._currentFrame != b;
        return (
          h ||
            c ||
            !this.paused ||
            ((this.currentAnimationFrame = e), (h = !0)),
          h
        );
      }),
      (b.DisplayObject_cloneProps = b.cloneProps),
      (b.cloneProps = function (a) {
        this.DisplayObject_cloneProps(a),
          (a.currentFrame = this.currentFrame),
          (a._currentFrame = this._currentFrame),
          (a.currentAnimation = this.currentAnimation),
          (a.paused = this.paused),
          (a._animation = this._animation),
          (a.currentAnimationFrame = this.currentAnimationFrame),
          (a.framerate = this.framerate);
      }),
      (b._goto = function (a, b) {
        if (isNaN(a)) {
          var c = this.spriteSheet.getAnimation(a);
          c &&
            ((this.currentAnimationFrame = b || 0),
            (this._animation = c),
            (this.currentAnimation = a),
            this._normalizeFrame());
        } else
          (this.currentAnimationFrame = 0),
            (this.currentAnimation = this._animation = null),
            (this._currentFrame = a),
            this._normalizeFrame();
      }),
      (createjs.Sprite = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a =
      "BitmapAnimation is deprecated in favour of Sprite. See VERSIONS file for info on changes.";
    if (!createjs.Sprite) throw a;
    (createjs.BitmapAnimation = function (b) {
      console.log(a), this.initialize(b);
    }).prototype = new createjs.Sprite();
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a) {
        this.initialize(a);
      },
      b = (a.prototype = new createjs.DisplayObject());
    (b.graphics = null),
      (b.DisplayObject_initialize = b.initialize),
      (b.initialize = function (a) {
        this.DisplayObject_initialize(),
          (this.graphics = a ? a : new createjs.Graphics());
      }),
      (b.isVisible = function () {
        var a = this.cacheCanvas || (this.graphics && !this.graphics.isEmpty());
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          a
        );
      }),
      (b.DisplayObject_draw = b.draw),
      (b.draw = function (a, b) {
        return this.DisplayObject_draw(a, b) ? !0 : (this.graphics.draw(a), !0);
      }),
      (b.clone = function (b) {
        var c = new a(
          b && this.graphics ? this.graphics.clone() : this.graphics
        );
        return this.cloneProps(c), c;
      }),
      (b.toString = function () {
        return "[Shape (name=" + this.name + ")]";
      }),
      (createjs.Shape = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c) {
        this.initialize(a, b, c);
      },
      b = (a.prototype = new createjs.DisplayObject()),
      c = createjs.createCanvas
        ? createjs.createCanvas()
        : document.createElement("canvas");
    c.getContext &&
      ((a._workingContext = c.getContext("2d")), (c.width = c.height = 1)),
      (a.H_OFFSETS = {
        start: 0,
        left: 0,
        center: -0.5,
        end: -1,
        right: -1,
      }),
      (a.V_OFFSETS = {
        top: 0,
        hanging: -0.01,
        middle: -0.4,
        alphabetic: -0.8,
        ideographic: -0.85,
        bottom: -1,
      }),
      (b.text = ""),
      (b.font = null),
      (b.color = null),
      (b.textAlign = "left"),
      (b.textBaseline = "top"),
      (b.maxWidth = null),
      (b.outline = 0),
      (b.lineHeight = 0),
      (b.lineWidth = null),
      (b.DisplayObject_initialize = b.initialize),
      (b.initialize = function (a, b, c) {
        this.DisplayObject_initialize(),
          (this.text = a),
          (this.font = b),
          (this.color = c);
      }),
      (b.isVisible = function () {
        var a = this.cacheCanvas || (null != this.text && "" !== this.text);
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          a
        );
      }),
      (b.DisplayObject_draw = b.draw),
      (b.draw = function (a, b) {
        if (this.DisplayObject_draw(a, b)) return !0;
        var c = this.color || "#000";
        return (
          this.outline
            ? ((a.strokeStyle = c), (a.lineWidth = 1 * this.outline))
            : (a.fillStyle = c),
          this._drawText(this._prepContext(a)),
          !0
        );
      }),
      (b.getMeasuredWidth = function () {
        return this._prepContext(a._workingContext).measureText(this.text)
          .width;
      }),
      (b.getMeasuredLineHeight = function () {
        return (
          1.2 * this._prepContext(a._workingContext).measureText("M").width
        );
      }),
      (b.getMeasuredHeight = function () {
        return this._drawText(null, {}).height;
      }),
      (b.DisplayObject_getBounds = b.getBounds),
      (b.getBounds = function () {
        var b = this.DisplayObject_getBounds();
        if (b) return b;
        if (null == this.text || "" == this.text) return null;
        var c = this._drawText(null, {}),
          d =
            this.maxWidth && this.maxWidth < c.width ? this.maxWidth : c.width,
          e = d * a.H_OFFSETS[this.textAlign || "left"],
          f = this.lineHeight || this.getMeasuredLineHeight(),
          g = f * a.V_OFFSETS[this.textBaseline || "top"];
        return this._rectangle.initialize(e, g, d, c.height);
      }),
      (b.clone = function () {
        var b = new a(this.text, this.font, this.color);
        return this.cloneProps(b), b;
      }),
      (b.toString = function () {
        return (
          "[Text (text=" +
          (this.text.length > 20
            ? this.text.substr(0, 17) + "..."
            : this.text) +
          ")]"
        );
      }),
      (b.DisplayObject_cloneProps = b.cloneProps),
      (b.cloneProps = function (a) {
        this.DisplayObject_cloneProps(a),
          (a.textAlign = this.textAlign),
          (a.textBaseline = this.textBaseline),
          (a.maxWidth = this.maxWidth),
          (a.outline = this.outline),
          (a.lineHeight = this.lineHeight),
          (a.lineWidth = this.lineWidth);
      }),
      (b._prepContext = function (a) {
        return (
          (a.font = this.font),
          (a.textAlign = this.textAlign || "left"),
          (a.textBaseline = this.textBaseline || "top"),
          a
        );
      }),
      (b._drawText = function (b, c) {
        var d = !!b;
        d || (b = this._prepContext(a._workingContext));
        for (
          var e = this.lineHeight || this.getMeasuredLineHeight(),
            f = 0,
            g = 0,
            h = String(this.text).split(/(?:\r\n|\r|\n)/),
            i = 0,
            j = h.length;
          j > i;
          i++
        ) {
          var k = h[i],
            l = null;
          if (
            null != this.lineWidth &&
            (l = b.measureText(k).width) > this.lineWidth
          ) {
            var m = k.split(/(\s)/);
            (k = m[0]), (l = b.measureText(k).width);
            for (var n = 1, o = m.length; o > n; n += 2) {
              var p = b.measureText(m[n] + m[n + 1]).width;
              l + p > this.lineWidth
                ? (d && this._drawTextLine(b, k, g * e),
                  l > f && (f = l),
                  (k = m[n + 1]),
                  (l = b.measureText(k).width),
                  g++)
                : ((k += m[n] + m[n + 1]), (l += p));
            }
          }
          d && this._drawTextLine(b, k, g * e),
            c && null == l && (l = b.measureText(k).width),
            l > f && (f = l),
            g++;
        }
        return c && ((c.count = g), (c.width = f), (c.height = g * e)), c;
      }),
      (b._drawTextLine = function (a, b, c) {
        this.outline
          ? a.strokeText(b, 0, c, this.maxWidth || 65535)
          : a.fillText(b, 0, c, this.maxWidth || 65535);
      }),
      (createjs.Text = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function a(a, b) {
      this.initialize(a, b);
    }
    var b = (a.prototype = new createjs.DisplayObject());
    (b.text = ""),
      (b.spriteSheet = null),
      (b.lineHeight = 0),
      (b.letterSpacing = 0),
      (b.spaceWidth = 0),
      (b.DisplayObject_initialize = b.initialize),
      (b.initialize = function (a, b) {
        this.DisplayObject_initialize(),
          (this.text = a),
          (this.spriteSheet = b);
      }),
      (b.DisplayObject_draw = b.draw),
      (b.draw = function (a, b) {
        return this.DisplayObject_draw(a, b) ? !0 : (this._drawText(a), void 0);
      }),
      (b.isVisible = function () {
        var a =
          this.cacheCanvas ||
          (this.spriteSheet && this.spriteSheet.complete && this.text);
        return !!(
          this.visible &&
          this.alpha > 0 &&
          0 != this.scaleX &&
          0 != this.scaleY &&
          a
        );
      }),
      (b.getBounds = function () {
        var a = this._rectangle;
        return this._drawText(null, a), a.width ? a : null;
      }),
      (b._getFrame = function (a, b) {
        var c,
          d = b.getAnimation(a);
        return (
          d ||
            (a != (c = a.toUpperCase()) ||
              a != (c = a.toLowerCase()) ||
              (c = null),
            c && (d = b.getAnimation(c))),
          d && b.getFrame(d.frames[0])
        );
      }),
      (b._getLineHeight = function (a) {
        var b =
          this._getFrame("1", a) ||
          this._getFrame("T", a) ||
          this._getFrame("L", a) ||
          a.getFrame(0);
        return b ? b.rect.height : 1;
      }),
      (b._getSpaceWidth = function (a) {
        var b =
          this._getFrame("1", a) ||
          this._getFrame("l", a) ||
          this._getFrame("e", a) ||
          this._getFrame("a", a) ||
          a.getFrame(0);
        return b ? b.rect.width : 1;
      }),
      (b._drawText = function (a, b) {
        var c,
          d,
          e,
          f = 0,
          g = 0,
          h = this.spaceWidth,
          i = this.lineHeight,
          j = this.spriteSheet,
          k = !!this._getFrame(" ", j);
        k || 0 != h || (h = this._getSpaceWidth(j)),
          0 == i && (i = this._getLineHeight(j));
        for (var l = 0, m = 0, n = this.text.length; n > m; m++) {
          var o = this.text.charAt(m);
          if (k || " " != o)
            if ("\n" != o && "\r" != o) {
              var p = this._getFrame(o, j);
              if (p) {
                var q = p.rect;
                (e = p.regX),
                  (c = q.width),
                  a &&
                    a.drawImage(
                      p.image,
                      q.x,
                      q.y,
                      c,
                      (d = q.height),
                      f - e,
                      g - p.regY,
                      c,
                      d
                    ),
                  (f += c + this.letterSpacing);
              }
            } else
              "\r" == o && "\n" == this.text.charAt(m + 1) && m++,
                f - e > l && (l = f - e),
                (f = 0),
                (g += i);
          else f += h;
        }
        f - e > l && (l = f - e),
          b && ((b.width = l - this.letterSpacing), (b.height = g + i));
      }),
      (createjs.BitmapText = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function () {
        throw "SpriteSheetUtils cannot be instantiated";
      },
      b = createjs.createCanvas
        ? createjs.createCanvas()
        : document.createElement("canvas");
    b.getContext &&
      ((a._workingCanvas = b),
      (a._workingContext = b.getContext("2d")),
      (b.width = b.height = 1)),
      (a.addFlippedFrames = function (b, c, d, e) {
        if (c || d || e) {
          var f = 0;
          c && a._flip(b, ++f, !0, !1),
            d && a._flip(b, ++f, !1, !0),
            e && a._flip(b, ++f, !0, !0);
        }
      }),
      (a.extractFrame = function (b, c) {
        isNaN(c) && (c = b.getAnimation(c).frames[0]);
        var d = b.getFrame(c);
        if (!d) return null;
        var e = d.rect,
          f = a._workingCanvas;
        (f.width = e.width),
          (f.height = e.height),
          a._workingContext.drawImage(
            d.image,
            e.x,
            e.y,
            e.width,
            e.height,
            0,
            0,
            e.width,
            e.height
          );
        var g = document.createElement("img");
        return (g.src = f.toDataURL("image/png")), g;
      }),
      (a.mergeAlpha = function (a, b, c) {
        c ||
          (c = createjs.createCanvas
            ? createjs.createCanvas()
            : document.createElement("canvas")),
          (c.width = Math.max(b.width, a.width)),
          (c.height = Math.max(b.height, a.height));
        var d = c.getContext("2d");
        return (
          d.save(),
          d.drawImage(a, 0, 0),
          (d.globalCompositeOperation = "destination-in"),
          d.drawImage(b, 0, 0),
          d.restore(),
          c
        );
      }),
      (a._flip = function (b, c, d, e) {
        for (
          var f = b._images,
            g = a._workingCanvas,
            h = a._workingContext,
            i = f.length / c,
            j = 0;
          i > j;
          j++
        ) {
          var k = f[j];
          (k.__tmp = j),
            h.setTransform(1, 0, 0, 1, 0, 0),
            h.clearRect(0, 0, g.width + 1, g.height + 1),
            (g.width = k.width),
            (g.height = k.height),
            h.setTransform(
              d ? -1 : 1,
              0,
              0,
              e ? -1 : 1,
              d ? k.width : 0,
              e ? k.height : 0
            ),
            h.drawImage(k, 0, 0);
          var l = document.createElement("img");
          (l.src = g.toDataURL("image/png")),
            (l.width = k.width),
            (l.height = k.height),
            f.push(l);
        }
        var m = b._frames,
          n = m.length / c;
        for (j = 0; n > j; j++) {
          k = m[j];
          var o = k.rect.clone();
          l = f[k.image.__tmp + i * c];
          var p = {
            image: l,
            rect: o,
            regX: k.regX,
            regY: k.regY,
          };
          d && ((o.x = l.width - o.x - o.width), (p.regX = o.width - k.regX)),
            e &&
              ((o.y = l.height - o.y - o.height), (p.regY = o.height - k.regY)),
            m.push(p);
        }
        var q = "_" + (d ? "h" : "") + (e ? "v" : ""),
          r = b._animations,
          s = b._data,
          t = r.length / c;
        for (j = 0; t > j; j++) {
          var u = r[j];
          k = s[u];
          var v = {
            name: u + q,
            speed: k.speed,
            next: k.next,
            frames: [],
          };
          k.next && (v.next += q), (m = k.frames);
          for (var w = 0, x = m.length; x > w; w++) v.frames.push(m[w] + n * c);
          (s[v.name] = v), r.push(v.name);
        }
      }),
      (createjs.SpriteSheetUtils = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function () {
        this.initialize();
      },
      b = (a.prototype = new createjs.EventDispatcher());
    (a.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions"),
      (a.ERR_RUNNING = "a build is already running"),
      (b.maxWidth = 2048),
      (b.maxHeight = 2048),
      (b.spriteSheet = null),
      (b.scale = 1),
      (b.padding = 1),
      (b.timeSlice = 0.3),
      (b.progress = -1),
      (b._frames = null),
      (b._animations = null),
      (b._data = null),
      (b._nextFrameIndex = 0),
      (b._index = 0),
      (b._timerID = null),
      (b._scale = 1),
      (b.initialize = function () {
        (this._frames = []), (this._animations = {});
      }),
      (b.addFrame = function (b, c, d, e, f, g) {
        if (this._data) throw a.ERR_RUNNING;
        var h = c || b.bounds || b.nominalBounds;
        return (
          !h && b.getBounds && (h = b.getBounds()),
          h
            ? ((d = d || 1),
              this._frames.push({
                source: b,
                sourceRect: h,
                scale: d,
                funct: e,
                params: f,
                scope: g,
                index: this._frames.length,
                height: h.height * d,
              }) - 1)
            : null
        );
      }),
      (b.addAnimation = function (b, c, d, e) {
        if (this._data) throw a.ERR_RUNNING;
        this._animations[b] = {
          frames: c,
          next: d,
          frequency: e,
        };
      }),
      (b.addMovieClip = function (b, c, d) {
        if (this._data) throw a.ERR_RUNNING;
        var e = b.frameBounds,
          f = c || b.bounds || b.nominalBounds;
        if ((!f && b.getBounds && (f = b.getBounds()), !f && !e)) return null;
        for (
          var g = this._frames.length, h = b.timeline.duration, i = 0;
          h > i;
          i++
        ) {
          var j = e && e[i] ? e[i] : f;
          this.addFrame(
            b,
            j,
            d,
            function (a) {
              var b = this.actionsEnabled;
              (this.actionsEnabled = !1),
                this.gotoAndStop(a),
                (this.actionsEnabled = b);
            },
            [i],
            b
          );
        }
        var k = b.timeline._labels,
          l = [];
        for (var m in k)
          l.push({
            index: k[m],
            label: m,
          });
        if (l.length) {
          l.sort(function (a, b) {
            return a.index - b.index;
          });
          for (var i = 0, n = l.length; n > i; i++) {
            for (
              var o = l[i].label,
                p = g + l[i].index,
                q = g + (i == n - 1 ? h : l[i + 1].index),
                r = [],
                s = p;
              q > s;
              s++
            )
              r.push(s);
            this.addAnimation(o, r, !0);
          }
        }
      }),
      (b.build = function () {
        if (this._data) throw a.ERR_RUNNING;
        for (this._startBuild(); this._drawNext(); );
        return this._endBuild(), this.spriteSheet;
      }),
      (b.buildAsync = function (b) {
        if (this._data) throw a.ERR_RUNNING;
        (this.timeSlice = b), this._startBuild();
        var c = this;
        this._timerID = setTimeout(function () {
          c._run();
        }, 50 - 50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)));
      }),
      (b.stopAsync = function () {
        clearTimeout(this._timerID), (this._data = null);
      }),
      (b.clone = function () {
        throw "SpriteSheetBuilder cannot be cloned.";
      }),
      (b.toString = function () {
        return "[SpriteSheetBuilder]";
      }),
      (b._startBuild = function () {
        var b = this.padding || 0;
        (this.progress = 0),
          (this.spriteSheet = null),
          (this._index = 0),
          (this._scale = this.scale);
        var c = [];
        this._data = {
          images: [],
          frames: c,
          animations: this._animations,
        };
        var d = this._frames.slice();
        if (
          (d.sort(function (a, b) {
            return a.height <= b.height ? -1 : 1;
          }),
          d[d.length - 1].height + 2 * b > this.maxHeight)
        )
          throw a.ERR_DIMENSIONS;
        for (var e = 0, f = 0, g = 0; d.length; ) {
          var h = this._fillRow(d, e, g, c, b);
          if ((h.w > f && (f = h.w), (e += h.h), !h.h || !d.length)) {
            var i = createjs.createCanvas
              ? createjs.createCanvas()
              : document.createElement("canvas");
            (i.width = this._getSize(f, this.maxWidth)),
              (i.height = this._getSize(e, this.maxHeight)),
              (this._data.images[g] = i),
              h.h || ((f = e = 0), g++);
          }
        }
      }),
      (b._getSize = function (a, b) {
        for (var c = 4; Math.pow(2, ++c) < a; );
        return Math.min(b, Math.pow(2, c));
      }),
      (b._fillRow = function (b, c, d, e, f) {
        var g = this.maxWidth,
          h = this.maxHeight;
        c += f;
        for (var i = h - c, j = f, k = 0, l = b.length - 1; l >= 0; l--) {
          var m = b[l],
            n = this._scale * m.scale,
            o = m.sourceRect,
            p = m.source,
            q = Math.floor(n * o.x - f),
            r = Math.floor(n * o.y - f),
            s = Math.ceil(n * o.height + 2 * f),
            t = Math.ceil(n * o.width + 2 * f);
          if (t > g) throw a.ERR_DIMENSIONS;
          s > i ||
            j + t > g ||
            ((m.img = d),
            (m.rect = new createjs.Rectangle(j, c, t, s)),
            (k = k || s),
            b.splice(l, 1),
            (e[m.index] = [
              j,
              c,
              t,
              s,
              d,
              Math.round(-q + n * p.regX - f),
              Math.round(-r + n * p.regY - f),
            ]),
            (j += t));
        }
        return {
          w: j,
          h: k,
        };
      }),
      (b._endBuild = function () {
        (this.spriteSheet = new createjs.SpriteSheet(this._data)),
          (this._data = null),
          (this.progress = 1),
          this.dispatchEvent("complete");
      }),
      (b._run = function () {
        for (
          var a = 50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)),
            b = new Date().getTime() + a,
            c = !1;
          b > new Date().getTime();

        )
          if (!this._drawNext()) {
            c = !0;
            break;
          }
        if (c) this._endBuild();
        else {
          var d = this;
          this._timerID = setTimeout(function () {
            d._run();
          }, 50 - a);
        }
        var e = (this.progress = this._index / this._frames.length);
        if (this.hasEventListener("progress")) {
          var f = new createjs.Event("progress");
          (f.progress = e), this.dispatchEvent(f);
        }
      }),
      (b._drawNext = function () {
        var a = this._frames[this._index],
          b = a.scale * this._scale,
          c = a.rect,
          d = a.sourceRect,
          e = this._data.images[a.img],
          f = e.getContext("2d");
        return (
          a.funct && a.funct.apply(a.scope, a.params),
          f.save(),
          f.beginPath(),
          f.rect(c.x, c.y, c.width, c.height),
          f.clip(),
          f.translate(Math.ceil(c.x - d.x * b), Math.ceil(c.y - d.y * b)),
          f.scale(b, b),
          a.source.draw(f),
          f.restore(),
          ++this._index < this._frames.length
        );
      }),
      (createjs.SpriteSheetBuilder = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a) {
        this.initialize(a);
      },
      b = (a.prototype = new createjs.DisplayObject());
    (b.htmlElement = null),
      (b._oldMtx = null),
      (b._visible = !1),
      (b.DisplayObject_initialize = b.initialize),
      (b.initialize = function (a) {
        "string" == typeof a && (a = document.getElementById(a)),
          this.DisplayObject_initialize(),
          (this.mouseEnabled = !1),
          (this.htmlElement = a);
        var b = a.style;
        (b.position = "absolute"),
          (b.transformOrigin =
            b.WebkitTransformOrigin =
            b.msTransformOrigin =
            b.MozTransformOrigin =
            b.OTransformOrigin =
              "0% 0%");
      }),
      (b.isVisible = function () {
        return null != this.htmlElement;
      }),
      (b.draw = function () {
        return this.visible && (this._visible = !0), !0;
      }),
      (b.cache = function () {}),
      (b.uncache = function () {}),
      (b.updateCache = function () {}),
      (b.hitTest = function () {}),
      (b.localToGlobal = function () {}),
      (b.globalToLocal = function () {}),
      (b.localToLocal = function () {}),
      (b.clone = function () {
        throw "DOMElement cannot be cloned.";
      }),
      (b.toString = function () {
        return "[DOMElement (name=" + this.name + ")]";
      }),
      (b.DisplayObject__tick = b._tick),
      (b._tick = function (a) {
        var b = this.getStage();
        (this._visible = !1),
          b && b.on("drawend", this._handleDrawEnd, this, !0),
          this.DisplayObject__tick(a);
      }),
      (b._handleDrawEnd = function () {
        var a = this.htmlElement;
        if (a) {
          var b = a.style,
            c = this._visible ? "visible" : "hidden";
          if ((c != b.visibility && (b.visibility = c), this._visible)) {
            var d = this.getConcatenatedMatrix(this._matrix),
              e = this._oldMtx,
              f = 1e4;
            if (
              ((e && e.alpha == d.alpha) ||
                ((b.opacity = "" + (0 | (d.alpha * f)) / f),
                e && (e.alpha = d.alpha)),
              !e ||
                e.tx != d.tx ||
                e.ty != d.ty ||
                e.a != d.a ||
                e.b != d.b ||
                e.c != d.c ||
                e.d != d.d)
            ) {
              var g =
                "matrix(" +
                (0 | (d.a * f)) / f +
                "," +
                (0 | (d.b * f)) / f +
                "," +
                (0 | (d.c * f)) / f +
                "," +
                (0 | (d.d * f)) / f +
                "," +
                (0 | (d.tx + 0.5));
              (b.transform =
                b.WebkitTransform =
                b.OTransform =
                b.msTransform =
                  g + "," + (0 | (d.ty + 0.5)) + ")"),
                (b.MozTransform = g + "px," + (0 | (d.ty + 0.5)) + "px)"),
                (this._oldMtx = e ? e.copy(d) : d.clone());
            }
          }
        }
      }),
      (createjs.DOMElement = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function () {
        this.initialize();
      },
      b = a.prototype;
    (b.initialize = function () {}),
      (b.getBounds = function () {
        return null;
      }),
      (b.applyFilter = function () {}),
      (b.toString = function () {
        return "[Filter]";
      }),
      (b.clone = function () {
        return new a();
      }),
      (createjs.Filter = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c) {
        this.initialize(a, b, c);
      },
      b = (a.prototype = new createjs.Filter());
    (b.initialize = function (a, b, c) {
      (isNaN(a) || 0 > a) && (a = 0),
        (this.blurX = 0 | a),
        (isNaN(b) || 0 > b) && (b = 0),
        (this.blurY = 0 | b),
        (isNaN(c) || 1 > c) && (c = 1),
        (this.quality = 0 | c);
    }),
      (b.blurX = 0),
      (b.blurY = 0),
      (b.quality = 1),
      (b.mul_table = [
        1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265,
        497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269,
        261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369,
        361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69,
        271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446,
        55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371,
        367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317,
        157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277,
        275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491,
        61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221,
        439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202,
        401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185,
        23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341,
        339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79,
        315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295,
        147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69,
        275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130,
        259, 129, 257, 1,
      ]),
      (b.shg_table = [
        0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14,
        14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15,
        15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15,
        12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14,
        16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16,
        16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16,
        14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16,
        15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16,
        17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16,
        17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15,
        16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17,
        17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17,
        16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14,
        17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16,
        17, 16, 17, 9,
      ]),
      (b.getBounds = function () {
        var a = 0.5 * Math.pow(this.quality, 0.6);
        return new createjs.Rectangle(
          -this.blurX * a,
          -this.blurY * a,
          2 * this.blurX * a,
          2 * this.blurY * a
        );
      }),
      (b.applyFilter = function (a, b, c, d, e, f, g, h) {
        (f = f || a), null == g && (g = b), null == h && (h = c);
        try {
          var i = a.getImageData(b, c, d, e);
        } catch (j) {
          return !1;
        }
        var k = this.blurX / 2;
        if (isNaN(k) || 0 > k) return !1;
        k |= 0;
        var l = this.blurY / 2;
        if (isNaN(l) || 0 > l) return !1;
        if (((l |= 0), 0 == k && 0 == l)) return !1;
        var m = this.quality;
        (isNaN(m) || 1 > m) && (m = 1),
          (m |= 0),
          m > 3 && (m = 3),
          1 > m && (m = 1);
        var b,
          c,
          n,
          o,
          p,
          q,
          r,
          s,
          t,
          u,
          v,
          w,
          x,
          y,
          z,
          A = i.data,
          B = k + k + 1,
          C = l + l + 1,
          D = d - 1,
          E = e - 1,
          F = k + 1,
          G = l + 1,
          H = {
            r: 0,
            b: 0,
            g: 0,
            a: 0,
            next: null,
          },
          I = H;
        for (n = 1; B > n; n++)
          I = I.next = {
            r: 0,
            b: 0,
            g: 0,
            a: 0,
            next: null,
          };
        I.next = H;
        var J = {
            r: 0,
            b: 0,
            g: 0,
            a: 0,
            next: null,
          },
          K = J;
        for (n = 1; C > n; n++)
          K = K.next = {
            r: 0,
            b: 0,
            g: 0,
            a: 0,
            next: null,
          };
        K.next = J;
        for (var L = null; m-- > 0; ) {
          r = q = 0;
          var M = this.mul_table[k],
            N = this.shg_table[k];
          for (c = e; --c > -1; ) {
            for (
              s = F * (w = A[q]),
                t = F * (x = A[q + 1]),
                u = F * (y = A[q + 2]),
                v = F * (z = A[q + 3]),
                I = H,
                n = F;
              --n > -1;

            )
              (I.r = w), (I.g = x), (I.b = y), (I.a = z), (I = I.next);
            for (n = 1; F > n; n++)
              (o = q + ((n > D ? D : n) << 2)),
                (s += I.r = A[o]),
                (t += I.g = A[o + 1]),
                (u += I.b = A[o + 2]),
                (v += I.a = A[o + 3]),
                (I = I.next);
            for (L = H, b = 0; d > b; b++)
              (A[q++] = (s * M) >>> N),
                (A[q++] = (t * M) >>> N),
                (A[q++] = (u * M) >>> N),
                (A[q++] = (v * M) >>> N),
                (o = (r + ((o = b + k + 1) < D ? o : D)) << 2),
                (s -= L.r - (L.r = A[o])),
                (t -= L.g - (L.g = A[o + 1])),
                (u -= L.b - (L.b = A[o + 2])),
                (v -= L.a - (L.a = A[o + 3])),
                (L = L.next);
            r += d;
          }
          for (
            M = this.mul_table[l], N = this.shg_table[l], b = 0;
            d > b;
            b++
          ) {
            for (
              q = b << 2,
                s = G * (w = A[q]),
                t = G * (x = A[q + 1]),
                u = G * (y = A[q + 2]),
                v = G * (z = A[q + 3]),
                K = J,
                n = 0;
              G > n;
              n++
            )
              (K.r = w), (K.g = x), (K.b = y), (K.a = z), (K = K.next);
            for (p = d, n = 1; l >= n; n++)
              (q = (p + b) << 2),
                (s += K.r = A[q]),
                (t += K.g = A[q + 1]),
                (u += K.b = A[q + 2]),
                (v += K.a = A[q + 3]),
                (K = K.next),
                E > n && (p += d);
            if (((q = b), (L = J), m > 0))
              for (c = 0; e > c; c++)
                (o = q << 2),
                  (A[o + 3] = z = (v * M) >>> N),
                  z > 0
                    ? ((A[o] = (s * M) >>> N),
                      (A[o + 1] = (t * M) >>> N),
                      (A[o + 2] = (u * M) >>> N))
                    : (A[o] = A[o + 1] = A[o + 2] = 0),
                  (o = (b + ((o = c + G) < E ? o : E) * d) << 2),
                  (s -= L.r - (L.r = A[o])),
                  (t -= L.g - (L.g = A[o + 1])),
                  (u -= L.b - (L.b = A[o + 2])),
                  (v -= L.a - (L.a = A[o + 3])),
                  (L = L.next),
                  (q += d);
            else
              for (c = 0; e > c; c++)
                (o = q << 2),
                  (A[o + 3] = z = (v * M) >>> N),
                  z > 0
                    ? ((z = 255 / z),
                      (A[o] = ((s * M) >>> N) * z),
                      (A[o + 1] = ((t * M) >>> N) * z),
                      (A[o + 2] = ((u * M) >>> N) * z))
                    : (A[o] = A[o + 1] = A[o + 2] = 0),
                  (o = (b + ((o = c + G) < E ? o : E) * d) << 2),
                  (s -= L.r - (L.r = A[o])),
                  (t -= L.g - (L.g = A[o + 1])),
                  (u -= L.b - (L.b = A[o + 2])),
                  (v -= L.a - (L.a = A[o + 3])),
                  (L = L.next),
                  (q += d);
          }
        }
        return f.putImageData(i, g, h), !0;
      }),
      (b.clone = function () {
        return new a(this.blurX, this.blurY, this.quality);
      }),
      (b.toString = function () {
        return "[BlurFilter]";
      }),
      (createjs.BlurFilter = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a) {
        this.initialize(a);
      },
      b = (a.prototype = new createjs.Filter());
    (b.initialize = function (a) {
      this.alphaMap = a;
    }),
      (b.alphaMap = null),
      (b._alphaMap = null),
      (b._mapData = null),
      (b.applyFilter = function (a, b, c, d, e, f, g, h) {
        if (!this.alphaMap) return !0;
        if (!this._prepAlphaMap()) return !1;
        (f = f || a), null == g && (g = b), null == h && (h = c);
        try {
          var i = a.getImageData(b, c, d, e);
        } catch (j) {
          return !1;
        }
        for (
          var k = i.data, l = this._mapData, m = k.length, n = 0;
          m > n;
          n += 4
        )
          k[n + 3] = l[n] || 0;
        return f.putImageData(i, g, h), !0;
      }),
      (b.clone = function () {
        return new a(this.alphaMap);
      }),
      (b.toString = function () {
        return "[AlphaMapFilter]";
      }),
      (b._prepAlphaMap = function () {
        if (!this.alphaMap) return !1;
        if (this.alphaMap == this._alphaMap && this._mapData) return !0;
        this._mapData = null;
        var a,
          b = (this._alphaMap = this.alphaMap),
          c = b;
        b instanceof HTMLCanvasElement
          ? (a = c.getContext("2d"))
          : ((c = createjs.createCanvas
              ? createjs.createCanvas()
              : document.createElement("canvas")),
            (c.width = b.width),
            (c.height = b.height),
            (a = c.getContext("2d")),
            a.drawImage(b, 0, 0));
        try {
          var d = a.getImageData(0, 0, b.width, b.height);
        } catch (e) {
          return !1;
        }
        return (this._mapData = d.data), !0;
      }),
      (createjs.AlphaMapFilter = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a) {
        this.initialize(a);
      },
      b = (a.prototype = new createjs.Filter());
    (b.initialize = function (a) {
      this.mask = a;
    }),
      (b.mask = null),
      (b.applyFilter = function (a, b, c, d, e, f, g, h) {
        return this.mask
          ? ((f = f || a),
            null == g && (g = b),
            null == h && (h = c),
            f.save(),
            (f.globalCompositeOperation = "destination-in"),
            f.drawImage(this.mask, g, h),
            f.restore(),
            !0)
          : !0;
      }),
      (b.clone = function () {
        return new a(this.mask);
      }),
      (b.toString = function () {
        return "[AlphaMaskFilter]";
      }),
      (createjs.AlphaMaskFilter = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c, d, e, f, g, h) {
        this.initialize(a, b, c, d, e, f, g, h);
      },
      b = (a.prototype = new createjs.Filter());
    (b.redMultiplier = 1),
      (b.greenMultiplier = 1),
      (b.blueMultiplier = 1),
      (b.alphaMultiplier = 1),
      (b.redOffset = 0),
      (b.greenOffset = 0),
      (b.blueOffset = 0),
      (b.alphaOffset = 0),
      (b.initialize = function (a, b, c, d, e, f, g, h) {
        (this.redMultiplier = null != a ? a : 1),
          (this.greenMultiplier = null != b ? b : 1),
          (this.blueMultiplier = null != c ? c : 1),
          (this.alphaMultiplier = null != d ? d : 1),
          (this.redOffset = e || 0),
          (this.greenOffset = f || 0),
          (this.blueOffset = g || 0),
          (this.alphaOffset = h || 0);
      }),
      (b.applyFilter = function (a, b, c, d, e, f, g, h) {
        (f = f || a), null == g && (g = b), null == h && (h = c);
        try {
          var i = a.getImageData(b, c, d, e);
        } catch (j) {
          return !1;
        }
        for (var k = i.data, l = k.length, m = 0; l > m; m += 4)
          (k[m] = k[m] * this.redMultiplier + this.redOffset),
            (k[m + 1] = k[m + 1] * this.greenMultiplier + this.greenOffset),
            (k[m + 2] = k[m + 2] * this.blueMultiplier + this.blueOffset),
            (k[m + 3] = k[m + 3] * this.alphaMultiplier + this.alphaOffset);
        return f.putImageData(i, g, h), !0;
      }),
      (b.toString = function () {
        return "[ColorFilter]";
      }),
      (b.clone = function () {
        return new a(
          this.redMultiplier,
          this.greenMultiplier,
          this.blueMultiplier,
          this.alphaMultiplier,
          this.redOffset,
          this.greenOffset,
          this.blueOffset,
          this.alphaOffset
        );
      }),
      (createjs.ColorFilter = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c, d) {
        this.initialize(a, b, c, d);
      },
      b = a.prototype;
    (a.DELTA_INDEX = [
      0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11, 0.12, 0.14, 0.15,
      0.16, 0.17, 0.18, 0.2, 0.21, 0.22, 0.24, 0.25, 0.27, 0.28, 0.3, 0.32,
      0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.53, 0.56, 0.59,
      0.62, 0.65, 0.68, 0.71, 0.74, 0.77, 0.8, 0.83, 0.86, 0.89, 0.92, 0.95,
      0.98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66,
      1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87,
      3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5,
      7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10,
    ]),
      (a.IDENTITY_MATRIX = [
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        1,
      ]),
      (a.LENGTH = a.IDENTITY_MATRIX.length),
      (b.initialize = function (a, b, c, d) {
        return this.reset(), this.adjustColor(a, b, c, d), this;
      }),
      (b.reset = function () {
        return this.copyMatrix(a.IDENTITY_MATRIX);
      }),
      (b.adjustColor = function (a, b, c, d) {
        return (
          this.adjustHue(d),
          this.adjustContrast(b),
          this.adjustBrightness(a),
          this.adjustSaturation(c)
        );
      }),
      (b.adjustBrightness = function (a) {
        return 0 == a || isNaN(a)
          ? this
          : ((a = this._cleanValue(a, 255)),
            this._multiplyMatrix([
              1,
              0,
              0,
              0,
              a,
              0,
              1,
              0,
              0,
              a,
              0,
              0,
              1,
              0,
              a,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              0,
              1,
            ]),
            this);
      }),
      (b.adjustContrast = function (b) {
        if (0 == b || isNaN(b)) return this;
        b = this._cleanValue(b, 100);
        var c;
        return (
          0 > b
            ? (c = 127 + 127 * (b / 100))
            : ((c = b % 1),
              (c =
                0 == c
                  ? a.DELTA_INDEX[b]
                  : a.DELTA_INDEX[b << 0] * (1 - c) +
                    a.DELTA_INDEX[(b << 0) + 1] * c),
              (c = 127 * c + 127)),
          this._multiplyMatrix([
            c / 127,
            0,
            0,
            0,
            0.5 * (127 - c),
            0,
            c / 127,
            0,
            0,
            0.5 * (127 - c),
            0,
            0,
            c / 127,
            0,
            0.5 * (127 - c),
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
          ]),
          this
        );
      }),
      (b.adjustSaturation = function (a) {
        if (0 == a || isNaN(a)) return this;
        a = this._cleanValue(a, 100);
        var b = 1 + (a > 0 ? (3 * a) / 100 : a / 100),
          c = 0.3086,
          d = 0.6094,
          e = 0.082;
        return (
          this._multiplyMatrix([
            c * (1 - b) + b,
            d * (1 - b),
            e * (1 - b),
            0,
            0,
            c * (1 - b),
            d * (1 - b) + b,
            e * (1 - b),
            0,
            0,
            c * (1 - b),
            d * (1 - b),
            e * (1 - b) + b,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
          ]),
          this
        );
      }),
      (b.adjustHue = function (a) {
        if (0 == a || isNaN(a)) return this;
        a = (this._cleanValue(a, 180) / 180) * Math.PI;
        var b = Math.cos(a),
          c = Math.sin(a),
          d = 0.213,
          e = 0.715,
          f = 0.072;
        return (
          this._multiplyMatrix([
            d + b * (1 - d) + c * -d,
            e + b * -e + c * -e,
            f + b * -f + c * (1 - f),
            0,
            0,
            d + b * -d + 0.143 * c,
            e + b * (1 - e) + 0.14 * c,
            f + b * -f + c * -0.283,
            0,
            0,
            d + b * -d + c * -(1 - d),
            e + b * -e + c * e,
            f + b * (1 - f) + c * f,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
          ]),
          this
        );
      }),
      (b.concat = function (b) {
        return (
          (b = this._fixMatrix(b)),
          b.length != a.LENGTH ? this : (this._multiplyMatrix(b), this)
        );
      }),
      (b.clone = function () {
        return new a().copyMatrix(this);
      }),
      (b.toArray = function () {
        for (var b = [], c = 0, d = a.LENGTH; d > c; c++) b[c] = this[c];
        return b;
      }),
      (b.copyMatrix = function (b) {
        for (var c = a.LENGTH, d = 0; c > d; d++) this[d] = b[d];
        return this;
      }),
      (b.toString = function () {
        return "[ColorMatrix]";
      }),
      (b._multiplyMatrix = function (a) {
        for (var b = [], c = 0; 5 > c; c++) {
          for (var d = 0; 5 > d; d++) b[d] = this[d + 5 * c];
          for (var d = 0; 5 > d; d++) {
            for (var e = 0, f = 0; 5 > f; f++) e += a[d + 5 * f] * b[f];
            this[d + 5 * c] = e;
          }
        }
      }),
      (b._cleanValue = function (a, b) {
        return Math.min(b, Math.max(-b, a));
      }),
      (b._fixMatrix = function (b) {
        return (
          b instanceof a && (b = b.toArray()),
          b.length < a.LENGTH
            ? (b = b
                .slice(0, b.length)
                .concat(a.IDENTITY_MATRIX.slice(b.length, a.LENGTH)))
            : b.length > a.LENGTH && (b = b.slice(0, a.LENGTH)),
          b
        );
      }),
      (createjs.ColorMatrix = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a) {
        this.initialize(a);
      },
      b = (a.prototype = new createjs.Filter());
    (b.matrix = null),
      (b.initialize = function (a) {
        this.matrix = a;
      }),
      (b.applyFilter = function (a, b, c, d, e, f, g, h) {
        (f = f || a), null == g && (g = b), null == h && (h = c);
        try {
          var i = a.getImageData(b, c, d, e);
        } catch (j) {
          return !1;
        }
        for (
          var k,
            l,
            m,
            n,
            o = i.data,
            p = o.length,
            q = this.matrix,
            r = q[0],
            s = q[1],
            t = q[2],
            u = q[3],
            v = q[4],
            w = q[5],
            x = q[6],
            y = q[7],
            z = q[8],
            A = q[9],
            B = q[10],
            C = q[11],
            D = q[12],
            E = q[13],
            F = q[14],
            G = q[15],
            H = q[16],
            I = q[17],
            J = q[18],
            K = q[19],
            L = 0;
          p > L;
          L += 4
        )
          (k = o[L]),
            (l = o[L + 1]),
            (m = o[L + 2]),
            (n = o[L + 3]),
            (o[L] = k * r + l * s + m * t + n * u + v),
            (o[L + 1] = k * w + l * x + m * y + n * z + A),
            (o[L + 2] = k * B + l * C + m * D + n * E + F),
            (o[L + 3] = k * G + l * H + m * I + n * J + K);
        return f.putImageData(i, g, h), !0;
      }),
      (b.toString = function () {
        return "[ColorMatrixFilter]";
      }),
      (b.clone = function () {
        return new a(this.matrix);
      }),
      (createjs.ColorMatrixFilter = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function () {
      throw "Touch cannot be instantiated";
    };
    (a.isSupported = function () {
      return (
        "ontouchstart" in window ||
        (window.navigator.msPointerEnabled &&
          window.navigator.msMaxTouchPoints > 0) ||
        (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0)
      );
    }),
      (a.enable = function (b, c, d) {
        return b && b.canvas && a.isSupported()
          ? ((b.__touch = {
              pointers: {},
              multitouch: !c,
              preventDefault: !d,
              count: 0,
            }),
            "ontouchstart" in window
              ? a._IOS_enable(b)
              : (window.navigator.msPointerEnabled ||
                  window.navigator.pointerEnabled) &&
                a._IE_enable(b),
            !0)
          : !1;
      }),
      (a.disable = function (b) {
        b &&
          ("ontouchstart" in window
            ? a._IOS_disable(b)
            : (window.navigator.msPointerEnabled ||
                window.navigator.pointerEnabled) &&
              a._IE_disable(b));
      }),
      (a._IOS_enable = function (b) {
        var c = b.canvas,
          d = (b.__touch.f = function (c) {
            a._IOS_handleEvent(b, c);
          });
        c.addEventListener("touchstart", d, !1),
          c.addEventListener("touchmove", d, !1),
          c.addEventListener("touchend", d, !1),
          c.addEventListener("touchcancel", d, !1);
      }),
      (a._IOS_disable = function (a) {
        var b = a.canvas;
        if (b) {
          var c = a.__touch.f;
          b.removeEventListener("touchstart", c, !1),
            b.removeEventListener("touchmove", c, !1),
            b.removeEventListener("touchend", c, !1),
            b.removeEventListener("touchcancel", c, !1);
        }
      }),
      (a._IOS_handleEvent = function (a, b) {
        if (a) {
          a.__touch.preventDefault && b.preventDefault && b.preventDefault();
          for (
            var c = b.changedTouches, d = b.type, e = 0, f = c.length;
            f > e;
            e++
          ) {
            var g = c[e],
              h = g.identifier;
            g.target == a.canvas &&
              ("touchstart" == d
                ? this._handleStart(a, h, b, g.pageX, g.pageY)
                : "touchmove" == d
                ? this._handleMove(a, h, b, g.pageX, g.pageY)
                : ("touchend" == d || "touchcancel" == d) &&
                  this._handleEnd(a, h, b));
          }
        }
      }),
      (a._IE_enable = function (b) {
        var c = b.canvas,
          d = (b.__touch.f = function (c) {
            a._IE_handleEvent(b, c);
          });
        void 0 === window.navigator.pointerEnabled
          ? (c.addEventListener("MSPointerDown", d, !1),
            window.addEventListener("MSPointerMove", d, !1),
            window.addEventListener("MSPointerUp", d, !1),
            window.addEventListener("MSPointerCancel", d, !1),
            b.__touch.preventDefault && (c.style.msTouchAction = "none"))
          : (c.addEventListener("pointerdown", d, !1),
            window.addEventListener("pointermove", d, !1),
            window.addEventListener("pointerup", d, !1),
            window.addEventListener("pointercancel", d, !1),
            b.__touch.preventDefault && (c.style.touchAction = "none")),
          (b.__touch.activeIDs = {});
      }),
      (a._IE_disable = function (a) {
        var b = a.__touch.f;
        void 0 === window.navigator.pointerEnabled
          ? (window.removeEventListener("MSPointerMove", b, !1),
            window.removeEventListener("MSPointerUp", b, !1),
            window.removeEventListener("MSPointerCancel", b, !1),
            a.canvas && a.canvas.removeEventListener("MSPointerDown", b, !1))
          : (window.removeEventListener("pointermove", b, !1),
            window.removeEventListener("pointerup", b, !1),
            window.removeEventListener("pointercancel", b, !1),
            a.canvas && a.canvas.removeEventListener("pointerdown", b, !1));
      }),
      (a._IE_handleEvent = function (a, b) {
        if (a) {
          a.__touch.preventDefault && b.preventDefault && b.preventDefault();
          var c = b.type,
            d = b.pointerId,
            e = a.__touch.activeIDs;
          if ("MSPointerDown" == c || "pointerdown" == c) {
            if (b.srcElement != a.canvas) return;
            (e[d] = !0), this._handleStart(a, d, b, b.pageX, b.pageY);
          } else
            e[d] &&
              ("MSPointerMove" == c || "pointermove" == c
                ? this._handleMove(a, d, b, b.pageX, b.pageY)
                : ("MSPointerUp" == c ||
                    "MSPointerCancel" == c ||
                    "pointerup" == c ||
                    "pointercancel" == c) &&
                  (delete e[d], this._handleEnd(a, d, b)));
        }
      }),
      (a._handleStart = function (a, b, c, d, e) {
        var f = a.__touch;
        if (f.multitouch || !f.count) {
          var g = f.pointers;
          g[b] || ((g[b] = !0), f.count++, a._handlePointerDown(b, c, d, e));
        }
      }),
      (a._handleMove = function (a, b, c, d, e) {
        a.__touch.pointers[b] && a._handlePointerMove(b, c, d, e);
      }),
      (a._handleEnd = function (a, b, c) {
        var d = a.__touch,
          e = d.pointers;
        e[b] && (d.count--, a._handlePointerUp(b, c, !0), delete e[b]);
      }),
      (createjs.Touch = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = (createjs.EaselJS = createjs.EaselJS || {});
    (a.version = "NEXT"), (a.buildDate = "Thu, 12 Dec 2013 23:37:07 GMT");
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = (createjs.PreloadJS = createjs.PreloadJS || {});
    (a.version = "NEXT"), (a.buildDate = "Thu, 12 Dec 2013 23:37:07 GMT");
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    createjs.proxy = function (a, b) {
      var c = Array.prototype.slice.call(arguments, 2);
      return function () {
        return a.apply(b, Array.prototype.slice.call(arguments, 0).concat(c));
      };
    };
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function () {
      this.init();
    };
    a.prototype = new createjs.EventDispatcher();
    var b = a.prototype,
      c = a;
    (c.FILE_PATTERN =
      /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?)|(.{0,2}\/{1}))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/),
      (c.PATH_PATTERN =
        /^(?:(\w+:)\/{2})|(.{0,2}\/{1})?([/.]*?(?:[^?]+)?\/?)?$/),
      (b.loaded = !1),
      (b.canceled = !1),
      (b.progress = 0),
      (b._item = null),
      (b.getItem = function () {
        return this._item;
      }),
      (b.init = function () {}),
      (b.load = function () {}),
      (b.close = function () {}),
      (b._sendLoadStart = function () {
        this._isCanceled() || this.dispatchEvent("loadstart");
      }),
      (b._sendProgress = function (a) {
        if (!this._isCanceled()) {
          var b = null;
          "number" == typeof a
            ? ((this.progress = a),
              (b = new createjs.Event("progress")),
              (b.loaded = this.progress),
              (b.total = 1))
            : ((b = a),
              (this.progress = a.loaded / a.total),
              (isNaN(this.progress) || 1 / 0 == this.progress) &&
                (this.progress = 0)),
            (b.progress = this.progress),
            this.hasEventListener("progress") && this.dispatchEvent(b);
        }
      }),
      (b._sendComplete = function () {
        this._isCanceled() || this.dispatchEvent("complete");
      }),
      (b._sendError = function (a) {
        !this._isCanceled() &&
          this.hasEventListener("error") &&
          (null == a && (a = new createjs.Event("error")),
          this.dispatchEvent(a));
      }),
      (b._isCanceled = function () {
        return null == window.createjs || this.canceled ? !0 : !1;
      }),
      (b._parseURI = function (a) {
        return a ? a.match(c.FILE_PATTERN) : null;
      }),
      (b._parsePath = function (a) {
        return a ? a.match(c.PATH_PATTERN) : null;
      }),
      (b._formatQueryString = function (a, b) {
        if (null == a) throw new Error("You must specify data.");
        var c = [];
        for (var d in a) c.push(d + "=" + escape(a[d]));
        return b && (c = c.concat(b)), c.join("&");
      }),
      (b.buildPath = function (a, b) {
        if (null == b) return a;
        var c = [],
          d = a.indexOf("?");
        if (-1 != d) {
          var e = a.slice(d + 1);
          c = c.concat(e.split("&"));
        }
        return -1 != d
          ? a.slice(0, d) + "?" + this._formatQueryString(b, c)
          : a + "?" + this._formatQueryString(b, c);
      }),
      (b._isCrossDomain = function (a) {
        var b = document.createElement("a");
        b.href = a.src;
        var c = document.createElement("a");
        c.href = location.href;
        var d =
          "" != b.hostname &&
          (b.port != c.port ||
            b.protocol != c.protocol ||
            b.hostname != c.hostname);
        return d;
      }),
      (b._isLocal = function (a) {
        var b = document.createElement("a");
        return (b.href = a.src), "" == b.hostname && "file:" == b.protocol;
      }),
      (b.toString = function () {
        return "[PreloadJS AbstractLoader]";
      }),
      (createjs.AbstractLoader = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c) {
        this.init(a, b, c);
      },
      b = (a.prototype = new createjs.AbstractLoader()),
      c = a;
    (c.loadTimeout = 8e3),
      (c.LOAD_TIMEOUT = 0),
      (c.BINARY = "binary"),
      (c.CSS = "css"),
      (c.IMAGE = "image"),
      (c.JAVASCRIPT = "javascript"),
      (c.JSON = "json"),
      (c.JSONP = "jsonp"),
      (c.MANIFEST = "manifest"),
      (c.SOUND = "sound"),
      (c.SVG = "svg"),
      (c.TEXT = "text"),
      (c.XML = "xml"),
      (c.POST = "POST"),
      (c.GET = "GET"),
      (b._basePath = null),
      (b._crossOrigin = ""),
      (b.useXHR = !0),
      (b.stopOnError = !1),
      (b.maintainScriptOrder = !0),
      (b.next = null),
      (b._typeCallbacks = null),
      (b._extensionCallbacks = null),
      (b._loadStartWasDispatched = !1),
      (b._maxConnections = 1),
      (b._currentlyLoadingScript = null),
      (b._currentLoads = null),
      (b._loadQueue = null),
      (b._loadQueueBackup = null),
      (b._loadItemsById = null),
      (b._loadItemsBySrc = null),
      (b._loadedResults = null),
      (b._loadedRawResults = null),
      (b._numItems = 0),
      (b._numItemsLoaded = 0),
      (b._scriptOrder = null),
      (b._loadedScripts = null),
      (b.init = function (a, b, c) {
        (this._numItems = this._numItemsLoaded = 0),
          (this._paused = !1),
          (this._loadStartWasDispatched = !1),
          (this._currentLoads = []),
          (this._loadQueue = []),
          (this._loadQueueBackup = []),
          (this._scriptOrder = []),
          (this._loadedScripts = []),
          (this._loadItemsById = {}),
          (this._loadItemsBySrc = {}),
          (this._loadedResults = {}),
          (this._loadedRawResults = {}),
          (this._typeCallbacks = {}),
          (this._extensionCallbacks = {}),
          (this._basePath = b),
          this.setUseXHR(a),
          (this._crossOrigin =
            c === !0 ? "Anonymous" : c === !1 || null == c ? "" : c);
      }),
      (b.setUseXHR = function (a) {
        return (
          (this.useXHR = 0 != a && null != window.XMLHttpRequest), this.useXHR
        );
      }),
      (b.removeAll = function () {
        this.remove();
      }),
      (b.remove = function (a) {
        var b = null;
        if (!a || a instanceof Array) {
          if (a) b = a;
          else if (arguments.length > 0) return;
        } else b = [a];
        var c = !1;
        if (b) {
          for (; b.length; ) {
            var d = b.pop(),
              e = this.getResult(d);
            for (f = this._loadQueue.length - 1; f >= 0; f--)
              if (
                ((g = this._loadQueue[f].getItem()), g.id == d || g.src == d)
              ) {
                this._loadQueue.splice(f, 1)[0].cancel();
                break;
              }
            for (f = this._loadQueueBackup.length - 1; f >= 0; f--)
              if (
                ((g = this._loadQueueBackup[f].getItem()),
                g.id == d || g.src == d)
              ) {
                this._loadQueueBackup.splice(f, 1)[0].cancel();
                break;
              }
            if (e)
              delete this._loadItemsById[e.id],
                delete this._loadItemsBySrc[e.src],
                this._disposeItem(e);
            else
              for (var f = this._currentLoads.length - 1; f >= 0; f--) {
                var g = this._currentLoads[f].getItem();
                if (g.id == d || g.src == d) {
                  this._currentLoads.splice(f, 1)[0].cancel(), (c = !0);
                  break;
                }
              }
          }
          c && this._loadNext();
        } else {
          this.close();
          for (var h in this._loadItemsById)
            this._disposeItem(this._loadItemsById[h]);
          this.init(this.useXHR);
        }
      }),
      (b.reset = function () {
        this.close();
        for (var a in this._loadItemsById)
          this._disposeItem(this._loadItemsById[a]);
        for (var b = [], c = 0, d = this._loadQueueBackup.length; d > c; c++)
          b.push(this._loadQueueBackup[c].getItem());
        this.loadManifest(b, !1);
      }),
      (c.isBinary = function (a) {
        switch (a) {
          case createjs.LoadQueue.IMAGE:
          case createjs.LoadQueue.BINARY:
            return !0;
          default:
            return !1;
        }
      }),
      (c.isText = function (a) {
        switch (a) {
          case createjs.LoadQueue.TEXT:
          case createjs.LoadQueue.JSON:
          case createjs.LoadQueue.MANIFEST:
          case createjs.LoadQueue.XML:
          case createjs.LoadQueue.HTML:
          case createjs.LoadQueue.CSS:
          case createjs.LoadQueue.SVG:
          case createjs.LoadQueue.JAVASCRIPT:
            return !0;
          default:
            return !1;
        }
      }),
      (b.installPlugin = function (a) {
        if (null != a && null != a.getPreloadHandlers) {
          var b = a.getPreloadHandlers();
          if (((b.scope = a), null != b.types))
            for (var c = 0, d = b.types.length; d > c; c++)
              this._typeCallbacks[b.types[c]] = b;
          if (null != b.extensions)
            for (c = 0, d = b.extensions.length; d > c; c++)
              this._extensionCallbacks[b.extensions[c]] = b;
        }
      }),
      (b.setMaxConnections = function (a) {
        (this._maxConnections = a),
          !this._paused && this._loadQueue.length > 0 && this._loadNext();
      }),
      (b.loadFile = function (a, b, c) {
        if (null == a) {
          var d = new createjs.Event("error");
          return (d.text = "PRELOAD_NO_FILE"), this._sendError(d), void 0;
        }
        this._addItem(a, null, c),
          b !== !1 ? this.setPaused(!1) : this.setPaused(!0);
      }),
      (b.loadManifest = function (a, b, d) {
        var e = null,
          f = null;
        if (a instanceof Array) {
          if (0 == a.length) {
            var g = new createjs.Event("error");
            return (
              (g.text = "PRELOAD_MANIFEST_EMPTY"), this._sendError(g), void 0
            );
          }
          e = a;
        } else if ("string" == typeof a)
          e = [
            {
              src: a,
              type: c.MANIFEST,
            },
          ];
        else {
          if ("object" != typeof a) {
            var g = new createjs.Event("error");
            return (
              (g.text = "PRELOAD_MANIFEST_NULL"), this._sendError(g), void 0
            );
          }
          if (void 0 !== a.src) {
            if (null == a.type) a.type = c.MANIFEST;
            else if (a.type != c.MANIFEST) {
              var g = new createjs.Event("error");
              (g.text = "PRELOAD_MANIFEST_ERROR"), this._sendError(g);
            }
            e = [a];
          } else void 0 !== a.manifest && ((e = a.manifest), (f = a.path));
        }
        for (var h = 0, i = e.length; i > h; h++) this._addItem(e[h], f, d);
        b !== !1 ? this.setPaused(!1) : this.setPaused(!0);
      }),
      (b.load = function () {
        this.setPaused(!1);
      }),
      (b.getItem = function (a) {
        return this._loadItemsById[a] || this._loadItemsBySrc[a];
      }),
      (b.getResult = function (a, b) {
        var c = this._loadItemsById[a] || this._loadItemsBySrc[a];
        if (null == c) return null;
        var d = c.id;
        return b && this._loadedRawResults[d]
          ? this._loadedRawResults[d]
          : this._loadedResults[d];
      }),
      (b.setPaused = function (a) {
        (this._paused = a), this._paused || this._loadNext();
      }),
      (b.close = function () {
        for (; this._currentLoads.length; ) this._currentLoads.pop().cancel();
        (this._scriptOrder.length = 0),
          (this._loadedScripts.length = 0),
          (this.loadStartWasDispatched = !1);
      }),
      (b._addItem = function (a, b, c) {
        var d = this._createLoadItem(a, b, c);
        if (null != d) {
          var e = this._createLoader(d);
          null != e &&
            (this._loadQueue.push(e),
            this._loadQueueBackup.push(e),
            this._numItems++,
            this._updateProgress(),
            this.maintainScriptOrder &&
              d.type == createjs.LoadQueue.JAVASCRIPT &&
              e instanceof createjs.XHRLoader &&
              (this._scriptOrder.push(d), this._loadedScripts.push(null)));
        }
      }),
      (b._createLoadItem = function (a, b, c) {
        var d = null;
        switch (typeof a) {
          case "string":
            d = {
              src: a,
            };
            break;
          case "object":
            d =
              window.HTMLAudioElement && a instanceof window.HTMLAudioElement
                ? {
                    tag: a,
                    src: d.tag.src,
                    type: createjs.LoadQueue.SOUND,
                  }
                : a;
            break;
          default:
            return null;
        }
        var e = this._parseURI(d.src);
        null != e && (d.ext = e[6]),
          null == d.type && (d.type = this._getTypeByExtension(d.ext));
        var f = "",
          g = c || this._basePath,
          h = d.src;
        if (e && null == e[1] && null == e[3])
          if (b) {
            f = b;
            var i = this._parsePath(b);
            (h = b + h),
              null != g && i && null == i[1] && null == i[2] && (f = g + f);
          } else null != g && (f = g);
        if (
          ((d.src = f + d.src),
          (d.path = f),
          (d.type == createjs.LoadQueue.JSON ||
            d.type == createjs.LoadQueue.MANIFEST) &&
            (d._loadAsJSONP = null != d.callback),
          d.type == createjs.LoadQueue.JSONP && null == d.callback)
        )
          throw new Error("callback is required for loading JSONP requests.");
        (void 0 === d.tag || null === d.tag) && (d.tag = this._createTag(d)),
          (void 0 === d.id || null === d.id || "" === d.id) && (d.id = h);
        var j = this._typeCallbacks[d.type] || this._extensionCallbacks[d.ext];
        if (j) {
          var k = j.callback.call(
            j.scope,
            d.src,
            d.type,
            d.id,
            d.data,
            f,
            this
          );
          if (k === !1) return null;
          k === !0 ||
            (null != k.src && (d.src = k.src),
            null != k.id && (d.id = k.id),
            null != k.tag && (d.tag = k.tag),
            null != k.completeHandler &&
              (d.completeHandler = k.completeHandler),
            k.type && (d.type = k.type),
            (e = this._parseURI(d.src)),
            null != e && null != e[6] && (d.ext = e[6].toLowerCase()));
        }
        return (
          (this._loadItemsById[d.id] = d), (this._loadItemsBySrc[d.src] = d), d
        );
      }),
      (b._createLoader = function (a) {
        var b = this.useXHR;
        switch (a.type) {
          case createjs.LoadQueue.JSON:
          case createjs.LoadQueue.MANIFEST:
            b = !a._loadAsJSONP;
            break;
          case createjs.LoadQueue.XML:
          case createjs.LoadQueue.TEXT:
            b = !0;
            break;
          case createjs.LoadQueue.SOUND:
          case createjs.LoadQueue.JSONP:
            b = !1;
            break;
          case null:
            return null;
        }
        return b
          ? new createjs.XHRLoader(a, this._crossOrigin)
          : new createjs.TagLoader(a);
      }),
      (b._loadNext = function () {
        if (!this._paused) {
          this._loadStartWasDispatched ||
            (this._sendLoadStart(), (this._loadStartWasDispatched = !0)),
            this._numItems == this._numItemsLoaded
              ? ((this.loaded = !0),
                this._sendComplete(),
                this.next && this.next.load && this.next.load())
              : (this.loaded = !1);
          for (
            var a = 0;
            a < this._loadQueue.length &&
            !(this._currentLoads.length >= this._maxConnections);
            a++
          ) {
            var b = this._loadQueue[a];
            if (
              this.maintainScriptOrder &&
              b instanceof createjs.TagLoader &&
              b.getItem().type == createjs.LoadQueue.JAVASCRIPT
            ) {
              if (this._currentlyLoadingScript) continue;
              this._currentlyLoadingScript = !0;
            }
            this._loadQueue.splice(a, 1), a--, this._loadItem(b);
          }
        }
      }),
      (b._loadItem = function (a) {
        a.on("progress", this._handleProgress, this),
          a.on("complete", this._handleFileComplete, this),
          a.on("error", this._handleFileError, this),
          this._currentLoads.push(a),
          this._sendFileStart(a.getItem()),
          a.load();
      }),
      (b._handleFileError = function (a) {
        var b = a.target;
        this._numItemsLoaded++, this._updateProgress();
        var c = new createjs.Event("error");
        (c.text = "FILE_LOAD_ERROR"),
          (c.item = b.getItem()),
          this._sendError(c),
          this.stopOnError || (this._removeLoadItem(b), this._loadNext());
      }),
      (b._handleFileComplete = function (a) {
        var b = a.target,
          c = b.getItem();
        if (
          ((this._loadedResults[c.id] = b.getResult()),
          b instanceof createjs.XHRLoader &&
            (this._loadedRawResults[c.id] = b.getResult(!0)),
          this._removeLoadItem(b),
          this.maintainScriptOrder && c.type == createjs.LoadQueue.JAVASCRIPT)
        ) {
          if (!(b instanceof createjs.TagLoader))
            return (
              (this._loadedScripts[createjs.indexOf(this._scriptOrder, c)] = c),
              this._checkScriptLoadOrder(b),
              void 0
            );
          this._currentlyLoadingScript = !1;
        }
        if ((delete c._loadAsJSONP, c.type == createjs.LoadQueue.MANIFEST)) {
          var d = b.getResult();
          null != d && void 0 !== d.manifest && this.loadManifest(d, !0);
        }
        this._processFinishedLoad(c, b);
      }),
      (b._processFinishedLoad = function (a, b) {
        this._numItemsLoaded++,
          this._updateProgress(),
          this._sendFileComplete(a, b),
          this._loadNext();
      }),
      (b._checkScriptLoadOrder = function () {
        for (var a = this._loadedScripts.length, b = 0; a > b; b++) {
          var c = this._loadedScripts[b];
          if (null === c) break;
          if (c !== !0) {
            var d = this._loadedResults[c.id];
            (
              document.body || document.getElementsByTagName("body")[0]
            ).appendChild(d),
              this._processFinishedLoad(c),
              (this._loadedScripts[b] = !0);
          }
        }
      }),
      (b._removeLoadItem = function (a) {
        for (var b = this._currentLoads.length, c = 0; b > c; c++)
          if (this._currentLoads[c] == a) {
            this._currentLoads.splice(c, 1);
            break;
          }
      }),
      (b._handleProgress = function (a) {
        var b = a.target;
        this._sendFileProgress(b.getItem(), b.progress), this._updateProgress();
      }),
      (b._updateProgress = function () {
        var a = this._numItemsLoaded / this._numItems,
          b = this._numItems - this._numItemsLoaded;
        if (b > 0) {
          for (var c = 0, d = 0, e = this._currentLoads.length; e > d; d++)
            c += this._currentLoads[d].progress;
          a += (c / b) * (b / this._numItems);
        }
        this._sendProgress(a);
      }),
      (b._disposeItem = function (a) {
        delete this._loadedResults[a.id],
          delete this._loadedRawResults[a.id],
          delete this._loadItemsById[a.id],
          delete this._loadItemsBySrc[a.src];
      }),
      (b._createTag = function (a) {
        var b = null;
        switch (a.type) {
          case createjs.LoadQueue.IMAGE:
            return (
              (b = document.createElement("img")),
              "" == this._crossOrigin ||
                this._isLocal(a) ||
                (b.crossOrigin = this._crossOrigin),
              b
            );
          case createjs.LoadQueue.SOUND:
            return (b = document.createElement("audio")), (b.autoplay = !1), b;
          case createjs.LoadQueue.JSON:
          case createjs.LoadQueue.JSONP:
          case createjs.LoadQueue.JAVASCRIPT:
          case createjs.LoadQueue.MANIFEST:
            return (
              (b = document.createElement("script")),
              (b.type = "text/javascript"),
              b
            );
          case createjs.LoadQueue.CSS:
            return (
              (b = this.useXHR
                ? document.createElement("style")
                : document.createElement("link")),
              (b.rel = "stylesheet"),
              (b.type = "text/css"),
              b
            );
          case createjs.LoadQueue.SVG:
            return (
              this.useXHR
                ? (b = document.createElement("svg"))
                : ((b = document.createElement("object")),
                  (b.type = "image/svg+xml")),
              b
            );
        }
        return null;
      }),
      (b._getTypeByExtension = function (a) {
        if (null == a) return createjs.LoadQueue.TEXT;
        switch (a.toLowerCase()) {
          case "jpeg":
          case "jpg":
          case "gif":
          case "png":
          case "webp":
          case "bmp":
            return createjs.LoadQueue.IMAGE;
          case "ogg":
          case "mp3":
          case "wav":
            return createjs.LoadQueue.SOUND;
          case "json":
            return createjs.LoadQueue.JSON;
          case "xml":
            return createjs.LoadQueue.XML;
          case "css":
            return createjs.LoadQueue.CSS;
          case "js":
            return createjs.LoadQueue.JAVASCRIPT;
          case "svg":
            return createjs.LoadQueue.SVG;
          default:
            return createjs.LoadQueue.TEXT;
        }
      }),
      (b._sendFileProgress = function (a, b) {
        if (this._isCanceled()) return this._cleanUp(), void 0;
        if (this.hasEventListener("fileprogress")) {
          var c = new createjs.Event("fileprogress");
          (c.progress = b),
            (c.loaded = b),
            (c.total = 1),
            (c.item = a),
            this.dispatchEvent(c);
        }
      }),
      (b._sendFileComplete = function (a, b) {
        if (!this._isCanceled()) {
          var c = new createjs.Event("fileload");
          (c.loader = b),
            (c.item = a),
            (c.result = this._loadedResults[a.id]),
            (c.rawResult = this._loadedRawResults[a.id]),
            a.completeHandler && a.completeHandler(c),
            this.hasEventListener("fileload") && this.dispatchEvent(c);
        }
      }),
      (b._sendFileStart = function (a) {
        var b = new createjs.Event("filestart");
        (b.item = a),
          this.hasEventListener("filestart") && this.dispatchEvent(b);
      }),
      (b.toString = function () {
        return "[PreloadJS LoadQueue]";
      }),
      (createjs.LoadQueue = a);
    var d = function () {};
    (d.init = function () {
      var a = navigator.userAgent;
      (d.isFirefox = a.indexOf("Firefox") > -1),
        (d.isOpera = null != window.opera),
        (d.isChrome = a.indexOf("Chrome") > -1),
        (d.isIOS =
          a.indexOf("iPod") > -1 ||
          a.indexOf("iPhone") > -1 ||
          a.indexOf("iPad") > -1);
    }),
      d.init(),
      (createjs.LoadQueue.BrowserDetect = d);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a) {
        this.init(a);
      },
      b = (a.prototype = new createjs.AbstractLoader());
    (b._loadTimeout = null),
      (b._tagCompleteProxy = null),
      (b._isAudio = !1),
      (b._tag = null),
      (b._jsonResult = null),
      (b.init = function (a) {
        (this._item = a),
          (this._tag = a.tag),
          (this._isAudio =
            window.HTMLAudioElement &&
            a.tag instanceof window.HTMLAudioElement),
          (this._tagCompleteProxy = createjs.proxy(this._handleLoad, this));
      }),
      (b.getResult = function () {
        return this._item.type == createjs.LoadQueue.JSONP ||
          this._item.type == createjs.LoadQueue.MANIFEST
          ? this._jsonResult
          : this._tag;
      }),
      (b.cancel = function () {
        (this.canceled = !0), this._clean();
      }),
      (b.load = function () {
        var a = this._item,
          b = this._tag;
        clearTimeout(this._loadTimeout);
        var c = createjs.LoadQueue.LOAD_TIMEOUT;
        0 == c && (c = createjs.LoadQueue.loadTimeout),
          (this._loadTimeout = setTimeout(
            createjs.proxy(this._handleTimeout, this),
            c
          )),
          this._isAudio && ((b.src = null), (b.preload = "auto")),
          (b.onerror = createjs.proxy(this._handleError, this)),
          this._isAudio
            ? ((b.onstalled = createjs.proxy(this._handleStalled, this)),
              b.addEventListener("canplaythrough", this._tagCompleteProxy, !1))
            : ((b.onload = createjs.proxy(this._handleLoad, this)),
              (b.onreadystatechange = createjs.proxy(
                this._handleReadyStateChange,
                this
              )));
        var d = this.buildPath(a.src, a.values);
        switch (a.type) {
          case createjs.LoadQueue.CSS:
            b.href = d;
            break;
          case createjs.LoadQueue.SVG:
            b.data = d;
            break;
          default:
            b.src = d;
        }
        if (
          a.type == createjs.LoadQueue.JSONP ||
          a.type == createjs.LoadQueue.JSON ||
          a.type == createjs.LoadQueue.MANIFEST
        ) {
          if (null == a.callback)
            throw new Error("callback is required for loading JSONP requests.");
          if (null != window[a.callback])
            throw new Error(
              'JSONP callback "' +
                a.callback +
                '" already exists on window. You need to specify a different callback. Or re-name the current one.'
            );
          window[a.callback] = createjs.proxy(this._handleJSONPLoad, this);
        }
        (a.type == createjs.LoadQueue.SVG ||
          a.type == createjs.LoadQueue.JSONP ||
          a.type == createjs.LoadQueue.JSON ||
          a.type == createjs.LoadQueue.MANIFEST ||
          a.type == createjs.LoadQueue.JAVASCRIPT ||
          a.type == createjs.LoadQueue.CSS) &&
          ((this._startTagVisibility = b.style.visibility),
          (b.style.visibility = "hidden"),
          (
            document.body || document.getElementsByTagName("body")[0]
          ).appendChild(b)),
          null != b.load && b.load();
      }),
      (b._handleJSONPLoad = function (a) {
        this._jsonResult = a;
      }),
      (b._handleTimeout = function () {
        this._clean();
        var a = new createjs.Event("error");
        (a.text = "PRELOAD_TIMEOUT"), this._sendError(a);
      }),
      (b._handleStalled = function () {}),
      (b._handleError = function () {
        this._clean();
        var a = new createjs.Event("error");
        this._sendError(a);
      }),
      (b._handleReadyStateChange = function () {
        clearTimeout(this._loadTimeout);
        var a = this.getItem().tag;
        ("loaded" == a.readyState || "complete" == a.readyState) &&
          this._handleLoad();
      }),
      (b._handleLoad = function () {
        if (!this._isCanceled()) {
          var a = this.getItem(),
            b = a.tag;
          if (!(this.loaded || (this._isAudio && 4 !== b.readyState))) {
            switch (((this.loaded = !0), a.type)) {
              case createjs.LoadQueue.SVG:
              case createjs.LoadQueue.JSON:
              case createjs.LoadQueue.JSONP:
              case createjs.LoadQueue.MANIFEST:
              case createjs.LoadQueue.CSS:
                (b.style.visibility = this._startTagVisibility),
                  (
                    document.body || document.getElementsByTagName("body")[0]
                  ).removeChild(b);
            }
            this._clean(), this._sendComplete();
          }
        }
      }),
      (b._clean = function () {
        clearTimeout(this._loadTimeout);
        var a = this.getItem(),
          b = a.tag;
        null != b &&
          ((b.onload = null),
          b.removeEventListener &&
            b.removeEventListener("canplaythrough", this._tagCompleteProxy, !1),
          (b.onstalled = null),
          (b.onprogress = null),
          (b.onerror = null),
          null != b.parentNode &&
            a.type == createjs.LoadQueue.SVG &&
            a.type == createjs.LoadQueue.JSON &&
            a.type == createjs.LoadQueue.MANIFEST &&
            a.type == createjs.LoadQueue.CSS &&
            a.type == createjs.LoadQueue.JSONP &&
            b.parentNode.removeChild(b));
        var a = this.getItem();
        (a.type == createjs.LoadQueue.JSONP ||
          a.type == createjs.LoadQueue.MANIFEST) &&
          (window[a.callback] = null);
      }),
      (b.toString = function () {
        return "[PreloadJS TagLoader]";
      }),
      (createjs.TagLoader = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b) {
        this.init(a, b);
      },
      b = (a.prototype = new createjs.AbstractLoader());
    (b._request = null),
      (b._loadTimeout = null),
      (b._xhrLevel = 1),
      (b._response = null),
      (b._rawResponse = null),
      (b._crossOrigin = ""),
      (b.init = function (a, b) {
        (this._item = a), (this._crossOrigin = b), !this._createXHR(a);
      }),
      (b.getResult = function (a) {
        return a && this._rawResponse ? this._rawResponse : this._response;
      }),
      (b.cancel = function () {
        (this.canceled = !0), this._clean(), this._request.abort();
      }),
      (b.load = function () {
        if (null == this._request) return this._handleError(), void 0;
        if (
          ((this._request.onloadstart = createjs.proxy(
            this._handleLoadStart,
            this
          )),
          (this._request.onprogress = createjs.proxy(
            this._handleProgress,
            this
          )),
          (this._request.onabort = createjs.proxy(this._handleAbort, this)),
          (this._request.onerror = createjs.proxy(this._handleError, this)),
          (this._request.ontimeout = createjs.proxy(this._handleTimeout, this)),
          1 == this._xhrLevel)
        ) {
          var a = createjs.LoadQueue.LOAD_TIMEOUT;
          if (0 == a) a = createjs.LoadQueue.loadTimeout;
          else
            try {
              console.warn(
                "LoadQueue.LOAD_TIMEOUT has been deprecated in favor of LoadQueue.loadTimeout"
              );
            } catch (b) {}
          this._loadTimeout = setTimeout(
            createjs.proxy(this._handleTimeout, this),
            a
          );
        }
        (this._request.onload = createjs.proxy(this._handleLoad, this)),
          (this._request.onreadystatechange = createjs.proxy(
            this._handleReadyStateChange,
            this
          ));
        try {
          this._item.values && this._item.method != createjs.LoadQueue.GET
            ? this._item.method == createjs.LoadQueue.POST &&
              this._request.send(this._formatQueryString(this._item.values))
            : this._request.send();
        } catch (c) {
          var d = new createjs.Event("error");
          (d.error = c), this._sendError(d);
        }
      }),
      (b.getAllResponseHeaders = function () {
        return this._request.getAllResponseHeaders instanceof Function
          ? this._request.getAllResponseHeaders()
          : null;
      }),
      (b.getResponseHeader = function (a) {
        return this._request.getResponseHeader instanceof Function
          ? this._request.getResponseHeader(a)
          : null;
      }),
      (b._handleProgress = function (a) {
        if (a && !(a.loaded > 0 && 0 == a.total)) {
          var b = new createjs.Event("progress");
          (b.loaded = a.loaded), (b.total = a.total), this._sendProgress(b);
        }
      }),
      (b._handleLoadStart = function () {
        clearTimeout(this._loadTimeout), this._sendLoadStart();
      }),
      (b._handleAbort = function () {
        this._clean();
        var a = new createjs.Event("error");
        (a.text = "XHR_ABORTED"), this._sendError(a);
      }),
      (b._handleError = function () {
        this._clean();
        var a = new createjs.Event("error");
        this._sendError(a);
      }),
      (b._handleReadyStateChange = function () {
        4 == this._request.readyState && this._handleLoad();
      }),
      (b._handleLoad = function () {
        if (!this.loaded) {
          if (((this.loaded = !0), !this._checkError()))
            return this._handleError(), void 0;
          (this._response = this._getResponse()), this._clean();
          var a = this._generateTag();
          a && this._sendComplete();
        }
      }),
      (b._handleTimeout = function (a) {
        this._clean();
        var b = new createjs.Event("error");
        (b.text = "PRELOAD_TIMEOUT"), this._sendError(a);
      }),
      (b._checkError = function () {
        var a = parseInt(this._request.status);
        switch (a) {
          case 404:
          case 0:
            return !1;
        }
        return !0;
      }),
      (b._getResponse = function () {
        if (null != this._response) return this._response;
        if (null != this._request.response) return this._request.response;
        try {
          if (null != this._request.responseText)
            return this._request.responseText;
        } catch (a) {}
        try {
          if (null != this._request.responseXML)
            return this._request.responseXML;
        } catch (a) {}
        return null;
      }),
      (b._createXHR = function (a) {
        var b = this._isCrossDomain(a),
          c = null;
        if (b && window.XDomainRequest) c = new XDomainRequest();
        else if (window.XMLHttpRequest) c = new XMLHttpRequest();
        else
          try {
            c = new ActiveXObject("Msxml2.XMLHTTP.6.0");
          } catch (d) {
            try {
              c = new ActiveXObject("Msxml2.XMLHTTP.3.0");
            } catch (d) {
              try {
                c = new ActiveXObject("Msxml2.XMLHTTP");
              } catch (d) {
                return !1;
              }
            }
          }
        createjs.LoadQueue.isText(a.type) &&
          c.overrideMimeType &&
          c.overrideMimeType("text/plain; charset=utf-8"),
          (this._xhrLevel = "string" == typeof c.responseType ? 2 : 1);
        var e = null;
        return (
          (e =
            a.method == createjs.LoadQueue.GET
              ? this.buildPath(a.src, a.values)
              : a.src),
          c.open(a.method || createjs.LoadQueue.GET, e, !0),
          b &&
            c instanceof XMLHttpRequest &&
            1 == this._xhrLevel &&
            c.setRequestHeader("Origin", location.origin),
          a.values &&
            a.method == createjs.LoadQueue.POST &&
            c.setRequestHeader(
              "Content-Type",
              "application/x-www-form-urlencoded"
            ),
          createjs.LoadQueue.isBinary(a.type) &&
            (c.responseType = "arraybuffer"),
          (this._request = c),
          !0
        );
      }),
      (b._clean = function () {
        clearTimeout(this._loadTimeout);
        var a = this._request;
        (a.onloadstart = null),
          (a.onprogress = null),
          (a.onabort = null),
          (a.onerror = null),
          (a.onload = null),
          (a.ontimeout = null),
          (a.onloadend = null),
          (a.onreadystatechange = null);
      }),
      (b._generateTag = function () {
        var a = this._item.type,
          b = this._item.tag;
        switch (a) {
          case createjs.LoadQueue.IMAGE:
            return (
              (b.onload = createjs.proxy(this._handleTagReady, this)),
              "" != this._crossOrigin && (b.crossOrigin = "Anonymous"),
              (b.src = this.buildPath(this._item.src, this._item.values)),
              (this._rawResponse = this._response),
              (this._response = b),
              !1
            );
          case createjs.LoadQueue.JAVASCRIPT:
            return (
              (b = document.createElement("script")),
              (b.text = this._response),
              (this._rawResponse = this._response),
              (this._response = b),
              !0
            );
          case createjs.LoadQueue.CSS:
            var c = document.getElementsByTagName("head")[0];
            if ((c.appendChild(b), b.styleSheet))
              b.styleSheet.cssText = this._response;
            else {
              var d = document.createTextNode(this._response);
              b.appendChild(d);
            }
            return (
              (this._rawResponse = this._response), (this._response = b), !0
            );
          case createjs.LoadQueue.XML:
            var e = this._parseXML(this._response, "text/xml");
            return (
              (this._rawResponse = this._response), (this._response = e), !0
            );
          case createjs.LoadQueue.SVG:
            var e = this._parseXML(this._response, "image/svg+xml");
            return (
              (this._rawResponse = this._response),
              null != e.documentElement
                ? (b.appendChild(e.documentElement), (this._response = b))
                : (this._response = e),
              !0
            );
          case createjs.LoadQueue.JSON:
          case createjs.LoadQueue.MANIFEST:
            var f = {};
            try {
              f = JSON.parse(this._response);
            } catch (g) {
              f = g;
            }
            return (
              (this._rawResponse = this._response), (this._response = f), !0
            );
        }
        return !0;
      }),
      (b._parseXML = function (a, b) {
        var c = null;
        try {
          if (window.DOMParser) {
            var d = new DOMParser();
            c = d.parseFromString(a, b);
          } else
            (c = new ActiveXObject("Microsoft.XMLDOM")),
              (c.async = !1),
              c.loadXML(a);
        } catch (e) {}
        return c;
      }),
      (b._handleTagReady = function () {
        this._sendComplete();
      }),
      (b.toString = function () {
        return "[PreloadJS XHRLoader]";
      }),
      (createjs.XHRLoader = a);
  })(),
  "object" != typeof JSON && (JSON = {}),
  (function () {
    "use strict";
    function f(a) {
      return 10 > a ? "0" + a : a;
    }
    function quote(a) {
      return (
        (escapable.lastIndex = 0),
        escapable.test(a)
          ? '"' +
            a.replace(escapable, function (a) {
              var b = meta[a];
              return "string" == typeof b
                ? b
                : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
          : '"' + a + '"'
      );
    }
    function str(a, b) {
      var c,
        d,
        e,
        f,
        g,
        h = gap,
        i = b[a];
      switch (
        (i &&
          "object" == typeof i &&
          "function" == typeof i.toJSON &&
          (i = i.toJSON(a)),
        "function" == typeof rep && (i = rep.call(b, a, i)),
        typeof i)
      ) {
        case "string":
          return quote(i);
        case "number":
          return isFinite(i) ? String(i) : "null";
        case "boolean":
        case "null":
          return String(i);
        case "object":
          if (!i) return "null";
          if (
            ((gap += indent),
            (g = []),
            "[object Array]" === Object.prototype.toString.apply(i))
          ) {
            for (f = i.length, c = 0; f > c; c += 1) g[c] = str(c, i) || "null";
            return (
              (e =
                0 === g.length
                  ? "[]"
                  : gap
                  ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]"
                  : "[" + g.join(",") + "]"),
              (gap = h),
              e
            );
          }
          if (rep && "object" == typeof rep)
            for (f = rep.length, c = 0; f > c; c += 1)
              "string" == typeof rep[c] &&
                ((d = rep[c]),
                (e = str(d, i)),
                e && g.push(quote(d) + (gap ? ": " : ":") + e));
          else
            for (d in i)
              Object.prototype.hasOwnProperty.call(i, d) &&
                ((e = str(d, i)),
                e && g.push(quote(d) + (gap ? ": " : ":") + e));
          return (
            (e =
              0 === g.length
                ? "{}"
                : gap
                ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}"
                : "{" + g.join(",") + "}"),
            (gap = h),
            e
          );
      }
    }
    "function" != typeof Date.prototype.toJSON &&
      ((Date.prototype.toJSON = function () {
        return isFinite(this.valueOf())
          ? this.getUTCFullYear() +
              "-" +
              f(this.getUTCMonth() + 1) +
              "-" +
              f(this.getUTCDate()) +
              "T" +
              f(this.getUTCHours()) +
              ":" +
              f(this.getUTCMinutes()) +
              ":" +
              f(this.getUTCSeconds()) +
              "Z"
          : null;
      }),
      (String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON =
          function () {
            return this.valueOf();
          }));
    var cx =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable =
        /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      },
      rep;
    "function" != typeof JSON.stringify &&
      (JSON.stringify = function (a, b, c) {
        var d;
        if (((gap = ""), (indent = ""), "number" == typeof c))
          for (d = 0; c > d; d += 1) indent += " ";
        else "string" == typeof c && (indent = c);
        if (
          ((rep = b),
          b &&
            "function" != typeof b &&
            ("object" != typeof b || "number" != typeof b.length))
        )
          throw new Error("JSON.stringify");
        return str("", {
          "": a,
        });
      }),
      "function" != typeof JSON.parse &&
        (JSON.parse = function (text, reviver) {
          function walk(a, b) {
            var c,
              d,
              e = a[b];
            if (e && "object" == typeof e)
              for (c in e)
                Object.prototype.hasOwnProperty.call(e, c) &&
                  ((d = walk(e, c)), void 0 !== d ? (e[c] = d) : delete e[c]);
            return reviver.call(a, b, e);
          }
          var j;
          if (
            ((text = String(text)),
            (cx.lastIndex = 0),
            cx.test(text) &&
              (text = text.replace(cx, function (a) {
                return (
                  "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                );
              })),
            /^[\],:{}\s]*$/.test(
              text
                .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                .replace(
                  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                  "]"
                )
                .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
            ))
          )
            return (
              (j = eval("(" + text + ")")),
              "function" == typeof reviver
                ? walk(
                    {
                      "": j,
                    },
                    ""
                  )
                : j
            );
          throw new SyntaxError("JSON.parse");
        });
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    var a = (createjs.SoundJS = createjs.SoundJS || {});
    (a.version = "NEXT"), (a.buildDate = "Thu, 12 Dec 2013 23:37:06 GMT");
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function a() {
      throw "Sound cannot be instantiated";
    }
    function b(a, b) {
      this.init(a, b);
    }
    function c() {
      (this.isDefault = !0),
        (this.addEventListener =
          this.removeEventListener =
          this.removeAllEventListeners =
          this.dispatchEvent =
          this.hasEventListener =
          this._listeners =
          this._interrupt =
          this._playFailed =
          this.pause =
          this.resume =
          this.play =
          this._beginPlaying =
          this._cleanUp =
          this.stop =
          this.setMasterVolume =
          this.setVolume =
          this.mute =
          this.setMute =
          this.getMute =
          this.setPan =
          this.getPosition =
          this.setPosition =
          this.playFailed =
            function () {
              return !1;
            }),
        (this.getVolume =
          this.getPan =
          this.getDuration =
            function () {
              return 0;
            }),
        (this.playState = a.PLAY_FAILED),
        (this.toString = function () {
          return "[Sound Default Sound Instance]";
        });
    }
    function d() {}
    var e = a;
    (e.DELIMITER = "|"),
      (e.INTERRUPT_ANY = "any"),
      (e.INTERRUPT_EARLY = "early"),
      (e.INTERRUPT_LATE = "late"),
      (e.INTERRUPT_NONE = "none"),
      (e.PLAY_INITED = "playInited"),
      (e.PLAY_SUCCEEDED = "playSucceeded"),
      (e.PLAY_INTERRUPTED = "playInterrupted"),
      (e.PLAY_FINISHED = "playFinished"),
      (e.PLAY_FAILED = "playFailed"),
      (e.SUPPORTED_EXTENSIONS = [
        "mp3",
        "ogg",
        "mpeg",
        "wav",
        "m4a",
        "mp4",
        "aiff",
        "wma",
        "mid",
      ]),
      (e.EXTENSION_MAP = {
        m4a: "mp4",
      }),
      (e.FILE_PATTERN =
        /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/),
      (e.defaultInterruptBehavior = e.INTERRUPT_NONE),
      (e.alternateExtensions = []),
      (e._lastID = 0),
      (e.activePlugin = null),
      (e._pluginsRegistered = !1),
      (e._masterVolume = 1),
      (e._masterMute = !1),
      (e._instances = []),
      (e._idHash = {}),
      (e._preloadHash = {}),
      (e._defaultSoundInstance = null),
      (e.addEventListener = null),
      (e.removeEventListener = null),
      (e.removeAllEventListeners = null),
      (e.dispatchEvent = null),
      (e.hasEventListener = null),
      (e._listeners = null),
      createjs.EventDispatcher.initialize(e),
      (e._sendFileLoadEvent = function (a) {
        if (e._preloadHash[a])
          for (var b = 0, c = e._preloadHash[a].length; c > b; b++) {
            var d = e._preloadHash[a][b];
            if (((e._preloadHash[a][b] = !0), e.hasEventListener("fileload"))) {
              var f = new createjs.Event("fileload");
              (f.src = d.src),
                (f.id = d.id),
                (f.data = d.data),
                e.dispatchEvent(f);
            }
          }
      }),
      (e.getPreloadHandlers = function () {
        return {
          callback: createjs.proxy(e.initLoad, e),
          types: ["sound"],
          extensions: e.SUPPORTED_EXTENSIONS,
        };
      }),
      (e.registerPlugin = function (a) {
        try {
          console.log(
            "createjs.Sound.registerPlugin has been deprecated. Please use registerPlugins."
          );
        } catch (b) {}
        return e._registerPlugin(a);
      }),
      (e._registerPlugin = function (a) {
        return (
          (e._pluginsRegistered = !0),
          null == a
            ? !1
            : a.isSupported()
            ? ((e.activePlugin = new a()), !0)
            : !1
        );
      }),
      (e.registerPlugins = function (a) {
        for (var b = 0, c = a.length; c > b; b++) {
          var d = a[b];
          if (e._registerPlugin(d)) return !0;
        }
        return !1;
      }),
      (e.initializeDefaultPlugins = function () {
        return null != e.activePlugin
          ? !0
          : e._pluginsRegistered
          ? !1
          : e.registerPlugins([
              createjs.WebAudioPlugin,
              createjs.HTMLAudioPlugin,
            ])
          ? !0
          : !1;
      }),
      (e.isReady = function () {
        return null != e.activePlugin;
      }),
      (e.getCapabilities = function () {
        return null == e.activePlugin ? null : e.activePlugin._capabilities;
      }),
      (e.getCapability = function (a) {
        return null == e.activePlugin ? null : e.activePlugin._capabilities[a];
      }),
      (e.initLoad = function (a, b, c, d, f) {
        a = a.replace(f, "");
        var g = e.registerSound(a, c, d, !1, f);
        return null == g ? !1 : g;
      }),
      (e.registerSound = function (a, c, d, f, g) {
        if (!e.initializeDefaultPlugins()) return !1;
        if (
          (a instanceof Object &&
            ((g = c), (c = a.id), (d = a.data), (a = a.src)),
          e.alternateExtensions.length)
        )
          var h = e._parsePath2(a, "sound", c, d);
        else var h = e._parsePath(a, "sound", c, d);
        if (null == h) return !1;
        null != g && ((a = g + a), (h.src = g + h.src)),
          null != c && (e._idHash[c] = h.src);
        var i = null;
        null != d &&
          (isNaN(d.channels)
            ? isNaN(d) || (i = parseInt(d))
            : (i = parseInt(d.channels)));
        var j = e.activePlugin.register(h.src, i);
        if (
          (null != j &&
            (null != j.numChannels && (i = j.numChannels),
            b.create(h.src, i),
            null != d && isNaN(d)
              ? (d.channels = h.data.channels = i || b.maxPerChannel())
              : (d = h.data = i || b.maxPerChannel()),
            null != j.tag ? (h.tag = j.tag) : j.src && (h.src = j.src),
            null != j.completeHandler &&
              (h.completeHandler = j.completeHandler),
            j.type && (h.type = j.type)),
          0 != f)
        )
          if (
            (e._preloadHash[h.src] || (e._preloadHash[h.src] = []),
            e._preloadHash[h.src].push({
              src: a,
              id: c,
              data: d,
            }),
            1 == e._preloadHash[h.src].length)
          )
            e.activePlugin.preload(h.src, j);
          else if (1 == e._preloadHash[h.src][0]) return !0;
        return h;
      }),
      (e.registerManifest = function (a, b) {
        for (var c = [], d = 0, e = a.length; e > d; d++)
          c[d] = createjs.Sound.registerSound(
            a[d].src,
            a[d].id,
            a[d].data,
            a[d].preload,
            b
          );
        return c;
      }),
      (e.removeSound = function (a, c) {
        if (null == e.activePlugin) return !1;
        if (
          (a instanceof Object && (a = a.src),
          (a = e._getSrcById(a)),
          e.alternateExtensions.length)
        )
          var d = e._parsePath2(a);
        else var d = e._parsePath(a);
        if (null == d) return !1;
        null != c && (d.src = c + d.src), (a = d.src);
        for (var f in e._idHash) e._idHash[f] == a && delete e._idHash[f];
        return (
          b.removeSrc(a),
          delete e._preloadHash[a],
          e.activePlugin.removeSound(a),
          !0
        );
      }),
      (e.removeManifest = function (a, b) {
        for (var c = [], d = 0, e = a.length; e > d; d++)
          c[d] = createjs.Sound.removeSound(a[d].src, b);
        return c;
      }),
      (e.removeAllSounds = function () {
        (e._idHash = {}),
          (e._preloadHash = {}),
          b.removeAll(),
          e.activePlugin.removeAllSounds();
      }),
      (e.loadComplete = function (a) {
        if (e.alternateExtensions.length) var b = e._parsePath2(a, "sound");
        else var b = e._parsePath(a, "sound");
        return (
          (a = b ? e._getSrcById(b.src) : e._getSrcById(a)),
          1 == e._preloadHash[a][0]
        );
      }),
      (e._parsePath = function (a, b, c, d) {
        "string" != typeof a && (a = a.toString());
        var f = a.split(e.DELIMITER);
        if (f.length > 1)
          try {
            console.log(
              'createjs.Sound.DELIMITER "|" loading approach has been deprecated. Please use the new alternateExtensions property.'
            );
          } catch (g) {}
        for (
          var h = {
              type: b || "sound",
              id: c,
              data: d,
            },
            i = e.getCapabilities(),
            j = 0,
            k = f.length;
          k > j;
          j++
        ) {
          var l = f[j],
            m = l.match(e.FILE_PATTERN);
          if (null == m) return !1;
          var n = m[4],
            o = m[5];
          if (i[o] && createjs.indexOf(e.SUPPORTED_EXTENSIONS, o) > -1)
            return (h.name = n), (h.src = l), (h.extension = o), h;
        }
        return null;
      }),
      (e._parsePath2 = function (a, b, c, d) {
        "string" != typeof a && (a = a.toString());
        var f = a.match(e.FILE_PATTERN);
        if (null == f) return !1;
        for (var g = f[4], h = f[5], i = e.getCapabilities(), j = 0; !i[h]; )
          if (
            ((h = e.alternateExtensions[j++]), j > e.alternateExtensions.length)
          )
            return null;
        a = a.replace("." + f[5], "." + h);
        var k = {
          type: b || "sound",
          id: c,
          data: d,
        };
        return (k.name = g), (k.src = a), (k.extension = h), k;
      }),
      (e.play = function (a, b, c, d, f, g, h) {
        var i = e.createInstance(a),
          j = e._playInstance(i, b, c, d, f, g, h);
        return j || i.playFailed(), i;
      }),
      (e.createInstance = function (c) {
        if (!e.initializeDefaultPlugins()) return e._defaultSoundInstance;
        if (((c = e._getSrcById(c)), e.alternateExtensions.length))
          var d = e._parsePath2(c, "sound");
        else var d = e._parsePath(c, "sound");
        var f = null;
        return (
          null != d && null != d.src
            ? (b.create(d.src), (f = e.activePlugin.create(d.src)))
            : (f = a._defaultSoundInstance),
          (f.uniqueId = e._lastID++),
          f
        );
      }),
      (e.setVolume = function (a) {
        if (null == Number(a)) return !1;
        if (
          ((a = Math.max(0, Math.min(1, a))),
          (e._masterVolume = a),
          !this.activePlugin ||
            !this.activePlugin.setVolume ||
            !this.activePlugin.setVolume(a))
        )
          for (var b = this._instances, c = 0, d = b.length; d > c; c++)
            b[c].setMasterVolume(a);
      }),
      (e.getVolume = function () {
        return e._masterVolume;
      }),
      (e.setMute = function (a) {
        if (null == a || void 0 == a) return !1;
        if (
          ((this._masterMute = a),
          !this.activePlugin ||
            !this.activePlugin.setMute ||
            !this.activePlugin.setMute(a))
        )
          for (var b = this._instances, c = 0, d = b.length; d > c; c++)
            b[c].setMasterMute(a);
        return !0;
      }),
      (e.getMute = function () {
        return this._masterMute;
      }),
      (e.stop = function () {
        for (var a = this._instances, b = a.length; b--; ) a[b].stop();
      }),
      (e._playInstance = function (a, b, c, d, f, g, h) {
        if (
          (b instanceof Object &&
            ((c = b.delay),
            (d = b.offset),
            (f = b.loop),
            (g = b.volume),
            (h = b.pan),
            (b = b.interrupt)),
          (b = b || e.defaultInterruptBehavior),
          null == c && (c = 0),
          null == d && (d = a.getPosition()),
          null == f && (f = 0),
          null == g && (g = a.volume),
          null == h && (h = a.pan),
          0 == c)
        ) {
          var i = e._beginPlaying(a, b, d, f, g, h);
          if (!i) return !1;
        } else {
          var j = setTimeout(function () {
            e._beginPlaying(a, b, d, f, g, h);
          }, c);
          a._delayTimeoutId = j;
        }
        return this._instances.push(a), !0;
      }),
      (e._beginPlaying = function (a, c, d, e, f, g) {
        if (!b.add(a, c)) return !1;
        var h = a._beginPlaying(d, e, f, g);
        if (!h) {
          var i = createjs.indexOf(this._instances, a);
          return i > -1 && this._instances.splice(i, 1), !1;
        }
        return !0;
      }),
      (e._getSrcById = function (a) {
        return null == e._idHash || null == e._idHash[a] ? a : e._idHash[a];
      }),
      (e._playFinished = function (a) {
        b.remove(a);
        var c = createjs.indexOf(this._instances, a);
        c > -1 && this._instances.splice(c, 1);
      }),
      (createjs.Sound = a),
      (b.channels = {}),
      (b.create = function (a, c) {
        var d = b.get(a);
        return null == d ? ((b.channels[a] = new b(a, c)), !0) : !1;
      }),
      (b.removeSrc = function (a) {
        var c = b.get(a);
        return null == c ? !1 : (c.removeAll(), delete b.channels[a], !0);
      }),
      (b.removeAll = function () {
        for (var a in b.channels) b.channels[a].removeAll();
        b.channels = {};
      }),
      (b.add = function (a, c) {
        var d = b.get(a.src);
        return null == d ? !1 : d.add(a, c);
      }),
      (b.remove = function (a) {
        var c = b.get(a.src);
        return null == c ? !1 : (c.remove(a), !0);
      }),
      (b.maxPerChannel = function () {
        return f.maxDefault;
      }),
      (b.get = function (a) {
        return b.channels[a];
      });
    var f = b.prototype;
    (f.src = null),
      (f.max = null),
      (f.maxDefault = 100),
      (f.length = 0),
      (f.init = function (a, b) {
        (this.src = a),
          (this.max = b || this.maxDefault),
          -1 == this.max && (this.max = this.maxDefault),
          (this._instances = []);
      }),
      (f.get = function (a) {
        return this._instances[a];
      }),
      (f.add = function (a, b) {
        return this.getSlot(b, a)
          ? (this._instances.push(a), this.length++, !0)
          : !1;
      }),
      (f.remove = function (a) {
        var b = createjs.indexOf(this._instances, a);
        return -1 == b ? !1 : (this._instances.splice(b, 1), this.length--, !0);
      }),
      (f.removeAll = function () {
        for (var a = this.length - 1; a >= 0; a--) this._instances[a].stop();
      }),
      (f.getSlot = function (b) {
        for (var c, d, e = 0, f = this.max; f > e; e++) {
          if (((c = this.get(e)), null == c)) return !0;
          (b != a.INTERRUPT_NONE || c.playState == a.PLAY_FINISHED) &&
            (0 != e
              ? c.playState == a.PLAY_FINISHED ||
                c.playState == a.PLAY_INTERRUPTED ||
                c.playState == a.PLAY_FAILED
                ? (d = c)
                : ((b == a.INTERRUPT_EARLY &&
                    c.getPosition() < d.getPosition()) ||
                    (b == a.INTERRUPT_LATE &&
                      c.getPosition() > d.getPosition())) &&
                  (d = c)
              : (d = c));
        }
        return null != d ? (d._interrupt(), this.remove(d), !0) : !1;
      }),
      (f.toString = function () {
        return "[Sound SoundChannel]";
      }),
      (a._defaultSoundInstance = new c()),
      (d.init = function () {
        var a = window.navigator.userAgent;
        (d.isFirefox = a.indexOf("Firefox") > -1),
          (d.isOpera = null != window.opera),
          (d.isChrome = a.indexOf("Chrome") > -1),
          (d.isIOS =
            a.indexOf("iPod") > -1 ||
            a.indexOf("iPhone") > -1 ||
            a.indexOf("iPad") > -1),
          (d.isAndroid = a.indexOf("Android") > -1),
          (d.isBlackberry = a.indexOf("Blackberry") > -1);
      }),
      d.init(),
      (createjs.Sound.BrowserDetect = d);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function a() {
      this._init();
    }
    var b = a;
    (b._capabilities = null),
      (b.isSupported = function () {
        var a =
          createjs.Sound.BrowserDetect.isIOS ||
          createjs.Sound.BrowserDetect.isAndroid ||
          createjs.Sound.BrowserDetect.isBlackberry;
        return "file:" != location.protocol || a || this._isFileXHRSupported()
          ? (b._generateCapabilities(), null == b.context ? !1 : !0)
          : !1;
      }),
      (b._isFileXHRSupported = function () {
        var a = !0,
          b = new XMLHttpRequest();
        try {
          b.open("GET", "fail.fail", !1);
        } catch (c) {
          return (a = !1);
        }
        (b.onerror = function () {
          a = !1;
        }),
          (b.onload = function () {
            a =
              404 == this.status ||
              200 == this.status ||
              (0 == this.status && "" != this.response);
          });
        try {
          b.send();
        } catch (c) {
          a = !1;
        }
        return a;
      }),
      (b._generateCapabilities = function () {
        if (null == b._capabilities) {
          var a = document.createElement("audio");
          if (null == a.canPlayType) return null;
          if (window.webkitAudioContext) b.context = new webkitAudioContext();
          else {
            if (!window.AudioContext) return null;
            b.context = new AudioContext();
          }
          b._compatibilitySetUp(),
            b.playEmptySound(),
            (b._capabilities = {
              panning: !0,
              volume: !0,
              tracks: -1,
            });
          for (
            var c = createjs.Sound.SUPPORTED_EXTENSIONS,
              d = createjs.Sound.EXTENSION_MAP,
              e = 0,
              f = c.length;
            f > e;
            e++
          ) {
            var g = c[e],
              h = d[g] || g;
            b._capabilities[g] =
              ("no" != a.canPlayType("audio/" + g) &&
                "" != a.canPlayType("audio/" + g)) ||
              ("no" != a.canPlayType("audio/" + h) &&
                "" != a.canPlayType("audio/" + h));
          }
          b.context.destination.numberOfChannels < 2 &&
            (b._capabilities.panning = !1),
            (b.dynamicsCompressorNode = b.context.createDynamicsCompressor()),
            b.dynamicsCompressorNode.connect(b.context.destination),
            (b.gainNode = b.context.createGain()),
            b.gainNode.connect(b.dynamicsCompressorNode);
        }
      }),
      (b._compatibilitySetUp = function () {
        if (!b.context.createGain) {
          b.context.createGain = b.context.createGainNode;
          var a = b.context.createBufferSource();
          (a.__proto__.start = a.__proto__.noteGrainOn),
            (a.__proto__.stop = a.__proto__.noteOff),
            (this._panningModel = 0);
        }
      }),
      (b.playEmptySound = function () {
        var a = this.context.createBuffer(1, 1, 22050),
          b = this.context.createBufferSource();
        (b.buffer = a), b.connect(this.context.destination), b.start(0, 0, 0);
      });
    var c = a.prototype;
    (c._capabilities = null),
      (c._volume = 1),
      (c.context = null),
      (c._panningModel = "equalpower"),
      (c.dynamicsCompressorNode = null),
      (c.gainNode = null),
      (c._arrayBuffers = null),
      (c._init = function () {
        (this._capabilities = b._capabilities),
          (this._arrayBuffers = {}),
          (this.context = b.context),
          (this.gainNode = b.gainNode),
          (this.dynamicsCompressorNode = b.dynamicsCompressorNode);
      }),
      (c.register = function (a) {
        this._arrayBuffers[a] = !0;
        var b = new createjs.WebAudioPlugin.Loader(a, this);
        return {
          tag: b,
        };
      }),
      (c.isPreloadStarted = function (a) {
        return null != this._arrayBuffers[a];
      }),
      (c.isPreloadComplete = function (a) {
        return !(null == this._arrayBuffers[a] || 1 == this._arrayBuffers[a]);
      }),
      (c.removeSound = function (a) {
        delete this._arrayBuffers[a];
      }),
      (c.removeAllSounds = function () {
        this._arrayBuffers = {};
      }),
      (c.addPreloadResults = function (a, b) {
        this._arrayBuffers[a] = b;
      }),
      (c._handlePreloadComplete = function () {
        createjs.Sound._sendFileLoadEvent(this.src);
      }),
      (c.preload = function (a) {
        this._arrayBuffers[a] = !0;
        var b = new createjs.WebAudioPlugin.Loader(a, this);
        (b.onload = this._handlePreloadComplete), b.load();
      }),
      (c.create = function (a) {
        return (
          this.isPreloadStarted(a) || this.preload(a),
          new createjs.WebAudioPlugin.SoundInstance(a, this)
        );
      }),
      (c.setVolume = function (a) {
        return (this._volume = a), this._updateVolume(), !0;
      }),
      (c._updateVolume = function () {
        var a = createjs.Sound._masterMute ? 0 : this._volume;
        a != this.gainNode.gain.value && (this.gainNode.gain.value = a);
      }),
      (c.getVolume = function () {
        return this._volume;
      }),
      (c.setMute = function () {
        return this._updateVolume(), !0;
      }),
      (c.toString = function () {
        return "[WebAudioPlugin]";
      }),
      (createjs.WebAudioPlugin = a);
  })(),
  (function () {
    "use strict";
    function a(a, b) {
      this._init(a, b);
    }
    var b = (a.prototype = new createjs.EventDispatcher());
    (b.src = null),
      (b.uniqueId = -1),
      (b.playState = null),
      (b._owner = null),
      (b._offset = 0),
      (b._delay = 0),
      (b._volume = 1);
    try {
      Object.defineProperty(b, "volume", {
        get: function () {
          return this._volume;
        },
        set: function (a) {
          return null == Number(a)
            ? !1
            : ((a = Math.max(0, Math.min(1, a))),
              (this._volume = a),
              this._updateVolume(),
              void 0);
        },
      });
    } catch (c) {}
    b._pan = 0;
    try {
      Object.defineProperty(b, "pan", {
        get: function () {
          return this._pan;
        },
        set: function (a) {
          return this._owner._capabilities.panning && null != Number(a)
            ? ((a = Math.max(-1, Math.min(1, a))),
              (this._pan = a),
              this.panNode.setPosition(a, 0, -0.5),
              void 0)
            : !1;
        },
      });
    } catch (c) {}
    (b._duration = 0),
      (b._remainingLoops = 0),
      (b._delayTimeoutId = null),
      (b._soundCompleteTimeout = null),
      (b.gainNode = null),
      (b.panNode = null),
      (b.sourceNode = null),
      (b._sourceNodeNext = null),
      (b._muted = !1),
      (b._paused = !1),
      (b._startTime = 0),
      (b._endedHandler = null),
      (b._sendEvent = function (a) {
        var b = new createjs.Event(a);
        this.dispatchEvent(b);
      }),
      (b._init = function (a, b) {
        (this._owner = b),
          (this.src = a),
          (this.gainNode = this._owner.context.createGain()),
          (this.panNode = this._owner.context.createPanner()),
          (this.panNode.panningModel = this._owner._panningModel),
          this.panNode.connect(this.gainNode),
          this._owner.isPreloadComplete(this.src) &&
            (this._duration =
              1e3 * this._owner._arrayBuffers[this.src].duration),
          (this._endedHandler = createjs.proxy(
            this._handleSoundComplete,
            this
          ));
      }),
      (b._cleanUp = function () {
        this.sourceNode &&
          this.playState == createjs.Sound.PLAY_SUCCEEDED &&
          ((this.sourceNode = this._cleanUpAudioNode(this.sourceNode)),
          (this._sourceNodeNext = this._cleanUpAudioNode(
            this._sourceNodeNext
          ))),
          0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0),
          clearTimeout(this._delayTimeoutId),
          clearTimeout(this._soundCompleteTimeout),
          (this._startTime = 0),
          null != window.createjs && createjs.Sound._playFinished(this);
      }),
      (b._cleanUpAudioNode = function (a) {
        return a && (a.stop(0), a.disconnect(this.panNode), (a = null)), a;
      }),
      (b._interrupt = function () {
        this._cleanUp(),
          (this.playState = createjs.Sound.PLAY_INTERRUPTED),
          (this._paused = !1),
          this._sendEvent("interrupted");
      }),
      (b._handleSoundReady = function () {
        if (null != window.createjs) {
          if (1e3 * this._offset > this.getDuration())
            return this.playFailed(), void 0;
          this._offset < 0 && (this._offset = 0),
            (this.playState = createjs.Sound.PLAY_SUCCEEDED),
            (this._paused = !1),
            this.gainNode.connect(this._owner.gainNode);
          var a = this._owner._arrayBuffers[this.src].duration;
          (this.sourceNode = this._createAndPlayAudioNode(
            this._owner.context.currentTime - a,
            this._offset
          )),
            (this._duration = 1e3 * a),
            (this._startTime = this.sourceNode.startTime - this._offset),
            (this._soundCompleteTimeout = setTimeout(
              this._endedHandler,
              1e3 * (a - this._offset)
            )),
            0 != this._remainingLoops &&
              (this._sourceNodeNext = this._createAndPlayAudioNode(
                this._startTime,
                0
              ));
        }
      }),
      (b._createAndPlayAudioNode = function (a, b) {
        var c = this._owner.context.createBufferSource();
        return (
          (c.buffer = this._owner._arrayBuffers[this.src]),
          c.connect(this.panNode),
          this._owner.context.currentTime,
          (c.startTime = a + c.buffer.duration),
          c.start(c.startTime, b, c.buffer.duration - b),
          c
        );
      }),
      (b.play = function (a, b, c, d, e, f) {
        this._cleanUp(), createjs.Sound._playInstance(this, a, b, c, d, e, f);
      }),
      (b._beginPlaying = function (a, b, c, d) {
        return null != window.createjs && this.src
          ? ((this._offset = a / 1e3),
            (this._remainingLoops = b),
            (this.volume = c),
            (this.pan = d),
            this._owner.isPreloadComplete(this.src)
              ? (this._handleSoundReady(null), this._sendEvent("succeeded"), 1)
              : (this.playFailed(), void 0))
          : void 0;
      }),
      (b.pause = function () {
        return this._paused || this.playState != createjs.Sound.PLAY_SUCCEEDED
          ? !1
          : ((this._paused = !0),
            (this._offset = this._owner.context.currentTime - this._startTime),
            this._cleanUpAudioNode(this.sourceNode),
            this._cleanUpAudioNode(this._sourceNodeNext),
            0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(),
            clearTimeout(this._delayTimeoutId),
            clearTimeout(this._soundCompleteTimeout),
            !0);
      }),
      (b.resume = function () {
        return this._paused ? (this._handleSoundReady(null), !0) : !1;
      }),
      (b.stop = function () {
        return (
          this._cleanUp(),
          (this.playState = createjs.Sound.PLAY_FINISHED),
          (this._offset = 0),
          !0
        );
      }),
      (b.setVolume = function (a) {
        return (this.volume = a), !0;
      }),
      (b._updateVolume = function () {
        var a = this._muted ? 0 : this._volume;
        return a != this.gainNode.gain.value
          ? ((this.gainNode.gain.value = a), !0)
          : !1;
      }),
      (b.getVolume = function () {
        return this.volume;
      }),
      (b.setMute = function (a) {
        return null == a || void 0 == a
          ? !1
          : ((this._muted = a), this._updateVolume(), !0);
      }),
      (b.getMute = function () {
        return this._muted;
      }),
      (b.setPan = function (a) {
        return (this.pan = a), this.pan != a ? !1 : void 0;
      }),
      (b.getPan = function () {
        return this.pan;
      }),
      (b.getPosition = function () {
        if (this._paused || null == this.sourceNode) var a = this._offset;
        else var a = this._owner.context.currentTime - this._startTime;
        return 1e3 * a;
      }),
      (b.setPosition = function (a) {
        return (
          (this._offset = a / 1e3),
          this.sourceNode &&
            this.playState == createjs.Sound.PLAY_SUCCEEDED &&
            (this._cleanUpAudioNode(this.sourceNode),
            this._cleanUpAudioNode(this._sourceNodeNext),
            clearTimeout(this._soundCompleteTimeout)),
          this._paused ||
            this.playState != createjs.Sound.PLAY_SUCCEEDED ||
            this._handleSoundReady(null),
          !0
        );
      }),
      (b.getDuration = function () {
        return this._duration;
      }),
      (b._handleSoundComplete = function () {
        return (
          (this._offset = 0),
          0 != this._remainingLoops
            ? (this._remainingLoops--,
              this._sourceNodeNext
                ? (this._cleanUpAudioNode(this.sourceNode),
                  (this.sourceNode = this._sourceNodeNext),
                  (this._startTime = this.sourceNode.startTime),
                  (this._sourceNodeNext = this._createAndPlayAudioNode(
                    this._startTime,
                    0
                  )),
                  (this._soundCompleteTimeout = setTimeout(
                    this._endedHandler,
                    this._duration
                  )))
                : this._handleSoundReady(null),
              this._sendEvent("loop"),
              void 0)
            : (null != window.createjs &&
                (this._cleanUp(),
                (this.playState = createjs.Sound.PLAY_FINISHED),
                this._sendEvent("complete")),
              void 0)
        );
      }),
      (b.playFailed = function () {
        null != window.createjs &&
          (this._cleanUp(),
          (this.playState = createjs.Sound.PLAY_FAILED),
          this._sendEvent("failed"));
      }),
      (b.toString = function () {
        return "[WebAudioPlugin SoundInstance]";
      }),
      (createjs.WebAudioPlugin.SoundInstance = a);
  })(),
  (function () {
    "use strict";
    function a(a, b) {
      this._init(a, b);
    }
    var b = a.prototype;
    (b.request = null),
      (b.owner = null),
      (b.progress = -1),
      (b.src = null),
      (b.originalSrc = null),
      (b.result = null),
      (b.onload = null),
      (b.onprogress = null),
      (b.onError = null),
      (b._init = function (a, b) {
        (this.src = a), (this.originalSrc = a), (this.owner = b);
      }),
      (b.load = function (a) {
        null != a && (this.src = a),
          (this.request = new XMLHttpRequest()),
          this.request.open("GET", this.src, !0),
          (this.request.responseType = "arraybuffer"),
          (this.request.onload = createjs.proxy(this.handleLoad, this)),
          (this.request.onError = createjs.proxy(this.handleError, this)),
          (this.request.onprogress = createjs.proxy(this.handleProgress, this)),
          this.request.send();
      }),
      (b.handleProgress = function (a, b) {
        (this.progress = a / b),
          null != this.onprogress &&
            this.onprogress({
              loaded: a,
              total: b,
              progress: this.progress,
            });
      }),
      (b.handleLoad = function () {
        this.owner.context.decodeAudioData(
          this.request.response,
          createjs.proxy(this.handleAudioDecoded, this),
          createjs.proxy(this.handleError, this)
        );
      }),
      (b.handleAudioDecoded = function (a) {
        (this.progress = 1),
          (this.result = a),
          (this.src = this.originalSrc),
          this.owner.addPreloadResults(this.src, this.result),
          this.onload && this.onload();
      }),
      (b.handleError = function (a) {
        this.owner.removeSound(this.src), this.onerror && this.onerror(a);
      }),
      (b.toString = function () {
        return "[WebAudioPlugin Loader]";
      }),
      (createjs.WebAudioPlugin.Loader = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    function a() {
      this._init();
    }
    var b = a;
    (b.MAX_INSTANCES = 30),
      (b._AUDIO_READY = "canplaythrough"),
      (b._AUDIO_ENDED = "ended"),
      (b._AUDIO_SEEKED = "seeked"),
      (b._AUDIO_STALLED = "stalled"),
      (b._capabilities = null),
      (b.enableIOS = !1),
      (b.isSupported = function () {
        if (createjs.Sound.BrowserDetect.isIOS && !b.enableIOS) return !1;
        b._generateCapabilities();
        var a = b.tag;
        return null == a || null == b._capabilities ? !1 : !0;
      }),
      (b._generateCapabilities = function () {
        if (null == b._capabilities) {
          var a = (b.tag = document.createElement("audio"));
          if (null == a.canPlayType) return null;
          b._capabilities = {
            panning: !0,
            volume: !0,
            tracks: -1,
          };
          for (
            var c = createjs.Sound.SUPPORTED_EXTENSIONS,
              d = createjs.Sound.EXTENSION_MAP,
              e = 0,
              f = c.length;
            f > e;
            e++
          ) {
            var g = c[e],
              h = d[g] || g;
            b._capabilities[g] =
              ("no" != a.canPlayType("audio/" + g) &&
                "" != a.canPlayType("audio/" + g)) ||
              ("no" != a.canPlayType("audio/" + h) &&
                "" != a.canPlayType("audio/" + h));
          }
        }
      });
    var c = a.prototype;
    (c._capabilities = null),
      (c._audioSources = null),
      (c.defaultNumChannels = 2),
      (c.loadedHandler = null),
      (c._init = function () {
        (this._capabilities = b._capabilities), (this._audioSources = {});
      }),
      (c.register = function (a, b) {
        this._audioSources[a] = !0;
        for (
          var c = createjs.HTMLAudioPlugin.TagPool.get(a),
            d = null,
            e = b || this.defaultNumChannels,
            f = 0;
          e > f;
          f++
        )
          (d = this._createTag(a)), c.add(d);
        if (
          ((d.id = a),
          (this.loadedHandler = createjs.proxy(this._handleTagLoad, this)),
          d.addEventListener &&
            d.addEventListener("canplaythrough", this.loadedHandler),
          null == d.onreadystatechange)
        )
          d.onreadystatechange = this.loadedHandler;
        else {
          var g = d.onreadystatechange;
          d.onreadystatechange = function () {
            g(), this.loadedHandler();
          };
        }
        return {
          tag: d,
          numChannels: e,
        };
      }),
      (c._handleTagLoad = function (a) {
        a.target.removeEventListener &&
          a.target.removeEventListener("canplaythrough", this.loadedHandler),
          (a.target.onreadystatechange = null),
          a.target.src != a.target.id &&
            createjs.HTMLAudioPlugin.TagPool.checkSrc(a.target.id);
      }),
      (c._createTag = function (a) {
        var b = document.createElement("audio");
        return (b.autoplay = !1), (b.preload = "none"), (b.src = a), b;
      }),
      (c.removeSound = function (a) {
        delete this._audioSources[a],
          createjs.HTMLAudioPlugin.TagPool.remove(a);
      }),
      (c.removeAllSounds = function () {
        (this._audioSources = {}), createjs.HTMLAudioPlugin.TagPool.removeAll();
      }),
      (c.create = function (a) {
        if (!this.isPreloadStarted(a)) {
          var b = createjs.HTMLAudioPlugin.TagPool.get(a),
            c = this._createTag(a);
          (c.id = a),
            b.add(c),
            this.preload(a, {
              tag: c,
            });
        }
        return new createjs.HTMLAudioPlugin.SoundInstance(a, this);
      }),
      (c.isPreloadStarted = function (a) {
        return null != this._audioSources[a];
      }),
      (c.preload = function (a, b) {
        (this._audioSources[a] = !0),
          new createjs.HTMLAudioPlugin.Loader(a, b.tag);
      }),
      (c.toString = function () {
        return "[HTMLAudioPlugin]";
      }),
      (createjs.HTMLAudioPlugin = a);
  })(),
  (function () {
    "use strict";
    function a(a, b) {
      this._init(a, b);
    }
    var b = (a.prototype = new createjs.EventDispatcher());
    (b.src = null),
      (b.uniqueId = -1),
      (b.playState = null),
      (b._owner = null),
      (b.loaded = !1),
      (b._offset = 0),
      (b._delay = 0),
      (b._volume = 1);
    try {
      Object.defineProperty(b, "volume", {
        get: function () {
          return this._volume;
        },
        set: function (a) {
          null != Number(a) &&
            ((a = Math.max(0, Math.min(1, a))),
            (this._volume = a),
            this._updateVolume());
        },
      });
    } catch (c) {}
    (b.pan = 0),
      (b._duration = 0),
      (b._remainingLoops = 0),
      (b._delayTimeoutId = null),
      (b.tag = null),
      (b._muted = !1),
      (b._paused = !1),
      (b._endedHandler = null),
      (b._readyHandler = null),
      (b._stalledHandler = null),
      (b.loopHandler = null),
      (b._init = function (a, b) {
        (this.src = a),
          (this._owner = b),
          (this._endedHandler = createjs.proxy(
            this._handleSoundComplete,
            this
          )),
          (this._readyHandler = createjs.proxy(this._handleSoundReady, this)),
          (this._stalledHandler = createjs.proxy(
            this._handleSoundStalled,
            this
          )),
          (this.loopHandler = createjs.proxy(this.handleSoundLoop, this));
      }),
      (b._sendEvent = function (a) {
        var b = new createjs.Event(a);
        this.dispatchEvent(b);
      }),
      (b._cleanUp = function () {
        var a = this.tag;
        if (null != a) {
          a.pause(),
            a.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_ENDED,
              this._endedHandler,
              !1
            ),
            a.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_READY,
              this._readyHandler,
              !1
            ),
            a.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_SEEKED,
              this.loopHandler,
              !1
            );
          try {
            a.currentTime = 0;
          } catch (b) {}
          createjs.HTMLAudioPlugin.TagPool.setInstance(this.src, a),
            (this.tag = null);
        }
        clearTimeout(this._delayTimeoutId),
          null != window.createjs && createjs.Sound._playFinished(this);
      }),
      (b._interrupt = function () {
        null != this.tag &&
          ((this.playState = createjs.Sound.PLAY_INTERRUPTED),
          this._cleanUp(),
          (this._paused = !1),
          this._sendEvent("interrupted"));
      }),
      (b.play = function (a, b, c, d, e, f) {
        this._cleanUp(), createjs.Sound._playInstance(this, a, b, c, d, e, f);
      }),
      (b._beginPlaying = function (a, b, c, d) {
        if (null == window.createjs) return -1;
        var e = (this.tag = createjs.HTMLAudioPlugin.TagPool.getInstance(
          this.src
        ));
        return null == e
          ? (this.playFailed(), -1)
          : (e.addEventListener(
              createjs.HTMLAudioPlugin._AUDIO_ENDED,
              this._endedHandler,
              !1
            ),
            (this._offset = a),
            (this.volume = c),
            (this.pan = d),
            this._updateVolume(),
            (this._remainingLoops = b),
            4 !== e.readyState
              ? (e.addEventListener(
                  createjs.HTMLAudioPlugin._AUDIO_READY,
                  this._readyHandler,
                  !1
                ),
                e.addEventListener(
                  createjs.HTMLAudioPlugin._AUDIO_STALLED,
                  this._stalledHandler,
                  !1
                ),
                (e.preload = "auto"),
                e.load())
              : this._handleSoundReady(null),
            this._sendEvent("succeeded"),
            1);
      }),
      (b._handleSoundStalled = function () {
        this._cleanUp(), this._sendEvent("failed");
      }),
      (b._handleSoundReady = function () {
        if (null != window.createjs) {
          if (
            ((this._duration = 1e3 * this.tag.duration),
            (this.playState = createjs.Sound.PLAY_SUCCEEDED),
            (this._paused = !1),
            this.tag.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_READY,
              this._readyHandler,
              !1
            ),
            this._offset >= this.getDuration())
          )
            return this.playFailed(), void 0;
          this._offset > 0 && (this.tag.currentTime = 0.001 * this._offset),
            -1 == this._remainingLoops && (this.tag.loop = !0),
            0 != this._remainingLoops &&
              (this.tag.addEventListener(
                createjs.HTMLAudioPlugin._AUDIO_SEEKED,
                this.loopHandler,
                !1
              ),
              (this.tag.loop = !0)),
            this.tag.play();
        }
      }),
      (b.pause = function () {
        return this._paused ||
          this.playState != createjs.Sound.PLAY_SUCCEEDED ||
          null == this.tag
          ? !1
          : ((this._paused = !0),
            this.tag.pause(),
            clearTimeout(this._delayTimeoutId),
            !0);
      }),
      (b.resume = function () {
        return this._paused && null != this.tag
          ? ((this._paused = !1), this.tag.play(), !0)
          : !1;
      }),
      (b.stop = function () {
        return (
          (this._offset = 0),
          this.pause(),
          (this.playState = createjs.Sound.PLAY_FINISHED),
          this._cleanUp(),
          !0
        );
      }),
      (b.setMasterVolume = function () {
        return this._updateVolume(), !0;
      }),
      (b.setVolume = function (a) {
        return (this.volume = a), !0;
      }),
      (b._updateVolume = function () {
        if (null != this.tag) {
          var a =
            this._muted || createjs.Sound._masterMute
              ? 0
              : this._volume * createjs.Sound._masterVolume;
          return a != this.tag.volume && (this.tag.volume = a), !0;
        }
        return !1;
      }),
      (b.getVolume = function () {
        return this.volume;
      }),
      (b.setMasterMute = function () {
        return this._updateVolume(), !0;
      }),
      (b.setMute = function (a) {
        return null == a || void 0 == a
          ? !1
          : ((this._muted = a), this._updateVolume(), !0);
      }),
      (b.getMute = function () {
        return this._muted;
      }),
      (b.setPan = function () {
        return !1;
      }),
      (b.getPan = function () {
        return 0;
      }),
      (b.getPosition = function () {
        return null == this.tag ? this._offset : 1e3 * this.tag.currentTime;
      }),
      (b.setPosition = function (a) {
        if (null == this.tag) this._offset = a;
        else {
          this.tag.removeEventListener(
            createjs.HTMLAudioPlugin._AUDIO_SEEKED,
            this.loopHandler,
            !1
          );
          try {
            this.tag.currentTime = 0.001 * a;
          } catch (b) {
            return !1;
          }
          this.tag.addEventListener(
            createjs.HTMLAudioPlugin._AUDIO_SEEKED,
            this.loopHandler,
            !1
          );
        }
        return !0;
      }),
      (b.getDuration = function () {
        return this._duration;
      }),
      (b._handleSoundComplete = function () {
        (this._offset = 0),
          null != window.createjs &&
            ((this.playState = createjs.Sound.PLAY_FINISHED),
            this._cleanUp(),
            this._sendEvent("complete"));
      }),
      (b.handleSoundLoop = function () {
        (this._offset = 0),
          this._remainingLoops--,
          0 == this._remainingLoops &&
            ((this.tag.loop = !1),
            this.tag.removeEventListener(
              createjs.HTMLAudioPlugin._AUDIO_SEEKED,
              this.loopHandler,
              !1
            )),
          this._sendEvent("loop");
      }),
      (b.playFailed = function () {
        null != window.createjs &&
          ((this.playState = createjs.Sound.PLAY_FAILED),
          this._cleanUp(),
          this._sendEvent("failed"));
      }),
      (b.toString = function () {
        return "[HTMLAudioPlugin SoundInstance]";
      }),
      (createjs.HTMLAudioPlugin.SoundInstance = a);
  })(),
  (function () {
    "use strict";
    function a(a, b) {
      this._init(a, b);
    }
    var b = a.prototype;
    (b.src = null),
      (b.tag = null),
      (b.preloadTimer = null),
      (b.loadedHandler = null),
      (b._init = function (a, b) {
        if (
          ((this.src = a),
          (this.tag = b),
          (this.preloadTimer = setInterval(
            createjs.proxy(this.preloadTick, this),
            200
          )),
          (this.loadedHandler = createjs.proxy(this.sendLoadedEvent, this)),
          this.tag.addEventListener &&
            this.tag.addEventListener("canplaythrough", this.loadedHandler),
          null == this.tag.onreadystatechange)
        )
          this.tag.onreadystatechange = createjs.proxy(
            this.sendLoadedEvent,
            this
          );
        else {
          var c = this.tag.onreadystatechange;
          this.tag.onreadystatechange = function () {
            c(),
              (this.tag.onreadystatechange = createjs.proxy(
                this.sendLoadedEvent,
                this
              ));
          };
        }
        (this.tag.preload = "auto"), this.tag.load();
      }),
      (b.preloadTick = function () {
        var a = this.tag.buffered,
          b = this.tag.duration;
        a.length > 0 && a.end(0) >= b - 1 && this.handleTagLoaded();
      }),
      (b.handleTagLoaded = function () {
        clearInterval(this.preloadTimer);
      }),
      (b.sendLoadedEvent = function () {
        this.tag.removeEventListener &&
          this.tag.removeEventListener("canplaythrough", this.loadedHandler),
          (this.tag.onreadystatechange = null),
          createjs.Sound._sendFileLoadEvent(this.src);
      }),
      (b.toString = function () {
        return "[HTMLAudioPlugin Loader]";
      }),
      (createjs.HTMLAudioPlugin.Loader = a);
  })(),
  (function () {
    "use strict";
    function a(a) {
      this._init(a);
    }
    var b = a;
    (b.tags = {}),
      (b.get = function (c) {
        var d = b.tags[c];
        return null == d && (d = b.tags[c] = new a(c)), d;
      }),
      (b.remove = function (a) {
        var c = b.tags[a];
        return null == c ? !1 : (c.removeAll(), delete b.tags[a], !0);
      }),
      (b.removeAll = function () {
        for (var a in b.tags) b.tags[a].removeAll();
        b.tags = {};
      }),
      (b.getInstance = function (a) {
        var c = b.tags[a];
        return null == c ? null : c.get();
      }),
      (b.setInstance = function (a, c) {
        var d = b.tags[a];
        return null == d ? null : d.set(c);
      }),
      (b.checkSrc = function (a) {
        var c = b.tags[a];
        return null == c ? null : (c.checkSrcChange(), void 0);
      });
    var c = a.prototype;
    (c.src = null),
      (c.length = 0),
      (c.available = 0),
      (c.tags = null),
      (c._init = function (a) {
        (this.src = a), (this.tags = []);
      }),
      (c.add = function (a) {
        this.tags.push(a), this.length++, this.available++;
      }),
      (c.removeAll = function () {
        for (; this.length--; ) delete this.tags[this.length];
        (this.src = null), (this.tags.length = 0);
      }),
      (c.get = function () {
        if (0 == this.tags.length) return null;
        this.available = this.tags.length;
        var a = this.tags.pop();
        return null == a.parentNode && document.body.appendChild(a), a;
      }),
      (c.set = function (a) {
        var b = createjs.indexOf(this.tags, a);
        -1 == b && this.tags.push(a), (this.available = this.tags.length);
      }),
      (c.checkSrcChange = function () {
        for (var a = this.tags.length - 1, b = this.tags[a].src; a--; )
          this.tags[a].src = b;
      }),
      (c.toString = function () {
        return "[HTMLAudioPlugin TagPool]";
      }),
      (createjs.HTMLAudioPlugin.TagPool = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c) {
        this.initialize(a, b, c);
      },
      b = (a.prototype = new createjs.EventDispatcher());
    (a.NONE = 0),
      (a.LOOP = 1),
      (a.REVERSE = 2),
      (a.IGNORE = {}),
      (a._tweens = []),
      (a._plugins = {}),
      (a.get = function (b, c, d, e) {
        return e && a.removeTweens(b), new a(b, c, d);
      }),
      (a.tick = function (b, c) {
        for (var d = a._tweens.slice(), e = d.length - 1; e >= 0; e--) {
          var f = d[e];
          (c && !f.ignoreGlobalPause) ||
            f._paused ||
            f.tick(f._useTicks ? 1 : b);
        }
      }),
      (a.handleEvent = function (a) {
        "tick" == a.type && this.tick(a.delta, a.paused);
      }),
      (a.removeTweens = function (b) {
        if (b.tweenjs_count) {
          for (var c = a._tweens, d = c.length - 1; d >= 0; d--)
            c[d]._target == b && ((c[d]._paused = !0), c.splice(d, 1));
          b.tweenjs_count = 0;
        }
      }),
      (a.removeAllTweens = function () {
        for (var b = a._tweens, c = 0, d = b.length; d > c; c++) {
          var e = b[c];
          (e.paused = !0), (e.target.tweenjs_count = 0);
        }
        b.length = 0;
      }),
      (a.hasActiveTweens = function (b) {
        return b ? b.tweenjs_count : a._tweens && !!a._tweens.length;
      }),
      (a.installPlugin = function (b, c) {
        var d = b.priority;
        null == d && (b.priority = d = 0);
        for (var e = 0, f = c.length, g = a._plugins; f > e; e++) {
          var h = c[e];
          if (g[h]) {
            for (
              var i = g[h], j = 0, k = i.length;
              k > j && !(d < i[j].priority);
              j++
            );
            g[h].splice(j, 0, b);
          } else g[h] = [b];
        }
      }),
      (a._register = function (b, c) {
        var d = b._target,
          e = a._tweens;
        if (c)
          d && (d.tweenjs_count = d.tweenjs_count ? d.tweenjs_count + 1 : 1),
            e.push(b),
            !a._inited &&
              createjs.Ticker &&
              (createjs.Ticker.addEventListener("tick", a), (a._inited = !0));
        else {
          d && d.tweenjs_count--;
          for (var f = e.length; f--; )
            if (e[f] == b) return e.splice(f, 1), void 0;
        }
      }),
      (b.ignoreGlobalPause = !1),
      (b.loop = !1),
      (b.duration = 0),
      (b.pluginData = null),
      (b.target = null),
      (b.position = null),
      (b.passive = !1),
      (b._paused = !1),
      (b._curQueueProps = null),
      (b._initQueueProps = null),
      (b._steps = null),
      (b._actions = null),
      (b._prevPosition = 0),
      (b._stepPosition = 0),
      (b._prevPos = -1),
      (b._target = null),
      (b._useTicks = !1),
      (b._inited = !1),
      (b.initialize = function (b, c, d) {
        (this.target = this._target = b),
          c &&
            ((this._useTicks = c.useTicks),
            (this.ignoreGlobalPause = c.ignoreGlobalPause),
            (this.loop = c.loop),
            c.onChange && this.addEventListener("change", c.onChange),
            c.override && a.removeTweens(b)),
          (this.pluginData = d || {}),
          (this._curQueueProps = {}),
          (this._initQueueProps = {}),
          (this._steps = []),
          (this._actions = []),
          c && c.paused ? (this._paused = !0) : a._register(this, !0),
          c && null != c.position && this.setPosition(c.position, a.NONE);
      }),
      (b.wait = function (a, b) {
        if (null == a || 0 >= a) return this;
        var c = this._cloneProps(this._curQueueProps);
        return this._addStep({
          d: a,
          p0: c,
          e: this._linearEase,
          p1: c,
          v: b,
        });
      }),
      (b.to = function (a, b, c) {
        return (
          (isNaN(b) || 0 > b) && (b = 0),
          this._addStep({
            d: b || 0,
            p0: this._cloneProps(this._curQueueProps),
            e: c,
            p1: this._cloneProps(this._appendQueueProps(a)),
          })
        );
      }),
      (b.call = function (a, b, c) {
        return this._addAction({
          f: a,
          p: b ? b : [this],
          o: c ? c : this._target,
        });
      }),
      (b.set = function (a, b) {
        return this._addAction({
          f: this._set,
          o: this,
          p: [a, b ? b : this._target],
        });
      }),
      (b.play = function (a) {
        return a || (a = this), this.call(a.setPaused, [!1], a);
      }),
      (b.pause = function (a) {
        return a || (a = this), this.call(a.setPaused, [!0], a);
      }),
      (b.setPosition = function (a, b) {
        0 > a && (a = 0), null == b && (b = 1);
        var c = a,
          d = !1;
        if (
          (c >= this.duration &&
            (this.loop
              ? (c %= this.duration)
              : ((c = this.duration), (d = !0))),
          c == this._prevPos)
        )
          return d;
        var e = this._prevPos;
        if (
          ((this.position = this._prevPos = c),
          (this._prevPosition = a),
          this._target)
        )
          if (d) this._updateTargetProps(null, 1);
          else if (this._steps.length > 0) {
            for (
              var f = 0, g = this._steps.length;
              g > f && !(this._steps[f].t > c);
              f++
            );
            var h = this._steps[f - 1];
            this._updateTargetProps(h, (this._stepPosition = c - h.t) / h.d);
          }
        return (
          0 != b &&
            this._actions.length > 0 &&
            (this._useTicks
              ? this._runActions(c, c)
              : 1 == b && e > c
              ? (e != this.duration && this._runActions(e, this.duration),
                this._runActions(0, c, !0))
              : this._runActions(e, c)),
          d && this.setPaused(!0),
          this.dispatchEvent("change"),
          d
        );
      }),
      (b.tick = function (a) {
        this._paused || this.setPosition(this._prevPosition + a);
      }),
      (b.setPaused = function (b) {
        return (this._paused = !!b), a._register(this, !b), this;
      }),
      (b.w = b.wait),
      (b.t = b.to),
      (b.c = b.call),
      (b.s = b.set),
      (b.toString = function () {
        return "[Tween]";
      }),
      (b.clone = function () {
        throw "Tween can not be cloned.";
      }),
      (b._updateTargetProps = function (b, c) {
        var d, e, f, g, h, i;
        if (b || 1 != c) {
          if (((this.passive = !!b.v), this.passive)) return;
          b.e && (c = b.e(c, 0, 1, 1)), (d = b.p0), (e = b.p1);
        } else (this.passive = !1), (d = e = this._curQueueProps);
        for (var j in this._initQueueProps) {
          null == (g = d[j]) && (d[j] = g = this._initQueueProps[j]),
            null == (h = e[j]) && (e[j] = h = g),
            (f =
              g == h || 0 == c || 1 == c || "number" != typeof g
                ? 1 == c
                  ? h
                  : g
                : g + (h - g) * c);
          var k = !1;
          if ((i = a._plugins[j]))
            for (var l = 0, m = i.length; m > l; l++) {
              var n = i[l].tween(this, j, f, d, e, c, !!b && d == e, !b);
              n == a.IGNORE ? (k = !0) : (f = n);
            }
          k || (this._target[j] = f);
        }
      }),
      (b._runActions = function (a, b, c) {
        var d = a,
          e = b,
          f = -1,
          g = this._actions.length,
          h = 1;
        for (
          a > b && ((d = b), (e = a), (f = g), (g = h = -1));
          (f += h) != g;

        ) {
          var i = this._actions[f],
            j = i.t;
          (j == e || (j > d && e > j) || (c && j == a)) && i.f.apply(i.o, i.p);
        }
      }),
      (b._appendQueueProps = function (b) {
        var c, d, e, f, g;
        for (var h in b)
          if (void 0 === this._initQueueProps[h]) {
            if (((d = this._target[h]), (c = a._plugins[h])))
              for (e = 0, f = c.length; f > e; e++) d = c[e].init(this, h, d);
            this._initQueueProps[h] = this._curQueueProps[h] =
              void 0 === d ? null : d;
          } else d = this._curQueueProps[h];
        for (var h in b) {
          if (((d = this._curQueueProps[h]), (c = a._plugins[h])))
            for (g = g || {}, e = 0, f = c.length; f > e; e++)
              c[e].step && c[e].step(this, h, d, b[h], g);
          this._curQueueProps[h] = b[h];
        }
        return g && this._appendQueueProps(g), this._curQueueProps;
      }),
      (b._cloneProps = function (a) {
        var b = {};
        for (var c in a) b[c] = a[c];
        return b;
      }),
      (b._addStep = function (a) {
        return (
          a.d > 0 &&
            (this._steps.push(a),
            (a.t = this.duration),
            (this.duration += a.d)),
          this
        );
      }),
      (b._addAction = function (a) {
        return (a.t = this.duration), this._actions.push(a), this;
      }),
      (b._set = function (a, b) {
        for (var c in a) b[c] = a[c];
      }),
      (createjs.Tween = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c) {
        this.initialize(a, b, c);
      },
      b = (a.prototype = new createjs.EventDispatcher());
    (b.ignoreGlobalPause = !1),
      (b.duration = 0),
      (b.loop = !1),
      (b.position = null),
      (b._paused = !1),
      (b._tweens = null),
      (b._labels = null),
      (b._labelList = null),
      (b._prevPosition = 0),
      (b._prevPos = -1),
      (b._useTicks = !1),
      (b.initialize = function (a, b, c) {
        (this._tweens = []),
          c &&
            ((this._useTicks = c.useTicks),
            (this.loop = c.loop),
            (this.ignoreGlobalPause = c.ignoreGlobalPause),
            c.onChange && this.addEventListener("change", c.onChange)),
          a && this.addTween.apply(this, a),
          this.setLabels(b),
          c && c.paused
            ? (this._paused = !0)
            : createjs.Tween._register(this, !0),
          c &&
            null != c.position &&
            this.setPosition(c.position, createjs.Tween.NONE);
      }),
      (b.addTween = function (a) {
        var b = arguments.length;
        if (b > 1) {
          for (var c = 0; b > c; c++) this.addTween(arguments[c]);
          return arguments[0];
        }
        return 0 == b
          ? null
          : (this.removeTween(a),
            this._tweens.push(a),
            a.setPaused(!0),
            (a._paused = !1),
            (a._useTicks = this._useTicks),
            a.duration > this.duration && (this.duration = a.duration),
            this._prevPos >= 0 &&
              a.setPosition(this._prevPos, createjs.Tween.NONE),
            a);
      }),
      (b.removeTween = function (a) {
        var b = arguments.length;
        if (b > 1) {
          for (var c = !0, d = 0; b > d; d++)
            c = c && this.removeTween(arguments[d]);
          return c;
        }
        if (0 == b) return !1;
        for (var e = this._tweens, d = e.length; d--; )
          if (e[d] == a)
            return (
              e.splice(d, 1),
              a.duration >= this.duration && this.updateDuration(),
              !0
            );
        return !1;
      }),
      (b.addLabel = function (a, b) {
        this._labels[a] = b;
        var c = this._labelList;
        if (c) {
          for (var d = 0, e = c.length; e > d && !(b < c[d].position); d++);
          c.splice(d, 0, {
            label: a,
            position: b,
          });
        }
      }),
      (b.setLabels = function (a) {
        this._labels = a ? a : {};
      }),
      (b.getLabels = function () {
        var a = this._labelList;
        if (!a) {
          a = this._labelList = [];
          var b = this._labels;
          for (var c in b)
            a.push({
              label: c,
              position: b[c],
            });
          a.sort(function (a, b) {
            return a.position - b.position;
          });
        }
        return a;
      }),
      (b.getCurrentLabel = function () {
        var a = this.getLabels(),
          b = this.position,
          c = a.length;
        if (c) {
          for (var d = 0; c > d && !(b < a[d].position); d++);
          return 0 == d ? null : a[d - 1].label;
        }
        return null;
      }),
      (b.gotoAndPlay = function (a) {
        this.setPaused(!1), this._goto(a);
      }),
      (b.gotoAndStop = function (a) {
        this.setPaused(!0), this._goto(a);
      }),
      (b.setPosition = function (a, b) {
        0 > a && (a = 0);
        var c = this.loop ? a % this.duration : a,
          d = !this.loop && a >= this.duration;
        if (c == this._prevPos) return d;
        (this._prevPosition = a), (this.position = this._prevPos = c);
        for (var e = 0, f = this._tweens.length; f > e; e++)
          if ((this._tweens[e].setPosition(c, b), c != this._prevPos))
            return !1;
        return d && this.setPaused(!0), this.dispatchEvent("change"), d;
      }),
      (b.setPaused = function (a) {
        (this._paused = !!a), createjs.Tween._register(this, !a);
      }),
      (b.updateDuration = function () {
        this.duration = 0;
        for (var a = 0, b = this._tweens.length; b > a; a++) {
          var c = this._tweens[a];
          c.duration > this.duration && (this.duration = c.duration);
        }
      }),
      (b.tick = function (a) {
        this.setPosition(this._prevPosition + a);
      }),
      (b.resolve = function (a) {
        var b = parseFloat(a);
        return isNaN(b) && (b = this._labels[a]), b;
      }),
      (b.toString = function () {
        return "[Timeline]";
      }),
      (b.clone = function () {
        throw "Timeline can not be cloned.";
      }),
      (b._goto = function (a) {
        var b = this.resolve(a);
        null != b && this.setPosition(b);
      }),
      (createjs.Timeline = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function () {
      throw "Ease cannot be instantiated.";
    };
    (a.linear = function (a) {
      return a;
    }),
      (a.none = a.linear),
      (a.get = function (a) {
        return (
          -1 > a && (a = -1),
          a > 1 && (a = 1),
          function (b) {
            return 0 == a
              ? b
              : 0 > a
              ? b * (b * -a + 1 + a)
              : b * ((2 - b) * a + (1 - a));
          }
        );
      }),
      (a.getPowIn = function (a) {
        return function (b) {
          return Math.pow(b, a);
        };
      }),
      (a.getPowOut = function (a) {
        return function (b) {
          return 1 - Math.pow(1 - b, a);
        };
      }),
      (a.getPowInOut = function (a) {
        return function (b) {
          return (b *= 2) < 1
            ? 0.5 * Math.pow(b, a)
            : 1 - 0.5 * Math.abs(Math.pow(2 - b, a));
        };
      }),
      (a.quadIn = a.getPowIn(2)),
      (a.quadOut = a.getPowOut(2)),
      (a.quadInOut = a.getPowInOut(2)),
      (a.cubicIn = a.getPowIn(3)),
      (a.cubicOut = a.getPowOut(3)),
      (a.cubicInOut = a.getPowInOut(3)),
      (a.quartIn = a.getPowIn(4)),
      (a.quartOut = a.getPowOut(4)),
      (a.quartInOut = a.getPowInOut(4)),
      (a.quintIn = a.getPowIn(5)),
      (a.quintOut = a.getPowOut(5)),
      (a.quintInOut = a.getPowInOut(5)),
      (a.sineIn = function (a) {
        return 1 - Math.cos((a * Math.PI) / 2);
      }),
      (a.sineOut = function (a) {
        return Math.sin((a * Math.PI) / 2);
      }),
      (a.sineInOut = function (a) {
        return -0.5 * (Math.cos(Math.PI * a) - 1);
      }),
      (a.getBackIn = function (a) {
        return function (b) {
          return b * b * ((a + 1) * b - a);
        };
      }),
      (a.backIn = a.getBackIn(1.7)),
      (a.getBackOut = function (a) {
        return function (b) {
          return --b * b * ((a + 1) * b + a) + 1;
        };
      }),
      (a.backOut = a.getBackOut(1.7)),
      (a.getBackInOut = function (a) {
        return (
          (a *= 1.525),
          function (b) {
            return (b *= 2) < 1
              ? 0.5 * b * b * ((a + 1) * b - a)
              : 0.5 * ((b -= 2) * b * ((a + 1) * b + a) + 2);
          }
        );
      }),
      (a.backInOut = a.getBackInOut(1.7)),
      (a.circIn = function (a) {
        return -(Math.sqrt(1 - a * a) - 1);
      }),
      (a.circOut = function (a) {
        return Math.sqrt(1 - --a * a);
      }),
      (a.circInOut = function (a) {
        return (a *= 2) < 1
          ? -0.5 * (Math.sqrt(1 - a * a) - 1)
          : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
      }),
      (a.bounceIn = function (b) {
        return 1 - a.bounceOut(1 - b);
      }),
      (a.bounceOut = function (a) {
        return 1 / 2.75 > a
          ? 7.5625 * a * a
          : 2 / 2.75 > a
          ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
          : 2.5 / 2.75 > a
          ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
          : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
      }),
      (a.bounceInOut = function (b) {
        return 0.5 > b
          ? 0.5 * a.bounceIn(2 * b)
          : 0.5 * a.bounceOut(2 * b - 1) + 0.5;
      }),
      (a.getElasticIn = function (a, b) {
        var c = 2 * Math.PI;
        return function (d) {
          if (0 == d || 1 == d) return d;
          var e = (b / c) * Math.asin(1 / a);
          return -(
            a *
            Math.pow(2, 10 * (d -= 1)) *
            Math.sin(((d - e) * c) / b)
          );
        };
      }),
      (a.elasticIn = a.getElasticIn(1, 0.3)),
      (a.getElasticOut = function (a, b) {
        var c = 2 * Math.PI;
        return function (d) {
          if (0 == d || 1 == d) return d;
          var e = (b / c) * Math.asin(1 / a);
          return a * Math.pow(2, -10 * d) * Math.sin(((d - e) * c) / b) + 1;
        };
      }),
      (a.elasticOut = a.getElasticOut(1, 0.3)),
      (a.getElasticInOut = function (a, b) {
        var c = 2 * Math.PI;
        return function (d) {
          var e = (b / c) * Math.asin(1 / a);
          return (d *= 2) < 1
            ? -0.5 *
                a *
                Math.pow(2, 10 * (d -= 1)) *
                Math.sin(((d - e) * c) / b)
            : 0.5 *
                a *
                Math.pow(2, -10 * (d -= 1)) *
                Math.sin(((d - e) * c) / b) +
                1;
        };
      }),
      (a.elasticInOut = a.getElasticInOut(1, 0.3 * 1.5)),
      (createjs.Ease = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function () {
      throw "MotionGuidePlugin cannot be instantiated.";
    };
    (a.priority = 0),
      a._rotOffS,
      a._rotOffE,
      a._rotNormS,
      a._rotNormE,
      (a.install = function () {
        return (
          createjs.Tween.installPlugin(a, ["guide", "x", "y", "rotation"]),
          createjs.Tween.IGNORE
        );
      }),
      (a.init = function (a, b, c) {
        var d = a.target;
        return (
          d.hasOwnProperty("x") || (d.x = 0),
          d.hasOwnProperty("y") || (d.y = 0),
          d.hasOwnProperty("rotation") || (d.rotation = 0),
          "rotation" == b && (a.__needsRot = !0),
          "guide" == b ? null : c
        );
      }),
      (a.step = function (b, c, d, e, f) {
        if (
          ("rotation" == c &&
            ((b.__rotGlobalS = d), (b.__rotGlobalE = e), a.testRotData(b, f)),
          "guide" != c)
        )
          return e;
        var g,
          h = e;
        h.hasOwnProperty("path") || (h.path = []);
        var i = h.path;
        if (
          (h.hasOwnProperty("end") || (h.end = 1),
          h.hasOwnProperty("start") ||
            (h.start =
              d && d.hasOwnProperty("end") && d.path === i ? d.end : 0),
          h.hasOwnProperty("_segments") && h._length)
        )
          return e;
        var j = i.length,
          k = 10;
        if (!(j >= 6 && 0 == (j - 2) % 4))
          throw "invalid 'path' data, please see documentation for valid paths";
        (h._segments = []), (h._length = 0);
        for (var l = 2; j > l; l += 4) {
          for (
            var m,
              n,
              o = i[l - 2],
              p = i[l - 1],
              q = i[l + 0],
              r = i[l + 1],
              s = i[l + 2],
              t = i[l + 3],
              u = o,
              v = p,
              w = 0,
              x = [],
              y = 1;
            k >= y;
            y++
          ) {
            var z = y / k,
              A = 1 - z;
            (m = A * A * o + 2 * A * z * q + z * z * s),
              (n = A * A * p + 2 * A * z * r + z * z * t),
              (w +=
                x[x.push(Math.sqrt((g = m - u) * g + (g = n - v) * g)) - 1]),
              (u = m),
              (v = n);
          }
          h._segments.push(w), h._segments.push(x), (h._length += w);
        }
        (g = h.orient), (h.orient = !0);
        var B = {};
        return (
          a.calc(h, h.start, B),
          (b.__rotPathS = Number(B.rotation.toFixed(5))),
          a.calc(h, h.end, B),
          (b.__rotPathE = Number(B.rotation.toFixed(5))),
          (h.orient = !1),
          a.calc(h, h.end, f),
          (h.orient = g),
          h.orient ? ((b.__guideData = h), a.testRotData(b, f), e) : e
        );
      }),
      (a.testRotData = function (a, b) {
        if (void 0 === a.__rotGlobalS || void 0 === a.__rotGlobalE) {
          if (a.__needsRot) return;
          a.__rotGlobalS = a.__rotGlobalE =
            void 0 !== a._curQueueProps.rotation
              ? a._curQueueProps.rotation
              : (b.rotation = a.target.rotation || 0);
        }
        if (void 0 !== a.__guideData) {
          var c = a.__guideData,
            d = a.__rotGlobalE - a.__rotGlobalS,
            e = a.__rotPathE - a.__rotPathS,
            f = d - e;
          if ("auto" == c.orient) f > 180 ? (f -= 360) : -180 > f && (f += 360);
          else if ("cw" == c.orient) {
            for (; 0 > f; ) f += 360;
            0 == f && d > 0 && 180 != d && (f += 360);
          } else if ("ccw" == c.orient) {
            for (f = d - (e > 180 ? 360 - e : e); f > 0; ) f -= 360;
            0 == f && 0 > d && -180 != d && (f -= 360);
          }
          (c.rotDelta = f),
            (c.rotOffS = a.__rotGlobalS - a.__rotPathS),
            (a.__rotGlobalS =
              a.__rotGlobalE =
              a.__guideData =
              a.__needsRot =
                void 0);
        }
      }),
      (a.tween = function (b, c, d, e, f, g, h) {
        var i = f.guide;
        if (void 0 == i || i === e.guide) return d;
        if (i.lastRatio != g) {
          var j = (i.end - i.start) * (h ? i.end : g) + i.start;
          switch ((a.calc(i, j, b.target), i.orient)) {
            case "cw":
            case "ccw":
            case "auto":
              b.target.rotation += i.rotOffS + i.rotDelta * g;
              break;
            case "fixed":
            default:
              b.target.rotation += i.rotOffS;
          }
          i.lastRatio = g;
        }
        return "rotation" != c || (i.orient && "false" != i.orient)
          ? b.target[c]
          : d;
      }),
      (a.calc = function (b, c, d) {
        void 0 == b._segments && a.validate(b),
          void 0 == d &&
            (d = {
              x: 0,
              y: 0,
              rotation: 0,
            });
        for (
          var e = b._segments,
            f = b.path,
            g = b._length * c,
            h = e.length - 2,
            i = 0;
          g > e[i] && h > i;

        )
          (g -= e[i]), (i += 2);
        var j = e[i + 1],
          k = 0;
        for (h = j.length - 1; g > j[k] && h > k; ) (g -= j[k]), k++;
        var l = k / ++h + g / (h * j[k]);
        i = 2 * i + 2;
        var m = 1 - l;
        return (
          (d.x = m * m * f[i - 2] + 2 * m * l * f[i + 0] + l * l * f[i + 2]),
          (d.y = m * m * f[i - 1] + 2 * m * l * f[i + 1] + l * l * f[i + 3]),
          b.orient &&
            (d.rotation =
              57.2957795 *
              Math.atan2(
                (f[i + 1] - f[i - 1]) * m + (f[i + 3] - f[i + 1]) * l,
                (f[i + 0] - f[i - 2]) * m + (f[i + 2] - f[i + 0]) * l
              )),
          d
        );
      }),
      (createjs.MotionGuidePlugin = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = (createjs.TweenJS = createjs.TweenJS || {});
    (a.version = "NEXT"), (a.buildDate = "Thu, 12 Dec 2013 23:37:07 GMT");
  })();
/*!jQuery v1.11.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license*/
!(function (a, b) {
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = a.document
        ? b(a, !0)
        : function (a) {
            if (!a.document)
              throw new Error("jQuery requires a window with a document");
            return b(a);
          })
    : b(a);
})("undefined" != typeof window ? window : this, function (a, b) {
  var c = [],
    d = c.slice,
    e = c.concat,
    f = c.push,
    g = c.indexOf,
    h = {},
    i = h.toString,
    j = h.hasOwnProperty,
    k = "".trim,
    l = {},
    m = "1.11.0",
    n = function (a, b) {
      return new n.fn.init(a, b);
    },
    o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    p = /^-ms-/,
    q = /-([\da-z])/gi,
    r = function (a, b) {
      return b.toUpperCase();
    };
  (n.fn = n.prototype =
    {
      jquery: m,
      constructor: n,
      selector: "",
      length: 0,
      toArray: function () {
        return d.call(this);
      },
      get: function (a) {
        return null != a
          ? 0 > a
            ? this[a + this.length]
            : this[a]
          : d.call(this);
      },
      pushStack: function (a) {
        var b = n.merge(this.constructor(), a);
        return (b.prevObject = this), (b.context = this.context), b;
      },
      each: function (a, b) {
        return n.each(this, a, b);
      },
      map: function (a) {
        return this.pushStack(
          n.map(this, function (b, c) {
            return a.call(b, c, b);
          })
        );
      },
      slice: function () {
        return this.pushStack(d.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (a) {
        var b = this.length,
          c = +a + (0 > a ? b : 0);
        return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor(null);
      },
      push: f,
      sort: c.sort,
      splice: c.splice,
    }),
    (n.extend = n.fn.extend =
      function () {
        var a,
          b,
          c,
          d,
          e,
          f,
          g = arguments[0] || {},
          h = 1,
          i = arguments.length,
          j = !1;
        for (
          "boolean" == typeof g && ((j = g), (g = arguments[h] || {}), h++),
            "object" == typeof g || n.isFunction(g) || (g = {}),
            h === i && ((g = this), h--);
          i > h;
          h++
        )
          if (null != (e = arguments[h]))
            for (d in e)
              (a = g[d]),
                (c = e[d]),
                g !== c &&
                  (j && c && (n.isPlainObject(c) || (b = n.isArray(c)))
                    ? (b
                        ? ((b = !1), (f = a && n.isArray(a) ? a : []))
                        : (f = a && n.isPlainObject(a) ? a : {}),
                      (g[d] = n.extend(j, f, c)))
                    : void 0 !== c && (g[d] = c));
        return g;
      }),
    n.extend({
      expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (a) {
        throw new Error(a);
      },
      noop: function () {},
      isFunction: function (a) {
        return "function" === n.type(a);
      },
      isArray:
        Array.isArray ||
        function (a) {
          return "array" === n.type(a);
        },
      isWindow: function (a) {
        return null != a && a == a.window;
      },
      isNumeric: function (a) {
        return a - parseFloat(a) >= 0;
      },
      isEmptyObject: function (a) {
        var b;
        for (b in a) return !1;
        return !0;
      },
      isPlainObject: function (a) {
        var b;
        if (!a || "object" !== n.type(a) || a.nodeType || n.isWindow(a))
          return !1;
        try {
          if (
            a.constructor &&
            !j.call(a, "constructor") &&
            !j.call(a.constructor.prototype, "isPrototypeOf")
          )
            return !1;
        } catch (c) {
          return !1;
        }
        if (l.ownLast) for (b in a) return j.call(a, b);
        for (b in a);
        return void 0 === b || j.call(a, b);
      },
      type: function (a) {
        return null == a
          ? a + ""
          : "object" == typeof a || "function" == typeof a
          ? h[i.call(a)] || "object"
          : typeof a;
      },
      globalEval: function (b) {
        b &&
          n.trim(b) &&
          (
            a.execScript ||
            function (b) {
              a.eval.call(a, b);
            }
          )(b);
      },
      camelCase: function (a) {
        return a.replace(p, "ms-").replace(q, r);
      },
      nodeName: function (a, b) {
        return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
      },
      each: function (a, b, c) {
        var d,
          e = 0,
          f = a.length,
          g = s(a);
        if (c) {
          if (g) {
            for (; f > e; e++) if (((d = b.apply(a[e], c)), d === !1)) break;
          } else for (e in a) if (((d = b.apply(a[e], c)), d === !1)) break;
        } else if (g) {
          for (; f > e; e++) if (((d = b.call(a[e], e, a[e])), d === !1)) break;
        } else for (e in a) if (((d = b.call(a[e], e, a[e])), d === !1)) break;
        return a;
      },
      trim:
        k && !k.call("\ufeff\xa0")
          ? function (a) {
              return null == a ? "" : k.call(a);
            }
          : function (a) {
              return null == a ? "" : (a + "").replace(o, "");
            },
      makeArray: function (a, b) {
        var c = b || [];
        return (
          null != a &&
            (s(Object(a))
              ? n.merge(c, "string" == typeof a ? [a] : a)
              : f.call(c, a)),
          c
        );
      },
      inArray: function (a, b, c) {
        var d;
        if (b) {
          if (g) return g.call(b, a, c);
          for (
            d = b.length, c = c ? (0 > c ? Math.max(0, d + c) : c) : 0;
            d > c;
            c++
          )
            if (c in b && b[c] === a) return c;
        }
        return -1;
      },
      merge: function (a, b) {
        var c = +b.length,
          d = 0,
          e = a.length;
        while (c > d) a[e++] = b[d++];
        if (c !== c) while (void 0 !== b[d]) a[e++] = b[d++];
        return (a.length = e), a;
      },
      grep: function (a, b, c) {
        for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)
          (d = !b(a[f], f)), d !== h && e.push(a[f]);
        return e;
      },
      map: function (a, b, c) {
        var d,
          f = 0,
          g = a.length,
          h = s(a),
          i = [];
        if (h) for (; g > f; f++) (d = b(a[f], f, c)), null != d && i.push(d);
        else for (f in a) (d = b(a[f], f, c)), null != d && i.push(d);
        return e.apply([], i);
      },
      guid: 1,
      proxy: function (a, b) {
        var c, e, f;
        return (
          "string" == typeof b && ((f = a[b]), (b = a), (a = f)),
          n.isFunction(a)
            ? ((c = d.call(arguments, 2)),
              (e = function () {
                return a.apply(b || this, c.concat(d.call(arguments)));
              }),
              (e.guid = a.guid = a.guid || n.guid++),
              e)
            : void 0
        );
      },
      now: function () {
        return +new Date();
      },
      support: l,
    }),
    n.each(
      "Boolean Number String Function Array Date RegExp Object Error".split(
        " "
      ),
      function (a, b) {
        h["[object " + b + "]"] = b.toLowerCase();
      }
    );
  function s(a) {
    var b = a.length,
      c = n.type(a);
    return "function" === c || n.isWindow(a)
      ? !1
      : 1 === a.nodeType && b
      ? !0
      : "array" === c ||
        0 === b ||
        ("number" == typeof b && b > 0 && b - 1 in a);
  }
  var t = (function (a) {
    var b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s = "sizzle" + -new Date(),
      t = a.document,
      u = 0,
      v = 0,
      w = eb(),
      x = eb(),
      y = eb(),
      z = function (a, b) {
        return a === b && (j = !0), 0;
      },
      A = "undefined",
      B = 1 << 31,
      C = {}.hasOwnProperty,
      D = [],
      E = D.pop,
      F = D.push,
      G = D.push,
      H = D.slice,
      I =
        D.indexOf ||
        function (a) {
          for (var b = 0, c = this.length; c > b; b++)
            if (this[b] === a) return b;
          return -1;
        },
      J =
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      K = "[\\x20\\t\\r\\n\\f]",
      L = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      M = L.replace("w", "w#"),
      N =
        "\\[" +
        K +
        "*(" +
        L +
        ")" +
        K +
        "*(?:([*^$|!~]?=)" +
        K +
        "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
        M +
        ")|)|)" +
        K +
        "*\\]",
      O =
        ":(" +
        L +
        ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" +
        N.replace(3, 8) +
        ")*)|.*)\\)|)",
      P = new RegExp("^" + K + "+|((?:^|[^\\\\])(?:\\\\.)*)" + K + "+$", "g"),
      Q = new RegExp("^" + K + "*," + K + "*"),
      R = new RegExp("^" + K + "*([>+~]|" + K + ")" + K + "*"),
      S = new RegExp("=" + K + "*([^\\]'\"]*?)" + K + "*\\]", "g"),
      T = new RegExp(O),
      U = new RegExp("^" + M + "$"),
      V = {
        ID: new RegExp("^#(" + L + ")"),
        CLASS: new RegExp("^\\.(" + L + ")"),
        TAG: new RegExp("^(" + L.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + N),
        PSEUDO: new RegExp("^" + O),
        CHILD: new RegExp(
          "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
            K +
            "*(even|odd|(([+-]|)(\\d*)n|)" +
            K +
            "*(?:([+-]|)" +
            K +
            "*(\\d+)|))" +
            K +
            "*\\)|)",
          "i"
        ),
        bool: new RegExp("^(?:" + J + ")$", "i"),
        needsContext: new RegExp(
          "^" +
            K +
            "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            K +
            "*((?:-\\d)?\\d*)" +
            K +
            "*\\)|)(?=[^-]|$)",
          "i"
        ),
      },
      W = /^(?:input|select|textarea|button)$/i,
      X = /^h\d$/i,
      Y = /^[^{]+\{\s*\[native \w/,
      Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      $ = /[+~]/,
      _ = /'|\\/g,
      ab = new RegExp("\\\\([\\da-f]{1,6}" + K + "?|(" + K + ")|.)", "ig"),
      bb = function (a, b, c) {
        var d = "0x" + b - 65536;
        return d !== d || c
          ? b
          : 0 > d
          ? String.fromCharCode(d + 65536)
          : String.fromCharCode((d >> 10) | 55296, (1023 & d) | 56320);
      };
    try {
      G.apply((D = H.call(t.childNodes)), t.childNodes),
        D[t.childNodes.length].nodeType;
    } catch (cb) {
      G = {
        apply: D.length
          ? function (a, b) {
              F.apply(a, H.call(b));
            }
          : function (a, b) {
              var c = a.length,
                d = 0;
              while ((a[c++] = b[d++]));
              a.length = c - 1;
            },
      };
    }
    function db(a, b, d, e) {
      var f, g, h, i, j, m, p, q, u, v;
      if (
        ((b ? b.ownerDocument || b : t) !== l && k(b),
        (b = b || l),
        (d = d || []),
        !a || "string" != typeof a)
      )
        return d;
      if (1 !== (i = b.nodeType) && 9 !== i) return [];
      if (n && !e) {
        if ((f = Z.exec(a)))
          if ((h = f[1])) {
            if (9 === i) {
              if (((g = b.getElementById(h)), !g || !g.parentNode)) return d;
              if (g.id === h) return d.push(g), d;
            } else if (
              b.ownerDocument &&
              (g = b.ownerDocument.getElementById(h)) &&
              r(b, g) &&
              g.id === h
            )
              return d.push(g), d;
          } else {
            if (f[2]) return G.apply(d, b.getElementsByTagName(a)), d;
            if (
              (h = f[3]) &&
              c.getElementsByClassName &&
              b.getElementsByClassName
            )
              return G.apply(d, b.getElementsByClassName(h)), d;
          }
        if (c.qsa && (!o || !o.test(a))) {
          if (
            ((q = p = s),
            (u = b),
            (v = 9 === i && a),
            1 === i && "object" !== b.nodeName.toLowerCase())
          ) {
            (m = ob(a)),
              (p = b.getAttribute("id"))
                ? (q = p.replace(_, "\\$&"))
                : b.setAttribute("id", q),
              (q = "[id='" + q + "'] "),
              (j = m.length);
            while (j--) m[j] = q + pb(m[j]);
            (u = ($.test(a) && mb(b.parentNode)) || b), (v = m.join(","));
          }
          if (v)
            try {
              return G.apply(d, u.querySelectorAll(v)), d;
            } catch (w) {
            } finally {
              p || b.removeAttribute("id");
            }
        }
      }
      return xb(a.replace(P, "$1"), b, d, e);
    }
    function eb() {
      var a = [];
      function b(c, e) {
        return (
          a.push(c + " ") > d.cacheLength && delete b[a.shift()],
          (b[c + " "] = e)
        );
      }
      return b;
    }
    function fb(a) {
      return (a[s] = !0), a;
    }
    function gb(a) {
      var b = l.createElement("div");
      try {
        return !!a(b);
      } catch (c) {
        return !1;
      } finally {
        b.parentNode && b.parentNode.removeChild(b), (b = null);
      }
    }
    function hb(a, b) {
      var c = a.split("|"),
        e = a.length;
      while (e--) d.attrHandle[c[e]] = b;
    }
    function ib(a, b) {
      var c = b && a,
        d =
          c &&
          1 === a.nodeType &&
          1 === b.nodeType &&
          (~b.sourceIndex || B) - (~a.sourceIndex || B);
      if (d) return d;
      if (c) while ((c = c.nextSibling)) if (c === b) return -1;
      return a ? 1 : -1;
    }
    function jb(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return "input" === c && b.type === a;
      };
    }
    function kb(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return ("input" === c || "button" === c) && b.type === a;
      };
    }
    function lb(a) {
      return fb(function (b) {
        return (
          (b = +b),
          fb(function (c, d) {
            var e,
              f = a([], c.length, b),
              g = f.length;
            while (g--) c[(e = f[g])] && (c[e] = !(d[e] = c[e]));
          })
        );
      });
    }
    function mb(a) {
      return a && typeof a.getElementsByTagName !== A && a;
    }
    (c = db.support = {}),
      (f = db.isXML =
        function (a) {
          var b = a && (a.ownerDocument || a).documentElement;
          return b ? "HTML" !== b.nodeName : !1;
        }),
      (k = db.setDocument =
        function (a) {
          var b,
            e = a ? a.ownerDocument || a : t,
            g = e.defaultView;
          return e !== l && 9 === e.nodeType && e.documentElement
            ? ((l = e),
              (m = e.documentElement),
              (n = !f(e)),
              g &&
                g !== g.top &&
                (g.addEventListener
                  ? g.addEventListener(
                      "unload",
                      function () {
                        k();
                      },
                      !1
                    )
                  : g.attachEvent &&
                    g.attachEvent("onunload", function () {
                      k();
                    })),
              (c.attributes = gb(function (a) {
                return (a.className = "i"), !a.getAttribute("className");
              })),
              (c.getElementsByTagName = gb(function (a) {
                return (
                  a.appendChild(e.createComment("")),
                  !a.getElementsByTagName("*").length
                );
              })),
              (c.getElementsByClassName =
                Y.test(e.getElementsByClassName) &&
                gb(function (a) {
                  return (
                    (a.innerHTML =
                      "<div class='a'></div><div class='a i'></div>"),
                    (a.firstChild.className = "i"),
                    2 === a.getElementsByClassName("i").length
                  );
                })),
              (c.getById = gb(function (a) {
                return (
                  (m.appendChild(a).id = s),
                  !e.getElementsByName || !e.getElementsByName(s).length
                );
              })),
              c.getById
                ? ((d.find.ID = function (a, b) {
                    if (typeof b.getElementById !== A && n) {
                      var c = b.getElementById(a);
                      return c && c.parentNode ? [c] : [];
                    }
                  }),
                  (d.filter.ID = function (a) {
                    var b = a.replace(ab, bb);
                    return function (a) {
                      return a.getAttribute("id") === b;
                    };
                  }))
                : (delete d.find.ID,
                  (d.filter.ID = function (a) {
                    var b = a.replace(ab, bb);
                    return function (a) {
                      var c =
                        typeof a.getAttributeNode !== A &&
                        a.getAttributeNode("id");
                      return c && c.value === b;
                    };
                  })),
              (d.find.TAG = c.getElementsByTagName
                ? function (a, b) {
                    return typeof b.getElementsByTagName !== A
                      ? b.getElementsByTagName(a)
                      : void 0;
                  }
                : function (a, b) {
                    var c,
                      d = [],
                      e = 0,
                      f = b.getElementsByTagName(a);
                    if ("*" === a) {
                      while ((c = f[e++])) 1 === c.nodeType && d.push(c);
                      return d;
                    }
                    return f;
                  }),
              (d.find.CLASS =
                c.getElementsByClassName &&
                function (a, b) {
                  return typeof b.getElementsByClassName !== A && n
                    ? b.getElementsByClassName(a)
                    : void 0;
                }),
              (p = []),
              (o = []),
              (c.qsa = Y.test(e.querySelectorAll)) &&
                (gb(function (a) {
                  (a.innerHTML =
                    "<select t=''><option selected=''></option></select>"),
                    a.querySelectorAll("[t^='']").length &&
                      o.push("[*^$]=" + K + "*(?:''|\"\")"),
                    a.querySelectorAll("[selected]").length ||
                      o.push("\\[" + K + "*(?:value|" + J + ")"),
                    a.querySelectorAll(":checked").length || o.push(":checked");
                }),
                gb(function (a) {
                  var b = e.createElement("input");
                  b.setAttribute("type", "hidden"),
                    a.appendChild(b).setAttribute("name", "D"),
                    a.querySelectorAll("[name=d]").length &&
                      o.push("name" + K + "*[*^$|!~]?="),
                    a.querySelectorAll(":enabled").length ||
                      o.push(":enabled", ":disabled"),
                    a.querySelectorAll("*,:x"),
                    o.push(",.*:");
                })),
              (c.matchesSelector = Y.test(
                (q =
                  m.webkitMatchesSelector ||
                  m.mozMatchesSelector ||
                  m.oMatchesSelector ||
                  m.msMatchesSelector)
              )) &&
                gb(function (a) {
                  (c.disconnectedMatch = q.call(a, "div")),
                    q.call(a, "[s!='']:x"),
                    p.push("!=", O);
                }),
              (o = o.length && new RegExp(o.join("|"))),
              (p = p.length && new RegExp(p.join("|"))),
              (b = Y.test(m.compareDocumentPosition)),
              (r =
                b || Y.test(m.contains)
                  ? function (a, b) {
                      var c = 9 === a.nodeType ? a.documentElement : a,
                        d = b && b.parentNode;
                      return (
                        a === d ||
                        !(
                          !d ||
                          1 !== d.nodeType ||
                          !(c.contains
                            ? c.contains(d)
                            : a.compareDocumentPosition &&
                              16 & a.compareDocumentPosition(d))
                        )
                      );
                    }
                  : function (a, b) {
                      if (b) while ((b = b.parentNode)) if (b === a) return !0;
                      return !1;
                    }),
              (z = b
                ? function (a, b) {
                    if (a === b) return (j = !0), 0;
                    var d =
                      !a.compareDocumentPosition - !b.compareDocumentPosition;
                    return d
                      ? d
                      : ((d =
                          (a.ownerDocument || a) === (b.ownerDocument || b)
                            ? a.compareDocumentPosition(b)
                            : 1),
                        1 & d ||
                        (!c.sortDetached && b.compareDocumentPosition(a) === d)
                          ? a === e || (a.ownerDocument === t && r(t, a))
                            ? -1
                            : b === e || (b.ownerDocument === t && r(t, b))
                            ? 1
                            : i
                            ? I.call(i, a) - I.call(i, b)
                            : 0
                          : 4 & d
                          ? -1
                          : 1);
                  }
                : function (a, b) {
                    if (a === b) return (j = !0), 0;
                    var c,
                      d = 0,
                      f = a.parentNode,
                      g = b.parentNode,
                      h = [a],
                      k = [b];
                    if (!f || !g)
                      return a === e
                        ? -1
                        : b === e
                        ? 1
                        : f
                        ? -1
                        : g
                        ? 1
                        : i
                        ? I.call(i, a) - I.call(i, b)
                        : 0;
                    if (f === g) return ib(a, b);
                    c = a;
                    while ((c = c.parentNode)) h.unshift(c);
                    c = b;
                    while ((c = c.parentNode)) k.unshift(c);
                    while (h[d] === k[d]) d++;
                    return d
                      ? ib(h[d], k[d])
                      : h[d] === t
                      ? -1
                      : k[d] === t
                      ? 1
                      : 0;
                  }),
              e)
            : l;
        }),
      (db.matches = function (a, b) {
        return db(a, null, null, b);
      }),
      (db.matchesSelector = function (a, b) {
        if (
          ((a.ownerDocument || a) !== l && k(a),
          (b = b.replace(S, "='$1']")),
          !(!c.matchesSelector || !n || (p && p.test(b)) || (o && o.test(b))))
        )
          try {
            var d = q.call(a, b);
            if (
              d ||
              c.disconnectedMatch ||
              (a.document && 11 !== a.document.nodeType)
            )
              return d;
          } catch (e) {}
        return db(b, l, null, [a]).length > 0;
      }),
      (db.contains = function (a, b) {
        return (a.ownerDocument || a) !== l && k(a), r(a, b);
      }),
      (db.attr = function (a, b) {
        (a.ownerDocument || a) !== l && k(a);
        var e = d.attrHandle[b.toLowerCase()],
          f = e && C.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !n) : void 0;
        return void 0 !== f
          ? f
          : c.attributes || !n
          ? a.getAttribute(b)
          : (f = a.getAttributeNode(b)) && f.specified
          ? f.value
          : null;
      }),
      (db.error = function (a) {
        throw new Error("Syntax error, unrecognized expression: " + a);
      }),
      (db.uniqueSort = function (a) {
        var b,
          d = [],
          e = 0,
          f = 0;
        if (
          ((j = !c.detectDuplicates),
          (i = !c.sortStable && a.slice(0)),
          a.sort(z),
          j)
        ) {
          while ((b = a[f++])) b === a[f] && (e = d.push(f));
          while (e--) a.splice(d[e], 1);
        }
        return (i = null), a;
      }),
      (e = db.getText =
        function (a) {
          var b,
            c = "",
            d = 0,
            f = a.nodeType;
          if (f) {
            if (1 === f || 9 === f || 11 === f) {
              if ("string" == typeof a.textContent) return a.textContent;
              for (a = a.firstChild; a; a = a.nextSibling) c += e(a);
            } else if (3 === f || 4 === f) return a.nodeValue;
          } else while ((b = a[d++])) c += e(b);
          return c;
        }),
      (d = db.selectors =
        {
          cacheLength: 50,
          createPseudo: fb,
          match: V,
          attrHandle: {},
          find: {},
          relative: {
            ">": {
              dir: "parentNode",
              first: !0,
            },
            " ": {
              dir: "parentNode",
            },
            "+": {
              dir: "previousSibling",
              first: !0,
            },
            "~": {
              dir: "previousSibling",
            },
          },
          preFilter: {
            ATTR: function (a) {
              return (
                (a[1] = a[1].replace(ab, bb)),
                (a[3] = (a[4] || a[5] || "").replace(ab, bb)),
                "~=" === a[2] && (a[3] = " " + a[3] + " "),
                a.slice(0, 4)
              );
            },
            CHILD: function (a) {
              return (
                (a[1] = a[1].toLowerCase()),
                "nth" === a[1].slice(0, 3)
                  ? (a[3] || db.error(a[0]),
                    (a[4] = +(a[4]
                      ? a[5] + (a[6] || 1)
                      : 2 * ("even" === a[3] || "odd" === a[3]))),
                    (a[5] = +(a[7] + a[8] || "odd" === a[3])))
                  : a[3] && db.error(a[0]),
                a
              );
            },
            PSEUDO: function (a) {
              var b,
                c = !a[5] && a[2];
              return V.CHILD.test(a[0])
                ? null
                : (a[3] && void 0 !== a[4]
                    ? (a[2] = a[4])
                    : c &&
                      T.test(c) &&
                      (b = ob(c, !0)) &&
                      (b = c.indexOf(")", c.length - b) - c.length) &&
                      ((a[0] = a[0].slice(0, b)), (a[2] = c.slice(0, b))),
                  a.slice(0, 3));
            },
          },
          filter: {
            TAG: function (a) {
              var b = a.replace(ab, bb).toLowerCase();
              return "*" === a
                ? function () {
                    return !0;
                  }
                : function (a) {
                    return a.nodeName && a.nodeName.toLowerCase() === b;
                  };
            },
            CLASS: function (a) {
              var b = w[a + " "];
              return (
                b ||
                ((b = new RegExp("(^|" + K + ")" + a + "(" + K + "|$)")) &&
                  w(a, function (a) {
                    return b.test(
                      ("string" == typeof a.className && a.className) ||
                        (typeof a.getAttribute !== A &&
                          a.getAttribute("class")) ||
                        ""
                    );
                  }))
              );
            },
            ATTR: function (a, b, c) {
              return function (d) {
                var e = db.attr(d, a);
                return null == e
                  ? "!=" === b
                  : b
                  ? ((e += ""),
                    "=" === b
                      ? e === c
                      : "!=" === b
                      ? e !== c
                      : "^=" === b
                      ? c && 0 === e.indexOf(c)
                      : "*=" === b
                      ? c && e.indexOf(c) > -1
                      : "$=" === b
                      ? c && e.slice(-c.length) === c
                      : "~=" === b
                      ? (" " + e + " ").indexOf(c) > -1
                      : "|=" === b
                      ? e === c || e.slice(0, c.length + 1) === c + "-"
                      : !1)
                  : !0;
              };
            },
            CHILD: function (a, b, c, d, e) {
              var f = "nth" !== a.slice(0, 3),
                g = "last" !== a.slice(-4),
                h = "of-type" === b;
              return 1 === d && 0 === e
                ? function (a) {
                    return !!a.parentNode;
                  }
                : function (b, c, i) {
                    var j,
                      k,
                      l,
                      m,
                      n,
                      o,
                      p = f !== g ? "nextSibling" : "previousSibling",
                      q = b.parentNode,
                      r = h && b.nodeName.toLowerCase(),
                      t = !i && !h;
                    if (q) {
                      if (f) {
                        while (p) {
                          l = b;
                          while ((l = l[p]))
                            if (
                              h
                                ? l.nodeName.toLowerCase() === r
                                : 1 === l.nodeType
                            )
                              return !1;
                          o = p = "only" === a && !o && "nextSibling";
                        }
                        return !0;
                      }
                      if (((o = [g ? q.firstChild : q.lastChild]), g && t)) {
                        (k = q[s] || (q[s] = {})),
                          (j = k[a] || []),
                          (n = j[0] === u && j[1]),
                          (m = j[0] === u && j[2]),
                          (l = n && q.childNodes[n]);
                        while (
                          (l = (++n && l && l[p]) || (m = n = 0) || o.pop())
                        )
                          if (1 === l.nodeType && ++m && l === b) {
                            k[a] = [u, n, m];
                            break;
                          }
                      } else if (
                        t &&
                        (j = (b[s] || (b[s] = {}))[a]) &&
                        j[0] === u
                      )
                        m = j[1];
                      else
                        while (
                          (l = (++n && l && l[p]) || (m = n = 0) || o.pop())
                        )
                          if (
                            (h
                              ? l.nodeName.toLowerCase() === r
                              : 1 === l.nodeType) &&
                            ++m &&
                            (t && ((l[s] || (l[s] = {}))[a] = [u, m]), l === b)
                          )
                            break;
                      return (m -= e), m === d || (m % d === 0 && m / d >= 0);
                    }
                  };
            },
            PSEUDO: function (a, b) {
              var c,
                e =
                  d.pseudos[a] ||
                  d.setFilters[a.toLowerCase()] ||
                  db.error("unsupported pseudo: " + a);
              return e[s]
                ? e(b)
                : e.length > 1
                ? ((c = [a, a, "", b]),
                  d.setFilters.hasOwnProperty(a.toLowerCase())
                    ? fb(function (a, c) {
                        var d,
                          f = e(a, b),
                          g = f.length;
                        while (g--)
                          (d = I.call(a, f[g])), (a[d] = !(c[d] = f[g]));
                      })
                    : function (a) {
                        return e(a, 0, c);
                      })
                : e;
            },
          },
          pseudos: {
            not: fb(function (a) {
              var b = [],
                c = [],
                d = g(a.replace(P, "$1"));
              return d[s]
                ? fb(function (a, b, c, e) {
                    var f,
                      g = d(a, null, e, []),
                      h = a.length;
                    while (h--) (f = g[h]) && (a[h] = !(b[h] = f));
                  })
                : function (a, e, f) {
                    return (b[0] = a), d(b, null, f, c), !c.pop();
                  };
            }),
            has: fb(function (a) {
              return function (b) {
                return db(a, b).length > 0;
              };
            }),
            contains: fb(function (a) {
              return function (b) {
                return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
              };
            }),
            lang: fb(function (a) {
              return (
                U.test(a || "") || db.error("unsupported lang: " + a),
                (a = a.replace(ab, bb).toLowerCase()),
                function (b) {
                  var c;
                  do
                    if (
                      (c = n
                        ? b.lang
                        : b.getAttribute("xml:lang") || b.getAttribute("lang"))
                    )
                      return (
                        (c = c.toLowerCase()),
                        c === a || 0 === c.indexOf(a + "-")
                      );
                  while ((b = b.parentNode) && 1 === b.nodeType);
                  return !1;
                }
              );
            }),
            target: function (b) {
              var c = a.location && a.location.hash;
              return c && c.slice(1) === b.id;
            },
            root: function (a) {
              return a === m;
            },
            focus: function (a) {
              return (
                a === l.activeElement &&
                (!l.hasFocus || l.hasFocus()) &&
                !!(a.type || a.href || ~a.tabIndex)
              );
            },
            enabled: function (a) {
              return a.disabled === !1;
            },
            disabled: function (a) {
              return a.disabled === !0;
            },
            checked: function (a) {
              var b = a.nodeName.toLowerCase();
              return (
                ("input" === b && !!a.checked) ||
                ("option" === b && !!a.selected)
              );
            },
            selected: function (a) {
              return (
                a.parentNode && a.parentNode.selectedIndex, a.selected === !0
              );
            },
            empty: function (a) {
              for (a = a.firstChild; a; a = a.nextSibling)
                if (a.nodeType < 6) return !1;
              return !0;
            },
            parent: function (a) {
              return !d.pseudos.empty(a);
            },
            header: function (a) {
              return X.test(a.nodeName);
            },
            input: function (a) {
              return W.test(a.nodeName);
            },
            button: function (a) {
              var b = a.nodeName.toLowerCase();
              return ("input" === b && "button" === a.type) || "button" === b;
            },
            text: function (a) {
              var b;
              return (
                "input" === a.nodeName.toLowerCase() &&
                "text" === a.type &&
                (null == (b = a.getAttribute("type")) ||
                  "text" === b.toLowerCase())
              );
            },
            first: lb(function () {
              return [0];
            }),
            last: lb(function (a, b) {
              return [b - 1];
            }),
            eq: lb(function (a, b, c) {
              return [0 > c ? c + b : c];
            }),
            even: lb(function (a, b) {
              for (var c = 0; b > c; c += 2) a.push(c);
              return a;
            }),
            odd: lb(function (a, b) {
              for (var c = 1; b > c; c += 2) a.push(c);
              return a;
            }),
            lt: lb(function (a, b, c) {
              for (var d = 0 > c ? c + b : c; --d >= 0; ) a.push(d);
              return a;
            }),
            gt: lb(function (a, b, c) {
              for (var d = 0 > c ? c + b : c; ++d < b; ) a.push(d);
              return a;
            }),
          },
        }),
      (d.pseudos.nth = d.pseudos.eq);
    for (b in {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0,
    })
      d.pseudos[b] = jb(b);
    for (b in {
      submit: !0,
      reset: !0,
    })
      d.pseudos[b] = kb(b);
    function nb() {}
    (nb.prototype = d.filters = d.pseudos), (d.setFilters = new nb());
    function ob(a, b) {
      var c,
        e,
        f,
        g,
        h,
        i,
        j,
        k = x[a + " "];
      if (k) return b ? 0 : k.slice(0);
      (h = a), (i = []), (j = d.preFilter);
      while (h) {
        (!c || (e = Q.exec(h))) &&
          (e && (h = h.slice(e[0].length) || h), i.push((f = []))),
          (c = !1),
          (e = R.exec(h)) &&
            ((c = e.shift()),
            f.push({
              value: c,
              type: e[0].replace(P, " "),
            }),
            (h = h.slice(c.length)));
        for (g in d.filter)
          !(e = V[g].exec(h)) ||
            (j[g] && !(e = j[g](e))) ||
            ((c = e.shift()),
            f.push({
              value: c,
              type: g,
              matches: e,
            }),
            (h = h.slice(c.length)));
        if (!c) break;
      }
      return b ? h.length : h ? db.error(a) : x(a, i).slice(0);
    }
    function pb(a) {
      for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
      return d;
    }
    function qb(a, b, c) {
      var d = b.dir,
        e = c && "parentNode" === d,
        f = v++;
      return b.first
        ? function (b, c, f) {
            while ((b = b[d])) if (1 === b.nodeType || e) return a(b, c, f);
          }
        : function (b, c, g) {
            var h,
              i,
              j = [u, f];
            if (g) {
              while ((b = b[d]))
                if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
            } else
              while ((b = b[d]))
                if (1 === b.nodeType || e) {
                  if (
                    ((i = b[s] || (b[s] = {})),
                    (h = i[d]) && h[0] === u && h[1] === f)
                  )
                    return (j[2] = h[2]);
                  if (((i[d] = j), (j[2] = a(b, c, g)))) return !0;
                }
          };
    }
    function rb(a) {
      return a.length > 1
        ? function (b, c, d) {
            var e = a.length;
            while (e--) if (!a[e](b, c, d)) return !1;
            return !0;
          }
        : a[0];
    }
    function sb(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
        (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
      return g;
    }
    function tb(a, b, c, d, e, f) {
      return (
        d && !d[s] && (d = tb(d)),
        e && !e[s] && (e = tb(e, f)),
        fb(function (f, g, h, i) {
          var j,
            k,
            l,
            m = [],
            n = [],
            o = g.length,
            p = f || wb(b || "*", h.nodeType ? [h] : h, []),
            q = !a || (!f && b) ? p : sb(p, m, a, h, i),
            r = c ? (e || (f ? a : o || d) ? [] : g) : q;
          if ((c && c(q, r, h, i), d)) {
            (j = sb(r, n)), d(j, [], h, i), (k = j.length);
            while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
          }
          if (f) {
            if (e || a) {
              if (e) {
                (j = []), (k = r.length);
                while (k--) (l = r[k]) && j.push((q[k] = l));
                e(null, (r = []), j, i);
              }
              k = r.length;
              while (k--)
                (l = r[k]) &&
                  (j = e ? I.call(f, l) : m[k]) > -1 &&
                  (f[j] = !(g[j] = l));
            }
          } else (r = sb(r === g ? r.splice(o, r.length) : r)), e ? e(null, g, r, i) : G.apply(g, r);
        })
      );
    }
    function ub(a) {
      for (
        var b,
          c,
          e,
          f = a.length,
          g = d.relative[a[0].type],
          i = g || d.relative[" "],
          j = g ? 1 : 0,
          k = qb(
            function (a) {
              return a === b;
            },
            i,
            !0
          ),
          l = qb(
            function (a) {
              return I.call(b, a) > -1;
            },
            i,
            !0
          ),
          m = [
            function (a, c, d) {
              return (
                (!g && (d || c !== h)) ||
                ((b = c).nodeType ? k(a, c, d) : l(a, c, d))
              );
            },
          ];
        f > j;
        j++
      )
        if ((c = d.relative[a[j].type])) m = [qb(rb(m), c)];
        else {
          if (((c = d.filter[a[j].type].apply(null, a[j].matches)), c[s])) {
            for (e = ++j; f > e; e++) if (d.relative[a[e].type]) break;
            return tb(
              j > 1 && rb(m),
              j > 1 &&
                pb(
                  a.slice(0, j - 1).concat({
                    value: " " === a[j - 2].type ? "*" : "",
                  })
                ).replace(P, "$1"),
              c,
              e > j && ub(a.slice(j, e)),
              f > e && ub((a = a.slice(e))),
              f > e && pb(a)
            );
          }
          m.push(c);
        }
      return rb(m);
    }
    function vb(a, b) {
      var c = b.length > 0,
        e = a.length > 0,
        f = function (f, g, i, j, k) {
          var m,
            n,
            o,
            p = 0,
            q = "0",
            r = f && [],
            s = [],
            t = h,
            v = f || (e && d.find.TAG("*", k)),
            w = (u += null == t ? 1 : Math.random() || 0.1),
            x = v.length;
          for (k && (h = g !== l && g); q !== x && null != (m = v[q]); q++) {
            if (e && m) {
              n = 0;
              while ((o = a[n++]))
                if (o(m, g, i)) {
                  j.push(m);
                  break;
                }
              k && (u = w);
            }
            c && ((m = !o && m) && p--, f && r.push(m));
          }
          if (((p += q), c && q !== p)) {
            n = 0;
            while ((o = b[n++])) o(r, s, g, i);
            if (f) {
              if (p > 0) while (q--) r[q] || s[q] || (s[q] = E.call(j));
              s = sb(s);
            }
            G.apply(j, s),
              k && !f && s.length > 0 && p + b.length > 1 && db.uniqueSort(j);
          }
          return k && ((u = w), (h = t)), r;
        };
      return c ? fb(f) : f;
    }
    g = db.compile = function (a, b) {
      var c,
        d = [],
        e = [],
        f = y[a + " "];
      if (!f) {
        b || (b = ob(a)), (c = b.length);
        while (c--) (f = ub(b[c])), f[s] ? d.push(f) : e.push(f);
        f = y(a, vb(e, d));
      }
      return f;
    };
    function wb(a, b, c) {
      for (var d = 0, e = b.length; e > d; d++) db(a, b[d], c);
      return c;
    }
    function xb(a, b, e, f) {
      var h,
        i,
        j,
        k,
        l,
        m = ob(a);
      if (!f && 1 === m.length) {
        if (
          ((i = m[0] = m[0].slice(0)),
          i.length > 2 &&
            "ID" === (j = i[0]).type &&
            c.getById &&
            9 === b.nodeType &&
            n &&
            d.relative[i[1].type])
        ) {
          if (((b = (d.find.ID(j.matches[0].replace(ab, bb), b) || [])[0]), !b))
            return e;
          a = a.slice(i.shift().value.length);
        }
        h = V.needsContext.test(a) ? 0 : i.length;
        while (h--) {
          if (((j = i[h]), d.relative[(k = j.type)])) break;
          if (
            (l = d.find[k]) &&
            (f = l(
              j.matches[0].replace(ab, bb),
              ($.test(i[0].type) && mb(b.parentNode)) || b
            ))
          ) {
            if ((i.splice(h, 1), (a = f.length && pb(i)), !a))
              return G.apply(e, f), e;
            break;
          }
        }
      }
      return g(a, m)(f, b, !n, e, ($.test(a) && mb(b.parentNode)) || b), e;
    }
    return (
      (c.sortStable = s.split("").sort(z).join("") === s),
      (c.detectDuplicates = !!j),
      k(),
      (c.sortDetached = gb(function (a) {
        return 1 & a.compareDocumentPosition(l.createElement("div"));
      })),
      gb(function (a) {
        return (
          (a.innerHTML = "<a href='#'></a>"),
          "#" === a.firstChild.getAttribute("href")
        );
      }) ||
        hb("type|href|height|width", function (a, b, c) {
          return c
            ? void 0
            : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
        }),
      (c.attributes &&
        gb(function (a) {
          return (
            (a.innerHTML = "<input/>"),
            a.firstChild.setAttribute("value", ""),
            "" === a.firstChild.getAttribute("value")
          );
        })) ||
        hb("value", function (a, b, c) {
          return c || "input" !== a.nodeName.toLowerCase()
            ? void 0
            : a.defaultValue;
        }),
      gb(function (a) {
        return null == a.getAttribute("disabled");
      }) ||
        hb(J, function (a, b, c) {
          var d;
          return c
            ? void 0
            : a[b] === !0
            ? b.toLowerCase()
            : (d = a.getAttributeNode(b)) && d.specified
            ? d.value
            : null;
        }),
      db
    );
  })(a);
  (n.find = t),
    (n.expr = t.selectors),
    (n.expr[":"] = n.expr.pseudos),
    (n.unique = t.uniqueSort),
    (n.text = t.getText),
    (n.isXMLDoc = t.isXML),
    (n.contains = t.contains);
  var u = n.expr.match.needsContext,
    v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    w = /^.[^:#\[\.,]*$/;
  function x(a, b, c) {
    if (n.isFunction(b))
      return n.grep(a, function (a, d) {
        return !!b.call(a, d, a) !== c;
      });
    if (b.nodeType)
      return n.grep(a, function (a) {
        return (a === b) !== c;
      });
    if ("string" == typeof b) {
      if (w.test(b)) return n.filter(b, a, c);
      b = n.filter(b, a);
    }
    return n.grep(a, function (a) {
      return n.inArray(a, b) >= 0 !== c;
    });
  }
  (n.filter = function (a, b, c) {
    var d = b[0];
    return (
      c && (a = ":not(" + a + ")"),
      1 === b.length && 1 === d.nodeType
        ? n.find.matchesSelector(d, a)
          ? [d]
          : []
        : n.find.matches(
            a,
            n.grep(b, function (a) {
              return 1 === a.nodeType;
            })
          )
    );
  }),
    n.fn.extend({
      find: function (a) {
        var b,
          c = [],
          d = this,
          e = d.length;
        if ("string" != typeof a)
          return this.pushStack(
            n(a).filter(function () {
              for (b = 0; e > b; b++) if (n.contains(d[b], this)) return !0;
            })
          );
        for (b = 0; e > b; b++) n.find(a, d[b], c);
        return (
          (c = this.pushStack(e > 1 ? n.unique(c) : c)),
          (c.selector = this.selector ? this.selector + " " + a : a),
          c
        );
      },
      filter: function (a) {
        return this.pushStack(x(this, a || [], !1));
      },
      not: function (a) {
        return this.pushStack(x(this, a || [], !0));
      },
      is: function (a) {
        return !!x(this, "string" == typeof a && u.test(a) ? n(a) : a || [], !1)
          .length;
      },
    });
  var y,
    z = a.document,
    A = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    B = (n.fn.init = function (a, b) {
      var c, d;
      if (!a) return this;
      if ("string" == typeof a) {
        if (
          ((c =
            "<" === a.charAt(0) &&
            ">" === a.charAt(a.length - 1) &&
            a.length >= 3
              ? [null, a, null]
              : A.exec(a)),
          !c || (!c[1] && b))
        )
          return !b || b.jquery
            ? (b || y).find(a)
            : this.constructor(b).find(a);
        if (c[1]) {
          if (
            ((b = b instanceof n ? b[0] : b),
            n.merge(
              this,
              n.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : z, !0)
            ),
            v.test(c[1]) && n.isPlainObject(b))
          )
            for (c in b)
              n.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
          return this;
        }
        if (((d = z.getElementById(c[2])), d && d.parentNode)) {
          if (d.id !== c[2]) return y.find(a);
          (this.length = 1), (this[0] = d);
        }
        return (this.context = z), (this.selector = a), this;
      }
      return a.nodeType
        ? ((this.context = this[0] = a), (this.length = 1), this)
        : n.isFunction(a)
        ? "undefined" != typeof y.ready
          ? y.ready(a)
          : a(n)
        : (void 0 !== a.selector &&
            ((this.selector = a.selector), (this.context = a.context)),
          n.makeArray(a, this));
    });
  (B.prototype = n.fn), (y = n(z));
  var C = /^(?:parents|prev(?:Until|All))/,
    D = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0,
    };
  n.extend({
    dir: function (a, b, c) {
      var d = [],
        e = a[b];
      while (
        e &&
        9 !== e.nodeType &&
        (void 0 === c || 1 !== e.nodeType || !n(e).is(c))
      )
        1 === e.nodeType && d.push(e), (e = e[b]);
      return d;
    },
    sibling: function (a, b) {
      for (var c = []; a; a = a.nextSibling)
        1 === a.nodeType && a !== b && c.push(a);
      return c;
    },
  }),
    n.fn.extend({
      has: function (a) {
        var b,
          c = n(a, this),
          d = c.length;
        return this.filter(function () {
          for (b = 0; d > b; b++) if (n.contains(this, c[b])) return !0;
        });
      },
      closest: function (a, b) {
        for (
          var c,
            d = 0,
            e = this.length,
            f = [],
            g = u.test(a) || "string" != typeof a ? n(a, b || this.context) : 0;
          e > d;
          d++
        )
          for (c = this[d]; c && c !== b; c = c.parentNode)
            if (
              c.nodeType < 11 &&
              (g
                ? g.index(c) > -1
                : 1 === c.nodeType && n.find.matchesSelector(c, a))
            ) {
              f.push(c);
              break;
            }
        return this.pushStack(f.length > 1 ? n.unique(f) : f);
      },
      index: function (a) {
        return a
          ? "string" == typeof a
            ? n.inArray(this[0], n(a))
            : n.inArray(a.jquery ? a[0] : a, this)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (a, b) {
        return this.pushStack(n.unique(n.merge(this.get(), n(a, b))));
      },
      addBack: function (a) {
        return this.add(
          null == a ? this.prevObject : this.prevObject.filter(a)
        );
      },
    });
  function E(a, b) {
    do a = a[b];
    while (a && 1 !== a.nodeType);
    return a;
  }
  n.each(
    {
      parent: function (a) {
        var b = a.parentNode;
        return b && 11 !== b.nodeType ? b : null;
      },
      parents: function (a) {
        return n.dir(a, "parentNode");
      },
      parentsUntil: function (a, b, c) {
        return n.dir(a, "parentNode", c);
      },
      next: function (a) {
        return E(a, "nextSibling");
      },
      prev: function (a) {
        return E(a, "previousSibling");
      },
      nextAll: function (a) {
        return n.dir(a, "nextSibling");
      },
      prevAll: function (a) {
        return n.dir(a, "previousSibling");
      },
      nextUntil: function (a, b, c) {
        return n.dir(a, "nextSibling", c);
      },
      prevUntil: function (a, b, c) {
        return n.dir(a, "previousSibling", c);
      },
      siblings: function (a) {
        return n.sibling((a.parentNode || {}).firstChild, a);
      },
      children: function (a) {
        return n.sibling(a.firstChild);
      },
      contents: function (a) {
        return n.nodeName(a, "iframe")
          ? a.contentDocument || a.contentWindow.document
          : n.merge([], a.childNodes);
      },
    },
    function (a, b) {
      n.fn[a] = function (c, d) {
        var e = n.map(this, b, c);
        return (
          "Until" !== a.slice(-5) && (d = c),
          d && "string" == typeof d && (e = n.filter(d, e)),
          this.length > 1 &&
            (D[a] || (e = n.unique(e)), C.test(a) && (e = e.reverse())),
          this.pushStack(e)
        );
      };
    }
  );
  var F = /\S+/g,
    G = {};
  function H(a) {
    var b = (G[a] = {});
    return (
      n.each(a.match(F) || [], function (a, c) {
        b[c] = !0;
      }),
      b
    );
  }
  (n.Callbacks = function (a) {
    a = "string" == typeof a ? G[a] || H(a) : n.extend({}, a);
    var b,
      c,
      d,
      e,
      f,
      g,
      h = [],
      i = !a.once && [],
      j = function (l) {
        for (
          c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0;
          h && e > f;
          f++
        )
          if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
            c = !1;
            break;
          }
        (b = !1),
          h && (i ? i.length && j(i.shift()) : c ? (h = []) : k.disable());
      },
      k = {
        add: function () {
          if (h) {
            var d = h.length;
            !(function f(b) {
              n.each(b, function (b, c) {
                var d = n.type(c);
                "function" === d
                  ? (a.unique && k.has(c)) || h.push(c)
                  : c && c.length && "string" !== d && f(c);
              });
            })(arguments),
              b ? (e = h.length) : c && ((g = d), j(c));
          }
          return this;
        },
        remove: function () {
          return (
            h &&
              n.each(arguments, function (a, c) {
                var d;
                while ((d = n.inArray(c, h, d)) > -1)
                  h.splice(d, 1), b && (e >= d && e--, f >= d && f--);
              }),
            this
          );
        },
        has: function (a) {
          return a ? n.inArray(a, h) > -1 : !(!h || !h.length);
        },
        empty: function () {
          return (h = []), (e = 0), this;
        },
        disable: function () {
          return (h = i = c = void 0), this;
        },
        disabled: function () {
          return !h;
        },
        lock: function () {
          return (i = void 0), c || k.disable(), this;
        },
        locked: function () {
          return !i;
        },
        fireWith: function (a, c) {
          return (
            !h ||
              (d && !i) ||
              ((c = c || []),
              (c = [a, c.slice ? c.slice() : c]),
              b ? i.push(c) : j(c)),
            this
          );
        },
        fire: function () {
          return k.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!d;
        },
      };
    return k;
  }),
    n.extend({
      Deferred: function (a) {
        var b = [
            ["resolve", "done", n.Callbacks("once memory"), "resolved"],
            ["reject", "fail", n.Callbacks("once memory"), "rejected"],
            ["notify", "progress", n.Callbacks("memory")],
          ],
          c = "pending",
          d = {
            state: function () {
              return c;
            },
            always: function () {
              return e.done(arguments).fail(arguments), this;
            },
            then: function () {
              var a = arguments;
              return n
                .Deferred(function (c) {
                  n.each(b, function (b, f) {
                    var g = n.isFunction(a[b]) && a[b];
                    e[f[1]](function () {
                      var a = g && g.apply(this, arguments);
                      a && n.isFunction(a.promise)
                        ? a
                            .promise()
                            .done(c.resolve)
                            .fail(c.reject)
                            .progress(c.notify)
                        : c[f[0] + "With"](
                            this === d ? c.promise() : this,
                            g ? [a] : arguments
                          );
                    });
                  }),
                    (a = null);
                })
                .promise();
            },
            promise: function (a) {
              return null != a ? n.extend(a, d) : d;
            },
          },
          e = {};
        return (
          (d.pipe = d.then),
          n.each(b, function (a, f) {
            var g = f[2],
              h = f[3];
            (d[f[1]] = g.add),
              h &&
                g.add(
                  function () {
                    c = h;
                  },
                  b[1 ^ a][2].disable,
                  b[2][2].lock
                ),
              (e[f[0]] = function () {
                return e[f[0] + "With"](this === e ? d : this, arguments), this;
              }),
              (e[f[0] + "With"] = g.fireWith);
          }),
          d.promise(e),
          a && a.call(e, e),
          e
        );
      },
      when: function (a) {
        var b = 0,
          c = d.call(arguments),
          e = c.length,
          f = 1 !== e || (a && n.isFunction(a.promise)) ? e : 0,
          g = 1 === f ? a : n.Deferred(),
          h = function (a, b, c) {
            return function (e) {
              (b[a] = this),
                (c[a] = arguments.length > 1 ? d.call(arguments) : e),
                c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
            };
          },
          i,
          j,
          k;
        if (e > 1)
          for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++)
            c[b] && n.isFunction(c[b].promise)
              ? c[b]
                  .promise()
                  .done(h(b, k, c))
                  .fail(g.reject)
                  .progress(h(b, j, i))
              : --f;
        return f || g.resolveWith(k, c), g.promise();
      },
    });
  var I;
  (n.fn.ready = function (a) {
    return n.ready.promise().done(a), this;
  }),
    n.extend({
      isReady: !1,
      readyWait: 1,
      holdReady: function (a) {
        a ? n.readyWait++ : n.ready(!0);
      },
      ready: function (a) {
        if (a === !0 ? !--n.readyWait : !n.isReady) {
          if (!z.body) return setTimeout(n.ready);
          (n.isReady = !0),
            (a !== !0 && --n.readyWait > 0) ||
              (I.resolveWith(z, [n]),
              n.fn.trigger && n(z).trigger("ready").off("ready"));
        }
      },
    });
  function J() {
    z.addEventListener
      ? (z.removeEventListener("DOMContentLoaded", K, !1),
        a.removeEventListener("load", K, !1))
      : (z.detachEvent("onreadystatechange", K), a.detachEvent("onload", K));
  }
  function K() {
    (z.addEventListener ||
      "load" === event.type ||
      "complete" === z.readyState) &&
      (J(), n.ready());
  }
  n.ready.promise = function (b) {
    if (!I)
      if (((I = n.Deferred()), "complete" === z.readyState))
        setTimeout(n.ready);
      else if (z.addEventListener)
        z.addEventListener("DOMContentLoaded", K, !1),
          a.addEventListener("load", K, !1);
      else {
        z.attachEvent("onreadystatechange", K), a.attachEvent("onload", K);
        var c = !1;
        try {
          c = null == a.frameElement && z.documentElement;
        } catch (d) {}
        c &&
          c.doScroll &&
          !(function e() {
            if (!n.isReady) {
              try {
                c.doScroll("left");
              } catch (a) {
                return setTimeout(e, 50);
              }
              J(), n.ready();
            }
          })();
      }
    return I.promise(b);
  };
  var L = "undefined",
    M;
  for (M in n(l)) break;
  (l.ownLast = "0" !== M),
    (l.inlineBlockNeedsLayout = !1),
    n(function () {
      var a,
        b,
        c = z.getElementsByTagName("body")[0];
      c &&
        ((a = z.createElement("div")),
        (a.style.cssText =
          "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px"),
        (b = z.createElement("div")),
        c.appendChild(a).appendChild(b),
        typeof b.style.zoom !== L &&
          ((b.style.cssText =
            "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1"),
          (l.inlineBlockNeedsLayout = 3 === b.offsetWidth) &&
            (c.style.zoom = 1)),
        c.removeChild(a),
        (a = b = null));
    }),
    (function () {
      var a = z.createElement("div");
      if (null == l.deleteExpando) {
        l.deleteExpando = !0;
        try {
          delete a.test;
        } catch (b) {
          l.deleteExpando = !1;
        }
      }
      a = null;
    })(),
    (n.acceptData = function (a) {
      var b = n.noData[(a.nodeName + " ").toLowerCase()],
        c = +a.nodeType || 1;
      return 1 !== c && 9 !== c
        ? !1
        : !b || (b !== !0 && a.getAttribute("classid") === b);
    });
  var N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    O = /([A-Z])/g;
  function P(a, b, c) {
    if (void 0 === c && 1 === a.nodeType) {
      var d = "data-" + b.replace(O, "-$1").toLowerCase();
      if (((c = a.getAttribute(d)), "string" == typeof c)) {
        try {
          c =
            "true" === c
              ? !0
              : "false" === c
              ? !1
              : "null" === c
              ? null
              : +c + "" === c
              ? +c
              : N.test(c)
              ? n.parseJSON(c)
              : c;
        } catch (e) {}
        n.data(a, b, c);
      } else c = void 0;
    }
    return c;
  }
  function Q(a) {
    var b;
    for (b in a)
      if (("data" !== b || !n.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
    return !0;
  }
  function R(a, b, d, e) {
    if (n.acceptData(a)) {
      var f,
        g,
        h = n.expando,
        i = a.nodeType,
        j = i ? n.cache : a,
        k = i ? a[h] : a[h] && h;
      if (
        (k && j[k] && (e || j[k].data)) ||
        void 0 !== d ||
        "string" != typeof b
      )
        return (
          k || (k = i ? (a[h] = c.pop() || n.guid++) : h),
          j[k] ||
            (j[k] = i
              ? {}
              : {
                  toJSON: n.noop,
                }),
          ("object" == typeof b || "function" == typeof b) &&
            (e
              ? (j[k] = n.extend(j[k], b))
              : (j[k].data = n.extend(j[k].data, b))),
          (g = j[k]),
          e || (g.data || (g.data = {}), (g = g.data)),
          void 0 !== d && (g[n.camelCase(b)] = d),
          "string" == typeof b
            ? ((f = g[b]), null == f && (f = g[n.camelCase(b)]))
            : (f = g),
          f
        );
    }
  }
  function S(a, b, c) {
    if (n.acceptData(a)) {
      var d,
        e,
        f = a.nodeType,
        g = f ? n.cache : a,
        h = f ? a[n.expando] : n.expando;
      if (g[h]) {
        if (b && (d = c ? g[h] : g[h].data)) {
          n.isArray(b)
            ? (b = b.concat(n.map(b, n.camelCase)))
            : b in d
            ? (b = [b])
            : ((b = n.camelCase(b)), (b = b in d ? [b] : b.split(" "))),
            (e = b.length);
          while (e--) delete d[b[e]];
          if (c ? !Q(d) : !n.isEmptyObject(d)) return;
        }
        (c || (delete g[h].data, Q(g[h]))) &&
          (f
            ? n.cleanData([a], !0)
            : l.deleteExpando || g != g.window
            ? delete g[h]
            : (g[h] = null));
      }
    }
  }
  n.extend({
    cache: {},
    noData: {
      "applet ": !0,
      "embed ": !0,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
    },
    hasData: function (a) {
      return (
        (a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando]), !!a && !Q(a)
      );
    },
    data: function (a, b, c) {
      return R(a, b, c);
    },
    removeData: function (a, b) {
      return S(a, b);
    },
    _data: function (a, b, c) {
      return R(a, b, c, !0);
    },
    _removeData: function (a, b) {
      return S(a, b, !0);
    },
  }),
    n.fn.extend({
      data: function (a, b) {
        var c,
          d,
          e,
          f = this[0],
          g = f && f.attributes;
        if (void 0 === a) {
          if (
            this.length &&
            ((e = n.data(f)), 1 === f.nodeType && !n._data(f, "parsedAttrs"))
          ) {
            c = g.length;
            while (c--)
              (d = g[c].name),
                0 === d.indexOf("data-") &&
                  ((d = n.camelCase(d.slice(5))), P(f, d, e[d]));
            n._data(f, "parsedAttrs", !0);
          }
          return e;
        }
        return "object" == typeof a
          ? this.each(function () {
              n.data(this, a);
            })
          : arguments.length > 1
          ? this.each(function () {
              n.data(this, a, b);
            })
          : f
          ? P(f, a, n.data(f, a))
          : void 0;
      },
      removeData: function (a) {
        return this.each(function () {
          n.removeData(this, a);
        });
      },
    }),
    n.extend({
      queue: function (a, b, c) {
        var d;
        return a
          ? ((b = (b || "fx") + "queue"),
            (d = n._data(a, b)),
            c &&
              (!d || n.isArray(c)
                ? (d = n._data(a, b, n.makeArray(c)))
                : d.push(c)),
            d || [])
          : void 0;
      },
      dequeue: function (a, b) {
        b = b || "fx";
        var c = n.queue(a, b),
          d = c.length,
          e = c.shift(),
          f = n._queueHooks(a, b),
          g = function () {
            n.dequeue(a, b);
          };
        "inprogress" === e && ((e = c.shift()), d--),
          e &&
            ("fx" === b && c.unshift("inprogress"),
            delete f.stop,
            e.call(a, g, f)),
          !d && f && f.empty.fire();
      },
      _queueHooks: function (a, b) {
        var c = b + "queueHooks";
        return (
          n._data(a, c) ||
          n._data(a, c, {
            empty: n.Callbacks("once memory").add(function () {
              n._removeData(a, b + "queue"), n._removeData(a, c);
            }),
          })
        );
      },
    }),
    n.fn.extend({
      queue: function (a, b) {
        var c = 2;
        return (
          "string" != typeof a && ((b = a), (a = "fx"), c--),
          arguments.length < c
            ? n.queue(this[0], a)
            : void 0 === b
            ? this
            : this.each(function () {
                var c = n.queue(this, a, b);
                n._queueHooks(this, a),
                  "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a);
              })
        );
      },
      dequeue: function (a) {
        return this.each(function () {
          n.dequeue(this, a);
        });
      },
      clearQueue: function (a) {
        return this.queue(a || "fx", []);
      },
      promise: function (a, b) {
        var c,
          d = 1,
          e = n.Deferred(),
          f = this,
          g = this.length,
          h = function () {
            --d || e.resolveWith(f, [f]);
          };
        "string" != typeof a && ((b = a), (a = void 0)), (a = a || "fx");
        while (g--)
          (c = n._data(f[g], a + "queueHooks")),
            c && c.empty && (d++, c.empty.add(h));
        return h(), e.promise(b);
      },
    });
  var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    U = ["Top", "Right", "Bottom", "Left"],
    V = function (a, b) {
      return (
        (a = b || a),
        "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a)
      );
    },
    W = (n.access = function (a, b, c, d, e, f, g) {
      var h = 0,
        i = a.length,
        j = null == c;
      if ("object" === n.type(c)) {
        e = !0;
        for (h in c) n.access(a, b, h, c[h], !0, f, g);
      } else if (
        void 0 !== d &&
        ((e = !0),
        n.isFunction(d) || (g = !0),
        j &&
          (g
            ? (b.call(a, d), (b = null))
            : ((j = b),
              (b = function (a, b, c) {
                return j.call(n(a), c);
              }))),
        b)
      )
        for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
      return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
    }),
    X = /^(?:checkbox|radio)$/i;
  !(function () {
    var a = z.createDocumentFragment(),
      b = z.createElement("div"),
      c = z.createElement("input");
    if (
      (b.setAttribute("className", "t"),
      (b.innerHTML = "  <link/><table></table><a href='/a'>a</a>"),
      (l.leadingWhitespace = 3 === b.firstChild.nodeType),
      (l.tbody = !b.getElementsByTagName("tbody").length),
      (l.htmlSerialize = !!b.getElementsByTagName("link").length),
      (l.html5Clone =
        "<:nav></:nav>" !== z.createElement("nav").cloneNode(!0).outerHTML),
      (c.type = "checkbox"),
      (c.checked = !0),
      a.appendChild(c),
      (l.appendChecked = c.checked),
      (b.innerHTML = "<textarea>x</textarea>"),
      (l.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue),
      a.appendChild(b),
      (b.innerHTML = "<input type='radio' checked='checked' name='t'/>"),
      (l.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked),
      (l.noCloneEvent = !0),
      b.attachEvent &&
        (b.attachEvent("onclick", function () {
          l.noCloneEvent = !1;
        }),
        b.cloneNode(!0).click()),
      null == l.deleteExpando)
    ) {
      l.deleteExpando = !0;
      try {
        delete b.test;
      } catch (d) {
        l.deleteExpando = !1;
      }
    }
    a = b = c = null;
  })(),
    (function () {
      var b,
        c,
        d = z.createElement("div");
      for (b in {
        submit: !0,
        change: !0,
        focusin: !0,
      })
        (c = "on" + b),
          (l[b + "Bubbles"] = c in a) ||
            (d.setAttribute(c, "t"),
            (l[b + "Bubbles"] = d.attributes[c].expando === !1));
      d = null;
    })();
  var Y = /^(?:input|select|textarea)$/i,
    Z = /^key/,
    $ = /^(?:mouse|contextmenu)|click/,
    _ = /^(?:focusinfocus|focusoutblur)$/,
    ab = /^([^.]*)(?:\.(.+)|)$/;
  function bb() {
    return !0;
  }
  function cb() {
    return !1;
  }
  function db() {
    try {
      return z.activeElement;
    } catch (a) {}
  }
  (n.event = {
    global: {},
    add: function (a, b, c, d, e) {
      var f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        o,
        p,
        q,
        r = n._data(a);
      if (r) {
        c.handler && ((i = c), (c = i.handler), (e = i.selector)),
          c.guid || (c.guid = n.guid++),
          (g = r.events) || (g = r.events = {}),
          (k = r.handle) ||
            ((k = r.handle =
              function (a) {
                return typeof n === L || (a && n.event.triggered === a.type)
                  ? void 0
                  : n.event.dispatch.apply(k.elem, arguments);
              }),
            (k.elem = a)),
          (b = (b || "").match(F) || [""]),
          (h = b.length);
        while (h--)
          (f = ab.exec(b[h]) || []),
            (o = q = f[1]),
            (p = (f[2] || "").split(".").sort()),
            o &&
              ((j = n.event.special[o] || {}),
              (o = (e ? j.delegateType : j.bindType) || o),
              (j = n.event.special[o] || {}),
              (l = n.extend(
                {
                  type: o,
                  origType: q,
                  data: d,
                  handler: c,
                  guid: c.guid,
                  selector: e,
                  needsContext: e && n.expr.match.needsContext.test(e),
                  namespace: p.join("."),
                },
                i
              )),
              (m = g[o]) ||
                ((m = g[o] = []),
                (m.delegateCount = 0),
                (j.setup && j.setup.call(a, d, p, k) !== !1) ||
                  (a.addEventListener
                    ? a.addEventListener(o, k, !1)
                    : a.attachEvent && a.attachEvent("on" + o, k))),
              j.add &&
                (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)),
              e ? m.splice(m.delegateCount++, 0, l) : m.push(l),
              (n.event.global[o] = !0));
        a = null;
      }
    },
    remove: function (a, b, c, d, e) {
      var f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        o,
        p,
        q,
        r = n.hasData(a) && n._data(a);
      if (r && (k = r.events)) {
        (b = (b || "").match(F) || [""]), (j = b.length);
        while (j--)
          if (
            ((h = ab.exec(b[j]) || []),
            (o = q = h[1]),
            (p = (h[2] || "").split(".").sort()),
            o)
          ) {
            (l = n.event.special[o] || {}),
              (o = (d ? l.delegateType : l.bindType) || o),
              (m = k[o] || []),
              (h =
                h[2] &&
                new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)")),
              (i = f = m.length);
            while (f--)
              (g = m[f]),
                (!e && q !== g.origType) ||
                  (c && c.guid !== g.guid) ||
                  (h && !h.test(g.namespace)) ||
                  (d && d !== g.selector && ("**" !== d || !g.selector)) ||
                  (m.splice(f, 1),
                  g.selector && m.delegateCount--,
                  l.remove && l.remove.call(a, g));
            i &&
              !m.length &&
              ((l.teardown && l.teardown.call(a, p, r.handle) !== !1) ||
                n.removeEvent(a, o, r.handle),
              delete k[o]);
          } else for (o in k) n.event.remove(a, o + b[j], c, d, !0);
        n.isEmptyObject(k) && (delete r.handle, n._removeData(a, "events"));
      }
    },
    trigger: function (b, c, d, e) {
      var f,
        g,
        h,
        i,
        k,
        l,
        m,
        o = [d || z],
        p = j.call(b, "type") ? b.type : b,
        q = j.call(b, "namespace") ? b.namespace.split(".") : [];
      if (
        ((h = l = d = d || z),
        3 !== d.nodeType &&
          8 !== d.nodeType &&
          !_.test(p + n.event.triggered) &&
          (p.indexOf(".") >= 0 &&
            ((q = p.split(".")), (p = q.shift()), q.sort()),
          (g = p.indexOf(":") < 0 && "on" + p),
          (b = b[n.expando] ? b : new n.Event(p, "object" == typeof b && b)),
          (b.isTrigger = e ? 2 : 3),
          (b.namespace = q.join(".")),
          (b.namespace_re = b.namespace
            ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (b.result = void 0),
          b.target || (b.target = d),
          (c = null == c ? [b] : n.makeArray(c, [b])),
          (k = n.event.special[p] || {}),
          e || !k.trigger || k.trigger.apply(d, c) !== !1))
      ) {
        if (!e && !k.noBubble && !n.isWindow(d)) {
          for (
            i = k.delegateType || p, _.test(i + p) || (h = h.parentNode);
            h;
            h = h.parentNode
          )
            o.push(h), (l = h);
          l === (d.ownerDocument || z) &&
            o.push(l.defaultView || l.parentWindow || a);
        }
        m = 0;
        while ((h = o[m++]) && !b.isPropagationStopped())
          (b.type = m > 1 ? i : k.bindType || p),
            (f = (n._data(h, "events") || {})[b.type] && n._data(h, "handle")),
            f && f.apply(h, c),
            (f = g && h[g]),
            f &&
              f.apply &&
              n.acceptData(h) &&
              ((b.result = f.apply(h, c)),
              b.result === !1 && b.preventDefault());
        if (
          ((b.type = p),
          !e &&
            !b.isDefaultPrevented() &&
            (!k._default || k._default.apply(o.pop(), c) === !1) &&
            n.acceptData(d) &&
            g &&
            d[p] &&
            !n.isWindow(d))
        ) {
          (l = d[g]), l && (d[g] = null), (n.event.triggered = p);
          try {
            d[p]();
          } catch (r) {}
          (n.event.triggered = void 0), l && (d[g] = l);
        }
        return b.result;
      }
    },
    dispatch: function (a) {
      a = n.event.fix(a);
      var b,
        c,
        e,
        f,
        g,
        h = [],
        i = d.call(arguments),
        j = (n._data(this, "events") || {})[a.type] || [],
        k = n.event.special[a.type] || {};
      if (
        ((i[0] = a),
        (a.delegateTarget = this),
        !k.preDispatch || k.preDispatch.call(this, a) !== !1)
      ) {
        (h = n.event.handlers.call(this, a, j)), (b = 0);
        while ((f = h[b++]) && !a.isPropagationStopped()) {
          (a.currentTarget = f.elem), (g = 0);
          while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())
            (!a.namespace_re || a.namespace_re.test(e.namespace)) &&
              ((a.handleObj = e),
              (a.data = e.data),
              (c = (
                (n.event.special[e.origType] || {}).handle || e.handler
              ).apply(f.elem, i)),
              void 0 !== c &&
                (a.result = c) === !1 &&
                (a.preventDefault(), a.stopPropagation()));
        }
        return k.postDispatch && k.postDispatch.call(this, a), a.result;
      }
    },
    handlers: function (a, b) {
      var c,
        d,
        e,
        f,
        g = [],
        h = b.delegateCount,
        i = a.target;
      if (h && i.nodeType && (!a.button || "click" !== a.type))
        for (; i != this; i = i.parentNode || this)
          if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
            for (e = [], f = 0; h > f; f++)
              (d = b[f]),
                (c = d.selector + " "),
                void 0 === e[c] &&
                  (e[c] = d.needsContext
                    ? n(c, this).index(i) >= 0
                    : n.find(c, this, null, [i]).length),
                e[c] && e.push(d);
            e.length &&
              g.push({
                elem: i,
                handlers: e,
              });
          }
      return (
        h < b.length &&
          g.push({
            elem: this,
            handlers: b.slice(h),
          }),
        g
      );
    },
    fix: function (a) {
      if (a[n.expando]) return a;
      var b,
        c,
        d,
        e = a.type,
        f = a,
        g = this.fixHooks[e];
      g ||
        (this.fixHooks[e] = g =
          $.test(e) ? this.mouseHooks : Z.test(e) ? this.keyHooks : {}),
        (d = g.props ? this.props.concat(g.props) : this.props),
        (a = new n.Event(f)),
        (b = d.length);
      while (b--) (c = d[b]), (a[c] = f[c]);
      return (
        a.target || (a.target = f.srcElement || z),
        3 === a.target.nodeType && (a.target = a.target.parentNode),
        (a.metaKey = !!a.metaKey),
        g.filter ? g.filter(a, f) : a
      );
    },
    props:
      "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
        " "
      ),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (a, b) {
        return (
          null == a.which &&
            (a.which = null != b.charCode ? b.charCode : b.keyCode),
          a
        );
      },
    },
    mouseHooks: {
      props:
        "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
          " "
        ),
      filter: function (a, b) {
        var c,
          d,
          e,
          f = b.button,
          g = b.fromElement;
        return (
          null == a.pageX &&
            null != b.clientX &&
            ((d = a.target.ownerDocument || z),
            (e = d.documentElement),
            (c = d.body),
            (a.pageX =
              b.clientX +
              ((e && e.scrollLeft) || (c && c.scrollLeft) || 0) -
              ((e && e.clientLeft) || (c && c.clientLeft) || 0)),
            (a.pageY =
              b.clientY +
              ((e && e.scrollTop) || (c && c.scrollTop) || 0) -
              ((e && e.clientTop) || (c && c.clientTop) || 0))),
          !a.relatedTarget &&
            g &&
            (a.relatedTarget = g === a.target ? b.toElement : g),
          a.which ||
            void 0 === f ||
            (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0),
          a
        );
      },
    },
    special: {
      load: {
        noBubble: !0,
      },
      focus: {
        trigger: function () {
          if (this !== db() && this.focus)
            try {
              return this.focus(), !1;
            } catch (a) {}
        },
        delegateType: "focusin",
      },
      blur: {
        trigger: function () {
          return this === db() && this.blur ? (this.blur(), !1) : void 0;
        },
        delegateType: "focusout",
      },
      click: {
        trigger: function () {
          return n.nodeName(this, "input") &&
            "checkbox" === this.type &&
            this.click
            ? (this.click(), !1)
            : void 0;
        },
        _default: function (a) {
          return n.nodeName(a.target, "a");
        },
      },
      beforeunload: {
        postDispatch: function (a) {
          void 0 !== a.result && (a.originalEvent.returnValue = a.result);
        },
      },
    },
    simulate: function (a, b, c, d) {
      var e = n.extend(new n.Event(), c, {
        type: a,
        isSimulated: !0,
        originalEvent: {},
      });
      d ? n.event.trigger(e, null, b) : n.event.dispatch.call(b, e),
        e.isDefaultPrevented() && c.preventDefault();
    },
  }),
    (n.removeEvent = z.removeEventListener
      ? function (a, b, c) {
          a.removeEventListener && a.removeEventListener(b, c, !1);
        }
      : function (a, b, c) {
          var d = "on" + b;
          a.detachEvent &&
            (typeof a[d] === L && (a[d] = null), a.detachEvent(d, c));
        }),
    (n.Event = function (a, b) {
      return this instanceof n.Event
        ? (a && a.type
            ? ((this.originalEvent = a),
              (this.type = a.type),
              (this.isDefaultPrevented =
                a.defaultPrevented ||
                (void 0 === a.defaultPrevented &&
                  (a.returnValue === !1 ||
                    (a.getPreventDefault && a.getPreventDefault())))
                  ? bb
                  : cb))
            : (this.type = a),
          b && n.extend(this, b),
          (this.timeStamp = (a && a.timeStamp) || n.now()),
          void (this[n.expando] = !0))
        : new n.Event(a, b);
    }),
    (n.Event.prototype = {
      isDefaultPrevented: cb,
      isPropagationStopped: cb,
      isImmediatePropagationStopped: cb,
      preventDefault: function () {
        var a = this.originalEvent;
        (this.isDefaultPrevented = bb),
          a && (a.preventDefault ? a.preventDefault() : (a.returnValue = !1));
      },
      stopPropagation: function () {
        var a = this.originalEvent;
        (this.isPropagationStopped = bb),
          a &&
            (a.stopPropagation && a.stopPropagation(), (a.cancelBubble = !0));
      },
      stopImmediatePropagation: function () {
        (this.isImmediatePropagationStopped = bb), this.stopPropagation();
      },
    }),
    n.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
      },
      function (a, b) {
        n.event.special[a] = {
          delegateType: b,
          bindType: b,
          handle: function (a) {
            var c,
              d = this,
              e = a.relatedTarget,
              f = a.handleObj;
            return (
              (!e || (e !== d && !n.contains(d, e))) &&
                ((a.type = f.origType),
                (c = f.handler.apply(this, arguments)),
                (a.type = b)),
              c
            );
          },
        };
      }
    ),
    l.submitBubbles ||
      (n.event.special.submit = {
        setup: function () {
          return n.nodeName(this, "form")
            ? !1
            : void n.event.add(
                this,
                "click._submit keypress._submit",
                function (a) {
                  var b = a.target,
                    c =
                      n.nodeName(b, "input") || n.nodeName(b, "button")
                        ? b.form
                        : void 0;
                  c &&
                    !n._data(c, "submitBubbles") &&
                    (n.event.add(c, "submit._submit", function (a) {
                      a._submit_bubble = !0;
                    }),
                    n._data(c, "submitBubbles", !0));
                }
              );
        },
        postDispatch: function (a) {
          a._submit_bubble &&
            (delete a._submit_bubble,
            this.parentNode &&
              !a.isTrigger &&
              n.event.simulate("submit", this.parentNode, a, !0));
        },
        teardown: function () {
          return n.nodeName(this, "form")
            ? !1
            : void n.event.remove(this, "._submit");
        },
      }),
    l.changeBubbles ||
      (n.event.special.change = {
        setup: function () {
          return Y.test(this.nodeName)
            ? (("checkbox" === this.type || "radio" === this.type) &&
                (n.event.add(this, "propertychange._change", function (a) {
                  "checked" === a.originalEvent.propertyName &&
                    (this._just_changed = !0);
                }),
                n.event.add(this, "click._change", function (a) {
                  this._just_changed &&
                    !a.isTrigger &&
                    (this._just_changed = !1),
                    n.event.simulate("change", this, a, !0);
                })),
              !1)
            : void n.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                Y.test(b.nodeName) &&
                  !n._data(b, "changeBubbles") &&
                  (n.event.add(b, "change._change", function (a) {
                    !this.parentNode ||
                      a.isSimulated ||
                      a.isTrigger ||
                      n.event.simulate("change", this.parentNode, a, !0);
                  }),
                  n._data(b, "changeBubbles", !0));
              });
        },
        handle: function (a) {
          var b = a.target;
          return this !== b ||
            a.isSimulated ||
            a.isTrigger ||
            ("radio" !== b.type && "checkbox" !== b.type)
            ? a.handleObj.handler.apply(this, arguments)
            : void 0;
        },
        teardown: function () {
          return n.event.remove(this, "._change"), !Y.test(this.nodeName);
        },
      }),
    l.focusinBubbles ||
      n.each(
        {
          focus: "focusin",
          blur: "focusout",
        },
        function (a, b) {
          var c = function (a) {
            n.event.simulate(b, a.target, n.event.fix(a), !0);
          };
          n.event.special[b] = {
            setup: function () {
              var d = this.ownerDocument || this,
                e = n._data(d, b);
              e || d.addEventListener(a, c, !0), n._data(d, b, (e || 0) + 1);
            },
            teardown: function () {
              var d = this.ownerDocument || this,
                e = n._data(d, b) - 1;
              e
                ? n._data(d, b, e)
                : (d.removeEventListener(a, c, !0), n._removeData(d, b));
            },
          };
        }
      ),
    n.fn.extend({
      on: function (a, b, c, d, e) {
        var f, g;
        if ("object" == typeof a) {
          "string" != typeof b && ((c = c || b), (b = void 0));
          for (f in a) this.on(f, b, c, a[f], e);
          return this;
        }
        if (
          (null == c && null == d
            ? ((d = b), (c = b = void 0))
            : null == d &&
              ("string" == typeof b
                ? ((d = c), (c = void 0))
                : ((d = c), (c = b), (b = void 0))),
          d === !1)
        )
          d = cb;
        else if (!d) return this;
        return (
          1 === e &&
            ((g = d),
            (d = function (a) {
              return n().off(a), g.apply(this, arguments);
            }),
            (d.guid = g.guid || (g.guid = n.guid++))),
          this.each(function () {
            n.event.add(this, a, d, c, b);
          })
        );
      },
      one: function (a, b, c, d) {
        return this.on(a, b, c, d, 1);
      },
      off: function (a, b, c) {
        var d, e;
        if (a && a.preventDefault && a.handleObj)
          return (
            (d = a.handleObj),
            n(a.delegateTarget).off(
              d.namespace ? d.origType + "." + d.namespace : d.origType,
              d.selector,
              d.handler
            ),
            this
          );
        if ("object" == typeof a) {
          for (e in a) this.off(e, b, a[e]);
          return this;
        }
        return (
          (b === !1 || "function" == typeof b) && ((c = b), (b = void 0)),
          c === !1 && (c = cb),
          this.each(function () {
            n.event.remove(this, a, c, b);
          })
        );
      },
      trigger: function (a, b) {
        return this.each(function () {
          n.event.trigger(a, b, this);
        });
      },
      triggerHandler: function (a, b) {
        var c = this[0];
        return c ? n.event.trigger(a, b, c, !0) : void 0;
      },
    });
  function eb(a) {
    var b = fb.split("|"),
      c = a.createDocumentFragment();
    if (c.createElement) while (b.length) c.createElement(b.pop());
    return c;
  }
  var fb =
      "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    gb = / jQuery\d+="(?:null|\d+)"/g,
    hb = new RegExp("<(?:" + fb + ")[\\s/>]", "i"),
    ib = /^\s+/,
    jb =
      /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    kb = /<([\w:]+)/,
    lb = /<tbody/i,
    mb = /<|&#?\w+;/,
    nb = /<(?:script|style|link)/i,
    ob = /checked\s*(?:[^=]|=\s*.checked.)/i,
    pb = /^$|\/(?:java|ecma)script/i,
    qb = /^true\/(.*)/,
    rb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    sb = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: l.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
    },
    tb = eb(z),
    ub = tb.appendChild(z.createElement("div"));
  (sb.optgroup = sb.option),
    (sb.tbody = sb.tfoot = sb.colgroup = sb.caption = sb.thead),
    (sb.th = sb.td);
  function vb(a, b) {
    var c,
      d,
      e = 0,
      f =
        typeof a.getElementsByTagName !== L
          ? a.getElementsByTagName(b || "*")
          : typeof a.querySelectorAll !== L
          ? a.querySelectorAll(b || "*")
          : void 0;
    if (!f)
      for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)
        !b || n.nodeName(d, b) ? f.push(d) : n.merge(f, vb(d, b));
    return void 0 === b || (b && n.nodeName(a, b)) ? n.merge([a], f) : f;
  }
  function wb(a) {
    X.test(a.type) && (a.defaultChecked = a.checked);
  }
  function xb(a, b) {
    return n.nodeName(a, "table") &&
      n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr")
      ? a.getElementsByTagName("tbody")[0] ||
          a.appendChild(a.ownerDocument.createElement("tbody"))
      : a;
  }
  function yb(a) {
    return (a.type = (null !== n.find.attr(a, "type")) + "/" + a.type), a;
  }
  function zb(a) {
    var b = qb.exec(a.type);
    return b ? (a.type = b[1]) : a.removeAttribute("type"), a;
  }
  function Ab(a, b) {
    for (var c, d = 0; null != (c = a[d]); d++)
      n._data(c, "globalEval", !b || n._data(b[d], "globalEval"));
  }
  function Bb(a, b) {
    if (1 === b.nodeType && n.hasData(a)) {
      var c,
        d,
        e,
        f = n._data(a),
        g = n._data(b, f),
        h = f.events;
      if (h) {
        delete g.handle, (g.events = {});
        for (c in h)
          for (d = 0, e = h[c].length; e > d; d++) n.event.add(b, c, h[c][d]);
      }
      g.data && (g.data = n.extend({}, g.data));
    }
  }
  function Cb(a, b) {
    var c, d, e;
    if (1 === b.nodeType) {
      if (((c = b.nodeName.toLowerCase()), !l.noCloneEvent && b[n.expando])) {
        e = n._data(b);
        for (d in e.events) n.removeEvent(b, d, e.handle);
        b.removeAttribute(n.expando);
      }
      "script" === c && b.text !== a.text
        ? ((yb(b).text = a.text), zb(b))
        : "object" === c
        ? (b.parentNode && (b.outerHTML = a.outerHTML),
          l.html5Clone &&
            a.innerHTML &&
            !n.trim(b.innerHTML) &&
            (b.innerHTML = a.innerHTML))
        : "input" === c && X.test(a.type)
        ? ((b.defaultChecked = b.checked = a.checked),
          b.value !== a.value && (b.value = a.value))
        : "option" === c
        ? (b.defaultSelected = b.selected = a.defaultSelected)
        : ("input" === c || "textarea" === c) &&
          (b.defaultValue = a.defaultValue);
    }
  }
  n.extend({
    clone: function (a, b, c) {
      var d,
        e,
        f,
        g,
        h,
        i = n.contains(a.ownerDocument, a);
      if (
        (l.html5Clone || n.isXMLDoc(a) || !hb.test("<" + a.nodeName + ">")
          ? (f = a.cloneNode(!0))
          : ((ub.innerHTML = a.outerHTML), ub.removeChild((f = ub.firstChild))),
        !(
          (l.noCloneEvent && l.noCloneChecked) ||
          (1 !== a.nodeType && 11 !== a.nodeType) ||
          n.isXMLDoc(a)
        ))
      )
        for (d = vb(f), h = vb(a), g = 0; null != (e = h[g]); ++g)
          d[g] && Cb(e, d[g]);
      if (b)
        if (c)
          for (h = h || vb(a), d = d || vb(f), g = 0; null != (e = h[g]); g++)
            Bb(e, d[g]);
        else Bb(a, f);
      return (
        (d = vb(f, "script")),
        d.length > 0 && Ab(d, !i && vb(a, "script")),
        (d = h = e = null),
        f
      );
    },
    buildFragment: function (a, b, c, d) {
      for (
        var e, f, g, h, i, j, k, m = a.length, o = eb(b), p = [], q = 0;
        m > q;
        q++
      )
        if (((f = a[q]), f || 0 === f))
          if ("object" === n.type(f)) n.merge(p, f.nodeType ? [f] : f);
          else if (mb.test(f)) {
            (h = h || o.appendChild(b.createElement("div"))),
              (i = (kb.exec(f) || ["", ""])[1].toLowerCase()),
              (k = sb[i] || sb._default),
              (h.innerHTML = k[1] + f.replace(jb, "<$1></$2>") + k[2]),
              (e = k[0]);
            while (e--) h = h.lastChild;
            if (
              (!l.leadingWhitespace &&
                ib.test(f) &&
                p.push(b.createTextNode(ib.exec(f)[0])),
              !l.tbody)
            ) {
              (f =
                "table" !== i || lb.test(f)
                  ? "<table>" !== k[1] || lb.test(f)
                    ? 0
                    : h
                  : h.firstChild),
                (e = f && f.childNodes.length);
              while (e--)
                n.nodeName((j = f.childNodes[e]), "tbody") &&
                  !j.childNodes.length &&
                  f.removeChild(j);
            }
            n.merge(p, h.childNodes), (h.textContent = "");
            while (h.firstChild) h.removeChild(h.firstChild);
            h = o.lastChild;
          } else p.push(b.createTextNode(f));
      h && o.removeChild(h),
        l.appendChecked || n.grep(vb(p, "input"), wb),
        (q = 0);
      while ((f = p[q++]))
        if (
          (!d || -1 === n.inArray(f, d)) &&
          ((g = n.contains(f.ownerDocument, f)),
          (h = vb(o.appendChild(f), "script")),
          g && Ab(h),
          c)
        ) {
          e = 0;
          while ((f = h[e++])) pb.test(f.type || "") && c.push(f);
        }
      return (h = null), o;
    },
    cleanData: function (a, b) {
      for (
        var d,
          e,
          f,
          g,
          h = 0,
          i = n.expando,
          j = n.cache,
          k = l.deleteExpando,
          m = n.event.special;
        null != (d = a[h]);
        h++
      )
        if ((b || n.acceptData(d)) && ((f = d[i]), (g = f && j[f]))) {
          if (g.events)
            for (e in g.events)
              m[e] ? n.event.remove(d, e) : n.removeEvent(d, e, g.handle);
          j[f] &&
            (delete j[f],
            k
              ? delete d[i]
              : typeof d.removeAttribute !== L
              ? d.removeAttribute(i)
              : (d[i] = null),
            c.push(f));
        }
    },
  }),
    n.fn.extend({
      text: function (a) {
        return W(
          this,
          function (a) {
            return void 0 === a
              ? n.text(this)
              : this.empty().append(
                  ((this[0] && this[0].ownerDocument) || z).createTextNode(a)
                );
          },
          null,
          a,
          arguments.length
        );
      },
      append: function () {
        return this.domManip(arguments, function (a) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var b = xb(this, a);
            b.appendChild(a);
          }
        });
      },
      prepend: function () {
        return this.domManip(arguments, function (a) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var b = xb(this, a);
            b.insertBefore(a, b.firstChild);
          }
        });
      },
      before: function () {
        return this.domManip(arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this);
        });
      },
      after: function () {
        return this.domManip(arguments, function (a) {
          this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
        });
      },
      remove: function (a, b) {
        for (
          var c, d = a ? n.filter(a, this) : this, e = 0;
          null != (c = d[e]);
          e++
        )
          b || 1 !== c.nodeType || n.cleanData(vb(c)),
            c.parentNode &&
              (b && n.contains(c.ownerDocument, c) && Ab(vb(c, "script")),
              c.parentNode.removeChild(c));
        return this;
      },
      empty: function () {
        for (var a, b = 0; null != (a = this[b]); b++) {
          1 === a.nodeType && n.cleanData(vb(a, !1));
          while (a.firstChild) a.removeChild(a.firstChild);
          a.options && n.nodeName(a, "select") && (a.options.length = 0);
        }
        return this;
      },
      clone: function (a, b) {
        return (
          (a = null == a ? !1 : a),
          (b = null == b ? a : b),
          this.map(function () {
            return n.clone(this, a, b);
          })
        );
      },
      html: function (a) {
        return W(
          this,
          function (a) {
            var b = this[0] || {},
              c = 0,
              d = this.length;
            if (void 0 === a)
              return 1 === b.nodeType ? b.innerHTML.replace(gb, "") : void 0;
            if (
              !(
                "string" != typeof a ||
                nb.test(a) ||
                (!l.htmlSerialize && hb.test(a)) ||
                (!l.leadingWhitespace && ib.test(a)) ||
                sb[(kb.exec(a) || ["", ""])[1].toLowerCase()]
              )
            ) {
              a = a.replace(jb, "<$1></$2>");
              try {
                for (; d > c; c++)
                  (b = this[c] || {}),
                    1 === b.nodeType &&
                      (n.cleanData(vb(b, !1)), (b.innerHTML = a));
                b = 0;
              } catch (e) {}
            }
            b && this.empty().append(a);
          },
          null,
          a,
          arguments.length
        );
      },
      replaceWith: function () {
        var a = arguments[0];
        return (
          this.domManip(arguments, function (b) {
            (a = this.parentNode),
              n.cleanData(vb(this)),
              a && a.replaceChild(b, this);
          }),
          a && (a.length || a.nodeType) ? this : this.remove()
        );
      },
      detach: function (a) {
        return this.remove(a, !0);
      },
      domManip: function (a, b) {
        a = e.apply([], a);
        var c,
          d,
          f,
          g,
          h,
          i,
          j = 0,
          k = this.length,
          m = this,
          o = k - 1,
          p = a[0],
          q = n.isFunction(p);
        if (q || (k > 1 && "string" == typeof p && !l.checkClone && ob.test(p)))
          return this.each(function (c) {
            var d = m.eq(c);
            q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b);
          });
        if (
          k &&
          ((i = n.buildFragment(a, this[0].ownerDocument, !1, this)),
          (c = i.firstChild),
          1 === i.childNodes.length && (i = c),
          c)
        ) {
          for (g = n.map(vb(i, "script"), yb), f = g.length; k > j; j++)
            (d = i),
              j !== o &&
                ((d = n.clone(d, !0, !0)), f && n.merge(g, vb(d, "script"))),
              b.call(this[j], d, j);
          if (f)
            for (
              h = g[g.length - 1].ownerDocument, n.map(g, zb), j = 0;
              f > j;
              j++
            )
              (d = g[j]),
                pb.test(d.type || "") &&
                  !n._data(d, "globalEval") &&
                  n.contains(h, d) &&
                  (d.src
                    ? n._evalUrl && n._evalUrl(d.src)
                    : n.globalEval(
                        (d.text || d.textContent || d.innerHTML || "").replace(
                          rb,
                          ""
                        )
                      ));
          i = c = null;
        }
        return this;
      },
    }),
    n.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (a, b) {
        n.fn[a] = function (a) {
          for (var c, d = 0, e = [], g = n(a), h = g.length - 1; h >= d; d++)
            (c = d === h ? this : this.clone(!0)),
              n(g[d])[b](c),
              f.apply(e, c.get());
          return this.pushStack(e);
        };
      }
    );
  var Db,
    Eb = {};
  function Fb(b, c) {
    var d = n(c.createElement(b)).appendTo(c.body),
      e = a.getDefaultComputedStyle
        ? a.getDefaultComputedStyle(d[0]).display
        : n.css(d[0], "display");
    return d.detach(), e;
  }
  function Gb(a) {
    var b = z,
      c = Eb[a];
    return (
      c ||
        ((c = Fb(a, b)),
        ("none" !== c && c) ||
          ((Db = (
            Db || n("<iframe frameborder='0' width='0' height='0'/>")
          ).appendTo(b.documentElement)),
          (b = (Db[0].contentWindow || Db[0].contentDocument).document),
          b.write(),
          b.close(),
          (c = Fb(a, b)),
          Db.detach()),
        (Eb[a] = c)),
      c
    );
  }
  !(function () {
    var a,
      b,
      c = z.createElement("div"),
      d =
        "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
    (c.innerHTML =
      "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
      (a = c.getElementsByTagName("a")[0]),
      (a.style.cssText = "float:left;opacity:.5"),
      (l.opacity = /^0.5/.test(a.style.opacity)),
      (l.cssFloat = !!a.style.cssFloat),
      (c.style.backgroundClip = "content-box"),
      (c.cloneNode(!0).style.backgroundClip = ""),
      (l.clearCloneStyle = "content-box" === c.style.backgroundClip),
      (a = c = null),
      (l.shrinkWrapBlocks = function () {
        var a, c, e, f;
        if (null == b) {
          if (((a = z.getElementsByTagName("body")[0]), !a)) return;
          (f =
            "border:0;width:0;height:0;position:absolute;top:0;left:-9999px"),
            (c = z.createElement("div")),
            (e = z.createElement("div")),
            a.appendChild(c).appendChild(e),
            (b = !1),
            typeof e.style.zoom !== L &&
              ((e.style.cssText = d + ";width:1px;padding:1px;zoom:1"),
              (e.innerHTML = "<div></div>"),
              (e.firstChild.style.width = "5px"),
              (b = 3 !== e.offsetWidth)),
            a.removeChild(c),
            (a = c = e = null);
        }
        return b;
      });
  })();
  var Hb = /^margin/,
    Ib = new RegExp("^(" + T + ")(?!px)[a-z%]+$", "i"),
    Jb,
    Kb,
    Lb = /^(top|right|bottom|left)$/;
  a.getComputedStyle
    ? ((Jb = function (a) {
        return a.ownerDocument.defaultView.getComputedStyle(a, null);
      }),
      (Kb = function (a, b, c) {
        var d,
          e,
          f,
          g,
          h = a.style;
        return (
          (c = c || Jb(a)),
          (g = c ? c.getPropertyValue(b) || c[b] : void 0),
          c &&
            ("" !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)),
            Ib.test(g) &&
              Hb.test(b) &&
              ((d = h.width),
              (e = h.minWidth),
              (f = h.maxWidth),
              (h.minWidth = h.maxWidth = h.width = g),
              (g = c.width),
              (h.width = d),
              (h.minWidth = e),
              (h.maxWidth = f))),
          void 0 === g ? g : g + ""
        );
      }))
    : z.documentElement.currentStyle &&
      ((Jb = function (a) {
        return a.currentStyle;
      }),
      (Kb = function (a, b, c) {
        var d,
          e,
          f,
          g,
          h = a.style;
        return (
          (c = c || Jb(a)),
          (g = c ? c[b] : void 0),
          null == g && h && h[b] && (g = h[b]),
          Ib.test(g) &&
            !Lb.test(b) &&
            ((d = h.left),
            (e = a.runtimeStyle),
            (f = e && e.left),
            f && (e.left = a.currentStyle.left),
            (h.left = "fontSize" === b ? "1em" : g),
            (g = h.pixelLeft + "px"),
            (h.left = d),
            f && (e.left = f)),
          void 0 === g ? g : g + "" || "auto"
        );
      }));
  function Mb(a, b) {
    return {
      get: function () {
        var c = a();
        if (null != c)
          return c
            ? void delete this.get
            : (this.get = b).apply(this, arguments);
      },
    };
  }
  !(function () {
    var b,
      c,
      d,
      e,
      f,
      g,
      h = z.createElement("div"),
      i = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
      j =
        "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
    (h.innerHTML =
      "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
      (b = h.getElementsByTagName("a")[0]),
      (b.style.cssText = "float:left;opacity:.5"),
      (l.opacity = /^0.5/.test(b.style.opacity)),
      (l.cssFloat = !!b.style.cssFloat),
      (h.style.backgroundClip = "content-box"),
      (h.cloneNode(!0).style.backgroundClip = ""),
      (l.clearCloneStyle = "content-box" === h.style.backgroundClip),
      (b = h = null),
      n.extend(l, {
        reliableHiddenOffsets: function () {
          if (null != c) return c;
          var a,
            b,
            d,
            e = z.createElement("div"),
            f = z.getElementsByTagName("body")[0];
          if (f)
            return (
              e.setAttribute("className", "t"),
              (e.innerHTML =
                "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
              (a = z.createElement("div")),
              (a.style.cssText = i),
              f.appendChild(a).appendChild(e),
              (e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
              (b = e.getElementsByTagName("td")),
              (b[0].style.cssText = "padding:0;margin:0;border:0;display:none"),
              (d = 0 === b[0].offsetHeight),
              (b[0].style.display = ""),
              (b[1].style.display = "none"),
              (c = d && 0 === b[0].offsetHeight),
              f.removeChild(a),
              (e = f = null),
              c
            );
        },
        boxSizing: function () {
          return null == d && k(), d;
        },
        boxSizingReliable: function () {
          return null == e && k(), e;
        },
        pixelPosition: function () {
          return null == f && k(), f;
        },
        reliableMarginRight: function () {
          var b, c, d, e;
          if (null == g && a.getComputedStyle) {
            if (((b = z.getElementsByTagName("body")[0]), !b)) return;
            (c = z.createElement("div")),
              (d = z.createElement("div")),
              (c.style.cssText = i),
              b.appendChild(c).appendChild(d),
              (e = d.appendChild(z.createElement("div"))),
              (e.style.cssText = d.style.cssText = j),
              (e.style.marginRight = e.style.width = "0"),
              (d.style.width = "1px"),
              (g = !parseFloat(
                (a.getComputedStyle(e, null) || {}).marginRight
              )),
              b.removeChild(c);
          }
          return g;
        },
      });
    function k() {
      var b,
        c,
        h = z.getElementsByTagName("body")[0];
      h &&
        ((b = z.createElement("div")),
        (c = z.createElement("div")),
        (b.style.cssText = i),
        h.appendChild(b).appendChild(c),
        (c.style.cssText =
          "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%"),
        n.swap(
          h,
          null != h.style.zoom
            ? {
                zoom: 1,
              }
            : {},
          function () {
            d = 4 === c.offsetWidth;
          }
        ),
        (e = !0),
        (f = !1),
        (g = !0),
        a.getComputedStyle &&
          ((f = "1%" !== (a.getComputedStyle(c, null) || {}).top),
          (e =
            "4px" ===
            (
              a.getComputedStyle(c, null) || {
                width: "4px",
              }
            ).width)),
        h.removeChild(b),
        (c = h = null));
    }
  })(),
    (n.swap = function (a, b, c, d) {
      var e,
        f,
        g = {};
      for (f in b) (g[f] = a.style[f]), (a.style[f] = b[f]);
      e = c.apply(a, d || []);
      for (f in b) a.style[f] = g[f];
      return e;
    });
  var Nb = /alpha\([^)]*\)/i,
    Ob = /opacity\s*=\s*([^)]*)/,
    Pb = /^(none|table(?!-c[ea]).+)/,
    Qb = new RegExp("^(" + T + ")(.*)$", "i"),
    Rb = new RegExp("^([+-])=(" + T + ")", "i"),
    Sb = {
      position: "absolute",
      visibility: "hidden",
      display: "block",
    },
    Tb = {
      letterSpacing: 0,
      fontWeight: 400,
    },
    Ub = ["Webkit", "O", "Moz", "ms"];
  function Vb(a, b) {
    if (b in a) return b;
    var c = b.charAt(0).toUpperCase() + b.slice(1),
      d = b,
      e = Ub.length;
    while (e--) if (((b = Ub[e] + c), b in a)) return b;
    return d;
  }
  function Wb(a, b) {
    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
      (d = a[g]),
        d.style &&
          ((f[g] = n._data(d, "olddisplay")),
          (c = d.style.display),
          b
            ? (f[g] || "none" !== c || (d.style.display = ""),
              "" === d.style.display &&
                V(d) &&
                (f[g] = n._data(d, "olddisplay", Gb(d.nodeName))))
            : f[g] ||
              ((e = V(d)),
              ((c && "none" !== c) || !e) &&
                n._data(d, "olddisplay", e ? c : n.css(d, "display"))));
    for (g = 0; h > g; g++)
      (d = a[g]),
        d.style &&
          ((b && "none" !== d.style.display && "" !== d.style.display) ||
            (d.style.display = b ? f[g] || "" : "none"));
    return a;
  }
  function Xb(a, b, c) {
    var d = Qb.exec(b);
    return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
  }
  function Yb(a, b, c, d, e) {
    for (
      var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0,
        g = 0;
      4 > f;
      f += 2
    )
      "margin" === c && (g += n.css(a, c + U[f], !0, e)),
        d
          ? ("content" === c && (g -= n.css(a, "padding" + U[f], !0, e)),
            "margin" !== c && (g -= n.css(a, "border" + U[f] + "Width", !0, e)))
          : ((g += n.css(a, "padding" + U[f], !0, e)),
            "padding" !== c &&
              (g += n.css(a, "border" + U[f] + "Width", !0, e)));
    return g;
  }
  function Zb(a, b, c) {
    var d = !0,
      e = "width" === b ? a.offsetWidth : a.offsetHeight,
      f = Jb(a),
      g = l.boxSizing() && "border-box" === n.css(a, "boxSizing", !1, f);
    if (0 >= e || null == e) {
      if (
        ((e = Kb(a, b, f)),
        (0 > e || null == e) && (e = a.style[b]),
        Ib.test(e))
      )
        return e;
      (d = g && (l.boxSizingReliable() || e === a.style[b])),
        (e = parseFloat(e) || 0);
    }
    return e + Yb(a, b, c || (g ? "border" : "content"), d, f) + "px";
  }
  n.extend({
    cssHooks: {
      opacity: {
        get: function (a, b) {
          if (b) {
            var c = Kb(a, "opacity");
            return "" === c ? "1" : c;
          }
        },
      },
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: {
      float: l.cssFloat ? "cssFloat" : "styleFloat",
    },
    style: function (a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e,
          f,
          g,
          h = n.camelCase(b),
          i = a.style;
        if (
          ((b = n.cssProps[h] || (n.cssProps[h] = Vb(i, h))),
          (g = n.cssHooks[b] || n.cssHooks[h]),
          void 0 === c)
        )
          return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
        if (
          ((f = typeof c),
          "string" === f &&
            (e = Rb.exec(c)) &&
            ((c = (e[1] + 1) * e[2] + parseFloat(n.css(a, b))), (f = "number")),
          null != c &&
            c === c &&
            ("number" !== f || n.cssNumber[h] || (c += "px"),
            l.clearCloneStyle ||
              "" !== c ||
              0 !== b.indexOf("background") ||
              (i[b] = "inherit"),
            !(g && "set" in g && void 0 === (c = g.set(a, c, d)))))
        )
          try {
            (i[b] = ""), (i[b] = c);
          } catch (j) {}
      }
    },
    css: function (a, b, c, d) {
      var e,
        f,
        g,
        h = n.camelCase(b);
      return (
        (b = n.cssProps[h] || (n.cssProps[h] = Vb(a.style, h))),
        (g = n.cssHooks[b] || n.cssHooks[h]),
        g && "get" in g && (f = g.get(a, !0, c)),
        void 0 === f && (f = Kb(a, b, d)),
        "normal" === f && b in Tb && (f = Tb[b]),
        "" === c || c
          ? ((e = parseFloat(f)), c === !0 || n.isNumeric(e) ? e || 0 : f)
          : f
      );
    },
  }),
    n.each(["height", "width"], function (a, b) {
      n.cssHooks[b] = {
        get: function (a, c, d) {
          return c
            ? 0 === a.offsetWidth && Pb.test(n.css(a, "display"))
              ? n.swap(a, Sb, function () {
                  return Zb(a, b, d);
                })
              : Zb(a, b, d)
            : void 0;
        },
        set: function (a, c, d) {
          var e = d && Jb(a);
          return Xb(
            a,
            c,
            d
              ? Yb(
                  a,
                  b,
                  d,
                  l.boxSizing() &&
                    "border-box" === n.css(a, "boxSizing", !1, e),
                  e
                )
              : 0
          );
        },
      };
    }),
    l.opacity ||
      (n.cssHooks.opacity = {
        get: function (a, b) {
          return Ob.test(
            (b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || ""
          )
            ? 0.01 * parseFloat(RegExp.$1) + ""
            : b
            ? "1"
            : "";
        },
        set: function (a, b) {
          var c = a.style,
            d = a.currentStyle,
            e = n.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
            f = (d && d.filter) || c.filter || "";
          (c.zoom = 1),
            ((b >= 1 || "" === b) &&
              "" === n.trim(f.replace(Nb, "")) &&
              c.removeAttribute &&
              (c.removeAttribute("filter"), "" === b || (d && !d.filter))) ||
              (c.filter = Nb.test(f) ? f.replace(Nb, e) : f + " " + e);
        },
      }),
    (n.cssHooks.marginRight = Mb(l.reliableMarginRight, function (a, b) {
      return b
        ? n.swap(
            a,
            {
              display: "inline-block",
            },
            Kb,
            [a, "marginRight"]
          )
        : void 0;
    })),
    n.each(
      {
        margin: "",
        padding: "",
        border: "Width",
      },
      function (a, b) {
        (n.cssHooks[a + b] = {
          expand: function (c) {
            for (
              var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c];
              4 > d;
              d++
            )
              e[a + U[d] + b] = f[d] || f[d - 2] || f[0];
            return e;
          },
        }),
          Hb.test(a) || (n.cssHooks[a + b].set = Xb);
      }
    ),
    n.fn.extend({
      css: function (a, b) {
        return W(
          this,
          function (a, b, c) {
            var d,
              e,
              f = {},
              g = 0;
            if (n.isArray(b)) {
              for (d = Jb(a), e = b.length; e > g; g++)
                f[b[g]] = n.css(a, b[g], !1, d);
              return f;
            }
            return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
          },
          a,
          b,
          arguments.length > 1
        );
      },
      show: function () {
        return Wb(this, !0);
      },
      hide: function () {
        return Wb(this);
      },
      toggle: function (a) {
        return "boolean" == typeof a
          ? a
            ? this.show()
            : this.hide()
          : this.each(function () {
              V(this) ? n(this).show() : n(this).hide();
            });
      },
    });
  function $b(a, b, c, d, e) {
    return new $b.prototype.init(a, b, c, d, e);
  }
  (n.Tween = $b),
    ($b.prototype = {
      constructor: $b,
      init: function (a, b, c, d, e, f) {
        (this.elem = a),
          (this.prop = c),
          (this.easing = e || "swing"),
          (this.options = b),
          (this.start = this.now = this.cur()),
          (this.end = d),
          (this.unit = f || (n.cssNumber[c] ? "" : "px"));
      },
      cur: function () {
        var a = $b.propHooks[this.prop];
        return a && a.get ? a.get(this) : $b.propHooks._default.get(this);
      },
      run: function (a) {
        var b,
          c = $b.propHooks[this.prop];
        return (
          (this.pos = b =
            this.options.duration
              ? n.easing[this.easing](
                  a,
                  this.options.duration * a,
                  0,
                  1,
                  this.options.duration
                )
              : a),
          (this.now = (this.end - this.start) * b + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          c && c.set ? c.set(this) : $b.propHooks._default.set(this),
          this
        );
      },
    }),
    ($b.prototype.init.prototype = $b.prototype),
    ($b.propHooks = {
      _default: {
        get: function (a) {
          var b;
          return null == a.elem[a.prop] ||
            (a.elem.style && null != a.elem.style[a.prop])
            ? ((b = n.css(a.elem, a.prop, "")), b && "auto" !== b ? b : 0)
            : a.elem[a.prop];
        },
        set: function (a) {
          n.fx.step[a.prop]
            ? n.fx.step[a.prop](a)
            : a.elem.style &&
              (null != a.elem.style[n.cssProps[a.prop]] || n.cssHooks[a.prop])
            ? n.style(a.elem, a.prop, a.now + a.unit)
            : (a.elem[a.prop] = a.now);
        },
      },
    }),
    ($b.propHooks.scrollTop = $b.propHooks.scrollLeft =
      {
        set: function (a) {
          a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
        },
      }),
    (n.easing = {
      linear: function (a) {
        return a;
      },
      swing: function (a) {
        return 0.5 - Math.cos(a * Math.PI) / 2;
      },
    }),
    (n.fx = $b.prototype.init),
    (n.fx.step = {});
  var _b,
    ac,
    bc = /^(?:toggle|show|hide)$/,
    cc = new RegExp("^(?:([+-])=|)(" + T + ")([a-z%]*)$", "i"),
    dc = /queueHooks$/,
    ec = [jc],
    fc = {
      "*": [
        function (a, b) {
          var c = this.createTween(a, b),
            d = c.cur(),
            e = cc.exec(b),
            f = (e && e[3]) || (n.cssNumber[a] ? "" : "px"),
            g =
              (n.cssNumber[a] || ("px" !== f && +d)) &&
              cc.exec(n.css(c.elem, a)),
            h = 1,
            i = 20;
          if (g && g[3] !== f) {
            (f = f || g[3]), (e = e || []), (g = +d || 1);
            do (h = h || ".5"), (g /= h), n.style(c.elem, a, g + f);
            while (h !== (h = c.cur() / d) && 1 !== h && --i);
          }
          return (
            e &&
              ((g = c.start = +g || +d || 0),
              (c.unit = f),
              (c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2])),
            c
          );
        },
      ],
    };
  function gc() {
    return (
      setTimeout(function () {
        _b = void 0;
      }),
      (_b = n.now())
    );
  }
  function hc(a, b) {
    var c,
      d = {
        height: a,
      },
      e = 0;
    for (b = b ? 1 : 0; 4 > e; e += 2 - b)
      (c = U[e]), (d["margin" + c] = d["padding" + c] = a);
    return b && (d.opacity = d.width = a), d;
  }
  function ic(a, b, c) {
    for (
      var d, e = (fc[b] || []).concat(fc["*"]), f = 0, g = e.length;
      g > f;
      f++
    )
      if ((d = e[f].call(c, b, a))) return d;
  }
  function jc(a, b, c) {
    var d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      m = this,
      o = {},
      p = a.style,
      q = a.nodeType && V(a),
      r = n._data(a, "fxshow");
    c.queue ||
      ((h = n._queueHooks(a, "fx")),
      null == h.unqueued &&
        ((h.unqueued = 0),
        (i = h.empty.fire),
        (h.empty.fire = function () {
          h.unqueued || i();
        })),
      h.unqueued++,
      m.always(function () {
        m.always(function () {
          h.unqueued--, n.queue(a, "fx").length || h.empty.fire();
        });
      })),
      1 === a.nodeType &&
        ("height" in b || "width" in b) &&
        ((c.overflow = [p.overflow, p.overflowX, p.overflowY]),
        (j = n.css(a, "display")),
        (k = Gb(a.nodeName)),
        "none" === j && (j = k),
        "inline" === j &&
          "none" === n.css(a, "float") &&
          (l.inlineBlockNeedsLayout && "inline" !== k
            ? (p.zoom = 1)
            : (p.display = "inline-block"))),
      c.overflow &&
        ((p.overflow = "hidden"),
        l.shrinkWrapBlocks() ||
          m.always(function () {
            (p.overflow = c.overflow[0]),
              (p.overflowX = c.overflow[1]),
              (p.overflowY = c.overflow[2]);
          }));
    for (d in b)
      if (((e = b[d]), bc.exec(e))) {
        if (
          (delete b[d], (f = f || "toggle" === e), e === (q ? "hide" : "show"))
        ) {
          if ("show" !== e || !r || void 0 === r[d]) continue;
          q = !0;
        }
        o[d] = (r && r[d]) || n.style(a, d);
      }
    if (!n.isEmptyObject(o)) {
      r ? "hidden" in r && (q = r.hidden) : (r = n._data(a, "fxshow", {})),
        f && (r.hidden = !q),
        q
          ? n(a).show()
          : m.done(function () {
              n(a).hide();
            }),
        m.done(function () {
          var b;
          n._removeData(a, "fxshow");
          for (b in o) n.style(a, b, o[b]);
        });
      for (d in o)
        (g = ic(q ? r[d] : 0, d, m)),
          d in r ||
            ((r[d] = g.start),
            q &&
              ((g.end = g.start),
              (g.start = "width" === d || "height" === d ? 1 : 0)));
    }
  }
  function kc(a, b) {
    var c, d, e, f, g;
    for (c in a)
      if (
        ((d = n.camelCase(c)),
        (e = b[d]),
        (f = a[c]),
        n.isArray(f) && ((e = f[1]), (f = a[c] = f[0])),
        c !== d && ((a[d] = f), delete a[c]),
        (g = n.cssHooks[d]),
        g && "expand" in g)
      ) {
        (f = g.expand(f)), delete a[d];
        for (c in f) c in a || ((a[c] = f[c]), (b[c] = e));
      } else b[d] = e;
  }
  function lc(a, b, c) {
    var d,
      e,
      f = 0,
      g = ec.length,
      h = n.Deferred().always(function () {
        delete i.elem;
      }),
      i = function () {
        if (e) return !1;
        for (
          var b = _b || gc(),
            c = Math.max(0, j.startTime + j.duration - b),
            d = c / j.duration || 0,
            f = 1 - d,
            g = 0,
            i = j.tweens.length;
          i > g;
          g++
        )
          j.tweens[g].run(f);
        return (
          h.notifyWith(a, [j, f, c]),
          1 > f && i ? c : (h.resolveWith(a, [j]), !1)
        );
      },
      j = h.promise({
        elem: a,
        props: n.extend({}, b),
        opts: n.extend(
          !0,
          {
            specialEasing: {},
          },
          c
        ),
        originalProperties: b,
        originalOptions: c,
        startTime: _b || gc(),
        duration: c.duration,
        tweens: [],
        createTween: function (b, c) {
          var d = n.Tween(
            a,
            j.opts,
            b,
            c,
            j.opts.specialEasing[b] || j.opts.easing
          );
          return j.tweens.push(d), d;
        },
        stop: function (b) {
          var c = 0,
            d = b ? j.tweens.length : 0;
          if (e) return this;
          for (e = !0; d > c; c++) j.tweens[c].run(1);
          return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this;
        },
      }),
      k = j.props;
    for (kc(k, j.opts.specialEasing); g > f; f++)
      if ((d = ec[f].call(j, a, k, j.opts))) return d;
    return (
      n.map(k, ic, j),
      n.isFunction(j.opts.start) && j.opts.start.call(a, j),
      n.fx.timer(
        n.extend(i, {
          elem: a,
          anim: j,
          queue: j.opts.queue,
        })
      ),
      j
        .progress(j.opts.progress)
        .done(j.opts.done, j.opts.complete)
        .fail(j.opts.fail)
        .always(j.opts.always)
    );
  }
  (n.Animation = n.extend(lc, {
    tweener: function (a, b) {
      n.isFunction(a) ? ((b = a), (a = ["*"])) : (a = a.split(" "));
      for (var c, d = 0, e = a.length; e > d; d++)
        (c = a[d]), (fc[c] = fc[c] || []), fc[c].unshift(b);
    },
    prefilter: function (a, b) {
      b ? ec.unshift(a) : ec.push(a);
    },
  })),
    (n.speed = function (a, b, c) {
      var d =
        a && "object" == typeof a
          ? n.extend({}, a)
          : {
              complete: c || (!c && b) || (n.isFunction(a) && a),
              duration: a,
              easing: (c && b) || (b && !n.isFunction(b) && b),
            };
      return (
        (d.duration = n.fx.off
          ? 0
          : "number" == typeof d.duration
          ? d.duration
          : d.duration in n.fx.speeds
          ? n.fx.speeds[d.duration]
          : n.fx.speeds._default),
        (null == d.queue || d.queue === !0) && (d.queue = "fx"),
        (d.old = d.complete),
        (d.complete = function () {
          n.isFunction(d.old) && d.old.call(this),
            d.queue && n.dequeue(this, d.queue);
        }),
        d
      );
    }),
    n.fn.extend({
      fadeTo: function (a, b, c, d) {
        return this.filter(V).css("opacity", 0).show().end().animate(
          {
            opacity: b,
          },
          a,
          c,
          d
        );
      },
      animate: function (a, b, c, d) {
        var e = n.isEmptyObject(a),
          f = n.speed(b, c, d),
          g = function () {
            var b = lc(this, n.extend({}, a), f);
            (e || n._data(this, "finish")) && b.stop(!0);
          };
        return (
          (g.finish = g),
          e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        );
      },
      stop: function (a, b, c) {
        var d = function (a) {
          var b = a.stop;
          delete a.stop, b(c);
        };
        return (
          "string" != typeof a && ((c = b), (b = a), (a = void 0)),
          b && a !== !1 && this.queue(a || "fx", []),
          this.each(function () {
            var b = !0,
              e = null != a && a + "queueHooks",
              f = n.timers,
              g = n._data(this);
            if (e) g[e] && g[e].stop && d(g[e]);
            else for (e in g) g[e] && g[e].stop && dc.test(e) && d(g[e]);
            for (e = f.length; e--; )
              f[e].elem !== this ||
                (null != a && f[e].queue !== a) ||
                (f[e].anim.stop(c), (b = !1), f.splice(e, 1));
            (b || !c) && n.dequeue(this, a);
          })
        );
      },
      finish: function (a) {
        return (
          a !== !1 && (a = a || "fx"),
          this.each(function () {
            var b,
              c = n._data(this),
              d = c[a + "queue"],
              e = c[a + "queueHooks"],
              f = n.timers,
              g = d ? d.length : 0;
            for (
              c.finish = !0,
                n.queue(this, a, []),
                e && e.stop && e.stop.call(this, !0),
                b = f.length;
              b--;

            )
              f[b].elem === this &&
                f[b].queue === a &&
                (f[b].anim.stop(!0), f.splice(b, 1));
            for (b = 0; g > b; b++)
              d[b] && d[b].finish && d[b].finish.call(this);
            delete c.finish;
          })
        );
      },
    }),
    n.each(["toggle", "show", "hide"], function (a, b) {
      var c = n.fn[b];
      n.fn[b] = function (a, d, e) {
        return null == a || "boolean" == typeof a
          ? c.apply(this, arguments)
          : this.animate(hc(b, !0), a, d, e);
      };
    }),
    n.each(
      {
        slideDown: hc("show"),
        slideUp: hc("hide"),
        slideToggle: hc("toggle"),
        fadeIn: {
          opacity: "show",
        },
        fadeOut: {
          opacity: "hide",
        },
        fadeToggle: {
          opacity: "toggle",
        },
      },
      function (a, b) {
        n.fn[a] = function (a, c, d) {
          return this.animate(b, a, c, d);
        };
      }
    ),
    (n.timers = []),
    (n.fx.tick = function () {
      var a,
        b = n.timers,
        c = 0;
      for (_b = n.now(); c < b.length; c++)
        (a = b[c]), a() || b[c] !== a || b.splice(c--, 1);
      b.length || n.fx.stop(), (_b = void 0);
    }),
    (n.fx.timer = function (a) {
      n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
    }),
    (n.fx.interval = 13),
    (n.fx.start = function () {
      ac || (ac = setInterval(n.fx.tick, n.fx.interval));
    }),
    (n.fx.stop = function () {
      clearInterval(ac), (ac = null);
    }),
    (n.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400,
    }),
    (n.fn.delay = function (a, b) {
      return (
        (a = n.fx ? n.fx.speeds[a] || a : a),
        (b = b || "fx"),
        this.queue(b, function (b, c) {
          var d = setTimeout(b, a);
          c.stop = function () {
            clearTimeout(d);
          };
        })
      );
    }),
    (function () {
      var a,
        b,
        c,
        d,
        e = z.createElement("div");
      e.setAttribute("className", "t"),
        (e.innerHTML =
          "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
        (a = e.getElementsByTagName("a")[0]),
        (c = z.createElement("select")),
        (d = c.appendChild(z.createElement("option"))),
        (b = e.getElementsByTagName("input")[0]),
        (a.style.cssText = "top:1px"),
        (l.getSetAttribute = "t" !== e.className),
        (l.style = /top/.test(a.getAttribute("style"))),
        (l.hrefNormalized = "/a" === a.getAttribute("href")),
        (l.checkOn = !!b.value),
        (l.optSelected = d.selected),
        (l.enctype = !!z.createElement("form").enctype),
        (c.disabled = !0),
        (l.optDisabled = !d.disabled),
        (b = z.createElement("input")),
        b.setAttribute("value", ""),
        (l.input = "" === b.getAttribute("value")),
        (b.value = "t"),
        b.setAttribute("type", "radio"),
        (l.radioValue = "t" === b.value),
        (a = b = c = d = e = null);
    })();
  var mc = /\r/g;
  n.fn.extend({
    val: function (a) {
      var b,
        c,
        d,
        e = this[0];
      {
        if (arguments.length)
          return (
            (d = n.isFunction(a)),
            this.each(function (c) {
              var e;
              1 === this.nodeType &&
                ((e = d ? a.call(this, c, n(this).val()) : a),
                null == e
                  ? (e = "")
                  : "number" == typeof e
                  ? (e += "")
                  : n.isArray(e) &&
                    (e = n.map(e, function (a) {
                      return null == a ? "" : a + "";
                    })),
                (b =
                  n.valHooks[this.type] ||
                  n.valHooks[this.nodeName.toLowerCase()]),
                (b && "set" in b && void 0 !== b.set(this, e, "value")) ||
                  (this.value = e));
            })
          );
        if (e)
          return (
            (b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()]),
            b && "get" in b && void 0 !== (c = b.get(e, "value"))
              ? c
              : ((c = e.value),
                "string" == typeof c ? c.replace(mc, "") : null == c ? "" : c)
          );
      }
    },
  }),
    n.extend({
      valHooks: {
        option: {
          get: function (a) {
            var b = n.find.attr(a, "value");
            return null != b ? b : n.text(a);
          },
        },
        select: {
          get: function (a) {
            for (
              var b,
                c,
                d = a.options,
                e = a.selectedIndex,
                f = "select-one" === a.type || 0 > e,
                g = f ? null : [],
                h = f ? e + 1 : d.length,
                i = 0 > e ? h : f ? e : 0;
              h > i;
              i++
            )
              if (
                ((c = d[i]),
                !(
                  (!c.selected && i !== e) ||
                  (l.optDisabled
                    ? c.disabled
                    : null !== c.getAttribute("disabled")) ||
                  (c.parentNode.disabled &&
                    n.nodeName(c.parentNode, "optgroup"))
                ))
              ) {
                if (((b = n(c).val()), f)) return b;
                g.push(b);
              }
            return g;
          },
          set: function (a, b) {
            var c,
              d,
              e = a.options,
              f = n.makeArray(b),
              g = e.length;
            while (g--)
              if (((d = e[g]), n.inArray(n.valHooks.option.get(d), f) >= 0))
                try {
                  d.selected = c = !0;
                } catch (h) {
                  d.scrollHeight;
                }
              else d.selected = !1;
            return c || (a.selectedIndex = -1), e;
          },
        },
      },
    }),
    n.each(["radio", "checkbox"], function () {
      (n.valHooks[this] = {
        set: function (a, b) {
          return n.isArray(b)
            ? (a.checked = n.inArray(n(a).val(), b) >= 0)
            : void 0;
        },
      }),
        l.checkOn ||
          (n.valHooks[this].get = function (a) {
            return null === a.getAttribute("value") ? "on" : a.value;
          });
    });
  var nc,
    oc,
    pc = n.expr.attrHandle,
    qc = /^(?:checked|selected)$/i,
    rc = l.getSetAttribute,
    sc = l.input;
  n.fn.extend({
    attr: function (a, b) {
      return W(this, n.attr, a, b, arguments.length > 1);
    },
    removeAttr: function (a) {
      return this.each(function () {
        n.removeAttr(this, a);
      });
    },
  }),
    n.extend({
      attr: function (a, b, c) {
        var d,
          e,
          f = a.nodeType;
        if (a && 3 !== f && 8 !== f && 2 !== f)
          return typeof a.getAttribute === L
            ? n.prop(a, b, c)
            : ((1 === f && n.isXMLDoc(a)) ||
                ((b = b.toLowerCase()),
                (d = n.attrHooks[b] || (n.expr.match.bool.test(b) ? oc : nc))),
              void 0 === c
                ? d && "get" in d && null !== (e = d.get(a, b))
                  ? e
                  : ((e = n.find.attr(a, b)), null == e ? void 0 : e)
                : null !== c
                ? d && "set" in d && void 0 !== (e = d.set(a, c, b))
                  ? e
                  : (a.setAttribute(b, c + ""), c)
                : void n.removeAttr(a, b));
      },
      removeAttr: function (a, b) {
        var c,
          d,
          e = 0,
          f = b && b.match(F);
        if (f && 1 === a.nodeType)
          while ((c = f[e++]))
            (d = n.propFix[c] || c),
              n.expr.match.bool.test(c)
                ? (sc && rc) || !qc.test(c)
                  ? (a[d] = !1)
                  : (a[n.camelCase("default-" + c)] = a[d] = !1)
                : n.attr(a, c, ""),
              a.removeAttribute(rc ? c : d);
      },
      attrHooks: {
        type: {
          set: function (a, b) {
            if (!l.radioValue && "radio" === b && n.nodeName(a, "input")) {
              var c = a.value;
              return a.setAttribute("type", b), c && (a.value = c), b;
            }
          },
        },
      },
    }),
    (oc = {
      set: function (a, b, c) {
        return (
          b === !1
            ? n.removeAttr(a, c)
            : (sc && rc) || !qc.test(c)
            ? a.setAttribute((!rc && n.propFix[c]) || c, c)
            : (a[n.camelCase("default-" + c)] = a[c] = !0),
          c
        );
      },
    }),
    n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
      var c = pc[b] || n.find.attr;
      pc[b] =
        (sc && rc) || !qc.test(b)
          ? function (a, b, d) {
              var e, f;
              return (
                d ||
                  ((f = pc[b]),
                  (pc[b] = e),
                  (e = null != c(a, b, d) ? b.toLowerCase() : null),
                  (pc[b] = f)),
                e
              );
            }
          : function (a, b, c) {
              return c
                ? void 0
                : a[n.camelCase("default-" + b)]
                ? b.toLowerCase()
                : null;
            };
    }),
    (sc && rc) ||
      (n.attrHooks.value = {
        set: function (a, b, c) {
          return n.nodeName(a, "input")
            ? void (a.defaultValue = b)
            : nc && nc.set(a, b, c);
        },
      }),
    rc ||
      ((nc = {
        set: function (a, b, c) {
          var d = a.getAttributeNode(c);
          return (
            d || a.setAttributeNode((d = a.ownerDocument.createAttribute(c))),
            (d.value = b += ""),
            "value" === c || b === a.getAttribute(c) ? b : void 0
          );
        },
      }),
      (pc.id =
        pc.name =
        pc.coords =
          function (a, b, c) {
            var d;
            return c
              ? void 0
              : (d = a.getAttributeNode(b)) && "" !== d.value
              ? d.value
              : null;
          }),
      (n.valHooks.button = {
        get: function (a, b) {
          var c = a.getAttributeNode(b);
          return c && c.specified ? c.value : void 0;
        },
        set: nc.set,
      }),
      (n.attrHooks.contenteditable = {
        set: function (a, b, c) {
          nc.set(a, "" === b ? !1 : b, c);
        },
      }),
      n.each(["width", "height"], function (a, b) {
        n.attrHooks[b] = {
          set: function (a, c) {
            return "" === c ? (a.setAttribute(b, "auto"), c) : void 0;
          },
        };
      })),
    l.style ||
      (n.attrHooks.style = {
        get: function (a) {
          return a.style.cssText || void 0;
        },
        set: function (a, b) {
          return (a.style.cssText = b + "");
        },
      });
  var tc = /^(?:input|select|textarea|button|object)$/i,
    uc = /^(?:a|area)$/i;
  n.fn.extend({
    prop: function (a, b) {
      return W(this, n.prop, a, b, arguments.length > 1);
    },
    removeProp: function (a) {
      return (
        (a = n.propFix[a] || a),
        this.each(function () {
          try {
            (this[a] = void 0), delete this[a];
          } catch (b) {}
        })
      );
    },
  }),
    n.extend({
      propFix: {
        for: "htmlFor",
        class: "className",
      },
      prop: function (a, b, c) {
        var d,
          e,
          f,
          g = a.nodeType;
        if (a && 3 !== g && 8 !== g && 2 !== g)
          return (
            (f = 1 !== g || !n.isXMLDoc(a)),
            f && ((b = n.propFix[b] || b), (e = n.propHooks[b])),
            void 0 !== c
              ? e && "set" in e && void 0 !== (d = e.set(a, c, b))
                ? d
                : (a[b] = c)
              : e && "get" in e && null !== (d = e.get(a, b))
              ? d
              : a[b]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (a) {
            var b = n.find.attr(a, "tabindex");
            return b
              ? parseInt(b, 10)
              : tc.test(a.nodeName) || (uc.test(a.nodeName) && a.href)
              ? 0
              : -1;
          },
        },
      },
    }),
    l.hrefNormalized ||
      n.each(["href", "src"], function (a, b) {
        n.propHooks[b] = {
          get: function (a) {
            return a.getAttribute(b, 4);
          },
        };
      }),
    l.optSelected ||
      (n.propHooks.selected = {
        get: function (a) {
          var b = a.parentNode;
          return (
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex),
            null
          );
        },
      }),
    n.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        n.propFix[this.toLowerCase()] = this;
      }
    ),
    l.enctype || (n.propFix.enctype = "encoding");
  var vc = /[\t\r\n\f]/g;
  n.fn.extend({
    addClass: function (a) {
      var b,
        c,
        d,
        e,
        f,
        g,
        h = 0,
        i = this.length,
        j = "string" == typeof a && a;
      if (n.isFunction(a))
        return this.each(function (b) {
          n(this).addClass(a.call(this, b, this.className));
        });
      if (j)
        for (b = (a || "").match(F) || []; i > h; h++)
          if (
            ((c = this[h]),
            (d =
              1 === c.nodeType &&
              (c.className ? (" " + c.className + " ").replace(vc, " ") : " ")))
          ) {
            f = 0;
            while ((e = b[f++])) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
            (g = n.trim(d)), c.className !== g && (c.className = g);
          }
      return this;
    },
    removeClass: function (a) {
      var b,
        c,
        d,
        e,
        f,
        g,
        h = 0,
        i = this.length,
        j = 0 === arguments.length || ("string" == typeof a && a);
      if (n.isFunction(a))
        return this.each(function (b) {
          n(this).removeClass(a.call(this, b, this.className));
        });
      if (j)
        for (b = (a || "").match(F) || []; i > h; h++)
          if (
            ((c = this[h]),
            (d =
              1 === c.nodeType &&
              (c.className ? (" " + c.className + " ").replace(vc, " ") : "")))
          ) {
            f = 0;
            while ((e = b[f++]))
              while (d.indexOf(" " + e + " ") >= 0)
                d = d.replace(" " + e + " ", " ");
            (g = a ? n.trim(d) : ""), c.className !== g && (c.className = g);
          }
      return this;
    },
    toggleClass: function (a, b) {
      var c = typeof a;
      return "boolean" == typeof b && "string" === c
        ? b
          ? this.addClass(a)
          : this.removeClass(a)
        : this.each(
            n.isFunction(a)
              ? function (c) {
                  n(this).toggleClass(a.call(this, c, this.className, b), b);
                }
              : function () {
                  if ("string" === c) {
                    var b,
                      d = 0,
                      e = n(this),
                      f = a.match(F) || [];
                    while ((b = f[d++]))
                      e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                  } else
                    (c === L || "boolean" === c) &&
                      (this.className &&
                        n._data(this, "__className__", this.className),
                      (this.className =
                        this.className || a === !1
                          ? ""
                          : n._data(this, "__className__") || ""));
                }
          );
    },
    hasClass: function (a) {
      for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
        if (
          1 === this[c].nodeType &&
          (" " + this[c].className + " ").replace(vc, " ").indexOf(b) >= 0
        )
          return !0;
      return !1;
    },
  }),
    n.each(
      "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
        " "
      ),
      function (a, b) {
        n.fn[b] = function (a, c) {
          return arguments.length > 0
            ? this.on(b, null, a, c)
            : this.trigger(b);
        };
      }
    ),
    n.fn.extend({
      hover: function (a, b) {
        return this.mouseenter(a).mouseleave(b || a);
      },
      bind: function (a, b, c) {
        return this.on(a, null, b, c);
      },
      unbind: function (a, b) {
        return this.off(a, null, b);
      },
      delegate: function (a, b, c, d) {
        return this.on(b, a, c, d);
      },
      undelegate: function (a, b, c) {
        return 1 === arguments.length
          ? this.off(a, "**")
          : this.off(b, a || "**", c);
      },
    });
  var wc = n.now(),
    xc = /\?/,
    yc =
      /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  (n.parseJSON = function (b) {
    if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
    var c,
      d = null,
      e = n.trim(b + "");
    return e &&
      !n.trim(
        e.replace(yc, function (a, b, e, f) {
          return (
            c && b && (d = 0), 0 === d ? a : ((c = e || b), (d += !f - !e), "")
          );
        })
      )
      ? Function("return " + e)()
      : n.error("Invalid JSON: " + b);
  }),
    (n.parseXML = function (b) {
      var c, d;
      if (!b || "string" != typeof b) return null;
      try {
        a.DOMParser
          ? ((d = new DOMParser()), (c = d.parseFromString(b, "text/xml")))
          : ((c = new ActiveXObject("Microsoft.XMLDOM")),
            (c.async = "false"),
            c.loadXML(b));
      } catch (e) {
        c = void 0;
      }
      return (
        (c &&
          c.documentElement &&
          !c.getElementsByTagName("parsererror").length) ||
          n.error("Invalid XML: " + b),
        c
      );
    });
  var zc,
    Ac,
    Bc = /#.*$/,
    Cc = /([?&])_=[^&]*/,
    Dc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Ec = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Fc = /^(?:GET|HEAD)$/,
    Gc = /^\/\//,
    Hc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Ic = {},
    Jc = {},
    Kc = "*/".concat("*");
  try {
    Ac = location.href;
  } catch (Lc) {
    (Ac = z.createElement("a")), (Ac.href = ""), (Ac = Ac.href);
  }
  zc = Hc.exec(Ac.toLowerCase()) || [];
  function Mc(a) {
    return function (b, c) {
      "string" != typeof b && ((c = b), (b = "*"));
      var d,
        e = 0,
        f = b.toLowerCase().match(F) || [];
      if (n.isFunction(c))
        while ((d = f[e++]))
          "+" === d.charAt(0)
            ? ((d = d.slice(1) || "*"), (a[d] = a[d] || []).unshift(c))
            : (a[d] = a[d] || []).push(c);
    };
  }
  function Nc(a, b, c, d) {
    var e = {},
      f = a === Jc;
    function g(h) {
      var i;
      return (
        (e[h] = !0),
        n.each(a[h] || [], function (a, h) {
          var j = h(b, c, d);
          return "string" != typeof j || f || e[j]
            ? f
              ? !(i = j)
              : void 0
            : (b.dataTypes.unshift(j), g(j), !1);
        }),
        i
      );
    }
    return g(b.dataTypes[0]) || (!e["*"] && g("*"));
  }
  function Oc(a, b) {
    var c,
      d,
      e = n.ajaxSettings.flatOptions || {};
    for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
    return c && n.extend(!0, a, c), a;
  }
  function Pc(a, b, c) {
    var d,
      e,
      f,
      g,
      h = a.contents,
      i = a.dataTypes;
    while ("*" === i[0])
      i.shift(),
        void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
    if (e)
      for (g in h)
        if (h[g] && h[g].test(e)) {
          i.unshift(g);
          break;
        }
    if (i[0] in c) f = i[0];
    else {
      for (g in c) {
        if (!i[0] || a.converters[g + " " + i[0]]) {
          f = g;
          break;
        }
        d || (d = g);
      }
      f = f || d;
    }
    return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
  }
  function Qc(a, b, c, d) {
    var e,
      f,
      g,
      h,
      i,
      j = {},
      k = a.dataTypes.slice();
    if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
    f = k.shift();
    while (f)
      if (
        (a.responseFields[f] && (c[a.responseFields[f]] = b),
        !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
        (i = f),
        (f = k.shift()))
      )
        if ("*" === f) f = i;
        else if ("*" !== i && i !== f) {
          if (((g = j[i + " " + f] || j["* " + f]), !g))
            for (e in j)
              if (
                ((h = e.split(" ")),
                h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]]))
              ) {
                g === !0
                  ? (g = j[e])
                  : j[e] !== !0 && ((f = h[0]), k.unshift(h[1]));
                break;
              }
          if (g !== !0)
            if (g && a["throws"]) b = g(b);
            else
              try {
                b = g(b);
              } catch (l) {
                return {
                  state: "parsererror",
                  error: g ? l : "No conversion from " + i + " to " + f,
                };
              }
        }
    return {
      state: "success",
      data: b,
    };
  }
  n.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Ac,
      type: "GET",
      isLocal: Ec.test(zc[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Kc,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript",
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/,
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON",
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": n.parseJSON,
        "text xml": n.parseXML,
      },
      flatOptions: {
        url: !0,
        context: !0,
      },
    },
    ajaxSetup: function (a, b) {
      return b ? Oc(Oc(a, n.ajaxSettings), b) : Oc(n.ajaxSettings, a);
    },
    ajaxPrefilter: Mc(Ic),
    ajaxTransport: Mc(Jc),
    ajax: function (a, b) {
      "object" == typeof a && ((b = a), (a = void 0)), (b = b || {});
      var c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k = n.ajaxSetup({}, b),
        l = k.context || k,
        m = k.context && (l.nodeType || l.jquery) ? n(l) : n.event,
        o = n.Deferred(),
        p = n.Callbacks("once memory"),
        q = k.statusCode || {},
        r = {},
        s = {},
        t = 0,
        u = "canceled",
        v = {
          readyState: 0,
          getResponseHeader: function (a) {
            var b;
            if (2 === t) {
              if (!j) {
                j = {};
                while ((b = Dc.exec(f))) j[b[1].toLowerCase()] = b[2];
              }
              b = j[a.toLowerCase()];
            }
            return null == b ? null : b;
          },
          getAllResponseHeaders: function () {
            return 2 === t ? f : null;
          },
          setRequestHeader: function (a, b) {
            var c = a.toLowerCase();
            return t || ((a = s[c] = s[c] || a), (r[a] = b)), this;
          },
          overrideMimeType: function (a) {
            return t || (k.mimeType = a), this;
          },
          statusCode: function (a) {
            var b;
            if (a)
              if (2 > t) for (b in a) q[b] = [q[b], a[b]];
              else v.always(a[v.status]);
            return this;
          },
          abort: function (a) {
            var b = a || u;
            return i && i.abort(b), x(0, b), this;
          },
        };
      if (
        ((o.promise(v).complete = p.add),
        (v.success = v.done),
        (v.error = v.fail),
        (k.url = ((a || k.url || Ac) + "")
          .replace(Bc, "")
          .replace(Gc, zc[1] + "//")),
        (k.type = b.method || b.type || k.method || k.type),
        (k.dataTypes = n
          .trim(k.dataType || "*")
          .toLowerCase()
          .match(F) || [""]),
        null == k.crossDomain &&
          ((c = Hc.exec(k.url.toLowerCase())),
          (k.crossDomain = !(
            !c ||
            (c[1] === zc[1] &&
              c[2] === zc[2] &&
              (c[3] || ("http:" === c[1] ? "80" : "443")) ===
                (zc[3] || ("http:" === zc[1] ? "80" : "443")))
          ))),
        k.data &&
          k.processData &&
          "string" != typeof k.data &&
          (k.data = n.param(k.data, k.traditional)),
        Nc(Ic, k, b, v),
        2 === t)
      )
        return v;
      (h = k.global),
        h && 0 === n.active++ && n.event.trigger("ajaxStart"),
        (k.type = k.type.toUpperCase()),
        (k.hasContent = !Fc.test(k.type)),
        (e = k.url),
        k.hasContent ||
          (k.data &&
            ((e = k.url += (xc.test(e) ? "&" : "?") + k.data), delete k.data),
          k.cache === !1 &&
            (k.url = Cc.test(e)
              ? e.replace(Cc, "$1_=" + wc++)
              : e + (xc.test(e) ? "&" : "?") + "_=" + wc++)),
        k.ifModified &&
          (n.lastModified[e] &&
            v.setRequestHeader("If-Modified-Since", n.lastModified[e]),
          n.etag[e] && v.setRequestHeader("If-None-Match", n.etag[e])),
        ((k.data && k.hasContent && k.contentType !== !1) || b.contentType) &&
          v.setRequestHeader("Content-Type", k.contentType),
        v.setRequestHeader(
          "Accept",
          k.dataTypes[0] && k.accepts[k.dataTypes[0]]
            ? k.accepts[k.dataTypes[0]] +
                ("*" !== k.dataTypes[0] ? ", " + Kc + "; q=0.01" : "")
            : k.accepts["*"]
        );
      for (d in k.headers) v.setRequestHeader(d, k.headers[d]);
      if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t))
        return v.abort();
      u = "abort";
      for (d in {
        success: 1,
        error: 1,
        complete: 1,
      })
        v[d](k[d]);
      if ((i = Nc(Jc, k, b, v))) {
        (v.readyState = 1),
          h && m.trigger("ajaxSend", [v, k]),
          k.async &&
            k.timeout > 0 &&
            (g = setTimeout(function () {
              v.abort("timeout");
            }, k.timeout));
        try {
          (t = 1), i.send(r, x);
        } catch (w) {
          if (!(2 > t)) throw w;
          x(-1, w);
        }
      } else x(-1, "No Transport");
      function x(a, b, c, d) {
        var j,
          r,
          s,
          u,
          w,
          x = b;
        2 !== t &&
          ((t = 2),
          g && clearTimeout(g),
          (i = void 0),
          (f = d || ""),
          (v.readyState = a > 0 ? 4 : 0),
          (j = (a >= 200 && 300 > a) || 304 === a),
          c && (u = Pc(k, v, c)),
          (u = Qc(k, u, v, j)),
          j
            ? (k.ifModified &&
                ((w = v.getResponseHeader("Last-Modified")),
                w && (n.lastModified[e] = w),
                (w = v.getResponseHeader("etag")),
                w && (n.etag[e] = w)),
              204 === a || "HEAD" === k.type
                ? (x = "nocontent")
                : 304 === a
                ? (x = "notmodified")
                : ((x = u.state), (r = u.data), (s = u.error), (j = !s)))
            : ((s = x), (a || !x) && ((x = "error"), 0 > a && (a = 0))),
          (v.status = a),
          (v.statusText = (b || x) + ""),
          j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]),
          v.statusCode(q),
          (q = void 0),
          h && m.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]),
          p.fireWith(l, [v, x]),
          h &&
            (m.trigger("ajaxComplete", [v, k]),
            --n.active || n.event.trigger("ajaxStop")));
      }
      return v;
    },
    getJSON: function (a, b, c) {
      return n.get(a, b, c, "json");
    },
    getScript: function (a, b) {
      return n.get(a, void 0, b, "script");
    },
  }),
    n.each(["get", "post"], function (a, b) {
      n[b] = function (a, c, d, e) {
        return (
          n.isFunction(c) && ((e = e || d), (d = c), (c = void 0)),
          n.ajax({
            url: a,
            type: b,
            dataType: e,
            data: c,
            success: d,
          })
        );
      };
    }),
    n.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (a, b) {
        n.fn[b] = function (a) {
          return this.on(b, a);
        };
      }
    ),
    (n._evalUrl = function (a) {
      return n.ajax({
        url: a,
        type: "GET",
        dataType: "script",
        async: !1,
        global: !1,
        throws: !0,
      });
    }),
    n.fn.extend({
      wrapAll: function (a) {
        if (n.isFunction(a))
          return this.each(function (b) {
            n(this).wrapAll(a.call(this, b));
          });
        if (this[0]) {
          var b = n(a, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && b.insertBefore(this[0]),
            b
              .map(function () {
                var a = this;
                while (a.firstChild && 1 === a.firstChild.nodeType)
                  a = a.firstChild;
                return a;
              })
              .append(this);
        }
        return this;
      },
      wrapInner: function (a) {
        return this.each(
          n.isFunction(a)
            ? function (b) {
                n(this).wrapInner(a.call(this, b));
              }
            : function () {
                var b = n(this),
                  c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
              }
        );
      },
      wrap: function (a) {
        var b = n.isFunction(a);
        return this.each(function (c) {
          n(this).wrapAll(b ? a.call(this, c) : a);
        });
      },
      unwrap: function () {
        return this.parent()
          .each(function () {
            n.nodeName(this, "body") || n(this).replaceWith(this.childNodes);
          })
          .end();
      },
    }),
    (n.expr.filters.hidden = function (a) {
      return (
        (a.offsetWidth <= 0 && a.offsetHeight <= 0) ||
        (!l.reliableHiddenOffsets() &&
          "none" === ((a.style && a.style.display) || n.css(a, "display")))
      );
    }),
    (n.expr.filters.visible = function (a) {
      return !n.expr.filters.hidden(a);
    });
  var Rc = /%20/g,
    Sc = /\[\]$/,
    Tc = /\r?\n/g,
    Uc = /^(?:submit|button|image|reset|file)$/i,
    Vc = /^(?:input|select|textarea|keygen)/i;
  function Wc(a, b, c, d) {
    var e;
    if (n.isArray(b))
      n.each(b, function (b, e) {
        c || Sc.test(a)
          ? d(a, e)
          : Wc(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d);
      });
    else if (c || "object" !== n.type(b)) d(a, b);
    else for (e in b) Wc(a + "[" + e + "]", b[e], c, d);
  }
  (n.param = function (a, b) {
    var c,
      d = [],
      e = function (a, b) {
        (b = n.isFunction(b) ? b() : null == b ? "" : b),
          (d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b));
      };
    if (
      (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional),
      n.isArray(a) || (a.jquery && !n.isPlainObject(a)))
    )
      n.each(a, function () {
        e(this.name, this.value);
      });
    else for (c in a) Wc(c, a[c], b, e);
    return d.join("&").replace(Rc, "+");
  }),
    n.fn.extend({
      serialize: function () {
        return n.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var a = n.prop(this, "elements");
          return a ? n.makeArray(a) : this;
        })
          .filter(function () {
            var a = this.type;
            return (
              this.name &&
              !n(this).is(":disabled") &&
              Vc.test(this.nodeName) &&
              !Uc.test(a) &&
              (this.checked || !X.test(a))
            );
          })
          .map(function (a, b) {
            var c = n(this).val();
            return null == c
              ? null
              : n.isArray(c)
              ? n.map(c, function (a) {
                  return {
                    name: b.name,
                    value: a.replace(Tc, "\r\n"),
                  };
                })
              : {
                  name: b.name,
                  value: c.replace(Tc, "\r\n"),
                };
          })
          .get();
      },
    }),
    (n.ajaxSettings.xhr =
      void 0 !== a.ActiveXObject
        ? function () {
            return (
              (!this.isLocal &&
                /^(get|post|head|put|delete|options)$/i.test(this.type) &&
                $c()) ||
              _c()
            );
          }
        : $c);
  var Xc = 0,
    Yc = {},
    Zc = n.ajaxSettings.xhr();
  a.ActiveXObject &&
    n(a).on("unload", function () {
      for (var a in Yc) Yc[a](void 0, !0);
    }),
    (l.cors = !!Zc && "withCredentials" in Zc),
    (Zc = l.ajax = !!Zc),
    Zc &&
      n.ajaxTransport(function (a) {
        if (!a.crossDomain || l.cors) {
          var b;
          return {
            send: function (c, d) {
              var e,
                f = a.xhr(),
                g = ++Xc;
              if (
                (f.open(a.type, a.url, a.async, a.username, a.password),
                a.xhrFields)
              )
                for (e in a.xhrFields) f[e] = a.xhrFields[e];
              a.mimeType &&
                f.overrideMimeType &&
                f.overrideMimeType(a.mimeType),
                a.crossDomain ||
                  c["X-Requested-With"] ||
                  (c["X-Requested-With"] = "XMLHttpRequest");
              for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
              f.send((a.hasContent && a.data) || null),
                (b = function (c, e) {
                  var h, i, j;
                  if (b && (e || 4 === f.readyState))
                    if (
                      (delete Yc[g],
                      (b = void 0),
                      (f.onreadystatechange = n.noop),
                      e)
                    )
                      4 !== f.readyState && f.abort();
                    else {
                      (j = {}),
                        (h = f.status),
                        "string" == typeof f.responseText &&
                          (j.text = f.responseText);
                      try {
                        i = f.statusText;
                      } catch (k) {
                        i = "";
                      }
                      h || !a.isLocal || a.crossDomain
                        ? 1223 === h && (h = 204)
                        : (h = j.text ? 200 : 404);
                    }
                  j && d(h, i, j, f.getAllResponseHeaders());
                }),
                a.async
                  ? 4 === f.readyState
                    ? setTimeout(b)
                    : (f.onreadystatechange = Yc[g] = b)
                  : b();
            },
            abort: function () {
              b && b(void 0, !0);
            },
          };
        }
      });
  function $c() {
    try {
      return new a.XMLHttpRequest();
    } catch (b) {}
  }
  function _c() {
    try {
      return new a.ActiveXObject("Microsoft.XMLHTTP");
    } catch (b) {}
  }
  n.ajaxSetup({
    accepts: {
      script:
        "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
    },
    contents: {
      script: /(?:java|ecma)script/,
    },
    converters: {
      "text script": function (a) {
        return n.globalEval(a), a;
      },
    },
  }),
    n.ajaxPrefilter("script", function (a) {
      void 0 === a.cache && (a.cache = !1),
        a.crossDomain && ((a.type = "GET"), (a.global = !1));
    }),
    n.ajaxTransport("script", function (a) {
      if (a.crossDomain) {
        var b,
          c = z.head || n("head")[0] || z.documentElement;
        return {
          send: function (d, e) {
            (b = z.createElement("script")),
              (b.async = !0),
              a.scriptCharset && (b.charset = a.scriptCharset),
              (b.src = a.url),
              (b.onload = b.onreadystatechange =
                function (a, c) {
                  (c ||
                    !b.readyState ||
                    /loaded|complete/.test(b.readyState)) &&
                    ((b.onload = b.onreadystatechange = null),
                    b.parentNode && b.parentNode.removeChild(b),
                    (b = null),
                    c || e(200, "success"));
                }),
              c.insertBefore(b, c.firstChild);
          },
          abort: function () {
            b && b.onload(void 0, !0);
          },
        };
      }
    });
  var ad = [],
    bd = /(=)\?(?=&|$)|\?\?/;
  n.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var a = ad.pop() || n.expando + "_" + wc++;
      return (this[a] = !0), a;
    },
  }),
    n.ajaxPrefilter("json jsonp", function (b, c, d) {
      var e,
        f,
        g,
        h =
          b.jsonp !== !1 &&
          (bd.test(b.url)
            ? "url"
            : "string" == typeof b.data &&
              !(b.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
              bd.test(b.data) &&
              "data");
      return h || "jsonp" === b.dataTypes[0]
        ? ((e = b.jsonpCallback =
            n.isFunction(b.jsonpCallback)
              ? b.jsonpCallback()
              : b.jsonpCallback),
          h
            ? (b[h] = b[h].replace(bd, "$1" + e))
            : b.jsonp !== !1 &&
              (b.url += (xc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e),
          (b.converters["script json"] = function () {
            return g || n.error(e + " was not called"), g[0];
          }),
          (b.dataTypes[0] = "json"),
          (f = a[e]),
          (a[e] = function () {
            g = arguments;
          }),
          d.always(function () {
            (a[e] = f),
              b[e] && ((b.jsonpCallback = c.jsonpCallback), ad.push(e)),
              g && n.isFunction(f) && f(g[0]),
              (g = f = void 0);
          }),
          "script")
        : void 0;
    }),
    (n.parseHTML = function (a, b, c) {
      if (!a || "string" != typeof a) return null;
      "boolean" == typeof b && ((c = b), (b = !1)), (b = b || z);
      var d = v.exec(a),
        e = !c && [];
      return d
        ? [b.createElement(d[1])]
        : ((d = n.buildFragment([a], b, e)),
          e && e.length && n(e).remove(),
          n.merge([], d.childNodes));
    });
  var cd = n.fn.load;
  (n.fn.load = function (a, b, c) {
    if ("string" != typeof a && cd) return cd.apply(this, arguments);
    var d,
      e,
      f,
      g = this,
      h = a.indexOf(" ");
    return (
      h >= 0 && ((d = a.slice(h, a.length)), (a = a.slice(0, h))),
      n.isFunction(b)
        ? ((c = b), (b = void 0))
        : b && "object" == typeof b && (f = "POST"),
      g.length > 0 &&
        n
          .ajax({
            url: a,
            type: f,
            dataType: "html",
            data: b,
          })
          .done(function (a) {
            (e = arguments),
              g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a);
          })
          .complete(
            c &&
              function (a, b) {
                g.each(c, e || [a.responseText, b, a]);
              }
          ),
      this
    );
  }),
    (n.expr.filters.animated = function (a) {
      return n.grep(n.timers, function (b) {
        return a === b.elem;
      }).length;
    });
  var dd = a.document.documentElement;
  function ed(a) {
    return n.isWindow(a)
      ? a
      : 9 === a.nodeType
      ? a.defaultView || a.parentWindow
      : !1;
  }
  (n.offset = {
    setOffset: function (a, b, c) {
      var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k = n.css(a, "position"),
        l = n(a),
        m = {};
      "static" === k && (a.style.position = "relative"),
        (h = l.offset()),
        (f = n.css(a, "top")),
        (i = n.css(a, "left")),
        (j =
          ("absolute" === k || "fixed" === k) &&
          n.inArray("auto", [f, i]) > -1),
        j
          ? ((d = l.position()), (g = d.top), (e = d.left))
          : ((g = parseFloat(f) || 0), (e = parseFloat(i) || 0)),
        n.isFunction(b) && (b = b.call(a, c, h)),
        null != b.top && (m.top = b.top - h.top + g),
        null != b.left && (m.left = b.left - h.left + e),
        "using" in b ? b.using.call(a, m) : l.css(m);
    },
  }),
    n.fn.extend({
      offset: function (a) {
        if (arguments.length)
          return void 0 === a
            ? this
            : this.each(function (b) {
                n.offset.setOffset(this, a, b);
              });
        var b,
          c,
          d = {
            top: 0,
            left: 0,
          },
          e = this[0],
          f = e && e.ownerDocument;
        if (f)
          return (
            (b = f.documentElement),
            n.contains(b, e)
              ? (typeof e.getBoundingClientRect !== L &&
                  (d = e.getBoundingClientRect()),
                (c = ed(f)),
                {
                  top:
                    d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                  left:
                    d.left +
                    (c.pageXOffset || b.scrollLeft) -
                    (b.clientLeft || 0),
                })
              : d
          );
      },
      position: function () {
        if (this[0]) {
          var a,
            b,
            c = {
              top: 0,
              left: 0,
            },
            d = this[0];
          return (
            "fixed" === n.css(d, "position")
              ? (b = d.getBoundingClientRect())
              : ((a = this.offsetParent()),
                (b = this.offset()),
                n.nodeName(a[0], "html") || (c = a.offset()),
                (c.top += n.css(a[0], "borderTopWidth", !0)),
                (c.left += n.css(a[0], "borderLeftWidth", !0))),
            {
              top: b.top - c.top - n.css(d, "marginTop", !0),
              left: b.left - c.left - n.css(d, "marginLeft", !0),
            }
          );
        }
      },
      offsetParent: function () {
        return this.map(function () {
          var a = this.offsetParent || dd;
          while (
            a &&
            !n.nodeName(a, "html") &&
            "static" === n.css(a, "position")
          )
            a = a.offsetParent;
          return a || dd;
        });
      },
    }),
    n.each(
      {
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset",
      },
      function (a, b) {
        var c = /Y/.test(b);
        n.fn[a] = function (d) {
          return W(
            this,
            function (a, d, e) {
              var f = ed(a);
              return void 0 === e
                ? f
                  ? b in f
                    ? f[b]
                    : f.document.documentElement[d]
                  : a[d]
                : void (f
                    ? f.scrollTo(
                        c ? n(f).scrollLeft() : e,
                        c ? e : n(f).scrollTop()
                      )
                    : (a[d] = e));
            },
            a,
            d,
            arguments.length,
            null
          );
        };
      }
    ),
    n.each(["top", "left"], function (a, b) {
      n.cssHooks[b] = Mb(l.pixelPosition, function (a, c) {
        return c
          ? ((c = Kb(a, b)), Ib.test(c) ? n(a).position()[b] + "px" : c)
          : void 0;
      });
    }),
    n.each(
      {
        Height: "height",
        Width: "width",
      },
      function (a, b) {
        n.each(
          {
            padding: "inner" + a,
            content: b,
            "": "outer" + a,
          },
          function (c, d) {
            n.fn[d] = function (d, e) {
              var f = arguments.length && (c || "boolean" != typeof d),
                g = c || (d === !0 || e === !0 ? "margin" : "border");
              return W(
                this,
                function (b, c, d) {
                  var e;
                  return n.isWindow(b)
                    ? b.document.documentElement["client" + a]
                    : 9 === b.nodeType
                    ? ((e = b.documentElement),
                      Math.max(
                        b.body["scroll" + a],
                        e["scroll" + a],
                        b.body["offset" + a],
                        e["offset" + a],
                        e["client" + a]
                      ))
                    : void 0 === d
                    ? n.css(b, c, g)
                    : n.style(b, c, d, g);
                },
                b,
                f ? d : void 0,
                f,
                null
              );
            };
          }
        );
      }
    ),
    (n.fn.size = function () {
      return this.length;
    }),
    (n.fn.andSelf = n.fn.addBack),
    "function" == typeof define &&
      define.amd &&
      define("jquery", [], function () {
        return n;
      });
  var fd = a.jQuery,
    gd = a.$;
  return (
    (n.noConflict = function (b) {
      return a.$ === n && (a.$ = gd), b && a.jQuery === n && (a.jQuery = fd), n;
    }),
    typeof b === L && (a.jQuery = a.$ = n),
    n
  );
});
/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery)
  throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (a) {
  "use strict";
  function b() {
    var a = document.createElement("bootstrap"),
      b = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend",
      };
    for (var c in b)
      if (void 0 !== a.style[c])
        return {
          end: b[c],
        };
    return !1;
  }
  (a.fn.emulateTransitionEnd = function (b) {
    var c = !1,
      d = this;
    a(this).one(a.support.transition.end, function () {
      c = !0;
    });
    var e = function () {
      c || a(d).trigger(a.support.transition.end);
    };
    return setTimeout(e, b), this;
  }),
    a(function () {
      a.support.transition = b();
    });
})(jQuery),
  +(function (a) {
    "use strict";
    var b = '[data-dismiss="alert"]',
      c = function (c) {
        a(c).on("click", b, this.close);
      };
    c.prototype.close = function (b) {
      function c() {
        f.trigger("closed.bs.alert").remove();
      }
      var d = a(this),
        e = d.attr("data-target");
      e || ((e = d.attr("href")), (e = e && e.replace(/.*(?=#[^\s]*$)/, "")));
      var f = a(e);
      b && b.preventDefault(),
        f.length || (f = d.hasClass("alert") ? d : d.parent()),
        f.trigger((b = a.Event("close.bs.alert"))),
        b.isDefaultPrevented() ||
          (f.removeClass("in"),
          a.support.transition && f.hasClass("fade")
            ? f.one(a.support.transition.end, c).emulateTransitionEnd(150)
            : c());
    };
    var d = a.fn.alert;
    (a.fn.alert = function (b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.alert");
        e || d.data("bs.alert", (e = new c(this))),
          "string" == typeof b && e[b].call(d);
      });
    }),
      (a.fn.alert.Constructor = c),
      (a.fn.alert.noConflict = function () {
        return (a.fn.alert = d), this;
      }),
      a(document).on("click.bs.alert.data-api", b, c.prototype.close);
  })(jQuery),
  +(function (a) {
    "use strict";
    var b = function (c, d) {
      (this.$element = a(c)),
        (this.options = a.extend({}, b.DEFAULTS, d)),
        (this.isLoading = !1);
    };
    (b.DEFAULTS = {
      loadingText: "loading...",
    }),
      (b.prototype.setState = function (b) {
        var c = "disabled",
          d = this.$element,
          e = d.is("input") ? "val" : "html",
          f = d.data();
        (b += "Text"),
          f.resetText || d.data("resetText", d[e]()),
          d[e](f[b] || this.options[b]),
          setTimeout(
            a.proxy(function () {
              "loadingText" == b
                ? ((this.isLoading = !0), d.addClass(c).attr(c, c))
                : this.isLoading &&
                  ((this.isLoading = !1), d.removeClass(c).removeAttr(c));
            }, this),
            0
          );
      }),
      (b.prototype.toggle = function () {
        var a = !0,
          b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
          var c = this.$element.find("input");
          "radio" == c.prop("type") &&
            (c.prop("checked") && this.$element.hasClass("active")
              ? (a = !1)
              : b.find(".active").removeClass("active")),
            a &&
              c
                .prop("checked", !this.$element.hasClass("active"))
                .trigger("change");
        }
        a && this.$element.toggleClass("active");
      });
    var c = a.fn.button;
    (a.fn.button = function (c) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.button"),
          f = "object" == typeof c && c;
        e || d.data("bs.button", (e = new b(this, f))),
          "toggle" == c ? e.toggle() : c && e.setState(c);
      });
    }),
      (a.fn.button.Constructor = b),
      (a.fn.button.noConflict = function () {
        return (a.fn.button = c), this;
      }),
      a(document).on(
        "click.bs.button.data-api",
        "[data-toggle^=button]",
        function (b) {
          var c = a(b.target);
          c.hasClass("btn") || (c = c.closest(".btn")),
            c.button("toggle"),
            b.preventDefault();
        }
      );
  })(jQuery),
  +(function (a) {
    "use strict";
    var b = function (b, c) {
      (this.$element = a(b)),
        (this.$indicators = this.$element.find(".carousel-indicators")),
        (this.options = c),
        (this.paused =
          this.sliding =
          this.interval =
          this.$active =
          this.$items =
            null),
        "hover" == this.options.pause &&
          this.$element
            .on("mouseenter", a.proxy(this.pause, this))
            .on("mouseleave", a.proxy(this.cycle, this));
    };
    (b.DEFAULTS = {
      interval: 5e3,
      pause: "hover",
      wrap: !0,
    }),
      (b.prototype.cycle = function (b) {
        return (
          b || (this.paused = !1),
          this.interval && clearInterval(this.interval),
          this.options.interval &&
            !this.paused &&
            (this.interval = setInterval(
              a.proxy(this.next, this),
              this.options.interval
            )),
          this
        );
      }),
      (b.prototype.getActiveIndex = function () {
        return (
          (this.$active = this.$element.find(".item.active")),
          (this.$items = this.$active.parent().children()),
          this.$items.index(this.$active)
        );
      }),
      (b.prototype.to = function (b) {
        var c = this,
          d = this.getActiveIndex();
        return b > this.$items.length - 1 || 0 > b
          ? void 0
          : this.sliding
          ? this.$element.one("slid.bs.carousel", function () {
              c.to(b);
            })
          : d == b
          ? this.pause().cycle()
          : this.slide(b > d ? "next" : "prev", a(this.$items[b]));
      }),
      (b.prototype.pause = function (b) {
        return (
          b || (this.paused = !0),
          this.$element.find(".next, .prev").length &&
            a.support.transition &&
            (this.$element.trigger(a.support.transition.end), this.cycle(!0)),
          (this.interval = clearInterval(this.interval)),
          this
        );
      }),
      (b.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next");
      }),
      (b.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev");
      }),
      (b.prototype.slide = function (b, c) {
        var d = this.$element.find(".item.active"),
          e = c || d[b](),
          f = this.interval,
          g = "next" == b ? "left" : "right",
          h = "next" == b ? "first" : "last",
          i = this;
        if (!e.length) {
          if (!this.options.wrap) return;
          e = this.$element.find(".item")[h]();
        }
        if (e.hasClass("active")) return (this.sliding = !1);
        var j = a.Event("slide.bs.carousel", {
          relatedTarget: e[0],
          direction: g,
        });
        return (
          this.$element.trigger(j),
          j.isDefaultPrevented()
            ? void 0
            : ((this.sliding = !0),
              f && this.pause(),
              this.$indicators.length &&
                (this.$indicators.find(".active").removeClass("active"),
                this.$element.one("slid.bs.carousel", function () {
                  var b = a(i.$indicators.children()[i.getActiveIndex()]);
                  b && b.addClass("active");
                })),
              a.support.transition && this.$element.hasClass("slide")
                ? (e.addClass(b),
                  e[0].offsetWidth,
                  d.addClass(g),
                  e.addClass(g),
                  d
                    .one(a.support.transition.end, function () {
                      e.removeClass([b, g].join(" ")).addClass("active"),
                        d.removeClass(["active", g].join(" ")),
                        (i.sliding = !1),
                        setTimeout(function () {
                          i.$element.trigger("slid.bs.carousel");
                        }, 0);
                    })
                    .emulateTransitionEnd(
                      1e3 * d.css("transition-duration").slice(0, -1)
                    ))
                : (d.removeClass("active"),
                  e.addClass("active"),
                  (this.sliding = !1),
                  this.$element.trigger("slid.bs.carousel")),
              f && this.cycle(),
              this)
        );
      });
    var c = a.fn.carousel;
    (a.fn.carousel = function (c) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.carousel"),
          f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c),
          g = "string" == typeof c ? c : f.slide;
        e || d.data("bs.carousel", (e = new b(this, f))),
          "number" == typeof c
            ? e.to(c)
            : g
            ? e[g]()
            : f.interval && e.pause().cycle();
      });
    }),
      (a.fn.carousel.Constructor = b),
      (a.fn.carousel.noConflict = function () {
        return (a.fn.carousel = c), this;
      }),
      a(document).on(
        "click.bs.carousel.data-api",
        "[data-slide], [data-slide-to]",
        function (b) {
          var c,
            d = a(this),
            e = a(
              d.attr("data-target") ||
                ((c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""))
            ),
            f = a.extend({}, e.data(), d.data()),
            g = d.attr("data-slide-to");
          g && (f.interval = !1),
            e.carousel(f),
            (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g),
            b.preventDefault();
        }
      ),
      a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
          var b = a(this);
          b.carousel(b.data());
        });
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    var b = function (c, d) {
      (this.$element = a(c)),
        (this.options = a.extend({}, b.DEFAULTS, d)),
        (this.transitioning = null),
        this.options.parent && (this.$parent = a(this.options.parent)),
        this.options.toggle && this.toggle();
    };
    (b.DEFAULTS = {
      toggle: !0,
    }),
      (b.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height";
      }),
      (b.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
          var b = a.Event("show.bs.collapse");
          if ((this.$element.trigger(b), !b.isDefaultPrevented())) {
            var c = this.$parent && this.$parent.find("> .panel > .in");
            if (c && c.length) {
              var d = c.data("bs.collapse");
              if (d && d.transitioning) return;
              c.collapse("hide"), d || c.data("bs.collapse", null);
            }
            var e = this.dimension();
            this.$element.removeClass("collapse").addClass("collapsing")[e](0),
              (this.transitioning = 1);
            var f = function () {
              this.$element
                .removeClass("collapsing")
                .addClass("collapse in")
                [e]("auto"),
                (this.transitioning = 0),
                this.$element.trigger("shown.bs.collapse");
            };
            if (!a.support.transition) return f.call(this);
            var g = a.camelCase(["scroll", e].join("-"));
            this.$element
              .one(a.support.transition.end, a.proxy(f, this))
              .emulateTransitionEnd(350)
              [e](this.$element[0][g]);
          }
        }
      }),
      (b.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
          var b = a.Event("hide.bs.collapse");
          if ((this.$element.trigger(b), !b.isDefaultPrevented())) {
            var c = this.dimension();
            this.$element[c](this.$element[c]())[0].offsetHeight,
              this.$element
                .addClass("collapsing")
                .removeClass("collapse")
                .removeClass("in"),
              (this.transitioning = 1);
            var d = function () {
              (this.transitioning = 0),
                this.$element
                  .trigger("hidden.bs.collapse")
                  .removeClass("collapsing")
                  .addClass("collapse");
            };
            return a.support.transition
              ? void this.$element[c](0)
                  .one(a.support.transition.end, a.proxy(d, this))
                  .emulateTransitionEnd(350)
              : d.call(this);
          }
        }
      }),
      (b.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
      });
    var c = a.fn.collapse;
    (a.fn.collapse = function (c) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.collapse"),
          f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c);
        !e && f.toggle && "show" == c && (c = !c),
          e || d.data("bs.collapse", (e = new b(this, f))),
          "string" == typeof c && e[c]();
      });
    }),
      (a.fn.collapse.Constructor = b),
      (a.fn.collapse.noConflict = function () {
        return (a.fn.collapse = c), this;
      }),
      a(document).on(
        "click.bs.collapse.data-api",
        "[data-toggle=collapse]",
        function (b) {
          var c,
            d = a(this),
            e =
              d.attr("data-target") ||
              b.preventDefault() ||
              ((c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")),
            f = a(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : d.data(),
            i = d.attr("data-parent"),
            j = i && a(i);
          (g && g.transitioning) ||
            (j &&
              j
                .find('[data-toggle=collapse][data-parent="' + i + '"]')
                .not(d)
                .addClass("collapsed"),
            d[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed")),
            f.collapse(h);
        }
      );
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      a(d).remove(),
        a(e).each(function () {
          var d = c(a(this)),
            e = {
              relatedTarget: this,
            };
          d.hasClass("open") &&
            (d.trigger((b = a.Event("hide.bs.dropdown", e))),
            b.isDefaultPrevented() ||
              d.removeClass("open").trigger("hidden.bs.dropdown", e));
        });
    }
    function c(b) {
      var c = b.attr("data-target");
      c ||
        ((c = b.attr("href")),
        (c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, "")));
      var d = c && a(c);
      return d && d.length ? d : b.parent();
    }
    var d = ".dropdown-backdrop",
      e = "[data-toggle=dropdown]",
      f = function (b) {
        a(b).on("click.bs.dropdown", this.toggle);
      };
    (f.prototype.toggle = function (d) {
      var e = a(this);
      if (!e.is(".disabled, :disabled")) {
        var f = c(e),
          g = f.hasClass("open");
        if ((b(), !g)) {
          "ontouchstart" in document.documentElement &&
            !f.closest(".navbar-nav").length &&
            a('<div class="dropdown-backdrop"/>')
              .insertAfter(a(this))
              .on("click", b);
          var h = {
            relatedTarget: this,
          };
          if (
            (f.trigger((d = a.Event("show.bs.dropdown", h))),
            d.isDefaultPrevented())
          )
            return;
          f.toggleClass("open").trigger("shown.bs.dropdown", h), e.focus();
        }
        return !1;
      }
    }),
      (f.prototype.keydown = function (b) {
        if (/(38|40|27)/.test(b.keyCode)) {
          var d = a(this);
          if (
            (b.preventDefault(),
            b.stopPropagation(),
            !d.is(".disabled, :disabled"))
          ) {
            var f = c(d),
              g = f.hasClass("open");
            if (!g || (g && 27 == b.keyCode))
              return 27 == b.which && f.find(e).focus(), d.click();
            var h = " li:not(.divider):visible a",
              i = f.find("[role=menu]" + h + ", [role=listbox]" + h);
            if (i.length) {
              var j = i.index(i.filter(":focus"));
              38 == b.keyCode && j > 0 && j--,
                40 == b.keyCode && j < i.length - 1 && j++,
                ~j || (j = 0),
                i.eq(j).focus();
            }
          }
        }
      });
    var g = a.fn.dropdown;
    (a.fn.dropdown = function (b) {
      return this.each(function () {
        var c = a(this),
          d = c.data("bs.dropdown");
        d || c.data("bs.dropdown", (d = new f(this))),
          "string" == typeof b && d[b].call(c);
      });
    }),
      (a.fn.dropdown.Constructor = f),
      (a.fn.dropdown.noConflict = function () {
        return (a.fn.dropdown = g), this;
      }),
      a(document)
        .on("click.bs.dropdown.data-api", b)
        .on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
          a.stopPropagation();
        })
        .on("click.bs.dropdown.data-api", e, f.prototype.toggle)
        .on(
          "keydown.bs.dropdown.data-api",
          e + ", [role=menu], [role=listbox]",
          f.prototype.keydown
        );
  })(jQuery),
  +(function (a) {
    "use strict";
    var b = function (b, c) {
      (this.options = c),
        (this.$element = a(b)),
        (this.$backdrop = this.isShown = null),
        this.options.remote &&
          this.$element.find(".modal-content").load(
            this.options.remote,
            a.proxy(function () {
              this.$element.trigger("loaded.bs.modal");
            }, this)
          );
    };
    (b.DEFAULTS = {
      backdrop: !0,
      keyboard: !0,
      show: !0,
    }),
      (b.prototype.toggle = function (a) {
        return this[this.isShown ? "hide" : "show"](a);
      }),
      (b.prototype.show = function (b) {
        var c = this,
          d = a.Event("show.bs.modal", {
            relatedTarget: b,
          });
        this.$element.trigger(d),
          this.isShown ||
            d.isDefaultPrevented() ||
            ((this.isShown = !0),
            this.escape(),
            this.$element.on(
              "click.dismiss.bs.modal",
              '[data-dismiss="modal"]',
              a.proxy(this.hide, this)
            ),
            this.backdrop(function () {
              var d = a.support.transition && c.$element.hasClass("fade");
              c.$element.parent().length || c.$element.appendTo(document.body),
                c.$element.show().scrollTop(0),
                d && c.$element[0].offsetWidth,
                c.$element.addClass("in").attr("aria-hidden", !1),
                c.enforceFocus();
              var e = a.Event("shown.bs.modal", {
                relatedTarget: b,
              });
              d
                ? c.$element
                    .find(".modal-dialog")
                    .one(a.support.transition.end, function () {
                      c.$element.focus().trigger(e);
                    })
                    .emulateTransitionEnd(300)
                : c.$element.focus().trigger(e);
            }));
      }),
      (b.prototype.hide = function (b) {
        b && b.preventDefault(),
          (b = a.Event("hide.bs.modal")),
          this.$element.trigger(b),
          this.isShown &&
            !b.isDefaultPrevented() &&
            ((this.isShown = !1),
            this.escape(),
            a(document).off("focusin.bs.modal"),
            this.$element
              .removeClass("in")
              .attr("aria-hidden", !0)
              .off("click.dismiss.bs.modal"),
            a.support.transition && this.$element.hasClass("fade")
              ? this.$element
                  .one(a.support.transition.end, a.proxy(this.hideModal, this))
                  .emulateTransitionEnd(300)
              : this.hideModal());
      }),
      (b.prototype.enforceFocus = function () {
        a(document)
          .off("focusin.bs.modal")
          .on(
            "focusin.bs.modal",
            a.proxy(function (a) {
              this.$element[0] === a.target ||
                this.$element.has(a.target).length ||
                this.$element.focus();
            }, this)
          );
      }),
      (b.prototype.escape = function () {
        this.isShown && this.options.keyboard
          ? this.$element.on(
              "keyup.dismiss.bs.modal",
              a.proxy(function (a) {
                27 == a.which && this.hide();
              }, this)
            )
          : this.isShown || this.$element.off("keyup.dismiss.bs.modal");
      }),
      (b.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(),
          this.backdrop(function () {
            a.removeBackdrop(), a.$element.trigger("hidden.bs.modal");
          });
      }),
      (b.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
      }),
      (b.prototype.backdrop = function (b) {
        var c = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
          var d = a.support.transition && c;
          if (
            ((this.$backdrop = a(
              '<div class="modal-backdrop ' + c + '" />'
            ).appendTo(document.body)),
            this.$element.on(
              "click.dismiss.bs.modal",
              a.proxy(function (a) {
                a.target === a.currentTarget &&
                  ("static" == this.options.backdrop
                    ? this.$element[0].focus.call(this.$element[0])
                    : this.hide.call(this));
              }, this)
            ),
            d && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !b)
          )
            return;
          d
            ? this.$backdrop
                .one(a.support.transition.end, b)
                .emulateTransitionEnd(150)
            : b();
        } else
          !this.isShown && this.$backdrop
            ? (this.$backdrop.removeClass("in"),
              a.support.transition && this.$element.hasClass("fade")
                ? this.$backdrop
                    .one(a.support.transition.end, b)
                    .emulateTransitionEnd(150)
                : b())
            : b && b();
      });
    var c = a.fn.modal;
    (a.fn.modal = function (c, d) {
      return this.each(function () {
        var e = a(this),
          f = e.data("bs.modal"),
          g = a.extend({}, b.DEFAULTS, e.data(), "object" == typeof c && c);
        f || e.data("bs.modal", (f = new b(this, g))),
          "string" == typeof c ? f[c](d) : g.show && f.show(d);
      });
    }),
      (a.fn.modal.Constructor = b),
      (a.fn.modal.noConflict = function () {
        return (a.fn.modal = c), this;
      }),
      a(document).on(
        "click.bs.modal.data-api",
        '[data-toggle="modal"]',
        function (b) {
          var c = a(this),
            d = c.attr("href"),
            e = a(
              c.attr("data-target") || (d && d.replace(/.*(?=#[^\s]+$)/, ""))
            ),
            f = e.data("bs.modal")
              ? "toggle"
              : a.extend(
                  {
                    remote: !/#/.test(d) && d,
                  },
                  e.data(),
                  c.data()
                );
          c.is("a") && b.preventDefault(),
            e.modal(f, this).one("hide", function () {
              c.is(":visible") && c.focus();
            });
        }
      ),
      a(document)
        .on("show.bs.modal", ".modal", function () {
          a(document.body).addClass("modal-open");
        })
        .on("hidden.bs.modal", ".modal", function () {
          a(document.body).removeClass("modal-open");
        });
  })(jQuery),
  +(function (a) {
    "use strict";
    var b = function (a, b) {
      (this.type =
        this.options =
        this.enabled =
        this.timeout =
        this.hoverState =
        this.$element =
          null),
        this.init("tooltip", a, b);
    };
    (b.DEFAULTS = {
      animation: !0,
      placement: "top",
      selector: !1,
      template:
        '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      container: !1,
    }),
      (b.prototype.init = function (b, c, d) {
        (this.enabled = !0),
          (this.type = b),
          (this.$element = a(c)),
          (this.options = this.getOptions(d));
        for (var e = this.options.trigger.split(" "), f = e.length; f--; ) {
          var g = e[f];
          if ("click" == g)
            this.$element.on(
              "click." + this.type,
              this.options.selector,
              a.proxy(this.toggle, this)
            );
          else if ("manual" != g) {
            var h = "hover" == g ? "mouseenter" : "focusin",
              i = "hover" == g ? "mouseleave" : "focusout";
            this.$element.on(
              h + "." + this.type,
              this.options.selector,
              a.proxy(this.enter, this)
            ),
              this.$element.on(
                i + "." + this.type,
                this.options.selector,
                a.proxy(this.leave, this)
              );
          }
        }
        this.options.selector
          ? (this._options = a.extend({}, this.options, {
              trigger: "manual",
              selector: "",
            }))
          : this.fixTitle();
      }),
      (b.prototype.getDefaults = function () {
        return b.DEFAULTS;
      }),
      (b.prototype.getOptions = function (b) {
        return (
          (b = a.extend({}, this.getDefaults(), this.$element.data(), b)),
          b.delay &&
            "number" == typeof b.delay &&
            (b.delay = {
              show: b.delay,
              hide: b.delay,
            }),
          b
        );
      }),
      (b.prototype.getDelegateOptions = function () {
        var b = {},
          c = this.getDefaults();
        return (
          this._options &&
            a.each(this._options, function (a, d) {
              c[a] != d && (b[a] = d);
            }),
          b
        );
      }),
      (b.prototype.enter = function (b) {
        var c =
          b instanceof this.constructor
            ? b
            : a(b.currentTarget)
                [this.type](this.getDelegateOptions())
                .data("bs." + this.type);
        return (
          clearTimeout(c.timeout),
          (c.hoverState = "in"),
          c.options.delay && c.options.delay.show
            ? void (c.timeout = setTimeout(function () {
                "in" == c.hoverState && c.show();
              }, c.options.delay.show))
            : c.show()
        );
      }),
      (b.prototype.leave = function (b) {
        var c =
          b instanceof this.constructor
            ? b
            : a(b.currentTarget)
                [this.type](this.getDelegateOptions())
                .data("bs." + this.type);
        return (
          clearTimeout(c.timeout),
          (c.hoverState = "out"),
          c.options.delay && c.options.delay.hide
            ? void (c.timeout = setTimeout(function () {
                "out" == c.hoverState && c.hide();
              }, c.options.delay.hide))
            : c.hide()
        );
      }),
      (b.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
          if ((this.$element.trigger(b), b.isDefaultPrevented())) return;
          var c = this,
            d = this.tip();
          this.setContent(), this.options.animation && d.addClass("fade");
          var e =
              "function" == typeof this.options.placement
                ? this.options.placement.call(this, d[0], this.$element[0])
                : this.options.placement,
            f = /\s?auto?\s?/i,
            g = f.test(e);
          g && (e = e.replace(f, "") || "top"),
            d
              .detach()
              .css({
                top: 0,
                left: 0,
                display: "block",
              })
              .addClass(e),
            this.options.container
              ? d.appendTo(this.options.container)
              : d.insertAfter(this.$element);
          var h = this.getPosition(),
            i = d[0].offsetWidth,
            j = d[0].offsetHeight;
          if (g) {
            var k = this.$element.parent(),
              l = e,
              m = document.documentElement.scrollTop || document.body.scrollTop,
              n =
                "body" == this.options.container
                  ? window.innerWidth
                  : k.outerWidth(),
              o =
                "body" == this.options.container
                  ? window.innerHeight
                  : k.outerHeight(),
              p = "body" == this.options.container ? 0 : k.offset().left;
            (e =
              "bottom" == e && h.top + h.height + j - m > o
                ? "top"
                : "top" == e && h.top - m - j < 0
                ? "bottom"
                : "right" == e && h.right + i > n
                ? "left"
                : "left" == e && h.left - i < p
                ? "right"
                : e),
              d.removeClass(l).addClass(e);
          }
          var q = this.getCalculatedOffset(e, h, i, j);
          this.applyPlacement(q, e), (this.hoverState = null);
          var r = function () {
            c.$element.trigger("shown.bs." + c.type);
          };
          a.support.transition && this.$tip.hasClass("fade")
            ? d.one(a.support.transition.end, r).emulateTransitionEnd(150)
            : r();
        }
      }),
      (b.prototype.applyPlacement = function (b, c) {
        var d,
          e = this.tip(),
          f = e[0].offsetWidth,
          g = e[0].offsetHeight,
          h = parseInt(e.css("margin-top"), 10),
          i = parseInt(e.css("margin-left"), 10);
        isNaN(h) && (h = 0),
          isNaN(i) && (i = 0),
          (b.top = b.top + h),
          (b.left = b.left + i),
          a.offset.setOffset(
            e[0],
            a.extend(
              {
                using: function (a) {
                  e.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left),
                  });
                },
              },
              b
            ),
            0
          ),
          e.addClass("in");
        var j = e[0].offsetWidth,
          k = e[0].offsetHeight;
        if (
          ("top" == c && k != g && ((d = !0), (b.top = b.top + g - k)),
          /bottom|top/.test(c))
        ) {
          var l = 0;
          b.left < 0 &&
            ((l = -2 * b.left),
            (b.left = 0),
            e.offset(b),
            (j = e[0].offsetWidth),
            (k = e[0].offsetHeight)),
            this.replaceArrow(l - f + j, j, "left");
        } else this.replaceArrow(k - g, k, "top");
        d && e.offset(b);
      }),
      (b.prototype.replaceArrow = function (a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "");
      }),
      (b.prototype.setContent = function () {
        var a = this.tip(),
          b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b),
          a.removeClass("fade in top bottom left right");
      }),
      (b.prototype.hide = function () {
        function b() {
          "in" != c.hoverState && d.detach(),
            c.$element.trigger("hidden.bs." + c.type);
        }
        var c = this,
          d = this.tip(),
          e = a.Event("hide.bs." + this.type);
        return (
          this.$element.trigger(e),
          e.isDefaultPrevented()
            ? void 0
            : (d.removeClass("in"),
              a.support.transition && this.$tip.hasClass("fade")
                ? d.one(a.support.transition.end, b).emulateTransitionEnd(150)
                : b(),
              (this.hoverState = null),
              this)
        );
      }),
      (b.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) &&
          a
            .attr("data-original-title", a.attr("title") || "")
            .attr("title", "");
      }),
      (b.prototype.hasContent = function () {
        return this.getTitle();
      }),
      (b.prototype.getPosition = function () {
        var b = this.$element[0];
        return a.extend(
          {},
          "function" == typeof b.getBoundingClientRect
            ? b.getBoundingClientRect()
            : {
                width: b.offsetWidth,
                height: b.offsetHeight,
              },
          this.$element.offset()
        );
      }),
      (b.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a
          ? {
              top: b.top + b.height,
              left: b.left + b.width / 2 - c / 2,
            }
          : "top" == a
          ? {
              top: b.top - d,
              left: b.left + b.width / 2 - c / 2,
            }
          : "left" == a
          ? {
              top: b.top + b.height / 2 - d / 2,
              left: b.left - c,
            }
          : {
              top: b.top + b.height / 2 - d / 2,
              left: b.left + b.width,
            };
      }),
      (b.prototype.getTitle = function () {
        var a,
          b = this.$element,
          c = this.options;
        return (a =
          b.attr("data-original-title") ||
          ("function" == typeof c.title ? c.title.call(b[0]) : c.title));
      }),
      (b.prototype.tip = function () {
        return (this.$tip = this.$tip || a(this.options.template));
      }),
      (b.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
      }),
      (b.prototype.validate = function () {
        this.$element[0].parentNode ||
          (this.hide(), (this.$element = null), (this.options = null));
      }),
      (b.prototype.enable = function () {
        this.enabled = !0;
      }),
      (b.prototype.disable = function () {
        this.enabled = !1;
      }),
      (b.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
      }),
      (b.prototype.toggle = function (b) {
        var c = b
          ? a(b.currentTarget)
              [this.type](this.getDelegateOptions())
              .data("bs." + this.type)
          : this;
        c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
      }),
      (b.prototype.destroy = function () {
        clearTimeout(this.timeout),
          this.hide()
            .$element.off("." + this.type)
            .removeData("bs." + this.type);
      });
    var c = a.fn.tooltip;
    (a.fn.tooltip = function (c) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.tooltip"),
          f = "object" == typeof c && c;
        (e || "destroy" != c) &&
          (e || d.data("bs.tooltip", (e = new b(this, f))),
          "string" == typeof c && e[c]());
      });
    }),
      (a.fn.tooltip.Constructor = b),
      (a.fn.tooltip.noConflict = function () {
        return (a.fn.tooltip = c), this;
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    var b = function (a, b) {
      this.init("popover", a, b);
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    (b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
      placement: "right",
      trigger: "click",
      content: "",
      template:
        '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
    })),
      (b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype)),
      (b.prototype.constructor = b),
      (b.prototype.getDefaults = function () {
        return b.DEFAULTS;
      }),
      (b.prototype.setContent = function () {
        var a = this.tip(),
          b = this.getTitle(),
          c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b),
          a
            .find(".popover-content")
            [
              this.options.html
                ? "string" == typeof c
                  ? "html"
                  : "append"
                : "text"
            ](c),
          a.removeClass("fade top bottom left right in"),
          a.find(".popover-title").html() || a.find(".popover-title").hide();
      }),
      (b.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
      }),
      (b.prototype.getContent = function () {
        var a = this.$element,
          b = this.options;
        return (
          a.attr("data-content") ||
          ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
        );
      }),
      (b.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
      }),
      (b.prototype.tip = function () {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip;
      });
    var c = a.fn.popover;
    (a.fn.popover = function (c) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.popover"),
          f = "object" == typeof c && c;
        (e || "destroy" != c) &&
          (e || d.data("bs.popover", (e = new b(this, f))),
          "string" == typeof c && e[c]());
      });
    }),
      (a.fn.popover.Constructor = b),
      (a.fn.popover.noConflict = function () {
        return (a.fn.popover = c), this;
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(c, d) {
      var e,
        f = a.proxy(this.process, this);
      (this.$element = a(a(c).is("body") ? window : c)),
        (this.$body = a("body")),
        (this.$scrollElement = this.$element.on(
          "scroll.bs.scroll-spy.data-api",
          f
        )),
        (this.options = a.extend({}, b.DEFAULTS, d)),
        (this.selector =
          (this.options.target ||
            ((e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "")) ||
            "") + " .nav li > a"),
        (this.offsets = a([])),
        (this.targets = a([])),
        (this.activeTarget = null),
        this.refresh(),
        this.process();
    }
    (b.DEFAULTS = {
      offset: 10,
    }),
      (b.prototype.refresh = function () {
        var b = this.$element[0] == window ? "offset" : "position";
        (this.offsets = a([])), (this.targets = a([]));
        {
          var c = this;
          this.$body
            .find(this.selector)
            .map(function () {
              var d = a(this),
                e = d.data("target") || d.attr("href"),
                f = /^#./.test(e) && a(e);
              return (
                (f &&
                  f.length &&
                  f.is(":visible") && [
                    [
                      f[b]().top +
                        (!a.isWindow(c.$scrollElement.get(0)) &&
                          c.$scrollElement.scrollTop()),
                      e,
                    ],
                  ]) ||
                null
              );
            })
            .sort(function (a, b) {
              return a[0] - b[0];
            })
            .each(function () {
              c.offsets.push(this[0]), c.targets.push(this[1]);
            });
        }
      }),
      (b.prototype.process = function () {
        var a,
          b = this.$scrollElement.scrollTop() + this.options.offset,
          c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
          d = c - this.$scrollElement.height(),
          e = this.offsets,
          f = this.targets,
          g = this.activeTarget;
        if (b >= d) return g != (a = f.last()[0]) && this.activate(a);
        if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a);
        for (a = e.length; a--; )
          g != f[a] &&
            b >= e[a] &&
            (!e[a + 1] || b <= e[a + 1]) &&
            this.activate(f[a]);
      }),
      (b.prototype.activate = function (b) {
        (this.activeTarget = b),
          a(this.selector)
            .parentsUntil(this.options.target, ".active")
            .removeClass("active");
        var c =
            this.selector +
            '[data-target="' +
            b +
            '"],' +
            this.selector +
            '[href="' +
            b +
            '"]',
          d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length &&
          (d = d.closest("li.dropdown").addClass("active")),
          d.trigger("activate.bs.scrollspy");
      });
    var c = a.fn.scrollspy;
    (a.fn.scrollspy = function (c) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.scrollspy"),
          f = "object" == typeof c && c;
        e || d.data("bs.scrollspy", (e = new b(this, f))),
          "string" == typeof c && e[c]();
      });
    }),
      (a.fn.scrollspy.Constructor = b),
      (a.fn.scrollspy.noConflict = function () {
        return (a.fn.scrollspy = c), this;
      }),
      a(window).on("load", function () {
        a('[data-spy="scroll"]').each(function () {
          var b = a(this);
          b.scrollspy(b.data());
        });
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    var b = function (b) {
      this.element = a(b);
    };
    (b.prototype.show = function () {
      var b = this.element,
        c = b.closest("ul:not(.dropdown-menu)"),
        d = b.data("target");
      if (
        (d ||
          ((d = b.attr("href")), (d = d && d.replace(/.*(?=#[^\s]*$)/, ""))),
        !b.parent("li").hasClass("active"))
      ) {
        var e = c.find(".active:last a")[0],
          f = a.Event("show.bs.tab", {
            relatedTarget: e,
          });
        if ((b.trigger(f), !f.isDefaultPrevented())) {
          var g = a(d);
          this.activate(b.parent("li"), c),
            this.activate(g, g.parent(), function () {
              b.trigger({
                type: "shown.bs.tab",
                relatedTarget: e,
              });
            });
        }
      }
    }),
      (b.prototype.activate = function (b, c, d) {
        function e() {
          f
            .removeClass("active")
            .find("> .dropdown-menu > .active")
            .removeClass("active"),
            b.addClass("active"),
            g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"),
            b.parent(".dropdown-menu") &&
              b.closest("li.dropdown").addClass("active"),
            d && d();
        }
        var f = c.find("> .active"),
          g = d && a.support.transition && f.hasClass("fade");
        g ? f.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(),
          f.removeClass("in");
      });
    var c = a.fn.tab;
    (a.fn.tab = function (c) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.tab");
        e || d.data("bs.tab", (e = new b(this))),
          "string" == typeof c && e[c]();
      });
    }),
      (a.fn.tab.Constructor = b),
      (a.fn.tab.noConflict = function () {
        return (a.fn.tab = c), this;
      }),
      a(document).on(
        "click.bs.tab.data-api",
        '[data-toggle="tab"], [data-toggle="pill"]',
        function (b) {
          b.preventDefault(), a(this).tab("show");
        }
      );
  })(jQuery),
  +(function (a) {
    "use strict";
    var b = function (c, d) {
      (this.options = a.extend({}, b.DEFAULTS, d)),
        (this.$window = a(window)
          .on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this))
          .on(
            "click.bs.affix.data-api",
            a.proxy(this.checkPositionWithEventLoop, this)
          )),
        (this.$element = a(c)),
        (this.affixed = this.unpin = this.pinnedOffset = null),
        this.checkPosition();
    };
    (b.RESET = "affix affix-top affix-bottom"),
      (b.DEFAULTS = {
        offset: 0,
      }),
      (b.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(b.RESET).addClass("affix");
        var a = this.$window.scrollTop(),
          c = this.$element.offset();
        return (this.pinnedOffset = c.top - a);
      }),
      (b.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1);
      }),
      (b.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
          var c = a(document).height(),
            d = this.$window.scrollTop(),
            e = this.$element.offset(),
            f = this.options.offset,
            g = f.top,
            h = f.bottom;
          "top" == this.affixed && (e.top += d),
            "object" != typeof f && (h = g = f),
            "function" == typeof g && (g = f.top(this.$element)),
            "function" == typeof h && (h = f.bottom(this.$element));
          var i =
            null != this.unpin && d + this.unpin <= e.top
              ? !1
              : null != h && e.top + this.$element.height() >= c - h
              ? "bottom"
              : null != g && g >= d
              ? "top"
              : !1;
          if (this.affixed !== i) {
            this.unpin && this.$element.css("top", "");
            var j = "affix" + (i ? "-" + i : ""),
              k = a.Event(j + ".bs.affix");
            this.$element.trigger(k),
              k.isDefaultPrevented() ||
                ((this.affixed = i),
                (this.unpin = "bottom" == i ? this.getPinnedOffset() : null),
                this.$element
                  .removeClass(b.RESET)
                  .addClass(j)
                  .trigger(a.Event(j.replace("affix", "affixed"))),
                "bottom" == i &&
                  this.$element.offset({
                    top: c - h - this.$element.height(),
                  }));
          }
        }
      });
    var c = a.fn.affix;
    (a.fn.affix = function (c) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.affix"),
          f = "object" == typeof c && c;
        e || d.data("bs.affix", (e = new b(this, f))),
          "string" == typeof c && e[c]();
      });
    }),
      (a.fn.affix.Constructor = b),
      (a.fn.affix.noConflict = function () {
        return (a.fn.affix = c), this;
      }),
      a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
          var b = a(this),
            c = b.data();
          (c.offset = c.offset || {}),
            c.offsetBottom && (c.offset.bottom = c.offsetBottom),
            c.offsetTop && (c.offset.top = c.offsetTop),
            b.affix(c);
        });
      });
  })(jQuery);
/*!
 * @license PreloadJS
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2011-2013 gskinner.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
(this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = (createjs.PreloadJS = createjs.PreloadJS || {});
    (a.version = "NEXT"), (a.buildDate = "Thu, 12 Dec 2013 23:37:07 GMT");
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c) {
        this.initialize(a, b, c);
      },
      b = a.prototype;
    (b.type = null),
      (b.target = null),
      (b.currentTarget = null),
      (b.eventPhase = 0),
      (b.bubbles = !1),
      (b.cancelable = !1),
      (b.timeStamp = 0),
      (b.defaultPrevented = !1),
      (b.propagationStopped = !1),
      (b.immediatePropagationStopped = !1),
      (b.removed = !1),
      (b.initialize = function (a, b, c) {
        (this.type = a),
          (this.bubbles = b),
          (this.cancelable = c),
          (this.timeStamp = new Date().getTime());
      }),
      (b.preventDefault = function () {
        this.defaultPrevented = !0;
      }),
      (b.stopPropagation = function () {
        this.propagationStopped = !0;
      }),
      (b.stopImmediatePropagation = function () {
        this.immediatePropagationStopped = this.propagationStopped = !0;
      }),
      (b.remove = function () {
        this.removed = !0;
      }),
      (b.clone = function () {
        return new a(this.type, this.bubbles, this.cancelable);
      }),
      (b.toString = function () {
        return "[Event (type=" + this.type + ")]";
      }),
      (createjs.Event = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function () {},
      b = a.prototype;
    (a.initialize = function (a) {
      (a.addEventListener = b.addEventListener),
        (a.on = b.on),
        (a.removeEventListener = a.off = b.removeEventListener),
        (a.removeAllEventListeners = b.removeAllEventListeners),
        (a.hasEventListener = b.hasEventListener),
        (a.dispatchEvent = b.dispatchEvent),
        (a._dispatchEvent = b._dispatchEvent),
        (a.willTrigger = b.willTrigger);
    }),
      (b._listeners = null),
      (b._captureListeners = null),
      (b.initialize = function () {}),
      (b.addEventListener = function (a, b, c) {
        var d;
        d = c
          ? (this._captureListeners = this._captureListeners || {})
          : (this._listeners = this._listeners || {});
        var e = d[a];
        return (
          e && this.removeEventListener(a, b, c),
          (e = d[a]),
          e ? e.push(b) : (d[a] = [b]),
          b
        );
      }),
      (b.on = function (a, b, c, d, e, f) {
        return (
          b.handleEvent && ((c = c || b), (b = b.handleEvent)),
          (c = c || this),
          this.addEventListener(
            a,
            function (a) {
              b.call(c, a, e), d && a.remove();
            },
            f
          )
        );
      }),
      (b.removeEventListener = function (a, b, c) {
        var d = c ? this._captureListeners : this._listeners;
        if (d) {
          var e = d[a];
          if (e)
            for (var f = 0, g = e.length; g > f; f++)
              if (e[f] == b) {
                1 == g ? delete d[a] : e.splice(f, 1);
                break;
              }
        }
      }),
      (b.off = b.removeEventListener),
      (b.removeAllEventListeners = function (a) {
        a
          ? (this._listeners && delete this._listeners[a],
            this._captureListeners && delete this._captureListeners[a])
          : (this._listeners = this._captureListeners = null);
      }),
      (b.dispatchEvent = function (a, b) {
        if ("string" == typeof a) {
          var c = this._listeners;
          if (!c || !c[a]) return !1;
          a = new createjs.Event(a);
        }
        if (((a.target = b || this), a.bubbles && this.parent)) {
          for (var d = this, e = [d]; d.parent; ) e.push((d = d.parent));
          var f,
            g = e.length;
          for (f = g - 1; f >= 0 && !a.propagationStopped; f--)
            e[f]._dispatchEvent(a, 1 + (0 == f));
          for (f = 1; g > f && !a.propagationStopped; f++)
            e[f]._dispatchEvent(a, 3);
        } else this._dispatchEvent(a, 2);
        return a.defaultPrevented;
      }),
      (b.hasEventListener = function (a) {
        var b = this._listeners,
          c = this._captureListeners;
        return !!((b && b[a]) || (c && c[a]));
      }),
      (b.willTrigger = function (a) {
        for (var b = this; b; ) {
          if (b.hasEventListener(a)) return !0;
          b = b.parent;
        }
        return !1;
      }),
      (b.toString = function () {
        return "[EventDispatcher]";
      }),
      (b._dispatchEvent = function (a, b) {
        var c,
          d = 1 == b ? this._captureListeners : this._listeners;
        if (a && d) {
          var e = d[a.type];
          if (!e || !(c = e.length)) return;
          (a.currentTarget = this),
            (a.eventPhase = b),
            (a.removed = !1),
            (e = e.slice());
          for (var f = 0; c > f && !a.immediatePropagationStopped; f++) {
            var g = e[f];
            g.handleEvent ? g.handleEvent(a) : g(a),
              a.removed && (this.off(a.type, g, 1 == b), (a.removed = !1));
          }
        }
      }),
      (createjs.EventDispatcher = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    createjs.indexOf = function (a, b) {
      for (var c = 0, d = a.length; d > c; c++) if (b === a[c]) return c;
      return -1;
    };
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    createjs.proxy = function (a, b) {
      var c = Array.prototype.slice.call(arguments, 2);
      return function () {
        return a.apply(b, Array.prototype.slice.call(arguments, 0).concat(c));
      };
    };
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function () {
      this.init();
    };
    a.prototype = new createjs.EventDispatcher();
    var b = a.prototype,
      c = a;
    (c.FILE_PATTERN =
      /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?)|(.{0,2}\/{1}))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/),
      (c.PATH_PATTERN =
        /^(?:(\w+:)\/{2})|(.{0,2}\/{1})?([/.]*?(?:[^?]+)?\/?)?$/),
      (b.loaded = !1),
      (b.canceled = !1),
      (b.progress = 0),
      (b._item = null),
      (b.getItem = function () {
        return this._item;
      }),
      (b.init = function () {}),
      (b.load = function () {}),
      (b.close = function () {}),
      (b._sendLoadStart = function () {
        this._isCanceled() || this.dispatchEvent("loadstart");
      }),
      (b._sendProgress = function (a) {
        if (!this._isCanceled()) {
          var b = null;
          "number" == typeof a
            ? ((this.progress = a),
              (b = new createjs.Event("progress")),
              (b.loaded = this.progress),
              (b.total = 1))
            : ((b = a),
              (this.progress = a.loaded / a.total),
              (isNaN(this.progress) || 1 / 0 == this.progress) &&
                (this.progress = 0)),
            (b.progress = this.progress),
            this.hasEventListener("progress") && this.dispatchEvent(b);
        }
      }),
      (b._sendComplete = function () {
        this._isCanceled() || this.dispatchEvent("complete");
      }),
      (b._sendError = function (a) {
        !this._isCanceled() &&
          this.hasEventListener("error") &&
          (null == a && (a = new createjs.Event("error")),
          this.dispatchEvent(a));
      }),
      (b._isCanceled = function () {
        return null == window.createjs || this.canceled ? !0 : !1;
      }),
      (b._parseURI = function (a) {
        return a ? a.match(c.FILE_PATTERN) : null;
      }),
      (b._parsePath = function (a) {
        return a ? a.match(c.PATH_PATTERN) : null;
      }),
      (b._formatQueryString = function (a, b) {
        if (null == a) throw new Error("You must specify data.");
        var c = [];
        for (var d in a) c.push(d + "=" + escape(a[d]));
        return b && (c = c.concat(b)), c.join("&");
      }),
      (b.buildPath = function (a, b) {
        if (null == b) return a;
        var c = [],
          d = a.indexOf("?");
        if (-1 != d) {
          var e = a.slice(d + 1);
          c = c.concat(e.split("&"));
        }
        return -1 != d
          ? a.slice(0, d) + "?" + this._formatQueryString(b, c)
          : a + "?" + this._formatQueryString(b, c);
      }),
      (b._isCrossDomain = function (a) {
        var b = document.createElement("a");
        b.href = a.src;
        var c = document.createElement("a");
        c.href = location.href;
        var d =
          "" != b.hostname &&
          (b.port != c.port ||
            b.protocol != c.protocol ||
            b.hostname != c.hostname);
        return d;
      }),
      (b._isLocal = function (a) {
        var b = document.createElement("a");
        return (b.href = a.src), "" == b.hostname && "file:" == b.protocol;
      }),
      (b.toString = function () {
        return "[PreloadJS AbstractLoader]";
      }),
      (createjs.AbstractLoader = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b, c) {
        this.init(a, b, c);
      },
      b = (a.prototype = new createjs.AbstractLoader()),
      c = a;
    (c.loadTimeout = 8e3),
      (c.LOAD_TIMEOUT = 0),
      (c.BINARY = "binary"),
      (c.CSS = "css"),
      (c.IMAGE = "image"),
      (c.JAVASCRIPT = "javascript"),
      (c.JSON = "json"),
      (c.JSONP = "jsonp"),
      (c.MANIFEST = "manifest"),
      (c.SOUND = "sound"),
      (c.SVG = "svg"),
      (c.TEXT = "text"),
      (c.XML = "xml"),
      (c.POST = "POST"),
      (c.GET = "GET"),
      (b._basePath = null),
      (b._crossOrigin = ""),
      (b.useXHR = !0),
      (b.stopOnError = !1),
      (b.maintainScriptOrder = !0),
      (b.next = null),
      (b._typeCallbacks = null),
      (b._extensionCallbacks = null),
      (b._loadStartWasDispatched = !1),
      (b._maxConnections = 1),
      (b._currentlyLoadingScript = null),
      (b._currentLoads = null),
      (b._loadQueue = null),
      (b._loadQueueBackup = null),
      (b._loadItemsById = null),
      (b._loadItemsBySrc = null),
      (b._loadedResults = null),
      (b._loadedRawResults = null),
      (b._numItems = 0),
      (b._numItemsLoaded = 0),
      (b._scriptOrder = null),
      (b._loadedScripts = null),
      (b.init = function (a, b, c) {
        (this._numItems = this._numItemsLoaded = 0),
          (this._paused = !1),
          (this._loadStartWasDispatched = !1),
          (this._currentLoads = []),
          (this._loadQueue = []),
          (this._loadQueueBackup = []),
          (this._scriptOrder = []),
          (this._loadedScripts = []),
          (this._loadItemsById = {}),
          (this._loadItemsBySrc = {}),
          (this._loadedResults = {}),
          (this._loadedRawResults = {}),
          (this._typeCallbacks = {}),
          (this._extensionCallbacks = {}),
          (this._basePath = b),
          this.setUseXHR(a),
          (this._crossOrigin =
            c === !0 ? "Anonymous" : c === !1 || null == c ? "" : c);
      }),
      (b.setUseXHR = function (a) {
        return (
          (this.useXHR = 0 != a && null != window.XMLHttpRequest), this.useXHR
        );
      }),
      (b.removeAll = function () {
        this.remove();
      }),
      (b.remove = function (a) {
        var b = null;
        if (!a || a instanceof Array) {
          if (a) b = a;
          else if (arguments.length > 0) return;
        } else b = [a];
        var c = !1;
        if (b) {
          for (; b.length; ) {
            var d = b.pop(),
              e = this.getResult(d);
            for (f = this._loadQueue.length - 1; f >= 0; f--)
              if (
                ((g = this._loadQueue[f].getItem()), g.id == d || g.src == d)
              ) {
                this._loadQueue.splice(f, 1)[0].cancel();
                break;
              }
            for (f = this._loadQueueBackup.length - 1; f >= 0; f--)
              if (
                ((g = this._loadQueueBackup[f].getItem()),
                g.id == d || g.src == d)
              ) {
                this._loadQueueBackup.splice(f, 1)[0].cancel();
                break;
              }
            if (e)
              delete this._loadItemsById[e.id],
                delete this._loadItemsBySrc[e.src],
                this._disposeItem(e);
            else
              for (var f = this._currentLoads.length - 1; f >= 0; f--) {
                var g = this._currentLoads[f].getItem();
                if (g.id == d || g.src == d) {
                  this._currentLoads.splice(f, 1)[0].cancel(), (c = !0);
                  break;
                }
              }
          }
          c && this._loadNext();
        } else {
          this.close();
          for (var h in this._loadItemsById)
            this._disposeItem(this._loadItemsById[h]);
          this.init(this.useXHR);
        }
      }),
      (b.reset = function () {
        this.close();
        for (var a in this._loadItemsById)
          this._disposeItem(this._loadItemsById[a]);
        for (var b = [], c = 0, d = this._loadQueueBackup.length; d > c; c++)
          b.push(this._loadQueueBackup[c].getItem());
        this.loadManifest(b, !1);
      }),
      (c.isBinary = function (a) {
        switch (a) {
          case createjs.LoadQueue.IMAGE:
          case createjs.LoadQueue.BINARY:
            return !0;
          default:
            return !1;
        }
      }),
      (c.isText = function (a) {
        switch (a) {
          case createjs.LoadQueue.TEXT:
          case createjs.LoadQueue.JSON:
          case createjs.LoadQueue.MANIFEST:
          case createjs.LoadQueue.XML:
          case createjs.LoadQueue.HTML:
          case createjs.LoadQueue.CSS:
          case createjs.LoadQueue.SVG:
          case createjs.LoadQueue.JAVASCRIPT:
            return !0;
          default:
            return !1;
        }
      }),
      (b.installPlugin = function (a) {
        if (null != a && null != a.getPreloadHandlers) {
          var b = a.getPreloadHandlers();
          if (((b.scope = a), null != b.types))
            for (var c = 0, d = b.types.length; d > c; c++)
              this._typeCallbacks[b.types[c]] = b;
          if (null != b.extensions)
            for (c = 0, d = b.extensions.length; d > c; c++)
              this._extensionCallbacks[b.extensions[c]] = b;
        }
      }),
      (b.setMaxConnections = function (a) {
        (this._maxConnections = a),
          !this._paused && this._loadQueue.length > 0 && this._loadNext();
      }),
      (b.loadFile = function (a, b, c) {
        if (null == a) {
          var d = new createjs.Event("error");
          return (d.text = "PRELOAD_NO_FILE"), this._sendError(d), void 0;
        }
        this._addItem(a, null, c),
          b !== !1 ? this.setPaused(!1) : this.setPaused(!0);
      }),
      (b.loadManifest = function (a, b, d) {
        var e = null,
          f = null;
        if (a instanceof Array) {
          if (0 == a.length) {
            var g = new createjs.Event("error");
            return (
              (g.text = "PRELOAD_MANIFEST_EMPTY"), this._sendError(g), void 0
            );
          }
          e = a;
        } else if ("string" == typeof a)
          e = [
            {
              src: a,
              type: c.MANIFEST,
            },
          ];
        else {
          if ("object" != typeof a) {
            var g = new createjs.Event("error");
            return (
              (g.text = "PRELOAD_MANIFEST_NULL"), this._sendError(g), void 0
            );
          }
          if (void 0 !== a.src) {
            if (null == a.type) a.type = c.MANIFEST;
            else if (a.type != c.MANIFEST) {
              var g = new createjs.Event("error");
              (g.text = "PRELOAD_MANIFEST_ERROR"), this._sendError(g);
            }
            e = [a];
          } else void 0 !== a.manifest && ((e = a.manifest), (f = a.path));
        }
        for (var h = 0, i = e.length; i > h; h++) this._addItem(e[h], f, d);
        b !== !1 ? this.setPaused(!1) : this.setPaused(!0);
      }),
      (b.load = function () {
        this.setPaused(!1);
      }),
      (b.getItem = function (a) {
        return this._loadItemsById[a] || this._loadItemsBySrc[a];
      }),
      (b.getResult = function (a, b) {
        var c = this._loadItemsById[a] || this._loadItemsBySrc[a];
        if (null == c) return null;
        var d = c.id;
        return b && this._loadedRawResults[d]
          ? this._loadedRawResults[d]
          : this._loadedResults[d];
      }),
      (b.setPaused = function (a) {
        (this._paused = a), this._paused || this._loadNext();
      }),
      (b.close = function () {
        for (; this._currentLoads.length; ) this._currentLoads.pop().cancel();
        (this._scriptOrder.length = 0),
          (this._loadedScripts.length = 0),
          (this.loadStartWasDispatched = !1);
      }),
      (b._addItem = function (a, b, c) {
        var d = this._createLoadItem(a, b, c);
        if (null != d) {
          var e = this._createLoader(d);
          null != e &&
            (this._loadQueue.push(e),
            this._loadQueueBackup.push(e),
            this._numItems++,
            this._updateProgress(),
            this.maintainScriptOrder &&
              d.type == createjs.LoadQueue.JAVASCRIPT &&
              e instanceof createjs.XHRLoader &&
              (this._scriptOrder.push(d), this._loadedScripts.push(null)));
        }
      }),
      (b._createLoadItem = function (a, b, c) {
        var d = null;
        switch (typeof a) {
          case "string":
            d = {
              src: a,
            };
            break;
          case "object":
            d =
              window.HTMLAudioElement && a instanceof window.HTMLAudioElement
                ? {
                    tag: a,
                    src: d.tag.src,
                    type: createjs.LoadQueue.SOUND,
                  }
                : a;
            break;
          default:
            return null;
        }
        var e = this._parseURI(d.src);
        null != e && (d.ext = e[6]),
          null == d.type && (d.type = this._getTypeByExtension(d.ext));
        var f = "",
          g = c || this._basePath,
          h = d.src;
        if (e && null == e[1] && null == e[3])
          if (b) {
            f = b;
            var i = this._parsePath(b);
            (h = b + h),
              null != g && i && null == i[1] && null == i[2] && (f = g + f);
          } else null != g && (f = g);
        if (
          ((d.src = f + d.src),
          (d.path = f),
          (d.type == createjs.LoadQueue.JSON ||
            d.type == createjs.LoadQueue.MANIFEST) &&
            (d._loadAsJSONP = null != d.callback),
          d.type == createjs.LoadQueue.JSONP && null == d.callback)
        )
          throw new Error("callback is required for loading JSONP requests.");
        (void 0 === d.tag || null === d.tag) && (d.tag = this._createTag(d)),
          (void 0 === d.id || null === d.id || "" === d.id) && (d.id = h);
        var j = this._typeCallbacks[d.type] || this._extensionCallbacks[d.ext];
        if (j) {
          var k = j.callback.call(
            j.scope,
            d.src,
            d.type,
            d.id,
            d.data,
            f,
            this
          );
          if (k === !1) return null;
          k === !0 ||
            (null != k.src && (d.src = k.src),
            null != k.id && (d.id = k.id),
            null != k.tag && (d.tag = k.tag),
            null != k.completeHandler &&
              (d.completeHandler = k.completeHandler),
            k.type && (d.type = k.type),
            (e = this._parseURI(d.src)),
            null != e && null != e[6] && (d.ext = e[6].toLowerCase()));
        }
        return (
          (this._loadItemsById[d.id] = d), (this._loadItemsBySrc[d.src] = d), d
        );
      }),
      (b._createLoader = function (a) {
        var b = this.useXHR;
        switch (a.type) {
          case createjs.LoadQueue.JSON:
          case createjs.LoadQueue.MANIFEST:
            b = !a._loadAsJSONP;
            break;
          case createjs.LoadQueue.XML:
          case createjs.LoadQueue.TEXT:
            b = !0;
            break;
          case createjs.LoadQueue.SOUND:
          case createjs.LoadQueue.JSONP:
            b = !1;
            break;
          case null:
            return null;
        }
        return b
          ? new createjs.XHRLoader(a, this._crossOrigin)
          : new createjs.TagLoader(a);
      }),
      (b._loadNext = function () {
        if (!this._paused) {
          this._loadStartWasDispatched ||
            (this._sendLoadStart(), (this._loadStartWasDispatched = !0)),
            this._numItems == this._numItemsLoaded
              ? ((this.loaded = !0),
                this._sendComplete(),
                this.next && this.next.load && this.next.load())
              : (this.loaded = !1);
          for (
            var a = 0;
            a < this._loadQueue.length &&
            !(this._currentLoads.length >= this._maxConnections);
            a++
          ) {
            var b = this._loadQueue[a];
            if (
              this.maintainScriptOrder &&
              b instanceof createjs.TagLoader &&
              b.getItem().type == createjs.LoadQueue.JAVASCRIPT
            ) {
              if (this._currentlyLoadingScript) continue;
              this._currentlyLoadingScript = !0;
            }
            this._loadQueue.splice(a, 1), a--, this._loadItem(b);
          }
        }
      }),
      (b._loadItem = function (a) {
        a.on("progress", this._handleProgress, this),
          a.on("complete", this._handleFileComplete, this),
          a.on("error", this._handleFileError, this),
          this._currentLoads.push(a),
          this._sendFileStart(a.getItem()),
          a.load();
      }),
      (b._handleFileError = function (a) {
        var b = a.target;
        this._numItemsLoaded++, this._updateProgress();
        var c = new createjs.Event("error");
        (c.text = "FILE_LOAD_ERROR"),
          (c.item = b.getItem()),
          this._sendError(c),
          this.stopOnError || (this._removeLoadItem(b), this._loadNext());
      }),
      (b._handleFileComplete = function (a) {
        var b = a.target,
          c = b.getItem();
        if (
          ((this._loadedResults[c.id] = b.getResult()),
          b instanceof createjs.XHRLoader &&
            (this._loadedRawResults[c.id] = b.getResult(!0)),
          this._removeLoadItem(b),
          this.maintainScriptOrder && c.type == createjs.LoadQueue.JAVASCRIPT)
        ) {
          if (!(b instanceof createjs.TagLoader))
            return (
              (this._loadedScripts[createjs.indexOf(this._scriptOrder, c)] = c),
              this._checkScriptLoadOrder(b),
              void 0
            );
          this._currentlyLoadingScript = !1;
        }
        if ((delete c._loadAsJSONP, c.type == createjs.LoadQueue.MANIFEST)) {
          var d = b.getResult();
          null != d && void 0 !== d.manifest && this.loadManifest(d, !0);
        }
        this._processFinishedLoad(c, b);
      }),
      (b._processFinishedLoad = function (a, b) {
        this._numItemsLoaded++,
          this._updateProgress(),
          this._sendFileComplete(a, b),
          this._loadNext();
      }),
      (b._checkScriptLoadOrder = function () {
        for (var a = this._loadedScripts.length, b = 0; a > b; b++) {
          var c = this._loadedScripts[b];
          if (null === c) break;
          if (c !== !0) {
            var d = this._loadedResults[c.id];
            (
              document.body || document.getElementsByTagName("body")[0]
            ).appendChild(d),
              this._processFinishedLoad(c),
              (this._loadedScripts[b] = !0);
          }
        }
      }),
      (b._removeLoadItem = function (a) {
        for (var b = this._currentLoads.length, c = 0; b > c; c++)
          if (this._currentLoads[c] == a) {
            this._currentLoads.splice(c, 1);
            break;
          }
      }),
      (b._handleProgress = function (a) {
        var b = a.target;
        this._sendFileProgress(b.getItem(), b.progress), this._updateProgress();
      }),
      (b._updateProgress = function () {
        var a = this._numItemsLoaded / this._numItems,
          b = this._numItems - this._numItemsLoaded;
        if (b > 0) {
          for (var c = 0, d = 0, e = this._currentLoads.length; e > d; d++)
            c += this._currentLoads[d].progress;
          a += (c / b) * (b / this._numItems);
        }
        this._sendProgress(a);
      }),
      (b._disposeItem = function (a) {
        delete this._loadedResults[a.id],
          delete this._loadedRawResults[a.id],
          delete this._loadItemsById[a.id],
          delete this._loadItemsBySrc[a.src];
      }),
      (b._createTag = function (a) {
        var b = null;
        switch (a.type) {
          case createjs.LoadQueue.IMAGE:
            return (
              (b = document.createElement("img")),
              "" == this._crossOrigin ||
                this._isLocal(a) ||
                (b.crossOrigin = this._crossOrigin),
              b
            );
          case createjs.LoadQueue.SOUND:
            return (b = document.createElement("audio")), (b.autoplay = !1), b;
          case createjs.LoadQueue.JSON:
          case createjs.LoadQueue.JSONP:
          case createjs.LoadQueue.JAVASCRIPT:
          case createjs.LoadQueue.MANIFEST:
            return (
              (b = document.createElement("script")),
              (b.type = "text/javascript"),
              b
            );
          case createjs.LoadQueue.CSS:
            return (
              (b = this.useXHR
                ? document.createElement("style")
                : document.createElement("link")),
              (b.rel = "stylesheet"),
              (b.type = "text/css"),
              b
            );
          case createjs.LoadQueue.SVG:
            return (
              this.useXHR
                ? (b = document.createElement("svg"))
                : ((b = document.createElement("object")),
                  (b.type = "image/svg+xml")),
              b
            );
        }
        return null;
      }),
      (b._getTypeByExtension = function (a) {
        if (null == a) return createjs.LoadQueue.TEXT;
        switch (a.toLowerCase()) {
          case "jpeg":
          case "jpg":
          case "gif":
          case "png":
          case "webp":
          case "bmp":
            return createjs.LoadQueue.IMAGE;
          case "ogg":
          case "mp3":
          case "wav":
            return createjs.LoadQueue.SOUND;
          case "json":
            return createjs.LoadQueue.JSON;
          case "xml":
            return createjs.LoadQueue.XML;
          case "css":
            return createjs.LoadQueue.CSS;
          case "js":
            return createjs.LoadQueue.JAVASCRIPT;
          case "svg":
            return createjs.LoadQueue.SVG;
          default:
            return createjs.LoadQueue.TEXT;
        }
      }),
      (b._sendFileProgress = function (a, b) {
        if (this._isCanceled()) return this._cleanUp(), void 0;
        if (this.hasEventListener("fileprogress")) {
          var c = new createjs.Event("fileprogress");
          (c.progress = b),
            (c.loaded = b),
            (c.total = 1),
            (c.item = a),
            this.dispatchEvent(c);
        }
      }),
      (b._sendFileComplete = function (a, b) {
        if (!this._isCanceled()) {
          var c = new createjs.Event("fileload");
          (c.loader = b),
            (c.item = a),
            (c.result = this._loadedResults[a.id]),
            (c.rawResult = this._loadedRawResults[a.id]),
            a.completeHandler && a.completeHandler(c),
            this.hasEventListener("fileload") && this.dispatchEvent(c);
        }
      }),
      (b._sendFileStart = function (a) {
        var b = new createjs.Event("filestart");
        (b.item = a),
          this.hasEventListener("filestart") && this.dispatchEvent(b);
      }),
      (b.toString = function () {
        return "[PreloadJS LoadQueue]";
      }),
      (createjs.LoadQueue = a);
    var d = function () {};
    (d.init = function () {
      var a = navigator.userAgent;
      (d.isFirefox = a.indexOf("Firefox") > -1),
        (d.isOpera = null != window.opera),
        (d.isChrome = a.indexOf("Chrome") > -1),
        (d.isIOS =
          a.indexOf("iPod") > -1 ||
          a.indexOf("iPhone") > -1 ||
          a.indexOf("iPad") > -1);
    }),
      d.init(),
      (createjs.LoadQueue.BrowserDetect = d);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a) {
        this.init(a);
      },
      b = (a.prototype = new createjs.AbstractLoader());
    (b._loadTimeout = null),
      (b._tagCompleteProxy = null),
      (b._isAudio = !1),
      (b._tag = null),
      (b._jsonResult = null),
      (b.init = function (a) {
        (this._item = a),
          (this._tag = a.tag),
          (this._isAudio =
            window.HTMLAudioElement &&
            a.tag instanceof window.HTMLAudioElement),
          (this._tagCompleteProxy = createjs.proxy(this._handleLoad, this));
      }),
      (b.getResult = function () {
        return this._item.type == createjs.LoadQueue.JSONP ||
          this._item.type == createjs.LoadQueue.MANIFEST
          ? this._jsonResult
          : this._tag;
      }),
      (b.cancel = function () {
        (this.canceled = !0), this._clean();
      }),
      (b.load = function () {
        var a = this._item,
          b = this._tag;
        clearTimeout(this._loadTimeout);
        var c = createjs.LoadQueue.LOAD_TIMEOUT;
        0 == c && (c = createjs.LoadQueue.loadTimeout),
          (this._loadTimeout = setTimeout(
            createjs.proxy(this._handleTimeout, this),
            c
          )),
          this._isAudio && ((b.src = null), (b.preload = "auto")),
          (b.onerror = createjs.proxy(this._handleError, this)),
          this._isAudio
            ? ((b.onstalled = createjs.proxy(this._handleStalled, this)),
              b.addEventListener("canplaythrough", this._tagCompleteProxy, !1))
            : ((b.onload = createjs.proxy(this._handleLoad, this)),
              (b.onreadystatechange = createjs.proxy(
                this._handleReadyStateChange,
                this
              )));
        var d = this.buildPath(a.src, a.values);
        switch (a.type) {
          case createjs.LoadQueue.CSS:
            b.href = d;
            break;
          case createjs.LoadQueue.SVG:
            b.data = d;
            break;
          default:
            b.src = d;
        }
        if (
          a.type == createjs.LoadQueue.JSONP ||
          a.type == createjs.LoadQueue.JSON ||
          a.type == createjs.LoadQueue.MANIFEST
        ) {
          if (null == a.callback)
            throw new Error("callback is required for loading JSONP requests.");
          if (null != window[a.callback])
            throw new Error(
              'JSONP callback "' +
                a.callback +
                '" already exists on window. You need to specify a different callback. Or re-name the current one.'
            );
          window[a.callback] = createjs.proxy(this._handleJSONPLoad, this);
        }
        (a.type == createjs.LoadQueue.SVG ||
          a.type == createjs.LoadQueue.JSONP ||
          a.type == createjs.LoadQueue.JSON ||
          a.type == createjs.LoadQueue.MANIFEST ||
          a.type == createjs.LoadQueue.JAVASCRIPT ||
          a.type == createjs.LoadQueue.CSS) &&
          ((this._startTagVisibility = b.style.visibility),
          (b.style.visibility = "hidden"),
          (
            document.body || document.getElementsByTagName("body")[0]
          ).appendChild(b)),
          null != b.load && b.load();
      }),
      (b._handleJSONPLoad = function (a) {
        this._jsonResult = a;
      }),
      (b._handleTimeout = function () {
        this._clean();
        var a = new createjs.Event("error");
        (a.text = "PRELOAD_TIMEOUT"), this._sendError(a);
      }),
      (b._handleStalled = function () {}),
      (b._handleError = function () {
        this._clean();
        var a = new createjs.Event("error");
        this._sendError(a);
      }),
      (b._handleReadyStateChange = function () {
        clearTimeout(this._loadTimeout);
        var a = this.getItem().tag;
        ("loaded" == a.readyState || "complete" == a.readyState) &&
          this._handleLoad();
      }),
      (b._handleLoad = function () {
        if (!this._isCanceled()) {
          var a = this.getItem(),
            b = a.tag;
          if (!(this.loaded || (this._isAudio && 4 !== b.readyState))) {
            switch (((this.loaded = !0), a.type)) {
              case createjs.LoadQueue.SVG:
              case createjs.LoadQueue.JSON:
              case createjs.LoadQueue.JSONP:
              case createjs.LoadQueue.MANIFEST:
              case createjs.LoadQueue.CSS:
                (b.style.visibility = this._startTagVisibility),
                  (
                    document.body || document.getElementsByTagName("body")[0]
                  ).removeChild(b);
            }
            this._clean(), this._sendComplete();
          }
        }
      }),
      (b._clean = function () {
        clearTimeout(this._loadTimeout);
        var a = this.getItem(),
          b = a.tag;
        null != b &&
          ((b.onload = null),
          b.removeEventListener &&
            b.removeEventListener("canplaythrough", this._tagCompleteProxy, !1),
          (b.onstalled = null),
          (b.onprogress = null),
          (b.onerror = null),
          null != b.parentNode &&
            a.type == createjs.LoadQueue.SVG &&
            a.type == createjs.LoadQueue.JSON &&
            a.type == createjs.LoadQueue.MANIFEST &&
            a.type == createjs.LoadQueue.CSS &&
            a.type == createjs.LoadQueue.JSONP &&
            b.parentNode.removeChild(b));
        var a = this.getItem();
        (a.type == createjs.LoadQueue.JSONP ||
          a.type == createjs.LoadQueue.MANIFEST) &&
          (window[a.callback] = null);
      }),
      (b.toString = function () {
        return "[PreloadJS TagLoader]";
      }),
      (createjs.TagLoader = a);
  })(),
  (this.createjs = this.createjs || {}),
  (function () {
    "use strict";
    var a = function (a, b) {
        this.init(a, b);
      },
      b = (a.prototype = new createjs.AbstractLoader());
    (b._request = null),
      (b._loadTimeout = null),
      (b._xhrLevel = 1),
      (b._response = null),
      (b._rawResponse = null),
      (b._crossOrigin = ""),
      (b.init = function (a, b) {
        (this._item = a), (this._crossOrigin = b), !this._createXHR(a);
      }),
      (b.getResult = function (a) {
        return a && this._rawResponse ? this._rawResponse : this._response;
      }),
      (b.cancel = function () {
        (this.canceled = !0), this._clean(), this._request.abort();
      }),
      (b.load = function () {
        if (null == this._request) return this._handleError(), void 0;
        if (
          ((this._request.onloadstart = createjs.proxy(
            this._handleLoadStart,
            this
          )),
          (this._request.onprogress = createjs.proxy(
            this._handleProgress,
            this
          )),
          (this._request.onabort = createjs.proxy(this._handleAbort, this)),
          (this._request.onerror = createjs.proxy(this._handleError, this)),
          (this._request.ontimeout = createjs.proxy(this._handleTimeout, this)),
          1 == this._xhrLevel)
        ) {
          var a = createjs.LoadQueue.LOAD_TIMEOUT;
          if (0 == a) a = createjs.LoadQueue.loadTimeout;
          else
            try {
              console.warn(
                "LoadQueue.LOAD_TIMEOUT has been deprecated in favor of LoadQueue.loadTimeout"
              );
            } catch (b) {}
          this._loadTimeout = setTimeout(
            createjs.proxy(this._handleTimeout, this),
            a
          );
        }
        (this._request.onload = createjs.proxy(this._handleLoad, this)),
          (this._request.onreadystatechange = createjs.proxy(
            this._handleReadyStateChange,
            this
          ));
        try {
          this._item.values && this._item.method != createjs.LoadQueue.GET
            ? this._item.method == createjs.LoadQueue.POST &&
              this._request.send(this._formatQueryString(this._item.values))
            : this._request.send();
        } catch (c) {
          var d = new createjs.Event("error");
          (d.error = c), this._sendError(d);
        }
      }),
      (b.getAllResponseHeaders = function () {
        return this._request.getAllResponseHeaders instanceof Function
          ? this._request.getAllResponseHeaders()
          : null;
      }),
      (b.getResponseHeader = function (a) {
        return this._request.getResponseHeader instanceof Function
          ? this._request.getResponseHeader(a)
          : null;
      }),
      (b._handleProgress = function (a) {
        if (a && !(a.loaded > 0 && 0 == a.total)) {
          var b = new createjs.Event("progress");
          (b.loaded = a.loaded), (b.total = a.total), this._sendProgress(b);
        }
      }),
      (b._handleLoadStart = function () {
        clearTimeout(this._loadTimeout), this._sendLoadStart();
      }),
      (b._handleAbort = function () {
        this._clean();
        var a = new createjs.Event("error");
        (a.text = "XHR_ABORTED"), this._sendError(a);
      }),
      (b._handleError = function () {
        this._clean();
        var a = new createjs.Event("error");
        this._sendError(a);
      }),
      (b._handleReadyStateChange = function () {
        4 == this._request.readyState && this._handleLoad();
      }),
      (b._handleLoad = function () {
        if (!this.loaded) {
          if (((this.loaded = !0), !this._checkError()))
            return this._handleError(), void 0;
          (this._response = this._getResponse()), this._clean();
          var a = this._generateTag();
          a && this._sendComplete();
        }
      }),
      (b._handleTimeout = function (a) {
        this._clean();
        var b = new createjs.Event("error");
        (b.text = "PRELOAD_TIMEOUT"), this._sendError(a);
      }),
      (b._checkError = function () {
        var a = parseInt(this._request.status);
        switch (a) {
          case 404:
          case 0:
            return !1;
        }
        return !0;
      }),
      (b._getResponse = function () {
        if (null != this._response) return this._response;
        if (null != this._request.response) return this._request.response;
        try {
          if (null != this._request.responseText)
            return this._request.responseText;
        } catch (a) {}
        try {
          if (null != this._request.responseXML)
            return this._request.responseXML;
        } catch (a) {}
        return null;
      }),
      (b._createXHR = function (a) {
        var b = this._isCrossDomain(a),
          c = null;
        if (b && window.XDomainRequest) c = new XDomainRequest();
        else if (window.XMLHttpRequest) c = new XMLHttpRequest();
        else
          try {
            c = new ActiveXObject("Msxml2.XMLHTTP.6.0");
          } catch (d) {
            try {
              c = new ActiveXObject("Msxml2.XMLHTTP.3.0");
            } catch (d) {
              try {
                c = new ActiveXObject("Msxml2.XMLHTTP");
              } catch (d) {
                return !1;
              }
            }
          }
        createjs.LoadQueue.isText(a.type) &&
          c.overrideMimeType &&
          c.overrideMimeType("text/plain; charset=utf-8"),
          (this._xhrLevel = "string" == typeof c.responseType ? 2 : 1);
        var e = null;
        return (
          (e =
            a.method == createjs.LoadQueue.GET
              ? this.buildPath(a.src, a.values)
              : a.src),
          c.open(a.method || createjs.LoadQueue.GET, e, !0),
          b &&
            c instanceof XMLHttpRequest &&
            1 == this._xhrLevel &&
            c.setRequestHeader("Origin", location.origin),
          a.values &&
            a.method == createjs.LoadQueue.POST &&
            c.setRequestHeader(
              "Content-Type",
              "application/x-www-form-urlencoded"
            ),
          createjs.LoadQueue.isBinary(a.type) &&
            (c.responseType = "arraybuffer"),
          (this._request = c),
          !0
        );
      }),
      (b._clean = function () {
        clearTimeout(this._loadTimeout);
        var a = this._request;
        (a.onloadstart = null),
          (a.onprogress = null),
          (a.onabort = null),
          (a.onerror = null),
          (a.onload = null),
          (a.ontimeout = null),
          (a.onloadend = null),
          (a.onreadystatechange = null);
      }),
      (b._generateTag = function () {
        var a = this._item.type,
          b = this._item.tag;
        switch (a) {
          case createjs.LoadQueue.IMAGE:
            return (
              (b.onload = createjs.proxy(this._handleTagReady, this)),
              "" != this._crossOrigin && (b.crossOrigin = "Anonymous"),
              (b.src = this.buildPath(this._item.src, this._item.values)),
              (this._rawResponse = this._response),
              (this._response = b),
              !1
            );
          case createjs.LoadQueue.JAVASCRIPT:
            return (
              (b = document.createElement("script")),
              (b.text = this._response),
              (this._rawResponse = this._response),
              (this._response = b),
              !0
            );
          case createjs.LoadQueue.CSS:
            var c = document.getElementsByTagName("head")[0];
            if ((c.appendChild(b), b.styleSheet))
              b.styleSheet.cssText = this._response;
            else {
              var d = document.createTextNode(this._response);
              b.appendChild(d);
            }
            return (
              (this._rawResponse = this._response), (this._response = b), !0
            );
          case createjs.LoadQueue.XML:
            var e = this._parseXML(this._response, "text/xml");
            return (
              (this._rawResponse = this._response), (this._response = e), !0
            );
          case createjs.LoadQueue.SVG:
            var e = this._parseXML(this._response, "image/svg+xml");
            return (
              (this._rawResponse = this._response),
              null != e.documentElement
                ? (b.appendChild(e.documentElement), (this._response = b))
                : (this._response = e),
              !0
            );
          case createjs.LoadQueue.JSON:
          case createjs.LoadQueue.MANIFEST:
            var f = {};
            try {
              f = JSON.parse(this._response);
            } catch (g) {
              f = g;
            }
            return (
              (this._rawResponse = this._response), (this._response = f), !0
            );
        }
        return !0;
      }),
      (b._parseXML = function (a, b) {
        var c = null;
        try {
          if (window.DOMParser) {
            var d = new DOMParser();
            c = d.parseFromString(a, b);
          } else
            (c = new ActiveXObject("Microsoft.XMLDOM")),
              (c.async = !1),
              c.loadXML(a);
        } catch (e) {}
        return c;
      }),
      (b._handleTagReady = function () {
        this._sendComplete();
      }),
      (b.toString = function () {
        return "[PreloadJS XHRLoader]";
      }),
      (createjs.XHRLoader = a);
  })(),
  "object" != typeof JSON && (JSON = {}),
  (function () {
    "use strict";
    function f(a) {
      return 10 > a ? "0" + a : a;
    }
    function quote(a) {
      return (
        (escapable.lastIndex = 0),
        escapable.test(a)
          ? '"' +
            a.replace(escapable, function (a) {
              var b = meta[a];
              return "string" == typeof b
                ? b
                : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
          : '"' + a + '"'
      );
    }
    function str(a, b) {
      var c,
        d,
        e,
        f,
        g,
        h = gap,
        i = b[a];
      switch (
        (i &&
          "object" == typeof i &&
          "function" == typeof i.toJSON &&
          (i = i.toJSON(a)),
        "function" == typeof rep && (i = rep.call(b, a, i)),
        typeof i)
      ) {
        case "string":
          return quote(i);
        case "number":
          return isFinite(i) ? String(i) : "null";
        case "boolean":
        case "null":
          return String(i);
        case "object":
          if (!i) return "null";
          if (
            ((gap += indent),
            (g = []),
            "[object Array]" === Object.prototype.toString.apply(i))
          ) {
            for (f = i.length, c = 0; f > c; c += 1) g[c] = str(c, i) || "null";
            return (
              (e =
                0 === g.length
                  ? "[]"
                  : gap
                  ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]"
                  : "[" + g.join(",") + "]"),
              (gap = h),
              e
            );
          }
          if (rep && "object" == typeof rep)
            for (f = rep.length, c = 0; f > c; c += 1)
              "string" == typeof rep[c] &&
                ((d = rep[c]),
                (e = str(d, i)),
                e && g.push(quote(d) + (gap ? ": " : ":") + e));
          else
            for (d in i)
              Object.prototype.hasOwnProperty.call(i, d) &&
                ((e = str(d, i)),
                e && g.push(quote(d) + (gap ? ": " : ":") + e));
          return (
            (e =
              0 === g.length
                ? "{}"
                : gap
                ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}"
                : "{" + g.join(",") + "}"),
            (gap = h),
            e
          );
      }
    }
    "function" != typeof Date.prototype.toJSON &&
      ((Date.prototype.toJSON = function () {
        return isFinite(this.valueOf())
          ? this.getUTCFullYear() +
              "-" +
              f(this.getUTCMonth() + 1) +
              "-" +
              f(this.getUTCDate()) +
              "T" +
              f(this.getUTCHours()) +
              ":" +
              f(this.getUTCMinutes()) +
              ":" +
              f(this.getUTCSeconds()) +
              "Z"
          : null;
      }),
      (String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON =
          function () {
            return this.valueOf();
          }));
    var cx =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable =
        /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      },
      rep;
    "function" != typeof JSON.stringify &&
      (JSON.stringify = function (a, b, c) {
        var d;
        if (((gap = ""), (indent = ""), "number" == typeof c))
          for (d = 0; c > d; d += 1) indent += " ";
        else "string" == typeof c && (indent = c);
        if (
          ((rep = b),
          b &&
            "function" != typeof b &&
            ("object" != typeof b || "number" != typeof b.length))
        )
          throw new Error("JSON.stringify");
        return str("", {
          "": a,
        });
      }),
      "function" != typeof JSON.parse &&
        (JSON.parse = function (text, reviver) {
          function walk(a, b) {
            var c,
              d,
              e = a[b];
            if (e && "object" == typeof e)
              for (c in e)
                Object.prototype.hasOwnProperty.call(e, c) &&
                  ((d = walk(e, c)), void 0 !== d ? (e[c] = d) : delete e[c]);
            return reviver.call(a, b, e);
          }
          var j;
          if (
            ((text = String(text)),
            (cx.lastIndex = 0),
            cx.test(text) &&
              (text = text.replace(cx, function (a) {
                return (
                  "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                );
              })),
            /^[\],:{}\s]*$/.test(
              text
                .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                .replace(
                  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                  "]"
                )
                .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
            ))
          )
            return (
              (j = eval("(" + text + ")")),
              "function" == typeof reviver
                ? walk(
                    {
                      "": j,
                    },
                    ""
                  )
                : j
            );
          throw new SyntaxError("JSON.parse");
        });
  })();
this.ndgmr = this.ndgmr || {};
(function () {
  var collisionCanvas = document.createElement("canvas");
  var collisionCtx = collisionCanvas.getContext("2d");
  collisionCtx.save();
  var collisionCanvas2 = document.createElement("canvas");
  var collisionCtx2 = collisionCanvas2.getContext("2d");
  collisionCtx2.save();
  var cachedBAFrames = [];
  var checkRectCollision = function (bitmap1, bitmap2) {
    var b1, b2;
    b1 = getBounds(bitmap1);
    b2 = getBounds(bitmap2);
    return calculateIntersection(b1, b2);
  };
  ndgmr.checkRectCollision = checkRectCollision;
  var checkPixelCollision = function (
    bitmap1,
    bitmap2,
    alphaThreshold,
    getRect
  ) {
    if (ndgmr.DEBUG || ndgmr.DEBUG_COLLISION) {
      document.body.appendChild(collisionCanvas);
      document.body.appendChild(collisionCanvas2);
    }
    getRect = getRect || false;
    var areObjectsCloseEnough,
      intersetion,
      imageData1,
      imageData2,
      pixelIntersection;
    areObjectsCloseEnough = _collisionDistancePrecheck(bitmap1, bitmap2);
    if (!areObjectsCloseEnough) {
      return false;
    }
    intersection = checkRectCollision(bitmap1, bitmap2);
    if (!intersection) {
      return false;
    }
    alphaThreshold = alphaThreshold || 0;
    alphaThreshold = Math.min(0.99999, alphaThreshold);
    collisionCanvas.width = intersection.width;
    collisionCanvas.height = intersection.height;
    collisionCanvas2.width = intersection.width;
    collisionCanvas2.height = intersection.height;
    imageData1 = _intersectingImagePart(intersection, bitmap1, collisionCtx, 1);
    imageData2 = _intersectingImagePart(
      intersection,
      bitmap2,
      collisionCtx2,
      2
    );
    pixelIntersection = _compareAlphaValues(
      imageData1,
      imageData2,
      intersection.width,
      intersection.height,
      alphaThreshold,
      getRect
    );
    if (pixelIntersection) {
      pixelIntersection.x += intersection.x;
      pixelIntersection.x2 += intersection.x;
      pixelIntersection.y += intersection.y;
      pixelIntersection.y2 += intersection.y;
    } else {
      return false;
    }
    return pixelIntersection;
  };
  ndgmr.checkPixelCollision = checkPixelCollision;
  var _collisionDistancePrecheck = function (bitmap1, bitmap2) {
    var ir1, ir2, b1, b2;
    b1 = bitmap1.localToGlobal(0, 0);
    b2 = bitmap2.localToGlobal(0, 0);
    ir1 =
      bitmap1 instanceof createjs.Bitmap
        ? {
            width: bitmap1.image.width,
            height: bitmap1.image.height,
          }
        : bitmap1.spriteSheet.getFrame(bitmap1.currentFrame).rect;
    ir2 =
      bitmap2 instanceof createjs.Bitmap
        ? {
            width: bitmap2.image.width,
            height: bitmap2.image.height,
          }
        : bitmap2.spriteSheet.getFrame(bitmap2.currentFrame).rect;
    return (
      Math.abs(b2.x - b1.x) <
        ir2.width * bitmap2.scaleX + ir1.width * bitmap1.scaleX &&
      Math.abs(b2.y - b1.y) <
        ir2.height * bitmap2.scaleY + ir1.height * bitmap2.scaleY
    );
  };
  var _intersectingImagePart = function (intersetion, bitmap, ctx, i) {
    var bl, image, frameName, sr;
    if (bitmap instanceof createjs.Bitmap) {
      image = bitmap.image;
    } else if (bitmap instanceof createjs.Sprite) {
      frame = bitmap.spriteSheet.getFrame(bitmap.currentFrame);
      frameName =
        frame.image.src +
        ":" +
        frame.rect.x +
        ":" +
        frame.rect.y +
        ":" +
        frame.rect.width +
        ":" +
        frame.rect.height;
      if (cachedBAFrames[frameName]) {
        image = cachedBAFrames[frameName];
      } else {
        cachedBAFrames[frameName] = image =
          createjs.SpriteSheetUtils.extractFrame(
            bitmap.spriteSheet,
            bitmap.currentFrame
          );
      }
    }
    bl = bitmap.globalToLocal(intersetion.x, intersetion.y);
    ctx.restore();
    ctx.save();
    ctx.rotate(
      _getParentalCumulatedProperty(bitmap, "rotation") * (Math.PI / 180)
    );
    ctx.scale(
      _getParentalCumulatedProperty(bitmap, "scaleX", "*"),
      _getParentalCumulatedProperty(bitmap, "scaleY", "*")
    );
    ctx.translate(
      -bl.x - intersetion["rect" + i].regX,
      -bl.y - intersetion["rect" + i].regY
    );
    if ((sr = bitmap.sourceRect) != undefined) {
      ctx.drawImage(
        image,
        sr.x,
        sr.y,
        sr.width,
        sr.height,
        0,
        0,
        sr.width,
        sr.height
      );
    } else {
      ctx.drawImage(image, 0, 0, image.width, image.height);
    }
    return ctx.getImageData(0, 0, intersetion.width, intersetion.height).data;
  };
  var _compareAlphaValues = function (
    imageData1,
    imageData2,
    width,
    height,
    alphaThreshold,
    getRect
  ) {
    var alpha1,
      alpha2,
      x,
      y,
      offset = 3,
      pixelRect = {
        x: Infinity,
        y: Infinity,
        x2: -Infinity,
        y2: -Infinity,
      };
    for (y = 0; y < height; ++y) {
      for (x = 0; x < width; ++x) {
        alpha1 = imageData1.length > offset + 1 ? imageData1[offset] / 255 : 0;
        alpha2 = imageData2.length > offset + 1 ? imageData2[offset] / 255 : 0;
        if (alpha1 > alphaThreshold && alpha2 > alphaThreshold) {
          if (getRect) {
            if (x < pixelRect.x) pixelRect.x = x;
            if (x > pixelRect.x2) pixelRect.x2 = x;
            if (y < pixelRect.y) pixelRect.y = y;
            if (y > pixelRect.y2) pixelRect.y2 = y;
          } else {
            return {
              x: x,
              y: y,
              width: 1,
              height: 1,
            };
          }
        }
        offset += 4;
      }
    }
    if (pixelRect.x != Infinity) {
      pixelRect.width = pixelRect.x2 - pixelRect.x + 1;
      pixelRect.height = pixelRect.y2 - pixelRect.y + 1;
      return pixelRect;
    }
    return null;
  };
  var _getParentalCumulatedProperty = function (child, propName, operation) {
    operation = operation || "+";
    if (child.parent && child.parent[propName]) {
      var cp = child[propName];
      var pp = _getParentalCumulatedProperty(child.parent, propName, operation);
      if (operation == "*") {
        return cp * pp;
      } else {
        return cp + pp;
      }
    }
    return child[propName];
  };
  var calculateIntersection = function (rect1, rect2) {
    var dx,
      dy,
      r1 = {},
      r2 = {};
    r1.cx = rect1.x + (r1.hw = rect1.width / 2);
    r1.cy = rect1.y + (r1.hh = rect1.height / 2);
    r2.cx = rect2.x + (r2.hw = rect2.width / 2);
    r2.cy = rect2.y + (r2.hh = rect2.height / 2);
    dx = Math.abs(r1.cx - r2.cx) - (r1.hw + r2.hw);
    dy = Math.abs(r1.cy - r2.cy) - (r1.hh + r2.hh);
    if (dx < 0 && dy < 0) {
      dx = Math.min(Math.min(rect1.width, rect2.width), -dx);
      dy = Math.min(Math.min(rect1.height, rect2.height), -dy);
      return {
        x: Math.max(rect1.x, rect2.x),
        y: Math.max(rect1.y, rect2.y),
        width: dx,
        height: dy,
        rect1: rect1,
        rect2: rect2,
      };
    } else {
      return null;
    }
  };
  ndgmr.calculateIntersection = calculateIntersection;
  var getBounds = function (obj) {
    var bounds = {
      x: Infinity,
      y: Infinity,
      width: 0,
      height: 0,
    };
    if (obj instanceof createjs.Container) {
      bounds.x2 = -Infinity;
      bounds.y2 = -Infinity;
      var children = obj.children,
        l = children.length,
        cbounds,
        c;
      for (c = 0; c < l; c++) {
        cbounds = getBounds(children[c]);
        if (cbounds.x < bounds.x) bounds.x = cbounds.x;
        if (cbounds.y < bounds.y) bounds.y = cbounds.y;
        if (cbounds.x + cbounds.width > bounds.x2)
          bounds.x2 = cbounds.x + cbounds.width;
        if (cbounds.y + cbounds.height > bounds.y2)
          bounds.y2 = cbounds.y + cbounds.height;
      }
      if (bounds.x == Infinity) bounds.x = 0;
      if (bounds.y == Infinity) bounds.y = 0;
      if (bounds.x2 == Infinity) bounds.x2 = 0;
      if (bounds.y2 == Infinity) bounds.y2 = 0;
      bounds.width = bounds.x2 - bounds.x;
      bounds.height = bounds.y2 - bounds.y;
      delete bounds.x2;
      delete bounds.y2;
    } else {
      var gp,
        gp2,
        gp3,
        gp4,
        imgr = {},
        sr;
      if (obj instanceof createjs.Bitmap) {
        sr = obj.sourceRect || obj.image;
        imgr.width = sr.width;
        imgr.height = sr.height;
      } else if (obj instanceof createjs.Sprite) {
        if (
          obj.spriteSheet._frames &&
          obj.spriteSheet._frames[obj.currentFrame] &&
          obj.spriteSheet._frames[obj.currentFrame].image
        ) {
          var cframe = obj.spriteSheet.getFrame(obj.currentFrame);
          imgr.width = cframe.rect.width;
          imgr.height = cframe.rect.height;
          imgr.regX = cframe.regX;
          imgr.regY = cframe.regY;
        } else {
          bounds.x = obj.x || 0;
          bounds.y = obj.y || 0;
        }
      } else {
        bounds.x = obj.x || 0;
        bounds.y = obj.y || 0;
      }
      imgr.regX = imgr.regX || 0;
      imgr.width = imgr.width || 0;
      imgr.regY = imgr.regY || 0;
      imgr.height = imgr.height || 0;
      bounds.regX = imgr.regX;
      bounds.regY = imgr.regY;
      gp = obj.localToGlobal(0 - imgr.regX, 0 - imgr.regY);
      gp2 = obj.localToGlobal(imgr.width - imgr.regX, imgr.height - imgr.regY);
      gp3 = obj.localToGlobal(imgr.width - imgr.regX, 0 - imgr.regY);
      gp4 = obj.localToGlobal(0 - imgr.regX, imgr.height - imgr.regY);
      bounds.x = Math.min(Math.min(Math.min(gp.x, gp2.x), gp3.x), gp4.x);
      bounds.y = Math.min(Math.min(Math.min(gp.y, gp2.y), gp3.y), gp4.y);
      bounds.width =
        Math.max(Math.max(Math.max(gp.x, gp2.x), gp3.x), gp4.x) - bounds.x;
      bounds.height =
        Math.max(Math.max(Math.max(gp.y, gp2.y), gp3.y), gp4.y) - bounds.y;
    }
    return bounds;
  };
  ndgmr.getBounds = getBounds;
})();
var stage,
  w,
  h,
  loader,
  pipe1height,
  pipe2height,
  pipe3height,
  startX,
  startY,
  wiggleDelta,
  topFill;
var background,
  bird,
  ground,
  pipe,
  bottomPipe,
  pipes,
  rotationDelta,
  counter,
  counterOutline,
  highScore,
  highScoreOutline;
var started = false;
var startJump = false;
var jumpAmount = 120;
var jumpTime = 266;
var dead = false;
var KEYCODE_SPACE = 32;
var gap = 250;
var masterPipeDelay = 1.5;
var pipeDelay = masterPipeDelay;
var restartable = false;
var rd = 0;
var token;
var counterShow = false;
function init() {
  document.onkeydown = handleKeyDown;
  stage = new createjs.Stage("testCanvas");
  createjs.Touch.enable(stage);
  w = stage.canvas.width;
  h = stage.canvas.height;
  manifest = [
    {
      src: "img/bird.png",
      id: "bird",
    },
    {
      src: "img/background.png",
      id: "background",
    },
    {
      src: "img/ground.png",
      id: "ground",
    },
    {
      src: "img/pipe.png",
      id: "pipe",
    },
    {
      src: "img/restart.png",
      id: "start",
    },
    {
      src: "img/score.png",
      id: "score",
    },
    {
      src: "img/share.png",
      id: "share",
    },
    {
      src: "img/add-to-leaderboard.png",
      id: "leaderboard",
    },
    {
      src: "fonts/FB.eot",
    },
    {
      src: "fonts/FB.svg",
    },
    {
      src: "fonts/FB.ttf",
    },
    {
      src: "fonts/FB.woff",
    },
  ];
  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest);
}
function handleComplete() {
  background = new createjs.Shape();
  background.graphics
    .beginBitmapFill(loader.getResult("background"))
    .drawRect(0, 0, w, h);
  background.y = 0 + outerPadding;
  var groundImg = loader.getResult("ground");
  ground = new createjs.Shape();
  ground.graphics
    .beginBitmapFill(groundImg)
    .drawRect(0, 0, w + groundImg.width, groundImg.height);
  ground.tileW = groundImg.width;
  ground.y = h - groundImg.height - outerPadding;
  var data = new createjs.SpriteSheet({
    images: [loader.getResult("bird")],
    frames: {
      width: 92,
      height: 64,
      regX: 46,
      regY: 32,
      count: 3,
    },
    animations: {
      fly: [0, 2, "fly", 0.21],
      dive: [1, 1, "dive", 1],
    },
  });
  bird = new createjs.Sprite(data, "fly");
  startX = w / 2 - 92 / 2;
  startY = 512 + outerPadding;
  wiggleDelta = 18;
  bird.setTransform(startX, startY, 1, 1);
  bird.framerate = 30;
  createjs.Tween.get(bird, {
    loop: true,
  })
    .to(
      {
        y: startY + wiggleDelta,
      },
      380,
      createjs.Ease.sineInOut
    )
    .to(
      {
        y: startY,
      },
      380,
      createjs.Ease.sineInOut
    );
  stage.addChild(background);
  topFill = new createjs.Graphics();
  topFill.beginFill("#70c5ce").rect(0, 0, w, outerPadding);
  topFill = new createjs.Shape(topFill);
  stage.addChild(topFill);
  pipes = new createjs.Container();
  stage.addChild(pipes);
  stage.addChild(bird, ground);
  stage.addEventListener("stagemousedown", handleJumpStart);
  bottomFill = new createjs.Graphics();
  bottomFill.beginFill("#ded895").rect(0, h - outerPadding, w, outerPadding);
  bottomFill = new createjs.Shape(bottomFill);
  stage.addChild(bottomFill);
  counter = createText(false, "#ffffff", 1, "86px");
  counterOutline = createText(true, "#000000", 1, "86px");
  highScore = createText(false, "#ffffff", 0, "60px");
  highScoreOutline = createText(true, "#000000", 0, "60px");
  stage.addChild(counter, counterOutline);
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.setInterval(100);
  createjs.Ticker.addEventListener("tick", tick);
  if (supports_html5_storage()) {
    var storage = localStorage.getItem("highScore");
    if (storage) {
      highScore.text = storage;
      highScoreOutline.text = storage;
    } else {
      localStorage.setItem("highScore", 0);
    }
  } else {
    var myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)highScore\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (myCookie) {
      highScore.text = myCookie;
      highScoreOutline.text = myCookie;
    } else {
      document.cookie = "highScore=0";
    }
  }
}
function handleKeyDown(e) {
  if (!e) {
    var e = window.event;
  }
  if (e.keyCode == KEYCODE_SPACE) {
    spacebar();
    return false;
  }
}
function spacebar() {
  handleJumpStart();
  if (dead && restartable) {
    restart();
    restartable = false;
  }
  return false;
}
function handleJumpStart() {
  if (!dead) {
    createjs.Tween.removeTweens(bird);
    bird.gotoAndPlay("fly");
    if (bird.y < -200) {
      bird.y = -200;
    }
    if (bird.roation < 0) {
      rotationDelta = (-bird.rotation - 20) / 5;
    } else {
      rotationDelta = (bird.rotation + 20) / 5;
    }
    createjs.Tween.get(bird)
      .to(
        {
          y: bird.y - rotationDelta,
          rotation: -20,
        },
        rotationDelta,
        createjs.Ease.linear
      )
      .to(
        {
          y: bird.y - jumpAmount,
          rotation: -20,
        },
        jumpTime - rotationDelta,
        createjs.Ease.quadOut
      )
      .to(
        {
          y: bird.y,
        },
        jumpTime,
        createjs.Ease.quadIn
      )
      .to(
        {
          y: bird.y + 200,
          rotation: 90,
        },
        380 / 1.5,
        createjs.Ease.linear
      )
      .call(diveBird)
      .to(
        {
          y: ground.y - 30,
        },
        (h - (bird.y + 200)) / 1.5,
        createjs.Ease.linear
      );
    if (!started) {
      token = undefined;
      getNewScore(function (tk) {
        token = tk;
        console.log(tk);
      });
      started = true;
      counterShow = true;
      bird.framerate = 60;
    }
  }
}
function diveBird() {
  bird.gotoAndPlay("dive");
}
function restart() {
  $("canvas").trigger("gameRestart");
  pipes.removeAllChildren();
  createjs.Tween.get(start)
    .to(
      {
        y: start.y + 10,
      },
      50
    )
    .call(removeStart);
  counter.text = 0;
  counterOutline.text = 0;
  counterOutline.alpha = 0;
  counter.alpha = 0;
  counter.font = "86px 'Flappy Bird'";
  counterOutline.font = counter.font;
  counter.y = 150 + outerPadding;
  counterOutline.y = counter.y;
  counterShow = false;
  highScore.alpha = 0;
  highScoreOutline.alpha = 0;
  pipeDelay = masterPipeDelay;
  dead = false;
  started = false;
  startJump = false;
  createjs.Tween.removeTweens(bird);
  bird.x = startX;
  bird.y = startY;
  bird.rotation = 0;
  rd = 0;
  createjs.Tween.get(bird, {
    loop: true,
  })
    .to(
      {
        y: startY + wiggleDelta,
      },
      380,
      createjs.Ease.sineInOut
    )
    .to(
      {
        y: startY,
      },
      380,
      createjs.Ease.sineInOut
    );
}
function die() {
  $("canvas").trigger("gameEnd");
  dead = true;
  bird.gotoAndPlay("dive");
  ga("send", "event", "Flappy Bird", "Score", counter.text, counter.text);
  if (counter.text > highScore.text) {
    highScore.text = counter.text;
    highScoreOutline.text = counterOutline.text;
    if (supports_html5_storage()) {
      localStorage.setItem("highScore", counter.text);
    } else {
      document.cookie = "highScore=" + counter.text;
    }
  }
  createjs.Tween.removeTweens(bird);
  createjs.Tween.get(bird)
    .wait(0)
    .to(
      {
        y: bird.y + 200,
        rotation: 90,
      },
      380 / 1.5,
      createjs.Ease.linear
    )
    .call(diveBird)
    .to(
      {
        y: ground.y - 30,
      },
      (h - (bird.y + 200)) / 1.5,
      createjs.Ease.linear
    );
  createjs.Tween.get(stage)
    .to(
      {
        alpha: 0,
      },
      100
    )
    .to(
      {
        alpha: 1,
      },
      100
    );
  score = addImageAtCenter("score", 0, -150);
  start = addImageAtCenter("start", -120, 50);
  share = addImageAtCenter("share", 120, 50);
  leaderboard = addImageAtCenter("leaderboard", 0, 150);
  stage.removeChild(counter, counterOutline);
  stage.addChild(score);
  stage.addChild(start);
  stage.addChild(share);
  stage.addChild(leaderboard);
  counter.y = counter.y + 160;
  counter.font = "60px 'Flappy Bird'";
  counterOutline.y = counter.y;
  counterOutline.font = "60px 'Flappy Bird'";
  counter.alpha = 0;
  counterOutline.alpha = 0;
  highScore.y = counter.y + 80;
  highScoreOutline.y = highScore.y;
  stage.addChild(counter, counterOutline, highScore, highScoreOutline);
  dropIn(score);
  dropIn(start);
  dropIn(leaderboard);
  dropIn(counter);
  dropIn(counterOutline);
  dropIn(highScore);
  dropIn(highScoreOutline);
  createjs.Tween.get(share)
    .to(
      {
        alpha: 1,
        y: share.y + 50,
      },
      400,
      createjs.Ease.sineIn
    )
    .call(addClickToStart);
}
function removeStart() {
  stage.removeChild(start);
  stage.removeChild(share);
  stage.removeChild(score);
  stage.removeChild(leaderboard);
}
function addClickToStart(item) {
  start.addEventListener("click", restart);
  share.addEventListener("click", goShare);
  leaderboard.addEventListener("click", function () {
    submitScore(token);
  });
  restartable = true;
}
function dropIn(item) {
  createjs.Tween.get(item).to(
    {
      alpha: 1,
      y: item.y + 50,
    },
    400,
    createjs.Ease.sineIn
  );
}
function addImageAtCenter(id, xOffset, yOffset) {
  var image = new createjs.Bitmap(loader.getResult(id));
  image.alpha = 0;
  image.x = w / 2 - image.image.width / 2 + xOffset;
  image.y = h / 2 - image.image.height / 2 + yOffset;
  return image;
}
function createText(isOutline, color, alpha, fontSize) {
  var text = new createjs.Text(0, fontSize + " 'Flappy Bird'", color);
  if (isOutline) {
    text.outline = 5;
  }
  text.color = color;
  text.textAlign = "center";
  text.x = w / 2;
  text.y = 150 + outerPadding;
  text.alpha = alpha;
  return text;
}
function goShare() {
  var countText;
  if (counter.text == 1) {
    countText = "1 point";
  } else {
    countText = counter.text + " points";
  }
  window.open(
    "http://twitter.com/share?url=http%3A%2F%2Fflappybird.io&text=I scored " +
      countText +
      " on HTML5 Flappy Bird."
  );
}
function supports_html5_storage() {
  try {
    localStorage.setItem("test", "foo");
    return "localStorage" in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
}
function tick(event) {
  var deltaS = event.delta / 1000;
  var l = pipes.getNumChildren();
  if (bird.y > ground.y - 40) {
    if (!dead) {
      die();
    }
    if (bird.y > ground.y - 30) {
      createjs.Tween.removeTweens(bird);
    }
  }
  if (!dead) {
    ground.x = (ground.x - deltaS * 300) % ground.tileW;
  }
  if (started && !dead) {
    rd = rd + deltaS;
    if (pipeDelay < 0) {
      pipe = new createjs.Bitmap(loader.getResult("pipe"));
      pipe.x = w + 600;
      pipe.y = (ground.y - gap * 2) * Math.random() + gap * 1.5;
      pipes.addChild(pipe);
      pipe2 = new createjs.Bitmap(loader.getResult("pipe"));
      pipe2.scaleX = -1;
      pipe2.rotation = 180;
      pipe2.x = pipe.x;
      pipe2.y = pipe.y - gap;
      pipes.addChild(pipe2);
      pipeDelay = masterPipeDelay;
    } else {
      pipeDelay = pipeDelay - 1 * deltaS;
    }
    for (var i = 0; i < l; i++) {
      pipe = pipes.getChildAt(i);
      if (pipe) {
        if (true) {
          var collision = ndgmr.checkRectCollision(pipe, bird, 1, true);
          if (collision) {
            if (collision.width > 8 && collision.height > 8) {
              die();
            }
          }
        }
        pipe.x = pipe.x - deltaS * 300;
        if (pipe.x <= 338 && pipe.rotation === 0 && pipe.name != "counted") {
          pipe.name = "counted";
          counter.text = counter.text + 1;
          counterOutline.text = counterOutline.text + 1;
        }
        if (pipe.x + pipe.image.width <= -pipe.w) {
          pipes.removeChild(pipe);
        }
      }
    }
    if (counterShow) {
      counter.alpha = 1;
      counterOutline.alpha = 1;
      counterShow = false;
    }
  }
  stage.update(event);
}
var apiUrl = "flappy-backend.fly.dev";
var rootUrl = "flappybird.io";
function retreiveScore() {
  var hash = location.hash.substring(1);
  $.get(
    "https://" + apiUrl + "/scores/" + hash,
    {},
    function (data) {
      $(".score").html(data.count);
    },
    "json"
  );
}
function submitScore(token) {
  ga(
    "send",
    "event",
    "Flappy Bird",
    "Score Time",
    counter.text + " - " + rd,
    rd
  );
  $.post(
    "https://" + apiUrl + "/scores/" + token + "?count=" + counter.text,
    {},
    function (data) {
      window.location =
        "http://" + window.location.host + "/leaderboard/new/#" + token;
    },
    "json"
  );
}
function updateScore(name) {
  var hash = location.hash.substring(1);
  $.ajax({
    type: "post",
    url: "https://" + apiUrl + "/scores/" + hash + "?name=" + name,
    success: function (data) {
      console.log(data);
      if (data.msg === "ok") {
        $(".error").hide();
        window.location = "http://" + window.location.host + "/leaderboard/";
      } else {
        $(".error").show().text(data.msg);
        ga("send", "event", "Flappy Bird", "Name", name);
      }
    },
    error: function (data) {
      $(".error").show().text(data.responseJSON.msg);
    },
  });
}
function getNewScore(cb) {
  $.post("https://" + apiUrl + "/scores", {}, function (data) {
    cb(data.token);
  });
}
init();