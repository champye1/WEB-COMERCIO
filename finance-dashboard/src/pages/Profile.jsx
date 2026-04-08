import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth.jsx'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, profile, updateProfile, updatePassword } = useAuth()
  const navigate = useNavigate()

  // Info personal
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [fullNameError, setFullNameError] = useState('')

  // Cambio de contraseña
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  // Preferencias
  const [currency, setCurrency] = useState(() => localStorage.getItem('selectedCurrency') || 'CLP')
  const [expenseThreshold, setExpenseThreshold] = useState(() => {
    const stored = localStorage.getItem('expenseThreshold')
    return stored ? parseFloat(stored) : ''
  })
  const [thresholdError, setThresholdError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    if (profile?.full_name) {
      setFullName(profile.full_name)
    }
  }, [profile])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setFullNameError('')
    setSuccessMsg('')

    if (!fullName.trim()) {
      setFullNameError('El nombre no puede estar vacío')
      return
    }

    const { error } = await updateProfile({ full_name: fullName })
    if (error) {
      setFullNameError(error.message || 'Error al actualizar perfil')
    } else {
      setSuccessMsg('Perfil actualizado exitosamente')
      setTimeout(() => setSuccessMsg(''), 3000)
    }
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')

    if (!newPassword || !confirmPassword) {
      setPasswordError('Completa todos los campos de contraseña')
      return
    }
    if (newPassword.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden')
      return
    }

    const { error } = await updatePassword(newPassword)
    if (error) {
      setPasswordError(error.message || 'Error al cambiar contraseña')
    } else {
      setPasswordSuccess('Contraseña actualizada exitosamente')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setPasswordSuccess(''), 3000)
    }
  }

  const handleUpdatePreferences = (e) => {
    e.preventDefault()
    setThresholdError('')
    setSuccessMsg('')

    if (expenseThreshold && expenseThreshold <= 0) {
      setThresholdError('El umbral debe ser mayor a 0')
      return
    }

    localStorage.setItem('selectedCurrency', currency)
    if (expenseThreshold) {
      localStorage.setItem('expenseThreshold', expenseThreshold.toString())
    }

    setSuccessMsg('Preferencias guardadas')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Perfil</h1>

      {/* Alertas globales */}
      {successMsg && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-800 dark:text-green-100 rounded-md">
          {successMsg}
        </div>
      )}

      <div className="space-y-8">
        {/* Sección: Información Personal */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Información Personal
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                El email no puede ser cambiado
              </p>
            </div>

            <form onSubmit={handleUpdateProfile}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {fullNameError && (
                  <p className="text-red-600 text-sm mt-1">{fullNameError}</p>
                )}
              </div>

              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>

        {/* Sección: Seguridad */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Seguridad
          </h2>

          <form onSubmit={handleUpdatePassword}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contraseña Actual
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Requerido para cambiar contraseña
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {passwordError && (
                <p className="text-red-600 text-sm">{passwordError}</p>
              )}
              {passwordSuccess && (
                <p className="text-green-600 text-sm">{passwordSuccess}</p>
              )}
            </div>

            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition"
            >
              Cambiar Contraseña
            </button>
          </form>
        </div>

        {/* Sección: Preferencias */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Preferencias
          </h2>

          <form onSubmit={handleUpdatePreferences}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Moneda por Defecto
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="CLP">CLP - Peso Chileno</option>
                  <option value="USD">USD - Dólar Americano</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="ARS">ARS - Peso Argentino</option>
                  <option value="BRL">BRL - Real Brasileño</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Umbral Mensual de Gastos (opcional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={expenseThreshold}
                  onChange={(e) => setExpenseThreshold(e.target.value ? parseFloat(e.target.value) : '')}
                  placeholder="Ej: 500000"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Recibirás una alerta en el Dashboard si tus gastos superan este monto
                </p>
                {thresholdError && (
                  <p className="text-red-600 text-sm mt-1">{thresholdError}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition"
            >
              Guardar Preferencias
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
