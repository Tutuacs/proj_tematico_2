"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useFetch from "@/utils/useFetch";

type BodyPart = {
  id: string;
  reportId: string;
  name: string;
  bodyFat?: number; // Este campo está sendo usado para armazenar medida em cm (conforme sistema atual)
};

type Report = {
  id: string;
  profileId: string;
  createdBy: string;
  weight: number;
  height: number;
  imc: number;
  bodyFat?: number;
  content?: string;
  createdAt: string;
  Trainer?: {
    name: string;
  };
  BodyPart?: BodyPart[];
};

export default function AssessmentHistoryPage() {
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      if (!session?.profile?.id) return;

      try {
        setLoading(true);
        const res = await fetchWithAuth(`/report?profileId=${session.profile.id}`);
        if (res?.status === 200) {
          const reportsData = Array.isArray(res.data) ? res.data : [];
          setReports(reportsData.sort((a: Report, b: Report) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ));
        }
      } catch (error) {
        console.error("Failed to fetch reports", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [session?.profile?.id]);

  const handleViewDetails = async (report: Report) => {
    try {
      // Fetch body parts for this report
      const bodyPartRes = await fetchWithAuth(`/body-part?reportId=${report.id}`);
      if (bodyPartRes?.status === 200) {
        const bodyParts = Array.isArray(bodyPartRes.data) ? bodyPartRes.data : [];
        setSelectedReport({ ...report, BodyPart: bodyParts });
        setShowModal(true);
      }
    } catch (error) {
      console.error("Failed to fetch body parts", error);
      setSelectedReport(report);
      setShowModal(true);
    }
  };

  const getIMCCategory = (imc: number) => {
    if (imc < 18.5) return { label: "Abaixo do peso", color: "text-yellow-600" };
    if (imc < 25) return { label: "Peso normal", color: "text-green-600" };
    if (imc < 30) return { label: "Sobrepeso", color: "text-orange-600" };
    return { label: "Obesidade", color: "text-red-600" };
  };

  const calculateDifference = (current: number, previous: number) => {
    const diff = current - previous;
    const sign = diff > 0 ? "+" : "";
    return `${sign}${diff.toFixed(1)}`;
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Histórico de Avaliações Físicas
          </h1>
          <p className="mt-2 text-gray-600">
            Acompanhe sua evolução através das avaliações
          </p>
        </div>

        {/* Summary Cards */}
        {!loading && reports.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-600 mb-1">Última Avaliação</p>
              <p className="text-xl font-bold text-indigo-600">
                {new Date(reports[0].createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-600 mb-1">Peso Atual</p>
              <p className="text-xl font-bold text-indigo-600">
                {reports[0].weight.toFixed(1)} kg
              </p>
              {reports.length > 1 && (
                <p className={`text-sm mt-1 ${
                  reports[0].weight < reports[1].weight ? "text-green-600" : "text-red-600"
                }`}>
                  {calculateDifference(reports[0].weight, reports[1].weight)} kg
                </p>
              )}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-600 mb-1">IMC Atual</p>
              <p className="text-xl font-bold text-indigo-600">
                {reports[0].imc.toFixed(1)}
              </p>
              <p className={`text-sm mt-1 ${getIMCCategory(reports[0].imc).color}`}>
                {getIMCCategory(reports[0].imc).label}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-600 mb-1">% Gordura</p>
              <p className="text-xl font-bold text-indigo-600">
                {reports[0].bodyFat ? `${reports[0].bodyFat.toFixed(1)}%` : "N/A"}
              </p>
              {reports.length > 1 && reports[0].bodyFat && reports[1].bodyFat && (
                <p className={`text-sm mt-1 ${
                  reports[0].bodyFat < reports[1].bodyFat ? "text-green-600" : "text-red-600"
                }`}>
                  {calculateDifference(reports[0].bodyFat, reports[1].bodyFat)}%
                </p>
              )}
            </div>
          </div>
        )}

        {/* Reports List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : reports.length === 0 ? (
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
              Nenhuma avaliação registrada
            </h3>
            <p className="text-gray-600">
              Você ainda não possui avaliações físicas. Entre em contato com seu instrutor.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report, index) => {
              const imcCategory = getIMCCategory(report.imc);
              const isLatest = index === 0;

              return (
                <div
                  key={report.id}
                  className={`bg-white rounded-xl border shadow-sm p-6 ${
                    isLatest ? "border-indigo-300 shadow-md" : "border-gray-200"
                  }`}
                >
                  {isLatest && (
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full mb-4">
                      Mais Recente
                    </span>
                  )}

                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Date */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Avaliação de {new Date(report.createdAt).toLocaleDateString("pt-BR")}
                      </h3>

                      {/* Trainer */}
                      {report.Trainer && (
                        <p className="text-sm text-gray-600 mb-4">
                          Realizada por: <span className="font-medium">{report.Trainer.name}</span>
                        </p>
                      )}

                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Peso</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {report.weight.toFixed(1)} kg
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Altura</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {report.height.toFixed(0)} cm
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">IMC</p>
                          <p className={`text-lg font-semibold ${imcCategory.color}`}>
                            {report.imc.toFixed(1)}
                          </p>
                          <p className={`text-xs ${imcCategory.color}`}>
                            {imcCategory.label}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">% Gordura</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {report.bodyFat ? `${report.bodyFat.toFixed(1)}%` : "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Observations Preview */}
                      {report.content && (
                        <p className="mt-4 text-sm text-gray-600 italic line-clamp-2">
                          "{report.content}"
                        </p>
                      )}
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(report)}
                      className="ml-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showModal && selectedReport && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Detalhes da Avaliação
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* General Data */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Dados Gerais
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Peso</p>
                  <p className="text-xl font-bold text-gray-900">
                    {selectedReport.weight.toFixed(1)} kg
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Altura</p>
                  <p className="text-xl font-bold text-gray-900">
                    {selectedReport.height.toFixed(0)} cm
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">IMC</p>
                  <p className={`text-xl font-bold ${getIMCCategory(selectedReport.imc).color}`}>
                    {selectedReport.imc.toFixed(1)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">% Gordura</p>
                  <p className="text-xl font-bold text-gray-900">
                    {selectedReport.bodyFat ? `${selectedReport.bodyFat.toFixed(1)}%` : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Body Measurements */}
            {selectedReport.BodyPart && selectedReport.BodyPart.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Medidas Corporais
                </h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Parte do Corpo
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Medida (cm)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedReport.BodyPart.map((part) => (
                        <tr key={part.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {part.name}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {part.bodyFat ? `${part.bodyFat.toFixed(1)} cm` : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Observations */}
            {selectedReport.content && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Observações do Instrutor
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedReport.content}</p>
                </div>
              </div>
            )}

            {/* Meta Info */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  {selectedReport.Trainer && (
                    <span>Realizada por: <strong>{selectedReport.Trainer.name}</strong></span>
                  )}
                </div>
                <div>
                  {new Date(selectedReport.createdAt).toLocaleDateString("pt-BR")} às{" "}
                  {new Date(selectedReport.createdAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
