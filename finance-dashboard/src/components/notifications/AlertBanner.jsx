import { useState, useEffect } from 'react'

export default function AlertBanner({ totalExpense, threshold }) {
  const [isDismissed, setIsDismissed] = useState(false)

  // Verificar si fue dismissido en sesiones anteriores
  // DEBE estar antes de los return statements
  useEffect(() => {
    const dismissed = sessionStorage.getItem('alertDismissed')
    if (dismissed) {
      setIsDismissed(true)
    }
  }, [])

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

  const exceedAmount = (totalExpense - threshold).toFixed(2)
  const percentage = ((totalExpense / threshold) * 100).toFixed(0)

  return (
    <div className="mx-6 mb-8 p-6 bg-gradient-to-r from-red-500/15 to-red-500/5 border border-red-500/40 rounded-xl flex justify-between items-start hover:border-red-500/60 transition-all duration-300 animate-slideUp shadow-lg shadow-red-500/10">
      <div className="flex-1 flex items-start gap-4">
        {/* Icono Warning */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <span className="text-lg">⚠️</span>
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1">
          <h3 className="font-bold text-red-400 mb-1 text-lg">
            Límite de Gastos Excedido
          </h3>
          <p className="text-sm text-[#A8B0BB] leading-relaxed">
            Tus gastos este mes <span className="font-semibold text-red-400">${totalExpense.toLocaleString('es-CL')}</span> superan tu límite de <span className="font-semibold text-[#F5F6F7]">${threshold.toLocaleString('es-CL')}</span>.
          </p>
          <div className="mt-2 p-3 rounded-lg bg-[#0D0F12]/50 border border-red-500/20">
            <p className="text-sm text-red-400">
              📈 Excedente: <span className="font-bold text-red-300">${exceedAmount}</span> ({percentage}% sobre el límite)
            </p>
          </div>
        </div>
      </div>

      {/* Botón Cerrar */}
      <button
        onClick={handleDismiss}
        className="ml-4 flex-shrink-0 p-2 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300"
        title="Cerrar alerta"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </button>
    </div>
  )
}
