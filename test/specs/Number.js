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
