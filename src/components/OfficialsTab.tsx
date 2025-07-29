import { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
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
import { AddOfficialForm } from "@/components/AddOfficialForm";

interface OfficialsTabProps {
  organizationId: string;
}

export function OfficialsTab({ organizationId }: OfficialsTabProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const officials = useAppStore((state) => state.officials.filter(official => official.organizationId === organizationId));
  const roles = useAppStore((state) => state.roles);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Officials</CardTitle>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Official
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Official</DialogTitle>
            </DialogHeader>
            <AddOfficialForm 
              organizationId={organizationId} 
              onSuccess={() => setShowAddDialog(false)} 
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {officials.map((official) => {
              const role = roles.find(r => r.id === official.roleId);
              return (
                <TableRow key={official.id}>
                  <TableCell className="font-medium">{official.firstName}</TableCell>
                  <TableCell>{official.lastName}</TableCell>
                  <TableCell>{official.phone}</TableCell>
                  <TableCell>{official.email}</TableCell>
                  <TableCell>{role?.name || 'Unknown'}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}