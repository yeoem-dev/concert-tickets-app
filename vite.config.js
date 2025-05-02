import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    server: {
      proxy: {
        '/concerts': 'http://localhost:8080',
        '/billets': 'http://localhost:8080',
        '/utilisateurs': 'http://localhost:8080'
      }
    }
  })
