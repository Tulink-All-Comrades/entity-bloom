import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface AddFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanProductId: string;
}

export function AddFeeModal({ isOpen, onClose, loanProductId }: AddFeeModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    feeType: "",
    isEnabled: true,
    chargeableType: "",
    amount: "",
    percentage: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.feeType || !formData.chargeableType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.chargeableType === "fixed" && !formData.amount) {
      toast({
        title: "Error", 
        description: "Please specify the amount for fixed fee type",
        variant: "destructive"
      });
      return;
    }

    if (formData.chargeableType === "percentage" && !formData.percentage) {
      toast({
        title: "Error",
        description: "Please specify the percentage for percentage fee type", 
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Fee added successfully"
    });
    
    onClose();
    setFormData({
      feeType: "",
      isEnabled: true,
      chargeableType: "",
      amount: "",
      percentage: ""
    });
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Fee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="feeType">Fee Type *</Label>
            <Select value={formData.feeType} onValueChange={(value) => handleChange("feeType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select fee type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="insurance">Insurance</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="application">Application</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isEnabled">Enable Fee</Label>
            <Switch
              id="isEnabled"
              checked={formData.isEnabled}
              onCheckedChange={(checked) => handleChange("isEnabled", checked)}
            />
          </div>

          <div>
            <Label htmlFor="chargeableType">Chargeable Type *</Label>
            <Select value={formData.chargeableType} onValueChange={(value) => handleChange("chargeableType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select chargeable type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.chargeableType === "fixed" && (
            <div>
              <Label htmlFor="amount">Amount (KES) *</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                placeholder="Enter amount"
              />
            </div>
          )}

          {formData.chargeableType === "percentage" && (
            <div>
              <Label htmlFor="percentage">Percentage (%) *</Label>
              <Input
                id="percentage"
                type="number"
                step="0.1"
                value={formData.percentage}
                onChange={(e) => handleChange("percentage", e.target.value)}
                placeholder="Enter percentage"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Fee</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}