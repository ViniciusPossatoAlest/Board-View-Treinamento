import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import KPICards from './components/KPICards'
import RevenueChart from './components/RevenueChart'
import EventsKanban from './components/EventsKanban'
import TasksProgress from './components/TasksProgress'
import FinancialHealth from './components/FinancialHealth'
import UpcomingEvents from './components/UpcomingEvents'
import TeamPerformance from './components/TeamPerformance'

// Dados simulados (em produção, viriam do Monday SDK)
const mockData = {
  eventos: [
    { id: 1, nome: 'Casamento Silva & Santos', fase: 'Execução', valor: 85000, data: '2025-12-02', cliente: 'Família Silva', local: 'Salão Imperial' },
    { id: 2, nome: 'Confraternização Empresa XYZ', fase: 'Planejamento', valor: 45000, data: '2025-12-15', cliente: 'Empresa XYZ', local: 'Hotel Grand' },
    { id: 3, nome: 'Formatura Medicina UFMG', fase: 'Planejamento', valor: 120000, data: '2025-12-20', cliente: 'Turma Med 2025', local: 'Centro de Convenções' },
    { id: 4, nome: 'Lançamento TechCorp', fase: 'Negociação', valor: 95000, data: '2026-01-10', cliente: 'TechCorp Brasil', local: 'Tech Hub' },
    { id: 5, nome: 'Festa Debutante Maria', fase: 'Planejamento', valor: 75000, data: '2025-12-28', cliente: 'Família Oliveira', local: 'Buffet Garden' },
    { id: 6, nome: 'Convenção Grupo Alpha', fase: 'Negociação', valor: 150000, data: '2026-01-15', cliente: 'Grupo Alpha', local: 'Centro Empresarial' },
    { id: 7, nome: 'Casamento Rodrigues', fase: 'Negociação', valor: 90000, data: '2026-02-14', cliente: 'Família Rodrigues', local: 'Igreja Matriz' },
    { id: 8, nome: 'Aniversário Dr. Paulo', fase: 'Negociação', valor: 28000, data: '2026-01-20', cliente: 'Dr. Paulo', local: 'Restaurante Elite' },
    { id: 9, nome: 'Aniversário Dona Helena', fase: 'Pós-Evento', valor: 35000, data: '2025-11-25', cliente: 'Família Helena', local: 'Casa de Festas' },
    { id: 10, nome: 'Workshop Banco Nacional', fase: 'Pós-Evento', valor: 65000, data: '2025-11-28', cliente: 'Banco Nacional', local: 'Auditório BN' },
  ],
  tarefas: {
    total: 19,
    feitas: 4,
    emAndamento: 4,
    aFazer: 11,
  },
  financeiro: {
    receita: 788000,
    custos: 86690,
    pendente: 42500,
    pago: 28070,
    agendado: 16120,
  },
  clientes: {
    total: 11,
    ativos: 5,
    fornecedores: 5,
    prospects: 1,
  }
}

function App() {
  const [data, setData] = useState(mockData)
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('dashboard-theme') || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    // Simula carregamento
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.dataset.theme = theme
      document.documentElement.classList.toggle('dark', theme === 'dark')
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('dashboard-theme', theme)
    }
  }, [theme])

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-14 h-14 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Carregando dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen p-4 md:p-6 transition-colors duration-200 ${theme === 'dark' ? 'bg-[#0f0f0f] text-neutral-100' : 'bg-white text-neutral-900'}`}>
      <Header theme={theme} onToggleTheme={handleToggleTheme} />
      
      <main className="max-w-[1400px] mx-auto space-y-5">
        {/* KPIs Principais */}
        <KPICards data={data} />
        
        {/* Grid Principal */}
        <div className="grid grid-cols-12 gap-5">
          {/* Gráfico de Receita */}
          <div className="col-span-12 lg:col-span-8">
            <RevenueChart eventos={data.eventos} theme={theme} />
          </div>
          
          {/* Saúde Financeira */}
          <div className="col-span-12 lg:col-span-4">
            <FinancialHealth financeiro={data.financeiro} />
          </div>
        </div>

        {/* Kanban de Eventos */}
        <EventsKanban eventos={data.eventos} />
        
        {/* Grid Inferior */}
        <div className="grid grid-cols-12 gap-5">
          {/* Progresso de Tarefas */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <TasksProgress tarefas={data.tarefas} />
          </div>
          
          {/* Próximos Eventos */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <UpcomingEvents eventos={data.eventos} />
          </div>
          
          {/* Performance do Time */}
          <div className="col-span-12 lg:col-span-4">
            <TeamPerformance />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
