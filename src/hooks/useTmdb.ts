import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

export function useTmdb<T>(url: string, params: Record<string, unknown>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setData(null);
    setError(null);
    setLoading(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            ...params,
          },
          signal: controller.signal,
        });
        // Only update if this request is still the latest
        if (controller.signal.aborted) return;
        setData(response.data);
      } catch (err) {
        if (!axios.isCancel(err) && !controller.signal.aborted) {
          setError(err);
          console.error(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, JSON.stringify(params)]); 

  return { data, loading, error };
}