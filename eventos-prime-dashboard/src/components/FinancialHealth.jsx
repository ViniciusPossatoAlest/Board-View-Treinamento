import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, TrendingDown, CreditCard, CheckCircle, Clock, AlertTriangle } from 'lucide-react'

function FinancialHealth({ financeiro }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const margemBruta = financeiro.receita - financeiro.custos
  const margemPercent = ((margemBruta / financeiro.receita) * 100).toFixed(1)

  const paymentStatus = [
    { 
      label: 'Pago', 
      value: financeiro.pago, 
      icon: CheckCircle, 
      color: 'text-monday-green',
      bgColor: 'bg-monday-green/20',
    },
    { 
      label: 'Agendado', 
      value: financeiro.agendado, 
      icon: Clock, 
      color: 'text-monday-yellow',
      bgColor: 'bg-monday-yellow/20',
    },
    { 
      label: 'Pendente', 
      value: financeiro.pendente, 
      icon: AlertTriangle, 
      color: 'text-monday-red',
      bgColor: 'bg-monday-red/20',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass rounded-2xl p-6 h-[400px] flex flex-col"
    >
      <div className="flex items-center gap-2 mb-6">
        <Wallet className="w-5 h-5 text-monday-green" />
        <h2 className="text-lg font-semibold text-white">Saúde Financeira</h2>
      </div>

      {/* Margem Bruta */}
      <div className="glass rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-sm">Margem Bruta</span>
          <div className="flex items-center gap-1 text-monday-green">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">{margemPercent}%</span>
          </div>
        </div>
        <p className="text-2xl font-bold text-monday-green">{formatCurrency(margemBruta)}</p>
        
        {/* Progress bar */}
        <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${margemPercent}%` }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-full bg-gradient-to-r from-monday-green to-monday-blue rounded-full"
          />
        </div>
      </div>

      {/* Receita vs Custos */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="glass rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-monday-green" />
            <span className="text-xs text-white/60">Receita</span>
          </div>
          <p className="text-lg font-bold text-white">{formatCurrency(financeiro.receita)}</p>
        </div>
        <div className="glass rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-4 h-4 text-monday-red" />
            <span className="text-xs text-white/60">Custos</span>
          </div>
          <p className="text-lg font-bold text-white">{formatCurrency(financeiro.custos)}</p>
        </div>
      </div>

      {/* Status de Pagamentos */}
      <div className="flex-1">
        <h3 className="text-white/60 text-sm mb-3 flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Status de Pagamentos
        </h3>
        <div className="space-y-2">
          {paymentStatus.map((status, index) => (
            <motion.div
              key={status.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-xl ${status.bgColor}`}
            >
              <div className="flex items-center gap-2">
                <status.icon className={`w-4 h-4 ${status.color}`} />
                <span className="text-white/80 text-sm">{status.label}</span>
              </div>
              <span className={`font-semibold ${status.color}`}>
                {formatCurrency(status.value)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default FinancialHealth
