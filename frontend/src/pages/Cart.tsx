import React from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const { items, remove, update, total, clear } = useCart()

  if (items.length === 0) return (
    <div className="cart-container cart-empty">
      <h2>🛒 Carrito Vacío</h2>
      <p>No tienes productos en tu carrito</p>
      <Link to="/">Volver al catálogo</Link>
    </div>
  )

  return (
    <div className="cart-container">
      <h2>🛒 Tu Carrito</h2>
      <ul className="cart-list">
        {items.map((it) => (
          <li key={it.product.id} className="cart-item">
            <div>
              <strong>{it.product.name}</strong>
              <div className="price">${it.product.price}</div>
              <div style={{marginTop: 8}}>
                <label style={{fontSize: 12, color: '#666'}}>Cantidad:</label>
                <br/>
                <input 
                  type="number" 
                  min={1} 
                  value={it.quantity} 
                  onChange={(e)=> update(it.product.id, Math.max(1, Number(e.target.value)))} 
                />
              </div>
              <button onClick={() => remove(it.product.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
      <div className="cart-actions">
        <Link to="/checkout">Proceder a Pagar</Link>
        <button onClick={clear}>Vaciar Carrito</button>
      </div>
    </div>
  )
}
