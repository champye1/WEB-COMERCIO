/**
 * 🎨 FINTECH DARK PRO - TEMA GLOBAL
 * Define colores, tipografía y efectos para toda la aplicación
 * Basado en: Revolut, Binance, Robinhood
 */

export const FINTECH_THEME = {
  // ============= COLORES =============
  colors: {
    // Fondos
    bg: {
      primary: '#0D0F12', // Fondo principal más oscuro
      secondary: '#111418', // Cards y contenedores
      tertiary: '#161A1E', // Fondos secundarios
      hover: '#1C1F24', // Hover state
      hover_light: '#2C3139', // Hover state más claro
    },

    // Textos
    text: {
      primary: '#F5F6F7', // Texto principal
      secondary: '#A8B0BB', // Texto secundario
      muted: '#7A8190', // Texto más oscuro
    },

    // Acentos principales
    accent: {
      green: '#2ECC71', // Positivo, ingresos
      emerald: '#10B981', // Alternativo verde
      blue: '#3498DB', // Neutral, transacciones
      red: '#E74C3C', // Negativo, gastos
      orange: '#E67E22', // Warning
      purple: '#9B59B6', // Primario alternativo
      turquoise: '#1ABC9C', // Secundario
    },

    // Bordes
    border: {
      default: '#1C1F24',
      hover: '#2C3139',
      active: '#2ECC71',
      error: '#E74C3C',
    },

    // Estados
    state: {
      success: '#2ECC71',
      warning: '#F39C12',
      error: '#E74C3C',
      info: '#3498DB',
    },
  },

  // ============= TIPOGRAFÍA =============
  typography: {
    fontFamily: {
      primary: "'Inter', 'Segoe UI', sans-serif",
      mono: "'Fira Code', 'Courier New', monospace",
    },
    sizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
    },
    weights: {
      light: 300,
      normal: 400,
      semibold: 600,
      bold: 700,
    },
  },

  // ============= ESPACIADO =============
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  },

  // ============= BORDES Y RADIOS =============
  borders: {
    radius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '9999px',
    },
    width: {
      default: '1px',
      thick: '2px',
    },
  },

  // ============= SOMBRAS =============
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.15)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.2)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.3)',
    '2xl': '0 20px 40px rgba(0, 0, 0, 0.4)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    glow_green: '0 0 20px rgba(46, 204, 113, 0.3)',
    glow_blue: '0 0 20px rgba(52, 152, 219, 0.3)',
  },

  // ============= EFECTOS Y TRANSICIONES =============
  effects: {
    transition: {
      fast: '150ms ease-in-out',
      base: '300ms ease-in-out',
      slow: '500ms ease-in-out',
    },
    blur: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    opacity: {
      disabled: 0.5,
      hover: 0.8,
      subtle: 0.1,
      strong: 0.3,
    },
  },

  // ============= GRADIENTES =============
  gradients: {
    primary: 'linear-gradient(135deg, #2ECC71 0%, #10B981 100%)',
    secondary: 'linear-gradient(135deg, #3498DB 0%, #2980B9 100%)',
    danger: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)',
    warm: 'linear-gradient(135deg, #E67E22 0%, #D35400 100%)',
    dark: 'linear-gradient(to bottom, #111418, #0D0F12)',
    glass: 'rgba(17, 20, 24, 0.8)',
  },

  // ============= CLASES TAILWIND COMUNES =============
  classes: {
    // Cards base
    card: 'bg-gradient-to-br from-[#111418] to-[#0D0F12] rounded-xl border border-[#1C1F24] p-6 hover:border-[#2C3139] transition-all duration-300 hover:shadow-xl hover:shadow-black/50',

    // Inputs base
    input:
      'px-4 py-3 rounded-lg bg-[#0D0F12] border border-[#1C1F24] text-[#F5F6F7] placeholder-[#A8B0BB] focus:border-emerald-500 focus:outline-none transition-all',

    // Botón primario
    buttonPrimary:
      'px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-emerald-400 to-green-500 text-[#0D0F12] hover:shadow-lg hover:shadow-emerald-400/50 hover:scale-105 transition-all duration-300',

    // Botón secundario
    buttonSecondary:
      'px-6 py-3 rounded-lg font-bold text-[#F5F6F7] border border-[#1C1F24] hover:border-[#2C3139] hover:bg-[#1C1F24] transition-all duration-300',

    // Badge success
    badgeSuccess: 'px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40',

    // Badge error
    badgeError: 'px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/40',

    // Badge info
    badgeInfo: 'px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/40',

    // Heading grande
    headingLarge: 'text-5xl font-bold text-[#F5F6F7]',

    // Heading mediano
    headingMedium: 'text-2xl font-bold text-[#F5F6F7]',

    // Heading pequeño
    headingSmall: 'text-lg font-bold text-[#F5F6F7]',

    // Texto secundario
    textSecondary: 'text-sm text-[#A8B0BB]',
  },
}

/**
 * ============= USO EN COMPONENTES =============
 *
 * // Importar en tu componente
 * import { FINTECH_THEME } from '@/constants/fintech-theme'
 *
 * // Acceder a colores
 * const bgColor = FINTECH_THEME.colors.bg.primary
 *
 * // Usar gradientes
 * <div style={{ background: FINTECH_THEME.gradients.primary }}>
 *
 * // Usar clases predefinidas
 * <div className={FINTECH_THEME.classes.card}>
 *
 * // En Tailwind (tailwind.config.js)
 * export default {
 *   theme: {
 *     extend: {
 *       colors: {
 *         fintech: {
 *           bg: {
 *             primary: FINTECH_THEME.colors.bg.primary,
 *             secondary: FINTECH_THEME.colors.bg.secondary,
 *           },
 *           text: FINTECH_THEME.colors.text,
 *           accent: FINTECH_THEME.colors.accent,
 *         },
 *       },
 *     },
 *   },
 * }
 */

// ============= PALETA DE CATEGORÍAS =============
export const CATEGORY_COLORS = {
  'Alimentación': '#E74C3C',
  'Transporte': '#3498DB',
  'Entretenimiento': '#9B59B6',
  'Salud': '#E67E22',
  'Suscripciones': '#1ABC9C',
  'Educación': '#16A085',
  'Hogar': '#D35400',
  'Moda': '#8E44AD',
  'Viajes': '#27AE60',
  'Otros': '#95A5A6',
  'Salario': '#2ECC71',
  'Freelance': '#3498DB',
  'Inversiones': '#F39C12',
}

// ============= ICONOS EMOJI =============
export const CATEGORY_ICONS = {
  'Alimentación': '🍔',
  'Transporte': '🚗',
  'Entretenimiento': '🎬',
  'Salud': '⚕️',
  'Suscripciones': '📱',
  'Educación': '📚',
  'Hogar': '🏠',
  'Moda': '👕',
  'Viajes': '✈️',
  'Otros': '📦',
  'Salario': '💼',
  'Freelance': '💻',
  'Inversiones': '📈',
}

// ============= MENSAJES Y TEXTOS =============
export const MESSAGES = {
  success: 'Operación realizada con éxito',
  error: 'Hubo un error. Intenta nuevamente',
  loading: 'Cargando...',
  noData: 'Sin datos disponibles',
  deleteConfirm: '¿Estás seguro de que deseas eliminar esto?',
}

// ============= VALIDACIONES =============
export const VALIDATIONS = {
  minAmount: 0.01,
  maxAmount: 999999999.99,
  descriptionMinLength: 3,
  descriptionMaxLength: 255,
}
