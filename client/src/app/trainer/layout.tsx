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

  // Check if user is authenticated
  if (!session?.profile?.id) {
    redirect("/login"); 
  }

  // Only allow trainer (role 1) to access
  if (session.profile.role !== ROLE.TRAINER) {
    // Redirect to appropriate dashboard based on role
    if (session.profile.role === ROLE.ADMIN) {
      redirect("/admin/dashboard");
    } else if (session.profile.role === ROLE.TRAINEE) {
      redirect("/trainee/dashboard");
    } else {
      redirect("/");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <TrainerNavbar />

      {/* área de conteúdo permite scroll */}
      <main className="flex-1">
        {children}
      </main>

      {/* footer */}
      <footer className="h-12 flex items-center justify-center text-sm text-gray-500 bg-white border-t mt-auto">
        Versão 1.0 – © GymTrack 2025
      </footer>
    </div>
  );
}