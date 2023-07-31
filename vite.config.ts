import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import postcssNesting from 'postcss-nesting';
import path from "path";
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  css: {
    postcss: {
        plugins: [
            // postcssNesting
        ],
    },
  },
  plugins: [
    react(), 
    viteCompression(),
  ],
  resolve: {
    alias: {
      '@/MuLearnComponents': `${path.resolve(__dirname, "./src/components/MuComponents")}`,
      '@/MuLearnServices': `${path.resolve(__dirname, "./src/services")}`,
    },
  },
});