import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/happy-birthday-sister/',
  server: {
    port: 8080,
  },
});
