"use client";

import { useState } from "react";
import { useTrainees } from "@/hooks/useTrainees";
import TraineeSearchBar from "@/components/pages/trainer/trainees/TraineeSearchBar";
import TraineeTable from "@/components/pages/trainer/trainees/TraineeTable";
import TraineeEditModal from "@/components/pages/trainer/trainees/TraineeEditModal";
import type { Trainee } from "@/lib/types";

export default function TrainerTraineesPage() {
  const [query, setQuery] = useState("");
  const { trainees, loading } = useTrainees({ q: query });

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Trainee | null>(null);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <TraineeSearchBar
          value={query}
          onChange={setQuery}
          onSubmit={() => {}}
          title="Alunos registrados"
        />

        <div className="mt-6" />

        {loading ? (
          <div className="py-20 text-center text-slate-500">Carregando...</div>
        ) : (
          <TraineeTable
            data={trainees}
            onEdit={(t) => {
              setCurrent(t);
              setOpen(true);
            }}
          />
        )}
      </div>

      <TraineeEditModal
        open={open}
        onClose={() => setOpen(false)}
        trainee={current}
        onSave={(payload) => {
          // MOCK: aqui você pode chamar API quando existir
          console.log("Salvar (mock):", payload);
        }}
      />
    </div>
  );
}