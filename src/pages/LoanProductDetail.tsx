import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus } from "lucide-react";
import { LoanProductFeesTab } from "@/components/loan/LoanProductFeesTab";
import { LoanProductFinesTab } from "@/components/loan/LoanProductFinesTab";
import { LoanProductDocumentsTab } from "@/components/loan/LoanProductDocumentsTab";

export function LoanProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Dummy data - in real app this would be fetched based on id
  const loanProduct = {
    id: "1",
    name: "Group Development Loan",
    productType: "group" as const,
    interestType: "fixed" as const,
    interestRate: 10,
    interestChargeable: "per month" as const,
    lockingSaving: true,
    minimumSavingsAmount: 50000,
    organizationId: "org1"
  };

  // Check if current user is at parent level (for demo purposes, assume true)
  const isParentLevel = true;

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/org/loan-products")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Loan Products
        </Button>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">{loanProduct.name}</h1>
        <p className="text-muted-foreground">Manage loan product configuration and settings</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Primary Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Product Type</p>
              <Badge variant="outline" className="capitalize mt-1">
                {loanProduct.productType}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interest Type</p>
              <p className="font-medium capitalize">{loanProduct.interestType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interest Rate</p>
              <p className="font-medium">{loanProduct.interestRate}% {loanProduct.interestChargeable}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Savings Locking</p>
              <Badge variant={loanProduct.lockingSaving ? "default" : "secondary"}>
                {loanProduct.lockingSaving ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="fees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="fines">Fines</TabsTrigger>
          <TabsTrigger value="documents">Documents Required</TabsTrigger>
        </TabsList>

        <TabsContent value="fees">
          <LoanProductFeesTab loanProductId={loanProduct.id} isParentLevel={isParentLevel} />
        </TabsContent>

        <TabsContent value="fines">
          <LoanProductFinesTab loanProductId={loanProduct.id} isParentLevel={isParentLevel} />
        </TabsContent>

        <TabsContent value="documents">
          <LoanProductDocumentsTab loanProductId={loanProduct.id} isParentLevel={isParentLevel} />
        </TabsContent>
      </Tabs>
    </div>
  );
}