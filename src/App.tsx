import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/Not_Found';
import Progress from './pages/Progress';
import FAQ from './pages/FAQ';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Hasil from './pages/Hasil';
import MainLayout from './layouts/MainLayout';
import ForgotPassword from './pages/ForgotPassword';

const AppContent: React.FC = () => {
  const location = useLocation();
  const excludeLayoutRoutes = ['/login']; // Routes where Navbar and Footer should be excluded

  // Check if the current route matches the excluded routes or is not found
  const isExcludedRoute = excludeLayoutRoutes.includes(location.pathname) || !['/', '/progress', '/hasil', '/faq', '/profile'].includes(location.pathname);

  return (
    <MainLayout excludeLayout={isExcludedRoute}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/hasil" element={<Hasil />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
