import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AlertBanner from '@/components/notifications/AlertBanner'

describe('AlertBanner Component', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('should not render when threshold is null', () => {
    const { container } = render(
      <AlertBanner totalExpense={1000} threshold={null} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('should not render when totalExpense is less than or equal to threshold', () => {
    const { container } = render(
      <AlertBanner totalExpense={500} threshold={1000} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('should render alert when totalExpense exceeds threshold', () => {
    render(<AlertBanner totalExpense={1500} threshold={1000} />)
    expect(screen.getByText(/Límite de Gastos Excedido/i)).toBeInTheDocument()
  })

  it('should calculate and display correct exceeding amount', () => {
    render(<AlertBanner totalExpense={1500} threshold={1000} />)
    // Buscar por el excedente exacto: $500.00
    expect(screen.getByText(/500\.00/)).toBeInTheDocument()
  })

  it('should calculate and display correct percentage', () => {
    render(<AlertBanner totalExpense={1500} threshold={1000} />)
    expect(screen.getByText(/150%/)).toBeInTheDocument()
  })

  it('should render close button', () => {
    render(<AlertBanner totalExpense={1500} threshold={1000} />)
    const closeButton = screen.getByTitle('Cerrar alerta')
    expect(closeButton).toBeInTheDocument()
  })

  it('should save dismiss state to sessionStorage', async () => {
    const user = userEvent.setup()
    render(<AlertBanner totalExpense={1500} threshold={1000} />)

    const closeButton = screen.getByTitle('Cerrar alerta')
    await user.click(closeButton)

    expect(sessionStorage.getItem('alertDismissed')).toBe('true')
  })
})
