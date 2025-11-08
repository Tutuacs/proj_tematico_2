import type { Trainee } from "@/lib/types";

const roleNames: Record<number, string> = {
  0: "Aluno",
  1: "Instrutor",
  2: "Admin",
};

export default function TraineeTableRow({
  trainee,
  onEdit,
  onCreatePlan,
  onCreateReport,
  onViewHistory,
  onViewReports,
}: {
  trainee: Trainee;
  onEdit: () => void;
  onCreatePlan: () => void;
  onCreateReport: () => void;
  onViewHistory: () => void;
  onViewReports: () => void;
}) {
  return (
    <tr className="even:bg-slate-50/60">
      <td className="px-4 py-3">{trainee.name}</td>
      <td className="px-4 py-3">{trainee.email}</td>
      <td className="px-4 py-3">{roleNames[trainee.role || 0] || "N/A"}</td>
      <td className="px-4 py-3">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onEdit}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white hover:bg-slate-800"
          >
            Editar
          </button>
          <button
            onClick={onCreatePlan}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700"
          >
            Criar Plano
          </button>
          <button
            onClick={onCreateReport}
            className="rounded-lg bg-green-600 px-3 py-1.5 text-xs text-white hover:bg-green-700"
          >
            Nova Avaliação
          </button>
          <button
            onClick={onViewHistory}
            className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs text-white hover:bg-purple-700"
          >
            Ver Planos
          </button>
          <button
            onClick={onViewReports}
            className="rounded-lg bg-orange-600 px-3 py-1.5 text-xs text-white hover:bg-orange-700"
          >
            Ver Avaliações
          </button>
        </div>
      </td>
    </tr>
  );
}