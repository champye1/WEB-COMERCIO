import { useAuth } from '@/hooks/useAuth.jsx'
import { useCurrency } from '@/context/CurrencyContext'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { user, profile, signOut } = useAuth()
  const { displayCurrency, changeCurrency } = useCurrency()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          💰 Finance Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {profile?.full_name || user?.email}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
        </div>

        <select
          value={displayCurrency}
          onChange={(e) => changeCurrency(e.target.value)}
          className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-white transition"
          title="Cambiar moneda"
        >
          <option value="CLP">CLP</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="ARS">ARS</option>
          <option value="BRL">BRL</option>
        </select>

        <ThemeToggle />

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition"
        >
          Salir
        </button>
      </div>
    </nav>
  )
}
