import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App(){
  const [page, setPage] = useState("dashboard")
  return (
    <div className="app">
      <Navbar onNavigate={setPage} />
      <div className="layout">
        <Sidebar onNavigate={setPage} />
        <main className="main">
          {page==="dashboard" && <Dashboard />}
          {page==="login" && <Login onSuccess={()=>setPage('dashboard')} />}
          {page==="signup" && <Signup onSuccess={()=>setPage('dashboard')} />}
        </main>
      </div>
    </div>
  )
}
