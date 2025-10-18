// # tabela (thead + tbody)

import type { Trainee } from "@/lib/types";
import TraineeTableRow from "./TraineeTableRow";

type Props = {
  data: Trainee[];
  onEdit: (t: Trainee) => void;
};

export default function TraineeTable({ data, onEdit }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-slate-900 text-white text-sm">
            <th className="px-4 py-3 text-left rounded-l-2xl">Matrícula</th>
            <th className="px-4 py-3 text-left">Nome aluno</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Instrutor</th>
            <th className="px-4 py-3 text-left rounded-r-2xl">Editar</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {data.map((t) => (
            <TraineeTableRow key={t.id} trainee={t} onEdit={() => onEdit(t)} />
          ))}

          {!data.length && (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                Nenhum aluno encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}