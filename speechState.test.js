const SpeechState = require('./speechState.js');

describe('SpeechState', () => {
    const originalText = "This is a text that I paste. This is a text ongoing, and it will finish right now!";
    let speechState;

    // Initialize a new instance before each test
    beforeEach(() => {
        speechState = new SpeechState(originalText);
    });

    test('initializes state correctly', () => {
        const state = speechState.getState();

        expect(state.originalText).toBe(originalText);
        expect(state.textParsed).toBe("this is a text that i paste this is a text ongoing and it will finish right now");
        expect(state.speechApi.events).toEqual([]);
        expect(state.result.status).toBe("ONGOING");
        expect(state.result.render).toEqual([]);
    });

    test('adds a speech event correctly', () => {
        speechState.addWebkitResult("This is a text that I paste.", 0.987, true);

        const state = speechState.getState();
        expect(state.speechApi.events).toHaveLength(1);
        expect(state.speechApi.events[0].text).toEqual("this is a text that i paste");
        expect(state.result.status).toBe("ONGOING");
    });

    test('updates result render correctly on matching speech event', () => {
        speechState.addSpeechEvent("this is a text that i paste", 0.987);
        const state = speechState.getState();

        expect(state.result.status).toBe("ONGOING");
        expect(state.result.render).toHaveLength(4); // Assuming 4 words in first event
        expect(state.result.render[0]).toEqual({ index_start: 0, index_end: 4, color: "green" });
    });

    test('updates result to LOOSE_TRACK on non-matching speech event', () => {
        speechState.addSpeechEvent("This is the wrong text", 0.5);
        const state = speechState.getState();

        expect(state.result.status).toBe("LOOSE_TRACK");
        expect(state.result.render[0].color).toBe("grey");
    });

    test('updates result to FINISHED when speech matches all words', () => {
        speechState.addSpeechEvent("This is the final text", 0.987);
        speechState.addSpeechEvent("This is a text ongoing and it will finish somehow", 0.95);

        const state = speechState.getState();
        expect(state.result.status).toBe("FINISHED");
    });
});

describe('SpeechState', () => {

    speechState = new SpeechState('hello world');

    test('equal result', () => {
       const oldResult = [
           {transcript:"This is a text that I paste"},
           {transcript:"This is a text"}
       ]
        const newResult = [
            {transcript:"This is a text that I paste"},
            {transcript:"This is a text ongoing"}
        ]

        const diff = speechState.compareWebkitResults(oldResult, newResult)
        const expectedDiff = [
            {kind:'NEW_ENTRY', text:'ongoing', index: 11}
        ]
        expect(diff).toStrictEqual(expectedDiff);
    })
})