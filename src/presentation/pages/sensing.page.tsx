import { useMonitoredLocalitiesQuery } from '@/presentation/hooks/queries/use-monitored-localities.query';

export const SensingPage = () => {
  const { data, isLoading, isError, error, refetch, isFetching } = useMonitoredLocalitiesQuery({
    limit: 10,
  });

  if (isLoading) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Sensoriamento</h2>
        <p className="mt-2 text-sm text-slate-600">Carregando localidades monitoradas...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="rounded-xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-rose-900">Sensoriamento</h2>
        <p className="mt-2 text-sm text-rose-700">
          Falha ao carregar localidades: {error instanceof Error ? error.message : 'erro desconhecido'}
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-4 rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700"
        >
          Tentar novamente
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Sensoriamento</h2>
        <span className="text-xs text-slate-500">{isFetching ? 'Atualizando...' : 'Atualizado'}</span>
      </div>

      <p className="mt-2 text-sm text-slate-600">
        Top 10 localidades obtidas automaticamente via OpenStreetMap Nominatim.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="py-2 pr-4">Nome</th>
              <th className="py-2 pr-4">Latitude</th>
              <th className="py-2 pr-4">Longitude</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {data?.map((locality) => (
              <tr key={`${locality.name}-${locality.latitude}-${locality.longitude}`}>
                <td className="py-2 pr-4">{locality.name}</td>
                <td className="py-2 pr-4">{locality.latitude.toFixed(6)}</td>
                <td className="py-2 pr-4">{locality.longitude.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
