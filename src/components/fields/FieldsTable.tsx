import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Trash2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { FieldDetailModal } from "./FieldDetailModal";
import type { OnboardingField } from "@/lib/types";

interface FieldsTableProps {
  category: 'primary' | 'members' | 'contributions' | 'loans' | 'accounts';
}

export function FieldsTable({ category }: FieldsTableProps) {
  const onboardingFields = useAppStore((state) => state.onboardingFields);
  const deleteOnboardingField = useAppStore((state) => state.deleteOnboardingField);
  
  const [selectedField, setSelectedField] = useState<OnboardingField | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const fields = onboardingFields.filter(field => field.category === category);

  const handleViewMore = (field: OnboardingField) => {
    setSelectedField(field);
    setShowDetail(true);
  };

  const handleDelete = (fieldId: string) => {
    deleteOnboardingField(fieldId);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>Field Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Required</TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field) => (
            <TableRow key={field.id}>
              <TableCell className="font-medium">{field.label}</TableCell>
              <TableCell>{field.fieldName}</TableCell>
              <TableCell className="capitalize">{field.fieldType}</TableCell>
              <TableCell>
                <Badge variant={field.isRequired ? "default" : "secondary"}>
                  {field.isRequired ? "Required" : "Optional"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={field.isSystemGenerated ? "destructive" : "outline"}>
                  {field.isSystemGenerated ? "System" : "Custom"}
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
                    <DropdownMenuItem onClick={() => handleViewMore(field)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View More
                    </DropdownMenuItem>
                    {!field.isSystemGenerated && (
                      <DropdownMenuItem 
                        onClick={() => handleDelete(field.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedField && (
        <FieldDetailModal
          field={selectedField}
          isOpen={showDetail}
          onClose={() => {
            setShowDetail(false);
            setSelectedField(null);
          }}
        />
      )}
    </>
  );
}