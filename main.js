import SpeechRecognitionModule from './speechRecognition.js';
import SpeechState from "./speechState.js";

const textDisplay = document.getElementById('text-display');
const startButton = document.getElementById('start-speech');
const stopButton = document.getElementById('stop-speech');

// Initialize speech recognition
const speechRecognition = new SpeechRecognitionModule();
const speechState = new SpeechState('hello world from Brazil');

// textDisplay.innerHTML = speechState.addOriginalText('Hello world from Brazil')

// Store words and track progress
let originalWords = [];
let currentIndex = 0;

 speechState.parseTextToHtml(textDisplay)

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
        if (isCorrect) {
            currentIndex++; // Move to the next word only if correct
        }
    }
}

// Start recognition
startButton.addEventListener('click', () => {
    speechRecognition.start();

    speechRecognition.onResult = (transcript, interimTranscript) => {
        console.log(interimTranscript)
    };
});

// Stop recognition
stopButton.addEventListener('click', () => {
    speechRecognition.stop();
});