import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal } from "lucide-react";

const applications = [
  {
    id: "1",
    loanProductName: "Group Development Loan",
    loanProductType: "group",
    beneficiaryName: "Savings Group A",
    beneficiaryContact: "contact@groupa.com",
    amount: 100000,
    status: "pending_approval"
  },
  {
    id: "2", 
    loanProductName: "Individual Emergency Loan",
    loanProductType: "individual",
    beneficiaryName: "John Doe",
    beneficiaryContact: "+254712345678",
    amount: 50000,
    status: "approved"
  }
];

export function LoanApplications() {
  const [productFilter, setProductFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "secondary" | "default" | "destructive" | "outline"> = {
      pending_approval: "secondary",
      approved: "default", 
      declined: "destructive",
      disbursed: "outline"
    };
    return <Badge variant={variants[status] || "secondary"}>{status.replace("_", " ")}</Badge>;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Loan Applications</h1>
        <p className="text-muted-foreground">Manage and review loan applications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Applications</CardTitle>
          <div className="flex gap-4">
            <Select value={productFilter} onValueChange={setProductFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="group">Group Loans</SelectItem>
                <SelectItem value="individual">Individual Loans</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending_approval">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
                <SelectItem value="disbursed">Disbursed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan Product</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Beneficiary</TableHead>
                <TableHead>Amount (KES)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.loanProductName}</TableCell>
                  <TableCell><Badge variant="outline">{app.loanProductType}</Badge></TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{app.beneficiaryName}</p>
                      <p className="text-sm text-muted-foreground">{app.beneficiaryContact}</p>
                    </div>
                  </TableCell>
                  <TableCell>{app.amount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(app.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Application</DropdownMenuItem>
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