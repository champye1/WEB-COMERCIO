import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth.jsx'
import { useCurrency } from '@/context/CurrencyContext'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, profile, updateProfile, updatePassword } = useAuth()
  const { changeCurrency } = useCurrency()
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

    // Conectar moneda al CurrencyContext (que maneja localStorage internamente)
    changeCurrency(currency)
    if (expenseThreshold) {
      localStorage.setItem('expenseThreshold', expenseThreshold.toString())
    }

    setSuccessMsg('Preferencias guardadas')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  return (
    <div className="min-h-screen bg-[#0D0F12] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-[#F5F6F7] mb-2">Mi Perfil</h1>
        <p className="text-[#A8B0BB] mb-8">Administra tu información personal y preferencias</p>

        {/* Alertas globales */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 animate-slideUp">
            ✅ {successMsg}
          </div>
        )}

        <div className="space-y-8">
          {/* Sección: Información Personal */}
          <div className="bg-gradient-to-br from-[#111418] to-[#0D0F12] rounded-xl border border-[#1C1F24] p-8 hover:border-[#2C3139] transition-all duration-300 hover:shadow-xl hover:shadow-black/50">
            <h2 className="text-2xl font-bold text-[#F5F6F7] mb-6 flex items-center gap-3">
              👤 Información Personal
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#A8B0BB] uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 bg-[#0D0F12] border border-[#1C1F24] rounded-lg text-[#A8B0BB] cursor-not-allowed opacity-60"
                />
                <p className="text-xs text-[#A8B0BB] mt-2 italic">
                  El email no puede ser cambiado
                </p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A8B0BB] uppercase mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0D0F12] border border-[#1C1F24] rounded-lg text-[#F5F6F7] placeholder-[#A8B0BB] focus:border-emerald-500 focus:outline-none transition-all"
                  />
                  {fullNameError && (
                    <p className="text-red-400 text-sm mt-2">❌ {fullNameError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-emerald-400 to-green-500 text-[#0D0F12] rounded-lg font-bold hover:shadow-lg hover:shadow-emerald-400/50 hover:scale-105 transition-all duration-300"
                >
                  💾 Guardar Cambios
                </button>
              </form>
            </div>
          </div>

          {/* Sección: Seguridad */}
          <div className="bg-gradient-to-br from-[#111418] to-[#0D0F12] rounded-xl border border-[#1C1F24] p-8 hover:border-[#2C3139] transition-all duration-300 hover:shadow-xl hover:shadow-black/50">
            <h2 className="text-2xl font-bold text-[#F5F6F7] mb-6 flex items-center gap-3">
              🔐 Seguridad
            </h2>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#A8B0BB] uppercase mb-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-3 bg-[#0D0F12] border border-[#1C1F24] rounded-lg text-[#F5F6F7] placeholder-[#A8B0BB] focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A8B0BB] uppercase mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite tu nueva contraseña"
                  className="w-full px-4 py-3 bg-[#0D0F12] border border-[#1C1F24] rounded-lg text-[#F5F6F7] placeholder-[#A8B0BB] focus:border-emerald-500 focus:outline-none transition-all"
                />
              </div>

              {passwordError && (
                <p className="text-red-400 text-sm">❌ {passwordError}</p>
              )}
              {passwordSuccess && (
                <p className="text-emerald-400 text-sm">✅ {passwordSuccess}</p>
              )}

              <button
                type="submit"
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-[#0D0F12] rounded-lg font-bold hover:shadow-lg hover:shadow-blue-400/50 hover:scale-105 transition-all duration-300"
              >
                🔄 Cambiar Contraseña
              </button>
            </form>
          </div>

          {/* Sección: Preferencias */}
          <div className="bg-gradient-to-br from-[#111418] to-[#0D0F12] rounded-xl border border-[#1C1F24] p-8 hover:border-[#2C3139] transition-all duration-300 hover:shadow-xl hover:shadow-black/50">
            <h2 className="text-2xl font-bold text-[#F5F6F7] mb-6 flex items-center gap-3">
              ⚙️ Preferencias
            </h2>

            <form onSubmit={handleUpdatePreferences} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#A8B0BB] uppercase mb-2">
                  💱 Moneda por Defecto
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0D0F12] border border-[#1C1F24] rounded-lg text-[#F5F6F7] focus:border-emerald-500 focus:outline-none transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23A8B0BB' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem',
                  }}
                >
                  <option value="CLP">CLP - Peso Chileno</option>
                  <option value="USD">USD - Dólar Americano</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="ARS">ARS - Peso Argentino</option>
                  <option value="BRL">BRL - Real Brasileño</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A8B0BB] uppercase mb-2">
                  📊 Umbral Mensual de Gastos (opcional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-[#A8B0BB] font-semibold">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={expenseThreshold}
                    onChange={(e) => setExpenseThreshold(e.target.value ? parseFloat(e.target.value) : '')}
                    placeholder="Ej: 500000"
                    className="w-full pl-8 pr-4 py-3 bg-[#0D0F12] border border-[#1C1F24] rounded-lg text-[#F5F6F7] placeholder-[#A8B0BB] focus:border-emerald-500 focus:outline-none transition-all"
                  />
                </div>
                <p className="text-xs text-[#A8B0BB] mt-2">
                  Recibirás una alerta en el Dashboard si tus gastos superan este monto
                </p>
                {thresholdError && (
                  <p className="text-red-400 text-sm mt-2">❌ {thresholdError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-[#0D0F12] rounded-lg font-bold hover:shadow-lg hover:shadow-purple-400/50 hover:scale-105 transition-all duration-300"
              >
                ✨ Guardar Preferencias
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
