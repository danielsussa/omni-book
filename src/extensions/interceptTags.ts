

// Intercept transactions to detect new hashtags
import {EditorView} from "codemirror";
import {addHashTags} from "./tags";

export const interceptNewHashtags = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
        // Loop through changes to detect new hashtags
        update.changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
            console.log(fromA, toA, fromB, toB, inserted)
            const insertedText = inserted.toString(); // Convert inserted text to string
            const newTags = insertedText.match(/#[a-zA-Z0-9_]+/g) || []; // Find hashtags
            newTags.forEach((tag) => {
                addHashTags(tag)
            });
        });
    }
});