import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import os from 'os'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import authRoutes from './src/routes/auth.js'
import productRoutes from './src/routes/products.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const uploadsDir = join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(uploadsDir))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

function getLocalIP(): string {
  for (const ifaces of Object.values(os.networkInterfaces())) {
    for (const iface of ifaces ?? []) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address
    }
  }
  return 'localhost'
}

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Backend Vivi Balas rodando em http://localhost:${PORT}`)
  console.log(`Acessível na rede em http://${getLocalIP()}:${PORT}`)
})
