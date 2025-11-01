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
      const reportRes = await fetchWithAuth(`/report`, {
        method: "POST",
        body: JSON.stringify({
          profileId: traineeId,
          height: parseFloat(height),
          weight: parseFloat(weight),
          imc: parseFloat(imc),
          observations: observations || undefined,
        }),
      });

      if (!reportRes || reportRes.status !== 201) {
        throw new Error("Failed to create report");
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
              measurement: parseFloat(bodyPart.measurement),
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
          <Link
            href="/trainer/dashboard"
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
            {bodyParts.length === 0 && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">Adicionar rapidamente:</p>
                <div className="flex flex-wrap gap-2">
                  {COMMON_BODY_PARTS.map((part) => (
                    <button
                      key={part}
                      type="button"
                      onClick={() => handleQuickAddBodyPart(part)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition"
                    >
                      {part}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Body Parts List */}
            {bodyParts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-2"
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
                <p>Nenhuma medida adicionada</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Parte do Corpo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Medida (cm)
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bodyParts.map((bodyPart, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {bodyPart.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {bodyPart.measurement} cm
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button
                            type="button"
                            onClick={() => handleRemoveBodyPart(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Link
              href="/trainer/dashboard"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition"
            >
              Cancelar
            </Link>
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
