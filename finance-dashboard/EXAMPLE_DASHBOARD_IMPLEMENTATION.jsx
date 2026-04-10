/**
 * 📊 EJEMPLO COMPLETO DE IMPLEMENTACIÓN DEL DASHBOARD
 * Fintech Dark Pro UI - Ready to Production
 *
 * Este archivo muestra cómo integrar todos los componentes FinTech
 * en una página completa funcional.
 */

import { useState, useMemo } from 'react'
import Navbar from '@/components/layout/Navbar_FinTech'
import Sidebar from '@/components/layout/Sidebar_FinTech'
import KPICard from '@/components/dashboard/KPICard_FinTech'
import RevenueBarChart from '@/components/dashboard/RevenueBarChart_FinTech'
import BalanceAreaChart from '@/components/dashboard/BalanceAreaChart_FinTech'
import CategoryPieChart from '@/components/dashboard/CategoryPieChart_FinTech'
import TransactionTable from '@/components/transactions/TransactionTable_FinTech'
import TransactionForm from '@/components/transactions/TransactionForm_FinTech'

export default function DashboardExample() {
  // ============= ESTADO SIMULADO =============
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      date: '2024-04-08',
      description: 'Salario mensual',
      type: 'income',
      category: 'Salario',
      amount: 3500,
    },
    {
      id: '2',
      date: '2024-04-07',
      description: 'Supermercado Jumbo',
      type: 'expense',
      category: 'Alimentación',
      amount: 125.50,
    },
    {
      id: '3',
      date: '2024-04-06',
      description: 'Metro - Pase mensual',
      type: 'expense',
      category: 'Transporte',
      amount: 45.00,
    },
    {
      id: '4',
      date: '2024-04-05',
      description: 'Netflix',
      type: 'expense',
      category: 'Suscripciones',
      amount: 12.99,
    },
    {
      id: '5',
      date: '2024-04-04',
      description: 'Freelance - Diseño web',
      type: 'income',
      category: 'Freelance',
      amount: 500,
    },
    {
      id: '6',
      date: '2024-04-03',
      description: 'Cine',
      type: 'expense',
      category: 'Entretenimiento',
      amount: 15.00,
    },
    {
      id: '7',
      date: '2024-04-02',
      description: 'Farmacia - Medicinas',
      type: 'expense',
      category: 'Salud',
      amount: 35.75,
    },
  ])

  const [showForm, setShowForm] = useState(false)

  // ============= CÁLCULOS MEMOIZADOS =============
  const kpis = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    const balance = totalIncome - totalExpense
    const savingsRate =
      totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0

    return {
      totalIncome: parseFloat(totalIncome.toFixed(2)),
      totalExpense: parseFloat(totalExpense.toFixed(2)),
      balance: parseFloat(balance.toFixed(2)),
      savingsRate: parseFloat(savingsRate),
    }
  }, [transactions])

  // Datos para Bar Chart (últimos 6 meses)
  const barChartData = useMemo(() => {
    const monthlyData = {}

    transactions.forEach((t) => {
      const date = new Date(t.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const monthLabel = date.toLocaleDateString('es-ES', {
        month: 'short',
        year: '2-digit',
      })

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthLabel, income: 0, expense: 0 }
      }

      if (t.type === 'income') {
        monthlyData[monthKey].income += t.amount
      } else {
        monthlyData[monthKey].expense += t.amount
      }
    })

    return Object.values(monthlyData).slice(-6)
  }, [transactions])

  // Datos para Pie Chart
  const pieChartData = useMemo(() => {
    const categoryData = {}
    const colors = {
      'Alimentación': '#E74C3C',
      'Transporte': '#3498DB',
      'Entretenimiento': '#9B59B6',
      'Salud': '#E67E22',
      'Suscripciones': '#1ABC9C',
      'Otros': '#95A5A6',
    }

    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const categoryName = t.category
        if (!categoryData[categoryName]) {
          categoryData[categoryName] = {
            name: categoryName,
            value: 0,
            color: colors[categoryName] || '#A8B0BB',
          }
        }
        categoryData[categoryName].value += t.amount
      })

    return Object.values(categoryData)
  }, [transactions])

  // Datos para Area Chart (balance acumulativo)
  const areaChartData = useMemo(() => {
    const monthlyBalance = {}

    transactions.forEach((t) => {
      const date = new Date(t.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const monthLabel = date.toLocaleDateString('es-ES', {
        month: 'short',
        year: '2-digit',
      })

      if (!monthlyBalance[monthKey]) {
        monthlyBalance[monthKey] = { month: monthLabel, balance: 0 }
      }

      if (t.type === 'income') {
        monthlyBalance[monthKey].balance += t.amount
      } else {
        monthlyBalance[monthKey].balance -= t.amount
      }
    })

    // Calcular acumulativo
    let accumulated = 0
    return Object.values(monthlyBalance)
      .slice(-6)
      .map((item) => ({
        ...item,
        balance: parseFloat((accumulated + item.balance).toFixed(2)),
      }))
      .map((item) => {
        accumulated = item.balance
        return item
      })
  }, [transactions])

  // ============= HANDLERS =============
  const handleAddTransaction = async (formData) => {
    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newTransaction = {
      id: Date.now().toString(),
      ...formData,
      amount: parseFloat(formData.amount),
    }

    setTransactions((prev) => [newTransaction, ...prev])
    setShowForm(false)

    // Toast de éxito (opcional)
    console.log('✅ Transacción guardada:', newTransaction)
  }

  const handleEditTransaction = (transaction) => {
    console.log('Editar transacción:', transaction)
    // Implementar lógica de edición
  }

  const handleDeleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
    console.log('❌ Transacción eliminada:', id)
  }

  // ============= RENDER =============
  return (
    <div className="min-h-screen bg-[#0D0F12]">
      {/* Navbar */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 space-y-8">
          {/* Header Section */}
          <div className="max-w-7xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-5xl font-bold text-[#F5F6F7] mb-3">
                  Panel Financiero
                </h1>
                <p className="text-lg text-[#A8B0BB] max-w-2xl">
                  Controla tus ingresos, gastos y balance. Toma decisiones
                  financieras inteligentes basadas en datos en tiempo real.
                </p>
              </div>

              {/* Quick Action Button */}
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-emerald-400 to-green-500 text-[#0D0F12] hover:shadow-lg hover:shadow-emerald-400/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span>➕</span> Nueva Transacción
              </button>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <KPICard
                title="Total Ingresos"
                value={kpis.totalIncome.toLocaleString('es-ES', {
                  minimumFractionDigits: 2,
                })}
                change={8.5}
                isPositive={true}
                icon="📈"
                color="green"
                prefix="$"
              />
              <KPICard
                title="Total Gastos"
                value={kpis.totalExpense.toLocaleString('es-ES', {
                  minimumFractionDigits: 2,
                })}
                change={3.2}
                isPositive={false}
                icon="📉"
                color="red"
                prefix="$"
              />
              <KPICard
                title="Balance"
                value={kpis.balance.toLocaleString('es-ES', {
                  minimumFractionDigits: 2,
                })}
                change={5.1}
                isPositive={kpis.balance >= 0}
                icon="⚖️"
                color={kpis.balance >= 0 ? 'green' : 'red'}
                prefix="$"
              />
              <KPICard
                title="Tasa de Ahorro"
                value={kpis.savingsRate}
                icon="💰"
                color="blue"
                suffix="%"
              />
            </div>

            {/* Form Section (Condicional) */}
            {showForm && (
              <div className="mb-12 animate-fadeIn">
                <TransactionForm onSubmit={handleAddTransaction} />
              </div>
            )}

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <RevenueBarChart data={barChartData} />
              <CategoryPieChart data={pieChartData} />
            </div>

            {/* Balance Area Chart */}
            <BalanceAreaChart data={areaChartData} />

            {/* Transactions Table */}
            <div className="mt-12">
              <TransactionTable
                transactions={transactions}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

/**
 * ============= NOTAS DE IMPLEMENTACIÓN =============
 *
 * 1. DATOS REALES:
 *    - Reemplazar estado local con llamadas a API
 *    - Usar useEffect para fetch inicial
 *    - Implementar error handling
 *
 * 2. AUTENTICACIÓN:
 *    - Proteger rutas con ProtectedRoute
 *    - Usar useAuth hook para verificar sesión
 *
 * 3. PERSISTENCIA:
 *    - Guardar transacciones en base de datos
 *    - Usar Supabase, Firebase, o tu API backend
 *
 * 4. OPTIMIZACIÓN:
 *    - Paginar tabla de transacciones (100+ items)
 *    - Agregar virtualization para scroll
 *    - Lazy load charts si hay mucho volumen
 *
 * 5. CARACTERÍSTICAS FUTURAS:
 *    - Dark mode toggle real
 *    - Multi-moneda
 *    - Exportar a PDF/Excel
 *    - Notificaciones
 *    - Budget tracking avanzado
 *
 * ============================================================
 */
