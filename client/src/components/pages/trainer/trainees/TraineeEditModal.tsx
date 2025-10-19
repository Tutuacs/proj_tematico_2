"use client";

import { useEffect, useState } from "react";
import type { Trainee } from "@/lib/types";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";

type Props = {
  open: boolean;
  onClose: () => void;
  trainee: Trainee | null;
  onSave?: (payload: { id: string; name: string; email: string; trainerName: string }) => void;
};

export default function TraineeEditModal({ open, onClose, trainee, onSave }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [trainerName, setTrainerName] = useState("");

  useEffect(() => {
    if (open && trainee) {
      setName(trainee.name ?? "");
      setEmail(trainee.email ?? "");
      setTrainerName(trainee.trainerName ?? "");
    }
  }, [open, trainee]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!trainee) return;
    onSave?.({ id: trainee.id, name, email, trainerName });
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Editar Aluno">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome Completo */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Nome Completo</label>
          <Input placeholder="Value" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <Input type="email" placeholder="Value" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        {/* Instrutor */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Instrutor</label>
          <Input placeholder="Value" value={trainerName} onChange={(e) => setTrainerName(e.target.value)} />
        </div>

        {/* Botão Salvar */}
        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-slate-900 py-2.5 text-white hover:bg-slate-800"
        >
          Salvar
        </button>
      </form>
    </Modal>
  );
}