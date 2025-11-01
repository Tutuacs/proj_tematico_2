import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // Redirect logged-in users to their dashboard
  if (session?.profile?.id && session?.profile?.role !== undefined) {
    const role = session.profile.role;
    if (role === 0) {
      redirect("/trainee/dashboard");
    } else if (role === 1) {
      redirect("/trainer/dashboard");
    } else if (role === 2) {
      redirect("/admin/dashboard");
    }
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center space-y-8 p-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Sistema de Treinos
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gerencie seus treinos e avaliações físicas
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Fazer Login
            </Link>
            <Link
              href="/register"
              className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
