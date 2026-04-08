import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function RegisterForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    if (!fullName.trim()) {
      setError('El nombre es requerido')
      return false
    }
    if (!email.trim()) {
      setError('El email es requerido')
      return false
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return false
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setLoading(true)

    const { error: authError } = await signUp(email, password, fullName)
    setLoading(false)

    if (authError) {
      setError(authError.message)
      return
    }

    setSuccess(true)
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }

  if (success) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 p-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 mb-6">
            <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Registro Exitoso!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Tu cuenta ha sido creada correctamente.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Redirigiendo a inicio de sesión...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl">
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-4xl bg-gradient-to-br from-indigo-600 to-indigo-700 shadow-lg mb-8">
          <span className="text-8xl">💰</span>
        </div>
        <h1 className="text-7xl font-bold text-gray-900 dark:text-white mb-4">
          FinDash
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-2xl">
          Comienza a controlar tus finanzas hoy
        </p>
      </div>

      {/* Card Principal */}
      <div className="p-16">
        <form onSubmit={handleSubmit} className="space-y-20">
          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="block text-xl font-medium text-gray-700 dark:text-gray-300 mb-8">
              Nombre Completo
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Juan Pérez"
              className="w-full px-0 py-5 text-2xl bg-transparent border-b border-transparent dark:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:border-b-2 transition-colors"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-xl font-medium text-gray-700 dark:text-gray-300 mb-8">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              className="w-full px-0 py-5 text-2xl bg-transparent border-b border-transparent dark:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:border-b-2 transition-colors"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-xl font-medium text-gray-700 dark:text-gray-300 mb-8">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-0 py-5 text-2xl bg-transparent border-b border-transparent dark:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:border-b-2 transition-colors"
            />
            <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">
              Mínimo 6 caracteres
            </p>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-xl font-medium text-gray-700 dark:text-gray-300 mb-5">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-0 py-5 text-2xl bg-transparent border-b border-transparent dark:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:border-b-2 transition-colors"
            />
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl">
              <div className="flex gap-3">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                </svg>
                <p className="text-base text-red-600 dark:text-red-400 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 disabled:shadow-none transform hover:scale-105 disabled:scale-100 mt-20"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Registrando...
              </span>
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-slate-600"></div>
          </div>
          <div className="relative flex justify-center text-sm uppercase">
            <span className="px-3 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 font-medium">O</span>
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center text-lg text-gray-700 dark:text-gray-300">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition">
            Inicia sesión aquí
          </Link>
        </p>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-10">
        Al registrarte, aceptas nuestros Términos y Política de Privacidad
      </p>
    </div>
  )
}
