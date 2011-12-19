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
        expect(Number.isInteger(1.001)).toBe(false);
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