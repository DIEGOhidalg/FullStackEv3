import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/Cart'
import CheckoutPage from './pages/Checkout'
import { useCart } from './context/CartContext'

function Header() {
  const { items } = useCart()
  const count = items.reduce((s, i) => s + i.quantity, 0)
  return (
    <header className="app-header">
      <nav style={{display:'flex',gap:12,alignItems:'center'}}>
        <Link to="/">Apple Store</Link>
        <Link to="/cart">Carrito ({count})</Link>
      </nav>
    </header>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
