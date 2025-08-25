import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface LoanProductDetailModalProps {
  loanProduct: any;
  isOpen: boolean;
  onClose: () => void;
}

export function LoanProductDetailModal({ loanProduct, isOpen, onClose }: LoanProductDetailModalProps) {
  if (!loanProduct) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Loan Product Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{loanProduct.name}</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Loan Product Type</p>
              <Badge variant="outline" className="capitalize mt-1">
                {loanProduct.productType}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interest Type</p>
              <p className="font-medium capitalize">{loanProduct.interestType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interest Rate Type</p>
              <p className="font-medium">{loanProduct.interestRate}% {loanProduct.interestChargeable}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interest Rate Chargeable</p>
              <p className="font-medium capitalize">{loanProduct.interestChargeable}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Fee Configuration</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Insurance Fees</p>
                <Badge variant="secondary">Not Configured</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Processing Fees</p>
                <Badge variant="secondary">Not Configured</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Application Fees</p>
                <Badge variant="secondary">Not Configured</Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Savings & Requirements</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Savings Locking</p>
                <Badge variant={loanProduct.lockingSaving ? "default" : "secondary"}>
                  {loanProduct.lockingSaving ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Minimum Savings Required</p>
                <p className="font-medium">KES {loanProduct.minimumSavingsAmount?.toLocaleString() || 0}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Documents Required</h4>
            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground">No documents configured yet</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold">Fines Configuration</h4>
            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground">No fines configured yet</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}