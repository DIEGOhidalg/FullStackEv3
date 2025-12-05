import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CheckoutPage() {
  const { items, total, clear } = useCart()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Pedido procesado', { name, address, items, total })
    clear()
    setDone(true)
  }

  if (done) return (
    <div className="checkout-container success-message">
      <h2>✅ ¡Compra Realizada!</h2>
      <p>Tu pedido ha sido procesado exitosamente.</p>
      <p style={{marginTop: 12}}>Gracias por tu compra, <strong>{name}</strong>. Tu pedido será entregado en <strong>{address}</strong>.</p>
      <Link to="/" style={{display: 'inline-block', marginTop: 20, padding: '12px 24px', background: '#007AFF', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600'}}>Volver al Inicio</Link>
    </div>
  )

  return (
    <div className="checkout-container">
      <h2>💳 Checkout</h2>
      <div className="cart-summary">
        <strong>Total a Pagar: ${total.toFixed(2)}</strong>
      </div>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div>
          <label htmlFor="name">Nombre Completo *</label>
          <input 
            id="name"
            type="text" 
            value={name} 
            onChange={(e)=>setName(e.target.value)} 
            placeholder="Juan Pérez"
            required 
          />
        </div>
        <div>
          <label htmlFor="address">Dirección de Envío *</label>
          <input 
            id="address"
            type="text" 
            value={address} 
            onChange={(e)=>setAddress(e.target.value)} 
            placeholder="Calle Principal 123, Apto 4B"
            required 
          />
        </div>
        <div className="checkout-actions">
          <button type="submit">🔐 Confirmar Pago</button>
        </div>
      </form>
      <Link to="/cart" style={{textAlign: 'center', display: 'block', color: '#007AFF', textDecoration: 'none', marginTop: 12}}>
        ← Volver al carrito
      </Link>
    </div>
  )
}
