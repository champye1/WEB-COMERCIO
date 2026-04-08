export default function KPICard({ title, value, prefix = '', suffix = '', color = 'blue', icon }) {
  const bgColor = {
    green: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30',
    red: 'bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/30 dark:to-rose-800/30',
    blue: 'bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-800/30',
    purple: 'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/30 dark:to-violet-800/30',
  }[color]

  const textColor = {
    green: 'text-emerald-700 dark:text-emerald-300',
    red: 'text-rose-700 dark:text-rose-300',
    blue: 'text-sky-700 dark:text-sky-300',
    purple: 'text-violet-700 dark:text-violet-300',
  }[color]

  const borderColor = {
    green: 'border-emerald-200 dark:border-emerald-700/50',
    red: 'border-rose-200 dark:border-rose-700/50',
    blue: 'border-sky-200 dark:border-sky-700/50',
    purple: 'border-violet-200 dark:border-violet-700/50',
  }[color]

  const iconBg = {
    green: 'bg-emerald-200/50 dark:bg-emerald-800/50',
    red: 'bg-rose-200/50 dark:bg-rose-800/50',
    blue: 'bg-sky-200/50 dark:bg-sky-800/50',
    purple: 'bg-violet-200/50 dark:bg-violet-800/50',
  }[color]

  return (
    <div className={`${bgColor} rounded-xl p-8 border ${borderColor} shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-400 mb-3">
            {title}
          </p>
          <p className={`text-4xl font-bold ${textColor}`}>
            <span className="text-2xl">{prefix}</span>
            {value}
            <span className="text-2xl">{suffix}</span>
          </p>
        </div>
        {icon && (
          <div className={`${iconBg} rounded-lg p-3 flex-shrink-0`}>
            <div className="text-3xl">{icon}</div>
          </div>
        )}
      </div>
    </div>
  )
}
