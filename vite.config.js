import { defineConfig } from 'vite';

export default defineConfig({
  // Other Vite configurations...
  
  build: {
    rollupOptions: {
      external: ['axios'], // Add 'axios' to the list of external dependencies
    },
  },
});
