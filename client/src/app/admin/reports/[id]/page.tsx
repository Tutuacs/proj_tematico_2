"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function AdminReportDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params.id as string;
  const { fetchWithAuth } = useFetch();

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await fetchWithAuth(`/report/${reportId}`, { showToast: false });
        
        if (res?.status === 200) {
          setReport(res.data);
        } else {
          alert("Avaliação não encontrada");
          router.push("/admin/reports");
        }
      } catch (error) {
        console.error("Failed to fetch report", error);
        alert("Erro ao carregar avaliação");
        router.push("/admin/reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const handleDeleteReport = async () => {
    if (!confirm("Tem certeza que deseja excluir esta avaliação?")) return;

    try {
      const res = await fetchWithAuth(`/report/${reportId}`, {
        method: "DELETE",
      });

      if (res?.status === 200 || res?.status === 204) {
        alert("Avaliação excluída com sucesso!");
        router.push("/admin/reports");
      } else {
        alert("Erro ao excluir avaliação");
      }
    } catch (error) {
      console.error("Failed to delete report", error);
      alert("Erro ao excluir avaliação");
    }
  };

  const getIMCCategory = (imc: number) => {
    if (imc < 18.5) return { label: "Abaixo do peso", color: "text-blue-600", bg: "bg-blue-100" };
    if (imc < 25) return { label: "Peso normal", color: "text-green-600", bg: "bg-green-100" };
    if (imc < 30) return { label: "Sobrepeso", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { label: "Obesidade", color: "text-red-600", bg: "bg-red-100" };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <main>
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-600">Avaliação não encontrada</p>
          <Link
            href="/admin/reports"
            className="text-indigo-600 hover:text-indigo-700 mt-2 inline-block"
          >
            Voltar para avaliações
          </Link>
        </div>
      </main>
    );
  }

  const imcCategory = getIMCCategory(report.imc);

  return (
    <main>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/reports"
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
            Voltar para avaliações
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Avaliação Física
              </h1>
              <p className="text-gray-600">
                Realizada em {formatDate(report.createdAt)}
              </p>
            </div>

            <button
              onClick={handleDeleteReport}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Excluir Avaliação
            </button>
          </div>
        </div>

        {/* Trainee Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Informações do Aluno</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nome</p>
              <p className="text-lg font-semibold text-gray-900">
                {report.Trainee?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg text-gray-900">{report.Trainee?.email || "N/A"}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              href={`/admin/users/${report.profileId}`}
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
            >
              Ver perfil completo do aluno →
            </Link>
          </div>
        </div>

        {/* Measurements */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Medidas Corporais</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Altura</p>
              <p className="text-3xl font-bold text-gray-900">
                {report.height.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">metros</p>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Peso</p>
              <p className="text-3xl font-bold text-gray-900">
                {report.weight.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">kg</p>
            </div>

            <div className={`text-center p-4 rounded-lg ${imcCategory.bg}`}>
              <p className="text-sm text-gray-600 mb-2">IMC</p>
              <p className={`text-3xl font-bold ${imcCategory.color}`}>
                {report.imc.toFixed(1)}
              </p>
              <p className={`text-sm font-medium ${imcCategory.color}`}>
                {imcCategory.label}
              </p>
            </div>
          </div>

          {/* IMC Reference Table */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Tabela de Referência IMC</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-500"></div>
                <span className="text-gray-600">&lt; 18.5: Abaixo do peso</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span className="text-gray-600">18.5 - 24.9: Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-yellow-500"></div>
                <span className="text-gray-600">25 - 29.9: Sobrepeso</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-red-500"></div>
                <span className="text-gray-600">≥ 30: Obesidade</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body Fat */}
        {report.BodyPart && report.BodyPart.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Percentual de Gordura por Região
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {report.BodyPart.map((part) => (
                <div
                  key={part.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition"
                >
                  <p className="text-sm text-gray-600 mb-1">{part.name}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {part.bodyFat.toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Observations */}
        {report.content && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Observações</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{report.content}</p>
          </div>
        )}
      </div>
    </main>
  );
}
