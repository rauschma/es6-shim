// None of this code is mine, most of it is taken from the esnext wiki
// (sometimes with minor modifications)

TODO: http://wiki.ecmascript.org/doku.php?id=harmony:proposals - API improvements
TODO: http://www.2ality.com/2011/11/uncurrying-this.html

//----------------- Strings

//// http://wiki.ecmascript.org/doku.php?id=harmony:string.prototype.repeat

if (!String.prototype.repeat) {
    String.prototype.repeat = function(times) {
        return new Array(times+1).join(this);
    };
}

//// http://wiki.ecmascript.org/doku.php?id=harmony:string_extras

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(s) {
        return this.indexOf(s) === 0;
    };
}

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(s) {
        var t = String(s);
        return this.lastIndexOf(t) === this.length - t.length;
    };
}

if (!String.prototype.contains) {
    String.prototype.contains = function(s) {
        return this.indexOf(s) !== -1;
    };
}

if (!String.prototype.toArray) {
    String.prototype.toArray = function() {
        return this.split('');
    }
}


//----------------- Arrays
// http://www.2ality.com/2011/07/array-from.html

if (!Array.from) {
    Array.from = function(arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    };
}

if (!Array.of) {
    Array.of = function() {
        return [].slice.call( arguments );
    };
}

//----------------- 

(function (global) {
    var abs = Math.abs,
        floor = Math.floor,
        isFinite = global.isFinite,
        isNaN = global.isNaN;
        
    function sign(n) { return (n < 0) ? -1 : 1; }
 
    Object.defineProperty(Number, 'toInteger', {
        value: function toInteger(value) {
            var n = +value;
            if (isNaN(n))
                return +0;
            if (n === 0 || !isFinite(n))
                return n;
            return sign(n) * floor(abs(n));
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
})(this);


if (!Object.getOwnPropertyDescriptors) {
    Object.getOwnPropertyDescriptors = function (obj) {
        var descs = {};
        Object.getOwnPropertyNames(obj).forEach(function(propName) {
            descs[propName] = Object.getOwnPropertyDescriptor(obj, propName);
        });
        return descs;
    };
}

