import {Decoration, DecorationSet, WidgetType} from "@codemirror/view";
import {EditorView} from "codemirror";
import {renderMarkdown} from "./helper";
import {StateField} from "@codemirror/state";

class MarkdownWidget extends WidgetType {
    constructor(private html: string) {
        super();
    }

    toDOM() {
        const div = document.createElement("div");
        div.innerHTML = this.html;
        div.style.background = "#f5f5f5";
        div.style.padding = "5px";
        div.style.border = "1px dashed #ccc";
        return div;
    }
}

// StateField for Managing Live Preview Decorations
export const markdownPreview = StateField.define<DecorationSet>({
    create() {
        return Decoration.none; // Start with no decorations
    },

    update(decorations, transaction) {
        const builder = [];
        const doc = transaction.state.doc;
        const cursor = transaction.state.selection.main.head;

        // Rebuild decorations for all lines
        for (let lineNumber = 1; lineNumber <= doc.lines; lineNumber++) {
            const line = doc.line(lineNumber);
            const lineText = line.text;
            const lineStart = line.from;

            // Check if the cursor is within this line
            const cursorInsideLine = cursor >= line.from && cursor <= line.to;

            if (!cursorInsideLine && lineText.trim() !== "") {
                // Render the Markdown line as HTML if the cursor is not inside it
                const renderedHTML = renderMarkdown(lineText);
                builder.push(
                    Decoration.widget({
                        widget: new MarkdownWidget(renderedHTML),
                        block: true,
                    }).range(lineStart)
                );
            }
        }

        // Return the new set of decorations
        return Decoration.set(builder, true);
    },

    provide: (field) => EditorView.decorations.from(field),
});