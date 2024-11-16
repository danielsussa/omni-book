import {getCursorColumn, getCursorPosition, greet, restoreCursorPosition, textToTextMap} from "./helper";
import './styles/styles.scss';
import './styles/color.scss';
import $ from 'jquery';
import { history, historyKeymap } from "@codemirror/history";
import { defaultKeymap } from "@codemirror/commands";
import { EditorView, minimalSetup } from 'codemirror';
import { markdown } from '@codemirror/lang-markdown';
import {keymap} from "@codemirror/view";
import {loadFromStorage, saveKeymap} from "./extensions/save";
import {hashtagAutocomplete, searchTagKeyMap} from "./extensions/autocompleteTags";
import {interceptNewHashtags} from "./extensions/interceptTags";

$(() => {

    const fullSizeEditor = EditorView.theme({
        "&": {
            width: "100%", // Full width of the container
            height: "100vh", // Optional: Full height of the viewport
        },
        ".cm-scroller": {
            overflow: "hidden", // Prevent unwanted scrollbars
        },
    });

  const editor = new EditorView({
    doc: loadFromStorage(),
    extensions: [
        // minimalSetup,
        keymap.of([...defaultKeymap, ...historyKeymap]), // Add key bindings for Enter and more
        markdown(),
        fullSizeEditor,
        saveKeymap,
        hashtagAutocomplete,
        EditorView.lineWrapping,
        interceptNewHashtags,
        // foldGutter(), // Disable default folding
        // customFolding, // Add custom folding logic
        // markdownPreview
    ],
    parent: document.getElementById('editor')!,
  });
})