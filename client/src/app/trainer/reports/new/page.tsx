"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useFetch from "@/utils/useFetch";

type Profile = {
  id: string;
  name: string;
  email: string;
  role: number;
};

type BodyPartMeasurement = {
  name: string;
  measurement: string;
};

const COMMON_BODY_PARTS = [
  "Pescoço",
  "Ombros",
  "Tórax",
  "Cintura",
  "Abdômen",
  "Quadril",
  "Braço Direito",
  "Braço Esquerdo",
  "Antebraço Direito",
  "Antebraço Esquerdo",
  "Coxa Direita",
  "Coxa Esquerda",
  "Panturrilha Direita",
  "Panturrilha Esquerda",
];

export default function NewAssessmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedTraineeId = searchParams.get("traineeId");
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form Data
  const [trainees, setTrainees] = useState<Profile[]>([]);
  const [traineeId, setTraineeId] = useState(preselectedTraineeId || "");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [observations, setObservations] = useState("");

  // Body Parts
  const [bodyParts, setBodyParts] = useState<BodyPartMeasurement[]>([]);
  const [showAddBodyPart, setShowAddBodyPart] = useState(false);
  const [newBodyPartName, setNewBodyPartName] = useState("");
  const [newBodyPartMeasurement, setNewBodyPartMeasurement] = useState("");

  // Load trainees
  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        setLoading(true);
        const res = await fetchWithAuth(`/profile?role=0`);
        if (res?.status === 200) {
          const profiles = Array.isArray(res.data) ? res.data : [];
          setTrainees(profiles);
        }
      } catch (error) {
        console.error("Failed to fetch trainees", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainees();
  }, []);

  const calculateIMC = () => {
    if (!height || !weight) return null;
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getIMCCategory = (imc: number) => {
    if (imc < 18.5) return { label: "Abaixo do peso", color: "text-yellow-600" };
    if (imc < 25) return { label: "Peso normal", color: "text-green-600" };
    if (imc < 30) return { label: "Sobrepeso", color: "text-orange-600" };
    return { label: "Obesidade", color: "text-red-600" };
  };

  const handleAddBodyPart = () => {
    if (!newBodyPartName || !newBodyPartMeasurement) {
      alert("Preencha o nome e a medida da parte do corpo");
      return;
    }

    setBodyParts([
      ...bodyParts,
      { name: newBodyPartName, measurement: newBodyPartMeasurement },
    ]);

    setNewBodyPartName("");
    setNewBodyPartMeasurement("");
    setShowAddBodyPart(false);
  };

  const handleQuickAddBodyPart = (name: string) => {
    setNewBodyPartName(name);
    setShowAddBodyPart(true);
  };

  const handleRemoveBodyPart = (index: number) => {
    setBodyParts(bodyParts.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!traineeId || !height || !weight) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setSubmitting(true);

      const imc = calculateIMC();
      if (!imc) {
        alert("Erro ao calcular IMC");
        return;
      }

      // 1. Create Report
      const reportBody: any = {
        profileId: traineeId,
        height: parseFloat(height),
        weight: parseFloat(weight),
        imc: parseFloat(imc),
      };

      // Only add bodyFat if it has a value
      if (bodyFat && bodyFat.trim()) {
        reportBody.bodyFat = parseFloat(bodyFat);
      }

      // Only add content (observations) if it has content
      if (observations && observations.trim()) {
        reportBody.content = observations.trim();
      }

      console.log("Sending report body:", reportBody);

      const reportRes = await fetchWithAuth(`/report`, {
        method: "POST",
        body: JSON.stringify(reportBody),
      });

      console.log("Report response:", reportRes);

      if (!reportRes || reportRes.status !== 201) {
        const errorMsg = reportRes?.data?.message || reportRes?.data || "Failed to create report";
        console.error("Report creation failed:", errorMsg);
        throw new Error(`Failed to create report: ${JSON.stringify(errorMsg)}`);
      }

      const reportId = reportRes.data.id;

      // 2. Create Body Part Measurements
      if (bodyParts.length > 0) {
        const bodyPartPromises = bodyParts.map((bodyPart) =>
          fetchWithAuth(`/body-part`, {
            method: "POST",
            body: JSON.stringify({
              reportId,
              name: bodyPart.name,
              bodyFat: parseFloat(bodyPart.measurement),
            }),
          })
        );

        await Promise.all(bodyPartPromises);
      }

      alert("Avaliação física registrada com sucesso!");
      
      // Redirect to trainee profile or trainer dashboard
      if (preselectedTraineeId) {
        router.push(`/trainer/trainees/${preselectedTraineeId}`);
      } else {
        router.push("/trainer/dashboard");
      }
    } catch (error) {
      console.error("Failed to create assessment", error);
      alert("Erro ao registrar avaliação. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const imc = calculateIMC();
  const imcCategory = imc ? getIMCCategory(parseFloat(imc)) : null;

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
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
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Registrar Avaliação Física</h1>
          <p className="mt-2 text-gray-600">
            Preencha os dados da avaliação física do aluno
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Data */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Dados Gerais
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aluno <span className="text-red-500">*</span>
                </label>
                <select
                  value={traineeId}
                  onChange={(e) => setTraineeId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  disabled={!!preselectedTraineeId}
                >
                  <option value="">Selecione um aluno...</option>
                  {trainees.map((trainee) => (
                    <option key={trainee.id} value={trainee.id}>
                      {trainee.name} ({trainee.email})
                    </option>
                  ))}
                </select>
                {preselectedTraineeId && (
                  <p className="text-xs text-gray-500 mt-1">
                    Aluno pré-selecionado
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Altura (cm) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Ex: 175"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Peso (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Ex: 70"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Percentual de Gordura (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ex: 15.5"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Opcional - Medido por adipômetro ou bioimpedância
                </p>
              </div>

              {/* IMC Display */}
              {imc && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-700 mb-1">IMC Calculado</p>
                      <p className="text-2xl font-bold text-indigo-900">{imc}</p>
                    </div>
                    {imcCategory && (
                      <div className="text-right">
                        <p className="text-sm text-gray-700 mb-1">Classificação</p>
                        <p className={`text-lg font-semibold ${imcCategory.color}`}>
                          {imcCategory.label}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações (opcional)
                </label>
                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Observações sobre a avaliação, objetivos, recomendações..."
                />
              </div>
            </div>
          </div>

          {/* Body Parts Measurements */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Medidas Corporais
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Adicione as medidas das partes do corpo (opcional)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddBodyPart(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition text-sm"
              >
                + Adicionar Medida
              </button>
            </div>

            {/* Quick Add Buttons */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-indigo-600"
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
                Adicionar rapidamente:
              </p>
              <div className="flex flex-wrap gap-2">
                {COMMON_BODY_PARTS.map((part) => {
                  const isAdded = bodyParts.some((bp) => bp.name === part);
                  return (
                    <button
                      key={part}
                      type="button"
                      onClick={() => !isAdded && handleQuickAddBodyPart(part)}
                      disabled={isAdded}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isAdded
                          ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-2 border-green-300 cursor-not-allowed shadow-sm"
                          : "bg-white hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 border-2 border-gray-200 hover:border-indigo-300 shadow-sm hover:shadow-md"
                      }`}
                    >
                      {isAdded ? (
                        <span className="flex items-center gap-1">
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {part}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
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
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          {part}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Body Parts List */}
            {bodyParts.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400 mb-3"
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
                <p className="text-gray-600 font-medium">Nenhuma medida adicionada</p>
                <p className="text-sm text-gray-500 mt-1">Clique nos botões acima ou em "Adicionar Medida"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bodyParts.map((bodyPart, index) => (
                  <div
                    key={index}
                    className="relative bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 group"
                  >
                    {/* Body Part Icon */}
                    <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-30 transition-opacity">
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
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>

                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 pr-8">
                        <h4 className="text-sm font-medium text-gray-600 mb-1">
                          Parte do Corpo
                        </h4>
                        <p className="text-lg font-bold text-gray-900">
                          {bodyPart.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-indigo-200">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-indigo-600">
                          {bodyPart.measurement}
                        </span>
                        <span className="text-sm text-gray-600 font-medium">cm</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveBodyPart(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Remover medida"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2 px-8 rounded-lg transition"
            >
              {submitting ? "Salvando..." : "Registrar Avaliação"}
            </button>
          </div>
        </form>

        {/* Add Body Part Modal */}
        {showAddBodyPart && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddBodyPart(false)}
          >
            <div
              className="bg-white rounded-xl shadow-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Adicionar Medida
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parte do Corpo
                  </label>
                  <input
                    type="text"
                    value={newBodyPartName}
                    onChange={(e) => setNewBodyPartName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Ex: Braço Direito"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medida (cm)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={newBodyPartMeasurement}
                    onChange={(e) => setNewBodyPartMeasurement(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Ex: 32.5"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddBodyPart(false);
                    setNewBodyPartName("");
                    setNewBodyPartMeasurement("");
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAddBodyPart}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
