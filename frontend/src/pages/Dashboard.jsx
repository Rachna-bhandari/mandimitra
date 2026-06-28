import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Loader } from '../components/ui'
import { showToast } from '../components/ui/Toast'
import Toast from '../components/ui/Toast'

export default function Dashboard() {
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api/prices')
      .then(res => res.json())
      .then(data => {
        setPrices(data)
        setLoading(false)
      })
      .catch(err => {
        showToast('Failed to fetch prices!', 'error')
        setLoading(false)
      })
  }, [])

  const filtered = prices.filter(p =>
    p.crop.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Toast />
      <Navbar />
      <main className="flex-grow max-w-5xl mx-auto px-4 py-16 w-full">
        <h1 className="font-display text-4xl font-bold text-brand-green mb-4">
          Price Dashboard
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-8">
          Live mandi prices from Uttarakhand markets.
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search crop..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-8 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-green-700"
        />

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow p-6 border border-green-100"
              >
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  {p.mandi}
                </p>
                <h2 className="text-xl font-bold text-brand-green mb-1">
                  {p.crop}
                </h2>
                <p className="text-2xl font-display text-brand-gold">
                  ₹ {p.price} / {p.unit}
                </p>
                <p className={`text-sm mt-2 font-medium ${p.trend.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                  {p.trend} vs last week
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}