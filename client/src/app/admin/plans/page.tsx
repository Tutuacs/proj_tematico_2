"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
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
  Trainee?: {
    name: string;
    email: string;
  };
  Trainer?: {
    name: string;
    email: string;
  };
  Train?: any[];
};

export default function AdminPlansPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const filterByTraineeId = searchParams.get("traineeId");
  const filterByTrainerId = searchParams.get("trainerId");
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
      // Filter by traineeId if provided in URL
      if (filterByTraineeId && plan.traineeId !== filterByTraineeId) {
        return false;
      }
      // Filter by trainerId if provided in URL
      if (filterByTrainerId && plan.trainerId !== filterByTrainerId) {
        return false;
      }
      
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
        plan.Trainee?.email.toLowerCase().includes(search) ||
        plan.Trainer?.name.toLowerCase().includes(search) ||
        plan.Trainer?.email.toLowerCase().includes(search)
      );
    });

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleDateString("pt-BR");
    } catch {
      return "N/A";
    }
  };

  return (
    <main>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Planos de Treino</h1>
            <p className="mt-2 text-gray-600">
              Visualização administrativa de todos os planos do sistema
            </p>
            {(filterByTraineeId || filterByTrainerId) && filteredPlans.length > 0 && (
              <p className="mt-1 text-sm text-purple-600">
                ✓ Mostrando planos de: {filteredPlans[0]?.Trainee?.name || filteredPlans[0]?.Trainer?.name || "Usuário selecionado"}
              </p>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar por título, aluno ou instrutor..."
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
                Todos ({plans.length})
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === "active"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Ativos ({plans.filter((p) => isPlanActive(p)).length})
              </button>
              <button
                onClick={() => setFilter("expired")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === "expired"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Expirados ({plans.filter((p) => !isPlanActive(p)).length})
              </button>
            </div>
          </div>
        </div>

        {/* Plans Table */}
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum plano encontrado</h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Tente ajustar os filtros ou buscar por outro termo."
                : "Ainda não há planos cadastrados no sistema."}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plano
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aluno
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Instrutor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Período
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPlans.map((plan) => {
                    const isActive = isPlanActive(plan);
                    return (
                      <tr key={plan.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{plan.title}</div>
                          {plan.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {plan.description}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {plan.Trainee?.name || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">{plan.Trainee?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {plan.Trainer?.name || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">{plan.Trainer?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(plan.from)}
                          </div>
                          <div className="text-sm text-gray-500">até {formatDate(plan.to)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {isActive ? "Ativo" : "Expirado"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/admin/plans/${plan.id}`}
                              className="text-blue-600 hover:text-blue-900"
                              title="Ver detalhes do plano"
                            >
                              Ver Plano
                            </Link>
                            <Link
                              href={`/admin/users/${plan.traineeId}`}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Ver perfil do aluno"
                            >
                              Ver Aluno
                            </Link>
                            <button
                              onClick={() => handleDeletePlan(plan.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Excluir plano"
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Summary */}
        {!loading && filteredPlans.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            Mostrando {filteredPlans.length} de {plans.length} planos
          </div>
        )}
      </div>
    </main>
  );
}
