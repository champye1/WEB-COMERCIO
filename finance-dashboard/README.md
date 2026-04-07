# 💰 Finance Dashboard

Un dashboard de finanzas personales moderno, construido con React, Supabase y Recharts. Diseñado para gestionar tus ingresos y gastos con visualización de datos en tiempo real.

## 🎯 Características

- **Autenticación segura** con Supabase Auth
- **Dashboard interactivo** con 4 KPIs principales
- **Visualización de datos** con 3 gráficos dinámicos:
  - 📊 Barras: Ingresos vs Gastos mensual
  - 🥧 Torta: Gastos por categoría
  - 📈 Área: Tendencia del balance
- **CRUD completo** de transacciones
- **Filtros avanzados** por fecha, tipo y categoría
- **Paginación server-side** para mejor rendimiento
- **Export a PDF y Excel** con múltiples hojas
- **RLS (Row Level Security)** - Cada usuario ve solo sus datos
- **Diseño responsive** con Tailwind CSS

## 🚀 Instalación

### Requisitos previos
- Node.js 16+
- Cuenta en Supabase (https://supabase.com)

### Pasos

1. **Clonar o descargar el proyecto**
   ```bash
   cd finance-dashboard
   ```

2. **Instalar dependencias** (ya hecho)
   ```bash
   npm install
   ```

3. **Configurar Supabase** ✅ (ya ejecutado)
   - Proyecto creado: `kyxpwdlmhgodxtihkxyk.supabase.co`
   - Schema ejecutado correctamente
   - Credenciales en `.env.local`

4. **Ejecutar el proyecto**
   ```bash
   npm run dev
   ```

5. **Acceder a la app**
   - Abre http://localhost:5173
   - Regístrate con tu email
   - ¡Comienza a registrar tus transacciones!

## 📁 Estructura del proyecto

```
finance-dashboard/
├── src/
│   ├── components/
│   │   ├── auth/          # LoginForm, RegisterForm
│   │   ├── layout/        # Navbar, Sidebar, MainLayout, ProtectedRoute
│   │   ├── dashboard/     # KPICard, gráficos (BarChart, PieChart, AreaChart)
│   │   └── transactions/  # FilterBar, TransactionTable, TransactionForm
│   ├── hooks/
│   │   ├── useAuth.js     # Autenticación
│   │   ├── useCategories.js # CRUD de categorías
│   │   ├── useTransactions.js # CRUD de transacciones + filtros
│   │   └── useDashboard.js   # Cálculos de KPIs y datos para gráficos
│   ├── lib/
│   │   ├── supabase.js    # Cliente Supabase
│   │   └── exportUtils.js # Funciones de export a PDF/Excel
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── Transactions.jsx
│   └── App.jsx
├── supabase/migrations/
│   └── 001_init.sql       # Schema de la BD
└── vite.config.js
```

## 🔐 Seguridad

- **Row Level Security (RLS)**: Cada usuario solo puede acceder a sus propios datos
- **Validación server-side**: Todas las operaciones están protegidas por RLS
- **Contraseña encriptada**: Supabase maneja la autenticación segura
- **Variables de entorno**: Las claves nunca se exponen en el código

## 🛠 Stack Tecnológico

- **Frontend**: React 18 + Vite
- **Estilos**: Tailwind CSS v3
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Gráficos**: Recharts
- **Export**: jsPDF + jspdf-autotable + SheetJS (xlsx)
- **Routing**: React Router v6

## 📊 Características principales

### Dashboard
- Muestra 4 KPIs: Ingresos, Gastos, Balance y Tasa de Ahorro
- 3 gráficos dinámicos con últimos 6 meses de datos
- Actualización en tiempo real

### Transacciones
- Crear, editar y eliminar transacciones
- Filtros por fecha, tipo (ingreso/gasto) y categoría
- Paginación de 10 items por página
- Búsqueda rápida

### Categorías
- 8 categorías por defecto (3 ingresos + 5 gastos)
- Colores personalizados para cada categoría
- Auto-seeding al primer login

### Export
- **PDF**: Reporte completo con tablas y resumen
- **Excel**: 3 hojas (Transacciones, Por Categoría, Por Mes)

## 🎓 Aprendizajes implementados

- Hooks personalizados para lógica reutilizable
- Supabase RLS para seguridad en BD
- Triggers SQL para automatización
- Paginación server-side eficiente
- Componentes controlados en React
- Context API para estado global (Auth)
- Recharts para visualización de datos
- Export de datos en múltiples formatos

---

**Hecho con ❤️ por Esteban Venegas para su portafolio**
