export default function KPICard({ title, value, prefix = '', suffix = '', color = 'blue', icon }) {
  const bgColor = {
    green: 'bg-green-50 dark:bg-green-900',
    red: 'bg-red-50 dark:bg-red-900',
    blue: 'bg-blue-50 dark:bg-blue-900',
    purple: 'bg-purple-50 dark:bg-purple-900',
  }[color]

  const textColor = {
    green: 'text-green-600 dark:text-green-300',
    red: 'text-red-600 dark:text-red-300',
    blue: 'text-blue-600 dark:text-blue-300',
    purple: 'text-purple-600 dark:text-purple-300',
  }[color]

  const borderColor = {
    green: 'border-green-200 dark:border-green-700',
    red: 'border-red-200 dark:border-red-700',
    blue: 'border-blue-200 dark:border-blue-700',
    purple: 'border-purple-200 dark:border-purple-700',
  }[color]

  return (
    <div className={`${bgColor} rounded-lg p-6 border ${borderColor}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${textColor}`}>
            {prefix}
            {value}
            {suffix}
          </p>
        </div>
        {icon && <div className="text-4xl">{icon}</div>}
      </div>
    </div>
  )
}
