import { useEffect, useState } from "react";

type DashboardStats = {
  totalTrainees: number;
  totalPlans: number;
  totalReports: number;
};

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    // Ajustar a URL depois de definir a rota real no backend
    fetch("/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Erro ao buscar stats:", err));
  }, []);

  return stats;
}