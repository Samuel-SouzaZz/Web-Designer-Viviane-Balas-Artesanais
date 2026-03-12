import { Router, Request, Response } from 'express'
import multer from 'multer'
import { randomUUID } from 'crypto'
import path from 'path'
import { join } from 'path'
import * as db from '../db.js'
import { requireAuth } from '../middleware/auth.js'
import type { Product } from '../types/index.js'

const uploadsDir = join(process.cwd(), 'uploads')

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg'
    cb(null, `${randomUUID()}${ext}`)
  },
})
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }) // 5MB

const router = Router()

router.get('/', (_req: Request, res: Response): void => {
  try {
    const products = db.getAllProducts()
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar produtos' })
  }
})

router.get('/:id', (req: Request, res: Response): void => {
  const id = String(req.params.id)
  const product = db.getProductById(id)
  if (!product) {
    res.status(404).json({ error: 'Produto não encontrado' })
    return
  }
  res.json(product)
})

router.post('/', requireAuth, upload.single('image'), (req: Request, res: Response): void => {
  try {
    const { name, category, description, price } = (req.body || {}) as Record<string, unknown>
    if (!name || !category || !description) {
      res.status(400).json({ error: 'Nome, categoria e descrição são obrigatórios' })
      return
    }
    const id = randomUUID()
    const priceNum = parseFloat(String(price).replace(',', '.')) || 0
    const image_url = req.file ? `/uploads/${req.file.filename}` : null
    db.createProduct({
      id,
      name: String(name).trim(),
      category: String(category).trim(),
      description: String(description).trim(),
      price: priceNum,
      image_url,
    })
    res.status(201).json({
      id,
      name: String(name).trim(),
      category: String(category).trim(),
      description: String(description).trim(),
      price: priceNum,
      image_url,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao criar produto' })
  }
})

router.put('/:id', requireAuth, upload.single('image'), (req: Request, res: Response): void => {
  const id = String(req.params.id)
  const existing = db.getProductById(id)
  if (!existing) {
    res.status(404).json({ error: 'Produto não encontrado' })
    return
  }
  try {
    const { name, category, description, price } = (req.body || {}) as Record<string, unknown>
    const image_url = req.file ? `/uploads/${req.file.filename}` : existing.image_url
    const priceNum =
      price !== undefined
        ? parseFloat(String(price).replace(',', '.')) || 0
        : existing.price
    db.updateProduct(id, {
      name: (name != null ? String(name) : existing.name).trim(),
      category: (category != null ? String(category) : existing.category).trim(),
      description: (description != null ? String(description) : existing.description).trim(),
      price: priceNum,
      image_url,
    })
    const product = db.getProductById(id) as Product
    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao atualizar produto' })
  }
})

router.delete('/:id', requireAuth, (req: Request, res: Response): void => {
  const id = String(req.params.id)
  const existing = db.getProductById(id)
  if (!existing) {
    res.status(404).json({ error: 'Produto não encontrado' })
    return
  }
  try {
    db.deleteProduct(id)
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao excluir produto' })
  }
})

export default router
