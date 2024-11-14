// Import the function
const getTextDifferences = require('./text.js'); // Adjust path if needed

describe('getTextDifferencesTest', () => {

    test('identifies an addition', () => {
        const original = "I love JS";
        const updated = "I love JS now";
        const result = getTextDifferences(original, updated);
        expect(result).toEqual([{ kind: "ADD", index: 3, text: "now" }]);
    });

    test('identifies a removal', () => {
        const original = "I love JS now";
        const updated = "I love JS";
        const result = getTextDifferences(original, updated);
        expect(result).toEqual([{ kind: "REMOVE", index: 3, text: "now" }]);
    });

    test('identifies a change', () => {
        const original = "I love JS";
        const updated = "I love JW";
        const result = getTextDifferences(original, updated);
        expect(result).toEqual([{ kind: "CHANGE", index: 2, old: "JS", new: "JW" }]);
    });

    test('handles multiple changes and additions', () => {
        const original = "I love JS now";
        const updated = "I enjoy JW now too";
        const result = getTextDifferences(original, updated);
        expect(result).toEqual([
            { kind: "CHANGE", index: 1, old: "love", new: "enjoy" },
            { kind: "CHANGE", index: 2, old: "JS", new: "JW" },
            { kind: "ADD", index: 4, text: "too" }
        ]);
    });

    test('handles identical texts with no changes', () => {
        const original = "I love JS now";
        const updated = "I love JS now";
        const result = getTextDifferences(original, updated);
        expect(result).toEqual([]); // No differences
    });

});