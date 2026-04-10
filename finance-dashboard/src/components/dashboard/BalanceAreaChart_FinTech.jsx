import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function BalanceAreaChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#111418] to-[#0D0F12] rounded-xl border border-[#1C1F24] p-8 flex items-center justify-center h-96">
        <p className="text-[#A8B0BB] text-center">Sin datos disponibles</p>
      </div>
    )
  }

  const isPositiveTrend =
    data.length > 1 && data[data.length - 1].balance >= data[0].balance

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0]
      return (
        <div className="bg-[#161A1E] border border-[#2C3139] rounded-lg p-3 shadow-xl shadow-black/60 backdrop-blur-sm">
          <p className="text-xs font-semibold text-[#A8B0BB] uppercase mb-2">
            {dataPoint.payload.month}
          </p>
          <p style={{ color: dataPoint.color }} className="text-sm font-semibold">
            Balance: ${Number(dataPoint.value).toFixed(2)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-gradient-to-br from-[#111418] to-[#0D0F12] rounded-xl border border-[#1C1F24] p-6 md:p-8 hover:border-[#2C3139] transition-all duration-300 hover:shadow-xl hover:shadow-black/50 flex flex-col h-full w-full">
      {/* Header */}
      <div className="mb-6 flex-shrink-0">
        <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-[#F5F6F7] tracking-tight">Tendencia del Balance</h3>
            <p className="text-xs md:text-sm text-[#A8B0BB] mt-2 font-light">Evolución acumulativa de tu balance</p>
          </div>
          <div
            className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0 ${
              isPositiveTrend
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : 'bg-red-500/15 text-red-300 border border-red-500/30'
            }`}
          >
            {isPositiveTrend ? '📈 Positivo' : '📉 Negativo'}
          </div>
        </div>
      </div>

      {/* Chart Container - Flexible height */}
      <div className="flex-1 w-full bg-[#0D0F12] rounded-lg overflow-hidden flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
            style={{ backgroundColor: 'transparent' }}
          >
            <defs>
              <linearGradient
                id="balanceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={isPositiveTrend ? '#2ECC71' : '#E74C3C'}
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor={isPositiveTrend ? '#2ECC71' : '#E74C3C'}
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#1C1F24"
              vertical={false}
              opacity={0.3}
            />
            <XAxis
              dataKey="month"
              stroke="#A8B0BB"
              style={{ fontSize: '12px' }}
              tick={{ fill: '#A8B0BB' }}
              axisLine={{ stroke: '#1C1F24' }}
            />
            <YAxis
              stroke="#A8B0BB"
              style={{ fontSize: '12px' }}
              tick={{ fill: '#A8B0BB' }}
              axisLine={{ stroke: '#1C1F24' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(46, 204, 113, 0.1)' }} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke={isPositiveTrend ? '#2ECC71' : '#E74C3C'}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#balanceGradient)"
              isAnimationActive={true}
              dot={{ fill: isPositiveTrend ? '#2ECC71' : '#E74C3C', r: 4 }}
              activeDot={{ r: 6, fill: isPositiveTrend ? '#2ECC71' : '#E74C3C' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
