// # título + busca (alinha com teu wireframe)

"use client";

type Props = {
  title?: string;
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
};

export default function TraineeSearchBar({ title = "Alunos registrados", value, onChange, onSubmit }: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>

      <div className="flex items-center gap-2 w-full sm:w-[420px]">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
          placeholder="Buscar por nome, email ou matrícula"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-300"
        />
        <button
          onClick={onSubmit}
          className="grid h-[42px] w-[42px] place-items-center rounded-xl bg-slate-900 text-white hover:bg-slate-800"
          aria-label="Buscar"
          title="Buscar"
        >
          🔍
        </button>
      </div>
    </div>
  );
}