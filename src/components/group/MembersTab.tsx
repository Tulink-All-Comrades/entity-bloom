import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import { MemberDetailModal } from "./MemberDetailModal";
import { AddDataModal } from "./AddDataModal";

// Dummy members data
const members = [
  { id: "1", name: "John Doe", phone: "+254712345678", email: "john@example.com", role: "Chairperson", membershipNumber: "MEM001", nationalId: "12345678", profilePicture: null },
  { id: "2", name: "Jane Smith", phone: "+254712345679", email: "jane@example.com", role: "Secretary", membershipNumber: "MEM002", nationalId: "23456789", profilePicture: null },
  { id: "3", name: "Bob Johnson", phone: "+254712345680", email: "bob@example.com", role: "Treasurer", membershipNumber: "MEM003", nationalId: "34567890", profilePicture: null },
];

interface MembersTabProps {
  groupId: string;
}

export function MembersTab({ groupId }: MembersTabProps) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleViewMember = (member: any) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Group Members</CardTitle>
          <Button onClick={() => setShowAddModal(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewMember(member)}>
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

      <MemberDetailModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <AddDataModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        category="members"
        title="Add Member"
      />
    </>
  );
}