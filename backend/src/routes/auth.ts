import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from '../types/index.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@vivibalas.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

router.post('/login', (req: Request, res: Response): void => {
  const { email, password } = (req.body || {}) as { email?: string; password?: string }
  if (!email || !password) {
    res.status(400).json({ error: 'Email e senha são obrigatórios' })
    return
  }
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Email ou senha incorretos' })
    return
  }
  const payload: JwtPayload = { email, role: 'admin' }
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
  res.json({ token })
})

export default router
