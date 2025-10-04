import GreetingBox from "@/components/pages/trainer/dashboard/GreetingBox";
import DashboardCard from "@/components/pages/trainer/dashboard/DashboardCard";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export default function DashboardPage() {
  const stats = useDashboardStats();

  if (!stats) return <p>Carregando...</p>;

  return (
    <main className="p-8 space-y-6">
      <GreetingBox />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <DashboardCard title="Alunos" value={stats.totalTrainees} />
        <DashboardCard title="Planos de treino" value={stats.totalPlans} />
        <DashboardCard title="Avaliações" value={stats.totalReports} />
      </div>
    </main>
  );
}