// vite.config.ts
import react from "file:///D:/IMPORTANT-CODING-FILES-FROM-DESKTOP/MAIN-PROJECTS/job-selling-app-[jobber]/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///D:/IMPORTANT-CODING-FILES-FROM-DESKTOP/MAIN-PROJECTS/job-selling-app-[jobber]/client/node_modules/vite/dist/node/index.js";
import tscongPaths from "file:///D:/IMPORTANT-CODING-FILES-FROM-DESKTOP/MAIN-PROJECTS/job-selling-app-[jobber]/client/node_modules/vite-tsconfig-paths/dist/index.js";
import commonjs from "file:///D:/IMPORTANT-CODING-FILES-FROM-DESKTOP/MAIN-PROJECTS/job-selling-app-[jobber]/client/node_modules/vite-plugin-commonjs/dist/index.mjs";
var vite_config_default = defineConfig({
  root: ".",
  plugins: [
    react({
      include: "**/*.tsx"
    }),
    tscongPaths(),
    commonjs()
  ],
  resolve: {
    alias: {
      src: "/src"
    }
  },
  build: {
    outDir: "./build"
  },
  server: {
    port: 3e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxJTVBPUlRBTlQtQ09ESU5HLUZJTEVTLUZST00tREVTS1RPUFxcXFxNQUlOLVBST0pFQ1RTXFxcXGpvYi1zZWxsaW5nLWFwcC1bam9iYmVyXVxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXElNUE9SVEFOVC1DT0RJTkctRklMRVMtRlJPTS1ERVNLVE9QXFxcXE1BSU4tUFJPSkVDVFNcXFxcam9iLXNlbGxpbmctYXBwLVtqb2JiZXJdXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovSU1QT1JUQU5ULUNPRElORy1GSUxFUy1GUk9NLURFU0tUT1AvTUFJTi1QUk9KRUNUUy9qb2Itc2VsbGluZy1hcHAtW2pvYmJlcl0vY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHRzY29uZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xuXG5pbXBvcnQgY29tbW9uanMgZnJvbSAndml0ZS1wbHVnaW4tY29tbW9uanMnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcm9vdDogJy4nLFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3Qoe1xuICAgICAgaW5jbHVkZTogJyoqLyoudHN4J1xuICAgIH0pLFxuICAgIHRzY29uZ1BhdGhzKCksXG4gICAgY29tbW9uanMoKVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIHNyYzogJy9zcmMnXG4gICAgfVxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogJy4vYnVpbGQnXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDBcbiAgfVxufSk7XG5cblxuXG5cblxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3YixPQUFPLFdBQVc7QUFDMWMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxpQkFBaUI7QUFFeEIsT0FBTyxjQUFjO0FBR3JCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFBQSxJQUNELFlBQVk7QUFBQSxJQUNaLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
