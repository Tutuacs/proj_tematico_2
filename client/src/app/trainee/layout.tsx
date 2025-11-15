import type { ReactNode } from "react";
import StudentNavbar from "@/components/ui/StudentNavbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import { ROLE } from "@/common/role.enums";

export default async function TraineeLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated
  if (!session?.profile?.id) {
    redirect("/login");
  }

  // Only allow trainee (role 0) to access
  if (session.profile.role !== ROLE.TRAINEE) {
    // Redirect to appropriate dashboard based on role
    if (session.profile.role === ROLE.ADMIN) {
      redirect("/admin/dashboard");
    } else if (session.profile.role === ROLE.TRAINER) {
      redirect("/trainer/dashboard");
    } else {
      redirect("/");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <StudentNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}