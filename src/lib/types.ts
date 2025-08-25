export interface Organization {
  id: string;
  name: string;
  nature: string;
  email: string;
  phone: string;
  parentId?: string;
  logoUrl?: string;
}

export interface Official {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  roleId: string;
  organizationId: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  checked: boolean;
}

export interface Group {
  id: string;
  name: string;
  memberCount: number;
  totalLoaned: number;
  totalDeposits: number;
  totalWithdrawals: number;
  organizationId: string;
}

export interface FieldOption {
  id: string;
  label: string;
  value: string;
}

export interface OnboardingField {
  id: string;
  label: string;
  fieldName: string;
  fieldType: 'input' | 'select' | 'textarea' | 'checkbox';
  dataType?: 'text' | 'amount';
  isRequired: boolean;
  isSystemGenerated: boolean;
  category: 'primary' | 'members' | 'contributions' | 'loans' | 'accounts';
  options?: FieldOption[];
}

export interface LoanProduct {
  id: string;
  name: string;
  productType: 'group' | 'sacco' | 'individual';
  interestType: 'fixed' | 'reducing';
  interestRate: number;
  interestChargeable: 'per month' | 'per week' | 'per day';
  lockingSaving: boolean;
  minimumSavingsAmount?: number;
  organizationId: string;
  parentId?: string;
}

export interface LoanProductFee {
  id: string;
  loanProductId: string;
  feeType: 'insurance' | 'processing' | 'application';
  isEnabled: boolean;
  chargeableType?: 'fixed' | 'percentage';
  amount?: number;
  percentage?: number;
}

export interface LoanProductFine {
  id: string;
  loanProductId: string;
  fineTypes: ('late_installments' | 'outstanding_balance')[];
  chargeableType: 'fixed' | 'percentage';
  amount?: number;
  percentage?: number;
  chargeableFrequency: 'per day' | 'per week' | 'per month';
}

export interface LoanProductDocument {
  id: string;
  loanProductId: string;
  documentType: string;
  allowedTypes: string[];
}

export interface LoanApplication {
  id: string;
  loanProductId: string;
  loanProductName: string;
  loanProductType: 'group' | 'sacco' | 'individual';
  beneficiaryId: string;
  beneficiaryName: string;
  beneficiaryContact: string;
  amount: number;
  status: 'pending_approval' | 'approved' | 'declined' | 'disbursed';
  organizationId: string;
  createdAt: string;
}