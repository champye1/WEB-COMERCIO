import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth.jsx'

export function useTransactions() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isFetchingRef = useRef(false)

  // Filtros
  const [filters, setFilters] = useState({
    dateFrom: null,
    dateTo: null,
    type: 'all', // 'all', 'income', 'expense'
    categoryId: null,
  })

  const [page, setPage] = useState(1)
  const pageSize = 10

  // Fetch transacciones paginadas
  const fetchTransactions = useCallback(async (pageNum = 1) => {
    if (!user || isFetchingRef.current) return

    isFetchingRef.current = true
    setLoading(true)

    // Timeout máximo de 10 segundos
    const timeoutId = setTimeout(() => {
      setLoading(false)
      isFetchingRef.current = false
      setError('Tiempo de conexión agotado. Intenta recargar.')
    }, 10000)

    try {
      let query = supabase
        .from('transactions')
        .select('*, categories(name, color)', { count: 'exact' })
        .eq('user_id', user.id)

      // Aplicar filtros
      if (filters.dateFrom) {
        query = query.gte('date', filters.dateFrom)
      }
      if (filters.dateTo) {
        query = query.lte('date', filters.dateTo)
      }
      if (filters.type !== 'all') {
        query = query.eq('type', filters.type)
      }
      if (filters.categoryId) {
        query = query.eq('category_id', filters.categoryId)
      }

      const from = (pageNum - 1) * pageSize
      const to = from + pageSize - 1

      const { data, count, error: fetchError } = await query
        .order('date', { ascending: false })
        .range(from, to)

      clearTimeout(timeoutId)

      if (fetchError) throw fetchError

      setTransactions(data || [])
      setTotal(count || 0)
      setPage(pageNum)
      setError(null)
    } catch (err) {
      clearTimeout(timeoutId)
      console.error('Transactions fetch error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
      isFetchingRef.current = false
    }
  }, [user, filters])

  // Fetch TODAS las transacciones (para export sin paginación)
  const fetchAllTransactions = useCallback(async () => {
    if (!user || isFetchingRef.current) return []

    isFetchingRef.current = true
    try {
      let query = supabase
        .from('transactions')
        .select('*, categories(name, color)')
        .eq('user_id', user.id)

      // Aplicar mismos filtros
      if (filters.dateFrom) {
        query = query.gte('date', filters.dateFrom)
      }
      if (filters.dateTo) {
        query = query.lte('date', filters.dateTo)
      }
      if (filters.type !== 'all') {
        query = query.eq('type', filters.type)
      }
      if (filters.categoryId) {
        query = query.eq('category_id', filters.categoryId)
      }

      const { data, error: fetchError } = await query.order('date', { ascending: false })

      if (fetchError) throw fetchError

      setError(null)
      return data || []
    } catch (err) {
      console.error('Export fetch error:', err)
      setError(err.message)
      return []
    } finally {
      isFetchingRef.current = false
    }
  }, [user, filters])

  const createTransaction = useCallback(async (transactionData) => {
    if (!user) return { error: 'No user' }

    const { data, error: insertError } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: user.id,
          ...transactionData,
        },
      ])
      .select('*, categories(name, color)')

    if (insertError) {
      setError(insertError.message)
      return { error: insertError }
    }

    // Refetch para actualizar la lista
    await fetchTransactions(1)
    return { data: data[0] }
  }, [user, fetchTransactions])

  const updateTransaction = useCallback(async (id, transactionData) => {
    if (!user) return { error: 'No user' }

    const { data, error: updateError } = await supabase
      .from('transactions')
      .update(transactionData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select('*, categories(name, color)')

    if (updateError) {
      setError(updateError.message)
      return { error: updateError }
    }

    await fetchTransactions(page)
    return { data: data[0] }
  }, [user, page, fetchTransactions])

  const deleteTransaction = useCallback(async (id) => {
    if (!user) return { error: 'No user' }

    const { error: deleteError } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (deleteError) {
      setError(deleteError.message)
      return { error: deleteError }
    }

    await fetchTransactions(page)
    return { success: true }
  }, [user, page, fetchTransactions])

  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters)
    setPage(1) // Reset a página 1
  }, [])

  // Auto-fetch cuando cambian user o filtros
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        fetchTransactions(1)
      }, 100) // Pequeño delay para evitar race conditions
      return () => clearTimeout(timer)
    } else {
      setLoading(false)
      setTransactions([])
      setTotal(0)
    }
  }, [user, filters, fetchTransactions])

  return {
    transactions,
    total,
    loading,
    error,
    filters,
    applyFilters,
    page,
    pageSize,
    setPage,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    fetchAllTransactions,
    refetch: () => fetchTransactions(page),
  }
}
