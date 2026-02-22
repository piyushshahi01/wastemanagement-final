import { AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const adminLinks = [
    { name: 'Overview', path: '/admin/dashboard', icon: 'Activity' },
    { name: 'Recycling Centers', path: '/admin/centers', icon: 'MapPin' },
    { name: 'Waste Heatmap', path: '/admin/heatmap', icon: 'Layers' },
    { name: 'Smart Bins (IoT)', path: '/admin/bins', icon: 'Settings' },
    { name: 'Route Optimization', path: '/admin/routes', icon: 'Navigation' },
    { name: 'Alert Management', path: '/admin/alerts', icon: 'AlertTriangle' },
    { name: 'Reports', path: '/admin/reports', icon: 'FileText' },
];

export default function AdminLayout() {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Sidebar title="Admin Panel" links={adminLinks} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-y-auto p-6 relative">
                    <AnimatePresence mode="wait">
                        <Outlet key={location.pathname} />
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
