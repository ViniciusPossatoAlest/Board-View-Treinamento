// utils/chartDataTransform.js - Data Transformation (Seção 13.2)

export const transformBoardDataToChart = (items, chartType, options = {}) => {
  const { valueColumn = 'numbers', labelColumn = 'name' } = options;

  switch (chartType) {
    case 'bar':
    case 'column':
      return {
        labels: items.map(item => item.name),
        datasets: [{
          label: 'Valores',
          data: items.map(item => extractNumericValue(item, valueColumn)),
          backgroundColor: [
            '#0073ea', '#00c875', '#fdab3d', '#e2445c', '#a25ddc',
            '#037f4c', '#579bfc', '#ff642e', '#cab641', '#ff158a'
          ],
          borderRadius: 6
        }]
      };

    case 'pie':
    case 'donut':
      return {
        labels: items.map(item => item.name),
        datasets: [{
          data: items.map(item => extractNumericValue(item, valueColumn)),
          backgroundColor: [
            '#0073ea', '#00c875', '#fdab3d', '#e2445c', '#a25ddc',
            '#037f4c', '#579bfc', '#ff642e', '#cab641', '#ff158a'
          ]
        }]
      };

    case 'line':
    case 'area':
      return {
        labels: items.map(item => item.name),
        datasets: [{
          label: 'Tendência',
          data: items.map(item => extractNumericValue(item, valueColumn)),
          borderColor: '#0073ea',
          backgroundColor: 'rgba(0, 115, 234, 0.1)',
          tension: 0.4,
          fill: chartType === 'area'
        }]
      };

    default:
      return { labels: [], datasets: [] };
  }
};

// Agrupa items por status
export const groupByStatus = (items, statusColumnId = 'status') => {
  const groups = {};
  
  items.forEach(item => {
    const statusValue = getColumnValue(item, statusColumnId);
    const status = statusValue?.label || statusValue?.text || 'Sem Status';
    
    if (!groups[status]) {
      groups[status] = { count: 0, items: [], value: 0 };
    }
    groups[status].count++;
    groups[status].items.push(item);
  });

  return groups;
};

// Extrai valor numérico de uma coluna
export const extractNumericValue = (item, columnId) => {
  const column = item.column_values?.find(c => c.id === columnId);
  if (!column) return 0;
  
  try {
    const parsed = JSON.parse(column.value || '{}');
    return parseFloat(parsed) || parseFloat(column.text) || 0;
  } catch {
    return parseFloat(column.text) || 0;
  }
};

// Obtém valor de coluna
export const getColumnValue = (item, columnId) => {
  const column = item.column_values?.find(c => c.id === columnId);
  if (!column) return null;
  
  try {
    return JSON.parse(column.value || '{}');
  } catch {
    return { text: column.text };
  }
};

// Formata moeda
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0
  }).format(value);
};

// Formata data
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};
