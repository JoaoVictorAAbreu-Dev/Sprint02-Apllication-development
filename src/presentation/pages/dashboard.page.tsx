import { RiskScoreCard } from '@/presentation/components/shared/risk-score-card';
import { SummaryCard } from '@/presentation/components/shared/summary-card';
import { useCurrentWeatherByLocalitiesQuery } from '@/presentation/hooks/queries/use-current-weather-by-localities.query';
import { useMonitoredLocalitiesQuery } from '@/presentation/hooks/queries/use-monitored-localities.query';
import { calculateRiskScore, getRiskLevel, isAlertPoint } from '@/shared/utils/risk.util';

export const DashboardPage = () => {
  const localitiesQuery = useMonitoredLocalitiesQuery({ limit: 10 });
  const weatherQuery = useCurrentWeatherByLocalitiesQuery(localitiesQuery.data ?? []);

  if (localitiesQuery.isLoading || weatherQuery.isLoading) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>
        <p className="mt-2 text-sm text-slate-600">Carregando indicadores do monitoramento...</p>
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
        <h2 className="text-xl font-semibold text-rose-900">Dashboard</h2>
        <p className="mt-2 text-sm text-rose-700">Falha ao carregar os dados: {errorMessage}</p>
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

  const localities = localitiesQuery.data ?? [];
  const weather = weatherQuery.data ?? [];

  const monitoredPoints = localities.length;
  const averageTemperature =
    weather.length > 0 ? weather.reduce((sum, item) => sum + item.temperatureC, 0) / weather.length : 0;
  const averageWindSpeed =
    weather.length > 0 ? weather.reduce((sum, item) => sum + item.windSpeedKmh, 0) / weather.length : 0;
  const alertPoints = weather.filter(isAlertPoint).length;

  const riskByPoint = weather.map((item) => ({
    ...item,
    riskScore: calculateRiskScore(item),
  }));

  const generalRiskScore =
    riskByPoint.length > 0 ? riskByPoint.reduce((sum, item) => sum + item.riskScore, 0) / riskByPoint.length : 0;

  const mostCriticalArea = riskByPoint.reduce(
    (current, item) => (item.riskScore > current.riskScore ? item : current),
    riskByPoint[0],
  );

  return (
    <section className="space-y-6">
      <header className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Dashboard Executivo</h2>
        <p className="mt-2 text-sm text-slate-600">
          Visao consolidada dos pontos monitorados com indicadores climaticos e risco operacional.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Pontos monitorados" value={String(monitoredPoints)} />
        <SummaryCard title="Temperatura media" value={`${averageTemperature.toFixed(1)} degC`} />
        <SummaryCard title="Pontos em alerta" value={String(alertPoints)} />
        <SummaryCard title="Velocidade media do vento" value={`${averageWindSpeed.toFixed(1)} km/h`} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Area mais critica monitorada</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">
            {mostCriticalArea ? mostCriticalArea.localityName : 'Sem dados'}
          </p>
          {mostCriticalArea ? (
            <p className="mt-2 text-sm text-slate-600">
              Temperatura {mostCriticalArea.temperatureC.toFixed(1)} degC | Vento{' '}
              {mostCriticalArea.windSpeedKmh.toFixed(1)} km/h | Precipitacao{' '}
              {mostCriticalArea.precipitationMm.toFixed(1)} mm
            </p>
          ) : null}
          {mostCriticalArea ? (
            <p className="mt-2 text-xs font-semibold text-slate-500">
              Classificacao: {getRiskLevel(mostCriticalArea.riskScore)}
            </p>
          ) : null}
        </article>

        <RiskScoreCard
          title="Score geral de risco"
          score={generalRiskScore}
          subtitle="Calculo com base em temperatura, umidade, vento e precipitacao."
        />
      </div>
    </section>
  );
};
