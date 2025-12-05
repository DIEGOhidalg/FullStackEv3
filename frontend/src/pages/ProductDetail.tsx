import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProduct, Product } from '../api/products'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [added, setAdded] = useState(false)
  const { add } = useCart()

  useEffect(() => {
    if (!id) return
    fetchProduct(Number(id))
      .then(setProduct)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="product-detail">
      <div style={{textAlign: 'center', padding: '40px'}}>
        <div style={{fontSize: 32, marginBottom: 16}}>⏳</div>
        <p style={{fontSize: 18, color: '#666'}}>Cargando producto...</p>
      </div>
    </div>
  )
  if (error) return (
    <div className="product-detail">
      <div style={{textAlign: 'center', padding: '40px', background: '#FFE5E5', borderRadius: 8}}>
        <div style={{fontSize: 32, marginBottom: 16}}>❌</div>
        <p style={{fontSize: 18, color: '#D32F2F'}}>Error: {error}</p>
        <Link to="/" className="btn btn-primary" style={{marginTop: 20, display: 'inline-block'}}>Volver al catálogo</Link>
      </div>
    </div>
  )
  if (!product) return (
    <div className="product-detail">
      <div style={{textAlign: 'center', padding: '40px', background: '#F5F5F5', borderRadius: 8}}>
        <div style={{fontSize: 32, marginBottom: 16}}>🔍</div>
        <p style={{fontSize: 18, color: '#666'}}>Producto no encontrado</p>
        <Link to="/" className="btn btn-primary" style={{marginTop: 20, display: 'inline-block'}}>Volver al catálogo</Link>
      </div>
    </div>
  )

  const handleAddToCart = () => {
    add(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="product-detail">
      <Link to="/" className="back-link">← Volver al catálogo</Link>
      
      <div className="detail-content">
        <div className="detail-image">
          <img src={product.imageUrl} alt={product.name} className="product-image-large" />
        </div>
        
        <div className="detail-info">
          <h1>{product.name}</h1>
          
          <div className="detail-specs">
            <p className="detail-description">{product.description}</p>
            
            <div className="detail-pricing">
              <p className="detail-price">${product.price.toFixed(2)}</p>
              <p className="detail-stock">Stock disponible: <strong>{product.stock} unidades</strong></p>
              {product.stock === 0 && <p style={{color: '#D32F2F', fontWeight: 'bold'}}>⚠️ Producto agotado</p>}
            </div>
            
            <div className="detail-actions">
              <button 
                onClick={handleAddToCart} 
                className={`btn btn-success btn-large ${added ? 'btn-success-active' : ''}`}
                disabled={product.stock === 0}
              >
                {added ? '✅ Agregado al carrito' : '➕ Agregar al carrito'}
              </button>
              <Link to="/cart" className="btn btn-primary btn-large">
                🛒 Ver carrito
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
