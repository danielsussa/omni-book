import SpeechRecognitionModule from './speechRecognition.js';

const textDisplay = document.getElementById('text-display');
const startButton = document.getElementById('start-speech');
const stopButton = document.getElementById('stop-speech');

// Initialize speech recognition
const speechRecognition = new SpeechRecognitionModule();
speechRecognition.init();

// Store words and track progress
let originalWords = [];
let currentIndex = 0;

renderText('Hello world')

// Function to render pasted text as words for highlighting
function renderText(text) {
    originalWords = text.trim().split(/\s+/);
    textDisplay.innerHTML = originalWords.map(word => `<span>${word}</span>`).join(' ');
    currentIndex = 0;
}

// Event to handle Ctrl+V paste
document.addEventListener('paste', async (event) => {
    event.preventDefault();

    const clipboardText = await navigator.clipboard.readText();
    if (clipboardText) {
        renderText(clipboardText);
    }
});

// Update display with underlines based on spoken words
function updateHighlight(isCorrect) {
    const wordElements = textDisplay.querySelectorAll('span');

    if (currentIndex < originalWords.length) {
        wordElements[currentIndex].classList.add(isCorrect ? 'correct' : 'incorrect');
        currentIndex++;
    }
}

// Start recognition
startButton.addEventListener('click', () => {
    speechRecognition.start();
    speechRecognition.onResult = (transcript) => {
        const spokenWords = transcript.trim().split(/\s+/);

        if (spokenWords[currentIndex] === originalWords[currentIndex]) {
            updateHighlight(true);
        } else {
            updateHighlight(false);
        }
    };
});

// Stop recognition
stopButton.addEventListener('click', () => {
    speechRecognition.stop();
});