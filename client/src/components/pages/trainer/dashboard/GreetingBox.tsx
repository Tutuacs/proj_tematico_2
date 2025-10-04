"use client";

import { useSession } from "next-auth/react";

// GreetingBox.tsx
export default function GreetingBox() {
  const { data: session } = useSession();
  const name = session?.user?.name ?? "Instrutor";

  return (
    <div className="bg-indigo-50 rounded-xl px-6 py-4 mb-6 shadow-sm border border-indigo-100">
      <h2 className="text-xl font-semibold text-indigo-900">
        Olá, {name} 👋
      </h2>
      <p className="text-gray-600">Bem-vindo de volta ao painel.</p>
    </div>
  );
}