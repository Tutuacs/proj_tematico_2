"use client";

type GreetingBoxProps = {
  name?: string;
  totalTrainees?: number;
};

export default function GreetingBox({
  name = "Instrutor",
  totalTrainees,
}: GreetingBoxProps) {
  return (
    <div className="mx-auto w-full max-w-lg bg-white/90 rounded-xl px-6 py-4 shadow-sm border border-gray-200 text-center">
      <p className="text-gray-900 text-base">
        <span className="mr-1">👋</span> Olá, <strong>{name}</strong>
      </p>
      {typeof totalTrainees === "number" && (
        <p className="text-gray-600">
          Total de alunos vinculados: <strong>{totalTrainees}</strong>
        </p>
      )}
    </div>
  );
}