import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImportSubOrganizations() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nature, setNature] = useState("");
  const { toast } = useToast();

  const downloadTemplate = () => {
    const csvContent = "Name,Email Address,Phone Number,Physical Address\nSample Organization,sample@example.com,+254712345678,Sample Address";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sub_organizations_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !nature) {
      toast({
        title: "Error",
        description: "Please select a file and nature before uploading",
        variant: "destructive",
      });
      return;
    }

    // Here you would process the CSV file
    toast({
      title: "Success",
      description: "Sub-organizations imported successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Import Sub Organizations</h2>
        <p className="text-muted-foreground">
          Import multiple sub-organizations using CSV file
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Import Process</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="import" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="import">Import</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>
            
            <TabsContent value="import" className="space-y-4">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Download the CSV template and fill in your sub-organization details
                </p>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium mb-2">Template contains columns:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Name</li>
                    <li>• Email Address</li>
                    <li>• Phone Number</li>
                    <li>• Physical Address</li>
                  </ul>
                </div>
                <Button onClick={downloadTemplate} className="w-full max-w-md">
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nature">Nature</Label>
                  <Select value={nature} onValueChange={setNature}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization nature" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bank">Bank</SelectItem>
                      <SelectItem value="Branch">Branch</SelectItem>
                      <SelectItem value="NGO">NGO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Upload CSV File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="file"
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('file')?.click()}
                      className="flex items-center gap-2 w-full"
                    >
                      <Upload className="h-4 w-4" />
                      {selectedFile ? selectedFile.name : "Choose CSV File"}
                    </Button>
                  </div>
                </div>

                <Button onClick={handleUpload} className="w-full">
                  Upload Sub Organizations
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}