import React from 'react'
export default function Navbar({onNavigate}){
  return (
    <nav className="navbar">
      <div className="brand">TradeVelocity · Stocks</div>
      <div className="nav-actions">
        <button onClick={()=>onNavigate('dashboard')}>Dashboard</button>
        <button onClick={()=>onNavigate('login')}>Login</button>
        <button onClick={()=>onNavigate('signup')}>Signup</button>
        <ThemeToggle />
      </div>
    </nav>
  )
}

function ThemeToggle(){
  const toggle = ()=> {
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark":"light")
  }
  return <button onClick={toggle} className="theme-btn">🌓</button>
}
