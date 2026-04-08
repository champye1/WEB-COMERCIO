import { useState, useEffect } from 'react'

export default function AlertBanner({ totalExpense, threshold }) {
  const [isDismissed, setIsDismissed] = useState(false)

  // Si no hay threshold, no mostrar nada
  if (!threshold || totalExpense <= threshold) {
    return null
  }

  // Si ya fue dismissido en esta sesión, no mostrar
  if (isDismissed) {
    return null
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    // Guardar en sessionStorage para que persista durante la sesión pero se limpie al cerrar
    sessionStorage.setItem('alertDismissed', 'true')
  }

  // Verificar si fue dismissido en sesiones anteriores
  useEffect(() => {
    const dismissed = sessionStorage.getItem('alertDismissed')
    if (dismissed) {
      setIsDismissed(true)
    }
  }, [])

  const exceedAmount = (totalExpense - threshold).toFixed(2)
  const percentage = ((totalExpense / threshold) * 100).toFixed(0)

  return (
    <div className="mx-4 mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <h3 className="font-semibold text-red-800 dark:text-red-300">
            ⚠️ Limite de gastos excedido
          </h3>
        </div>
        <p className="text-sm text-red-700 dark:text-red-200">
          Tus gastos este mes <span className="font-bold">${totalExpense.toLocaleString('es-CL')}</span> superan
          tu límite de <span className="font-bold">${threshold.toLocaleString('es-CL')}</span>.
          Excedente: <span className="font-bold text-red-600 dark:text-red-400">${exceedAmount}</span> ({percentage}%)
        </p>
      </div>
      <button
        onClick={handleDismiss}
        className="ml-4 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition flex-shrink-0"
        title="Cerrar"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </button>
    </div>
  )
}
