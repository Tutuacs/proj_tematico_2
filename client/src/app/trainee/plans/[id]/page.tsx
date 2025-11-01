"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import useFetch from "@/utils/useFetch";

type Activity = {
  id: string;
  name: string;
  type: "CARDIO" | "STRENGTH" | "FLEXIBILITY" | "BALANCE";
  description?: string;
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
  description?: string;
  from: string;
  to: string;
  traineeId: string;
  trainerId: string;
  Trainer?: {
    name: string;
  };
  Train?: Train[];
};

const WEEKDAYS = {
  SUNDAY: "Domingo",
  MONDAY: "Segunda-feira",
  TUESDAY: "Terça-feira",
  WEDNESDAY: "Quarta-feira",
  THURSDAY: "Quinta-feira",
  FRIDAY: "Sexta-feira",
  SATURDAY: "Sábado",
};

const ACTIVITY_TYPES = {
  CARDIO: "Cardio",
  STRENGTH: "Força",
  FLEXIBILITY: "Flexibilidade",
  BALANCE: "Equilíbrio",
};

export default function PlanDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { fetchWithAuth } = useFetch();
  const planId = params?.id as string;

  const [plan, setPlan] = useState<Plan | null>(null);
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<keyof typeof WEEKDAYS | null>(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!planId) return;

      try {
        setLoading(true);

        // Buscar detalhes do plano
        const planRes = await fetchWithAuth(`/plan/${planId}`);
        if (planRes?.status === 200) {
          setPlan(planRes.data);
        }

        // Buscar treinos do plano
        const trainsRes = await fetchWithAuth(`/train?planId=${planId}`);
        if (trainsRes?.status === 200) {
          const trainsData = Array.isArray(trainsRes.data) ? trainsRes.data : [];
          setTrains(trainsData);

          // Selecionar o primeiro dia com treinos
          if (trainsData.length > 0 && !selectedDay) {
            setSelectedDay(trainsData[0].weekDay);
          }
        }
      } catch (error) {
        console.error("Failed to fetch plan details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanDetails();
  }, [planId]);

  const trainsByDay = trains.reduce((acc, train) => {
    if (!acc[train.weekDay]) {
      acc[train.weekDay] = [];
    }
    acc[train.weekDay].push(train);
    return acc;
  }, {} as Record<string, Train[]>);

  const uniqueDays = Object.keys(trainsByDay) as (keyof typeof WEEKDAYS)[];

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!plan) {
    return (
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Plano não encontrado
            </h2>
            <p className="text-gray-600 mb-6">
              O plano que você está procurando não existe ou foi removido.
            </p>
            <Link
              href="/trainee/plans"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition"
            >
              Voltar aos Planos
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isPlanActive = () => {
    const now = new Date();
    const from = new Date(plan.from);
    const to = new Date(plan.to);
    return now >= from && now <= to;
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center text-sm text-gray-600">
          <Link href="/trainee/dashboard" className="hover:text-indigo-600">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <Link href="/trainee/plans" className="hover:text-indigo-600">
            Planos
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{plan.title}</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {plan.title}
              </h1>
              {plan.description && (
                <p className="text-gray-600">{plan.description}</p>
              )}
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isPlanActive()
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {isPlanActive() ? "Ativo" : "Expirado"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 mr-2 text-gray-400"
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
                Período: {new Date(plan.from).toLocaleDateString("pt-BR")} →{" "}
                {new Date(plan.to).toLocaleDateString("pt-BR")}
              </span>
            </div>

            {plan.Trainer && (
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-2 text-gray-400"
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
                <span>Instrutor: {plan.Trainer.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Weekday Tabs */}
        {uniqueDays.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Treinos da Semana
            </h2>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {uniqueDays.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                    selectedDay === day
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {WEEKDAYS[day]}
                </button>
              ))}
            </div>

            {/* Activities List */}
            {selectedDay && trainsByDay[selectedDay] && (
              <div className="space-y-4">
                {trainsByDay[selectedDay].map((train, index) => (
                  <div
                    key={train.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm">
                            {index + 1}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {train.activity.name}
                          </h3>
                        </div>

                        {train.activity.description && (
                          <p className="text-sm text-gray-600 mb-3 ml-11">
                            {train.activity.description}
                          </p>
                        )}

                        <div className="ml-11 flex flex-wrap gap-4 text-sm">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                            {ACTIVITY_TYPES[train.activity.type]}
                          </span>

                          {train.series && (
                            <span className="text-gray-600">
                              <strong>Séries:</strong> {train.series}
                            </span>
                          )}

                          {train.repetitions && (
                            <span className="text-gray-600">
                              <strong>Repetições:</strong> {train.repetitions}
                            </span>
                          )}

                          {train.weight && (
                            <span className="text-gray-600">
                              <strong>Peso:</strong> {train.weight} kg
                            </span>
                          )}

                          {train.duration && (
                            <span className="text-gray-600">
                              <strong>Duração:</strong> {train.duration} min
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {uniqueDays.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum treino cadastrado
            </h3>
            <p className="text-gray-600">
              Este plano ainda não possui treinos cadastrados.
            </p>
          </div>
        )}

        {/* Action Button */}
        {isPlanActive() && uniqueDays.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Link
              href={`/trainee/train/new?planId=${plan.id}`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition shadow-md hover:shadow-lg"
            >
              Registrar Treino de Hoje
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
