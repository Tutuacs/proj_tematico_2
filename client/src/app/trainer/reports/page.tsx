"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
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

export default function TrainerReportsPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterByTraineeId = searchParams.get("traineeId");
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
      // Filter by traineeId if provided in URL
      if (filterByTraineeId && report.profileId !== filterByTraineeId) {
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

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Back Button - Show when filtering by trainee */}
        {filterByTraineeId && (
          <button
            onClick={() => router.back()}
            className="text-indigo-600 hover:text-indigo-700 text-sm mb-4 inline-flex items-center"
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
          </button>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Avaliações Físicas</h1>
            <p className="mt-2 text-gray-600">
              Histórico de avaliações físicas realizadas
            </p>
            {filterByTraineeId && filteredReports.length > 0 && (
              <p className="mt-1 text-sm text-purple-600">
                ✓ Mostrando avaliações de: {filteredReports[0]?.Trainee?.name || filteredReports[0]?.Trainee?.email || "Aluno selecionado"}
              </p>
            )}
          </div>
          <Link
            href="/trainer/reports/new"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg"
          >
            + Registrar Nova Avaliação
          </Link>
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
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <p className="text-gray-600">
              {searchTerm || filterByTraineeId
                ? "Nenhuma avaliação encontrada com os filtros aplicados."
                : "Nenhuma avaliação física registrada ainda."}
            </p>
            <Link
              href="/trainer/reports/new"
              className="mt-4 inline-block text-green-600 hover:text-green-700 font-medium"
            >
              Registrar primeira avaliação →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {report.Trainee?.name || report.Trainee?.email || "Aluno"}
                      </h3>
                      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {formatDate(report.createdAt)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div> 
                        <p className="text-sm text-gray-500">Altura</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {report.height} cm
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Peso</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {report.weight} kg
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">IMC</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {report.imc ? report.imc.toFixed(1) : (report.weight / Math.pow(report.height / 100, 2)).toFixed(1)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Medidas</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {report.BodyPart?.length || 0} partes
                        </p>
                      </div>
                    </div>

                    {report.content && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Observações:</span> {report.content}
                        </p>
                      </div>
                    )}

                    {report.BodyPart.length > 0 ? (
                      <div className="mt-4">
                        <details className="group">
                          <summary className="cursor-pointer text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-indigo-50 transition-colors w-fit">
                            <svg
                              className="w-5 h-5 transition-transform group-open:rotate-90"
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
                            Ver medidas corporais ({report.BodyPart.length})
                          </summary>
                          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {report.BodyPart.map((bp) => (
                              <div 
                                key={bp.id} 
                                className="relative bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-3 hover:shadow-md transition-all duration-200"
                              >
                                <div className="absolute top-2 right-2 opacity-20">
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
                                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                  </svg>
                                </div>
                                <p className="text-xs font-medium text-gray-600 mb-1">{bp.name}</p>
                                <div className="flex items-baseline gap-1">
                                  <span className="text-xl font-bold text-indigo-600">{bp.bodyFat}</span>
                                  <span className="text-xs text-gray-600 font-medium">cm</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    ) : (
                      <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-3 flex items-center gap-3">
                        <svg
                          className="w-6 h-6 text-yellow-600 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-semibold text-yellow-800">
                            Nenhuma medida corporal registrada
                          </p>
                          <p className="text-xs text-yellow-700 mt-0.5">
                            Esta avaliação não possui medidas de partes do corpo
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleDeleteReport(report.id)}
                      className="text-red-600 hover:text-red-800 px-3 py-1 rounded"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {!loading && filteredReports.length > 0 && (
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <p className="text-sm text-gray-600">
              Exibindo <span className="font-semibold">{filteredReports.length}</span> avaliação(ões)
              {filterByTraineeId && " para o aluno selecionado"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
