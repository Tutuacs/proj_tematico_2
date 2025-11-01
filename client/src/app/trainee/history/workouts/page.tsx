"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useFetch from "@/utils/useFetch";

type Activity = {
  id: string;
  name: string;
  type: "CARDIO" | "STRENGTH" | "FLEXIBILITY" | "BALANCE";
};

type Train = {
  id: string;
  planId: string;
  weekDay: string;
  activity: Activity;
  Plan?: {
    title: string;
  };
};

type Exercise = {
  id: string;
  trainId: string;
  activityId: string;
  series?: number;
  repetitions?: number;
  weight?: number;
  duration?: number;
  observations?: string;
  createdAt: string;
  Train?: Train;
  Activity?: Activity;
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

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      if (!session?.profile?.id) return;

      try {
        setLoading(true);
        const res = await fetchWithAuth(`/exercise?traineeId=${session.profile.id}`);
        if (res?.status === 200) {
          const exercisesData = Array.isArray(res.data) ? res.data : [];
          setExercises(exercisesData);
        }
      } catch (error) {
        console.error("Failed to fetch exercises", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [session?.profile?.id]);

  // Group exercises by date
  const exercisesByDate = exercises.reduce((acc, exercise) => {
    const date = new Date(exercise.createdAt).toLocaleDateString("pt-BR");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);

  const dates = Object.keys(exercisesByDate).sort(
    (a, b) => new Date(b.split("/").reverse().join("-")).getTime() - new Date(a.split("/").reverse().join("-")).getTime()
  );

  const handleViewDetails = (exercise: Exercise) => {
    setSelectedExercise(exercise);
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
        {!loading && exercises.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-600 mb-1">Total de Treinos</p>
              <p className="text-3xl font-bold text-indigo-600">{dates.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-600 mb-1">Exercícios Realizados</p>
              <p className="text-3xl font-bold text-indigo-600">{exercises.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-600 mb-1">Esta Semana</p>
              <p className="text-3xl font-bold text-indigo-600">
                {
                  exercises.filter((ex) => {
                    const exDate = new Date(ex.createdAt);
                    const now = new Date();
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return exDate >= weekAgo;
                  }).length
                }
              </p>
            </div>
          </div>
        )}

        {/* Exercise History */}
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
        ) : exercises.length === 0 ? (
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
            {dates.map((date) => (
              <div
                key={date}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
              >
                {/* Date Header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{date}</h2>
                  <span className="text-sm text-gray-500">
                    {exercisesByDate[date].length} exercício(s)
                  </span>
                </div>

                {/* Exercises List */}
                <div className="space-y-3">
                  {exercisesByDate[date].map((exercise) => (
                    <div
                      key={exercise.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {exercise.Activity?.name || exercise.Train?.activity?.name || "Exercício"}
                          </h3>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                            {exercise.Activity && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                                {ACTIVITY_TYPES[exercise.Activity.type]}
                              </span>
                            )}

                            {exercise.Train?.Plan && (
                              <span>
                                <strong>Plano:</strong> {exercise.Train.Plan.title}
                              </span>
                            )}

                            {exercise.Train?.weekDay && (
                              <span>
                                <strong>Dia:</strong>{" "}
                                {WEEKDAY_NAMES[exercise.Train.weekDay] || exercise.Train.weekDay}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            {exercise.series && (
                              <span>
                                <strong>Séries:</strong> {exercise.series}
                              </span>
                            )}

                            {exercise.repetitions && (
                              <span>
                                <strong>Repetições:</strong> {exercise.repetitions}
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

                          {exercise.observations && (
                            <p className="mt-2 text-sm text-gray-500 italic">
                              "{exercise.observations}"
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => handleViewDetails(exercise)}
                          className="ml-4 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                        >
                          Detalhes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showModal && selectedExercise && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Detalhes do Exercício
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

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Exercício</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedExercise.Activity?.name || selectedExercise.Train?.activity?.name}
                </p>
              </div>

              {selectedExercise.Activity && (
                <div>
                  <p className="text-sm text-gray-600">Tipo</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {ACTIVITY_TYPES[selectedExercise.Activity.type]}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {selectedExercise.series && (
                  <div>
                    <p className="text-sm text-gray-600">Séries</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedExercise.series}
                    </p>
                  </div>
                )}

                {selectedExercise.repetitions && (
                  <div>
                    <p className="text-sm text-gray-600">Repetições</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedExercise.repetitions}
                    </p>
                  </div>
                )}

                {selectedExercise.weight && (
                  <div>
                    <p className="text-sm text-gray-600">Peso</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedExercise.weight} kg
                    </p>
                  </div>
                )}

                {selectedExercise.duration && (
                  <div>
                    <p className="text-sm text-gray-600">Duração</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedExercise.duration} min
                    </p>
                  </div>
                )}
              </div>

              {selectedExercise.observations && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Observações</p>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedExercise.observations}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-600">Data de Realização</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(selectedExercise.createdAt).toLocaleDateString("pt-BR")} às{" "}
                  {new Date(selectedExercise.createdAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
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
