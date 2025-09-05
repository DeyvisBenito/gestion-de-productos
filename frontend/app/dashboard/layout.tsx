'use client';

import SideNav from "@/app/ui/dashboard/sidenav";
import { useValidateToken } from "@/app/lib/useValidateToken";


export default function Layout({ children }: { children: React.ReactNode }) {
  //useValidateToken();


  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
