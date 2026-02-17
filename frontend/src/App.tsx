import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { DashboardSettingsProvider } from './contexts/DashboardSettingsContext';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import UserLayout from './components/layout/UserLayout';

// Public Pages
import Home from './components/pages/Home';
import Projects from './components/pages/Projects';
import Services from './components/pages/Services';
import Volunteers from './components/pages/Volunteers';
import SignIn from './components/pages/Auth/SignIn';
import SignUp from './components/pages/Auth/SignUp';
import AdminSignIn from './components/pages/admin/AdminSignIn';
import Suggest from './components/pages/Suggest';
import About from './components/pages/About';
import WaterSupplyRequestPage from './components/pages/WaterSupplyRequestPage';

// User Pages
import UserMain from './components/pages/user/Main';
import UserTasks from './components/pages/user/Task';
import UserSettings from './components/pages/user/Setting';
import PersonalInfo from './components/pages/user/PersonalInfo';

// Admin Pages
import AdminMain from './components/pages/admin/main';
import VolunteerRequests from './components/pages/admin/VolunteerRequests';
import VolunteerManagement from './components/pages/admin/VolunteerManagement';
import AddProjectPage from './components/pages/admin/AddProject';

function AdminRoutesLayout() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

function AppContent() {
  return (
    <Routes>
      {/* Route Audit
          / => ./components/pages/Home.tsx (OK)
          /projects => ./components/pages/Projects.tsx (OK)
          /services => ./components/pages/Services.tsx (OK)
          /services/water-supply => ./components/pages/WaterSupplyRequestPage.tsx (OK)
          /volunteers => ./components/pages/Volunteers.tsx (OK)
          /signin => ./components/pages/Auth/SignIn.tsx (OK)
          /signup => ./components/pages/Auth/SignUp.tsx (OK)
          /admin/signin => ./components/pages/admin/AdminSignIn.tsx (OK)
          /suggest => ./components/pages/Suggest.tsx (OK)
          /about => ./components/pages/About.tsx (OK)
          /user/main => ./components/pages/user/Main.tsx (OK)
          /user/tasks => ./components/pages/user/Task.tsx (OK)
          /user/settings => ./components/pages/user/Setting.tsx (Placeholder: redirects to /user/main with coming-soon toast)
          /user/personal-info => ./components/pages/user/PersonalInfo.tsx (OK)
          /admin + /admin/dashboard => ./components/pages/admin/main.tsx (OK)
          /admin/requests => ./components/pages/admin/VolunteerRequests.tsx (Needs work: currently mock data)
          /admin/management => ./components/pages/admin/VolunteerManagement.tsx (OK)
          /admin/tasks => ./components/pages/admin/AddProject.tsx (OK)
          /Admin, /Admin/tasks, /Admin/requests, /Admin/management => redirects to lowercase /admin paths (OK)
      */}

      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/water-supply" element={<WaterSupplyRequestPage />} />
        <Route path="/volunteers" element={<Volunteers />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route path="/suggest" element={<Suggest />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* User Layout */}
      <Route path="/user" element={<UserLayout />}>
        <Route path="main" element={<UserMain />} />
        <Route path="tasks" element={<UserTasks />} />
        <Route path="settings" element={<UserSettings />} />
        <Route path="personal-info" element={<PersonalInfo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Admin Layout */}
      <Route path="/admin" element={<AdminRoutesLayout />}>
        <Route index element={<AdminMain />} />
        <Route path="dashboard" element={<AdminMain />} />
        <Route path="requests" element={<VolunteerRequests />} />
        <Route path="management" element={<VolunteerManagement />} />
        <Route path="tasks" element={<AddProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Legacy uppercase Admin links */}
      <Route path="/Admin" element={<Navigate to="/admin" replace />} />
      <Route path="/Admin/tasks" element={<Navigate to="/admin/tasks" replace />} />
      <Route path="/Admin/requests" element={<Navigate to="/admin/requests" replace />} />
      <Route path="/Admin/management" element={<Navigate to="/admin/management" replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


export default function App() {
  return (
    <DashboardSettingsProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <AppContent />
          </Router>
        </ToastProvider>
      </AuthProvider>
    </DashboardSettingsProvider>
  );
}
