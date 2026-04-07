import { useState } from 'react'
import { useDashboard, getKPIs, getBarChartData, getPieChartData, getAreaChartData } from '@/hooks/useDashboard.jsx'
import KPICard from '@/components/dashboard/KPICard'
import RevenueBarChart from '@/components/dashboard/RevenueBarChart'
import CategoryPieChart from '@/components/dashboard/CategoryPieChart'
import BalanceAreaChart from '@/components/dashboard/BalanceAreaChart'

export default function DashboardPage() {
  const { transactions, loading } = useDashboard()
  const [currentMonth] = useState(new Date())

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  // Calcular datos
  const kpis = getKPIs(transactions, currentMonth)
  const barData = getBarChartData(transactions)
  const pieData = getPieChartData(transactions, currentMonth)
  const areaData = getAreaChartData(transactions)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          📊 Dashboard Financiero
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Resumen de tus finanzas personales
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Ingresos (Este Mes)"
          value={kpis.totalIncome.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          prefix="$"
          color="green"
          icon="📈"
        />
        <KPICard
          title="Total Gastos (Este Mes)"
          value={kpis.totalExpense.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          prefix="$"
          color="red"
          icon="📉"
        />
        <KPICard
          title="Balance (Este Mes)"
          value={kpis.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          prefix="$"
          color={kpis.balance >= 0 ? 'green' : 'red'}
          icon="⚖️"
        />
        <KPICard
          title="Tasa de Ahorro"
          value={kpis.savingsRate}
          suffix="%"
          color="blue"
          icon="💰"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueBarChart data={barData} />
        <CategoryPieChart data={pieData} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <BalanceAreaChart data={areaData} />
      </div>
    </div>
  )
}
