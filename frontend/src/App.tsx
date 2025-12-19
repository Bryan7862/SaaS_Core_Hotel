import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
// import { RolesPage } from './pages/RolesPage'; // Deprecated
import { UsersPage } from './modules/iam/pages/UsersPage'; // Modular Version
import { OrganizationsPage } from './modules/organizations/pages/OrganizationsPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './modules/auth/pages/LoginPage';
import { TrashPage } from './modules/trash/pages/TrashPage';

import { RequireAuth } from './components/RequireAuth';

function App() {
    return (
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
                                </Routes>
                            </Layout>
                        </RequireAuth>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
