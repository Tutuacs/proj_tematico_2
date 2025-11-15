"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import useFetch from "@/utils/useFetch";

type Profile = {
  id: string;
  name: string;
  email: string;
  role: number;
};

type Activity = {
  id?: string;
  name: string;
  ACTIVITY_TYPE: "CARDIO" | "STRENGTH" | "FLEXIBILITY" | "BALANCE";
  description?: string;
  weight?: number;
  reps?: number;
  sets?: number;
  duration?: number;
};

type Plan = {
  id: string;
  traineeId: string;
  trainerId: string;
  title: string;
  description?: string;
  from: string;
  to: string;
  Trainee: Profile;
  Trainer: Profile;
  Activity: Activity[];
};

const getActivityTypeLabel = (type: string) => {
  const types: Record<string, string> = {
    CARDIO: "Cardio",
    STRENGTH: "Força",
    FLEXIBILITY: "Flexibilidade",
    BALANCE: "Equilíbrio",
  };
  return types[type] || type;
};

const getActivityTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    CARDIO: "bg-red-100 text-red-700",
    STRENGTH: "bg-blue-100 text-blue-700",
    FLEXIBILITY: "bg-green-100 text-green-700",
    BALANCE: "bg-purple-100 text-purple-700",
  };
  return colors[type] || "bg-gray-100 text-gray-700";
};

export default function AdminViewPlanPage() {
  const router = useRouter();
  const params = useParams();
  const planId = params.id as string;
  const { fetchWithAuth } = useFetch();

  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        const res = await fetchWithAuth(`/plan/${planId}`, { showToast: false });

        if (res?.status === 200 && res.data) {
          setPlan(res.data);
        } else {
          alert("Erro ao carregar plano");
          router.push("/admin/plans");
        }
      } catch (error) {
        console.error("Failed to fetch plan", error);
        alert("Erro ao carregar plano");
        router.push("/admin/plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [planId]);

  const handleDeletePlan = async () => {
    if (!confirm("Tem certeza que deseja excluir este plano?")) return;

    try {
      const res = await fetchWithAuth(`/plan/${planId}`, {
        method: "DELETE",
      });

      if (res?.status === 200 || res?.status === 204) {
        alert("Plano excluído com sucesso!");
        router.push("/admin/plans");
      } else {
        alert("Erro ao excluir plano");
      }
    } catch (error) {
      console.error("Failed to delete plan", error);
      alert("Erro ao excluir plano");
    }
  };

  const isPlanActive = () => {
    if (!plan) return false;
    const now = new Date();
    const from = new Date(plan.from);
    const to = new Date(plan.to);
    return now >= from && now <= to;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  if (loading) {
    return (
      <main>
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!plan) {
    return (
      <main className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-600">Plano não encontrado</p>
          <Link
            href="/admin/plans"
            className="text-indigo-600 hover:text-indigo-700 mt-2 inline-block"
          >
            Voltar para planos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/plans"
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
            Voltar para planos
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{plan.title}</h1>
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    isPlanActive()
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isPlanActive() ? "Ativo" : "Expirado"}
                </span>
              </div>
              {plan.description && (
                <p className="text-gray-600 mb-2">{plan.description}</p>
              )}
              <p className="text-sm text-gray-500">
                Período: {formatDate(plan.from)} até {formatDate(plan.to)}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/trainer/plans/${planId}/edit`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                Editar Plano
              </Link>
              <button
                onClick={handleDeletePlan}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>

        {/* Trainee and Trainer Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Trainee */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Aluno</h2>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-500">Nome</p>
                <p className="text-lg font-semibold text-gray-900">{plan.Trainee.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{plan.Trainee.email}</p>
              </div>
              <Link
                href={`/admin/users/${plan.traineeId}`}
                className="inline-block text-sm text-indigo-600 hover:text-indigo-800 font-medium mt-2"
              >
                Ver perfil do aluno →
              </Link>
            </div>
          </div>

          {/* Trainer */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Instrutor</h2>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-500">Nome</p>
                <p className="text-lg font-semibold text-gray-900">{plan.Trainer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{plan.Trainer.email}</p>
              </div>
              <Link
                href={`/admin/users/${plan.trainerId}`}
                className="inline-block text-sm text-indigo-600 hover:text-indigo-800 font-medium mt-2"
              >
                Ver perfil do instrutor →
              </Link>
            </div>
          </div>
        </div>

        {/* Activities */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Atividades do Plano ({plan.Activity.length})
          </h2>

          {plan.Activity.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              Nenhuma atividade cadastrada neste plano
            </p>
          ) : (
            <div className="grid gap-4">
              {plan.Activity.map((activity, index) => (
                <div
                  key={activity.id || index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {activity.name}
                      </h3>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${getActivityTypeColor(
                          activity.ACTIVITY_TYPE
                        )}`}
                      >
                        {getActivityTypeLabel(activity.ACTIVITY_TYPE)}
                      </span>
                    </div>
                  </div>

                  {activity.description && (
                    <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {activity.weight !== undefined && activity.weight > 0 && (
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Peso</p>
                        <p className="font-semibold text-gray-900">{activity.weight} kg</p>
                      </div>
                    )}
                    {activity.reps !== undefined && activity.reps > 0 && (
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Repetições</p>
                        <p className="font-semibold text-gray-900">{activity.reps}</p>
                      </div>
                    )}
                    {activity.sets !== undefined && activity.sets > 0 && (
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Séries</p>
                        <p className="font-semibold text-gray-900">{activity.sets}</p>
                      </div>
                    )}
                    {activity.duration !== undefined && activity.duration > 0 && (
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Duração</p>
                        <p className="font-semibold text-gray-900">{activity.duration} min</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
