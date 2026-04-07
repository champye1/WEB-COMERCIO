import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function BalanceAreaChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center justify-center h-80">
        <p className="text-gray-500 dark:text-gray-400">Sin datos para mostrar</p>
      </div>
    )
  }

  const isPositiveTrend = data.length > 1 && data[data.length - 1].balance >= data[0].balance

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded shadow border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {payload[0].payload.month}
          </p>
          <p
            style={{ color: payload[0].color }}
            className="text-sm font-medium"
          >
            Balance: ${payload[0].value.toFixed(2)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        📈 Tendencia del Balance
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={isPositiveTrend ? '#22c55e' : '#ef4444'}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={isPositiveTrend ? '#22c55e' : '#ef4444'}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke={isPositiveTrend ? '#22c55e' : '#ef4444'}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#balanceGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
