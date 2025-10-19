'use client';

import { useState } from 'react';
import ActivityTable from '@/components/pages/trainer/activities/ActivityTable';
import ActivityFormModal from '@/components/pages/trainer/activities/ActivityFormModal';
import { useActivities } from '@/hooks/useActivities';

export default function ActivitiesPage() {
  const {
    activities,
    filtered,
    search,
    setSearch,
    createActivity,
    updateActivity,
  } = useActivities();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingActivity = activities.find(a => a.id === editingId) || null;

  return (
    <div className="h-full overflow-auto">
      <div className="mx-auto max-w-6xl p-6">
        {/* Cabeçalho + busca */}
        <div className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="mb-6 flex items-center justify-between gap-6">
            <h1 className="text-2xl font-semibold text-slate-900">
              Atividades registradas
            </h1>

            <div className="relative w-full max-w-md">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nome de atividade"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 pl-10 text-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-500"
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          {/* Tabela */}
          <ActivityTable
            data={filtered}
            onEdit={(id) => {
              setEditingId(id);
              setOpen(true);
            }}
          />
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => {
          setEditingId(null);
          setOpen(true);
        }}
        className="fixed bottom-6 right-6 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg hover:bg-slate-800"
      >
        Cadastrar Atividade
      </button>

      {/* Modal Cadastrar/Editar */}
      <ActivityFormModal
        open={open}
        onClose={() => setOpen(false)}
        initialData={editingActivity ?? undefined}
        onSubmit={(payload) => {
          if (editingActivity) {
            updateActivity(editingActivity.id, payload);
          } else {
            createActivity(payload);
          }
          setOpen(false);
        }}
      />
    </div>
  );
}