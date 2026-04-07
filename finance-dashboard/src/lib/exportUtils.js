import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx'

const formatDate = (date) => new Date(date).toLocaleDateString('es-ES')
const formatMoney = (amount) => `$${parseFloat(amount).toLocaleString('es-ES', { minimumFractionDigits: 2 })}`

export function exportTransactionsToPDF(transactions) {
  const doc = new jsPDF()

  // Header
  doc.setFontSize(16)
  doc.text('Reporte de Transacciones', 14, 15)

  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text(
    `Generado: ${new Date().toLocaleDateString('es-ES')}`,
    14,
    22
  )

  // Resumen de transacciones
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)

  const balance = totalIncome - totalExpense

  doc.setTextColor(0)
  doc.setFontSize(11)
  doc.text('Resumen:', 14, 32)

  doc.setFillColor(240, 240, 240)
  doc.rect(14, 36, 65, 20, 'F')
  doc.text(`Total Ingresos: ${formatMoney(totalIncome)}`, 16, 41)
  doc.text(`Total Gastos: ${formatMoney(totalExpense)}`, 16, 49)

  doc.setFillColor(200, 230, 201)
  doc.rect(85, 36, 110, 20, 'F')
  doc.setTextColor(27, 94, 32)
  doc.setFont(undefined, 'bold')
  doc.text(`Balance: ${formatMoney(balance)}`, 90, 45)
  doc.setTextColor(0)
  doc.setFont(undefined, 'normal')

  // Tabla de transacciones
  const tableData = transactions.map((t) => [
    formatDate(t.date),
    t.description || '-',
    t.categoryName || '-',
    t.type === 'income' ? 'Ingreso' : 'Gasto',
    formatMoney(t.amount),
  ])

  doc.autoTable({
    head: [['Fecha', 'Descripción', 'Categoría', 'Tipo', 'Monto']],
    body: tableData,
    startY: 60,
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [63, 81, 181],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      4: { halign: 'right' }, // Alinear monto a la derecha
    },
  })

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(150)
  doc.text(
    `Página 1 de 1`,
    doc.internal.pageSize.getWidth() / 2,
    doc.internal.pageSize.getHeight() - 10,
    { align: 'center' }
  )

  doc.save(`transacciones-${new Date().toISOString().slice(0, 7)}.pdf`)
}

export function exportTransactionsToExcel(transactions) {
  // Hoja 1: Transacciones detalladas
  const txData = transactions.map((t) => ({
    'Fecha': formatDate(t.date),
    'Descripción': t.description || '-',
    'Categoría': t.categoryName || '-',
    'Tipo': t.type === 'income' ? 'Ingreso' : 'Gasto',
    'Monto': parseFloat(t.amount),
  }))

  const txSheet = XLSX.utils.json_to_sheet(txData)

  // Establecer anchos de columna
  txSheet['!cols'] = [
    { wch: 12 }, // Fecha
    { wch: 30 }, // Descripción
    { wch: 18 }, // Categoría
    { wch: 12 }, // Tipo
    { wch: 12 }, // Monto
  ]

  // Hoja 2: Resumen por categoría
  const categoryMap = {}
  transactions.forEach((t) => {
    const cat = t.categoryName || 'Sin categoría'
    if (!categoryMap[cat]) {
      categoryMap[cat] = { Categoría: cat, Ingresos: 0, Gastos: 0, Total: 0 }
    }
    const amount = parseFloat(t.amount)
    if (t.type === 'income') {
      categoryMap[cat].Ingresos += amount
    } else {
      categoryMap[cat].Gastos += amount
    }
    categoryMap[cat].Total += t.type === 'income' ? amount : -amount
  })

  const summaryData = Object.values(categoryMap)

  const summarySheet = XLSX.utils.json_to_sheet(summaryData)
  summarySheet['!cols'] = [
    { wch: 18 },
    { wch: 12 },
    { wch: 12 },
    { wch: 12 },
  ]

  // Hoja 3: Resumen mensual
  const monthlyMap = {}
  transactions.forEach((t) => {
    const date = new Date(t.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    if (!monthlyMap[monthKey]) {
      monthlyMap[monthKey] = {
        'Mes': monthKey,
        'Ingresos': 0,
        'Gastos': 0,
        'Balance': 0,
      }
    }
    const amount = parseFloat(t.amount)
    if (t.type === 'income') {
      monthlyMap[monthKey].Ingresos += amount
    } else {
      monthlyMap[monthKey].Gastos += amount
    }
    monthlyMap[monthKey].Balance = monthlyMap[monthKey].Ingresos - monthlyMap[monthKey].Gastos
  })

  const monthlyData = Object.values(monthlyMap).sort((a, b) => a['Mes'].localeCompare(b['Mes']))

  const monthlySheet = XLSX.utils.json_to_sheet(monthlyData)
  monthlySheet['!cols'] = [
    { wch: 15 },
    { wch: 12 },
    { wch: 12 },
    { wch: 12 },
  ]

  // Crear workbook con múltiples hojas
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, txSheet, 'Transacciones')
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Por Categoría')
  XLSX.utils.book_append_sheet(workbook, monthlySheet, 'Por Mes')

  XLSX.writeFile(
    workbook,
    `finanzas-${new Date().toISOString().slice(0, 7)}.xlsx`
  )
}
