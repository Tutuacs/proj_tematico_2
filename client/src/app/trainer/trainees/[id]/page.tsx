"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useFetch from "@/utils/useFetch";

type Profile = {
  id: string;
  name: string;
  email: string;
  role: number;
};

type Plan = {
  id: string;
  title: string;
  description?: string;
  from: string;
  to: string;
  isPlanActive?: boolean;
};

type Report = {
  id: string;
  height: number;
  weight: number;
  imc: number;
  observations?: string;
  createdAt: string;
};

type Exercise = {
  id: string;
  createdAt: string;
  series?: number;
  repetitions?: number;
  weight?: number;
  duration?: number;
  observations?: string;
  activity: {
    id: string;
    name: string;
    type: string;
  };
  train: {
    id: string;
    weekDay: string;
    plan: {
      id: string;
      title: string;
    };
  };
};

const TABS = [
  { id: "plans", label: "Planos de Treino" },
  { id: "assessments", label: "Avaliações Físicas" },
  { id: "history", label: "Histórico de Treinos" },
];

export default function TraineeProfilePage() {
  const params = useParams();
  const router = useRouter();
  const traineeId = params.id as string;
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("plans");

  // Trainee Data
  const [trainee, setTrainee] = useState<Profile | null>(null);

  // Plans Tab
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState(false);

  // Assessments Tab
  const [assessments, setAssessments] = useState<Report[]>([]);
  const [assessmentsLoading, setAssessmentsLoading] = useState(false);

  // History Tab
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Fetch trainee profile
  useEffect(() => {
    const fetchTrainee = async () => {
      try {
        setLoading(true);
        const res = await fetchWithAuth(`/profile/${traineeId}`);
        if (res?.status === 200) {
          setTrainee(res.data);
        } else {
          alert("Aluno não encontrado");
          router.push("/trainer/dashboard");
        }
      } catch (error) {
        console.error("Failed to fetch trainee", error);
        alert("Erro ao carregar perfil do aluno");
        router.push("/trainer/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainee();
  }, [traineeId]);

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === "plans" && plans.length === 0) {
      fetchPlans();
    } else if (activeTab === "assessments" && assessments.length === 0) {
      fetchAssessments();
    } else if (activeTab === "history" && exercises.length === 0) {
      fetchHistory();
    }
  }, [activeTab]);

  const fetchPlans = async () => {
    try {
      setPlansLoading(true);
      const res = await fetchWithAuth(`/plan?traineeId=${traineeId}`);
      if (res?.status === 200) {
        const plansData = Array.isArray(res.data) ? res.data : [];
        const plansWithStatus = plansData.map((plan) => ({
          ...plan,
          isPlanActive: new Date(plan.to) >= new Date(),
        }));
        setPlans(plansWithStatus);
      }
    } catch (error) {
      console.error("Failed to fetch plans", error);
    } finally {
      setPlansLoading(false);
    }
  };

  const fetchAssessments = async () => {
    try {
      setAssessmentsLoading(true);
      const res = await fetchWithAuth(`/report?profileId=${traineeId}`);
      if (res?.status === 200) {
        const reportsData = Array.isArray(res.data) ? res.data : [];
        setAssessments(reportsData);
      }
    } catch (error) {
      console.error("Failed to fetch assessments", error);
    } finally {
      setAssessmentsLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const res = await fetchWithAuth(`/exercise?traineeId=${traineeId}`);
      if (res?.status === 200) {
        const exercisesData = Array.isArray(res.data) ? res.data : [];
        setExercises(exercisesData);
      }
    } catch (error) {
      console.error("Failed to fetch history", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const getIMCCategory = (imc: number) => {
    if (imc < 18.5) return { label: "Abaixo do peso", color: "text-yellow-600" };
    if (imc < 25) return { label: "Peso normal", color: "text-green-600" };
    if (imc < 30) return { label: "Sobrepeso", color: "text-orange-600" };
    return { label: "Obesidade", color: "text-red-600" };
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!trainee) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Aluno não encontrado</p>
          <Link
            href="/trainer/dashboard"
            className="text-indigo-600 hover:text-indigo-700 mt-2 inline-block"
          >
            Voltar ao dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/trainer/dashboard"
            className="text-indigo-600 hover:text-indigo-700 text-sm mb-2 inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{trainee.name}</h1>
              <p className="text-gray-600 mt-1">{trainee.email}</p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/trainer/plans/new?traineeId=${traineeId}`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition text-sm"
              >
                + Novo Plano
              </Link>
              <Link
                href={`/trainer/reports/new?traineeId=${traineeId}`}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition text-sm"
              >
                + Nova Avaliação
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                    activeTab === tab.id
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {/* Plans Tab */}
          {activeTab === "plans" && (
            <div>
              {plansLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
                    >
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : plans.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
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
                  <p className="text-gray-600 mb-4">Nenhum plano criado ainda</p>
                  <Link
                    href={`/trainer/plans/new?traineeId=${traineeId}`}
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition"
                  >
                    Criar Primeiro Plano
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {plan.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            plan.isPlanActive
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {plan.isPlanActive ? "Ativo" : "Expirado"}
                        </span>
                      </div>

                      {plan.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {plan.description}
                        </p>
                      )}

                      <div className="text-xs text-gray-500 mb-4">
                        {new Date(plan.from).toLocaleDateString("pt-BR")} →{" "}
                        {new Date(plan.to).toLocaleDateString("pt-BR")}
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/trainer/plans/${plan.id}`}
                          className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition text-sm"
                        >
                          Ver Detalhes
                        </Link>
                        {plan.isPlanActive && (
                          <Link
                            href={`/trainer/plans/${plan.id}/edit`}
                            className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition text-sm"
                          >
                            Editar
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Assessments Tab */}
          {activeTab === "assessments" && (
            <div>
              {assessmentsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
                    >
                      <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : assessments.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-600 mb-4">Nenhuma avaliação realizada ainda</p>
                  <Link
                    href={`/trainer/reports/new?traineeId=${traineeId}`}
                    className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition"
                  >
                    Registrar Primeira Avaliação
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assessments.map((assessment, index) => {
                    const imcCategory = getIMCCategory(assessment.imc);
                    const isLatest = index === 0;

                    return (
                      <div
                        key={assessment.id}
                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Avaliação Física
                          </h3>
                          {isLatest && (
                            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                              Mais Recente
                            </span>
                          )}
                        </div>

                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Altura:</span>
                            <span className="font-medium text-gray-900">
                              {assessment.height} cm
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">Peso:</span>
                            <span className="font-medium text-gray-900">
                              {assessment.weight} kg
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">IMC:</span>
                            <span className={`font-medium ${imcCategory.color}`}>
                              {assessment.imc.toFixed(1)} - {imcCategory.label}
                            </span>
                          </div>

                          <div className="flex justify-between text-xs text-gray-500 pt-3 border-t">
                            <span>Data:</span>
                            <span>
                              {new Date(assessment.createdAt).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        </div>

                        {assessment.observations && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {assessment.observations}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div>
              {historyLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
                    >
                      <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : exercises.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
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
                  <p className="text-gray-600">Nenhum treino registrado ainda</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {exercises
                    .reduce((groups: { date: string; exercises: Exercise[] }[], exercise) => {
                      const date = new Date(exercise.createdAt).toLocaleDateString("pt-BR");
                      const existing = groups.find((g) => g.date === date);
                      if (existing) {
                        existing.exercises.push(exercise);
                      } else {
                        groups.push({ date, exercises: [exercise] });
                      }
                      return groups;
                    }, [])
                    .map((group) => (
                      <div
                        key={group.date}
                        className="bg-white rounded-xl border border-gray-200 p-6"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {group.date}
                        </h3>

                        <div className="space-y-3">
                          {group.exercises.map((exercise) => (
                            <div
                              key={exercise.id}
                              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                            >
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 mb-1">
                                  {exercise.activity.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {exercise.train.plan.title}
                                </div>
                                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-2">
                                  {exercise.series && <span>Séries: {exercise.series}</span>}
                                  {exercise.repetitions && (
                                    <span>Reps: {exercise.repetitions}</span>
                                  )}
                                  {exercise.weight && <span>Peso: {exercise.weight} kg</span>}
                                  {exercise.duration && (
                                    <span>Duração: {exercise.duration} min</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
