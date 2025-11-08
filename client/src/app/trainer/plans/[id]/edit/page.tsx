"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
  id?: string;
  name: string;
  ACTIVITY_TYPE: "CARDIO" | "STRENGTH" | "FLEXIBILITY" | "BALANCE";
  description?: string;
  weight?: number;
  reps?: number;
  sets?: number;
  duration?: number;
};

type Plan = {
  id: string;
  traineeId: string;
  trainerId: string;
  title: string;
  description?: string;
  from: string;
  to: string;
  Trainee: Profile;
  Trainer: Profile;
  Activity: Activity[];
};

const ACTIVITY_TYPES = [
  { value: "CARDIO", label: "Cardio" },
  { value: "STRENGTH", label: "Força" },
  { value: "FLEXIBILITY", label: "Flexibilidade" },
  { value: "BALANCE", label: "Equilíbrio" },
];

export default function EditPlanPage() {
  const router = useRouter();
  const params = useParams();
  const planId = params.id as string;
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [plan, setPlan] = useState<Plan | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [activities, setActivities] = useState<Activity[]>([]);
  const [deletedActivityIds, setDeletedActivityIds] = useState<string[]>([]);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [activityForm, setActivityForm] = useState<Activity>({
    name: "",
    ACTIVITY_TYPE: "STRENGTH",
    description: "",
    weight: undefined,
    reps: undefined,
    sets: undefined,
    duration: undefined,
  });

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        const res = await fetchWithAuth(`/plan/${planId}`);
        
        if (res?.status === 200 && res.data) {
          const planData: Plan = res.data;
          setPlan(planData);
          setTitle(planData.title);
          setDescription(planData.description || "");
          
          const fromDate = new Date(planData.from);
          const toDate = new Date(planData.to);
          setDateFrom(fromDate.toISOString().split('T')[0]);
          setDateTo(toDate.toISOString().split('T')[0]);
          
          setActivities(planData.Activity || []);
        } else {
          alert("Erro ao carregar plano");
          router.push("/trainer/plans");
        }
      } catch (error) {
        console.error("Failed to fetch plan", error);
        alert("Erro ao carregar plano");
        router.push("/trainer/plans");
      } finally {
        setLoading(false);
      }
    };

    if (planId) {
      fetchPlan();
    }
  }, [planId]);

  const handleAddActivity = () => {
    setEditingIndex(null);
    setActivityForm({
      name: "",
      ACTIVITY_TYPE: "STRENGTH",
      description: "",
      weight: undefined,
      reps: undefined,
      sets: undefined,
      duration: undefined,
    });
    setShowActivityModal(true);
  };

  const handleEditActivity = (index: number) => {
    setEditingIndex(index);
    setActivityForm({ ...activities[index] });
    setShowActivityModal(true);
  };

  const handleSaveActivity = () => {
    if (!activityForm.name.trim()) {
      alert("Nome da atividade é obrigatório");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...activities];
      updated[editingIndex] = activityForm;
      setActivities(updated);
    } else {
      const newActivity: Activity = { ...activityForm };
      delete newActivity.id;
      setActivities([...activities, newActivity]);
    }

    setShowActivityModal(false);
  };

  const handleDeleteActivity = (index: number) => {
    if (confirm("Remover esta atividade?")) {
      const activity = activities[index];
      
      if (activity.id) {
        setDeletedActivityIds([...deletedActivityIds, activity.id]);
      }
      
      setActivities(activities.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Título é obrigatório");
      return;
    }
    if (!dateFrom || !dateTo) {
      alert("Datas são obrigatórias");
      return;
    }
    if (activities.length === 0) {
      alert("Adicione pelo menos uma atividade ao plano");
      return;
    }

    try {
      setSubmitting(true);

      const fromDate = new Date(dateFrom);
      const toDate = new Date(dateTo);

      const planBody: any = {
        title,
        from: fromDate.toISOString(),
        to: toDate.toISOString(),
      };

      if (description && description.trim()) {
        planBody.description = description;
      }

      console.log("Updating plan with body:", planBody);

      const planRes = await fetchWithAuth(`/plan/${planId}`, {
        method: "PATCH",
        body: JSON.stringify(planBody),
      });

      if (!planRes || planRes.status !== 200) {
        throw new Error("Failed to update plan");
      }

      if (deletedActivityIds.length > 0) {
        console.log("Deleting activities:", deletedActivityIds);
        
        const deletePromises = deletedActivityIds.map(activityId =>
          fetchWithAuth(`/plan/${planId}/activities/${activityId}`, {
            method: "DELETE",
          })
        );

        await Promise.all(deletePromises);
      }

      const existingActivities = activities.filter(a => a.id);
      const newActivities = activities.filter(a => !a.id);

      if (existingActivities.length > 0) {
        console.log("Updating existing activities:", existingActivities);
        
        const updatePromises = existingActivities.map(activity =>
          fetchWithAuth(`/activity/${activity.id}`, {
            method: "PATCH",
            body: JSON.stringify({
              name: activity.name,
              ACTIVITY_TYPE: activity.ACTIVITY_TYPE,
              description: activity.description,
              weight: activity.weight,
              reps: activity.reps,
              sets: activity.sets,
              duration: activity.duration,
              planId: planId,
            }),
          })
        );

        await Promise.all(updatePromises);
      }

      if (newActivities.length > 0) {
        console.log("Creating new activities:", newActivities);

        const activitiesRes = await fetchWithAuth(`/plan/${planId}/activities`, {
          method: "POST",
          body: JSON.stringify(newActivities),
        });

        if (!activitiesRes || activitiesRes.status !== 201) {
          console.error("Failed to create activities");
          alert("Plano atualizado, mas houve erro ao adicionar novas atividades");
        }
      }

      alert("Plano atualizado com sucesso!");
      router.push("/trainer/plans");
    } catch (error) {
      console.error("Failed to update plan", error);
      alert("Erro ao atualizar plano. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando plano...</p>
        </div>
      </main>
    );
  }

  if (!plan) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Editar Plano</h1>
            <p className="text-gray-600 mt-1">
              Aluno: {plan.Trainee.name || plan.Trainee.email}
            </p>
          </div>
          <Link
            href="/trainer/plans"
            className="text-gray-600 hover:text-gray-900"
          >
            ← Voltar
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Informações Básicas</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aluno
                </label>
                <input
                  type="text"
                  value={plan.Trainee.name || plan.Trainee.email}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  O aluno não pode ser alterado
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título do Plano *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Plano de Hipertrofia - Janeiro"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descrição opcional do plano"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Início *
                  </label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Fim *
                  </label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Atividades do Plano</h2>
              <button
                onClick={handleAddActivity}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                + Adicionar Atividade
              </button>
            </div>

            {activities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhuma atividade adicionada ainda.
                <br />
                Clique em "Adicionar Atividade" para começar.
              </div>
            ) : (
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <div
                    key={activity.id || `new-${index}`}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{activity.name}</h3>
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {ACTIVITY_TYPES.find((t) => t.value === activity.ACTIVITY_TYPE)?.label}
                          </span>
                          {!activity.id && (
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Nova
                            </span>
                          )}
                        </div>
                        {activity.description && (
                          <p className="text-gray-600 text-sm mb-2">
                            {activity.description}
                          </p>
                        )}
                        <div className="flex gap-4 text-sm text-gray-700">
                          {activity.weight && (
                            <span>Peso: {activity.weight}kg</span>
                          )}
                          {activity.sets && (
                            <span>Séries: {activity.sets}</span>
                          )}
                          {activity.reps && (
                            <span>Repetições: {activity.reps}</span>
                          )}
                          {activity.duration && (
                            <span>Duração: {activity.duration}min</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditActivity(index)}
                          className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteActivity(index)}
                          className="text-red-600 hover:text-red-800 px-3 py-1 rounded"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t pt-6 flex justify-end gap-3">
            <Link
              href="/trainer/plans"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </Link>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50"
            >
              {submitting ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </div>
      </div>

      {showActivityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingIndex !== null ? "Editar Atividade" : "Nova Atividade"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Atividade *
                </label>
                <input
                  type="text"
                  value={activityForm.name}
                  onChange={(e) =>
                    setActivityForm({ ...activityForm, name: e.target.value })
                  }
                  placeholder="Ex: Supino Reto"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo *
                </label>
                <select
                  value={activityForm.ACTIVITY_TYPE}
                  onChange={(e) =>
                    setActivityForm({
                      ...activityForm,
                      ACTIVITY_TYPE: e.target.value as any,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {ACTIVITY_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={activityForm.description || ""}
                  onChange={(e) =>
                    setActivityForm({
                      ...activityForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Descrição da atividade"
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    value={activityForm.weight || ""}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        weight: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    placeholder="Ex: 80"
                    min="0"
                    step="0.5"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Séries
                  </label>
                  <input
                    type="number"
                    value={activityForm.sets || ""}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        sets: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    placeholder="Ex: 3"
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Repetições
                  </label>
                  <input
                    type="number"
                    value={activityForm.reps || ""}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        reps: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    placeholder="Ex: 12"
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duração (min)
                  </label>
                  <input
                    type="number"
                    value={activityForm.duration || ""}
                    onChange={(e) =>
                      setActivityForm({
                        ...activityForm,
                        duration: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    placeholder="Ex: 30"
                    min="0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowActivityModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveActivity}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                {editingIndex !== null ? "Salvar Alterações" : "Adicionar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
