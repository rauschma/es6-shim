describe("Number.isFinite", function () {
    it("should give `true` when used on 0", function () {
        expect(Number.isFinite(0)).toBe(true);
    });
    it("should give `true` when used on 0x100000001", function () {
        expect(Number.isFinite(0x100000001)).toBe(true);
    });
    it("should give `false` when used on '0' (i.e., it should not coerce types)", function () {
        expect(Number.isFinite('0')).toBe(false);
    });
    it("should give `false` when used on +Infinity, -Infinity, or NaN", function () {
        expect(Number.isFinite(+Infinity)).toBe(false);
        expect(Number.isFinite(-Infinity)).toBe(false);
        expect(Number.isFinite(NaN)).toBe(false);
    });
});

describe("Number.isInteger", function () {
    it("should give `true` when used on 0 or 1.0", function () {
        expect(Number.isInteger(0)).toBe(true);
        expect(Number.isInteger(1.0)).toBe(true);
    });
    it("should give `false` when used on decimals", function () {
        expect(Number.isInteger(Math.PI)).toBe(false);
        expect(Number.isInteger(-1/3)).toBe(false);
    });
    it("should give `false` when used on values outside the range (-0x20000000000000, 0x20000000000000)", function () {
        expect(Number.isInteger(0x20000000000000)).toBe(false);
        expect(Number.isInteger(-0x20000000000000)).toBe(false);

        expect(Number.isInteger(0x200000000000000)).toBe(false);
        expect(Number.isInteger(-0x200000000000000)).toBe(false);
    });
    it("should give `false` when used on '0' (i.e., it should not coerce types)", function () {
        expect(Number.isInteger('0')).toBe(false);
    });
    it("should give `false` when used on +Infinity, -Infinity, or NaN", function () {
        expect(Number.isInteger(+Infinity)).toBe(false);
        expect(Number.isInteger(-Infinity)).toBe(false);
        expect(Number.isInteger(NaN)).toBe(false);
    });
});

describe("Number.isNaN", function () {
    it("should give `true` when used on NaN", function () {
        expect(Number.isNaN(NaN)).toBe(true);
    });
    it("should give `false` when used on regular numbers", function () {
        expect(Number.isNaN(0)).toBe(false);
        expect(Number.isNaN(Math.PI)).toBe(false);
        expect(Number.isNaN(-0x20000000000001)).toBe(false);
    });
    it("should give `false` when used on +Infinity or -Infinity", function () {
        expect(Number.isNaN(+Infinity)).toBe(false);
        expect(Number.isNaN(-Infinity)).toBe(false);
    });
    it("should give `false` when used on 'not a number' (i.e., it should not coerce types)", function () {
        expect(Number.isNaN('not a number')).toBe(false);
    });
});

describe("Number.toInteger", function () {
    beforeEach(function () {
        this.addMatchers({
            toReallyBe: function (expected) {
                return Object.is(this.actual, expected);
            }
        });
    });

    it("should pass through unexceptional integers with no change", function () {
        expect(Number.toInteger(1)).toReallyBe(1);
        expect(Number.toInteger(-100)).toReallyBe(-100);
    });

    it("should pass through +0, -0, +Infinity, or -Infinity with no change", function () {
        expect(Number.toInteger(+0)).toReallyBe(+0);
        expect(Number.toInteger(-0)).toReallyBe(-0);
        expect(Number.toInteger(+Infinity)).toReallyBe(+Infinity);
        expect(Number.toInteger(-Infinity)).toReallyBe(-Infinity);
    });

    it("should return +0 when given NaN, undefined, null, or false", function () {
        expect(Number.toInteger(NaN)).toReallyBe(+0);
        expect(Number.toInteger(undefined)).toReallyBe(+0);
        expect(Number.toInteger(null)).toReallyBe(+0);
        expect(Number.toInteger(false)).toReallyBe(+0);
    });

    it("should convert string arguments to integers in various formats", function () {
        expect(Number.toInteger("1")).toReallyBe(1);
        expect(Number.toInteger(" 1 ")).toReallyBe(1);
        expect(Number.toInteger("+1.1")).toReallyBe(1);
        expect(Number.toInteger("-1.1")).toReallyBe(-1);
        expect(Number.toInteger("0xABC")).toReallyBe(0xABC);
        expect(Number.toInteger("1e100")).toReallyBe(1e100);
        expect(Number.toInteger("+0")).toReallyBe(+0);
        expect(Number.toInteger("-0")).toReallyBe(-0);
        expect(Number.toInteger("Infinity")).toReallyBe(+Infinity);
        expect(Number.toInteger("-Infinity")).toReallyBe(-Infinity);
    });

    it("should convert object arguments using valueOf and toString", function () {
        expect(Number.toInteger({ valueOf: function () { return "1"; } })).toReallyBe(1);
        expect(Number.toInteger({ toString: function () { return " 1 "; } })).toReallyBe(1);
        expect(Number.toInteger({ toString: function () { return 1; }, valueOf: function () { return 0; } })).toReallyBe(0);
    });
});