'use client';'use client';



import { useState, useEffect } from 'react';import GreetingBox from '@/components/pages/dashboard/GreetingBox';

import { useSession } from 'next-auth/react';import DashboardCard from '@/components/pages/dashboard/DashboardCard';

import GreetingBox from '@/components/pages/dashboard/GreetingBox';

import DashboardCard from '@/components/pages/dashboard/DashboardCard';export default function TrainerDashboardPageMock() {

import useFetch from '@/utils/useFetch';  const mockSession = { user: { name: 'Carlos' } };

  const mockStats = { totalTrainees: 5, totalPlans: 12, totalReports: 3 };

export default function TrainerDashboardPage() {

  const { data: session } = useSession();  return (

  const { fetchWithAuth } = useFetch();    <main className="min-h-screen bg-gray-100">

      <div className="max-w-6xl mx-auto p-6">

  const [userData, setUserData] = useState<{ name: string } | null>(null);        {/* Greeting */}

  const [stats, setStats] = useState({        <GreetingBox

    totalTrainees: 0,          name={mockSession.user.name}

    totalPlans: 0,          totalTrainees={mockStats.totalTrainees}

    totalReports: 0,        />

  });

  const [loading, setLoading] = useState(true);        {/* Linha 1 — cards de estatística */}

        {/* espaçamento suave após o greeting */}

  // Buscar dados do instrutor        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 md:mt-12">

  useEffect(() => {          <DashboardCard title="Planos de Treino"      value={mockStats.totalPlans}    variant="stat" />

    const fetchData = async () => {          <DashboardCard title="Avaliações Físicas"    value={mockStats.totalReports}  variant="stat" />

      if (!session?.profile?.id) return;          <DashboardCard title="Alunos Vinculados"     value={mockStats.totalTrainees} variant="stat" />

        </section>

      try {

        setLoading(true);        {/* Linhas 2 e 3 — botões de ação */}

        {/* um vão maior entre as sections melhora a leitura visual */}

        // Buscar perfil do instrutor        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 md:mt-24">

        const profileRes = await fetchWithAuth(`/profile/${session.profile.id}`);          <DashboardCard title="Alunos"                           variant="muted" size="lg" href="/trainer/trainees" />

        if (profileRes?.status === 200) {          <DashboardCard title="Atividades"                       variant="muted" size="lg" href="/trainer/activities" />

          setUserData({ name: profileRes.data.name || 'Instrutor' });          <DashboardCard title="Planos de Treino"                 variant="muted" size="lg" href="/trainer/plans" />

        }          <DashboardCard title="Registrar Avaliação Física"       variant="dark"  size="lg" href="/trainer/reports/new" />

          <DashboardCard title="Consultar Histórico de Execuções" variant="muted" size="lg" href="/trainer/history" />

        // Buscar estatísticas em paralelo          <DashboardCard title="Visualizar Avaliações Físicas"    variant="muted" size="lg" href="/trainer/reports" />

        const [traineesRes, plansRes, reportsRes] = await Promise.all([        </section>

          fetchWithAuth('/profile'), // Lista todos os perfis      </div>

          fetchWithAuth('/plan'), // Lista planos do instrutor (filtrado no backend)    </main>

          fetchWithAuth('/report'), // Lista reports do instrutor (filtrado no backend)  );

        ]);}

        // Contar apenas trainees (role = 0) vinculados ao instrutor
        const trainees = Array.isArray(traineesRes?.data) ? traineesRes.data : [];
        const myTrainees = trainees.filter(
          (t: any) => t.role === 0 && t.trainerId === session.profile.id
        );

        setStats({
          totalTrainees: myTrainees.length,
          totalPlans: Array.isArray(plansRes?.data) ? plansRes.data.length : 0,
          totalReports: Array.isArray(reportsRes?.data) ? reportsRes.data.length : 0,
        });
      } catch (error) {
        console.error('Failed to fetch trainer data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.profile?.id]);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Greeting */}
        <GreetingBox
          name={userData?.name || session?.profile?.name || 'Instrutor'}
          totalTrainees={loading ? undefined : stats.totalTrainees}
        />

        {/* Linha 1 — cards de estatística */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 md:mt-12">
          <DashboardCard 
            title="Planos de Treino" 
            value={loading ? '...' : stats.totalPlans} 
            variant="stat" 
          />
          <DashboardCard 
            title="Avaliações Físicas" 
            value={loading ? '...' : stats.totalReports} 
            variant="stat" 
          />
          <DashboardCard 
            title="Alunos Vinculados" 
            value={loading ? '...' : stats.totalTrainees} 
            variant="stat" 
          />
        </section>

        {/* Linhas 2 e 3 — botões de ação */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 md:mt-24">
          <DashboardCard title="Alunos" variant="muted" size="lg" href="/trainer/trainees" />
          <DashboardCard title="Atividades" variant="muted" size="lg" href="/trainer/activities" />
          <DashboardCard title="Planos de Treino" variant="muted" size="lg" href="/trainer/plans" />
          <DashboardCard title="Registrar Avaliação Física" variant="dark" size="lg" href="/trainer/reports/new" />
          <DashboardCard title="Consultar Histórico de Execuções" variant="muted" size="lg" href="/trainer/history" />
          <DashboardCard title="Visualizar Avaliações Físicas" variant="muted" size="lg" href="/trainer/reports" />
        </section>
      </div>
    </main>
  );
}
