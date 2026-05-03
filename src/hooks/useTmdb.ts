import axios from 'axios';
import { useEffect, useState } from 'react';

export function useTmdb<T>(url: string, params: Record<string, unknown>) {
  const [data, setData] = useState<T | null>(null);
  
  // Serialize params so the effect only re-runs when values actually change
  const serializedParams = JSON.stringify(params);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url, {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            ...JSON.parse(serializedParams),
          },
          signal: controller.signal,
        });
        setData(response.data); // ← also fix the markdown link here
      } catch (error) {
        if (axios.isCancel(error)) return; // ignore aborts
        console.error(error);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [url, serializedParams]); // ✅ stable dependency

  return { data };
}