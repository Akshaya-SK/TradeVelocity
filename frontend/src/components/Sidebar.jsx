import React from 'react'
export default function Sidebar({onNavigate}){
  return (
    <aside className="sidebar">
      <ul>
        <li onClick={()=>onNavigate('dashboard')}>Overview</li>
        <li onClick={()=>onNavigate('portfolio')}>Portfolio</li>
        <li onClick={()=>onNavigate('home')}>Home</li>
      </ul>
    </aside>
  )
}
