import { useState } from 'react'

export default function TransactionTable({ transactions = [], onEdit, onDelete }) {
  const [sortBy, setSortBy] = useState('date')
  const [filterType, setFilterType] = useState('all')

  const filteredTransactions = transactions.filter((t) =>
    filterType === 'all' ? true : t.type === filterType
  )

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date)
    if (sortBy === 'amount') return b.amount - a.amount
    return 0
  })

  const getCategoryColor = (category) => {
    const colors = {
      'Alimentación': '#E74C3C',
      'Transporte': '#3498DB',
      'Entretenimiento': '#9B59B6',
      'Salud': '#E67E22',
      'Suscripciones': '#1ABC9C',
      'Otros': '#95A5A6',
    }
    return colors[category] || '#A8B0BB'
  }

  if (sortedTransactions.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#111418] to-[#0D0F12] rounded-xl border border-[#1C1F24] p-12 text-center">
        <p className="text-[#A8B0BB] text-lg">No hay transacciones registradas</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-[#111418] to-[#0D0F12] rounded-xl border border-[#1C1F24] overflow-hidden hover:border-[#2C3139] transition-all duration-300 hover:shadow-xl hover:shadow-black/50">
      {/* Header with Controls */}
      <div className="p-6 border-b border-[#1C1F24] bg-[#0D0F12]">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold text-[#F5F6F7] mb-2">Historial de Transacciones</h3>
            <p className="text-sm text-[#A8B0BB]">{sortedTransactions.length} transacciones</p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            {/* Filter by Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 rounded-lg bg-[#111418] border border-[#1C1F24] text-[#F5F6F7] hover:border-[#2C3139] focus:border-emerald-500 focus:outline-none transition-all text-sm"
            >
              <option value="all">Todos</option>
              <option value="income">Ingresos</option>
              <option value="expense">Gastos</option>
            </select>

            {/* Sort by */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg bg-[#111418] border border-[#1C1F24] text-[#F5F6F7] hover:border-[#2C3139] focus:border-emerald-500 focus:outline-none transition-all text-sm"
            >
              <option value="date">Más recientes</option>
              <option value="amount">Mayor monto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1C1F24] bg-[#0D0F12]">
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#A8B0BB] uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#A8B0BB] uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#A8B0BB] uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#A8B0BB] uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-[#A8B0BB] uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-[#A8B0BB] uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction, index) => (
              <tr
                key={transaction.id || index}
                className={`border-b border-[#1C1F24] hover:bg-[#111418] transition-colors ${
                  index % 2 === 0 ? 'bg-[#0D0F12]' : 'bg-[#161A1E]'
                }`}
              >
                <td className="px-6 py-4 text-sm text-[#A8B0BB]">
                  {new Date(transaction.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#F5F6F7]">
                  {transaction.description}
                </td>
                <td className="px-6 py-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      color: getCategoryColor(transaction.category),
                      backgroundColor: getCategoryColor(transaction.category) + '15',
                      border: `1px solid ${getCategoryColor(transaction.category)}40`,
                    }}
                  >
                    {transaction.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${
                      transaction.type === 'income'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-red-500/20 text-red-400 border border-red-500/40'
                    }`}
                  >
                    {transaction.type === 'income' ? '➕ Ingreso' : '➖ Gasto'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-bold">
                  <span
                    className={
                      transaction.type === 'income'
                        ? 'text-emerald-400'
                        : 'text-red-400'
                    }
                  >
                    {transaction.type === 'income' ? '+' : '-'}${Number(transaction.amount).toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit && onEdit(transaction)}
                      className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/20 hover:border hover:border-blue-500/40 transition-all"
                      title="Editar"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(transaction.id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 hover:border hover:border-red-500/40 transition-all"
                      title="Eliminar"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
