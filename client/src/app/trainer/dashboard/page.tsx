'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import GreetingBox from '@/components/pages/dashboard/GreetingBox';
import DashboardCard from '@/components/pages/dashboard/DashboardCard';
import useFetch from '@/utils/useFetch';

export default function TrainerDashboardPage() {
  const { data: session } = useSession();
  const { fetchWithAuth } = useFetch();

  const [userData, setUserData] = useState<{ name: string } | null>(null);
  const [stats, setStats] = useState({
    totalTrainees: 0,
    totalPlans: 0,
    totalReports: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.profile?.id) return;

      try {
        setLoading(true);

        const profileRes = await fetchWithAuth(`/profile/${session.profile.id}`, {
          showToast: false,
        });
        if (profileRes?.status === 200) {
          setUserData({ name: profileRes.data.name || 'Instrutor' });
        }

        const [traineesRes, plansRes, reportsRes] = await Promise.all([
          fetchWithAuth('/profile', { showToast: false }),
          fetchWithAuth('/plan', { showToast: false }),
          fetchWithAuth('/report', { showToast: false }),
        ]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.profile?.id]);

  return (
    <main>
      <div className="max-w-6xl mx-auto p-6">
        <GreetingBox
          name={userData?.name || session?.profile?.name || 'Instrutor'}
          totalTrainees={loading ? undefined : stats.totalTrainees}
        />

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

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 md:mt-24">
          <DashboardCard title="Alunos" variant="dark" size="lg" href="/trainer/trainees" />
          <DashboardCard title="Planos de Treino" variant="dark" size="lg" href="/trainer/plans" />
          <DashboardCard title="Registrar Avaliação Física" variant="dark" size="lg" href="/trainer/reports/new" />
          <DashboardCard title="Visualizar Avaliações Físicas" variant="dark" size="lg" href="/trainer/reports" />
        </section>
      </div>
    </main>
  );
}
