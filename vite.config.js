import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { pathToFileURL } from 'url'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'local-api',
        configureServer(server) {
          server.middlewares.use('/api/crear-preferencia', async (req, res) => {
            try {
              process.env.SUPABASE_URL              = env.VITE_SUPABASE_URL
              process.env.SUPABASE_SERVICE_ROLE_KEY = env.VITE_SERVICE_ROLE
              process.env.MP_ACCESS_TOKEN            = env.MP_ACCESS_TOKEN

              req.headers.origin = req.headers.origin || 'http://localhost:5173'

              let body = ''
              req.on('data', chunk => { body += chunk })
              await new Promise(resolve => req.on('end', resolve))
              try { req.body = JSON.parse(body) } catch { req.body = {} }

              const end = res.end.bind(res)
              res.status = code => { res.statusCode = code; return res }
              res.json   = data => {
                res.setHeader('Content-Type', 'application/json')
                end(JSON.stringify(data))
              }

              const handlerUrl = pathToFileURL(resolve('api/crear-preferencia.js')).href
              const { default: handler } = await import(handlerUrl)
              await handler(req, res)
            } catch (err) {
              console.error('[API local] Error:', err)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message }))
            }
          })
        },
      },
    ],
    server: {
      allowedHosts: ['gossip-observant-bullseye.ngrok-free.dev'],
    },
  }
})
