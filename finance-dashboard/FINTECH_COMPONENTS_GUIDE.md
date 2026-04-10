# 🎨 Fintech Dark Pro Components - Guía de Integración

Documentación completa para integrar los componentes de UI profesional estilo Fintech (Revolut, Binance, Robinhood).

---

## 📦 Componentes Generados

### 1. **KPICard_FinTech.jsx**
Tarjeta de métrica profesional con animaciones y efectos hover.

**Props:**
```jsx
<KPICard
  title="Total Ingresos"
  value="45,250.00"
  change={12.5}
  isPositive={true}
  icon="📈"
  color="green"        // 'green' | 'red' | 'blue' | 'purple'
  prefix="$"
  suffix=""
/>
```

**Características:**
- Gradiente de fondo
- Icono con badge coloreado
- Indicador de cambio porcentual
- Efecto hover con sombra y acento neón
- Borde inferior con gradiente al hover

---

### 2. **Navbar_FinTech.jsx**
Barra de navegación minimalista con controles y perfil de usuario.

**Uso:**
```jsx
import Navbar from '@/components/layout/Navbar_FinTech'

export default function App() {
  return (
    <div>
      <Navbar />
      {/* Resto de contenido */}
    </div>
  )
}
```

**Características:**
- Logo con gradiente
- Enlaces de navegación con estado activo
- Campana de notificaciones
- Perfil de usuario con iniciales
- Backdrop blur para efecto glassmorphism

---

### 3. **Sidebar_FinTech.jsx**
Menú lateral colapsable con ícones y badges.

**Uso:**
```jsx
import Sidebar from '@/components/layout/Sidebar_FinTech'

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64">
        {/* Contenido principal */}
      </main>
    </div>
  )
}
```

**Características:**
- Items con iconos y labels
- Badges de notificaciones
- Colapsable (oculta labels)
- División visual entre secciones
- Acento visual en item activo

---

### 4. **RevenueBarChart_FinTech.jsx**
Gráfico de barras para ingresos vs gastos con Recharts.

**Props:**
```jsx
<RevenueBarChart
  data={[
    { month: 'Ene', income: 5000, expense: 3000 },
    { month: 'Feb', income: 6200, expense: 3500 },
    // ...
  ]}
/>
```

**Características:**
- Gradientes personalizados en barras
- Tooltip dark pro
- Grid suave
- Eje Y/X con estilos fintech
- Animaciones de entrada

---

### 5. **BalanceAreaChart_FinTech.jsx**
Gráfico de área para tendencia del balance.

**Props:**
```jsx
<BalanceAreaChart
  data={[
    { month: 'Ene', balance: 2000 },
    { month: 'Feb', balance: 4700 },
    // ...
  ]}
/>
```

**Características:**
- Gradiente dinámico (verde si positivo, rojo si negativo)
- Tooltip con información detallada
- Puntos interactivos en la línea
- Indicator de tendencia en header
- Área suave con opacidad progresiva

---

### 6. **CategoryPieChart_FinTech.jsx**
Gráfico circular para distribución de gastos.

**Props:**
```jsx
<CategoryPieChart
  data={[
    { name: 'Alimentación', value: 1200, color: '#E74C3C' },
    { name: 'Transporte', value: 800, color: '#3498DB' },
    // ...
  ]}
/>
```

**Características:**
- Donut chart con leyenda
- Paleta de colores neón
- Lista de categorías con porcentajes
- Tooltip con detalles
- Animación de carga suave
- Sombra en anillo interior

---

### 7. **TransactionTable_FinTech.jsx**
Tabla profesional de transacciones con filtros y ordenamiento.

**Props:**
```jsx
<TransactionTable
  transactions={[
    {
      id: '1',
      date: '2024-04-08',
      description: 'Compra en supermercado',
      type: 'expense',
      category: 'Alimentación',
      amount: 45.50,
    },
    // ...
  ]}
  onEdit={(transaction) => console.log('Editar:', transaction)}
  onDelete={(id) => console.log('Eliminar:', id)}
/>
```

**Características:**
- Filas alternadas (colores oscuro/más oscuro)
- Filtro por tipo (ingreso/gasto/todos)
- Ordenamiento por fecha o monto
- Badges de categoría coloreados
- Botones de editar/eliminar con hover color
- Indicador visual +/- de monto
- Responsive scroll horizontal

---

### 8. **TransactionForm_FinTech.jsx**
Formulario elegante para crear/editar transacciones.

**Props:**
```jsx
<TransactionForm
  initialData={null}  // null para crear, objeto para editar
  onSubmit={async (formData) => {
    // Enviar a API
    console.log(formData)
  }}
/>
```

**Estructura de datos:**
```javascript
{
  date: '2024-04-08',
  description: 'Compra en tienda',
  type: 'expense',        // 'expense' | 'income'
  category: 'Alimentación',
  amount: 45.50
}
```

**Características:**
- Selector visual de tipo (ingreso/gasto)
- Categorías dinámicas según tipo
- Input de monto con símbolo $
- Validación de campos obligatorios
- Estado de carga en botón
- Limpieza automática post-envío
- Efectos hover animados

---

## 🎨 Paleta de Colores Fintech

```javascript
// Fondos
bg-primary: #0D0F12
bg-secondary: #111418
bg-tertiary: #161A1E
bg-border: #1C1F24
bg-border-hover: #2C3139

// Textos
text-primary: #F5F6F7
text-secondary: #A8B0BB

// Acentos
accent-green: #2ECC71 (emerald-400)
accent-blue: #3498db (blue-500)
accent-red: #E74C3C
```

---

## 🚀 Instalación Rápida

### 1. Asegurar dependencias instaladas:
```bash
npm install recharts
npm install -D tailwindcss
```

### 2. Configurar Tailwind (si no está configurado):
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Copiar componentes a tu proyecto:
- Copiar archivos `*_FinTech.jsx` a `src/components/`
- Mantener estructura de carpetas (dashboard, layout, transactions)

### 4. Actualizar imports en tus páginas:
```jsx
// Antes
import KPICard from '@/components/dashboard/KPICard'

// Después (para usar los nuevos estilos)
import KPICard from '@/components/dashboard/KPICard_FinTech'
```

---

## 📱 Responsive Design

Todos los componentes son 100% responsive:

- **Navbar**: Oculta navegación en móvil, menú hamburguesa opcional
- **Sidebar**: Colapsable en móvil
- **Gráficos**: ResponsiveContainer automático
- **Tabla**: Scroll horizontal en móvil
- **Formulario**: Stack vertical en móvil

---

## 🎬 Animaciones Incluidas

- Transiciones suaves (300ms)
- Hover effects en cards y botones
- Scale transform en hover (+5%)
- Sombras dinámicas
- Gradientes animados en borders
- Loading spinner en formularios
- Fade in en tooltips

---

## 🔌 Integración con API

### Dashboard.jsx (Ejemplo)
```jsx
import { useState, useMemo } from 'react'
import KPICard from '@/components/dashboard/KPICard_FinTech'
import RevenueBarChart from '@/components/dashboard/RevenueBarChart_FinTech'
import BalanceAreaChart from '@/components/dashboard/BalanceAreaChart_FinTech'
import CategoryPieChart from '@/components/dashboard/CategoryPieChart_FinTech'

export default function Dashboard() {
  const [transactions, setTransactions] = useState([])

  // Calcular KPIs
  const kpis = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
      savingsRate: ((income - expense) / income * 100).toFixed(1)
    }
  }, [transactions])

  return (
    <div className="p-8 space-y-8">
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Ingresos"
          value={kpis.totalIncome.toFixed(2)}
          icon="📈"
          color="green"
          prefix="$"
        />
        <KPICard
          title="Total Gastos"
          value={kpis.totalExpense.toFixed(2)}
          icon="📉"
          color="red"
          prefix="$"
        />
        <KPICard
          title="Balance"
          value={kpis.balance.toFixed(2)}
          icon="⚖️"
          color={kpis.balance >= 0 ? 'green' : 'red'}
          prefix="$"
        />
        <KPICard
          title="Tasa de Ahorro"
          value={kpis.savingsRate}
          icon="💰"
          color="blue"
          suffix="%"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueBarChart data={barChartData} />
        <CategoryPieChart data={pieChartData} />
      </div>

      <BalanceAreaChart data={areaChartData} />
    </div>
  )
}
```

---

## 🎯 Tips Profesionales

1. **Espaciado**: Mantener `gap-6` y `p-6`/`p-8` para consistencia
2. **Colores**: Usar siempre la paleta definida (no agregar colores custom)
3. **Sombras**: `shadow-xl shadow-black/50` para profundidad
4. **Borders**: `border-[#1C1F24]` para consistencia
5. **Transiciones**: `transition-all duration-300` en hovers
6. **Responsiveness**: Usar `hidden md:flex` / `hidden sm:flex` para ocultar en móvil

---

## 📊 Estructura de Datos Esperada

### KPI Data
```javascript
{
  totalIncome: 5000,
  totalExpense: 3000,
  balance: 2000,
  savingsRate: 40.0
}
```

### Bar Chart Data
```javascript
[
  { month: 'Ene', income: 5000, expense: 3000 },
  { month: 'Feb', income: 6200, expense: 3500 }
]
```

### Pie Chart Data
```javascript
[
  { name: 'Alimentación', value: 1200, color: '#E74C3C' },
  { name: 'Transporte', value: 800, color: '#3498DB' }
]
```

### Transaction Data
```javascript
{
  id: '1',
  date: '2024-04-08',
  description: 'Compra en supermercado',
  type: 'expense',
  category: 'Alimentación',
  amount: 45.50
}
```

---

## ✅ Checklist de Implementación

- [ ] Copiar todos los componentes `_FinTech.jsx`
- [ ] Actualizar imports en páginas principales
- [ ] Probar en navegador (light/dark backgrounds)
- [ ] Verificar responsive en móvil
- [ ] Integrar con datos reales de API
- [ ] Probar animaciones y hovers
- [ ] Ajustar colores si es necesario
- [ ] Commit a git

---

## 🆘 Troubleshooting

**Q: Los gráficos no cargan datos**
A: Asegurar que `data` prop sea un array de objetos con las claves esperadas

**Q: Colores no aparecen correctamente**
A: Verificar que Tailwind esté procesando las clases en `tailwind.config.js`

**Q: Botones no responden**
A: Verificar que `onClick` handlers estén pasados correctamente

**Q: Mobile se ve roto**
A: Usar `max-w-7xl mx-auto` en contenedores principales

---

## 📌 Próximos Pasos

1. **Dark Mode Toggle**: Agregar `ThemeContext` para cambiar entre temas
2. **Multi-Currency**: Implementar `CurrencyContext` para conversiones
3. **Testing**: Agregar tests con Vitest para validar componentes
4. **Storybook**: Crear stories para cada componente
5. **Animations**: Agregar Framer Motion para transiciones más complejas

---

**Versión**: 1.0  
**Última actualización**: Abril 2024  
**Stack**: React 18 + Vite + Tailwind CSS + Recharts

