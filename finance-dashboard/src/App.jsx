import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/hooks/useAuth.jsx'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import MainLayout from '@/components/layout/MainLayout'
import LoginPage from '@/pages/Login'
import RegisterPage from '@/pages/Register'
import DashboardPage from '@/pages/Dashboard'
import TransactionsPage from '@/pages/Transactions'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
            </Route>
          </Route>

          {/* Redirect default */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
