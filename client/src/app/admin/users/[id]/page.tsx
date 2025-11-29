"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import useFetch from "@/utils/useFetch";
import { useSession } from "next-auth/react";

type Profile = {
  id: string;
  name: string;
  email: string;
  role: number;
  createdAt: string;
};

type Plan = {
  id: string;
  title: string;
  from: string;
  to: string;
  isPlanActive?: boolean;
};

type Report = {
  id: string;
  height: number;
  weight: number;
  imc: number;
  createdAt: string;
};

export default function AdminUserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Profile | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "0",
  });

  // Check if current user is admin
  useEffect(() => {
    if (session && session.profile?.role !== 2) {
      alert("Acesso negado. Apenas administradores podem acessar esta página.");
      router.push("/");
    }
  }, [session, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Fetch user profile (no toast for initial load)
        const userRes = await fetchWithAuth(`/profile/${userId}`, { showToast: false });
        if (userRes?.status !== 200) {
          alert("Usuário não encontrado");
          router.push("/admin/users");
          return;
        }

        const userData: Profile = userRes.data;
        setUser(userData);
        setFormData({
          name: userData.name,
          email: userData.email,
          role: userData.role.toString(),
        });

        // Fetch user-specific data based on role (no toast)
        if (userData.role === 0) {
          // TRAINEE - fetch plans and reports
          const [plansRes, reportsRes] = await Promise.all([
            fetchWithAuth(`/plan?traineeId=${userId}`, { showToast: false }),
            fetchWithAuth(`/report?profileId=${userId}`, { showToast: false }),
          ]);

          if (plansRes?.status === 200) {
            const plansData = Array.isArray(plansRes.data) ? plansRes.data : [];
            const plansWithStatus = plansData.map((plan) => ({
              ...plan,
              isPlanActive: new Date(plan.to) >= new Date(),
            }));
            setPlans(plansWithStatus);
          }

          if (reportsRes?.status === 200) {
            const reportsData = Array.isArray(reportsRes.data) ? reportsRes.data : [];
            setReports(reportsData);
          }
        } else if (userData.role === 1) {
          // TRAINER - fetch created plans
          const plansRes = await fetchWithAuth(`/plan?trainerId=${userId}`, { showToast: false });
          if (plansRes?.status === 200) {
            const plansData = Array.isArray(plansRes.data) ? plansRes.data : [];
            setPlans(plansData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        alert("Erro ao carregar dados do usuário");
        router.push("/admin/users");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const updateData = {
        name: formData.name,
        email: formData.email,
        role: parseInt(formData.role),
      };

      console.log("Enviando atualização:", updateData);

      // Update with toast enabled
      const res = await fetchWithAuth(`/profile/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(updateData),
        showToast: true, // Show toast for update action
      });

      console.log("Resposta da atualização:", res);

      if (res?.status === 200) {
        // Update local state with the response data
        const updatedUser = res.data;
        const oldRole = user?.role;
        const newRole = updatedUser.role;
        
        setUser(updatedUser);
        setFormData({
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role.toString(),
        });
        setEditing(false);
        
        // If role changed, reload related data
        if (oldRole !== newRole) {
          // Reset current data
          setPlans([]);
          setReports([]);
          
          // Fetch new role-specific data (no toast for background fetches)
          try {
            if (newRole === 0) {
              // TRAINEE - fetch plans and reports
              const [plansRes, reportsRes] = await Promise.all([
                fetchWithAuth(`/plan?traineeId=${userId}`, { showToast: false }),
                fetchWithAuth(`/report?profileId=${userId}`, { showToast: false }),
              ]);

              if (plansRes?.status === 200) {
                const plansData = Array.isArray(plansRes.data) ? plansRes.data : [];
                const plansWithStatus = plansData.map((plan) => ({
                  ...plan,
                  isPlanActive: new Date(plan.to) >= new Date(),
                }));
                setPlans(plansWithStatus);
              }

              if (reportsRes?.status === 200) {
                const reportsData = Array.isArray(reportsRes.data) ? reportsRes.data : [];
                setReports(reportsData);
              }
            } else if (newRole === 1) {
              // TRAINER - fetch created plans
              const plansRes = await fetchWithAuth(`/plan?trainerId=${userId}`, { showToast: false });
              if (plansRes?.status === 200) {
                const plansData = Array.isArray(plansRes.data) ? plansRes.data : [];
                setPlans(plansData);
              }
            }
          } catch (error) {
            console.error("Failed to reload role-specific data", error);
          }
        }
      } else {
        const errorMsg = res?.data?.message || "Erro ao atualizar usuário";
        console.error("Update failed:", errorMsg);
      }
    } catch (error) {
      console.error("Failed to update user", error);
      alert("Erro ao atualizar usuário");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!confirm(`Tem certeza que deseja excluir o usuário ${user?.name}?`)) {
      return;
    }

    try {
      const res = await fetchWithAuth(`/profile/${userId}`, {
        method: "DELETE",
      });

      if (res?.status === 200) {
        alert("Usuário excluído com sucesso!");
        router.push("/admin/users");
      } else {
        alert("Erro ao excluir usuário");
      }
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("Erro ao excluir usuário");
    }
  };

  const getRoleLabel = (role: number) => {
    switch (role) {
      case 0:
        return "Aluno";
      case 1:
        return "Instrutor";
      case 2:
        return "Admin";
      default:
        return "Desconhecido";
    }
  };

  const getRoleBadgeColor = (role: number) => {
    switch (role) {
      case 0:
        return "bg-blue-100 text-blue-700";
      case 1:
        return "bg-purple-100 text-purple-700";
      case 2:
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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

  if (!user) {
    return (
      <main className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-600">Usuário não encontrado</p>
          <Link
            href="/admin/users"
            className="text-indigo-600 hover:text-indigo-700 mt-2 inline-block"
          >
            Voltar para usuários
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
            href="/admin/users"
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

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <span className={`px-3 py-1 rounded text-sm font-medium ${getRoleBadgeColor(user.role)}`}>
                  {getRoleLabel(user.role)}
                </span>
              </div>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Cadastrado em {new Date(user.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>

            <div className="flex gap-3">
              {!editing && (
                <>
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    Editar
                  </button>
                  {session?.profile?.id !== userId && (
                    <button
                      onClick={handleDeleteUser}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition"
                    >
                      Excluir
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {editing && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Editar Usuário</h2>

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Usuário
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    disabled={session?.profile?.id === userId}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    title={session?.profile?.id === userId ? "Você não pode alterar sua própria role" : ""}
                  >
                    <option value="0">Aluno</option>
                    <option value="1">Instrutor</option>
                    <option value="2">Administrador</option>
                  </select>
                  {session?.profile?.id === userId && (
                    <p className="text-sm text-amber-600 mt-1">
                       Você não pode alterar sua própria role.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      name: user.name,
                      email: user.email,
                      role: user.role.toString(),
                    });
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2 px-6 rounded-lg transition"
                >
                  {submitting ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Role-Specific Content */}
        {user.role === 0 && (
          <div className="space-y-6">
            {/* Plans */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Planos de Treino ({plans.length})
                </h2>
                {plans.length > 0 && (
                  <Link
                    href={`/admin/plans?traineeId=${userId}`}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Ver todos os planos →
                  </Link>
                )}
              </div>

              {plans.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Nenhum plano atribuído</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plans.map((plan) => (
                    <Link
                      key={plan.id}
                      href={`/admin/plans/${plan.id}`}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-indigo-300 transition cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 hover:text-indigo-600">
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
                      <p className="text-sm text-gray-600">
                        {new Date(plan.from).toLocaleDateString("pt-BR")} →{" "}
                        {new Date(plan.to).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-xs text-indigo-600 mt-2">Clique para ver detalhes →</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Reports */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Avaliações Físicas ({reports.length})
                </h2>
                {reports.length > 0 && (
                  <Link
                    href={`/admin/reports?profileId=${userId}`}
                    className="text-sm text-green-600 hover:text-green-800 font-medium"
                  >
                    Ver todas as avaliações →
                  </Link>
                )}
              </div>

              {reports.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Nenhuma avaliação realizada</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {reports.map((report, index) => (
                    <Link
                      key={report.id}
                      href={`/admin/reports/${report.id}`}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-green-300 transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">Avaliação #{index + 1}</h3>
                        {index === 0 && (
                          <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                            Mais Recente
                          </span>
                        )}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Peso:</span>
                          <span className="font-medium">{report.weight} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Altura:</span>
                          <span className="font-medium">{report.height} cm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">IMC:</span>
                          <span className="font-medium">{report.imc.toFixed(1)}</span>
                        </div>
                        <div className="text-xs text-gray-500 pt-2 border-t">
                          {new Date(report.createdAt).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                      <p className="text-xs text-green-600 mt-3">Clique para ver detalhes →</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {user.role === 1 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Planos Criados ({plans.length})
              </h2>
              {plans.length > 0 && (
                <Link
                  href={`/admin/plans?trainerId=${userId}`}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Ver todos os planos →
                </Link>
              )}
            </div>

            {plans.length === 0 ? (
              <p className="text-gray-600 text-center py-8">Nenhum plano criado</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Título
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Período
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Criado em
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {plans.map((plan) => (
                      <tr key={plan.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{plan.title}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(plan.from).toLocaleDateString("pt-BR")} →{" "}
                          {new Date(plan.to).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(plan.from).toLocaleDateString("pt-BR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {user.role === 2 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Informações do Administrador</h2>
            <p className="text-gray-600">
              Este usuário possui privilégios de administrador e pode gerenciar todo o sistema.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
