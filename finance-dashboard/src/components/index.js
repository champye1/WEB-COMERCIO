/**
 * 📦 BARREL EXPORT - EXPORTAR TODOS LOS COMPONENTES FINTECH
 * Facilita imports desde una ubicación central
 *
 * Uso:
 * import { KPICard, Navbar, RevenueBarChart } from '@/components'
 */

// ============= LAYOUT COMPONENTS =============
export { default as Navbar } from './layout/Navbar_FinTech'
export { default as Sidebar } from './layout/Sidebar_FinTech'

// ============= DASHBOARD COMPONENTS =============
export { default as KPICard } from './dashboard/KPICard_FinTech'
export { default as RevenueBarChart } from './dashboard/RevenueBarChart_FinTech'
export { default as BalanceAreaChart } from './dashboard/BalanceAreaChart_FinTech'
export { default as CategoryPieChart } from './dashboard/CategoryPieChart_FinTech'

// ============= TRANSACTION COMPONENTS =============
export { default as TransactionTable } from './transactions/TransactionTable_FinTech'
export { default as TransactionForm } from './transactions/TransactionForm_FinTech'
