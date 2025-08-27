import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { UserDropdown } from "@/components/UserDropdown";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Get current logged in user info - in real app this would come from auth context
  const currentUser = {
    firstName: "Demo",
    lastName: "Account", 
    role: "Super Admin",
    avatar: null
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="h-14 border-b flex items-center justify-between px-4">
            <div className="flex items-center">
              <SidebarTrigger />
              <div className="ml-4">
                <h2 className="text-lg font-semibold">Super Admin Dashboard</h2>
              </div>
            </div>
            <UserDropdown user={currentUser} />
          </header>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}