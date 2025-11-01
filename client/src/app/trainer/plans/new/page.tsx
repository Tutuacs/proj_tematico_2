"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useFetch from "@/utils/useFetch";

type Profile = {
  id: string;
  name: string;
  email: string;
  role: number;
};

type Activity = {
  id: string;
  name: string;
  type: "CARDIO" | "STRENGTH" | "FLEXIBILITY" | "BALANCE";
  description?: string;
};

type TrainActivity = {
  activityId: string;
  activity: Activity;
  series?: number;
  repetitions?: number;
  weight?: number;
  duration?: number;
};

type DayPlan = {
  weekDay: string;
  activities: TrainActivity[];
};

const WEEKDAYS = [
  { value: "MONDAY", label: "Segunda-feira" },
  { value: "TUESDAY", label: "Terça-feira" },
  { value: "WEDNESDAY", label: "Quarta-feira" },
  { value: "THURSDAY", label: "Quinta-feira" },
  { value: "FRIDAY", label: "Sexta-feira" },
  { value: "SATURDAY", label: "Sábado" },
  { value: "SUNDAY", label: "Domingo" },
];

export default function CreatePlanPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Step 1: Basic Info
  const [trainees, setTrainees] = useState<Profile[]>([]);
  const [traineeId, setTraineeId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Step 2: Select Days
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Step 3: Add Activities per Day
  const [activities, setActivities] = useState<Activity[]>([]);
  const [dayPlans, setDayPlans] = useState<Map<string, TrainActivity[]>>(new Map());
  const [currentDay, setCurrentDay] = useState<string | null>(null);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activityForm, setActivityForm] = useState({
    series: "",
    repetitions: "",
    weight: "",
    duration: "",
  });

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

  // Load activities when needed
  useEffect(() => {
    const fetchActivities = async () => {
      if (step !== 3 || activities.length > 0) return;

      try {
        const res = await fetchWithAuth(`/activity`);
        if (res?.status === 200) {
          const activitiesData = Array.isArray(res.data) ? res.data : [];
          setActivities(activitiesData);
        }
      } catch (error) {
        console.error("Failed to fetch activities", error);
      }
    };

    fetchActivities();
  }, [step]);

  const handleNextStep = () => {
    if (step === 1) {
      if (!traineeId || !title || !dateFrom || !dateTo) {
        alert("Preencha todos os campos obrigatórios");
        return;
      }
      if (new Date(dateFrom) >= new Date(dateTo)) {
        alert("A data de início deve ser anterior à data de fim");
        return;
      }
    }

    if (step === 2) {
      if (selectedDays.length === 0) {
        alert("Selecione pelo menos um dia da semana");
        return;
      }
      // Initialize currentDay to first selected day
      setCurrentDay(selectedDays[0]);
    }

    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
      // Remove activities for this day
      const newDayPlans = new Map(dayPlans);
      newDayPlans.delete(day);
      setDayPlans(newDayPlans);
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleAddActivity = () => {
    if (!selectedActivity || !currentDay) return;

    const newActivity: TrainActivity = {
      activityId: selectedActivity.id,
      activity: selectedActivity,
      series: activityForm.series ? parseInt(activityForm.series) : undefined,
      repetitions: activityForm.repetitions ? parseInt(activityForm.repetitions) : undefined,
      weight: activityForm.weight ? parseFloat(activityForm.weight) : undefined,
      duration: activityForm.duration ? parseInt(activityForm.duration) : undefined,
    };

    const currentActivities = dayPlans.get(currentDay) || [];
    const newDayPlans = new Map(dayPlans);
    newDayPlans.set(currentDay, [...currentActivities, newActivity]);
    setDayPlans(newDayPlans);

    // Reset form
    setShowActivityModal(false);
    setSelectedActivity(null);
    setActivityForm({ series: "", repetitions: "", weight: "", duration: "" });
  };

  const handleRemoveActivity = (day: string, index: number) => {
    const currentActivities = dayPlans.get(day) || [];
    const newActivities = currentActivities.filter((_, i) => i !== index);
    const newDayPlans = new Map(dayPlans);
    newDayPlans.set(day, newActivities);
    setDayPlans(newDayPlans);
  };

  const handleSubmit = async () => {
    // Validate that all days have at least one activity
    for (const day of selectedDays) {
      const dayActivities = dayPlans.get(day) || [];
      if (dayActivities.length === 0) {
        alert(`O dia ${WEEKDAYS.find((w) => w.value === day)?.label} precisa ter pelo menos uma atividade`);
        return;
      }
    }

    try {
      setSubmitting(true);

      // 1. Create Plan
      const planRes = await fetchWithAuth(`/plan`, {
        method: "POST",
        body: JSON.stringify({
          traineeId,
          title,
          description,
          from: new Date(dateFrom).toISOString(),
          to: new Date(dateTo).toISOString(),
        }),
      });

      if (!planRes || planRes.status !== 201) {
        throw new Error("Failed to create plan");
      }

      const planId = planRes.data.id;

      // 2. Create Trains for each day with activities
      const trainPromises: Promise<any>[] = [];

      for (const day of selectedDays) {
        const dayActivities = dayPlans.get(day) || [];

        for (const trainActivity of dayActivities) {
          const trainPromise = fetchWithAuth(`/train`, {
            method: "POST",
            body: JSON.stringify({
              planId,
              weekDay: day,
              activityId: trainActivity.activityId,
              series: trainActivity.series,
              repetitions: trainActivity.repetitions,
              weight: trainActivity.weight,
              duration: trainActivity.duration,
            }),
          });
          trainPromises.push(trainPromise);
        }
      }

      await Promise.all(trainPromises);

      alert("Plano criado com sucesso!");
      router.push("/trainer/plans");
    } catch (error) {
      console.error("Failed to create plan", error);
      alert("Erro ao criar plano. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Criar Novo Plano</h1>
          <p className="mt-2 text-gray-600">
            Passo {step} de 4
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {["Informações", "Dias", "Atividades", "Revisão"].map((label, index) => (
              <div key={index} className="flex-1 text-center">
                <div
                  className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step > index + 1
                      ? "bg-green-500 text-white"
                      : step === index + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step > index + 1 ? "✓" : index + 1}
                </div>
                <p className="text-xs mt-1 text-gray-600">{label}</p>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Informações Básicas do Plano
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
                >
                  <option value="">Selecione um aluno...</option>
                  {trainees.map((trainee) => (
                    <option key={trainee.id} value={trainee.id}>
                      {trainee.name} ({trainee.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título do Plano <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ex: Treino de Hipertrofia - Iniciante"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição (opcional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Descreva os objetivos e características do plano..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Início <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Término <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Link
                href="/trainer/plans"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition"
              >
                Cancelar
              </Link>
              <button
                onClick={handleNextStep}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition"
              >
                Próximo
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Days */}
        {step === 2 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Selecione os Dias da Semana
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Escolha em quais dias da semana o aluno treinará
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {WEEKDAYS.map((day) => (
                <button
                  key={day.value}
                  onClick={() => toggleDay(day.value)}
                  className={`p-4 rounded-lg border-2 font-medium transition ${
                    selectedDays.includes(day.value)
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{day.label}</span>
                    {selectedDays.includes(day.value) && (
                      <svg
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selectedDays.length > 0 && (
              <p className="mt-4 text-sm text-gray-600">
                {selectedDays.length} dia(s) selecionado(s)
              </p>
            )}

            <div className="mt-6 flex justify-between">
              <button
                onClick={handlePreviousStep}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition"
              >
                Voltar
              </button>
              <button
                onClick={handleNextStep}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition"
              >
                Próximo
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Add Activities per Day */}
        {step === 3 && (
          <div className="space-y-4">
            {/* Day Selector */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Configurar treino para:
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedDays.map((day) => {
                  const dayLabel = WEEKDAYS.find((w) => w.value === day)?.label;
                  const dayActivities = dayPlans.get(day) || [];

                  return (
                    <button
                      key={day}
                      onClick={() => setCurrentDay(day)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        currentDay === day
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {dayLabel}
                      {dayActivities.length > 0 && (
                        <span className="ml-2 text-xs">
                          ({dayActivities.length})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Activities for Current Day */}
            {currentDay && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {WEEKDAYS.find((w) => w.value === currentDay)?.label}
                  </h3>
                  <button
                    onClick={() => setShowActivityModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition text-sm"
                  >
                    + Adicionar Atividade
                  </button>
                </div>

                {/* Activities List */}
                {(dayPlans.get(currentDay) || []).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Nenhuma atividade adicionada para este dia</p>
                    <p className="text-sm mt-2">Clique em "Adicionar Atividade" para começar</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(dayPlans.get(currentDay) || []).map((trainActivity, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xs">
                                {index + 1}
                              </span>
                              <h4 className="font-semibold text-gray-900">
                                {trainActivity.activity.name}
                              </h4>
                            </div>

                            <div className="flex flex-wrap gap-3 text-sm text-gray-600 ml-8">
                              {trainActivity.series && (
                                <span>Séries: {trainActivity.series}</span>
                              )}
                              {trainActivity.repetitions && (
                                <span>Reps: {trainActivity.repetitions}</span>
                              )}
                              {trainActivity.weight && (
                                <span>Peso: {trainActivity.weight} kg</span>
                              )}
                              {trainActivity.duration && (
                                <span>Duração: {trainActivity.duration} min</span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => handleRemoveActivity(currentDay, index)}
                            className="text-red-600 hover:text-red-700 ml-4"
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
            )}

            <div className="flex justify-between">
              <button
                onClick={handlePreviousStep}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition"
              >
                Voltar
              </button>
              <button
                onClick={handleNextStep}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition"
              >
                Próximo
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Revisão do Plano
            </h2>

            {/* Basic Info */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Informações Básicas</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <p>
                  <strong>Aluno:</strong>{" "}
                  {trainees.find((t) => t.id === traineeId)?.name}
                </p>
                <p>
                  <strong>Título:</strong> {title}
                </p>
                {description && (
                  <p>
                    <strong>Descrição:</strong> {description}
                  </p>
                )}
                <p>
                  <strong>Período:</strong>{" "}
                  {new Date(dateFrom).toLocaleDateString("pt-BR")} →{" "}
                  {new Date(dateTo).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>

            {/* Days and Activities */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Treinos por Dia ({selectedDays.length} dias)
              </h3>
              <div className="space-y-4">
                {selectedDays.map((day) => {
                  const dayLabel = WEEKDAYS.find((w) => w.value === day)?.label;
                  const dayActivities = dayPlans.get(day) || [];

                  return (
                    <div key={day} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {dayLabel} - {dayActivities.length} atividade(s)
                      </h4>
                      <div className="space-y-2">
                        {dayActivities.map((activity, index) => (
                          <div key={index} className="text-sm text-gray-600 ml-4">
                            <span className="font-medium text-gray-900">
                              {index + 1}. {activity.activity.name}
                            </span>
                            {" - "}
                            {[
                              activity.series && `${activity.series} séries`,
                              activity.repetitions && `${activity.repetitions} reps`,
                              activity.weight && `${activity.weight} kg`,
                              activity.duration && `${activity.duration} min`,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePreviousStep}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition"
              >
                Voltar
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2 px-8 rounded-lg transition"
              >
                {submitting ? "Salvando..." : "Criar Plano"}
              </button>
            </div>
          </div>
        )}

        {/* Activity Selection Modal */}
        {showActivityModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowActivityModal(false)}
          >
            <div
              className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Selecionar Atividade
              </h3>

              {/* Activity List */}
              <div className="mb-4 max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                {activities.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => setSelectedActivity(activity)}
                    className={`w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 ${
                      selectedActivity?.id === activity.id ? "bg-indigo-50" : ""
                    }`}
                  >
                    <div className="font-medium text-gray-900">{activity.name}</div>
                    {activity.description && (
                      <div className="text-sm text-gray-600 line-clamp-1">
                        {activity.description}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Activity Form */}
              {selectedActivity && (
                <div className="space-y-4 mb-4">
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <p className="font-medium text-indigo-900">
                      {selectedActivity.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Séries
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={activityForm.series}
                        onChange={(e) =>
                          setActivityForm({ ...activityForm, series: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ex: 3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Repetições
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={activityForm.repetitions}
                        onChange={(e) =>
                          setActivityForm({
                            ...activityForm,
                            repetitions: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ex: 12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Peso (kg)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={activityForm.weight}
                        onChange={(e) =>
                          setActivityForm({ ...activityForm, weight: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ex: 10"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duração (min)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={activityForm.duration}
                        onChange={(e) =>
                          setActivityForm({
                            ...activityForm,
                            duration: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Ex: 30"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowActivityModal(false);
                    setSelectedActivity(null);
                    setActivityForm({
                      series: "",
                      repetitions: "",
                      weight: "",
                      duration: "",
                    });
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddActivity}
                  disabled={!selectedActivity}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-2 px-4 rounded-lg transition"
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
