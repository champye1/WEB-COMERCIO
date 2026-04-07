import { useState } from 'react'
import { useTransactions } from '@/hooks/useTransactions.jsx'
import { useCategories } from '@/hooks/useCategories.jsx'
import FilterBar from '@/components/transactions/FilterBar'
import TransactionTable from '@/components/transactions/TransactionTable'
import TransactionForm from '@/components/transactions/TransactionForm'
import { exportTransactionsToPDF, exportTransactionsToExcel } from '@/lib/exportUtils'

export default function TransactionsPage() {
  const { transactions, total, loading, filters, applyFilters, page, pageSize, setPage, createTransaction, updateTransaction, deleteTransaction, fetchAllTransactions } = useTransactions()
  const { categories, loading: categoriesLoading } = useCategories()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const handleCreateClick = () => {
    setSelectedTransaction(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction)
    setIsModalOpen(true)
  }

  const handleFormSubmit = async (data) => {
    if (selectedTransaction) {
      await updateTransaction(selectedTransaction.id, data)
    } else {
      await createTransaction(data)
    }
    setIsModalOpen(false)
    setSelectedTransaction(null)
  }

  const handleDelete = async (id) => {
    await deleteTransaction(id)
  }

  const handleExport = async () => {
    const allTransactions = await fetchAllTransactions()
    const exportData = allTransactions.map(t => ({
      ...t,
      categoryName: t.categories?.name || 'Sin categoría'
    }))

    // Mostrar opciones de export
    const format = confirm('¿Exportar como Excel? (OK=Excel, Cancelar=PDF)')
    if (format) {
      exportTransactionsToExcel(exportData)
    } else {
      exportTransactionsToPDF(exportData)
    }
  }

  if (categoriesLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          💳 Transacciones
        </h1>
        <button
          onClick={handleCreateClick}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition"
        >
          + Nueva Transacción
        </button>
      </div>

      <FilterBar
        filters={filters}
        categories={categories}
        onFilterChange={applyFilters}
      />

      <TransactionTable
        transactions={transactions}
        total={total}
        page={page}
        pageSize={pageSize}
        loading={loading}
        onPageChange={setPage}
        onEdit={handleEditClick}
        onDelete={handleDelete}
        onExport={handleExport}
      />

      {isModalOpen && (
        <TransactionForm
          transaction={selectedTransaction}
          categories={categories}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedTransaction(null)
          }}
        />
      )}
    </div>
  )
}
