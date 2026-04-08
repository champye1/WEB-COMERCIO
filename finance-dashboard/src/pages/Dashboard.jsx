import { useState, useMemo } from 'react'
import { useDashboard, getKPIs, getBarChartData, getPieChartData, getAreaChartData } from '@/hooks/useDashboard.jsx'
import { useCurrency } from '@/context/CurrencyContext'
import KPICard from '@/components/dashboard/KPICard'
import RevenueBarChart from '@/components/dashboard/RevenueBarChart'
import CategoryPieChart from '@/components/dashboard/CategoryPieChart'
import BalanceAreaChart from '@/components/dashboard/BalanceAreaChart'
import AlertBanner from '@/components/notifications/AlertBanner'

export default function DashboardPage() {
  const { transactions, loading } = useDashboard()
  const { convertAmount, currencySymbol } = useCurrency()
  const [currentMonth] = useState(new Date())

  // Memoizar cálculos de datos (ANTES de cualquier return)
  const kpis = useMemo(() => getKPIs(transactions, currentMonth), [transactions, currentMonth])
  const barData = useMemo(() => getBarChartData(transactions), [transactions])
  const pieData = useMemo(() => getPieChartData(transactions, currentMonth), [transactions, currentMonth])
  const areaData = useMemo(() => getAreaChartData(transactions), [transactions])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  // Leer umbral de gastos desde localStorage
  const expenseThreshold = localStorage.getItem('expenseThreshold')
    ? parseFloat(localStorage.getItem('expenseThreshold'))
    : null

  return (
    <div>
      <div className="mb-12">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Panel Financiero
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Analiza tus ingresos, gastos y balance. Toma decisiones financieras inteligentes basadas en datos actualizados.
            </p>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <AlertBanner totalExpense={kpis.totalExpense} threshold={expenseThreshold} />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <KPICard
          title="Total Ingresos (Este Mes)"
          value={convertAmount(kpis.totalIncome).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          prefix={currencySymbol}
          color="green"
          icon="📈"
        />
        <KPICard
          title="Total Gastos (Este Mes)"
          value={convertAmount(kpis.totalExpense).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          prefix={currencySymbol}
          color="red"
          icon="📉"
        />
        <KPICard
          title="Balance (Este Mes)"
          value={convertAmount(kpis.balance).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          prefix={currencySymbol}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <RevenueBarChart data={barData} />
        <CategoryPieChart data={pieData} />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <BalanceAreaChart data={areaData} />
      </div>
    </div>
  )
}
