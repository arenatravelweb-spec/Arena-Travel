import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['gossip-observant-bullseye.ngrok-free.dev'],
  },
})
