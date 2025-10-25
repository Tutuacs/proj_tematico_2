"use client";

import { useEffect, useState, useCallback } from "react";
import useFetch from "@/utils/useFetch";
import type { Trainee } from "@/lib/types";

type UseTraineesParams = {
  q?: string;
};

export function useTrainees({ q = "" }: UseTraineesParams) {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const { fetchWithAuth } = useFetch();

  useEffect(() => {
    let canceled = false;

    const fetchTrainees = async () => {
      try {
        setLoading(true);
        const res = await fetchWithAuth("/profile");
        
        if (res?.status === 200) {
          const data = res.data;
          
          // Se for um array, usar diretamente
          if (Array.isArray(data)) {
            if (!canceled) setTrainees(data);
          } 
          // Se for um objeto com lista de profiles
          else if (data.profiles) {
            if (!canceled) setTrainees(data.profiles);
          }
          // Se for um único profile (trainee logado)
          else if (data.id) {
            if (!canceled) setTrainees([data]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch trainees", error);
        if (!canceled) setTrainees([]);
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    fetchTrainees();

    return () => {
      canceled = true;
    };
  }, [refetchTrigger]);

  // Função para forçar recarregar os dados
  const refetch = useCallback(() => {
    setRefetchTrigger(prev => prev + 1);
  }, []);

  // Filtro local baseado na query
  const filtered = trainees.filter((t) => {
    if (!q) return true;
    const text = q.trim().toLowerCase();
    return (
      t.name?.toLowerCase().includes(text) ||
      t.email?.toLowerCase().includes(text) ||
      t.id?.toLowerCase().includes(text)
    );
  });

  return { trainees: filtered, loading, refetch };
}