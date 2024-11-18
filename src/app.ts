import {getCursorColumn, getCursorPosition, greet, restoreCursorPosition, textToTextMap} from "./helper";
import './styles/styles.scss';
import './styles/color.scss';


import EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import {ImageWithSubtitleTool} from "./extensions/base64Image";
import Marker from '@editorjs/marker';
import {HashtagAutocomplete} from "./extensions/tagsAutoComplete";
import InlineCode from '@editorjs/inline-code';
import Strikethrough from '@sotaproject/strikethrough';
import TextVariantTune from '@editorjs/text-variant-tune';
import NoticeTune from 'editorjs-notice';
import Undo from 'editorjs-undo';



const editor = new EditorJS({
    holder: 'editor',
    data: loadContent(),
    tools: {
        image: {
            class: ImageWithSubtitleTool,
        },
        strikethrough: Strikethrough,
        hashtag: {
            class: HashtagAutocomplete,
        },
        noticeTune: NoticeTune,
        textVariant: TextVariantTune,
        Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
        },
        inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+C',
        },
        paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            config: {
                placeholder: 'Type your text here...',
            },
            sanitize: {
                b: true,
                i: true,
                a: {
                    href: true,
                },
            },
        },
        header: {
            class: Header,
            shortcut: 'CMD+SHIFT+H',
            inlineToolbar: ['link'],
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
    tunes: ['textVariant'],
    onReady: () => {
        new Undo({ editor });
    },
    onChange: (api, event) => {
        // console.log('Now I know that Editor\'s content changed!', event)
    }
});


function loadContent() {
    const encodedContent = localStorage.getItem('content');
    if (encodedContent) {
        try {
            return JSON.parse(encodedContent); // Parse and return saved data
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

setInterval(async () => {
    try {
        const savedData = await editor.save(); // Save the editor's content
        localStorage.setItem('content', JSON.stringify(savedData)); // Save to localStorage
    } catch (error) {
        console.error('Saving failed:', error);
    }
}, 5000);


document.addEventListener('keydown', async (event) => {
    // Detect Ctrl+S (or Cmd+S on macOS)
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault(); // Prevent the browser's default "Save Page" action

        try {
            const savedData = await editor.save(); // Save the editor's content
            console.log(savedData)
            localStorage.setItem('content', JSON.stringify(savedData)); // Save to localStorage
            alert('Document saved!');
        } catch (error) {
            console.error('Saving failed:', error);
        }
    }
});
