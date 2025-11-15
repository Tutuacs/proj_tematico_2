// # Grid de cards de alunos

import type { Trainee } from "@/lib/types";
import TraineeCard from "./TraineeCard";

type Props = {
  data: Trainee[];
  onEdit: (t: Trainee) => void;
  onCreatePlan: (t: Trainee) => void;
  onCreateReport: (t: Trainee) => void;
  onViewHistory: (t: Trainee) => void;
  onViewReports: (t: Trainee) => void;
};

export default function TraineeTable({ data, onEdit, onCreatePlan, onCreateReport, onViewHistory, onViewReports }: Props) {
  if (!data.length) {
    return (
      <div className="text-center py-16">
        <svg
          className="mx-auto h-16 w-16 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p className="text-gray-600 text-lg font-medium mb-2">Nenhum aluno encontrado</p>
        <p className="text-gray-500 text-sm">Tente ajustar os filtros de busca</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((t) => (
        <TraineeCard
          key={t.id}
          trainee={t}
          onEdit={() => onEdit(t)}
          onCreatePlan={() => onCreatePlan(t)}
          onCreateReport={() => onCreateReport(t)}
          onViewHistory={() => onViewHistory(t)}
          onViewReports={() => onViewReports(t)}
        />
      ))}
    </div>
  );
}