import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  const links = [
    { label: '📊 Dashboard', href: '/', icon: '📊' },
    { label: '💳 Transacciones', href: '/transactions', icon: '💳' },
    { label: '⚙️ Perfil', href: '/profile', icon: '⚙️' },
  ]

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          💰 FinDash
        </h1>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.href
          return (
            <Link
              key={link.href}
              to={link.href}
              className={`block px-4 py-2 rounded-lg transition font-medium ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
