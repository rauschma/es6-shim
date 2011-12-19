describe("Math.sign", function () {
    beforeEach(function () {
        this.addMatchers({
            toReallyBe: function (expected) {
                return Object.is(this.actual, expected);
            }
        });
    });

    it("should give NaN for NaN or other non-numbers", function () {
        expect(Math.sign(NaN)).toReallyBe(NaN);
        expect(Math.sign("nan")).toReallyBe(NaN);
        expect(Math.sign(function () { })).toReallyBe(NaN);
    });

    it("should give -0 for -0 and +0 for +0", function () {
        expect(Math.sign(+0)).toReallyBe(+0);
        expect(Math.sign(-0)).toReallyBe(-0);
    });

    it("should give -1 for negative values", function () {
        expect(Math.sign(-1)).toReallyBe(-1);
        expect(Math.sign(-0x200000000000001)).toReallyBe(-1);
        expect(Math.sign(-Infinity)).toReallyBe(-1);
    });

    it("should give +1 for negative values", function () {
        expect(Math.sign(+1)).toReallyBe(+1);
        expect(Math.sign(+0x200000000000001)).toReallyBe(+1);
        expect(Math.sign(+Infinity)).toReallyBe(+1);
    });

    it("should coerce string arguments to numbers", function () {
        expect(Math.sign("+0")).toReallyBe(+0);
        expect(Math.sign("-0")).toReallyBe(-0);
        expect(Math.sign("-1")).toReallyBe(-1);
        expect(Math.sign("1e100")).toReallyBe(+1);
        expect(Math.sign(" 0xABC ")).toReallyBe(+1);
        expect(Math.sign("-Infinity")).toReallyBe(-1);
    });

    it("should coerce object arguments to numbers", function () {
        expect(Math.sign({ valueOf: function () { return "1"; } })).toReallyBe(+1);
        expect(Math.sign({ toString: function () { return " 1 "; } })).toReallyBe(+1);
        expect(Math.sign({ toString: function () { return 1; }, valueOf: function () { return +0; } })).toReallyBe(+0);
    });
});