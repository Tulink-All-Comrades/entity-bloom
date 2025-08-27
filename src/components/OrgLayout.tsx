import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { OrgSidebar } from "./OrgSidebar";
import { UserDropdown } from "@/components/UserDropdown";
import { useNavigate } from "react-router-dom";

interface OrgLayoutProps {
  children: React.ReactNode;
}

export function OrgLayout({ children }: OrgLayoutProps) {
  const navigate = useNavigate();
  
  // Get current logged in user info - in real app this would come from auth context
  const currentUser = {
    firstName: "Demo",
    lastName: "Account", 
    role: "Organization Official",
    avatar: null
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <OrgSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-background flex items-center justify-between px-6">
            <div className="flex items-center">
              <SidebarTrigger />
              <h1 className="ml-4 text-lg font-semibold">Organization Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div 
                className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => navigate(`/org/organization-detail`)}
              >
                <span className="text-primary font-bold text-sm">ORG</span>
              </div>
              <UserDropdown user={currentUser} />
            </div>
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}