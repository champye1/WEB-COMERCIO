import { useState, useMemo } from 'react'
import { useDashboard, getKPIs, getBarChartData, getPieChartData, getAreaChartData } from '@/hooks/useDashboard.jsx'
import { useCurrency } from '@/context/CurrencyContext'
import KPICard from '@/components/dashboard/KPICard_FinTech'
import RevenueBarChart from '@/components/dashboard/RevenueBarChart_FinTech'
import CategoryPieChart from '@/components/dashboard/CategoryPieChart_FinTech'
import BalanceAreaChart from '@/components/dashboard/BalanceAreaChart_FinTech'
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
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-[#A8B0BB]">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  // Leer umbral de gastos desde localStorage
  const expenseThreshold = localStorage.getItem('expenseThreshold')
    ? parseFloat(localStorage.getItem('expenseThreshold'))
    : null

  return (
    <div className="w-full space-y-8 md:space-y-10 pb-12">
      {/* Header Section */}
      <div className="w-full">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F6F7] mb-3 break-words leading-tight">
          📊 Panel Financiero
        </h1>
        <p className="text-sm md:text-base text-[#A8B0BB] max-w-3xl font-light">
          Analiza tus ingresos, gastos y balance en tiempo real
        </p>
      </div>

      {/* Alert Banner */}
      {expenseThreshold && (
        <div className="w-full">
          <AlertBanner totalExpense={kpis.totalExpense} threshold={expenseThreshold} />
        </div>
      )}

      {/* KPIs Section - 1x1 en móvil, 2x2 en tablet, 1x4 en desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        <KPICard
          title="Total Ingresos"
          value={convertAmount(kpis.totalIncome).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          prefix={currencySymbol}
          color="green"
          icon="📈"
        />
        <KPICard
          title="Total Gastos"
          value={convertAmount(kpis.totalExpense).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          prefix={currencySymbol}
          color="red"
          icon="📉"
        />
        <KPICard
          title="Balance"
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="h-[420px] flex flex-col rounded-xl border border-[#1C1F24] overflow-hidden">
          <RevenueBarChart data={barData} />
        </div>
        <div className="h-[420px] flex flex-col rounded-xl border border-[#1C1F24] overflow-hidden">
          <CategoryPieChart data={pieData} />
        </div>
      </div>

      {/* Area Chart Section */}
      <div className="h-[420px] flex flex-col rounded-xl border border-[#1C1F24] overflow-hidden">
        <BalanceAreaChart data={areaData} />
      </div>
    </div>
  )
}
