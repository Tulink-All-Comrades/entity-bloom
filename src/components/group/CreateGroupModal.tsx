import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import type { OnboardingField } from "@/lib/types";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
}

export function CreateGroupModal({ isOpen, onClose, organizationId }: CreateGroupModalProps) {
  const onboardingFields = useAppStore((state) => state.onboardingFields);
  const addGroup = useAppStore((state) => state.addGroup);
  const { toast } = useToast();
  
  const primaryFields = onboardingFields.filter(field => field.category === 'primary');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    primaryFields.forEach(field => {
      if (field.isRequired && !formData[field.fieldName]) {
        newErrors[field.fieldName] = `${field.label} is required`;
      }
      
      if (field.dataType === 'amount' && formData[field.fieldName] && isNaN(Number(formData[field.fieldName]))) {
        newErrors[field.fieldName] = `${field.label} must be a valid number`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting",
        variant: "destructive",
      });
      return;
    }

    // Create group with the form data
    const groupData = {
      name: formData.groupName || 'Unnamed Group',
      memberCount: parseInt(formData.memberCount) || 0,
      totalLoaned: 0,
      totalDeposits: 0,
      totalWithdrawals: 0,
      organizationId,
      // Store additional custom fields
      customFields: formData,
    };

    addGroup(groupData);
    
    toast({
      title: "Success",
      description: "Group created successfully",
    });
    
    // Reset form
    setFormData({});
    setErrors({});
    onClose();
  };

  const renderField = (field: OnboardingField) => {
    const value = formData[field.fieldName] || '';
    const hasError = !!errors[field.fieldName];

    switch (field.fieldType) {
      case 'input':
        return (
          <div key={field.id}>
            <Label htmlFor={field.fieldName}>
              {field.label}
              {field.isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={field.fieldName}
              type={field.dataType === 'amount' ? 'number' : 'text'}
              value={value}
              onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
              className={hasError ? 'border-destructive' : ''}
            />
            {hasError && (
              <p className="text-sm text-destructive mt-1">{errors[field.fieldName]}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.id}>
            <Label htmlFor={field.fieldName}>
              {field.label}
              {field.isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Select
              value={value}
              onValueChange={(val) => handleInputChange(field.fieldName, val)}
            >
              <SelectTrigger className={hasError ? 'border-destructive' : ''}>
                <SelectValue placeholder={`Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasError && (
              <p className="text-sm text-destructive mt-1">{errors[field.fieldName]}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id}>
            <Label htmlFor={field.fieldName}>
              {field.label}
              {field.isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Textarea
              id={field.fieldName}
              value={value}
              onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
              className={hasError ? 'border-destructive' : ''}
            />
            {hasError && (
              <p className="text-sm text-destructive mt-1">{errors[field.fieldName]}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id}>
            <Label>
              {field.label}
              {field.isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <div className="space-y-2 mt-2">
              {field.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.fieldName}_${option.id}`}
                    checked={value === option.value}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleInputChange(field.fieldName, option.value);
                      } else {
                        handleInputChange(field.fieldName, '');
                      }
                    }}
                  />
                  <Label htmlFor={`${field.fieldName}_${option.id}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            {hasError && (
              <p className="text-sm text-destructive mt-1">{errors[field.fieldName]}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {primaryFields.map(renderField)}
          
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">Create Group</Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}