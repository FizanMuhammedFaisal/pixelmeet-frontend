import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
   plugins: [
      react(),
      tailwindcss(),
      {
         // a custom reloader that reloads if phaser files where changed
         name: 'phaser-full-reload',
         handleHotUpdate({ file, server }) {
            if (file.includes('phaser') || file.includes('scenes')) {
               server.ws.send({ type: 'full-reload' })
            }
         },
      },
   ],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
})
