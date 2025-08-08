import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";

// Dummy sub-organizations data
const subOrganizations = [
  { id: "1", name: "Nairobi Branch", nature: "Branch", email: "nairobi@coop.com", phone: "+254712345678" },
  { id: "2", name: "Mombasa Branch", nature: "Branch", email: "mombasa@coop.com", phone: "+254712345679" },
  { id: "3", name: "Kisumu Branch", nature: "Branch", email: "kisumu@coop.com", phone: "+254712345680" },
];

export default function OrgSubOrganizations() {
  const navigate = useNavigate();

  const handleViewSubOrganization = (id: string) => {
    navigate(`/admin/sub-organizations/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Sub Organizations</h2>
          <p className="text-muted-foreground">
            Manage your sub-organizations and branches
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Sub Organization
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sub Organizations List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Nature</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="w-[50px]"></TableHead>
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
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewSubOrganization(org.id)}>
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
    </div>
  );
}