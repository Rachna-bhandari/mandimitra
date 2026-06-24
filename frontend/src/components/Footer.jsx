import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="font-display text-white text-lg font-bold mb-2">MandiMitra</p>
          <p className="text-sm leading-relaxed">
            Fair prices for every farmer in the Kedarnath Valley and beyond.
          </p>
        </div>
        <div>
          <p className="text-white font-semibold mb-3 text-sm">Quick Links</p>
          <ul className="space-y-2 text-sm">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/dashboard', label: 'Dashboard' },
              { to: '/login', label: 'Login' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="hover:text-brand-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-3 text-sm">Mandis Covered</p>
          <ul className="space-y-1 text-sm">
            <li>Rudraprayag</li>
            <li>Srinagar (Garhwal)</li>
            <li>Haldwani</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-green-800 text-center py-4 text-xs text-green-500">
        TBI-GEHU Internship 2026 - MandiMitra - Built for mountain farmers
      </div>
    </footer>
  )
}
