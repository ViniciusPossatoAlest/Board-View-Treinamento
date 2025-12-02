import React from 'react'
import { motion } from 'framer-motion'
import { 
  CalendarDays, 
  DollarSign, 
  TrendingUp, 
  Users, 
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react'

function KPICard({ title, value, subtitle, icon: Icon, color, trend, delay }) {
  const colorClasses = {
    green: 'from-monday-green/20 to-monday-green/5 border-monday-green/30 glow-green',
    blue: 'from-monday-blue/20 to-monday-blue/5 border-monday-blue/30 glow-blue',
    yellow: 'from-monday-yellow/20 to-monday-yellow/5 border-monday-yellow/30 glow-yellow',
    purple: 'from-monday-purple/20 to-monday-purple/5 border-monday-purple/30',
  }

  const iconColors = {
    green: 'text-monday-green',
    blue: 'text-monday-blue',
    yellow: 'text-monday-yellow',
    purple: 'text-monday-purple',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorClasses[color]} border p-6 cursor-pointer transition-all duration-300`}
    >
      {/* Background decoration */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-white/10 ${iconColors[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-monday-green' : 'text-monday-red'}`}>
              {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>

        <h3 className="text-white/60 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white count-up">{value}</p>
        {subtitle && (
          <p className="text-white/40 text-sm mt-2">{subtitle}</p>
        )}
      </div>
    </motion.div>
  )
}

function KPICards({ data }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const ticketMedio = data.financeiro.receita / data.eventos.length
  const margemBruta = ((data.financeiro.receita - data.financeiro.custos) / data.financeiro.receita * 100).toFixed(1)

  const kpis = [
    {
      title: 'Total de Eventos',
      value: data.eventos.length,
      subtitle: `${data.eventos.filter(e => e.fase === 'Execução').length} em execução`,
      icon: CalendarDays,
      color: 'blue',
      trend: 12,
    },
    {
      title: 'Faturamento Acumulado',
      value: formatCurrency(data.financeiro.receita),
      subtitle: 'Contratos fechados',
      icon: DollarSign,
      color: 'green',
      trend: 23,
    },
    {
      title: 'Ticket Médio',
      value: formatCurrency(ticketMedio),
      subtitle: 'Por evento',
      icon: TrendingUp,
      color: 'yellow',
      trend: 8,
    },
    {
      title: 'Margem Bruta',
      value: `${margemBruta}%`,
      subtitle: 'Receita - Custos',
      icon: Sparkles,
      color: 'purple',
      trend: 5,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <KPICard key={kpi.title} {...kpi} delay={index * 0.1} />
      ))}
    </div>
  )
}

export default KPICards
