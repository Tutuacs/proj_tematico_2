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
  Trainee?: {
    name: string;
    email: string;
  };
  Train?: any[];
};

export default function TrainerPlansPage() {
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "expired">("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      if (!session?.profile?.id) return;

      try {
        setLoading(true);
        // Buscar todos os planos criados pelo trainer
        const res = await fetchWithAuth(`/plan`);
        if (res?.status === 200) {
          const plansData = Array.isArray(res.data) ? res.data : [];
          // Filter plans created by this trainer
          const trainerPlans = plansData.filter(
            (p: Plan) => p.trainerId === session.profile.id
          );
          setPlans(trainerPlans);
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

  const handleDeletePlan = async (planId: string) => {
    if (!confirm("Tem certeza que deseja excluir este plano?")) return;

    try {
      const res = await fetchWithAuth(`/plan/${planId}`, {
        method: "DELETE",
      });

      if (res?.status === 200 || res?.status === 204) {
        setPlans(plans.filter((p) => p.id !== planId));
        alert("Plano excluído com sucesso!");
      }
    } catch (error) {
      console.error("Failed to delete plan", error);
      alert("Erro ao excluir plano. Tente novamente.");
    }
  };

  const filteredPlans = plans
    .filter((plan) => {
      if (filter === "active") return isPlanActive(plan);
      if (filter === "expired") return !isPlanActive(plan);
      return true;
    })
    .filter((plan) => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        plan.title.toLowerCase().includes(search) ||
        plan.Trainee?.name.toLowerCase().includes(search) ||
        plan.Trainee?.email.toLowerCase().includes(search)
      );
    });

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Planos</h1>
            <p className="mt-2 text-gray-600">
              Todos os planos de treino criados por você
            </p>
          </div>
          <Link
            href="/trainer/plans/new"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg"
          >
            + Criar Novo Plano
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar por título ou aluno..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === "active"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Ativos
              </button>
              <button
                onClick={() => setFilter("expired")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === "expired"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Expirados
              </button>
            </div>
          </div>
        </div>

        {/* Plans Table/List */}
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="animate-pulse p-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
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
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "Tente uma busca diferente"
                : "Você ainda não criou nenhum plano de treino"}
            </p>
            {!searchTerm && (
              <Link
                href="/trainer/plans/new"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition"
              >
                Criar Primeiro Plano
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aluno
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Período
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlans.map((plan) => {
                  const isActive = isPlanActive(plan);
                  const fromDate = new Date(plan.from).toLocaleDateString("pt-BR");
                  const toDate = new Date(plan.to).toLocaleDateString("pt-BR");

                  return (
                    <tr key={plan.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {plan.title}
                        </div>
                        {plan.description && (
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {plan.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {plan.Trainee?.name || "N/A"}
                        </div>
                        {plan.Trainee?.email && (
                          <div className="text-sm text-gray-500">
                            {plan.Trainee.email}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {fromDate} → {toDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {isActive ? "Ativo" : "Expirado"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/trainee/plans/${plan.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Ver detalhes"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </Link>
                          <Link
                            href={`/trainer/plans/${plan.id}/edit`}
                            className="text-blue-600 hover:text-blue-900"
                            title="Editar"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDeletePlan(plan.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Excluir"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary */}
        {!loading && plans.length > 0 && (
          <div className="mt-4 text-sm text-gray-600 text-center">
            Mostrando {filteredPlans.length} de {plans.length} planos
          </div>
        )}
      </div>
    </main>
  );
}
