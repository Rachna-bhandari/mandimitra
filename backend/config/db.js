import mongoose from 'mongoose'
import dns from 'dns'

// Force Node to use Google's DNS resolver directly.
// Fixes "querySrv ECONNREFUSED" on some Windows/mobile-network setups
// where Node doesn't pick up the OS-level DNS settings.
dns.setServers(['8.8.8.8', '8.8.4.4'])

export const connectDB = async () => {
  const uri = process.env.MONGO_URI

  if (!uri) {
    console.error('❌ MONGO_URI is not set. Add it to your .env file.')
    process.exit(1)
  }

  try {
    await mongoose.connect(uri)
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    process.exit(1)
  }
}