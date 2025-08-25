import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { AddDocumentModal } from "./AddDocumentModal";

interface LoanProductDocumentsTabProps {
  loanProductId: string;
  isParentLevel: boolean;
}

const documents = [
  {
    id: "1",
    documentType: "Title Deed",
    allowedTypes: ["pdf", "docx"]
  },
  {
    id: "2",
    documentType: "ID Copy",
    allowedTypes: ["pdf", "jpg", "png"]
  }
];

export function LoanProductDocumentsTab({ loanProductId, isParentLevel }: LoanProductDocumentsTabProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Documents Required</CardTitle>
          {isParentLevel && (
            <Button onClick={() => setShowAddModal(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Document
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Type</TableHead>
                <TableHead>Allowed Types</TableHead>
                {isParentLevel && <TableHead className="w-[100px]">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.documentType}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {doc.allowedTypes.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs uppercase">
                          {type}
                        </Badge>
                      ))}
                    </div>
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

      <AddDocumentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        loanProductId={loanProductId}
      />
    </>
  );
}