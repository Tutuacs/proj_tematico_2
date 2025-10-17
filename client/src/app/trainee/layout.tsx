import type { ReactNode } from "react";
import StudentNavbar from "@/components/ui/StudentNavbar";

export default function TraineeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 flex flex-col bg-gray-100 overflow-hidden">
      <StudentNavbar />
      <main className="flex-1 overflow-hidden">{children}</main>
      <footer className="h-12 flex items-center justify-center text-sm text-gray-500">
        Versão 1.0 – © GymTrack 2025
      </footer>
    </div>
  );
}