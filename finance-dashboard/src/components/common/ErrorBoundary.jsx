import { useState, useEffect } from 'react'

export default function ErrorBoundary({ error, onRetry }) {
  const [visible, setVisible] = useState(!!error)

  useEffect(() => {
    setVisible(!!error)
  }, [error])

  if (!visible || !error) return null

  return (
    <div className="fixed top-4 right-4 max-w-sm z-50">
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 shadow-lg">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-600 dark:text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">
              Error de Conexión
            </h3>
            <p className="text-sm text-red-700 dark:text-red-200 mb-3">
              {error || 'No pudimos conectar. Verifica tu conexión a internet.'}
            </p>
            <div className="flex gap-2">
              {onRetry && (
                <button
                  onClick={() => {
                    onRetry()
                    setVisible(false)
                  }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded font-medium transition"
                >
                  Reintentar
                </button>
              )}
              <button
                onClick={() => setVisible(false)}
                className="px-3 py-1.5 bg-red-200 hover:bg-red-300 dark:bg-red-800 dark:hover:bg-red-700 text-red-800 dark:text-red-200 text-sm rounded font-medium transition"
              >
                Descartar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
