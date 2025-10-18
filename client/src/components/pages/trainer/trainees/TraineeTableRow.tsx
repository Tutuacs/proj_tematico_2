// # linha da tabela + botão Editar

import type { Trainee } from "@/lib/types";

export default function TraineeTableRow({
  trainee,
  onEdit,
}: {
  trainee: Trainee;
  onEdit: () => void;
}) {
  return (
    <tr className="even:bg-slate-50/60">
      <td className="px-4 py-3">{trainee.enrollment}</td>
      <td className="px-4 py-3">{trainee.name}</td>
      <td className="px-4 py-3">{trainee.email}</td>
      <td className="px-4 py-3">{trainee.trainerName ?? "-"}</td>
      <td className="px-4 py-3">
        <button
          onClick={onEdit}
          className="rounded-lg bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-800"
        >
          Editar
        </button>
      </td>
    </tr>
  );
}