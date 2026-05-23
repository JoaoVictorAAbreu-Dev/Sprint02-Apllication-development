import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '@/presentation/layouts/dashboard.layout';
import { AlertsPage } from '@/presentation/pages/alerts.page';
import { DashboardPage } from '@/presentation/pages/dashboard.page';
import { MapPage } from '@/presentation/pages/map.page';
import { SensingPage } from '@/presentation/pages/sensing.page';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'alerts', element: <AlertsPage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'sensing', element: <SensingPage /> },
    ],
  },
]);
