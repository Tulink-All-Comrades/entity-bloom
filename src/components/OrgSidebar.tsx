import { BarChart3, Building2, Users, Settings, CreditCard, FileText, ChevronDown, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";

const menuItems = [
  { title: "Dashboard", url: "/org/dashboard", icon: BarChart3 },
  { title: "Groups", url: "/org/groups", icon: Users },
  { title: "Onboarding Fields", url: "/org/onboarding-fields", icon: Settings },
  { title: "Loan Products", url: "/org/loan-products", icon: CreditCard },
  { title: "Loan Applications", url: "/org/loan-applications", icon: FileText },
];

const subOrgItems = [
  { title: "Sub Organizations", url: "/org/sub-organizations", icon: Building2 },
  { title: "Import Sub Organizations", url: "/org/sub-organizations/import", icon: FileText },
];

const reportItems = [
  { title: "Fees Report", url: "/org/reports/fees" },
  { title: "Interests Report", url: "/org/reports/interests" },
  { title: "Loans Report", url: "/org/reports/loans" }
];

export function OrgSidebar() {
  const [reportsExpanded, setReportsExpanded] = useState(false);
  const [subOrgExpanded, setSubOrgExpanded] = useState(false);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Organization Panel</SidebarGroupLabel>
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
              
              {/* Sub Organizations Section */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setSubOrgExpanded(!subOrgExpanded)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
                >
                  <Building2 className="h-4 w-4" />
                  <span>Sub Organizations</span>
                  {subOrgExpanded ? (
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  ) : (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {subOrgExpanded && (
                <>
                  {subOrgItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url} 
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-6 py-2 rounded-md transition-colors text-sm ${
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
                </>
              )}
              
              {/* Reports Section */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setReportsExpanded(!reportsExpanded)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Reports</span>
                  {reportsExpanded ? (
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  ) : (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {reportsExpanded && (
                <>
                  {reportItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url} 
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-6 py-2 rounded-md transition-colors text-sm ${
                              isActive 
                                ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" 
                                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            }`
                          }
                        >
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}