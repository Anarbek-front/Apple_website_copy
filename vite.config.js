import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],

    base: process.env.VITE_BASE_PATH || '/Apple_website_copy',

    server: {
        open: true,
    },

    build: {
        sourcemap: true,
    },
})
