export class ImageWithSubtitleTool {
    input: any
    data: any
    api: any
    constructor({ data, api }) {
        this.api = api;
        this.data = {
            src: data.src || '',
            subtitle: data.subtitle || '',
        };
        this.input = document.createElement('input');
        this.input.type = 'file';
        this.input.accept = 'image/*';
        this.input.style.display = 'none'; // Hide the file input
    }

    static get toolbox() {
        return {
            title: 'Image with Subtitle',
            icon: '<svg width="18" height="18" viewBox="0 0 18 18"><path d="M6 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7.5-3H13v1.5h1.5V5zM5 3h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm0 10h8V5H5v8zm4-2.5l2.5 3H5l3-4 1 1z"></path></svg>',
        };
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('image-with-subtitle');

        const img = document.createElement('img');
        img.style.maxWidth = '95%';
        img.style.marginTop = '10px';
        if (this.data.src) {
            img.src = this.data.src;
        }
        wrapper.appendChild(img);

        const subtitleInput = document.createElement('input');
        subtitleInput.type = 'text';
        subtitleInput.placeholder = 'Enter subtitle...';
        subtitleInput.value = this.data.subtitle;
        subtitleInput.style.display = 'block';
        subtitleInput.style.marginTop = '10px';
        subtitleInput.style.width = '95%';
        wrapper.appendChild(subtitleInput);

        // Trigger file selection dialog automatically
        this.input.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        img.src = e.target.result as string;
                        this.data.src = e.target?.result;
                    }

                };
                reader.readAsDataURL(file);
            }
        });

        wrapper.appendChild(this.input);

        if(!this.data.src) {
            // Automatically open the file selection dialog
            setTimeout(() => {
                this.input.click();
            }, 0);
        }


        return wrapper;
    }

    save(blockContent) {
        const img = blockContent.querySelector('img');
        const subtitle = blockContent.querySelector('input[type="text"]');

        return {
            src: img?.src || '',
            subtitle: subtitle?.value || '',
        };
    }

}
