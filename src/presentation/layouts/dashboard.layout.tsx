import { Outlet } from 'react-router-dom';
import { ContentShell } from '@/presentation/components/layout/content-shell';
import { Header } from '@/presentation/components/layout/header';
import { MobileNav } from '@/presentation/components/layout/mobile-nav';
import { Sidebar } from '@/presentation/components/layout/sidebar';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <MobileNav />
        <ContentShell>
          <Outlet />
        </ContentShell>
      </div>
    </div>
  );
};
