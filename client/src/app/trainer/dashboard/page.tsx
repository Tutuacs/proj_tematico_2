'use client';

import GreetingBox from '@/components/pages/dashboard/GreetingBox';
import DashboardCard from '@/components/pages/dashboard/DashboardCard';

export default function TrainerDashboardPageMock() {
  const mockSession = { user: { name: 'Carlos' } };
  const mockStats = { totalTrainees: 5, totalPlans: 12, totalReports: 3 };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Greeting */}
        <GreetingBox
          name={mockSession.user.name}
          totalTrainees={mockStats.totalTrainees}
        />

        {/* Linha 1 — cards de estatística */}
        {/* espaçamento suave após o greeting */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 md:mt-12">
          <DashboardCard title="Planos de Treino"      value={mockStats.totalPlans}    variant="stat" />
          <DashboardCard title="Avaliações Físicas"    value={mockStats.totalReports}  variant="stat" />
          <DashboardCard title="Alunos Vinculados"     value={mockStats.totalTrainees} variant="stat" />
        </section>

        {/* Linhas 2 e 3 — botões de ação */}
        {/* um vão maior entre as sections melhora a leitura visual */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 md:mt-24">
          <DashboardCard title="Alunos"                           variant="muted" size="lg" href="/trainer/trainees" />
          <DashboardCard title="Atividades"                       variant="muted" size="lg" href="/trainer/activities" />
          <DashboardCard title="Planos de Treino"                 variant="muted" size="lg" href="/trainer/plans" />
          <DashboardCard title="Registrar Avaliação Física"       variant="dark"  size="lg" href="/trainer/reports/new" />
          <DashboardCard title="Consultar Histórico de Execuções" variant="muted" size="lg" href="/trainer/history" />
          <DashboardCard title="Visualizar Avaliações Físicas"    variant="muted" size="lg" href="/trainer/reports" />
        </section>
      </div>
    </main>
  );
}