import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { AddFineModal } from "./AddFineModal";

interface LoanProductFinesTabProps {
  loanProductId: string;
  isParentLevel: boolean;
}

const fines = [
  {
    id: "1",
    fineTypes: ["late_installments"],
    chargeableType: "percentage" as const,
    percentage: 1.5,
    amount: undefined,
    chargeableFrequency: "per day"
  }
];

export function LoanProductFinesTab({ loanProductId, isParentLevel }: LoanProductFinesTabProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Fines Configuration</CardTitle>
          {isParentLevel && (
            <Button onClick={() => setShowAddModal(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Fine
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fine Types</TableHead>
                <TableHead>Chargeable Type</TableHead>
                <TableHead>Amount/Percentage</TableHead>
                <TableHead>Frequency</TableHead>
                {isParentLevel && <TableHead className="w-[100px]">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {fines.map((fine) => (
                <TableRow key={fine.id}>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {fine.fineTypes.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type.replace("_", " ")}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{fine.chargeableType}</TableCell>
                  <TableCell>
                    {fine.chargeableType === "percentage" 
                      ? `${fine.percentage}%` 
                      : `KES ${fine.amount?.toLocaleString()}`}
                  </TableCell>
                  <TableCell className="capitalize">{fine.chargeableFrequency}</TableCell>
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

      <AddFineModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        loanProductId={loanProductId}
      />
    </>
  );
}