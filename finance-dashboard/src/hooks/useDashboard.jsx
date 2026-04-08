import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth.jsx'

export function useDashboard() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isFetchingRef = useRef(false)
  const loadingTimeoutRef = useRef(null)

  // Fetch últimos 6 meses de transacciones para dashboard
  const fetchDashboardData = useCallback(async () => {
    if (!user || isFetchingRef.current) return

    isFetchingRef.current = true
    setLoading(true)

    // Timeout máximo de 8 segundos
    const timeoutId = setTimeout(() => {
      setLoading(false)
      isFetchingRef.current = false
      setError('Tiempo de conexión agotado.')
      // Resetear error después de 3 segundos
      setTimeout(() => setError(null), 3000)
    }, 8000)

    try {
      // Obtener fecha de hace 6 meses
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
      const dateString = sixMonthsAgo.toISOString().split('T')[0]

      const { data, error: fetchError } = await supabase
        .from('transactions')
        .select('*, categories(name, color)')
        .eq('user_id', user.id)
        .gte('date', dateString)
        .order('date', { ascending: true })

      clearTimeout(timeoutId)

      if (fetchError) throw fetchError

      setTransactions(data || [])
      setError(null)
    } catch (err) {
      clearTimeout(timeoutId)
      console.error('Dashboard fetch error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
      isFetchingRef.current = false
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    } else {
      setLoading(false)
      setTransactions([])
    }

    return () => {
      isFetchingRef.current = false
    }
  }, [user])

  return {
    transactions,
    loading,
    error,
    refetch: fetchDashboardData,
  }
}

// Funciones puras para calcular datos
export function getKPIs(transactions, monthDate = new Date()) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()

  // Filtrar transacciones del mes actual
  const monthTransactions = transactions.filter((t) => {
    const tDate = new Date(t.date)
    return tDate.getFullYear() === year && tDate.getMonth() === month
  })

  const totalIncome = monthTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)

  const totalExpense = monthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)

  const balance = totalIncome - totalExpense
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0

  return {
    totalIncome: parseFloat(totalIncome.toFixed(2)),
    totalExpense: parseFloat(totalExpense.toFixed(2)),
    balance: parseFloat(balance.toFixed(2)),
    savingsRate: parseFloat(savingsRate),
  }
}

export function getBarChartData(transactions) {
  const monthlyData = {}

  transactions.forEach((t) => {
    const date = new Date(t.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const monthLabel = date.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' })

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { month: monthLabel, income: 0, expense: 0 }
    }

    if (t.type === 'income') {
      monthlyData[monthKey].income += parseFloat(t.amount)
    } else {
      monthlyData[monthKey].expense += parseFloat(t.amount)
    }
  })

  return Object.values(monthlyData).slice(-6) // Últimos 6 meses
}

export function getPieChartData(transactions, monthDate = new Date()) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()

  // Solo gastos del mes actual
  const monthExpenses = transactions.filter((t) => {
    const tDate = new Date(t.date)
    return (
      tDate.getFullYear() === year &&
      tDate.getMonth() === month &&
      t.type === 'expense'
    )
  })

  const categoryData = {}

  monthExpenses.forEach((t) => {
    const categoryName = t.categories?.name || 'Sin categoría'
    if (!categoryData[categoryName]) {
      categoryData[categoryName] = {
        name: categoryName,
        value: 0,
        color: t.categories?.color || '#6366f1',
      }
    }
    categoryData[categoryName].value += parseFloat(t.amount)
  })

  return Object.values(categoryData)
}

export function getAreaChartData(transactions) {
  const monthlyBalance = {}

  transactions.forEach((t) => {
    const date = new Date(t.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const monthLabel = date.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' })

    if (!monthlyBalance[monthKey]) {
      monthlyBalance[monthKey] = { month: monthLabel, balance: 0 }
    }

    const amount = parseFloat(t.amount)
    if (t.type === 'income') {
      monthlyBalance[monthKey].balance += amount
    } else {
      monthlyBalance[monthKey].balance -= amount
    }
  })

  // Calcular balance acumulativo
  let accumulated = 0
  return Object.values(monthlyBalance)
    .slice(-6)
    .map((item) => ({
      ...item,
      balance: parseFloat((accumulated + item.balance).toFixed(2)),
    }))
    .map((item) => {
      accumulated = item.balance
      return item
    })
}
