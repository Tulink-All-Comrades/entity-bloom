import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { LoanDetailModal } from "./LoanDetailModal";

// Dummy loan types data
const loanTypes = [
  { 
    id: "1", 
    name: "Emergency Loan", 
    eligibilityCriteria: "Minimum 3x member savings", 
    interestRate: "10% per month on fixed balance", 
    guarantorsRequired: true,
    gracePeriod: 1,
    repaymentPeriod: 6
  },
  { 
    id: "2", 
    name: "Development Loan", 
    eligibilityCriteria: "Maximum 5x member savings", 
    interestRate: "15% per month on reducing balance", 
    guarantorsRequired: true,
    gracePeriod: 2,
    repaymentPeriod: 12
  },
  { 
    id: "3", 
    name: "School Fees Loan", 
    eligibilityCriteria: "Minimum 2x member savings", 
    interestRate: "8% per month on fixed balance", 
    guarantorsRequired: false,
    gracePeriod: 1,
    repaymentPeriod: 10
  },
];

interface LoansTabProps {
  groupId: string;
}

export function LoansTab({ groupId }: LoansTabProps) {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewLoan = (loan: any) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Loan Types</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Eligibility Criteria</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Guarantors</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loanTypes.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">{loan.name}</TableCell>
                  <TableCell>{loan.eligibilityCriteria}</TableCell>
                  <TableCell>{loan.interestRate}</TableCell>
                  <TableCell>
                    <Badge variant={loan.guarantorsRequired ? "default" : "secondary"}>
                      {loan.guarantorsRequired ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewLoan(loan)}>
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

      <LoanDetailModal
        loan={selectedLoan}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}