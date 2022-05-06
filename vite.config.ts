import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            dirs: ['src/components/base'],
        }),
    ],
});
