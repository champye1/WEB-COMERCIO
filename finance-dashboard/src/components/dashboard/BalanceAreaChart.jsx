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
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 hover:shadow-md transition-shadow">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Tendencia del Balance
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Evolución de tu balance a lo largo del tiempo</p>
      </div>
      <div style={{ width: '100%', height: '340px' }}>
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={isPositiveTrend ? '#10b981' : '#f87171'}
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor={isPositiveTrend ? '#10b981' : '#f87171'}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke={isPositiveTrend ? '#10b981' : '#f87171'}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#balanceGradient)"
            isAnimationActive={true}
          />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
