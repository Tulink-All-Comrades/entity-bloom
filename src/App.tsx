import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { OrgLayout } from "./components/OrgLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations";
import OrganizationDetail from "./pages/OrganizationDetail";
import Login from "./pages/Login";
import OrgSelect from "./pages/OrgSelect";
import OrgDashboard from "./pages/OrgDashboard";
import OrgSubOrganizations from "./pages/OrgSubOrganizations";
import OrgGroups from "./pages/OrgGroups";
import GroupDetail from "./pages/GroupDetail";
import OnboardingFields from "./pages/OnboardingFields";
import NotFound from "./pages/NotFound";
import { LoanProducts } from "./pages/LoanProducts";
import { LoanApplications } from "./pages/LoanApplications";
import { FeesReport } from "./pages/reports/FeesReport";
import { LoanProductDetail } from "./pages/LoanProductDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/org/select" element={<OrgSelect />} />
          
          {/* Super Admin Routes */}
          <Route path="/admin/*" element={
            <Layout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="organizations" element={<Organizations />} />
                <Route path="organizations/:id" element={<OrganizationDetail />} />
              </Routes>
            </Layout>
          } />
          
          {/* Organization Routes */}
          <Route path="/org/*" element={
            <OrgLayout>
              <Routes>
                <Route path="dashboard" element={<OrgDashboard />} />
                <Route path="sub-organizations" element={<OrgSubOrganizations />} />
                <Route path="sub-organizations/:id" element={<OrganizationDetail />} />
                <Route path="groups" element={<OrgGroups />} />
                <Route path="groups/:id" element={<GroupDetail />} />
                <Route path="onboarding-fields" element={<OnboardingFields />} />
                <Route path="loan-products" element={<LoanProducts />} />
                <Route path="loan-products/:id" element={<LoanProductDetail />} />
                <Route path="loan-applications" element={<LoanApplications />} />
                <Route path="reports/fees" element={<FeesReport />} />
              </Routes>
            </OrgLayout>
          } />
          
          {/* Redirect root to login */}
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
