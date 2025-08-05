import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppStore } from "@/lib/store";
import type { OnboardingField } from "@/lib/types";

interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: 'primary' | 'members' | 'contributions' | 'loans' | 'accounts';
}

export function AddFieldModal({ isOpen, onClose, category }: AddFieldModalProps) {
  const addOnboardingField = useAppStore((state) => state.addOnboardingField);
  
  const [formData, setFormData] = useState({
    label: '',
    fieldName: '',
    fieldType: 'input' as OnboardingField['fieldType'],
    dataType: 'text' as 'text' | 'amount',
    isRequired: false,
  });

  const [options, setOptions] = useState<Array<{ label: string; value: string }>>([]);
  const [newOption, setNewOption] = useState({ label: '', value: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.label || !formData.fieldName) return;

    const field: Omit<OnboardingField, 'id'> = {
      label: formData.label,
      fieldName: formData.fieldName,
      fieldType: formData.fieldType,
      dataType: formData.fieldType === 'input' ? formData.dataType : undefined,
      isRequired: formData.isRequired,
      isSystemGenerated: false,
      category,
      options: (formData.fieldType === 'select' || formData.fieldType === 'checkbox') ? 
        options.map((opt, index) => ({ id: (index + 1).toString(), ...opt })) : undefined,
    };

    addOnboardingField(field);
    
    // Reset form
    setFormData({
      label: '',
      fieldName: '',
      fieldType: 'input',
      dataType: 'text',
      isRequired: false,
    });
    setOptions([]);
    setNewOption({ label: '', value: '' });
    
    onClose();
  };

  const addOption = () => {
    if (newOption.label && newOption.value) {
      setOptions([...options, newOption]);
      setNewOption({ label: '', value: '' });
    }
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Field</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
              placeholder="Enter field label"
              required
            />
          </div>

          <div>
            <Label htmlFor="fieldName">Field Name</Label>
            <Input
              id="fieldName"
              value={formData.fieldName}
              onChange={(e) => setFormData(prev => ({ ...prev, fieldName: e.target.value }))}
              placeholder="Enter field name (camelCase)"
              required
            />
          </div>

          <div>
            <Label>Field Type</Label>
            <Select 
              value={formData.fieldType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, fieldType: value as any }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="input">Input</SelectItem>
                <SelectItem value="select">Select</SelectItem>
                <SelectItem value="textarea">Textarea</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.fieldType === 'input' && (
            <div>
              <Label>Data Type</Label>
              <Select 
                value={formData.dataType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, dataType: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {(formData.fieldType === 'select' || formData.fieldType === 'checkbox') && (
            <div>
              <Label>Options</Label>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="flex-1">{option.label} ({option.value})</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Label"
                    value={newOption.label}
                    onChange={(e) => setNewOption(prev => ({ ...prev, label: e.target.value }))}
                  />
                  <Input
                    placeholder="Value"
                    value={newOption.value}
                    onChange={(e) => setNewOption(prev => ({ ...prev, value: e.target.value }))}
                  />
                  <Button type="button" onClick={addOption}>Add</Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="required"
              checked={formData.isRequired}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isRequired: !!checked }))}
            />
            <Label htmlFor="required">Required field</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">Add Field</Button>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}