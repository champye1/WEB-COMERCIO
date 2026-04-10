export default function KPICard({
  title,
  value,
  change,
  icon,
  color = 'green',
  prefix = '',
  suffix = '',
  isPositive = true,
}) {
  const colorClasses = {
    green: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  }

  const changeColor = isPositive ? 'text-emerald-400' : 'text-red-400'

  return (
    <div className="relative bg-gradient-to-br from-[#111418] to-[#0D0F12] rounded-xl border border-[#1C1F24] p-6 overflow-hidden hover:border-[#2C3139] transition-all duration-300 hover:shadow-xl hover:shadow-black/50 group min-h-[160px] flex flex-col justify-center">
      {/* Background Gradient Accent */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xs font-semibold text-[#A8B0BB] uppercase tracking-widest leading-4">
            {title}
          </h3>
          {icon && (
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border flex-shrink-0 ml-2 ${colorClasses[color]}`}>
              <span className="text-lg">{icon}</span>
            </div>
          )}
        </div>

        {/* Main Value */}
        <div className="mb-3">
          <div className="flex items-baseline gap-1">
            {prefix && <span className="text-[#A8B0BB] text-base font-medium">{prefix}</span>}
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F6F7] group-hover:text-emerald-400 transition-colors duration-200 tracking-tight">
              {value}
            </h2>
            {suffix && <span className="text-[#A8B0BB] text-base font-medium">{suffix}</span>}
          </div>
        </div>

        {/* Change Indicator */}
        {change !== undefined && (
          <div className={`flex items-center gap-2 ${changeColor} text-xs font-medium mt-auto`}>
            <span>
              {isPositive ? '↑' : '↓'} {Math.abs(change)}%
            </span>
            <span className="text-[#A8B0BB]">vs mes anterior</span>
          </div>
        )}
      </div>

      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
    </div>
  )
}
