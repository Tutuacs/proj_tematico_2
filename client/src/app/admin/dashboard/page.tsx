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

type Plan = {
  id: string;
  title: string;
  createdAt: string;
};

type Activity = {
  id: string;
  name: string;
};

type Report = {
  id: string;
  createdAt: string;
};

type Stats = {
  totalUsers: number;
  trainees: number;
  trainers: number;
  admins: number;
  totalPlans: number;
  totalActivities: number;
  totalReports: number;
};

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    trainees: 0,
    trainers: 0,
    admins: 0,
    totalPlans: 0,
    totalActivities: 0,
    totalReports: 0,
  });
  const [recentUsers, setRecentUsers] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [profilesRes, plansRes, activitiesRes, reportsRes] = await Promise.all([
          fetchWithAuth(`/profile`),
          fetchWithAuth(`/plan`),
          fetchWithAuth(`/activity`),
          fetchWithAuth(`/report`),
        ]);

        // Process profiles
        const profiles: Profile[] = Array.isArray(profilesRes?.data) ? profilesRes.data : [];
        const trainees = profiles.filter((p) => p.role === 0);
        const trainers = profiles.filter((p) => p.role === 1);
        const admins = profiles.filter((p) => p.role === 2);

        // Sort by createdAt desc and get last 5
        const sortedProfiles = [...profiles].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecentUsers(sortedProfiles.slice(0, 5));

        // Process other data
        const plans: Plan[] = Array.isArray(plansRes?.data) ? plansRes.data : [];
        const activities: Activity[] = Array.isArray(activitiesRes?.data)
          ? activitiesRes.data
          : [];
        const reports: Report[] = Array.isArray(reportsRes?.data) ? reportsRes.data : [];

        setStats({
          totalUsers: profiles.length,
          trainees: trainees.length,
          trainers: trainers.length,
          admins: admins.length,
          totalPlans: plans.length,
          totalActivities: activities.length,
          totalReports: reports.length,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <p className="text-gray-600 mt-2">Visão geral do sistema</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total de Usuários</h3>
              <svg
                className="w-8 h-8 text-indigo-600"
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
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              <Link
                href="/admin/users"
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                Ver todos →
              </Link>
            </div>
          </div>

          {/* Trainees */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Alunos</h3>
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{stats.trainees}</p>
              <span className="text-sm text-gray-500">
                {((stats.trainees / stats.totalUsers) * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Trainers */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Instrutores</h3>
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{stats.trainers}</p>
              <span className="text-sm text-gray-500">
                {((stats.trainers / stats.totalUsers) * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Admins */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Administradores</h3>
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{stats.admins}</p>
              <span className="text-sm text-gray-500">
                {((stats.admins / stats.totalUsers) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Plans */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-green-600"
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
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPlans}</p>
                <p className="text-sm text-gray-600">Planos de Treino</p>
              </div>
            </div>
          </div>

          {/* Total Activities */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalActivities}</p>
                <p className="text-sm text-gray-600">Atividades Cadastradas</p>
              </div>
            </div>
          </div>

          {/* Total Reports */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="bg-cyan-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-cyan-600"
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
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalReports}</p>
                <p className="text-sm text-gray-600">Avaliações Físicas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Usuários Recentes</h2>
            <Link
              href="/admin/users"
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              Ver todos →
            </Link>
          </div>

          {recentUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum usuário cadastrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuário
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
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
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
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Ver Detalhes
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/users"
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 rounded-full p-3 group-hover:bg-indigo-200 transition">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Gerenciar Usuários</p>
                <p className="text-sm text-gray-600">Visualizar e editar usuários</p>
              </div>
            </div>
          </Link>

          <Link
            href="/trainer/activities"
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 rounded-full p-3 group-hover:bg-orange-200 transition">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Gerenciar Atividades</p>
                <p className="text-sm text-gray-600">Cadastrar e editar exercícios</p>
              </div>
            </div>
          </Link>

          <Link
            href="/trainer/plans"
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 rounded-full p-3 group-hover:bg-green-200 transition">
                <svg
                  className="w-6 h-6 text-green-600"
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
              <div>
                <p className="font-semibold text-gray-900">Ver Todos os Planos</p>
                <p className="text-sm text-gray-600">Visualizar planos de treino</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
