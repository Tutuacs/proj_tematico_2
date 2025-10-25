import type { Trainee } from "@/lib/types";

const roleNames: Record<number, string> = {
  0: "Aluno",
  1: "Instrutor",
  2: "Admin",
};

export default function TraineeTableRow({
  trainee,
  onEdit,
}: {
  trainee: Trainee;
  onEdit: () => void;
}) {
  return (
    <tr className="even:bg-slate-50/60">
      <td className="px-4 py-3">{trainee.name}</td>
      <td className="px-4 py-3">{trainee.email}</td>
      <td className="px-4 py-3">{roleNames[trainee.role || 0] || "N/A"}</td>
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