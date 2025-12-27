// src/AppLayout.jsx
import { Outlet } from 'react-router';
import Header from '@/layout/Header';
import SideBar from '@/layout/SideBar';
import Breadcrumbs from '@/shared/components/Breadcrumbs';

function AppLayout() {
  return (
    <div className="font-outfit min-h-screen bg-neutral-950 px-2 text-neutral-200 sm:px-4 md:px-8">
      <Header />
      <div className="flex items-start">
        <SideBar />
        <div className="min-h-120vh grow p-4">
          <Breadcrumbs />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
