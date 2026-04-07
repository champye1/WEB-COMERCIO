import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function CategoryPieChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-center h-80">
        <p className="text-gray-500 dark:text-gray-400">Sin datos para mostrar</p>
      </div>
    )
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded shadow border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {data.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ${data.value.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {((data.value / data.payload.total) * 100).toFixed(1)}%
          </p>
        </div>
      )
    }
    return null
  }

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const dataWithTotal = data.map(item => ({ ...item, total }))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        🥧 Gastos por Categoría
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dataWithTotal}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
