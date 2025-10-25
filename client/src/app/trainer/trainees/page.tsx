"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTrainees } from "@/hooks/useTrainees";
import useFetch from "@/utils/useFetch";
import TraineeSearchBar from "@/components/pages/trainer/trainees/TraineeSearchBar";
import TraineeTable from "@/components/pages/trainer/trainees/TraineeTable";
import TraineeEditModal from "@/components/pages/trainer/trainees/TraineeEditModal";
import type { Trainee } from "@/lib/types";

export default function TrainerTraineesPage() {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const { trainees, loading, refetch } = useTrainees({ q: query });
  const { fetchWithAuth } = useFetch("Aluno atualizado com sucesso");

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Trainee | null>(null);
  const [trainerData, setTrainerData] = useState<{ id: string; name: string } | null>(null);

  // Debug session
  useEffect(() => {
    if (session?.profile) {
      console.log("Session profile:", session.profile);
    }
  }, [session]);

  // Buscar dados do trainer logado
  useEffect(() => {
    const fetchTrainerData = async () => {
      if (!session?.profile?.id) return;

      try {
        const res = await fetchWithAuth(`/profile/${session.profile.id}`);
        if (res?.status === 200) {
          console.log("Trainer data from API:", res.data);
          setTrainerData({
            id: res.data.id,
            name: res.data.name,
          });
        }
      } catch (error) {
        console.error("Failed to fetch trainer data", error);
      }
    };

    fetchTrainerData();
  }, [session?.profile?.id]);

  const handleSave = async (payload: { name: string; email: string; trainerId: string }) => {
    if (!current?.id) return;
    console.log("Saving trainee with payload:", payload);

    try {
      const res = await fetchWithAuth(`/profile/${current.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res?.status === 200) {
        setOpen(false);
        // Recarrega a lista sem reload da página
        refetch();
      }
    } catch (error) {
      console.error("Failed to update trainee", error);
    }
  };

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
        trainerName={trainerData?.name || "Carregando..."}
        trainerId={trainerData?.id || ""}
        onSave={handleSave}
      />
    </div>
  );
}