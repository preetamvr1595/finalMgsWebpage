import React from 'react'
import { useNavigate } from 'react-router-dom'
import { removeToken, getToken } from '../services/authService'

export default function Topbar(){
  const nav = useNavigate()
  function handleLogout(){
    removeToken()
    nav('/admin/login')
  }
  return (
    <header className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-serif text-gray-900">Admin Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        {getToken() && <button onClick={handleLogout} className="py-2 px-3 border rounded">Logout</button>}
      </div>
    </header>
  )
}
