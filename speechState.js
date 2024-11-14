class SpeechState {
    constructor(originalText) {
        this.state = {
            originalText: originalText,
            textParsed: this.parseText(originalText),
            speechApi: {
                events: []
            },
            result: {
                status: 'ONGOING',
                render: []
            }
        };
    }

    // Add a new speech event
    addSpeechEvent(text, confidence, isFinished) {
        this.state.speechApi.events.push({ text: this.parseText(text), confidence:confidence });
        this.updateResult();
    }

    parseText(text) {
        return text.toLowerCase().replace(/[.,!?]/g, '')
    }

    // Update result based on the latest speech events
    updateResult() {
        const parsedSpeech = this.state.speechApi.events.map(event => event.text.toLowerCase()).join(' ');
        const originalWords = this.state.textParsed.split(' ');
        const spokenWords = parsedSpeech.split(' ');

        // Determine matched words and update rendering
        let indexStart = 0;
        let currentIndex = 0;

        for (let i = 0; i < originalWords.length; i++) {
            if (spokenWords[currentIndex] === originalWords[i]) {
                indexStart += originalWords[i].length + 1;
                currentIndex++;
                this.state.result.render.push({
                    index_start: indexStart - originalWords[i].length - 1,
                    index_end: indexStart - 1,
                    color: 'green'
                });
            } else {
                // Loose track when there's a mismatch
                this.state.result.status = 'LOOSE_TRACK';
                this.state.result.render.push({
                    index_start: indexStart,
                    index_end: indexStart + originalWords[i].length,
                    color: 'grey'
                });
                break;
            }
        }

        // Check if finished
        if (currentIndex >= originalWords.length) {
            this.state.result.status = 'FINISHED';
        }
    }

    // Retrieve the state
    getState() {
        return this.state;
    }
}

module.exports = SpeechState;