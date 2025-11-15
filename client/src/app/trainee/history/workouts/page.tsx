"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useFetch from "@/utils/useFetch";

type Activity = {
  id: string;
  name: string;
  ACTIVITY_TYPE: "CARDIO" | "STRENGTH" | "FLEXIBILITY" | "BALANCE";
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
};

type Exercise = {
  id: string;
  trainId: string;
  activityId: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  description?: string;
  createdAt: string;
  Activity?: Activity;
};

type Train = {
  id: string;
  planId: string;
  weekDay: string;
  from: string;
  to: string;
  Plan?: {
    title: string;
  };
  Exercise?: Exercise[];
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

const ACTIVITY_TYPES: Record<string, string> = {
  CARDIO: "Cardio",
  STRENGTH: "Força",
  FLEXIBILITY: "Flexibilidade",
  BALANCE: "Equilíbrio",
};

export default function WorkoutHistoryPage() {
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTrains = async () => {
      if (!session?.profile?.id) return;

      try {
        setLoading(true);
        const res = await fetchWithAuth(`/train?traineeId=${session.profile.id}`);
        if (res?.status === 200) {
          const trainsData = Array.isArray(res.data) ? res.data : [];
          setTrains(trainsData);
        }
      } catch (error) {
        console.error("Failed to fetch trains", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, [session?.profile?.id]);

  // Calculate total exercises
  const totalExercises = trains.reduce((sum, train) => sum + (train.Exercise?.length || 0), 0);

  // Get trains from this week (based on weekDay)
  const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
  const weekDayMap: Record<number, string> = {
    0: "SUNDAY",
    1: "MONDAY",
    2: "TUESDAY",
    3: "WEDNESDAY",
    4: "THURSDAY",
    5: "FRIDAY",
    6: "SATURDAY",
  };
  
  // Count recent trains (just show total, since we don't have exact dates)
  const thisWeekTrains = trains;

  const handleViewDetails = (train: Train) => {
    setSelectedTrain(train);
    setShowModal(true);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Histórico de Treinos</h1>
          <p className="mt-2 text-gray-600">
            Visualize todos os seus treinos realizados
          </p>
        </div>

        {/* Summary Cards */}
        {!loading && trains.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-600 mb-1">Sessões de Treino</p>
              <p className="text-3xl font-bold text-indigo-600">{trains.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-600 mb-1">Exercícios Realizados</p>
              <p className="text-3xl font-bold text-indigo-600">{totalExercises}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-600 mb-1">Esta Semana</p>
              <p className="text-3xl font-bold text-indigo-600">{thisWeekTrains.length}</p>
            </div>
          </div>
        )}

        {/* Train History */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : trains.length === 0 ? (
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum treino registrado
            </h3>
            <p className="text-gray-600 mb-6">
              Você ainda não registrou nenhum treino. Comece agora!
            </p>
            <Link
              href="/trainee/train/new"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition"
            >
              Registrar Primeiro Treino
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {trains.map((train) => (
              <div
                key={train.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
              >
                {/* Train Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {train.Plan?.title || "Treino"}
                    </h2>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                      <span className="font-medium">
                        {WEEKDAY_NAMES[train.weekDay] || train.weekDay}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {train.Exercise?.length || 0} exercício(s)
                  </span>
                </div>

                {/* Exercises List */}
                <div className="space-y-3 mb-4">
                  {train.Exercise && train.Exercise.length > 0 ? (
                    train.Exercise.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {exercise.Activity?.name || "Exercício"}
                        </h3>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                          {exercise.Activity && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                              {ACTIVITY_TYPES[exercise.Activity.ACTIVITY_TYPE]}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          {exercise.sets && (
                            <span>
                              <strong>Séries:</strong> {exercise.sets}
                            </span>
                          )}

                          {exercise.reps && (
                            <span>
                              <strong>Repetições:</strong> {exercise.reps}
                            </span>
                          )}

                          {exercise.weight && (
                            <span>
                              <strong>Peso:</strong> {exercise.weight} kg
                            </span>
                          )}

                          {exercise.duration && (
                            <span>
                              <strong>Duração:</strong> {exercise.duration} min
                            </span>
                          )}
                        </div>

                        {exercise.description && (
                          <p className="mt-2 text-sm text-gray-500 italic">
                            "{exercise.description}"
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Nenhum exercício registrado</p>
                  )}
                </div>

                <button
                  onClick={() => handleViewDetails(train)}
                  className="w-full text-indigo-600 hover:text-indigo-700 font-medium text-sm py-2 border border-indigo-300 rounded-lg hover:bg-indigo-50 transition"
                >
                  Ver Detalhes Completos
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showModal && selectedTrain && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedTrain.Plan?.title || "Detalhes do Treino"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {WEEKDAY_NAMES[selectedTrain.weekDay] || selectedTrain.weekDay}
                </p>
              </div>
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

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total de Exercícios</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {selectedTrain.Exercise?.length || 0}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Legenda</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-600 rounded"></div>
                      <span className="text-gray-700">Atingiu ou superou a meta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-600 rounded"></div>
                      <span className="text-gray-700">Abaixo da meta planejada</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedTrain.Exercise && selectedTrain.Exercise.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Exercícios Realizados</h3>
                  {selectedTrain.Exercise.map((exercise, index) => (
                    <div key={exercise.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
                              #{index + 1}
                            </span>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {exercise.Activity?.name || "Exercício"}
                            </h4>
                          </div>

                          {exercise.Activity && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm mb-3">
                              {ACTIVITY_TYPES[exercise.Activity.ACTIVITY_TYPE]}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        {(exercise.sets || exercise.Activity?.sets) && (
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Séries</p>
                            <div className="space-y-1">
                              {exercise.Activity?.sets && (
                                <p className="text-xs text-gray-500">
                                  Planejado: {exercise.Activity.sets}
                                </p>
                              )}
                              <p className={`text-lg font-semibold ${
                                exercise.sets && exercise.Activity?.sets && exercise.sets >= exercise.Activity.sets
                                  ? 'text-green-600'
                                  : exercise.sets && exercise.Activity?.sets
                                  ? 'text-orange-600'
                                  : 'text-gray-900'
                              }`}>
                                Feito: {exercise.sets || 0}
                              </p>
                            </div>
                          </div>
                        )}

                        {(exercise.reps || exercise.Activity?.reps) && (
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Repetições</p>
                            <div className="space-y-1">
                              {exercise.Activity?.reps && (
                                <p className="text-xs text-gray-500">
                                  Planejado: {exercise.Activity.reps}
                                </p>
                              )}
                              <p className={`text-lg font-semibold ${
                                exercise.reps && exercise.Activity?.reps && exercise.reps >= exercise.Activity.reps
                                  ? 'text-green-600'
                                  : exercise.reps && exercise.Activity?.reps
                                  ? 'text-orange-600'
                                  : 'text-gray-900'
                              }`}>
                                Feito: {exercise.reps || 0}
                              </p>
                            </div>
                          </div>
                        )}

                        {(exercise.weight || exercise.Activity?.weight) && (
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Peso</p>
                            <div className="space-y-1">
                              {exercise.Activity?.weight && (
                                <p className="text-xs text-gray-500">
                                  Planejado: {exercise.Activity.weight} kg
                                </p>
                              )}
                              <p className={`text-lg font-semibold ${
                                exercise.weight && exercise.Activity?.weight && exercise.weight >= exercise.Activity.weight
                                  ? 'text-green-600'
                                  : exercise.weight && exercise.Activity?.weight
                                  ? 'text-orange-600'
                                  : 'text-gray-900'
                              }`}>
                                Feito: {exercise.weight || 0} kg
                              </p>
                            </div>
                          </div>
                        )}

                        {(exercise.duration || exercise.Activity?.duration) && (
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Duração</p>
                            <div className="space-y-1">
                              {exercise.Activity?.duration && (
                                <p className="text-xs text-gray-500">
                                  Planejado: {exercise.Activity.duration} min
                                </p>
                              )}
                              <p className={`text-lg font-semibold ${
                                exercise.duration && exercise.Activity?.duration && exercise.duration >= exercise.Activity.duration
                                  ? 'text-green-600'
                                  : exercise.duration && exercise.Activity?.duration
                                  ? 'text-orange-600'
                                  : 'text-gray-900'
                              }`}>
                                Feito: {exercise.duration || 0} min
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {exercise.description && (
                        <div className="bg-white rounded p-3 border border-gray-200">
                          <p className="text-xs text-gray-600 mb-1">Observações</p>
                          <p className="text-sm text-gray-900">{exercise.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Nenhum exercício registrado neste treino
                </p>
              )}
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
