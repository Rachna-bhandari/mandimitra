import express from 'express'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import passport from 'passport'
import User from '../models/User.js'
import { authLimiter } from '../middleware/rateLimiter.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

// REGISTER
router.post('/register',
  authLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    try {
      const { name, email, password } = req.body
      const existing = await User.findOne({ email })
      if (existing) return res.status(400).json({ message: 'Email already registered' })

      const user = await User.create({ name, email, password })
      const token = generateToken(user)
      res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } })
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message })
    }
  }
)

// LOGIN
router.post('/login',
  authLimiter,
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password required'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user || !user.password) return res.status(401).json({ message: 'Invalid credentials' })

      const match = await user.comparePassword(password)
      if (!match) return res.status(401).json({ message: 'Invalid credentials' })

      const token = generateToken(user)
      res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message })
    }
  }
)

// LOGOUT
router.post('/logout', protect, (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

// Protected test route
router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  res.json(user)
})

// GOOGLE OAUTH — Step 1: redirect user to Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
}))

// GOOGLE OAUTH — Step 2: Google redirects back here
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = generateToken(req.user)
    // Redirect to frontend with token as query param
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`)
  }
)
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
  prompt: 'consent',   
}))

export default router