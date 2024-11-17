import {getCursorColumn, getCursorPosition, greet, restoreCursorPosition, textToTextMap} from "./helper";
import './styles/styles.scss';
// import './styles/color.scss';
import $ from 'jquery';


import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

const editor = new EditorJS({
    holder: 'editor',
    data: loadContent(),
    tools: {
        header: {
            class: Header,
            shortcut: 'CMD+SHIFT+H',
            inlineToolbar: ['link', 'marker', 'bold', 'italic'],
            config: {
                placeholder: 'Enter a header',
                levels: [2, 3, 4],
                defaultLevel: 3
            }
        },
        list: {
            class: List,
            inlineToolbar: true
        }
    },
    onReady: () => {
        editor.save().then((outputData) => {
            console.log('Article data: ', outputData)
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
    },
});

function loadContent() {
    const encodedContent = localStorage.getItem('content');
    if (encodedContent) {
        try {
            return JSON.parse(atob(encodedContent)); // Parse and return saved data
        } catch (error) {
            console.error('Error parsing saved content:', error);
        }
    }
    // Default content if nothing is saved
    return {
        time: Date.now(),
        blocks: [
            {
                type: 'header',
                data: {
                    text: 'Welcome to Editor.js!',
                    level: 1,
                },
            },
            {
                type: 'paragraph',
                data: {
                    text: 'Start typing here...',
                },
            },
        ],
    };
}

document.addEventListener('keydown', async (event) => {
    // Detect Ctrl+S (or Cmd+S on macOS)
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault(); // Prevent the browser's default "Save Page" action

        try {
            const savedData = await editor.save(); // Save the editor's content
            const encodedContent = btoa(JSON.stringify(savedData)); // Encode the content to Base64
            localStorage.setItem('content', encodedContent); // Save to localStorage
            alert('Document saved!');
        } catch (error) {
            console.error('Saving failed:', error);
        }
    }
});
