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