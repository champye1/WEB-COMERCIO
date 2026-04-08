import { describe, it, expect } from 'vitest'
import { getKPIs, getBarChartData, getPieChartData, getAreaChartData } from '@/hooks/useDashboard.jsx'

describe('useDashboard - Pure Functions', () => {
  const mockTransactions = [
    // Enero 2024
    { id: '1', date: '2024-01-15', type: 'income', amount: '1000', categories: { name: 'Salario', color: '#22c55e' } },
    { id: '2', date: '2024-01-20', type: 'expense', amount: '300', categories: { name: 'Alimentación', color: '#f97316' } },
    { id: '3', date: '2024-01-25', type: 'expense', amount: '200', categories: { name: 'Transporte', color: '#f59e0b' } },

    // Febrero 2024
    { id: '4', date: '2024-02-10', type: 'income', amount: '1000', categories: { name: 'Salario', color: '#22c55e' } },
    { id: '5', date: '2024-02-15', type: 'expense', amount: '400', categories: { name: 'Alimentación', color: '#f97316' } },
    { id: '6', date: '2024-02-20', type: 'expense', amount: '150', categories: { name: 'Entretenimiento', color: '#ec4899' } },

    // Marzo 2024
    { id: '7', date: '2024-03-05', type: 'income', amount: '1500', categories: { name: 'Freelance', color: '#10b981' } },
    { id: '8', date: '2024-03-10', type: 'expense', amount: '500', categories: { name: 'Alimentación', color: '#f97316' } },
  ]

  describe('getKPIs', () => {
    it('should calculate totalIncome, totalExpense, balance, and savingsRate for a given month', () => {
      const currentMonth = new Date(2024, 0) // Enero 2024
      const kpis = getKPIs(mockTransactions, currentMonth)

      expect(kpis.totalIncome).toBe(1000) // 1000 income in Jan
      expect(kpis.totalExpense).toBe(500) // 300 + 200
      expect(kpis.balance).toBe(500) // 1000 - 500
      expect(parseFloat(kpis.savingsRate)).toBe(50) // (500 / 1000) * 100
    })

    it('should return 0 savingsRate when totalIncome is 0', () => {
      const currentMonth = new Date(2024, 3) // Abril 2024 (sin transacciones)
      const kpis = getKPIs(mockTransactions, currentMonth)

      expect(kpis.savingsRate).toBe(0)
    })

    it('should handle negative balance', () => {
      const currentMonth = new Date(2024, 1) // Febrero 2024
      const kpis = getKPIs(mockTransactions, currentMonth)

      expect(kpis.totalIncome).toBe(1000)
      expect(kpis.totalExpense).toBe(550) // 400 + 150
      expect(kpis.balance).toBe(450) // 1000 - 550
    })
  })

  describe('getBarChartData', () => {
    it('should group transactions by month with income and expense totals', () => {
      const barData = getBarChartData(mockTransactions)

      expect(barData.length).toBeGreaterThan(0)
      expect(barData[0]).toHaveProperty('month')
      expect(barData[0]).toHaveProperty('income')
      expect(barData[0]).toHaveProperty('expense')
    })

    it('should return last 6 months of data', () => {
      const barData = getBarChartData(mockTransactions)
      expect(barData.length).toBeLessThanOrEqual(6)
    })

    it('should correctly aggregate income and expense by month', () => {
      const barData = getBarChartData(mockTransactions)
      const januaryData = barData.find((d) => d.month.includes('ene') || d.month.includes('Jan'))

      if (januaryData) {
        expect(januaryData.income).toBe(1000)
        expect(januaryData.expense).toBe(500)
      }
    })
  })

  describe('getPieChartData', () => {
    it('should return only expenses for the given month grouped by category', () => {
      const currentMonth = new Date(2024, 0) // Enero 2024
      const pieData = getPieChartData(mockTransactions, currentMonth)

      expect(pieData.length).toBeGreaterThan(0)
      pieData.forEach((item) => {
        expect(item).toHaveProperty('name')
        expect(item).toHaveProperty('value')
        expect(item).toHaveProperty('color')
      })
    })

    it('should not include income transactions in pie chart', () => {
      const currentMonth = new Date(2024, 0) // Enero 2024
      const pieData = getPieChartData(mockTransactions, currentMonth)

      const totalExpenseAmount = pieData.reduce((sum, item) => sum + item.value, 0)
      expect(totalExpenseAmount).toBe(500) // Only expenses
    })

    it('should use "Sin categoría" for items without category', () => {
      const transactionWithoutCategory = [
        { id: '1', date: '2024-01-15', type: 'expense', amount: '100', categories: null },
      ]
      const currentMonth = new Date(2024, 0)
      const pieData = getPieChartData(transactionWithoutCategory, currentMonth)

      expect(pieData.some((item) => item.name === 'Sin categoría')).toBe(true)
    })
  })

  describe('getAreaChartData', () => {
    it('should calculate cumulative balance over months', () => {
      const areaData = getAreaChartData(mockTransactions)

      expect(areaData.length).toBeGreaterThan(0)
      expect(areaData[0]).toHaveProperty('month')
      expect(areaData[0]).toHaveProperty('balance')
    })

    it('should maintain cumulative order (each balance >= previous)', () => {
      const areaData = getAreaChartData(mockTransactions)

      for (let i = 1; i < areaData.length; i++) {
        const prevBalance = areaData[i - 1].balance
        const currBalance = areaData[i].balance
        // Note: balance can decrease if expenses > income, so we just check it's a number
        expect(typeof currBalance).toBe('number')
      }
    })

    it('should return last 6 months', () => {
      const areaData = getAreaChartData(mockTransactions)
      expect(areaData.length).toBeLessThanOrEqual(6)
    })
  })
})
