"use client";

import GreetingBox from "@/components/pages/dashboard/GreetingBox";
import DashboardCard from "@/components/pages/dashboard/DashboardCard";
import useFetch from "@/utils/useFetch";

export default function TraineeDashboardPageMock() {
  const { fetchWithAuth } = useFetch();
  // ! Para usar o fetch use dentro de uma funcao async
  // const res = await fetchWithAuth(`/pokemon/page/${page}`);
  // const res = await fetchWithAuth(`/pokemon/${params.id}`, {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(bodyData),
  // });

  const fetchEvolutionPokemons = async () => {
    try {
      const res = await fetchWithAuth(`/pokemon/page/1`);
      if (res?.status === 200) {
        const response: Response = res.data;
        const pokemons: Pokemon[] = response.pokemons;
        const exist = pokemons.find(
          (pokemon) => pokemon.id === Number(params.id)
        );
        if (exist) {
          pokemons.splice(pokemons.indexOf(exist), 1);
        }
        setPokemons(pokemons);
        setTotalPages(Math.ceil(response.count / 10));
      }
    } catch (error) {
      console.error("Failed to fetch evolution pokemons", error);
    }
  };

  const mockSession = { user: { name: "Bruna" } };
  const planTitle = "Hipertrofia A/B";
  const periodFrom = "01/10/2025";
  const periodTo = "30/10/2025";

  return (
    <div className="h-full">
      <div className="mx-auto max-w-6xl h-full p-6 flex flex-col justify-center gap-12 md:gap-16">
        {/* Greeting centralizado */}
        <GreetingBox
          name={mockSession.user.name}
          lines={[
            <>
              Plano atual: <strong>{planTitle}</strong>
            </>,
            <>
              Período: {periodFrom} → {periodTo}
            </>,
          ]}
        />

        {/* Ações – 3 colunas, cards com 120px de altura */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DashboardCard
            title="Registrar Treino do Dia"
            variant="dark"
            size="lg"
            actionHeightClass="h-[120px]"
            href="/trainee/train/new"
          />
          <DashboardCard
            title="Visualizar Plano de Treino"
            variant="muted"
            size="lg"
            actionHeightClass="h-[120px]"
            href="/trainee/plan"
          />
          <DashboardCard
            title="Histórico de Treinos e Avaliações"
            variant="muted"
            size="lg"
            actionHeightClass="h-[120px]"
            href="/trainee/history"
          />
        </section>
      </div>
    </div>
  );
}
