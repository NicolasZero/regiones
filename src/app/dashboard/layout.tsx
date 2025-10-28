"use client";

import { ToggleDarkMode } from "@/components/toggle-dark-mode";
import { AvatarOptions } from "@/components/avatar-options";
import Navigation from "@/components/navigation";
import ProtectedRoute from "@/components/protected-route";
import Cookies from 'js-cookie';
import MobileNavigation from "@/components/mobileNavigation";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = Cookies.get('user')
  const userLoggin = user ? JSON.parse(user) : null;

  return (
    <ProtectedRoute>
      <>
        <nav className="absolute h-12 bg-primary border-b border-gray-200 z-30 w-full lg:h-15 dark:bg-dark">
          <div className="px-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center border-[1px] rounded-sm border-white lg:border-none mt-[2px]">
                <MobileNavigation />
                <div className="hidden lg:inline mt-1">
                {userLoggin && <div className="text-white text-sm font-semibold">{`Usuario: ${userLoggin.username}`}</div>}
                </div>
              </div>
              <div className="flex items-end gap-4 mt-[6px]">
                <AvatarOptions />
                <ToggleDarkMode />
                {/* User Avatar */}
              </div>
            </div>
          </div>
        </nav >
        <div className="flex overflow-hidden bg-white dark:bg-dark pt-10">
          <aside
            id="sidebar"
            className="fixed hidden z-20 h-full top-0 left-0 pt-40 lg:flex flex-shrink-0 flex-col w-60 transition-width duration-75 border-r-2 dark:border-dark-foreground"
            aria-label="Sidebar"
          >
            <div className="relative flex-1 flex flex-col min-h-0 borderR border-gray-200 bg-white pt-0 dark:bg-dark">
              <div className="flex-1 flex flex-col pb-4 overflow-y-auto dark:bg-dark">
                <div className="flex-1 px-3 bg-white divide-y space-y-1 dark:bg-dark">
                  <ul className="space-y-2 pb-2 dark:bg-dark">
                    <Navigation userLoggin={userLoggin} />
                  </ul>
                </div>
              </div>
            </div>
          </aside>
          <div
            className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
            id="sidebarBackdrop"
          ></div>
          <div
            id="main-content"
            className="h-full w-full bg-gray-50 relative dark:bg-dark lg:overflow-y-auto lg:ml-64"
          >
            <main className="dark:bg-dark">
              <div className=" px-4 md: dark:bg-dark " >
                <div className="w-full min-h-[calc(100vh-230px)]">
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 overflow-x-auto max-h-[70vh] lg:max-h-[75vh] dark:bg-dark scroll-smooth">
                    {children}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
}
