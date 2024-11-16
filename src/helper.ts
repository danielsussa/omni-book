export function greet(name: string) {
    return `Hello, ${name}!`
}

export function getCursorColumn() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return -1;

    const range = selection.getRangeAt(0);
    const textBeforeCursor = range.startContainer.textContent.slice(0, range.startOffset);

    // Determine line by counting line breaks
    const textContent = range.startContainer.parentNode.textContent;
    const lines = textContent.slice(0, range.startOffset).split('\n');
    return lines[lines.length - 1].length;
}

// Function to restore the cursor position
export function restoreCursorPosition(editableDiv: HTMLElement, savedPosition: { startOffset: number } | null): void {
    if (!savedPosition) return;

    const selection = window.getSelection();
    const range = document.createRange();

    let charIndex = 0;
    const nodeStack: Node[] = [editableDiv];
    let node: Node | undefined;
    let foundStart = false;

    while ((node = nodeStack.pop())) {
        if (node.nodeType === Node.TEXT_NODE) {
            const nextCharIndex = charIndex + (node.textContent?.length || 0);

            if (!foundStart && savedPosition.startOffset >= charIndex && savedPosition.startOffset <= nextCharIndex) {
                range.setStart(node, savedPosition.startOffset - charIndex);
                foundStart = true;
            }

            charIndex = nextCharIndex;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            let i = node.childNodes.length;
            while (i--) {
                nodeStack.push(node.childNodes[i]);
            }
        }
    }

    if (foundStart) {
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
    }
}

export interface TextMap {
    text: string
    start: number
    end: number
}

export function textToTextMap(text: string): TextMap[] {
    const textMaps: TextMap[] = []

    const lines = text.split("\n")
    let start = 0;
    for (const lineText of lines) {
        const end = start + lineText.length
        textMaps.push({
            text: lineText,
            start: start,
            end: end
        })
        start += start + end
    }

    return textMaps
}