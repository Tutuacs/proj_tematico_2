"use client";

type GreetingBoxProps = {
  name?: string;
  /** compat para o trainer */
  totalTrainees?: number;
  /** novas linhas customizadas (aluno) */
  lines?: React.ReactNode[];
};

export default function GreetingBox({
  name = "Instrutor",
  totalTrainees,
  lines,
}: GreetingBoxProps) {
  return (
    <div className="mx-auto w-full max-w-lg bg-white/90 rounded-xl px-6 py-4 shadow-sm border border-gray-200 text-center">
      <p className="text-gray-900 text-base">
        <span className="mr-1">👋</span> Olá, <strong>{name}</strong>
      </p>
      {typeof totalTrainees === "number" ? (
        <p className="text-gray-600">
          Total de alunos vinculados: <strong>{totalTrainees}</strong>
        </p>
      ) : (
        lines?.map((line, i) => (
          <p key={i} className="text-gray-600">{line}</p>
        ))
      )}
    </div>
  );
}