// NavLinks.tsx
"use client";

import { ROLE } from "@/common/role.enums";
import Link from "next/link";
import ButtonLogout from "./ButtonLogout";
import { useSession } from "next-auth/react";

export default function NavLinks() {
  const { data: session, status } = useSession();

  if (session?.profile?.role === ROLE.ADMIN) {
    return (
      <main>
        <div className="flex p-4 flex-row justify-between items-center">
          <div className="flex space-x-4">
            <Link className="p-2 hover:text-blue-300 transition-colors" href="/admin/dashboard">
              Dashboard
            </Link>
            <Link className="p-2 hover:text-blue-300 transition-colors" href="/admin/users">
              Usuários
            </Link>
            <Link className="p-2 hover:text-blue-300 transition-colors" href="/admin/activities">
              Atividades
            </Link>
            <span className="p-2 text-gray-300">
              {session?.profile?.name}
            </span>
          </div>
          <div className="flex space-x-4">
            <ButtonLogout />
          </div>
        </div>
      </main>
    );
  } else if (session?.profile?.role === ROLE.TRAINER) {
    return (
      <main>
        <div className="flex p-4 flex-row justify-between items-center">
          <div className="flex space-x-4">
            <Link className="p-2 hover:text-purple-300 transition-colors" href="/trainer/dashboard">
              Dashboard
            </Link>
            <Link className="p-2 hover:text-purple-300 transition-colors" href="/trainer/plans">
              Planos
            </Link>
            <Link className="p-2 hover:text-purple-300 transition-colors" href="/trainer/reports/new">
              Nova Avaliação
            </Link>
            <span className="p-2 text-gray-300">
              {session?.profile?.name}
            </span>
          </div>
          <div className="flex space-x-4">
            <ButtonLogout />
          </div>
        </div>
      </main>
    );
  } else if (session?.profile?.role === ROLE.TRAINEE) {
    return (
      <main>
        <div className="flex p-4 flex-row justify-between items-center">
          <div className="flex space-x-4">
            <Link className="p-2 hover:text-blue-300 transition-colors" href="/trainee/dashboard">
              Dashboard
            </Link>
            <Link className="p-2 hover:text-blue-300 transition-colors" href="/trainee/plans">
              Meus Planos
            </Link>
            <Link className="p-2 hover:text-blue-300 transition-colors" href="/trainee/history/assessments">
              Avaliações
            </Link>
            <Link className="p-2 hover:text-blue-300 transition-colors" href="/trainee/history/workouts">
              Histórico
            </Link>
            <span className="p-2 text-gray-300">
              {session?.profile?.name}
            </span>
          </div>
          <div className="flex space-x-4">
            <ButtonLogout />
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <div className="flex p-4 flex-row justify-between items-center">
          <div className="flex space-x-4">
            <Link className="p-2 hover:text-gray-300 transition-colors" href="/">
              Início
            </Link>
            <span className="p-2 text-gray-400">
              Não logado
            </span>
          </div>
          <div className="flex space-x-4">
            <Link className="p-2 bg-blue-600 hover:bg-blue-700 px-4 rounded transition-colors" href="/login">
              Login
            </Link>
            <Link className="p-2 bg-gray-700 hover:bg-gray-600 px-4 rounded transition-colors" href="/register">
              Criar Conta
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
