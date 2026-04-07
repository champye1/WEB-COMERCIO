import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth.jsx'

const DEFAULT_CATEGORIES = {
  income: [
    { name: 'Salario', color: '#22c55e' },
    { name: 'Freelance', color: '#10b981' },
    { name: 'Inversiones', color: '#06b6d4' },
  ],
  expense: [
    { name: 'Alimentación', color: '#f97316' },
    { name: 'Transporte', color: '#f59e0b' },
    { name: 'Entretenimiento', color: '#ec4899' },
    { name: 'Salud', color: '#8b5cf6' },
    { name: 'Servicios', color: '#6366f1' },
  ],
}

export function useCategories() {
  const { user } = useAuth()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCategories = async () => {
    if (!user) return
    setLoading(true)
    try {
      const { data, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id)
        .order('type')

      if (fetchError) throw fetchError

      // Si no hay categorías, seed con defaults
      if (!data || data.length === 0) {
        await seedDefaultCategories()
      } else {
        setCategories(data)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const seedDefaultCategories = async () => {
    if (!user) return

    const categoriesToInsert = []

    for (const [type, items] of Object.entries(DEFAULT_CATEGORIES)) {
      items.forEach((cat) => {
        categoriesToInsert.push({
          user_id: user.id,
          name: cat.name,
          color: cat.color,
          type,
        })
      })
    }

    const { data, error: insertError } = await supabase
      .from('categories')
      .insert(categoriesToInsert)
      .select()

    if (insertError) {
      console.error('Error seeding categories:', insertError)
      setError(insertError.message)
    } else {
      setCategories(data || [])
    }
  }

  const createCategory = async (name, type, color = '#6366f1') => {
    if (!user) return { error: 'No user' }

    const { data, error: insertError } = await supabase
      .from('categories')
      .insert([
        {
          user_id: user.id,
          name,
          type,
          color,
        },
      ])
      .select()

    if (insertError) {
      setError(insertError.message)
      return { error: insertError }
    }

    setCategories([...categories, data[0]])
    return { data: data[0] }
  }

  useEffect(() => {
    if (user) {
      fetchCategories()
    }
  }, [user])

  return {
    categories,
    loading,
    error,
    createCategory,
    refetch: fetchCategories,
  }
}
