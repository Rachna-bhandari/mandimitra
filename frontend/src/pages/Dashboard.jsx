import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-5xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-bold text-brand-green mb-4">
          Price Dashboard
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          Select a crop and mandi below to fetch live prices, view the 2-week wired up.
        </p>
        <div className="mt-10 rounded-2xl border-2 border-dashed border-green-200 bg-green-50 p-10 text-center text-green-700">
          <p className="text-4xl mb-3">🚧</p>
          <p className="font-semibold">Live data integration — coming soon...</p>
          <p className="text-sm text-gray-400 mt-1">
            Drop selector, chart, and AI advisory will appear here
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
