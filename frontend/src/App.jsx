import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import { SidebarProvider } from './context/SidebarContext';
import Landing from './pages/Landing';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// User Pages
import UserDashboard from './pages/User/Dashboard';
import Analytics from './pages/User/Analytics';
import MapPage from './pages/User/MapPage';
import AIDetection from './pages/User/AIDetection';
import Suggestions from './pages/User/Suggestions';
import Pickup from './pages/User/Pickup';
import Alerts from './pages/User/Alerts';
import Profile from './pages/User/Profile';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import ManageCenters from './pages/Admin/ManageCenters';
import Heatmap from './pages/Admin/Heatmap';
import SmartBins from './pages/Admin/SmartBins';
import RoutesPage from './pages/Admin/RoutesPage';
import AdminAlerts from './pages/Admin/Alerts';
import Reports from './pages/Admin/Reports';

import { useEffect } from 'react';

function App() {
  // Global Mouse Tracker for proximity glows
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="bg-animation"></div>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Hero Landing Page */}
            <Route path="/" element={<Landing />} />

            {/* User Routes */}
            <Route path="/user" element={<UserLayout />}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="map" element={<MapPage />} />
              <Route path="ai-detection" element={<AIDetection />} />
              <Route path="suggestions" element={<Suggestions />} />
              <Route path="pickup" element={<Pickup />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="centers" element={<ManageCenters />} />
              <Route path="heatmap" element={<Heatmap />} />
              <Route path="bins" element={<SmartBins />} />
              <Route path="routes" element={<RoutesPage />} />
              <Route path="alerts" element={<AdminAlerts />} />
              <Route path="reports" element={<Reports />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </>
  );
}

export default App;
