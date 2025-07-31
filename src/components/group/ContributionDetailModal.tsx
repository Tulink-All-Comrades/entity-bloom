import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ContributionDetailModalProps {
  contribution: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ContributionDetailModal({ contribution, isOpen, onClose }: ContributionDetailModalProps) {
  if (!contribution) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contribution Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{contribution.name}</h3>
            <Badge variant={contribution.nature === "Regular" ? "default" : "secondary"}>
              {contribution.nature}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="font-medium">{formatCurrency(contribution.amount)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-medium">{contribution.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nature</p>
              <p className="font-medium">{contribution.nature}</p>
            </div>
            {contribution.nature === "Regular" && (
              <div>
                <p className="text-sm text-muted-foreground">Frequency</p>
                <p className="font-medium">{contribution.frequency}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}