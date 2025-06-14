import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssNesting from "postcss-nesting";
import path from "path";
import viteCompression from "vite-plugin-compression";
import Sitemap from 'vite-plugin-sitemap'
// import eslint from 'vite-plugin-eslint'


//@ts-ignore
import tailwindcss from '@tailwindcss/vite'

const sitemapRoutes = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/donation",
    "/trivial-ideas",
    "/kkem",
    "/dashboard/interestgroups",
    "/dashboard/special-events",
    "/dashboard/leaderboard",
    "/dashboard/courses",
]

export default defineConfig({
    // css: {
    //     postcss: {
    //         plugins: [postcssNesting]
    //     }
    // },
    // this will throw errors in build, so fix them before uncommenting
    // plugins: [eslint(), react(), viteCompression()],
    plugins: [
        react(),
        viteCompression(),
        tailwindcss(),
        Sitemap({
            hostname: "https://app.mulearn.org",
            dynamicRoutes: sitemapRoutes,
            generateRobotsTxt: true,
            robots: [
                { userAgent: '*', allow: '/' },
            ]
        })
    ],
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
