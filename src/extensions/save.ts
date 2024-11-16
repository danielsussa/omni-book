import {keymap} from "@codemirror/view";

const STORAGE_KEY = "content"
export const saveKeymap = keymap.of([
    {
        key: "Mod-s", // "Mod" maps to "Ctrl" on Windows/Linux and "Cmd" on macOS
        run: (view) => {
            const content = view.state.doc.toString(); // Get the editor content
            saveToStorage(content)
            return true; // Indicate the key was handled
        },
    },
]);

function saveToStorage(content: string) {
    const encodedContent = btoa(content); // Encode the content to Base64
    localStorage.setItem(STORAGE_KEY, encodedContent); // Save to localStorage
}

export function loadFromStorage(): string {
    const encodedContent = localStorage.getItem(STORAGE_KEY);
    if (encodedContent) {
        try {
            return atob(encodedContent); // Decode the Base64 content
        } catch (e) {
            console.error("Failed to decode Base64 content:", e);
        }
    }
    return "# empty document =)"; // Return empty string if nothing is stored
}