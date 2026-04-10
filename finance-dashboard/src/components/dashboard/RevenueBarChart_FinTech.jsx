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

export default function RevenueBarChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#111418] to-[#0D0F12] rounded-xl border border-[#1C1F24] p-8 flex items-center justify-center h-96">
        <p className="text-[#A8B0BB] text-center">Sin datos disponibles</p>
      </div>
    )
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#161A1E] border border-[#2C3139] rounded-lg p-3 shadow-xl shadow-black/60 backdrop-blur-sm">
          <p className="text-xs font-semibold text-[#A8B0BB] uppercase mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-semibold">
              {entry.name}: ${Number(entry.value).toFixed(2)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-gradient-to-br from-[#111418] to-[#0D0F12] rounded-xl border border-[#1C1F24] p-6 md:p-8 hover:border-[#2C3139] transition-all duration-300 hover:shadow-xl hover:shadow-black/50 flex flex-col h-full w-full">
      {/* Header */}
      <div className="mb-6 flex-shrink-0">
        <h3 className="text-xl md:text-2xl font-bold text-[#F5F6F7] mb-2 tracking-tight">Ingresos vs Gastos</h3>
        <p className="text-xs md:text-sm text-[#A8B0BB] font-light">Comparativa mensual de flujos financieros</p>
      </div>

      {/* Chart Container - Flexible height */}
      <div className="flex-1 w-full bg-[#0D0F12] rounded-lg overflow-hidden flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
            style={{ backgroundColor: 'transparent' }}
          >
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2ECC71" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#2ECC71" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3498db" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#3498db" stopOpacity={0.2} />
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
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="square"
              textColor="#A8B0BB"
            />
            <Bar
              dataKey="income"
              fill="url(#incomeGradient)"
              name="Ingresos"
              radius={[8, 8, 0, 0]}
              isAnimationActive={true}
            />
            <Bar
              dataKey="expense"
              fill="url(#expenseGradient)"
              name="Gastos"
              radius={[8, 8, 0, 0]}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
