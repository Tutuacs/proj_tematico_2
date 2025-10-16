import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import type { ReactNode } from 'react';
import TrainerNavbar from '@/components/ui/TrainerNavbar';
import { redirect } from "next/navigation";
import { ROLE } from "@/common/role.enums";

export default async function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // if (!session || session.profile.role !== ROLE.TRAINER) {
  //   redirect("/login"); 
  // }

  return (
    // ocupa a viewport inteira e impede scroll
    <div className="fixed inset-0 flex flex-col bg-gray-100 overflow-hidden">
      <TrainerNavbar />

      {/* área de conteúdo cresce e não cria scroll na página */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      {/* footer colado no limite inferior */}
      <footer className="h-12 flex items-center justify-center text-sm text-gray-500">
        Versão 1.0 – © GymTrack 2025
      </footer>
    </div>
  );
}