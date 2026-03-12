import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import type { Product, ProductInsert, ProductUpdate } from './types/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, '..', '..', 'database.sqlite')

export const db: InstanceType<typeof Database> = new Database(dbPath)

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL DEFAULT 0,
    image_url TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )
`)

export function getAllProducts(): Product[] {
  return db.prepare(
    'SELECT id, name, category, description, price, image_url, created_at FROM products ORDER BY created_at DESC'
  ).all() as Product[]
}

export function getProductById(id: string): Product | undefined {
  return db.prepare(
    'SELECT id, name, category, description, price, image_url, created_at FROM products WHERE id = ?'
  ).get(id) as Product | undefined
}

export function createProduct(data: ProductInsert): void {
  db.prepare(`
    INSERT INTO products (id, name, category, description, price, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    data.id,
    data.name,
    data.category,
    data.description,
    data.price,
    data.image_url ?? null
  )
}

export function updateProduct(id: string, data: ProductUpdate): void {
  db.prepare(`
    UPDATE products SET name = ?, category = ?, description = ?, price = ?, image_url = ?
    WHERE id = ?
  `).run(
    data.name,
    data.category,
    data.description,
    data.price,
    data.image_url ?? null,
    id
  )
}

export function deleteProduct(id: string): void {
  db.prepare('DELETE FROM products WHERE id = ?').run(id)
}
