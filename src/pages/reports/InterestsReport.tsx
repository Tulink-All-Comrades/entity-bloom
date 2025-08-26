import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const interestsData = [
  { loanProduct: "Group Development Loan", productType: "group", cumulativeInterest: 125000 },
  { loanProduct: "Individual Emergency Loan", productType: "individual", cumulativeInterest: 75000 },
  { loanProduct: "SACCO Business Loan", productType: "sacco", cumulativeInterest: 200000 }
];

export function InterestsReport() {
  const [productTypeFilter, setProductTypeFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [filteredData, setFilteredData] = useState(interestsData);

  const applyFilter = () => {
    let filtered = interestsData;
    
    if (productTypeFilter) {
      filtered = filtered.filter(item => item.productType === productTypeFilter);
    }
    
    if (productFilter) {
      filtered = filtered.filter(item => item.loanProduct === productFilter);
    }
    
    setFilteredData(filtered);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Interests Report</h1>
        <p className="text-muted-foreground">Track interest collected from loan products</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Interest Collections</CardTitle>
            <div className="flex gap-2">
              <Select value={productTypeFilter} onValueChange={setProductTypeFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="group">Group</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="sacco">SACCO</SelectItem>
                </SelectContent>
              </Select>
              <Select value={productFilter} onValueChange={setProductFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Group Development Loan">Group Development Loan</SelectItem>
                  <SelectItem value="Individual Emergency Loan">Individual Emergency Loan</SelectItem>
                  <SelectItem value="SACCO Business Loan">SACCO Business Loan</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={applyFilter}>Apply Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan Product</TableHead>
                <TableHead>Loan Product Type</TableHead>
                <TableHead>Cumulative Interest (KES)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((interest, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{interest.loanProduct}</TableCell>
                  <TableCell className="capitalize">{interest.productType}</TableCell>
                  <TableCell>{interest.cumulativeInterest.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}