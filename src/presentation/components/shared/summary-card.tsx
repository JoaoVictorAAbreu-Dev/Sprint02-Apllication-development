type SummaryCardProps = {
  title: string;
  value: string;
  helperText?: string;
};

export const SummaryCard = ({ title, value, helperText }: SummaryCardProps) => {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      {helperText ? <p className="mt-1 text-xs text-slate-500">{helperText}</p> : null}
    </article>
  );
};
