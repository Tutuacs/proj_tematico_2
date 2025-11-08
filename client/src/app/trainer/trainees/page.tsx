"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTrainees } from "@/hooks/useTrainees";
import useFetch from "@/utils/useFetch";
import TraineeSearchBar from "@/components/pages/trainer/trainees/TraineeSearchBar";
import TraineeTable from "@/components/pages/trainer/trainees/TraineeTable";
import TraineeEditModal from "@/components/pages/trainer/trainees/TraineeEditModal";
import type { Trainee } from "@/lib/types";

export default function TrainerTraineesPage() {
  const { data: session } = useSession();
  const router = useRouter();
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
    if (!session?.profile?.id) {
      console.error("No trainer session found");
      return;
    }

    // Garantir que o trainerId seja sempre o do instrutor logado
    const finalPayload = {
      ...payload,
      trainerId: session.profile.id,
    };

    console.log("Saving trainee with payload:", finalPayload);

    try {
      const res = await fetchWithAuth(`/profile/${current.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPayload),
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

  const handleCreatePlan = (trainee: Trainee) => {
    // Redireciona para a página de criar plano com o traineeId pré-selecionado
    router.push(`/trainer/plans/new?traineeId=${trainee.id}`);
  };

  const handleCreateReport = (trainee: Trainee) => {
    // Redireciona para a página de criar avaliação física com o traineeId pré-selecionado
    router.push(`/trainer/reports/new?traineeId=${trainee.id}`);
  };

  const handleViewHistory = (trainee: Trainee) => {
    // Redireciona para a lista de planos filtrada pelo aluno
    router.push(`/trainer/plans?traineeId=${trainee.id}`);
  };

  const handleViewReports = (trainee: Trainee) => {
    // Redireciona para a lista de avaliações físicas filtrada pelo aluno
    router.push(`/trainer/reports?traineeId=${trainee.id}`);
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
            onCreatePlan={handleCreatePlan}
            onCreateReport={handleCreateReport}
            onViewHistory={handleViewHistory}
            onViewReports={handleViewReports}
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