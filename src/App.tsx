import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/Not_Found';
import Progress from './pages/Progress';
import FAQ from './pages/FAQ';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Hasil from './pages/Hasil';
import MainLayout from './layouts/MainLayout';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { AuthProvider, useAuth } from './context/AuthContext';

// Komponen untuk proteksi rute
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Tampilkan indikator loading saat autentikasi diperiksa
    return <div className="flex justify-center items-center h-screen loading-bars bg-white "></div>;
  }

  return !isAuthenticated ? <Navigate to={'/login'} /> : children;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const excludeLayoutRoutes = ['/login', '/forgot-password', '/reset-password']; // Routes where Navbar and Footer should be excluded

  // Check if the current route matches the excluded routes or is not found
  const isExcludedRoute = excludeLayoutRoutes.includes(location.pathname);

  return (
    <MainLayout excludeLayout={isExcludedRoute}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <PrivateRoute>
              <Progress />
            </PrivateRoute>
          }
        />
        <Route
          path="/hasil"
          element={
            <PrivateRoute>
              <Hasil />
            </PrivateRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <PrivateRoute>
              <FAQ />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
