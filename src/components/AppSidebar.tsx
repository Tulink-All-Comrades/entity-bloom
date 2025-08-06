import { BarChart3, Building2 } from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: BarChart3 },
  { title: "Organizations", url: "/admin/organizations", icon: Building2 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  // Get current logged in user info - in real app this would come from auth context
  const currentUser = {
    firstName: "Demo",
    lastName: "Account", 
    role: "Super Admin",
    avatar: null
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Super Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                          isActive 
                            ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" 
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
       <SidebarFooter>
        <div className="flex items-center gap-3 p-4 border-t border-sidebar-border">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
              {currentUser.firstName[0]}{currentUser.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {currentUser.firstName} {currentUser.lastName}
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              {currentUser.role}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}