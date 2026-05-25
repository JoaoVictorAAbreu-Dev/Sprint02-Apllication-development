import { RiskBadge } from '@/presentation/components/shared/risk-badge';
import { RiskProgressBar } from '@/presentation/components/shared/risk-progress-bar';
import { getRiskLevel } from '@/shared/utils/risk.util';

type RiskScoreCardProps = {
  title: string;
  score: number;
  subtitle?: string;
};

export const RiskScoreCard = ({ title, score, subtitle }: RiskScoreCardProps) => {
  const normalizedScore = Math.max(0, Math.min(100, score));
  const level = getRiskLevel(normalizedScore);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</p>
        <RiskBadge level={level} />
      </div>
      <div className="mt-3">
        <RiskProgressBar score={normalizedScore} />
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{normalizedScore.toFixed(1)} / 100</p>
      {subtitle ? <p className="mt-1 text-xs text-slate-500">{subtitle}</p> : null}
    </article>
  );
};
