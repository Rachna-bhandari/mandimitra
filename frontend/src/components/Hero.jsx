import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <section className="relative text-white py-24 px-4 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1400&auto=format&fit=crop&q=80"
        alt="Farmers in Kedarnath Valley"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-green-800/80 to-green-900/90" />
      <div className="relative max-w-4xl mx-auto text-center z-10">
        <p className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-4">
          Uttarakhand Farmers Companion
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
          Know When to Sell.
          <br />
          <span className="text-brand-gold">Get a Fair Price.</span>
        </h1>
        <p className="text-green-200 text-base md:text-lg max-w-2xl mx-auto mb-10">
          MandiMitra fetches live mandi rates for your crops, shows a 2-week
          price trend, and gives you an AI-powered advisory in plain Hindi or
          English so middlemen never get the upper hand again.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard" className="bg-brand-gold text-green-900 font-semibold px-7 py-3 rounded-full hover:brightness-110 transition">
            Check Todays Prices
          </Link>
          <Link to="/about" className="border border-white text-white px-7 py-3 rounded-full hover:bg-white hover:text-brand-green transition">
            How It Works
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center">
          {[
            { value: "3", label: "Mandis covered" },
            { value: "5+", label: "Crops tracked" },
            { value: "AI", label: "Price advisory" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-display text-3xl font-bold text-brand-gold">{value}</p>
              <p className="text-green-300 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
