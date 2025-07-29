import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppStore } from "@/lib/store";

interface GroupsTabProps {
  organizationId: string;
}

export function GroupsTab({ organizationId }: GroupsTabProps) {
  const groups = useAppStore((state) => state.groups.filter(group => group.organizationId === organizationId));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Groups</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Total Loaned</TableHead>
              <TableHead>Total Deposits</TableHead>
              <TableHead>Total Withdrawals</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell className="font-medium">{group.name}</TableCell>
                <TableCell>{group.memberCount}</TableCell>
                <TableCell>{formatCurrency(group.totalLoaned)}</TableCell>
                <TableCell>{formatCurrency(group.totalDeposits)}</TableCell>
                <TableCell>{formatCurrency(group.totalWithdrawals)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}