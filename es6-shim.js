// None of this code is mine, most of it is taken from the esnext wiki
// (sometimes with minor modifications)

// TODO: http://wiki.ecmascript.org/doku.php?id=harmony:proposals - API improvements
// TODO: http://wiki.ecmascript.org/doku.php?id=harmony:extended_object_api
// TODO: http://www.2ality.com/2011/11/uncurrying-this.html

(function (global) {
    "use strict";

    function method(obj, name, method) {
        if (!obj[name]) {
            Object.defineProperty(obj, name, { configurable: true, enumerable: false, writable: true, value: method });
        }
    }

    function methods(obj, map) {
        Object.keys(map).forEach(function (name) {
            method(obj, name, map[name]);
        });
    }

    //----------------- String.prototype
    //// http://wiki.ecmascript.org/doku.php?id=harmony:string.prototype.repeat
    //// http://wiki.ecmascript.org/doku.php?id=harmony:string_extras
    //// http://blogs.msdn.com/b/ie/archive/2011/11/22/evolving-ecmascript.aspx

    methods(String.prototype, {
        repeat: function (times) {
            times = Math.max(Number.toInteger(times), 0);
            return new Array(times + 1).join(this);
        },
        startsWith: function (s) {
            return this.indexOf(s) === 0;
        },
        endsWith: function (s) {
            var t = String(s);
            var index = this.lastIndexOf(t);
            return index >= 0 && index === this.length - t.length;
        },
        contains: function (s) {
            return this.indexOf(s) !== -1;
        },
        toArray: function () {
            return this.split('');
        }
    });

    //----------------- Array
    //// http://www.2ality.com/2011/07/array-from.html
    //// http://wiki.ecmascript.org/doku.php?id=strawman:array_extras

    methods(Array, {
        from: function (arrayLike) {
            return Array.prototype.slice.call(arrayLike);
        },
        of: function () {
            return Array.prototype.slice.call(arguments);
        }
    });

    //----------------- Number
    //// http://blogs.msdn.com/b/ie/archive/2011/11/22/evolving-ecmascript.aspx
    //// http://wiki.ecmascript.org/doku.php?id=harmony:number.isfinite
    //// http://wiki.ecmascript.org/doku.php?id=harmony:number.isinteger
    //// http://wiki.ecmascript.org/doku.php?id=harmony:number.isnan
    //// http://wiki.ecmascript.org/doku.php?id=harmony:number.tointeger

    var INTEGER_CUTOFF = 0x20000000000000;

    function sign(n) {
        return n < 0 ? -1 : 1;
    }

    methods(Number, {
        isFinite: function (value) {
            return typeof value === "number" && global.isFinite(value);
        },
        isInteger: function (value) {
            return Number.isFinite(value) &&
                   value > -INTEGER_CUTOFF && value < INTEGER_CUTOFF &&
                   Math.floor(value) === value;
        },
        isNaN: function (value) {
            return typeof value === "number" && global.isNaN(value);
        },
        toInteger: function (value) {
            var n = +value;
            if (global.isNaN(n)) {
                return +0;
            }
            if (n === 0 || !global.isFinite(n)) {
                return n;
            }
            return sign(n) * Math.floor(Math.abs(n));
        }
    });

    //----------------- Object
    //// http://wiki.ecmascript.org/doku.php?id=strawman:extended_object_api
    //// http://wiki.ecmascript.org/doku.php?id=harmony:egal

    methods(Object, {
        is: function (x, y) {
            if (x === y) {
                // +0 === -0, but they are not identical
                return x !== 0 || 1 / x === 1 / y;
            }

            // NaN !== NaN, but they are identical.
            // NaNs are the only non-reflexive value, i.e., if x !== x, then x is a NaN.
            // isNaN is broken: it converts its argument to number, so isNaN("foo") === true.
            return x !== x && y !== y;
        },
        isnt: function (x, y) {
            return !Object.is(x, y);
        }
    });

    method(Object, "getOwnPropertyDescriptors", function (obj) {
        var descs = {};
        Object.getOwnPropertyNames(obj).forEach(function(propName) {
            descs[propName] = Object.getOwnPropertyDescriptor(obj, propName);
        });
        return descs;
    });
}(this));