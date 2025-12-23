import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
// import { RolesPage } from './pages/RolesPage'; // Deprecated
import { UsersPage } from './modules/iam/pages/UsersPage'; // Modular Version
import { OrganizationsPage } from './modules/organizations/pages/OrganizationsPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './modules/auth/pages/LoginPage';
import { TrashPage } from './modules/trash/pages/TrashPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { BillingPage } from './pages/BillingPage';
import { CreateInvoicePage } from './pages/CreateInvoicePage';
import { PricingPage } from './modules/subscriptions/pages/PricingPage';
import { RequireAuth } from './components/RequireAuth';
import { ThemeProvider } from './context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/*"
                        element={
                            <RequireAuth>
                                <Layout>
                                    <Routes>
                                        <Route path="/" element={<DashboardPage />} />
                                        {/* <Route path="/roles" element={<RolesPage />} /> */}
                                        <Route path="/users" element={<UsersPage />} />
                                        <Route path="/organizations" element={<OrganizationsPage />} />
                                        <Route path="/trash" element={<TrashPage />} />

                                        {/* New Functional Routes */}
                                        <Route path="/profile" element={<ProfilePage />} />
                                        <Route path="/settings/general" element={<SettingsPage />} />
                                        <Route path="/settings/billing" element={<BillingPage />} />
                                        <Route path="/settings/orgs" element={<OrganizationsPage />} />
                                        <Route path="/invoices/new" element={<CreateInvoicePage />} />
                                        <Route path="/pricing" element={<PricingPage />} />
                                    </Routes>
                                </Layout>
                            </RequireAuth>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
