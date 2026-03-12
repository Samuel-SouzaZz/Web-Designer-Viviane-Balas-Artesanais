export type Product = {
  id: string
  name: string
  category: string
  description: string
  price: number
  image_url: string | null
  created_at?: string
}

export type ProductInsert = {
  id: string
  name: string
  category: string
  description: string
  price: number
  image_url: string | null
}

export type ProductUpdate = {
  name: string
  category: string
  description: string
  price: number
  image_url: string | null
}

export type JwtPayload = {
  email: string
  role: string
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}
