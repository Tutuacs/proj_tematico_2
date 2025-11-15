"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useFetch from "@/utils/useFetch";

type Report = {
  id: string;
  weight: number;
  height: number;
  imc: number;
  bodyFat?: number;
  createdAt: string;
  Trainer?: {
    name: string;
  };
};

type Train = {
  id: string;
  weekDay: string;
  from: string;
  to: string;
  Plan?: {
    title: string;
  };
  Exercise?: Array<{
    id: string;
    Activity?: {
      name: string;
    };
  }>;
};

const WEEKDAY_NAMES: Record<string, string> = {
  SUNDAY: "Domingo",
  MONDAY: "Segunda-feira",
  TUESDAY: "Terça-feira",
  WEDNESDAY: "Quarta-feira",
  THURSDAY: "Quinta-feira",
  FRIDAY: "Sexta-feira",
  SATURDAY: "Sábado",
};

export default function HistoryPage() {
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const [reportsCount, setReportsCount] = useState(0);
  const [trainsCount, setTrainsCount] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);
  const [latestReport, setLatestReport] = useState<Report | null>(null);
  const [recentTrains, setRecentTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.profile?.id) return;

      try {
        setLoading(true);

        // Fetch reports
        const reportsRes = await fetchWithAuth(`/report?profileId=${session.profile.id}`);
        if (reportsRes?.status === 200) {
          const reports = Array.isArray(reportsRes.data) ? reportsRes.data : [];
          setReportsCount(reports.length);
          if (reports.length > 0) {
            const sorted = reports.sort((a: Report, b: Report) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setLatestReport(sorted[0]);
          }
        }

        // Fetch trains (workout sessions)
        const trainsRes = await fetchWithAuth(`/train?traineeId=${session.profile.id}`);
        if (trainsRes?.status === 200) {
          const trains = Array.isArray(trainsRes.data) ? trainsRes.data : [];
          setTrainsCount(trains.length);
          
          // Count total exercises
          const totalExercises = trains.reduce((sum: number, train: Train) => 
            sum + (train.Exercise?.length || 0), 0
          );
          setTotalExercises(totalExercises);
          
          // Get recent trains (last 5) - just show all since we don't have dates
          setRecentTrains(trains.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch history data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.profile?.id]);

  const getIMCCategory = (imc: number) => {
    if (imc < 18.5) return { label: "Abaixo do peso", color: "text-yellow-600" };
    if (imc < 25) return { label: "Peso normal", color: "text-green-600" };
    if (imc < 30) return { label: "Sobrepeso", color: "text-orange-600" };
    return { label: "Obesidade", color: "text-red-600" };
  };

  if (loading) {
    return (
      <main>
        <div className="max-w-6xl mx-auto p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 h-64"></div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 h-64"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meu Histórico</h1>
          <p className="mt-2 text-gray-600">
            Acompanhe sua evolução através de treinos e avaliações
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Treinos Realizados</p>
                <p className="text-3xl font-bold text-indigo-600">{trainsCount}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Exercícios Feitos</p>
                <p className="text-3xl font-bold text-indigo-600">{totalExercises}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avaliações</p>
                <p className="text-3xl font-bold text-indigo-600">{reportsCount}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          {latestReport && (
            <>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <p className="text-sm text-gray-600 mb-1">Peso Atual</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {latestReport.weight.toFixed(1)}
                  <span className="text-lg text-gray-500 ml-1">kg</span>
                </p>
              </div>

              {/* <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <p className="text-sm text-gray-600 mb-1">IMC Atual</p>
                <p className={`text-3xl font-bold ${getIMCCategory(latestReport.imc).color}`}>
                  {latestReport.imc.toFixed(1)}
                </p>
                <p className={`text-xs mt-1 ${getIMCCategory(latestReport.imc).color}`}>
                  {getIMCCategory(latestReport.imc).label}
                </p>
              </div> */}
            </>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Workout History Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Treinos</h2>
                  <p className="text-sm text-gray-600">Exercícios realizados</p>
                </div>
              </div>
            </div>

            {recentTrains.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-3">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-4">Nenhum treino registrado</p>
                <Link
                  href="/trainee/train/new"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Registrar Treino
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {recentTrains.map((train) => (
                    <Link
                      key={train.id}
                      href="/trainee/history/workouts"
                      className="block border border-gray-200 rounded-lg p-3 hover:border-indigo-300 hover:shadow-md transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {train.Plan?.title || "Treino"}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <span>
                              {WEEKDAY_NAMES[train.weekDay] || train.weekDay}
                            </span>
                            <span>•</span>
                            <span>{train.Exercise?.length || 0} exercícios</span>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/trainee/history/workouts"
                  className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center font-medium py-3 rounded-lg transition"
                >
                  Ver Todos os Treinos ({trainsCount})
                </Link>
              </>
            )}
          </div>

          {/* Assessment History Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Avaliações</h2>
                  <p className="text-sm text-gray-600">Avaliações físicas</p>
                </div>
              </div>
            </div>

            {!latestReport ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-3">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-600">Nenhuma avaliação registrada</p>
                <p className="text-sm text-gray-500 mt-2">
                  Entre em contato com seu instrutor
                </p>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 mb-6 border border-green-200">
                  <p className="text-sm text-gray-600 mb-4">Última Avaliação</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Peso</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {latestReport.weight.toFixed(1)} <span className="text-sm text-gray-600">kg</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Altura</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {latestReport.height.toFixed(0)} <span className="text-sm text-gray-600">cm</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">IMC</p>
                      <p className={`text-2xl font-bold ${getIMCCategory(latestReport.imc).color}`}>
                        {latestReport.imc.toFixed(1)}
                      </p>
                      <p className={`text-xs ${getIMCCategory(latestReport.imc).color}`}>
                        {getIMCCategory(latestReport.imc).label}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">% Gordura</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {latestReport.bodyFat ? `${latestReport.bodyFat.toFixed(1)}%` : "N/A"}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600">
                    Realizada em {new Date(latestReport.createdAt).toLocaleDateString("pt-BR")}
                    {latestReport.Trainer && ` por ${latestReport.Trainer.name}`}
                  </p>
                </div>

                <Link
                  href="/trainee/history/assessments"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-medium py-3 rounded-lg transition"
                >
                  Ver Todas as Avaliações ({reportsCount})
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/trainee/train/new"
            className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-md transition group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 group-hover:bg-indigo-200 p-3 rounded-lg transition">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Registrar Treino</p>
                <p className="text-sm text-gray-600">Adicione um novo treino</p>
              </div>
            </div>
          </Link>

          <Link
            href="/trainee/plans"
            className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-md transition group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 group-hover:bg-purple-200 p-3 rounded-lg transition">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Meus Planos</p>
                <p className="text-sm text-gray-600">Ver planos de treino</p>
              </div>
            </div>
          </Link>

          <Link
            href="/trainee/dashboard"
            className="bg-white border border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-md transition group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 group-hover:bg-gray-200 p-3 rounded-lg transition">
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Dashboard</p>
                <p className="text-sm text-gray-600">Voltar ao início</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
