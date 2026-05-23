import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Outlet />
    </main>
  );
};
