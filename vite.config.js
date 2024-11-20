import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    base: './', // Use relative paths
    build: {
        outDir: 'dist', // Specify the output directory
        rollupOptions: {
            input: {
                main: './index.html', // Entry HTML file
                nested: './src/app.ts', // Specific TypeScript entry
            },
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]',
            },
        },
    },
    define: {
        $: 'window.jQuery',
        jQuery: 'window.jQuery',
    },
    // plugins: [
    //     viteStaticCopy({
    //         targets: [
    //             {
    //                 src: 'index.html', // Source file
    //                 dest: ''           // Destination folder in `dist` (root of dist in this case)
    //             }
    //         ]
    //     })
    // ]
});