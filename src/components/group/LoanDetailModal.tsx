import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface LoanDetailModalProps {
  loan: any;
  isOpen: boolean;
  onClose: () => void;
}

export function LoanDetailModal({ loan, isOpen, onClose }: LoanDetailModalProps) {
  if (!loan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Loan Type Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{loan.name}</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Eligibility Criteria</p>
              <p className="font-medium">{loan.eligibilityCriteria}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interest Rate</p>
              <p className="font-medium">{loan.interestRate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Guarantors Required</p>
              <Badge variant={loan.guarantorsRequired ? "default" : "secondary"}>
                {loan.guarantorsRequired ? "Yes" : "No"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Grace Period</p>
              <p className="font-medium">{loan.gracePeriod} month(s)</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Repayment Period</p>
              <p className="font-medium">{loan.repaymentPeriod} months</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}