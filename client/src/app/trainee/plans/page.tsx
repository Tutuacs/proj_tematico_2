"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useFetch from "@/utils/useFetch";

type Plan = {
  id: string;
  title: string;
  description?: string;
  from: string;
  to: string;
  traineeId: string;
  trainerId: string;
  createdAt: string;
  updatedAt: string;
};

export default function TraineePlansPage() {
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();
  
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "expired">("all");

  useEffect(() => {
    const fetchPlans = async () => {
      if (!session?.profile?.id) return;

      try {
        setLoading(true);
        const res = await fetchWithAuth(`/plan`);
        if (res?.status === 200) {
          const plansData = Array.isArray(res.data) ? res.data : [];
          setPlans(plansData);
        }
      } catch (error) {
        console.error("Failed to fetch plans", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [session?.profile?.id]);

  const isPlanActive = (plan: Plan) => {
    const now = new Date();
    const from = new Date(plan.from);
    const to = new Date(plan.to);
    return now >= from && now <= to;
  };

  const filteredPlans = plans.filter((plan) => {
    if (filter === "active") return isPlanActive(plan);
    if (filter === "expired") return !isPlanActive(plan);
    return true;
  });

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meus Planos de Treino</h1>
          <p className="mt-2 text-gray-600">
            Visualize todos os seus planos de treino atribuídos
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "active"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Ativos
          </button>
          <button
            onClick={() => setFilter("expired")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === "expired"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Histórico
          </button>
        </div>

        {/* Plans List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-10 bg-gray-200 rounded mt-4"></div>
              </div>
            ))}
          </div>
        ) : filteredPlans.length === 0 ? (
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum plano encontrado
            </h3>
            <p className="text-gray-600">
              {filter === "active"
                ? "Você não possui planos ativos no momento"
                : filter === "expired"
                ? "Você não possui planos históricos"
                : "Nenhum plano foi atribuído a você ainda"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => {
              const isActive = isPlanActive(plan);
              const fromDate = new Date(plan.from).toLocaleDateString("pt-BR");
              const toDate = new Date(plan.to).toLocaleDateString("pt-BR");

              return (
                <div
                  key={plan.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-6"
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {isActive ? "Ativo" : "Expirado"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {plan.title}
                  </h3>

                  {/* Description */}
                  {plan.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {plan.description}
                    </p>
                  )}

                  {/* Period */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg
                      className="w-4 h-4 mr-2"
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
                      {fromDate} → {toDate}
                    </span>
                  </div>

                  {/* View Details Button */}
                  <Link
                    href={`/trainee/plans/${plan.id}`}
                    className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
