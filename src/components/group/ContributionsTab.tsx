import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus } from "lucide-react";
import { ContributionDetailModal } from "./ContributionDetailModal";
import { AddDataModal } from "./AddDataModal";

// Dummy contributions data
const contributions = [
  { id: "1", name: "Monthly Savings", amount: 1000, type: "Savings", nature: "Regular", frequency: "Monthly" },
  { id: "2", name: "Membership Fee", amount: 500, type: "Membership Fee", nature: "One-time", frequency: "Once" },
  { id: "3", name: "Emergency Fund", amount: 200, type: "Emergency", nature: "Regular", frequency: "Weekly" },
];

interface ContributionsTabProps {
  groupId: string;
}

export function ContributionsTab({ groupId }: ContributionsTabProps) {
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleViewContribution = (contribution: any) => {
    setSelectedContribution(contribution);
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contribution Types</CardTitle>
          <Button onClick={() => setShowAddModal(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Contribution Type
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Nature</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contributions.map((contribution) => (
                <TableRow key={contribution.id}>
                  <TableCell className="font-medium">{contribution.name}</TableCell>
                  <TableCell>{formatCurrency(contribution.amount)}</TableCell>
                  <TableCell>{contribution.type}</TableCell>
                  <TableCell>
                    <Badge variant={contribution.nature === "Regular" ? "default" : "secondary"}>
                      {contribution.nature}
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
                        <DropdownMenuItem onClick={() => handleViewContribution(contribution)}>
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

      <ContributionDetailModal
        contribution={selectedContribution}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <AddDataModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        category="contributions"
        title="Add Contribution Type"
      />
    </>
  );
}