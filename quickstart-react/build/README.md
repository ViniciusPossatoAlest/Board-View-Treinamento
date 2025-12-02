# 🎉 Eventos Prime - Dashboard Executivo

Dashboard corporativo moderno para visualização de dados do Monday.com, desenvolvido como Board View App.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)

## ✨ Features

- **KPIs Animados** - Cards com métricas em tempo real e animações suaves
- **Gráficos Interativos** - Recharts com múltiplas visualizações (Area, Bar, Pie)
- **Pipeline Kanban** - Visualização de eventos por fase
- **Saúde Financeira** - Indicadores de margem, receita e custos
- **Próximos Eventos** - Lista com indicadores de urgência
- **Performance do Time** - Métricas individuais e ranking

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📁 Estrutura

```
src/
├── components/
│   ├── Header.jsx          # Cabeçalho com busca e notificações
│   ├── KPICards.jsx        # Cards de KPIs principais
│   ├── RevenueChart.jsx    # Gráfico de receita vs custos
│   ├── EventsKanban.jsx    # Pipeline de eventos
│   ├── TasksProgress.jsx   # Progresso circular de tarefas
│   ├── FinancialHealth.jsx # Indicadores financeiros
│   ├── UpcomingEvents.jsx  # Próximos eventos
│   └── TeamPerformance.jsx # Performance do time
├── App.jsx                 # Componente principal
├── main.jsx               # Entry point
└── index.css              # Estilos globais + Tailwind
```

## 🔗 Integração com Monday.com

Para integrar como Board View App:

### 1. Criar App no Monday
1. Acesse [developers.monday.com](https://developers.monday.com)
2. Crie um novo app
3. Adicione feature "Board View"

### 2. Configurar Monday SDK
```javascript
import mondaySdk from 'monday-sdk-js'
const monday = mondaySdk()

// Obter contexto
monday.get('context').then((res) => {
  const boardId = res.data.boardId
  // Carregar dados do board
})

// Obter items
monday.api(`
  query {
    boards(ids: [${boardId}]) {
      items_page {
        items {
          id
          name
          column_values { id text value }
        }
      }
    }
  }
`)
```

### 3. Hospedar e Configurar URL
- Deploy no Netlify/Vercel
- Configure URL no Monday Developer Center
- Publique no Marketplace (opcional)

## 🎨 Design System

### Cores Monday
- **Green**: `#00c875` - Sucesso, positivo
- **Blue**: `#0073ea` - Primária, informação
- **Yellow**: `#fdab3d` - Alerta, atenção
- **Red**: `#e2445c` - Erro, negativo
- **Purple**: `#a25ddc` - Destaque

### Efeitos
- **Glass Morphism** - Backgrounds translúcidos
- **Glow Effects** - Sombras coloridas
- **Smooth Animations** - Framer Motion

## 📊 Dados

O dashboard usa dados mockados para demonstração. Em produção, substituir por chamadas à API do Monday via SDK.

## 🛠️ Tecnologias

- **React 18** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Gráficos
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **Monday SDK** - Integração

## 📄 Licença

MIT © Eventos Prime
