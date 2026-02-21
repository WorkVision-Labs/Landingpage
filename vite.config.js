import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/Landingpage/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                portfolio: resolve(__dirname, 'portfolio.html'),
                team: resolve(__dirname, 'team.html'),
            },
        },
    },
});
