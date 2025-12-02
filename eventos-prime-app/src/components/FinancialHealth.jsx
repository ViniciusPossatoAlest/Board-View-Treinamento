// components/FinancialHealth.jsx - Financial Health Component
import React from 'react'
import { Wallet, TrendingUp, TrendingDown, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { formatCurrency } from '../utils/chartDataTransform'

export default function FinancialHealth({ financeiro }) {
  const margemBruta = financeiro.receita - financeiro.custos
  const margemPercent = ((margemBruta / financeiro.receita) * 100).toFixed(1)

  const paymentStatus = [
    { label: 'Pago', value: financeiro.pago, icon: CheckCircle, color: 'text-monday-green', bg: 'bg-monday-green/20' },
    { label: 'Agendado', value: financeiro.agendado, icon: Clock, color: 'text-monday-yellow', bg: 'bg-monday-yellow/20' },
    { label: 'Pendente', value: financeiro.pendente, icon: AlertTriangle, color: 'text-monday-red', bg: 'bg-monday-red/20' },
  ]

  return (
    <div className="glass rounded-2xl p-5 h-[350px] flex flex-col fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="w-5 h-5 text-monday-green" />
        <h2 className="text-lg font-semibold text-white">Saúde Financeira</h2>
      </div>

      {/* Margem */}
      <div className="glass rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-sm">Margem Bruta</span>
          <span className="text-monday-green text-sm font-medium">{margemPercent}%</span>
        </div>
        <p className="text-xl font-bold text-monday-green">{formatCurrency(margemBruta)}</p>
        <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-monday-green to-monday-blue rounded-full" style={{ width: `${margemPercent}%` }} />
        </div>
      </div>

      {/* Receita vs Custos */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="glass rounded-xl p-3">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="w-3 h-3 text-monday-green" />
            <span className="text-xs text-white/60">Receita</span>
          </div>
          <p className="text-sm font-bold text-white">{formatCurrency(financeiro.receita)}</p>
        </div>
        <div className="glass rounded-xl p-3">
          <div className="flex items-center gap-1 mb-1">
            <TrendingDown className="w-3 h-3 text-monday-red" />
            <span className="text-xs text-white/60">Custos</span>
          </div>
          <p className="text-sm font-bold text-white">{formatCurrency(financeiro.custos)}</p>
        </div>
      </div>

      {/* Status de Pagamentos */}
      <div className="flex-1 space-y-2">
        {paymentStatus.map(status => (
          <div key={status.label} className={`flex items-center justify-between p-2.5 rounded-lg ${status.bg}`}>
            <div className="flex items-center gap-2">
              <status.icon className={`w-4 h-4 ${status.color}`} />
              <span className="text-white/80 text-sm">{status.label}</span>
            </div>
            <span className={`font-semibold text-sm ${status.color}`}>{formatCurrency(status.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
