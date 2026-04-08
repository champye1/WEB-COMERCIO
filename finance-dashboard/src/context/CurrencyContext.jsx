import { createContext, useState, useContext, useEffect } from 'react'

const CurrencyContext = createContext()

const CURRENCY_SYMBOLS = {
  CLP: '$',
  USD: '$',
  EUR: '€',
  ARS: '$',
  BRL: 'R$',
}

const CURRENCY_NAMES = {
  CLP: 'Peso Chileno',
  USD: 'Dólar Americano',
  EUR: 'Euro',
  ARS: 'Peso Argentino',
  BRL: 'Real Brasileño',
}

export function CurrencyProvider({ children }) {
  const [displayCurrency, setDisplayCurrency] = useState(() => {
    return localStorage.getItem('selectedCurrency') || 'CLP'
  })
  const [rates, setRates] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastFetched, setLastFetched] = useState(() => {
    const stored = localStorage.getItem('ratesTimestamp')
    return stored ? parseInt(stored) : 0
  })

  // Fetch rates from API (cache by 1 hour)
  useEffect(() => {
    const fetchRates = async () => {
      const now = Date.now()
      const cacheExpiry = 60 * 60 * 1000 // 1 hour

      // Si ya hay rates en cache y no han expirado, no volver a hacer request
      if (lastFetched && now - lastFetched < cacheExpiry && Object.keys(rates).length > 0) {
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetch('https://open.er-api.com/v6/latest/CLP')
        if (!response.ok) throw new Error('Error fetching exchange rates')

        const data = await response.json()

        if (data.rates) {
          setRates(data.rates)
          setLastFetched(now)
          localStorage.setItem('ratesData', JSON.stringify(data.rates))
          localStorage.setItem('ratesTimestamp', now.toString())
        }
      } catch (err) {
        setError(err.message)
        // Si hay error, intentar usar rates en cache (aunque estén expirados)
        const cachedRates = localStorage.getItem('ratesData')
        if (cachedRates) {
          setRates(JSON.parse(cachedRates))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [lastFetched, rates])

  const convertAmount = (amount) => {
    if (displayCurrency === 'CLP' || !rates.CLP) {
      return amount
    }

    // Convertir de CLP a la moneda seleccionada
    const rate = rates[displayCurrency]
    if (!rate) return amount

    return (amount / rate)
  }

  const formatCurrency = (amount) => {
    const symbol = CURRENCY_SYMBOLS[displayCurrency]
    const isEuro = displayCurrency === 'EUR'

    if (isEuro) {
      return `${amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${symbol}`
    } else {
      return `${symbol}${amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  }

  const changeCurrency = (newCurrency) => {
    setDisplayCurrency(newCurrency)
    localStorage.setItem('selectedCurrency', newCurrency)
  }

  return (
    <CurrencyContext.Provider
      value={{
        displayCurrency,
        rates,
        loading,
        error,
        convertAmount,
        formatCurrency,
        changeCurrency,
        currencySymbol: CURRENCY_SYMBOLS[displayCurrency],
        currencyName: CURRENCY_NAMES[displayCurrency],
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency debe ser usado dentro de CurrencyProvider')
  }
  return context
}
