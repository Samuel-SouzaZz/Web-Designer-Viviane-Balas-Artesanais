import { getApiBase, getAuthToken } from '../lib/api'
import type { Product, ProductForm } from '../types/product'

const API = getApiBase()

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API}/api/products`)
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (err) {
    console.error('Erro ao buscar produtos:', err)
    return []
  }
}

export async function login(email: string, password: string): Promise<{ ok: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return { ok: false, error: data.error || 'Erro ao fazer login' }
    if (!data.token) return { ok: false, error: 'Resposta inválida' }
    return { ok: true, token: data.token }
  } catch (err) {
    console.error(err)
    return { ok: false, error: 'Falha de conexão' }
  }
}

export async function createProduct(form: ProductForm): Promise<{ ok: boolean; error?: string }> {
  const token = getAuthToken()
  if (!token) return { ok: false, error: 'Não autorizado' }
  const body = new FormData()
  body.append('name', form.name)
  body.append('category', form.category)
  body.append('description', form.description)
  body.append('price', form.price)
  if (form.image) body.append('image', form.image)
  try {
    const res = await fetch(`${API}/api/products`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return { ok: false, error: data.error || 'Erro ao criar produto' }
    return { ok: true }
  } catch (err) {
    console.error(err)
    return { ok: false, error: 'Falha de conexão' }
  }
}

export async function updateProduct(id: string, form: ProductForm): Promise<{ ok: boolean; error?: string }> {
  const token = getAuthToken()
  if (!token) return { ok: false, error: 'Não autorizado' }
  const body = new FormData()
  body.append('name', form.name)
  body.append('category', form.category)
  body.append('description', form.description)
  body.append('price', form.price)
  if (form.image) body.append('image', form.image)
  try {
    const res = await fetch(`${API}/api/products/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return { ok: false, error: data.error || 'Erro ao atualizar produto' }
    return { ok: true }
  } catch (err) {
    console.error(err)
    return { ok: false, error: 'Falha de conexão' }
  }
}

export async function deleteProduct(id: string): Promise<{ ok: boolean; error?: string }> {
  const token = getAuthToken()
  if (!token) return { ok: false, error: 'Não autorizado' }
  try {
    const res = await fetch(`${API}/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return { ok: false, error: data.error || 'Erro ao excluir' }
    }
    return { ok: true }
  } catch (err) {
    console.error(err)
    return { ok: false, error: 'Falha de conexão' }
  }
}
