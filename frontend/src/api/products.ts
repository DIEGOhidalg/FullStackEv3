export type Product = {
  id: number
  name: string
  description?: string
  price?: number
  imageUrl?: string
  stock?: number
}

const API_BASE = 'http://localhost:8080/api'

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_BASE}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}
