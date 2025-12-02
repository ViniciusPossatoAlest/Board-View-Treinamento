// hooks/useMondayContext.js - Context API (Seção 5.2)
import { useState, useEffect, useCallback } from 'react';
import monday from '../services/mondayService';

export const useMondayContext = () => {
  const [context, setContext] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContext = async () => {
      try {
        const res = await monday.get('context');
        setContext(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContext();

    // Listen for context changes
    const unsubscribe = monday.listen('context', (res) => {
      setContext(res.data);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { context, loading, error };
};

export const useMondaySettings = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    monday.get('settings').then((res) => {
      setSettings(res.data);
    });

    const unsubscribe = monday.listen('settings', (res) => {
      setSettings(res.data);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return settings;
};
