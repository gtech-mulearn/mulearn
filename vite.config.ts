import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssNesting from "postcss-nesting";
import path from "path";
import viteCompression from "vite-plugin-compression";
// import eslint from 'vite-plugin-eslint'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    // css: {
    //     postcss: {
    //         plugins: [postcssNesting]
    //     }
    // },
    // this will throw errors in build, so fix them before uncommenting
    // plugins: [eslint(), react(), viteCompression()],
    plugins: [react(), viteCompression(), tailwindcss(),],
    resolve: {
        alias: {
            "@/modules": path.resolve(__dirname, "./src/modules"), 
            "@/components": path.resolve(__dirname, "./src/components"),
            "@/MuLearnComponents": `${path.resolve(
                __dirname,
                "./src/components/MuComponents"
            )}`,
            "@/MuLearnServices": `${path.resolve(__dirname, "./src/services")}`
        }
    },
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: "[name].js"
            }
        }
    }
});
