import mongoose from 'mongoose'

const priceSchema = new mongoose.Schema(
  {
    crop: {
      type: String,
      required: [true, 'crop is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
      min: 0,
    },
    unit: {
      type: String,
      default: 'kg',
      trim: true,
    },
    mandi: {
      type: String,
      required: [true, 'mandi is required'],
      trim: true,
    },
    trend: {
      type: String,
      default: '0%',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Price = mongoose.model('Price', priceSchema)

export default Price