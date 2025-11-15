"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useFetch from "@/utils/useFetch";

type Activity = {
  id: string;
  name: string;
  ACTIVITY_TYPE: "CARDIO" | "STRENGTH" | "FLEXIBILITY" | "BALANCE";
  description?: string;
  weight?: number;
  reps?: number;
  sets?: number;
  duration?: number;
  planId: string;
};

type Plan = {
  id: string;
  title: string;
  from: string;
  to: string;
  Activity?: Activity[];
};

type ExerciseInput = {
  activityId: string;
  weight?: number;
  reps?: number;
  sets?: number;
  duration?: number;
  description?: string; // Campo correto do schema
};

const WEEKDAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

const WEEKDAY_NAMES: Record<typeof WEEKDAYS[number], string> = {
  SUNDAY: "Domingo",
  MONDAY: "Segunda",
  TUESDAY: "Terça",
  WEDNESDAY: "Quarta",
  THURSDAY: "Quinta",
  FRIDAY: "Sexta",
  SATURDAY: "Sábado",
};

const ACTIVITY_TYPE_LABELS: Record<string, string> = {
  CARDIO: "Cardio",
  STRENGTH: "Força",
  FLEXIBILITY: "Flexibilidade",
  BALANCE: "Equilíbrio",
};

export default function RegisterWorkoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const planIdParam = searchParams?.get("planId");

  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedWeekDay, setSelectedWeekDay] = useState<typeof WEEKDAYS[number]>("MONDAY"); // Segunda-feira por padrão
  const [activities, setActivities] = useState<Activity[]>([]);
  const [exercises, setExercises] = useState<Map<string, ExerciseInput>>(new Map());
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trainId, setTrainId] = useState<string>("");

  // Get current day of week
  const getCurrentWeekDay = () => {
    const dayIndex = new Date().getDay();
    return WEEKDAYS[dayIndex];
  };

  useEffect(() => {
    const fetchActivePlans = async () => {
      if (!session?.profile?.id) return;

      try {
        setLoading(true);
        const res = await fetchWithAuth(`/plan`);
        if (res?.status === 200) {
          const plansData = Array.isArray(res.data) ? res.data : [];
          // Filter active plans
          const activePlans = plansData.filter((plan: Plan) => {
            const now = new Date();
            const from = new Date(plan.from);
            const to = new Date(plan.to);
            return now >= from && now <= to;
          });
          setPlans(activePlans);

          // If planId is in URL, select it
          if (planIdParam && activePlans.find((p: Plan) => p.id === planIdParam)) {
            setSelectedPlanId(planIdParam);
          } else if (activePlans.length === 1) {
            // Auto-select if only one plan
            setSelectedPlanId(activePlans[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch plans", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePlans();
  }, [session?.profile?.id, planIdParam]);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!selectedPlanId) {
        setActivities([]);
        return;
      }

      try {
        const res = await fetchWithAuth(`/activity?planId=${selectedPlanId}`);
        if (res?.status === 200) {
          const activitiesData = Array.isArray(res.data) ? res.data : [];
          setActivities(activitiesData);
        }
      } catch (error) {
        console.error("Failed to fetch activities", error);
      }
    };

    fetchActivities();
  }, [selectedPlanId]);

  const handleExerciseChange = (
    activityId: string,
    field: keyof ExerciseInput,
    value: string | number
  ) => {
    const current = exercises.get(activityId) || {
      activityId,
    };

    const updated = { ...current, [field]: value };
    const newMap = new Map(exercises);
    newMap.set(activityId, updated);
    setExercises(newMap);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one exercise is filled
    const exercisesToSubmit = Array.from(exercises.values()).filter(
      (ex) => ex.reps || ex.sets || ex.weight || ex.duration
    );

    if (exercisesToSubmit.length === 0) {
      alert("Por favor, preencha pelo menos um exercício antes de registrar o treino.");
      return;
    }

    setSubmitting(true);

    try {
      // First, create the Train (workout session)
      const trainData = {
        weekDay: selectedWeekDay,
        planId: selectedPlanId,
        from: new Date().toISOString(),
        to: new Date().toISOString(),
      };

      const trainRes = await fetchWithAuth(`/train`, {
        method: "POST",
        body: JSON.stringify(trainData),
      });

      if (trainRes?.status !== 201) {
        throw new Error("Failed to create train");
      }

      const createdTrainId = trainRes.data.id;

      // Then submit each exercise for this train
      // Convert duration from minutes to seconds before sending to API
      const promises = exercisesToSubmit.map((exercise) =>
        fetchWithAuth(`/exercise`, {
          method: "POST",
          body: JSON.stringify({
            ...exercise,
            duration: exercise.duration ? exercise.duration * 60 : undefined, // Convert minutes to seconds
            trainId: createdTrainId,
          }),
        })
      );

      const results = await Promise.all(promises);
      
      // Check if all exercises were created successfully
      const failed = results.filter(res => res?.status !== 201);
      if (failed.length > 0) {
        throw new Error(`Failed to create ${failed.length} exercise(s)`);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/trainee/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Failed to register workout", error);
      alert("Erro ao registrar treino. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main>
        <div className="max-w-4xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-6"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="flex items-center justify-center py-12">
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-12 text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Treino Registrado!
          </h2>
          <p className="text-gray-600 mb-6">
            Seu treino foi registrado com sucesso. Redirecionando para o histórico...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="max-w-4xl mx-auto p-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-sm text-gray-600">
          <Link href="/trainee/dashboard" className="hover:text-indigo-600">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Registrar Treino</span>
        </nav>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Registrar Treino</h1>
          <p className="mt-2 text-gray-600">
            Preencha os dados do seu treino realizado
          </p>
        </div>

        {plans.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum plano ativo
            </h3>
            <p className="text-gray-600 mb-6">
              Você não possui planos de treino ativos no momento.
            </p>
            <Link
              href="/trainee/plans"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition"
            >
              Ver Planos
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Plan Selection */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecione o Plano
              </label>
              <select
                value={selectedPlanId}
                onChange={(e) => setSelectedPlanId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Escolha um plano...</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Weekday Selection - Keep for compatibility */}
            {selectedPlanId && activities.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dia da Semana do Treino
                </label>
                <div className="flex flex-wrap gap-2">
                  {WEEKDAYS.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedWeekDay(day)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        selectedWeekDay === day
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {WEEKDAY_NAMES[day]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Activities Message */}
            {selectedPlanId && activities.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-yellow-800 mb-1">
                      Nenhuma atividade cadastrada neste plano
                    </h3>
                    <p className="text-sm text-yellow-700">
                      Este plano ainda não possui atividades cadastradas pelo seu instrutor. Entre em contato com ele para adicionar os exercícios ao seu plano.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Activities List */}
            {selectedWeekDay && activities.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Exercícios do Treino
                </h2>

                <div className="space-y-6">
                  {activities.map((activity, index) => (
                    <div
                      key={activity.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {activity.name}
                          </h3>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            {ACTIVITY_TYPE_LABELS[activity.ACTIVITY_TYPE]}
                          </span>
                        </div>
                      </div>

                      {activity.description && (
                        <p className="text-sm text-gray-600 mb-4 ml-11">
                          {activity.description}
                        </p>
                      )}

                      <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activity.sets !== undefined && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Séries Realizadas
                              {activity.sets > 0 && (
                                <span className="text-gray-500 ml-1">
                                  (planejado: {activity.sets})
                                </span>
                              )}
                            </label>
                            <input
                              type="number"
                              min="1"
                              step="1"
                              onChange={(e) =>
                                handleExerciseChange(
                                  activity.id,
                                  "sets",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="1"
                            />
                          </div>
                        )}

                        {activity.reps !== undefined && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Repetições Realizadas
                              {activity.reps > 0 && (
                                <span className="text-gray-500 ml-1">
                                  (planejado: {activity.reps})
                                </span>
                              )}
                            </label>
                            <input
                              type="number"
                              min="1"
                              step="1"
                              onChange={(e) =>
                                handleExerciseChange(
                                  activity.id,
                                  "reps",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="1"
                            />
                          </div>
                        )}

                        {activity.weight !== undefined && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Carga Utilizada (kg/m/cm)
                              {activity.weight > 0 && (
                                <span className="text-gray-500 ml-1">
                                  (sugerido: {activity.weight})
                                </span>
                              )}
                            </label>
                            <input
                              type="number"
                              min="0.5"
                              step="0.5"
                              onChange={(e) =>
                                handleExerciseChange(
                                  activity.id,
                                  "weight",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="0"
                            />
                          </div>
                        )}

                        {activity.duration !== undefined && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Duração (minutos)
                              {activity.duration > 0 && (
                                <span className="text-gray-500 ml-1">
                                  (planejado: {activity.duration})
                                </span>
                              )}
                            </label>
                            <input
                              type="number"
                              min="1"
                              step="1"
                              onChange={(e) =>
                                handleExerciseChange(
                                  activity.id,
                                  "duration",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="0"
                            />
                          </div>
                        )}

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Observações (opcional)
                          </label>
                          <textarea
                            rows={2}
                            onChange={(e) =>
                              handleExerciseChange(
                                activity.id,
                                "description",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Como foi o exercício? Sentiu alguma dificuldade?"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            {activities.length > 0 && (
              <div className="flex gap-4">
                <Link
                  href="/trainee/dashboard"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition text-center"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                  {submitting ? "Salvando..." : "Registrar Treino"}
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
