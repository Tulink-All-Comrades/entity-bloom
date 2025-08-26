import { create } from 'zustand';
import { Organization, Official, Role, Group, Permission, OnboardingField } from './types';

interface AppState {
  organizations: Organization[];
  officials: Official[];
  roles: Role[];
  groups: Group[];
  onboardingFields: OnboardingField[];
  addOrganization: (org: Omit<Organization, 'id'>) => void;
  updateOrganization: (id: string, org: Partial<Organization>) => void;
  addOfficial: (official: Omit<Official, 'id'>) => void;
  addRole: (role: Omit<Role, 'id'>) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  addGroup: (group: Omit<Group, 'id'>) => void;
  addOnboardingField: (field: Omit<OnboardingField, 'id'>) => void;
  updateOnboardingField: (id: string, field: Partial<OnboardingField>) => void;
  deleteOnboardingField: (id: string) => void;
}

// Dummy data
const initialPermissions: Permission[] = [
  { id: '1', name: 'view dashboard', checked: false },
  { id: '2', name: 'onboard groups', checked: false },
  { id: '3', name: 'view reports', checked: false },
];

const initialRoles: Role[] = [
  { id: '1', name: 'Manager', permissions: initialPermissions.map(p => ({ ...p, checked: true })) },
  { id: '2', name: 'Officer', permissions: initialPermissions.map(p => ({ ...p, checked: p.id !== '2' })) },
  { id: '3', name: 'Clerk', permissions: [{ ...initialPermissions[0], checked: true }, ...initialPermissions.slice(1)] },
];

const initialOrganizations: Organization[] = [
  { id: '1', name: 'Central Bank of Kenya', nature: 'Bank', email: 'info@cbk.go.ke', phone: '+254700123456', primaryColor: 'hsl(221, 83%, 53%)', secondaryColor: 'hsl(221, 83%, 73%)', tertiaryColor: 'hsl(221, 83%, 93%)' },
  { id: '2', name: 'Kenya Red Cross', nature: 'NGO', email: 'info@redcross.or.ke', phone: '+254700234567', primaryColor: 'hsl(0, 84%, 60%)', secondaryColor: 'hsl(0, 84%, 80%)', tertiaryColor: 'hsl(0, 84%, 95%)' },
  { id: '3', name: 'Cooperative Organization', nature: 'Cooperative', email: 'support@cooperative.co.ke', phone: '+254700345678', primaryColor: 'hsl(142, 76%, 36%)', secondaryColor: 'hsl(142, 76%, 56%)', tertiaryColor: 'hsl(142, 76%, 86%)' },
  { id: '4', name: 'Equity Microfinance', nature: 'Microfinance', email: 'info@equity-micro.co.ke', phone: '+254700456789', parentId: '3', primaryColor: 'hsl(262, 83%, 58%)', secondaryColor: 'hsl(262, 83%, 78%)', tertiaryColor: 'hsl(262, 83%, 95%)' },
];

const initialOfficials: Official[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', phone: '+254700111111', email: 'john.doe@cbk.go.ke', roleId: '1', organizationId: '1' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', phone: '+254700222222', email: 'jane.smith@cbk.go.ke', roleId: '2', organizationId: '1' },
  { id: '3', firstName: 'Bob', lastName: 'Johnson', phone: '+254700333333', email: 'bob.johnson@redcross.or.ke', roleId: '1', organizationId: '2' },
  { id: '4', firstName: 'Alice', lastName: 'Brown', phone: '+254700444444', email: 'alice.brown@equitybank.co.ke', roleId: '1', organizationId: '3' },
];

const initialGroups: Group[] = [
  { id: '1', name: 'Savings Group A', memberCount: 25, totalLoaned: 150000, totalDeposits: 200000, totalWithdrawals: 50000, organizationId: '1' },
  { id: '2', name: 'Investment Circle B', memberCount: 18, totalLoaned: 300000, totalDeposits: 400000, totalWithdrawals: 100000, organizationId: '1' },
  { id: '3', name: 'Community Fund C', memberCount: 30, totalLoaned: 200000, totalDeposits: 350000, totalWithdrawals: 150000, organizationId: '1' },
  { id: '4', name: 'Relief Fund Alpha', memberCount: 40, totalLoaned: 500000, totalDeposits: 600000, totalWithdrawals: 100000, organizationId: '2' },
  { id: '5', name: 'Emergency Fund Beta', memberCount: 22, totalLoaned: 100000, totalDeposits: 150000, totalWithdrawals: 50000, organizationId: '2' },
  { id: '6', name: 'Development Fund Gamma', memberCount: 35, totalLoaned: 800000, totalDeposits: 1000000, totalWithdrawals: 200000, organizationId: '2' },
];

const initialOnboardingFields: OnboardingField[] = [
  // Primary Info - System Fields
  { id: '1', label: 'Group Name', fieldName: 'groupName', fieldType: 'input', dataType: 'text', isRequired: true, isSystemGenerated: true, category: 'primary' },
  { id: '2', label: 'Group Nature', fieldName: 'groupNature', fieldType: 'select', isRequired: true, isSystemGenerated: true, category: 'primary', options: [
    { id: '1', label: 'Savings', value: 'savings' },
    { id: '2', label: 'SLA', value: 'sla' },
    { id: '3', label: 'Self Help Group', value: 'self_help' }
  ]},
  { id: '3', label: 'Number of Members', fieldName: 'memberCount', fieldType: 'input', dataType: 'amount', isRequired: true, isSystemGenerated: true, category: 'primary' },
  { id: '4', label: 'Is Registered', fieldName: 'isRegistered', fieldType: 'checkbox', isRequired: true, isSystemGenerated: true, category: 'primary', options: [
    { id: '1', label: 'Yes', value: 'true' },
    { id: '2', label: 'No', value: 'false' }
  ]},
  { id: '5', label: 'Registration Number', fieldName: 'registrationNumber', fieldType: 'input', dataType: 'text', isRequired: false, isSystemGenerated: true, category: 'primary' },
  
  // Members - System Fields
  { id: '6', label: 'Member Name', fieldName: 'memberName', fieldType: 'input', dataType: 'text', isRequired: true, isSystemGenerated: true, category: 'members' },
  { id: '7', label: 'Phone Number', fieldName: 'phoneNumber', fieldType: 'input', dataType: 'text', isRequired: true, isSystemGenerated: true, category: 'members' },
  { id: '8', label: 'Email Address', fieldName: 'emailAddress', fieldType: 'input', dataType: 'text', isRequired: true, isSystemGenerated: true, category: 'members' },
  { id: '9', label: 'Role', fieldName: 'memberRole', fieldType: 'select', isRequired: true, isSystemGenerated: true, category: 'members', options: [
    { id: '1', label: 'Chairman', value: 'chairman' },
    { id: '2', label: 'Secretary', value: 'secretary' },
    { id: '3', label: 'Treasurer', value: 'treasurer' },
    { id: '4', label: 'Member', value: 'member' }
  ]},
  { id: '10', label: 'Membership Number', fieldName: 'membershipNumber', fieldType: 'input', dataType: 'text', isRequired: true, isSystemGenerated: true, category: 'members' },
  { id: '11', label: 'National ID Number', fieldName: 'nationalId', fieldType: 'input', dataType: 'text', isRequired: true, isSystemGenerated: true, category: 'members' },
  
  // Contributions - System Fields
  { id: '12', label: 'Contribution Name', fieldName: 'contributionName', fieldType: 'input', dataType: 'text', isRequired: true, isSystemGenerated: true, category: 'contributions' },
  { id: '13', label: 'Amount', fieldName: 'contributionAmount', fieldType: 'input', dataType: 'amount', isRequired: true, isSystemGenerated: true, category: 'contributions' },
  { id: '14', label: 'Type', fieldName: 'contributionType', fieldType: 'select', isRequired: true, isSystemGenerated: true, category: 'contributions', options: [
    { id: '1', label: 'Savings', value: 'savings' },
    { id: '2', label: 'Membership Fee', value: 'membership_fee' },
    { id: '3', label: 'Emergency Fund', value: 'emergency_fund' }
  ]},
  { id: '15', label: 'Nature', fieldName: 'contributionNature', fieldType: 'select', isRequired: true, isSystemGenerated: true, category: 'contributions', options: [
    { id: '1', label: 'Regular', value: 'regular' },
    { id: '2', label: 'One-time', value: 'one_time' }
  ]},
  
  // Loans - System Fields
  { id: '16', label: 'Loan Name', fieldName: 'loanName', fieldType: 'input', dataType: 'text', isRequired: true, isSystemGenerated: true, category: 'loans' },
  { id: '17', label: 'Eligibility Criteria', fieldName: 'eligibilityCriteria', fieldType: 'textarea', isRequired: true, isSystemGenerated: true, category: 'loans' },
  { id: '18', label: 'Interest Rate', fieldName: 'interestRate', fieldType: 'input', dataType: 'text', isRequired: true, isSystemGenerated: true, category: 'loans' },
  { id: '19', label: 'Guarantors Required', fieldName: 'guarantorsRequired', fieldType: 'checkbox', isRequired: true, isSystemGenerated: true, category: 'loans', options: [
    { id: '1', label: 'Yes', value: 'true' },
    { id: '2', label: 'No', value: 'false' }
  ]},
  { id: '20', label: 'Grace Period (Days)', fieldName: 'gracePeriod', fieldType: 'input', dataType: 'amount', isRequired: false, isSystemGenerated: true, category: 'loans' },
  { id: '21', label: 'Repayment Period (Months)', fieldName: 'repaymentPeriod', fieldType: 'input', dataType: 'amount', isRequired: true, isSystemGenerated: true, category: 'loans' },
  
  // Accounts - System Fields
  { id: '22', label: 'Account Name', fieldName: 'accountName', fieldType: 'input', dataType: 'text', isRequired: true, isSystemGenerated: true, category: 'accounts' },
  { id: '23', label: 'Account Type', fieldName: 'accountType', fieldType: 'select', isRequired: true, isSystemGenerated: true, category: 'accounts', options: [
    { id: '1', label: 'Bank', value: 'bank' },
    { id: '2', label: 'Sacco', value: 'sacco' },
    { id: '3', label: 'Mobile Money', value: 'mobile_money' }
  ]},
  { id: '24', label: 'Institution', fieldName: 'institution', fieldType: 'input', dataType: 'text', isRequired: true, isSystemGenerated: true, category: 'accounts' },
  { id: '25', label: 'Account Number', fieldName: 'accountNumber', fieldType: 'input', dataType: 'text', isRequired: true, isSystemGenerated: true, category: 'accounts' },
  { id: '26', label: 'Account Balance', fieldName: 'accountBalance', fieldType: 'input', dataType: 'amount', isRequired: true, isSystemGenerated: true, category: 'accounts' },
  { id: '27', label: 'Signing Mandate', fieldName: 'signingMandate', fieldType: 'textarea', isRequired: false, isSystemGenerated: true, category: 'accounts' },
];

export const useAppStore = create<AppState>((set, get) => ({
  organizations: initialOrganizations,
  officials: initialOfficials,
  roles: initialRoles,
  groups: initialGroups,
  onboardingFields: initialOnboardingFields,

  addOrganization: (org) => set((state) => ({
    organizations: [...state.organizations, { ...org, id: Date.now().toString() }]
  })),

  updateOrganization: (id, org) => set((state) => ({
    organizations: state.organizations.map(o => o.id === id ? { ...o, ...org } : o)
  })),

  addOfficial: (official) => set((state) => ({
    officials: [...state.officials, { ...official, id: Date.now().toString() }]
  })),

  addRole: (role) => set((state) => ({
    roles: [...state.roles, { ...role, id: Date.now().toString() }]
  })),

  updateRole: (id, role) => set((state) => ({
    roles: state.roles.map(r => r.id === id ? { ...r, ...role } : r)
  })),

  addGroup: (group) => set((state) => ({
    groups: [...state.groups, { ...group, id: Date.now().toString() }]
  })),

  addOnboardingField: (field) => set((state) => ({
    onboardingFields: [...state.onboardingFields, { ...field, id: Date.now().toString() }]
  })),

  updateOnboardingField: (id, field) => set((state) => ({
    onboardingFields: state.onboardingFields.map(f => f.id === id ? { ...f, ...field } : f)
  })),

  deleteOnboardingField: (id) => set((state) => ({
    onboardingFields: state.onboardingFields.filter(f => f.id !== id)
  })),
}));