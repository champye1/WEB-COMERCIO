/**
 * Cache service para gestionar datos en localStorage
 * Previene múltiples llamadas a Supabase innecesarias
 */

const CACHE_PREFIX = 'findash_'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

export const cacheService = {
  /**
   * Obtener datos del cache
   */
  get: (key) => {
    try {
      const cached = localStorage.getItem(`${CACHE_PREFIX}${key}`)
      if (!cached) return null

      const { data, timestamp } = JSON.parse(cached)
      const now = Date.now()

      // Verificar si el cache expiró
      if (now - timestamp > CACHE_DURATION) {
        localStorage.removeItem(`${CACHE_PREFIX}${key}`)
        return null
      }

      return data
    } catch (err) {
      console.error('Cache get error:', err)
      return null
    }
  },

  /**
   * Guardar datos en cache
   */
  set: (key, data) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      }
      localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheData))
    } catch (err) {
      console.error('Cache set error:', err)
    }
  },

  /**
   * Limpiar un cache específico
   */
  remove: (key) => {
    try {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`)
    } catch (err) {
      console.error('Cache remove error:', err)
    }
  },

  /**
   * Limpiar todos los caches
   */
  clear: () => {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key)
        }
      })
    } catch (err) {
      console.error('Cache clear error:', err)
    }
  },

  /**
   * Ejecutar una función con caché automático
   */
  async memoize(key, fn, options = {}) {
    const cached = this.get(key)
    if (cached) {
      return cached
    }

    try {
      const data = await fn()
      this.set(key, data)
      return data
    } catch (err) {
      console.error(`Memoize error for ${key}:`, err)
      throw err
    }
  },
}
