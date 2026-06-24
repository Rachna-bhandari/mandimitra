import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/login', label: 'Login' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-brand-green text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="font-display text-xl font-bold tracking-wide">MandiMitra</span>
        </Link>

        <ul className="hidden md:flex gap-6 text-sm font-medium">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-brand-gold border-b-2 border-brand-gold pb-0.5'
                    : 'hover:text-brand-gold transition-colors'
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-4 h-0.5 bg-white"></span>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-brand-green border-t border-green-700">
          <ul className="flex flex-col px-4 py-2 gap-3 text-sm font-medium">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive ? 'text-brand-gold' : 'hover:text-brand-gold'
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
