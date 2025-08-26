import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const loansData = [
  {
    loanProduct: "Group Development Loan",
    productType: "group",
    beneficiary: { name: "Savings Group A", contact: "contact@groupa.com" },
    loanAmount: 500000,
    dueDate: "2024-12-31",
    status: "pending"
  },
  {
    loanProduct: "Individual Emergency Loan", 
    productType: "individual",
    beneficiary: { firstName: "John", lastName: "Doe", phone: "+254712345678" },
    loanAmount: 150000,
    dueDate: "2024-11-15",
    status: "approved"
  },
  {
    loanProduct: "SACCO Business Loan",
    productType: "sacco", 
    beneficiary: { name: "Business SACCO", contact: "+254712345679" },
    loanAmount: 1000000,
    dueDate: "2025-01-20",
    status: "disbursed"
  }
];

export function LoansReport() {
  const [productFilter, setProductFilter] = useState("");
  const [productTypeFilter, setProductTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredData, setFilteredData] = useState(loansData);

  const applyFilter = () => {
    let filtered = loansData;
    
    if (productFilter) {
      filtered = filtered.filter(loan => loan.loanProduct === productFilter);
    }
    
    if (productTypeFilter) {
      filtered = filtered.filter(loan => loan.productType === productTypeFilter);
    }
    
    if (statusFilter) {
      filtered = filtered.filter(loan => loan.status === statusFilter);
    }
    
    setFilteredData(filtered);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "secondary" | "default" | "destructive" | "outline"> = {
      pending: "secondary",
      approved: "default",
      declined: "destructive", 
      disbursed: "outline"
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const formatBeneficiary = (loan: any) => {
    if (loan.productType === "individual") {
      return (
        <div>
          <p className="font-medium">{loan.beneficiary.firstName} {loan.beneficiary.lastName}</p>
          <p className="text-sm text-muted-foreground">{loan.beneficiary.phone}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p className="font-medium">{loan.beneficiary.name}</p>
          <p className="text-sm text-muted-foreground">{loan.beneficiary.contact}</p>
        </div>
      );
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Loans Report</h1>
        <p className="text-muted-foreground">Track all loan applications and their status</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Loans Overview</CardTitle>
            <div className="flex gap-2">
              <Select value={productFilter} onValueChange={setProductFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Group Development Loan">Group Development Loan</SelectItem>
                  <SelectItem value="Individual Emergency Loan">Individual Emergency Loan</SelectItem>
                  <SelectItem value="SACCO Business Loan">SACCO Business Loan</SelectItem>
                </SelectContent>
              </Select>
              <Select value={productTypeFilter} onValueChange={setProductTypeFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="group">Group</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="sacco">SACCO</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                  <SelectItem value="disbursed">Disbursed</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={applyFilter}>Apply Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan Product</TableHead>
                <TableHead>Loan Product Type</TableHead>
                <TableHead>Beneficiary</TableHead>
                <TableHead>Loan Amount (KES)</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((loan, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{loan.loanProduct}</TableCell>
                  <TableCell><Badge variant="outline" className="capitalize">{loan.productType}</Badge></TableCell>
                  <TableCell>{formatBeneficiary(loan)}</TableCell>
                  <TableCell>{loan.loanAmount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(loan.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(loan.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}