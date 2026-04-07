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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <RegisterForm />
    </div>
  )
}
