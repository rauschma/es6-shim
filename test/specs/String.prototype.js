describe("String.prototype.repeat", function () {
    it("should give 'aaa' when asked to repeat 'a' three times", function () {
        expect('a'.repeat(3)).toBe('aaa');
    });
    it("should give '' when asked to repeat 'a' zero times", function () {
        expect('a'.repeat(0)).toBe('');
    });
    it("should convert its argument to an integer", function () {
        expect('a'.repeat('3')).toBe('aaa');
        expect('a'.repeat(3.14)).toBe('aaa');
        expect('a'.repeat(NaN)).toBe('');
    });
    it("should treat negative arguments as zero", function () {
        expect('a'.repeat(-1)).toBe('');
        expect('a'.repeat(-10)).toBe('');
    });
});

describe("String.prototype.startsWith", function () {
    it("should agree that 'abc' starts with 'a'", function () {
        expect('abc'.startsWith('a')).toBe(true);
    });

    it("should convert its argument to a string", function () {
        expect('123'.startsWith(1)).toBe(true);
    });

    it("should not be confused by strings which do not contain the target", function () {
        expect(''.startsWith('/')).toBe(false);
        expect('#'.startsWith('//')).toBe(false);
        expect('##'.startsWith('///')).toBe(false);
    });
});

describe("String.prototype.endsWith", function () {
    it("should agree that 'abc' ends with 'c'", function () {
        expect('abc'.endsWith('c')).toBe(true);
    });

    it("should convert its argument to a string", function () {
        expect('123'.endsWith(3)).toBe(true);
    });

    // https://mail.mozilla.org/pipermail/es-discuss/2011-September/016733.html
    it("should not be confused by strings which do not contain the target", function () {
        expect(''.endsWith('/')).toBe(false);
        expect('#'.endsWith('//')).toBe(false);
        expect('##'.endsWith('///')).toBe(false);
    });
});