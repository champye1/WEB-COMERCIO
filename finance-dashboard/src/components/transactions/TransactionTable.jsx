import { useCurrency } from '@/context/CurrencyContext'

const formatDate = (date) => new Date(date).toLocaleDateString('es-ES')

export default function TransactionTable({
  transactions,
  total,
  page,
  pageSize,
  loading,
  onPageChange,
  onEdit,
  onDelete,
  onExport,
}) {
  const { convertAmount, currencySymbol } = useCurrency()
  const formatMoney = (amount) => {
    const converted = convertAmount(parseFloat(amount))
    return `${currencySymbol}${converted.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`
  }
  const totalPages = Math.ceil(total / pageSize)

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No hay transacciones que mostrar
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Fecha
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Descripción
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Categoría
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-white">
                Tipo
              </th>
              <th className="px-6 py-3 text-right font-semibold text-gray-900 dark:text-white">
                Monto
              </th>
              <th className="px-6 py-3 text-center font-semibold text-gray-900 dark:text-white">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(tx.date)}
                </td>
                <td className="px-6 py-4 truncate max-w-xs">
                  {tx.description || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tx.categories ? (
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: tx.categories.color }}
                    >
                      {tx.categories.name}
                    </span>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tx.type === 'income'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}
                  >
                    {tx.type === 'income' ? 'Ingreso' : 'Gasto'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-semibold">
                  <span
                    className={
                      tx.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }
                  >
                    {tx.type === 'income' ? '+' : '-'}
                    {formatMoney(tx.amount)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onEdit(tx)}
                      className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            '¿Estás seguro de que quieres eliminar esta transacción?'
                          )
                        ) {
                          onDelete(tx.id)
                        }
                      }}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación y Export */}
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Mostrando {(page - 1) * pageSize + 1}-
          {Math.min(page * pageSize, total)} de {total}
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => onExport()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition"
          >
            📥 Exportar
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50 text-gray-900 dark:text-white rounded text-sm"
            >
              ←
            </button>
            <span className="px-3 py-1 text-sm font-medium">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50 text-gray-900 dark:text-white rounded text-sm"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
