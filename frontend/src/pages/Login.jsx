import React, { useState } from 'react'
import API from '../lib/api'

export default function Login({onSuccess}){
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const submit = async (e)=>{
    e.preventDefault()
    const res = await API.post('/login', { username, password })
    if(res.data.token){
      localStorage.setItem('token', res.data.token)
      alert('logged in')
      onSuccess && onSuccess()
    }
  }
  return (
    <form onSubmit={submit} className="auth-form">
      <h3>Login</h3>
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
      <button type="submit">Login</button>
    </form>
  )
}
