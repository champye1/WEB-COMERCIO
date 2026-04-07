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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        📊 Ingresos vs Gastos
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="income" fill="#22c55e" name="Ingresos" />
          <Bar dataKey="expense" fill="#ef4444" name="Gastos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
