import $ from 'jquery';
import {TextMap} from "./helper";

export class Render {
    textMaps: TextMap[]
    constructor(textMaps: TextMap[])  {
        this.textMaps = textMaps;
    }
    start() {
        const container = $("<div>")
        container.addClass("container")

        for (const textMap of this.textMaps) {
            const line = $(this.defineTag(textMap.text))
            line.attr('contenteditable', 'true');
            line.addClass('editable')
            line.append(this.removeMDTags(textMap.text))
            container.append(line)
        }
        // container.append(text)
        $('body').append(container)
    }
    updateCursor(column:number):HTMLElement {
        const indexAndText = this.findIndex(column)
        const nthElement = $('.editable').eq(indexAndText.index);

        nthElement.html(indexAndText.text)
        return nthElement[0]
    }
    private findIndex(column:number) {
        for (const idx in this.textMaps) {
            if (column < this.textMaps[idx].end) {
                return {index: idx, text: this.textMaps[idx].text}
            }
        }
        return 0
    }
    private removeMDTags(text: string):string {
        if (text.startsWith("## ")){
            return text.substring(3, text.length)
        }

        return text
    }
    private defineTag(line: string):string{
        if (line.startsWith("##")) {
            return "<h2>"
        }
        return "<p>"
    }
    control() {
        const container = document.createElement("footer")
        $('body').append(container)
    }
}