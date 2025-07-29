import { create } from 'zustand';
import { Organization, Official, Role, Group, Permission } from './types';

interface AppState {
  organizations: Organization[];
  officials: Official[];
  roles: Role[];
  groups: Group[];
  addOrganization: (org: Omit<Organization, 'id'>) => void;
  updateOrganization: (id: string, org: Partial<Organization>) => void;
  addOfficial: (official: Omit<Official, 'id'>) => void;
  addRole: (role: Omit<Role, 'id'>) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  getOrganizationById: (id: string) => Organization | undefined;
  getOfficialsByOrganization: (orgId: string) => Official[];
  getSubOrganizations: (parentId: string) => Organization[];
  getGroupsByOrganization: (orgId: string) => Group[];
  getRoleById: (id: string) => Role | undefined;
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
  { id: '1', name: 'Central Bank of Kenya', nature: 'Bank', email: 'info@cbk.go.ke', phone: '+254700123456' },
  { id: '2', name: 'Kenya Red Cross', nature: 'NGO', email: 'info@redcross.or.ke', phone: '+254700234567' },
  { id: '3', name: 'Equity Bank', nature: 'Bank', email: 'support@equitybank.co.ke', phone: '+254700345678' },
  { id: '4', name: 'Equity Microfinance', nature: 'Microfinance', email: 'info@equity-micro.co.ke', phone: '+254700456789', parentId: '3' },
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

export const useAppStore = create<AppState>((set, get) => ({
  organizations: initialOrganizations,
  officials: initialOfficials,
  roles: initialRoles,
  groups: initialGroups,

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

  getOrganizationById: (id) => get().organizations.find(org => org.id === id),

  getOfficialsByOrganization: (orgId) => get().officials.filter(official => official.organizationId === orgId),

  getSubOrganizations: (parentId) => get().organizations.filter(org => org.parentId === parentId),

  getGroupsByOrganization: (orgId) => get().groups.filter(group => group.organizationId === orgId),

  getRoleById: (id) => get().roles.find(role => role.id === id),
}));