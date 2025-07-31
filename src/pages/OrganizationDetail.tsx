import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Edit, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAppStore } from "@/lib/store";
import { AddOrganizationForm } from "@/components/AddOrganizationForm";
import { OfficialsTab } from "@/components/OfficialsTab";
import { SubOrganizationsTab } from "@/components/SubOrganizationsTab";
import { GroupsTab } from "@/components/GroupsTab";
import { EditOrganizationForm } from "@/components/EditOrganizationForm";

export default function OrganizationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const allOrganizations = useAppStore((state) => state.organizations);
  const organization = useMemo(() => 
    allOrganizations.find(org => org.id === id),
    [allOrganizations, id]
  );

  if (!organization) {
    return (
      <div className="container mx-auto p-6">
        <p>Organization not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Top Part - Organization Details */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            {organization.logoUrl && (
              <div className="w-16 h-16 rounded-lg overflow-hidden border">
                <img 
                  src={organization.logoUrl} 
                  alt={`${organization.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <CardTitle className="text-2xl">{organization.name}</CardTitle>
              <p className="text-muted-foreground">{organization.nature}</p>
            </div>
          </div>
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Organization</DialogTitle>
              </DialogHeader>
              <EditOrganizationForm 
                organization={organization} 
                onSuccess={() => setShowEditDialog(false)} 
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{organization.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{organization.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Part - Tabs */}
      <Tabs defaultValue="officials" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="officials">Officials</TabsTrigger>
          <TabsTrigger value="sub-organizations">Sub Organizations</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="officials">
          <OfficialsTab organizationId={organization.id} />
        </TabsContent>

        <TabsContent value="sub-organizations">
          <SubOrganizationsTab parentId={organization.id} parentName={organization.name} />
        </TabsContent>

        <TabsContent value="groups">
          <GroupsTab organizationId={organization.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}