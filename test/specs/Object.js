describe("Object.is", function () {
    it("should say primitives are the same if and only if they obviously are", function () {
        expect(Object.is(0, 0)).toBe(true);
        expect(Object.is(0, 1)).toBe(false);
        expect(Object.is(Math.PI, Math.PI)).toBe(true);
        expect(Object.is(Math.PI, -Math.PI)).toBe(false);
        expect(Object.is("0", "0")).toBe(true);
        expect(Object.is("0", 0)).toBe(false);
    });
    it("should say non-primitives are the same when they are referentially the same", function () {
        var anObject = {};
        var anArray = [];
        function aFunction () { }

        expect(Object.is(anObject, anObject)).toBe(true);
        expect(Object.is(anArray, anArray)).toBe(true);
        expect(Object.is(aFunction, aFunction)).toBe(true);
    });
    it("should handle undefined and null, and distinguish between them and other falsy values", function () {
        var iWillBeUndefined;

        expect(Object.is(undefined, undefined)).toBe(true);
        expect(Object.is(undefined, void 0)).toBe(true);
        expect(Object.is(undefined, iWillBeUndefined)).toBe(true);

        expect(Object.is(null, undefined)).toBe(false);
        expect(Object.is(null, 0)).toBe(false);
        expect(Object.is(null, "")).toBe(false);

        expect(Object.is(undefined, null)).toBe(false);
        expect(Object.is(undefined, 0)).toBe(false);
        expect(Object.is(undefined, "")).toBe(false);
    });
    it("should say NaN is equal to itself", function () {
        expect(Object.is(NaN, NaN)).toBe(true);
    });
    it("should distinguish between +0 and -0", function () {
        expect(Object.is(+0, -0)).toBe(false);
    });
    it("should distinguish between +Infinity and -Infinity", function () {
        expect(Object.is(+Infinity, -Infinity)).toBe(false);
    });
});

describe("Object.isnt", function () {
    it("Negates Object.is for simple cases", function () {
        expect(Object.isnt(1, 2)).toBe(true);
        expect(Object.isnt("0", 0)).toBe(true);
        expect(Object.isnt(Math.PI, Math.PI)).toBe(false);
    });

    it("Negates Object.is for the edge cases", function () {
        expect(Object.isnt(+0, -0)).toBe(true);
        expect(Object.isnt(NaN, NaN)).toBe(false);
    });
});