import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";

// Dummy groups data
const groups = [
  { id: "1", name: "Savings Circle A", memberCount: 15, totalLoaned: 450000, totalDeposits: 680000 },
  { id: "2", name: "Investment Group B", memberCount: 22, totalLoaned: 780000, totalDeposits: 1200000 },
  { id: "3", name: "Women Empowerment", memberCount: 18, totalLoaned: 320000, totalDeposits: 450000 },
  { id: "4", name: "Youth Development", memberCount: 12, totalLoaned: 180000, totalDeposits: 250000 },
];

export default function OrgGroups() {
  const navigate = useNavigate();

  const handleViewGroup = (id: string) => {
    navigate(`/org/groups/${id}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Groups</h2>
          <p className="text-muted-foreground">
            Manage groups within your organization
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Group
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Groups List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Total Loaned</TableHead>
                <TableHead>Total Deposited</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell>{group.memberCount}</TableCell>
                  <TableCell>{formatCurrency(group.totalLoaned)}</TableCell>
                  <TableCell>{formatCurrency(group.totalDeposits)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewGroup(group.id)}>
                          View More
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}