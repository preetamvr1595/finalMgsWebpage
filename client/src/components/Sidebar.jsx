import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = ({to, children}) => (
  <NavLink
    to={to}
    className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm ${isActive? 'bg-gold/10 text-gold' : 'text-gray-700 hover:bg-gold/5'}`}
  >
    {children}
  </NavLink>
)

export default function Sidebar(){
  return (
    <aside className="w-72 p-6 border-r border-gray-100 bg-ivory">
      <div className="mb-10">
        <div className="text-gold text-2xl font-serif">MGS Jewellery</div>
      </div>
      <nav className="space-y-2">
        <NavItem to="/admin">Dashboard</NavItem>

        <NavItem to="/admin/collections">Collections</NavItem>
        <NavItem to="/admin/content">Content</NavItem>
        <NavItem to="/admin/offers">Offers</NavItem>
        <NavItem to="/admin/rates">Live Rates</NavItem>
      </nav>
    </aside>
  )
}
