import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface AddFineModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanProductId: string;
}

export function AddFineModal({ isOpen, onClose, loanProductId }: AddFineModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fineTypes: [] as string[],
    chargeableType: "",
    amount: "",
    percentage: "",
    chargeableFrequency: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.fineTypes.length === 0 || !formData.chargeableType || !formData.chargeableFrequency) {
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
      description: "Fine added successfully"
    });
    
    onClose();
    setFormData({
      fineTypes: [],
      chargeableType: "",
      amount: "",
      percentage: "",
      chargeableFrequency: ""
    });
  };

  const handleFineTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, fineTypes: [...prev.fineTypes, type] }));
    } else {
      setFormData(prev => ({ ...prev, fineTypes: prev.fineTypes.filter(t => t !== type) }));
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Fine</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Fine Types *</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="late_installments"
                  checked={formData.fineTypes.includes("late_installments")}
                  onCheckedChange={(checked) => handleFineTypeChange("late_installments", checked as boolean)}
                />
                <Label htmlFor="late_installments">Late Installments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="outstanding_balance"
                  checked={formData.fineTypes.includes("outstanding_balance")}
                  onCheckedChange={(checked) => handleFineTypeChange("outstanding_balance", checked as boolean)}
                />
                <Label htmlFor="outstanding_balance">Outstanding Balance</Label>
              </div>
            </div>
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

          <div>
            <Label htmlFor="chargeableFrequency">Chargeable Frequency *</Label>
            <Select value={formData.chargeableFrequency} onValueChange={(value) => handleChange("chargeableFrequency", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="per day">Per Day</SelectItem>
                <SelectItem value="per week">Per Week</SelectItem>
                <SelectItem value="per month">Per Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Fine</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}