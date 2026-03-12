export type Product = {
  id: string
  name: string
  category: string
  description: string
  price: number
  image_url: string | null
  created_at?: string
}

export type ProductForm = {
  name: string
  category: string
  description: string
  price: string
  image?: File | null
}
