import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanProductId: string;
}

export function AddDocumentModal({ isOpen, onClose, loanProductId }: AddDocumentModalProps) {
  const { toast } = useToast();
  const [documentType, setDocumentType] = useState("");
  const [allowedTypes, setAllowedTypes] = useState<string[]>([]);
  const [newType, setNewType] = useState("");

  const addAllowedType = () => {
    if (newType && !allowedTypes.includes(newType)) {
      setAllowedTypes([...allowedTypes, newType]);
      setNewType("");
    }
  };

  const removeAllowedType = (type: string) => {
    setAllowedTypes(allowedTypes.filter(t => t !== type));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!documentType || allowedTypes.length === 0) {
      toast({
        title: "Error",
        description: "Please provide document type and at least one allowed file type",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Document requirement added successfully"
    });
    
    onClose();
    setDocumentType("");
    setAllowedTypes([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Document Requirement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="documentType">Document Type *</Label>
            <Input
              id="documentType"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              placeholder="e.g. Title Deed, ID Copy"
            />
          </div>

          <div>
            <Label>Allowed File Types *</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                placeholder="e.g. pdf, docx"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllowedType())}
              />
              <Button type="button" onClick={addAllowedType}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {allowedTypes.map((type) => (
                <Badge key={type} variant="outline" className="flex items-center gap-1">
                  {type}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeAllowedType(type)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Document</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}