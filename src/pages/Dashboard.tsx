import { useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Building2, Users, UserCheck, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { organizations, officials, roles, groups } = useAppStore();

  const stats = useMemo(() => {
    const totalGroups = groups.length;
    const totalMembers = groups.reduce((sum, group) => sum + group.memberCount, 0);
    const totalDeposits = groups.reduce((sum, group) => sum + group.totalDeposits, 0);
    const totalLoaned = groups.reduce((sum, group) => sum + group.totalLoaned, 0);

    return {
      totalOrganizations: organizations.length,
      totalOfficials: officials.length,
      totalGroups,
      totalMembers,
      totalDeposits,
      totalLoaned,
    };
  }, [organizations, officials, groups]);

  const organizationsByNature = useMemo(() => {
    const natureCount = organizations.reduce((acc, org) => {
      acc[org.nature] = (acc[org.nature] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(natureCount).map(([nature, count]) => ({
      name: nature,
      value: count,
    }));
  }, [organizations]);

  const officialsByRole = useMemo(() => {
    const roleCount = officials.reduce((acc, official) => {
      const role = roles.find(r => r.id === official.roleId);
      const roleName = role?.name || 'Unknown';
      acc[roleName] = (acc[roleName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(roleCount).map(([role, count]) => ({
      role,
      count,
    }));
  }, [officials, roles]);

  const financialData = useMemo(() => {
    return organizations.map(org => {
      const orgGroups = groups.filter(group => group.organizationId === org.id);
      const totalDeposits = orgGroups.reduce((sum, group) => sum + group.totalDeposits, 0);
      const totalLoaned = orgGroups.reduce((sum, group) => sum + group.totalLoaned, 0);
      const totalWithdrawals = orgGroups.reduce((sum, group) => sum + group.totalWithdrawals, 0);
      
      return {
        name: org.name.length > 15 ? org.name.substring(0, 15) + '...' : org.name,
        deposits: totalDeposits,
        loans: totalLoaned,
        withdrawals: totalWithdrawals,
      };
    });
  }, [organizations, groups]);

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  const chartConfig = {
    deposits: {
      label: "Deposits",
      color: "hsl(var(--primary))",
    },
    loans: {
      label: "Loans",
      color: "hsl(var(--secondary))",
    },
    withdrawals: {
      label: "Withdrawals",
      color: "hsl(var(--accent))",
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your organization management system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrganizations}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Officials</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOfficials}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Groups</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGroups}</div>
            <p className="text-xs text-muted-foreground">{stats.totalMembers} members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {stats.totalDeposits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">KSh {stats.totalLoaned.toLocaleString()} loaned</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Organizations by Nature</CardTitle>
            <CardDescription>Distribution of organization types</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={organizationsByNature}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {organizationsByNature.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Officials by Role</CardTitle>
            <CardDescription>Distribution of official roles</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={officialsByRole}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="role" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Overview by Organization</CardTitle>
          <CardDescription>Deposits, loans, and withdrawals across organizations</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="deposits" fill="hsl(var(--primary))" name="Deposits" />
                <Bar dataKey="loans" fill="hsl(var(--secondary))" name="Loans" />
                <Bar dataKey="withdrawals" fill="hsl(var(--accent))" name="Withdrawals" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;