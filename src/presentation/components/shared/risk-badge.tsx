import type { RiskLevel } from '@/shared/utils/risk.util';

type RiskBadgeProps = {
  level: RiskLevel;
};

const riskLevelClass: Record<RiskLevel, string> = {
  Baixo: 'bg-emerald-100 text-emerald-700',
  Moderado: 'bg-amber-100 text-amber-700',
  Alto: 'bg-orange-100 text-orange-700',
  Critico: 'bg-rose-100 text-rose-700',
};

export const RiskBadge = ({ level }: RiskBadgeProps) => {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${riskLevelClass[level]}`}>
      {level}
    </span>
  );
};
