import { useState, useEffect } from 'react';
import { apiFetch, ApiError } from '../services/api';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export default function useFetch<T>(path: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    apiFetch<T>(path)
      .then((json) => setData(json))
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err.message : 'No se pudo conectar con la API');
      })
      .finally(() => setLoading(false));
  }, [path]);

  return { data, loading, error };
}
