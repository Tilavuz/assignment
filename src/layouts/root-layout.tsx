import Header from "@/components/common/header/header";
import AppSidebar from "@/components/common/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen">
        <Header>
          <SidebarTrigger />
        </Header>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
