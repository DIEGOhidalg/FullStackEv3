import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, Product } from '../api/products'
import { useCart } from '../context/CartContext'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { add } = useCart()

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="products-container">
      <div style={{textAlign: 'center', padding: '40px'}}>
        <div style={{fontSize: 32, marginBottom: 16}}>⏳</div>
        <p style={{fontSize: 18, color: '#666'}}>Cargando productos...</p>
      </div>
    </div>
  )
  if (error) return (
    <div className="products-container">
      <div style={{textAlign: 'center', padding: '40px', background: '#FFE5E5', borderRadius: 8}}>
        <div style={{fontSize: 32, marginBottom: 16}}>❌</div>
        <p style={{fontSize: 18, color: '#D32F2F'}}>Error: {error}</p>
      </div>
    </div>
  )

  return (
    <div className="products-container">
      <h2>🛍️ Catálogo de Productos</h2>
      <div className="products-grid">
        {products.map((p) => (
          <article key={p.id} className="product-card">
            <div className="product-image-container">
              <img src={p.imageUrl} alt={p.name} className="product-image" />
              {p.stock === 0 && <div className="out-of-stock">Agotado</div>}
            </div>
            <div className="product-info">
              <h3>{p.name}</h3>
              <p className="product-description">{p.description}</p>
              <p className="product-price">${p.price.toFixed(2)}</p>
              <p className="product-stock">Stock: <strong>{p.stock}</strong></p>
              <div className="product-actions">
                <Link to={`/products/${p.id}`} className="btn btn-primary">
                  👁️ Detalles
                </Link>
                <button 
                  onClick={() => add(p, 1)} 
                  className="btn btn-success"
                  disabled={p.stock === 0}
                >
                  ➕ Agregar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
