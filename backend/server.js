import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(express.json())

// In-memory data
let prices = [
  { id: 1, crop: 'Potato', price: 14, unit: 'kg', mandi: 'Rudraprayag', trend: '+8%' },
  { id: 2, crop: 'Peas', price: 28, unit: 'kg', mandi: 'Rudraprayag', trend: '-2%' },
  { id: 3, crop: 'Beans', price: 35, unit: 'kg', mandi: 'Haldwani', trend: '+11%' },
  { id: 4, crop: 'Tomato', price: 20, unit: 'kg', mandi: 'Srinagar', trend: '+5%' },
]

// GET all prices
app.get('/api/prices', (req, res) => {
  res.status(200).json(prices)
})

// GET single price
app.get('/api/prices/:id', (req, res) => {
  const price = prices.find(p => p.id === parseInt(req.params.id))
  if (!price) return res.status(404).json({ message: 'Price not found' })
  res.status(200).json(price)
})

// POST new price
app.post('/api/prices', (req, res) => {
  const { crop, price, unit, mandi, trend } = req.body
  if (!crop || !price || !mandi) {
    return res.status(400).json({ message: 'crop, price and mandi are required' })
  }
  const newPrice = { id: prices.length + 1, crop, price, unit: unit || 'kg', mandi, trend: trend || '0%' }
  prices.push(newPrice)
  res.status(201).json(newPrice)
})

// PUT update price
app.put('/api/prices/:id', (req, res) => {
  const index = prices.findIndex(p => p.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Price not found' })
  prices[index] = { ...prices[index], ...req.body }
  res.status(200).json(prices[index])
})

// DELETE price
app.delete('/api/prices/:id', (req, res) => {
  const index = prices.findIndex(p => p.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Price not found' })
  prices.splice(index, 1)
  res.status(204).send()
})

// GET search
app.get('/api/search', (req, res) => {
  const { crop } = req.query
  if (!crop) return res.status(400).json({ message: 'crop query param required' })
  const results = prices.filter(p => p.crop.toLowerCase().includes(crop.toLowerCase()))
  res.status(200).json(results)
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})