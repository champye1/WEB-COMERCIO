import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import KPICard from '@/components/dashboard/KPICard'

describe('KPICard Component', () => {
  it('should render with title, value, prefix, and suffix', () => {
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
    expect(screen.getByText(/\$1000/)).toBeInTheDocument()
    expect(screen.getByText('📈')).toBeInTheDocument()
  })

  it('should render with suffix instead of prefix', () => {
    render(
      <KPICard
        title="Tasa de Ahorro"
        value="50"
        suffix="%"
        color="blue"
        icon="💰"
      />
    )

    expect(screen.getByText(/50%/)).toBeInTheDocument()
  })

  it('should apply correct color class based on color prop', () => {
    const { container } = render(
      <KPICard
        title="Test KPI"
        value="100"
        prefix="$"
        color="red"
      />
    )

    const cardDiv = container.querySelector('div')
    expect(cardDiv?.className).toContain('bg-red-50')
  })

  it('should render without icon when icon prop is not provided', () => {
    const { container } = render(
      <KPICard
        title="Test KPI"
        value="100"
        prefix="$"
        color="blue"
      />
    )

    const icons = container.querySelectorAll('[role="img"]')
    expect(icons.length).toBe(0)
  })

  it('should handle multiple color variants', () => {
    const colors = ['green', 'red', 'blue', 'purple']

    colors.forEach((color) => {
      const { container, unmount } = render(
        <KPICard
          title={`KPI ${color}`}
          value="100"
          prefix="$"
          color={color}
        />
      )

      const cardDiv = container.querySelector('div')
      expect(cardDiv?.className).toContain(`bg-${color}-50`)
      unmount()
    })
  })

  it('should format large numbers correctly', () => {
    render(
      <KPICard
        title="Large Amount"
        value="1000000"
        prefix="$"
        color="green"
      />
    )

    expect(screen.getByText(/\$1000000/)).toBeInTheDocument()
  })
})
