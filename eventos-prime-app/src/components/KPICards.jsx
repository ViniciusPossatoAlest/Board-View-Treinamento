// components/KPICards.jsx - KPI Cards Component
import React from 'react'
import { CalendarDays, DollarSign, TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react'
import { formatCurrency } from '../utils/chartDataTransform'

function KPICard({ title, value, subtitle, icon: Icon, color, trend }) {
  const colorMap = {
    green: 'from-monday-green/20 to-monday-green/5 border-monday-green/30',
    blue: 'from-monday-blue/20 to-monday-blue/5 border-monday-blue/30',
    yellow: 'from-monday-yellow/20 to-monday-yellow/5 border-monday-yellow/30',
    purple: 'from-monday-purple/20 to-monday-purple/5 border-monday-purple/30',
  }
  
  const iconColorMap = {
    green: 'text-monday-green', blue: 'text-monday-blue',
    yellow: 'text-monday-yellow', purple: 'text-monday-purple',
  }

  return (
    <div className={`fade-in rounded-2xl bg-gradient-to-br ${colorMap[color]} border p-5 hover:scale-[1.02] transition-transform cursor-pointer`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl bg-white/10 ${iconColorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-monday-green text-sm">
            <ArrowUpRight className="w-4 h-4" />
            {trend}%
          </div>
        )}
      </div>
      <h3 className="text-white/60 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
      {subtitle && <p className="text-white/40 text-xs mt-1">{subtitle}</p>}
    </div>
  )
}

export default function KPICards({ data }) {
  const ticketMedio = data.financeiro.receita / data.eventos.length
  const margemBruta = ((data.financeiro.receita - data.financeiro.custos) / data.financeiro.receita * 100).toFixed(1)

  const kpis = [
    { title: 'Total de Eventos', value: data.eventos.length, subtitle: `${data.eventos.filter(e => e.fase === 'Execução').length} em execução`, icon: CalendarDays, color: 'blue', trend: 12 },
    { title: 'Faturamento', value: formatCurrency(data.financeiro.receita), subtitle: 'Contratos fechados', icon: DollarSign, color: 'green', trend: 23 },
    { title: 'Ticket Médio', value: formatCurrency(ticketMedio), subtitle: 'Por evento', icon: TrendingUp, color: 'yellow', trend: 8 },
    { title: 'Margem Bruta', value: `${margemBruta}%`, subtitle: 'Receita - Custos', icon: Sparkles, color: 'purple', trend: 5 },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => <KPICard key={i} {...kpi} />)}
    </div>
  )
}
