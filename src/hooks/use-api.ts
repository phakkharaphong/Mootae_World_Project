'use client';
import api from '@/utils/axios-instance';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

export const useGetAPI = <T>(url: string, params?: Record<string, unknown>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, serError] = useState<Error | null>(null);

  //params
  const paramsRef = useRef<Record<string, unknown>>({});
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    paramsRef.current = params ?? {};
  }, [params]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const response = await api.get<T>(url, {
        params: paramsRef.current,
        signal: controller.signal,
      });
      setData(response.data);
      serError(null);
    } catch (error) {
      // if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') {
      //     return;
      // }
      serError(error as Error);
      console.error('GET request error:', error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  return [data, loading, fetchData, error] as const;
};
