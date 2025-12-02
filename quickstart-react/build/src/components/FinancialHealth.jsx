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
      chipBg: 'bg-emerald-50 dark:bg-emerald-500/15',
      accent: 'text-emerald-600 dark:text-emerald-300',
    },
    { 
      label: 'Agendado', 
      value: financeiro.agendado, 
      icon: Clock, 
      chipBg: 'bg-amber-50 dark:bg-amber-500/15',
      accent: 'text-amber-600 dark:text-amber-300',
    },
    { 
      label: 'Pendente', 
      value: financeiro.pendente, 
      icon: AlertTriangle, 
      chipBg: 'bg-rose-50 dark:bg-rose-500/15',
      accent: 'text-rose-600 dark:text-rose-300',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 h-[360px] flex flex-col shadow-sm dark:shadow-none"
    >
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="w-4 h-4 text-emerald-600" />
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Saúde Financeira</h2>
      </div>

      {/* Margem Bruta */}
      <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3.5 mb-4 bg-slate-50 dark:bg-slate-900/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500 dark:text-slate-400 text-xs">Margem Bruta</span>
          <div className="flex items-center gap-1 text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{margemPercent}%</span>
          </div>
        </div>
        <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(margemBruta)}</p>
        
        {/* Progress bar */}
        <div className="mt-3 h-2 bg-white dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${margemPercent}%` }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
          />
        </div>
      </div>

      {/* Receita vs Custos */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3 bg-white dark:bg-slate-900/40">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Receita</span>
          </div>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(financeiro.receita)}</p>
        </div>
        <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3 bg-white dark:bg-slate-900/40">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Custos</span>
          </div>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(financeiro.custos)}</p>
        </div>
      </div>

      {/* Status de Pagamentos */}
      <div className="flex-1">
        <h3 className="text-slate-500 dark:text-slate-400 text-xs mb-3 flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5" />
          Status de Pagamentos
        </h3>
        <div className="space-y-1.5">
          {paymentStatus.map((status, index) => (
            <motion.div
              key={status.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 backdrop-blur`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center ${status.chipBg}`}>
                  <status.icon className={`w-3.5 h-3.5 ${status.accent}`} />
                </span>
                <span className="text-slate-700 dark:text-slate-300 text-sm">{status.label}</span>
              </div>
              <span className={`font-semibold text-sm ${status.accent}`}>
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
