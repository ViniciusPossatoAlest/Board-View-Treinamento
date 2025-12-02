import React from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { TrendingUp, BarChart3 } from 'lucide-react'

function RevenueChart({ eventos, theme = 'light' }) {
  // Agrupa eventos por mês
  const monthlyData = [
    { month: 'Nov', receita: 100000, custos: 25000 },
    { month: 'Dez', receita: 325000, custos: 45000 },
    { month: 'Jan', receita: 273000, custos: 12000 },
    { month: 'Fev', receita: 90000, custos: 4690 },
  ]

  // Dados por fase
  const phaseData = [
    { fase: 'Negociação', valor: 363000, count: 4, color: '#fdab3d' },
    { fase: 'Planejamento', valor: 240000, count: 3, color: '#0073ea' },
    { fase: 'Execução', valor: 85000, count: 1, color: '#00c875' },
    { fase: 'Pós-Evento', valor: 100000, count: 2, color: '#a25ddc' },
  ]

  const [view, setView] = React.useState('area')

  const axisColor = theme === 'dark' ? 'rgba(226,232,240,0.6)' : 'rgba(15,23,42,0.5)'
  const gridColor = theme === 'dark' ? 'rgba(148,163,184,0.15)' : 'rgba(15,23,42,0.08)'

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass rounded-lg p-3 border border-white/20 text-slate-900 dark:text-slate-100">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 h-[400px] dark:bg-slate-900 dark:border-slate-800"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Receita vs Custos
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Evolução mensal</p>
        </div>

        <div className="flex gap-2">
          {/** Buttons */}
          {['area', 'bar'].map((type) => {
            const isActive = view === type
            const baseClasses = isActive
              ? type === 'area'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 text-white'
              : theme === 'dark'
                ? 'border border-slate-700 text-slate-200 hover:text-white'
                : 'border border-slate-200 text-slate-600 hover:text-slate-900'
            return (
              <button
                key={type}
                onClick={() => setView(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${baseClasses}`}
              >
                {type === 'area' ? 'Área' : 'Barras'}
              </button>
            )
          })}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        {view === 'area' ? (
          <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00c875" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#00c875" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCustos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e2445c" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#e2445c" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="month" stroke={axisColor} />
            <YAxis stroke={axisColor} tickFormatter={(v) => `${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="receita"
              name="Receita"
              stroke="#00c875"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorReceita)"
            />
            <Area
              type="monotone"
              dataKey="custos"
              name="Custos"
              stroke="#e2445c"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCustos)"
            />
          </AreaChart>
        ) : (
          <BarChart data={phaseData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="fase" stroke={axisColor} />
            <YAxis stroke={axisColor} tickFormatter={(v) => `${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="valor" 
              name="Valor"
              radius={[4, 4, 0, 0]}
              fill="#0f172a"
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  )
}

export default RevenueChart
