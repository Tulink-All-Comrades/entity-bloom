import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - in real app this would come from API
const applicationDetails = {
  id: "1",
  loanProductName: "Group Development Loan",
  loanProductType: "group",
  beneficiaryName: "Savings Group A",
  beneficiaryContact: "contact@groupa.com",
  amount: 100000,
  status: "pending_approval",
  appliedDate: "2024-01-15",
  documents: [
    { name: "Group Registration Certificate", type: "PDF", status: "uploaded" },
    { name: "Bank Statement", type: "PDF", status: "uploaded" },
    { name: "ID Copies", type: "PDF", status: "pending" }
  ],
  details: {
    purpose: "Business expansion and equipment purchase",
    repaymentPeriod: "24 months",
    collateral: "Group savings and guarantors",
    monthlyIncome: "KES 50,000",
    creditScore: "Good"
  }
};

export function LoanApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "secondary" | "default" | "destructive" | "outline"> = {
      pending_approval: "secondary",
      approved: "default",
      declined: "destructive",
      disbursed: "outline"
    };
    return <Badge variant={variants[status] || "secondary"}>{status.replace("_", " ")}</Badge>;
  };

  const getDocumentStatusBadge = (status: string) => {
    const variants: Record<string, "secondary" | "default" | "destructive"> = {
      uploaded: "default",
      pending: "secondary",
      rejected: "destructive"
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/org/loan-applications")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Applications
        </Button>
        <h1 className="text-3xl font-bold">Loan Application Details</h1>
        <p className="text-muted-foreground">Application ID: {id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Application Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Loan Product</label>
              <p className="font-medium">{applicationDetails.loanProductName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Product Type</label>
              <p><Badge variant="outline" className="capitalize">{applicationDetails.loanProductType}</Badge></p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Beneficiary</label>
              <p className="font-medium">{applicationDetails.beneficiaryName}</p>
              <p className="text-sm text-muted-foreground">{applicationDetails.beneficiaryContact}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Amount Requested</label>
              <p className="text-2xl font-bold">KES {applicationDetails.amount.toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div>{getStatusBadge(applicationDetails.status)}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Applied Date</label>
              <p>{new Date(applicationDetails.appliedDate).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Application Details */}
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Purpose</label>
              <p>{applicationDetails.details.purpose}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Repayment Period</label>
              <p>{applicationDetails.details.repaymentPeriod}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Collateral</label>
              <p>{applicationDetails.details.collateral}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Monthly Income</label>
              <p>{applicationDetails.details.monthlyIncome}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Credit Score</label>
              <p>{applicationDetails.details.creditScore}</p>
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Required Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {applicationDetails.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.type}</p>
                  </div>
                  {getDocumentStatusBadge(doc.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Application Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button>Approve Application</Button>
              <Button variant="destructive">Decline Application</Button>
              <Button variant="outline">Request More Information</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}