/**
 * Connection service para verificar que Supabase esté disponible
 * Previene infinitos "loading" si hay problemas de conexión
 */

import { supabase } from './supabase'

let isConnected = true
let checkPromise = null
const TIMEOUT = 5000 // 5 segundos timeout

export const connectionService = {
  /**
   * Verificar conexión a Supabase
   */
  async checkConnection() {
    if (checkPromise) return checkPromise

    checkPromise = new Promise(async (resolve) => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

        // Hacer una query simple para verificar conexión
        const { error } = await Promise.race([
          supabase.auth.getSession(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Connection timeout')), TIMEOUT)
          ),
        ])

        clearTimeout(timeoutId)

        if (error) {
          console.warn('Connection check failed:', error.message)
          isConnected = false
          resolve(false)
        } else {
          isConnected = true
          resolve(true)
        }
      } catch (err) {
        console.warn('Connection error:', err.message)
        isConnected = false
        resolve(false)
      } finally {
        checkPromise = null
      }
    })

    return checkPromise
  },

  /**
   * Obtener estado de conexión
   */
  isOnline() {
    return isConnected && navigator.onLine
  },

  /**
   * Esperar a que la conexión esté lista
   */
  async waitForConnection(maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      const connected = await this.checkConnection()
      if (connected) return true

      // Esperar un poco antes de reintentar
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    return false
  },

  /**
   * Ejecutar una función solo si hay conexión
   */
  async withConnection(fn, fallback = null) {
    const connected = await this.checkConnection()

    if (!connected) {
      console.warn('No connection to Supabase')
      return fallback
    }

    try {
      return await fn()
    } catch (err) {
      console.error('Execution error:', err)
      isConnected = false
      throw err
    }
  },
}
