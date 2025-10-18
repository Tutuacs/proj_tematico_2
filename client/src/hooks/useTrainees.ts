// # lista/busca/paginação (com Axios + fallback mock)

"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import type { Trainee } from "@/lib/types";

type UseTraineesParams = {
  q?: string;      // query de busca
  page?: number;   // paginação futura
  pageSize?: number;
};

export function useTrainees({ q = "", page = 1, pageSize = 20 }: UseTraineesParams) {
  const [data, setData] = useState<Trainee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;

    (async () => {
      try {
        // tente o backend real aqui (troque URL quando existir)
        const res = await api.get<Trainee[]>("/trainees", { params: { q, page, pageSize } });
        if (!canceled) setData(res.data);
      } catch {
        // fallback para o mock local
        const res = await fetch("/api/mock/trainees");
        const json: Trainee[] = await res.json();
        if (!canceled) setData(json);
      } finally {
        if (!canceled) setLoading(false);
      }
    })();

    return () => { canceled = true; };
  }, [q, page, pageSize]);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    if (!text) return data;
    return data.filter(t =>
      t.name.toLowerCase().includes(text) ||
      t.email.toLowerCase().includes(text) ||
      t.enrollment.toLowerCase().includes(text)
    );
  }, [data, q]);

  return { trainees: filtered, loading };
}