// # tabela (thead + tbody)

import type { Trainee } from "@/lib/types";
import TraineeTableRow from "./TraineeTableRow";

type Props = {
  data: Trainee[];
  onEdit: (t: Trainee) => void;
  onCreatePlan: (t: Trainee) => void;
  onCreateReport: (t: Trainee) => void;
  onViewHistory: (t: Trainee) => void;
  onViewReports: (t: Trainee) => void;
};

export default function TraineeTable({ data, onEdit, onCreatePlan, onCreateReport, onViewHistory, onViewReports }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-slate-900 text-white text-sm">
            <th className="px-4 py-3 text-left rounded-l-2xl">Nome aluno</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left rounded-r-2xl">Ações</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {data.map((t) => (
            <TraineeTableRow 
              key={t.id} 
              trainee={t} 
              onEdit={() => onEdit(t)}
              onCreatePlan={() => onCreatePlan(t)}
              onCreateReport={() => onCreateReport(t)}
              onViewHistory={() => onViewHistory(t)}
              onViewReports={() => onViewReports(t)}
            />
          ))}

          {!data.length && (
            <tr>
              <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                Nenhum aluno encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}