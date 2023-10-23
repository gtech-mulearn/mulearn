import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssNesting from "postcss-nesting";
import path from "path";
import viteCompression from "vite-plugin-compression";
// import eslint from 'vite-plugin-eslint'

export default defineConfig({
    css: {
        postcss: {
            plugins: [postcssNesting]
        }
    },
    // this will throw errors in build, so fix them before uncommenting
    // plugins: [eslint(), react(), viteCompression()],
    plugins: [react(), viteCompression()],
    resolve: {
        alias: {
            "@/MuLearnComponents": `${path.resolve(
                __dirname,
                "./src/components/MuComponents"
            )}`,
            "@/AnimatedComponents": `${path.resolve(
                __dirname,
                "./src/components/animations"
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
