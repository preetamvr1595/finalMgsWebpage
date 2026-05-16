import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

import Collections from './pages/Collections'
import ContentManagement from './pages/ContentManagement'
import Orders from './pages/Orders'
import Offers from './pages/Offers'
import LiveRates from './pages/LiveRates'

export default function App(){
  return (
    <Routes>
      <Route path="/admin/login" element={<Login/>} />
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<Dashboard/>} />

        <Route path="collections" element={<Collections/>} />
        <Route path="content" element={<ContentManagement/>} />
        <Route path="orders" element={<Orders/>} />
        <Route path="offers" element={<Offers/>} />
        <Route path="rates" element={<LiveRates/>} />
      </Route>

      <Route path="/" element={<Navigate to="/admin" />} />
    </Routes>
  )
}
