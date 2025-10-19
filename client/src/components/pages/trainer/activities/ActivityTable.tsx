import ActivityTypeBadge from './ActivityTypeBadge';

export type ActivityRow = {
  id: string;
  name: string;
  type: 'CARDIO' | 'FORCA' | 'MOBILIDADE';
  description?: string;
  weight?: number | null;
  sets?: number | null;
  reps?: number | null;
  duration?: number | null; // minutos
};

export default function ActivityTable({
  data,
  onEdit,
}: {
  data: ActivityRow[];
  onEdit: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-slate-900 text-white">
          <tr className="text-left text-sm">
            <th className="px-4 py-3 font-medium">Tipo</th>
            <th className="px-4 py-3 font-medium">Atividade</th>
            <th className="px-4 py-3 font-medium">Descrição</th>
            <th className="px-4 py-3 font-medium">Peso</th>
            <th className="px-4 py-3 font-medium">Séries</th>
            <th className="px-4 py-3 font-medium">Repetições</th>
            <th className="px-4 py-3 font-medium">Duração</th>
            <th className="px-4 py-3 font-medium">Editar</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 bg-white text-sm">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <ActivityTypeBadge type={row.type} />
              </td>
              <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
              <td className="px-4 py-3 text-slate-600">
                {row.description || '—'}
              </td>
              <td className="px-4 py-3">{row.weight ?? '—'}</td>
              <td className="px-4 py-3">{row.sets ?? '—'}</td>
              <td className="px-4 py-3">{row.reps ?? '—'}</td>
              <td className="px-4 py-3">
                {row.duration ? `${row.duration} min` : '—'}
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onEdit(row.id)}
                  className="rounded-lg bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-800"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td className="px-4 py-8 text-center text-slate-500" colSpan={8}>
                Nenhuma atividade encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}