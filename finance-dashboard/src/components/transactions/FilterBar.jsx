import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

export default function FilterBar({ filters, categories, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters)
  const debouncedFilters = useDebounce(localFilters, 300)

  // Aplicar filtros cuando cambien después del debounce
  useEffect(() => {
    if (JSON.stringify(debouncedFilters) !== JSON.stringify(filters)) {
      onFilterChange(debouncedFilters)
    }
  }, [debouncedFilters, filters, onFilterChange])

  const handleDateFromChange = (e) => {
    setLocalFilters({ ...localFilters, dateFrom: e.target.value || null })
  }

  const handleDateToChange = (e) => {
    setLocalFilters({ ...localFilters, dateTo: e.target.value || null })
  }

  const handleTypeChange = (e) => {
    setLocalFilters({ ...localFilters, type: e.target.value })
  }

  const handleCategoryChange = (e) => {
    setLocalFilters({ ...localFilters, categoryId: e.target.value || null })
  }

  const handleReset = () => {
    const newFilters = { dateFrom: null, dateTo: null, type: 'all', categoryId: null }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Desde
          </label>
          <input
            type="date"
            value={filters.dateFrom || ''}
            onChange={handleDateFromChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Hasta
          </label>
          <input
            type="date"
            value={filters.dateTo || ''}
            onChange={handleDateToChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tipo
          </label>
          <select
            value={filters.type}
            onChange={handleTypeChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            <option value="all">Todas</option>
            <option value="income">Ingresos</option>
            <option value="expense">Gastos</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoría
          </label>
          <select
            value={filters.categoryId || ''}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            <option value="">Todas</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white rounded-md text-sm font-medium transition"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  )
}
