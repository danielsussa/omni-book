import {getCursorColumn, getCursorPosition, greet, restoreCursorPosition, textToTextMap} from "./helper";
import './styles/styles.scss';
import './styles/color.scss';
import $ from 'jquery';
import { history, historyKeymap } from "@codemirror/history";
import { defaultKeymap } from "@codemirror/commands";
import { EditorView, minimalSetup } from 'codemirror';
import { markdown } from '@codemirror/lang-markdown';
import {keymap} from "@codemirror/view";

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
    doc: '# Welcome to CodeMirror 6\nEdit Markdown here!',
    extensions: [
        // minimalSetup,
        keymap.of([...defaultKeymap, ...historyKeymap]), // Add key bindings for Enter and more
        markdown(),
        fullSizeEditor,
        // foldGutter(), // Disable default folding
        // customFolding, // Add custom folding logic
        // markdownPreview
    ],
    parent: document.getElementById('editor')!,
  });
})