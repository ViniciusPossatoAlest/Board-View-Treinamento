// hooks/useBoardData.js - Data Fetching Hook (Seção 11.1)
import { useState, useEffect, useMemo } from 'react';
import { getBoardData, getMultipleBoardsData } from '../services/mondayService';
import { useMondayContext } from './useMondayContext';

export const useBoardData = (boardId = null) => {
  const { context } = useMondayContext();
  const [boardData, setBoardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const targetBoardId = boardId || context?.boardId;

  useEffect(() => {
    if (!targetBoardId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBoardData(targetBoardId);
        setBoardData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [targetBoardId]);

  // Memoização dos dados transformados (Seção 15.2)
  const processedData = useMemo(() => {
    if (!boardData) return null;
    
    return {
      ...boardData,
      itemCount: boardData.items_page?.items?.length || 0,
      groupedItems: groupItemsByGroup(boardData.items_page?.items || [])
    };
  }, [boardData]);

  return { boardData: processedData, loading, error, refetch: () => {} };
};

export const useMultipleBoardsData = (boardIds) => {
  const [boardsData, setBoardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!boardIds?.length) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getMultipleBoardsData(boardIds);
        setBoardsData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(boardIds)]);

  return { boardsData, loading, error };
};

// Utility function
const groupItemsByGroup = (items) => {
  return items.reduce((acc, item) => {
    const groupId = item.group?.id || 'ungrouped';
    if (!acc[groupId]) {
      acc[groupId] = {
        id: groupId,
        title: item.group?.title || 'Sem Grupo',
        items: []
      };
    }
    acc[groupId].items.push(item);
    return acc;
  }, {});
};
