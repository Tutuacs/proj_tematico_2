"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useFetch from "@/utils/useFetch";

type Profile = {
  id: string;
  name: string;
  email: string;
  role: number;
  createdAt: string;
};

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Profile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Profile[]>([]);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "date">("date");

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "0",
  });

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetchWithAuth(`/profile`);
        if (res?.status === 200) {
          const profilesData: Profile[] = Array.isArray(res.data) ? res.data : [];
          setUsers(profilesData);
          setFilteredUsers(profilesData);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...users];

    // Role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((u) => u.role === parseInt(roleFilter));
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, sortBy]);

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

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Preencha todos os campos");
      return;
    }

    // Additional confirmation when creating an admin
    if (formData.role === "2") {
      const confirmAdmin = confirm(
        " ATENÇÃO: Você está criando um usuário ADMINISTRADOR.\n\n" +
        "Administradores têm acesso total ao sistema, incluindo:\n" +
        "• Gerenciar todos os usuários\n" +
        "• Visualizar e editar todos os dados\n" +
        "• Excluir usuários e informações\n\n" +
        "Tem certeza que deseja continuar?"
      );
      
      if (!confirmAdmin) {
        return;
      }
    }

    try {
      setSubmitting(true);

      const res = await fetchWithAuth(`/profile`, {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: parseInt(formData.role),
        }),
      });

      if (res?.status === 201) {
        alert("Usuário criado com sucesso!");
        setShowCreateModal(false);
        setFormData({ name: "", email: "", password: "", role: "0" });
        
        // Refresh users list
        const refreshRes = await fetchWithAuth(`/profile`);
        if (refreshRes?.status === 200) {
          const profilesData: Profile[] = Array.isArray(refreshRes.data) ? refreshRes.data : [];
          setUsers(profilesData);
        }
      } else {
        alert("Erro ao criar usuário. Email pode já estar em uso.");
      }
    } catch (error) {
      console.error("Failed to create user", error);
      alert("Erro ao criar usuário");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      setSubmitting(true);

      const res = await fetchWithAuth(`/profile/${selectedUser.id}`, {
        method: "DELETE",
      });

      if (res?.status === 200) {
        alert("Usuário excluído com sucesso!");
        setShowDeleteModal(false);
        setSelectedUser(null);
        
        // Refresh users list
        setUsers(users.filter((u) => u.id !== selectedUser.id));
      } else {
        alert("Erro ao excluir usuário");
      }
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("Erro ao excluir usuário");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gerenciar Usuários</h1>
              <p className="text-gray-600 mt-2">
                {filteredUsers.length} usuário(s) encontrado(s)
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition"
            >
              + Criar Usuário
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nome ou email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por Role
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Todos</option>
                <option value="0">Alunos</option>
                <option value="1">Instrutores</option>
                <option value="2">Administradores</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "date")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="date">Data de cadastro (mais recente)</option>
                <option value="name">Nome (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Carregando usuários...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-gray-600 mt-4">Nenhum usuário encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cadastrado em
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => {
                    const isCurrentUser = session?.profile?.id === user.id;
                    return (
                      <tr 
                        key={user.id} 
                        className={`hover:bg-gray-50 ${
                          isCurrentUser 
                            ? 'bg-indigo-50 border-l-4 border-l-indigo-500' 
                            : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">
                              {user.name}
                            </span>
                            {isCurrentUser && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded">
                                Você
                              </span>
                            )}
                          </div>
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getRoleBadgeColor(
                            user.role
                          )}`}
                        >
                          {getRoleLabel(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <Link
                          href={`/admin/users/${user.id}`}
                          className="text-indigo-600 hover:text-indigo-700 font-medium mr-4"
                        >
                          Ver
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 hover:text-red-700 font-medium"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create User Modal */}
        {showCreateModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowCreateModal(false)}
          >
            <div
              className="bg-white rounded-xl shadow-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Criar Novo Usuário</h3>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Ex: João Silva"
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
                    placeholder="Ex: joao@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Usuário
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="0">Aluno</option>
                    <option value="1">Instrutor</option>
                    <option value="2"> Administrador (requer confirmação)</option>
                  </select>
                  {formData.role === "2" && (
                    <p className="mt-2 text-sm text-amber-600 flex items-center gap-1">
                      <span></span>
                      <span>
                        Cuidado: Administradores têm acesso total ao sistema
                      </span>
                    </p>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    {submitting ? "Criando..." : "Criar Usuário"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedUser && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowDeleteModal(false)}
          >
            <div
              className="bg-white rounded-xl shadow-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmar Exclusão</h3>

              <p className="text-gray-600 mb-6">
                Tem certeza que deseja excluir o usuário <strong>{selectedUser.name}</strong>?
                Esta ação não pode ser desfeita.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteUser}
                  disabled={submitting}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  {submitting ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
