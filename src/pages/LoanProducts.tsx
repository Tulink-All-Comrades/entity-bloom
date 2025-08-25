import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus } from "lucide-react";
import { LoanProductDetailModal } from "@/components/loan/LoanProductDetailModal";
import { AddLoanProductModal } from "@/components/loan/AddLoanProductModal";
import { useNavigate } from "react-router-dom";

// Dummy loan products data
const loanProducts = [
  {
    id: "1",
    name: "Group Development Loan",
    productType: "group" as const,
    interestType: "fixed" as const,
    interestRate: 10,
    interestChargeable: "per month" as const,
    lockingSaving: true,
    minimumSavingsAmount: 50000,
    organizationId: "org1"
  },
  {
    id: "2", 
    name: "Individual Emergency Loan",
    productType: "individual" as const,
    interestType: "reducing" as const,
    interestRate: 15,
    interestChargeable: "per month" as const,
    lockingSaving: false,
    minimumSavingsAmount: 20000,
    organizationId: "org1"
  },
  {
    id: "3",
    name: "SACCO Business Loan", 
    productType: "sacco" as const,
    interestType: "fixed" as const,
    interestRate: 12,
    interestChargeable: "per month" as const,
    lockingSaving: true,
    minimumSavingsAmount: 100000,
    organizationId: "org1"
  }
];

export function LoanProducts() {
  const [selectedLoanProduct, setSelectedLoanProduct] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  // Check if current user is at parent level (for demo purposes, assume true)
  const isParentLevel = true;

  const handleViewLoanProduct = (loanProduct: any) => {
    setSelectedLoanProduct(loanProduct);
    setIsDetailModalOpen(true);
  };

  const handleViewMore = (loanProduct: any) => {
    navigate(`/org/loan-products/${loanProduct.id}`);
  };

  const formatInterestRate = (product: any) => {
    return `${product.interestType === 'fixed' ? 'Fixed' : 'Reducing'} interest rate of ${product.interestRate}% ${product.interestChargeable}`;
  };

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Loan Products</h1>
            <p className="text-muted-foreground">Manage loan products and their configurations</p>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Available Loan Products</CardTitle>
            {isParentLevel && (
              <Button onClick={() => setShowAddModal(true)} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Loan Product
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan Product Name</TableHead>
                  <TableHead>Loan Product Type</TableHead>
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Locking Saving</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loanProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {product.productType}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatInterestRate(product)}</TableCell>
                    <TableCell>
                      <Badge variant={product.lockingSaving ? "default" : "secondary"}>
                        {product.lockingSaving ? "True" : "False"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewLoanProduct(product)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewMore(product)}>
                            View More
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <LoanProductDetailModal
        loanProduct={selectedLoanProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <AddLoanProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
}