
export class OrderedListTool {
    static get toolbox() {
        return {
            title: 'Ordered List',
            icon: '<svg width="18" height="18" viewBox="0 0 18 18"><path d="M3 7h2v2H3zm3-5h10v2H6zm-3 4h2v2H3zm3 4h10v2H6zm-3 4h2v2H3zm3-8h10v2H6zm-3 8h10v2H6z"></path></svg>',
        };
    }

    constructor({ data }) {
        this.data = data || { items: [] };
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.contentEditable = true;
        wrapper.classList.add('ordered-list-tool');
        wrapper.innerHTML = this.data.items
            .map((item, index) => `<div>${index + 1}. ${item}</div>`)
            .join('');
        wrapper.addEventListener('input', (event) => {
            const lines = wrapper.innerText.split('\n');
            this.data.items = lines.map((line) => line.replace(/^\d+\.\s/, '')); // Remove numbering
        });
        return wrapper;
    }

    save(blockContent) {
        const lines = blockContent.innerText.split('\n');
        return {
            items: lines.map((line) => line.replace(/^\d+\.\s/, '')), // Extract text without numbering
        };
    }
}