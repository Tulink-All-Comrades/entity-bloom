import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Plus } from "lucide-react";
import { useAppStore } from "@/lib/store";
import type { OnboardingField, FieldOption } from "@/lib/types";

interface FieldDetailModalProps {
  field: OnboardingField;
  isOpen: boolean;
  onClose: () => void;
}

export function FieldDetailModal({ field, isOpen, onClose }: FieldDetailModalProps) {
  const updateOnboardingField = useAppStore((state) => state.updateOnboardingField);
  const [editingOption, setEditingOption] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ label: '', value: '' });
  const [showAddOption, setShowAddOption] = useState(false);
  const [newOption, setNewOption] = useState({ label: '', value: '' });

  const handleEditOption = (option: FieldOption) => {
    setEditingOption(option.id);
    setEditValues({ label: option.label, value: option.value });
  };

  const handleSaveOption = (optionId: string) => {
    if (!field.options) return;
    
    const updatedOptions = field.options.map(opt => 
      opt.id === optionId 
        ? { ...opt, label: editValues.label, value: editValues.value }
        : opt
    );
    
    updateOnboardingField(field.id, { options: updatedOptions });
    setEditingOption(null);
  };

  const handleDeleteOption = (optionId: string) => {
    if (!field.options) return;
    
    const updatedOptions = field.options.filter(opt => opt.id !== optionId);
    updateOnboardingField(field.id, { options: updatedOptions });
  };

  const handleAddOption = () => {
    if (!newOption.label || !newOption.value) return;
    
    const currentOptions = field.options || [];
    const newOptionObj: FieldOption = {
      id: Date.now().toString(),
      label: newOption.label,
      value: newOption.value
    };
    
    updateOnboardingField(field.id, { 
      options: [...currentOptions, newOptionObj] 
    });
    
    setNewOption({ label: '', value: '' });
    setShowAddOption(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Field Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Label</Label>
              <p className="font-medium">{field.label}</p>
            </div>
            <div>
              <Label>Field Name</Label>
              <p className="font-medium">{field.fieldName}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Field Type</Label>
              <Badge className="capitalize">{field.fieldType}</Badge>
            </div>
            {field.dataType && (
              <div>
                <Label>Data Type</Label>
                <Badge variant="outline" className="capitalize">{field.dataType}</Badge>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Required</Label>
              <Badge variant={field.isRequired ? "default" : "secondary"}>
                {field.isRequired ? "Yes" : "No"}
              </Badge>
            </div>
            <div>
              <Label>Source</Label>
              <Badge variant={field.isSystemGenerated ? "destructive" : "outline"}>
                {field.isSystemGenerated ? "System Generated" : "Custom"}
              </Badge>
            </div>
          </div>

          {field.fieldType === 'select' && field.options && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Options</Label>
                <Button
                  size="sm"
                  onClick={() => setShowAddOption(true)}
                  disabled={field.isSystemGenerated}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Label</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {field.options.map((option) => (
                    <TableRow key={option.id}>
                      <TableCell>
                        {editingOption === option.id ? (
                          <Input
                            value={editValues.label}
                            onChange={(e) => setEditValues(prev => ({ ...prev, label: e.target.value }))}
                          />
                        ) : (
                          option.label
                        )}
                      </TableCell>
                      <TableCell>
                        {editingOption === option.id ? (
                          <Input
                            value={editValues.value}
                            onChange={(e) => setEditValues(prev => ({ ...prev, value: e.target.value }))}
                          />
                        ) : (
                          option.value
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {editingOption === option.id ? (
                            <Button
                              size="sm"
                              onClick={() => handleSaveOption(option.id)}
                            >
                              Save
                            </Button>
                          ) : (
                            <>
                              {!field.isSystemGenerated && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleEditOption(option)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDeleteOption(option.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {showAddOption && (
                    <TableRow>
                      <TableCell>
                        <Input
                          placeholder="Label"
                          value={newOption.label}
                          onChange={(e) => setNewOption(prev => ({ ...prev, label: e.target.value }))}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Value"
                          value={newOption.value}
                          onChange={(e) => setNewOption(prev => ({ ...prev, value: e.target.value }))}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleAddOption}>
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowAddOption(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {field.fieldType === 'checkbox' && field.options && (
            <div>
              <Label>Checkbox Options</Label>
              <div className="space-y-2 mt-2">
                {field.options.map((option) => (
                  <div key={option.id} className="flex items-center justify-between p-2 border rounded">
                    <span>{option.label}</span>
                    <Badge variant="outline">{option.value}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {field.fieldType === 'textarea' && (
            <div>
              <Label>Text Area Field</Label>
              <p className="text-sm text-muted-foreground">
                This field will display as a multi-line text input for longer content.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}