import React, { useState } from 'react';
import { UserRole } from './types';
import DashboardLayout from './components/layout/DashboardLayout';
import EducatorDashboard from './components/dashboard/EducatorDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import LoginPage from './components/auth/LoginPage';
import { TooltipProvider } from '@/components/ui/tooltip';
import { StateProvider } from './context/StateContext';

export default function App() {
  const [role, setRole] = useState<UserRole>('educator');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderDashboard = () => {
    switch (role) {
      case 'admin':
        return <AdminDashboard />;
      case 'educator':
        return <EducatorDashboard />;
      default:
        return <EducatorDashboard />;
    }
  };

  if (!isLoggedIn) {
    return (
      <StateProvider>
        <LoginPage onLogin={handleLogin} />
      </StateProvider>
    );
  }

  return (
    <StateProvider>
      <TooltipProvider>
        <DashboardLayout role={role} onLogout={handleLogout}>
          {renderDashboard()}
        </DashboardLayout>
      </TooltipProvider>
    </StateProvider>
  );
}
