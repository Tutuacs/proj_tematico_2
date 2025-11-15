'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import useFetch from '@/utils/useFetch';

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
  traineeId: string;
  from: string;
  to: string;
  Trainee?: Profile;
};

type Report = {
  id: string;
  profileId: string;
  createdAt: string;
  Trainee?: Profile;
};

export default function TrainerDashboardPage() {
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const [userData, setUserData] = useState<{ name: string } | null>(null);
  const [stats, setStats] = useState({
    totalTrainees: 0,
    totalPlans: 0,
    activePlans: 0,
    totalReports: 0,
  });
  const [recentTrainees, setRecentTrainees] = useState<Profile[]>([]);
  const [recentPlans, setRecentPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.profile?.id) return;

      try {
        setLoading(true);

        const profileRes = await fetchWithAuth(`/profile/${session.profile.id}`, {
          showToast: false,
        });
        if (profileRes?.status === 200) {
          setUserData({ name: profileRes.data.name || 'Instrutor' });
        }

        const [traineesRes, plansRes, reportsRes] = await Promise.all([
          fetchWithAuth('/profile', { showToast: false }),
          fetchWithAuth('/plan', { showToast: false }),
          fetchWithAuth('/report', { showToast: false }),
        ]);

        const trainees = Array.isArray(traineesRes?.data) ? traineesRes.data : [];
        const myTrainees = trainees.filter(
          (t: any) => t.role === 0 && t.trainerId === session.profile.id
        );

        const plans: Plan[] = Array.isArray(plansRes?.data) ? plansRes.data : [];
        const myPlans = plans.filter((p) => p.traineeId && myTrainees.some((t: Profile) => t.id === p.traineeId));
        
        // Count active plans
        const now = new Date();
        const activePlans = myPlans.filter((plan) => {
          const from = new Date(plan.from);
          const to = new Date(plan.to);
          return now >= from && now <= to;
        });

        const reports: Report[] = Array.isArray(reportsRes?.data) ? reportsRes.data : [];
        const myReports = reports.filter((r) => myTrainees.some((t: Profile) => t.id === r.profileId));

        // Get recent trainees (last 5)
        const sortedTrainees = [...myTrainees].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecentTrainees(sortedTrainees.slice(0, 5));

        // Get recent plans (last 3)
        const sortedPlans = [...myPlans].sort(
          (a, b) => new Date(b.from).getTime() - new Date(a.from).getTime()
        );
        setRecentPlans(sortedPlans.slice(0, 3));

        setStats({
          totalTrainees: myTrainees.length,
          totalPlans: myPlans.length,
          activePlans: activePlans.length,
          totalReports: myReports.length,
        });
      } catch (error) {
        console.error('Failed to fetch trainer data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.profile?.id]);

  if (loading) {
    return (
      <main>
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <main>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Olá, {userData?.name || session?.profile?.name || 'Instrutor'}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Bem-vindo ao seu painel de controle
          </p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Trainees */}
          <Link href="/trainer/trainees">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Meus Alunos</h3>
                <div className="bg-blue-100 rounded-full p-2 group-hover:bg-blue-200 transition">
                  <svg
                    className="w-6 h-6 text-blue-600"
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
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-gray-900">{stats.totalTrainees}</p>
                <span className="text-sm text-blue-600 group-hover:translate-x-1 transition-transform">
                  Ver todos →
                </span>
              </div>
            </div>
          </Link>

          {/* Total Plans */}
          <Link href="/trainer/plans">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Planos de Treino</h3>
                <div className="bg-green-100 rounded-full p-2 group-hover:bg-green-200 transition">
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
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-gray-900">{stats.totalPlans}</p>
                <span className="text-sm text-green-600 group-hover:translate-x-1 transition-transform">
                  Ver todos →
                </span>
              </div>
            </div>
          </Link>

          {/* Active Plans */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-indigo-100">Planos Ativos</h3>
              <div className="bg-white bg-opacity-20 rounded-full p-2">
                <svg
                  className="w-6 h-6"
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
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-3xl font-bold">{stats.activePlans}</p>
              <span className="text-sm text-indigo-100">
                {stats.totalPlans > 0 ? Math.round((stats.activePlans / stats.totalPlans) * 100) : 0}% ativos
              </span>
            </div>
          </div>

          {/* Total Reports */}
          <Link href="/trainer/reports">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Avaliações Físicas</h3>
                <div className="bg-orange-100 rounded-full p-2 group-hover:bg-orange-200 transition">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-gray-900">{stats.totalReports}</p>
                <span className="text-sm text-orange-600 group-hover:translate-x-1 transition-transform">
                  Ver todas →
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/trainer/plans/new" className="lg:col-span-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-8 text-white hover:shadow-xl transition group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Criar Novo Plano de Treino</h3>
                  <p className="text-green-50 mb-4">
                    Monte um plano personalizado para seus alunos
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg group-hover:bg-opacity-30 transition">
                    <span className="font-semibold">Começar agora</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
                <svg
                  className="w-24 h-24 opacity-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </Link>

          <Link href="/trainer/reports/new">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-8 text-white hover:shadow-xl transition group">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="bg-white bg-opacity-20 rounded-full p-3 w-fit mb-4">
                    <svg
                      className="w-8 h-8"
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
                  <h3 className="text-xl font-bold mb-2">
                    Registrar Avaliação Física
                  </h3>
                  <p className="text-orange-50 text-sm">
                    Acompanhe a evolução dos seus alunos
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                  <span>Registrar agora</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Trainees */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Alunos Recentes</h2>
              <Link
                href="/trainer/trainees"
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Ver todos →
              </Link>
            </div>

            {recentTrainees.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-3"
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
                <p className="text-gray-600 text-sm">Nenhum aluno vinculado ainda</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTrainees.map((trainee) => (
                  <Link
                    key={trainee.id}
                    href={`/trainer/trainees/${trainee.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition group"
                  >
                    <div className="bg-blue-100 rounded-full p-2 group-hover:bg-blue-200 transition">
                      <svg
                        className="w-5 h-5 text-blue-600"
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
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {trainee.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{trainee.email}</p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent Plans */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Planos Recentes</h2>
              <Link
                href="/trainer/plans"
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Ver todos →
              </Link>
            </div>

            {recentPlans.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-3"
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
                <p className="text-gray-600 text-sm mb-3">Nenhum plano criado ainda</p>
                <Link
                  href="/trainer/plans/new"
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Criar primeiro plano →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentPlans.map((plan) => {
                  const isActive = () => {
                    const now = new Date();
                    const from = new Date(plan.from);
                    const to = new Date(plan.to);
                    return now >= from && now <= to;
                  };

                  return (
                    <Link
                      key={plan.id}
                      href={`/trainer/plans/${plan.id}`}
                      className="block p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition">
                          {plan.title}
                        </h4>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            isActive()
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {isActive() ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                      {plan.Trainee && (
                        <p className="text-sm text-gray-600">
                          Aluno: {plan.Trainee.name}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(plan.from).toLocaleDateString('pt-BR')} -{' '}
                        {new Date(plan.to).toLocaleDateString('pt-BR')}
                      </p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}