import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import { ROLE } from "@/common/role.enums";

export default async function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.profile.role !== ROLE.TRAINER) {
    redirect("/login"); 
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar do trainer aqui, se desejar */}
      <main className="max-w-6xl mx-auto p-6">{children}</main>
    </div>
  );
}