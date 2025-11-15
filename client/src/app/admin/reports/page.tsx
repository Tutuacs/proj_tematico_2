"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import useFetch from "@/utils/useFetch";

type Profile = {
  id: string;
  name: string;
  email: string;
  role: number;
};

type BodyPart = {
  id: string;
  name: string;
  bodyFat: number;
};

type Report = {
  id: string;
  profileId: string;
  height: number;
  weight: number;
  imc: number;
  content?: string;
  createdAt: string;
  Trainee?: Profile;
  BodyPart: BodyPart[];
};

export default function AdminReportsPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const filterByProfileId = searchParams.get("profileId");
  const { fetchWithAuth } = useFetch();

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      if (!session?.profile?.id) return;

      try {
        setLoading(true);
        const res = await fetchWithAuth(`/report`);
        if (res?.status === 200) {
          const reportsData = Array.isArray(res.data) ? res.data : [];
          setReports(reportsData);
        }
      } catch (error) {
        console.error("Failed to fetch reports", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [session?.profile?.id]);

  const handleDeleteReport = async (reportId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta avaliação?")) return;

    try {
      const res = await fetchWithAuth(`/report/${reportId}`, {
        method: "DELETE",
      });

      if (res?.status === 200 || res?.status === 204) {
        setReports(reports.filter((r) => r.id !== reportId));
        alert("Avaliação excluída com sucesso!");
      }
    } catch (error) {
      console.error("Failed to delete report", error);
      alert("Erro ao excluir avaliação. Tente novamente.");
    }
  };

  const filteredReports = reports
    .filter((report) => {
      // Filter by profileId if provided in URL
      if (filterByProfileId && report.profileId !== filterByProfileId) {
        return false;
      }
      return true;
    })
    .filter((report) => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        report.Trainee?.name.toLowerCase().includes(search) ||
        report.Trainee?.email.toLowerCase().includes(search) ||
        report.content?.toLowerCase().includes(search)
      );
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getIMCCategory = (imc: number) => {
    if (imc < 18.5) return { label: "Abaixo do peso", color: "text-blue-600" };
    if (imc < 25) return { label: "Peso normal", color: "text-green-600" };
    if (imc < 30) return { label: "Sobrepeso", color: "text-yellow-600" };
    return { label: "Obesidade", color: "text-red-600" };
  };

  return (
    <main>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Avaliações Físicas</h1>
            <p className="mt-2 text-gray-600">
              Visualização administrativa de todas as avaliações físicas do sistema
            </p>
            {filterByProfileId && filteredReports.length > 0 && (
              <p className="mt-1 text-sm text-purple-600">
                ✓ Mostrando avaliações de: {filteredReports[0]?.Trainee?.name || filteredReports[0]?.Trainee?.email || "Aluno selecionado"}
              </p>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por aluno ou observações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando avaliações...</p>
          </div>
        ) : filteredReports.length === 0 ? (
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma avaliação encontrada</h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Tente ajustar os filtros ou buscar por outro termo."
                : "Ainda não há avaliações cadastradas no sistema."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredReports.map((report) => {
              const imcCategory = getIMCCategory(report.imc);
              return (
                <div
                  key={report.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-6"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Left Column - Trainee Info */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {report.Trainee?.name || "N/A"}
                      </h3>
                      <p className="text-sm text-gray-600">{report.Trainee?.email}</p>
                      <p className="text-xs text-gray-500">
                        Avaliado em: {formatDate(report.createdAt)}
                      </p>
                      <Link
                        href={`/admin/users/${report.profileId}`}
                        className="inline-block text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Ver perfil do aluno →
                      </Link>
                    </div>

                    {/* Middle Column - Measurements */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Altura</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {report.height.toFixed(2)} m
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Peso</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {report.weight.toFixed(1)} kg
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase mb-1">IMC</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold text-gray-900">
                            {report.imc.toFixed(1)}
                          </p>
                          <span className={`text-sm font-medium ${imcCategory.color}`}>
                            {imcCategory.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Body Parts & Actions */}
                    <div className="space-y-3">
                      {report.BodyPart && report.BodyPart.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-2">
                            Percentual de Gordura
                          </p>
                          <div className="space-y-1">
                            {report.BodyPart.slice(0, 3).map((part) => (
                              <div key={part.id} className="flex justify-between text-sm">
                                <span className="text-gray-700">{part.name}</span>
                                <span className="font-medium text-gray-900">
                                  {part.bodyFat.toFixed(1)}%
                                </span>
                              </div>
                            ))}
                            {report.BodyPart.length > 3 && (
                              <p className="text-xs text-gray-500 italic">
                                +{report.BodyPart.length - 3} partes do corpo
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {report.content && (
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1">Observações</p>
                          <p className="text-sm text-gray-700 line-clamp-2">{report.content}</p>
                        </div>
                      )}

                      <div className="pt-2 flex gap-2">
                        <Link
                          href={`/admin/reports/${report.id}`}
                          className="flex-1 text-center px-4 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg font-medium text-sm transition"
                        >
                          Ver Detalhes
                        </Link>
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium text-sm transition"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary */}
        {!loading && filteredReports.length > 0 && (
          <div className="mt-6 text-sm text-gray-600 text-center">
            Mostrando {filteredReports.length} de {reports.length} avaliações
          </div>
        )}
      </div>
    </main>
  );
}
