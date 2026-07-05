import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Loader } from '../components/ui'
import { showToast } from '../components/ui/Toast'
import Toast from '../components/ui/Toast'

const API_URL = 'http://localhost:5000/api/prices'

export default function Dashboard() {
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // form state (used for both Create and Update)
  const [form, setForm] = useState({ crop: '', price: '', unit: '', mandi: '', trend: '' })
  const [editingId, setEditingId] = useState(null) // null = create mode, else update mode
  const [showForm, setShowForm] = useState(false)

  const fetchPrices = () => {
    setLoading(true)
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setPrices(data)
        setLoading(false)
      })
      .catch(err => {
        showToast('Failed to fetch prices!', 'error')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchPrices()
  }, [])

  const filtered = prices.filter(p =>
    p.crop.toLowerCase().includes(search.toLowerCase())
  )

  const resetForm = () => {
    setForm({ crop: '', price: '', unit: '', mandi: '', trend: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // CREATE or UPDATE submit
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        price: Number(form.price),
      }

      if (editingId) {
        // UPDATE
        const res = await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Update failed')
        showToast('Price updated successfully!', 'success')
      } else {
        // CREATE
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Create failed')
        showToast('Price added successfully!', 'success')
      }

      resetForm()
      fetchPrices()
    } catch (err) {
      showToast(editingId ? 'Failed to update price!' : 'Failed to add price!', 'error')
    }
  }

  // Populate form for editing
  const handleEditClick = p => {
    setForm({
      crop: p.crop,
      price: p.price,
      unit: p.unit,
      mandi: p.mandi,
      trend: p.trend,
    })
    setEditingId(p._id || p.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // DELETE
  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this price entry?')) return
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      showToast('Price deleted successfully!', 'success')
      fetchPrices()
    } catch (err) {
      showToast('Failed to delete price!', 'error')
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Toast />
      <Navbar />
      <main className="flex-grow max-w-5xl mx-auto px-4 py-16 w-full">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold text-brand-green mb-1">
              Price Dashboard
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              Live mandi prices from Uttarakhand markets.
            </p>
          </div>
          <button
            onClick={() => {
              if (showForm && !editingId) {
                resetForm()
              } else {
                setForm({ crop: '', price: '', unit: '', mandi: '', trend: '' })
                setEditingId(null)
                setShowForm(true)
              }
            }}
            className="bg-brand-green text-white px-5 py-2 rounded-lg font-medium hover:bg-green-800 transition-colors"
          >
            {showForm && !editingId ? 'Cancel' : '+ Add New Price'}
          </button>
        </div>

        {/* Create / Update Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-green-100 rounded-xl shadow p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4"
          >
            <input
              type="text"
              name="crop"
              placeholder="Crop (e.g. Potato)"
              value={form.crop}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <input
              type="text"
              name="unit"
              placeholder="Unit (e.g. kg)"
              value={form.unit}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <input
              type="text"
              name="mandi"
              placeholder="Mandi (e.g. Rudraprayag)"
              value={form.mandi}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <input
              type="text"
              name="trend"
              placeholder="Trend (e.g. +8%)"
              value={form.trend}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <div className="col-span-1 sm:col-span-2 md:col-span-5 flex gap-3 mt-2">
              <button
                type="submit"
                className="bg-brand-gold text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                {editingId ? 'Update Price' : 'Save Price'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="border border-gray-300 text-gray-600 px-5 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

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
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-16">No price entries found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div
                key={p._id || p.id}
                className="bg-white rounded-xl shadow p-6 border border-green-100 relative"
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

                {/* CRUD action buttons */}
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleEditClick(p)}
                    className="text-sm font-medium text-brand-green hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id || p.id)}
                    className="text-sm font-medium text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}