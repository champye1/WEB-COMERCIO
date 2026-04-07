import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth.jsx'

export function useTransactions() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
  const fetchTransactions = async (pageNum = 1) => {
    if (!user) return
    setLoading(true)

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

      if (fetchError) throw fetchError

      setTransactions(data || [])
      setTotal(count || 0)
      setPage(pageNum)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Fetch TODAS las transacciones (para export sin paginación)
  const fetchAllTransactions = async () => {
    if (!user) return []

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

      return data || []
    } catch (err) {
      setError(err.message)
      return []
    }
  }

  const createTransaction = async (transactionData) => {
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
  }

  const updateTransaction = async (id, transactionData) => {
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
  }

  const deleteTransaction = async (id) => {
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
  }

  const applyFilters = (newFilters) => {
    setFilters(newFilters)
    setPage(1) // Reset a página 1
  }

  // Auto-fetch cuando cambian user o filtros
  useEffect(() => {
    if (user) {
      fetchTransactions(1)
    }
  }, [user, filters])

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
