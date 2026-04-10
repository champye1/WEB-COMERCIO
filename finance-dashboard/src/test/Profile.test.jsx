import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Profile from '@/pages/Profile'

// Mock useAuth hook
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { email: 'test@example.com' },
    profile: { full_name: 'John Doe' },
    updateProfile: vi.fn().mockResolvedValue({ error: null }),
    updatePassword: vi.fn().mockResolvedValue({ error: null }),
  }),
}))

// Mock useCurrency hook
vi.mock('@/context/CurrencyContext', () => ({
  useCurrency: () => ({
    changeCurrency: vi.fn(),
  }),
}))

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

const renderProfile = () => {
  return render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  )
}

describe('Profile Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should render profile page with title', () => {
    renderProfile()
    expect(screen.getByText('Mi Perfil')).toBeInTheDocument()
  })

  it('should display email field', () => {
    renderProfile()
    const emailInput = screen.getByDisplayValue('test@example.com')
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toBeDisabled()
  })

  it('should display full name field with profile data', () => {
    renderProfile()
    const fullNameInput = screen.getByDisplayValue('John Doe')
    expect(fullNameInput).toBeInTheDocument()
  })

  it('should display currency select options', () => {
    renderProfile()
    const currencySelect = screen.getByDisplayValue('CLP - Peso Chileno')
    expect(currencySelect).toBeInTheDocument()
  })

  it('should have all three sections: Personal, Security, Preferences', () => {
    renderProfile()
    const headings = screen.getAllByRole('heading')
    const headingTexts = headings.map(h => h.textContent)
    expect(headingTexts.some(text => text.includes('Información Personal'))).toBeTruthy()
    expect(headingTexts.some(text => text.includes('Seguridad'))).toBeTruthy()
    expect(headingTexts.some(text => text.includes('Preferencias'))).toBeTruthy()
  })

  it('should display all section buttons', () => {
    renderProfile()
    expect(screen.getByText(/Guardar Cambios/i)).toBeInTheDocument()
    expect(screen.getByText(/Cambiar Contraseña/i)).toBeInTheDocument()
    expect(screen.getByText(/Guardar Preferencias/i)).toBeInTheDocument()
  })

  it('should have password inputs with placeholder text', () => {
    renderProfile()
    const passwordInputs = screen.getAllByPlaceholderText('Mínimo 6 caracteres')
    expect(passwordInputs.length).toBeGreaterThan(0)
  })

  it('should display threshold input with dollar sign', () => {
    renderProfile()
    const thresholdInput = screen.getByPlaceholderText('Ej: 500000')
    expect(thresholdInput).toBeInTheDocument()
  })

  it('should display help text for threshold field', () => {
    renderProfile()
    expect(screen.getByText(/Recibirás una alerta en el Dashboard/i)).toBeInTheDocument()
  })

  it('should have correct currency options available', () => {
    renderProfile()
    expect(screen.getByText('CLP - Peso Chileno')).toBeInTheDocument()
    expect(screen.getByText('USD - Dólar Americano')).toBeInTheDocument()
    expect(screen.getByText('EUR - Euro')).toBeInTheDocument()
    expect(screen.getByText('ARS - Peso Argentino')).toBeInTheDocument()
    expect(screen.getByText('BRL - Real Brasileño')).toBeInTheDocument()
  })

  it('should render fintech dark pro styling classes', () => {
    const { container } = renderProfile()
    const gradientElements = container.querySelectorAll('[class*="bg-gradient-to-br"]')
    expect(gradientElements.length).toBeGreaterThan(0)
  })

  it('should display help text for password minimum length requirement', () => {
    renderProfile()
    const placeholders = screen.getAllByPlaceholderText('Mínimo 6 caracteres')
    expect(placeholders.length).toBeGreaterThan(0)
  })
})
