import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '@/components/auth/RegisterForm'
import { useAuth } from '@/hooks/useAuth.jsx'

export default function RegisterPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300 dark:bg-indigo-900 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-emerald-300 dark:bg-emerald-900 rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>

      {/* Content */}
      <div className="relative z-10">
        <RegisterForm />
      </div>
    </div>
  )
}
