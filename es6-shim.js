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

    methods(Number, {
        isFinite: function (value) {
            return typeof value === "number" && global.isFinite(value);
        }
    });

    function sign(n) { return (n < 0) ? -1 : 1 }

    method(Number, "toInteger", function (value) {
        var n = +value;
        if (isNaN(n)) {
            return +0;
        }
        if (n === 0 || !isFinite(n)) {
            return n;
        }
        return sign(n) * Math.floor(Math.abs(n));
    });

    //----------------- Object

    //// http://wiki.ecmascript.org/doku.php?id=strawman:extended_object_api
    method(Object, "getOwnPropertyDescriptors", function (obj) {
        var descs = {};
        Object.getOwnPropertyNames(obj).forEach(function(propName) {
            descs[propName] = Object.getOwnPropertyDescriptor(obj, propName);
        });
        return descs;
    });
}(this));