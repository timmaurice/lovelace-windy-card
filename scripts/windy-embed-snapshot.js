function e() {
  e = function (e, t) {
    return new i(e, void 0, t);
  };
  var t = RegExp.prototype,
    n = new WeakMap();
  function i(e, t, r) {
    var o = new RegExp(e, t);
    return (n.set(o, r || n.get(e)), l(o, i.prototype));
  }
  function r(e, t) {
    var i = n.get(t);
    return Object.keys(i).reduce(function (t, n) {
      var r = i[n];
      if ('number' == typeof r) t[n] = e[r];
      else {
        for (var o = 0; void 0 === e[r[o]] && o + 1 < r.length; ) o++;
        t[n] = e[r[o]];
      }
      return t;
    }, Object.create(null));
  }
  return (
    s(i, RegExp),
    (i.prototype.exec = function (e) {
      var n = t.exec.call(this, e);
      if (n) {
        n.groups = r(n, this);
        var i = n.indices;
        i && (i.groups = r(i, this));
      }
      return n;
    }),
    (i.prototype[Symbol.replace] = function (e, i) {
      if ('string' == typeof i) {
        var o = n.get(this);
        return t[Symbol.replace].call(
          this,
          e,
          i.replace(/\$<([^>]+)>/g, function (e, t) {
            var n = o[t];
            return '$' + (Array.isArray(n) ? n.join('$') : n);
          }),
        );
      }
      if ('function' == typeof i) {
        var a = this;
        return t[Symbol.replace].call(this, e, function () {
          var e = arguments;
          return ('object' != P(e[e.length - 1]) && (e = [].slice.call(e)).push(r(e, a)), i.apply(this, e));
        });
      }
      return t[Symbol.replace].call(this, e, i);
    }),
    e.apply(this, arguments)
  );
}
function t() {
  return (
    (t =
      'undefined' != typeof Reflect && Reflect.get
        ? Reflect.get.bind()
        : function (e, t, n) {
            var i = (function (e, t) {
              for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = f(e)); );
              return e;
            })(e, t);
            if (i) {
              var r = Object.getOwnPropertyDescriptor(i, t);
              return r.get ? r.get.call(arguments.length < 3 ? e : n) : r.value;
            }
          }),
    t.apply(this, arguments)
  );
}
function n() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ n =
    function () {
      return t;
    };
  var e,
    t = {},
    i = Object.prototype,
    r = i.hasOwnProperty,
    o =
      Object.defineProperty ||
      function (e, t, n) {
        e[t] = n.value;
      },
    a = 'function' == typeof Symbol ? Symbol : {},
    s = a.iterator || '@@iterator',
    l = a.asyncIterator || '@@asyncIterator',
    c = a.toStringTag || '@@toStringTag';
  function u(e, t, n) {
    return (Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }), e[t]);
  }
  try {
    u({}, '');
  } catch (e) {
    u = function (e, t, n) {
      return (e[t] = n);
    };
  }
  function d(e, t, n, i) {
    var r = t && t.prototype instanceof y ? t : y,
      a = Object.create(r.prototype),
      s = new R(i || []);
    return (o(a, '_invoke', { value: C(e, n, s) }), a);
  }
  function h(e, t, n) {
    try {
      return { type: 'normal', arg: e.call(t, n) };
    } catch (e) {
      return { type: 'throw', arg: e };
    }
  }
  t.wrap = d;
  var f = 'suspendedStart',
    m = 'suspendedYield',
    p = 'executing',
    v = 'completed',
    g = {};
  function y() {}
  function w() {}
  function b() {}
  var T = {};
  u(T, s, function () {
    return this;
  });
  var E = Object.getPrototypeOf,
    S = E && E(E(x([])));
  S && S !== i && r.call(S, s) && (T = S);
  var _ = (b.prototype = y.prototype = Object.create(T));
  function A(e) {
    ['next', 'throw', 'return'].forEach(function (t) {
      u(e, t, function (e) {
        return this._invoke(t, e);
      });
    });
  }
  function k(e, t) {
    function n(i, o, a, s) {
      var l = h(e[i], e, o);
      if ('throw' !== l.type) {
        var c = l.arg,
          u = c.value;
        return u && 'object' == P(u) && r.call(u, '__await')
          ? t.resolve(u.__await).then(
              function (e) {
                n('next', e, a, s);
              },
              function (e) {
                n('throw', e, a, s);
              },
            )
          : t.resolve(u).then(
              function (e) {
                ((c.value = e), a(c));
              },
              function (e) {
                return n('throw', e, a, s);
              },
            );
      }
      s(l.arg);
    }
    var i;
    o(this, '_invoke', {
      value: function (e, r) {
        function o() {
          return new t(function (t, i) {
            n(e, r, t, i);
          });
        }
        return (i = i ? i.then(o, o) : o());
      },
    });
  }
  function C(t, n, i) {
    var r = f;
    return function (o, a) {
      if (r === p) throw new Error('Generator is already running');
      if (r === v) {
        if ('throw' === o) throw a;
        return { value: e, done: !0 };
      }
      for (i.method = o, i.arg = a; ; ) {
        var s = i.delegate;
        if (s) {
          var l = O(s, i);
          if (l) {
            if (l === g) continue;
            return l;
          }
        }
        if ('next' === i.method) i.sent = i._sent = i.arg;
        else if ('throw' === i.method) {
          if (r === f) throw ((r = v), i.arg);
          i.dispatchException(i.arg);
        } else 'return' === i.method && i.abrupt('return', i.arg);
        r = p;
        var c = h(t, n, i);
        if ('normal' === c.type) {
          if (((r = i.done ? v : m), c.arg === g)) continue;
          return { value: c.arg, done: i.done };
        }
        'throw' === c.type && ((r = v), (i.method = 'throw'), (i.arg = c.arg));
      }
    };
  }
  function O(t, n) {
    var i = n.method,
      r = t.iterator[i];
    if (r === e)
      return (
        (n.delegate = null),
        ('throw' === i && t.iterator.return && ((n.method = 'return'), (n.arg = e), O(t, n), 'throw' === n.method)) ||
          ('return' !== i &&
            ((n.method = 'throw'), (n.arg = new TypeError("The iterator does not provide a '" + i + "' method")))),
        g
      );
    var o = h(r, t.iterator, n.arg);
    if ('throw' === o.type) return ((n.method = 'throw'), (n.arg = o.arg), (n.delegate = null), g);
    var a = o.arg;
    return a
      ? a.done
        ? ((n[t.resultName] = a.value),
          (n.next = t.nextLoc),
          'return' !== n.method && ((n.method = 'next'), (n.arg = e)),
          (n.delegate = null),
          g)
        : a
      : ((n.method = 'throw'), (n.arg = new TypeError('iterator result is not an object')), (n.delegate = null), g);
  }
  function L(e) {
    var t = { tryLoc: e[0] };
    (1 in e && (t.catchLoc = e[1]), 2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])), this.tryEntries.push(t));
  }
  function I(e) {
    var t = e.completion || {};
    ((t.type = 'normal'), delete t.arg, (e.completion = t));
  }
  function R(e) {
    ((this.tryEntries = [{ tryLoc: 'root' }]), e.forEach(L, this), this.reset(!0));
  }
  function x(t) {
    if (t || '' === t) {
      var n = t[s];
      if (n) return n.call(t);
      if ('function' == typeof t.next) return t;
      if (!isNaN(t.length)) {
        var i = -1,
          o = function n() {
            for (; ++i < t.length; ) if (r.call(t, i)) return ((n.value = t[i]), (n.done = !1), n);
            return ((n.value = e), (n.done = !0), n);
          };
        return (o.next = o);
      }
    }
    throw new TypeError(P(t) + ' is not iterable');
  }
  return (
    (w.prototype = b),
    o(_, 'constructor', { value: b, configurable: !0 }),
    o(b, 'constructor', { value: w, configurable: !0 }),
    (w.displayName = u(b, c, 'GeneratorFunction')),
    (t.isGeneratorFunction = function (e) {
      var t = 'function' == typeof e && e.constructor;
      return !!t && (t === w || 'GeneratorFunction' === (t.displayName || t.name));
    }),
    (t.mark = function (e) {
      return (
        Object.setPrototypeOf ? Object.setPrototypeOf(e, b) : ((e.__proto__ = b), u(e, c, 'GeneratorFunction')),
        (e.prototype = Object.create(_)),
        e
      );
    }),
    (t.awrap = function (e) {
      return { __await: e };
    }),
    A(k.prototype),
    u(k.prototype, l, function () {
      return this;
    }),
    (t.AsyncIterator = k),
    (t.async = function (e, n, i, r, o) {
      void 0 === o && (o = Promise);
      var a = new k(d(e, n, i, r), o);
      return t.isGeneratorFunction(n)
        ? a
        : a.next().then(function (e) {
            return e.done ? e.value : a.next();
          });
    }),
    A(_),
    u(_, c, 'Generator'),
    u(_, s, function () {
      return this;
    }),
    u(_, 'toString', function () {
      return '[object Generator]';
    }),
    (t.keys = function (e) {
      var t = Object(e),
        n = [];
      for (var i in t) n.push(i);
      return (
        n.reverse(),
        function e() {
          for (; n.length; ) {
            var i = n.pop();
            if (i in t) return ((e.value = i), (e.done = !1), e);
          }
          return ((e.done = !0), e);
        }
      );
    }),
    (t.values = x),
    (R.prototype = {
      constructor: R,
      reset: function (t) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = e),
          (this.done = !1),
          (this.delegate = null),
          (this.method = 'next'),
          (this.arg = e),
          this.tryEntries.forEach(I),
          !t)
        )
          for (var n in this) 't' === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = e);
      },
      stop: function () {
        this.done = !0;
        var e = this.tryEntries[0].completion;
        if ('throw' === e.type) throw e.arg;
        return this.rval;
      },
      dispatchException: function (t) {
        if (this.done) throw t;
        var n = this;
        function i(i, r) {
          return ((s.type = 'throw'), (s.arg = t), (n.next = i), r && ((n.method = 'next'), (n.arg = e)), !!r);
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var a = this.tryEntries[o],
            s = a.completion;
          if ('root' === a.tryLoc) return i('end');
          if (a.tryLoc <= this.prev) {
            var l = r.call(a, 'catchLoc'),
              c = r.call(a, 'finallyLoc');
            if (l && c) {
              if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
              if (this.prev < a.finallyLoc) return i(a.finallyLoc);
            } else if (l) {
              if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
            } else {
              if (!c) throw new Error('try statement without catch or finally');
              if (this.prev < a.finallyLoc) return i(a.finallyLoc);
            }
          }
        }
      },
      abrupt: function (e, t) {
        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
          var i = this.tryEntries[n];
          if (i.tryLoc <= this.prev && r.call(i, 'finallyLoc') && this.prev < i.finallyLoc) {
            var o = i;
            break;
          }
        }
        o && ('break' === e || 'continue' === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
        var a = o ? o.completion : {};
        return (
          (a.type = e),
          (a.arg = t),
          o ? ((this.method = 'next'), (this.next = o.finallyLoc), g) : this.complete(a)
        );
      },
      complete: function (e, t) {
        if ('throw' === e.type) throw e.arg;
        return (
          'break' === e.type || 'continue' === e.type
            ? (this.next = e.arg)
            : 'return' === e.type
              ? ((this.rval = this.arg = e.arg), (this.method = 'return'), (this.next = 'end'))
              : 'normal' === e.type && t && (this.next = t),
          g
        );
      },
      finish: function (e) {
        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
          var n = this.tryEntries[t];
          if (n.finallyLoc === e) return (this.complete(n.completion, n.afterLoc), I(n), g);
        }
      },
      catch: function (e) {
        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
          var n = this.tryEntries[t];
          if (n.tryLoc === e) {
            var i = n.completion;
            if ('throw' === i.type) {
              var r = i.arg;
              I(n);
            }
            return r;
          }
        }
        throw new Error('illegal catch attempt');
      },
      delegateYield: function (t, n, i) {
        return (
          (this.delegate = { iterator: x(t), resultName: n, nextLoc: i }),
          'next' === this.method && (this.arg = e),
          g
        );
      },
    }),
    t
  );
}
function i(e, t, n, i, r, o, a) {
  try {
    var s = e[o](a),
      l = s.value;
  } catch (e) {
    return void n(e);
  }
  s.done ? t(l) : Promise.resolve(l).then(i, r);
}
function r(e) {
  return function () {
    var t = this,
      n = arguments;
    return new Promise(function (r, o) {
      var a = e.apply(t, n);
      function s(e) {
        i(a, r, o, s, l, 'next', e);
      }
      function l(e) {
        i(a, r, o, s, l, 'throw', e);
      }
      s(void 0);
    });
  };
}
function o(e) {
  var t = 'function' == typeof Map ? new Map() : void 0;
  return (
    (o = function (e) {
      if (null === e || ((n = e), -1 === Function.toString.call(n).indexOf('[native code]'))) return e;
      var n;
      if ('function' != typeof e) throw new TypeError('Super expression must either be null or a function');
      if (void 0 !== t) {
        if (t.has(e)) return t.get(e);
        t.set(e, i);
      }
      function i() {
        return a(e, arguments, f(this).constructor);
      }
      return (
        (i.prototype = Object.create(e.prototype, {
          constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 },
        })),
        l(i, e)
      );
    }),
    o(e)
  );
}
function a(e, t, n) {
  return (
    (a = h()
      ? Reflect.construct.bind()
      : function (e, t, n) {
          var i = [null];
          i.push.apply(i, t);
          var r = new (Function.bind.apply(e, i))();
          return (n && l(r, n.prototype), r);
        }),
    a.apply(null, arguments)
  );
}
function s(e, t) {
  if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function');
  ((e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } })),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    t && l(e, t));
}
function l(e, t) {
  return (
    (l = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (e, t) {
          return ((e.__proto__ = t), e);
        }),
    l(e, t)
  );
}
function c(e) {
  var t = h();
  return function () {
    var n,
      i = f(e);
    if (t) {
      var r = f(this).constructor;
      n = Reflect.construct(i, arguments, r);
    } else n = i.apply(this, arguments);
    return u(this, n);
  };
}
function u(e, t) {
  if (t && ('object' === P(t) || 'function' == typeof t)) return t;
  if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
  return d(e);
}
function d(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function h() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ('function' == typeof Proxy) return !0;
  try {
    return (Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0);
  } catch (e) {
    return !1;
  }
}
function f(e) {
  return (
    (f = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        }),
    f(e)
  );
}
function m(e, t) {
  if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
}
function p(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    ((i.enumerable = i.enumerable || !1),
      (i.configurable = !0),
      'value' in i && (i.writable = !0),
      Object.defineProperty(e, A(i.key), i));
  }
}
function v(e, t, n) {
  return (t && p(e.prototype, t), n && p(e, n), Object.defineProperty(e, 'prototype', { writable: !1 }), e);
}
function g(e) {
  return (
    (function (e) {
      if (Array.isArray(e)) return T(e);
    })(e) ||
    (function (e) {
      if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator']) return Array.from(e);
    })(e) ||
    b(e) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    })()
  );
}
function y(e, t) {
  var n = ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
  if (!n) {
    if (Array.isArray(e) || (n = b(e)) || (t && e && 'number' == typeof e.length)) {
      n && (e = n);
      var i = 0,
        r = function () {};
      return {
        s: r,
        n: function () {
          return i >= e.length ? { done: !0 } : { done: !1, value: e[i++] };
        },
        e: function (e) {
          throw e;
        },
        f: r,
      };
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    );
  }
  var o,
    a = !0,
    s = !1;
  return {
    s: function () {
      n = n.call(e);
    },
    n: function () {
      var e = n.next();
      return ((a = e.done), e);
    },
    e: function (e) {
      ((s = !0), (o = e));
    },
    f: function () {
      try {
        a || null == n.return || n.return();
      } finally {
        if (s) throw o;
      }
    },
  };
}
function w(e, t) {
  return (
    (function (e) {
      if (Array.isArray(e)) return e;
    })(e) ||
    (function (e, t) {
      var n = null == e ? null : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
      if (null != n) {
        var i,
          r,
          o,
          a,
          s = [],
          l = !0,
          c = !1;
        try {
          if (((o = (n = n.call(e)).next), 0 === t)) {
            if (Object(n) !== n) return;
            l = !1;
          } else for (; !(l = (i = o.call(n)).done) && (s.push(i.value), s.length !== t); l = !0);
        } catch (e) {
          ((c = !0), (r = e));
        } finally {
          try {
            if (!l && null != n.return && ((a = n.return()), Object(a) !== a)) return;
          } finally {
            if (c) throw r;
          }
        }
        return s;
      }
    })(e, t) ||
    b(e, t) ||
    (function () {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    })()
  );
}
function b(e, t) {
  if (e) {
    if ('string' == typeof e) return T(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    return (
      'Object' === n && e.constructor && (n = e.constructor.name),
      'Map' === n || 'Set' === n
        ? Array.from(e)
        : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          ? T(e, t)
          : void 0
    );
  }
}
function T(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
  return i;
}
function E(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    (t &&
      (i = i.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })),
      n.push.apply(n, i));
  }
  return n;
}
function S(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2
      ? E(Object(n), !0).forEach(function (t) {
          _(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : E(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
  }
  return e;
}
function _(e, t, n) {
  return (
    (t = A(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  );
}
function A(e) {
  var t = (function (e, t) {
    if ('object' !== P(e) || null === e) return e;
    var n = e[Symbol.toPrimitive];
    if (void 0 !== n) {
      var i = n.call(e, t || 'default');
      if ('object' !== P(i)) return i;
      throw new TypeError('@@toPrimitive must return a primitive value.');
    }
    return ('string' === t ? String : Number)(e);
  })(e, 'string');
  return 'symbol' === P(t) ? t : String(t);
}
function P(e) {
  return (
    (P =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
              ? 'symbol'
              : typeof e;
          }),
    P(e)
  );
}
var k = function () {
  var i,
    a,
    l = function (e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : -1 / 0,
        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1 / 0,
        r = getComputedStyle(document.documentElement).getPropertyValue(e),
        o = r ? parseInt(r.replace(/^\D*(\d+)\D*.*$/, '$1')) : 0;
      o >= n && o <= i && document.documentElement.style.setProperty(e, ' '.concat(o + t, 'px'));
    },
    h = function (e, t, n) {
      return e.classList[t ? 'add' : 'remove'](n);
    },
    p = function (e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document.body,
        i = n.className;
      e.test(i) ? (n.className = i.replace(e, t)) : n.classList.add(t);
    },
    b = Object.freeze({ __proto__: null, adjustCssValue: l, replaceClass: p, toggleClass: h }),
    T = window.navigator.userAgent,
    E = /android/i.test(T) ? 'android' : /(iPhone|iPod|iPad)/i.test(T) ? 'ios' : 'desktop',
    A = W.detectedDevice,
    k = function () {
      document.body.classList.add('platform-'.concat(E));
      var e = function () {
        return document.documentElement.style.setProperty('--vh', ''.concat(window.innerHeight / 100, 'px'));
      };
      (window.addEventListener('resize', e), window.addEventListener('orientationchange', e), e());
      var t = 'CSS' in window && 'supports' in window.CSS && window.CSS.supports('color', 'var(--fake-var)'),
        n =
          getComputedStyle &&
          !/env\(.+\)/.test(getComputedStyle(document.documentElement).getPropertyValue('--margin-top'));
      (t && n) || document.documentElement.classList.add('no-css-vars');
    };
  'complete' === document.readyState ? k() : window.addEventListener('load', k);
  var C = W.version,
    O = W.target,
    I = E,
    R = A,
    x = [
      'en',
      'zh-TW',
      'zh',
      'ja',
      'fr',
      'ko',
      'it',
      'ru',
      'nl',
      'cs',
      'tr',
      'pl',
      'sv',
      'fi',
      'ro',
      'el',
      'hu',
      'hr',
      'ca',
      'da',
      'ar',
      'fa',
      'hi',
      'ta',
      'sk',
      'uk',
      'bg',
      'he',
      'is',
      'lt',
      'et',
      'vi',
      'sl',
      'sr',
      'id',
      'th',
      'sq',
      'pt',
      'nb',
      'es',
      'de',
      'bn',
    ],
    N = 'https://ims-s.windy.com',
    M = 'https://node.windy.com',
    D = 'https://tiles-s.windy.com',
    U = 'v/'.concat(W.assets),
    F = [
      'surface',
      '100m',
      '975h',
      '950h',
      '925h',
      '900h',
      '850h',
      '800h',
      '700h',
      '600h',
      '500h',
      '400h',
      '300h',
      '250h',
      '200h',
      '150h',
      '10h',
    ],
    G = 'v2.7',
    H = [
      'radarSat',
      'radar',
      'satellite',
      'wind',
      'gust',
      'gustAccu',
      'turbulence',
      'icing',
      'rain',
      'rainAccu',
      'snowAccu',
      'snowcover',
      'ptype',
      'thunder',
      'temp',
      'dewpoint',
      'rh',
      'deg0',
      'wetbulbtemp',
      'solarpower',
      'uvindex',
      'clouds',
      'hclouds',
      'mclouds',
      'lclouds',
      'fog',
      'cloudtop',
      'cbase',
      'visibility',
      'cape',
      'ccl',
      'waves',
      'swell1',
      'swell2',
      'swell3',
      'wwaves',
      'sst',
      'currents',
      'currentsTide',
      'airQ',
      'no2',
      'pm2p5',
      'aod550',
      'gtco3',
      'tcso2',
      'go3',
      'cosc',
      'dustsm',
      'pressure',
      'efiTemp',
      'efiWind',
      'efiRain',
      'capAlerts',
      'map',
      'soilMoisture40',
      'soilMoisture100',
      'moistureAnom40',
      'moistureAnom100',
      'drought40',
      'drought100',
      'fwi',
      'dfm10h',
    ],
    z = ['next12h', 'next24h', 'next2d', 'next48h', 'next60h', 'next3d', 'next5d', 'next10d'],
    B = [
      'nems',
      'namConus',
      'namHawaii',
      'namAlaska',
      'iconEu',
      'iconD2',
      'arome',
      'aromeAntilles',
      'aromeReunion',
      'camsEu',
      'iconEuWaves',
      'hrrrAlaska',
      'hrrrConus',
      'bomAccess',
      'ukv',
    ],
    j = [
      'gfs',
      'ecmwf',
      'ecmwfAnalysis',
      'radar',
      'ecmwfWaves',
      'gfsWaves',
      'icon',
      'iconWaves',
      'capAlerts',
      'cams',
      'map',
      'efi',
      'satellite',
      'cmems',
      'drought',
      'fireDanger',
      'activeFires',
    ],
    V = ['ecmwfWaves', 'gfsWaves', 'iconWaves', 'iconEuWaves', 'cmems'],
    Y = ['cams', 'camsEu'],
    q = [
      'namConus',
      'namHawaii',
      'namAlaska',
      'iconD2',
      'iconEu',
      'iconEuWaves',
      'arome',
      'aromeAntilles',
      'aromeReunion',
      'hrrrAlaska',
      'hrrrConus',
      'bomAccess',
      'ukv',
    ],
    Z = ['gfs', 'ecmwf', 'icon', 'mblue'],
    X = [].concat(j, B, Y, ['mblue']),
    J = [].concat(Z, q),
    Q = /(googlebot|bingbot|baiduspider|slurp|yandexbot)/i.test(navigator.userAgent),
    K = 'mobile' === R,
    $ = 'tablet' === R,
    ee = 'mobile' === R || 'tablet' === R,
    te = Boolean(window.devicePixelRatio && window.devicePixelRatio > 1),
    ne =
      null !== (i = W.embed) && void 0 !== i && i.queryString.lang
        ? W.embed.queryString.lang
        : (navigator.languages ? navigator.languages[0] : navigator.language) || 'en',
    ie = {
      '10h': ['10hPa', '30km FL980'],
      '150h': ['150hPa', '13.5km FL450'],
      '200h': ['200hPa', '11.7km FL390'],
      '250h': ['250hPa', '10km FL340'],
      '300h': ['300hPa', '9000m FL300'],
      '400h': ['400hPa', '7000m FL240'],
      '500h': ['500hPa', '5500m FL180'],
      '600h': ['600hPa', '4200m FL140'],
      '700h': ['700hPa', '3000m FL100'],
      '800h': ['800hPa', '2000m 6400ft'],
      '850h': ['850hPa', '1500m 5000ft'],
      '900h': ['900hPa', '900m 3000ft'],
      '925h': ['925hPa', '750m 2500ft'],
      '950h': ['950hPa', '600m 2000ft'],
      '975h': ['975hPa', '300m 1000ft'],
      '100m': ['100m', '330ft'],
      surface: ['', ''],
    },
    re = {
      favs: ['POI_FAVS', 'k'],
      cities: ['POI_FCST', '&'],
      wind: ['POI_WIND', ''],
      temp: ['POI_TEMP', ''],
      precip: ['POI_PRECIP', 'H'],
      metars: ['POI_AD', 'Q'],
      cams: ['POI_CAMS', 'l'],
      pgspots: ['POI_PG', ''],
      kitespots: ['POI_KITE', ''],
      surfspots: ['POI_SURF', '{'],
      tide: ['POI_TIDE', 'q'],
      radiation: ['POI_RADIATION', ''],
      firespots: ['ACTIVE_FIRES', ''],
      airq: ['POI_AIRQ', ''],
      radiosonde: ['POI_RADIOSONDE', ''],
      empty: ['POI_EMPTY', 't'],
    },
    oe = {
      off: ['NONE', 't'],
      pressure: ['PRESS', ''],
      gh: ['GH', ''],
      temp: ['TEMP', ''],
      deg0: ['FREEZING', ''],
    },
    ae = Object.freeze({
      __proto__: null,
      acTimes: z,
      airQualityProducts: Y,
      assets: U,
      community: 'https://community.windy.com',
      device: R,
      globalPointProducts: Z,
      globalProducts: j,
      iconsDir: '/img/icons6',
      isCrawler: Q,
      isMobile: K,
      isMobileOrTablet: ee,
      isRetina: te,
      isTablet: $,
      isolines: oe,
      levels: F,
      levelsData: ie,
      localPointProducts: q,
      localProducts: B,
      get nodeServer() {
        return M;
      },
      overlays: H,
      platform: I,
      pointForecast: G,
      pointProducts: J,
      pois: re,
      prefLang: ne,
      products: X,
      seaProducts: V,
      server: N,
      setNodeServer: function (e) {
        M = e;
      },
      supportedLanguages: x,
      target: O,
      tileServer: D,
      version: C,
    }),
    se = [],
    le = 6e4,
    ce = 36e5,
    ue = 'bcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789a',
    de = ue.split(''),
    he = function (e) {
      var t = '';
      do {
        ((t = ue.charAt(e % 60) + t), (e = Math.floor(e / 60)));
      } while (e);
      return t;
    },
    fe = function (e) {
      for (var t = 0, n = 0; n < e.length; n++) t = 60 * t + de.indexOf(e.charAt(n));
      return t;
    },
    me = function () {},
    pe = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
    ve = function (e) {
      return (e && 'object' === P(e) && 'lat' in e && 'lon' in e && !isNaN(+e.lat) && !isNaN(+e.lon)) || !1;
    },
    ge = function (e) {
      return parseFloat(e).toFixed(3);
    },
    ye = function (e, t) {
      for (var n in e) t(e[n], n);
    },
    we = function e(t, n) {
      if (null === t) return t;
      if (t instanceof Date) return new Date(t.getTime());
      if (t instanceof Array) {
        var i = [];
        return (
          t.forEach(function (e) {
            i.push(e);
          }),
          i.map(function (t) {
            return e(t);
          })
        );
      }
      if ('object' === P(t)) {
        var r = S({}, t);
        return (
          Object.keys(r).forEach(function (t) {
            (n && !n.includes(t)) || (r[t] = e(r[t]));
          }),
          r
        );
      }
      return t;
    },
    be = function (e, t, n) {
      var i;
      return function () {
        for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++) o[a] = arguments[a];
        var s = this;
        var l = n && !i;
        (clearTimeout(i),
          (i = setTimeout(function () {
            (clearTimeout(i), n || e.apply(s, o));
          }, t)),
          l && e.apply(s, o));
      };
    },
    Te = function (e, t) {
      var n,
        i,
        r = this;
      function o() {
        ((n = !1), i && (a.apply(r, i), (i = !1)));
      }
      function a() {
        for (var a = arguments.length, s = new Array(a), l = 0; l < a; l++) s[l] = arguments[l];
        n ? (i = s) : (e.apply(r, s), setTimeout(o, t), (n = !0));
      }
      return a;
    },
    Ee = function (e) {
      for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2, n = String(e); n.length < t; )
        n = '0' + n;
      return n;
    },
    Se = function (e, t) {
      return e
        ? e.replace(/\{\{?\s*(.+?)\s*\}?\}/g, function (e, n) {
            return t && n in t ? String(t[n]) : '';
          })
        : '';
    },
    _e = function (e) {
      return {
        wind: Math.sqrt(e[0] * e[0] + e[1] * e[1]),
        dir: 10 * Math.floor(18 + (18 * Math.atan2(e[0], e[1])) / Math.PI),
      };
    },
    Ae = function (e) {
      return {
        period: Math.sqrt(e[0] * e[0] + e[1] * e[1]),
        dir: 10 * Math.floor(18 + (18 * Math.atan2(e[0], e[1])) / Math.PI),
        size: e[2],
      };
    },
    Pe = function (e) {
      return 'number' == typeof e.dir && 'number' == typeof e.wind && e.dir <= 360 && e.wind >= 0;
    },
    ke = function (e) {
      return Pe(e)
        ? '<div class="iconfont" style="transform: rotate('
            .concat(e.dir, 'deg); -webkit-transform:rotate(')
            .concat(e.dir, 'deg);">', '"', '</div>')
        : '';
    },
    Ce = function (e, t) {
      return Math.abs(+e.lat - +t.lat) < 0.01 && Math.abs(+e.lon - +t.lon) < 0.01;
    },
    Oe = function (e, t, n) {
      return Math.max(Math.min(e, n), t);
    },
    Le = function (e, t, n) {
      var i = Oe((n - e) / (t - e), 0, 1);
      return i * i * i * (i * (6 * i - 15) + 10);
    },
    Ie = function (e) {
      return 0.5 + 0.00277777777777777 * e;
    },
    Re = function (e) {
      return (Math.PI - Math.log(Math.tan(0.5 * (1 - e) * Math.PI))) / (2 * Math.PI);
    },
    xe = function (e) {
      return Re(0.5 - 0.00555555555555555 * e);
    },
    Ne = 0,
    Me = function (e) {
      return x.includes(e);
    },
    De = function (e, t) {
      return ''
        .concat(e)
        .concat('/' === t.charAt(0) ? '' : '/')
        .concat(t);
    },
    Ue = function (e, t) {
      return ''
        .concat(e)
        .concat(/\?/.test(e) ? '&' : '?')
        .concat(t);
    },
    We = function (e) {
      var t = [];
      return (
        ye(e, function (e, n) {
          return void 0 !== e && t.push(''.concat(n, '=').concat(e));
        }),
        t.join('&')
      );
    },
    Fe = function (e, t) {
      return new Promise(function (n, i) {
        var r = document.createElement('script');
        ((r.type = 'text/javascript'),
          (r.async = !0),
          (r.onload = function () {
            n();
          }),
          (r.onerror = function (e) {
            i(e);
          }),
          document.head.appendChild(r),
          t && 'function' == typeof t && t(r),
          (r.src = e));
      });
    },
    Ge = function (e) {
      return null;
    },
    He = function (e, t) {
      return (t || document).querySelector(e);
    },
    ze = function (e) {
      return 'function' == typeof e;
    },
    Be = function (e) {
      return Boolean('touches' in e && e.touches);
    },
    je = function (e, t, n, i, r) {
      return (
        (0.5 * -e + 3 * t * 0.5 - 3 * n * 0.5 + 0.5 * i) * r * r * r +
        (e - 5 * t * 0.5 + 2 * n - 0.5 * i) * r * r +
        (0.5 * -e + 0.5 * n) * r +
        t
      );
    },
    Ve = function (e, t, n) {
      return e + n * (t - e);
    };
  function Ye(e, t, n) {
    var i = new CustomEvent('windyCustomError', { detail: { moduleName: e, msg: t, errorObject: n } });
    (document.dispatchEvent(i), console.error(e, t, n));
  }
  var qe = function (e) {
      var t;
      return null === (t = navigator.serviceWorker.controller) || void 0 === t ? void 0 : t.postMessage(e);
    },
    Ze = Math.min(window.devicePixelRatio || 1, 2),
    Xe = function (e) {
      var t,
        n = new Set(e[0]),
        i = y(e.slice(1));
      try {
        for (i.s(); !(t = i.n()).done; ) {
          var r,
            o = t.value,
            a = new Set(o),
            s = y(n);
          try {
            for (s.s(); !(r = s.n()).done; ) {
              var l = r.value;
              a.has(l) || n.delete(l);
            }
          } catch (e) {
            s.e(e);
          } finally {
            s.f();
          }
        }
      } catch (e) {
        i.e(e);
      } finally {
        i.f();
      }
      return g(n);
    },
    Je = function (e) {
      var t = 1 << e.z;
      return ((e.x = e.x % t), e.x < 0 && (e.x += t), e);
    },
    Qe = Object.freeze({
      __proto__: null,
      $: He,
      addQs: Ue,
      bicubicFiltering: function (e, t, n) {
        return je(
          je(e[0], e[1], e[2], e[3], t),
          je(e[4], e[5], e[6], e[7], t),
          je(e[8], e[9], e[10], e[11], t),
          je(e[12], e[13], e[14], e[15], t),
          n,
        );
      },
      bound: Oe,
      canvasRatio: Ze,
      char2num: fe,
      clamp0X: function (e, t) {
        return Math.min(Math.max(e, 0), t - 1);
      },
      clone: we,
      copy2clipboard: function (e) {
        var t = document.createElement('textarea');
        ((t.value = e),
          document.body.appendChild(t),
          t.select(),
          document.execCommand('copy'),
          document.body.removeChild(t));
      },
      cubicHermite: je,
      debounce: be,
      deg2rad: function (e) {
        return (e * Math.PI) / 180;
      },
      degToRad: 0.017453292,
      download: function (e, t, n) {
        var i = document.createElement('a'),
          r = e instanceof Blob ? e : new Blob([e], { type: t });
        ((i.style.display = 'none'),
          document.body.appendChild(i),
          window.URL && (i.href = window.URL.createObjectURL(r)),
          i.setAttribute('download', n),
          i.click(),
          window.URL && window.URL.revokeObjectURL(i.href),
          document.body.removeChild(i));
      },
      each: ye,
      emptyFun: me,
      emptyGIF: pe,
      getAdjustedNow: function (e) {
        var t,
          n = Date.now() - Ne;
        return (e && ((t = n - e) < 0 && (Ne += t), t > 1e4 && (Ne += t)), n);
      },
      getNativePlugin: Ge,
      getRefs: function (e) {
        var t,
          n = 'string' == typeof e ? He(e) : e,
          i = {};
        return (
          (null !== (t = null == n ? void 0 : n.querySelectorAll('[data-ref]')) && void 0 !== t ? t : []).forEach(
            function (e) {
              e.dataset.ref && (i[e.dataset.ref] = e);
            },
          ),
          { node: n, refs: i }
        );
      },
      hasDirection: Pe,
      intersect: Xe,
      isFunction: ze,
      isNear: Ce,
      isProfessionalStation: function (e) {
        return /^(ad|wmo|buoy|ship)$/.test(e);
      },
      isTouchEvent: Be,
      isValidLang: Me,
      isValidLatLonObj: ve,
      joinPath: De,
      lat01ToYUnit: Re,
      latDegToYUnit: xe,
      latLon2str: function (e) {
        var t = Math.floor(100 * (e.lat + 90)),
          n = Math.floor(100 * (e.lon + 180));
        return ''.concat(he(t), 'a').concat(he(n));
      },
      lerp: Ve,
      lerpColor256: function (e, t, n) {
        return e.map(function (i, r) {
          return Oe(Ve(e[r], t[r], n), 0, 255);
        });
      },
      loadScript: Fe,
      logError: Ye,
      lonDegToXUnit: Ie,
      longPressTime: 600,
      normalizeLatLon: ge,
      num2char: he,
      pad: Ee,
      qs: We,
      radToDeg: 57.2957795,
      sanitizeHTML: function (e) {
        return e
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
          .replace(/\//g, '&#x2F;');
      },
      scaleLinear: function (e) {
        var t = e.domain,
          n = e.range,
          i = e.clip,
          r = w(n, 2),
          o = r[0],
          a = r[1],
          s = w(t, 2),
          l = s[0],
          c = s[1],
          u = w(o > a ? [o, a] : [a, o], 2),
          d = u[0],
          h = u[1],
          f = (a - o) / (c - l),
          m = function (e) {
            return (e - l) * f + o;
          };
        return {
          get: i
            ? function (e) {
                return Math.max(Math.min(m(e), d), h);
              }
            : m,
          invert: function (e) {
            return (e - o) / f + l;
          },
        };
      },
      sendMessageToServiceWorker: qe,
      smoothstep: Le,
      spline: function (e, t, n, i, r) {
        return 0.5 * (2 * t + (-e + n) * r + (2 * e - 5 * t + 4 * n - i) * r * r + (3 * t - e - 3 * n + i) * r * r * r);
      },
      str2latLon: function (e) {
        var t = e.split('a');
        return { lat: fe(t[0]) / 100 - 90, lon: fe(t[1]) / 100 - 180 };
      },
      template: Se,
      throttle: Te,
      tsHour: ce,
      tsMinute: le,
      unitXToLonDeg: function (e) {
        return 360 * (e - 0.5);
      },
      unitXToLonRad: function (e) {
        return 2 * (e - 0.5) * Math.PI;
      },
      unitYToLatDeg: function (e) {
        return (Math.atan(Math.exp(Math.PI - e * (2 * Math.PI))) / (0.5 * Math.PI)) * 180 - 90;
      },
      unitYToLatRad: function (e) {
        return 2 * Math.atan(Math.exp(Math.PI - 2 * e * Math.PI)) - 0.5 * Math.PI;
      },
      wave2obj: Ae,
      wind2obj: _e,
      windDir2html: ke,
      wrapCoords: Je,
    }),
    Ke = (function () {
      function e(t) {
        (m(this, e),
          (this.latestId = 1),
          (this._eventedCache = {}),
          (this.trigger = this.emit),
          (this.fire = this.emit),
          (this.ident = t.ident));
      }
      return (
        v(e, [
          {
            key: 'emit',
            value: function (e) {
              for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                n[i - 1] = arguments[i];
              !(function (e, t, n) {
                (se.push({ ts: Date.now(), txt: e + ': ' + t + ('string' == typeof n ? ' ' + n : '') }),
                  se.length > 5 && se.shift());
              })(this.ident, String(e), n[0]);
              var r = this._eventedCache[e];
              if (r)
                for (var o = r.length; o--; ) {
                  var a = r[o];
                  try {
                    var s;
                    ((s = a.callback).call.apply(s, [a.context].concat(n)), a.once && this.off(a.id));
                  } catch (t) {
                    Ye('Evented', 'Failed to call '.concat(String(e), ' with data ').concat(JSON.stringify(n)), t);
                  }
                }
            },
          },
          {
            key: 'on',
            value: function (e, t, n, i) {
              return (
                (this.latestId = this.latestId || 0),
                this._eventedCache
                  ? (e in this._eventedCache || (this._eventedCache[e] = []),
                    this._eventedCache[e].push({ id: ++this.latestId, callback: t, context: n || this, once: i || !1 }),
                    this.latestId)
                  : this.latestId
              );
            },
          },
          {
            key: 'once',
            value: function (e, t, n) {
              return this.on(e, t, n, !0);
            },
          },
          {
            key: 'off',
            value: function (e, t, n) {
              if ('number' == typeof e)
                for (var i in this._eventedCache) {
                  var r = this._eventedCache[i];
                  if (r) {
                    for (var o = r.length; o--; ) r[o].id === e && r.splice(o, 1);
                    0 === r.length && delete this._eventedCache[i];
                  }
                }
              else {
                var a = this._eventedCache[e];
                if (a) {
                  for (var s = a.length; s--; ) a[s].callback !== t || (n && n !== a[s].context) || a.splice(s, 1);
                  this._eventedCache && 0 === a.length && delete this._eventedCache[e];
                }
              }
            },
          },
        ]),
        e
      );
    })(),
    $e = Object.freeze({ __proto__: null, Evented: Ke }),
    et = [!0, !1],
    tt = function (e) {
      return 'number' == typeof +e && !isNaN(+e);
    },
    nt = function (e) {
      return void 0 !== e && 'object' === P(e);
    },
    it = function (e) {
      return ve(e) || null == e;
    },
    rt = function (e) {
      return void 0 !== e && 'string' == typeof e;
    },
    ot = function (e) {
      return null === e || rt(e);
    },
    at = function (e) {
      return null === e || !isNaN(Number(e));
    },
    st = function (e) {
      return e.slice().sort().toString();
    },
    lt = function (e, t) {
      return st(e) === st(t);
    },
    ct = {
      overlay: { def: 'wind', allowed: H },
      level: { def: 'surface', allowed: F },
      acTime: { def: 'next3d', allowed: z },
      timestamp: { def: Date.now(), allowed: tt },
      path: { def: '', allowed: rt },
      isolines: { def: 'off', allowed: Object.keys(oe), save: !0 },
      startUpLastProduct: { def: null, allowed: [].concat(g(X), [null]), save: !0, nativeSync: !0 },
      product: { def: 'ecmwf', allowed: X },
      availProducts: { def: ['ecmwf'], allowed: Array.isArray, compare: lt },
      visibleProducts: { def: ['ecmwf'], allowed: Array.isArray, compare: lt },
      availAcTimes: { def: ['next12h'], allowed: Array.isArray },
      prefferedProduct: { def: 'ecmwf', allowed: ['ecmwf', 'gfs', 'icon', 'iconEu'] },
      animation: { def: !1, allowed: et },
      calendar: { def: null, allowed: nt },
      availLevels: {
        def: [].concat(F),
        allowed: function (e) {
          return e.every(function (e) {
            return F.includes(e);
          });
        },
      },
      particlesAnim: { def: 'on', allowed: ['on', 'off', 'intensive'], save: !0 },
      camsPreviews: { def: !0, allowed: et, save: !0 },
      lastModified: { def: 0, allowed: tt },
      graticule: { def: !1, allowed: et, save: !0 },
      latlon: { def: !1, allowed: et, save: !0 },
      lang: {
        def: 'auto',
        allowed: function (e) {
          return 'auto' === e || Me(e);
        },
        save: !0,
        sync: !0,
      },
      englishLabels: { def: !1, allowed: et, save: !0, sync: !0 },
      numDirection: { def: !1, allowed: et, save: !0, sync: !0 },
      favOverlays: {
        def: [
          'radar',
          'satellite',
          'wind',
          'gust',
          'rain',
          'rainAccu',
          'snowAccu',
          'thunder',
          'temp',
          'rh',
          'clouds',
          'lclouds',
          'cbase',
          'visibility',
          'waves',
          'swell1',
          'swell2',
          'sst',
          'no2',
          'gtco3',
          'aod550',
          'pm2p5',
        ],
        allowed: Array.isArray,
        save: !0,
      },
      hourFormat: { def: '24h', allowed: ['12h', '24h'], save: !0, sync: !0 },
      country: {
        def: 'xx',
        save: !0,
        allowed: function (e) {
          return /[a-z][a-z0-9]/.test(e);
        },
      },
      isImperial: { def: !1, allowed: et },
      map: { def: 'sznmap', allowed: ['sznmap', 'sat', 'winter'], save: !0 },
      showWeather: { def: !0, allowed: et, save: !0 },
      disableWebGL: { def: !1, allowed: et, save: !0 },
      glParticlesOn: { def: !1, allowed: et },
      usedLang: { def: 'en', allowed: x },
      expertMode: { def: !1, allowed: et, save: !0 },
      particles: {
        def: { multiplier: 1, velocity: 1, width: 1, blending: 1, opacity: 1 },
        save: !0,
        allowed: function (e) {
          var t;
          if (!e || 'object' !== P(e)) return !1;
          for (var n in this.def) if ('number' != typeof (t = e[n]) || t > 2 || t < 0) return !1;
          return !0;
        },
      },
      startUp: { def: 'ip', allowed: ['ip', 'gps', 'location', 'last'], save: !0, nativeSync: !0 },
      startUpLastPosition: {
        def: { lat: 50, lon: 14, zoom: 4, source: 'maps' },
        allowed: function (e) {
          return null !== e && ve(e) && Number.isInteger(e.zoom) && ('maps' === e.source || 'globe' === e.source);
        },
        save: !0,
        nativeSync: !0,
      },
      homeLocation: { def: null, allowed: it, save: !0, sync: !0, nativeSync: !0 },
      startUpOverlay: { def: 'wind', allowed: H, save: !0, nativeSync: !0 },
      startUpLastOverlay: { def: !1, allowed: et, save: !0, nativeSync: !0 },
      startUpLastStep: { def: null, allowed: [1, 3, null], save: !0, nativeSync: !0 },
      ipLocation: { def: null, allowed: it, save: !0, nativeSync: !0 },
      gpsLocation: { def: null, allowed: it, save: !0, nativeSync: !0 },
      startupReverseName: { def: null, allowed: nt, save: !0 },
      notams: { def: null, allowed: nt, save: !0, sync: !0 },
      email: {
        def: '',
        allowed: function (e) {
          return /\S+@\S+/.test(e);
        },
        save: !0,
        sync: !0,
      },
      metarsRAW: { def: !1, allowed: et, save: !0, sync: !0 },
      sessionCounter: { def: 0, allowed: tt, save: !0 },
      firstUserSession: { def: 0, allowed: tt, save: !0 },
      seenRadarInfo: { def: !1, save: !0, allowed: et },
      wasDragged: { def: !1, allowed: et, save: !0, sync: !0 },
      detailLocation: { def: null, allowed: it },
      detail1h: { def: !1, allowed: et },
      detailTimestamp: { def: Date.now(), allowed: tt },
      webcamsDaylight: { def: !1, allowed: et },
      capDisplay: { def: 'all', allowed: ['all', 'today', 'tomm', 'later'] },
      radarRange: { def: '-1', allowed: ['-12', '-6', '-1'] },
      radarTimestamp: { def: Date.now(), allowed: tt },
      radarSpeed: { def: 'medium', allowed: ['slow', 'medium', 'fast'] },
      radarCalendar: { def: null, allowed: nt },
      radarAnimation: { def: !1, allowed: et },
      blitzOn: { def: !0, allowed: et, save: !0 },
      blitzSoundOn: { def: !0, allowed: et, save: !0 },
      satelliteRange: { def: 'short', allowed: ['archive', 'long', 'medium', 'short'] },
      satelliteTimestamp: { def: Date.now(), allowed: tt },
      satelliteCalendar: { def: null, allowed: nt },
      satelliteAnimation: { def: !1, allowed: et },
      satelliteMode: { def: 'BLUE', allowed: ['BLUE', 'VISIR', 'IRBT', 'DBG'], save: !0, allowUrlRewrite: !0 },
      satelliteSpeed: { def: 'medium', allowed: ['slow', 'medium', 'fast'] },
      satelliteFlowOn: { def: !0, allowed: et, save: !0 },
      satelliteExtraOn: { def: !0, allowed: et, save: !0 },
      satelliteInterpolationOverride: { def: !1, allowed: et },
      archiveOn: { def: !1, allowed: et },
      archiveTimestamp: { def: 0, allowed: tt, save: !0 },
      archiveRange: { def: 24, allowed: tt, save: !0 },
      hpShown: { def: !1, allowed: et },
      pois: { def: 'favs', allowed: Object.keys(re), save: !0, allowUrlRewrite: !0 },
      poisTemporary: { def: 'empty', allowed: Object.keys(re) },
      favPois: {
        def: ['favs', 'wind', 'temp', 'cities', 'metars', 'cams', 'pgspots'],
        allowed: function (e) {
          return Array.isArray(e) && e.length < 8;
        },
        save: !0,
        sync: !0,
      },
      visibility: { def: !0, allowed: et },
      displayLocation: { def: !0, allowed: et, save: !0 },
      vibrate: { def: !0, allowed: et, save: !0 },
      donations: { def: [], allowed: Array.isArray, compare: lt, save: !0, sync: !0 },
      zuluMode: { def: !1, allowed: et, save: !0 },
      plugins: { def: [], allowed: Array.isArray, compare: lt, save: !0, sync: !0 },
      stationsSort: { def: 'profi', allowed: ['profi', 'distance'], save: !0 },
      stationCompareModel: { def: 'noModel', allowed: rt, save: !0 },
      subscription: {
        def: null,
        allowed: function (e) {
          return !0;
        },
        save: !0,
        nativeSync: !0,
      },
      subscriptionInfo: { def: null, allowed: nt },
      pendingSubscription: { def: null, allowed: ot, save: !0 },
      failedSubscriptionPayment: { def: null, allowed: ot, save: !0 },
      notifications: { def: null, allowed: nt, save: !0, sync: !0 },
      adHocNotification: { def: !1, allowed: et, save: !0, nativeSync: !0 },
      badgeNumber: { def: 0, allowed: tt, save: !0 },
      user: { def: null, allowed: nt, nativeSync: !0 },
      userToken: { def: null, allowed: rt, save: !0, nativeSync: !0 },
      authHash: { def: null, allowed: rt, save: !0, nativeSync: !0, watchSync: !0 },
      globeActive: { def: !1, allowed: et },
      lastPoiLocation: { def: null, allowed: it },
      pickerLocation: {
        def: null,
        allowed: function (e) {
          return null === e || it(e);
        },
      },
      mapCoords: { def: null, allowed: it },
      unresolvedErrors: { def: [], allowed: Array.isArray },
      closedErrors: { def: [], allowed: Array.isArray, save: !0, nativeSync: !0 },
      launchedBy: { def: null, allowed: rt },
      showDailyNotifications: { def: !1, allowed: et, nativeSync: !0, save: !0 },
      appReviewPluginShown: { def: null, allowed: at, nativeSync: !0, save: !0 },
      systemAppReviewDialogShown: { def: null, allowed: at, nativeSync: !0, save: !0 },
      appReviewLastVersion: { def: null, allowed: ot, nativeSync: !0, save: !0 },
      favOverlaysMobile: { def: [], allowed: Array.isArray, save: !0, sync: !0 },
      favPoisMobile: { def: [], allowed: Array.isArray, save: !0, sync: !0 },
      mobileMenuFilter: {
        def: 'all',
        allowed: ['all', 'wind', 'rain', 'sea', 'airQ', 'drought', 'temp', 'warnings', 'clouds', 'search'],
      },
      connection: { def: !0, allowed: et },
      pickerMobileTimeout: { def: '6', allowed: ['3', '6', '9', '12', 'always'], save: !0, sync: !0 },
      offlineSetting: { def: null, allowed: nt, save: !0, sync: !1 },
      changeDetailOnMapDrag: { def: !0, allowed: et, save: !0, sync: !1 },
      offlineMode: { def: !1, allowed: et },
      offlineDataInfo: { def: null, allowed: nt },
      offlineModeEnabled: { def: !1, allowed: et, save: !0 },
      displayHeliports: { def: !1, allowed: et, save: !0 },
      displayAdStations: { def: !0, allowed: et, save: !0 },
      displayWMOStations: { def: !0, allowed: et, save: !0 },
      displayMadisPWStations: { def: !0, allowed: et, save: !0 },
      displayShipStations: { def: !0, allowed: et, save: !0 },
      stationCompareHiddenProducts: { def: [], allowed: Array.isArray, save: !0, sync: !0 },
      consent: { def: null, allowed: nt, save: !0, sync: !0 },
      youtubeConsent: { def: null, allowed: nt, save: !0, sync: !0 },
      twitterConsent: { def: null, allowed: nt, save: !0, sync: !0 },
    },
    ut = {
      isAvbl: !1,
      put: function (e, t) {
        return window.localStorage.setItem(e, JSON.stringify(t));
      },
      hasKey: function (e) {
        return e in window.localStorage;
      },
      get: function (e) {
        var t = window.localStorage.getItem(e);
        return t ? JSON.parse(t) : null;
      },
      remove: function (e) {
        return window.localStorage.removeItem(e);
      },
    },
    dt = {},
    ht = {
      isAvbl: !1,
      put: function (e, t) {
        return (dt[e] = t);
      },
      hasKey: function (e) {
        return e in dt;
      },
      get: function (e) {
        return e in dt ? dt[e] : null;
      },
      remove: function (e) {
        return delete dt[e];
      },
    };
  try {
    if ((window.localStorage.setItem('test', 'bar'), 'bar' !== window.localStorage.getItem('test')))
      throw new Error('Comparsion failed');
    (window.localStorage.removeItem('test'), (ut.isAvbl = !0));
  } catch (e) {
    0;
  }
  var ft = ht,
    mt = {},
    pt = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        var e;
        m(this, n);
        for (var i = arguments.length, r = new Array(i), o = 0; o < i; o++) r[o] = arguments[o];
        return (
          _(d((e = t.call.apply(t, [this].concat(r)))), 'defineProperty', function (e, t, n) {
            ct[e][t] = n;
          }),
          _(d(e), 'getProperty', function (e) {
            return ct[e];
          }),
          _(d(e), 'hasProperty', function (e) {
            return e in ct;
          }),
          _(d(e), 'remove', function (t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { doNotCheckValidity: !0 };
            e.set(t, null, n);
          }),
          _(d(e), 'getAll', function () {
            Object.keys(ct).map(function (t) {
              return console.log(''.concat(t, ':'), e.get(t));
            });
          }),
          _(d(e), 'getAllowed', function (e) {
            var t = ct[e].allowed;
            return t && Array.isArray(t) ? t : 'Allowed values are checked by function';
          }),
          _(d(e), 'insert', function (e, t) {
            ct[e] = t;
          }),
          e
        );
      }
      return (
        v(n, [
          {
            key: 'setDefault',
            value: function (e, t) {
              ((ct[e].def = t), delete mt[e]);
            },
          },
          {
            key: '_set',
            value: function (e, t, n, i) {
              if ((null === i ? delete mt[e] : (mt[e] = i), t.save && !n.doNotStore && ft.isAvbl)) {
                var r = n.update || Date.now();
                (ft.put('settings_'.concat(e), i),
                  t.sync &&
                    ((t.update = r), ft.put('settings_'.concat(e, '_ts'), r), ft.put('lastSyncableUpdatedItem', r)),
                  this.get('user') && t.sync && !n.doNotSaveToCloud && this.emit('_cloudSync'));
              }
              this.emit(e, null === i ? t.def : i, n.UIident);
            },
          },
          {
            key: 'set',
            value: function (e, t) {
              var n = this,
                i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                r = ct[e];
              if (!r) throw new Error('Cannot find "'.concat(e, '" key in dataSpecifications'));
              if (!i.doNotCheckValidity && !this.isValid(r, t)) return !!this.isAsyncStore(r) && Promise.reject();
              if (r.syncSet && (i.forceChange || this.wasChanged(e, r, t))) {
                var o = r.syncSet(t);
                if (i.forceChange || this.wasChanged(e, r, o)) return (this._set(e, r, i, o), !0);
              } else {
                if (this.isAsyncStore(r)) {
                  if (i.forceChange || this.wasChanged(e, r, t)) {
                    var a = r.asyncSet(t);
                    return (
                      a
                        .then(function (t) {
                          (i.forceChange || n.wasChanged(e, r, t)) && n._set(e, r, i, t);
                        })
                        .catch(function (n) {
                          return console.error('store: Unable to change store value '.concat(e, ', ').concat(t), n);
                        }),
                      a
                    );
                  }
                  return Promise.resolve(t);
                }
                if (i.forceChange || this.wasChanged(e, r, t)) return (this._set(e, r, i, t), !0);
              }
              return !1;
            },
          },
          {
            key: 'getDefault',
            value: function (e) {
              return ct[e].def;
            },
          },
          {
            key: 'isAsyncStore',
            value: function (e) {
              return Boolean('asyncSet' in e && e.asyncSet);
            },
          },
          {
            key: 'wasChanged',
            value: function (e, t, n) {
              return t.compare ? !t.compare(n, this.get(e)) : e in mt ? mt[e] !== n : this.getDefault(e) !== n;
            },
          },
          {
            key: 'get',
            value: function (e, t) {
              if (e in mt && (null == t || !t.forceGet)) return mt[e];
              var n,
                i = ct[e];
              if (!i) throw new Error('Cannot find "'.concat(e, '" key in dataSpecifications'));
              return (
                i.save && ft.isAvbl && (null !== (n = ft.get('settings_'.concat(e))) || (null != t && t.forceGet))
                  ? this.isValid(i, n) ||
                    (console.error('store: Attempt to get invalid value from localStorage: '.concat(e)), (n = i.def))
                  : (n = i.def),
                (null != t && t.forceGet) || (mt[e] = n),
                n
              );
            },
          },
          {
            key: 'isValid',
            value: function (e, t) {
              return 'function' == typeof e.allowed
                ? e.allowed(t)
                : Array.isArray(e.def)
                  ? Array.isArray(t) &&
                    t.every(function (t) {
                      return e.allowed.includes(t);
                    })
                  : e.allowed.includes(t);
            },
          },
        ]),
        n
      );
    })(Ke),
    vt = new pt({ ident: 'store' });
  (vt.once('country', function (e) {
    (vt.setDefault('hourFormat', /us|uk|ph|ca|au|nz|in|eg|sa|co|pk|my/.test(e) ? '12h' : '24h'),
      vt.set('isImperial', /us|my|lr/.test(e)));
  }),
    vt.set('sessionCounter', vt.get('sessionCounter') + 1));
  var gt = null,
    yt = !1;
  function wt(e) {
    fetch(''.concat(M, '/services/connection'), { method: 'HEAD' })
      .then(function (t) {
        var n = t.status >= 200 && t.status < 400;
        e(n);
      })
      .catch(function () {
        return e(!1);
      });
  }
  function bt() {
    gt && (clearInterval(gt), (gt = null));
  }
  function Tt(e) {
    e && (vt.set('connection', !0), document.body.classList.remove('connection-is-offline'), (yt = !1), bt());
  }
  function Et() {
    yt ||
      ((yt = !0),
      wt(function (e) {
        e
          ? Tt(!0)
          : (bt(),
            vt.set('connection', !1),
            document.body.classList.add('connection-is-offline'),
            (gt = setInterval(function () {
              wt(Tt);
            }, 2e3)));
      }));
  }
  (window.addEventListener('offline', Et), window.addEventListener('online', Et));
  var St,
    _t,
    At,
    Pt = Object.freeze({ __proto__: null, testNetworkConnection: Et }),
    kt = null,
    Ct =
      ft.get('UUID') ||
      ((At =
        (_t = function () {
          return Math.floor(65536 * (1 + Math.random()))
            .toString(16)
            .substring(1);
        })() +
        _t() +
        '-' +
        _t() +
        '-' +
        _t() +
        '-' +
        _t() +
        '-' +
        _t() +
        _t() +
        _t()),
      ft.put('UUID', At),
      At),
    Ot = null;
  (Ot
    ? (Ot.getInfo().then(function (e) {
        kt = e;
      }),
      Ot.getId().then(function (e) {
        St = e.identifier;
      }))
    : (St = Ct),
    vt.get('firstUserSession') || vt.set('firstUserSession', Date.now()));
  var Lt,
    It = function () {
      return Ct;
    },
    Rt = Object.freeze({
      __proto__: null,
      getDeviceID: function () {
        return St;
      },
      getDeviceInfo: function () {
        return kt;
      },
      getVirtualDeviceID: It,
    }),
    xt = (function () {
      function e(t) {
        (m(this, e), (this.size = 0), (this.limit = t), (this._keymap = {}));
      }
      return (
        v(e, [
          {
            key: 'put',
            value: function (e, t) {
              var n = { key: e, value: t, older: void 0 };
              if (
                ((this._keymap[e] = n),
                this.tail ? ((this.tail.newer = n), (n.older = this.tail)) : (this.head = n),
                (this.tail = n),
                this.size === this.limit)
              )
                return this.shift();
              this.size++;
            },
          },
          {
            key: 'toJSON',
            value: function () {
              for (var e = [], t = this.head; t; ) (e.push({ key: t.key, value: t.value }), (t = t.newer));
              return e;
            },
          },
          {
            key: 'shift',
            value: function () {
              var e = this.head;
              return (
                e &&
                  this.head &&
                  (this.head.newer ? ((this.head = this.head.newer), (this.head.older = void 0)) : (this.head = void 0),
                  (e.newer = e.older = void 0),
                  delete this._keymap[e.key]),
                e
              );
            },
          },
          {
            key: 'get',
            value: function (e) {
              var t = this._keymap[e];
              if (void 0 !== t)
                return (
                  t === this.tail ||
                    (t.newer && (t === this.head && (this.head = t.newer), (t.newer.older = t.older)),
                    t.older && (t.older.newer = t.newer),
                    (t.newer = void 0),
                    (t.older = this.tail),
                    this.tail && (this.tail.newer = t),
                    (this.tail = t)),
                  t.value
                );
            },
          },
          {
            key: 'remove',
            value: function (e) {
              var t = this._keymap[e];
              if (t)
                return (
                  delete this._keymap[t.key],
                  t.newer && t.older
                    ? ((t.older.newer = t.newer), (t.newer.older = t.older))
                    : t.newer
                      ? ((t.newer.older = void 0), (this.head = t.newer))
                      : t.older
                        ? ((t.older.newer = void 0), (this.tail = t.older))
                        : (this.head = this.tail = void 0),
                  this.size--,
                  t.value
                );
            },
          },
          {
            key: 'removeAll',
            value: function () {
              ((this.head = this.tail = void 0), (this.size = 0), (this._keymap = {}));
            },
          },
        ]),
        e
      );
    })(),
    Nt = new xt(50),
    Mt = '',
    Dt = 0,
    Ut = It(),
    Wt = vt.get('sessionCounter');
  Lt = 'application/json binary/'.concat(W.encodedVersion || '');
  var Ft = new RegExp('^/users/', 'i'),
    Gt = new RegExp('^https://account.windy.com/', 'i'),
    Ht = new RegExp('^/citytile/', 'i'),
    zt = function (e) {
      var t = document.head.querySelector('meta[name="token"]'),
        n = {
          token: null == t ? void 0 : t.content,
          token2: vt.get('userToken') || 'pending',
          uid: Ut,
          sc: Wt,
          pr: +e,
          v: C,
        };
      Mt = We(n);
    },
    Bt = function (e) {
      return (
        (function (e) {
          return !e.startsWith('http') && !/^v\/\d*/.test(e);
        })(e) ||
        Ht.test(e) ||
        e.startsWith('http://localhost:') ||
        !1
      );
    },
    jt = function (e) {
      return Bt(e)
        ? (e.startsWith('http') || (e = De(M, e)), Mt && (e = Ue(e, Mt)), (e = Ue(e, 'poc='.concat(++Dt))))
        : e;
    };
  (zt(!0),
    vt.on('userToken', function () {
      return zt(!1);
    }));
  var Vt = (function (e) {
      s(n, o(Error));
      var t = c(n);
      function n(e, i, r) {
        var o;
        return (m(this, n), ((o = t.call(this, i)).status = e), (o.message = i), (o.responseText = r), o);
      }
      return v(n);
    })(),
    Yt = function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      try {
        var n = jt(e),
          i = new EventSource(n, t);
        return (
          i.addEventListener('error', function (n) {
            Ye('http', 'EventSource error event for url='.concat(e, ', options=').concat(JSON.stringify(t)), n);
          }),
          i
        );
      } catch (e) {
        return (Ye('http', 'Failed to create EventSource', e), null);
      }
    },
    qt = function (e) {
      return { status: e.status, data: e.data && e.isJSON ? JSON.parse(e.data) : e.data };
    },
    Zt = function (e, t) {
      var i,
        o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      if ('object' === P(o.qs)) {
        var a = We(o.qs);
        a && (t = Ue(t, a));
      }
      var s,
        l = Ft.test(t) || Gt.test(t) || (null !== (i = o.withCredentials) && void 0 !== i && i),
        c = t;
      if ((void 0 === o.cache && 'GET' === e && (o.cache = !0), o.cache)) {
        var u = Nt.get(t);
        if (u) {
          if (((s = u), Promise.resolve(s) == s)) return u;
          var d = u.expire;
          if (!(d && Date.now() > d)) {
            var h = qt(u);
            return Promise.resolve(h);
          }
          Nt.remove(t);
        }
      }
      var f = !1;
      if (Bt(t) && ((t = jt(t)), /^\/?forecast\//.test(c))) {
        var m = w(/^(.+)\/forecast\/([^/]+)\/([^/]+)\/(.+)$/.exec(t) || [], 5),
          p = m[1],
          v = m[2],
          g = m[3],
          y = m[4],
          b = 'Zm9yZWNhc3Q/'.concat(window.btoa(g).replace(/=/g, '')),
          T = ''.concat(v, '/').concat(g, '/').concat(y);
        ((t = ''.concat(p, '/').concat(b, '/').concat(window.btoa(T).replace(/=/g, ''))), (f = !0));
      }
      t = encodeURI(t);
      var E,
        S = new Headers(o.customHeaders || {});
      if (l) {
        E = 'include';
        var _ = vt.get('userToken');
        _ && S.set('Authorization', 'Bearer '.concat(_));
      }
      S.set('Accept', Lt);
      var A,
        k,
        C = null;
      if (
        (!o.data ||
          ('POST' !== e && 'PUT' !== e) ||
          (S.set('Content-Type', 'application/json; charset=utf-8'), (C = JSON.stringify(o.data))),
        o.abortSignal || o.timeout)
      ) {
        var O = (function (e, t) {
          var n,
            i = new AbortController();
          return (
            t &&
              (n = setTimeout(function () {
                i.signal.aborted || i.abort();
              }, t)),
            e &&
              (e.aborted && i.abort(),
              e.addEventListener(
                'abort',
                function () {
                  (i.abort(), n && clearTimeout(n));
                },
                { signal: i.signal },
              )),
            { abortSignal: i.signal, timeoutId: n }
          );
        })(o.abortSignal, o.timeout);
        ((A = O.abortSignal), (k = O.timeoutId));
      }
      var L = fetch(t, { body: C, credentials: E, headers: S, method: e, signal: A })
        .then(
          (function () {
            var e = r(
              n().mark(function e(i) {
                var r, a, s, l, u, d;
                return n().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (!i.ok && 304 !== i.status) {
                            e.next = 32;
                            break;
                          }
                          if (((r = { status: i.status, data: void 0 }), (e.prev = 2), !o.binary)) {
                            e.next = 9;
                            break;
                          }
                          return ((e.next = 6), i.arrayBuffer());
                        case 6:
                          ((r.data = e.sent), (e.next = 22));
                          break;
                        case 9:
                          if (!f) {
                            e.next = 17;
                            break;
                          }
                          return ((e.next = 12), i.text());
                        case 12:
                          ((a = e.sent), (r.data = window.atob(a)), (r.isJSON = !0), (e.next = 22));
                          break;
                        case 17:
                          return ((e.next = 19), i.text());
                        case 19:
                          ((l = e.sent),
                            (r.data = l),
                            (r.isJSON =
                              o.json ||
                              (null === (s = i.headers.get('content-type')) || void 0 === s
                                ? void 0
                                : s.includes('json'))));
                        case 22:
                          return (
                            o.cache && ((r.expire = (o.ttl || 3e5) + Date.now()), Nt.put(c, r)),
                            (u = qt(r)),
                            e.abrupt('return', u)
                          );
                        case 27:
                          throw ((e.prev = 27), (e.t0 = e.catch(2)), new Vt(i.status, e.t0.message));
                        case 30:
                          e.next = 36;
                          break;
                        case 32:
                          return ((e.next = 34), i.text());
                        case 34:
                          throw (
                            (d = e.sent),
                            new Vt(i.status, 'Request failed for URL '.concat(t), null != d ? d : i.statusText)
                          );
                        case 36:
                        case 'end':
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[2, 27]],
                );
              }),
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })(),
        )
        .catch(function (e) {
          var t;
          (e instanceof Vt || e.message.includes('aborted') || Et(), e instanceof Vt) ||
            (e = new Vt(null !== (t = e.status) && void 0 !== t ? t : 0, e.message));
          throw (o.cache && Nt.remove(c), e);
        })
        .finally(function () {
          k && clearTimeout(k);
        });
      return (o.cache && Nt.put(c, L), L);
    },
    Xt = Zt.bind(null, 'GET'),
    Jt = Zt.bind(null, 'DELETE'),
    Qt = Zt.bind(null, 'POST'),
    Kt = Zt.bind(null, 'PUT'),
    $t = Zt.bind(null, 'HEAD'),
    en = Object.freeze({
      __proto__: null,
      HttpError: Vt,
      createEventSource: Yt,
      del: Jt,
      get: Xt,
      getURL: jt,
      head: $t,
      post: Qt,
      put: Kt,
    }),
    tn = (Date.now(), []);
  function nn(e, t, n, i, r, o, a) {}
  ((window.onerror = nn.bind(null, 'error')),
    document.addEventListener('windyCustomError', function (e) {
      var t = e.detail,
        n = t.moduleName,
        i = t.msg,
        r = t.errorObject;
      console.error(n, i, r);
    }));
  var rn = Object.freeze({ __proto__: null, sentErrors: tn }),
    on = {};
  function an(e, t, n, i, r) {
    if (e in on) throw new Error('DI conflict: Module '.concat(e, ' already defined.'));
    on[e] = { name: e, dependencies: t, callback: n, wasLoaded: !1, html: i, css: r };
  }
  function sn(e, t) {
    var n = [];
    e.dependencies.forEach(function (t) {
      var i = W[t];
      if (i) n.push(i);
      else {
        var r = on[t];
        if (!r) throw new Error('DI error: Module '.concat(t, ' not defined. Required by: ').concat(e.name));
        r.wasLoaded ? n.push(r.exports) : n.push(sn(r));
      }
    });
    var i = {};
    try {
      (e.callback.apply(t || null, [i].concat(n)), (e.wasLoaded = !0));
    } catch (t) {
      Ye('tinyrequire', 'DI error: Cannot resolve '.concat(e.name, ' module'), t);
    }
    var r = 'default' in i ? i.default : i;
    return ((e.exports = r), (W[e.name] = r), r);
  }
  function ln(e, t) {
    var n = W[e];
    if (n) return n;
    var i = on[e];
    if (!i) throw new Error('Tinyrequire error: Module "'.concat(e, '" does not exist'));
    return i.wasLoaded ? i.exports : sn(i, t);
  }
  var cn = Object.freeze({ __proto__: null, define: an, modules: on, require: ln });
  L.CanvasLayer = L.Layer.extend({
    initialize: function (e) {
      (L.Util.setOptions(this, e || {}), (this.targetPane = 'tilePane'), (this._showCanvasOn = !0), this.onInit());
    },
    addTo: function (e) {
      return ((this.failed = !1), e.addLayer(this), this);
    },
    onContextLost: function () {
      Ye('CanvasLayer', 'Canvas context is lost');
    },
    onContextRestored: function () {
      Ye('CanvasLayer', 'Canvas context is restored');
    },
    onContextCreationError: function (e) {
      Ye('CanvasLayer', 'Canvas context creation error: '.concat(e.statusMessage || 'Unknown error'));
    },
    canvasHooks: function (e, t) {
      if (e) {
        var n = t ? 'addEventListener' : 'removeEventListener';
        (e[n]('webglcontextlost', this.onContextLost, !1),
          e[n]('webglcontextrestored', this.onContextRestored, !1),
          e[n]('webglcontextcreationerror', this.onContextCreationError, !1));
      } else Ye('GlParticles', 'No canvas '.concat(t ? 'start' : 'stop', ' listening context changes'));
    },
    onAdd: function (e) {
      this._map = e;
      var t = e.getSize(),
        n = e.options.zoomAnimation && L.Browser.any3d;
      return (
        (this._canvas = L.DomUtil.create('canvas', 'leaflet-canvas')),
        this.canvasHooks(this._canvas, !0),
        this.onResizeCanvas(t.x, t.y),
        L.DomUtil.addClass(this._canvas, 'leaflet-layer leaflet-zoom-' + (n ? 'animated' : 'hide')),
        e.getPanes()[this.targetPane].appendChild(this._canvas),
        this.onCreateCanvas(this._canvas)
          ? (e.on('resize', this._resize, this),
            e.on('zoomanim', this._animateZoom, this),
            e.on('zoom', this._onZoom, this),
            e.on('zoomstart', this._onZoomStart, this),
            e.on('zoomend', this._onZoomEnd, this),
            this.options.disableAutoReset || e.on('moveend', this._moveEnd, this),
            this._reset(),
            this._redraw(),
            this)
          : ((this.failed = !0), this.onCanvasFailed(), this)
      );
    },
    onRemove: function (e) {
      var t;
      return (
        this.onRemoveCanvas(null !== (t = this._canvas) && void 0 !== t ? t : void 0),
        e.getPanes()[this.targetPane].removeChild(this._canvas),
        e.off('resize', this._resize, this),
        e.off('zoomanim', this._animateZoom, this),
        e.off('zoom', this._onZoom, this),
        e.off('zoomstart', this._onZoomStart, this),
        e.off('zoomend', this._onZoomEnd, this),
        this.options.disableAutoReset || e.off('moveend', this._moveEnd, this),
        this.canvasHooks(this._canvas, !1),
        (this._canvas = null),
        this
      );
    },
    getCanvas: function () {
      return this._canvas;
    },
    showCanvas: function (e) {
      this._showCanvasOn !== e &&
        ((this._showCanvasOn = e), (this._canvas.style.display = this._showCanvasOn ? 'block' : 'none'));
    },
    onResizeCanvas: function (e, t) {
      ((this._canvas.width = e), (this._canvas.height = t));
    },
    _resize: function (e) {
      this.onResizeCanvas(e.newSize.x, e.newSize.y);
    },
    _reset: function () {
      if (this._map && this._canvas) {
        var e = this._map.containerPointToLayerPoint([0, 0]);
        (L.DomUtil.setPosition(this._canvas, e),
          (this._center = this._map.getCenter()),
          (this._zoom = this._map.getZoom()),
          this.onReset());
      }
    },
    reset: function () {
      this._reset();
    },
    onReset: function () {},
    _redraw: function () {
      this._frame = null;
    },
    redraw: function () {
      return (this._frame || (this._frame = L.Util.requestAnimFrame(this._redraw, this)), this);
    },
    _moveEnd: function () {
      (this._reset(), this.onMoveEnd());
    },
    _onZoomStart: function () {
      this.wasOnZoom = !1;
    },
    _onZoomEnd: function () {
      this.canvasDisplay(!0);
    },
    canvasDisplay: function (e) {
      this._canvas && (this._canvas.style.display = e ? 'block' : 'none');
    },
    _animateZoom: function (e) {
      this.wasOnZoom && this.canvasDisplay(!1);
      var t = this._map.getZoomScale(e.zoom),
        n = this._map._latLngBoundsToNewLayerBounds(this._map.getBounds(), e.zoom, e.center).min;
      L.DomUtil.setTransform(this._canvas, n, t);
    },
    _onZoom: function () {
      ((this.wasOnZoom = !0), this._updateTransform(this._map.getCenter(), this._map.getZoom()));
    },
    _updateTransform: function (e, t) {
      if (this._map && this._canvas && this._center) {
        var n = this._map.getZoomScale(t, this._zoom),
          i = this._canvas._leaflet_pos || new L.Point(0, 0),
          r = this._map.getSize().multiplyBy(0.5 + (this.options.padding || 0)),
          o = this._map.project(this._center, t),
          a = this._map.project(e, t).subtract(o),
          s = r.multiplyBy(-n).add(i).add(r).subtract(a);
        L.DomUtil.setTransform(this._canvas, s, n);
      }
    },
    onInit: function () {},
    onCreateCanvas: function () {
      return !0;
    },
    onCanvasFailed: function () {},
    onRemoveCanvas: function () {},
    onMoveEnd: function () {},
    onZoomEnd: function () {},
  });
  var un,
    dn = new Ke({ ident: 'bcast' });
  try {
    un = decodeURIComponent(window.location.pathname);
  } catch (e) {
    un = '/';
  }
  var hn,
    fn,
    mn = un,
    pn = null,
    vn = null;
  ((hn = /^\/(zh-TW|[a-z]{2})(\/.*)?$/.exec(un)) && Me(hn[1]) && ((pn = hn[1]), (un = hn[2])),
    (fn = /^\/-(?:[^0-9/][^/]+)(?:-(\w+))(?:[^/]*)$/.exec(un))
      ? ((vn = fn[1]), (un = '/'), vt.set('overlay', vn))
      : (fn = /^\/-(?:[^0-9/][^/]+)?(\/.+)$/.exec(un)) && (un = fn[1]));
  var gn,
    yn = { lang: pn, purl: un, startupUrl: mn, overlay: vn },
    wn = {
      main: { loaded: 'en', filename: 'lang/{lang}.json', test: 'MON' },
      station: { filename: 'lang/station/{lang}.json', test: 'RADIATION_SAFE_LEVEL' },
      widgets: { filename: 'lang/widgets/{lang}.json', test: 'EMBED_SELECT_VIEW' },
      alerts: { filename: 'lang/alerts/{lang}.json', test: 'ALERT_DELETE' },
      articles: { filename: 'lang/articles/{lang}.json', test: 'ARTICLES_REWARD_WITH_CLAP' },
      favs: { filename: 'lang/favs/{lang}.json', test: 'FAVS_HOW_TO_ADD' },
      hurricanes: { filename: 'lang/hurricanes/{lang}.json', test: 'HURR_PREDICTED_RADIUS' },
      info: { filename: 'lang/info/{lang}.json', test: 'NOW_AT_ANY_MOMENT' },
      products: { filename: 'lang/products/{lang}.json', test: 'waves' },
      settings: { filename: 'lang/settings/{lang}.json', test: 'S_LANG' },
      sounding: { filename: 'lang/sounding/{lang}.json', test: 'SOUNDING_TITLE' },
      register: { filename: 'lang/register/{lang}.json', test: 'ALREADY_REGISTERED' },
      webcams: { filename: 'lang/webcams/{lang}.json', test: 'CAM_STREAM' },
      subscription: { filename: 'lang/subscription/{lang}.json', test: 'SUB_RESTORE_CTA' },
      notifications: { filename: 'lang/notifications/{lang}.json', test: 'NOTIF_ALERT_TITLE' },
      watchface: { filename: 'lang/watchface/{lang}.json', test: 'WATCHFACES_TITLE' },
      appreview: { filename: 'lang/appreview/{lang}.json', test: 'INTROPAGE_TITLE_QUESTION' },
      lib: { filename: 'lang/lib/{lang}.json', test: 'DO_YOU_LIKE_THIS_MAP' },
      menu: { filename: 'lang/menu/{lang}.json', test: 'MM_SUBSCRIBE' },
      distance: { filename: 'lang/distance/{lang}.json', test: 'DST_ADD_WAYPOINT' },
      consent: { filename: 'lang/consent/{lang}.json', test: 'CONSENT_TITLE' },
    },
    bn = {
      MON: 'Monday',
      TUE: 'Tuesday',
      WED: 'Wednesday',
      THU: 'Thursday',
      FRI: 'Friday',
      SAT: 'Saturday',
      SUN: 'Sunday',
      MON2: 'Mon',
      TUE2: 'Tue',
      WED2: 'Wed',
      THU2: 'Thu',
      FRI2: 'Fri',
      SAT2: 'Sat',
      SUN2: 'Sun',
      SMON01: 'Jan',
      SMON02: 'Feb',
      SMON03: 'Mar',
      SMON04: 'Apr',
      SMON05: 'May',
      SMON06: 'Jun',
      SMON07: 'Jul',
      SMON08: 'Aug',
      SMON09: 'Sep',
      SMON10: 'Oct',
      SMON11: 'Nov',
      SMON12: 'Dec',
      TODAY: 'Today',
      TOMORROW: 'Tomorrow',
      LATER: 'Later',
      ALL: 'All',
      HOURS_SHORT: 'hrs',
      FOLLOW: 'Follow us',
      EMBED: 'Embed widget on page',
      MENU: 'Menu',
      MENU_SETTINGS: 'Settings',
      MENU_HELP: 'Help',
      MENU_ABOUT: 'About us',
      MENU_LOCATION: 'Find my location',
      MENU_FULLSCREEN: 'Fullscreen mode',
      MENU_DISTANCE: 'Distance & planning',
      MENU_HISTORICAL: 'Show historical data',
      MENU_MOBILE: 'Download App',
      MENU_FAVS: 'Favorites',
      MENU_FEEDBACK: 'Feedback',
      MENU_UPLOAD: 'Upload KML, GPX or geoJSON file',
      MENU_VIDEO: 'Create video or animated GIF',
      MENU_PLUGIN: 'Install Windy plugin',
      MENU_ERROR: 'Error console',
      MENU_NEWS: 'Weather news',
      NOTIFICATIONS: 'Notifications',
      SHOW_PICKER: 'Show weather picker',
      TOOLBOX_INFO: 'info',
      TOOLBOX_ANIMATION: 'animation',
      TOOLBOX_START: 'Hide/show animated particles',
      MENU_F_MODEL: 'Data',
      MENU_U_INTERVAL: 'Update interval',
      MENU_D_UPDATED: 'Updated',
      OUTDATED: 'Outdated',
      MENU_D_REFTIME: 'Reference time',
      MENU_D_NEXT_UPDATE: 'Next update expected at:',
      ABOUT_OVERLAY: 'About',
      ABOUT_DATA: 'About these data',
      OVERLAY: 'Layer',
      MODEL: 'Forecast model',
      PROVIDER: 'Provider',
      WIND: 'Wind',
      GUST: 'Wind gusts',
      GUSTACCU: 'Wind accumulation',
      TURBULENCE: 'Clear air turbulence',
      TURBULENCE_NONE: 'none',
      TURBULENCE_LIGHT: 'light',
      TURBULENCE_MODERATE: 'moderate',
      TURBULENCE_SEVERE: 'severe',
      TURBULENCE_EXTREME: 'extreme',
      ICING: 'Icing severity',
      WIND_DIR: 'Wind dir.',
      TEMP: 'Temperature',
      DISTANCE: 'Distance',
      PRESS: 'Pressure',
      CLOUDS: 'Clouds, rain',
      CLOUDS2: 'Clouds',
      CLOUD_ALT: 'Cloud base',
      RADAR: 'Weather radar',
      RADAR_BLITZ: 'Radar, lightning',
      SATELLITE: 'Satellite',
      TOTAL_CLOUDS: 'Total clouds',
      LOW_CLOUDS: 'Low clouds',
      MEDIUM_CLOUDS: 'Medium clouds',
      HIGH_CLOUDS: 'High clouds',
      CAPE: 'CAPE Index',
      RAIN: 'Rain, snow',
      RAIN_THUNDER: 'Rain, thunder',
      RAIN3H: 'Precip. past 3h',
      JUST_RAIN: 'Rain',
      CONVECTIVE_RAIN: 'Convective r.',
      RAINRATE: 'Max. rain rate',
      LIGHT_THUNDER: 'Light thunder',
      THUNDER: 'Thunderstorms',
      HEAVY_THUNDER: 'Heavy thunder',
      SNOW: 'Snow',
      OZONE: 'Ozone layer',
      PM2P5: 'PM2.5',
      AIR_QUALITY: 'Air quality',
      NO22: 'NO₂',
      AOD550: 'Aerosol',
      TCSO2: 'SO₂',
      GO3: 'Surface Ozone',
      SHOW_GUST: 'force of wind gusts',
      RH: 'Humidity',
      WAVES: 'Waves',
      WAVES2: 'Waves, sea',
      SWELL: 'Swell',
      SWELL1: 'Swell 1',
      SWELL2: 'Swell 2',
      SWELL3: 'Swell 3',
      WWAVES: 'Wind waves',
      ALL_WAVES: 'All waves',
      SWELLPER: 'Swell period',
      RACCU: 'Rain accumulation',
      SACCU: 'Snow accumulation',
      ACCU: 'Accumulations',
      RAINACCU: 'RAIN ACCUMULATION',
      SNOWACCU: 'SNOW ACCUMULATION',
      SNOWCOVER: 'Actual Snow Cover',
      SST: 'Surface sea temperature',
      SST2: 'Sea temperature',
      WATER_TEMP: 'Water temp.',
      CURRENT: 'Currents',
      CURRENT_TIDE: 'Tidal currents',
      VISIBILITY: 'Visibility',
      SURFACE_VISIBILITY: 'Surface visibility',
      ACTUAL_TEMP: 'Actual temperature',
      SSTAVG: 'Average sea temperature',
      AVAIL_FOR: 'Available for:',
      DEW_POINT: 'Dew point',
      DEW_POINT_SPREAD: 'Dew point spread',
      ISA_DIFFERENCE: 'ISA difference',
      SLP: 'Pressure (sea l.)',
      QFE: 'Station pressure',
      SNOWDEPTH: 'Snow depth',
      NEWSNOW: 'New snow',
      SNOWDENSITY: 'Snow density',
      GH: 'Geopot. height',
      FLIGHT_RULES: 'Flight rules',
      CTOP: 'Cloud tops',
      FREEZING: 'Freezing altitude',
      COSC: 'CO concentration',
      DUSTSM: 'Dust mass',
      WX_WARNINGS: 'Weather warnings',
      PTYPE: 'Precip. type',
      CCL: 'Thermals',
      FOG: 'Fog',
      HAZE: 'Haze',
      NO_FOG: 'No fog',
      FOG_RIME: 'Fog and rime',
      FLOOD: 'Flood',
      FIRE: 'Fire',
      EFORECAST: 'Extreme forecast',
      RADAR_SAT: 'Radar & Satellite',
      FZ_RAIN: 'Freezing rain',
      MX_ICE: 'Mixed ice',
      WET_SN: 'Wet snow',
      RA_SN: 'Rain with snow',
      PELLETS: 'Ice pellets',
      HAIL: 'Hail',
      ELEVATION: 'Elevation',
      ACTIVE_FIRES: 'Active fires',
      FIRE_INTENSITY: 'Fire intensity',
      SOIL_PROFILE_DEPTH: 'Soil profile depth',
      INTERSUCHO: 'Drought monitoring',
      INTERSUCHO_FIRE_DANGER: 'Fire danger',
      INTERSUCHO_AWD: 'Moisture anomaly',
      INTERSUCHO_AWP: 'Drought intensity',
      INTERSUCHO_AWR: 'Soil moisture',
      INTERSUCHO_FWI: 'Fire spread',
      INTERSUCHO_DFM: 'Fuel moisture',
      INTERSUCHO_40: '0-40cm',
      INTERSUCHO_100: '0-100cm',
      INTERSUCHO_AWP_0: 'No risk',
      INTERSUCHO_AWP_1: 'Minor',
      INTERSUCHO_AWP_2: 'Mild',
      INTERSUCHO_AWP_3: 'Moderate',
      INTERSUCHO_AWP_4: 'Severe',
      INTERSUCHO_AWP_5: 'Exceptional',
      INTERSUCHO_AWP_6: 'Extreme',
      INTERSUCHO_FWI_1: 'Very low',
      INTERSUCHO_FWI_2: 'Low',
      INTERSUCHO_FWI_3: 'Moderate',
      INTERSUCHO_FWI_4: 'High',
      INTERSUCHO_FWI_5: 'Very high',
      INTERSUCHO_FWI_6: 'Extreme',
      MORE_LAYERS: 'More layers...',
      MORE_PRODUCTS: '{{count}} more',
      NONE: 'None',
      ACC_LAST_DAYS: 'Last {{num}} days',
      ACC_LAST_HOURS: 'Last {{num}} hours',
      ACC_NEXT_DAYS: 'Next {{num}} days',
      ACC_NEXT_HOURS: 'Next {{num}} hours',
      ALTITUDE: 'Altitude',
      SFC: 'Surface',
      CLICK_ON_LEGEND: 'Click to change units',
      ALTERNATIVE_UNIT_CHANGE: 'Any Layer unit can be changed by clicking on color legend',
      COPY_TO_C: 'Copy to clipboard',
      SEARCH: 'Search location...',
      JUST_SEARCH: 'Search',
      NEXT: 'Next results...',
      LOW_PREDICT: 'Low predictability of forecast',
      DAYS_AGO: '{{daysago}} days ago:',
      SHOW_ACTUAL: 'Show actual forecast',
      SHARE: 'Share',
      SHARE_FCST: 'Share forecast',
      SHARE_LINK: 'Share link',
      SHARE_SOCIAL_MEDIA_HEADING: 'Share on social media',
      JUST_EMBED: 'Embed',
      POSITION: 'Position',
      WIDTH: 'Width',
      HEIGHT: 'Height',
      DEFAULT_UNITS: 'Default units',
      NOW: 'Now',
      FORECAST_FOR: 'Forecast for',
      ZOOM_LEVEL: 'Zoom level',
      EXPERT_MODE: 'Expert mode',
      EXPERT_MODE_DESC: 'Do not fold overlays in quick menu',
      DETAILED: 'Detailed forecast for this location',
      PERIOD: 'Period',
      DRAG_ME: 'Drag me if you want',
      D_FCST: 'Forecast for this location',
      D_WEBCAMS: 'Webcams in vicinity',
      D_STATIONS: 'Nearest weather stations',
      D_NO_WEBCAMS: "There are no webcams around this location (or we don't know about them)",
      D_DAYLIGHT: 'image during daylight',
      D_DISTANCE: 'distance',
      D_MILES: 'miles',
      D_MORE_THAN_HOUR: 'more than hour ago',
      D_MIN_AGO: '{{duration}} minutes ago',
      D_SUNRISE: 'Sunrise',
      D_SUNSET: 'sunset',
      D_DUSK: 'dusk',
      D_SUN_NEVER_SET: 'Sun never set',
      D_POLAR_NIGHT: 'Polar night',
      D_LT2: 'local time',
      D_FAVORITES: 'Add to Favorites',
      D_FAVORITES2: 'Remove from Favorites',
      D_WAVE_FCST2: 'Waves and sea',
      D_MISSING_CAM: 'Add new webcam',
      D_HOURS: 'Hours',
      D_TEMP2: 'Temp.',
      D_PRECI: 'Precit.',
      D_ABOUT_LOC: 'About this location',
      D_ABOUT_LOC2: 'About location',
      D_TIMEZONE: 'Timezone',
      D_WEBCAMS_24: 'Show last 24 hours',
      D_FORECAST_FOR: '{{duration}} days forecast',
      D_1H_FORECAST: '1h forecast',
      D_STEPS_1_HOUR: '1 hour',
      D_STEPS_3_HOURS: '3 hours',
      D_STEPS_FORECAST: 'forecast',
      D_DISPLAY_AS: 'Display as:',
      D_FCST_MODEL: 'Fcst model:',
      E_MESSAGE: 'Awesome weather forecast at',
      METAR_VAR: 'Variable',
      METAR_MIN_AGO: '{DURATION}m ago',
      METAR_HOURS_AGO: '{DURATION}h ago',
      METARS_H_M_AGO: '{DURATION}h {DURATIONM}m ago',
      METARS_DAYS_AGO: '{DURATION} days ago',
      METAR_MIN_LATER: 'in {DURATION}m',
      METAR_HOURS_LATER: 'in {DURATION}h',
      METARS_H_M_LATER: 'in {DURATION}h {DURATIONM}m',
      METARS_DAYS_LATER: 'in {DURATION} days',
      DEVELOPED: 'Developed with',
      FAVS_DELETE: 'delete',
      FAVS_SYNCHRO_ERROR_TITLE: 'Favorites sync error',
      SHOW_ON_MAP: 'Display on map',
      POI_STATIONS: 'Weather stations',
      POI_AD: 'Airports',
      POI_AIRQ: 'Air quality stations',
      POI_CAMS: 'Webcams',
      POI_PG: 'Paragliding spots',
      POI_KITE: 'Kite/WS spots',
      POI_SURF: 'Surfing spots',
      POI_EMPTY: 'Empty map',
      POI_WIND: 'Reported wind',
      POI_TEMP: 'Reported temp.',
      POI_PRECIP: 'Recent precip.',
      POI_FAVS: 'My favorites',
      POI_FCST: 'Forecasted weather',
      POI_TIDE: 'Tide forecast',
      POI_RADIATION: 'Radiation',
      POI_RADIOSONDE: 'Radiosondes',
      P_ANDROID_APP: 'Windy for Android, free on Google Play',
      ND_MODEL: 'Forecast model',
      ND_COMPARE: 'Compare forecasts',
      ND_DISPLAY: 'Display',
      ND_DISPLAY_BASIC: 'Basic',
      S_ADVANCED_SETTINGS: 'Advanced settings',
      S_COLORS: 'Customize color scale',
      S_SAVE: 'Save',
      S_SAVE2: 'Login/Register to save all your settings to the cloud',
      S_SAVE_AUTO: 'Your settings are saved to the cloud',
      S_SPEED: 'Speed',
      S_ADD_OVERLAYS: 'Show / add more layers',
      S_OVR_QUICK: 'Add to quick menu',
      S_DELETE_INFO: 'Delete all my data from this device',
      U_LOGIN: 'Login',
      U_LOGOUT: 'Logout',
      U_PROFILE: 'My profile',
      OVR_RECOMENDED: 'Recommended for:',
      OVR_ALL: 'All',
      OVR_FLYING: 'Flying',
      OVR_WATER: 'Water',
      OVR_SKI: 'Ski',
      MSG_OFFLINE: 'WOW it appears that you are offline :-(',
      MSG_ONLINE_APP: 'Online again, click here to reload app :-)',
      MSG_LOGIN_SUCCESFULL: 'You have successfully logged in!',
      FIELD_CANNOT_BE_EMPTY: "This field can't be empty",
      FIELD_INVALID_EMAIL: "This doesn't look like an email address",
      PASSWORD_EMPTY: "Password can't be empty",
      PASSWORD_SHORT: 'Password is too short',
      PASSWORD_MISSING_DIGIT: 'Password is missing a digit (0-9)',
      PASSWORD_MISSING_UPPERCASE: 'Password is missing an uppercase letter (A-Z)',
      PASSWORD_MISSING_LOWERCASE: 'Password is missing a lowercase letter (a-z)',
      PASSWORD_DO_NOT_MATCH: "Password and confirmation don't match",
      ALERTS_LINK_SHORT: 'Alert for this spot',
      MY_ALERTS: 'My Alerts',
      ACTIVE_ALERTS: 'active alerts',
      DIRECTION_N: 'N',
      DIRECTION_NE: 'NE',
      DIRECTION_E: 'E',
      DIRECTION_SE: 'SE',
      DIRECTION_S: 'S',
      DIRECTION_SW: 'SW',
      DIRECTION_W: 'W',
      DIRECTION_NW: 'NW',
      DIRECTIONS: 'Directions',
      DIRECTIONS_ANY: 'Any direction',
      ACTIVATE: 'Activate',
      DEACTIVATE: 'Deactivate',
      REGISTER: 'Register',
      REGISTER_HERE: 'Register here',
      DONT_HAVE_ACCOUNT: "Don't have an account?",
      OR: 'or',
      JUST_LOGIN: 'Login',
      MY_ACCOUNT: 'My account',
      EDIT_ALERT: 'Edit alert',
      FAVS_RENAME: 'Rename',
      ADD_ALERT: 'Create alert',
      HOME: 'Home',
      MAP: 'Map',
      MORE: 'More',
      LESS: 'Less',
      COMPARE: 'Compare',
      PRESS_ISOLINES: 'Pressure isolines',
      PART_ANIMATION: 'Particles animation',
      CAMS_PREVIEWS: 'Webcams previews',
      R_TIME_RANGE: 'Time range',
      MY_LOCATION: 'My location',
      D_ISOLINES: 'Display isolines',
      ARTICLES: 'Articles',
      NEW: 'New!',
      WHAT_IS_NEW: 'What is new:',
      PRIVACY: 'Privacy protection',
      CONSENT: 'Cookie consent',
      TERMS_OF_USE: 'Terms of Use',
      PRIVACY_POLICY: 'Privacy policy',
      SOUNDING: 'Sounding',
      SOUND_ON: 'Sound',
      BLITZ_ON: 'Show lightning',
      WFORECAST: 'weather forecast',
      TITLE: 'Wind map & weather forecast',
      HURR_TRACKER: 'Hurricane tracker',
      TOC: 'Terms and conditions',
      SEND: 'Send',
      SEARCH_LAYER: 'Search layer...',
      CANCEL_SEARCH: 'Cancel search',
      NOTHING_FOUND: 'Nothing found',
      P_LOGIN_SYNC:
        'Please <b>login</b> or <b>register</b> to synchronize all your favorites and settings with all your devices.',
      P_LOCATION:
        'Please allow Windy to use location services (GPS) while using the app, so we can show weather at your location. We do not store your location at our servers.',
      DONE: 'Done',
      HMAP: 'Outdoor map',
      LICENCE: 'Licence',
      LIST: 'list',
      GALLERY: 'gallery',
      AIRQ_RANGE_GOOD: 'Good',
      AIRQ_RANGE_MODERATE: 'Moderate',
      AIRQ_RANGE_UNHEALTHY_SENSITIVE: 'Unhealthy for sensitive',
      AIRQ_RANGE_UNHEALTHY: 'Unhealthy',
      AIRQ_RANGE_VERY_UNHEALTHY: 'Very unhealthy',
      AIRQ_RANGE_HAZARDOUS: 'Hazardous',
      POI_MAX_LAYERS: 'Maximum is {{num}} favorite layers. Remove some to add new ones.',
      MENU_WATCHFACES: 'Apple Watch Faces',
      WIND_SPEED: 'Wind speed',
      SOLARPOWER: 'Solar power',
      UVINDEX: 'UV Index',
      WETBULB_TEMP: 'Wet-bulb temp.',
      UV_LOW: 'Low',
      UV_MODERATE: 'Moderate',
      UV_HIGH: 'High',
      UV_VERY_HIGH: 'Very high',
      UV_EXTREME: 'Extreme',
      UV_HIGHEST: 'Highest',
      SUB_GO: 'Go Premium',
      SUB_RENEW: 'Renew Premium',
      SUB_HAVE_REFTIME: 'Premium users have just received a new forecast update',
      SUB_ALERTS_FREE_LIMIT:
        'You have reached the <strong>maximum</strong> limit of free favorites and alerts. Subscribe to <strong>Windy Premium</strong> to remove this limitation.',
      SUB_GLOBE_FREE_LIMIT: 'Full version of 3D mode is available only to Premium users.',
      SUB_REASON_TIDES: '<strong>Tide forecast</strong> anywhere in the world',
      SUB_REASON_FREQUENCY: 'Forecast <strong>updates</strong> at least <strong>4 times a day</strong>',
      SUB_REASON_GRANULARITY: '<strong>1-hour</strong> forecast step',
      SUB_REASON_LONGTERM: '<strong>10-day forecast</strong> outlook',
      SUB_OTHER_BENEFITS: 'And many other <strong>benefits</strong>',
      SUB_SEE_DETAILS: 'See details',
      SUB_CUFFS_GRACED: "We're having issues with renewing your subscription",
      SUB_CUFFS_PAUSED: 'Your Premium is paused',
      SUB_CUFFS_CANCELED_1: 'Your subscription ends soon',
      SUB_CUFFS_CANCELED_2: 'Your subscription ends in {{count}} days',
      SUB_CUFFS_CANCELED_3: 'Your subscription ends in {{count}} hours',
      SUB_CUFFS_CANCELED_4: 'Your subscription ends at any moment',
      SUB_CUFFS_FORECAST: 'Soon, you will no longer have access to 10-day forecast',
      SUB_CUFFS_FEATURE: 'Soon, you will no longer have access to this feature.',
      SUB_CUFFS_FAVS: 'You can then have a maximum of 3 favorite places and alerts.',
      SUBSCRIPTION: 'Subscription',
      MY_SUBSCRIPTION: 'My subscription',
      RPLANNER: 'Route planner',
      DISPLAY_WARNINGS: 'Display warnings for this location',
      DATA_NOT_AVBL: 'Data not available for this location',
      PROMO_SUB_RESOLUTION:
        'Subscribe to <strong>Windy Premium</strong> and get access to higher data resolution of local models.',
      PROMO_LONG_PRESS_HOME:
        'Use <strong>long tap</strong> on home button to open detailed forecast for your location.',
      DETAIL_TIME_ON_MAP: 'Time of forecast on map',
      PROMO_PICKER: '<span class="dotted">Open Settings</span> to change the auto closing time of weather picker.',
      OFFLINE_MODE: 'Offline mode',
      DETAIL_DRAG_CHECKBOX: 'Move the map to change the forecast location',
      DETAIL_SET_UP_ALERT: 'Set up Windy Alert for this location and never miss your desired conditions.',
      METAR_HELIPORTS: 'Display heliports',
      GETTING_LOCATION: 'Getting your location...',
      WAVESTIDES: 'Wave&Tide',
      TIDES: 'Tides',
      WAVESTIDES_BROWSER_TITLE: 'Wave and tide forecast for {{name}}',
      PARAGLIDING_BROWSER_TITLE: 'Paragliding forecast for {{name}}',
      WIND_BROWSER_TITLE: 'Wind and kitesurfing forecast for {{name}}',
      D_AQI_RADIATION: 'Air quality and radiation monitoring',
      RADIATION_OK: 'Radiation OK',
      RADIATION_HIGH: 'Radiation high',
      VIEWS: 'views',
      AREA: 'Area',
    },
    Tn = 'en',
    En = vt.get('lang'),
    Sn = yn.lang || ne;
  function _n() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '';
    return /\|/.test(e)
      ? e.replace(/(\w+)\|(\w+):(\w+)/, function (t, n, i, r) {
          var o = bn[n];
          return o && r ? o.replace(/\{\{[^}]+\}\}/g, r) : e;
        })
      : bn[e] || e;
  }
  ('auto' !== En && Me(En) && (Sn = En),
    Sn && (Me(Sn) ? (Tn = Sn) : (Sn = Sn.replace(/-\S+$/, '')) !== (Tn = Me(Sn) ? Sn : 'en') && (gn = Sn)));
  var An = function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = ft.get(e);
      return n && (t.absoluteURL || n.version === C) && (!t.test || (n.data && t.test && n.data[t.test]))
        ? Promise.resolve(n.data)
        : new Promise(function (n, i) {
            Xt(t.absoluteURL ? e : ''.concat(U, '/').concat(e), { json: !0 })
              .then(function (r) {
                var o = r.data;
                t.test && !(t.test in o)
                  ? i('File did not passed the test')
                  : (ft.put(e, { data: o, version: t.absoluteURL ? 'notAplicable' : C }), n(o));
              })
              .catch(function (e) {
                (Ye('storage', 'Failed to load lang file as .json', e), i(e));
              });
          });
    },
    Pn = function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Tn;
      return new Promise(function (n, i) {
        if (wn[e].loaded !== t) {
          var r = wn[e],
            o = r.filename,
            a = r.test,
            s = Se(o, { lang: t });
          An(s, { absoluteURL: !1, test: a })
            .then(function (i) {
              (Object.assign(bn, i), (wn[e].loaded = t), n(i));
            })
            .catch(i);
        } else n();
      });
    },
    kn = ['title', 'placeholder', 't', 'afterbegin', 'beforeend', 'tooltipsrc'],
    Cn = function (e) {
      kn.forEach(function (t) {
        for (var n = e.querySelectorAll('[data-'.concat(t, ']')), i = 0, r = n.length; i < r; i++) {
          var o = n[i],
            a = _n(o.dataset[t]);
          switch (t) {
            case 't':
              /</.test(a) ? (o.innerHTML = a) : (o.textContent = a);
              break;
            case 'title':
            case 'placeholder':
              t in o && (o[t] = a);
              break;
            case 'tooltipsrc':
              o.dataset.tooltip = a;
              break;
            case 'afterbegin':
              (o.firstChild && 3 == o.firstChild.nodeType && o.removeChild(o.firstChild), o.insertAdjacentHTML(t, a));
              break;
            case 'beforeend':
              (o.lastChild && 3 == o.lastChild.nodeType && o.removeChild(o.lastChild), o.insertAdjacentHTML(t, a));
          }
        }
      });
    };
  function On(e) {
    var t = Object.keys(wn)
      .filter(function (e) {
        return wn[e].loaded;
      })
      .map(function (t) {
        return Pn(t, e);
      });
    Promise.all(t).then(function () {
      (Cn(document.body), (Tn = e), vt.set('usedLang', e), (document.documentElement.lang = e));
    });
  }
  var Ln = function () {
    (Cn(document.body),
      On(Tn),
      vt.on('lang', function (e) {
        'auto' !== e && e !== vt.get('usedLang') && On(e);
      }));
  };
  'loading' !== document.readyState ? Ln() : document.addEventListener('DOMContentLoaded', Ln);
  var In = Object.freeze({
      __proto__: null,
      files: wn,
      getFile: An,
      loadLangFile: Pn,
      get missingLang() {
        return gn;
      },
      t: bn,
      translateDocument: Cn,
    }),
    Rn = window.screen,
    xn = We({
      ul: ne,
      sr: ''.concat(Rn.width, 'x').concat(Rn.height),
      cid: It(),
      an: 'Windy',
      uh: String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, ''),
    }),
    Nn = 1;
  Nn = 2;
  var Mn,
    Dn = !0,
    Un = null,
    Wn = function () {
      Un = Date.now();
    },
    Fn = function () {
      if (Un && Mn) {
        var e = Un - Date.now();
        ((Un = null), (Mn = Math.max(0, Mn - e)));
      }
    };
  (window.addEventListener('focus', Fn, !1),
    window.addEventListener('blur', Wn, !1),
    window.addEventListener('pageshow', Fn, !1),
    window.addEventListener('pagehide', Wn, !1),
    document.addEventListener('visibilitychange', function () {
      'hidden' in document && document.hidden ? Wn() : Fn();
    }));
  var Gn,
    Hn = function (e) {
      var t = 'dp='.concat(e, '&dl=').concat(encodeURIComponent(document.location.href), '&').concat(xn);
      if (((t += '&fv='.concat(Dn, '&ss=').concat(Dn)), (t += '&dt='.concat(window.W.startTs)), Dn)) {
        var n = document.referrer;
        (/www.windy.com/.test(n) || (t += '&dr='.concat(encodeURIComponent(n))), (Dn = !1), (Mn = Date.now()));
      }
      var i = Date.now(),
        r = i - Mn;
      ((Mn = i), (t += '&et='.concat(r)), $t('/sedlina/ga/'.concat(Nn, '?').concat(t), { cache: !1 }));
    },
    zn = Object.freeze({ __proto__: null, pageview: Hn });
  !(function (e) {
    ((e[(e.Pending = 0)] = 'Pending'), (e[(e.Sent = 1)] = 'Sent'));
  })(Gn || (Gn = {}));
  var Bn = new Set(['path', 'isolines', 'overlay', 'product', 'level']),
    jn = {},
    Vn = vt.get('consent'),
    Yn = Vn ? (Vn.analytics ? 'analytics' : 'rejected') : 'pending',
    qn = function (e) {
      jn[e] !== Gn.Sent &&
        (setTimeout(function () {
          return Hn(e);
        }, 100),
        (jn[e] = Gn.Sent));
    },
    Zn = function (e, t) {
      var n = ''.concat(e, '/').concat(t || '');
      qn(n);
    };
  ('analytics' !== Yn &&
    vt.once('consent', function (e) {
      null != e && e.analytics && ((Yn = 'analytics'), Object.keys(jn).forEach(qn));
    }),
    dn.on('paramsChanged', function (e, t) {
      if (t && Bn.has(t)) {
        var n = e[t];
        n && ('path' === t && (n = ''.concat(Math.round((vt.get('timestamp') - Date.now()) / 864e5), 'd')), Zn(t, n));
      }
    }),
    Zn('version', C));
  var Xn = function () {
      return vt.get('subscription');
    },
    Jn = function () {
      (vt.set('detail1h', !1), vt.set('startUpLastStep', null));
    },
    Qn = function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      if (
        (null === e ? Jn() : (vt.remove('failedSubscriptionPayment'), document.body.classList.add('subs-'.concat(e))),
        vt.set('subscription', e),
        t.reloadUserToken && dn.emit('userReloadInfo'),
        Zn('subscription', 'tier/'.concat(e || 'none')),
        t.subscriptionInfo)
      ) {
        var n = t.subscriptionInfo,
          i = n.state,
          r = n.platform,
          o = n.status;
        (Zn('subscription', 'state/'.concat(i)),
          Zn('subscription', 'platform/'.concat(r)),
          Zn('subscription', 'status/'.concat(o)));
      }
      return e;
    },
    Kn = function () {
      return null !== Xn();
    },
    $n = function () {
      var e = vt.get('subscriptionInfo');
      if (!e || !e.isSubscription) return null;
      if (e.isTrial) return null;
      if (['graced', 'onhold', 'paused'].includes(e.state)) return { type: e.state };
      if ('canceled' === e.state) {
        var t = Math.abs(Math.round((e.expiresAt - Date.now()) / ce));
        if (t <= 336) return { type: 'expiring', expiresInHours: t };
      }
      return null;
    },
    ei = function () {
      vt.get('pendingSubscription') && dn.emit('rqstOpen', 'pending-subscription');
    },
    ti = function (e) {
      if (!e) return '';
      if ('graced' === e.type) return bn.SUB_CUFFS_GRACED;
      if ('onhold' === e.type) return bn.SUB_RENEW;
      if ('paused' === e.type) return bn.SUB_CUFFS_PAUSED;
      if ('expiring' === e.type) {
        if (e.expiresInHours < 2) return bn.SUB_CUFFS_CANCELED_4;
        if (e.expiresInHours <= 48) return bn.SUB_CUFFS_CANCELED_3.replace('{{count}}', String(e.expiresInHours));
        if (e.expiresInHours <= 168)
          return bn.SUB_CUFFS_CANCELED_2.replace('{{count}}', String(Math.round(e.expiresInHours / 24)));
        if (e.expiresInHours <= 336) return bn.SUB_CUFFS_CANCELED_1;
      }
      return '';
    };
  (dn.once('dependenciesResolved', ei), dn.on('checkPendingSubscriptions', ei));
  var ni = Object.freeze({
      __proto__: null,
      checkPendingSubscription: ei,
      clearPendingSubscription: function () {
        vt.remove('pendingSubscription');
      },
      deactivateAllFeatures: Jn,
      getBaitTitle: ti,
      getIssue: $n,
      getTier: Xn,
      hasAny: Kn,
      setPendingSubscription: function (e) {
        vt.set('pendingSubscription', e);
      },
      setTier: Qn,
    }),
    ii = function (e, t) {
      var n = void 0 !== t ? ':' + Ee(t) : '';
      return ''
        .concat(e % 12 || 12)
        .concat(n)
        .concat(e >= 12 ? ' PM' : ' AM');
    },
    ri = function (e, t) {
      return e + ':' + (void 0 !== t ? Ee(t) : '00');
    },
    oi = function () {
      return '12h' === vt.get('hourFormat') ? ii : ri;
    },
    ai = function (e) {
      return Ee(new Date(e).getUTCHours()) + ':00Z';
    },
    si = function (e) {
      return null != e ? e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
    },
    li = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
    ci = function (e) {
      var t = Math.floor((+e + 22.5) / 45);
      return bn['DIRECTION_'.concat(li[t])] || '-';
    },
    ui = function (e) {
      return ''.concat(e, '°');
    },
    di = function (e) {
      return [Math.abs(0 | e), '°', 0 | (((e < 0 ? (e = -e) : e) % 1) * 60), "'", 0 | (((60 * e) % 1) * 60), '"'].join(
        '',
      );
    },
    hi = function (e) {
      return e.replace(/[,.]/g, ' ').replace(/₂/g, '2').replace(/₃/g, '3').replace(/\s+/g, '-').replace(/-+/g, '-');
    },
    fi = function (e) {
      return hi(e).replace(/\/+/g, '-');
    },
    mi = function (e) {
      return 'en' === e ? '' : ''.concat(e, '/');
    },
    pi = Object.freeze({
      __proto__: null,
      DD2DMS: function (e, t) {
        return [e < 0 ? 'S' : 'N', di(e), ', ', t < 0 ? 'W' : 'E', di(t)].join('');
      },
      animateViews: function (e, t) {
        setTimeout(function () {
          return (function (e, t) {
            var n = Date.now(),
              i = n + 4e3;
            !(function r() {
              var o = Math.floor(Le(n, i, Date.now()) * e);
              (t && (t.textContent = ''.concat(si(o), ' ').concat(bn.VIEWS)),
                t && o < e && window.requestAnimationFrame(r));
            })();
          })(e, t);
        }, 2e3);
      },
      countdown: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = Math.abs(e - Date.now()),
          i = Math.floor(n / 864e5),
          r = Math.floor((n % 864e5) / ce),
          o = Math.floor((n % ce) / le),
          a = Math.floor((n % le) / 1e3);
        return t.showSeconds
          ? i || r || o || a
            ? ''
                .concat(i ? ''.concat(i, ' days ') : '')
                .concat(r || i ? ''.concat(r, 'h ') : '')
                .concat(o || r || i ? ''.concat(o, 'm ') : '')
                .concat(a, 's')
            : '1s'
          : i || r || o
            ? ''
                .concat(i ? ''.concat(i, ' days ') : '')
                .concat(r || i ? ''.concat(r, 'h ') : '')
                .concat(o || r || i ? ''.concat(o, 'm') : '')
            : '1m';
      },
      getDirFunction: function () {
        return vt.get('numDirection') ? ui : ci;
      },
      getHoursFunction: oi,
      hourMinuteUTC: function (e) {
        var t = new Date(e);
        return ''.concat(Ee(t.getUTCHours()), ':').concat(Ee(t.getUTCMinutes()), 'Z');
      },
      hourUTC: ai,
      howOld: function (e) {
        var t,
          n = !1,
          i = -1;
        if ('diffMin' in e) i = +e.diffMin;
        else if ('ts' in e) i = Math.floor((Date.now() - +e.ts) / 6e4);
        else if ('min' in e) i = Math.floor(Date.now() / 6e4 - +e.min);
        else {
          if (!('ux' in e)) return '';
          i = Math.floor((Date.now() / 1e3 - +e.ux) / 60);
        }
        i < 0 && (null === (t = e.useFuture) || void 0 === t || t ? (n = !0) : (i = 0));
        if (((i = Math.abs(i)), e && e.translate)) {
          if (0 === i) return bn.NOW;
          if (i < 60) {
            var r = n ? bn.METAR_MIN_LATER : bn.METAR_MIN_AGO;
            return Se(r, { DURATION: i });
          }
          if (i < 240) {
            var o = Math.floor(i / 60),
              a = i - 60 * o,
              s = n ? bn.METARS_H_M_LATER : bn.METARS_H_M_AGO;
            return Se(s, { DURATION: o, DURATIONM: a });
          }
          if (i < 1440) {
            var l = n ? bn.METAR_HOURS_LATER : bn.METAR_HOURS_AGO;
            return Se(l, { DURATION: Math.floor(i / 60) });
          }
          var c = n ? bn.METARS_DAYS_LATER : bn.METARS_DAYS_AGO;
          return Se(c, { DURATION: Math.floor(i / 1440) });
        }
        return (
          (e.useAgo && n ? 'in ' : '') +
          (i < 60 ? Math.floor(i) + 'm' : Math.floor(i / 60) + 'h ' + Math.floor(i % 60) + 'm') +
          (e.useAgo && !n ? ' ago' : '')
        );
      },
      obsoleteClass: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 30,
          n = (Date.now() / 1e3 - e) / 60;
        return n < 0.3 * t ? 'fresh' : n < t ? 'normal' : 'obsolete';
      },
      seoLang: mi,
      seoString: fi,
      seoUrlString: hi,
      thousands: si,
      utcOffsetStr: function (e) {
        return (e < 0 ? '-' : '+') + Ee(Math.abs(Math.round(e))) + ':00';
      },
    });
  function vi(e, t, n) {
    var i = 0,
      r = e.length - 1;
    if (n) {
      if (t < e[i]) return i;
      if (t > e[r]) return r;
    }
    for (; i <= r; ) {
      var o = Math.floor((i + r) / 2),
        a = e[o],
        s = e[o + 1];
      if (a === t) return o;
      if (a < t && t < s) return t - a < s - t ? o : o + 1;
      a < t ? (i = o + 1) : (r = o - 1);
    }
  }
  var gi = (function () {
    function e(t) {
      var n, i;
      (m(this, e),
        this.initProperties(),
        Object.assign(this, t),
        (this.midnight = e.getMidnight()),
        (this.startOfTimeline = this.startOfTimeline || this.midnight),
        (this.start = this.startOfTimeline.getTime()),
        (this.days = []),
        (this.endOfcalendar = e.add(this.startOfTimeline, this.calendarHours)),
        (this.endOfCal = this.endOfcalendar.getTime()),
        (this.maxTimestamp = this.endOfcalendar.getTime()),
        (this.type =
          this.endOfcalendar < this.midnight
            ? 'historical'
            : this.startOfTimeline < this.midnight
              ? 'mixed'
              : 'forecast'),
        (this.timestamps = []),
        (this.paths = []),
        this.minifestFile && this.createTimestampsFromMinifest(this.minifestFile)
          ? (this.minifestValid = !0)
          : (this.createTimestamps(), (this.minifestValid = !1)),
        (this.end =
          null !== (n = t.lastTimestamp) && void 0 !== n
            ? n
            : Math.min(this.timestamps[this.timestamps.length - 1], this.endOfCal)));
      for (var r = e.add(this.startOfTimeline, 12), o = 0; o < this.calendarHours / 24; o++) {
        var a = e.add(this.startOfTimeline, o, 'days').getTime(),
          s = e.add(this.startOfTimeline, 24),
          l = e.add(s, o, 'days').getTime(),
          c = e.add(r, o, 'days'),
          u = c.getTime(),
          d = e.weekdays[c.getDay()];
        this.days[o] = {
          display: ''.concat(d, '2'),
          displayLong: d,
          day: c.getDate(),
          middayTs: u,
          start: a,
          end: l,
          month: c.getMonth() + 1,
          year: c.getFullYear(),
        };
      }
      var h = ['drought', 'fireDanger'].includes(t.product);
      this.premiumStart = (!h && (null === (i = this.days[6]) || void 0 === i ? void 0 : i.start)) || null;
    }
    return (
      v(
        e,
        [
          {
            key: 'initProperties',
            value: function () {
              ((this.calendarHours = 144), (this.numOfHours = 240));
            },
          },
          {
            key: 'boundTs',
            value: function (e) {
              return Oe(e, this.start, this.end);
            },
          },
          {
            key: 'ts2path',
            value: function (e) {
              var t = vi(this.timestamps, e, !0);
              return this.paths[t];
            },
          },
          {
            key: 'createTimestamps',
            value: function () {
              var t = this.startOfTimeline.getUTCHours() % 3;
              t && (this.startOfTimeline = e.add(this.startOfTimeline, 3 - t, 'hours'));
              for (var n = 0; n < this.numOfHours; n += 3) {
                var i = e.add(this.startOfTimeline, n, 'hours');
                (this.paths.push(e.date2path(i)), this.timestamps.push(i.getTime()));
              }
            },
          },
          {
            key: 'prepareTimesFromMinifest',
            value: function (e) {
              return e && 'object' === P(e) && e.ref && e.dst
                ? ((this.refTime = e.ref.replace(/(\d+)-(\d+)-(\d+)T(\d+):.*/, '$1$2$3$4')),
                  (this.refTimeTxt = e.ref),
                  (this.updateTxt = e.update),
                  (this.refTimeTs = new Date(e.ref).getTime()),
                  (this.updateTs = new Date(e.update).getTime()),
                  !0)
                : (Ye('Calendar', 'Invalid format of minifest'), !1);
            },
          },
          {
            key: 'createTimestampsFromMinifest',
            value: function (t) {
              var n = this;
              if (!this.prepareTimesFromMinifest(t)) return !1;
              var i = Math.min(12, this.numOfHours / 24),
                r = e.add(this.startOfTimeline, i, 'days').getTime();
              return (
                t.dst.forEach(function (t) {
                  for (var i = t[1]; i <= t[2]; i += t[0]) {
                    var o = n.refTimeTs + 36e5 * i;
                    o <= r && (n.timestamps.push(o), n.paths.push(e.date2path(new Date(o))));
                  }
                }),
                !0
              );
            },
          },
        ],
        [
          {
            key: 'date2path',
            value: function (e) {
              return e.toISOString().replace(/(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):.*/, '$1$2$3$4');
            },
          },
          {
            key: 'path2date',
            value: function (e) {
              var t = e
                .split(/(.{4})(.{2})(.{2})(.{2})/g)
                .filter(Boolean)
                .map(function (e) {
                  return parseInt(e, 10);
                });
              return new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], 0, 0));
            },
          },
          {
            key: 'ts2string',
            value: function (t) {
              var n = new Date(t),
                i = n.getDay(),
                r = n.getDate(),
                o = e.localeHours(n.getHours());
              return ''.concat(bn[e.weekdays[i]], ' ').concat(r, ' - ').concat(o);
            },
          },
          {
            key: 'add',
            value: function (e, t, n) {
              var i = new Date(e.getTime());
              return (i.setTime(e.getTime() + ('days' === n ? 24 : 1) * t * ce), i);
            },
          },
          {
            key: 'getMidnight',
            value: function () {
              var e = new Date();
              return (e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0), e);
            },
          },
        ],
      ),
      e
    );
  })();
  (_(gi, 'localeHours', oi()), _(gi, 'weekdays', ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']));
  var yi = Object.freeze({ __proto__: null, Calendar: gi }),
    wi = (function () {
      function e(t) {
        var n, i, r, o, a, s, l, c, u, d, h;
        (m(this, e),
          this.initProperties(),
          (this.ident = t.ident),
          (this.attachPoint = null !== (n = t.attachPoint) && void 0 !== n ? n : this.attachPoint),
          (this.bodyClass =
            null !== (i = t.bodyClass) && void 0 !== i ? i : 'on'.concat(e.iAm, '-').concat(this.ident)),
          (this.className = t.className),
          (this.closeOnClick = null !== (r = t.closeOnClick) && void 0 !== r ? r : this.closeOnClick),
          (this.displayBlock = null !== (o = t.displayBlock) && void 0 !== o ? o : this.displayBlock),
          (this.html = t.html),
          (this.domEl = null !== (a = t.domEl) && void 0 !== a ? a : this.domEl),
          (this.htmlID = t.htmlID),
          (this.ident = t.ident),
          (this.keyboard = null !== (s = t.keyboard) && void 0 !== s ? s : this.keyboard),
          (this.timeout = null !== (l = t.timeout) && void 0 !== l ? l : this.timeout),
          (this.noAnimation = t.noAnimation),
          (this.onclose = null !== (c = t.onclose) && void 0 !== c ? c : this.onclose),
          (this.onclosed = null !== (u = t.onclosed) && void 0 !== u ? u : this.onclosed),
          (this.onopen = null !== (d = t.onopen) && void 0 !== d ? d : this.onopen),
          (this.unmount = null !== (h = t.unmount) && void 0 !== h ? h : this.unmount));
      }
      return (
        v(e, [
          {
            key: 'close',
            value: function (e) {
              var t,
                n,
                i = this;
              if (this.isOpen) {
                var r;
                if (((this.isOpen = !1), null != e && e.disableClosingAnimation))
                  null === (r = this.node) || void 0 === r || r.classList.add('no-animation');
                (document.body.classList.remove(this.bodyClass),
                  null === (t = this.node) || void 0 === t || t.classList.remove('open'),
                  this.onclose(e),
                  null != e && e.disableClosingAnimation
                    ? (this.onclosed(),
                      this.unmount(),
                      setTimeout(function () {
                        var e;
                        null === (e = i.node) || void 0 === e || e.classList.remove('no-animation');
                      }, 50))
                    : (this.closingTimer = setTimeout(function () {
                        (i.onclosed(), i.unmount());
                      }, 500)),
                  this.removeHooks(),
                  !this.closeOnClick &&
                    null != e &&
                    null !== (n = e.ev) &&
                    void 0 !== n &&
                    n.stopPropagation &&
                    e.ev.stopPropagation());
              }
            },
          },
          {
            key: 'open',
            value: function (e) {
              var t,
                n = this;
              if (
                (this.closingTimer && clearTimeout(this.closingTimer),
                this.timeoutTimer && clearTimeout(this.timeoutTimer),
                this.isOpen)
              )
                return this;
              (this.mount(),
              document.body.classList.add(this.bodyClass),
              this.displayBlock && this.node && (this.node.style.display = 'block'),
              this.addHooks(),
              null != e && e.disableOpeningAnimation)
                ? (null === (t = this.node) || void 0 === t || t.classList.add('no-animation', 'open'),
                  setTimeout(function () {
                    var e;
                    null === (e = n.node) || void 0 === e || e.classList.remove('no-animation');
                  }, 50))
                : setTimeout(function () {
                    var e;
                    null === (e = n.node) || void 0 === e || e.classList.add('open');
                  }, 50);
              return (
                (this.isOpen = !0),
                this.timeout && (this.timeoutTimer = setTimeout(this.bindedClose, this.timeout)),
                this.onopen(),
                this
              );
            },
          },
          { key: 'onopen', value: function () {} },
          { key: 'onclose', value: function (e) {} },
          { key: 'onclosed', value: function () {} },
          {
            key: 'mount',
            value: function (e) {
              this.node || (void 0 === this.html && void 0 === e) || ((this.node = this.createNode(e)), Cn(this.node));
            },
          },
          {
            key: 'unmount',
            value: function () {
              var e;
              this.node &&
                (null === (e = this.node.parentNode) || void 0 === e || e.removeChild(this.node), (this.node = void 0));
            },
          },
          {
            key: 'initProperties',
            value: function () {
              var e = this;
              ((this.domEl = null),
                (this.closingTimer = null),
                (this.timeoutTimer = null),
                (this.attachPoint = '#plugins'),
                (this.keyboard = !1),
                (this.closeOnClick = !1),
                (this.displayBlock = !0),
                (this.timeout = 0),
                (this.isOpen = !1),
                (this.bindedClose = function (t) {
                  if ('outside' === e.closeOnClick)
                    for (var n = t.target instanceof HTMLElement ? t.target : null; n; ) {
                      if (n === e.node) return;
                      n = n.parentElement;
                    }
                  e.close.call(e, { ev: t });
                }));
            },
          },
          {
            key: 'createNode',
            value: function (t) {
              var n = document.createElement('div'),
                i = t || this.html || '';
              ((n.id = this.htmlID || ''.concat(e.iAm, '-').concat(this.ident)),
                this.className && (n.className = this.className));
              var r = document.createElement('div');
              ((r.className = 'closing-x'), (r.onclick = this.bindedClose), (n.innerHTML = i), n.appendChild(r));
              var o = this.domEl || He(this.attachPoint);
              if (!o)
                throw new Error(
                  'Cannot create node for Window '.concat(this.ident, ', target element does not exist.'),
                );
              return (o.appendChild(n), n);
            },
          },
          {
            key: 'removeHooks',
            value: function () {
              (this.closeOnClick &&
                (document.removeEventListener('mousedown', this.bindedClose, !0),
                document.removeEventListener('touchstart', this.bindedClose, !0)),
                this.keyboard && this.node && this.node.removeEventListener('keydown', this.keyCatcher));
            },
          },
          {
            key: 'addHooks',
            value: function () {
              (this.closeOnClick &&
                (document.addEventListener('mousedown', this.bindedClose, !0),
                document.addEventListener('touchstart', this.bindedClose, !0)),
                this.keyboard && this.node && this.node.addEventListener('keydown', this.keyCatcher));
            },
          },
          {
            key: 'keyCatcher',
            value: function (e) {
              e.stopImmediatePropagation();
            },
          },
        ]),
        e
      );
    })();
  _(wi, 'iAm', 'window');
  var bi,
    Ti = Object.freeze({ __proto__: null, Window: wi }),
    Ei = (function () {
      function e(t) {
        var n, i, r;
        (m(this, e),
          (this.ident = t.ident),
          (this.qualitative = t.qualitative),
          (this.save = null === (n = t.save) || void 0 === n || n),
          (this.steps = t.steps),
          (this.default = t.default),
          (this.opaque = null === (i = t.opaque) || void 0 === i || i),
          (this.defaultKey = t.defaultKey),
          (this.sync = null === (r = t.sync) || void 0 === r || r),
          (this.prepare = t.prepare),
          (this.key = 'color2_'.concat(this.ident)),
          this.default ? this.defineColor(this.default) : (this.defaultKey = this.defaultKey || this.ident));
      }
      return (
        v(e, [
          {
            key: 'defineColor',
            value: function (e) {
              (vt.insert(this.key, { def: e, save: this.save, sync: this.sync, allowed: this.checkValidity }),
                vt.on(this.key, this.colorChanged, this),
                this.prepare && this.getColor());
            },
          },
          {
            key: 'changeColor',
            value: function (e, t) {
              vt.set(this.key, e, t);
            },
          },
          {
            key: 'toDefault',
            value: function () {
              vt.remove(this.key);
            },
          },
          {
            key: 'forceGetColor',
            value: function () {
              return ((this.colors = null), this.getColor());
            },
          },
          {
            key: 'color',
            value: function (e) {
              var t = this.RGBA(e);
              return 'rgb('.concat(t[0], ',').concat(t[1], ',').concat(t[2], ')');
            },
          },
          {
            key: 'colorDark',
            value: function (e, t) {
              var n = this.RGBA(e);
              return 'rgb('
                .concat(Math.max(0, n[0] - t), ',')
                .concat(Math.max(0, n[1] - t), ',')
                .concat(Math.max(0, n[2] - t), ')');
            },
          },
          {
            key: 'RGBA',
            value: function (e) {
              var t = this.value2index(e);
              return [this.colors[t], this.colors[t + 1], this.colors[t + 2], this.colors[t + 3]];
            },
          },
          {
            key: 'createGradientArray',
            value: function () {
              var e,
                t,
                n,
                i,
                r,
                o = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
                a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
                l = this.steps + 1,
                c = new Uint8Array(l << 2),
                u = (this.max - this.min) / this.steps,
                d = this.gradient,
                h = 0,
                f = 1,
                m = d[0],
                p = null !== (e = d[f++]) && void 0 !== e ? e : d[0];
              for (r = 0; r < this.steps; r++)
                ((t = this.min + u * r * s) > p[0] && f < d.length && ((m = p), (p = d[f++])),
                  (i = (t - m[0]) / (p[0] - m[0])),
                  (n = this.getGradientColorYUVA(m[1], p[1], i)),
                  a && this.makePremultiplied(n),
                  (c[h++] = Math.round(n[0])),
                  (c[h++] = Math.round(n[1])),
                  (c[h++] = Math.round(n[2])),
                  (c[h++] = o ? 255 : Math.round(n[3])));
              return ((this.neutralGrayIndex = h), (c[h++] = c[h++] = c[h++] = 128), (c[h++] = 255), c);
            },
          },
          {
            key: 'createSteppedArray',
            value: function (e, t, n) {
              n || (n = t);
              for (var i, r = e.length, o = new Uint8Array(r), a = r >> 2, s = t >> 1, l = n, c = 0, u = 0; u < a; ) {
                for (i = 0; i < 4; i++) o[4 * u + i] = e[c + i];
                (--l <= 0 && ((l = t), (c = 4 * (u + s))), u++);
              }
              return o;
            },
          },
          {
            key: 'getColor',
            value: function () {
              return this.colors
                ? this
                : vt.hasProperty(this.key)
                  ? ((this.gradient = vt.get(this.key)),
                    this.setMinMax(),
                    (this.colors = this.createGradientArray(this.opaque)),
                    (this.maxIndex = (this.steps - 1) << 2),
                    (this.step = (this.max - this.min) / this.steps),
                    this)
                  : null;
            },
          },
          {
            key: 'value2index',
            value: function (e) {
              return isNaN(e)
                ? this.neutralGrayIndex
                : Math.max(0, Math.min(this.maxIndex, ((e - this.min) / this.step) << 2));
            },
          },
          {
            key: 'getColorTable',
            value: function () {
              return this.default;
            },
          },
          {
            key: 'checkValidity',
            value: function (e) {
              if (!Array.isArray(e)) return !1;
              for (var t = 0; t < e.length; t++) {
                var n = e[t];
                if (!Array.isArray(n) || !n.length || !Array.isArray(n[1])) return !1;
              }
              return !0;
            },
          },
          {
            key: 'colorChanged',
            value: function (e) {
              e && this.colors && this.forceGetColor();
            },
          },
          {
            key: 'setMinMax',
            value: function () {
              ((this.min = this.gradient[0][0]), (this.max = this.gradient[this.gradient.length - 1][0]));
            },
          },
          {
            key: 'getMulArray',
            value: function (e, t) {
              for (var n = [], i = e.length, r = 0; r < i; r++) n.push(e[r] * t);
              return n;
            },
          },
          {
            key: 'lerpArray',
            value: function (e, t, n) {
              for (var i = 1 - n, r = e.length, o = [], a = 0; a < r; a++) o.push(e[a] * i + t[a] * n);
              return o;
            },
          },
          {
            key: 'rgba2yuva',
            value: function (e) {
              var t = w(e, 4),
                n = t[0],
                i = t[1],
                r = t[2],
                o = 0.299 * n + 0.587 * i + 0.114 * r;
              return [o, 0.565 * (r - o), 0.713 * (n - o), t[3]];
            },
          },
          {
            key: 'yuva2rgba',
            value: function (e) {
              var t = w(e, 4),
                n = t[0],
                i = t[1],
                r = t[2];
              return [n + 1.403 * r, n - 0.344 * i - 0.714 * r, n + 1.77 * i, t[3]];
            },
          },
          {
            key: 'gradYuva',
            value: function (e, t, n, i) {
              var r = this.lerpArray(e, t, n);
              if (i) {
                var o = this.vec2size(e[1], e[2]),
                  a = this.vec2size(t[1], t[2]);
                if (o > 0.05 && a > 0.05) {
                  var s = this.vec2size(r[1], r[2]);
                  if (s > 0.01) {
                    var l = (o * (1 - n) + a * n) / s;
                    ((r[1] *= l), (r[2] *= l));
                  }
                }
              }
              return r;
            },
          },
          {
            key: 'vec2size',
            value: function (e, t) {
              return Math.sqrt(e * e + t * t);
            },
          },
          {
            key: 'getGradientColorYUVA',
            value: function (e, t, n) {
              for (
                var i = 1 / 255,
                  r = this.getMulArray(e, i),
                  o = this.getMulArray(t, i),
                  a = this.rgba2yuva(r),
                  s = this.rgba2yuva(o),
                  l = this.gradYuva(a, s, n, !0),
                  c = this.yuva2rgba(l),
                  u = 0;
                u < c.length;
                u++
              )
                c[u] = Math.max(0, Math.min(256 * c[u], 255));
              return c;
            },
          },
          {
            key: 'makePremultiplied',
            value: function (e) {
              for (var t = e[3] / 255, n = 0; n < 3; n++) e[n] = Math.max(0, Math.min(t * e[n], 255));
              return e;
            },
          },
        ]),
        e
      );
    })(),
    Si = Object.freeze({ __proto__: null, Color: Ei }),
    _i = {
      temp: new Ei({
        ident: 'temp',
        steps: 2048,
        prepare: !0,
        default: [
          [203, [115, 70, 105, 255]],
          [218, [202, 172, 195, 255]],
          [233, [162, 70, 145, 255]],
          [248, [143, 89, 169, 255]],
          [258, [157, 219, 217, 255]],
          [265, [106, 191, 181, 255]],
          [269, [100, 166, 189, 255]],
          [273.15, [93, 133, 198, 255]],
          [274, [68, 125, 99, 255]],
          [283, [128, 147, 24, 255]],
          [294, [243, 183, 4, 255]],
          [303, [232, 83, 25, 255]],
          [320, [71, 14, 0, 255]],
        ],
      }),
      wind: new Ei({
        ident: 'wind',
        steps: 2048,
        prepare: !0,
        default: [
          [0, [98, 113, 183, 255]],
          [1, [57, 97, 159, 255]],
          [3, [74, 148, 169, 255]],
          [5, [77, 141, 123, 255]],
          [7, [83, 165, 83, 255]],
          [9, [53, 159, 53, 255]],
          [11, [167, 157, 81, 255]],
          [13, [159, 127, 58, 255]],
          [15, [161, 108, 92, 255]],
          [17, [129, 58, 78, 255]],
          [19, [175, 80, 136, 255]],
          [21, [117, 74, 147, 255]],
          [24, [109, 97, 163, 255]],
          [27, [68, 105, 141, 255]],
          [29, [92, 144, 152, 255]],
          [36, [125, 68, 165, 255]],
          [46, [231, 215, 215, 256]],
          [51, [219, 212, 135, 256]],
          [77, [205, 202, 112, 256]],
          [104, [128, 128, 128, 255]],
        ],
      }),
      rh: new Ei({
        ident: 'rh',
        steps: 1024,
        default: [
          [0, [173, 85, 56, 255]],
          [30, [173, 110, 56, 255]],
          [40, [173, 146, 56, 255]],
          [50, [105, 173, 56, 255]],
          [60, [56, 173, 121, 255]],
          [70, [56, 174, 173, 255]],
          [75, [56, 160, 173, 255]],
          [80, [56, 157, 173, 255]],
          [83, [56, 148, 173, 255]],
          [87, [56, 135, 173, 255]],
          [90, [56, 132, 173, 255]],
          [93, [56, 123, 173, 255]],
          [97, [56, 98, 157, 255]],
          [100, [56, 70, 114, 255]],
        ],
      }),
      pressure: new Ei({
        ident: 'pressure',
        steps: 4e3,
        default: [
          [9e4, [8, 16, 48, 255]],
          [95e3, [0, 32, 96, 255]],
          [97600, [0, 52, 146, 255]],
          [98600, [0, 90, 148, 255]],
          [99500, [0, 117, 146, 255]],
          [100200, [26, 140, 147, 255]],
          [100700, [103, 162, 155, 255]],
          [101125, [155, 183, 172, 255]],
          [101325, [182, 182, 182, 255]],
          [101525, [176, 174, 152, 255]],
          [101900, [167, 147, 107, 255]],
          [102400, [163, 116, 67, 255]],
          [103e3, [159, 81, 44, 255]],
          [103800, [142, 47, 57, 255]],
          [104600, [111, 24, 64, 255]],
          [108e3, [48, 8, 24, 255]],
        ],
      }),
      cclAltitude: new Ei({
        ident: 'cclAltitude',
        steps: 1024,
        default: [
          [0, [128, 128, 128, 255]],
          [500, [128, 128, 128, 255]],
          [1e3, [213, 211, 173, 256]],
          [2e3, [199, 143, 32, 256]],
          [2500, [201, 109, 12, 256]],
          [3e3, [193, 72, 16, 256]],
          [4500, [159, 29, 43, 256]],
          [5e3, [133, 12, 12, 256]],
          [8e3, [83, 5, 36, 256]],
        ],
      }),
      altitude: new Ei({
        ident: 'altitude',
        steps: 1024,
        default: [
          [0, [105, 83, 83, 255]],
          [500, [162, 82, 140, 255]],
          [750, [99, 174, 174, 255]],
          [1000.15, [73, 106, 160, 255]],
          [1500, [75, 131, 70, 255]],
          [2e3, [191, 193, 93, 255]],
          [3e3, [184, 149, 73, 255]],
          [5e3, [182, 99, 83, 255]],
          [1e4, [171, 81, 102, 255]],
          [15e3, [108, 77, 97, 255]],
        ],
      }),
      deg0: new Ei({
        ident: 'deg0',
        steps: 1024,
        default: [
          [0, [188, 197, 195, 255]],
          [500, [155, 195, 189, 255]],
          [750, [93, 173, 156, 255]],
          [1000.15, [80, 141, 129, 255]],
          [1500, [55, 122, 109, 255]],
          [2e3, [39, 93, 82, 255]],
          [3e3, [33, 68, 73, 255]],
          [5e3, [32, 55, 71, 255]],
          [1e4, [28, 33, 64, 255]],
          [15e3, [6, 6, 6, 255]],
        ],
      }),
      levels: new Ei({
        ident: 'levels',
        steps: 2048,
        default: [
          [0, [105, 117, 140, 255]],
          [1e3, [94, 131, 150, 255]],
          [4e3, [71, 145, 154, 255]],
          [8e3, [78, 179, 102, 255]],
          [1e4, [189, 189, 68, 255]],
          [12e3, [177, 80, 80, 255]],
          [15e3, [178, 80, 178, 255]],
          [2e4, [184, 184, 184, 255]],
        ],
      }),
      rain: new Ei({
        ident: 'rain',
        steps: 1024,
        prepare: !0,
        default: [
          [0, [111, 111, 111, 255]],
          [0.6, [60, 116, 160, 255]],
          [6, [59, 161, 161, 255]],
          [8, [59, 161, 61, 255]],
          [10, [130, 161, 59, 255]],
          [15, [161, 161, 59, 255]],
          [20, [161, 59, 59, 255]],
          [31, [161, 59, 161, 255]],
          [50, [168, 168, 168, 255]],
        ],
      }),
      ptype: new Ei({
        ident: 'ptype',
        steps: 128,
        qualitative: !0,
        default: [
          [0, [111, 111, 111, 255]],
          [1, [0, 208, 239, 255]],
          [2, [0, 0, 255, 255]],
          [3, [197, 27, 195, 255]],
          [4, [129, 63, 63, 255]],
          [5, [227, 227, 227, 255]],
          [6, [129, 195, 129, 255]],
          [7, [202, 211, 57, 255]],
          [8, [183, 119, 8, 255]],
          [9, [227, 73, 19, 255]],
          [10, [195, 63, 63, 255]],
        ],
      }),
      rainClouds: new Ei({
        ident: 'rainClouds',
        steps: 128,
        opaque: !1,
        default: [
          [0, [67, 87, 166, 56]],
          [0.8, [70, 102, 163, 77]],
          [2, [62, 171, 171, 107]],
          [6, [62, 171, 171, 192]],
          [8, [62, 142, 62, 250]],
          [10, [129, 156, 62, 250]],
          [15, [171, 171, 62, 250]],
          [20, [169, 62, 62, 250]],
          [31, [171, 62, 171, 250]],
          [50, [177, 177, 177, 250]],
        ],
      }),
      clouds: new Ei({
        ident: 'clouds',
        steps: 800,
        default: [
          [0, [146, 130, 70, 255]],
          [10, [132, 119, 70, 255]],
          [50, [116, 116, 116, 255]],
          [95, [171, 180, 179, 255]],
          [98, [198, 201, 201, 255]],
          [100, [213, 213, 205, 255]],
        ],
      }),
      lclouds: new Ei({
        ident: 'lclouds',
        steps: 800,
        default: [
          [0, [156, 142, 87, 255]],
          [10, [143, 131, 87, 255]],
          [30, [129, 129, 129, 255]],
          [90, [137, 159, 182, 255]],
          [100, [187, 187, 187, 255]],
        ],
      }),
      hclouds: new Ei({
        ident: 'hclouds',
        steps: 800,
        default: [
          [0, [156, 142, 87, 255]],
          [10, [143, 131, 87, 255]],
          [30, [125, 157, 157, 255]],
          [90, [141, 169, 169, 255]],
          [100, [187, 187, 187, 255]],
        ],
      }),
      mclouds: new Ei({
        ident: 'mclouds',
        steps: 800,
        default: [
          [0, [156, 142, 87, 255]],
          [10, [143, 131, 87, 255]],
          [30, [157, 192, 157, 255]],
          [90, [145, 171, 145, 255]],
          [100, [187, 187, 187, 255]],
        ],
      }),
      cape: new Ei({
        ident: 'cape',
        steps: 1024,
        default: [
          [0, [110, 110, 110, 255]],
          [350, [110, 110, 110, 255]],
          [400, [93, 95, 127, 255]],
          [500, [37, 98, 145, 255]],
          [800, [37, 165, 37, 255]],
          [1500, [163, 161, 55, 255]],
          [2e3, [155, 112, 63, 255]],
          [2500, [162, 55, 55, 255]],
          [5001, [151, 68, 151, 255]],
        ],
      }),
      lightDensity: new Ei({
        ident: 'lightDensity',
        steps: 2048,
        default: [
          [0, [136, 136, 136, 255]],
          [0.015, [136, 136, 136, 255]],
          [0.025, [136, 200, 0, 255]],
          [0.1, [218, 218, 0, 255]],
          [1, [241, 95, 0, 255]],
          [2, [248, 78, 120, 255]],
          [4, [135, 0, 0, 255]],
          [15, [221, 101, 255, 255]],
        ],
      }),
      cbase: new Ei({
        ident: 'cbase',
        steps: 512,
        default: [
          [0, [166, 93, 165, 255]],
          [129, [162, 97, 160, 255]],
          [149, [167, 91, 91, 255]],
          [279, [167, 91, 91, 255]],
          [299, [98, 122, 160, 255]],
          [879, [98, 122, 160, 255]],
          [914, [90, 169, 90, 255]],
          [1499, [91, 167, 99, 255]],
          [7999, [119, 141, 120, 255]],
        ],
      }),
      snow: new Ei({
        ident: 'snow',
        steps: 2048,
        default: [
          [0, [97, 97, 97, 255]],
          [2, [69, 82, 152, 255]],
          [10, [65, 165, 167, 255]],
          [20, [65, 141, 65, 255]],
          [50, [168, 168, 65, 255]],
          [80, [170, 126, 63, 255]],
          [120, [167, 65, 65, 255]],
          [500, [168, 65, 168, 255]],
        ],
      }),
      rainAccu: new Ei({
        ident: 'rainAccu',
        steps: 12e3,
        default: [
          [0, [72, 72, 72, 255]],
          [1, [64, 64, 163, 255]],
          [5, [70, 106, 227, 255]],
          [10, [41, 187, 236, 255]],
          [30, [49, 241, 153, 255]],
          [50, [163, 253, 61, 255]],
          [80, [237, 208, 59, 255]],
          [120, [251, 128, 34, 255]],
          [200, [210, 49, 4, 255]],
          [320, [122, 4, 3, 255]],
          [600, [48, 0, 0, 255]],
          [8e3, [24, 0, 0, 255]],
        ],
      }),
      waves: new Ei({
        ident: 'waves',
        steps: 1024,
        default: [
          [0, [159, 185, 191, 255]],
          [0.5, [48, 157, 185, 255]],
          [1, [48, 98, 141, 255]],
          [1.5, [56, 104, 191, 255]],
          [2, [57, 60, 142, 255]],
          [2.5, [187, 90, 191, 255]],
          [3, [154, 48, 151, 255]],
          [4, [133, 48, 48, 255]],
          [5, [191, 51, 95, 255]],
          [7, [191, 103, 87, 255]],
          [10, [191, 191, 191, 255]],
          [12, [154, 127, 155, 255]],
        ],
      }),
      currents: new Ei({ ident: 'currents', defaultKey: 'seacurrents', steps: 256 }),
      currentsTide: new Ei({ ident: 'currentsTide', defaultKey: 'seacurrents_tide', steps: 256 }),
      visibility: new Ei({
        ident: 'visibility',
        steps: 1024,
        default: [
          [0, [163, 89, 163, 255]],
          [1600, [161, 89, 163, 255]],
          [2200, [167, 86, 86, 255]],
          [5e3, [167, 86, 86, 255]],
          [6e3, [89, 97, 163, 255]],
          [8e3, [89, 101, 163, 255]],
          [9e3, [60, 188, 73, 255]],
          [15e3, [83, 167, 75, 255]],
          [20004, [121, 121, 121, 255]],
        ],
      }),
      gtco3: new Ei({ ident: 'gtco3', steps: 512 }),
      aod550: new Ei({ ident: 'aod550', steps: 8e3 }),
      pm2p5: new Ei({ ident: 'pm2p5', steps: 4e3 }),
      no2: new Ei({ ident: 'no2', steps: 4e3 }),
      tcso2: new Ei({ ident: 'tcso2', steps: 4096 }),
      go3: new Ei({ ident: 'go3', steps: 4096 }),
      cosc: new Ei({ ident: 'cosc', steps: 4e3, defaultKey: 'chem_cosc' }),
      dust: new Ei({ ident: 'dust', steps: 8e3, defaultKey: 'chem_dustsm' }),
      radar: new Ei({
        ident: 'radar',
        steps: 255,
        opaque: !1,
        default: [
          [0, [40, 16, 158, 0]],
          [3, [40, 16, 158, 20]],
          [8, [40, 16, 158, 100]],
          [14, [0, 101, 154, 180]],
          [20, [0, 144, 147, 220]],
          [26, [0, 179, 125, 240]],
          [32, [117, 208, 89, 255]],
          [36, [220, 220, 30, 255]],
          [40, [244, 202, 8, 255]],
          [44, [245, 168, 24, 255]],
          [48, [236, 130, 63, 255]],
          [52, [205, 75, 75, 255]],
          [56, [182, 45, 100, 255]],
          [60, [156, 16, 109, 255]],
          [64, [125, 0, 108, 255]],
          [68, [92, 0, 100, 255]],
          [100, [0, 0, 0, 255]],
          [101, [0, 0, 0, 0]],
          [255, [0, 0, 0, 0]],
        ],
      }),
      satellite: new Ei({
        ident: 'satellite',
        steps: 256,
        opaque: !1,
        default: [
          [0, [24, 24, 24, 255]],
          [149, [240, 240, 240, 255]],
          [150, [64, 64, 163, 255]],
          [159, [70, 106, 227, 255]],
          [168, [41, 187, 236, 255]],
          [177, [49, 241, 153, 255]],
          [186, [163, 253, 61, 255]],
          [195, [237, 208, 59, 255]],
          [205, [251, 128, 34, 255]],
          [214, [210, 49, 4, 255]],
          [223, [122, 4, 3, 255]],
          [256, [48, 0, 0, 255]],
        ],
      }),
      fog: new Ei({
        ident: 'fog',
        steps: 512,
        default: [
          [0, [110, 110, 110, 255]],
          [1, [200, 200, 200, 255]],
          [2, [200, 200, 255, 255]],
        ],
      }),
      justGray: new Ei({
        ident: 'justGray',
        steps: 4,
        default: [
          [-2e4, [111, 111, 111, 255]],
          [2e4, [111, 111, 111, 255]],
        ],
      }),
      efiWind: new Ei({ ident: 'efiWind', steps: 256, defaultKey: 'wsi' }),
      efiTemp: new Ei({ ident: 'efiTemp', steps: 256, defaultKey: 'ti' }),
      efiRain: new Ei({ ident: 'efiRain', steps: 256, defaultKey: 'tpi' }),
      moistureAnom40: new Ei({ ident: 'moistureAnom40', steps: 8e3, defaultKey: 'awd_0_40' }),
      moistureAnom100: new Ei({ ident: 'moistureAnom100', steps: 8e3, defaultKey: 'awd_0_100' }),
      drought40: new Ei({ ident: 'drought40', steps: 8e3, defaultKey: 'awp_0_40' }),
      drought100: new Ei({ ident: 'drought100', steps: 8e3, defaultKey: 'awp_0_100' }),
      soilMoisture40: new Ei({ ident: 'soilMoisture40', steps: 8e3, defaultKey: 'awr_0_40' }),
      soilMoisture100: new Ei({ ident: 'soilMoisture100', steps: 8e3, defaultKey: 'awr_0_100' }),
      fwi: new Ei({ ident: 'fwi', steps: 8e3, defaultKey: 'fwi_genz' }),
      dfm10h: new Ei({ ident: 'dfm10h', steps: 8e3 }),
      solarpower: new Ei({
        ident: 'solarpower',
        steps: 2e3,
        default: [
          [0, [110, 110, 110, 255]],
          [5, [122, 105, 106, 255]],
          [50, [194, 53, 81, 255]],
          [100, [199, 66, 81, 255]],
          [200, [208, 90, 81, 255]],
          [400, [226, 131, 90, 255]],
          [600, [242, 170, 110, 255]],
          [800, [255, 208, 141, 255]],
          [1e3, [255, 245, 180, 255]],
          [1150, [255, 255, 255, 255]],
        ],
      }),
      uvindex: new Ei({
        ident: 'uvindex',
        steps: 4096,
        default: [
          [0, [110, 110, 110, 255]],
          [2, [61, 167, 46, 255]],
          [5, [255, 243, 0, 255]],
          [7, [241, 139, 1, 255]],
          [10, [229, 50, 17, 255]],
          [11, [181, 103, 164, 255]],
          [19, [255, 255, 255, 255]],
        ],
      }),
      wetbulbtemp: new Ei({
        ident: 'wetbulbtemp',
        steps: 2048,
        default: [
          [203, [128, 128, 128, 255]],
          [273.15, [255, 255, 255, 255]],
          [283.2, [241, 236, 197, 255]],
          [291.5, [229, 216, 65, 255]],
          [295.4, [240, 190, 0, 255]],
          [298, [237, 152, 0, 255]],
          [300, [223, 106, 0, 255]],
          [302, [201, 44, 44, 255]],
          [304, [128, 0, 0, 255]],
          [305, [0, 0, 0, 255]],
        ],
      }),
      turbulence: new Ei({ ident: 'turbulence', steps: 1024 }),
      icing: new Ei({ ident: 'icing', steps: 2048 }),
    },
    Ai = function () {
      return He('#rh-bottom-messages');
    },
    Pi = function (e) {
      var t = Ai();
      t && !t.contains(e) && t.appendChild(e);
    },
    ki = function (e) {
      var t = Ai();
      t && t.contains(e) && t.removeChild(e);
    },
    Ci = function () {
      var e = Ai();
      e && (e.innerHTML = '');
    },
    Oi = Object.freeze({ __proto__: null, clear: Ci, insert: Pi, remove: ki }),
    Li = (function () {
      function e(t) {
        var n,
          i,
          r,
          o,
          a,
          s,
          l,
          c,
          u,
          d,
          h,
          f,
          p,
          v,
          g,
          y,
          w,
          b,
          T,
          E = this;
        (m(this, e),
          (this.modelName = t.modelName),
          (this.ident = null !== (n = t.ident) && void 0 !== n ? n : 'ecmwf'),
          (this.maxTileZoom = null !== (i = t.maxTileZoom) && void 0 !== i ? i : { free: 10, premium: 10 }),
          (this.animationSpeed = null !== (r = t.animationSpeed) && void 0 !== r ? r : 3e3),
          (this.animationSpeed1h = null !== (o = t.animationSpeed1h) && void 0 !== o ? o : 1e3),
          (this.fileSuffix = null !== (a = t.fileSuffix) && void 0 !== a ? a : 'jpg'),
          (this.fileSuffixFallback = null !== (s = t.fileSuffixFallback) && void 0 !== s ? s : 'jpg'),
          (this.JPGtransparency = null !== (l = t.JPGtransparency) && void 0 !== l && l),
          (this.PNGtransparency = null !== (c = t.PNGtransparency) && void 0 !== c && c),
          (this.dataQuality = null !== (u = t.dataQuality) && void 0 !== u ? u : 'normal'),
          (this.betterDataQuality = null !== (d = t.betterDataQuality) && void 0 !== d ? d : []),
          (this.animation = null === (h = t.animation) || void 0 === h || h),
          (this.forecastSize = null !== (f = t.forecastSize) && void 0 !== f ? f : 240),
          (this.labelsTemp = null === (p = t.labelsTemp) || void 0 === p || p),
          (this.overlays = null !== (v = t.overlays) && void 0 !== v ? v : []),
          (this.requiresInfoJson = null !== (g = t.requiresInfoJson) && void 0 !== g && g),
          (this.prefferedProduct = null !== (y = t.prefferedProduct) && void 0 !== y ? y : 'ecmwf'),
          (this.pathGenerator = null !== (w = t.pathGenerator) && void 0 !== w ? w : ''),
          (this.isolines = null !== (b = t.isolines) && void 0 !== b ? b : []),
          (this.directory =
            null !== (T = t.directory) && void 0 !== T
              ? T
              : (t.modelIdent && t.category && ''.concat(t.category, '/').concat(t.modelIdent)) || ''),
          (this.modelIdent = t.modelIdent),
          (this.category = t.category),
          (this.provider = t.provider),
          (this.interval = t.interval),
          (this.intervalPremium = t.intervalPremium),
          (this.server = t.server),
          (this.modelResolution = t.modelResolution),
          (this.levels = t.levels),
          (this.bounds = t.bounds),
          (this.logo = t.logo),
          (this.acTimes = t.acTimes),
          (this.minifestTimestamp = 0),
          (this.productExpires = 0),
          (this.minifest = null),
          (this.loadingPromise = null),
          (this.hasRefTime = !0),
          (this.pathGenerator =
            '{server}/im/v3.0/{directory}/{refTime}/{path}/wm_grid_257/<z>/<x>/<y>/{filename}-{level}.{fileSuffix}'),
          (this.bindedCheckNewMinifest = this.checkNewMinifest.bind(this)),
          vt.on('subscription', function () {
            E.minifest && (E.expire(), E.loadAndProcessMinifest(!0));
          }));
      }
      return (
        v(e, [
          {
            key: 'refTime',
            value: function () {
              return this.calendar ? this.calendar.refTime : '';
            },
          },
          {
            key: 'getUpdateTimes',
            value: function () {
              return this.calendar ? { refTime: this.calendar.refTimeTxt, minUpdate: this.calendar.updateTs } : {};
            },
          },
          {
            key: 'moveTs',
            value: function (e) {
              if (arguments.length > 1 && void 0 !== arguments[1] && arguments[1]) {
                var t = this.acTimes.indexOf(vt.get('acTime'));
                if (t > -1)
                  return ((t = Oe(t + (e ? 1 : -1), 0, this.acTimes.length)), vt.set('acTime', this.acTimes[t]), !0);
              } else {
                var n = this.calendar,
                  i = n.paths,
                  r = n.timestamps,
                  o = i.indexOf(vt.get('path'));
                if (o > -1)
                  return (
                    (o = Oe(o + (e ? 1 : -1), 0, i.length)),
                    vt.set('timestamp', r[o], { UIident: 'keyboard' }),
                    !0
                  );
              }
              return !1;
            },
          },
          {
            key: 'getMinifestUrl',
            value: function () {
              var e = this.server || '',
                t = Kn() ? '?premium=true' : '';
              return ''.concat(e, '/metadata/v1.0/').concat(this.directory, '/minifest.json').concat(t);
            },
          },
          {
            key: 'loadMinifest',
            value: function () {
              var e = this.getMinifestUrl();
              return Xt(e);
            },
          },
          {
            key: 'open',
            value: function () {
              var e = this;
              return (
                this.refreshInterval || (this.refreshInterval = setInterval(this.bindedCheckNewMinifest, 18e5)),
                this.hasListeners || (vt.on('visibility', this.bindedCheckNewMinifest), (this.hasListeners = !0)),
                ee || this.printLogo(),
                this.loadingPromise
                  ? this.loadingPromise
                  : Date.now() < this.productExpires && !vt.get('offlineMode')
                    ? Promise.resolve(this.calendar)
                    : ((this.loadingPromise = new Promise(function (t, n) {
                        e.loadAndProcessMinifest()
                          .then(function () {
                            return e.loadAndProcessInfo();
                          })
                          .then(function () {
                            (e.setExpireTime(), (e.loadingPromise = null), t(e.calendar));
                          })
                          .catch(n);
                      })),
                      this.loadingPromise)
              );
            },
          },
          {
            key: 'close',
            value: function () {
              (ee || this.removeLogo(),
                this.refreshInterval && (clearInterval(this.refreshInterval), (this.refreshInterval = null)),
                this.hasListeners && (vt.off('visibility', this.bindedCheckNewMinifest), (this.hasListeners = !1)));
            },
          },
          {
            key: 'pointIsInBounds',
            value: function (e) {
              if (!this.bounds) return !0;
              for (var t = +e.lat, n = +e.lon, i = 0; i < this.bounds.length; i++) {
                for (var r = !1, o = this.bounds[i].length, a = this.bounds[i], s = 0, l = o - 1; s < o; l = s++) {
                  var c = a[s][0],
                    u = a[s][1],
                    d = a[l][0],
                    h = a[l][1];
                  u > n != h > n && t < ((d - c) * (n - u)) / (h - u) + c && (r = !r);
                }
                if (r) return !0;
              }
              return !1;
            },
          },
          {
            key: 'printLogo',
            value: function () {
              (Ci(),
                this.logo &&
                  (this.logoEl ||
                    ((this.logoEl = document.createElement('div')),
                    (this.logoEl.innerHTML = this.logo),
                    (this.logoEl.className = 'rh-absoluted rh-transparent')),
                  Pi(this.logoEl)));
            },
          },
          {
            key: 'getInfoFileUrl',
            value: function () {
              var e = this.server || N;
              return ''.concat(e, '/im/v3.0/').concat(this.directory, '/').concat(this.infoVersion, '/info.json');
            },
          },
          {
            key: 'getCalendar',
            value: function () {
              var e = this;
              return this.calendar
                ? Promise.resolve(this.calendar)
                : this.loadMinifest().then(function (t) {
                    var n = t.data;
                    return new gi({ numOfHours: e.forecastSize, product: e.ident, minifestFile: n });
                  });
            },
          },
          {
            key: 'expire',
            value: function () {
              this.productExpires = 0;
            },
          },
          {
            key: 'getStoreKey',
            value: function () {
              return 'lastMinifest/'.concat(this.directory).concat(Kn() ? '?premium=true' : '');
            },
          },
          {
            key: 'setMinifest',
            value: function (e) {
              var t = this.getStoreKey();
              if (e.forced) this.minifest = e;
              else {
                var n = ft.get(t);
                this.minifest = n && 'ref' in n ? (e.ref >= n.ref ? e : n) : e;
              }
              ft.put(t, this.minifest);
            },
          },
          {
            key: 'setExpireTime',
            value: function () {
              this.productExpires = Date.now() + 3e5;
            },
          },
          {
            key: 'showErrorMessage',
            value: function (e) {
              setTimeout(function () {
                vt.get('connection') &&
                  !vt.get('offlineMode') &&
                  new wi({
                    ident: 'message-product-minifest-error',
                    className: 'top-message bg-error',
                    timeout: 5e3,
                    html: e,
                  }).open();
              }, 300);
            },
          },
          {
            key: 'loadAndProcessMinifest',
            value: function () {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              return this.loadMinifest()
                .then(function (n) {
                  var i = n.data;
                  if (!e.minifest || t || e.minifest.ref !== i.ref) {
                    var r;
                    (e.setMinifest(i), (e.infoVersion = i.info));
                    var o = vt.get('offlineMode')
                      ? null === (r = vt.get('offlineDataInfo')) || void 0 === r
                        ? void 0
                        : r.lastTimestamp
                      : void 0;
                    ((e.calendar = new gi({
                      numOfHours: e.forecastSize,
                      product: e.ident,
                      minifestFile: e.minifest,
                      lastTimestamp: o,
                    })),
                      vt.set('calendar', e.calendar),
                      vt.set('lastModified', new Date(e.minifest.ref).getTime()));
                  }
                })
                .catch(function (t) {
                  Ye('Product', 'Minifest load/parsing failed', t);
                  var n =
                    (null == t ? void 0 : t.responseText) ||
                    'Error downloading '.concat(
                      e.modelName,
                      ' data. Check <a href="https://community.windy.com/category/24/system-status" target="_blank">system status</a> whether there is outage.',
                    );
                  throw (e.showErrorMessage(n), t);
                });
            },
          },
          {
            key: 'loadAndProcessInfo',
            value: function () {
              var e = this;
              return this.requiresInfoJson
                ? this.loadInfo()
                    .then(function (e) {
                      var t = e.data;
                      Object.keys((t && t.param) || {}).forEach(function (e) {
                        if (t.param[e].color) {
                          var n = Object.keys(_i).find(function (t) {
                            return _i[t].defaultKey === e;
                          });
                          n && _i[n] && _i[n].defineColor.call(_i[n], t.param[e].color);
                        }
                      });
                    })
                    .catch(function () {
                      var t = 'Cannot get info.json from im server.';
                      throw (e.showErrorMessage(t), t);
                    })
                : Promise.resolve();
            },
          },
          {
            key: 'loadInfo',
            value: function () {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3;
              if (t <= 0) return Promise.reject();
              var n = this.server || '',
                i = ''.concat(n, '/metadata/v1.0/').concat(this.directory, '/').concat(this.infoVersion, '/info.json');
              return Xt(i, { ttl: 1728e5 }).catch(function () {
                return e.loadInfo(t - 1);
              });
            },
          },
          {
            key: 'checkNewMinifest',
            value: function () {
              var e = this;
              this.minifestTimestamp + 3e5 < Date.now() &&
                !vt.get('offlineMode') &&
                'visible' === document.visibilityState &&
                this.loadAndProcessMinifest().then(function () {
                  ((e.minifestTimestamp = Date.now()), (e.loadingPromise = null));
                  var t = vt.get('product');
                  setTimeout(
                    function () {
                      vt.set('product', e.ident, { forceChange: !0 }).then(function () {
                        setTimeout(function () {
                          dn.emit('redrawLayers', { noCache: !0 });
                        }, 1e3);
                      });
                    },
                    t === e.ident ? 10 : 0,
                  );
                });
            },
          },
          {
            key: 'removeLogo',
            value: function () {
              this.logoEl && this.logo && ki(this.logoEl);
            },
          },
        ]),
        e
      );
    })(),
    Ii = {
      modelName: 'ECMWF',
      modelResolution: 9,
      provider: 'ECMWF',
      interval: 720,
      intervalPremium: 360,
      maxTileZoom: { free: 3, premium: 4 },
      dataQuality: 'normal',
    },
    Ri = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        var i;
        (m(this, n), (i = t.call(this, S(S({}, e), Ii))));
        try {
          var r,
            o = 'minifest-'.concat(i.modelIdent).concat(Kn() ? '-premium' : ''),
            a = He('meta[name="'.concat(o, '"]')),
            s = a && a.content;
          if (!s) throw new Error('Missing minifest string');
          if ((i.setMinifest(JSON.parse(s)), i.requiresInfoJson))
            ((i.infoVersion = null === (r = i.minifest) || void 0 === r ? void 0 : r.info),
              (i.loadingPromise = i.loadAndProcessInfo()));
          if (
            ((i.calendar = new gi({ numOfHours: i.forecastSize, product: i.ident, minifestFile: i.minifest })),
            vt.set('calendar', i.calendar),
            !i.calendar.minifestValid)
          )
            throw new Error('Minifest is not valid');
          i.setExpireTime();
        } catch (e) {
          Ye('products', 'Cant create ecmwf calendar from meta tag', e);
        }
        return i;
      }
      return (
        v(n, null, [
          {
            key: 'createVirtualCalendar',
            value: function () {
              var e = {
                v: '2.0',
                info: 'XXXXXXX',
                ref: new Date().toISOString().replace(/T.*$/, 'T00:34:56Z'),
                update: new Date().toISOString(),
                dst: [
                  [3, 3, 144],
                  [6, 150, 240],
                ],
              };
              return new gi({ numOfHours: this.forecastSize, product: this.ident, minifestFile: e });
            },
          },
        ]),
        n
      );
    })(Li),
    xi = function (e) {
      return e;
    },
    Ni = (function () {
      function e(t) {
        (m(this, e),
          this.initProperties(),
          Object.assign(this, t),
          (this.key = this._createKey(this.ident)),
          vt.insert(this.key, {
            def: this.getDefault(),
            save: !0,
            sync: !0,
            nativeSync: this.nativeSync,
            allowed: Object.keys(this.conv),
          }),
          (this.metric = vt.get(this.key)),
          vt.on(this.key, this.onMetricChanged, this),
          vt.once('isImperial', this.setDefault, this));
      }
      return (
        v(e, [
          {
            key: 'onMetricChanged',
            value: function (e) {
              ((this.metric = e), dn.emit('metricChanged', this.ident, e));
            },
          },
          {
            key: 'getDefault',
            value: function () {
              return vt.get('isImperial') && this.defaults.length > 1 ? this.defaults[1] : this.defaults[0];
            },
          },
          {
            key: 'setDefault',
            value: function () {
              this.key && (vt.setDefault(this.key, this.getDefault()), (this.metric = vt.get(this.key)));
            },
          },
          {
            key: 'convertValue',
            value: function (e, t, n) {
              if (void 0 === e) return '';
              var i,
                r = this.convertNumber(e);
              return (
                ('number' == typeof r && !isNaN(r) && r >= 1e3 ? si(r) : r) +
                (t || this.separator) +
                ((null === (i = this.conv[this.metric]) || void 0 === i ? void 0 : i.label) || this.metric) +
                (n || '')
              );
            },
          },
          {
            key: 'na',
            value: function () {
              var e;
              return (null === (e = this.conv[this.metric]) || void 0 === e ? void 0 : e.na) || '-';
            },
          },
          {
            key: 'listMetrics',
            value: function () {
              return Object.keys(this.conv);
            },
          },
          {
            key: 'howManyMetrics',
            value: function () {
              return this.listMetrics().length;
            },
          },
          {
            key: 'setMetric',
            value: function (e, t) {
              var n = this;
              (vt.set(this.key, e, t ? { UIident: t } : void 0),
                this.cohesion &&
                  Object.keys(this.cohesion).forEach(function (t) {
                    var i,
                      r =
                        null === (i = n.cohesion) || void 0 === i || null === (i = i[t]) || void 0 === i
                          ? void 0
                          : i[e];
                    r && vt.set(n._createKey(t), r);
                  }));
            },
          },
          {
            key: 'cycleMetric',
            value: function (e) {
              var t = this.description.indexOf(this.metric) + 1;
              (t === this.description.length && (t = 0), this.setMetric(this.description[t], e));
            },
          },
          {
            key: 'renderLegend',
            value: function (e, t, n) {
              var i = this.discreteLegend ? this.renderDiscreteLegend() : this.renderGradientLegend(e, t, n);
              null !== i &&
                ((t.dataset.overlay = this.ident),
                h(t, this.howManyMetrics() <= 1, 'one-metric'),
                h(t, Boolean(this.discreteLegend), 'discrete-metric'),
                (t.style.background = i.background),
                (t.innerHTML = i.content));
            },
          },
          {
            key: 'renderGradientLegend',
            value: function (e, t, n) {
              var i = n.description,
                r = n.lines,
                o = null == e ? void 0 : e.getColor();
              if (!e || !o)
                return (Ye('Metric', 'Failed to render legeng. Color table missing for '.concat(this.ident)), null);
              var a = r.length,
                s = i.indexOf(this.metric),
                l = 100 / (r.length + 1),
                c = [],
                u = e.color(r[0][0]);
              c.push(u, u, u);
              for (var d = '<span style="width:'.concat(l, '%">').concat(this.metric, '</span>'), h = 0; h < a; h++) {
                var f = r[h][0],
                  m = r[Math.min(h + 1, a - 1)][0],
                  p = e.color(f),
                  v = e.color(0.5 * (f + m));
                (c.push(p, v), (d += '<span style="width: '.concat(l, '%">').concat(r[h][1 + s], '</span>')));
              }
              return { background: 'linear-gradient(to right, '.concat(c.join(','), ')'), content: d };
            },
          },
          {
            key: 'renderDiscreteLegend',
            value: function () {
              var e = this.discreteLegend,
                t = e.labels,
                n = e.hasEqualItemsWidth,
                i = n ? 'width: '.concat(100 / t.length, '%;') : '';
              return {
                background: '',
                content: this.discreteLegend.labels
                  .map(function (e) {
                    var t = w(e, 2),
                      r = t[0],
                      o = t[1];
                    return '<span style="background: '
                      .concat(o, '; ')
                      .concat(n ? i : '', '">')
                      .concat(bn[r], '</span>');
                  })
                  .join(''),
              };
            },
          },
          {
            key: 'initProperties',
            value: function () {
              ((this.separator = ''), (this.nativeSync = !1));
            },
          },
          {
            key: '_createKey',
            value: function (e) {
              return 'metric_'.concat(e);
            },
          },
        ]),
        e
      );
    })(),
    Mi = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        return (m(this, n), t.apply(this, arguments));
      }
      return (
        v(n, [
          {
            key: 'convertNumber',
            value: function (e, t, n) {
              var i = this.conv[n || this.metric];
              if (!i)
                return (Ye('convertNumber', 'Convertion method for '.concat(n || this.metric, ' is not defined!')), 0);
              var r = i.conversion(e),
                o = Math.pow(10, null != t ? t : i.precision);
              return Math.round(r * o) / o;
            },
          },
        ]),
        n
      );
    })(Ni),
    Di = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        return (m(this, n), t.apply(this, arguments));
      }
      return (
        v(n, [
          {
            key: 'convertNumber',
            value: function (e) {
              return 0;
            },
          },
        ]),
        n
      );
    })(Ni),
    Ui = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        return (m(this, n), t.apply(this, arguments));
      }
      return (
        v(n, [
          {
            key: 'convertNumber',
            value: function (e) {
              var t = {
                0: 'RAIN',
                1: 'JUST_RAIN',
                2: 'THUNDER',
                3: 'FZ_RAIN',
                4: 'MX_ICE',
                5: 'SNOW',
                6: 'WET_SN',
                7: 'RA_SN',
                8: 'PELLETS',
                9: 'LIGHT_THUNDER',
                10: 'THUNDER',
                11: 'HEAVY_THUNDER',
              };
              return e in t ? bn[t[e]] : '';
            },
          },
        ]),
        n
      );
    })(Ni),
    Wi = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        return (m(this, n), t.apply(this, arguments));
      }
      return (
        v(n, [
          {
            key: 'convertNumber',
            value: function (e) {
              return 0 === e
                ? bn.NONE
                : e <= 2
                  ? bn.UV_LOW
                  : e <= 5
                    ? bn.UV_MODERATE
                    : e <= 7
                      ? bn.UV_HIGH
                      : e <= 10
                        ? bn.UV_VERY_HIGH
                        : bn.UV_EXTREME;
            },
          },
          {
            key: 'convertValue',
            value: function (e) {
              return this.convertNumber(e);
            },
          },
        ]),
        n
      );
    })(Ni),
    Fi = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        return (m(this, n), t.apply(this, arguments));
      }
      return (
        v(n, [
          {
            key: 'convertNumber',
            value: function (e) {
              return e <= 0.7 ? bn.NO_FOG : e <= 1 ? bn.FOG : bn.FOG_RIME;
            },
          },
          {
            key: 'convertValue',
            value: function (e) {
              return this.convertNumber(e);
            },
          },
        ]),
        n
      );
    })(Ni),
    Gi = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        var i;
        return (m(this, n), (i = t.call(this, e)).updateLines([321.25, 192.75]), i);
      }
      return (
        v(n, [
          {
            key: 'updateLines',
            value: function (e) {
              var t = this,
                n = {
                  '°C': {
                    conversion: function (e) {
                      return e - 273.15;
                    },
                    precision: 0,
                  },
                  '°F': {
                    conversion: function (e) {
                      return (9 * e) / 5 - 459.67;
                    },
                    precision: 0,
                  },
                },
                i = e[0],
                r = e[1],
                o = [
                  function (e) {
                    return e;
                  },
                  n['°C'].conversion,
                  n['°F'].conversion,
                ],
                a = [],
                s = [],
                l = [];
              this.conv = {};
              for (
                var c = function (e) {
                    var n = o[e](i),
                      c = o[e](r) - n;
                    (a.push(c / 255), s.push(n));
                    var u = t.description[e],
                      d = function (t) {
                        return Math.round(a[e] * t + s[e]);
                      };
                    ((l[e] = d), (t.conv[u] = { conversion: d, precision: 0, na: '' }));
                  },
                  u = 0;
                u < o.length;
                u++
              )
                c(u);
              for (
                var d = [150, 168, 186, 205, 223],
                  h = [],
                  f = function () {
                    var e = d[m],
                      t = [e].concat(
                        g(
                          l.map(function (t) {
                            return t(e);
                          }),
                        ),
                      );
                    h.push(t);
                  },
                  m = 0;
                m < d.length;
                m++
              )
                f();
              this.lines = h;
            },
          },
        ]),
        n
      );
    })(Mi),
    Hi = (function (e) {
      s(i, e);
      var n = c(i);
      function i() {
        return (m(this, i), n.apply(this, arguments));
      }
      return (
        v(i, [
          {
            key: 'initProperties',
            value: function () {
              (t(f(i.prototype), 'initProperties', this).call(this),
                (this.defaults = ['mm', 'in']),
                (this.nativeSync = !0),
                (this.description = ['mm', 'in']),
                (this.cohesion = { snow: { in: 'in', mm: 'cm' } }),
                (this.conv = {
                  mm: { conversion: xi, precision: 1 },
                  in: {
                    conversion: function (e) {
                      return 0.0394 * e;
                    },
                    precision: 2,
                  },
                }));
            },
          },
        ]),
        i
      );
    })(Mi),
    zi = {
      '%': {
        conversion: function (e) {
          return Math.round(100 * e);
        },
        precision: 0,
      },
    },
    Bi = new Mi({
      ident: 'temp',
      separator: '',
      defaults: ['°C', '°F'],
      conv:
        ((bi = 0),
        {
          '°C': {
            conversion: function (e) {
              return e - 273.15;
            },
            precision: bi,
          },
          '°F': {
            conversion: function (e) {
              return (9 * e) / 5 - 459.67;
            },
            precision: bi,
          },
        }),
      description: ['°C', '°F'],
      nativeSync: !0,
      lines: [
        [252, -20, -5],
        [262, -10, 15],
        [272, 0, 30],
        [282, 10, 50],
        [292, 20, 70],
        [302, 30, 85],
        [313, 40, 100],
      ],
    }),
    ji = new Mi({
      ident: 'wind',
      defaults: ['kt'],
      nativeSync: !0,
      conv: {
        kt: {
          conversion: function (e) {
            return 1.943844 * e;
          },
          precision: 0,
        },
        bft: {
          conversion: function (e) {
            for (var t = [0.3, 1.5, 3.3, 5.5, 8, 10.8, 13.9, 17.2, 20.7, 24.5, 28.4, 32.6], n = 0; n < t.length; n++)
              if (e < t[n]) return n;
            return 12;
          },
          precision: 0,
        },
        'm/s': { conversion: xi, precision: 0 },
        'km/h': {
          conversion: function (e) {
            return 3.6 * e;
          },
          precision: 0,
        },
        mph: {
          conversion: function (e) {
            return 2.236936 * e;
          },
          precision: 0,
        },
      },
      description: ['kt', 'bft', 'm/s', 'mph', 'km/h'],
      lines: [
        [0, 0, 0, 0, 0, 0],
        [3, 5, 2, 3, 6, 10],
        [5, 10, 3, 5, 10, 20],
        [10, 20, 5, 10, 20, 35],
        [15, 30, 7, 15, 35, 55],
        [20, 40, 8, 20, 45, 70],
        [30, 60, 11, 30, 70, 100],
      ],
    }),
    Vi = new Mi({
      ident: 'rh',
      defaults: ['%'],
      conv: { '%': { conversion: xi, precision: 0 } },
      description: ['%'],
      lines: [
        [30, 30],
        [50, 50],
        [80, 80],
        [90, 90],
        [100, 100],
      ],
    }),
    Yi = new Mi({
      ident: 'clouds',
      defaults: ['rules'],
      conv: { rules: { conversion: xi, precision: 0 }, '%': { conversion: xi, precision: 0 } },
      description: ['rules', '%'],
      lines: [
        [25, 'FEW', 25],
        [50, 'SCT', 50],
        [70, 'BKN', 70],
        [100, 'OVC', 100],
      ],
    }),
    qi = new Mi({
      ident: 'pressure',
      defaults: ['hPa', 'inHg', 'mmHg'],
      conv: {
        hPa: {
          conversion: function (e) {
            return e / 100;
          },
          precision: 0,
        },
        mmHg: {
          conversion: function (e) {
            return e / 133.322387415;
          },
          precision: 0,
        },
        inHg: {
          conversion: function (e) {
            return e / 3386.389;
          },
          precision: 2,
        },
      },
      description: ['hPa', 'inHg', 'mmHg'],
      lines: [
        [99e3, 990, 29.2, 742],
        [1e5, 1e3, 29.6, 750],
        [101e3, 1010, 29.8, 757],
        [102e3, 1020, 30.1, 765],
        [103e3, 1030, 30.4, 772],
      ],
    }),
    Zi = new Hi({
      ident: 'rain',
      lines: [
        [1.5, 1.5, '.06'],
        [2, 2, '.08'],
        [3, 3, '.11'],
        [7, 7, '.24'],
        [10, 10, '.39'],
        [20, 20, '.78'],
        [30, 30, 1.2],
      ],
    }),
    Xi = new Mi({
      ident: 'snow',
      defaults: ['cm', 'in'],
      nativeSync: !0,
      conv: {
        cm: { conversion: xi, precision: 1 },
        in: {
          conversion: function (e) {
            return 0.39 * e;
          },
          precision: 1,
        },
      },
      description: ['cm', 'in'],
      lines: [
        [2, 2, '.8'],
        [5, 5, 2],
        [10, 10, 4],
        [50, 50, 20],
        [100, '1m', '3ft'],
        [300, '3m', '9ft'],
      ],
      cohesion: { rain: { in: 'in', cm: 'mm' } },
    }),
    Ji = new Mi({
      ident: 'cape',
      defaults: ['J/kg'],
      conv: { 'J/kg': { conversion: xi, precision: 0 } },
      description: ['J/kg'],
      lines: [
        [0, 0],
        [500, 500],
        [1500, 1500],
        [2500, 2500],
        [5e3, 5e3],
      ],
    }),
    Qi = new Mi({
      ident: 'gtco3',
      defaults: ['DU'],
      conv: { DU: { conversion: xi, precision: 0 } },
      description: ['DU'],
      lines: [
        [150, 150],
        [220, 220],
        [280, 280],
        [330, 330],
        [400, 400],
      ],
    }),
    Ki = new Mi({
      ident: 'aod550',
      defaults: ['AOD'],
      conv: { AOD: { conversion: xi, precision: 3 } },
      description: ['AOD'],
      lines: [
        [0, 0],
        [0.25, 0.25],
        [0.5, 0.5],
        [1, 1],
        [2, 2],
        [4, 4],
      ],
    }),
    $i = new Mi({
      ident: 'pm2p5',
      defaults: ['µg/m³'],
      conv: { 'µg/m³': { conversion: xi, precision: 0 } },
      description: ['µg/m³'],
      lines: [
        [0, 0],
        [10, 10],
        [20, 20],
        [100, 100],
        [1e3, 1e3],
      ],
    }),
    er = new Mi({
      ident: 'no2',
      defaults: ['µg/m³'],
      conv: { 'µg/m³': { conversion: xi, precision: 2 } },
      description: ['µg/m³'],
      lines: [
        [0, 0],
        [1, 1],
        [5, 5],
        [25, 25],
        [100, 100],
      ],
    }),
    tr = new Mi({
      ident: 'tcso2',
      defaults: ['mg/m²'],
      conv: { 'mg/m²': { conversion: xi, precision: 2 } },
      description: ['mg/m²'],
      lines: [
        [0, 0],
        [1, 1],
        [5, 5],
        [25, 25],
        [100, 100],
      ],
    }),
    nr = new Mi({
      ident: 'go3',
      defaults: ['µg/m³'],
      conv: { 'µg/m³': { conversion: xi, precision: 2 } },
      description: ['µg/m³'],
      lines: [
        [0, 0],
        [10, 10],
        [20, 20],
        [100, 100],
        [1e3, 1e3],
      ],
    }),
    ir = new Mi({
      ident: 'altitude',
      defaults: ['m', 'ft'],
      conv: {
        m: { conversion: xi, precision: -2 },
        ft: {
          conversion: function (e) {
            return Math.round(3.28 * e);
          },
          precision: -2,
        },
      },
      description: ['m', 'ft'],
      lines: [
        [0, 0, 0],
        [1e3, 1e3, 3e3],
        [1500, 1500, 5e3],
        [5e3, '5k', 'FL150'],
        [9e3, '9k', 'FL300'],
      ],
    }),
    rr = new Mi({
      ident: 'elevation',
      defaults: ['m', 'ft'],
      conv: {
        m: { conversion: xi, precision: 0 },
        ft: {
          conversion: function (e) {
            return Math.round(3.28 * e);
          },
          precision: 0,
        },
      },
      description: ['m', 'ft'],
    }),
    or = new Mi({
      ident: 'distance',
      defaults: ['km', 'mi'],
      conv: {
        km: {
          conversion: function (e) {
            return e / 1e3;
          },
          precision: 1,
        },
        mi: {
          conversion: function (e) {
            return e / 1609.344;
          },
          precision: 1,
        },
        NM: {
          conversion: function (e) {
            return e / 1852;
          },
          precision: 1,
        },
      },
      description: ['km', 'mi', 'NM'],
    }),
    ar = new Mi({
      ident: 'speed',
      defaults: ['kt'],
      conv: {
        'km/h': {
          conversion: function (e) {
            return 3.6 * e;
          },
          precision: 0,
        },
        mph: {
          conversion: function (e) {
            return 2.236936 * e;
          },
          precision: 0,
        },
        kt: {
          conversion: function (e) {
            return 1.943844 * e;
          },
          precision: 0,
        },
        'm/s': { conversion: xi, precision: 0 },
      },
      description: ['km/h', 'mph', 'kt', 'm/s'],
    }),
    sr = new Mi({
      ident: 'waves',
      defaults: ['m', 'ft'],
      conv: {
        m: { conversion: xi, precision: 1 },
        ft: {
          conversion: function (e) {
            return 3.28 * e;
          },
          precision: 0,
        },
      },
      description: ['m', 'ft'],
      lines: [
        [0.5, 0.5, 1.6],
        [1, 1, 3.3],
        [1.5, 1.5, 5],
        [2, 2, 6.6],
        [6, 6, 20],
        [9, 9, 30],
      ],
    }),
    lr = new Mi({
      ident: 'currents',
      separator: ' ',
      defaults: ['kt'],
      conv: {
        kt: {
          conversion: function (e) {
            return 1.943844 * e;
          },
          precision: 1,
        },
        'm/s': { conversion: xi, precision: 2 },
        'km/h': {
          conversion: function (e) {
            return 3.6 * e;
          },
          precision: 1,
        },
        mph: {
          conversion: function (e) {
            return 2.236936 * e;
          },
          precision: 1,
        },
      },
      description: ['kt', 'm/s', 'mph', 'km/h'],
      lines: [
        [0, 0, 0, 0, 0],
        [0.2, 0.4, 0.2, 0.4, 0.7],
        [0.4, 0.8, 0.4, 0.9, 1.4],
        [0.8, 1.6, 0.8, 1.8, 2.9],
        [1, 2, 1, 2.2, 3.6],
        [1.6, 3.2, 1.6, 3.6, 5.8],
      ],
    }),
    cr = new Mi({
      ident: 'visibility',
      defaults: ['km', 'sm'],
      conv: {
        rules: {
          conversion: function (e) {
            return e / 1e3;
          },
          label: 'km',
          precision: 1,
        },
        km: {
          conversion: function (e) {
            return e / 1e3;
          },
          precision: 1,
        },
        sm: {
          conversion: function (e) {
            return 62137e-8 * e;
          },
          precision: 1,
        },
      },
      description: ['rules', 'km', 'sm'],
      lines: [
        [0, 'LIFR', '.8', '.5'],
        [3e3, 'IFR', 2.7, 1.5],
        [7e3, 'MVFR', 6, 4],
        [16e3, 'VFR', 16, 10],
      ],
    }),
    ur = new Mi({
      ident: 'visibilityNoRules',
      defaults: ['km', 'sm'],
      conv: {
        km: {
          conversion: function (e) {
            return e / 1e3;
          },
          precision: 1,
        },
        sm: {
          conversion: function (e) {
            return 62137e-8 * e;
          },
          precision: 1,
        },
      },
      description: ['km', 'sm'],
      lines: [
        [0, '.8', '.5'],
        [3e3, 2.7, 1.5],
        [7e3, 6, 4],
        [16e3, 16, 10],
      ],
    }),
    dr = new Mi({
      ident: 'so2',
      defaults: ['µg/m³'],
      conv: { 'µg/m³': { conversion: xi, precision: 2 } },
      description: ['µg/m³'],
      lines: [
        [0, 0],
        [1, 1],
        [5, 5],
        [10, 10],
        [80, 80],
      ],
    }),
    hr = new Mi({
      ident: 'dust',
      defaults: ['µg/m³'],
      conv: { 'µg/m³': { conversion: xi, precision: 1 } },
      description: ['µg/m³'],
      lines: [
        [0, 0],
        [50, 50],
        [100, 100],
        [500, 500],
        [800, 800],
      ],
    }),
    fr = new Mi({
      ident: 'cosc',
      defaults: ['ppbv'],
      conv: { ppbv: { conversion: xi, precision: 0 } },
      description: ['ppbv'],
      lines: [
        [0, 0],
        [50, 50],
        [100, 100],
        [500, 500],
        [1200, 1200],
      ],
    }),
    mr = function (e) {
      return Math.pow(0.005 * Math.pow(10, 0.1 * e), 0.625);
    },
    pr = new Mi({
      ident: 'radar',
      defaults: ['dBZ', 'mm/h', 'in/h'],
      conv: {
        dBZ: { conversion: xi, precision: 0 },
        'mm/h': {
          conversion: function (e) {
            return mr(e);
          },
          precision: 1,
        },
        'in/h': {
          conversion: function (e) {
            return mr(e) / 25.4;
          },
          precision: 2,
        },
      },
      description: ['dBZ', 'mm/h', 'in/h'],
      lines: [
        [0, 0, 0, 0],
        [20, 20, 0.6, 0.02],
        [30, 30, 3, 0.1],
        [40, 40, 12, 0.5],
        [50, 50, 50, 2],
        [60, 60, 200, 8],
      ],
    }),
    vr = {
      conversion: function (e) {
        return e;
      },
      precision: 0,
      na: '',
    },
    gr = new Gi({
      ident: 'satellite',
      defaults: ['K', '°C', '°F'],
      conv: { K: vr, '°C': vr, '°F': vr },
      description: ['K', '°C', '°F'],
      lines: [],
    }),
    yr = new Ui({
      ident: 'ptype',
      defaults: ['ptype'],
      conv: { ptype: { conversion: xi, precision: 0, label: '' } },
      discreteLegend: {
        labels: [
          ['JUST_RAIN', 'rgb(0,153,182)'],
          ['FZ_RAIN', 'rgb(144,0,150)'],
          ['MX_ICE', 'rgb(81,12,15)'],
          ['SNOW', 'rgb(178,178,178)'],
          ['WET_SN', 'rgb(86,148,86)'],
          ['RA_SN', 'rgb(149,161,9)'],
        ],
      },
    }),
    wr = new Mi({ ident: 'gh', defaults: ['m'], conv: { m: { conversion: xi, precision: 0 } } }),
    br = new Fi({
      ident: 'fog',
      defaults: ['type'],
      conv: { type: { conversion: xi, precision: 0 } },
      discreteLegend: {
        hasEqualItemsWidth: !0,
        labels: [
          ['FOG', '#c6c6c6'],
          ['FOG_RIME', '#c9c9ff'],
        ],
      },
    }),
    Tr = new Mi({
      ident: 'lightDensity',
      defaults: ['l/km²'],
      conv: { 'l/km²': { conversion: xi, precision: 2 } },
      description: ['l/km²'],
      lines: [
        [0, 0],
        [0.025, '.025'],
        [0.1, '.1'],
        [1, 1],
        [10, 10],
        [20, 20],
      ],
    }),
    Er = new Mi({
      ident: 'efiWind',
      defaults: ['%'],
      conv: zi,
      description: ['%'],
      lines: [
        [-1, 'unusually'],
        [-0.75, 'calm'],
        [0.25, ''],
        [0.75, 'extreme'],
        [1, 'wind'],
      ],
    }),
    Sr = new Mi({
      ident: 'efiTemp',
      defaults: ['%'],
      conv: zi,
      description: ['%'],
      lines: [
        [-1, 'extreme'],
        [-0.75, 'cold'],
        [-0.25, ''],
        [0.25, ''],
        [0.75, 'extreme'],
        [1, 'warm'],
      ],
    }),
    _r = new Mi({
      ident: 'efiRain',
      defaults: ['%'],
      conv: zi,
      description: ['%'],
      lines: [
        [-1, 'very dry'],
        [0, ''],
        [0.1, ''],
        [0.75, 'extreme'],
        [1, 'precip.'],
      ],
    }),
    Ar = new Hi({
      ident: 'moistureAnom100',
      lines: [
        [-100, -100, -3.94],
        [-60, -60, -2.36],
        [-30, -30, 1.18],
        [0, 0, 0],
        [30, 30, 1.18],
        [60, 60, 2.36],
        [100, 100, 3.94],
      ],
    }),
    Pr = new Hi({
      ident: 'moistureAnom40',
      lines: [
        [-60, -60, -2.36],
        [-30, -30, 1.18],
        [0, 0, 0],
        [30, 30, 1.18],
        [60, 60, 2.36],
      ],
    }),
    kr = new Mi({
      ident: 'drought',
      defaults: ['drought'],
      conv: { drought: { conversion: xi, precision: 0 } },
      discreteLegend: {
        labels: [
          ['INTERSUCHO_AWP_1', 'rgb(241,223,120)'],
          ['INTERSUCHO_AWP_2', 'rgb(236,184,50)'],
          ['INTERSUCHO_AWP_3', 'rgb(221,144,13)'],
          ['INTERSUCHO_AWP_4', 'rgb(194,95,0)'],
          ['INTERSUCHO_AWP_5', 'rgb(158,34,12)'],
          ['INTERSUCHO_AWP_6', 'rgb(120,0,19)'],
        ],
      },
    }),
    Cr = new Mi({
      ident: 'fwi',
      defaults: ['fwi'],
      conv: { fwi: { conversion: xi, precision: 0 } },
      discreteLegend: {
        labels: [
          ['INTERSUCHO_FWI_1', 'rgb(75,168,64)'],
          ['INTERSUCHO_FWI_2', 'rgb(234,232,63)'],
          ['INTERSUCHO_FWI_3', 'rgb(236,142,65)'],
          ['INTERSUCHO_FWI_4', 'rgb(220,60,48)'],
          ['INTERSUCHO_FWI_5', 'rgb(162,37,30)'],
          ['INTERSUCHO_FWI_6', 'rgb(131,42,109)'],
        ],
      },
    }),
    Or = new Mi({
      ident: 'dfm10h',
      defaults: ['%'],
      conv: { '%': { conversion: xi, precision: 0 } },
      description: ['%'],
      lines: [
        [0, 0],
        [4, 4],
        [8, 8],
        [10, 10],
        [30, 30],
        [40, 40],
      ],
    }),
    Lr = new Mi({
      ident: 'solarpower',
      defaults: ['W/m²'],
      conv: { 'W/m²': { conversion: xi, precision: 0 } },
      description: ['W/m²'],
      lines: [
        [0, 0],
        [250, 250],
        [500, 500],
        [750, 750],
        [1e3, 1e3],
      ],
    }),
    Ir = new Wi({
      ident: 'uvindex',
      defaults: ['uvindex'],
      conv: { uvindex: { conversion: xi, precision: 10 } },
      description: ['type'],
      lines: [
        [-100, -100, -3.94],
        [-60, -60, -2.36],
        [-30, -30, 1.18],
        [0, 0, 0],
        [30, 30, 1.18],
        [60, 60, 2.36],
        [100, 100, 3.94],
      ],
      discreteLegend: {
        hasEqualItemsWidth: !0,
        labels: [
          ['UV_LOW', 'rgb(41,148,26)'],
          ['UV_MODERATE', 'rgb(235,224,0)'],
          ['UV_HIGH', 'rgb(222,120,0)'],
          ['UV_VERY_HIGH', 'rgb(210,30,0)'],
          ['UV_EXTREME', 'rgb(162,83,144)'],
        ],
      },
    }),
    Rr = new Di({
      ident: 'capAlerts',
      defaults: [],
      conv: {},
      discreteLegend: {
        hasEqualItemsWidth: !0,
        labels: [
          ['INTERSUCHO_AWP_3', '#b3b300'],
          ['INTERSUCHO_AWP_4', '#c17d00'],
          ['INTERSUCHO_AWP_6', '#a50000'],
        ],
      },
    }),
    xr = new Mi({
      ident: 'turbulence',
      defaults: ['EDR'],
      conv: { EDR: { conversion: xi, precision: 0 } },
      description: ['EDR'],
      lines: [
        [0, 0],
        [20, 20],
        [40, 40],
        [60, 60],
        [80, 80],
        [100, 100],
      ],
    }),
    Nr = new Mi({
      ident: 'icing',
      defaults: ['%'],
      conv: { '%': { conversion: xi, precision: 0 } },
      description: ['%'],
      lines: [
        [0, 0],
        [20, 20],
        [40, 40],
        [60, 60],
        [80, 80],
        [100, 100],
      ],
    }),
    Mr = new Mi({
      ident: 'area',
      defaults: ['km²', 'acres'],
      conv: {
        'km²': { conversion: xi, precision: 1 },
        acres: {
          conversion: function (e) {
            return 247.105 * e;
          },
          precision: 0,
        },
      },
      description: ['km²', 'acres'],
    }),
    Dr = {
      temp: Bi,
      wind: ji,
      rh: Vi,
      clouds: Yi,
      pressure: qi,
      rain: Zi,
      snow: Xi,
      cape: Ji,
      gtco3: Qi,
      aod550: Ki,
      pm2p5: $i,
      no2: er,
      tcso2: tr,
      go3: nr,
      altitude: ir,
      elevation: rr,
      distance: or,
      speed: ar,
      waves: sr,
      currents: lr,
      visibility: cr,
      visibilityNoRules: ur,
      so2: dr,
      dust: hr,
      cosc: fr,
      radar: pr,
      satellite: gr,
      ptype: yr,
      gh: wr,
      fog: br,
      lightDensity: Tr,
      efiWind: Er,
      efiTemp: Sr,
      efiRain: _r,
      drought: kr,
      moistureAnom40: Pr,
      moistureAnom100: Ar,
      fwi: Cr,
      dfm10h: Or,
      solarpower: Lr,
      uvindex: Ir,
      capAlerts: Rr,
      turbulence: xr,
      icing: Nr,
      area: Mr,
    },
    Ur = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        return (
          m(this, n),
          t.call(
            this,
            S(
              S({}, e),
              {},
              {
                provider: 'MF',
                interval: 720,
                intervalPremium: 360,
                modelName: 'AROME',
                modelResolution: 2.5,
                JPGtransparency: !0,
                animation: !0,
                dataQuality: 'extreme',
                maxTileZoom: { free: 4, premium: 6 },
                category: 'forecast',
                forecastSize: 42,
                levels: [
                  'surface',
                  '100m',
                  '950h',
                  '925h',
                  '900h',
                  '850h',
                  '800h',
                  '700h',
                  '600h',
                  '500h',
                  '400h',
                  '300h',
                  '250h',
                  '200h',
                  '150h',
                ],
                overlays: [
                  'wind',
                  'temp',
                  'wetbulbtemp',
                  'clouds',
                  'lclouds',
                  'mclouds',
                  'hclouds',
                  'rh',
                  'gust',
                  'cape',
                  'dewpoint',
                  'rain',
                  'snowAccu',
                  'rainAccu',
                  'ptype',
                  'pressure',
                  'gustAccu',
                  'turbulence',
                ],
                acTimes: ['next12h', 'next24h'],
                isolines: ['pressure', 'gh', 'temp'],
              },
            ),
          )
        );
      }
      return v(n);
    })(Li),
    Wr = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        return (m(this, n), t.call(this, S(S({}, e), Ii)));
      }
      return v(n);
    })(Li),
    Fr = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        return (
          m(this, n),
          t.call(
            this,
            S(
              S({}, e),
              {},
              {
                provider: 'NCEP',
                modelName: 'HRRR',
                dataQuality: 'extreme',
                maxTileZoom: { free: 4, premium: 6 },
                betterDataQuality: ['rain', 'clouds', 'lclouds', 'hclouds', 'mclouds'],
                interval: 720,
                JPGtransparency: !0,
                forecastSize: 72,
                levels: [
                  'surface',
                  '975h',
                  '950h',
                  '925h',
                  '900h',
                  '850h',
                  '800h',
                  '700h',
                  '600h',
                  '500h',
                  '400h',
                  '300h',
                  '250h',
                  '200h',
                  '150h',
                ],
                overlays: [
                  'wind',
                  'temp',
                  'wetbulbtemp',
                  'clouds',
                  'rh',
                  'cape',
                  'gust',
                  'pressure',
                  'dewpoint',
                  'rain',
                  'lclouds',
                  'hclouds',
                  'mclouds',
                  'snowAccu',
                  'rainAccu',
                  'ptype',
                  'gustAccu',
                  'ccl',
                  'turbulence',
                  'icing',
                ],
                acTimes: ['next12h', 'next24h', 'next48h'],
                isolines: ['pressure', 'temp', 'gh'],
                requiresInfoJson: !0,
              },
            ),
          )
        );
      }
      return v(n);
    })(Li),
    Gr = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        return (
          m(this, n),
          t.call(
            this,
            S(
              S({}, e),
              {},
              {
                provider: 'DWD',
                interval: 720,
                intervalPremium: 360,
                prefferedProduct: 'icon',
                animation: !0,
                betterDataQuality: ['rain', 'clouds', 'lclouds', 'mclouds', 'hclouds'],
                forecastSize: 120,
                labelsTemp: !0,
                levels: [
                  'surface',
                  '950h',
                  '925h',
                  '900h',
                  '850h',
                  '800h',
                  '700h',
                  '600h',
                  '500h',
                  '400h',
                  '300h',
                  '250h',
                  '200h',
                  '150h',
                ],
                overlays: [
                  'snowcover',
                  'wind',
                  'temp',
                  'wetbulbtemp',
                  'solarpower',
                  'pressure',
                  'clouds',
                  'lclouds',
                  'mclouds',
                  'hclouds',
                  'rh',
                  'gust',
                  'cape',
                  'dewpoint',
                  'rain',
                  'deg0',
                  'snowAccu',
                  'rainAccu',
                  'ptype',
                  'gustAccu',
                  'fog',
                  'ccl',
                  'turbulence',
                ],
                acTimes: ['next12h', 'next24h', 'next2d', 'next3d', 'next5d'],
                isolines: ['pressure', 'gh', 'temp', 'deg0'],
                requiresInfoJson: !0,
              },
            ),
          )
        );
      }
      return v(n);
    })(Li),
    Hr = Object.freeze({ __proto__: null, IconProducts: Gr }),
    zr = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        return (
          m(this, n),
          t.call(
            this,
            S(
              S({}, e),
              {},
              {
                provider: 'NOAA',
                interval: 360,
                modelName: 'NAM',
                dataQuality: 'ultra',
                maxTileZoom: { free: 4, premium: 5 },
                betterDataQuality: ['rain', 'clouds', 'lclouds', 'hclouds', 'mclouds'],
                JPGtransparency: !0,
                forecastSize: 72,
                levels: [
                  'surface',
                  '975h',
                  '950h',
                  '925h',
                  '900h',
                  '850h',
                  '800h',
                  '700h',
                  '600h',
                  '500h',
                  '400h',
                  '300h',
                  '250h',
                  '200h',
                  '150h',
                ],
                overlays: [
                  'wind',
                  'temp',
                  'wetbulbtemp',
                  'clouds',
                  'cape',
                  'rh',
                  'gust',
                  'pressure',
                  'dewpoint',
                  'rain',
                  'lclouds',
                  'hclouds',
                  'mclouds',
                  'snowAccu',
                  'rainAccu',
                  'ptype',
                  'gustAccu',
                  'ccl',
                  'turbulence',
                  'icing',
                ],
                acTimes: ['next12h', 'next24h', 'next48h', 'next60h'],
                isolines: ['pressure', 'temp', 'gh'],
                requiresInfoJson: !0,
              },
            ),
          )
        );
      }
      return v(n);
    })(Li),
    Br = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        var i;
        return (
          m(this, n),
          ((i = t.call(this, e)).dailyCache = new Date().toISOString().replace(/^\d+-(\d+)-(\d+)T.*$/, '$1$2')),
          (i.hasRefTime = !1),
          i
        );
      }
      return (
        v(n, [
          {
            key: 'refTime',
            value: function () {
              return this.dailyCache;
            },
          },
          {
            key: 'open',
            value: function () {
              return Promise.resolve(void 0);
            },
          },
        ]),
        n
      );
    })(Li),
    jr = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        var i;
        return (m(this, n), ((i = t.call(this, e)).urlSuff = e.urlSuff), (i.urlSuffFlow = e.urlSuffFlow), i);
      }
      return (
        v(n, [
          {
            key: 'open',
            value: function () {
              return (this.loadInfoJson(), Promise.resolve(void 0));
            },
          },
          {
            key: 'loadInfoJson',
            value: function (e) {
              var t = new Date().toISOString().replace(/.*T(\d+):(\d+).*/, '$1$2'),
                n = ''.concat(this.server, '/satellite/info.json?').concat(t);
              return Xt(n, { cache: !e });
            },
          },
          {
            key: 'moveTs',
            value: function (e) {
              var t = this.calendar.timestamps,
                n = vt.get('satelliteTimestamp'),
                i = t.length - 1,
                r = t.find(function (e) {
                  return e >= n;
                });
              void 0 === r && (r = t[i]);
              var o = Oe(t.indexOf(r) + (e ? 1 : -1), 0, i);
              vt.set('satelliteTimestamp', t[o]);
            },
          },
        ]),
        n
      );
    })(Br),
    Vr =
      '<a href="https://atmosphere.copernicus.eu/" target="_blank"><img style="max-width:150px;height:auto;" src="https://www.windy.com/img/providers/copernicus-white.svg" /></a>',
    Yr =
      '<a href="https://www.droughtimpacts.eu/" target="_blank" class="uiyellow clickable-size" style="font-size: 11px;">\n        <img style="position:relative;width:100px;height:auto;opacity:0.7;-webkit-filter:drop-shadow(0 0 3px rgba(0, 0, 0, 0.8));filter:drop-shadow(0 0 3px rgba(0, 0, 0, 0.8));" src="img/providers/czechglobe.svg" />\n        <p style="white-space: break-spaces;">Help us to monitor fire and drought impacts in your region for a safer World - go to www.droughtImpacts.eu</p>\n    </a>',
    qr = new Ri({
      ident: 'ecmwf',
      category: 'forecast',
      modelIdent: 'ecmwf-hres',
      betterDataQuality: [
        'rain',
        'clouds',
        'lclouds',
        'mclouds',
        'hclouds',
        'cbase',
        'snowAccu',
        'rainAccu',
        'snowcover',
        'ptype',
      ],
      levels: [
        'surface',
        '100m',
        '950h',
        '925h',
        '900h',
        '850h',
        '800h',
        '700h',
        '600h',
        '500h',
        '400h',
        '300h',
        '250h',
        '200h',
        '150h',
        '10h',
      ],
      overlays: [
        'snowcover',
        'wind',
        'temp',
        'wetbulbtemp',
        'solarpower',
        'pressure',
        'clouds',
        'lclouds',
        'mclouds',
        'hclouds',
        'rh',
        'gust',
        'cbase',
        'cape',
        'dewpoint',
        'rain',
        'visibility',
        'deg0',
        'cloudtop',
        'thunder',
        'snowAccu',
        'rainAccu',
        'ptype',
        'gustAccu',
        'ccl',
        'turbulence',
        'icing',
      ],
      acTimes: ['next12h', 'next24h', 'next3d', 'next5d', 'next10d'],
      isolines: ['pressure', 'gh', 'temp', 'deg0'],
      requiresInfoJson: !0,
    }),
    Zr = new Wr({
      ident: 'ecmwfAnalysis',
      category: 'analysis',
      modelIdent: 'ecmwf-hres',
      betterDataQuality: ['sst'],
      overlays: ['sst'],
      isolines: [],
      labelsTemp: !1,
    }),
    Xr = new Li({
      ident: 'cams',
      provider: 'Copernicus',
      interval: 720,
      PNGtransparency: !0,
      modelName: 'CAMS',
      modelResolution: 40,
      fileSuffix: 'png',
      category: 'forecast',
      modelIdent: 'cams-global',
      maxTileZoom: { free: 3, premium: 3 },
      dataQuality: 'low',
      levels: ['surface'],
      overlays: ['gtco3', 'aod550', 'pm2p5', 'no2', 'tcso2', 'go3', 'uvindex', 'cosc', 'dustsm'],
      labelsTemp: !1,
      requiresInfoJson: !0,
      logo: Vr,
    }),
    Jr = new Li({
      ident: 'camsEu',
      provider: 'Copernicus',
      interval: 1440,
      PNGtransparency: !0,
      modelName: 'CAMS EU',
      modelResolution: 10,
      fileSuffix: 'png',
      category: 'forecast',
      modelIdent: 'cams-eu',
      bounds: [
        [
          [70, -25],
          [70, 45],
          [30, 45],
          [30, -25],
        ],
      ],
      maxTileZoom: { free: 3, premium: 3 },
      dataQuality: 'high',
      levels: ['surface'],
      overlays: ['pm2p5', 'no2', 'go3'],
      labelsTemp: !1,
      requiresInfoJson: !0,
      logo: Vr,
    }),
    Qr = new Li({
      ident: 'cmems',
      JPGtransparency: !0,
      requiresInfoJson: !0,
      maxTileZoom: { free: 3, premium: 3 },
      modelName: 'CMEMS',
      modelResolution: 9,
      provider: 'Copernicus',
      category: 'forecast',
      modelIdent: 'cmems',
      labelsTemp: !1,
      interval: 1440,
      dataQuality: 'normal',
      overlays: ['currents', 'currentsTide'],
      levels: ['surface'],
      logo: Vr,
    }),
    Kr = new Li({
      ident: 'gfs',
      prefferedProduct: 'gfs',
      provider: 'NOAA',
      interval: 720,
      intervalPremium: 360,
      modelName: 'GFS',
      modelResolution: 22,
      category: 'forecast',
      modelIdent: 'gfs',
      maxTileZoom: { free: 3, premium: 3 },
      dataQuality: 'low',
      betterDataQuality: ['rain', 'clouds', 'lclouds', 'mclouds', 'hclouds'],
      levels: [
        'surface',
        '100m',
        '975h',
        '950h',
        '925h',
        '900h',
        '850h',
        '800h',
        '700h',
        '600h',
        '500h',
        '400h',
        '300h',
        '250h',
        '200h',
        '150h',
        '10h',
      ],
      overlays: [
        'wind',
        'temp',
        'wetbulbtemp',
        'pressure',
        'clouds',
        'rh',
        'gust',
        'dewpoint',
        'rain',
        'lclouds',
        'mclouds',
        'hclouds',
        'snowAccu',
        'rainAccu',
        'ptype',
        'gustAccu',
        'cape',
        'ccl',
        'turbulence',
        'icing',
      ],
      acTimes: ['next12h', 'next24h', 'next3d', 'next5d', 'next10d'],
      isolines: ['pressure', 'gh', 'temp'],
      requiresInfoJson: !0,
    }),
    $r = new Gr({
      ident: 'iconEu',
      modelName: 'ICON-EU',
      modelResolution: 7,
      JPGtransparency: !0,
      dataQuality: 'high',
      maxTileZoom: { free: 3, premium: 4 },
      category: 'forecast',
      modelIdent: 'icon-eu',
      bounds: [
        [
          [70, -23],
          [70, 44],
          [30, 44],
          [30, -23],
        ],
      ],
    }),
    eo = new Gr({
      ident: 'icon',
      modelName: 'ICON',
      modelResolution: 13,
      dataQuality: 'normal',
      maxTileZoom: { free: 3, premium: 3 },
      category: 'forecast',
      modelIdent: 'icon-global',
    }),
    to = new Gr({
      ident: 'iconD2',
      modelName: 'ICON-D2',
      modelResolution: 2.2,
      JPGtransparency: !0,
      dataQuality: 'extreme',
      category: 'forecast',
      modelIdent: 'icon-d2',
      prefferedProduct: 'iconEu',
      maxTileZoom: { free: 4, premium: 6 },
      bounds: [
        [
          [57.237, -3.724],
          [57.722, 1.088],
          [57.973, 6.218],
          [57.962, 10.261],
          [57.669, 14.952],
          [57.651, 20.314],
          [43.485, 17.501],
          [43.692, 15.26],
          [43.858, 10.547],
          [43.604, 5.01],
          [43.676, 0.231],
        ],
      ],
      acTimes: ['next12h', 'next24h', 'next2d'],
    }),
    no = new Li({
      ident: 'iconWaves',
      modelName: 'ICON',
      modelResolution: 13,
      provider: 'DWD',
      interval: 300,
      prefferedProduct: 'icon',
      labelsTemp: !1,
      category: 'forecast',
      modelIdent: 'icon-gwam',
      fileSuffix: 'png',
      maxTileZoom: { free: 3, premium: 3 },
      dataQuality: 'low',
      overlays: ['waves', 'swell1', 'wwaves'],
      levels: ['surface'],
    }),
    io = new Li({
      ident: 'iconEuWaves',
      modelName: 'ICON-EU',
      modelResolution: 7,
      bounds: [
        [
          [66, -10.525],
          [66, 42.025],
          [29.95, 42.025],
          [29.95, -10.525],
        ],
      ],
      provider: 'DWD',
      interval: 300,
      prefferedProduct: 'iconEu',
      labelsTemp: !1,
      category: 'forecast',
      modelIdent: 'icon-ewam',
      fileSuffix: 'png',
      dataQuality: 'normal',
      maxTileZoom: { free: 3, premium: 3 },
      overlays: ['waves', 'swell1', 'wwaves'],
      levels: ['surface'],
    }),
    ro = new Li({
      ident: 'bomAccess',
      provider: 'BOM',
      interval: 720,
      intervalPremium: 360,
      modelName: 'ACCESS',
      modelResolution: 12,
      JPGtransparency: !0,
      dataQuality: 'normal',
      category: 'forecast',
      modelIdent: 'bom-access',
      maxTileZoom: { free: 3, premium: 4 },
      forecastSize: 240,
      bounds: [
        [
          [-65, 65],
          [-65, 180],
          [17, 180],
          [17, 65],
        ],
        [
          [-65, -180],
          [-65, -175],
          [17, -175],
          [17, -180],
        ],
      ],
      levels: [
        'surface',
        '950h',
        '925h',
        '900h',
        '850h',
        '800h',
        '700h',
        '600h',
        '500h',
        '400h',
        '300h',
        '250h',
        '200h',
        '150h',
      ],
      overlays: [
        'wind',
        'temp',
        'wetbulbtemp',
        'pressure',
        'clouds',
        'lclouds',
        'mclouds',
        'hclouds',
        'rh',
        'gust',
        'dewpoint',
        'rain',
        'snowAccu',
        'rainAccu',
        'ptype',
        'gustAccu',
        'ccl',
        'turbulence',
        'icing',
      ],
      acTimes: ['next12h', 'next24h', 'next3d', 'next5d', 'next10d'],
      isolines: ['pressure', 'gh', 'temp'],
      requiresInfoJson: !0,
    }),
    oo = new Li({
      ident: 'arome',
      provider: 'MF',
      interval: 720,
      intervalPremium: 360,
      modelName: 'AROME',
      modelResolution: 1.3,
      JPGtransparency: !0,
      animation: !0,
      dataQuality: 'extreme',
      maxTileZoom: { free: 4, premium: 6 },
      category: 'forecast',
      modelIdent: 'arome',
      forecastSize: 72,
      bounds: [
        [
          [55, -10],
          [55, 15],
          [38, 15],
          [38, -10],
        ],
      ],
      levels: ['surface'],
      overlays: [
        'wind',
        'temp',
        'wetbulbtemp',
        'clouds',
        'lclouds',
        'mclouds',
        'hclouds',
        'rh',
        'gust',
        'cape',
        'dewpoint',
        'rain',
        'ptype',
      ],
      isolines: ['temp'],
    }),
    ao = new Ur({
      ident: 'aromeAntilles',
      modelIdent: 'arome-antilles',
      bounds: [
        [
          [23, -68],
          [23, -52],
          [10, -52],
          [10, -68],
        ],
      ],
    }),
    so = new Ur({
      ident: 'aromeReunion',
      modelIdent: 'arome-reunion',
      bounds: [
        [
          [-7, 32],
          [-7, 68],
          [-26, 68],
          [-26, 32],
        ],
      ],
    }),
    lo = new Li({
      ident: 'nems',
      modelName: 'NEMS',
      modelResolution: 4,
      provider: 'Meteoblue.com',
      interval: 720,
      JPGtransparency: !0,
      animation: !0,
      dataQuality: 'ultra',
      betterDataQuality: ['rain', 'clouds'],
      maxTileZoom: { free: 4, premium: 5 },
      category: 'forecast',
      modelIdent: 'mbeurope',
      labelsTemp: !1,
      forecastSize: 72,
      bounds: [
        [
          [57, -19],
          [57, 33],
          [33, 33],
          [33, -19],
        ],
      ],
      levels: ['surface', '975h', '950h', '925h', '900h', '850h'],
      overlays: ['wind', 'temp', 'wetbulbtemp', 'clouds', 'rh', 'gust', 'dewpoint', 'rain'],
      logo: '<a class="mobilehide" href="https://www.meteoblue.com/" target="_blank">NEMS4 model by <img style="max-width:90px;height:auto;" src="https://www.windy.com/img/logo-mb.svg" /></a>',
    }),
    co = new Br({ ident: 'mblue', modelName: K ? 'MBLUE' : 'METEOBLUE', interval: 720 }),
    uo = new zr({
      ident: 'namConus',
      modelResolution: 5,
      category: 'forecast',
      modelIdent: 'nam-conus',
      bounds: [
        [
          [47.7, -133],
          [51.27, -116.89],
          [52.57, -98.94],
          [51.43, -79.14],
          [47.7, -61.13],
          [21.27, -72.46],
          [24.43, -97.66],
          [21.33, -122.67],
        ],
      ],
    }),
    ho = new zr({
      ident: 'namHawaii',
      modelResolution: 3,
      category: 'forecast',
      modelIdent: 'nam-hawaii',
      bounds: [
        [
          [22.99, -161.39],
          [22.99, -154],
          [18.23, -154],
          [18.23, -161.39],
        ],
      ],
    }),
    fo = new zr({
      ident: 'namAlaska',
      modelResolution: 6,
      category: 'forecast',
      modelIdent: 'nam-alaska',
      bounds: [
        [
          [71.3, 171.8],
          [57.7, 160.9],
          [51, 172],
          [47.8, 180],
          [73, 180],
        ],
        [
          [47.8, -180],
          [43.2, -172.1],
          [46.1, -157],
          [45.7, -142.4],
          [49.7, -128.6],
          [51.5, -116.8],
          [53.2, -114.9],
          [66.6, -119],
          [73.6, -124],
          [75.3, -153.4],
          [73, -180],
        ],
      ],
    }),
    mo = new Fr({
      ident: 'hrrrConus',
      modelName: 'HRRR',
      modelResolution: 3,
      JPGtransparency: !0,
      dataQuality: 'extreme',
      category: 'forecast',
      modelIdent: 'hrrr-conus',
      intervalPremium: 60,
      bounds: [
        [
          [50.2, -123.3],
          [51.6, -114.9],
          [52.5, -97.2],
          [52.1, -85.8],
          [50.5, -73.1],
          [47.8, -60.7],
          [42.1, -63.8],
          [30.9, -68.7],
          [21, -72],
          [22.5, -78.9],
          [23.8, -89],
          [24.2, -97.4],
          [23.9, -105.2],
          [22.7, -115.1],
          [20.9, -122.5],
          [29.7, -125.4],
          [43.2, -131.3],
          [47.8, -133.9],
        ],
      ],
    }),
    po = new Fr({
      ident: 'hrrrAlaska',
      modelName: 'HRRR',
      modelResolution: 3,
      JPGtransparency: !0,
      dataQuality: 'extreme',
      category: 'forecast',
      modelIdent: 'hrrr-alaska',
      intervalPremium: 180,
      bounds: [
        [
          [55.7, 157],
          [51.2, 170.4],
          [46, 180],
          [71.6, 180],
          [65.8, 167],
        ],
        [
          [46, -180],
          [41.8, -175],
          [48.8, -160],
          [51.7, -145],
          [52, -129],
          [64.9, -125],
          [76, -116.5],
          [76, -158],
          [71.6, -180],
        ],
      ],
    }),
    vo = new Li({
      modelName: 'InterSucho',
      modelResolution: 9,
      provider: 'InterSucho',
      interval: 1440,
      fileSuffix: 'png',
      PNGtransparency: !0,
      dataQuality: 'normal',
      category: 'forecast',
      modelIdent: 'intersucho',
      levels: ['surface'],
      acTimes: [],
      isolines: [],
      labelsTemp: !1,
      requiresInfoJson: !0,
      logo: Yr,
      ident: 'drought',
      overlays: ['moistureAnom40', 'moistureAnom100', 'drought40', 'drought100', 'soilMoisture40', 'soilMoisture100'],
    }),
    go = new Li({
      modelName: 'FireRisk',
      modelResolution: 9,
      provider: 'CzechGlobe-FireRisk',
      interval: 1440,
      fileSuffix: 'png',
      PNGtransparency: !0,
      dataQuality: 'normal',
      category: 'forecast',
      modelIdent: 'intersucho-firerisk',
      levels: ['surface'],
      acTimes: [],
      isolines: [],
      labelsTemp: !1,
      requiresInfoJson: !0,
      logo: Yr,
      ident: 'fireDanger',
      overlays: ['fwi', 'dfm10h'],
    }),
    yo = new Li({
      ident: 'ecmwfWaves',
      modelName: 'ECMWF',
      modelResolution: 13,
      provider: 'ECMWF',
      interval: 720,
      labelsTemp: !1,
      maxTileZoom: { free: 3, premium: 3 },
      category: 'forecast',
      modelIdent: 'ecmwf-wam',
      fileSuffix: 'png',
      dataQuality: 'normal',
      overlays: ['waves', 'swell1', 'swell2', 'swell3', 'wwaves'],
      levels: ['surface'],
    }),
    wo = new Li({
      ident: 'ukv',
      provider: 'Met Office',
      interval: 720,
      intervalPremium: 360,
      modelName: 'UKV',
      modelResolution: 2,
      JPGtransparency: !0,
      animation: !0,
      dataQuality: 'extreme',
      maxTileZoom: { free: 4, premium: 6 },
      category: 'forecast',
      modelIdent: 'ukv',
      forecastSize: 120,
      bounds: [
        [
          [61.3, -24.58],
          [53, -20],
          [44.39, -17.18],
          [45.43, -7.83],
          [45.39, 0.36],
          [44.83, 9.23],
          [52.83, 11.35],
          [61.92, 15.46],
          [63.06, 0.12],
          [62.91, -9.86],
        ],
      ],
      levels: [
        'surface',
        '975h',
        '950h',
        '925h',
        '900h',
        '850h',
        '800h',
        '700h',
        '600h',
        '500h',
        '400h',
        '300h',
        '250h',
        '200h',
        '150h',
      ],
      overlays: [
        'wind',
        'temp',
        'wetbulbtemp',
        'pressure',
        'clouds',
        'lclouds',
        'mclouds',
        'hclouds',
        'fog',
        'rh',
        'gust',
        'cape',
        'dewpoint',
        'rain',
        'ptype',
        'visibility',
        'deg0',
        'snowAccu',
        'rainAccu',
        'gustAccu',
        'ccl',
        'turbulence',
      ],
      isolines: ['pressure', 'gh', 'temp', 'deg0'],
      acTimes: ['next12h', 'next24h', 'next2d', 'next3d', 'next5d'],
      requiresInfoJson: !0,
      logo: '<a href="https://www.metoffice.gov.uk/" target="_blank"><img style="max-width:150px;height:auto;" src="https://www.windy.com/img/providers/metoffice-white-horizontal.svg" /></a>',
    }),
    bo = new Li({
      ident: 'gfsWaves',
      modelName: 'GFS',
      modelResolution: 22,
      provider: 'NOAA',
      interval: 720,
      intervalPremium: 360,
      prefferedProduct: 'gfs',
      labelsTemp: !1,
      category: 'forecast',
      modelIdent: 'gfs-wave',
      fileSuffix: 'png',
      dataQuality: 'low',
      maxTileZoom: { free: 3, premium: 3 },
      overlays: ['waves', 'swell1', 'swell2', 'swell3', 'wwaves'],
      levels: ['surface'],
    }),
    To = new Li({
      ident: 'activeFires',
      modelName: 'nasa-firms',
      modelResolution: 22,
      labelsTemp: !1,
      provider: 'NASA',
      interval: 3240,
      category: 'analysis',
      modelIdent: 'nasa-firms',
      dataQuality: 'normal',
      requiresInfoJson: !0,
      maxTileZoom: { free: 18, premium: 18 },
    }),
    Eo = new Br({
      ident: 'capAlerts',
      labelsTemp: !1,
      modelName: 'CAP Alerts',
      interval: 0,
      provider: 'National weather institutes',
      overlays: ['capAlerts'],
    }),
    So = new Br({
      ident: 'map',
      labelsTemp: !1,
      modelName: 'Outdoor Map',
      interval: 0,
      provider: 'Seznam.cz',
      overlays: ['map'],
    }),
    _o = new Li({
      ident: 'efi',
      provider: 'ECMWF',
      interval: 720,
      modelName: 'ECMWF',
      modelResolution: 9,
      labelsTemp: !1,
      maxTileZoom: { free: 3, premium: 3 },
      category: 'forecast',
      modelIdent: 'ecmwf-efi',
      dataQuality: 'normal',
      levels: ['surface'],
      overlays: ['efiTemp', 'efiWind', 'efiRain'],
      requiresInfoJson: !0,
    }),
    Ao = new jr({
      ident: 'satellite',
      animation: !1,
      modelName: 'EUMETSAT',
      provider: 'EUMETSAT',
      interval: 3,
      directory: 'satellite/tile',
      server: 'https://sat.windy.com',
      urlSuff: 'visir.jpg?mosaic=true',
      urlSuffFlow: 'visir.jpg',
      labelsTemp: !1,
      overlays: ['satellite'],
      levels: ['surface'],
      logo: '<a id="sat-contrib" href="https://www.eumetsat.int/" target="_blank">\n                <img src="https://www.windy.com/img/providers/eumetsat2.svg" alt="eumetsat.int"/></a>\n            <a id="blitz-contrib" href="https://www.nowcast.de/" target="_blank" data-tooltip="www.nowcast.de">\n                <img src="https://www.windy.com/img/providers/nowcast-de.png" alt="nowcast.de"/></a>',
    }),
    Po = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        return (m(this, n), t.apply(this, arguments));
      }
      return (
        v(n, [
          {
            key: 'open',
            value: function () {
              return (this.loadMinifest(), Promise.resolve(void 0));
            },
          },
          {
            key: 'loadMinifest',
            value: function () {
              var e = new Date().toISOString().replace(/.*T(\d+):(\d+).*/, '$1$2');
              return Xt(''.concat(this.server, '/').concat(this.directory, '/minifest2.json?').concat(e));
            },
          },
          {
            key: 'moveTs',
            value: function (e) {
              var t = this.calendar.timestamps,
                n = vt.get('radarTimestamp'),
                i = t.length - 1,
                r = t.find(function (e) {
                  return e >= n;
                });
              void 0 === r && (r = t[i]);
              var o = Oe(t.indexOf(r) + (e ? 1 : -1), 0, i);
              vt.set('radarTimestamp', t[o]);
            },
          },
        ]),
        n
      );
    })(Br),
    ko = {
      bomAccess: ro,
      mblue: co,
      ecmwf: qr,
      ecmwfWaves: yo,
      ecmwfAnalysis: Zr,
      cams: Xr,
      camsEu: Jr,
      cmems: Qr,
      gfs: Kr,
      gfsWaves: bo,
      icon: eo,
      iconD2: to,
      iconEu: $r,
      iconEuWaves: io,
      iconWaves: no,
      arome: oo,
      aromeAntilles: ao,
      aromeReunion: so,
      nems: lo,
      namAlaska: fo,
      namConus: uo,
      namHawaii: ho,
      capAlerts: Eo,
      map: So,
      efi: _o,
      radar: new Po({
        ident: 'radar',
        animation: !1,
        modelName: '',
        interval: 3,
        fileSuffix: 'webp',
        fileSuffixFallback: 'png',
        directory: 'radar2/composite',
        server: 'https://rdr.windy.com',
        labelsTemp: !1,
        overlays: ['radar'],
        levels: ['surface'],
      }),
      satellite: Ao,
      drought: vo,
      fireDanger: go,
      hrrrAlaska: po,
      hrrrConus: mo,
      ukv: wo,
      activeFires: To,
    },
    Co = (function () {
      function e(t) {
        (m(this, e), this.initProperties(), Object.assign(this, t));
      }
      return (
        v(e, [
          {
            key: 'getColor',
            value: function () {
              return this.c.getColor();
            },
          },
          {
            key: 'getCalendar',
            value: function (e) {
              return (ko[e] || ko.ecmwf).getCalendar();
            },
          },
          {
            key: 'getParams',
            value: function (e, t, n, i) {
              var r = this,
                o = this.product || e.product,
                a = ko[o],
                s = Object.assign(
                  {},
                  e,
                  {
                    layer: this.ident,
                    server: a.server || N,
                    JPGtransparency: this.JPGtransparency || a.JPGtransparency,
                    PNGtransparency: this.PNGtransparency || a.PNGtransparency,
                    maxTileZoom: this.maxTileZoom || a.maxTileZoom,
                    transformR: this.transformR || void 0,
                    transformG: this.transformG || void 0,
                    transformB: this.transformB || void 0,
                    directory: a.directory,
                    filename: this.filename || e.overlay || this.ident,
                    fileSuffix: this.fileSuffix || a.fileSuffix,
                    dataQuality: this.dataQuality || a.dataQuality,
                    upgradeDataQuality: a.betterDataQuality && a.betterDataQuality.includes(this.ident),
                    refTime: i || a.refTime.call(a),
                    fullPath: '',
                  },
                  this.renderParams,
                ),
                l =
                  a.ident === t
                    ? Promise.resolve()
                    : this.getCalendar(a.ident).then(function (e) {
                        e &&
                          ((s.path = e.ts2path(n || vt.get('timestamp'))),
                          (s.refTime = e.refTime),
                          (s.level = (r.levels && r.levels[0]) || s.level));
                      });
              return l.then(function () {
                var e =
                  'accumulations' === r.renderer
                    ? '{server}/im/v3.0/{directory}/{refTime}/{acTime}/wm_grid_257/<z>/<x>/<y>/{filename}-surface.{fileSuffix}'
                    : r.pathGenerator || a.pathGenerator;
                return ((s.fullPath = Se(e, s)), r.query && (s.fullPath = Ue(s.fullPath, r.query)), s);
              });
            },
          },
          {
            key: 'initProperties',
            value: function () {
              ((this.renderer = 'tileLayer'),
                (this.sea = !1),
                (this.JPGtransparency = !1),
                (this.renderParams = { renderFrom: 'R' }));
            },
          },
        ]),
        e
      );
    })(),
    Oo = (function (e) {
      s(i, e);
      var n = c(i);
      function i() {
        return (m(this, i), n.apply(this, arguments));
      }
      return (
        v(i, [
          {
            key: 'initProperties',
            value: function () {
              (t(f(i.prototype), 'initProperties', this).call(this),
                (this.PNGtransparency = !0),
                (this.renderParams = { interpolate: 'interpolateWaves', renderFrom: 'B', sea: !0 }),
                (this.c = _i.waves),
                (this.m = Dr.waves));
            },
          },
        ]),
        i
      );
    })(Co),
    Lo = {
      cbase: {
        description: ['m', 'ft'],
        lines: [
          [0, 0, 0],
          [200, 300, 1e3],
          [500, 500, 1500],
          [1500, '1.5k', 5e3],
        ],
      },
      ccl: {
        description: ['m', 'ft'],
        lines: [
          [0, 0, 0],
          [1e3, '1k', '3.3k'],
          [2e3, '2k', '6.6k'],
          [3e3, '3k', '10k'],
          [4e3, '4k', '13k'],
          [6e3, '6k', '20k'],
          [8e3, '8k', '26k'],
        ],
      },
      sst: {
        description: ['°C', '°F'],
        lines: [
          [272, 0, 30],
          [282, 10, 50],
          [292, 20, 70],
          [302, 30, 85],
          [313, 40, 100],
        ],
      },
      cloudtop: {
        description: ['m', 'ft'],
        lines: [
          [0, 0, 0],
          [5e3, '5k', 'FL150'],
          [9e3, '9k', 'FL300'],
          [12e3, '12k', 'FL400'],
          [15e3, '15k', 'FL500'],
        ],
      },
      rainAccu: {
        description: ['mm', 'in'],
        lines: [
          [3, 3, '.1'],
          [10, 10, '.4'],
          [25, 25, '1.0'],
          [100, 100, '4.0'],
          [300, 300, '1ft'],
        ],
      },
      wetbulbtemp: {
        description: ['°C', '°F'],
        lines: [
          [273, 0, 32],
          [291, 18, 64],
          [298, 25, 77],
          [302, 29, 84],
          [305, 32, 90],
        ],
      },
    },
    Io = function (e) {
      return Math.max(0, Math.pow(2, e) - 0.001);
    },
    Ro = function (e) {
      return function (t) {
        return Math.pow(2, t) - e;
      };
    },
    xo = new Co({ ident: 'capAlerts', renderer: 'capAlerts', m: Dr.capAlerts, levels: ['surface'] }),
    No = new Co({ ident: 'pressureIsolines', renderer: 'isolines', levels: ['surface'] }),
    Mo = new Co({
      ident: 'ghIsolines',
      renderer: 'isolines',
      levels: [
        '975h',
        '950h',
        '925h',
        '900h',
        '850h',
        '800h',
        '700h',
        '600h',
        '500h',
        '400h',
        '300h',
        '250h',
        '200h',
        '150h',
        '10h',
      ],
    }),
    Do = new Co({
      ident: 'tempIsolines',
      renderer: 'isolines',
      levels: [
        'surface',
        '950h',
        '925h',
        '900h',
        '850h',
        '800h',
        '700h',
        '600h',
        '500h',
        '400h',
        '300h',
        '250h',
        '200h',
        '150h',
        '10h',
      ],
    }),
    Uo = new Co({ ident: 'deg0Isolines', renderer: 'isolines', levels: ['surface'] }),
    Wo = new Co({
      ident: 'windParticles',
      renderer: 'particles',
      filename: 'wind',
      fileSuffix: 'jpg',
      renderParams: { particlesIdent: 'wind' },
    }),
    Fo = new Co({
      ident: 'ecmwfWindParticles',
      renderer: 'particles',
      product: 'ecmwf',
      levels: ['surface'],
      filename: 'wind',
      fileSuffix: 'jpg',
      renderParams: { particlesIdent: 'wind' },
    }),
    Go = new Co({
      ident: 'ecmwfWindParticles150h',
      renderer: 'particles',
      product: 'ecmwf',
      levels: ['surface'],
      filename: 'wind',
      fileSuffix: 'jpg',
      renderParams: { particlesIdent: 'wind' },
    }),
    Ho = new Co({
      ident: 'ecmwfWindParticles500h',
      renderer: 'particles',
      product: 'ecmwf',
      levels: ['surface'],
      filename: 'wind',
      fileSuffix: 'jpg',
      renderParams: { particlesIdent: 'wind' },
    }),
    zo = new Co({
      ident: 'ecmwfWindParticles600h',
      renderer: 'particles',
      product: 'ecmwf',
      levels: ['surface'],
      filename: 'wind',
      fileSuffix: 'jpg',
      renderParams: { particlesIdent: 'wind' },
    }),
    Bo = new Co({
      ident: 'waveParticles',
      renderer: 'particles',
      PNGtransparency: !0,
      renderParams: { particlesIdent: 'waves' },
    }),
    jo = new Co({
      ident: 'currentParticles',
      renderer: 'particles',
      filename: 'seacurrents',
      product: 'cmems',
      renderParams: { particlesIdent: 'currents' },
    }),
    Vo = new Co({
      ident: 'currentsTideParticles',
      renderer: 'particles',
      filename: 'seacurrents_tide',
      renderParams: { particlesIdent: 'currents' },
    }),
    Yo = new Co({ ident: 'wind', renderParams: { renderFrom: 'RG' }, c: _i.wind, m: Dr.wind }),
    qo = new Co({ ident: 'temp', c: _i.temp, m: Dr.temp }),
    Zo = new Co({ ident: 'wetbulbtemp', filename: 'wbt', c: _i.wetbulbtemp, m: Dr.temp, l: Lo.wetbulbtemp }),
    Xo = new Co({ ident: 'solarpower', c: _i.solarpower, m: Dr.solarpower }),
    Jo = new Co({ ident: 'uvindex', fileSuffix: 'png', PNGtransparency: !0, c: _i.uvindex, m: Dr.uvindex }),
    Qo = new Co({ ident: 'dewpoint', c: _i.temp, m: Dr.temp }),
    Ko = new Co({ ident: 'gust', c: _i.wind, m: Dr.wind }),
    $o = new Co({
      ident: 'gustAccu',
      filename: 'gust',
      fileSuffix: 'jpg',
      renderer: 'accumulations',
      JPGtransparency: !0,
      c: _i.wind,
      m: Dr.wind,
      query: 'acc=maxip',
    }),
    ea = new Co({
      ident: 'turbulence',
      fileSuffix: 'png',
      c: _i.turbulence,
      m: Dr.turbulence,
      PNGtransparency: !0,
      levels: ['850h', '800h', '700h', '600h', '500h', '400h', '300h', '250h', '200h', '150h'],
    }),
    ta = new Co({
      ident: 'icing',
      fileSuffix: 'png',
      c: _i.icing,
      m: Dr.icing,
      levels: ['950h', '925h', '900h', '850h', '800h', '700h', '600h', '500h', '400h', '300h'],
    }),
    na = new Co({ ident: 'rh', c: _i.rh, m: Dr.rh }),
    ia = new Co({ ident: 'pressure', fileSuffix: 'png', PNGtransparency: !0, c: _i.pressure, m: Dr.pressure }),
    ra = new Co({
      ident: 'ccl',
      fileSuffix: 'png',
      PNGtransparency: !0,
      c: _i.cclAltitude,
      m: Dr.altitude,
      l: Lo.ccl,
      renderParams: { pattern: 'cclPattern', interpolateNearestG: !0 },
      transformG: function (e) {
        return Math.round(4 * e) / 4;
      },
    }),
    oa = new Co({
      ident: 'rain',
      filename: 'rainlogptype2',
      fileSuffix: 'png',
      PNGtransparency: !0,
      c: _i.rain,
      m: Dr.rain,
      renderParams: { pattern: 'rainPattern', interpolateNearestG: !0 },
      transformR: Io,
      transformG: function (e) {
        return Math.round(4 * e) / 4;
      },
      wTransformR: 'rainLog',
    }),
    aa = new Co({
      ident: 'ptype',
      filename: 'rainlogptype',
      fileSuffix: 'png',
      PNGtransparency: !0,
      c: _i.justGray,
      m: Dr.ptype,
      renderParams: { pattern: 'ptypePattern', interpolateNearestG: !0 },
      transformR: Io,
      transformG: Math.round,
      wTransformR: 'rainLog',
    }),
    sa = new Co({
      ident: 'thunder',
      filename: 'lightdens',
      c: _i.lightDensity,
      m: Dr.lightDensity,
      transformR: Io,
      wTransformR: 'rainLog',
    }),
    la = new Co({
      ident: 'clouds',
      filename: 'cloudsrain',
      renderParams: { renderFrom: 'RG', isMultiColor: !0 },
      c: _i.clouds,
      m: Dr.rain,
      cm: Dr.clouds,
      transformG: function (e) {
        return e < 10 ? e : 10 * (e - 10) + 10;
      },
      getColor2: function () {
        return _i.rainClouds.getColor();
      },
      getAmountByColor: function (e, t) {
        return t < 0.3 ? 0 : t < 3 ? 1 : t < 6 ? 2 : 3;
      },
    }),
    ca = new Co({ ident: 'lclouds', c: _i.lclouds, m: Dr.clouds }),
    ua = new Co({ ident: 'mclouds', c: _i.mclouds, m: Dr.clouds }),
    da = new Co({ ident: 'hclouds', c: _i.hclouds, m: Dr.clouds }),
    ha = new Co({ ident: 'cape', c: _i.cape, m: Dr.cape }),
    fa = new Co({ ident: 'cbase', fileSuffix: 'png', PNGtransparency: !0, c: _i.cbase, m: Dr.altitude, l: Lo.cbase }),
    ma = new Co({ ident: 'fog', filename: 'fogtype', fileSuffix: 'png', c: _i.fog, m: Dr.fog, PNGtransparency: !0 }),
    pa = new Co({
      ident: 'snowAccu',
      filename: 'snowaccumulationlog',
      renderer: 'accumulations',
      fileSuffix: 'jpg',
      JPGtransparency: !0,
      c: _i.snow,
      m: Dr.snow,
      transformR: Io,
      wTransformR: 'rainLog',
      renderParams: { interpolate: 'interpolateOverlay' },
    }),
    va = new Co({
      ident: 'rainAccu',
      filename: 'rainaccumulationlog',
      fileSuffix: 'jpg',
      JPGtransparency: !0,
      transformR: Io,
      wTransformR: 'rainLog',
      renderer: 'accumulations',
      renderParams: { interpolate: 'interpolateOverlay' },
      c: _i.rainAccu,
      m: Dr.rain,
      l: Lo.rainAccu,
    }),
    ga = new Oo({ ident: 'waves' }),
    ya = new Oo({ ident: 'wwaves' }),
    wa = new Oo({ ident: 'swell1' }),
    ba = {
      capAlerts: xo,
      pressureIsolines: No,
      ghIsolines: Mo,
      tempIsolines: Do,
      deg0Isolines: Uo,
      windParticles: Wo,
      ecmwfWindParticles: Fo,
      ecmwfWindParticles150h: Go,
      ecmwfWindParticles500h: Ho,
      ecmwfWindParticles600h: zo,
      waveParticles: Bo,
      currentParticles: jo,
      currentsTideParticles: Vo,
      wind: Yo,
      temp: qo,
      wetbulbtemp: Zo,
      solarpower: Xo,
      uvindex: Jo,
      dewpoint: Qo,
      gust: Ko,
      gustAccu: $o,
      rh: na,
      pressure: ia,
      ccl: ra,
      rain: oa,
      ptype: aa,
      thunder: sa,
      clouds: la,
      lclouds: ca,
      mclouds: ua,
      hclouds: da,
      cape: ha,
      cbase: fa,
      fog: ma,
      snowAccu: pa,
      rainAccu: va,
      waves: ga,
      wwaves: ya,
      swell1: wa,
      swell2: new Oo({ ident: 'swell2' }),
      swell3: new Oo({ ident: 'swell3' }),
      swell: wa,
      currents: new Co({
        ident: 'currents',
        filename: 'seacurrents',
        renderParams: { renderFrom: 'RG', sea: !0 },
        c: _i.currents,
        m: Dr.currents,
      }),
      currentsTide: new Co({
        ident: 'currentsTide',
        filename: 'seacurrents_tide',
        renderParams: { renderFrom: 'RG', sea: !0 },
        c: _i.currentsTide,
        m: Dr.currents,
      }),
      sst: new Co({
        ident: 'sst',
        renderer: 'noUserControl',
        renderParams: { sea: !0 },
        levels: ['surface'],
        c: _i.temp,
        m: Dr.temp,
        l: Lo.sst,
      }),
      visibility: new Co({ ident: 'visibility', c: _i.visibility, m: Dr.visibility }),
      snowcover: new Co({
        ident: 'snowcover',
        filename: 'snowcoverlog',
        transformR: Io,
        wTransformR: 'rainLog',
        c: _i.snow,
        m: Dr.snow,
      }),
      cloudtop: new Co({
        ident: 'cloudtop',
        hasParticles: !0,
        levels: ['surface'],
        fileSuffix: 'jpg',
        JPGtransparency: !0,
        c: _i.levels,
        m: Dr.altitude,
        l: Lo.cloudtop,
      }),
      deg0: new Co({ ident: 'deg0', levels: ['surface'], c: _i.deg0, m: Dr.altitude }),
      cosc: new Co({ ident: 'cosc', filename: 'chem_cosc', c: _i.cosc, m: Dr.cosc, transformR: Ro(1), wTransformR: 1 }),
      dustsm: new Co({
        ident: 'dustsm',
        filename: 'chem_dustsm',
        hasParticles: !1,
        c: _i.dust,
        m: Dr.dust,
        transformR: Ro(0.1),
        wTransformR: 0.1,
      }),
      radar: new Co({ ident: 'radar', renderer: 'radar', c: _i.radar, m: Dr.radar }),
      satellite: new Co({ ident: 'satellite', renderer: 'satellite', c: _i.satellite, m: Dr.satellite }),
      gtco3: new Co({ ident: 'gtco3', c: _i.gtco3, m: Dr.gtco3 }),
      pm2p5: new Co({ ident: 'pm2p5', c: _i.pm2p5, m: Dr.pm2p5, transformR: Ro(0.001), wTransformR: 0.001 }),
      no2: new Co({ ident: 'no2', c: _i.no2, m: Dr.no2, transformR: Ro(0.001), wTransformR: 0.001 }),
      aod550: new Co({ ident: 'aod550', c: _i.aod550, m: Dr.aod550, transformR: Ro(0.001), wTransformR: 0.001 }),
      tcso2: new Co({ ident: 'tcso2', c: _i.tcso2, m: Dr.tcso2, transformR: Ro(0.001), wTransformR: 0.001 }),
      go3: new Co({ ident: 'go3', c: _i.go3, m: Dr.go3, transformR: Ro(0.001), wTransformR: 0.001 }),
      gh: new Co({ ident: 'gh', m: Dr.gh }),
      map: new Co({ ident: 'map', renderer: 'map', levels: ['surface'] }),
      efiWind: new Co({ ident: 'efiWind', filename: 'wsi', renderer: 'daySwitcher', c: _i.efiWind, m: Dr.efiWind }),
      efiTemp: new Co({ ident: 'efiTemp', filename: 'ti', renderer: 'daySwitcher', c: _i.efiTemp, m: Dr.efiTemp }),
      efiRain: new Co({ ident: 'efiRain', filename: 'tpi', renderer: 'daySwitcher', c: _i.efiRain, m: Dr.efiRain }),
      moistureAnom40: new Co({
        ident: 'moistureAnom40',
        filename: 'awd_0_40',
        renderer: 'daySwitcher',
        renderParams: { landOnly: !0 },
        c: _i.moistureAnom40,
        m: Dr.moistureAnom40,
        PNGtransparency: !0,
      }),
      moistureAnom100: new Co({
        ident: 'moistureAnom100',
        filename: 'awd_0_100',
        renderer: 'daySwitcher',
        renderParams: { landOnly: !0 },
        c: _i.moistureAnom100,
        m: Dr.moistureAnom100,
        PNGtransparency: !0,
      }),
      drought40: new Co({
        ident: 'drought40',
        filename: 'awp_0_40',
        renderer: 'daySwitcher',
        renderParams: { landOnly: !0 },
        c: _i.drought40,
        m: Dr.drought,
        PNGtransparency: !0,
      }),
      drought100: new Co({
        ident: 'drought100',
        filename: 'awp_0_100',
        renderer: 'daySwitcher',
        renderParams: { landOnly: !0 },
        c: _i.drought100,
        m: Dr.drought,
        PNGtransparency: !0,
      }),
      soilMoisture40: new Co({
        ident: 'soilMoisture40',
        filename: 'awr_0_40',
        renderer: 'daySwitcher',
        renderParams: { landOnly: !0 },
        c: _i.soilMoisture40,
        m: Dr.rh,
        PNGtransparency: !0,
      }),
      soilMoisture100: new Co({
        ident: 'soilMoisture100',
        filename: 'awr_0_100',
        renderer: 'daySwitcher',
        renderParams: { landOnly: !0 },
        c: _i.soilMoisture100,
        m: Dr.rh,
        PNGtransparency: !0,
      }),
      fwi: new Co({
        ident: 'fwi',
        filename: 'fwi_genz',
        renderer: 'daySwitcher',
        renderParams: { landOnly: !0 },
        c: _i.fwi,
        m: Dr.fwi,
        PNGtransparency: !0,
      }),
      dfm10h: new Co({
        ident: 'dfm10h',
        filename: 'dfm10h',
        renderer: 'daySwitcher',
        renderParams: { landOnly: !0 },
        c: _i.dfm10h,
        m: Dr.dfm10h,
        PNGtransparency: !0,
      }),
      turbulence: ea,
      icing: ta,
    },
    Ta = (function () {
      function e(t) {
        (m(this, e), this.initProperties(), Object.assign(this, t));
        var n = ba[this.ident];
        if (n) {
          var i = n.m;
          (i &&
            ((this.convertValue = i.convertValue.bind(i)),
            (this.convertNumber = i.convertNumber.bind(i)),
            (this.setMetric = i.setMetric.bind(i)),
            (this.cycleMetric = i.cycleMetric.bind(i)),
            (this.listMetrics = i.listMetrics.bind(i)),
            (this.m = i)),
            (this.c = n.c),
            (this.l = n.l),
            (this.cm = n.cm));
        }
      }
      return (
        v(e, [
          {
            key: 'paintLegend',
            value: function (e) {
              this.m && (this.m.description || this.m.discreteLegend)
                ? this.m.renderLegend(this.c, e, this.l || this.m)
                : (e.innerHTML = '');
            },
          },
          {
            key: 'getName',
            value: function () {
              return this.trans in bn && bn[this.trans] ? bn[this.trans] : this.ident;
            },
          },
          {
            key: 'getMenuName',
            value: function () {
              return this.menuTrans
                ? this.menuTrans in bn && bn[this.menuTrans]
                  ? bn[this.menuTrans]
                  : this.ident
                : this.getName();
            },
          },
          {
            key: 'getMenuIdent',
            value: function () {
              return this.partOf || this.ident;
            },
          },
          {
            key: 'createPickerHTML',
            value: function (e, t) {
              if (this.convertValue && this.m) {
                var n,
                  i = w(e, 1)[0],
                  r =
                    (null === (n = this.m) || void 0 === n ? void 0 : n.howManyMetrics()) > 1
                      ? this.convertValue(i, ' <span>', '</span>')
                      : this.convertValue(i, ' ');
                return ''.concat(this.createPickerTitle(), '<big data-do="changeMetric">').concat(r, '</big>');
              }
              return '';
            },
          },
          {
            key: 'createPickerInvalidHTML',
            value: function () {
              return ''
                .concat(this.createPickerTitle(), '<div class="p-title not-avbl">')
                .concat(bn.DATA_NOT_AVBL, '</div>');
            },
          },
          {
            key: 'createPickerTitle',
            value: function (e) {
              return e
                ? '<div class="p-title inlined">'.concat(e, '</div>')
                : '<div class="p-title inlined" data-icon-after="'
                    .concat(this.icon, '">')
                    .concat(this.getName(), '</div>');
            },
          },
          {
            key: 'metric',
            get: function () {
              return this.m ? this.m.metric : '';
            },
          },
          {
            key: 'initProperties',
            value: function () {
              this.poiInCities = !0;
            },
          },
        ]),
        e
      );
    })(),
    Ea = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        return (m(this, n), t.apply(this, arguments));
      }
      return (
        v(n, [
          {
            key: 'createPickerHTML',
            value: function (e, t) {
              var n = _e(e),
                i = ke(n);
              return ''
                .concat(this.createPickerTitle(), '<big data-do="changeMetric">')
                .concat(this.convertValue(n.wind, ' <span>', '</span>'), '<i title="Direction to">')
                .concat(i)
                .concat(t(Pe(n) ? (n.dir + 180) % 360 : ''), '</i></big>');
            },
          },
        ]),
        n
      );
    })(Ta),
    Sa = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        return (m(this, n), t.apply(this, arguments));
      }
      return (
        v(n, [
          {
            key: 'createPickerHTML',
            value: function (e, t) {
              var n = Ae(e);
              return ''
                .concat(this.createPickerTitle(), '<big data-do="changeMetric">')
                .concat(
                  this.convertValue(n.size, ' <span>', '</span>'),
                  '<i title="Direction from, true north" data-dir="',
                )
                .concat(n.dir, '">')
                .concat(t(n.dir), '</i></big><span class="block">')
                .concat(bn.PERIOD, ' ')
                .concat(Math.round(n.period), ' s.</span>');
            },
          },
        ]),
        n
      );
    })(Ta),
    _a = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        var e;
        m(this, n);
        for (var i = arguments.length, r = new Array(i), o = 0; o < i; o++) r[o] = arguments[o];
        return (
          _(d((e = t.call.apply(t, [this].concat(r)))), 'labels', {
            0: 'INTERSUCHO_AWP_0',
            1: 'INTERSUCHO_AWP_1',
            2: 'INTERSUCHO_AWP_2',
            3: 'INTERSUCHO_AWP_3',
            4: 'INTERSUCHO_AWP_4',
            5: 'INTERSUCHO_AWP_5',
            6: 'INTERSUCHO_AWP_6',
          }),
          e
        );
      }
      return (
        v(n, [
          {
            key: 'createPickerHTML',
            value: function (e) {
              var t = Math.round(e[0]) + 1,
                n = bn[this.labels[t]] || '';
              return ''.concat(this.createPickerTitle(bn.INTERSUCHO_AWP), '<big>').concat(n, '</big>');
            },
          },
        ]),
        n
      );
    })(Ta),
    Aa = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        var e;
        m(this, n);
        for (var i = arguments.length, r = new Array(i), o = 0; o < i; o++) r[o] = arguments[o];
        return (
          _(d((e = t.call.apply(t, [this].concat(r)))), 'labels', {
            1: 'INTERSUCHO_FWI_1',
            2: 'INTERSUCHO_FWI_2',
            3: 'INTERSUCHO_FWI_3',
            4: 'INTERSUCHO_FWI_4',
            5: 'INTERSUCHO_FWI_5',
            6: 'INTERSUCHO_FWI_6',
          }),
          e
        );
      }
      return (
        v(n, [
          {
            key: 'createPickerHTML',
            value: function (e) {
              var t = Math.round(e[0]),
                n = bn[this.labels[t]] || '';
              return ''.concat(this.createPickerTitle(bn.INTERSUCHO_FWI), '<big>').concat(n, '</big>');
            },
          },
        ]),
        n
      );
    })(Ta),
    Pa = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        return (m(this, n), t.apply(this, arguments));
      }
      return (
        v(n, [
          {
            key: 'createPickerHTML',
            value: function (e) {
              var t = e[1],
                n = this.createPickerTitle(
                  t > 0 ? ''.concat(Dr.ptype.convertNumber.call(Dr.ptype, t) || bn.RAIN, ' (3h)') : '',
                ),
                i = 5 == t || 6 == t ? Dr.snow : Dr.rain;
              return ''
                .concat(n, '\n                <big data-do="changeMetric">')
                .concat(i.convertValue(e[0], ' <span>', '</span>'), '</span></big>');
            },
          },
        ]),
        n
      );
    })(Ta),
    ka = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        return (m(this, n), t.apply(this, arguments));
      }
      return (
        v(n, [
          {
            key: 'createPickerHTML',
            value: function (e) {
              return ''
                .concat(this.createPickerTitle(), '<big>')
                .concat(Math.floor(e[0]), ' %</big>')
                .concat(e[1] > 0.3 ? ''.concat(Dr.rain.convertValue(e[1], ' '), '<br>') : '');
            },
          },
        ]),
        n
      );
    })(Ta),
    Ca = new Ta({
      ident: 'wind',
      hasMoreLevels: !0,
      trans: 'WIND',
      icon: '|',
      layers: ['windParticles', 'wind'],
      globeNotSupported: !1,
      createPickerHTML: function (e, t) {
        var n = _e(e),
          i = ke(n);
        return ''
          .concat(this.createPickerTitle(), '<big data-do="changeMetric">')
          .concat(this.convertValue(n.wind, ' <span>', '</span>'), '<i title="Direction from, true north">')
          .concat(i)
          .concat(t(n.dir), '</i></big>');
      },
    }),
    Oa = new Ta({ ident: 'temp', trans: 'TEMP', icon: '', layers: ['windParticles', 'temp'], hasMoreLevels: !0 }),
    La = new Ta({
      parentMenu: 'temp',
      ident: 'wetbulbtemp',
      trans: 'WETBULB_TEMP',
      icon: '',
      layers: ['windParticles', 'wetbulbtemp'],
    }),
    Ia = new Ta({
      parentMenu: 'temp',
      ident: 'solarpower',
      trans: 'SOLARPOWER',
      icon: 'z',
      layers: ['ecmwfWindParticles', 'solarpower'],
    }),
    Ra = new Ta({
      parentMenu: 'temp',
      ident: 'uvindex',
      trans: 'UVINDEX',
      icon: '',
      layers: ['ecmwfWindParticles', 'uvindex'],
    }),
    xa = new Ta({
      parentMenu: 'temp',
      ident: 'dewpoint',
      trans: 'DEW_POINT',
      icon: '',
      layers: ['windParticles', 'dewpoint'],
      hasMoreLevels: !0,
    }),
    Na = new Ta({ parentMenu: 'wind', ident: 'gust', trans: 'GUST', icon: '', layers: ['windParticles', 'gust'] }),
    Ma = new Ta({
      parentMenu: 'wind',
      ident: 'gustAccu',
      trans: 'GUSTACCU',
      icon: '',
      isAccu: !0,
      layers: ['windParticles', 'gustAccu'],
    }),
    Da = new Ta({
      parentMenu: 'temp',
      ident: 'rh',
      icon: '/',
      trans: 'RH',
      layers: ['windParticles', 'rh'],
      hasMoreLevels: !0,
    }),
    Ua = new Ta({ ident: 'pressure', trans: 'PRESS', icon: '', layers: ['windParticles', 'pressure'] }),
    Wa = new Pa({ ident: 'rain', trans: 'RAIN_THUNDER', icon: '', layers: ['windParticles', 'rain'] }),
    Fa = new ka({
      ident: 'clouds',
      trans: 'CLOUDS2',
      icon: '7',
      layers: ['windParticles', 'clouds'],
      paintLegend: function (e) {
        this.m.renderLegend(_i.rainClouds, e, this.m);
      },
    }),
    Ga = new ka({
      parentMenu: 'clouds',
      ident: 'lclouds',
      trans: 'LOW_CLOUDS',
      icon: '',
      layers: ['windParticles', 'lclouds'],
    }),
    Ha = new ka({
      parentMenu: 'clouds',
      ident: 'mclouds',
      trans: 'MEDIUM_CLOUDS',
      icon: '',
      layers: ['windParticles', 'mclouds'],
    }),
    za = new ka({
      parentMenu: 'clouds',
      ident: 'hclouds',
      trans: 'HIGH_CLOUDS',
      layers: ['windParticles', 'hclouds'],
      icon: '',
    }),
    Ba = new Ta({ parentMenu: 'clouds', ident: 'cape', trans: 'CAPE', layers: ['windParticles', 'cape'], icon: '~' }),
    ja = new Ta({
      parentMenu: 'clouds',
      ident: 'cbase',
      trans: 'CLOUD_ALT',
      icon: ':',
      layers: ['windParticles', 'cbase'],
    }),
    Va = new Ta({
      parentMenu: 'rain',
      ident: 'snowAccu',
      trans: 'NEWSNOW',
      icon: '',
      isAccu: !0,
      layers: ['snowAccu'],
      hideParticles: !0,
    }),
    Ya = new Ta({
      parentMenu: 'rain',
      ident: 'rainAccu',
      trans: 'RACCU',
      icon: '9',
      isAccu: !0,
      layers: ['rainAccu'],
      hideParticles: !0,
    }),
    qa = new Sa({ ident: 'waves', hideWxLabels: !0, trans: 'WAVES', icon: '', layers: ['waveParticles', 'waves'] }),
    Za = new Sa({
      parentMenu: 'waves',
      hideWxLabels: !0,
      ident: 'wwaves',
      trans: 'WWAVES',
      icon: '|',
      layers: ['waveParticles', 'wwaves'],
    }),
    Xa = new Sa({
      parentMenu: 'waves',
      hideWxLabels: !0,
      ident: 'swell1',
      trans: 'SWELL',
      icon: '{',
      layers: ['waveParticles', 'swell1'],
    }),
    Ja = new Sa({
      parentMenu: 'waves',
      hideWxLabels: !0,
      ident: 'swell2',
      trans: 'SWELL2',
      icon: '',
      layers: ['waveParticles', 'swell2'],
    }),
    Qa = new Sa({
      parentMenu: 'waves',
      hideWxLabels: !0,
      ident: 'swell3',
      trans: 'SWELL3',
      icon: '',
      layers: ['waveParticles', 'swell3'],
    }),
    Ka = Xa,
    $a = new Ea({
      parentMenu: 'waves',
      hideWxLabels: !0,
      ident: 'currents',
      trans: 'CURRENT',
      icon: 'q',
      layers: ['currentParticles', 'currents'],
    }),
    es = new Ea({
      parentMenu: 'waves',
      hideWxLabels: !0,
      ident: 'currentsTide',
      trans: 'CURRENT_TIDE',
      icon: '',
      layers: ['currentsTideParticles', 'currentsTide'],
    }),
    ts = new Ta({
      parentMenu: 'waves',
      hideWxLabels: !0,
      ident: 'sst',
      trans: 'SST2',
      icon: '',
      layers: ['currentParticles', 'sst'],
    }),
    ns = new Ta({
      parentMenu: 'clouds',
      ident: 'visibility',
      trans: 'VISIBILITY',
      icon: 'c',
      layers: ['windParticles', 'visibility'],
    }),
    is = new Ta({ parentMenu: 'clouds', ident: 'fog', trans: 'FOG', icon: 'd', layers: ['fog'], hideParticles: !0 }),
    rs = new Ta({
      parentMenu: 'rain',
      ident: 'thunder',
      trans: 'THUNDER',
      icon: '',
      layers: ['windParticles', 'thunder'],
    }),
    os = new Ta({
      parentMenu: 'rain',
      ident: 'snowcover',
      trans: 'SNOWDEPTH',
      icon: 'N',
      layers: ['windParticles', 'snowcover'],
      createPickerHTML: function (e) {
        var t = e[0];
        return ''
          .concat(this.createPickerTitle(), '<big data-do="changeMetric">')
          .concat(t > 490 ? 'More than 5m' : this.convertValue(t, ' <span>', '</span>'), '</big>')
          .concat(t > 0.5 ? bn.SNOWDENSITY + ' ' + Math.round(e[1]) + ' kg/m3<br>' : '');
      },
    }),
    as = new Ta({
      parentMenu: 'clouds',
      ident: 'cloudtop',
      trans: 'CTOP',
      icon: 'Q',
      layers: ['windParticles', 'cloudtop'],
    }),
    ss = new Ta({ parentMenu: 'temp', ident: 'deg0', trans: 'FREEZING', icon: '', layers: ['windParticles', 'deg0'] }),
    ls = new Ta({ ident: 'airQ', trans: 'AIR_QUALITY', icon: '', virtual: !0 }),
    cs = new Ta({
      parentMenu: 'airQ',
      ident: 'gtco3',
      trans: 'OZONE',
      icon: '',
      layers: ['ecmwfWindParticles150h', 'gtco3'],
    }),
    us = new Ta({
      parentMenu: 'airQ',
      ident: 'pm2p5',
      trans: 'PM2P5',
      icon: '',
      layers: ['ecmwfWindParticles', 'pm2p5'],
    }),
    ds = new Ta({ parentMenu: 'airQ', ident: 'no2', trans: 'NO22', icon: '', layers: ['ecmwfWindParticles', 'no2'] }),
    hs = new Ta({
      parentMenu: 'airQ',
      ident: 'aod550',
      trans: 'AOD550',
      icon: '',
      layers: ['ecmwfWindParticles600h', 'aod550'],
    }),
    fs = new Ta({
      parentMenu: 'airQ',
      ident: 'tcso2',
      trans: 'TCSO2',
      icon: '',
      layers: ['ecmwfWindParticles500h', 'tcso2'],
    }),
    ms = new Ta({ parentMenu: 'airQ', ident: 'go3', trans: 'GO3', icon: '', layers: ['ecmwfWindParticles', 'go3'] }),
    ps = new Ta({
      parentMenu: 'airQ',
      ident: 'cosc',
      trans: 'COSC',
      icon: '',
      layers: ['ecmwfWindParticles', 'cosc'],
    }),
    vs = new Ta({
      parentMenu: 'airQ',
      ident: 'dustsm',
      trans: 'DUSTSM',
      icon: '',
      layers: ['ecmwfWindParticles', 'dustsm'],
    }),
    gs = new Pa({ parentMenu: 'rain', ident: 'ptype', trans: 'PTYPE', icon: '', layers: ['windParticles', 'ptype'] }),
    ys = new Ta({ parentMenu: 'clouds', ident: 'ccl', trans: 'CCL', icon: '', layers: ['ccl', 'windParticles'] }),
    ws = new Ta({ ident: 'gh', layers: ['gh'] }),
    bs = new Ta({ ident: 'radarSat', globeNotSupported: !0, virtual: !0, trans: 'RADAR_SAT', icon: 'O' }),
    Ts = new Ta({
      parentMenu: 'radarSat',
      allwaysOn: !0,
      poiInCities: !1,
      globeNotSupported: !0,
      ident: 'radar',
      trans: 'RADAR',
      icon: '',
      layers: ['radar'],
      hideParticles: !0,
      createPickerHTML: function (e) {
        return ''.concat(this.createPickerTitle(), '<big>').concat(this.convertValue(e[2], ' '), '</big>');
      },
    }),
    Es = new Ta({
      parentMenu: 'radarSat',
      allwaysOn: !0,
      poiInCities: !1,
      globeNotSupported: !0,
      ident: 'satellite',
      trans: 'SATELLITE',
      icon: '',
      layers: ['satellite'],
      hideParticles: !0,
      createPickerHTML: function (e) {
        var t = e[0];
        return ''
          .concat(this.createPickerTitle(), '<big>')
          .concat(''.concat(null !== t ? this.convertValue(t, ' ') : this.m.na()), '</big>');
      },
    }),
    Ss = new Ta({ ident: 'satellite', trans: 'SATELLITE', globeNotSupported: !0, partOf: 'satellite', icon: '' }),
    _s = new Ta({
      ident: 'capAlerts',
      trans: 'WX_WARNINGS',
      icon: '',
      layers: ['capAlerts'],
      hideParticles: !0,
      createPickerInvalidHTML: function () {
        return ''.concat(this.createPickerTitle(), '<big data-do="capAlert">').concat(bn.DISPLAY_WARNINGS, '</big>');
      },
    }),
    As = new Ta({ ident: 'map', trans: 'HMAP', globeNotSupported: !0, icon: '', layers: ['map'], hideParticles: !0 }),
    Ps = { menuIcon: '', menuTrans: 'EFORECAST' },
    ks = new Ta(
      S(
        S({}, Ps),
        {},
        {
          icon: '',
          trans: 'TEMP',
          hideParticles: !0,
          ident: 'efiTemp',
          fullname: ''.concat(bn.EFORECAST, ' - ').concat(bn.TEMP),
          layers: ['efiTemp'],
        },
      ),
    ),
    Cs = new Ta(
      S(
        S({}, Ps),
        {},
        {
          icon: '|',
          trans: 'WIND',
          hideParticles: !0,
          ident: 'efiWind',
          fullname: ''.concat(bn.EFORECAST, ' - ').concat(bn.WIND),
          partOf: 'efiTemp',
          layers: ['efiWind'],
        },
      ),
    ),
    Os = new Ta(
      S(
        S({}, Ps),
        {},
        {
          icon: '',
          trans: 'JUST_RAIN',
          hideParticles: !0,
          ident: 'efiRain',
          fullname: ''.concat(bn.EFORECAST, ' - ').concat(bn.JUST_RAIN),
          partOf: 'efiTemp',
          layers: ['efiRain'],
        },
      ),
    ),
    Ls = { menuIcon: '', menuTrans: 'INTERSUCHO' },
    Is = new _a(
      S(
        S({}, Ls),
        {},
        {
          icon: '',
          trans: 'INTERSUCHO_AWP',
          fullname: ''.concat(bn.INTERSUCHO_AWP, ' - ').concat(bn.INTERSUCHO_40),
          shortname: bn.INTERSUCHO_40,
          hideParticles: !0,
          ident: 'drought40',
          layers: ['drought40'],
          paintLegend: function (e) {
            this.m.renderLegend(_i.drought40.getColor(), e, this.m);
          },
        },
      ),
    ),
    Rs = new _a(
      S(
        S({}, Ls),
        {},
        {
          icon: '',
          trans: 'INTERSUCHO_AWP',
          hideParticles: !0,
          ident: 'drought100',
          fullname: ''.concat(bn.INTERSUCHO_AWP, ' - ').concat(bn.INTERSUCHO_100),
          shortname: bn.INTERSUCHO_100,
          partOf: 'drought40',
          layers: ['drought100'],
          paintLegend: function (e) {
            this.m.renderLegend(_i.drought100.getColor(), e, this.m);
          },
        },
      ),
    ),
    xs = new Ta(
      S(
        S({}, Ls),
        {},
        {
          icon: '',
          trans: 'INTERSUCHO_AWD',
          fullname: ''.concat(bn.INTERSUCHO_AWD, ' - ').concat(bn.INTERSUCHO_40),
          shortname: bn.INTERSUCHO_40,
          hideParticles: !0,
          ident: 'moistureAnom40',
          partOf: 'drought40',
          layers: ['moistureAnom40'],
        },
      ),
    ),
    Ns = new Ta(
      S(
        S({}, Ls),
        {},
        {
          icon: '',
          trans: 'INTERSUCHO_AWD',
          fullname: ''.concat(bn.INTERSUCHO_AWD, ' - ').concat(bn.INTERSUCHO_100),
          shortname: bn.INTERSUCHO_100,
          hideParticles: !0,
          ident: 'moistureAnom100',
          partOf: 'drought40',
          layers: ['moistureAnom100'],
        },
      ),
    ),
    Ms = new Ta(
      S(
        S({}, Ls),
        {},
        {
          icon: '',
          trans: 'INTERSUCHO_AWR',
          fullname: ''.concat(bn.INTERSUCHO_AWR, ' - ').concat(bn.INTERSUCHO_40),
          shortname: bn.INTERSUCHO_40,
          hideParticles: !0,
          ident: 'soilMoisture40',
          partOf: 'drought40',
          layers: ['soilMoisture40'],
        },
      ),
    ),
    Ds = new Ta(
      S(
        S({}, Ls),
        {},
        {
          icon: '',
          trans: 'INTERSUCHO_AWR',
          fullname: ''.concat(bn.INTERSUCHO_AWR, ' - ').concat(bn.INTERSUCHO_100),
          shortname: bn.INTERSUCHO_100,
          hideParticles: !0,
          ident: 'soilMoisture100',
          partOf: 'drought40',
          layers: ['soilMoisture100'],
        },
      ),
    ),
    Us = { menuIcon: '', menuTrans: 'INTERSUCHO_FIRE_DANGER' },
    Ws = new Aa(
      S(
        S({}, Us),
        {},
        {
          icon: '',
          trans: 'INTERSUCHO_FWI',
          hideParticles: !0,
          ident: 'fwi',
          layers: ['fwi'],
          paintLegend: function (e) {
            this.m.renderLegend(_i.fwi.getColor(), e, this.m);
          },
        },
      ),
    ),
    Fs = new Ta(
      S(
        S({}, Us),
        {},
        { icon: '', trans: 'INTERSUCHO_DFM', hideParticles: !0, ident: 'dfm10h', partOf: 'fwi', layers: ['dfm10h'] },
      ),
    ),
    Gs = new Ta({
      icon: '',
      parentMenu: 'wind',
      trans: 'TURBULENCE',
      ident: 'turbulence',
      layers: ['turbulence', 'windParticles'],
      hasMoreLevels: !0,
      paintLegend: function (e) {
        this.m.renderLegend(_i.turbulence.getColor(), e, this.m);
      },
    }),
    Hs = new Ta({
      icon: '',
      parentMenu: 'wind',
      trans: 'ICING',
      ident: 'icing',
      layers: ['icing', 'windParticles'],
      hasMoreLevels: !0,
      paintLegend: function (e) {
        this.m.renderLegend(_i.icing.getColor(), e, this.m);
      },
    }),
    zs = {
      wind: Ca,
      temp: Oa,
      wetbulbtemp: La,
      solarpower: Ia,
      uvindex: Ra,
      dewpoint: xa,
      gust: Na,
      gustAccu: Ma,
      turbulence: Gs,
      icing: Hs,
      rh: Da,
      pressure: Ua,
      rain: Wa,
      clouds: Fa,
      lclouds: Ga,
      mclouds: Ha,
      hclouds: za,
      cape: Ba,
      cbase: ja,
      snowAccu: Va,
      rainAccu: Ya,
      waves: qa,
      wwaves: Za,
      swell1: Xa,
      swell2: Ja,
      swell3: Qa,
      swell: Ka,
      currents: $a,
      currentsTide: es,
      sst: ts,
      visibility: ns,
      fog: is,
      thunder: rs,
      snowcover: os,
      cloudtop: as,
      deg0: ss,
      airQ: ls,
      gtco3: cs,
      pm2p5: us,
      no2: ds,
      aod550: hs,
      tcso2: fs,
      go3: ms,
      cosc: ps,
      dustsm: vs,
      ptype: gs,
      ccl: ys,
      gh: ws,
      radarSat: bs,
      radar: Ts,
      satellite: Es,
      satelliteIRBT: Ss,
      capAlerts: _s,
      map: As,
      efiWind: Cs,
      efiTemp: ks,
      efiRain: Os,
      moistureAnom40: xs,
      moistureAnom100: Ns,
      drought40: Is,
      drought100: Rs,
      soilMoisture40: Ms,
      soilMoisture100: Ds,
      fwi: Ws,
      dfm10h: Fs,
    },
    Bs = function (e, t) {
      var n,
        i,
        r = ko[t],
        o = zs[e],
        a = (null !== (n = o.layers) && void 0 !== n ? n : [])
          .map(function (e) {
            return ba[e];
          })
          .filter(function (e) {
            var t;
            return null === (t = e.levels) || void 0 === t ? void 0 : t.length;
          })
          .map(function (e) {
            return e.levels;
          });
      null !== (i = r.levels) && void 0 !== i && i.length && a.push(r.levels);
      var s = Xe(a);
      return (
        'wind' !== e &&
          (s = s.filter(function (e) {
            return '100m' !== e;
          })),
        o.hasMoreLevels || (s = s.slice(0, 1)),
        s
      );
    },
    js = He('meta[name="model"]');
  js && js.content && j.includes(js.content) && 'ecmwf' !== js.content && vt.set('product', js.content);
  var Vs = {},
    Ys = {},
    qs = Object.keys(ko);
  (Object.keys(ba).forEach(function (e) {
    for (var t = [], n = 0; n < qs.length; n++) ko[qs[n]].overlays.includes(e) && t.push(qs[n]);
    Vs[e] = t;
  }),
    Object.keys(zs).forEach(function (e) {
      for (var t = [], n = 0; n < qs.length; n++) ko[qs[n]].overlays.includes(e) && t.push(qs[n]);
      Ys[e] = t;
    }));
  var Zs = function (e) {
      return (
        e.includes('iconD2') &&
          (e = e.filter(function (e) {
            return 'icon' !== e && 'iconEu' !== e;
          })),
        e.includes('iconEu') &&
          (e = e.filter(function (e) {
            return 'icon' !== e;
          })),
        e.includes('iconEuWaves') &&
          (e = e.filter(function (e) {
            return 'iconWaves' !== e;
          })),
        e
      );
    },
    Xs = function (e, t) {
      for (var n = t ? q : B, i = [], r = 0; r < n.length; r++) {
        var o = n[r],
          a = ko[o];
        a.pointIsInBounds.call(a, e) && i.push(o);
      }
      return i;
    },
    Js = function () {
      var e = vt.get('mapCoords'),
        t = Xs(e).concat(j);
      if (vt.set('visibleProducts', t) && !t.includes(vt.get('product'))) {
        var n = vt.get('prefferedProduct'),
          i = vt.get('overlay');
        if (ko[n].overlays.includes(i)) vt.set('product', n);
        else {
          var r = t.filter(function (e) {
            return ko[e].overlays.includes(i);
          });
          r.length && vt.set('product', r[0]);
        }
      }
    };
  dn.once('paramsChanged', function () {
    (Js(), vt.on('mapCoords', Js));
  });
  var Qs = function (e, t) {
      var n = Vs[e];
      var i = vt.get('prefferedProduct');
      if (2 === n.length && n.includes('cams')) {
        var r = vt.get('mapCoords');
        return ko.camsEu.pointIsInBounds(r) && n.includes('camsEu') ? 'camsEu' : 'cams';
      }
      if (n.includes(t)) return t;
      if (n.includes('iconD2') && 'iconEu' === i) return 'iconD2';
      if (n.includes('iconEu') && 'icon' === i) return 'iconEu';
      if (n.includes(i)) return i;
      if (n.includes('ecmwfWaves') && 'ecmwf' === i) return 'ecmwfWaves';
      if (n.includes('gfsWaves') && 'gfs' === i) return 'gfsWaves';
      if (n.includes('iconEuWaves') && 'icon' === i) return 'iconEuWaves';
      if (n.includes('iconWaves') && 'icon' === i) return 'iconWaves';
      if (n.length > 1) {
        var o = vt.get('mapCoords'),
          a = n.filter(function (e) {
            return ko[e].pointIsInBounds.call(ko[e], o);
          })[0];
        if (a) return a;
      }
      return n[0];
    },
    Ks = function (e) {
      var t = Xs(e, !0).filter(function (e) {
        return !/Waves/.test(e);
      });
      return [].concat(Z, g(t));
    },
    $s = Object.freeze({
      __proto__: null,
      betterProducts: Xs,
      dedupeIcon: Zs,
      getAllPointProducts: Ks,
      getIconModel: function (e, t) {
        return 'icon' === e && t.includes('iconEu')
          ? 'iconEu'
          : 'iconWaves' === e && t.includes('iconEuWaves')
            ? 'iconEuWaves'
            : 'iconEuWaves' === e && t.includes('iconWaves')
              ? 'iconWaves'
              : 'iconEu' === e && t.includes('icon')
                ? 'icon'
                : null;
      },
      getPointProducts: function (e) {
        return Zs(Ks(e));
      },
      getProduct: Qs,
      layer2product: Vs,
      overlay2product: Ys,
    }),
    el = new Ke({ ident: 'render' }),
    tl = {
      extreme: [0, 0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
      ultra: [0, 0, 0, 2, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      high: [0, 0, 0, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      normal: [0, 0, 0, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      low: [0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    },
    nl = function (e) {
      return Math.pow(2, e);
    },
    il = function (e, t) {
      return nl(e) / nl(t);
    },
    rl = Object.keys(tl),
    ol = function (e, t) {
      if (e.dataTilesZoom) return e.dataTilesZoom;
      var n = e.dataQuality,
        i = e.upgradeDataQuality ? rl[Math.max(rl.indexOf(n) - 1, 0)] : n,
        r = tl[i][t];
      return e.maxTileZoom ? Math.min(Kn() ? e.maxTileZoom.premium : e.maxTileZoom.free, r) : r;
    },
    al = function (e, t) {
      if (!t.fullPath) return null;
      var n = e.z,
        i = ol(t, n),
        r = il(n, i),
        o = Math.floor(e.x / r),
        a = Math.floor(e.y / r),
        s = e.x % r,
        l = e.y % r,
        c = t.fullPath.replace('<z>', i.toString()).replace('<y>', a.toString()).replace('<x>', o.toString()),
        u = nl(i);
      return o < 0 || a < 0 || o >= u || a >= u
        ? null
        : {
            url: c,
            x: o,
            y: a,
            z: i,
            intX: s,
            intY: l,
            trans: r,
            transformR: t.transformR || null,
            transformG: t.transformG || null,
            transformB: t.transformB || null,
          };
    },
    sl = function (e, t) {
      return !!(192 & e[t + 2] || 192 & e[t + 6] || 192 & e[t + 1030] || 192 & e[t + 1034]);
    },
    ll = function (e, t) {
      return !(e[t + 3] && e[t + 7] && e[t + 1028 + 3] && e[t + 1028 + 7]);
    },
    cl = {},
    ul = function (e) {
      if (e in cl) return cl[e];
      var t,
        n,
        i,
        r = 0;
      if (!(e <= 32)) return null;
      for (t = new Uint16Array(4 * e * e), i = 0; i < e; i++)
        for (n = 0; n < e; n++)
          ((t[r++] = (e - i) * (e - n)), (t[r++] = (e - i) * n), (t[r++] = i * (e - n)), (t[r++] = n * i));
      return ((cl[e] = t), t);
    },
    dl = function (e, t, n) {
      var i = n.colors;
      if (!i) throw new Error('Creating fill fun failed, cTable is not defined!');
      var r = n.value2index.bind(n);
      switch (t) {
        case 1:
          return function (t, n, o) {
            var a = ((n << 8) + t) << 2,
              s = r(o);
            ((e[a++] = i[s++]), (e[a++] = i[s++]), (e[a] = i[s]));
          };
        case 2:
          return function (t, n, o) {
            var a = ((n << 8) + t) << 2,
              s = r(o),
              l = i[s++],
              c = i[s++],
              u = i[s];
            ((e[a] = e[a + 4] = l),
              (e[a + 1] = e[a + 5] = c),
              (e[a + 2] = e[a + 6] = u),
              (e[(a += 1024)] = e[a + 4] = l),
              (e[a + 1] = e[a + 5] = c),
              (e[a + 2] = e[a + 6] = u));
          };
      }
    },
    hl = document.createElement('canvas'),
    fl = hl.getContext('2d');
  ((hl.width = hl.height = 256), (fl.fillStyle = 'black'), fl.fillRect(0, 0, 256, 256));
  var ml = fl.getImageData(0, 0, 256, 256),
    pl = function (e, t, n, i, r, o, a, s, l, c) {
      null !== e && ((a = e[t]), (s = e[t + 1]), (l = e[t + 2]), (c = e[t + 3]));
      var u = Math.max(a, s, l, c);
      return u === a ? n : u === s ? i : u === l ? r : o;
    },
    vl = Object.freeze({
      __proto__: null,
      createCombinedFillFun: function (e, t, n, i) {
        var r = t.colors,
          o = n.colors,
          a = t.value2index.bind(t),
          s = n.value2index.bind(n),
          l = dl(e, 2, t),
          c = dl(e, 2, n),
          u = function (t, n, i, r) {
            ((e[t] = n), (e[t + 1] = i), (e[t + 2] = r));
          };
        return function (e, t, n, d) {
          var h = i(n, d);
          if (0 === h) return l(e, t, n);
          if (4 === h) return c(e, t, d);
          if (!r || !o)
            throw new Error(
              'Cannot create combinedFillFun, col1 ('.concat(r, ') or col2 (').concat(o, ') is not defined!'),
            );
          var f = ((t << 8) + e) << 2,
            m = a(n),
            p = s(d),
            v = r[m++],
            g = r[m++],
            y = r[m++],
            w = o[p++],
            b = o[p++],
            T = o[p++];
          switch (h) {
            case 1:
              (u(f, w, b, T), u(f + 4, v, g, y), u(f + 1024, v, g, y), u(f + 1028, v, g, y));
              break;
            case 2:
              (u(f, w, b, T), u(f + 4, w, b, T), u(f + 1024, v, g, y), u(f + 1028, v, g, y));
              break;
            case 3:
              (u(f, w, b, T), u(f + 4, w, b, T), u(f + 1024, w, b, T), u(f + 1028, v, g, y));
          }
        };
      },
      createFillFun: dl,
      emitter: el,
      getDataZoom: ol,
      getTrans: il,
      getWTable: ul,
      imgData: ml,
      interpolateNearest: pl,
      testJPGtransparency: sl,
      testPNGtransparency: ll,
      tileW: nl,
      wTables: cl,
      whichTile: al,
      zoom2zoom: tl,
    }),
    gl = (function () {
      function e(t) {
        var n, i, r, o, a, s, l, c, u, d, h;
        (m(this, e),
          _(this, 'dragging', !1),
          (this.el = t.el),
          (this.supportTouch = null === (n = t.supportTouch) || void 0 === n || n),
          (this.preventDefault = null === (i = t.preventDefault) || void 0 === i || i),
          (this.passiveListener = null === (r = t.passiveListener) || void 0 === r || r),
          (this.ondrag = null !== (o = t.ondrag) && void 0 !== o ? o : this.ondrag),
          (this.ondragstart = null !== (a = t.ondragstart) && void 0 !== a ? a : this.ondragstart),
          (this.ondragend = null !== (s = t.ondragend) && void 0 !== s ? s : this.ondragend),
          (this.bindedDrag = null !== (l = t.bindedDrag) && void 0 !== l ? l : this._drag.bind(this)),
          (this.bindedEndDrag = null !== (c = t.bindedEndDrag) && void 0 !== c ? c : this.endDrag.bind(this)),
          (this.bindedStart = null !== (u = t.bindedStart) && void 0 !== u ? u : this.startDrag.bind(this)),
          (this.startDrag = null !== (d = t.startDrag) && void 0 !== d ? d : this.startDrag),
          (this.endDrag = null !== (h = t.endDrag) && void 0 !== h ? h : this.endDrag),
          this.el.addEventListener('mousedown', this.bindedStart),
          this.supportTouch && this.el.addEventListener('touchstart', this.bindedStart));
      }
      return (
        v(e, [
          {
            key: 'destroy',
            value: function () {
              (this.el.removeEventListener('mousedown', this.bindedStart),
                this.supportTouch && this.el.removeEventListener('touchstart', this.bindedStart));
            },
          },
          {
            key: 'startDrag',
            value: function (e) {
              (this.preventDefault && e.preventDefault(),
                (this.startXY = this.getXY(e)),
                (this.offsetX = this.el.offsetLeft),
                (this.offsetY = this.el.offsetTop),
                (this.dragging = !0),
                this.ondragstart && this.ondragstart.call(this, this.startXY),
                window.addEventListener('mousemove', this.bindedDrag),
                window.addEventListener('mouseup', this.bindedEndDrag),
                this.supportTouch &&
                  (window.addEventListener(
                    'touchmove',
                    this.bindedDrag,
                    this.passiveListener ? void 0 : { passive: !1 },
                  ),
                  window.addEventListener('touchend', this.bindedEndDrag),
                  window.addEventListener('touchcancel', this.bindedEndDrag)));
            },
          },
          {
            key: 'endDrag',
            value: function (e) {
              (window.removeEventListener('mousemove', this.bindedDrag),
                window.removeEventListener(
                  'touchmove',
                  this.bindedDrag,
                  this.passiveListener ? void 0 : { passive: !1 },
                ),
                window.removeEventListener('mouseup', this.bindedEndDrag),
                window.removeEventListener('touchend', this.bindedEndDrag),
                window.removeEventListener('touchcancel', this.bindedEndDrag),
                this.ondragend && this.ondragend(e),
                (this.dragging = !1));
            },
          },
          {
            key: 'getXY',
            value: function (e) {
              return Be(e) ? [e.touches[0].pageX, e.touches[0].pageY] : [e.pageX, e.pageY];
            },
          },
          {
            key: '_drag',
            value: function (e) {
              if (this.ondrag) {
                var t = this.getXY(e);
                this.ondrag(t[0] - this.startXY[0] + this.offsetX, t[1] - this.startXY[1] + this.offsetY, e);
              }
            },
          },
        ]),
        e
      );
    })(),
    yl = Object.freeze({ __proto__: null, Drag: gl }),
    wl = (function () {
      function e(t) {
        var n, i;
        (m(this, e),
          (this.el = t.el),
          (this.onswipe = t.onswipe),
          (this.threshold = null !== (n = t.threshold) && void 0 !== n ? n : 50),
          (this.onswipestart = null !== (i = t.onswipestart) && void 0 !== i ? i : this.onswipestart),
          this.el.addEventListener('touchstart', this.touchStart.bind(this)),
          this.el.addEventListener('touchmove', this.touchMove.bind(this)),
          this.el.addEventListener('touchend', this.touchEnd.bind(this)));
      }
      return (
        v(e, [
          {
            key: 'touchStart',
            value: function (e) {
              ((this.isSwipeValid = !0),
                (this.direction = null),
                (this.x = this.xStart = this.xThrottled = e.touches[0].clientX),
                (this.y = this.yStart = this.yThrottled = e.touches[0].clientY),
                this.onswipestart(e));
            },
          },
          {
            key: 'touchMove',
            value: function (e) {
              ((this.x = e.touches[0].clientX), (this.y = e.touches[0].clientY));
              var t = this.x - this.xThrottled,
                n = this.y - this.yThrottled;
              if (!(Math.sqrt(t * t + n * n) < this.threshold)) {
                ((this.xThrottled = this.x), (this.yThrottled = this.y));
                var i = null;
                (Math.abs(n / t) < 0.2
                  ? (i = t > 0 ? 'right' : 'left')
                  : Math.abs(t / n) < 0.2 && (i = n > 0 ? 'down' : 'up'),
                  null !== i &&
                    (null === this.direction || this.direction === i
                      ? (this.direction = i)
                      : (this.isSwipeValid = !1)));
              }
            },
          },
          {
            key: 'touchEnd',
            value: function (e) {
              if (null !== this.direction && this.isSwipeValid) {
                for (
                  var t = this.x - this.xStart, n = this.y - this.yStart, i = Math.sqrt(t * t + n * n), r = e.target;
                  r && r !== this.el;
                ) {
                  if (r.dataset.ignoreSwipe) return;
                  r = r.parentElement;
                }
                this.onswipe(this.direction, i, e);
              }
            },
          },
          { key: 'onswipestart', value: function (e) {} },
          { key: 'onswipe', value: function (e, t, n) {} },
        ]),
        e
      );
    })(),
    bl = Object.freeze({ __proto__: null, Swipe: wl }),
    Tl = (function (e) {
      s(i, e);
      var n = c(i);
      function i(e) {
        var t;
        (m(this, i),
          _(d((t = n.call(this, S(S({}, e), {}, { preventDefault: !1, passiveListener: !1 })))), 'threshold', 30),
          (t.pluginEl = e.pluginEl),
          (t.pluginName = e.pluginName),
          (t.closeOnSwipeDown = e.closeOnSwipeDown),
          (t.scrollEl = e.scrollEl));
        var r = t.scrollEl || He('.plugin-content', t.pluginEl);
        if (!r) return u(t);
        var o = !1;
        return (
          r.addEventListener('scroll', function () {
            r.scrollTop > 20 && !o
              ? (t.pluginEl.classList.add('show-header'), (o = !0))
              : r.scrollTop < 21 && o && (t.pluginEl.classList.remove('show-header'), (o = !1));
          }),
          t.closeOnSwipeDown && t.initCloseOnSwipeDown(r),
          t
        );
      }
      return (
        v(i, [
          {
            key: 'ondrag',
            value: function (e, t, n) {
              ((this.transformedY = this.startY + t),
                this.updatePosition(Math.max(0, this.transformedY)),
                Math.abs(this.throttledY - this.transformedY) > this.threshold &&
                  ((this.difference = this.transformedY - this.throttledY), (this.throttledY = this.transformedY)),
                n.preventDefault());
            },
          },
          {
            key: 'ondragend',
            value: function () {
              Math.abs(this.transformedY - this.startY) > this.threshold
                ? ((this.pluginEl.style.transition = ''),
                  (this.pluginEl.style.transform = ''),
                  this.difference > 0
                    ? this.closeOnSwipeDown || this.pluginEl.classList.contains('open-half')
                      ? dn.emit('rqstClose', this.pluginName)
                      : this.pluginEl.classList.add('open-half')
                    : this.pluginEl.classList.remove('open-half'))
                : this.updatePosition(this.startY);
            },
          },
          {
            key: 'startDrag',
            value: function (e) {
              t(f(i.prototype), 'startDrag', this).call(this, e);
              var n = window.getComputedStyle(this.pluginEl).transform,
                r = /matrix\(.+,\s*(\S+)\)/.exec(n);
              ((this.startY = r && r[1] ? +r[1] : 0),
                (this.transformedY = this.startY),
                (this.throttledY = this.startY),
                (this.difference = 0),
                (this.pluginEl.style.transition = 'none'));
            },
          },
          {
            key: 'initCloseOnSwipeDown',
            value: function (e) {
              var t,
                n = this;
              this.swipeHandler = new wl({
                el: this.pluginEl,
                threshold: 80,
                onswipestart: function () {
                  t = e.scrollTop <= 0;
                },
                onswipe: function (e) {
                  t && 'down' === e && dn.emit('rqstClose', n.pluginName);
                },
              });
            },
          },
          {
            key: 'updatePosition',
            value: function (e) {
              this.pluginEl.style.transform = 'translate(0px,'.concat(Math.floor(e), 'px)');
            },
          },
        ]),
        i
      );
    })(gl),
    El = Object.freeze({ __proto__: null, BottomSlide: Tl }),
    Sl = (function () {
      function e(t) {
        var n, i, r, o;
        (m(this, e),
          this.initProperties(),
          (this.dependencies = null !== (n = t.dependencies) && void 0 !== n ? n : this.dependencies),
          (this.pane = t.pane),
          (this.ident = t.ident),
          (this.langFiles = t.langFiles),
          (this.location = t.location),
          (this.fullIdent = '@plugins/'.concat(this.ident)),
          (this.close = null !== (i = t.close) && void 0 !== i ? i : this.close),
          (this.paramsChanged = null !== (r = t.paramsChanged) && void 0 !== r ? r : this.paramsChanged),
          (this.redraw = null !== (o = t.redraw) && void 0 !== o ? o : this.redraw),
          (this.neverClose = t.neverClose),
          (this.disableMobilePicker = t.disableMobilePicker));
      }
      return (
        v(e, [
          {
            key: 'getAssetsLocation',
            value: function () {
              return this.location
                ? 'http' === this.location.substr(0, 4)
                  ? this.location
                  : De('https://www.windy.com/js', this.location)
                : ''.concat(U, '/plugins/').concat(this.ident, '.js');
            },
          },
          {
            key: 'load',
            value: function () {
              var e = this;
              if (this.isLoaded) return Promise.resolve(!0);
              if (this.loading) return this.promise || Promise.resolve(!0);
              this.loading = !0;
              var t = this.dependencies.map(function (e) {
                var t, n;
                return null !== (t = null === (n = W.plugins[e]) || void 0 === n ? void 0 : n.open()) && void 0 !== t
                  ? t
                  : Promise.reject(''.concat(e, ' not resolved'));
              });
              return (
                this.langFiles &&
                  t.push.apply(
                    t,
                    g(
                      this.langFiles.map(function (e) {
                        return Pn(e);
                      }),
                    ),
                  ),
                Promise.all(t)
                  .then(function () {
                    if (!e.coreLoaded)
                      return Fe(e.getAssetsLocation())
                        .then(function () {
                          e.coreLoaded = !0;
                        })
                        .catch(Et);
                  })
                  .then(function () {
                    ((e.isLoaded = !0), (e.loading = !1), e.onloaded());
                  })
                  .catch(function (t) {
                    throw (
                      (e.loading = !1),
                      Ye('plugin', 'Failed to load/resolve dependencies: '.concat(e.ident), t),
                      t
                    );
                  })
              );
            },
          },
          {
            key: 'onloaded',
            value: function () {
              this.resolvePlugin();
            },
          },
          {
            key: 'resolvePlugin',
            value: function () {
              (!this.isResolved && this.fullIdent in on && (this.plugin = ln(this.fullIdent)), (this.isResolved = !0));
            },
          },
          {
            key: 'open',
            value: function () {
              return ((this.promise = this.load()), this.promise);
            },
          },
          { key: 'close', value: function (e) {} },
          { key: 'redraw', value: function () {} },
          { key: 'paramsChanged', value: function () {} },
          {
            key: 'initProperties',
            value: function () {
              ((this.loading = !1), (this.isLoaded = !1), (this.coreLoaded = !1), (this.dependencies = []));
            },
          },
        ]),
        e
      );
    })();
  _(Sl, 'iAm', 'plugin');
  var _l = (function (e) {
      s(i, e);
      var n = c(i);
      function i(e) {
        var t, r, o, a, s, l, c, u, d;
        return (
          m(this, i),
          ((d = n.call(this, e)).router = e.router),
          (d.title = e.title),
          (d.addMobileSlider = null !== (t = e.addMobileSlider) && void 0 !== t ? t : d.addMobileSlider),
          (d.closeOnSwipeDown = null !== (r = e.closeOnSwipeDown) && void 0 !== r ? r : d.closeOnSwipeDown),
          (d.closesOnSwipeRight = null !== (o = e.closesOnSwipeRight) && void 0 !== o ? o : d.closesOnSwipeRight),
          (d.logUsage = null === (a = e.logUsage) || void 0 === a || a),
          (d.noCloseOnBackButton = e.noCloseOnBackButton),
          (d.hook = e.hook),
          (d.interpolator = e.interpolator),
          (d.close = null !== (s = e.close) && void 0 !== s ? s : d.close),
          (d.onopen = null !== (l = e.onopen) && void 0 !== l ? l : d.onopen),
          (d.onclosed = null !== (c = e.onclosed) && void 0 !== c ? c : d.onclosed),
          (d.beforeLoad = null !== (u = e.beforeLoad) && void 0 !== u ? u : d.beforeLoad),
          (d.cssID = ''.concat(Sl.iAm, '-css-').concat(d.ident)),
          (d.window = d.createWindow(e)),
          d
        );
      }
      return (
        v(i, [
          {
            key: 'open',
            value: function () {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = t.params,
                i = t.disableOpeningAnimation;
              (this.beforeLoad(n), this.logUsage && Zn('plugin', this.ident));
              var r = function () {
                (e.isMounted || e.mount(),
                  e.window.open({ disableOpeningAnimation: i }),
                  e.displayURLAndTitle(),
                  e.onopen(n));
              };
              return this.isOpen
                ? (this.onopen(n), Promise.resolve())
                : this.isLoaded
                  ? (r(), Promise.resolve())
                  : ((this.loading && this.promise) || ((this.promise = this.load()), this.promise.then(r)),
                    this.promise);
            },
          },
          {
            key: 'close',
            value: function (e) {
              this.window.close(e);
            },
          },
          {
            key: 'onopen',
            value: function (e) {
              if ('onopen' in this.plugin && 'function' == typeof this.plugin.onopen) return this.plugin.onopen(e);
            },
          },
          {
            key: 'ondestroy',
            value: function (e) {
              if ('ondestroy' in this.plugin && 'function' == typeof this.plugin.ondestroy)
                return this.plugin.ondestroy(e);
            },
          },
          { key: 'onclosed', value: function () {} },
          { key: 'beforeLoad', value: function () {} },
          {
            key: 'displayURLAndTitle',
            value: function () {
              if (this.router) {
                var e = this.title && this.title in bn ? bn[this.title] : this.title || null;
                (e && W.location.setTitle(e), !0 === this.router && W.location.setUrl(this.ident));
              }
            },
          },
          {
            key: 'node',
            get: function () {
              return this.window.node;
            },
            set: function (e) {
              this.window.node = e;
            },
          },
          {
            key: 'domEl',
            get: function () {
              return this.window.domEl;
            },
            set: function (e) {
              this.window.domEl = e;
            },
          },
          {
            key: 'initProperties',
            value: function () {
              (t(f(i.prototype), 'initProperties', this).call(this),
                (this.addMobileSlider = !1),
                (this.closeOnSwipeDown = !0),
                (this.isMounted = !1));
            },
          },
          {
            key: 'unmount',
            value: function () {
              var e;
              if (
                (null === (e = this.node) ||
                  void 0 === e ||
                  null === (e = e.parentNode) ||
                  void 0 === e ||
                  e.removeChild(this.node),
                this.cssInserted)
              ) {
                var t = He('#'.concat(this.cssID));
                (t && document.head.removeChild(t), (this.cssInserted = !1));
              }
              this.isMounted = !1;
            },
          },
          {
            key: 'mountCss',
            value: function (e) {
              e &&
                !this.cssInserted &&
                (document.head.insertAdjacentHTML(
                  'beforeend',
                  '<style id="'.concat(this.cssID, '">').concat(e, '</style>'),
                ),
                (this.cssInserted = !0));
            },
          },
          {
            key: 'mount',
            value: function () {
              var e = on[this.fullIdent];
              if (!e) throw new Error('Module '.concat(this.fullIdent, ' not loaded'));
              var t = e.html,
                n = e.css;
              (this.mountCss(n),
                this.window.mount(t && t.length > 2 ? t : void 0),
                (this.isMounted = !0),
                this.onmounted());
            },
          },
          {
            key: 'onmounted',
            value: function () {
              var e = this;
              if (
                (this.addMobileSlider &&
                  K &&
                  this.node &&
                  (this.node.insertAdjacentHTML('beforeend', '<div class="sliding-x"></div>'),
                  new Tl({
                    el: He('.sliding-x', this.node),
                    pluginEl: this.node,
                    pluginName: this.ident,
                    closeOnSwipeDown: this.closeOnSwipeDown,
                  })),
                this.closesOnSwipeRight &&
                  this.node &&
                  new wl({
                    el: this.node,
                    threshold: 100,
                    onswipe: function (t) {
                      'right' === t && e.close();
                    },
                  }),
                'onmount' in this.plugin && 'function' == typeof this.plugin.onmount)
              ) {
                var t,
                  n,
                  i = {};
                (null !== (t = null === (n = this.node) || void 0 === n ? void 0 : n.querySelectorAll('[data-ref]')) &&
                void 0 !== t
                  ? t
                  : []
                ).forEach(function (e) {
                  e.dataset.ref && (i[e.dataset.ref] = e);
                });
                try {
                  this.plugin.onmount(this.node, i);
                } catch (e) {
                  (this.unmount(), Ye('WindowPlugin', 'Failed to mount '.concat(this.ident, ' plugin'), e));
                }
              }
            },
          },
          {
            key: 'onWindowOpen',
            value: function () {
              var e = this;
              ((this.isOpen = !0),
                setTimeout(function () {
                  dn.emit('pluginOpened', e.ident);
                }, 50));
            },
          },
          {
            key: 'onWindowClose',
            value: function (e) {
              ((this.isOpen = !1),
                (null != e && e.doNotResetURL) || !this.router || !W.location.reset || W.location.reset(),
                this.ondestroy(e));
            },
          },
          {
            key: 'onWindowClosed',
            value: function () {
              (this.onclosed(), this.unmount(), dn.emit('pluginClosed', this.ident));
            },
          },
          {
            key: 'createWindow',
            value: function (e) {
              var t;
              return new wi({
                bodyClass: 'on'.concat(this.ident),
                ident: e.ident,
                keyboard: e.keyboard,
                className: e.className,
                attachPoint: e.attachPoint,
                closeOnClick: e.closeOnClick,
                displayBlock: e.displayBlock,
                noAnimation: e.noAnimation,
                html: '',
                htmlID: null !== (t = e.htmlID) && void 0 !== t ? t : ''.concat(Sl.iAm, '-').concat(this.ident),
                onopen: this.onWindowOpen.bind(this),
                onclose: this.onWindowClose.bind(this),
                onclosed: this.onWindowClosed.bind(this),
              });
            },
          },
        ]),
        i
      );
    })(Sl),
    Al = '#plugins-bottom'.concat(ee ? '' : '-desktop'),
    Pl = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        return (
          m(this, n),
          (e.attachPoint = Al),
          (e.className = e.className || 'plugin-bottom'),
          (e.noCloseOnBackButton = !0),
          (e.neverClose = !0),
          (e.pane = 'small-bottom'),
          (e.noAnimation = !0),
          t.call(this, e)
        );
      }
      return v(n);
    })(_l),
    kl = (function (e) {
      s(i, e);
      var n = c(i);
      function i() {
        return (m(this, i), n.apply(this, arguments));
      }
      return (
        v(i, [
          {
            key: 'onopen',
            value: function () {
              var e;
              return this.svelteApp && this.svelteApp.onopen
                ? (e = this.svelteApp).onopen.apply(e, arguments)
                : t(f(i.prototype), 'onopen', this).apply(this, arguments);
            },
          },
          {
            key: 'ondestroy',
            value: function () {
              return this.svelteApp && this.svelteApp.onclose
                ? this.svelteApp.onclose()
                : t(f(i.prototype), 'ondestroy', this).call(this);
            },
          },
          {
            key: 'mount',
            value: function () {
              var e = on[this.fullIdent].css;
              (this.mountCss(e), this.window.mount(''));
              var t = this.node,
                n = He('.closing-x', this.node),
                i = ln(this.fullIdent, this);
              ((this.svelteApp = new i({ target: t, anchor: n })), (this.isMounted = !0), this.onmounted());
            },
          },
          {
            key: 'unmount',
            value: function () {
              if (this.node) {
                var e;
                if (this.svelteApp)
                  (this.svelteApp.$destroy(),
                    null === (e = this.node.parentNode) || void 0 === e || e.removeChild(this.node),
                    (this.isMounted = !1),
                    (this.svelteApp = null));
                t(f(i.prototype), 'unmount', this).call(this);
              } else Ye('SveltePlugin', 'Trying to unmount non existent DOM element '.concat(this.ident));
            },
          },
        ]),
        i
      );
    })(_l),
    Cl = $ ? 'rhpane' : 'lhpane',
    Ol = K ? 'plugin-mobile-bottom-slide top-border' : 'plugin-lhpane plugin-tablet-rhpane top-border',
    Ll = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        var i, r, o, a, s, l;
        return (
          m(this, n),
          (e.className =
            null !== (i = e.className) && void 0 !== i
              ? i
              : e.additionalClassName
                ? ''.concat(Ol, ' ').concat(e.additionalClassName)
                : Ol),
          (e.pane = null !== (r = e.pane) && void 0 !== r ? r : Cl),
          (e.keyboard = null === (o = e.keyboard) || void 0 === o || o),
          (e.addMobileSlider = null === (a = e.addMobileSlider) || void 0 === a || a),
          (e.closeOnSwipeDown = null === (s = e.closeOnSwipeDown) || void 0 === s || s),
          (e.closesOnSwipeRight = null !== (l = e.closesOnSwipeRight) && void 0 !== l ? l : $),
          t.call(this, e)
        );
      }
      return v(n);
    })(kl),
    Il = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        return (m(this, n), t.apply(this, arguments));
      }
      return v(n);
    })(_l),
    Rl = function (e) {
      return ko[e].calendar ? Promise.resolve() : ko[e].open();
    },
    xl = function (e) {
      var t = ko[e];
      if (null != t && t.refTime) return t.getUpdateTimes.call(t).refTime;
    },
    Nl = function (e, t) {
      var n = xl(t);
      return n ? Ue(e, 'refTime='.concat(n)) : e;
    },
    Ml = function (e) {
      return '/webcams/v1.0/detail/'.concat(e, '?lang=').concat(vt.get('usedLang') || 'en');
    },
    Dl = function (e, t, n, i, r) {
      var o = t.lat,
        a = t.lon,
        s = t.step,
        l = t.interpolate;
      return Rl(e).then(function () {
        var t = '/forecast/point/'
          .concat(e, '/')
          .concat(G, '/')
          .concat(ge(o), '/')
          .concat(ge(a), '?source=')
          .concat(n)
          .concat(s ? '&step=' + s : '')
          .concat(l ? '&interpolate=true' : '')
          .concat(i ? '&' + i : '');
        return Xt(Nl(t, e), r);
      });
    },
    Ul = function (e, t, n) {
      var i = ko[e];
      if (!i) return Promise.resolve(null);
      var r = i.modelIdent,
        o = i.calendar;
      return r
        ? Rl(e).then(function () {
            var i = '/citytile/v1.0/'
                .concat(r, '/')
                .concat(t, '?reftime=')
                .concat(xl(e), '&labelsVersion=v1.4&step=')
                .concat(Kn() ? 1 : 3),
              a = null == o ? void 0 : o.numOfHours;
            return (a && (i = Ue(i, 'hours='.concat(a))), Xt(Nl(i, e), n));
          })
        : Promise.resolve(null);
    },
    Wl = Object.freeze({
      __proto__: null,
      getArchiveForecastData: function (e, t, n, i, r) {
        var o = t.lat,
          a = t.lon;
        return Rl(e).then(function () {
          var t = '/forecast/archive/'
            .concat(e, '/v1.1/')
            .concat(ge(o), '/')
            .concat(ge(a), '?source=')
            .concat(n)
            .concat(i ? '&' + i : '');
          return Xt(Nl(t, e), r);
        });
      },
      getCitytileData: Ul,
      getMeteogramForecastData: function (e, t, n) {
        var i = t.lat,
          r = t.lon,
          o = t.step;
        return Rl(e).then(function () {
          var t = '/forecast/meteogram/'.concat(e, '/').concat(ge(i), '/').concat(ge(r), '?step=').concat(o);
          return Xt(Nl(t, e), n);
        });
      },
      getNearestPoiItemsUrl: function (e, t) {
        var n = t.lat,
          i = t.lon;
        return '/pois/v2/'.concat(e, '/').concat(n, '/').concat(i);
      },
      getObservationsUrl: function (e, t, n) {
        var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
        return '/obs/measurement/v3/'.concat(e, '/').concat(t, '/').concat(n, '/').concat(i);
      },
      getPointForecastData: Dl,
      getReftimeIso: xl,
      getSearchWebcamViewsUrl: function (e, t) {
        var n = { textQuery: e, lang: vt.get('usedLang') || 'en' };
        return (
          t && ((n.lat = t.lat), (n.lon = t.lon)),
          'https://admin.windy.com/webcams/admin/v1.0/views?'.concat(We(n))
        );
      },
      getTideForecastUrl: function (e) {
        var t = e.lat,
          n = e.lon;
        return '/tides/v1.0/tides/'.concat(t, '/').concat(n);
      },
      getTidePoiUrl: function (e) {
        return '/tides/v1.0/tides/'.concat(e);
      },
      getWebcamArchiveUrl: function (e, t) {
        return '/webcams/v2.0/archive/'.concat(t ? 'hourly/' : '').concat(e);
      },
      getWebcamDetailUrl: Ml,
      getWebcamMetricsUrl: function (e) {
        return '/webcams/ping/'.concat(e);
      },
      getWebcamsListUrl: function (e) {
        var t = e.lat,
          n = e.lon,
          i = e.limit;
        return '/webcams/v1.0/list?'.concat(
          We({ nearby: ''.concat(t, ',').concat(n), lang: vt.get('usedLang') || 'en', limit: i }),
        );
      },
    }),
    Fl = He('#search #q');
  var Gl = function () {
      return Fl.classList.add('search-loading');
    },
    Hl = function () {
      return Fl.classList.remove('search-loading');
    };
  ((Fl.onblur = function () {
    return dn.emit('rqstClose', 'search');
  }),
    (Fl.onfocus = function () {
      return dn.emit('rqstOpen', 'search');
    }),
    dn.on('openSearch', function () {
      return Fl.focus();
    }));
  var zl = Object.freeze({
      __proto__: null,
      element: Fl,
      get: function () {
        return (Fl.value && Fl.value.trim()) || '';
      },
      hideLoader: Hl,
      set: function (e) {
        return (Fl.value = e);
      },
      showLoader: Gl,
    }),
    Bl = function (e) {
      return {
        route: new RegExp('^\\/'.concat(e, '\\/(\\S+)$')),
        onmatch: function (e) {
          return { id: e[1] };
        },
      };
    },
    jl = {
      geodesic: new Sl({ ident: 'geodesic', location: 'geodesic110.js' }),
      d3: new Sl({ ident: 'd3', location: 'd3.custom.js' }),
      colorpicker: new Sl({ ident: 'colorpicker', location: 'colorpicker.js' }),
      graticule: new Sl({ ident: 'graticule', location: 'graticule20.js' }),
      'fastspring-builder': new Sl({ ident: 'fastspring-builder', location: 'fastspring-builder.js' }),
      nouislider: new Il({ ident: 'nouislider', location: 'nouislider.v0806.js', logUsage: !1 }),
      'gl-particles': new Sl({ ident: 'gl-particles' }),
      particles: new Sl({ ident: 'particles' }),
      gestures: new Il({ ident: 'gestures', logUsage: !1 }),
      'legacy-tile-render': new Sl({ ident: 'legacy-tile-render' }),
      'detail-render': new Sl({ ident: 'detail-render', dependencies: ['weather-renderers'] }),
      seo: new Sl({ ident: 'seo' }),
      'plugin-data-loader': new Sl({ ident: 'plugin-data-loader' }),
      notifications: new Sl({ ident: 'notifications' }),
      'subscription-services': new Sl({ ident: 'subscription-services', langFiles: ['subscription'] }),
      'weather-renderers': new Sl({ ident: 'weather-renderers' }),
      isolines: new Il({ ident: 'isolines', logUsage: !1 }),
      patch: new Il({
        ident: 'patch',
        location: 'https://www.windy.com/patch/'
          .concat('index', '/latest/patch.js')
          .concat('?refTime='.concat(new Date().toISOString().replace(/^(.*):.*$/, '$1'))),
        logUsage: !1,
      }),
      'gl-lib': new Il({ ident: 'gl-lib', logUsage: !1 }),
      lightnings: new Sl({ ident: 'lightnings' }),
      'radar-sat': new Il({ ident: 'radar-sat', logUsage: !1 }),
      accumulations: new Pl({ ident: 'accumulations', logUsage: !1 }),
      'day-switcher': new Pl({ ident: 'day-switcher', logUsage: !1 }),
      'cap-alerts': new Pl({ ident: 'cap-alerts', logUsage: !1 }),
      'map-layers': new Pl({ ident: 'map-layers', dependencies: ee ? [] : ['rhpane'], logUsage: !1 }),
      radar: new Pl({
        ident: 'radar',
        title: 'RADAR',
        dependencies: ['gl-lib', 'radar-sat', 'lightnings'],
        logUsage: !1,
      }),
      satellite: new Pl({
        ident: 'satellite',
        title: 'SATELLITE',
        dependencies: ['gl-lib', 'radar-sat', 'lightnings'],
        logUsage: !1,
      }),
      'share-mobile': new Il({ ident: 'share-mobile' }),
      'hp-weather': new Il({
        ident: 'hp-weather',
        className: 'weather-box clickable-size',
        attachPoint: '[data-plugin="hp-weather"]',
        logUsage: !1,
      }),
      detail: new kl({
        ident: 'detail',
        dependencies: ee ? ['detail-render'] : ['rhpane', 'detail-render'],
        className: ee ? 'detail plugin-mobile-bottom-red' : 'detail plugin-desktop-bottom',
        pane: 'bottom',
        attachPoint: ee ? '#plugins' : '[data-plugin="detail-rplanner"]',
        disableMobilePicker: !0,
        beforeLoad: function (e) {
          Dl(e.product || 'ecmwf', S({ step: Kn() && vt.get('detail1h') ? 1 : 3 }, e), 'detail');
        },
        router: {
          route: e(
            /^\/(\x2D?\d+\.\d+)\/(\x2D?\d+\.\d+)(\/((table|meteogram|airgram|waves|wind)))?(\/((tide|surfspots|pgspots)))?(\/([a-zA-Z0-9]+))?/,
            { display: 4, poiType: 7, id: 10 },
          ),
          onmatch: function (e, t) {
            return {
              lat: +e[1],
              lon: +e[2],
              display: e.groups.display,
              poiType: e.groups.poiType,
              id: e.groups.id,
              hrTimestamps: null == t ? void 0 : t.hrTimestamps,
              name: null == t ? void 0 : t.name,
              moveToTimestamp: Boolean(null == t ? void 0 : t.moveToTimestamp),
            };
          },
        },
      }),
      station: new kl({
        ident: 'station',
        pane: 'bottom',
        disableMobilePicker: !0,
        addMobileSlider: !!ee,
        closeOnSwipeDown: !0,
        langFiles: ['station'],
        dependencies: ['weather-renderers'],
        className: ee ? 'plugin-mobile-bottom-red' : 'plugin-desktop-bottom',
        attachPoint: ee ? '#plugins' : '[data-plugin="detail-rplanner"]',
        router: Bl('station'),
      }),
      'nearest-stations': new kl({
        ident: 'nearest-stations',
        attachPoint: '[data-plugin="nearest-stations"]',
        className: 'drop-down-window left boxshadow',
        pane: 'nearest',
      }),
      'nearest-webcams': new kl({
        ident: 'nearest-webcams',
        attachPoint: '[data-plugin="nearest-webcams"]',
        className: 'window left boxshadow normal-closing-x',
        langFiles: ['webcams'],
        pane: 'nearest',
      }),
      'nearest-airq': new kl({
        ident: 'nearest-airq',
        className: 'drop-down-window left boxshadow',
        attachPoint: '[data-plugin="nearest-airq"]',
        pane: 'nearest',
      }),
      'nearest-webcams-mobile': new kl({
        ident: 'nearest-webcams-mobile',
        className: 'plugin-mobile-bottom-slide top-border no-header auto-height',
        addMobileSlider: !0,
        closeOnSwipeDown: !0,
        langFiles: ['webcams'],
        pane: 'nearest',
      }),
      rhpane: new Il({
        ident: 'rhpane',
        className: 'right-border top-border flex-container',
        displayBlock: !1,
        neverClose: !0,
        logUsage: !1,
        attachPoint: '[data-plugin="detail-rhpane"]',
      }),
      'user-menu': new kl({
        ident: 'user-menu',
        langFiles: ['notifications'],
        attachPoint: '[data-plugin="user-menu"]',
      }),
      'fav-alert-menu': new Il({
        ident: 'fav-alert-menu',
        className: 'drop-down-window size-l',
        closeOnClick: !0,
        attachPoint: '[data-plugin="fav-alert-menu"]',
      }),
      'poi-libs': new Il({ ident: 'poi-libs' }),
      sounding: new Ll({
        ident: 'sounding',
        dependencies: ['d3'],
        langFiles: ['sounding'],
        title: 'SOUNDING',
        disableMobilePicker: !0,
        router: {
          route: /^\/sounding\/(-?\d+\.\d+)\/(-?\d+\.\d+)(?:\/(\w+))?$/,
          onmatch: function (e) {
            return { lat: +e[1], lon: +e[2], id: e[3] };
          },
        },
      }),
      articles: new Ll({
        ident: 'articles',
        langFiles: ['articles'],
        className: K
          ? 'plugin-mobile-bottom-slide top-border no-header'
          : 'plugin-lhpane plugin-tablet-rhpane top-border',
        pane: $ ? 'rhpane' : 'lhpane',
        addMobileSlider: !0,
        disableMobilePicker: !0,
        router: {
          route: /^\/articles(?:\/(?:.*-)?)?(\d+)?$/,
          onmatch: function (e) {
            return e[1] ? { id: +e[1] } : void 0;
          },
        },
      }),
      screenshot: new Il({
        ident: 'screenshot',
        router: {
          route: /^\/screenshot(?:\/(\S+))?$/,
          onmatch: function (e) {
            return e[1] ? { params: e[1] } : void 0;
          },
        },
      }),
      settings: new Ll({
        ident: 'settings',
        langFiles: ['settings', 'notifications'],
        title: 'MENU_SETTINGS',
        router: {
          route: /^\/settings(\/notificationPreferences)?$/,
          onmatch: function (e) {
            return e[1] ? { section: 'notificationPreferences' } : void 0;
          },
        },
      }),
      favs: new Ll({
        ident: 'favs',
        langFiles: ['favs', 'notifications'],
        additionalClassName: 'dark-content',
        title: 'MENU_FAVS',
        dependencies: ['gestures', 'weather-renderers'],
        closeOnSwipeDown: !1,
        router: !0,
      }),
      alerts: new Ll({
        ident: 'alerts',
        langFiles: ['alerts', 'notifications'],
        title: 'EDIT_ALERT',
        dependencies: ['nouislider', 'poi-libs'],
        router: Bl('alerts'),
      }),
      colors: new Ll({
        ident: 'colors',
        title: 'S_COLORS',
        dependencies: ['colorpicker'],
        closeOnSwipeDown: !1,
        router: !0,
      }),
      hurricanes: new Ll({
        ident: 'hurricanes',
        langFiles: ['hurricanes'],
        title: 'HURR_TRACKER',
        dependencies: ['hurricanes-services'],
        attachPoint: ee ? '#plugins-bellow-bottom' : '#plugins',
        className: ee ? '' : 'plugin-lhpane top-border',
        pane: ee ? 'small-bottom-bottom' : 'lhpane',
        addMobileSlider: !1,
        closeOnSwipeDown: !1,
        disableMobilePicker: !0,
        router: {
          route: /^\/hurricanes(?:\/(\S+))?$/,
          onmatch: function (e) {
            return e[1] ? { id: e[1] } : void 0;
          },
        },
      }),
      'hurricanes-services': new Sl({ ident: 'hurricanes-services' }),
      debug: new Ll({ ident: 'debug', router: !0 }),
      info: new kl({
        ident: 'info',
        langFiles: ['info', 'products'],
        className: K
          ? 'plugin-mobile-bottom-slide top-border'
          : $
            ? 'plugin-lhpane plugin-tablet-rhpane top-border'
            : 'drop-down-window down',
        addMobileSlider: !0,
        closesOnSwipeRight: $,
        pane: $ ? 'rhpane' : void 0,
        attachPoint: ee ? '#plugins' : '#info-icon',
      }),
      'cap-alert': new Ll({
        ident: 'cap-alert',
        dependencies: ['detail-render'],
        addMobileSlider: !0,
        title: 'WX_WARNINGS',
        router: {
          route: /^\/cap-alert\/(-?\d+\.\d+)\/(-?\d+\.\d+)$/,
          onmatch: function (e) {
            return { lat: +e[1], lon: +e[2] };
          },
        },
      }),
      animate: new kl({ ident: 'animate', pane: 'lhpane', keyboard: !0, title: 'Create Animation', router: !0 }),
      airport: new Ll({
        ident: 'airport',
        className: K ? 'plugin-mobile-bottom-slide top-border' : 'plugin-lhpane plugin-tablet-rhpane top-border',
        pane: $ ? 'rhpane' : 'lhpane',
        dependencies: ['detail-render', 'gestures'],
        langFiles: ['webcams'],
        closeOnSwipeDown: !1,
        closesOnSwipeRight: !1,
        router: {
          route: /^\/([A-Za-z]\w\w\w)$/,
          onmatch: function (e) {
            return { icao: e[1].toUpperCase() };
          },
        },
      }),
      tides: new Il({ ident: 'tides', router: Bl('tides') }),
      share: new kl({ ident: 'share', title: 'SHARE', keyboard: !0, className: 'window' }),
      widgets: new kl({
        ident: 'widgets',
        pane: 'center',
        langFiles: ['widgets'],
        title: 'EMBED',
        keyboard: !0,
        addMobileSlider: !0,
        className: K ? 'plugin-mobile-bottom-slide top-border no-header dark-content' : 'plugin-rhpane top-border',
        router: !0,
      }),
      multimodel: new kl({
        ident: 'multimodel',
        dependencies: ['detail-render'],
        className: K ? 'plugin-mobile-bottom-slide top-border' : '',
        addMobileSlider: !0,
        router: {
          route: /^\/multimodel\/(-?\d+\.\d+)\/(-?\d+\.\d+)$/,
          onmatch: function (e) {
            return { lat: +e[1], lon: +e[2] };
          },
        },
      }),
      login: new kl({
        ident: 'login',
        pane: 'center',
        langFiles: ['register'],
        className: K ? 'plugin-mobile-bottom-slide top-border' : 'plugin-popup',
        addMobileSlider: !!K,
        keyboard: !0,
        router: {
          route: /^\/(register|login)$/,
          onmatch: function (e) {
            return 'register' === e[1] ? { reason: 'register' } : void 0;
          },
        },
      }),
      rplanner: new kl({
        ident: 'rplanner',
        pane: 'bottom',
        dependencies: ee ? ['geodesic', 'weather-renderers'] : ['geodesic', 'rhpane', 'weather-renderers'],
        className: ee ? 'detail plugin-mobile-bottom-red' : 'detail plugin-desktop-bottom',
        disableMobilePicker: !0,
        attachPoint: ee ? '#plugins' : '[data-plugin="detail-rplanner"]',
        title: 'RPLANNER',
        langFiles: ['distance'],
        keyboard: !0,
        router: {
          route: /^\/distance\/?(vfr|ifr|car|boat|airgram|elevation)?\/?([^/]+)(?:\/id:(\S+))?/,
          onmatch: function (e) {
            return { view: e[1] || 'elevation', coords: e[2] || '', id: e[3] };
          },
        },
      }),
      uploader: new Ll({ ident: 'uploader', title: 'Upload KML, GPX or geoJSON file', router: !0 }),
      upload: new Il({ ident: 'upload', router: Bl('upload') }),
      subscription: new kl({
        ident: 'subscription',
        className: K ? 'plugin-mobile-bottom-slide top-border no-header' : 'plugin-popup',
        keyboard: !0,
        addMobileSlider: !!K,
        dependencies: ['subscription-services'],
        pane: 'center',
        title: 'SUBSCRIPTION',
        onclosed: function () {
          dn.emit('checkPendingSubscriptions');
        },
        router: {
          route: /^\/subscription$/,
          onmatch: function (e, t) {
            return { fscNext: null == t ? void 0 : t.fscNext };
          },
        },
      }),
      'pending-subscription': new kl({
        ident: 'pending-subscription',
        langFiles: ['subscription'],
        dependencies: ['subscription-services'],
        className: 'top-message bg-orange fg-white',
        router: !0,
      }),
      'delete-info': new Ll({ ident: 'delete-info', router: !0 }),
      webcams: new Ll({ ident: 'webcams', langFiles: ['webcams'], router: !0 }),
      'webcams-detail': new Ll({
        ident: 'webcams-detail',
        langFiles: ['webcams'],
        beforeLoad: function (e) {
          this.isLoaded || this.loading || Xt(Ml(e.id));
        },
        router: {
          route: /\/webcams\/(\d+)$/,
          onmatch: function (e) {
            return { id: +e[1] };
          },
        },
      }),
      'webcams-add': new Ll({
        ident: 'webcams-add',
        langFiles: ['webcams'],
        title: 'D_MISSING_CAM',
        router: { route: /\/webcams\/add\/?$/, onmatch: function () {} },
      }),
      'webcams-edit': new Ll({
        ident: 'webcams-edit',
        langFiles: ['webcams'],
        router: {
          route: /\/webcams\/edit\/(\d+)$/,
          onmatch: function (e) {
            return { id: +e[1] };
          },
        },
      }),
      'webcams-remove': new Ll({
        ident: 'webcams-remove',
        langFiles: ['webcams'],
        router: {
          route: /\/webcams\/remove\/(\d+)$/,
          onmatch: function (e) {
            return { id: +e[1] };
          },
        },
      }),
      'webcams-embed': new Ll({
        ident: 'webcams-embed',
        langFiles: ['webcams'],
        title: 'EMBED',
        router: {
          route: /\/webcams\/embed\/(\d+)$/,
          onmatch: function (e) {
            return { id: +e[1] };
          },
        },
      }),
      'whats-new': new kl({
        ident: 'whats-new',
        title: "What's new",
        className: K ? 'plugin-mobile-bottom-slide top-border dark-content' : 'plugin-popup dark-content',
        addMobileSlider: !!K,
        dependencies: ['subscription-services'],
        pane: 'center',
        router: !0,
      }),
      search: new Il({
        ident: 'search',
        className: 'waiting',
        keyboard: !0,
        pane: 'top',
        attachPoint: '[data-plugin="search"]',
        beforeLoad: function () {
          null == Fl || Fl.focus();
        },
      }),
      offline: new kl({
        ident: 'offline',
        title: 'OFFLINE_MODE',
        className: K ? 'plugin-mobile-bottom-slide top-border' : 'plugin-popup',
        addMobileSlider: !!K,
        pane: 'center',
        router: !0,
      }),
      consent: new kl({
        ident: 'consent',
        className: K ? 'plugin-mobile-bottom-red' : 'plugin-popup',
        langFiles: ['consent'],
        disableMobilePicker: !0,
      }),
    };
  ((jl.menu = new kl({
    ident: 'menu',
    keyboard: !0,
    closesOnSwipeRight: !0,
    className: 'plugin-rhpane dark-content top-border',
    langFiles: ['menu', 'products'],
    pane: 'rhpane',
    title: 'MENU',
    router: !0,
  })),
    (jl['progress-bar'] = new Pl({ ident: 'progress-bar', className: 'plugin-bottom progress-bar', logUsage: !1 })),
    (jl.picker = new Il({ ident: 'picker' })),
    ee &&
      ((jl['promo-mobile-intro'] = new Il({ ident: 'promo-mobile-intro', className: 'fg-white rounded-box' })),
      (jl.distance = new kl({
        ident: 'distance',
        title: 'MENU_DISTANCE',
        keyboard: !1,
        disableMobilePicker: !0,
        dependencies: ['geodesic'],
        className: 'plugin-mobile-transparent-top',
        langFiles: ['distance'],
        pane: 'top',
        router: {
          route: /^\/distance\/\/?([^/]+)$/,
          onmatch: function (e) {
            return { coords: e[1] };
          },
        },
      })),
      (jl['fav-layers'] = new kl({
        ident: 'fav-layers',
        attachPoint: '[data-plugin="fav-layers"]',
        langFiles: ['menu'],
        className: 'size-m window transparent-window rh-bottom-pin',
        closeOnClick: 'outside',
      }))),
    ee ||
      ((jl.tools = new Il({
        ident: 'tools',
        title: 'MENU',
        pane: 'lhpane',
        className: 'plugin-lhpane top-border',
        router: !0,
      })),
      (jl.contextmenu = new Il({ ident: 'contextmenu', className: 'drop-down-window', closeOnClick: !0 })),
      (jl.overlays = new Il({
        title: 'S_ADD_OVERLAYS',
        ident: 'overlays',
        className: 'plugin-rhpane top-border',
        pane: 'rhpane',
        router: !0,
      })),
      (jl.globe = new Il({
        ident: 'globe',
        title: 'GLOBE',
        neverClose: !0,
        className: 'shy left-border right-border notap',
        dependencies: ['gl-lib', 'hurricanes-services'],
        noCloseOnBackButton: !0,
      })),
      (jl.pois = new Il({
        title: 'SHOW_ON_MAP',
        ident: 'pois',
        className: 'plugin-rhpane top-border',
        pane: 'rhpane',
        router: !0,
      })),
      (jl['article-publisher'] = new kl({
        ident: 'article-publisher',
        className: 'plugin-rhpane top-border left-border',
        title: 'Windy Article publisher',
        keyboard: !0,
        router: !0,
      }))));
  var Vl = (function () {
      var e,
        t,
        n = (function (e) {
          if (e && /\S+=\S+/.test(e)) {
            for (var t = (e = e.replace(/^\?/, '')).split('&'), n = {}, i = 0; i < t.length; i++) {
              var r = t[i].split('=');
              try {
                n[decodeURIComponent(r[0])] = decodeURIComponent(r[1] || '');
              } catch (e) {}
            }
            return n;
          }
        })(window.location.search);
      if (n)
        return {
          lat: +(null !== (e = n.lat) && void 0 !== e ? e : n.detailLat) || void 0,
          lon: +(null !== (t = n.lon) && void 0 !== t ? t : n.detailLon) || void 0,
          zoom: +n.zoom || 6,
        };
    })(),
    Yl = me,
    ql = Object.freeze({ __proto__: null, sharedCoords: Vl, url: Yl }),
    Zl = (function () {
      function e(t) {
        (m(this, e), _(this, 'data', {}), (this.ident = t.ident));
      }
      return (
        v(e, [
          {
            key: 'key',
            value: function (e) {
              if ('string' == typeof e) return e;
              if (e.id) return e.id;
              if (e.key) return e.key;
              if ('webcam' === e.type) return String(e.webcamId);
              if (('airport' === e.type && e.icao) || e.icao) return e.icao;
              if (e.lat && e.lon) return ''.concat(ge(e.lat), '/').concat(ge(e.lon));
              throw 'Invalid Fav key '.concat(JSON.stringify(e));
            },
          },
          {
            key: 'prepareAdd',
            value: function (e) {
              var t = this.key(e),
                n = {
                  id: e.id,
                  key: e.key || t,
                  lat: +e.lat,
                  lon: +e.lon,
                  title: e.title || e.name || e.lat + ', ' + e.lon,
                  type: e.type || 'fav',
                  updated: Date.now(),
                  counter: 1,
                };
              switch (e.type) {
                case 'airport':
                  n.icao = e.icao;
                  break;
                case 'station':
                  n.stationId = e.stationId || e.id || e.key;
                  break;
                case 'webcam':
                  n.webcamId = e.webcamId;
                  break;
                case 'alert':
                  n.alert = e.alert;
                  break;
                case 'route':
                  n.route = e.route;
              }
              return ((this.data[t] = n), t);
            },
          },
          {
            key: 'add',
            value: function (e, t) {
              return !!ve(e) && (this.prepareAdd(e), this.onchange(), this.save(), !0);
            },
          },
          {
            key: 'findFavByProperties',
            value: function (e) {
              var t = this,
                n = Object.keys(this.data).map(function (e) {
                  return t.data[e];
                });
              return this.dedupeFav(e, function (e) {
                return n.find(e);
              });
            },
          },
          {
            key: 'dedupeAndConcat',
            value: function (e, t) {
              var n = this;
              if (e.length && t.length) {
                var i = function (e) {
                  return t.find(e);
                };
                e = e.filter(function (e) {
                  return !n.dedupeFav(e, i);
                });
              }
              return t.concat(e);
            },
          },
          {
            key: 'dedupeFav',
            value: function (e, t) {
              if ('string' == typeof e && this.data[e]) return this.data[e];
              if ('object' === P(e)) {
                if ('station' === e.type)
                  return t(function (t) {
                    return t.stationId === (e.stationId || e.id);
                  });
                if ('webcam' === e.type)
                  return t(function (t) {
                    return t.webcamId === e.webcamId;
                  });
                if ('airport' === e.type || e.icao)
                  return t(function (t) {
                    return t.icao === e.icao;
                  });
                if (ve(e)) {
                  return (
                    t(function (t) {
                      return ge(e.lat) == ge(t.lat) && ge(e.lon) == ge(t.lon);
                    }) ||
                    t(function (t) {
                      return Ce(e, t) && 'fav' === t.type;
                    })
                  );
                }
              }
            },
          },
          {
            key: 'isFav',
            value: function (e) {
              return (
                !(function (e) {
                  return !Object.keys(e).length;
                })(e) && Boolean(this.data[this.key(e)] || this.findFavByProperties(e))
              );
            },
          },
          {
            key: 'save',
            value: function () {
              ft.put(this.ident, this.data);
            },
          },
          {
            key: 'updateTimestamp',
            value: function () {
              ((this.lastModified = Date.now()), ft.put(this.ident + '_ts', this.lastModified));
            },
          },
          {
            key: 'load',
            value: function () {
              ((this.data = ft.get(this.ident) || {}),
                ye(this.data, function (e, t) {
                  (e.type || (e.type = 'fav'), (e.key = t));
                }));
            },
          },
          { key: 'onchange', value: function () {} },
          {
            key: 'prepareRename',
            value: function (e, t) {
              var n = this.data[this.key(e)];
              return !!n && ((n.title = t), (n.updated = Date.now()), !0);
            },
          },
          {
            key: 'rename',
            value: function (e, t) {
              this.prepareRename(e, t) && (this.onchange(), this.save());
            },
          },
          {
            key: 'prepareRemove',
            value: function (e) {
              var t = this.key(e);
              this.data[t] && delete this.data[t];
            },
          },
          {
            key: 'remove',
            value: function (e, t) {
              return (this.prepareRemove(e), this.onchange(), this.save(), Promise.resolve());
            },
          },
          {
            key: 'getAll',
            value: function () {
              return this.data;
            },
          },
          {
            key: 'hit',
            value: function (e) {
              var t = this.data[this.key(e)];
              t && (t.counter ? t.counter++ : (t.counter = 1), (t.updated = Date.now()), this.save());
            },
          },
          {
            key: 'sortFavs',
            value: function (e, t, n) {
              var i = Object.keys(this.data);
              t = t || 'counter';
              var r = this.data;
              if (e)
                try {
                  var o = new RegExp('(?: |^)'.concat(e), 'i');
                  i = i.filter(function (e) {
                    return o.test(r[e].title || '') || o.test(r[e].icao || '') || o.test(r[e].query || '');
                  });
                } catch (e) {
                  console.error(e);
                }
              return (
                n &&
                  (i = i.filter(function (e) {
                    return !n.includes(e);
                  })),
                (i = i.sort(function (e, n) {
                  var i, o;
                  return (
                    (null !== (i = r[n][t]) && void 0 !== i ? i : 0) - (null !== (o = r[e][t]) && void 0 !== o ? o : 0)
                  );
                }))
              );
            },
          },
          {
            key: 'get',
            value: function (e, t, n, i) {
              for (
                var r,
                  o,
                  a = [],
                  s = i
                    ? i
                        .map(function (e) {
                          return e.key;
                        })
                        .filter(function (e) {
                          return Boolean(e);
                        })
                    : null,
                  l = this.sortFavs(t, n, s),
                  c = 0;
                c < Math.min(e, l.length);
                c++
              )
                ((o = l[c]), (r = we(this.data[o])), (a[c] = r));
              return a;
            },
          },
        ]),
        e
      );
    })(),
    Xl = (function (e) {
      s(i, e);
      var n = c(i);
      function i() {
        var e, r;
        (m(this, i),
          _(d((r = n.call(this, { ident: 'favs2' }))), 'ident', 'favs2'),
          _(d(r), 'overflowedKey', 'favs2_overflowed'),
          (r.triggeredAlerts = 0),
          (r.types = ['alert', 'station', 'fav', 'airport', 'webcam', 'route']));
        var o = new Ke({ ident: r.ident });
        return (
          (r.on = o.on.bind(o)),
          (r.off = o.off.bind(o)),
          (r.emit = o.emit.bind(o)),
          t(((e = d(r)), f(i.prototype)), 'load', e).call(e),
          (r.debouncedUpdate = be(r.update, 200)),
          (r.onchange = be(r.emitChange, 1e3)),
          dn.once('dependenciesResolved', r.checkAlerts, d(r)),
          vt.once('user', r.onUserData, d(r)),
          vt.on('detailLocation', r.debouncedUpdate, d(r)),
          dn.on('airportLoaded', r.debouncedUpdate, d(r)),
          r
        );
      }
      return (
        v(i, [
          {
            key: 'isValidFavourite',
            value: function (e) {
              return Boolean(e && e.type && this.types.includes(e.type));
            },
          },
          {
            key: 'update',
            value: function (e) {
              (e && (this.latestParams = e),
                this.updateCSS(),
                this.favsMenuOpened && (dn.emit('rqstClose', 'fav-alert-menu'), (this.favsMenuOpened = !1)));
            },
          },
          {
            key: 'hasTimestamps',
            value: function (e) {
              var t = this.getAlert(e);
              return (t && t.alertProps && t.alertProps.timestamps) || null;
            },
          },
          {
            key: 'add',
            value: function (e) {
              var n = this;
              if (this.isFreeLimitExceeded(e))
                return (dn.emit('rqstOpen', 'subscription', { promote: 'unlimited-favs' }), !1);
              e.type && !this.types.includes(e.type) && (e.type = 'fav');
              var r = this.prepareAdd(e);
              if (vt.get('user')) {
                var o = this.data[r];
                return Kt('/users/v3/favs', { data: o })
                  .then(function (e) {
                    return (
                      delete n.data[t(f(i.prototype), 'key', n).call(n, o)],
                      (o.id = e.data.id),
                      t(f(i.prototype), 'add', n).call(n, o),
                      o.id
                    );
                  })
                  .catch(function (e) {
                    throw (
                      delete n.data[t(f(i.prototype), 'key', n).call(n, o)],
                      n.addOverflowed && n.addOverflowed(o),
                      500 === e.status && n.createSyncError('add', o, e),
                      e.status
                    );
                  });
              }
              return (this.onchange(), t(f(i.prototype), 'save', this).call(this), !0);
            },
          },
          {
            key: 'getAlert',
            value: function (e) {
              return 'string' == typeof e
                ? this.data[e]
                : 'object' === P(e)
                  ? this.getArray().find(function (t) {
                      return 'alert' === t.type && Ce(e, t);
                    })
                  : void 0;
            },
          },
          {
            key: 'getArray',
            value: function (e, t) {
              var n = this,
                i = Object.keys(this.data)
                  .map(function (e) {
                    return n.data[e];
                  })
                  .filter(function (e) {
                    return n.isValidFavourite(e);
                  });
              if (e) {
                var r = i.filter(function (e) {
                  return 'alert' === e.type;
                });
                return (
                  t && r.push(t),
                  i.filter(function (e) {
                    return (
                      'fav' !== e.type ||
                      !r.filter(function (t) {
                        return Ce(e, t);
                      }).length
                    );
                  })
                );
              }
              return i;
            },
          },
          {
            key: 'isFreeLimitExceeded',
            value: function (e) {
              return !Kn() && this.getArray(!0, e).length >= 3;
            },
          },
          {
            key: 'updateCSS',
            value: function () {
              h(He('#fav'), t(f(i.prototype), 'isFav', this).call(this, this.latestParams || {}), 'isfav');
            },
          },
          {
            key: 'emitChange',
            value: function () {
              this.emit('favsChanged');
            },
          },
          {
            key: 'updateFav',
            value: function (e) {
              var n = this;
              return Qt('/users/v3/favs/'.concat(t(f(i.prototype), 'key', this).call(this, e)), {
                data: this.data[t(f(i.prototype), 'key', this).call(this, e)],
              })
                .then(function () {
                  (n.onchange(), t(f(i.prototype), 'save', n).call(n));
                })
                .catch(function (t) {
                  throw (500 === t.status && n.createSyncError('update', e, t), t.status);
                });
            },
          },
          {
            key: 'rename',
            value: function (e, n) {
              var r = this,
                o = e.title;
              return (
                t(f(i.prototype), 'prepareRename', this).call(this, e, n),
                vt.get('user')
                  ? this.updateFav(e).catch(function (n) {
                      throw ((r.data[t(f(i.prototype), 'key', r).call(r, e)].title = o), n);
                    })
                  : (this.onchange(), t(f(i.prototype), 'save', this).call(this), Promise.resolve())
              );
            },
          },
          {
            key: 'remove',
            value: function (e, n) {
              var r = this;
              return new Promise(function (o, a) {
                var s = e;
                ('string' != typeof s && s.counter) ||
                  (s = t(f(i.prototype), 'findFavByProperties', r).call(r, s) || s);
                var l = t(f(i.prototype), 'key', r).call(r, s);
                return r.data[l] || n
                  ? (t(f(i.prototype), 'prepareRemove', r).call(r, s),
                    vt.get('user')
                      ? void Jt('/users/v3/favs/'.concat(l))
                          .then(function () {
                            return (r.onchange(), t(f(i.prototype), 'save', r).call(r), o());
                          })
                          .catch(function (e) {
                            var n = t(f(i.prototype), 'key', r).call(r, s);
                            return (
                              'string' != typeof s && n && (r.data[n] = s),
                              500 === e.status && r.createSyncError('remove', s, e),
                              a(e.status)
                            );
                          })
                      : (r.onchange(), t(f(i.prototype), 'save', r).call(r), o()))
                  : a();
              });
            },
          },
          {
            key: 'checkAlerts',
            value: function (e) {
              var t = this,
                n = null == e ? void 0 : e.newlyAddedId,
                i = Date.now(),
                r = this.getArray().filter(function (e) {
                  return 'alert' === e.type;
                });
              if (r.length) {
                var o = r
                  .filter(function (e) {
                    return !e.alertProps || i - e.alertProps.checked > 432e5;
                  })
                  .map(function (e) {
                    return t.checkAlert(e, n === e.id);
                  });
                o.length ? Promise.all(o).then(this.onAlertsChecked.bind(this, r)) : this.onAlertsChecked(r);
              }
            },
          },
          {
            key: 'onchange',
            value: function () {
              this.emitChange();
            },
          },
          {
            key: 'reset',
            value: function () {
              ((this.data = {}), t(f(i.prototype), 'save', this).call(this), ft.remove(''.concat(this.ident, '_ts')));
            },
          },
          {
            key: 'getOverflowed',
            value: function () {
              var e = this,
                t = ft.get(this.overflowedKey) || {};
              return Object.keys(t)
                .map(function (e) {
                  return ((t[e].overflowed = !0), t[e]);
                })
                .filter(function (t) {
                  return !e.getArray().find(function (e) {
                    return Ce(e, t) && e.type === t.type;
                  });
                });
            },
          },
          {
            key: 'unstoreOverflowed',
            value: function () {
              ft.hasKey(this.overflowedKey) &&
                ((this.data = ft.get(this.overflowedKey) || {}),
                t(f(i.prototype), 'save', this).call(this),
                ft.remove(this.overflowedKey),
                this.onchange());
            },
          },
          {
            key: 'resetOverflowed',
            value: function () {
              ft.hasKey(this.overflowedKey) &&
                '{}' !== JSON.stringify(ft.get(this.overflowedKey)) &&
                (ft.put(this.overflowedKey, {}), this.onchange());
            },
          },
          {
            key: 'removeOverflowed',
            value: function (e) {
              var n = ft.get(this.overflowedKey) || {},
                r = t(f(i.prototype), 'key', this).call(this, e);
              n[r] && (delete n[r], ft.put(this.overflowedKey, n), this.onchange());
            },
          },
          {
            key: 'syncOverflowed',
            value: function (e) {
              var n = ft.get(this.overflowedKey) || {},
                r = t(f(i.prototype), 'key', this).call(this, e);
              n[r] && (this.add(n[r]), this.removeOverflowed(n[r]));
            },
          },
          {
            key: 'loadFromCloud',
            value: function () {
              var e = this,
                n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              if (vt.get('user')) {
                var r = (!n && ft.get(''.concat(this.ident, '_ts'))) || 0;
                Xt('/users/v3/favs', { cache: !1, qs: { storeTs: r, checkTypes: !0 } })
                  .then(function (n) {
                    if (304 !== n.status) {
                      var r = (n && n.data) || [];
                      (e.storeOverflowed(e.data),
                        e.reset(),
                        r.forEach(function (t) {
                          e.checkAndStore(t.id, t);
                        }),
                        t(f(i.prototype), 'save', e).call(e),
                        t(f(i.prototype), 'updateTimestamp', e).call(e),
                        e.checkAlerts(),
                        e.emitChange());
                    }
                  })
                  .catch(function (e) {
                    Ye('favs', 'Unable to load favs', e);
                  });
              }
            },
          },
          { key: 'debouncedUpdate', value: function (e) {} },
          {
            key: 'setAlertProps',
            value: function (e, n) {
              var r = this.data[t(f(i.prototype), 'key', this).call(this, e)];
              r
                ? ((r.alertProps = n), this.onchange(), t(f(i.prototype), 'save', this).call(this))
                : Ye('favExtended', 'Missing fav in setAlertProps ' + JSON.stringify(e));
            },
          },
          {
            key: 'createSyncError',
            value: function (e, t, n) {
              (dn.emit('cloudSync', 'error', { data: t, action: e, type: 'fav' }),
                Ye('favs', ''.concat(e, ' fav failed: ').concat(JSON.stringify(t)), n));
            },
          },
          {
            key: 'checkAlert',
            value: function (e, t) {
              var n = this;
              return new Promise(function (i) {
                Xt('/users/v3/alerts/'.concat(e.id, '/check'), { cache: !1 }).then(function (r) {
                  var o = r.data,
                    a = !1;
                  if ('status' in o && 'missing' === o.status) {
                    if (t)
                      return new Promise(function (t) {
                        setTimeout(function () {
                          (n.checkAlert(e, !1), t());
                        }, 5e3);
                      });
                    n.remove(e.id);
                  } else {
                    var s = o.alert,
                      l = ('timestamps' in o && o.timestamps) || [];
                    ((a = l.length > 0),
                      n.setAlertProps(e, {
                        suspended: s.suspended,
                        checked: Date.now(),
                        seen: 0,
                        triggered: a,
                        timestamps: l,
                      }));
                  }
                  return i();
                });
              });
            },
          },
          {
            key: 'onAlertsChecked',
            value: function (e) {
              ((this.triggeredAlerts = e.filter(function (e) {
                return e.alertProps && e.alertProps.triggered;
              }).length),
                this.emit('alertsChecked', this.triggeredAlerts));
            },
          },
          {
            key: 'checkAndStore',
            value: function (e, t) {
              ve(t) &&
                (t.type || (t.type = 'fav'),
                t.title || (t.title = ''.concat(t.lat, ', ').concat(t.lon)),
                this.types.includes(t.type) && (this.data[e] = t));
            },
          },
          {
            key: 'storeOverflowed',
            value: function (e) {
              ft.hasKey(this.overflowedKey) || (ft.put(this.overflowedKey, e), this.onchange());
            },
          },
          {
            key: 'addOverflowed',
            value: function (e) {
              var n = ft.get(this.overflowedKey) || {},
                r = t(f(i.prototype), 'key', this).call(this, e);
              n[r] || ((n[r] = e), ft.put(this.overflowedKey, n), this.onchange());
            },
          },
          {
            key: 'onUserData',
            value: function (e) {
              var t = this;
              e
                ? this.loadFromCloud()
                : (this.unstoreOverflowed(),
                  ft.remove(''.concat(this.ident, '_ts')),
                  vt.on(
                    'user',
                    function () {
                      return t.loadFromCloud(!0);
                    },
                    this,
                  ));
            },
          },
        ]),
        i
      );
    })(Zl),
    Jl = new Xl(),
    Ql = null,
    Kl = function (e, t) {
      return t.filter(function (t) {
        return t.errorId !== e;
      });
    },
    $l = function () {
      var e = He('#menu-warning-badge');
      if (e) {
        var t = vt.get('unresolvedErrors').length > 0;
        e.style.display = t ? 'block' : 'none';
      }
    },
    ec = function (e) {},
    tc = function (e) {
      var t = vt.get('unresolvedErrors');
      ((t = Kl(e, t)), vt.set('unresolvedErrors', t, { forceChange: !0 }), $l());
    };
  function nc(e) {
    switch (e.category) {
      case 'location':
        'LOC_1' === e.errorId
          ? (function (e) {
              if (!Ql) return;
              Ql.isGpsEnabled().then(
                function (t) {
                  t && 'authorized' === t.status && tc(e.errorId);
                },
                function (e) {
                  Ye('ShowableErrorsService', 'ShowableErrorsService checkLocationServices error', e);
                },
              );
            })(e)
          : 'WIDGET_NOTIFICATION_1' === e.errorId
            ? (function (e) {
                if (!Ql) return;
                Ql.getBackgroundLocationPermission().then(
                  function (t) {
                    t && 'authorized' === t.status && tc(e.errorId);
                  },
                  function (e) {
                    Ye('ShowableErrorsService', 'ShowableErrorsService checkNotificationServicesForWidgets error', e);
                  },
                );
              })(e)
            : (function (e) {
                if (!Ql) return;
                Ql.getLocationPermnissions().then(
                  function (t) {
                    t && 'authorized' === t.status && tc(e.errorId);
                  },
                  function (e) {
                    Ye('ShowableErrorsService', 'ShowableErrorsService checkLocationServices error', e);
                  },
                );
              })(e);
        break;
      case 'notification':
        'WIDGET_NOTIFICATION_1' === e.errorId
          ? (function (e) {
              if (!Ql) return;
              Ql.getWidgetNotificationPermissions().then(
                function (t) {
                  t && 'authorized' === t.status && tc(e.errorId);
                },
                function (e) {
                  Ye('ShowableErrorsService', 'ShowableErrorsService checkNotificationServicesForWidgets error', e);
                },
              );
            })(e)
          : (function (e) {
              if (!Ql) return;
              Ql.getNotificationPermnissions().then(
                function (t) {
                  t && 'authorized' === t.status && tc(e.errorId);
                },
                function (e) {
                  Ye('ShowableErrorsService', 'ShowableErrorsService chechNotificationSercices error', e);
                },
              );
            })(e);
        break;
      case 'iCloud':
        Jl.emit('favsChanged');
        break;
      case 'battery':
        !(function (e) {
          if (!Ql) return;
          Ql.getBatteryUsagePermissions().then(
            function (t) {
              t && 'authorized' === t.status && tc(e.errorId);
            },
            function (e) {
              Ye('ShowableErrorsService', 'ShowableErrorsService checkBatteryServices error', e);
            },
          );
        })(e);
    }
  }
  (('android' === E
    ? [
        { errorId: 'BATTERY_1', category: 'battery' },
        { errorId: 'BACKGROUND_LOCATION_1', category: 'location' },
        { errorId: 'WIDGET_NOTIFICATION_1', category: 'notification' },
      ]
    : []
  ).forEach(ec),
    vt.on('user', $l));
  var ic = Object.freeze({
      __proto__: null,
      add: ec,
      checkError: nc,
      close: function (e) {
        var t = vt.get('unresolvedErrors'),
          n = vt.get('closedErrors');
        ((t = Kl(e, t)),
          n.push(e),
          vt.set('unresolvedErrors', t, { forceChange: !0 }),
          vt.set('closedErrors', n, { forceChange: !0 }),
          $l());
      },
      getUnresolvedErrors: function () {
        return vt.get('unresolvedErrors');
      },
      resolve: tc,
      resolveCategory: function (e) {
        var t = vt.get('unresolvedErrors');
        ((t = t.filter(function (t) {
          return t.category !== e;
        })),
          vt.set('unresolvedErrors', t, { forceChange: !0 }),
          $l());
      },
    }),
    rc = function () {
      var e = vt.get('ipLocation'),
        t = vt.get('gpsLocation');
      return e && t
        ? e.ts > t.ts
          ? e
          : t
        : t ||
            e || {
              lat: 0,
              lon: (-1 * new Date().getTimezoneOffset()) / 4,
              cc: 'us',
              source: 'fallback',
              zoom: 3,
              name: '',
              ts: Date.now(),
            };
    },
    oc = function () {
      var e =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : { enableHighAccuracy: 'android' === I, timeout: 7e3 },
        t = function (e, t) {
          var n = { lat: t.coords.latitude, lon: t.coords.longitude, source: 'gps', ts: Date.now() };
          (vt.set('gpsLocation', n), dn.emit('newLocation', n), e(n));
        },
        n = function (e, t) {
          t.message;
          e(rc());
        },
        i = null;
      return i
        ? new Promise(function (r) {
            i.getCurrentPosition(e).then(t.bind(null, r)).catch(n.bind(null, r));
          })
        : navigator.geolocation
          ? new Promise(function (i) {
              navigator.geolocation.getCurrentPosition(t.bind(null, i), n.bind(null, i), e);
            })
          : Promise.resolve(rc());
    },
    ac = function (e, t) {
      return ''.concat(parseFloat(e).toFixed(2), ', ').concat(parseFloat(t).toFixed(2));
    },
    sc = function (e, t, n, i, r) {
      n && ((n = n.toLowerCase()), vt.set('country', n));
      var o = { ts: Date.now(), source: r, lat: parseFloat(e), lon: parseFloat(t), name: i || ac(e, t) };
      (vt.set('ipLocation', o), dn.emit('newLocation', o));
    };
  try {
    var lc,
      cc = He('meta[name="geoip"]');
    if (cc && cc.content && (lc = cc.content.split(','))) {
      var uc = w(lc, 5),
        dc = uc[1],
        hc = uc[2],
        fc = uc[3],
        mc = uc[4];
      sc(dc, hc, fc, mc, 'meta');
    } else
      Xt('/services/umisteni')
        .then(function (e) {
          var t = e.data;
          t && t.ll && t.ll.length && sc(t.ll[0], t.ll[1], t.country, t.city, 'api');
        })
        .catch(function (e) {
          Ye('geolocation', 'Unable to load/parse geoloc JSON', e);
        });
  } catch (e) {
    Ye('geolocation', 'Module initialization failed', e);
  }
  var pc,
    vc = function (e) {
      var t = vt.get('startUp'),
        n = Date.now(),
        i = vt.get('homeLocation');
      if ('last' === t) {
        var r = vt.get('startUpLastPosition');
        if (r) return void e(S(S({}, r), {}, { ts: n, source: 'last' }));
      }
      if ('location' === t && i) e(i);
      else if ('ip' === t) {
        var o = rc();
        'fallback' === o.source || n - o.ts > 432e5 ? dn.once('newLocation', e) : e(o);
      } else {
        var a = vt.get('gpsLocation');
        a && 'gps' === a.source && n - a.ts < 9e5 ? e(a) : oc().then(e);
      }
    },
    gc = Object.freeze({
      __proto__: null,
      getFallbackName: ac,
      getGPSlocation: oc,
      getHomeLocation: vc,
      getMyLatestPos: rc,
    }),
    yc = L.TileLayer.extend({
      seaColorL: 128,
      getTempCtx: function () {
        if (!this.ctx) {
          var e = document.createElement('canvas');
          this.ctx = e.getContext('2d', { desynchronized: !0, willReadFrequently: !0 });
        }
        return this.ctx;
      },
      createTile: function (e, t) {
        return this.createImageTile(e, t);
      },
      createImageTile: function (e, t) {
        var n = this,
          i = this.getTempCtx(),
          r = document.createElement('img');
        r.setAttribute('role', 'presentation');
        var o = document.createElement('img');
        return (
          (o.onload = function () {
            var e = o.width,
              a = document.createElement('canvas');
            ((a.width = e), (a.height = e));
            var s = a.getContext('2d');
            if (s && i) {
              ((i.canvas.width = e), (i.canvas.height = e), i.drawImage(o, 0, 0));
              var l = i.getImageData(0, 0, e, e),
                c = s.createImageData(e, e),
                u = l.data,
                d = c.data;
              u.length;
              var h,
                f,
                m = function (e, t) {
                  return (
                    (e = Math.min(Math.max(0, e), 255)),
                    (t = Math.min(Math.max(0, t), 255)),
                    u[(t << 10) + (e << 2) + 3]
                  );
                },
                p = 1200,
                v = 1024,
                g = 255,
                y = 7,
                w = y + v,
                b = w + v,
                T = 1028;
              for (f = 1; f < g; f++) {
                var E = u[w - 4],
                  S = u[w],
                  _ = u[(w += 4)],
                  A = E + S + _;
                for (h = 1; h < g; h++) {
                  var P = A + u[y] + u[b];
                  ((d[T++] = n.seaColorL),
                    (d[T++] = n.seaColorL),
                    (d[T++] = n.seaColorL),
                    (d[T++] = P > p ? 0 : g),
                    (y += 4),
                    (b += 4),
                    (A -= E),
                    (E = S),
                    (S = _),
                    (A += _ = u[(w += 4)]));
                }
                ((T += 8), (y += 8), (w += 4), (b += 8));
              }
              for (T = 0, h = 0; h < 256; h++) {
                var k = m(h - 1, 0) + (m(h, 0) << 1) + m(h + 1, 0) + m(h, 1);
                ((d[T++] = n.seaColorL), (d[T++] = n.seaColorL), (d[T++] = n.seaColorL), (d[T++] = k > p ? 0 : g));
              }
              for (T = 261120, h = 0; h < 256; h++) {
                var C = m(h - 1, g) + (m(h, g) << 1) + m(h + 1, g) + m(h, 254);
                ((d[T++] = n.seaColorL), (d[T++] = n.seaColorL), (d[T++] = n.seaColorL), (d[T++] = C > p ? 0 : g));
              }
              for (T = v, f = 1; f < g; f++) {
                var O = m(0, f - 1) + (m(0, f) << 1) + m(1, f) + m(0, f + 1);
                ((d[T++] = n.seaColorL),
                  (d[T++] = n.seaColorL),
                  (d[T++] = n.seaColorL),
                  (d[T++] = O > p ? 0 : g),
                  (T += 1020));
              }
              for (T = 2044, f = 1; f < g; f++) {
                var L = m(g, f - 1) + m(254, f) + (m(g, f) << 1) + m(g, f + 1);
                ((d[T++] = n.seaColorL),
                  (d[T++] = n.seaColorL),
                  (d[T++] = n.seaColorL),
                  (d[T++] = L > p ? 0 : g),
                  (T += 1020));
              }
              (i.putImageData(c, 0, 0), s.putImageData(c, 0, 0), (r.src = a.toDataURL()));
            }
            t(void 0, r);
          }),
          (o.onerror = function (e) {
            n._tileOnError(t, r, e);
          }),
          (o.crossOrigin = ''),
          (o.src = this.getTileUrl(e)),
          r
        );
      },
      createCanvasTile: function (e, t) {
        var n = this,
          i = this.getTempCtx(),
          r = document.createElement('canvas');
        r.setAttribute('role', 'presentation');
        var o = document.createElement('img');
        return (
          (o.onload = function () {
            var e = r.getContext('2d');
            if (e && i) {
              var a = o.width;
              ((r.width = a), (r.height = a), (i.canvas.width = a), (i.canvas.height = a), i.drawImage(o, 0, 0));
              for (
                var s = i.getImageData(0, 0, a, a),
                  l = e.createImageData(a, a),
                  c = s.data,
                  u = l.data,
                  d = c.length,
                  h = 0;
                h < d;
              )
                ((u[h++] = n.seaColorL), (u[h++] = n.seaColorL), (u[h++] = n.seaColorL), (u[h] = 255 - c[h++]));
              e.putImageData(l, 0, 0);
            }
            t(void 0, r);
          }),
          (o.onerror = function (e) {
            n._tileOnError(t, r, e);
          }),
          (o.crossOrigin = ''),
          (o.src = this.getTileUrl(e)),
          r
        );
      },
    }),
    wc =
      (L.TileLayerMulti.extend({
        initialize: function (e, t) {
          var n;
          L.TileLayer.prototype.initialize.call(this, void 0, t);
          var i = null !== (n = this.options.minZoom) && void 0 !== n ? n : 3;
          for (var r in ((this._tileDefsBase = {}), (this._tileDefsPatch = {}), (this._patch = {}), e)) {
            var o = parseInt(r, 10),
              a = e[o],
              s = null,
              l = null;
            for (
              a.patchUrl && Array.isArray(a.patch) && ((s = this._fixTileDef({ url: a.patchUrl })), (l = a.patch)),
                a = this._fixTileDef(a);
              i <= o;
              i++
            )
              ((this._tileDefsBase[i] = a),
                l && ((this._tileDefsPatch[i] = s), (this._patch[i] = this._convertPatchToZoom(l, i))));
          }
          this._tileDefs = this._tileDefsBase;
        },
        getTileUrl: function (e) {
          var t = this._getZoomForUrl(),
            n = this._patch && this._patch[t];
          return (
            (this._tileDefs = this._tileDefsBase),
            n && e.x >= n[0] && e.y >= n[1] && e.x < n[2] && e.y < n[3] && (this._tileDefs = this._tileDefsPatch),
            L.TileLayerMulti.prototype.getTileUrl.call(this, e)
          );
        },
        _convertPatchToZoom: function (e, t) {
          var n = t - e[4];
          if (0 === n) return e;
          for (var i = [], r = 0; r < 4; r++) n > 0 ? i.push(e[r] << n) : i.push(e[r] >> -n);
          return (i.push(t), i);
        },
      }),
      ['vn', 'in'].includes(vt.get('country'))),
    bc = function (e) {
      var t = te ? '-retina' : '';
      return {
        graymap: ''.concat(D, '/tiles/v10.0/darkmap').concat(t, '/{z}/{x}/{y}.png'),
        simplemap: ''.concat(D, '/tiles/v10.0/simple').concat(t, '/{z}/{x}/{y}.png'),
        landmaskmap: ''.concat(D, '/tiles/v9.0/grayland/{z}/{x}/{y}.png'),
        graymapPatch5: ''.concat(D, '/tiles/v10.0/').concat(e, '/darkmap').concat(t, '/{z}/{x}/{y}.png'),
        graymapPatch11: ''.concat(D, '/tiles/v10.0/').concat(e, '/darkmap').concat(t, '/{z}/{x}/{y}.png'),
        simplemapPatch5: ''.concat(D, '/tiles/v10.0/').concat(e, '/simple').concat(t, '/{z}/{x}/{y}.png'),
        simplemapPatch9: ''.concat(D, '/tiles/v10.0/').concat(e, '/simple').concat(t, '/{z}/{x}/{y}.png'),
        sznmap: ''.concat(D, '/v1/maptiles/outdoor/').concat(t ? '256%402x' : '256', '/{z}/{x}/{y}/?lang=en'),
        winter: ''.concat(D, '/v1/maptiles/winter/256/{z}/{x}/{y}/?lang=en'),
        satLocal: ''.concat(D, '/tiles/orto/v1.0/{z}/{z}-{x}-{y}.jpg'),
        sat: ''.concat(M, '/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/jpg'),
      };
    };
  function Tc(e) {
    var t = vt.get('map'),
      n = 'basemap-layer',
      i = vt.get('overlay'),
      r = null,
      o = null;
    ('hi' !== vt.get('usedLang') && 'in' !== vt.get('country')) || ((r = 'in'), (o = [44, 24, 50, 28, 6]));
    var a,
      s = bc(r);
    return (
      (a =
        'sat' === t
          ? { 13: { url: s.satLocal }, 18: { url: s.sat, subdomains: '1234' } }
          : { 18: { url: s[t] || s.sznmap } }),
      ('map' !== i || wc) &&
        (o
          ? ((a[11] = { url: s.graymap, patchUrl: s.graymapPatch11, patch: o }),
            'satellite' === i
              ? ((a[5] = { url: s.simplemapPatch5 }),
                (a[9] = { url: s.simplemap, patchUrl: s.simplemapPatch9, patch: o }))
              : (a[5] = { url: s.graymapPatch5 }))
          : ((a[11] = { url: s.graymap }), 'satellite' === i && (a[9] = { url: s.simplemap }))),
      pc && e.removeLayer(pc),
      (pc = L.tileLayer(s.graymap, {
        detectRetina: !1,
        minZoom: 3,
        maxZoom: 11,
        updateWhenIdle: !!ee,
        updateWhenZooming: !1,
        className: n,
        keepBuffer: ee ? 1 : 4,
      })),
      (document.body.dataset.map = t),
      pc.addTo(e),
      pc
    );
  }
  var Ec = {
    icon: L.divIcon({
      className: 'icon-dot',
      html: '<div class="pulsating-icon"></div>',
      iconSize: [10, 10],
      iconAnchor: [5, 5],
    }),
    pulsatingIcon: L.divIcon({
      className: 'icon-dot',
      html: '<div class="pulsating-icon repeat"></div>',
      iconSize: [10, 10],
      iconAnchor: [5, 5],
    }),
    myLocationIcon: L.divIcon({
      className: 'icon-dot mylocation',
      html: '<div class="pulsating-icon repeat"></div>',
      iconSize: [10, 10],
      iconAnchor: [5, 5],
    }),
    webcamIcon: L.divIcon({ className: 'iconfont icon-webcam', iconSize: [10, 10], iconAnchor: [5, 5] }),
    pulsatingWebcamIcon: L.divIcon({
      className: 'iconfont icon-webcam',
      html: '<div class="pulsating-icon repeat"></div>',
      iconSize: [10, 10],
      iconAnchor: [5, 5],
    }),
  };
  ((L.GridLayer.prototype.options.zIndex = void 0),
    (L.Icon.Default.prototype.options.imagePath = 'https://www.windy.com/img/leaflet/'));
  var Sc = 0,
    _c = vt.get('startUp'),
    Ac =
      void 0 !== (null == Vl ? void 0 : Vl.lat)
        ? Vl
        : 'location' === _c
          ? vt.get('homeLocation') || { lat: 50, lon: 14 }
          : 'last' === _c
            ? vt.get('startUpLastPosition')
            : rc(),
    Pc = 3,
    kc = {
      zoomControl: !1,
      keyboard: !1,
      worldCopyJump: !0,
      zoomAnimationThreshold: 3,
      fadeAnimation: !1,
      center: [+Ac.lat, +Ac.lon],
      zoom: null !== (a = null == Vl ? void 0 : Vl.zoom) && void 0 !== a ? a : 'zoom' in Ac ? Ac.zoom : 5,
      minZoom: Pc,
      maxZoom: 11,
      maxBounds: [
        [-90, -720],
        [90, 720],
      ],
    },
    Cc = new L.Map('leaflet-map', kc);
  function Oc(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      n = e.zoom ? Oe(e.zoom, Pc, 20) : Cc.getZoom();
    if (e.paddingLeft || e.paddingTop) {
      var i = e.paddingLeft || 0,
        r = e.paddingTop || 0,
        o = Cc.project([e.lat, e.lon], n).subtract([i / 2, r / 2]),
        a = Cc.unproject(o, n);
      Cc.setView(a, n, { animate: t });
    } else Cc.setView([e.lat, e.lon], n, { animate: t });
  }
  function Lc(e, t, n) {
    var i = Cc.getZoom(),
      r = Cc.getSize().y,
      o = Cc.project([t, n], i).subtract([0, e - r / 2]),
      a = Cc.unproject(o, i);
    Cc.setView(a, i, { animate: !1 });
  }
  'source' in Ac &&
    'fallback' === Ac.source &&
    dn.once('newLocation', function (e) {
      ((e.zoom = 5), Oc(e, !0));
    });
  var Ic,
    Rc,
    xc = null;
  function Nc(e) {
    (e &&
      !xc &&
      jl.graticule.load.call(jl.graticule).then(function () {
        xc = new L.LatLngGraticule().addTo(Cc);
      }),
      !e && xc && (Cc.removeLayer(xc), (xc = null)));
  }
  function Mc() {
    var e = Cc.getCenter(),
      t = Math.round(Cc.getZoom());
    (vt.set('mapCoords', { source: 'maps', lat: e.lat, lon: e.wrap().lng, zoom: t }),
      t !== Sc && (p(/zoom\d+/, 'zoom'.concat(t)), (Sc = t)));
  }
  var Dc = bc().landmaskmap;
  Mc();
  var Uc = Tc(Cc);
  (Nc(vt.get('graticule')),
    Cc.on('moveend', Mc),
    dn.on('maps-zoomIn', Cc.zoomIn, Cc),
    dn.on('maps-zoomOut', Cc.zoomOut, Cc),
    dn.on('updateBasemap', function () {
      return Tc(Cc);
    }),
    vt.on('map', function () {
      return Tc(Cc);
    }),
    vt.on('graticule', Nc),
    el.on('toggleSeaMask', function (e) {
      e && !Ic
        ? (Ic = L.tileLayer(Dc, {
            minZoom: 3,
            maxZoom: 11,
            updateWhenIdle: !!ee,
            updateWhenZooming: !1,
            keepBuffer: ee ? 1 : 4,
          }).addTo(Cc))
            .getContainer()
            .classList.add('sea-mask-layer')
        : !e && Ic && (Cc.removeLayer(Ic), (Ic = null));
    }),
    el.on('toggleLandMask', function (e) {
      var t;
      e && !Rc
        ? null ===
            (t = Rc =
              new yc(Dc, {
                minZoom: 3,
                maxZoom: 11,
                updateWhenIdle: !!ee,
                updateWhenZooming: !1,
                keepBuffer: ee ? 1 : 4,
              }).addTo(Cc)) ||
          void 0 === t ||
          null === (t = t.getContainer()) ||
          void 0 === t ||
          t.classList.add('land-mask-layer')
        : !e && Rc && (Cc.removeLayer(Rc), (Rc = null));
    }),
    vt.on('usedLang', function () {
      return Tc(Cc);
    }),
    vt.on('country', function () {
      return Tc(Cc);
    }));
  var Wc,
    Fc = bc,
    Gc = Object.freeze({
      __proto__: null,
      baseLayer: Uc,
      centerMap: Oc,
      ensurePointVisibleX: function (e, t, n) {
        var i = Cc.latLngToContainerPoint([e, t]).x;
        i < n && Cc.panBy([i - n, 0]);
      },
      ensurePointVisibleY: function (e, t, n) {
        var i = Cc.latLngToContainerPoint([e, t]).y,
          r = Cc.getSize();
        i > r.y - n && Cc.panBy([0, i - (r.y - n)]);
      },
      getMapTiles: Fc,
      map: Cc,
      markers: Ec,
      panToOffset: Lc,
    }),
    Hc = (function () {
      function e(t) {
        (m(this, e), Object.assign(this, t));
      }
      return (
        v(e, [
          {
            key: 'open',
            value: function (e) {
              var t = this,
                n = function () {
                  (t.onopen(e), (t.isOpen = !0));
                };
              if (!this.dependency) return (n(), Promise.resolve());
              var i = jl[this.dependency];
              return i.open().then(function () {
                ((t.loadedDependency = i.plugin),
                  t.loadedDependency instanceof Object &&
                    'interpolator' in t.loadedDependency &&
                    (t.interpolator = t.loadedDependency.interpolator),
                  n());
              });
            },
          },
          {
            key: 'close',
            value: function (e) {
              ((this.isOpen = !1), this.dependency) &&
                (this.onclose(), jl[this.dependency].close({ disableClosingAnimation: !0 }));
            },
          },
          {
            key: 'onopen',
            value: function (e) {
              this.loadedDependency instanceof Object &&
                'onRenderStart' in this.loadedDependency &&
                this.loadedDependency.onRenderStart(e);
            },
          },
          {
            key: 'onclose',
            value: function () {
              this.loadedDependency instanceof Object &&
                'onRenderEnd' in this.loadedDependency &&
                this.loadedDependency.onRenderEnd();
            },
          },
          {
            key: 'paramsChanged',
            value: function (e) {
              this.loadedDependency instanceof Object &&
                'paramsChanged' in this.loadedDependency &&
                this.loadedDependency.paramsChanged(e);
            },
          },
          {
            key: 'redraw',
            value: function () {
              this.loadedDependency instanceof Object &&
                'redraw' in this.loadedDependency &&
                this.loadedDependency.redraw();
            },
          },
        ]),
        e
      );
    })(),
    zc = window.WebGLRenderingContext,
    Bc = new Map([
      [zc.NO_ERROR, 'NO_ERROR'],
      [zc.INVALID_ENUM, 'INVALID_ENUM'],
      [zc.INVALID_VALUE, 'INVALID_VALUE'],
      [zc.INVALID_OPERATION, 'INVALID_OPERATION'],
      [zc.INVALID_FRAMEBUFFER_OPERATION, 'INVALID_FRAMEBUFFER_OPERATION'],
      [zc.OUT_OF_MEMORY, 'OUT_OF_MEMORY'],
      [zc.CONTEXT_LOST_WEBGL, 'CONTEXT_LOST_WEBGL'],
    ]),
    jc = ((Wc = new ArrayBuffer(2)), new DataView(Wc).setInt16(0, 256, !0), 256 === new Int16Array(Wc)[0]),
    Vc = function (e) {
      return 'a' === e.charAt(0);
    },
    Yc = function (e) {
      return 'u' === e.charAt(0) || 's' === e.charAt(0);
    },
    qc = (function () {
      function e() {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        (m(this, e),
          _(this, 'glId', 0),
          _(this, 'maxTextureSize', 0),
          _(this, 'isGlError', !1),
          _(this, 'lastGlErrorMsg', ''),
          (this.id = e.newId++),
          (this.keepRefs = t),
          (this.keepRefsShaders = n),
          this.reset());
      }
      return (
        v(
          e,
          [
            {
              key: 'reset',
              value: function () {
                ((this.framebuffers = []),
                  (this.buffers = []),
                  (this.shaders = []),
                  (this.programs = []),
                  (this.textures = []),
                  (this._gl = null),
                  (this.glId = 0),
                  (this.canvas = null));
              },
            },
            {
              key: 'create',
              value: function (t, n, i) {
                if (((this._name = i), !this._gl && !this.canvas))
                  return (
                    (this.canvas = t),
                    (this._gl = t.getContext('webgl', n) || t.getContext('experimental-webgl', n)),
                    this._gl &&
                      ((this.glId = e.newGlId++), (this.maxTextureSize = this._gl.getParameter(zc.MAX_TEXTURE_SIZE))),
                    this._gl
                  );
              },
            },
            {
              key: 'isInvalid',
              value: function () {
                return !(this._gl && this.canvas);
              },
            },
            {
              key: 'gl',
              value: function () {
                return this._gl;
              },
            },
            {
              key: 'get',
              value: function () {
                return this.gl();
              },
            },
            {
              key: 'getCanvas',
              value: function () {
                return this.canvas;
              },
            },
            {
              key: 'createShader',
              value: function (e, t, n) {
                var i = this.gl();
                if (!i) return null;
                var r = i.createShader(t ? i.VERTEX_SHADER : i.FRAGMENT_SHADER);
                if (
                  r &&
                  (this.keepRefsShaders && this.shaders.push(r),
                  i.shaderSource(r, e),
                  i.compileShader(r),
                  !i.getShaderParameter(r, i.COMPILE_STATUS))
                ) {
                  var o = i.getShaderInfoLog(r) || 'getShaderInfoLog is null',
                    a = new Error(o);
                  throw (
                    (a.contextLost = i.isContextLost()),
                    (a.isVertexShader = t),
                    (a.name = n || 'shader'),
                    (a.full =
                      'ERROR compileShader! name: '.concat(a.name, '; ') +
                      '('.concat(a.isVertexShader ? 'VS' : 'FS', '); ') +
                      '('.concat(this.getGlStatus(), '); msg: ').concat(a.message)),
                    a
                  );
                }
                return r;
              },
            },
            {
              key: 'createProgramObj',
              value: function (e, t, n, i) {
                var r = this.gl();
                if (!r) return null;
                var o,
                  a,
                  s = r.createProgram(),
                  l = { program: s },
                  c = '';
                if (!s)
                  throw (
                    ((a = new Error()).full = 'gl.createProgram() is null; name: '
                      .concat(i, '; ')
                      .concat(this.getGlStatus())),
                    a
                  );
                if ((this.keepRefs && this.programs.push(s), n && n.length > 0))
                  for (o = 0; o < n.length; o++) c += '#define ' + n[o] + '\n';
                var u = this.createShader(c + e, !0, i),
                  d = this.createShader(c + t, !1, i);
                if (!u || !d) throw (a = new Error('vertexShader or fragmentShader is null; name: ' + i));
                if (
                  (r.attachShader(s, u),
                  r.attachShader(s, d),
                  r.linkProgram(s),
                  !r.getProgramParameter(s, r.LINK_STATUS))
                ) {
                  var h = r.getProgramInfoLog(s) || 'getProgramInfoLog is null';
                  throw (
                    ((a = new Error(h)).contextLost = r.isContextLost()),
                    (a.name = i || 'shader'),
                    (a.full = 'ERROR linkProgram! name: '.concat(a.name, '; ').concat(this.getGlStatus())),
                    a
                  );
                }
                var f = r.getProgramParameter(s, r.ACTIVE_ATTRIBUTES);
                for (o = 0; o < f; o++) {
                  var m = r.getActiveAttrib(s, o);
                  if (m) {
                    var p = m.name;
                    if (!Vc(p)) throw 'Invalid attribute name "'.concat(p, '"');
                    l[p] = r.getAttribLocation(s, m.name);
                  }
                }
                var v = r.getProgramParameter(s, r.ACTIVE_UNIFORMS);
                for (o = 0; o < v; o++) {
                  var g = r.getActiveUniform(s, o);
                  if (g) {
                    var y = g.name;
                    if (!Yc(y)) throw 'Invalid uniform name "'.concat(y, '"');
                    l[y] = r.getUniformLocation(s, g.name);
                  }
                }
                return l;
              },
            },
            {
              key: 'deleteProgramObj',
              value: function (t) {
                var n;
                (e.removeFromArray(t, this.programs), null === (n = this.gl()) || void 0 === n || n.deleteProgram(t));
              },
            },
            {
              key: 'bindAttribute',
              value: function (e, t, n, i, r, o, a) {
                var s = this.gl();
                s &&
                  (s.bindBuffer(zc.ARRAY_BUFFER, e),
                  s.enableVertexAttribArray(t),
                  s.vertexAttribPointer(t, n, i, r, o, a));
              },
            },
            {
              key: 'textureFromUrlPromise',
              value: function (e, t, n, i, r, o) {
                var a = this;
                return new Promise(function (s) {
                  var l = new Image(),
                    c = a.createTexture2D(n, i, r, null, 1, 1, zc.RGBA);
                  ((l.onload = function () {
                    (a.resizeTexture2D(c, l, l.width, l.height, zc.RGBA, o), s([e, c]));
                  }),
                    (l.crossOrigin = ''),
                    (l.src = t));
                });
              },
            },
            {
              key: 'createTextureFromBase64',
              value: function (e, t, n, i, r) {
                var o = this,
                  a = new Image(),
                  s = this.createTexture2D(e, t, n, null, 1, 1, zc.RGBA);
                return (
                  (a.onload = function () {
                    o.resizeTexture2D(s, a, a.width, a.height, zc.RGBA, r);
                  }),
                  (a.src = i),
                  s
                );
              },
            },
            {
              key: 'createTexture2D',
              value: function (e, t, n, i, r, o, a, s) {
                var l = this.gl();
                if (l) {
                  var c = l.createTexture();
                  return (
                    c &&
                      (this.keepRefs && this.textures.push(c),
                      (c._width = r),
                      (c._height = o),
                      l.bindTexture(l.TEXTURE_2D, c),
                      this.setBindedTexture2DParams(e, t, n)),
                    this.resizeTexture2D(c, i, r, o, a, s)
                  );
                }
                return null;
              },
            },
            {
              key: 'resizeTexture2D',
              value: function (e, t, n, i, r, o) {
                if (!e) return e;
                var a = this.gl();
                if (((r = r || zc.RGBA), (e._width = n), (e._height = i), (e._format = r), a)) {
                  if ((a.bindTexture(zc.TEXTURE_2D, e), Array.isArray(t))) {
                    var s = n,
                      l = i;
                    a.pixelStorei(zc.UNPACK_ALIGNMENT, s > 4 ? 4 : 1);
                    for (var c = 0; c < t.length; c++) {
                      4 === s && a.pixelStorei(zc.UNPACK_ALIGNMENT, 1);
                      var u = t[c];
                      (null === u || ArrayBuffer.isView(u)
                        ? a.texImage2D(zc.TEXTURE_2D, c, r, s, l, 0, r, zc.UNSIGNED_BYTE, u)
                        : a.texImage2D(zc.TEXTURE_2D, c, r, r, zc.UNSIGNED_BYTE, u),
                        (s = Math.max(s >> 1, 1)),
                        (l = Math.max(l >> 1, 1)));
                    }
                    o = !1;
                  } else
                    null === t || ArrayBuffer.isView(t)
                      ? a.texImage2D(zc.TEXTURE_2D, 0, r, n, i, 0, r, zc.UNSIGNED_BYTE, t)
                      : a.texImage2D(zc.TEXTURE_2D, 0, r, r, zc.UNSIGNED_BYTE, t);
                  (o && a.generateMipmap(zc.TEXTURE_2D), a.bindTexture(zc.TEXTURE_2D, null));
                }
                return e;
              },
            },
            {
              key: 'deleteTexture2D',
              value: function (t) {
                var n;
                (e.removeFromArray(t, this.textures), null === (n = this.gl()) || void 0 === n || n.deleteTexture(t));
              },
            },
            {
              key: 'bindTexture2D',
              value: function (e, t, n) {
                var i = this.gl();
                i && (i.activeTexture(zc.TEXTURE0 + (t || 0)), i.bindTexture(zc.TEXTURE_2D, e), n && i.uniform1i(n, t));
              },
            },
            {
              key: 'setBindedTexture2DParams',
              value: function (e, t, n, i) {
                var r = this.gl();
                r &&
                  (r.texParameteri(zc.TEXTURE_2D, zc.TEXTURE_MIN_FILTER, e),
                  r.texParameteri(zc.TEXTURE_2D, zc.TEXTURE_MAG_FILTER, t),
                  r.texParameteri(zc.TEXTURE_2D, zc.TEXTURE_WRAP_S, n),
                  r.texParameteri(zc.TEXTURE_2D, zc.TEXTURE_WRAP_T, i || n));
              },
            },
            {
              key: 'createBuffer',
              value: function (e) {
                var t = this.gl(),
                  n = null;
                return (
                  t && (n = t.createBuffer()) && (this.keepRefs && this.buffers.push(n), this.setBufferData(n, e)),
                  n
                );
              },
            },
            {
              key: 'deleteBuffer',
              value: function (t) {
                var n;
                (e.removeFromArray(t, this.buffers), null === (n = this.gl()) || void 0 === n || n.deleteBuffer(t));
              },
            },
            {
              key: 'setBufferData',
              value: function (e, t) {
                var n = this.gl();
                n && (n.bindBuffer(zc.ARRAY_BUFFER, e), n.bufferData(zc.ARRAY_BUFFER, t, zc.STATIC_DRAW));
              },
            },
            {
              key: 'createIndexBuffer',
              value: function (e) {
                var t = this.gl(),
                  n = null;
                return (
                  t &&
                    ((n = t.createBuffer()),
                    this.keepRefs && n && this.buffers.push(n),
                    t.bindBuffer(zc.ELEMENT_ARRAY_BUFFER, n),
                    t.bufferData(zc.ELEMENT_ARRAY_BUFFER, e, zc.STATIC_DRAW)),
                  n
                );
              },
            },
            {
              key: 'createFramebuffer',
              value: function () {
                var e = null,
                  t = this.gl();
                return (t && ((e = t.createFramebuffer()), this.keepRefs && e && this.framebuffers.push(e)), e);
              },
            },
            {
              key: 'deleteFramebuffer',
              value: function (t) {
                var n;
                (e.removeFromArray(t, this.framebuffers),
                  null === (n = this.gl()) || void 0 === n || n.deleteFramebuffer(t));
              },
            },
            {
              key: 'bindFramebuffer',
              value: function (e, t) {
                var n = this.gl();
                n &&
                  (n.bindFramebuffer(zc.FRAMEBUFFER, e),
                  t && n.framebufferTexture2D(zc.FRAMEBUFFER, zc.COLOR_ATTACHMENT0, zc.TEXTURE_2D, t, 0));
              },
            },
            {
              key: 'release',
              value: function () {
                var e = this._gl;
                if (e) {
                  (e.flush(), e.finish());
                  var t,
                    n,
                    i = this.textures.length;
                  for (t = 0; t < i; t++) ((n = this.textures[t]), e.isTexture(n) && e.deleteTexture(n));
                  for (i = this.programs.length, t = 0; t < i; t++)
                    ((n = this.programs[t]), e.isProgram(n) && e.deleteProgram(n));
                  for (i = this.shaders.length, t = 0; t < i; t++)
                    ((n = this.shaders[t]), e.isShader(n) && e.deleteShader(n));
                  for (i = this.buffers.length, t = 0; t < i; t++)
                    ((n = this.buffers[t]), e.isBuffer(n) && e.deleteBuffer(n));
                  for (i = this.framebuffers.length, t = 0; t < i; t++)
                    ((n = this.framebuffers[t]), e.isFramebuffer(n) && e.deleteFramebuffer(n));
                  this.reset();
                }
              },
            },
            {
              key: 'checkGlError',
              value: function () {
                var e = !0,
                  t = 'GL CONTEXT STATUS: ';
                if (this._gl) {
                  var n = this._gl.isContextLost(),
                    i = this._gl.getError();
                  if (n) t += 'GL CONTEXT LOST!';
                  else if (i === zc.NO_ERROR) ((t += 'no error.'), (e = !1));
                  else {
                    var r = Bc.get(i);
                    t += ''.concat(r, ' (code: ').concat(i, ')!; contextLost: ').concat(n);
                  }
                } else t += 'gl is null!';
                return ((this.isGlError = e), (this.lastGlErrorMsg = t), e);
              },
            },
            {
              key: 'getGlStatus',
              value: function () {
                return (this.checkGlError(), this.lastGlErrorMsg);
              },
            },
          ],
          [
            {
              key: 'getNextPowerOf2Size',
              value: function (e) {
                return 2 << Math.floor(Math.log2(e - 1));
              },
            },
            {
              key: 'removeFromArray',
              value: function (e, t) {
                for (var n = -1, i = 0; i < t.length; i++) t[i] === e && (n = i);
                return (n > -1 && t.splice(n, 1), n);
              },
            },
          ],
        ),
        e
      );
    })();
  (_(qc, 'littleEndian', jc), _(qc, 'newId', 0), _(qc, 'newGlId', 1));
  var Zc,
    Xc,
    Jc,
    Qc,
    Kc,
    $c,
    eu,
    tu,
    nu =
      'precision highp float;\n#define GLSLIFY 1\nuniform vec4 uPars0;uniform vec4 uPars1;uniform vec4 uPars2;uniform sampler2D sTex0;uniform sampler2D sGrad;\n#ifdef CLOUDS\nuniform sampler2D sGrad2;\n#endif\n#ifdef PATT\nuniform sampler2D sPatt;\n#endif\n#ifdef PATT2\nuniform sampler2D sPatt2;\n#endif\nvarying vec4 vTc0;varying vec4 vTc1;vec4 cubicHermite4(vec4 A,vec4 B,vec4 C,vec4 D,float t){mediump vec4 a=-A*0.5+(3.0*B)*0.5-(3.0*C)*0.5+D*0.5;mediump vec4 b=A-(5.0*B)*0.5+2.0*C-D*0.5;mediump vec4 c=-A*0.5+C*0.5;mediump vec4 d=B;mediump float tt=t*t;return clamp(a*tt*t+b*tt+c*t+d,vec4(0.),vec4(1.));}float cubicHermite(vec4 X,float t){mediump float a=-X.x*.5+(3.*X.y)*.5-(3.*X.z)*.5+X.w*.5;mediump float b=X.x-(5.*X.y)*.5+2.*X.z-X.w*.5;mediump float c=-X.x*.5+X.z*.5;mediump float d=X.y;mediump float tt=t*t;return clamp(a*tt*t+b*tt+c*t+d,0.,1.);}void main(void){\n#ifdef PATT\nlowp vec4 patt=texture2D(sPatt,vTc0.zw);\n#endif\n#ifdef PATT2\nlowp vec4 patt2=texture2D(sPatt2,vTc0.zw);\n#endif\nmediump vec2 f1=fract(vTc1.xy);mediump vec2 f0=vec2(1.)-f1;mediump vec4 w4=vec4(f0.y*f0.x,f0.y*f1.x,f1.y*f0.x,f1.y*f1.x);mediump float u1=vTc0.x;mediump float u2=vTc0.x+vTc1.z;mediump float v1=vTc0.y;mediump float v2=vTc0.y+vTc1.w;lowp vec4 s11=texture2D(sTex0,vec2(u1,v1));lowp vec4 s12=texture2D(sTex0,vec2(u2,v1));lowp vec4 s21=texture2D(sTex0,vec2(u1,v2));lowp vec4 s22=texture2D(sTex0,vec2(u2,v2));float r;mediump float g;lowp float a;\n#ifdef BICUBIC\nmediump float u0=vTc0.x-vTc1.z;mediump float u3=u2+vTc1.z;mediump float v0=vTc0.y-vTc1.w;mediump float v3=v2+vTc1.w;lowp vec4 s00=texture2D(sTex0,vec2(u0,v0));lowp vec4 s01=texture2D(sTex0,vec2(u1,v0));lowp vec4 s02=texture2D(sTex0,vec2(u2,v0));lowp vec4 s03=texture2D(sTex0,vec2(u3,v0));lowp vec4 s10=texture2D(sTex0,vec2(u0,v1));lowp vec4 s13=texture2D(sTex0,vec2(u3,v1));lowp vec4 s20=texture2D(sTex0,vec2(u0,v2));lowp vec4 s23=texture2D(sTex0,vec2(u3,v2));lowp vec4 s30=texture2D(sTex0,vec2(u0,v3));lowp vec4 s31=texture2D(sTex0,vec2(u1,v3));lowp vec4 s32=texture2D(sTex0,vec2(u2,v3));lowp vec4 s33=texture2D(sTex0,vec2(u3,v3));lowp vec4 r0=vec4(s00.r,s01.r,s02.r,s03.r);lowp vec4 r1=vec4(s10.r,s11.r,s12.r,s13.r);lowp vec4 r2=vec4(s20.r,s21.r,s22.r,s23.r);lowp vec4 r3=vec4(s30.r,s31.r,s32.r,s33.r);lowp vec4 r4=cubicHermite4(r0,r1,r2,r3,f1.y);r=cubicHermite(r4,f1.x);lowp float rMax=max(max(s11.r,s12.r),max(s21.r,s22.r));lowp float rMin=min(min(s11.r,s12.r),min(s21.r,s22.r));r=clamp(r,rMin,rMax);\n#ifdef BCH\nlowp vec4 b0=vec4(s00.b,s01.b,s02.b,s03.b);lowp vec4 b1=vec4(s10.b,s11.b,s12.b,s13.b);lowp vec4 b2=vec4(s20.b,s21.b,s22.b,s23.b);lowp vec4 b3=vec4(s30.b,s31.b,s32.b,s33.b);lowp vec4 b4=cubicHermite4(b0,b1,b2,b3,f1.y);r=cubicHermite(b4,f1.x);\n#endif\n#ifdef VSIZE\nlowp vec4 g0=vec4(s00.g,s01.g,s02.g,s03.g);lowp vec4 g1=vec4(s10.g,s11.g,s12.g,s13.g);lowp vec4 g2=vec4(s20.g,s21.g,s22.g,s23.g);lowp vec4 g3=vec4(s30.g,s31.g,s32.g,s33.g);lowp vec4 gg=cubicHermite4(g0,g1,g2,g3,f1.y);g=cubicHermite(gg,f1.x);\n#endif\n#ifdef PNG\na=max(sign(dot(vec4(s11.a,s12.a,s21.a,s22.a),w4)-0.66),0.);\n#else\na=1.-max(sign(dot(vec4(s11.b,s12.b,s21.b,s22.b),w4)-0.33),0.);\n#endif\n#else\nr=dot(vec4(s11.r,s12.r,s21.r,s22.r),w4);\n#ifdef VSIZE\ng=dot(vec4(s11.g,s12.g,s21.g,s22.g),w4);\n#endif\n#ifdef PNG\n#ifdef BILIN_A\na=max(sign(dot(vec4(s11.a,s12.a,s21.a,s22.a),w4)-0.66),0.);\n#else\na=min(min(s11.a,s12.a),min(s21.a,s22.a));\n#endif\n#else\n#ifdef BILIN_A\na=1.-max(sign(dot(vec4(s11.b,s12.b,s21.b,s22.b),w4)-0.33),0.);\n#else\na=1.-max(max(s11.b,s12.b),max(s21.b,s22.b));\n#endif\n#endif\n#endif\nr=r*uPars0.x+uPars0.y;\n#ifdef LOG\nr=max(uPars2.y,pow(2.,r)+uPars2.x);\n#endif\nfloat gx=r;\n#ifdef VSIZE\ng=g*uPars0.z+uPars0.w;gx=length(vec2(r,g));\n#endif\nvec2 gradTc=vec2(gx*uPars1.x+uPars1.y,.5);lowp vec3 rgb=texture2D(sGrad,gradTc).rgb;\n#ifdef CCL\nmediump vec4 g4=vec4(s11.g,s12.g,s21.g,s22.g)*uPars0.zzzz+uPars0.wwww;lowp vec4 mr4=sign(g4-1.)-sign(g4-2.)+sign(g4-3.)-sign(g4-4.);lowp vec4 mg4=sign(g4-2.)-sign(g4-3.)+sign(g4-4.)-sign(g4-5.);lowp vec4 mb4=sign(g4-6.);lowp vec4 ma4=sign(g4-3.)-sign(g4-6.)+sign(g4-7.);lowp float mr=dot(clamp(mr4,0.,1.),w4);lowp float mg=dot(clamp(mg4,0.,1.),w4);lowp float mb=dot(clamp(mb4,0.,1.),w4);lowp float ma=dot(clamp(ma4,0.,1.),w4);lowp vec4 mask=clamp(vec4(mr,mg,mb,ma)*10.-4.5,0.,1.);lowp float add=min(dot(patt.rg,mask.rg),1.)*0.4;lowp vec2 pattM=vec2(patt.a*0.35,patt.b-0.35);lowp float mul=1.-clamp(dot(pattM,mask.ab),.0,.4);rgb=mix(rgb*mul,vec3(1.),vec3(add));\n#endif\n#ifdef CLOUDS\ng=dot(vec4(s11.g,s12.g,s21.g,s22.g),w4);g=g*uPars0.z+uPars0.w;if(g>10.)g=g*10.-90.;lowp vec4 grad2=texture2D(sGrad2,vec2(g*uPars1.z+uPars1.w,.5));lowp float pa=max(0.0,sign(patt.r+grad2.a-1.));rgb=mix(rgb,grad2.rgb,vec3(pa));\n#endif\n#ifdef RAIN\nif(r>0.1){vec4 g4=vec4(s11.g,s12.g,s21.g,s22.g)*uPars0.zzzz+uPars0.wwww;lowp vec4 k0=vec4(0.);lowp vec4 k1=vec4(1.);lowp vec4 m45=sign(g4-4.)-sign(g4-6.);lowp vec4 m07=sign(g4-7.)-sign(g4-8.);lowp vec4 m06=sign(g4-6.)-sign(g4-7.);lowp vec4 m08=sign(g4-8.)-sign(g4-9.);lowp vec4 m09=sign(g4-9.)-sign(g4-10.);lowp vec4 m10=sign(g4-10.)-sign(g4-11.);lowp vec4 m11=sign(g4-11.)-sign(g4-12.);lowp vec4 m03=sign(g4-3.)-sign(g4-4.);lowp float mr1=dot(clamp(m06,k0,k1),w4);lowp float mg1=dot(clamp(m45,k0,k1),w4);lowp float mb1=dot(clamp(m07,k0,k1),w4);lowp float ma1=dot(clamp(m08,k0,k1),w4);lowp vec4 mask1=clamp(vec4(mr1,mg1,mb1,ma1)*10.-4.5,0.,1.);lowp vec4 masked1=patt*mask1;lowp float mr2=dot(clamp(m09,k0,k1),w4);lowp float mg2=dot(clamp(m10,k0,k1),w4);lowp float mb2=dot(clamp(m11,k0,k1),w4);lowp float ma2=dot(clamp(m03,k0,k1),w4);lowp vec4 mask2=clamp(vec4(mr2,mg2,mb2,ma2)*10.-4.5,0.,1.);lowp vec4 masked2=patt2*mask2;rgb=mix(rgb,vec3(0.85,0.85,1.0),masked1.rrr*.65);rgb=mix(rgb,vec3(1.0,1.0,1.0),masked1.ggg*.55);rgb=mix(rgb,vec3(0.8,0.9,1.0),masked1.bbb*.5);rgb=mix(rgb,vec3(0.8,0.7,1.0),masked1.aaa*.6);rgb=mix(rgb,vec3(1.0,1.0,0.7),masked2.rrr*.27);rgb=mix(rgb,vec3(1.0,1.0,0.7),masked2.ggg*.50);rgb=mix(rgb,vec3(1.0,1.0,0.7),masked2.bbb*.70);rgb=mix(rgb,vec3(1.0,0.8,0.8),masked2.aaa*.9);}\n#endif\nvec3 bgColor=vec3(uPars2.z);gl_FragColor=vec4(mix(bgColor,rgb,vec3(a)),1.);}',
    iu =
      '#define GLSLIFY 1\nattribute vec2 aPos;uniform vec4 uVPars0;uniform vec4 uVPars1;uniform vec4 uVPars2;varying vec4 vTc0;varying vec4 vTc1;void main(void){gl_Position=vec4(2.*aPos.xy-1.,0.,1.);vec2 tc=aPos.xy;vTc0.xy=tc*uVPars0.xy+uVPars0.zw;vTc0.zw=tc*uVPars1.xy+uVPars1.zw;vTc1.xy=tc*uVPars2.xy+uVPars2.zw;vTc1.zw=uVPars1.zw;}',
    ru = window.WebGLRenderingContext,
    ou = 255,
    au = (function () {
      function e() {
        (m(this, e),
          dn.on('redrawLayers', this.onRedrawLayers, this),
          vt.on('visibility', this.visibilityChanged.bind(this)));
      }
      return (
        v(e, [
          {
            key: 'visibilityChanged',
            value: function (e) {
              e || this.reset();
            },
          },
          {
            key: 'init',
            value: function () {
              try {
                if (this.initialized) return Promise.resolve(this.isReady);
                if (this.initPromise) return this.initPromise;
                this.errorCount = 0;
                var e = new qc();
                ((this.glo = e),
                  window.devicePixelRatio >= 2 ? (this.edgeSize = 512) : (this.edgeSize = 256),
                  (this.canvas = document.createElement('canvas')),
                  this.canvas.addEventListener('webglcontextlost', function () {
                    Ye(
                      'TileRenderer',
                      'Canvas context is lost, overlay='.concat(vt.get('overlay'), ', poi=').concat(vt.get('pois')),
                    );
                  }),
                  this.canvas.addEventListener('webglcontextrestored', function () {
                    Ye(
                      'TileRenderer',
                      'Canvas context is restored, overlay='.concat(vt.get('overlay'), ', poi=').concat(vt.get('pois')),
                    );
                  }),
                  this.canvas.addEventListener('webglcontextcreationerror', function (e) {
                    Ye(
                      'TileRenderer',
                      'Canvas context creation error: '
                        .concat(e.statusMessage || 'Unknown error', ', overlay=')
                        .concat(vt.get('overlay'), ', poi=')
                        .concat(vt.get('pois')),
                    );
                  }),
                  (this.canvas.width = this.edgeSize),
                  (this.canvas.height = this.edgeSize));
                try {
                  e.create(
                    this.canvas,
                    {
                      antialias: !1,
                      depth: !1,
                      stencil: !1,
                      alpha: !0,
                      premultipliedAlpha: !0,
                      preserveDrawingBuffer: !0,
                      desynchronized: !0,
                    },
                    'TileRendererCtx',
                  ) || ++this.errorCount;
                } catch (e) {
                  ++this.errorCount;
                }
                return this.errorCount
                  ? ((this.initialized = !0), Promise.resolve(this.isReady))
                  : ((this.initPromise = this.onWebGlInit(e)), this.initPromise);
              } catch (e) {
                return ((this.initialized = !0), Promise.resolve(!1));
              }
            },
          },
          {
            key: 'processTile',
            value: function (e, t, n, i) {
              var r = this;
              return vt.get('disableWebGL')
                ? Promise.resolve(!1)
                : new Promise(function (o) {
                    r.init()
                      .then(function (a) {
                        r.testPerformed || ((r.testOk = r.usabilityTest()), (r.testPerformed = !0));
                        var s = !1;
                        (a && r.testOk && (t.classList.add('leaflet-tile-loaded'), (s = r.renderTile(e, t, n, i))),
                          o(s));
                      })
                      .catch(function (e) {
                        ((r.isReady = !1), o(!1));
                      });
                  });
            },
          },
          {
            key: 'reset',
            value: function () {
              ((this.initialized = !1),
                (this.testPerformed = !1),
                (this.initPromise = null),
                (this.isReady = !1),
                (this.edgeSize = 256),
                (this.lastIdent = null),
                (this.testOk = !1));
            },
          },
          {
            key: 'onRedrawLayers',
            value: function () {
              this.lastIdent = null;
            },
          },
          {
            key: 'onWebGlInit',
            value: function (e) {
              var t = this;
              ((this.vertexBufferRect = e.createBuffer(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]))),
                (this.srcTexture = e.createTexture2D(
                  ru.NEAREST,
                  ru.NEAREST,
                  ru.CLAMP_TO_EDGE,
                  null,
                  512,
                  512,
                  ru.RGBA,
                )),
                (this.shMulti = []));
              for (var n = 0; n < 16; n++) {
                var i = ['BICUBIC'];
                (1 & n && i.push('VSIZE'),
                  2 & n && i.push('PNG'),
                  4 & n && i.push('BCH'),
                  8 & n && i.push('LOG'),
                  this.shMulti.push(this.compileShader(iu, nu, i, 'shMulti')));
              }
              var r = iu,
                o = nu;
              this.specShader = {
                ccl: this.compileShader(r, o, ['BICUBIC', 'CCL', 'PATT', 'PNG'], 'shCCL'),
                clouds: this.compileShader(r, o, ['BICUBIC', 'CLOUDS', 'PATT'], 'shClouds'),
                rain: this.compileShader(r, o, ['BICUBIC', 'RAIN', 'LOG', 'PATT', 'PATT2', 'PNG'], 'shRain'),
                cloudtop: this.compileShader(r, o, ['BILIN_A'], 'shCloudtop'),
                cbase: this.compileShader(r, o, ['PNG'], 'shCbase'),
                ptype: this.compileShader(
                  r,
                  'precision highp float;\n#define GLSLIFY 1\nuniform vec4 uPars0;uniform vec3 uCol0;uniform vec3 uCol1;uniform vec3 uCol2;uniform vec3 uCol3;uniform vec3 uCol4;uniform vec3 uCol5;uniform vec3 uCol6;uniform vec3 uCol7;uniform vec3 uCol8;uniform vec3 uCol9;uniform vec3 uCol10;uniform sampler2D sTex0;varying vec4 vTc0;varying vec4 vTc1;void main(void){float u1=vTc0.x;float u2=vTc0.x+vTc1.z;float v1=vTc0.y;float v2=vTc0.y+vTc1.w;vec4 s11=texture2D(sTex0,vec2(u1,v1));vec4 s12=texture2D(sTex0,vec2(u2,v1));vec4 s21=texture2D(sTex0,vec2(u1,v2));vec4 s22=texture2D(sTex0,vec2(u2,v2));vec2 f1=fract(vTc1.xy);vec2 f0=vec2(1.)-f1;vec4 w4=vec4(f0.y*f0.x,f0.y*f1.x,f1.y*f0.x,f1.y*f1.x);float r=dot(vec4(s11.r,s12.r,s21.r,s22.r),w4)*uPars0.x+uPars0.y;r=max(0.,pow(2.,r)-.001);vec4 g4=vec4(s11.g,s12.g,s21.g,s22.g)*uPars0.zzzz+uPars0.wwww;vec4 c0=vec4(0.);vec4 c1=vec4(1.);vec4 m01=clamp(sign(g4-1.)-sign(g4-2.),c0,c1);vec4 m02=clamp(sign(g4-2.)-sign(g4-3.),c0,c1);vec4 m03=clamp(sign(g4-3.)-sign(g4-4.),c0,c1);vec4 m04=clamp(sign(g4-4.)-sign(g4-5.),c0,c1);vec4 m05=clamp(sign(g4-5.)-sign(g4-6.),c0,c1);vec4 m06=clamp(sign(g4-6.)-sign(g4-7.),c0,c1);vec4 m07=clamp(sign(g4-7.)-sign(g4-8.),c0,c1);vec4 m08=clamp(sign(g4-8.)-sign(g4-9.),c0,c1);vec4 m09=clamp(sign(g4-9.)-sign(g4-10.),c0,c1);vec4 m10=clamp(sign(g4-10.)-sign(g4-11.),c0,c1);const float d=-.45;vec3 rgb=uCol0;rgb=mix(rgb,uCol1,vec3(max(sign(dot(m01,w4)+d),0.)));rgb=mix(rgb,uCol2,vec3(max(sign(dot(m02,w4)+d),0.)));rgb=mix(rgb,uCol3,vec3(max(sign(dot(m03,w4)+d),0.)));rgb=mix(rgb,uCol4,vec3(max(sign(dot(m04,w4)+d),0.)));rgb=mix(rgb,uCol5,vec3(max(sign(dot(m05,w4)+d),0.)));rgb=mix(rgb,uCol6,vec3(max(sign(dot(m06,w4)+d),0.)));rgb=mix(rgb,uCol7,vec3(max(sign(dot(m07,w4)+d),0.)));rgb=mix(rgb,uCol8,vec3(max(sign(dot(m08,w4)+d),0.)));rgb=mix(rgb,uCol9,vec3(max(sign(dot(m09,w4)+d),0.)));rgb=mix(rgb,uCol10,vec3(max(sign(dot(m10,w4)+d),0.)));rgb=mix(rgb,uCol0,vec3(max(sign(0.1-r),0.)));gl_FragColor=vec4(rgb,1.);}',
                  [],
                  'shPtype',
                ),
              };
              var a = this,
                s = [];
              ((this.texCCL = null),
                s.push(
                  e.textureFromUrlPromise(
                    'texCCL',
                    '/img/textures/ccl32_v4.png',
                    ru.NEAREST_MIPMAP_NEAREST,
                    ru.LINEAR,
                    ru.REPEAT,
                    !0,
                  ),
                ));
              ((this.texPType1 = null),
                s.push(
                  e.textureFromUrlPromise(
                    'texPType1',
                    '/img/textures/ptype1_v4.png',
                    ru.NEAREST_MIPMAP_NEAREST,
                    ru.LINEAR,
                    ru.REPEAT,
                    !0,
                  ),
                ));
              return (
                (this.texPType2 = null),
                s.push(
                  e.textureFromUrlPromise(
                    'texPType2',
                    '/img/textures/ptype2_v4.png',
                    ru.NEAREST_MIPMAP_NEAREST,
                    ru.LINEAR,
                    ru.REPEAT,
                    !0,
                  ),
                ),
                (this.texCRain = this.prepareRainPattern()),
                new Promise(function (e) {
                  Promise.all(s)
                    .then(function (n) {
                      (n.forEach(function (e) {
                        var n = w(e, 2),
                          i = n[0],
                          r = n[1];
                        t[i] = r;
                      }),
                        (a.initPromise = null),
                        (a.initialized = !0),
                        (a.isReady = !0),
                        e(a.isReady));
                    })
                    .catch(function () {
                      ((a.initPromise = null), (a.initialized = !0), (a.isReady = !1), e(a.isReady));
                    });
                })
              );
            },
          },
          {
            key: 'prepareRainPattern',
            value: function () {
              for (var e = 16, t = new Uint8Array(1024), n = [128, 192, 58, 0], i = 0, r = 0; r < e; r++)
                for (var o = 0; o < e; o++) for (var a = n[(1 & o) + ((1 & r) << 1)], s = 0; s < 4; s++) t[i++] = a;
              return this.glo.createTexture2D(ru.NEAREST, ru.NEAREST, ru.REPEAT, t, e, e);
            },
          },
          {
            key: 'createGradientObject',
            value: function (e) {
              try {
                var t = e.steps,
                  n = t,
                  i = 1;
                n > 2048 && (i = t / (n = 2048));
                var r = 1 << Math.round(Math.log2(n));
                r < n && (r += r);
                var o = n / ((e.max - e.min) * r),
                  a = -o * e.min,
                  s = r << 2,
                  l = e.createGradientArray(!1, !1, i);
                if (l.byteLength < s) {
                  var c = new Uint8Array(s);
                  if ((c.set(l), l.byteLength > 7)) {
                    for (var u = new Uint8Array(4), d = 0; d < 4; d++) u[d] = l[l.byteLength - 8 + d];
                    for (var h = l.byteLength - 4; h < s; h += 4) c.set(u, h);
                  }
                  l = c;
                } else l.byteLength > s && (l = new Uint8Array(l.buffer, 0, s));
                return {
                  texture: this.glo.createTexture2D(ru.LINEAR, ru.LINEAR, ru.CLAMP_TO_EDGE, l, r, 1),
                  mul: o,
                  add: a,
                };
              } catch (e) {
                0;
              }
              return null;
            },
          },
          {
            key: 'augmentRainCoverColorsWithAlpha',
            value: function (e) {
              var t = e.gradient;
              if (Array.isArray(t))
                for (var n = 0; n < t.length; n++) {
                  var i = t[n][0],
                    r = 61;
                  (i > 8 ? (r = 255) : i > 0 && (r = 61 + (255 * i) / 8), (t[n][1][3] = r));
                }
              e.colors = e.createGradientArray(!1);
            },
          },
          {
            key: 'prepareGradients',
            value: function (e) {
              if (this.lastIdent !== e.ident) {
                ((this.gradient = null), (this.gradient2 = null));
                var t = e.c;
                if (t)
                  switch ((t.getColor(), (this.gradient = this.createGradientObject(t)), e.ident)) {
                    case 'clouds':
                      (_i.rainClouds.getColor(),
                        this.augmentRainCoverColorsWithAlpha(_i.rainClouds),
                        (this.gradient2 = this.createGradientObject(_i.rainClouds)));
                      break;
                    case 'ptype':
                      var n = _i.ptype.getColor();
                      if (n) {
                        var i = 1 / 255;
                        this.ptypeColors = [];
                        for (var r = 0; r < 11; r++) {
                          var o = n.RGBA(r);
                          this.ptypeColors[r] = [i * o[0], i * o[1], i * o[2]];
                        }
                      }
                  }
                this.lastIdent = e.ident;
              }
            },
          },
          {
            key: 'compileShader',
            value: function (e, t, n, i) {
              var r = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                o = null;
              try {
                o = this.glo.createProgramObj(e, t, n, i);
              } catch (e) {
                r &&
                  (Ye('TileRenderer', "Compile shader '".concat(i, "' (is critical: ").concat(r, ') error:'), e),
                  ++this.errorCount);
              }
              return o;
            },
          },
          {
            key: 'usabilityTest',
            value: function () {
              var e = this.glo.gl(),
                t = this.edgeSize;
              if (e) {
                (e.clearColor(1, 0.5, 0.25, 0), e.clear(ru.COLOR_BUFFER_BIT));
                var n = document.createElement('canvas');
                n.width = n.height = t;
                var i = n.getContext('2d'),
                  r = null == i ? void 0 : i.createImageData(t, t);
                if (r) {
                  var o = new Uint8Array(r.data.buffer);
                  e.readPixels(0, 0, t, t, ru.RGBA, ru.UNSIGNED_BYTE, o);
                  for (var a = [255, 128, 64, 0], s = 0; s < 4; s++) {
                    var l = a[s] - r.data[16416 + s];
                    if (Math.abs(l) > 3) return !1;
                  }
                  return !0;
                }
              }
              return !1;
            },
          },
          {
            key: 'renderTile',
            value: function (e, t, n, i) {
              Date.now();
              var r = this.glo,
                o = r.gl(),
                a = this.edgeSize;
              if (!i.data) return !1;
              for (
                var s = 512,
                  l = 1 / s,
                  c = new Uint8Array(i.data.buffer),
                  u = 1028,
                  d = new Uint8Array(1048576),
                  h = 8224,
                  f = 0,
                  m = 0;
                m < 259;
                m++
              ) {
                d.set(c.subarray(h, h + u), f);
                var p = c.subarray(h + u - 4, h + u);
                (d.set(p, f + u), d.set(p, f + u + 4), m < 256 && (h += u), (f += 2048));
              }
              (r.resizeTexture2D(this.srcTexture, d, s, s, ru.RGBA), (t.width = t.height = a));
              var v = t.getContext('2d'),
                g = null == v ? void 0 : v.createImageData(a, a);
              if (!v || !g || !o) return !1;
              var y = 0.998 * l,
                w = 256 / n.trans,
                b = 0,
                T = 0;
              w < 1 && ((b = n.intX * w), (b -= Math.floor(b)), (T = n.intY * w), (T -= Math.floor(T)));
              var E = w * l;
              ((this.uVPars0 = [E, E, E * n.intX, E * n.intY]),
                (this.uVPars1 = [16, 16, y, y]),
                (this.uVPars2 = [w, w, b, T]));
              var S = e.latestParams,
                _ = S.layer,
                A = ba[_];
              if ((this.prepareGradients(A), !this.renderGlTile(r, o, S, _, A, i))) return !1;
              var P = new Uint8Array(g.data.buffer);
              return (o.readPixels(0, 0, a, a, ru.RGBA, ru.UNSIGNED_BYTE, P), v.putImageData(g, 0, 0), !0);
            },
          },
          {
            key: 'setBaseShStuff',
            value: function (e, t, n) {
              (t.viewport(0, 0, this.edgeSize, this.edgeSize),
                t.useProgram(n.program),
                e.bindAttribute(this.vertexBufferRect, n.aPos, 2, ru.FLOAT, !1, 8, 0),
                t.uniform4fv(n.uVPars0, this.uVPars0),
                t.uniform4fv(n.uVPars1, this.uVPars1),
                t.uniform4fv(n.uVPars2, this.uVPars2),
                e.bindTexture2D(this.srcTexture, 0, n.sTex0));
            },
          },
          {
            key: 'renderGlTile',
            value: function (e, t, n, i, r, o) {
              var a = 0,
                s = !1,
                l = 0;
              switch (i) {
                case 'wind':
                case 'currents':
                case 'currentsTide':
                  a += 1;
                  break;
                case 'waves':
                case 'wwaves':
                case 'swell1':
                case 'swell2':
                case 'swell3':
                  ((s = !0), (a += 4));
              }
              (n.PNGtransparency || 'png' === n.fileSuffix) && (a += 2);
              var c = [-0.001, 0, 128 / ou, 0];
              'rainLog' === r.wTransformR
                ? (a += 8)
                : r.wTransformR && r.wTransformR > 0 && ((a += 8), (c[0] = r.wTransformR));
              var u = this.specShader[i];
              u || (u = this.shMulti[a]);
              var d = o.headerPars;
              if (!u || !d) return !1;
              switch ((this.setBaseShStuff(e, t, u), i)) {
                case 'rain':
                  ((l = 0.5),
                    e.bindTexture2D(this.texPType1, 3, u.sPatt),
                    e.bindTexture2D(this.texPType2, 4, u.sPatt2));
                  break;
                case 'clouds':
                  e.bindTexture2D(this.texCRain, 3, u.sPatt);
                  break;
                case 'ptype':
                  if (((l = 0.5), this.ptypeColors)) {
                    var h = this.ptypeColors;
                    (t.uniform3fv(u.uCol0, h[0]),
                      t.uniform3fv(u.uCol1, h[1]),
                      t.uniform3fv(u.uCol2, h[2]),
                      t.uniform3fv(u.uCol3, h[3]),
                      t.uniform3fv(u.uCol4, h[4]),
                      t.uniform3fv(u.uCol5, h[5]),
                      t.uniform3fv(u.uCol6, h[6]),
                      t.uniform3fv(u.uCol7, h[7]),
                      t.uniform3fv(u.uCol8, h[8]),
                      t.uniform3fv(u.uCol9, h[9]),
                      t.uniform3fv(u.uCol10, h[10]));
                  } else {
                    var f = 1 / 255;
                    (t.uniform3fv(u.uCol0, [111 * f, 111 * f, 111 * f]),
                      t.uniform3fv(u.uCol1, [0, 208 * f, 239 * f]),
                      t.uniform3fv(u.uCol2, [0, 0, 1]),
                      t.uniform3fv(u.uCol3, [197 * f, 27 * f, 195 * f]),
                      t.uniform3fv(u.uCol4, [129 * f, 63 * f, 63 * f]),
                      t.uniform3fv(u.uCol5, [227 * f, 227 * f, 227 * f]),
                      t.uniform3fv(u.uCol6, [129 * f, 195 * f, 129 * f]),
                      t.uniform3fv(u.uCol7, [202 * f, 211 * f, 57 * f]),
                      t.uniform3fv(u.uCol8, [183 * f, 119 * f, 8 * f]),
                      t.uniform3fv(u.uCol9, [227 * f, 73 * f, 19 * f]),
                      t.uniform3fv(u.uCol10, [195 * f, 63 * f, 63 * f]));
                  }
                  break;
                case 'ccl':
                  ((l = 0.5), e.bindTexture2D(this.texCCL, 3, u.sPatt));
                  break;
                case 'cloudtop':
                  c[2] = 111 / ou;
              }
              var m = this.gradient,
                p = this.gradient2,
                v = [0, 0, 0, 0];
              (m && ((v[0] = m.mul), (v[1] = m.add), e.bindTexture2D(m.texture, 1, u.sGrad)),
                p && ((v[2] = p.mul), (v[3] = p.add), e.bindTexture2D(p.texture, 2, u.sGrad2)));
              var g = s ? [ou * d[4], d[5], 0, 0] : [ou * d[0], d[1], ou * d[2], d[3] + l];
              return (
                t.uniform4fv(u.uPars0, g),
                t.uniform4fv(u.uPars1, v),
                t.uniform4fv(u.uPars2, c),
                t.drawArrays(t.TRIANGLE_FAN, 0, 4),
                !0
              );
            },
          },
        ]),
        e
      );
    })(),
    su = new au(),
    lu = 0,
    cu = new xt(50),
    uu = K ? 3 : 6,
    du = function (e) {
      var t;
      if (
        ($c ||
          (function () {
            ((Zc = document.createElement('canvas')),
              (Xc = Zc.getContext('2d', { desynchronized: !0, willReadFrequently: !0 })));
            var e = document.createElement('canvas').getContext('webgl');
            ((Qc = (null == e ? void 0 : e.createFramebuffer()) || null),
              (Kc = (null == e ? void 0 : e.createTexture()) || null),
              Qc && Kc && (Jc = e),
              ($c = !0));
          })(),
        Jc)
      ) {
        (Jc.activeTexture(Jc.TEXTURE0),
          Jc.bindTexture(Jc.TEXTURE_2D, Kc),
          Jc.bindFramebuffer(Jc.FRAMEBUFFER, Qc),
          Jc.framebufferTexture2D(Jc.FRAMEBUFFER, Jc.COLOR_ATTACHMENT0, Jc.TEXTURE_2D, Kc, 0),
          Jc.texImage2D(Jc.TEXTURE_2D, 0, Jc.RGBA, Jc.RGBA, Jc.UNSIGNED_BYTE, e));
        var n = new Uint8Array(e.width * e.height * 4);
        (Jc.readPixels(0, 0, e.width, e.height, Jc.RGBA, Jc.UNSIGNED_BYTE, n), (t = new Uint8ClampedArray(n)));
      }
      t ||
        ((Zc.width = e.width),
        (Zc.height = e.height),
        Xc.drawImage(e, 0, 0, e.width, e.height),
        (t = Xc.getImageData(0, 0, e.width, e.height).data));
      return t;
    },
    hu = (function () {
      function e(t, n) {
        (m(this, e),
          (this.url = t),
          (this.status = 'undefined'),
          (this.data = null),
          (this.x = n.x),
          (this.y = n.y),
          (this.z = n.z),
          (this.transformR = n.transformR),
          (this.transformG = n.transformG),
          (this.transformB = n.transformB));
      }
      return (
        v(e, [
          {
            key: 'load',
            value: function () {
              var e = this;
              return (
                (this.status = 'loading'),
                (this.promise = new Promise(function (t, n) {
                  var i = new Image();
                  ((i.crossOrigin = 'Anonymous'),
                    (i.onload = function () {
                      ((e.data = du(i)), (e.status = 'loaded'));
                      var n = (function (e, t) {
                          var n,
                            i,
                            r,
                            o,
                            a = new ArrayBuffer(28),
                            s = new Uint8Array(a),
                            l = new Float32Array(a),
                            c = 4 * t * 4 + 8;
                          for (o = 0; o < 28; o++)
                            ((n = e[c]),
                              (i = e[c + 1]),
                              (r = e[c + 2]),
                              (n = Math.round(n / 64)),
                              (i = Math.round(i / 16)),
                              (r = Math.round(r / 64)),
                              (s[o] = (n << 6) + (i << 2) + r),
                              (c += 16));
                          return l;
                        })(e.data, 257),
                        r = n[0],
                        o = (n[1] - n[0]) / 255,
                        a = n[2],
                        s = (n[3] - n[2]) / 255,
                        l = n[4],
                        c = (n[5] - n[4]) / 255;
                      ((e.headerPars = [o, r, s, a, c, l]),
                        (e.decodeR = e.transformR
                          ? function (t) {
                              return e.transformR(t * o + r);
                            }
                          : function (e) {
                              return e * o + r;
                            }),
                        (e.decodeG = e.transformG
                          ? function (t) {
                              return e.transformG(t * s + a);
                            }
                          : function (e) {
                              return e * s + a;
                            }),
                        (e.decodeB = e.transformB
                          ? function (t) {
                              return e.transformB(t * c + l);
                            }
                          : function (e) {
                              return e * c + l;
                            }),
                        (lu = 0),
                        t(e));
                    }),
                    (i.onerror = function () {
                      ((e.status = 'failed'),
                        dn.emit('loadingFailed', e.url),
                        ++lu > uu && (Et(), (lu = 0)),
                        n({ message: 'Failed to load tile', url: e.url }));
                    }),
                    (i.src = e.url),
                    (i.complete || void 0 === i.complete) && ((i.src = pe), (i.src = e.url)));
                })),
                this.promise
              );
            },
          },
        ]),
        e
      );
    })(),
    fu = {
      loadTile: function (e) {
        var t = e.url,
          n = cu.get(t);
        if (!n) {
          var i = new hu(t, e);
          return (cu.put(t, i), i.load());
        }
        switch (n.status) {
          case 'loaded':
            return Promise.resolve(n);
          case 'loading':
            return n.promise;
          case 'failed':
            return (cu.remove(t), Promise.reject({ message: 'Failed to load tile', url: t }));
          default:
            return Promise.reject({ message: 'Unknown tile state', url: t });
        }
      },
    },
    mu = function (e, t) {
      var n = 256;
      e.width != n && (e.width = e.height = n);
      var i = e.getContext('2d');
      ((i.fillStyle = '#888'),
        i.fillRect(0, 0, n, n),
        (i.fillStyle = i.strokeStyle = '#BBB'),
        i.fillText('No data!', 14, 22),
        i.rect(3, 3, 250, 250),
        i.stroke());
    },
    pu = L.GridLayer.extend({
      options: {
        maxZoom: 11,
        updateWhenIdle: !!ee,
        updateWhenZooming: !1,
        keepBuffer: ee ? 1 : 4,
        disableTransformForTiles: !0,
      },
      syncCounter: 0,
      inMotion: !1,
      hasSea: !1,
      className: 'overlay-layer',
      onAdd: function (e) {
        return (
          L.GridLayer.prototype.onAdd.call(this),
          e.on('movestart', this.onMoveStart, this),
          e.on('moveend', this.onMoveEnd, this),
          vt.on('subscription', this.redrawLayer, this),
          this.on('load', this.checkLoaded, this),
          this
        );
      },
      onRemove: function (e) {
        return (
          e.off('movestart', this.onMoveStart, this),
          e.off('moveend', this.onMoveEnd, this),
          vt.off('subscription', this.redrawLayer, this),
          this.off('load', this.checkLoaded, this),
          L.GridLayer.prototype.onRemove.call(this, e),
          (this.hasSea = !1),
          document.body.classList.remove('sea'),
          el.emit('toggleSeaMask', this.hasSea),
          (this.landOnly = !1),
          document.body.classList.remove('land'),
          el.emit('toggleLandMask', this.landOnly),
          this
        );
      },
      onMoveStart: function () {
        this.inMotion = !0;
      },
      onMoveEnd: function () {
        ((this.inMotion = !1), this._loading || this.redrawFinished());
      },
      checkLoaded: function () {
        this.inMotion || this.redrawFinished();
      },
      redrawLayer: function () {
        var e = this._map,
          t = e.getPixelBounds(),
          n = t.min,
          i = t.max,
          r = n.divideBy(256)._floor(),
          o = i.divideBy(256)._floor(),
          a = L.bounds(r, o),
          s = Math.round(e.getZoom());
        if (s > 11) this.redrawFinished();
        else {
          this.removeOtherTiles(s, a);
          var l = this.sortTilesFromCenterOut(a);
          this._tilesToLoad = l.length;
          for (var c = 0; c < l.length; c++) {
            var u = l[c],
              d = this._tileCoordsToKey(u);
            d in this._tiles ? this.redrawTile(this._tiles[d]) : --this._tilesToLoad || this.redrawFinished();
          }
        }
      },
      removeOtherTiles: function (e, t) {
        var n = t.min,
          i = t.max;
        for (var r in this._tiles) {
          var o = w(r.split(':'), 3),
            a = o[0],
            s = o[1];
          (+o[2] !== e || +a < n.x || +a > i.x || +s < n.y || +s > i.y) && this._removeTile(r);
        }
      },
      redrawTile: function (e) {
        var t = this;
        e.coords = this._wrapCoords(e.coords);
        var n = al(e.coords, this.latestParams),
          i = this.syncCounter;
        fu.loadTile(n)
          .then(function (r) {
            t.renderTile.call(t, 2, e.el, i, n, r);
          })
          .catch(function (t) {
            mu(e.el, null == t || t.url);
          })
          .then(function () {
            --t._tilesToLoad || t.redrawFinished();
          });
      },
      paramsChanged: function (e) {
        (e.fullPath === this.latestParams.fullPath && e.layer === this.latestParams.layer) ||
          ((this.latestParams = we(e)), this.syncCounter++, this.redrawLayer());
      },
      sortTilesFromCenterOut: function (e) {
        var t,
          n,
          i = [],
          r = e.getCenter(),
          o = this._tileZoom;
        for (t = e.min.y; t <= e.max.y; t++)
          for (n = e.min.x; n <= e.max.x; n++) {
            var a = new L.Point(n, t);
            ((a.z = o), i.push(a));
          }
        return (
          i.sort(function (e, t) {
            return e.distanceTo(r) - t.distanceTo(r);
          }),
          i
        );
      },
      redrawFinished: function () {
        (this.latestParams.sea !== this.hasSea &&
          (h(document.body, this.latestParams.sea, 'sea'),
          (this.hasSea = Boolean(this.latestParams.sea)),
          el.emit('toggleSeaMask', this.hasSea)),
          this.latestParams.landOnly !== this.landOnly &&
            (h(document.body, this.latestParams.landOnly, 'land'),
            (this.landOnly = this.latestParams.landOnly),
            el.emit('toggleLandMask', this.landOnly)),
          el.emit('rendered', 'tileLayer'));
      },
      createTile: function (e, t) {
        var n = this;
        e = this._wrapCoords(e);
        var i = al(e, this.latestParams),
          r = L.DomUtil.create('canvas'),
          o = this.syncCounter;
        return (
          (r.width = r.height = 256),
          (r.style.width = r.style.height = '256px'),
          fu
            .loadTile(i)
            .then(function (e) {
              n.renderTile.call(n, 2, r, o, i, e);
            })
            .catch(function (e) {
              mu(r, null == e || e.url);
            })
            .then(function () {
              t(void 0, r);
            }),
          r
        );
      },
      init: function (e) {
        this.latestParams = we(e);
      },
      renderTile: function (e, t, n, i, r) {
        var o = this;
        n === this.syncCounter &&
          su.processTile(this, t, i, r).then(function (n) {
            n ||
              (function (e, t, n, i, r) {
                (eu ||
                  (eu = new Promise(function (e) {
                    jl['legacy-tile-render'].load().then(function () {
                      var t = ln('@plugins/legacy-tile-render');
                      e(t);
                    });
                  })),
                  eu.then(function (o) {
                    o.renderTile(e, t, n, i, r);
                  }));
              })(o, e, t, i, r);
          });
      },
    }),
    vu = new pu(),
    gu = (function () {
      function e(t) {
        var n;
        (m(this, e),
          _(this, 'syncCounter', 0),
          (this.loader = null !== (n = null == t ? void 0 : t.loader) && void 0 !== n ? n : fu));
      }
      return (
        v(e, [
          { key: 'tilesReady', value: function (e, t, n) {} },
          {
            key: 'getTiles',
            value: function (e) {
              var t = this,
                n = Cc.getZoom();
              if (Math.floor(n) === n) {
                this.syncCounter++;
                for (
                  var i = Cc.getPixelBounds(),
                    r = [],
                    o = i.min.x >> 8,
                    a = i.max.x >> 8,
                    s = i.min.y >> 8,
                    l = i.max.y >> 8,
                    c = s;
                  c <= l;
                  c++
                )
                  for (var u = o; u <= a; u++) {
                    var d = Je({ x: u, y: c, z: n });
                    r.push(d);
                  }
                var h = vt.get('mapCoords'),
                  f = we(h),
                  m = ol(e, n),
                  p = Cc.getSize(),
                  v = p.x,
                  g = p.y,
                  y = Object.assign(f, {
                    pixelOriginX: i.min.x,
                    pixelOriginY: i.min.y,
                    dZoom: m,
                    width: v,
                    height: g,
                    origTiles: { minX: o, minY: s, maxX: a, maxY: l },
                  }),
                  w = {},
                  b = [];
                (r.forEach(function (n) {
                  var i,
                    r = al(n, e),
                    o = r && (null === (i = t.processTile) || void 0 === i ? void 0 : i.call(t, r, e));
                  if (o && !w[o.url]) {
                    w[o.url] = 1;
                    var a = t.loader.loadTile(o);
                    b.push(a);
                  }
                }),
                  Promise.all(b).then(this.postProcess.bind(this, this.syncCounter, y, e)));
              }
            },
          },
          {
            key: 'processTile',
            value: function (e, t) {
              return e;
            },
          },
          {
            key: 'postProcess',
            value: function (e, t, n, i) {
              if (e === this.syncCounter) {
                var r = this.sortTiles(t, n, i);
                ((this.trans = 0 | il(t.zoom, t.dZoom)),
                  (this.shift = 0 | Math.log2(this.trans)),
                  (this.lShift = 0 | Math.log2(this.trans * this.trans)));
                var o = (t.pixelOriginX / this.trans) % 256,
                  a = (t.pixelOriginY / this.trans) % 256;
                (o < 0 && (o = 256 + o),
                  (this.offsetX = (o * this.trans) | 0),
                  (this.offsetY = (a * this.trans) | 0),
                  (this.offset = 2056),
                  (this.width = t.width),
                  (this.height = t.height),
                  (this.w = ul(this.trans)),
                  this.tilesReady.call(this, r, t, n));
              }
            },
          },
          {
            key: 'sortTiles',
            value: function (e, t, n) {
              for (
                var i,
                  r,
                  o = function (n, i) {
                    var r = Je({ x: n, y: i, z: e.zoom });
                    return al(r, t);
                  },
                  a = [],
                  s = e.origTiles.minY;
                s <= e.origTiles.maxY;
                s++
              ) {
                var l = o(e.origTiles.minX, s);
                if (!l || l.y !== r) {
                  i = null;
                  for (
                    var c = [],
                      u = function () {
                        var e = o(d, s);
                        if (!e || e.x === i) return 1;
                        var t = n.filter(function (t) {
                          return t.x === e.x && t.y === e.y;
                        })[0];
                        (c.push(t), (i = e.x), (r = e.y));
                      },
                      d = e.origTiles.minX;
                    d <= e.origTiles.maxX;
                    d++
                  )
                    u();
                  c.length > 0 && a.push(c);
                }
              }
              return a;
            },
          },
        ]),
        e
      );
    })(),
    yu = Object.freeze({ __proto__: null, DataTiler: gu }),
    wu = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        return (m(this, n), t.apply(this, arguments));
      }
      return (
        v(n, [
          {
            key: 'cb',
            value: function (e, t, n) {
              0;
            },
          },
          {
            key: 'createFun',
            value: function (e) {
              ((this.cb = e), this.getTiles(vu.latestParams));
            },
          },
          {
            key: 'tilesReady',
            value: function (e, t, n) {
              var i = this;
              this.cb(
                function (r) {
                  var o = r.lat,
                    a = r.lon,
                    s = Ie(a),
                    l = xe(o),
                    c = 1 << t.dZoom,
                    u = c - 1,
                    d = s * c,
                    h = l * c,
                    f = Math.floor(d),
                    m = Math.floor(h);
                  ((d -= f), (h -= m));
                  var p = (function (t, n, i) {
                      for (var r = 0; r < e.length; r++) {
                        var o = e[r];
                        if (o.length && o[0].y === n && o[0].z === i)
                          for (var a = 0; a < o.length; a++) {
                            var s = o[a];
                            if (s.x === t) return s;
                          }
                      }
                    })((f &= u), (m &= u), t.dZoom),
                    v = p && p.data;
                  if (!v) return NaN;
                  var g = 256 * d,
                    y = 256 * h,
                    w = Oe(Math.floor(g), 0, 255),
                    b = Oe(Math.floor(y), 0, 255);
                  ((g -= w), (y -= b));
                  var T = 4 * (i.offset + w + 257 * b);
                  if (n.PNGtransparency && ll(v, T)) return NaN;
                  if (n.JPGtransparency && sl(v, T)) return NaN;
                  var E = v[T],
                    S = v[T + 4],
                    _ = v[T + 1],
                    A = v[T + 5],
                    P = v[T + 2],
                    k = v[T + 6],
                    C = v[(T += 1028)],
                    O = v[T + 4],
                    L = v[T + 1],
                    I = v[T + 5],
                    R = v[T + 2],
                    x = v[T + 6],
                    N = 1 - g,
                    M = 1 - y,
                    D = M * N,
                    U = M * g,
                    W = y * N,
                    F = y * g,
                    G = E * D + S * U + C * W + O * F,
                    H = n.interpolateNearestG ? pl(null, 0, _, A, L, I, D, U, W, F) : _ * D + A * U + L * W + I * F,
                    z = P * D + k * U + R * W + x * F;
                  return [p.decodeR(G), p.decodeG(H), p.decodeB(z)];
                },
                function (t, r) {
                  var o = (r + i.offsetY) >> i.shift,
                    a = o >> 8,
                    s = o - (a << 8),
                    l = (r + i.offsetY) % i.trans,
                    c = (t + i.offsetX) >> i.shift,
                    u = c >> 8,
                    d = c - (u << 8),
                    h = (t + i.offsetX) % i.trans,
                    f = i.trans,
                    m = e && e[a] && e[a][u];
                  if (!m) return (console.warn('interpolator: Undefined dTile'), NaN);
                  var p = m.data;
                  if (!p) return (console.warn('interpolator: Undefined dTile.data'), NaN);
                  var v = (i.offset + d + (s << 8) + s) << 2;
                  if (n.PNGtransparency && ll(p, v)) return NaN;
                  if (n.JPGtransparency && sl(p, v)) return NaN;
                  var g = p[v],
                    y = p[v + 4],
                    w = p[v + 1],
                    b = p[v + 5],
                    T = p[v + 2],
                    E = p[v + 6],
                    S = p[(v += 1028)],
                    _ = p[v + 4],
                    A = p[v + 1],
                    P = p[v + 5],
                    k = p[v + 2],
                    C = p[v + 6],
                    O = (f - l) * (f - h),
                    L = (f - l) * h,
                    I = l * (f - h),
                    R = h * l,
                    x = f * f,
                    N = (g * O + y * L + S * I + _ * R) / x,
                    M = n.interpolateNearestG
                      ? pl(null, 0, w, b, A, P, O, L, I, R)
                      : (w * O + b * L + A * I + P * R) / x,
                    D = (T * O + E * L + k * I + C * R) / x;
                  return [m.decodeR(N), m.decodeG(M), m.decodeB(D)];
                },
              );
            },
          },
        ]),
        n
      );
    })(gu),
    bu = new wu(),
    Tu = (function (e) {
      s(i, e);
      var n = c(i);
      function i(e) {
        var t;
        return (
          m(this, i),
          ((t = n.call(this, e)).interpolator = bu),
          (t.paramsChanged = vu.paramsChanged.bind(vu)),
          (t.redraw = vu.redrawLayer.bind(vu)),
          t
        );
      }
      return (
        v(i, [
          {
            key: 'onopen',
            value: function (e) {
              (Cc.hasLayer(vu)
                ? vu.paramsChanged.call(vu, e)
                : (vu.init(e), vu.addTo(Cc), vu.getContainer().classList.add('overlay-layer')),
                su.init());
            },
          },
          {
            key: 'close',
            value: function (e) {
              (t(f(i.prototype), 'close', this).call(this, e),
                e.includes('tileLayer') ||
                  e.includes('daySwitcher') ||
                  e.includes('accumulations') ||
                  e.includes('noUserControl') ||
                  Cc.removeLayer.call(Cc, vu));
            },
          },
        ]),
        i
      );
    })(Hc),
    Eu = {
      tileLayer: new Tu({ ident: 'tileLayer', userControl: 'progress-bar' }),
      noUserControl: new Tu({ ident: 'noUserControl' }),
      radar: new Hc({ ident: 'radar', dependency: 'radar', userControl: 'radar' }),
      satellite: new Hc({ ident: 'satellite', dependency: 'satellite', userControl: 'satellite' }),
      capAlerts: new Hc({ ident: 'capAlerts', dependency: 'cap-alerts', userControl: 'cap-alerts' }),
      isolines: new Hc({ ident: 'isolines', dependency: 'isolines' }),
      particles:
        'desktop' !== I || 'embed2' === W.target || vt.get('disableWebGL')
          ? new Hc({ ident: 'particles', dependency: 'particles' })
          : new Hc({ ident: 'particles', dependency: 'gl-particles' }),
      map: new Hc({ ident: 'map', dependency: 'map-layers', userControl: 'map-layers' }),
      daySwitcher: new Tu({ ident: 'daySwitcher', userControl: 'day-switcher' }),
      accumulations: new Tu({ ident: 'accumulations', userControl: 'accumulations' }),
    },
    Su = Object.keys(Eu),
    _u = null,
    Au = 0,
    Pu = null,
    ku = be(function () {
      dn.emit('redrawFinished', _u);
    }, 200);
  function Cu() {
    (clearTimeout(Pu), (Pu = null));
  }
  function Ou() {
    ((Au = 0), dn.emit('redrawFinished', _u));
  }
  function Lu(e) {
    var t = vt.get('overlay'),
      n = vt.get('product'),
      i = vt.get('level');
    if ([void 0, 'overlay', 'product'].includes(e)) {
      var r = Bs(t, n);
      (r.length || Ye('params', 'Unexpected empty levels for overlay '.concat(t, ' and product ').concat(n)),
        vt.set('availLevels', r),
        h(document.body, r.length > 1, 'has-more-levels'),
        ('overlay' !== e && r.includes(i)) || ((i = r[0]), vt.set('level', i)));
    }
    var o = {
      acTime: vt.get('acTime'),
      isolines: vt.get('isolines'),
      level: i,
      overlay: t,
      path: vt.get('path'),
      product: n,
    };
    dn.emit('paramsChanged', o, e);
  }
  (dn.on('paramsChanged', function (e) {
    ((_u = e), Cu());
    var t = zs[e.overlay].layers.slice(),
      n = [];
    'off' !== e.isolines && t.unshift(''.concat(e.isolines, 'Isolines'));
    var i = t.map(function (t) {
        var i = ba[t];
        return (n.push(i.renderer), { renderer: i.renderer, params: i.getParams(e, e.product) });
      }),
      r = n
        .filter(function (e) {
          return 'userControl' in Eu[e];
        })
        .map(function (e) {
          return Eu[e].userControl;
        })[0];
    Su.forEach(function (e) {
      var t = Eu[e];
      n.indexOf(e) < 0 && t.isOpen && t.close.call(t, n);
    });
    var o = [],
      a = i.map(function (e) {
        return e.params.then(function (t) {
          var n = Eu[e.renderer];
          n.isOpen ? n.paramsChanged.call(n, t) : o.push(n.open.call(n, t));
        });
      });
    Promise.all(a).then(function () {
      var e = function () {
        r !== tu &&
          (tu && jl[tu].close({ disableClosingAnimation: !0 }),
          r && jl[r].open({ disableOpeningAnimation: !0 }),
          (tu = r));
      };
      (o.length > 0
        ? Promise.all(o)
            .then(e)
            .catch(function (t) {
              (e(), Ye('renderCtrl', 'Unable to load render', t));
            })
        : e(),
        (Au = i.length),
        (Pu = setTimeout(Ou, 5e3)));
    });
  }),
    dn.on('redrawLayers', function () {
      ((Au = 0),
        ye(Eu, function (e) {
          e.isOpen && (e.redraw(), Au++);
        }));
    }),
    Cc.on('movestart', function () {
      var e = _u && zs[_u.overlay];
      Au = e ? e.layers.length : 0;
    }),
    el.on('rendered', function () {
      --Au <= 0 && (Cu(), ku());
    }));
  var Iu = be(Lu, 100);
  function Ru() {
    ['acTime', 'level', 'isolines', 'path', 'overlay', 'product'].forEach(function (e) {
      vt.on(e, Iu.bind(null, e));
    });
  }
  function xu() {
    var e = { forceChange: !0 },
      t = vt.get('overlay'),
      n = Kn() && 'wind' === t ? vt.get('startUpOverlay') : t,
      i = vt.get('startUpLastProduct'),
      r = Kn() && i ? i : vt.get('product');
    vt.set('product', r, e)
      .then(function () {
        vt.set('overlay', n, e).then(function () {
          (Lu(), Ru());
        });
      })
      .catch(function (t) {
        (Ye('params', 'failed to launch params change', t),
          vt.set('product', 'ecmwf', e),
          vt.set('overlay', 'wind', e),
          setTimeout(function () {
            (Lu(), Ru());
          }, 500));
      });
  }
  var Nu = Ri.createVirtualCalendar.call(ko.ecmwf);
  (vt.setDefault('calendar', Nu),
    vt.setDefault('path', Nu.ts2path(Date.now())),
    vt.defineProperty('timestamp', 'syncSet', function (e) {
      'string' == typeof e && (e = parseInt(e));
      var t = vt.get('calendar');
      return (t && ((e = t.boundTs(e)), vt.set('path', t.ts2path(e))), e);
    }),
    vt.defineProperty('product', 'asyncSet', function (e) {
      return new Promise(function (t, n) {
        var i = ko[e];
        (ko[vt.get('product')].close(),
          i
            .open()
            .then(function (n) {
              (p(/product-\S+/, 'product-'.concat(e)),
                n &&
                  (vt.set('calendar', n),
                  vt.set('timestamp', Oe(vt.get('timestamp'), n.start, n.end), { forceChange: !0 })),
                i.acTimes &&
                  (vt.set('availAcTimes', i.acTimes),
                  !i.acTimes.includes(vt.get('acTime')) && i.acTimes.length > 0 && vt.set('acTime', i.acTimes[0])),
                vt.set('prefferedProduct', i.prefferedProduct),
                t(e));
            })
            .catch(n));
      });
    }));
  var Mu = function (e, t) {
    var n = zs[e],
      i = zs[t];
    (p(/overlay-\S+/, 'overlay-'.concat(e)),
      h(document.body, Boolean(n && n.hideParticles), 'hide-particles'),
      vt.set('availProducts', Ys[e]),
      i && i.onclose && i.onclose.call(i),
      n && n.onopen && n.onopen());
  };
  (vt.defineProperty('overlay', 'asyncSet', function (e) {
    var t = vt.get('overlay'),
      n = Qs(e, vt.get('product'));
    return n === vt.get('product')
      ? (Mu(e, t), Promise.resolve(e))
      : new Promise(function (i) {
          vt.set('product', n).then(function () {
            (Mu(e, t), i(e));
          });
        });
  }),
    setTimeout(function () {
      xu();
    }, 0));
  var Du = function (e) {
    return (e in jl && jl[e]) || null;
  };
  function Uu(e, t) {
    var n = Du(e);
    n && !n.neverClose && n.close({ ev: t });
  }
  function Wu(e, t) {
    var n = [];
    return (
      ye(jl, function (i, r) {
        i.pane && t.includes(i.pane) && i.isOpen && r !== e && n.push(i);
      }),
      n
    );
  }
  (dn.on('rqstOpen', function (e, t) {
    var n = e in jl ? jl[e] : null;
    if (n) {
      var i = n.pane,
        r = function (e) {
          n.open({ params: t, disableOpeningAnimation: e });
        },
        o = function (t) {
          Wu(e, t).forEach(function (e) {
            e.close({ disableClosingAnimation: !0 });
          });
        };
      if (i)
        if ('bottom' === i) (o(['bottom', 'rhpane', 'lhpane', 'top']), r());
        else if ('center' === i) (o(['lhpane', 'rhpane', 'center']), r());
        else if ('rhpane' === i || 'lhpane' === i)
          if ((o(['bottom', 'center']), jl.multimodel.close({ disableClosingAnimation: !0 }), K))
            (o(['rhpane', 'lhpane', 'nearest']), r());
          else {
            var a = Wu(e, [i]);
            a.length
              ? (r(!0),
                setTimeout(function () {
                  a[0].close({ disableClosingAnimation: !0, doNotResetURL: !0 });
                }, 100))
              : r();
          }
        else (o([i]), r());
      else r();
    } else Ye('pluginCtrl', 'Attmpt to open non existent plugin ' + e);
  }),
    dn.on('rqstClose', Uu),
    dn.on('closeAllPlugins', function (e) {
      ye(jl, function (t, n) {
        t.pane && t.isOpen && e !== n && Uu(n);
      });
    }));
  var Fu,
    Gu,
    Hu = (function () {
      function e(t) {
        var n;
        (m(this, e),
          this.initProperties(),
          (this.el = t.el),
          (this.stopPropagation = null !== (n = t.stopPropagation) && void 0 !== n && n),
          t.click && (this.click = t.click),
          this.el.addEventListener('click', this.onevent.bind(this)));
      }
      return (
        v(e, [
          { key: 'initProperties', value: function () {} },
          { key: 'click', value: function (e, t, n) {} },
          {
            key: 'onevent',
            value: function (e) {
              var t;
              if (e && (e.target instanceof HTMLElement || e.target instanceof SVGElement)) {
                var n,
                  i = e.target,
                  r = Boolean('A' === i.nodeName && (null === (t = i.href) || void 0 === t ? void 0 : t.length));
                for (this.stopPropagation && !r && (e.preventDefault(), e.stopPropagation()); i && i !== this.el; ) {
                  if (i && i.dataset && (n = i.dataset.do)) {
                    var o = n.split(','),
                      a = o[0];
                    return void ('bcast' === a
                      ? (dn.emit(o[1]), e.stopPropagation())
                      : 'rqstOpen' === a || 'rqstClose' === a
                        ? (dn.emit.apply(dn, o), e.stopPropagation())
                        : this.click.apply(this, o));
                  }
                  i = i.parentElement;
                }
              }
            },
          },
        ]),
        e
      );
    })(),
    zu = Object.freeze({ __proto__: null, ClickHandler: Hu }),
    Bu = (function () {
      function e(t) {
        (m(this, e),
          (this.el = t),
          vt.on('overlay', this.render, this),
          vt.on('usedLang', this.render, this),
          dn.on('metricChanged', this.render, this),
          ee || (this.el.onclick = this.onclick.bind(this)),
          this.render());
      }
      return (
        v(e, [
          {
            key: 'onclick',
            value: function () {
              var e = zs[vt.get('overlay')];
              e.cycleMetric.call(e.m);
            },
          },
          {
            key: 'render',
            value: function () {
              var e = this,
                t = vt.get('overlay'),
                n = zs[t];
              (this.el.classList.add('animate'),
                setTimeout(function () {
                  (n.paintLegend.call(n, e.el), e.el.classList.remove('animate'), ee || dn.emit('uiChanged'));
                }, 400));
            },
          },
        ]),
        e
      );
    })(),
    ju = Object.freeze({ __proto__: null, Legend: Bu });
  (!(function (e) {
    ((e.Heavy = 'HEAVY'), (e.Medium = 'MEDIUM'), (e.Light = 'LIGHT'));
  })(Fu || (Fu = {})),
    (function (e) {
      ((e.Success = 'SUCCESS'), (e.Warning = 'WARNING'), (e.Error = 'ERROR'));
    })(Gu || (Gu = {})));
  var Vu,
    Yu,
    qu = (function () {
      function e(t) {
        var n, i, r;
        (m(this, e),
          _(this, 'haptics', null),
          (this.el = t.el),
          (this.useHaptics = !!this.haptics && (null === (n = t.useHaptics) || void 0 === n || n)),
          (this.timer = null),
          (this.longPressed = !1),
          (this.onClick = null !== (i = t.onClick) && void 0 !== i ? i : this.onClick),
          (this.onLongTap = null !== (r = t.onLongTap) && void 0 !== r ? r : this.onLongTap),
          this.el.addEventListener('click', this.onCLickPressed.bind(this)),
          this.el.addEventListener('touchstart', this.touchStart.bind(this)),
          this.el.addEventListener('touchend', this.touchEnd.bind(this)),
          this.el.addEventListener('touchcancel', this.clearLongPressTimer.bind(this)),
          this.el.addEventListener('touchmove', this.clearLongPressTimer.bind(this)),
          this.el.addEventListener('contextmenu', function (e) {
            return e.preventDefault();
          }));
      }
      return (
        v(e, [
          { key: 'onClick', value: function (e) {} },
          { key: 'onLongTap', value: function (e) {} },
          {
            key: 'onCLickPressed',
            value: function (e) {
              this.longPressed || this.onClick(e);
            },
          },
          {
            key: 'longTapPressed',
            value: function (e) {
              ((this.longPressed = !0),
                e.preventDefault(),
                e.stopImmediatePropagation(),
                this.useHaptics && this.haptics && this.haptics.impact({ style: Fu.Heavy }),
                this.onLongTap(e));
            },
          },
          {
            key: 'touchStart',
            value: function (e) {
              var t = this;
              this.timer ||
                (this.timer = setTimeout(function () {
                  return t.longTapPressed(e);
                }, 600));
            },
          },
          {
            key: 'touchEnd',
            value: function () {
              var e = this;
              (this.clearLongPressTimer(),
                this.longPressed &&
                  setTimeout(function () {
                    return (e.longPressed = !1);
                  }, 100));
            },
          },
          {
            key: 'clearLongPressTimer',
            value: function () {
              this.timer && (clearTimeout(this.timer), (this.timer = null));
            },
          },
        ]),
        e
      );
    })(),
    Zu = Object.freeze({ __proto__: null, LongTap: qu }),
    Xu = (ql.sharedCoords, ql.startupDetail),
    Ju = !1,
    Qu = !1,
    Ku = vt.get('showWeather'),
    $u = Cc.getContainer();
  function ed() {
    Qu ||
      (document.body.addEventListener('click', id, !0),
      $u.addEventListener('touchstart', rd, !0),
      document.body.addEventListener('keydown', rd),
      (Qu = !0));
  }
  function td(e) {}
  var nd = be(function () {
    var e = Date.now();
    (Yu && (clearTimeout(Yu), (Yu = null)), Gl());
    var t = function (e) {
      (Oc({ lat: e.lat, lon: e.lon, zoom: 8 }),
        Vu && Cc.removeLayer(Vu),
        (Vu = L.marker([e.lat, e.lon], { icon: Ec.myLocationIcon }).addTo(Cc)),
        setTimeout(Cc.removeLayer.bind(Cc, Vu), 12e4));
    };
    oc().then(function (n) {
      var i = Date.now() - e;
      i < 4e3
        ? setTimeout(function () {
            return t(n);
          }, 4e3 - i)
        : t(n);
    });
  }, 300);
  function id(e) {
    if (e && e.target) {
      var t = e.target.id;
      if ('icon-home' === t || 'logo' === t) return;
      if ('search-my-loc' === t) return void nd();
    }
    rd(e);
  }
  function rd(e) {
    (Qu &&
      (document.body.removeEventListener('click', id, !0),
      $u.removeEventListener('touchstart', rd, !0),
      document.body.removeEventListener('keydown', rd),
      (Qu = !1)),
      (Ju = !0),
      setTimeout(function () {
        dn.emit('rqstClose', 'hp-weather', e);
      }, 50));
  }
  function od() {
    (K || Gl(),
      (Yu = setTimeout(function () {
        return Hl();
      }, 3e3)),
      ed(),
      vc(td));
  }
  (Ku && !Xu ? od() : document.body.classList.remove('onweather'),
    dn.on('back2home', function () {
      (dn.emit('closeAllPlugins', 'hp-weather'),
        vt.set('timestamp', Date.now()),
        (Ju = !1),
        vc(function (e) {
          Oc({ lat: e.lat, lon: e.lon, zoom: 5 });
        }));
    }),
    Zn('weather', Ku ? vt.get('startUp') : 'userDisabled'));
  var ad = Object.freeze({
      __proto__: null,
      getCancelShow: function () {
        return Ju;
      },
      hide: rd,
      setCancelShow: function () {
        return (Ju = !1);
      },
      show: td,
    }),
    sd = ft.get('promos2') || {},
    ld = be(function () {
      ft.put('promos2', sd);
    }, 500),
    cd = function (e) {
      return sd[e] || 0;
    },
    ud = function (e, t, n) {
      ((sd[''.concat(e, '_ts')] = n || Date.now()), (sd[e] = t), ld());
    },
    dd = {
      getCounter2: function (e) {
        return { displayed: cd(e), ts: sd[''.concat(e, '_ts')] || 0 };
      },
      hitCounter: function (e) {
        (ud(e, cd(e) + 1), Zn('promo', e));
      },
      neverSee: function (e) {
        ud(e, 1e3);
      },
      getAll: function () {
        return sd;
      },
    };
  document.body.classList;
  var hd = vt.get('sessionCounter'),
    fd = Date.now(),
    md = 'premium-promo-resolution',
    pd = be(function () {
      var e = vt.get('timestamp'),
        t = ko[vt.get('product')],
        n = zs[vt.get('overlay')],
        i = null == t ? void 0 : t.calendar,
        r = !n.isAccu && (null == i ? void 0 : i.premiumStart) && e > i.premiumStart,
        o = n.isAccu && 'next10d' === vt.get('acTime'),
        a = Boolean(r || o),
        s = Kn();
      if (
        (h(document.body, !s && a, 'premium-calendar'),
        (!ee || 'mobile' === O) && !s && !a && hd > 3 && Cc.getZoom() > 7)
      ) {
        var l = dd.getCounter2(md),
          c = l.ts,
          u = l.displayed;
        (0 === u || (u < 4 && fd - c > 6048e5)) &&
          (dd.hitCounter(md),
          new wi({
            ident: 'premium-promo-resolution',
            className: 'drop-down-window right',
            attachPoint: ee ? '#go-premium-mobile' : '#rh-top-icons',
            html: '\n    <section class="centered">'
              .concat(bn.PROMO_SUB_RESOLUTION, '\n\n    </section>\n    <img src="')
              .concat(
                K
                  ? 'https://img.windy.com/albums/a/Map-resolution-2200x700.png?w=700'
                  : 'https://img.windy.com/albums/a/Map-resolution.jpg?w=1000',
                '" alt="HRR Free vs Premium" />\n    ',
              ),
          }).open());
      }
    }, 500);
  Kn() || (vt.on('subscription', pd), dn.on('redrawFinished', pd));
  var vd = 'long-tap-promo';
  ee &&
    dd.getCounter2(vd).displayed < 5 &&
    dn.once('back2home', function () {
      dd.hitCounter(vd);
      var e = new wi({
        ident: vd,
        closeOnClick: !0,
        className: 'size-m window transparent-window rh-bottom-pin mm-home-button-window',
        attachPoint: '#icon-home',
        html: bn.PROMO_LONG_PRESS_HOME,
      }).open();
      setTimeout(function () {
        return e.close();
      }, 8e3);
    });
  (new Hu({ el: document.body }),
    dn.on('openapp', function () {
      window.location.href =
        'ios' === I
          ? 'https://apps.apple.com/app/apple-store/id1161387262?pt=118417623&ct=webapp&mt=8'
          : 'https://play.google.com/store/apps/details?id=com.windyty.android&utm_source=menu&utm_medium=windy&utm_campaign=openAppLink&utm_content=openAppLink';
    }),
    dn.once('dependenciesResolved', function () {
      dn.emit('rqstOpen', 'patch');
    }),
    new Bu(He('#legend-mobile')));
  var gd = null;
  vt.on('connection', function (e) {
    vt.get('offlineMode') ||
      (e
        ? (gd && (gd.close(), (gd = null)),
          setTimeout(function () {
            gd = new wi({
              ident: 'message-app-online',
              className: 'top-message bg-ok clickable',
              html: bn.MSG_ONLINE_APP,
              timeout: 1e4,
              onopen: function () {
                this.node.onclick = function () {
                  return window.location.reload();
                };
              },
            }).open();
          }, 500))
        : (gd = new wi({
            ident: 'message-app-offline',
            className: 'top-message bg-error',
            html: bn.MSG_OFFLINE,
          }).open()));
  });
  var yd = !1;
  var wd = be(function () {
    ((yd = !0),
      document.body.classList.remove('loading-overlay'),
      document.body.classList.remove('loading-path'),
      document.body.classList.remove('loading-level'));
  }, 300);
  (dn.on('paramsChanged', function (e, t) {
    /^(overlay|path|level)$/.test(t) &&
      (wd(),
      (yd = !1),
      setTimeout(function () {
        return (function (e) {
          yd || document.body.classList.add('loading-' + e);
        })(t);
      }, 200));
  }),
    dn.on('redrawFinished', wd),
    dn.on('loadingFailed', wd),
    vt.on('connection', function (e) {
      return !e && wd();
    }));
  var bd,
    Td,
    Ed,
    Sd,
    _d = !1,
    Ad = 2,
    Pd = 0,
    kd = !1,
    Cd = 50,
    Od = function () {
      return vt.set('animation', !1);
    },
    Ld = function (e) {
      'picker-mobile' !== e && Od();
    },
    Id = function (e) {
      e || Od();
    },
    Rd = function (e) {
      return (Ed = e.path);
    },
    xd = function (e) {
      return /Accu$/.test(e) && Od();
    },
    Nd = function (e) {
      ((kd = Sd !== Ed), (Sd = e.path));
    };
  function Md() {
    Ad = Oe(Ad + (kd ? -0.25 : 0.1), 0.8, 3);
    var e = vt.get('timestamp') + Pd * Ad;
    e < Td.calendar.end ? (vt.set('timestamp', e), (bd = setTimeout(Md, Cd))) : Od();
  }
  function Dd() {
    var e;
    (Td = ko[vt.get('product')]).animation
      ? ((_d = !0),
        (Sd = Ed = vt.get('path')),
        (Ad = 2),
        (Pd = Cd * ((e = Td.calendar.timestamps)[1] - e[0] < 72e5 ? Td.animationSpeed1h : Td.animationSpeed)),
        vt.get('timestamp') + Pd * Ad >= Td.calendar.end && vt.set('timestamp', Date.now()),
        vt.on('visibility', Id),
        vt.on('product', Od),
        vt.on('overlay', xd),
        dn.on('redrawFinished', Rd),
        dn.on('paramsChanged', Nd),
        dn.on('pluginOpened', Ld),
        Md(),
        Zn('events', 'animation-started'))
      : Od();
  }
  (vt.on('animation', function (e) {
    e !== _d &&
      (e
        ? Dd()
        : ((_d = !1),
          clearTimeout(bd),
          vt.off('visibility', Id),
          vt.off('product', Od),
          vt.off('overlay', xd),
          dn.off('redrawFinished', Rd),
          dn.off('paramsChanged', Nd),
          dn.off('pluginOpened', Ld)));
  }),
    'hidden' in document &&
      document.addEventListener('visibilitychange', function () {
        vt.set('visibility', !document.hidden);
      }));
  var Ud = me,
    Wd = Object.freeze({ __proto__: null, logPage: Ud }),
    Fd = !1,
    Gd = function (e) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
      dn.emit.apply(dn, [''.concat(Fd ? 'globe-' : 'maps-').concat(e)].concat(n));
    };
  (vt.on('globeActive', function (e) {
    return (Fd = e);
  }),
    dn.on('zoomIn', Gd.bind(null, 'zoomIn')),
    dn.on('zoomOut', Gd.bind(null, 'zoomOut')),
    dn.on('paramsChanged', Gd.bind(null, 'paramsChanged')));
  var Hd,
    zd,
    Bd,
    jd = {
      hasTimestamps: me,
      getArray: function () {
        return [];
      },
      on: me,
      isFav: me,
      isFreeLimitExceeded: me,
    },
    Vd = (function () {
      function e(t) {
        var n, i;
        (m(this, e),
          (this.el = t.el),
          (this.bindStore = t.bindStore),
          (this.onValue = null === (n = t.onValue) || void 0 === n || n),
          (this.offValue = null !== (i = t.offValue) && void 0 !== i && i));
        var r = vt.get(this.bindStore);
        (this.set(r), (this.el.onclick = this.toggle.bind(this)), vt.on(this.bindStore, this.set, this));
      }
      return (
        v(e, [
          {
            key: 'unmount',
            value: function () {
              vt.off(this.bindStore, this.set, this);
            },
          },
          {
            key: 'toggle',
            value: function () {
              var e = vt.get(this.bindStore);
              vt.set(this.bindStore, e === this.onValue ? this.offValue : this.onValue);
            },
          },
          {
            key: 'set',
            value: function (e, t) {
              this.el.classList[e === this.onValue ? 'remove' : 'add']('off');
            },
          },
        ]),
        e
      );
    })(),
    Yd = Object.freeze({ __proto__: null, BindedCheckbox: Vd }),
    qd = (function () {
      function e(t) {
        (m(this, e),
          this.initProperties(),
          (this.resizableEl = t.resizableEl),
          window.addEventListener('resize', be(this.resize.bind(this), 300)),
          dn.on('pluginOpened', this.uiChanged, this),
          dn.on('pluginClosed', this.uiChanged, this),
          dn.on('detailRendered', this.resize, this),
          dn.on('uiChanged', this.uiChanged, this),
          (this.rects = { left: -1 }),
          this.resize(),
          t.onresize && (this.onresize = t.onresize));
      }
      return (
        v(e, [
          { key: 'initProperties', value: function () {} },
          {
            key: 'resize',
            value: function () {
              var e = this.resizableEl.getBoundingClientRect();
              (this.rects.top === e.top &&
                this.rects.bottom === e.bottom &&
                this.rects.left === e.left &&
                this.rects.right === e.right) ||
                ((this.height = Math.max(1, e.height)),
                (this.width = Math.max(1, e.width)),
                (this.rects = e),
                (this.elTop = e.top),
                (this.elBottom = e.bottom),
                (this.elLeft = e.left),
                (this.elRight = e.right),
                this.onresize(this.rects));
            },
          },
          { key: 'onresize', value: function (e) {} },
          {
            key: 'uiChanged',
            value: function () {
              (setTimeout(this.resize.bind(this), 200),
                setTimeout(this.resize.bind(this), 500),
                setTimeout(this.resize.bind(this), 1500));
            },
          },
        ]),
        e
      );
    })(),
    Zd = Object.freeze({ __proto__: null, Resizable: qd }),
    Xd = (function () {
      function e(t) {
        (m(this, e),
          (this.drag = t.drag),
          (this.progressLine = t.progressLine),
          (this.ghost = t.ghost),
          (this.updateGhost = t.updateGhost),
          this.progressLine.addEventListener('mouseenter', this.onGhostMouseEnter.bind(this)),
          this.progressLine.addEventListener('mouseleave', this.onGhostMouseLeave.bind(this)),
          this.progressLine.addEventListener('mousemove', this.onGhostMouseMove.bind(this)));
      }
      return (
        v(e, [
          {
            key: 'onGhostMouseEnter',
            value: function () {
              var e;
              !1 === (null === (e = this.drag) || void 0 === e ? void 0 : e.dragging) &&
                (this.ghost.style.opacity = '1');
            },
          },
          {
            key: 'onGhostMouseLeave',
            value: function () {
              this.ghost.style.opacity = '0';
            },
          },
          {
            key: 'onGhostMouseMove',
            value: function (e) {
              var t;
              null !== (t = this.drag) && void 0 !== t && t.dragging
                ? (this.ghost.style.opacity = '0')
                : this.updateGhost(e);
            },
          },
        ]),
        e
      );
    })(),
    Jd = Object.freeze({ __proto__: null, GhostBox: Xd }),
    Qd = (function () {
      function e(t) {
        var n, i, r, o, a;
        (m(this, e),
          (this.progressBar = t.progressBar),
          (this.offset = null !== (n = t.offset) && void 0 !== n ? n : 0),
          (this.borderOffset = null !== (i = t.borderOffset) && void 0 !== i ? i : 0),
          (this.jumpingGhost = null === (r = t.jumpingGhost) || void 0 === r || r),
          (this.bcastLimit = null !== (o = t.bcastLimit) && void 0 !== o ? o : 100),
          (this.jumpingWidth = null !== (a = t.jumpingWidth) && void 0 !== a ? a : 140),
          (this.left = 0),
          (this.calendarHours = 0),
          (this.timestamp = Date.now()),
          (this.resizable = new qd({ resizableEl: this.progressBar, onresize: this.onresize.bind(this) })),
          (this.timecode = He('.main-timecode', this.progressBar)),
          (this.drag = new gl({
            el: this.timecode,
            ondrag: this.ondrag.bind(this),
            ondragstart: this.ondragstart.bind(this),
            ondragend: this.ondragend.bind(this),
          })),
          (this.text = He('.box', this.timecode)),
          (this.b = He('.progress-line i', this.progressBar)),
          (this.played = He('.progress-line .played', this.progressBar)),
          (this.progressLine = He('.progress-line', this.progressBar)),
          ee ||
            ((this.ghostBox = new Xd({
              drag: this.drag,
              ghost: He('.ghost-timecode', this.progressBar),
              progressLine: this.progressLine,
              updateGhost: this.updateGhost.bind(this),
            })),
            (this.ghostTxt = this.ghostBox.ghost && He('.box', this.ghostBox.ghost))),
          this.progressLine.addEventListener('mouseup', this.click.bind(this)),
          (this.throttledBcast = Te.call(this, this.bcast, this.bcastLimit)));
      }
      return (
        v(e, [
          {
            key: 'createText',
            value: function (e) {
              return '';
            },
          },
          {
            key: 'pos2ts',
            value: function (e) {
              return this.calendar ? this.calendar.start + e / this.pxRatio : Date.now();
            },
          },
          {
            key: 'createGhostText',
            value: function (e) {
              return '';
            },
          },
          {
            key: 'setTimestamp',
            value: function (e) {
              this.timestamp = e;
            },
          },
          {
            key: 'update',
            value: function (e) {
              return (
                (this.left = Oe(e, 0, this.maxWidth)),
                (this.timecode.style.left = this.left + this.offset + 'px'),
                (this.text.textContent = this.createText(this.text)),
                this.played && (this.played.style.width = this.left + 'px'),
                this.left
              );
            },
          },
          {
            key: 'onresize',
            value: function () {
              if (this.calendar) {
                if (
                  ((this.progressWidth = this.progressBar.offsetWidth - this.offset),
                  (this.pxRatio = this.progressWidth / (this.calendar.endOfCal - this.calendar.start)),
                  (this.maxWidth = this.ts2pos(this.calendar.end)),
                  (this.progressLine.style.width = Oe(this.maxWidth, 0, this.progressWidth) + 'px'),
                  (this.borderOffset = this.resizable.elLeft),
                  this.b)
                ) {
                  var e = this.ts2pos(Date.now());
                  this.b.style.left = e + 'px';
                }
                (this.updateBarFreeRange(), this.set(this.timestamp));
              }
            },
          },
          {
            key: 'click',
            value: function (e) {
              if (!this.drag.dragging) {
                this.addAnimation();
                var t = Oe(e.pageX - this.offset - this.borderOffset, 0, this.maxWidth);
                (this.setTimestamp(this.pos2ts(t)), this.update(t), this.bcast(), this.removeAnimation());
              }
            },
          },
          {
            key: 'set',
            value: function (e) {
              (this.addAnimation(), this.setTimestamp(e), this.update(this.ts2pos(e)), this.removeAnimation());
            },
          },
          { key: 'onbcast', value: function () {} },
          { key: 'ondragstart', value: function (e) {} },
          {
            key: 'ondragend',
            value: function (e) {
              this.bcast();
            },
          },
          {
            key: 'ondrag',
            value: function (e) {
              (this.update(e + 20 - this.offset), this.throttledBcast());
            },
          },
          {
            key: 'bcast',
            value: function () {
              ((this.timestamp = this.pos2ts(this.left)), this.onbcast());
            },
          },
          {
            key: 'addAnimation',
            value: function () {
              this.progressBar.classList.add('anim-allowed');
            },
          },
          {
            key: 'removeAnimation',
            value: function () {
              var e = this;
              window.setTimeout(function () {
                e.progressBar.classList.remove('anim-allowed');
              }, 300);
            },
          },
          {
            key: 'ts2pos',
            value: function (e) {
              return this.calendar ? (e - this.calendar.start) * this.pxRatio : 0;
            },
          },
          {
            key: 'updateBarFreeRange',
            value: function () {
              if (!Kn()) {
                var e,
                  t = He('.free', this.played),
                  n = He('.premium', this.progressLine);
                if (t && n)
                  if (null !== (e = this.calendar) && void 0 !== e && e.premiumStart) {
                    var i = Oe(this.ts2pos(this.calendar.premiumStart), 0, this.maxWidth);
                    ((t.style.width = ''.concat(i, 'px')), (n.style.width = ''.concat(this.maxWidth - i, 'px')));
                  } else ((t.style.width = '0px'), (n.style.width = '0px'));
              }
            },
          },
          {
            key: 'updateGhost',
            value: function (e) {
              if (this.ghostBox) {
                var t = Oe(e.clientX - this.offset - this.borderOffset, 0, this.maxWidth);
                ((this.ghostBox.ghost.style.left = t + this.offset + 'px'),
                  this.jumpingGhost &&
                    (this.ghostBox.ghost.style.marginTop =
                      this.left - t < 40 && t - this.left < this.jumpingWidth ? '-25px' : '0px'),
                  (this.ghostTxt.innerHTML = this.createGhostText(t)));
              }
            },
          },
        ]),
        e
      );
    })(),
    Kd = (function (e) {
      s(i, e);
      var n = c(i);
      function i(e) {
        var t;
        return (
          m(this, i),
          ((t = n.call(this, e)).UIident = e.UIident),
          (t.bindTimestamp = e.bindTimestamp),
          (t.bindCalendar = e.bindCalendar),
          (t.bindAnimation = e.bindAnimation),
          (t.displayHour = oi()),
          (t.zuluMode = vt.get('zuluMode')),
          vt.on('usedLang', t.render, d(t)),
          vt.on('hourFormat', t.render, d(t)),
          vt.on('zuluMode', t.render, d(t)),
          vt.on(t.bindTimestamp, t.ontstamp, d(t)),
          vt.on(t.bindCalendar, t.setCal, d(t)),
          t.setCal(vt.get(t.bindCalendar)),
          t.set(vt.get(t.bindTimestamp)),
          t
        );
      }
      return (
        v(i, [
          {
            key: 'unmount',
            value: function () {
              (vt.off('usedLang', this.render, this),
                vt.off('hourFormat', this.render, this),
                vt.off('zuluMode', this.render, this),
                vt.off(this.bindTimestamp, this.ontstamp, this),
                vt.off(this.bindCalendar, this.setCal, this));
            },
          },
          {
            key: 'onbcast',
            value: function () {
              vt.set(this.bindTimestamp, this.timestamp, { UIident: this.UIident });
            },
          },
          {
            key: 'stopAnim',
            value: function () {
              this.bindAnimation && vt.set(this.bindAnimation, !1);
            },
          },
          {
            key: 'ondragstart',
            value: function (e) {
              this.stopAnim();
            },
          },
          {
            key: 'click',
            value: function (e) {
              (this.stopAnim(), t(f(i.prototype), 'click', this).call(this, e));
            },
          },
          {
            key: 'setCal',
            value: function (e) {
              e && ((this.numberOfHours = e.calendarHours), (this.calendar = e), this.onresize());
            },
          },
          {
            key: 'render',
            value: function () {
              ((this.zuluMode = vt.get('zuluMode')),
                this.text.removeAttribute('data-zulu'),
                (this.displayHour = oi()),
                (this.text.textContent = this.createText(this.text)));
            },
          },
          {
            key: 'ontstamp',
            value: function (e, t) {
              this.UIident !== t && this.set(e);
            },
          },
        ]),
        i
      );
    })(Qd),
    $d = Object.freeze({ __proto__: null, BindedBar: Kd }),
    eh = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        return (
          m(this, n),
          t.call(
            this,
            S(S({}, e), {}, { bindTimestamp: 'timestamp', bindCalendar: 'calendar', bindAnimation: 'animation' }),
          )
        );
      }
      return (
        v(n, [
          {
            key: 'createText',
            value: function (e) {
              var t = this.pos2ts(this.left),
                n = Math.floor((t - this.calendar.midnight.getTime()) / 864e5),
                i = this.calendar.days[n],
                r = i
                  ? ''.concat(bn[this.zuluMode ? i.display : i.displayLong]).concat(i.day && ' ' + i.day, ' - ')
                  : '';
              return (
                this.zuluMode && (e.dataset.zulu = ai(t)),
                ''.concat(r).concat(this.displayHour(new Date(t).getHours()))
              );
            },
          },
          {
            key: 'createGhostText',
            value: function (e) {
              var t = this.pos2ts(e),
                n = Math.floor((e / this.progressWidth) * this.numberOfHours) % 24;
              if (!Kn()) {
                var i,
                  r = null === (i = this.calendar) || void 0 === i ? void 0 : i.premiumStart;
                if (r && t > r)
                  return ''.concat(this.displayHour(n), '&nbsp;<i class="premium-flag"></i>&nbsp;&nbsp;&nbsp;');
              }
              return this.displayHour(n);
            },
          },
        ]),
        n
      );
    })(Kd),
    th = Object.freeze({ __proto__: null, TimestampBar: eh }),
    nh = Object.freeze({
      __proto__: null,
      ondestroy: function () {
        var e;
        (Hd.unmount(), zd.unmount(), null === (e = Bd) || void 0 === e || e.unmount());
      },
      onmount: function (e, t) {
        (vt.get('timestamp') < Date.now() && vt.set('timestamp', Date.now()),
          (Hd = new Vd({ el: t.playPause, bindStore: 'animation' })),
          (zd = new eh({ progressBar: e, offset: 45, borderOffset: 10, UIident: 'main' })));
      },
    }),
    ih = me,
    rh = me,
    oh = me,
    ah = me,
    sh = me,
    lh = me,
    ch = Object.freeze({ __proto__: null, description: ah, reset: oh, setTitle: lh, setUrl: sh, title: rh, url: ih }),
    uh = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        var e;
        return (
          m(this, n),
          ((e = t.call(this, { ident: 'singleclick' })).hpJustClosed = !1),
          (e.priorities = ee ? ['sounding'] : ['detail', 'sounding', 'rplanner', 'cap-alerts']),
          Cc.on('singleclick', e.opener, d(e)),
          ee &&
            (vt.on('hpShown', e.hpShown, d(e)),
            Cc.on('moveend', function () {
              return (e.lastTimeMapWasMoved = Date.now());
            })),
          e
        );
      }
      return (
        v(n, [
          {
            key: 'hpShown',
            value: function (e) {
              var t = this;
              e ||
                ((this.hpJustClosed = !0),
                setTimeout(function () {
                  return (t.hpJustClosed = !1);
                }, 1e3));
            },
          },
          {
            key: 'parseEvent',
            value: function (e) {
              return {
                x: e.containerPoint.x,
                y: e.containerPoint.y,
                lat: e.latlng.lat,
                lon: e.latlng.lng,
                source: 'singleclick',
              };
            },
          },
          {
            key: 'opener',
            value: function (e) {
              if (!(ee && Date.now() - this.lastTimeMapWasMoved < 500)) {
                var t = e.originalEvent && e.originalEvent.target,
                  n = t && t.dataset;
                if (n && n.poi) this.emit('poi-'.concat(n.poi), t);
                else {
                  for (var i = this.parseEvent(e), r = 0; r < this.priorities.length; r++) {
                    var o = this.priorities[r];
                    if (jl[o].isOpen) return void this.emit(o, i);
                  }
                  this.emit('click', i);
                }
              }
            },
          },
        ]),
        n
      );
    })(Ke),
    dh = new uh(),
    hh = Object.freeze({ __proto__: null, singleclick: dh }),
    fh = (function (e) {
      s(n, L.GridLayer);
      var t = c(n);
      function n() {
        var e;
        m(this, n);
        for (var i = arguments.length, r = new Array(i), o = 0; o < i; o++) r[o] = arguments[o];
        return (
          _(d((e = t.call.apply(t, [this].concat(r)))), 'options', {
            minZoom: 3,
            maxZoom: 11,
            pane: 'markerPane',
            className: 'labels-layer',
            updateWhenIdle: !0,
            updateWhenZooming: !1,
            keepBuffer: ee ? 2 : 4,
          }),
          _(d(e), 'cityDivs', {}),
          _(d(e), 'ts', vt.get('timestamp')),
          _(d(e), 'hasHooks', !1),
          e
        );
      }
      return (
        v(n, [
          {
            key: 'onAdd',
            value: function () {
              return (
                this.hasHooks ||
                  (this.updateProduct(),
                  this.createTilesUrl(),
                  dh.on('poi-label', this.onClick, this),
                  vt.on('timestamp', this.onTsChange, this),
                  vt.on('usedLang', this.updateLabels, this),
                  vt.on('englishLabels', this.updateLabels, this),
                  vt.on('product', this.updateProduct.bind(this, !0)),
                  dn.on('metricChanged', this.onMetricChanged, this),
                  (this.hasHooks = !0)),
                L.GridLayer.prototype.onAdd.call(this)
              );
            },
          },
          {
            key: 'createTilesUrl',
            value: function () {
              var e = vt.get('englishLabels') ? 'en' : vt.get('usedLang');
              this.tilesUrl = ''.concat(D, '/labels/v').concat('1.4', '/').concat(e);
            },
          },
          {
            key: 'updateLabels',
            value: function () {
              (this.createTilesUrl(), this._reset());
            },
          },
          {
            key: 'updateProduct',
            value: function (e) {
              var t = vt.get('product');
              ko[t].labelsTemp || (t = 'ecmwf');
              var n = ko[t].refTime.call(ko[t]);
              if ((this.product !== t || this.refTime !== n) && ((this.product = t), (this.refTime = n), e))
                for (var i in this.cityDivs) this.loadTileForecast(this.cityDivs[i]);
            },
          },
          {
            key: 'onClick',
            value: function (e) {
              var t = e.dataset,
                n = t.id,
                i = t.label;
              if (n) {
                var r = w(n.split('/'), 2),
                  o = r[0],
                  a = r[1];
                dn.emit('rqstOpen', 'detail', { lat: +o, lon: +a, name: i, id: n, source: 'label' });
              }
            },
          },
          {
            key: 'onTsChange',
            value: function (e) {
              ((this.ts = e), this.refreshWeather());
            },
          },
          {
            key: 'onMetricChanged',
            value: function (e, t) {
              'temp' === e && ((this.temperatureUnit = t), this.refreshWeather());
            },
          },
          {
            key: 'refreshWeather',
            value: function () {
              for (var e in this.cityDivs)
                for (
                  var t = this.cityDivs[e], n = t.labels, i = t.timestamps, r = this.getIndexToCityTileData(i), o = 0;
                  o < n.length;
                  o++
                )
                  this.renderWeather(n[o], r);
            },
          },
          {
            key: '_animateZoom',
            value: function () {
              this._removeAllTiles();
            },
          },
          {
            key: '_reset',
            value: function () {
              this.redraw();
            },
          },
          {
            key: 'loadTileForecast',
            value: function (e) {
              var t = this;
              e.labels.length &&
                e.urlFrag &&
                this.product &&
                Ul(this.product, e.urlFrag, { cache: !1 }).then(function (n) {
                  null != n && n.data && t.onForecastLoaded(e, n.data);
                });
            },
          },
          {
            key: 'onTileLoaded',
            value: function (e, t, n) {
              var i = this.renderTile(t, e, n.data);
              return ((this.cityDivs[e.x + ':' + e.y] = i), i);
            },
          },
          {
            key: 'onForecastLoaded',
            value: function (e, t) {
              var n = this;
              if (t && 'object' === P(t)) {
                var i = t.forecast,
                  r = t.reftime,
                  o = t.hours;
                e.timestamps = o.map(function (e) {
                  return r + e * ce;
                });
                var a = this.getIndexToCityTileData(e.timestamps);
                e.labels.forEach(function (e) {
                  var t = e.id;
                  t in i
                    ? ((e.data = i[t]), n.renderWeather(e, a))
                    : ((e.data = void 0), e.el.removeAttribute('data-temp'));
                });
              } else
                e.labels.forEach(function (e) {
                  ((e.data = void 0), e.el.removeAttribute('data-temp'));
                });
            },
          },
          {
            key: 'createTile',
            value: function (e, t) {
              var n = this,
                i = ''.concat(e.z, '/').concat(e.x, '/').concat(e.y),
                r = L.DomUtil.create('div', 'leaflet-tile');
              return (
                (r.style.width = r.style.height = this.getTileSize() + 'px'),
                (r.onselectstart = r.onmousemove = L.Util.falseFn),
                Xt(''.concat(this.tilesUrl, '/').concat(i, '.json'), { cache: !1 })
                  .then(function (t) {
                    return n.onTileLoaded(e, r, t);
                  })
                  .then(function (e) {
                    e && ((e.urlFrag = i), n.loadTileForecast(e), t(void 0, r));
                  })
                  .catch(t),
                r
              );
            },
          },
          {
            key: 'renderTile',
            value: function (e, t, n) {
              for (
                var i = this._getTilePos(t),
                  r = i.x,
                  o = i.y,
                  a = this._map.getPixelOrigin(),
                  s = a.x,
                  l = a.y,
                  c = 256 << t.z,
                  u = [],
                  d = 0;
                d < n.length;
                ++d
              ) {
                var h = w(n[d], 7),
                  f = h[0],
                  m = h[1],
                  p = h[2],
                  v = h[3],
                  g = h[4],
                  y = h[5],
                  b = h[6],
                  T = 'ci' !== p.substring(0, 2),
                  E = T ? f : ''.concat(g, '/').concat(v),
                  S = Math.floor(Ie(v) * c - s - y / 2) - r,
                  _ = Math.floor(xe(g) * c - l - b / 2) - o,
                  A = document.createElement('div');
                ((A.textContent = A.dataset.label = m),
                  (A.dataset.id = E),
                  (A.dataset.poi = 'label'),
                  (A.className = p),
                  (A.style.transform = 'translate('.concat(S, 'px, ').concat(_, 'px)')),
                  (A.style.width = ''.concat(y, 'px')),
                  T || u.push({ id: E, el: A }),
                  e.appendChild(A));
              }
              return { labels: u };
            },
          },
          {
            key: 'getIndexToCityTileData',
            value: function (e) {
              if (null != e && e.length) return vi(e, this.ts, !1);
            },
          },
          {
            key: 'renderWeather',
            value: function (e, t) {
              if (e && e.el) {
                var n = e.el,
                  i = e.data;
                null != i && i.length && void 0 !== t && t >= 0 && t < i.length
                  ? (n.dataset.temp = ''.concat(zs.temp.convertNumber.call(zs.temp.m, i[t]), '°'))
                  : n.removeAttribute('data-temp');
              }
            },
          },
          {
            key: 'toArray',
            value: function () {
              var e = [];
              for (var t in this.cityDivs) e = e.concat(this.cityDivs[t].labels);
              return e;
            },
          },
        ]),
        n
      );
    })(),
    mh = (function (e) {
      var t,
        n = {},
        i = Object.getPrototypeOf(e),
        r = y(Object.getOwnPropertyNames(i));
      try {
        for (r.s(); !(t = r.n()).done; ) {
          var o = t.value;
          n[o] = i[o];
        }
      } catch (e) {
        r.e(e);
      } finally {
        r.f();
      }
      var a,
        s = y(Object.getOwnPropertyNames(e));
      try {
        for (s.s(); !(a = s.n()).done; ) {
          var l = a.value;
          n[l] = e[l];
        }
      } catch (e) {
        s.e(e);
      } finally {
        s.f();
      }
      return n;
    })(new fh()),
    ph = L.GridLayer.extend(mh),
    vh = new ph().addTo(Cc),
    gh = ee
      ? Object.keys(jl)
          .map(function (e) {
            return jl[e];
          })
          .filter(function (e) {
            return e && e.disableMobilePicker;
          })
      : [],
    yh = function (e) {
      for (var t = 0; t < gh.length; t++) if (gh[t].isOpen) return;
      dn.emit('rqstOpen', 'picker-mobile', e);
    };
  ee
    ? (Cc.on('dragstart', function () {
        return yh();
      }),
      dh.on('click', function () {
        return yh();
      }))
    : dh.on('click', function (e) {
        return dn.emit('rqstOpen', 'picker', e);
      });
  var wh = new Ke({ ident: 'picker' }),
    bh = (function () {
      function e() {
        (m(this, e),
          _(this, 'lat', null),
          _(this, 'lon', null),
          ee &&
            ((this.mapContainerEl = He('#map-container')),
            (this.pickerDotEl = He('#picker-dot')),
            Cc.on('resize', this.positionChanged.bind(this))));
      }
      return (
        v(e, [
          {
            key: 'lockPosition',
            value: function () {
              var e = this.getLatLon();
              ((this.lat = e.lat), (this.lon = e.lon));
            },
          },
          {
            key: 'unlockPosition',
            value: function () {
              ((this.lat = null), (this.lon = null));
            },
          },
          {
            key: 'setPosition',
            value: function (e, t) {
              (Lc(this.getDotPosition().y, e, t), (this.lat = e), (this.lon = t));
            },
          },
          {
            key: 'offsetPosition',
            value: function (e) {
              this.mapContainerEl.style.transform = e > 0 ? 'translateY(-'.concat(Math.floor(e / 2), 'px)') : 'none';
            },
          },
          {
            key: 'resetOffset',
            value: function () {
              this.offsetPosition(0);
            },
          },
          {
            key: 'getLatLng',
            value: function () {
              var e = this.getDotPosition(),
                t = e.x,
                n = e.y;
              return Cc.containerPointToLatLng([t, n]);
            },
          },
          {
            key: 'getLatLon',
            value: function () {
              var e = this.getLatLng();
              return { lat: e.lat, lon: e.lng };
            },
          },
          {
            key: 'getDotPosition',
            value: function () {
              return {
                x: this.pickerDotEl.offsetLeft + this.pickerDotEl.offsetWidth / 2,
                y: this.pickerDotEl.offsetTop + this.pickerDotEl.offsetHeight / 2,
              };
            },
          },
          {
            key: 'positionChanged',
            value: function () {
              null !== this.lat && null !== this.lon && this.setPosition(this.lat, this.lon);
            },
          },
        ]),
        e
      );
    })(),
    Th = new bh(),
    Eh = Object.freeze({ __proto__: null, PickerDot: bh, emitter: wh, pickerDot: Th }),
    Sh = function () {
      return null;
    },
    _h = (function () {
      function e(t) {
        var n,
          i,
          r,
          o,
          a,
          s,
          l,
          c,
          u,
          d = this;
        (m(this, e),
          _(this, 'stylesBlue', ['rgba(200,0,150,1)', 'rgba(200,0,150,1)', 'rgba(200,0,150,1)', 'rgba(200,0,150,1)']),
          _(
            this,
            'zoom2speed',
            [0.5, 0.5, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          ),
          _(this, 'level2reduce', {
            surface: 1,
            '100m': 1,
            '975h': 1,
            '950h': 1,
            '925h': 0.98,
            '900h': 0.9,
            '850h': 0.8,
            '800h': 0.77,
            '700h': 0.7,
            '600h': 0.65,
            '500h': 0.6,
            '400h': 0.55,
            '300h': 0.5,
            '250h': 0.45,
            '200h': 0.45,
            '150h': 0.35,
            '10h': 0.25,
          }),
          _(this, 'colors', [
            [200, 215, 235, 255],
            [215, 235, 255, 255],
            [235, 255, 255, 255],
            [255, 255, 255, 255],
          ]),
          (this.config = vt.get('particles')),
          (this.configurable = null !== (n = t.configurable) && void 0 !== n && n),
          (this.animation = null !== (i = t.animation) && void 0 !== i ? i : 'dot'),
          (this.lineWidth =
            null !== (r = t.lineWidth) && void 0 !== r
              ? r
              : [0.6, 0.6, 0.6, 1, 1.2, 1.6, 1.8, 2, 2.2, 2.4, 2.4, 2.4, 2.4, 2.6, 2.8, 3, 3, 3, 3, 3, 3, 3, 3, 3]),
          vt.on('particles', function (e) {
            return (d.config = e);
          }),
          (this.multiplier = t.multiplier),
          (this.velocity = t.velocity),
          (this.styles = t.styles),
          (this.glSpeedCurvePowParam = t.glSpeedCurvePowParam),
          (this.glMinSpeedParam = t.glMinSpeedParam),
          (this.glMaxSpeedParam = t.glMaxSpeedParam),
          (this.glParticleWidth = t.glParticleWidth),
          (this.glParticleLengthEx = t.glParticleLengthEx),
          (this.glSpeedPx = t.glSpeedPx),
          (this.glCountMul = t.glCountMul),
          (this.glVelocity = null !== (o = t.glVelocity) && void 0 !== o ? o : 1),
          (this.glOpacity = null !== (a = t.glOpacity) && void 0 !== a ? a : 1),
          (this.glBlending = null !== (s = t.glBlending) && void 0 !== s ? s : 1),
          (this.getBlendingAlpha = null !== (l = t.getBlendingAlpha) && void 0 !== l ? l : this.getBlendingAlpha),
          (this.getIntensityFun = null !== (c = t.getIntensityFun) && void 0 !== c ? c : this.getIntensityFun),
          (this.getStyles = null !== (u = t.getStyles) && void 0 !== u ? u : this.getStyles));
      }
      return (
        v(e, [
          {
            key: 'getIntensityFun',
            value: function () {
              return function (e) {
                return Math.min(3, Math.floor(e / 40));
              };
            },
          },
          {
            key: 'getVelocityFun',
            value: function (e) {
              var t = this.zoom2speed[e.zoom],
                n = this.configurable ? this.config.velocity : 1,
                i = t * n * this.level2reduce[e.level] * this.velocity.max,
                r = t * n * this.velocity.damper;
              return function (e) {
                return i * (1 - 1 / (r * i * e - 1));
              };
            },
          },
          {
            key: 'getAmountMultiplier',
            value: function () {
              return this.configurable ? this.config.multiplier : 1;
            },
          },
          {
            key: 'getAmount',
            value: function (e) {
              var t = e.speed2pixel < 1 ? 1 + 1.5 * (1 - e.speed2pixel) : 1,
                n = this.getAmountMultiplier(),
                i = 1 / (this.multiplier.constant * Math.pow(n * this.multiplier.pow, e.zoom - this.multiplier.zoom));
              return 0 | Math.min(15e3, Math.round(t * e.width * e.height * i));
            },
          },
          {
            key: 'getLineWidth',
            value: function (e) {
              return (this.configurable ? this.config.width : 1) * this.lineWidth[e.zoom];
            },
          },
          {
            key: 'getStyles',
            value: function (e) {
              var t = this.configurable ? this.config.opacity : 1;
              if (e.zoom >= 12) return this.stylesBlue;
              if (t <= 1)
                return this.colors[0].map(function (e) {
                  return 'rgba(' + e + ',' + e + ',' + e + ',' + t.toFixed(1) + ')';
                });
              var n = Math.min(3, Math.round(1.5 * t));
              return this.colors[n].map(function (e) {
                return 'rgba(' + e + ',' + e + ',' + e + ',1)';
              });
            },
          },
          {
            key: 'getMaxAge',
            value: function () {
              return 100;
            },
          },
          {
            key: 'getBlendingAlpha',
            value: function (e) {
              var t =
                0.9 *
                (this.configurable && 1 != this.config.blending ? this.config.blending : 1) *
                (e.speed2pixel < 0.8 ? 1 + (0.8 - e.speed2pixel) / 7 : 1);
              return Math.min(0.98, (2 * Math.round((100 * t) / 2)) / 100).toFixed(2);
            },
          },
        ]),
        e
      );
    })(),
    Ah = {
      wind: new _h({
        configurable: !0,
        multiplier: { constant: 50, pow: 1.6, zoom: 2 },
        velocity: { max: 0.1, damper: 1e-5 },
        glSpeedCurvePowParam: 0.7,
        glMinSpeedParam: 1.5,
        glMaxSpeedParam: 30,
        glParticleWidth: 1.3,
        glParticleLengthEx: 0.1,
        glSpeedPx: 100,
        glCountMul: 1,
      }),
      currents: new _h({
        multiplier: { constant: 50, pow: 1.5, zoom: 2 },
        velocity: { max: 0.4, damper: 0.35 },
        glSpeedCurvePowParam: 0.4,
        glMinSpeedParam: 0.2,
        glMaxSpeedParam: 1.2,
        glParticleWidth: 0.6,
        glParticleLengthEx: 0.1,
        glSpeedPx: 50,
        glVelocity: 1,
        glOpacity: 1.3,
        glBlending: 1.05,
        glCountMul: 4,
        getBlendingAlpha: function () {
          return 0.96;
        },
      }),
      waves: new _h({
        animation: 'wavecle',
        styles: ['rgba(100,100,100,0.25)', 'rgba(150,150,150,0.3)', 'rgba(200,200,200,0.35)', 'rgba(255,255,255,0.4)'],
        lineWidth: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        multiplier: { constant: 50, pow: 1.3, zoom: 2 },
        velocity: { max: 0.02, damper: 0.015 },
        glSpeedCurvePowParam: 1,
        glMinSpeedParam: 0.5,
        glMaxSpeedParam: 10,
        glParticleWidth: 5.5,
        glParticleLengthEx: 1,
        glSpeedPx: 8,
        glVelocity: 1,
        glOpacity: 1.6,
        glBlending: 0.93,
        glCountMul: 1.5,
        getIntensityFun: function () {
          return function (e) {
            return e < 12 ? 0 : e < 25 ? 1 : e < 37 ? 2 : e < 62 ? 3 : e < 75 ? 2 : e < 85 ? 1 : 0;
          };
        },
        getStyles: function () {
          return this.styles;
        },
        getBlendingAlpha: function () {
          return 0.9;
        },
      }),
    },
    Ph = null,
    kh = null,
    Ch = (function (e) {
      s(n, e);
      var t = c(n);
      function n() {
        var e;
        (m(this, n),
          ((e = t.call(this, { ident: 'notifService' })).data = {}),
          (e.eventSource = null),
          (e.canReceiveNotif = !1),
          (e.hasUnloadListener = !1));
        var i = function () {
          return (
            Jl.getArray().filter(function (e) {
              return 'alert' === e.type;
            }).length > 0
          );
        };
        return (
          i()
            ? vt.get('user')
              ? e.watchChanges()
              : vt.once('user', e.watchChanges, d(e))
            : Jl.on('favsChanged', function () {
                return i() && e.watchChanges();
              }),
          e
        );
      }
      return (
        v(n, [
          {
            key: 'clean',
            value: function () {
              this.eventSource && (this.eventSource.close(), (this.eventSource = null));
            },
          },
          {
            key: 'watchChanges',
            value: function () {
              var e = this;
              ((this.canReceiveNotif = !0),
                this.emit('canReceiveNotif'),
                (this.eventSource = Yt('/notif/v1/notifications/stream')),
                null !== this.eventSource &&
                  this.eventSource.addEventListener('notifications-update', function (t) {
                    var n = JSON.parse(t.data);
                    (e.updateInfo(n), e.markNotificationsAsReceived());
                  }),
                this.hasUnloadListener ||
                  (window.addEventListener('beforeunload', function () {
                    e.clean();
                  }),
                  (this.hasUnloadListener = !0)));
            },
          },
          {
            key: 'loadNotificationList',
            value: function (e, t) {
              var n = this,
                i = { current: e, pageSize: t };
              return (
                1 === e && (i.markAsViewed = !0),
                Xt('/notif/v1/notifications', { cache: !1, qs: i })
                  .then(function (e) {
                    var t = e.data;
                    return (n.updateInfo(t), t);
                  })
                  .catch(function (e) {
                    Ye('notifications', 'Error loading notifications', e);
                  })
              );
            },
          },
          {
            key: 'markAlertAsSeen',
            value: function (e) {
              return Kt('/notif/v1/notifications/'.concat(e, '/alert'));
            },
          },
          {
            key: 'markNotificationAsSeen',
            value: function (e) {
              return Kt('/notif/v1/notifications/'.concat(e));
            },
          },
          {
            key: 'markNotificationsAsReceived',
            value: function () {
              return Kt('/notif/v1/notifications', { qs: { status: 'received' } }).catch(function (e) {
                Ye('notifications', 'Error marking notifications', e);
              });
            },
          },
          {
            key: 'deleteAllNotifications',
            value: function () {
              return Jt('/notif/v1/notifications/');
            },
          },
          {
            key: 'markAllAsSeen',
            value: function () {
              ((this.data.newCount = 0),
                vt.set('badgeNumber', 0),
                Ph && Ph.removeAllDeliveredNotifications(),
                kh &&
                  kh.getPending().then(function (e) {
                    if (e && e.notifications && e.notifications.length) return kh.cancel(e);
                  }));
            },
          },
          {
            key: 'updateInfo',
            value: function (e) {
              var t = e.totalCount,
                n = e.newCount;
              ((this.data = { totalCount: t, newCount: n }), vt.set('badgeNumber', n));
            },
          },
        ]),
        n
      );
    })(Ke),
    Oh = new Ch(),
    Lh = {
      buttons: [
        { bindStore: 'displayAdStations', checkboxText: ee ? 'Airport' : 'Airp.' },
        { bindStore: 'displayWMOStations', checkboxText: 'WMO' },
        { bindStore: 'displayMadisPWStations', checkboxText: 'PWS' },
        { bindStore: 'displayShipStations', checkboxText: 'ShipBuoy' },
      ],
      onOpen: function () {
        vt.get('displayAdStations') ||
          vt.get('displayWMOStations') ||
          vt.get('displayMadisPWStations') ||
          vt.get('displayShipStations') ||
          (vt.set('displayAdStations', !0),
          vt.set('displayWMOStations', !0),
          vt.set('displayMadisPWStations', !0),
          vt.set('displayShipStations', !0));
      },
    },
    Ih = {
      wind: Lh,
      temp: Lh,
      metars: { buttons: [{ bindStore: 'displayHeliports', checkboxTranslation: 'METAR_HELIPORTS' }] },
      cams: { buttons: [{ bindStore: 'camsPreviews', checkboxTranslation: 'CAMS_PREVIEWS' }] },
    },
    Rh = function () {
      var e = vt.get('pois'),
        t = vt.get('poisTemporary');
      return (Jl.getArray().length > 0 && 'favs' === e) || ('empty' !== e && 'favs' !== e) || 'empty' !== t;
    },
    xh = function e() {
      Rh() &&
        (dn.emit('rqstOpen', 'poi-libs'), vt.off('pois', e), vt.off('poisTemporary', e), Jl.off('favsChanged', e));
    };
  dn.once('redrawFinished', function () {
    Rh() ? xh() : (vt.on('pois', xh), vt.on('poisTemporary', xh), Jl.on('favsChanged', xh));
  });
  var Nh = Object.freeze({ __proto__: null, displayPoiOnMap: Rh, poisCheckboxes: Ih }),
    Mh = Object.freeze({
      __proto__: null,
      get: function (e, t) {
        var n = e.lat,
          i = e.lon,
          r = vt.get('usedLang'),
          o = t || Cc.getZoom();
        return new Promise(function (e) {
          Xt('/reverse/v3/'.concat(n, '/').concat(i, '/').concat(o, '?lang=').concat(r), { ttl: 864e5 })
            .then(function (t) {
              var o = t.data,
                a = o.locality,
                s = o.suburb,
                l = o.city,
                c = o.county,
                u = o.district,
                d = o.state,
                h = o.country,
                f = o.island,
                m = c || u || d || '',
                p = s || a,
                v =
                  p && l && p !== l
                    ? ''.concat(p, ', ').concat(l)
                    : p || s || l || f || m || (d && ''.concat(d, ', ').concat(h)) || h;
              e({ lat: n, lon: i, lang: r, region: m, country: h || '', name: v || ac(n, i), nameValid: !!v });
            })
            .catch(function (t) {
              e({ lat: n, lon: i, lang: r, name: ac(n, i) });
            });
        });
      },
    }),
    Dh = ft.get('storedSettings') || 0,
    Uh = function (e) {
      return 'settings_'.concat(e);
    },
    Wh = function (e) {
      return ''.concat(Uh(e), '_ts');
    },
    Fh = function (e) {
      return Boolean(e in ct && 'object' === P(ct[e]) && ct[e].sync);
    },
    Gh = function () {
      var e,
        t = {},
        n = 0;
      for (var i in ct) {
        var r = i;
        if (Fh(r)) {
          var o = +(ct[(e = r)].update || ft.get('settings_'.concat(e, '_ts')) || 0);
          o > Dh && ((t[Uh(r)] = vt.get(r, { forceGet: !0 })), (t[Wh(r)] = o), (n = Math.max(n, o)));
        }
      }
      return { toStore: t, updated: n };
    };
  function Hh() {
    var e = Gh(),
      t = e.toStore,
      n = e.updated;
    return n
      ? new Promise(function (e, i) {
          var r,
            o = null === (r = vt.get('user')) || void 0 === r ? void 0 : r.userslug;
          (o || i(new Error('No user slug')),
            Qt('/users/settings', { data: { version: 4, user: o, data: t, storeTs: n } })
              .then(function () {
                ((Dh = n), ft.put('storedSettings', n), e(!0));
              })
              .catch(function (t) {
                (Ye('settings', 'Cant save settings to the cloud', t), e(!1));
              }));
        })
      : Promise.resolve(!0);
  }
  function zh() {
    return Xt('/users/settings?storeTs='.concat(Dh), { cache: !1 })
      .then(function (e) {
        var t = e.status,
          n = e.data;
        ((ft.get('lastSyncableUpdatedItem') || 0) > Dh && Hh(),
          304 !== t &&
            n &&
            n.data &&
            n.version > 1 &&
            (!(function (e) {
              var t = !1;
              for (var n in ct) {
                var i = n;
                if (Fh(i) && Uh(i) in e) {
                  var r = Wh(i),
                    o = e[r],
                    a = ft.get(r);
                  if (!a || a < o) {
                    var s = e[Uh(i)];
                    (null === s
                      ? vt.remove(i, { doNotCheckValidity: !0, doNotSaveToCloud: !0 })
                      : vt.set(i, s, { update: o, doNotSaveToCloud: !0 }),
                      /color_/.test(i) && (t = !0));
                  }
                }
              }
              t && dn.emit('redrawLayers');
            })(n.data),
            n.storeTs > Dh && ((Dh = n.storeTs), ft.put('storedSettings', n.storeTs))));
      })
      .catch(function (e) {
        Ye('settings', 'Cant load/merge settings from cloud', e);
      });
  }
  var Bh = be(Hh, 2e3);
  vt.on('_cloudSync', Bh);
  var jh,
    Vh,
    Yh,
    qh,
    Zh = function () {
      var e = ft.get('lastSentDevice');
      return e
        ? ((e.deactivated = !0),
          (function (e) {
            return Kt('/users/v3/devices/'.concat(e.deviceID), { data: e })
              .then(function () {
                ((e.updated = Date.now()), ft.put('lastSentDevice', e));
              })
              .catch(function (e) {
                Ye('devices', 'Cannot save the device', e);
              });
          })(e).then(function () {
            ft.remove('lastSentDevice');
          }))
        : Promise.resolve();
    },
    Xh = function () {
      return vt.get('user');
    },
    Jh = function () {
      var e = vt.get('user');
      return (e && e.avatar) || 'https://www.windy.com/img/avatar.jpg';
    },
    Qh = function () {
      var e = vt.get('user');
      return (e && e.username) || '';
    },
    Kh = He(ee ? '#mobile-avatar' : '#user'),
    $h = function () {
      if (jh)
        try {
          jh.parentElement.removeChild(jh);
        } catch (e) {
          Ye('user', 'Unable to unattach avatar', e);
        }
    },
    ef = function () {
      if (Kh) {
        var e = He('.avatar-notification', Kh);
        if (e) {
          var t = vt.get('badgeNumber');
          t > 0 ? (e.innerText = String(t)) : e.remove();
        }
      }
    },
    tf = function () {
      document.body.dataset.user = 'logged-in';
      try {
        ($h(),
          (jh = (function () {
            var e = vt.get('badgeNumber'),
              t = Kn() ? '<div class="premium-logo"></div>' : '',
              n = '<div class="avatar-wrapper">\n            <div\n                '
                .concat(
                  ee ? '' : 'class="tooltip-down" data-tooltip="'.concat(bn.MY_ACCOUNT, ': ').concat(Qh(), '"'),
                  '\n                data-do="rqstOpen,',
                )
                .concat(ee ? 'favs' : 'user-menu', '">\n                    <img class="avatar" src="')
                .concat(Jh(), '" alt="')
                .concat(Qh(), '" />\n                    ')
                .concat(e ? '<div class="avatar-notification">'.concat(e, '</div>') : '', '\n                    ')
                .concat(t, '\n            </div>\n        </div>'),
              i = document.createElement('template');
            i.innerHTML = n;
            var r = i.content.childNodes[0];
            return (new Hu({ el: r }), r);
          })()),
          null == Kh || Kh.appendChild(jh));
      } catch (e) {
        Ye('user', 'Unable to attach avatar', e);
      }
    },
    nf = function () {
      var e = $n(),
        t = e ? ti(e) : null;
      if (t) {
        var n = '<span  data-do="rqstOpen,subscription" data-icon="">'.concat(t, '</span>');
        new wi({
          ident: 'message-subs-issue',
          className: 'top-message bg-orange clickable',
          timeout: 12e4,
          html: n,
        }).open();
      }
    },
    rf = !1,
    of = '2023/11',
    af = function () {
      vt.set('consent', { version: of, timestamp: Date.now(), analytics: !0, explicit: !1 });
    },
    sf = function (e) {
      null != e && e.requiresCookieConsent
        ? (function () {
            var e = vt.get('consent'),
              t = e ? (Date.now() - e.timestamp) / 1e3 / 60 / 60 / 24 : 0,
              n = e && !1 === e.explicit,
              i = e && ((!e.analytics && t >= 90) || (e.analytics && t >= 365));
            ((n || i) && vt.remove('consent'), vt.get('consent'));
          })()
        : vt.get('consent') || af();
    },
    lf = function (e) {
      if ((e.token && vt.set('userToken', e.token), null != e && e.auth)) {
        var t,
          n = e.subscriptionInfo;
        (vt.set('user', null !== (t = e.userInfo) && void 0 !== t ? t : null), vt.set('subscriptionInfo', n || null));
        var i = 'active' === (null == n ? void 0 : n.status) ? n.tier : null;
        return (
          Qn(i, { subscriptionInfo: n }),
          zh().finally(function () {
            return sf(e.userInfo);
          }),
          rf ||
            ((rf = !0),
            vt.get('consent') ||
              vt.once('consent', function () {
                return dn.emit('rqstClose', 'consent');
              }),
            vt.on('user', ef),
            vt.on('badgeNumber', tf),
            vt.on('subscription', tf),
            vt.on('subscription', nf)),
          tf(),
          nf(),
          Zn('events', 'user-logged/in'),
          !0
        );
      }
      return (sf(e.userInfo), Qn(null), Zn('events', 'user-logged/out'), !1);
    },
    cf = function () {
      return new Promise(function (e, t) {
        Xt('https://account.windy.com/api/info', { cache: !1, qs: { country: vt.get('country') } })
          .then(function (t) {
            lf(t.data) ? e(t) : ((document.body.dataset.user = 'logged-out'), e(null));
          })
          .catch(function (e) {
            (Ye('user', 'Cannot load user info:', e), t('Failed to load user info: '.concat(e)));
          });
      });
    },
    uf = function (e) {
      var t;
      if (e)
        if (200 === e.status && null !== (t = e.data) && void 0 !== t && t.userInfo) {
          0;
          var n = lf(e.data.userInfo);
          n
            ? (tf(),
              dn.emit('rqstClose', 'login'),
              new wi({
                ident: 'message-loggin-ok',
                className: 'top-message bg-ok',
                timeout: 3e3,
                html: bn.MSG_LOGIN_SUCCESFULL,
              }).open())
            : Ye('user', 'Login failed, auth='.concat(n));
        } else {
          var i;
          Ye(
            'user',
            'Login failed, status='
              .concat(e.status, ', userInfo=')
              .concat(JSON.stringify(null === (i = e.data) || void 0 === i ? void 0 : i.userInfo)),
          );
        }
    },
    df = Object.freeze({
      __proto__: null,
      checkAuth: lf,
      getAvatar: Jh,
      getEmail: function () {
        var e = vt.get('user');
        return (e && e.email) || '';
      },
      getInfo: Xh,
      getUserId: function () {
        var e,
          t = Xh();
        return null !== (e = null == t ? void 0 : t.id) && void 0 !== e ? e : 0;
      },
      getUsername: Qh,
      handleLoginResponse: uf,
      isLoggedIn: function () {
        return Boolean(vt.get('user'));
      },
      isPublisher: function () {
        return vt.hasProperty('userIsPublisher') && vt.get('userIsPublisher');
      },
      login: function () {
        return dn.emit('rqstOpen', 'login');
      },
      logout: function () {
        (vt.off('user', ef),
          vt.off('badgeNumber', tf),
          vt.off('subscription', tf),
          vt.off('subscription', nf),
          $h(),
          (document.body.dataset.user = 'logged-out'),
          Promise.all([Zh(), Hh(), Xt('https://account.windy.com/api/logout', { cache: !1 })])
            .catch(function (e) {
              return Ye('user', 'Error while deactivating device and cloud sync:', e);
            })
            .then(function () {
              (Qn(null),
                Jn(),
                Jl.reset(),
                Jl.unstoreOverflowed(),
                Oh.clean(),
                vt.remove('user'),
                vt.remove('userToken'),
                vt.remove('consent'),
                setTimeout(function () {
                  window.location.reload(!0);
                }, 500));
            }),
          Zn('events', 'logout'));
      },
      register: function () {
        return dn.emit('rqstOpen', 'login', { reason: 'register' });
      },
      reloadInfo: cf,
      setExplicitConsent: function (e) {
        vt.set('consent', { version: of, timestamp: Date.now(), analytics: e, explicit: !0 });
      },
      setImplicitConsent: af,
    }),
    hf = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        var i, r, o, a;
        return (
          m(this, n),
          ((o = t.call(this, e)).initValue = null !== (i = e.initValue) && void 0 !== i ? i : null),
          (o.onset = null !== (r = e.onset) && void 0 !== r ? r : o.onset),
          o.el && o.initValue && (a = o.getEl(o.initValue)) && a.classList.add('selected'),
          (o.selected = o.initValue),
          o
        );
      }
      return (
        v(n, [
          {
            key: 'set',
            value: function (e, t) {
              this.click('set', e, t);
            },
          },
          {
            key: 'getEl',
            value: function (e) {
              return He('*[data-do="set,'.concat(e, '"]'), this.el);
            },
          },
          {
            key: 'click',
            value: function (e, t, n) {
              if ('set' === e) {
                var i = He('.selected', this.el),
                  r = this.getEl(t);
                (i && i.classList.remove('selected'),
                  r && r.classList.add('selected'),
                  n || t === this.selected || this.onset(t),
                  (this.selected = t));
              } else if (e in this) {
                var o = this[e];
                ze(o) && o.call(this, t);
              }
            },
          },
          { key: 'onset', value: function (e) {} },
        ]),
        n
      );
    })(Hu),
    ff = Object.freeze({ __proto__: null, Switch: hf }),
    mf = (function (e) {
      s(i, e);
      var n = c(i);
      function i(e) {
        var t;
        return (
          m(this, i),
          ((t = n.call(this, S(S({}, e), {}, { initValue: vt.get(e.bindStore) }))).bindStore = e.bindStore),
          vt.on(t.bindStore, t.set, d(t)),
          'function' == typeof t.render && vt.on('usedLang', t.render, d(t)),
          t
        );
      }
      return (
        v(i, [
          {
            key: 'unmount',
            value: function () {
              (vt.off(this.bindStore, this.set, this),
                'function' == typeof this.render && vt.off('usedLang', this.render, this));
            },
          },
          {
            key: 'set',
            value: function (e, t) {
              var n = He('.selected', this.el),
                i = this.getEl(e);
              (n && n.classList.remove('selected'), i && i.classList.add('selected'));
            },
          },
          {
            key: 'click',
            value: function (e, t) {
              if ('set' === e) vt.set(this.bindStore, t);
              else {
                var n = this[e];
                ze(n) && n.call(this, t);
              }
              this.onset(t);
            },
          },
          {
            key: 'getEl',
            value: function (e) {
              return e ? t(f(i.prototype), 'getEl', this).call(this, String(e)) : null;
            },
          },
        ]),
        i
      );
    })(hf),
    pf = Object.freeze({ __proto__: null, BindedSwitch: mf }),
    vf = (function (e) {
      s(i, e);
      var n = c(i);
      function i() {
        return (m(this, i), n.apply(this, arguments));
      }
      return (
        v(i, [
          {
            key: 'toggle',
            value: function () {
              Kn()
                ? t(f(i.prototype), 'toggle', this).call(this)
                : dn.emit('rqstOpen', 'subscription', { promote: 'granularity' });
            },
          },
        ]),
        i
      );
    })(Vd),
    gf = Object.freeze({ __proto__: null, Detail1hCheckbox: vf }),
    yf = (function () {
      function e(t) {
        (m(this, e),
          (this.scrollEl = t.scrollEl),
          this.scrollEl.addEventListener('mousedown', this.startDrag.bind(this)));
      }
      return (
        v(e, [
          {
            key: 'getX',
            value: function (e) {
              return Be(e) ? e.touches[0].pageX : e.pageX;
            },
          },
          {
            key: 'startDrag',
            value: function (e) {
              var t = this;
              e.preventDefault();
              var n = this.getX(e),
                i = 0,
                r = 0,
                o = Date.now(),
                a = 0,
                s = this.scrollEl.scrollLeft,
                l = function () {
                  var e = Date.now(),
                    n = e - o,
                    i = t.scrollEl.scrollLeft,
                    r = i - s;
                  ((o = e), (s = i), (a = Oe(0.8 * ((1e3 * r) / (1 + n)) + 0.2 * a, -500, 500)));
                },
                c = setInterval(l, 100);
              (l(), window.cancelAnimationFrame(this.inertiaAnim));
              var u = function (e) {
                  var i = t.getX(e);
                  ((t.scrollEl.scrollLeft += n - i), (n = i), e.preventDefault(), e.stopPropagation());
                },
                d = function e() {
                  var n = Date.now() - o,
                    a = -i * Math.exp(-n / 325);
                  Math.abs(a) > 0.5 &&
                    n < 3e3 &&
                    ((t.scrollEl.scrollLeft = r + a), (t.inertiaAnim = window.requestAnimationFrame(e)));
                };
              (window.addEventListener('mousemove', u),
                window.addEventListener('mouseup', function n() {
                  (clearInterval(c),
                    window.removeEventListener('mousemove', u),
                    window.removeEventListener('mouseup', n),
                    Math.abs(a) > 10 &&
                      ((i = 0.6 * a),
                      (r = t.scrollEl.scrollLeft + i),
                      (o = Date.now()),
                      (t.inertiaAnim = window.requestAnimationFrame(d))),
                    e.preventDefault(),
                    e.stopPropagation());
                }));
            },
          },
        ]),
        e
      );
    })(),
    wf = Object.freeze({ __proto__: null, DraggableDiv: yf }),
    bf = (function (e) {
      s(i, e);
      var n = c(i);
      function i(e) {
        var t, r;
        return (
          m(this, i),
          ((r = n.call(this, e)).fill = null !== (t = e.fill) && void 0 !== t ? t : r.fill),
          (r.opened = !1),
          (r.switch = He('ul', r.el)),
          r.el.addEventListener('click', r.toggle.bind(d(r))),
          (r.bindedClose = r.close.bind(d(r))),
          r.fill(),
          r
        );
      }
      return (
        v(i, [
          {
            key: 'set',
            value: function (e, n) {
              (t(f(i.prototype), 'set', this).call(this, e, n), this.fill());
            },
          },
          {
            key: 'fill',
            value: function () {
              var e = this.getEl(this.selected);
              e
                ? (this.el.dataset.content = e.textContent)
                : console.error('DropDown produced empty value for:', this.selected);
            },
          },
          {
            key: 'toggle',
            value: function () {
              this.opened ? (this.fill(), this.close()) : this.open();
            },
          },
          {
            key: 'open',
            value: function () {
              (this.switch.classList.add('show'), this.el.classList.add('opened'), (this.opened = !0));
            },
          },
          {
            key: 'close',
            value: function () {
              (this.switch.classList.remove('show'), this.el.classList.remove('opened'), (this.opened = !1));
            },
          },
        ]),
        i
      );
    })(hf),
    Tf = Object.freeze({ __proto__: null, DropDown: bf }),
    Ef = (function () {
      function e(t) {
        (m(this, e),
          _(this, 'scrollTicking', !1),
          _(this, 'scrollEndTimer', null),
          (this.scrollEl = t.scrollEl),
          this.scrollEl.addEventListener('scroll', this.scrollFired.bind(this)));
      }
      return (
        v(e, [
          { key: 'onscroll', value: function (e) {} },
          {
            key: 'scrollTo',
            value: function (e) {
              var t = this,
                n = this.scrollEl.scrollLeft,
                i = Date.now(),
                r = e - n,
                o = i + Math.max(500, 1.2 * Math.abs(r));
              !(function e() {
                var a = Date.now();
                ((t.scrollEl.scrollLeft = Le(i, o, a) * r + n), a < o && window.requestAnimationFrame(e));
              })();
            },
          },
          { key: 'onscrollend', value: function () {} },
          {
            key: 'scrollFired',
            value: function (e) {
              this.scrollTicking ||
                (window.requestAnimationFrame(this.onscroll.bind(this, e)),
                clearTimeout(this.scrollEndTimer),
                (this.scrollEndTimer = setTimeout(this.onscrollend.bind(this), 100)),
                (this.scrollTicking = !0));
            },
          },
        ]),
        e
      );
    })(),
    Sf = Object.freeze({ __proto__: null, Scrollable: Ef }),
    _f = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        var i, r;
        (m(this, n),
          ((r = t.call(this, e)).bindedStore = null !== (i = e.bindedStore) && void 0 !== i ? i : 'timestamp'),
          vt.on(r.bindedStore, r.set, d(r)),
          vt.on('hourFormat', r.render, d(r)),
          vt.on('calendar', r.render, d(r)),
          vt.on('usedLang', r.render, d(r)),
          vt.on('zuluMode', r.render, d(r)),
          window.addEventListener('resize', setTimeout.bind(null, r.render.bind(d(r)), 500)),
          setInterval(r.render.bind(d(r)), ce),
          (r.boxEl = e.boxEl),
          (r.wrapperEl = e.wrapperEl),
          (r.scrolling = e.scrolling),
          (r.noAnimation = e.noAnimation),
          (r.tsPx = e.tsPx),
          (r.calExpandedTimeout = e.calExpandedTimeout),
          (r.UIident = e.UIident),
          r.render(),
          r.set(vt.get(r.bindedStore)),
          dn.on('detailClose', function () {
            r.set(vt.get(r.bindedStore));
          }),
          new yf({ scrollEl: e.scrollEl }));
        try {
          new IntersectionObserver(function (e) {
            e.forEach(function (e) {
              e.intersectionRatio > 0 && r.set(r.timestamp);
            });
          }).observe(r.scrollEl);
        } catch (e) {}
        return r;
      }
      return (
        v(n, [
          {
            key: 'unmount',
            value: function () {
              (vt.off(this.bindedStore, this.set, this),
                vt.off('hourFormat', this.render, this),
                vt.off('calendar', this.render, this),
                vt.off('usedLang', this.render, this),
                vt.off('zuluMode', this.render, this));
            },
          },
          {
            key: 'onscroll',
            value: function (e) {
              (this.slideUp(),
                (this.timestamp = this.tsPx * e.target.scrollLeft + this.calendar.start),
                this.renderBox(),
                (this.scrollTicking = !1));
            },
          },
          {
            key: 'render',
            value: function () {
              ((this.calendar = vt.get('calendar')),
                (this.zuluMode = vt.get('zuluMode')),
                (this.localeHours = oi()),
                (this.timestamp = 0));
              var e = this.calendar;
              if (e) {
                for (
                  var t = e.days.filter(function (t) {
                      return t.start < e.end;
                    }),
                    n = '12h' === vt.get('hourFormat'),
                    i = '<b></b>',
                    r = '',
                    o = 4;
                  o < 24;
                  o += 3
                ) {
                  r += '<li>'.concat(Ee(n ? ((o + 11) % 12) + 1 : o), '</li>');
                }
                for (var a = 0; a < t.length; a++) {
                  var s,
                    l,
                    c = t[a],
                    u =
                      (null === (s = this.calendar) || void 0 === s ? void 0 : s.premiumStart) &&
                      (null === (l = this.calendar) || void 0 === l ? void 0 : l.premiumStart) < c.end;
                  i += '<div>\n            <div class="day">\n                '
                    .concat(u ? '<div class="premium-flag"></div>' : '', '\n                ')
                    .concat(bn[c.displayLong], '&nbsp;')
                    .concat(c.day, '\n            </div>\n            <ul>')
                    .concat(r, '</ul>\n        </div>');
                }
                this.scrollEl.innerHTML = i;
                var d = vt.get(this.bindedStore);
                (this.boxEl.removeAttribute('data-zulu'), this.set(d), this.renderBox());
                var h = He('b', this.scrollEl);
                h.style.left = window.innerWidth / 2 + (Date.now() - e.start) / this.tsPx - h.clientWidth / 2 + 'px';
              }
            },
          },
          {
            key: 'renderBox',
            value: function () {
              var e,
                t = null === (e = this.calendar) || void 0 === e ? void 0 : e.premiumStart;
              this.zuluMode && (this.boxEl.dataset.zulu = ai(this.timestamp));
              var n = this.localeHours(new Date(this.timestamp).getHours());
              this.boxEl.innerHTML =
                !Kn() && t && t < this.timestamp ? '<span class="iconfont"></span> '.concat(n) : n;
            },
          },
          {
            key: 'set',
            value: function (e, t) {
              if (this.calendar && t !== this.UIident) {
                this.timestamp = e;
                var n = (e - this.calendar.start) / this.tsPx;
                ((this.noAnimation = !0), (this.scrollEl.scrollLeft = n));
              }
            },
          },
          {
            key: 'onscrollend',
            value: function () {
              var e = this;
              this.scrolling = !1;
              var t = Oe(this.timestamp, this.calendar.start, this.calendar.end);
              (vt.set(this.bindedStore, t, { UIident: this.UIident }),
                (this.calExpandedTimeout = setTimeout(function () {
                  e.wrapperEl.classList.remove('mobile-calendar-expanded');
                }, 1500)));
            },
          },
          {
            key: 'slideUp',
            value: function () {
              (this.scrolling ||
                this.noAnimation ||
                ((this.scrolling = !0),
                clearTimeout(this.calExpandedTimeout),
                this.wrapperEl.classList.add('mobile-calendar-expanded')),
                this.noAnimation && ((this.scrolling = !0), (this.noAnimation = !1)));
            },
          },
        ]),
        n
      );
    })(Ef),
    Af = Object.freeze({ __proto__: null, MobileCalendar: _f }),
    Pf = (function (e) {
      s(i, e);
      var n = c(i);
      function i(e) {
        var t, r;
        return (
          m(this, i),
          _(d((r = n.call(this, S(S({}, e), {}, { bindStore: 'overlay' })))), 'toggleOverlays', function () {
            var e = jl.overlays;
            null != e && e.isOpen ? dn.emit('rqstClose', 'overlays') : dn.emit('rqstOpen', 'overlays');
          }),
          (r.onresize = null !== (t = e.onresize) && void 0 !== t ? t : r.onresize),
          e.resizableEl &&
            (r.resizable = new qd(S(S({}, e), {}, { resizableEl: e.resizableEl, onresize: r.onresize.bind(d(r)) }))),
          vt.on('favOverlays', r.render, d(r)),
          vt.on('expertMode', r.render, d(r)),
          vt.on('offlineMode', r.render, d(r)),
          r
        );
      }
      return (
        v(i, [
          {
            key: 'unmount',
            value: function () {
              (t(f(i.prototype), 'unmount', this).call(this),
                vt.off('favOverlays', this.render, this),
                vt.off('expertMode', this.render, this),
                vt.off('offlineMode', this.render, this));
            },
          },
          {
            key: 'render',
            value: function () {
              (this._render(), this.set(vt.get('overlay')));
            },
          },
          {
            key: 'set',
            value: function (e) {
              (this.unfold(e), t(f(i.prototype), 'set', this).call(this, e));
            },
          },
          { key: 'onresize', value: function () {} },
          {
            key: 'unfold',
            value: function (e) {
              for (
                var t = zs[e], n = (t && t.parentMenu) || e, i = this.el.querySelectorAll('[data-parent]'), r = 0;
                r < i.length;
                r++
              ) {
                var o = i[r];
                h(o, o.dataset.parent === n, 'menu-unfold');
              }
            },
          },
          {
            key: 'getEl',
            value: function (e) {
              var n;
              if (!e) return null;
              var r = null !== (n = zs[e].partOf) && void 0 !== n ? n : e;
              return t(f(i.prototype), 'getEl', this).call(this, r);
            },
          },
          {
            key: '_render',
            value: function () {
              var e,
                t,
                n = vt.get('favOverlays'),
                i = vt.get('offlineMode'),
                r = vt.get('expertMode'),
                o = vt.get('usedLang'),
                a =
                  (mi(o),
                  i
                    ? ['radar', 'satellite'].concat(
                        null !== (e = null === (t = vt.get('offlineSetting')) || void 0 === t ? void 0 : t.overlays) &&
                          void 0 !== e
                          ? e
                          : [],
                      )
                    : []),
                s = {},
                l = {},
                c = 1,
                u = 0;
              r ||
                i ||
                ye(zs, function (e, t) {
                  var i = e.virtual,
                    r = e.parentMenu;
                  !i && r && n.includes(t) && zs[r].virtual && (l[r] || (l[r] = []), l[r].push(t));
                });
              var d = H.map(function (e) {
                var t = zs[e],
                  o = t.allwaysOn,
                  u = t.parentMenu,
                  d = t.virtual,
                  h = t.globeNotSupported,
                  f = t.menuTrans || t.trans,
                  m = t.menuIcon || t.icon,
                  p = e in l,
                  v = i ? a.includes(e) : n.includes(e) || o || p;
                if (!t || !f || !m || !v || (r && d) || t.partOf) return '';
                var g = u && (n.includes(u) || l[u]);
                u ? (u in s ? s[u]++ : (s[u] = 1)) : c++;
                var y = t.getMenuName();
                return '<a data-do="'
                  .concat(d ? 'unfold' : 'set', ',')
                  .concat(e, '" data-parent="')
                  .concat(u || 'isParent', '"\n                        ')
                  .concat('', '\n                        ')
                  .concat(
                    !r && !i && u && g
                      ? 'class="sub-menu'.concat(h ? ' globe-not-supported' : '', '"')
                      : h
                        ? 'class="globe-not-supported"'
                        : '',
                    '>\n                        <div class="iconfont notap">',
                  )
                  .concat(m, '</div>\n                        <div class="menu-text notap">')
                  .concat(y, '</div>\n                    </a>');
              }).join('');
              for (var h in ((d += i
                ? ''
                : '<a data-do="toggleOverlays" id="ovr-menu"\n                    '
                    .concat(
                      '',
                      '\n                    class="menu-unfold">\n                        <div class="iconfont notap"><</div>\n                        <div class="menu-text notap">',
                    )
                    .concat(bn.MORE_LAYERS, '</div>\n                    </a>')),
              s))
                u = Math.max(u, s[h]);
              ((this.iconNum = r ? 1 + n.length : c + u), (this.el.innerHTML = d));
            },
          },
        ]),
        i
      );
    })(mf),
    kf = Object.freeze({ __proto__: null, OverlaysMenu: Pf }),
    Cf = [
      'camsEu',
      'cams',
      'ecmwf',
      'ecmwfWaves',
      'gfs',
      'bomAccess',
      'hrrrAlaska',
      'hrrrConus',
      'namConus',
      'namHawaii',
      'namAlaska',
      'gfsWaves',
      'iconD2',
      'iconEu',
      'icon',
      'iconEuWaves',
      'iconWaves',
      'nems',
      'arome',
      'aromeAntilles',
      'aromeReunion',
      'ukv',
    ],
    Of = ['ukv', 'hrrrAlaska', 'hrrrConus', 'namHawaii'],
    Lf = (function (e) {
      s(n, e);
      var t = c(n);
      function n(e) {
        var i, r;
        return (
          m(this, n),
          ((r = t.call(this, S(S({}, e), {}, { bindStore: 'product' }))).showResolution =
            null === (i = e.showResolution) || void 0 === i || i),
          vt.on('availProducts', r.redraw, d(r)),
          vt.on('visibleProducts', r.redraw, d(r)),
          vt.on('product', r.redraw, d(r)),
          vt.on('offlineMode', r.redraw, d(r)),
          r.redraw(),
          r
        );
      }
      return (
        v(n, [
          {
            key: 'printHTML',
            value: function () {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                n = vt.get('availProducts'),
                i = t
                  .map(function (t) {
                    var i = ko[t];
                    return '<div data-do="set,'
                      .concat(t, '" class="i')
                      .concat(n.includes(t) ? '' : ' disabled', '">')
                      .concat(i.modelName)
                      .concat(
                        e.showResolution && i.modelResolution ? '<small>'.concat(i.modelResolution, 'km</small>') : '',
                        '</div>',
                      );
                  })
                  .join('');
              this.el.innerHTML = i;
            },
          },
          {
            key: 'redraw',
            value: function () {
              for (
                var e,
                  t = vt.get('visibleProducts'),
                  n = vt.get('product'),
                  i = V.includes(n),
                  r = Y.includes(n),
                  o = vt.get('offlineMode'),
                  a = vt.get('offlineDataInfo'),
                  s = null !== (e = null == a ? void 0 : a.products) && void 0 !== e ? e : [],
                  l = Cf.filter(function (e) {
                    var n = V.includes(e),
                      a = Y.includes(e);
                    return t.includes(e) && i === n && r === a && (!o || s.includes(e));
                  }),
                  c = 0;
                c < Of.length;
                c++
              ) {
                var u = Of[c],
                  d = l.indexOf(u);
                if (d > -1) {
                  (l.splice(d, 1), l.splice(1, 0, u));
                  break;
                }
              }
              (this.printHTML(l), this.set(n));
            },
          },
        ]),
        n
      );
    })(mf),
    If = Object.freeze({ __proto__: null, ProductSwitch: Lf }),
    Rf = S(
      S(
        {},
        (qh =
          null !== (Vh = null === (Yh = W.embed) || void 0 === Yh ? void 0 : Yh.queryString) && void 0 !== Vh
            ? Vh
            : {}),
      ),
      {},
      {
        detailLat: +qh.detailLat,
        detailLon: +qh.detailLon,
        embedMake: Gf(qh.embedMake),
        hideMenu: Gf(qh.menu),
        hideMessage: Gf(qh.message),
        lat: +qh.lat,
        lon: +qh.lon,
        metricRain: Hf(qh.metricRain),
        metricWind: Hf(qh.metricWind),
        metricTemp: Hf(qh.metricTemp),
        play: Gf(qh.play),
        pressure: Gf(qh.pressure),
        showDetail: Gf(qh.detail),
        showMarker: Gf(qh.marker),
        zoom: +qh.zoom,
      },
    );
  'coordinates' === Rf.location &&
    Rf.lat &&
    Rf.lon &&
    (vt.set('startUp', 'location'), vt.set('homeLocation', { lat: Rf.lat, lon: Rf.lon, title: '' }));
  var xf = 'https://www.windy.com/',
    Nf = '&utm_medium=embed-'.concat(Rf.type || 'map', '&utm_source=').concat(encodeURIComponent(document.referrer)),
    Mf = '',
    Df = function () {
      var e = vt.get('overlay'),
        t = ['radar', 'satellite'].includes(e);
      setTimeout(
        function () {
          var t,
            n = null === (t = zs[e]) || void 0 === t ? void 0 : t.getName();
          He('#ovr-select-name').innerHTML = n;
        },
        t ? 100 : 0,
      );
    };
  if (
    (vt.on('overlay', Df),
    Rf.level && vt.set('level', Rf.level),
    Rf.overlay && vt.set('overlay', Rf.overlay),
    Df(),
    Rf.play &&
      setTimeout(function () {
        'radar' === Rf.overlay
          ? vt.set('radarAnimation', !0)
          : 'satellite' === Rf.overlay
            ? vt.set('satelliteAnimation', !0)
            : vt.set('animation', !0);
      }, 500),
    Rf.pressure && vt.set('isolines', 'pressure'),
    'map' === Rf.type && /in|12|24/.test(Rf.calendar))
  ) {
    var Uf = /12|24/.test(Rf.calendar) ? Rf.calendar : Rf.forecast;
    vt.set('timestamp', Date.now() + +Uf * ce);
  }
  function Wf() {
    switch (((document.documentElement.id = 'device-desktop'), Rf.type)) {
      case 'alert':
        (Hn('/embedAlertShot'),
          document.body.classList.add('embed-alert'),
          zs.wind.setMetric(null !== (e = Rf.metricWind) && void 0 !== e ? e : 'kt'),
          zs.temp.setMetric(null !== (t = Rf.metricTemp) && void 0 !== t ? t : '°C'),
          zs.rain.setMetric(null !== (n = Rf.metricRain) && void 0 !== n ? n : 'mm'),
          (jd.hasTimestamps = function () {
            return Rf.timestamps
              ? Rf.timestamps.split('-').map(function (e) {
                  return +e;
                })
              : null;
          }),
          dn.emit('rqstOpen', 'detail', Rf));
        break;
      case 'forecast':
        !(function () {
          (Hn('/embedForecast'),
            document.body.classList.add('embed-forecast'),
            Rf.metricWind && zs.wind.setMetric(Rf.metricWind || 'kt'));
          Rf.metricTemp && zs.temp.setMetric(Rf.metricTemp || '°C');
          Rf.metricRain && zs.rain.setMetric(Rf.metricRain || 'mm');
          var e = { lat: +Rf.detailLat, lon: +Rf.detailLon, zoom: Math.min(11, +Rf.zoom), source: 'picker' };
          (dn.emit('rqstOpen', 'detail', e),
            dn.once('detailRendered', function () {
              var e = document.createElement('a');
              ((e.href = xf + Rf.detailLat + '/' + Rf.detailLon + '?' + Nf),
                (e.className = 'embed-link'),
                (e.target = '_top'),
                He('.legend-days').appendChild(e));
            }));
        })();
        break;
      default:
        !(function () {
          (document.body.classList.add('embed-map'),
            Rf.metricWind && vt.set('metric_wind', Rf.metricWind, { forceChange: !0 }));
          Rf.metricTemp && vt.set('metric_temp', Rf.metricTemp, { forceChange: !0 });
          Rf.metricRain && vt.set('metric_rain', Rf.metricRain, { forceChange: !0 });
          (Hn(
            '/embedMap'
              .concat(Rf.showDetail ? '-withDetail' : '')
              .concat(Rf.showMarker ? '-withMarker' : '', '/')
              .concat(Rf.overlay || 'wind'),
          ),
            vt.setDefault('favOverlays', H),
            vt.setDefault('wasDragged', !0),
            Rf.hideMenu && document.body.classList.add('hide-controls'));
          Rf.hideMessage && document.body.classList.add('hide-message');
          if (Rf.showDetail) {
            var e = { lat: Rf.detailLat, lon: Rf.detailLon, zoom: Math.min(11, +Rf.zoom), source: 'picker' };
            (dn.emit('rqstOpen', 'detail', e),
              dn.once('detailRendered', function () {
                return Ff(e, 180);
              }));
          } else
            Rf.showMarker &&
              dn.once('redrawFinished', function () {
                dn.emit('rqstOpen', 'picker', { lat: Rf.detailLat, lon: Rf.detailLon });
              });
          (window.addEventListener('focus', function () {
            Hn('/embedMap/interaction');
          }),
            dn.once('redrawFinished', function () {
              setTimeout(function () {
                return dn.emit('uiChanged');
              }, 500);
            }),
            dn.on('redrawFinished', function (e) {
              var t = vt.get('mapCoords');
              Mf = [e.overlay, e.level, t.lat.toFixed(3), t.lon.toFixed(3), t.zoom].join(',');
              var n = xf + '?' + Mf + Nf,
                i = He('#note-message');
              i && (i.href = n);
              var r = He('#logo');
              r && (r.href = n);
            }));
        })();
    }
    var e, t, n;
    Rf.embedMake &&
      window.parent !== window &&
      (function () {
        (dn.on('pluginOpened', function (e) {
          'picker' === e ? zf({ showMarker: !0 }) : 'detail' === e && dn.emit('rqstClose', 'picker');
        }),
          dn.on('pluginClosed', function (e) {
            'picker' === e ? zf({ showMarker: !1 }) : 'detail' === e && zf({ showDetail: !1 });
          }),
          vt.on('pickerLocation', function (e) {
            e && zf({ coordinates: e });
          }));
        var e = { metric_wind: 'windUnit', metric_temp: 'temperatureUnit', metric_rain: 'rainUnit' };
        (Object.keys(e).forEach(function (t) {
          vt.on(t, function (n, i) {
            'detail' === i && zf(_({}, e[t], n));
          });
        }),
          dn.on('detailRendered', function () {
            var e = vt.get('detailLocation'),
              t = { lat: e.lat, lon: e.lon };
            (zf({ showDetail: !0, coordinates: t }), Ff(t, 180));
          }));
        var t = function (e) {
          var t = e.level,
            n = e.overlay,
            i = e.product,
            r = vt.get('mapCoords'),
            o = r.lat,
            a = r.lon,
            s = r.zoom,
            l = {
              coordinates: { lat: o, lon: a },
              level: t,
              levelText: 'surface' === t ? bn.SFC : ie[t].join(', '),
              overlay: n,
              overlayName: zs[n].getName(),
              product: i,
              productName: ko[i].modelName,
              zoom: s,
            };
          Bf({ type: 'updateValues', payload: l });
        };
        (dn.on('redrawFinished', t),
          dn.on('paramsChanged', t),
          (window.onmessage = function (e) {
            if (
              (function (e) {
                var t = e.data;
                return !!t && 'object' === P(t) && 'type' in t && 'updateEmbed' === t.type;
              })(e)
            ) {
              var t = e.data.payload;
              (t.showDetail
                ? dn.emit('rqstOpen', 'detail', { lat: t.detailLat, lon: t.detailLon })
                : dn.emit('rqstClose', 'detail'),
                t.showMarker
                  ? dn.emit('rqstOpen', 'picker', { lat: t.detailLat, lon: t.detailLon })
                  : dn.emit('rqstClose', 'picker'),
                t.pressure ? vt.set('isolines', 'pressure') : vt.set('isolines', 'off'),
                t.hideMessage
                  ? document.body.classList.add('hide-message')
                  : document.body.classList.remove('hide-message'),
                t.metricWind &&
                  ('default' === t.metricWind
                    ? vt.set('metric_wind', vt.getDefault('metric_wind'))
                    : vt.set('metric_wind', t.metricWind)),
                t.metricRain &&
                  ('default' === t.metricRain
                    ? vt.set('metric_rain', vt.getDefault('metric_rain'))
                    : vt.set('metric_rain', t.metricRain)),
                t.metricTemp &&
                  ('default' === t.metricTemp
                    ? vt.set('metric_temp', vt.getDefault('metric_temp'))
                    : vt.set('metric_temp', t.metricTemp)));
            }
          }));
      })();
  }
  function Ff(e, t) {
    var n = e.lat,
      i = e.lon,
      r = Cc.latLngToContainerPoint([n, i]).y,
      o = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      );
    Cc.panBy([0, r - (o - t) / 2]);
  }
  function Gf(e) {
    return ![void 0, '', '0', 'false'].includes(e);
  }
  function Hf(e) {
    if (e && 'default' !== e) return e;
  }
  function zf(e) {
    Bf({ type: 'updateDetail', payload: e });
  }
  function Bf(e) {
    window.parent.postMessage(e, { targetOrigin: '*' });
  }
  setTimeout(
    r(
      n().mark(function e() {
        return n().wrap(
          function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  if (!Rf.product) {
                    e.next = 9;
                    break;
                  }
                  return ((e.prev = 1), (e.next = 4), vt.set('product', Rf.product));
                case 4:
                  e.next = 9;
                  break;
                case 6:
                  ((e.prev = 6), (e.t0 = e.catch(1)), console.error(e.t0));
                case 9:
                  'loading' !== document.readyState ? Wf() : document.addEventListener('DOMContentLoaded', Wf);
                case 10:
                case 'end':
                  return e.stop();
              }
          },
          e,
          null,
          [[1, 6]],
        );
      }),
    ),
  );
  ((W.$ = He),
    (W.BindedBar = $d),
    (W.BindedCheckbox = Yd),
    (W.BindedSwitch = pf),
    (W.BottomSlide = El),
    (W.Calendar = yi),
    (W.ClickHandler = zu),
    (W.Color = Si),
    (W.DataTiler = yu),
    (W.Detail1hCheckbox = gf),
    (W.Drag = yl),
    (W.DraggableDiv = wf),
    (W.DropDown = Tf),
    (W.Evented = $e),
    (W.GhostBox = Jd),
    (W.GlObj = qc),
    (W.IconProducts = Hr),
    (W.LabelsLayer = ph),
    (W.Legend = ju),
    (W.LongTap = Zu),
    (W.MobileCalendar = Af),
    (W.OverlaysMenu = kf),
    (W.ProductSwitch = If),
    (W.Resizable = Zd),
    (W.Scrollable = Sf),
    (W.Swipe = bl),
    (W.Switch = ff),
    (W.TimestampBar = th),
    (W.Window = Ti),
    (W.broadcast = dn),
    (W.colors = _i),
    (W.connection = Pt),
    (W.css = b),
    (W.define = an),
    (W.device = Rt),
    (W.errorLogger = rn),
    (W.favs = jd),
    (W.fetch = Wl),
    (W.format = pi),
    (W.ga = zn),
    (W.geolocation = gc),
    (W.hp = ad),
    (W.http = en),
    (W.interpolator = function (e) {
      var t = (function () {
        for (var e in Eu) {
          var t = Eu[e];
          if (t.isOpen && 'interpolator' in t) return t.interpolator;
        }
      })();
      t ? t.createFun(e) : e(Sh, Sh);
    }),
    (W.labelsLayer = vh),
    (W.location = ch),
    (W.log = Wd),
    (W.lruCache = xt),
    (W.map = Gc),
    (W.metrics = Dr),
    (W.models = $s),
    (W.notifications = Oh),
    (W.overlays = zs),
    (W.particles = Ah),
    (W.picker = Eh),
    (W.plugins = jl),
    (W.pois = Nh),
    (W.products = ko),
    (W.progressBar = nh),
    (W.promo = dd),
    (W.query = zl),
    (W.renderUtils = vl),
    (W.require = ln),
    (W.reverseName = Mh),
    (W.rhMessage = Oi),
    (W.rootScope = ae),
    (W.router = ql),
    (W.showableErrorsService = ic),
    (W.singleclick = hh),
    (W.storage = ft),
    (W.store = vt),
    (W.subscription = ni),
    (W.tinyrequire = cn),
    (W.trans = In),
    (W.user = df),
    (W.utils = Qe),
    W.broadcast.emit('dependenciesResolved'),
    W.broadcast.emit('rqstOpen', 'patch'));
};
'loading' !== document.readyState ? k() : document.addEventListener('DOMContentLoaded', k);
