import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'index.html', // Source file
                    dest: ''           // Destination folder in `dist` (root of dist in this case)
                }
            ]
        })
    ]
});