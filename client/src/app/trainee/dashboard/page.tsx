"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import GreetingBox from "@/components/pages/dashboard/GreetingBox";
import DashboardCard from "@/components/pages/dashboard/DashboardCard";
import useFetch from "@/utils/useFetch";

type PlanData = {
  id: string;
  title: string;
  from: string;
  to: string;
};

export default function TraineeDashboardPage() {
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();
  
  const [userData, setUserData] = useState<{ name: string } | null>(null);
  const [currentPlan, setCurrentPlan] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(true);

  // Buscar dados do aluno logado
  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.profile?.id) return;

      try {
        const res = await fetchWithAuth(`/profile/${session.profile.id}`);
        if (res?.status === 200) {
          setUserData({
            name: res.data.name || "Aluno",
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [session?.profile?.id]);

  // Buscar plano atual do aluno
  useEffect(() => {
    const fetchCurrentPlan = async () => {
      if (!session?.profile?.id) return;

      try {
        setLoading(true);
        // Assumindo que existe um endpoint para buscar planos do aluno
        const res = await fetchWithAuth(`/plan`);
        if (res?.status === 200) {
          const plans = Array.isArray(res.data) ? res.data : [];
          // Pegar o plano mais recente ou ativo
          if (plans.length > 0) {
            const plan = plans[0]; // Assumindo que vem ordenado
            setCurrentPlan({
              id: plan.id,
              title: plan.title || "Sem título",
              from: new Date(plan.from).toLocaleDateString('pt-BR'),
              to: new Date(plan.to).toLocaleDateString('pt-BR'),
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch current plan", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentPlan();
  }, [session?.profile?.id]);

  const formatPeriod = (from: string, to: string) => {
    return `${from} → ${to}`;
  };

  return (
    <div className="h-full">
      <div className="mx-auto max-w-6xl h-full p-6 flex flex-col justify-center gap-12 md:gap-16">
        {/* Greeting centralizado */}
        <GreetingBox
          name={userData?.name || session?.profile?.name || "Aluno"}
          lines={
            loading ? (
              [<span key="loading">Carregando plano...</span>]
            ) : currentPlan ? (
              [
                <>
                  Plano atual: <strong>{currentPlan.title}</strong>
                </>,
                <>
                  Período: {formatPeriod(currentPlan.from, currentPlan.to)}
                </>,
              ]
            ) : (
              [<span key="no-plan">Nenhum plano ativo no momento</span>]
            )
          }
        />

        {/* Ações – 3 colunas, cards com 120px de altura */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DashboardCard
            title="Registrar Treino do Dia"
            variant="dark"
            size="lg"
            actionHeightClass="h-[120px]"
            href="/trainee/train/new"
          />
          <DashboardCard
            title="Visualizar Plano de Treino"
            variant="dark"
            size="lg"
            actionHeightClass="h-[120px]"
            href="/trainee/plans"
          />
          <DashboardCard
            title="Histórico de Treinos e Avaliações"
            variant="dark"
            size="lg"
            actionHeightClass="h-[120px]"
            href="/trainee/history"
          />
        </section>
      </div>
    </div>
  );
}
