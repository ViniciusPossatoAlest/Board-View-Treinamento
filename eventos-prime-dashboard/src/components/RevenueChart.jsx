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

function RevenueChart({ eventos }) {
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass rounded-lg p-3 border border-white/20">
          <p className="text-white font-medium mb-2">{label}</p>
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
      className="glass rounded-2xl p-6 h-[400px]"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-monday-green" />
            Receita vs Custos
          </h2>
          <p className="text-white/50 text-sm mt-1">Evolução mensal</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setView('area')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'area' 
                ? 'bg-monday-green text-white' 
                : 'glass text-white/60 hover:text-white'
            }`}
          >
            Área
          </button>
          <button
            onClick={() => setView('bar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'bar' 
                ? 'bg-monday-blue text-white' 
                : 'glass text-white/60 hover:text-white'
            }`}
          >
            Barras
          </button>
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
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" tickFormatter={(v) => `${v/1000}k`} />
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
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="fase" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" tickFormatter={(v) => `${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="valor" 
              name="Valor"
              radius={[4, 4, 0, 0]}
              fill="#0073ea"
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  )
}

export default RevenueChart
