export default class SpeechRecognitionModule {
    onResult;
    constructor(lang = 'en-US') {
        if (!('webkitSpeechRecognition' in window)) {
            throw new Error('Web Speech API is not supported in this browser.');
        }

        this.recognition = new webkitSpeechRecognition();
        this.recognition.lang = lang;
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.transcript = '';
        this.interimTranscript = '';
        this.isActive = false;
        this.error = null;
        this.init()
    }

    // Initialize event listeners
    init() {
        this.recognition.onresult = (event) => {
            this.transcript = '';
            this.interimTranscript = '';
            console.log(event)

            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    this.transcript += event.results[i][0].transcript;
                } else {
                    this.interimTranscript += event.results[i][0].transcript;
                }
            }

            // Trigger custom event or callback function
            this.onResult(this.transcript, this.interimTranscript);
        };

        this.recognition.onerror = (event) => {
            this.error = event.error;
            if (typeof this.onError === 'function') {
                this.onError(event.error);
            }
        };

        this.recognition.onend = () => {
            this.isActive = false;
            if (typeof this.onEnd === 'function') {
                this.onEnd();
            }
        };
    }

    // Start recognition
    start() {
        this.isActive = true;
        this.error = null;
        this.transcript = '';
        this.recognition.start();
    }

    // Stop recognition
    stop() {
        this.isActive = false;
        this.recognition.stop();
    }

    // Reset the module state
    reset() {
        this.transcript = '';
        this.interimTranscript = '';
        this.error = null;
    }
}