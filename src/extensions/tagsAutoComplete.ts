export class HashtagAutocomplete {
    constructor({ data, api }) {
        this.api = api;
        this.data = {
            text: data.text || '',
        };
        this.dropdown = null; // Dropdown for autocomplete suggestions
    }

    static get isInline() {
        return true; // Defines this tool as inline
    }

    static get shortcut() {
        return '#'; // Optional shortcut for activating
    }

    render() {
        this.wrapper = document.createElement('span');
        this.wrapper.contentEditable = true;
        this.wrapper.classList.add('hashtag-tool');
        this.wrapper.textContent = this.data.text || '';
        return this.wrapper;
    }

    surround(range) {
        console.log('OPAA')
        if (!range) return;

        const text = range.startContainer.textContent;
        const cursorPosition = range.startOffset;

        const match = text.slice(0, cursorPosition).match(/#\w*$/); // Detect #hashtag
        if (match) {
            const query = match[0].substring(1); // Extract text after #
            this.showSuggestions(query, range);
        } else {
            this.hideSuggestions();
        }
    }

    showSuggestions(query, range) {
        // Suggestions
        const suggestions = ['#EditorJS', '#Hashtag', '#Autocomplete', '#JavaScript'];

        const filtered = suggestions.filter((s) =>
            s.toLowerCase().includes(query.toLowerCase())
        );

        if (filtered.length) {
            if (!this.dropdown) {
                this.dropdown = document.createElement('div');
                this.dropdown.classList.add('hashtag-dropdown');
                document.body.appendChild(this.dropdown);
            }

            this.dropdown.innerHTML = '';
            filtered.forEach((hashtag) => {
                const item = document.createElement('div');
                item.textContent = hashtag;
                item.classList.add('hashtag-item');
                item.style.cursor = 'pointer';
                item.style.padding = '5px';
                item.addEventListener('click', () => {
                    this.insertHashtag(hashtag, range);
                });
                this.dropdown.appendChild(item);
            });

            // Position the dropdown
            const rect = range.getBoundingClientRect();
            this.dropdown.style.left = `${rect.left}px`;
            this.dropdown.style.top = `${rect.bottom + window.scrollY}px`;
            this.dropdown.style.display = 'block';
        } else {
            this.hideSuggestions();
        }
    }

    insertHashtag(hashtag, range) {
        const textNode = range.startContainer;
        const cursorPosition = range.startOffset;
        const text = textNode.textContent;

        // Replace the hashtag text with the selected hashtag
        const updatedText =
            text.slice(0, cursorPosition - hashtag.length + 1) + hashtag + text.slice(cursorPosition);
        textNode.textContent = updatedText;

        this.hideSuggestions();
    }

    hideSuggestions() {
        if (this.dropdown) {
            this.dropdown.style.display = 'none';
        }
    }

    save(blockContent) {
        return {
            text: blockContent.textContent || '',
        };
    }
}
