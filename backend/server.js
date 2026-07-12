import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import Price from './models/Price.js'
import authRoutes from './routes/auth.js'
import passport from './config/passport.js'   // 👈 NEW

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use(passport.initialize())   // 👈 NEW

await connectDB()

app.use('/api/auth', authRoutes)

app.get('/api/prices', async (req, res) => {
  try {
    const prices = await Price.find().sort({ createdAt: -1 })
    res.status(200).json(prices)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch prices', error: err.message })
  }
})

app.get('/api/prices/:id', async (req, res) => {
  try {
    const price = await Price.findById(req.params.id)
    if (!price) return res.status(404).json({ message: 'Price not found' })
    res.status(200).json(price)
  } catch (err) {
    res.status(400).json({ message: 'Invalid id', error: err.message })
  }
})

app.post('/api/prices', async (req, res) => {
  try {
    const { crop, price, unit, mandi, trend } = req.body
    if (!crop || price === undefined || !mandi) {
      return res.status(400).json({ message: 'crop, price and mandi are required' })
    }
    const newPrice = await Price.create({ crop, price, unit, mandi, trend })
    res.status(201).json(newPrice)
  } catch (err) {
    res.status(400).json({ message: 'Failed to create price', error: err.message })
  }
})

app.put('/api/prices/:id', async (req, res) => {
  try {
    const updated = await Price.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updated) return res.status(404).json({ message: 'Price not found' })
    res.status(200).json(updated)
  } catch (err) {
    res.status(400).json({ message: 'Failed to update price', error: err.message })
  }
})

app.delete('/api/prices/:id', async (req, res) => {
  try {
    const deleted = await Price.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Price not found' })
    res.status(204).send()
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete price', error: err.message })
  }
})

app.get('/api/search', async (req, res) => {
  try {
    const { crop } = req.query
    if (!crop) return res.status(400).json({ message: 'crop query param required' })
    const results = await Price.find({ crop: { $regex: crop, $options: 'i' } })
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message })
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})