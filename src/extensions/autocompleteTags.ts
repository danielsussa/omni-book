// Database to store hashtags
import {keymap} from "@codemirror/view";
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";
import {addHashTags, getHashTags} from "./tags";
import {get} from "jquery";


// Function to extract hashtags from the editor content
function extractHashtags(content: string) {
    const hashtags = content.match(/#[a-zA-Z0-9_]+/g) || [];
    hashtags.forEach((tag) => addHashTags(tag));
}

// Custom autocomplete logic for hashtags
export const hashtagAutocomplete = autocompletion({
    override: [
        (context: CompletionContext) => {
            const word = context.matchBefore(/#[a-zA-Z0-9_]*$/);
            if (!word) return null;

            return {
                from: word.from,
                validFor: /^#[a-zA-Z0-9_]*$/,
                options: Array.from(getHashTags()).map((tag) => ({
                    label: tag,
                    type: "keyword",
                    // info: `Hashtag suggestion for ${tag}`,
                    apply: (view, completion, from, to) => {
                        console.log(`Selected autocomplete: ${completion.label}`); // Log the selected hashtag
                        view.dispatch({
                            changes: { from, to, insert: completion.label }, // Apply the selected hashtag
                        });
                    },
                })),
            };
        },
    ],
});

// Custom keymap for Ctrl+S
export const searchTagKeyMap = keymap.of([
    {
        key: "Mod-p", // Intercept Ctrl+P / Cmd+P
        run: (view) => {
            const content = view.state.doc.toString();
            return true; // Prevent default browser behavior
        },
    },
]);
