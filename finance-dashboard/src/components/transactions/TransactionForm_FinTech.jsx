import { useState } from 'react'

export default function TransactionForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      date: new Date().toISOString().split('T')[0],
      description: '',
      type: 'expense',
      category: 'Otros',
      amount: '',
    }
  )

  const [isLoading, setIsLoading] = useState(false)

  const categories = {
    expense: [
      'Alimentación',
      'Transporte',
      'Entretenimiento',
      'Salud',
      'Suscripciones',
      'Otros',
    ],
    income: ['Salario', 'Freelance', 'Inversiones', 'Otros'],
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      if (name === 'type') {
        updated.category = categories[value][0]
      }
      return updated
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.description || !formData.amount) {
      alert('Por favor completa todos los campos')
      return
    }

    setIsLoading(true)
    try {
      await onSubmit({
        ...formData,
        amount: parseFloat(formData.amount),
      })

      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        type: 'expense',
        category: 'Otros',
        amount: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Hubo un error al guardar la transacción')
    } finally {
      setIsLoading(false)
    }
  }

  const isIncome = formData.type === 'income'

  return (
    <div className="bg-gradient-to-br from-[#111418] to-[#0D0F12] rounded-xl border border-[#1C1F24] p-8 hover:border-[#2C3139] transition-all duration-300 hover:shadow-xl hover:shadow-black/50 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#F5F6F7] mb-2">
          {initialData ? 'Editar Transacción' : 'Nueva Transacción'}
        </h2>
        <p className="text-sm text-[#A8B0BB]">
          {initialData
            ? 'Actualiza los detalles de tu transacción'
            : 'Registra un nuevo ingreso o gasto'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type Selector */}
        <div className="grid grid-cols-2 gap-4">
          {(['income', 'expense'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  type,
                  category: categories[type][0],
                }))
              }
              className={`p-4 rounded-lg font-semibold text-center transition-all duration-300 border-2 ${
                formData.type === type
                  ? type === 'income'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-red-500/20 border-red-500 text-red-400'
                  : 'bg-[#0D0F12] border-[#1C1F24] text-[#A8B0BB] hover:border-[#2C3139]'
              }`}
            >
              <span className="text-2xl mr-2">{type === 'income' ? '📥' : '📤'}</span>
              {type === 'income' ? 'Ingreso' : 'Gasto'}
            </button>
          ))}
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-semibold text-[#F5F6F7] mb-2">
            Fecha
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#0D0F12] border border-[#1C1F24] text-[#F5F6F7] placeholder-[#A8B0BB] focus:border-emerald-500 focus:outline-none transition-all"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-semibold text-[#F5F6F7] mb-2">
            Descripción
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ej: Compra en supermercado"
            className="w-full px-4 py-3 rounded-lg bg-[#0D0F12] border border-[#1C1F24] text-[#F5F6F7] placeholder-[#A8B0BB] focus:border-emerald-500 focus:outline-none transition-all"
          />
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-semibold text-[#F5F6F7] mb-2">
            Monto (CLP)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-[#A8B0BB] font-semibold">$</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full pl-8 pr-4 py-3 rounded-lg bg-[#0D0F12] border border-[#1C1F24] text-[#F5F6F7] placeholder-[#A8B0BB] focus:border-emerald-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-sm font-semibold text-[#F5F6F7] mb-2">
            Categoría
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#0D0F12] border border-[#1C1F24] text-[#F5F6F7] focus:border-emerald-500 focus:outline-none transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23A8B0BB' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.75rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
          >
            {categories[formData.type].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-bold text-[#0D0F12] transition-all duration-300 flex items-center justify-center gap-2 ${
              isLoading
                ? 'bg-[#A8B0BB] cursor-not-allowed opacity-50'
                : isIncome
                  ? 'bg-gradient-to-r from-emerald-400 to-green-500 hover:shadow-lg hover:shadow-emerald-400/50 hover:scale-105'
                  : 'bg-gradient-to-r from-blue-400 to-blue-500 hover:shadow-lg hover:shadow-blue-400/50 hover:scale-105'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Guardando...
              </>
            ) : (
              <>
                {isIncome ? '✅' : '📤'} {initialData ? 'Actualizar' : 'Guardar'} Transacción
              </>
            )}
          </button>
        </div>

        {/* Reset Button (only for new transactions) */}
        {!initialData && (
          <button
            type="button"
            onClick={() =>
              setFormData({
                date: new Date().toISOString().split('T')[0],
                description: '',
                type: 'expense',
                category: 'Otros',
                amount: '',
              })
            }
            className="w-full py-2 rounded-lg font-semibold text-[#A8B0BB] hover:text-[#F5F6F7] hover:bg-[#1C1F24] transition-all"
          >
            Limpiar formulario
          </button>
        )}
      </form>
    </div>
  )
}
