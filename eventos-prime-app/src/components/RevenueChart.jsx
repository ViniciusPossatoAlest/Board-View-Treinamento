// components/RevenueChart.jsx - Revenue Chart Component
import React, { useState } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

export default function RevenueChart({ eventos }) {
  const [view, setView] = useState('area')
  
  const monthlyData = [
    { month: 'Nov', receita: 100000, custos: 25000 },
    { month: 'Dez', receita: 325000, custos: 45000 },
    { month: 'Jan', receita: 273000, custos: 12000 },
    { month: 'Fev', receita: 90000, custos: 4690 },
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="glass rounded-lg p-3 border border-white/20">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry, i) => (
            <p key={i} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: R$ {(entry.value / 1000).toFixed(0)}k
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="glass rounded-2xl p-5 h-[350px] fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-monday-green" />
          <h2 className="text-lg font-semibold text-white">Receita vs Custos</h2>
        </div>
        <div className="flex gap-2">
          {['area', 'bar'].map(type => (
            <button
              key={type}
              onClick={() => setView(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                view === type ? 'bg-monday-green text-white' : 'glass text-white/60'
              }`}
            >
              {type === 'area' ? 'Área' : 'Barras'}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        {view === 'area' ? (
          <AreaChart data={monthlyData}>
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
            <YAxis stroke="rgba(255,255,255,0.5)" tickFormatter={v => `${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="receita" name="Receita" stroke="#00c875" fill="url(#colorReceita)" />
            <Area type="monotone" dataKey="custos" name="Custos" stroke="#e2445c" fill="url(#colorCustos)" />
          </AreaChart>
        ) : (
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" tickFormatter={v => `${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="receita" name="Receita" fill="#00c875" radius={[4,4,0,0]} />
            <Bar dataKey="custos" name="Custos" fill="#e2445c" radius={[4,4,0,0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
