import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { MembersTab } from "@/components/group/MembersTab";
import { ContributionsTab } from "@/components/group/ContributionsTab";
import { LoansTab } from "@/components/group/LoansTab";
import { AccountsTab } from "@/components/group/AccountsTab";

// Dummy group data
const groupsData = {
  "1": {
    id: "1",
    name: "Savings Circle A",
    nature: "Savings",
    memberCount: 15,
    isRegistered: true,
    registrationNumber: "REG/2023/001",
    totalLoaned: 450000,
    totalDeposits: 680000,
  },
  "2": {
    id: "2",
    name: "Investment Group B",
    nature: "Investment",
    memberCount: 22,
    isRegistered: false,
    registrationNumber: null,
    totalLoaned: 780000,
    totalDeposits: 1200000,
  },
};

export default function GroupDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const group = groupsData[id as keyof typeof groupsData];

  if (!group) {
    return <div>Group not found</div>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Group Details Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{group.name}</CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">{group.nature}</Badge>
                <Badge variant={group.isRegistered ? "default" : "outline"}>
                  {group.isRegistered ? "Registered" : "Not Registered"}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Members</p>
              <p className="text-2xl font-bold">{group.memberCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Deposits</p>
              <p className="text-2xl font-bold">{formatCurrency(group.totalDeposits)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Loaned</p>
              <p className="text-2xl font-bold">{formatCurrency(group.totalLoaned)}</p>
            </div>
            {group.isRegistered && (
              <div>
                <p className="text-sm text-muted-foreground">Registration Number</p>
                <p className="text-lg font-semibold">{group.registrationNumber}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members">
          <MembersTab groupId={group.id} />
        </TabsContent>
        
        <TabsContent value="contributions">
          <ContributionsTab groupId={group.id} />
        </TabsContent>
        
        <TabsContent value="loans">
          <LoansTab groupId={group.id} />
        </TabsContent>
        
        <TabsContent value="accounts">
          <AccountsTab groupId={group.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}