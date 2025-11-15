"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useFetch from "@/utils/useFetch";

type Plan = {
  id: string;
  title: string;
  description?: string;
  from: string;
  to: string;
};

type Report = {
  id: string;
  weight: number;
  height: number;
  imc: number;
  createdAt: string;
};

type Exercise = {
  id: string;
  weight?: number;
  reps?: number;
  sets?: number;
  duration?: number;
  description?: string;
  Activity?: {
    id: string;
    name: string;
    ACTIVITY_TYPE: string;
  };
  Train?: {
    id: string;
    weekDay: string;
    from: string;
    to: string;
  };
};

type Train = {
  id: string;
  weekDay: string;
  from: string;
  to: string;
  Exercise?: Exercise[];
  Plan?: {
    id: string;
    title: string;
  };
};

export default function TraineeDashboardPage() {
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{ name: string } | null>(null);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [latestReport, setLatestReport] = useState<Report | null>(null);
  const [recentTrains, setRecentTrains] = useState<Train[]>([]);
  const [totalPlans, setTotalPlans] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!session?.profile?.id) return;

      try {
        setLoading(true);

        // Buscar dados do usuário
        const userRes = await fetchWithAuth(`/profile/${session.profile.id}`);
        if (userRes?.status === 200) {
          setUserData({ name: userRes.data.name || "Aluno" });
        }

        // Buscar planos
        const plansRes = await fetchWithAuth(`/plan`);
        if (plansRes?.status === 200) {
          const plans = Array.isArray(plansRes.data) ? plansRes.data : [];
          setTotalPlans(plans.length);

          // Encontrar plano ativo
          const now = new Date();
          const activePlan = plans.find((plan: Plan) => {
            const from = new Date(plan.from);
            const to = new Date(plan.to);
            return now >= from && now <= to;
          });

          if (activePlan) {
            setCurrentPlan(activePlan);
          } else if (plans.length > 0) {
            // Se não houver plano ativo, pegar o mais recente
            setCurrentPlan(plans[0]);
          }
        }

        // Buscar avaliações físicas
        const reportsRes = await fetchWithAuth(`/report`);
        if (reportsRes?.status === 200) {
          const reports = Array.isArray(reportsRes.data) ? reportsRes.data : [];
          if (reports.length > 0) {
            setLatestReport(reports[0]);
          }
        }

        // Buscar histórico de exercícios
        const exercisesRes = await fetchWithAuth(`/exercise`);
        if (exercisesRes?.status === 200) {
          const exercises = Array.isArray(exercisesRes.data) ? exercisesRes.data : [];
          setTotalWorkouts(exercises.length);
        }

        // Buscar treinos recentes
        const trainsRes = await fetchWithAuth(`/train`);
        if (trainsRes?.status === 200) {
          const trains = Array.isArray(trainsRes.data) ? trainsRes.data : [];
          // Ordenar por data (mais recentes primeiro) e pegar os 5 primeiros
          const sortedTrains = trains.sort((a: Train, b: Train) => {
            return new Date(b.from).getTime() - new Date(a.from).getTime();
          });
          setRecentTrains(sortedTrains.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [session?.profile?.id]);

  const isPlanActive = (plan: Plan) => {
    const now = new Date();
    const from = new Date(plan.from);
    const to = new Date(plan.to);
    return now >= from && now <= to;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  const getWeekDayLabel = (weekDay: string) => {
    switch (weekDay) {
      case "SUNDAY":
        return "Domingo";
      case "MONDAY":
        return "Segunda";
      case "TUESDAY":
        return "Terça";
      case "WEDNESDAY":
        return "Quarta";
      case "THURSDAY":
        return "Quinta";
      case "FRIDAY":
        return "Sexta";
      case "SATURDAY":
        return "Sábado";
      default:
        return weekDay;
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "CARDIO":
        return "bg-blue-100 text-blue-700";
      case "STRENGTH":
        return "bg-red-100 text-red-700";
      case "FLEXIBILITY":
        return "bg-green-100 text-green-700";
      case "BALANCE":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case "CARDIO":
        return "Cardio";
      case "STRENGTH":
        return "Força";
      case "FLEXIBILITY":
        return "Flexibilidade";
      case "BALANCE":
        return "Equilíbrio";
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-20 bg-white rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="h-32 bg-white rounded-lg"></div>
              <div className="h-32 bg-white rounded-lg"></div>
              <div className="h-32 bg-white rounded-lg"></div>
              <div className="h-32 bg-white rounded-lg"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen overflow-y-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header com saudação */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Olá, {userData?.name || session?.profile?.name || "Aluno"}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Bem-vindo ao seu painel de treinos
              </p>
            </div>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Plano Atual */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Plano Atual</p>
              {currentPlan ? (
                <>
                  <p className="text-2xl font-bold text-gray-900 mt-1 truncate">
                    {currentPlan.title}
                  </p>
                  <span
                    className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${
                      isPlanActive(currentPlan)
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {isPlanActive(currentPlan) ? "Ativo" : "Inativo"}
                  </span>
                </>
              ) : (
                <p className="text-lg text-gray-400 mt-1">Nenhum plano</p>
              )}
            </div>
          </div>

          {/* Total de Planos */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Total de Planos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalPlans}</p>
              <p className="text-xs text-gray-500 mt-1">Recebidos</p>
            </div>
          </div>

          {/* Total de Treinos */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Treinos Realizados</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalWorkouts}</p>
              <p className="text-xs text-gray-500 mt-1">Exercícios completos</p>
            </div>
          </div>

          {/* Última Avaliação */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Última Avaliação</p>
              {latestReport ? (
                <>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    IMC: {latestReport.imc.toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {latestReport.weight}kg • {latestReport.height}cm
                  </p>
                </>
              ) : (
                <p className="text-lg text-gray-400 mt-1">Sem avaliação</p>
              )}
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => router.push("/trainee/train/new")}
            className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg p-6 transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold">Registrar Treino</h3>
                <p className="text-sm text-white/80 mt-1">Do dia</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => router.push("/trainee/plans")}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl shadow-lg p-6 transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold">Meus Planos</h3>
                <p className="text-sm text-white/80 mt-1">Ver planos de treino</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => router.push("/trainee/history")}
            className="bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl shadow-lg p-6 transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold">Histórico</h3>
                <p className="text-sm text-white/80 mt-1">Treinos e avaliações</p>
              </div>
            </div>
          </button>
        </div>

        {/* Atividades Recentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
          {/* Treinos Recentes */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col max-h-[400px]">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Treinos Recentes</h2>
              <button
                onClick={() => router.push("/trainee/history")}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Ver todos →
              </button>
            </div>

            <div className="overflow-y-auto flex-1">{recentTrains.length > 0 ? (
              <div className="space-y-3">
                {recentTrains.map((train) => (
                  <div
                    key={train.id}
                    className="group relative bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => router.push("/trainee/history")}
                  >
                    {/* Header com dia da semana */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {getWeekDayLabel(train.weekDay)}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {formatDate(train.from)}
                          </p>
                        </div>
                      </div>
                      
                      {/* Badge de quantidade de exercícios */}
                      {train.Exercise && train.Exercise.length > 0 && (
                        <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          <span className="text-sm font-bold">
                            {train.Exercise.length}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Nome do plano */}
                    <div className="bg-gray-100 rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                        Plano de Treino
                      </p>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {train.Plan?.title || "Plano não especificado"}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg
                  className="w-12 h-12 text-gray-400 mx-auto mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <p className="text-gray-500">Nenhum treino registrado ainda</p>
                <button
                  onClick={() => router.push("/trainee/train/new")}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Registrar primeiro treino →
                </button>
              </div>
            )}
            </div>
          </div>

          {/* Informações do Plano Atual */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col max-h-[400px]">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Plano de Treino</h2>
              <button
                onClick={() => router.push("/trainee/plans")}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Ver detalhes →
              </button>
            </div>

            <div className="overflow-y-auto flex-1">{currentPlan ? (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {currentPlan.title}
                      </h3>
                      {currentPlan.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {currentPlan.description}
                        </p>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        isPlanActive(currentPlan)
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {isPlanActive(currentPlan) ? "Ativo" : "Inativo"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        {new Date(currentPlan.from).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <span className="text-gray-400">→</span>
                    <div className="flex items-center gap-1 text-gray-600">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        {new Date(currentPlan.to).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => router.push(`/trainee/plans/${currentPlan.id}`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition"
                  >
                    Ver Plano Completo
                  </button>
                  <button
                    onClick={() => router.push("/trainee/train/new")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition"
                  >
                    Iniciar Treino
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <svg
                  className="w-12 h-12 text-gray-400 mx-auto mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-500">Nenhum plano ativo no momento</p>
                <p className="text-sm text-gray-400 mt-1">
                  Aguarde seu treinador criar um plano para você
                </p>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
