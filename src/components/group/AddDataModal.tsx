import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/lib/store";
import { OnboardingField } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

interface AddDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: 'members' | 'contributions' | 'loans' | 'accounts';
  title: string;
}

export function AddDataModal({ isOpen, onClose, category, title }: AddDataModalProps) {
  const onboardingFields = useAppStore((state) => state.onboardingFields);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categoryFields = onboardingFields.filter((field) => field.category === category);

  const validateField = (field: OnboardingField, value: any): string | null => {
    if (field.isRequired && (!value || value === '')) {
      return `${field.label} is required`;
    }

    if (field.fieldType === 'input' && field.dataType === 'amount' && value) {
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < 0) {
        return `${field.label} must be a valid amount`;
      }
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    // Validate all fields
    categoryFields.forEach((field) => {
      const error = validateField(field, formData[field.fieldName]);
      if (error) {
        newErrors[field.fieldName] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate successful save
      toast({
        title: "Success",
        description: `${title} added successfully`,
      });
      
      // Reset form
      setFormData({});
      onClose();
    }
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const renderField = (field: OnboardingField) => {
    const value = formData[field.fieldName] || '';
    const error = errors[field.fieldName];

    switch (field.fieldType) {
      case 'input':
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              type={field.dataType === 'amount' ? 'number' : 'text'}
              value={value}
              onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className={error ? 'border-destructive' : ''}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Textarea
              value={value}
              onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className={error ? 'border-destructive' : ''}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Select 
              value={value} 
              onValueChange={(val) => handleInputChange(field.fieldName, val)}
            >
              <SelectTrigger className={error ? 'border-destructive' : ''}>
                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.fieldName}-${option.id}`}
                    checked={value === option.value}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleInputChange(field.fieldName, option.value);
                      } else {
                        handleInputChange(field.fieldName, '');
                      }
                    }}
                  />
                  <Label htmlFor={`${field.fieldName}-${option.id}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {categoryFields.map(renderField)}
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}