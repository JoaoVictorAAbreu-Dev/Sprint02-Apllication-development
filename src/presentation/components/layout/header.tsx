import { useEffect, useState } from 'react';

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);

const getMonitoringStatus = () => (navigator.onLine ? 'Ativo' : 'Offline');

export const Header = () => {
  const [now, setNow] = useState(() => new Date());
  const status = getMonitoringStatus();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">GreenWatch</h1>
          <p className="text-xs text-slate-500">Monitoramento ambiental remoto</p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="hidden text-right sm:block">
            <p className="font-medium text-slate-800">{formatDate(now)}</p>
            <p className="text-slate-500">{formatTime(now)}</p>
          </div>

          <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
            <span className="font-medium text-emerald-700">Status: {status}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
