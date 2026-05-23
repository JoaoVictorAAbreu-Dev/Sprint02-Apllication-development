import { NavLink } from 'react-router-dom';
import { navigationItems } from '@/presentation/components/layout/navigation-items';

const getNavClassName = ({ isActive }: { isActive: boolean }) => {
  const baseClassName =
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors';

  if (isActive) {
    return `${baseClassName} bg-emerald-600 text-white`;
  }

  return `${baseClassName} text-slate-300 hover:bg-slate-700 hover:text-white`;
};

export const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-800 bg-slate-900 md:block">
      <div className="flex h-full flex-col p-4">
        <div className="border-b border-slate-800 pb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            GreenWatch
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">Painel</h2>
        </div>

        <nav className="mt-4 flex flex-col gap-2">
          {navigationItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={getNavClassName}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};
