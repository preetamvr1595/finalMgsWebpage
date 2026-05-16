import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import api from '../services/api'

export default function Dashboard(){
  const [stats, setStats] = useState({
    products: 0,
    offers: 0,
    rates: { gold22: 0, gold24: 0, silver: 0 }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, offerRes, rateRes] = await Promise.all([
          api.get('/products'),
          api.get('/offers'),
          api.get('/rates')
        ])
        setStats({
          products: prodRes.data.length,
          offers: offerRes.data.filter(o => o.active).length,
          rates: rateRes.data
        })
      } catch (e) {
        console.error('Dashboard fetch error', e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div>Loading Dashboard...</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">

        <Card className="text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Active Offers</div>
          <div className="text-3xl font-serif text-gray-900 mt-1">{stats.offers}</div>
        </Card>
        <Card className="text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Live 22K Gold</div>
          <div className="text-2xl font-serif text-gold mt-1">₹{(stats.rates.gold22 * 10).toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-gray-400">per 10g</div>
        </Card>
        <Card className="text-center">
          <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Live Silver</div>
          <div className="text-2xl font-serif text-gray-600 mt-1">₹{(stats.rates.silver * 1000).toLocaleString('en-IN')}</div>
          <div className="text-[10px] text-gray-400">per kg</div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <h3 className="font-serif text-xl">Recent Activity</h3>
          <ul className="mt-4 text-sm text-gray-600 space-y-3">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Live gold rates synchronized with GoldPriceZ API
            </li>

          </ul>
        </Card>
        <Card>
          <h3 className="font-serif text-xl">Quick Actions</h3>
          <div className="mt-4 space-y-3">

            <button className="w-full py-2.5 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">Manage Offers</button>
          </div>
        </Card>
      </div>
    </div>
  )
}
