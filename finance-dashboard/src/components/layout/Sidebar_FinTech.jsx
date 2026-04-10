import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { signOut } = useAuth()

  // Sincronizar activeItem con la ruta actual
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveItem('dashboard')
    } else if (location.pathname === '/transactions') {
      setActiveItem('transactions')
    } else if (location.pathname === '/profile') {
      setActiveItem('settings')
    }
  }, [location.pathname])

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', badge: null, route: '/' },
    { id: 'transactions', label: 'Transacciones', icon: '💳', badge: null, route: '/transactions' },
    { id: 'budgets', label: 'Presupuestos', icon: '📋', badge: '3', route: '#' },
    { id: 'goals', label: 'Metas', icon: '🎯', badge: null, route: '#' },
    { id: 'analytics', label: 'Análisis', icon: '📈', badge: null, route: '#' },
  ]

  const bottomItems = [
    { id: 'help', label: 'Ayuda', icon: '❓', route: '#' },
    { id: 'settings', label: 'Configuración', icon: '⚙️', route: '/profile' },
    { id: 'logout', label: 'Cerrar Sesión', icon: '🚪', route: null },
  ]

  const handleMenuClick = (item) => {
    if (item.id === 'logout') {
      signOut()
      navigate('/login')
    } else if (item.route && item.route !== '#') {
      navigate(item.route)
      setActiveItem(item.id)
    }
  }

  return (
    <aside
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-gradient-to-b from-[#111418] to-[#0D0F12] border-r border-[#1C1F24] flex flex-col transition-all duration-300 flex-shrink-0 overflow-y-auto h-full`}
    >
      {/* Top Section */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item)}
            disabled={item.route === '#'}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 group relative disabled:opacity-50 disabled:cursor-not-allowed ${
              activeItem === item.id
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'text-[#A8B0BB] hover:text-[#F5F6F7] hover:bg-[#1C1F24]'
            }`}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {!isCollapsed && (
              <>
                <span className="text-sm">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-emerald-400 text-[#0D0F12] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </>
            )}

            {/* Hover Accent Line */}
            {activeItem === item.id && (
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-emerald-400 to-transparent rounded-l-full" />
            )}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#1C1F24] to-transparent mx-4" />

      {/* Bottom Section */}
      <div className="px-4 py-4 space-y-2">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item)}
            disabled={item.route === '#'}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              item.id === 'logout'
                ? 'text-red-400 hover:bg-red-500/10 hover:border hover:border-red-500/30'
                : 'text-[#A8B0BB] hover:text-[#F5F6F7] hover:bg-[#1C1F24]'
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mx-4 mb-4 p-3 rounded-lg bg-[#1C1F24] text-[#A8B0BB] hover:text-emerald-400 hover:bg-[#2C3139] transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
          />
        </svg>
      </button>
    </aside>
  )
}
