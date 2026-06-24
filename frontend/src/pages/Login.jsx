import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-8 w-full max-w-sm">
          <h1 className="font-display text-3xl font-bold text-brand-green mb-2">
            Coordinator Login
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Sign in to access the live prices and your AI advisory.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <button className="w-full bg-brand-green text-white font-semibold py-2.5 rounded-lg hover:bg-green-800 transition">
              Sign In
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">

          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
