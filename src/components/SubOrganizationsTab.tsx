import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MoreHorizontal, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAppStore } from "@/lib/store";
import { AddOrganizationForm } from "@/components/AddOrganizationForm";

interface SubOrganizationsTabProps {
  parentId: string;
  parentName: string;
}

export function SubOrganizationsTab({ parentId, parentName }: SubOrganizationsTabProps) {
  const navigate = useNavigate();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const allOrganizations = useAppStore((state) => state.organizations);
  const subOrganizations = useMemo(() => 
    allOrganizations.filter(org => org.parentId === parentId),
    [allOrganizations, parentId]
  );

  const handleViewSubOrganization = (id: string) => {
    navigate(`admin/organizations/${id}`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sub Organizations</CardTitle>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Sub Organization
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Sub Organization</DialogTitle>
            </DialogHeader>
            <AddOrganizationForm 
              parentId={parentId} 
              parentName={parentName}
              onSuccess={() => setShowAddDialog(false)} 
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Nature</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subOrganizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell className="font-medium">{org.name}</TableCell>
                <TableCell>{org.nature}</TableCell>
                <TableCell>{org.email}</TableCell>
                <TableCell>{org.phone}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewSubOrganization(org.id)}>
                        <Eye className="h-4 w-4 mr-2" />
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
  );
}