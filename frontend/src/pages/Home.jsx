import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Footer from '../components/Footer'

const features = [
  {
    icon: '📡',
    tag: 'Live Data',
    title: 'Real-Time Mandi Prices',
    description: 'Fetches live commodity prices from Agmarknet (data.gov.in) for Rudraprayag, Srinagar, and Haldwani mandis.',
  },
  {
    icon: '📈',
    tag: 'Trends',
    title: '2-Week Price Chart',
    description: 'Interactive graph shows whether potato, peas, or beans prices are rising or falling over the past fortnight.',
  },
  {
    icon: '🤖',
    tag: 'AI Advisory',
    title: 'AI-Powered Sell Advice',
    description: 'Claude AI reads live price data and your harvest date, then returns a plain-language recommendation to hold, sell, or redirect.',
  },
  {
    icon: '📲',
    tag: 'Shareable',
    title: 'WhatsApp-Ready Card',
    description: 'One-tap export of the AI advisory as an image card. Forward it to your farmers instantly on WhatsApp.',
  },
]

const crops = [
  { icon: '🥔', name: 'Potato', price: '₹ 14 / kg', trend: '↑ 6%' },
  { icon: '🫛', name: 'Peas', price: '₹ 28 / kg', trend: '↓ 2%' },
  { icon: '🫘', name: 'Beans', price: '₹ 35 / kg', trend: '↑ 11%' },
]

const gallery = [
  {
    img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80',
    caption: 'Terraced fields of Kedarnath Valley',
    location: 'Rudraprayag district',
  },
  {
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&auto=format&fit=crop&q=80',
    caption: 'Farmers sorting the morning harvest',
    location: 'Chamoli, Uttarakhand',
  },
  {
    img: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&auto=format&fit=crop&q=80',
    caption: 'Fresh vegetables ready for the mandi',
    location: 'Haldwani market',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />

        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="font-display text-3xl font-bold text-center text-brand-green mb-2">
            Everything a Coordinator Needs
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            All the tools — live prices, trends, AI advice — in one simple app.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <Card key={f.title} {...f} />
            ))}
          </div>
        </section>

        <section className="bg-brand-cream py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-brand-green mb-2 text-center">
              From the Valley to the Mandi
            </h2>
            <p className="text-center text-gray-500 text-sm mb-10">
              The farmers MandiMitra serves — and the fields their work comes from.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {gallery.map((g) => (
                <div key={g.caption} className="rounded-2xl overflow-hidden shadow-md group">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={g.img}
                      alt={g.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="bg-white px-4 py-3">
                    <p className="font-semibold text-gray-800 text-sm">{g.caption}</p>
                    <p className="text-xs text-brand-green mt-0.5">📍 {g.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-green-50 py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-brand-green mb-2 text-center">
              Sample Prices Today
            </h2>
            <p className="text-center text-gray-500 text-sm mb-8">
              Preview — live data loads in the Dashboard
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {crops.map((c) => (
                <Card
                  key={c.name}
                  icon={c.icon}
                  title={c.name}
                  tag="Rudraprayag"
                  description={`Current: ${c.price}  •  Trend: ${c.trend} vs last week`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 px-4 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1400&auto=format&fit=crop&q=80"
            alt="Mountain farmland"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-green/80" />
          <div className="relative z-10 max-w-2xl mx-auto text-center text-white">
            <h2 className="font-display text-3xl font-bold mb-4">
              Built for the Mountains
            </h2>
            <p className="text-green-200 text-base leading-relaxed mb-6">
              Smallhold farmers in Uttarakhand deserve the same market intelligence
              that large traders have. MandiMitra levels the playing field — one
              price lookup at a time.
            </p>
            <Link
              to="/about"
              className="inline-block bg-brand-gold text-green-900 font-semibold px-6 py-3 rounded-full hover:brightness-110 transition"
            >
              Read Our Story
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}