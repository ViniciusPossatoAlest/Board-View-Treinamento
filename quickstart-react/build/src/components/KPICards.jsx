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

function KPICard({ title, value, subtitle, icon: Icon, trend, delay, theme }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-lg p-4 transition-colors ${
        theme === 'dark' 
          ? 'bg-neutral-900 border border-neutral-800' 
          : 'bg-neutral-50 border border-neutral-100'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <Icon className="w-4 h-4 text-neutral-400" />
        {trend && (
          <div className={`flex items-center gap-0.5 text-[11px] font-medium ${trend > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <p className="text-neutral-500 text-[10px] font-medium tracking-wide mb-1 uppercase">{title}</p>
      <p className={`text-[20px] font-semibold ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>{value}</p>
      {subtitle && (
        <p className="text-neutral-400 text-[11px] mt-1">{subtitle}</p>
      )}
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <KPICard key={kpi.title} {...kpi} delay={index * 0.1} />
      ))}
    </div>
  )
}

export default KPICards
