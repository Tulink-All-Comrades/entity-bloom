import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface AddLoanProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddLoanProductModal({ isOpen, onClose }: AddLoanProductModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    productType: "",
    interestType: "",
    interestRate: "",
    interestChargeable: "",
    lockingSaving: false,
    minimumSavingsAmount: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.productType || !formData.interestType || 
        !formData.interestRate || !formData.interestChargeable) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to backend
    toast({
      title: "Success",
      description: "Loan product created successfully"
    });
    
    onClose();
    setFormData({
      name: "",
      productType: "",
      interestType: "",
      interestRate: "",
      interestChargeable: "",
      lockingSaving: false,
      minimumSavingsAmount: ""
    });
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Loan Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Loan Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter loan product name"
            />
          </div>

          <div>
            <Label htmlFor="productType">Loan Product Type *</Label>
            <Select value={formData.productType} onValueChange={(value) => handleChange("productType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="group">Group</SelectItem>
                <SelectItem value="sacco">SACCO</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="interestType">Interest Type *</Label>
            <Select value={formData.interestType} onValueChange={(value) => handleChange("interestType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select interest type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed Rate</SelectItem>
                <SelectItem value="reducing">Reducing Balance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="interestRate">Interest Rate (%) *</Label>
            <Input
              id="interestRate"
              type="number"
              value={formData.interestRate}
              onChange={(e) => handleChange("interestRate", e.target.value)}
              placeholder="Enter interest rate"
            />
          </div>

          <div>
            <Label htmlFor="interestChargeable">Interest Rate Chargeable *</Label>
            <Select value={formData.interestChargeable} onValueChange={(value) => handleChange("interestChargeable", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="per month">Per Month</SelectItem>
                <SelectItem value="per week">Per Week</SelectItem>
                <SelectItem value="per day">Per Day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="lockingSaving">Locking Saving</Label>
            <Switch
              id="lockingSaving"
              checked={formData.lockingSaving}
              onCheckedChange={(checked) => handleChange("lockingSaving", checked)}
            />
          </div>

          {formData.lockingSaving && (
            <div>
              <Label htmlFor="minimumSavingsAmount">Minimum Savings Amount (KES)</Label>
              <Input
                id="minimumSavingsAmount"
                type="number"
                value={formData.minimumSavingsAmount}
                onChange={(e) => handleChange("minimumSavingsAmount", e.target.value)}
                placeholder="Enter minimum savings amount"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Loan Product</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}