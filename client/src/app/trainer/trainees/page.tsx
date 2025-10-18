"use client";

import { useState } from "react";
import TraineeSearchBar from "@/components/pages/trainer/trainees/TraineeSearchBar";
import TraineeTable from "@/components/pages/trainer/trainees/TraineeTable";
import { useTrainees } from "@/hooks/useTrainees";
// Se quiser abrir o modal real:
// import Modal from "@/components/ui/Modal";
// import TraineeModalForm from "@/components/pages/trainees/TraineeModalForm";

export default function TrainerTraineesPage() {
  const [query, setQuery] = useState("");
  const { trainees, loading } = useTrainees({ q: query });

  // const [open, setOpen] = useState(false);
  // const [current, setCurrent] = useState<any>(null);

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* card container para ficar igual ao mock (branco, arredondado) */}
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
              // setCurrent(t);
              // setOpen(true);
              alert(`Editar: ${t.name}`);
            }}
          />
        )}
      </div>

      {/* Exemplo do modal (quando quiser ligar) */}
      {/* <Modal open={open} onClose={() => setOpen(false)} title="Editar aluno">
        <TraineeModalForm trainee={current} onClose={() => setOpen(false)} />
      </Modal> */}
    </div>
  );
}