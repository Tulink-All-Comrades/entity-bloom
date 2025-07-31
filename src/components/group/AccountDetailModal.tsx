import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AccountDetailModalProps {
  account: any;
  isOpen: boolean;
  onClose: () => void;
}

export function AccountDetailModal({ account, isOpen, onClose }: AccountDetailModalProps) {
  if (!account) return null;

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
          <DialogTitle>Account Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{account.accountName}</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Account Type</p>
              <p className="font-medium">{account.accountType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Institution</p>
              <p className="font-medium">{account.institution}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account Number</p>
              <p className="font-medium">{account.accountNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account Balance</p>
              <p className="font-medium">{formatCurrency(account.accountBalance)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Signing Mandate</p>
              <p className="font-medium">{account.signingMandate}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}