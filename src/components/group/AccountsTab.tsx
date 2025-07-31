import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { AccountDetailModal } from "./AccountDetailModal";

// Dummy accounts data
const accounts = [
  { 
    id: "1", 
    accountName: "Main Savings Account", 
    accountType: "Bank", 
    institution: "Cooperative Bank", 
    accountNumber: "01129374650", 
    accountBalance: 680000,
    signingMandate: "Any two to sign"
  },
  { 
    id: "2", 
    accountName: "Investment Account", 
    accountType: "SACCO", 
    institution: "Stima SACCO", 
    accountNumber: "SACCO-4567890", 
    accountBalance: 450000,
    signingMandate: "Chairperson and Treasurer"
  },
  { 
    id: "3", 
    accountName: "Emergency Fund", 
    accountType: "Bank", 
    institution: "KCB Bank", 
    accountNumber: "1234567890", 
    accountBalance: 120000,
    signingMandate: "Any one to sign"
  },
];

interface AccountsTabProps {
  groupId: string;
}

export function AccountsTab({ groupId }: AccountsTabProps) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewAccount = (account: any) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Group Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.accountName}</TableCell>
                  <TableCell>{account.accountType}</TableCell>
                  <TableCell>{account.institution}</TableCell>
                  <TableCell>{account.accountNumber}</TableCell>
                  <TableCell>{formatCurrency(account.accountBalance)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewAccount(account)}>
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

      <AccountDetailModal
        account={selectedAccount}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}