export default function ActivityTypeBadge({
  type,
}: {
  type: 'CARDIO' | 'FORCA' | 'MOBILIDADE';
}) {
  const styles: Record<typeof type, string> = {
    CARDIO: 'bg-rose-100 text-rose-700 ring-rose-200',
    FORCA: 'bg-indigo-100 text-indigo-700 ring-indigo-200',
    MOBILIDADE: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  };

  const label: Record<typeof type, string> = {
    CARDIO: 'Cardio',
    FORCA: 'Força',
    MOBILIDADE: 'Mobilidade',
  };

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1',
        styles[type],
      ].join(' ')}
    >
      {label[type]}
    </span>
  );
}