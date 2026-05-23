import { NavLink } from 'react-router-dom';
import { navigationItems } from '@/presentation/components/layout/navigation-items';

const getNavClassName = ({ isActive }: { isActive: boolean }) => {
  const baseClassName = 'whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors';

  if (isActive) {
    return `${baseClassName} bg-emerald-600 text-white`;
  }

  return `${baseClassName} bg-slate-100 text-slate-700`;
};

export const MobileNav = () => {
  return (
    <nav className="border-b border-slate-200 bg-white px-4 py-2 md:hidden">
      <div className="flex gap-2 overflow-x-auto">
        {navigationItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} className={getNavClassName}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
