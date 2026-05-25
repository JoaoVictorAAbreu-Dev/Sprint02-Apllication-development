import { MonitoringMap } from '@/presentation/components/map/monitoring-map';
import { useCurrentWeatherByLocalitiesQuery } from '@/presentation/hooks/queries/use-current-weather-by-localities.query';
import { useMonitoredLocalitiesQuery } from '@/presentation/hooks/queries/use-monitored-localities.query';

export const MapPage = () => {
  const localitiesQuery = useMonitoredLocalitiesQuery({ limit: 10 });
  const weatherQuery = useCurrentWeatherByLocalitiesQuery(localitiesQuery.data ?? []);

  if (localitiesQuery.isLoading || weatherQuery.isLoading) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Mapa de Monitoramento</h2>
        <p className="mt-2 text-sm text-slate-600">Carregando pontos geograficos monitorados...</p>
      </section>
    );
  }

  if (localitiesQuery.isError || weatherQuery.isError) {
    const errorMessage =
      localitiesQuery.error instanceof Error
        ? localitiesQuery.error.message
        : weatherQuery.error instanceof Error
          ? weatherQuery.error.message
          : 'Erro desconhecido';

    return (
      <section className="rounded-xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-rose-900">Mapa de Monitoramento</h2>
        <p className="mt-2 text-sm text-rose-700">Falha ao carregar mapa: {errorMessage}</p>
        <button
          type="button"
          onClick={() => {
            void localitiesQuery.refetch();
            void weatherQuery.refetch();
          }}
          className="mt-4 rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700"
        >
          Tentar novamente
        </button>
      </section>
    );
  }

  const points = weatherQuery.data ?? [];

  return (
    <section className="space-y-4">
      <header className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Mapa de Monitoramento</h2>
        <p className="mt-2 text-sm text-slate-600">
          Visualizacao dos 10 pontos monitorados com popup de clima e risco.
        </p>
      </header>

      <MonitoringMap points={points} />
    </section>
  );
};
