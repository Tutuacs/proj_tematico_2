// para gerenciar atividades

'use client';

import { useMemo, useState } from 'react';
import type { ActivityRow } from '@/components/pages/activities/ActivityTable';
import type { ActivityPayload } from '@/components/pages/activities/ActivityFormModal';
// import axios from 'axios';
// import { Backend_URL } from '@/lib/Constants';

const seed: ActivityRow[] = [
  {
    id: 'a1',
    name: 'Supino reto',
    type: 'FORCA',
    description: 'Peito — barra',
    weight: 40,
    sets: 3,
    reps: 10,
    duration: null,
  },
  {
    id: 'a2',
    name: 'Corrida leve',
    type: 'CARDIO',
    description: 'Esteira',
    weight: null,
    sets: null,
    reps: null,
    duration: 20,
  },
  {
    id: 'a3',
    name: 'Alongamento posterior',
    type: 'MOBILIDADE',
    description: 'Isquiotibiais',
    weight: null,
    sets: 2,
    reps: 30,
    duration: null,
  },
];

export function useActivities() {
  const [activities, setActivities] = useState<ActivityRow[]>(seed);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return activities;
    return activities.filter((a) => a.name.toLowerCase().includes(q));
  }, [activities, search]);

  async function createActivity(payload: ActivityPayload) {
    // Exemplo real:
    // const { data } = await axios.post(`${Backend_URL}/activity`, payload);
    // setActivities(prev => [data, ...prev]);

    const newRow: ActivityRow = {
      id: crypto.randomUUID(),
      name: payload.name,
      type: payload.type,
      description: payload.description,
      weight: payload.weight ?? null,
      sets: payload.sets ?? null,
      reps: payload.reps ?? null,
      duration: payload.duration ?? null,
    };
    setActivities((prev) => [newRow, ...prev]);
  }

  async function updateActivity(id: string, payload: ActivityPayload) {
    // Exemplo real:
    // const { data } = await axios.patch(`${Backend_URL}/activity/${id}`, payload);
    // setActivities(prev => prev.map(a => a.id === id ? data : a));

    setActivities((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              name: payload.name,
              type: payload.type,
              description: payload.description,
              weight: payload.weight ?? null,
              sets: payload.sets ?? null,
              reps: payload.reps ?? null,
              duration: payload.duration ?? null,
            }
          : a
      )
    );
  }

  return {
    activities,
    filtered,
    search,
    setSearch,
    createActivity,
    updateActivity,
  };
}