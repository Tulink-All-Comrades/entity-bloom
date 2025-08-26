import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const feesData = [
  { loanProduct: "Group Development Loan", productType: "group", amount: 25000 },
  { loanProduct: "Individual Emergency Loan", productType: "individual", amount: 15000 }
];

export function FeesReport() {
  const [feeFilter, setFeeFilter] = useState("");
  const [filteredData, setFilteredData] = useState(feesData);

  const applyFilter = () => {
    if (!feeFilter) {
      setFilteredData(feesData);
    } else {
      // In a real app, you'd filter based on the fee type
      setFilteredData(feesData);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Fees Report</h1>
        <p className="text-muted-foreground">Track fees collected from loan products</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Fee Collections</CardTitle>
            <div className="flex gap-2">
              <Select value={feeFilter} onValueChange={setFeeFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by fee type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="insurance">Insurance Fees</SelectItem>
                  <SelectItem value="processing">Processing Fees</SelectItem>
                  <SelectItem value="application">Application Fees</SelectItem>
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
                <TableHead>Loan Product Name</TableHead>
                <TableHead>Loan Product Type</TableHead>
                <TableHead>Amount (KES)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((fee, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{fee.loanProduct}</TableCell>
                  <TableCell className="capitalize">{fee.productType}</TableCell>
                  <TableCell>{fee.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}