import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function CategoryPieChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#111418] to-[#0D0F12] rounded-xl border border-[#1C1F24] p-8 flex items-center justify-center h-96">
        <p className="text-[#A8B0BB] text-center">Sin datos disponibles</p>
      </div>
    )
  }

  const COLORS = [
    '#2ECC71', // Emerald
    '#3498db', // Blue
    '#9B59B6', // Purple
    '#E67E22', // Orange
    '#E74C3C', // Red
    '#1ABC9C', // Turquoise
    '#F39C12', // Gold
    '#16A085', // Dark Turquoise
  ]

  const total = data.reduce((sum, item) => sum + (item.value || 0), 0)
  const dataWithTotal = data.map((item, index) => ({
    ...item,
    total,
    color: item.color || COLORS[index % COLORS.length],
  }))

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0]
      const percentage = ((entry.value / total) * 100).toFixed(1)
      return (
        <div className="bg-[#161A1E] border border-[#2C3139] rounded-lg p-3 shadow-xl shadow-black/60 backdrop-blur-sm">
          <p className="text-xs font-semibold text-[#A8B0BB] uppercase mb-2">
            {entry.payload.name}
          </p>
          <p className="text-sm font-semibold text-[#F5F6F7]">
            ${Number(entry.value).toFixed(2)}
          </p>
          <p style={{ color: entry.color }} className="text-xs font-semibold mt-1">
            {percentage}% del total
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
        <h3 className="text-xl md:text-2xl font-bold text-[#F5F6F7] mb-2 tracking-tight">Gastos por Categoría</h3>
        <p className="text-xs md:text-sm text-[#A8B0BB] font-light">Distribución del presupuesto mensual</p>
      </div>

      {/* Stats Bar */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:gap-4 flex-shrink-0">
        <div className="bg-[#0D0F12] rounded-lg p-3 md:p-4 border border-[#1C1F24] hover:border-[#2C3139] transition-all">
          <p className="text-xs text-[#A8B0BB] uppercase font-medium mb-2 tracking-wide">Total Gastos</p>
          <p className="text-lg md:text-2xl font-bold text-[#F5F6F7]">${total.toFixed(2)}</p>
        </div>
        <div className="bg-[#0D0F12] rounded-lg p-3 md:p-4 border border-[#1C1F24] hover:border-[#2C3139] transition-all">
          <p className="text-xs text-[#A8B0BB] uppercase font-medium mb-2 tracking-wide">Categorías</p>
          <p className="text-lg md:text-2xl font-bold text-emerald-400">{dataWithTotal.length}</p>
        </div>
      </div>

      {/* Chart Container - Flexible height */}
      <div className="flex-1 w-full bg-[#0D0F12] rounded-lg overflow-hidden flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart style={{ backgroundColor: 'transparent' }}>
            <Pie
              data={dataWithTotal}
              cx="45%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              innerRadius={55}
              fill="#2ECC71"
              dataKey="value"
              animationBegin={0}
              animationDuration={600}
              animationEasing="ease-out"
            >
              {dataWithTotal.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(46, 204, 113, 0.2))',
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
              textColor="#A8B0BB"
              formatter={(value) => <span style={{ fontSize: '12px' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Category List */}
      <div className="mt-6 space-y-2">
        {dataWithTotal.map((category, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-[#0D0F12] border border-[#1C1F24] hover:border-[#2C3139] transition-all"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm text-[#F5F6F7] font-medium">{category.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#A8B0BB]">
                {((category.value / total) * 100).toFixed(1)}%
              </span>
              <span className="text-sm font-semibold text-[#F5F6F7]">
                ${category.value.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
