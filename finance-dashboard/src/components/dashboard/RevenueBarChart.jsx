import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function RevenueBarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-center h-80">
        <p className="text-gray-500 dark:text-gray-400">Sin datos para mostrar</p>
      </div>
    )
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded shadow border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {payload[0].payload.month}
          </p>
          {payload.map((item, index) => (
            <p key={index} style={{ color: item.color }} className="text-sm">
              {item.name}: ${item.value.toFixed(2)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 hover:shadow-md transition-shadow">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Ingresos vs Gastos
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Comparativa mensual de ingresos y egresos</p>
      </div>
      <div style={{ width: '100%', height: '320px' }}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="income" fill="#10b981" name="Ingresos" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expense" fill="#f87171" name="Gastos" radius={[8, 8, 0, 0]} />
        </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
