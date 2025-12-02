// App.jsx - Main Application (Board View)
import React, { useState, useEffect } from 'react'
import { useMondayContext } from './hooks/useMondayContext'
import { useBoardData } from './hooks/useBoardData'
import Header from './components/Header'
import KPICards from './components/KPICards'
import RevenueChart from './components/RevenueChart'
import EventsKanban from './components/EventsKanban'
import TasksProgress from './components/TasksProgress'
import FinancialHealth from './components/FinancialHealth'
import LoadingState from './components/common/LoadingState'
import ErrorState from './components/common/ErrorState'

// Mock data para desenvolvimento (substituir por dados reais do Monday)
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
  tarefas: { total: 19, feitas: 4, emAndamento: 4, aFazer: 11 },
  financeiro: { receita: 788000, custos: 86690, pendente: 42500, pago: 28070, agendado: 16120 }
}

function App() {
  const { context, loading: contextLoading } = useMondayContext()
  const [data, setData] = useState(mockData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Em produção, aqui buscaria dados reais do Monday
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [context])

  if (contextLoading || isLoading) {
    return <LoadingState message="Carregando dashboard..." />
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <Header context={context} />
      
      <main className="max-w-[1600px] mx-auto space-y-6">
        {/* KPIs */}
        <KPICards data={data} />
        
        {/* Charts Grid */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <RevenueChart eventos={data.eventos} />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <FinancialHealth financeiro={data.financeiro} />
          </div>
        </div>

        {/* Kanban */}
        <EventsKanban eventos={data.eventos} />
        
        {/* Tasks */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6">
            <TasksProgress tarefas={data.tarefas} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
