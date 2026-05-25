import type { RiskLevel } from '@/shared/utils/risk.util';
import { getRiskLevel } from '@/shared/utils/risk.util';

type RiskProgressBarProps = {
  score: number;
};

const riskLevelColorClass: Record<RiskLevel, string> = {
  Baixo: 'bg-emerald-500',
  Moderado: 'bg-amber-500',
  Alto: 'bg-orange-500',
  Critico: 'bg-rose-500',
};

export const RiskProgressBar = ({ score }: RiskProgressBarProps) => {
  const normalizedScore = Math.max(0, Math.min(100, score));
  const level = getRiskLevel(normalizedScore);

  return (
    <div className="h-3 w-full rounded-full bg-slate-100">
      <div
        className={`h-3 rounded-full transition-all ${riskLevelColorClass[level]}`}
        style={{ width: `${normalizedScore}%` }}
      />
    </div>
  );
};
