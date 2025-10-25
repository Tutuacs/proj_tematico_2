"use client";

import { useEffect, useState } from "react";
import type { Trainee } from "@/lib/types";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";

type Props = {
  open: boolean;
  onClose: () => void;
  trainee: Trainee | null;
  trainerName: string;
  trainerId: string;
  onSave?: (payload: { name: string; email: string; trainerId: string }) => void;
};

export default function TraineeEditModal({ 
  open, 
  onClose, 
  trainee, 
  trainerName, 
  trainerId,
  onSave 
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (open && trainee) {
      setName(trainee.name ?? "");
      setEmail(trainee.email ?? "");
    }
  }, [open, trainee]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!trainee) return;
    // Remove o 'id' do payload - ele já está na URL
    onSave?.({ name, email, trainerId });
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

        {/* Instrutor (Read-only) */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Instrutor</label>
          <Input 
            placeholder="Instrutor não definido" 
            value={trainerName || "Sem instrutor atribuído"} 
            disabled 
            className="bg-slate-100 cursor-not-allowed text-slate-600"
          />
          <p className="text-xs text-slate-500 mt-1">
            O instrutor é definido automaticamente pelo usuário logado
          </p>
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