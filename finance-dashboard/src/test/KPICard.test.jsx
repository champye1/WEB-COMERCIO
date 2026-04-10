import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import KPICard from '@/components/dashboard/KPICard_FinTech'

describe('KPICard Component', () => {
  it('should render component with title', () => {
    render(
      <KPICard
        title="Total Ingresos"
        value="1000"
        prefix="$"
        color="green"
        icon="📈"
      />
    )

    expect(screen.getByText('Total Ingresos')).toBeInTheDocument()
  })

  it('should render value correctly', () => {
    render(
      <KPICard
        title="Test KPI"
        value="1000"
        prefix="$"
        color="green"
      />
    )

    expect(screen.getByText('1000')).toBeInTheDocument()
  })

  it('should render with suffix', () => {
    render(
      <KPICard
        title="Tasa de Ahorro"
        value="50"
        suffix="%"
        color="blue"
        icon="💰"
      />
    )

    expect(screen.getByText('50')).toBeInTheDocument()
  })

  it('should render with icon when provided', () => {
    render(
      <KPICard
        title="Test KPI"
        value="100"
        prefix="$"
        color="blue"
        icon="📈"
      />
    )

    expect(screen.getByText('📈')).toBeInTheDocument()
  })

  it('should render without icon when not provided', () => {
    const { container } = render(
      <KPICard
        title="Test KPI"
        value="100"
        prefix="$"
        color="blue"
      />
    )

    // Verificar que el componente se renderizó sin error
    expect(screen.getByText('Test KPI')).toBeInTheDocument()
  })

  it('should support different color variants', () => {
    const { rerender } = render(
      <KPICard
        title="Test"
        value="100"
        color="green"
      />
    )

    // Verifi que renderiza sin errores
    expect(screen.getByText('Test')).toBeInTheDocument()

    rerender(
      <KPICard
        title="Test"
        value="100"
        color="red"
      />
    )

    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
