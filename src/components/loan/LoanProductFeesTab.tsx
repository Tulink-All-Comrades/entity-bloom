import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { AddFeeModal } from "./AddFeeModal";

interface LoanProductFeesTabProps {
  loanProductId: string;
  isParentLevel: boolean;
}

const fees = [
  {
    id: "1",
    feeType: "insurance",
    isEnabled: true,
    chargeableType: "percentage",
    percentage: 2.5
  },
  {
    id: "2", 
    feeType: "processing",
    isEnabled: true,
    chargeableType: "fixed",
    amount: 500
  }
];

export function LoanProductFeesTab({ loanProductId, isParentLevel }: LoanProductFeesTabProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Fees Configuration</CardTitle>
          {isParentLevel && (
            <Button onClick={() => setShowAddModal(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Fee
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Chargeable Type</TableHead>
                <TableHead>Amount/Percentage</TableHead>
                {isParentLevel && <TableHead className="w-[100px]">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {fees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium capitalize">{fee.feeType}</TableCell>
                  <TableCell>
                    <Badge variant={fee.isEnabled ? "default" : "secondary"}>
                      {fee.isEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">{fee.chargeableType}</TableCell>
                  <TableCell>
                    {fee.chargeableType === "percentage" 
                      ? `${fee.percentage}%` 
                      : `KES ${fee.amount?.toLocaleString()}`}
                  </TableCell>
                  {isParentLevel && (
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddFeeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        loanProductId={loanProductId}
      />
    </>
  );
}