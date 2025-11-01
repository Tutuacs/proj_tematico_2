"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useFetch from "@/utils/useFetch";

type Activity = {
  id: string;
  name: string;
  type: "CARDIO" | "STRENGTH" | "FLEXIBILITY" | "BALANCE";
};

type Train = {
  id: string;
  planId: string;
  weekDay: "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
  activity: Activity;
  series?: number;
  repetitions?: number;
  weight?: number;
  duration?: number;
};

type Plan = {
  id: string;
  title: string;
  from: string;
  to: string;
  Train?: Train[];
};

type ExerciseInput = {
  trainId: string;
  activityId: string;
  series?: number;
  repetitions?: number;
  weight?: number;
  duration?: number;
  observations?: string;
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

const WEEKDAY_NAMES = {
  SUNDAY: "Domingo",
  MONDAY: "Segunda-feira",
  TUESDAY: "Terça-feira",
  WEDNESDAY: "Quarta-feira",
  THURSDAY: "Quinta-feira",
  FRIDAY: "Sexta-feira",
  SATURDAY: "Sábado",
};

export default function RegisterWorkoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const planIdParam = searchParams?.get("planId");

  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [selectedWeekDay, setSelectedWeekDay] = useState<string>("");
  const [trains, setTrains] = useState<Train[]>([]);
  const [exercises, setExercises] = useState<Map<string, ExerciseInput>>(new Map());
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

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
    const fetchTrains = async () => {
      if (!selectedPlanId) return;

      try {
        const res = await fetchWithAuth(`/train?planId=${selectedPlanId}`);
        if (res?.status === 200) {
          const trainsData = Array.isArray(res.data) ? res.data : [];
          setTrains(trainsData);

          // Auto-select today's weekday if available
          const today = getCurrentWeekDay();
          if (trainsData.some((t: Train) => t.weekDay === today)) {
            setSelectedWeekDay(today);
          } else if (trainsData.length > 0) {
            setSelectedWeekDay(trainsData[0].weekDay);
          }
        }
      } catch (error) {
        console.error("Failed to fetch trains", error);
      }
    };

    fetchTrains();
  }, [selectedPlanId]);

  const todayTrains = trains.filter((t) => t.weekDay === selectedWeekDay);

  const handleExerciseChange = (
    trainId: string,
    field: keyof ExerciseInput,
    value: string | number
  ) => {
    const train = trains.find((t) => t.id === trainId);
    if (!train) return;

    const current = exercises.get(trainId) || {
      trainId,
      activityId: train.activity.id,
    };

    const updated = { ...current, [field]: value };
    const newMap = new Map(exercises);
    newMap.set(trainId, updated);
    setExercises(newMap);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const exercisesToSubmit = Array.from(exercises.values()).filter(
        (ex) => ex.series || ex.repetitions || ex.weight || ex.duration
      );

      if (exercisesToSubmit.length === 0) {
        alert("Por favor, preencha pelo menos um exercício.");
        setSubmitting(false);
        return;
      }

      // Submit each exercise
      const promises = exercisesToSubmit.map((exercise) =>
        fetchWithAuth(`/exercise`, {
          method: "POST",
          body: JSON.stringify(exercise),
        })
      );

      await Promise.all(promises);

      setSuccess(true);
      setTimeout(() => {
        router.push("/trainee/history/workouts");
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
      <main className="min-h-screen bg-gray-100">
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
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
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
    <main className="min-h-screen bg-gray-100">
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

            {/* Weekday Selection */}
            {selectedPlanId && trains.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dia da Semana
                </label>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(trains.map((t) => t.weekDay))).map((day) => (
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
                      {WEEKDAY_NAMES[day as keyof typeof WEEKDAY_NAMES]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Exercises List */}
            {selectedWeekDay && todayTrains.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Exercícios do Treino
                </h2>

                <div className="space-y-6">
                  {todayTrains.map((train, index) => (
                    <div
                      key={train.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm">
                          {index + 1}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {train.activity.name}
                        </h3>
                      </div>

                      <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {train.series && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Séries Realizadas
                              <span className="text-gray-500 ml-1">
                                (planejado: {train.series})
                              </span>
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              onChange={(e) =>
                                handleExerciseChange(
                                  train.id,
                                  "series",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="0"
                            />
                          </div>
                        )}

                        {train.repetitions && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Repetições Realizadas
                              <span className="text-gray-500 ml-1">
                                (planejado: {train.repetitions})
                              </span>
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              onChange={(e) =>
                                handleExerciseChange(
                                  train.id,
                                  "repetitions",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="0"
                            />
                          </div>
                        )}

                        {train.weight !== undefined && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Peso Utilizado (kg)
                              {train.weight > 0 && (
                                <span className="text-gray-500 ml-1">
                                  (sugerido: {train.weight})
                                </span>
                              )}
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.5"
                              onChange={(e) =>
                                handleExerciseChange(
                                  train.id,
                                  "weight",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="0"
                            />
                          </div>
                        )}

                        {train.duration && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Duração (minutos)
                              <span className="text-gray-500 ml-1">
                                (planejado: {train.duration})
                              </span>
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              onChange={(e) =>
                                handleExerciseChange(
                                  train.id,
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
                                train.id,
                                "observations",
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
            {todayTrains.length > 0 && (
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
