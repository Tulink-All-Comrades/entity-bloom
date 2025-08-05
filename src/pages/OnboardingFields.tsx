import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FieldsTable } from "@/components/fields/FieldsTable";
import { AddFieldModal } from "@/components/fields/AddFieldModal";

export default function OnboardingFields() {
  const [showAddField, setShowAddField] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'primary' | 'members' | 'contributions' | 'loans' | 'accounts'>('primary');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Onboarding Fields</h2>
          <p className="text-muted-foreground">
            Manage fields for group onboarding process
          </p>
        </div>
        <Button onClick={() => setShowAddField(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Field Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as any)}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="primary">Primary Info</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="contributions">Contributions</TabsTrigger>
              <TabsTrigger value="loans">Loans</TabsTrigger>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="primary">
              <FieldsTable category="primary" />
            </TabsContent>
            
            <TabsContent value="members">
              <FieldsTable category="members" />
            </TabsContent>
            
            <TabsContent value="contributions">
              <FieldsTable category="contributions" />
            </TabsContent>
            
            <TabsContent value="loans">
              <FieldsTable category="loans" />
            </TabsContent>
            
            <TabsContent value="accounts">
              <FieldsTable category="accounts" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AddFieldModal 
        isOpen={showAddField} 
        onClose={() => setShowAddField(false)}
      />
    </div>
  );
}