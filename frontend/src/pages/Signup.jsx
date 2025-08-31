import React, { useState } from 'react'
import API from '../lib/api'

export default function Signup({onSuccess}){
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const submit = async (e)=>{
    e.preventDefault()
    const res = await API.post('/signup', { username, password })
    if(res.status===201) {
      alert('account created. Please login.')
      onSuccess && onSuccess()
    }
  }
  return (
    <form onSubmit={submit} className="auth-form">
      <h3>Signup</h3>
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
      <button type="submit">Create</button>
    </form>
  )
}
