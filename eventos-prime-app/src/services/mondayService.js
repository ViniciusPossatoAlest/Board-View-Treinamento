// services/mondayService.js - SDK e APIs (Seção 5)
import mondaySdk from 'monday-sdk-js';
import config from '../config/environment';

const monday = mondaySdk();

// Inicialização do SDK (Seção 1.2)
export const initMonday = () => {
  monday.setApiVersion('2023-10');
  return monday;
};

// GraphQL Query para dados do Board (Seção 5.1)
export const getBoardData = async (boardId) => {
  const query = `
    query GetBoard($boardId: [ID!]!) {
      boards(ids: $boardId) {
        id
        name
        items_page(limit: 100) {
          items {
            id
            name
            group {
              id
              title
            }
            column_values {
              id
              text
              value
              type
            }
          }
        }
        columns {
          id
          title
          type
        }
      }
    }
  `;
  
  try {
    const response = await monday.api(query, { variables: { boardId: [boardId] } });
    return response.data.boards[0];
  } catch (error) {
    throw handleMondayError(error);
  }
};

// Buscar múltiplos boards
export const getMultipleBoardsData = async (boardIds) => {
  const query = `
    query GetBoards($boardIds: [ID!]!) {
      boards(ids: $boardIds) {
        id
        name
        items_page(limit: 100) {
          items {
            id
            name
            group {
              id
              title
            }
            column_values {
              id
              text
              value
              type
            }
          }
        }
      }
    }
  `;
  
  try {
    const response = await monday.api(query, { variables: { boardIds } });
    return response.data.boards;
  } catch (error) {
    throw handleMondayError(error);
  }
};

// Error Handling (Seção 1.3)
export const handleMondayError = (error) => {
  const errorMap = {
    'AUTHENTICATION_ERROR': 'Token inválido ou expirado',
    'RATE_LIMIT_EXCEEDED': 'Limite de requisições excedido',
    'INVALID_QUERY': 'Query GraphQL inválida',
    'COMPLEXITY_EXCEEDED': 'Query muito complexa'
  };
  
  const message = error?.errors?.[0]?.message || 'Erro desconhecido';
  const code = error?.errors?.[0]?.extensions?.code || 'UNKNOWN_ERROR';
  
  if (config.debug) {
    console.error('Monday API Error:', { code, message, error });
  }
  
  return {
    code,
    message: errorMap[code] || message
  };
};

export default monday;
