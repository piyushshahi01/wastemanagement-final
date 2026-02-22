import { AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const userLinks = [
    { name: 'Dashboard', path: '/user/dashboard', icon: 'Home' },
    { name: 'Analytics', path: '/user/analytics', icon: 'BarChart2' },
    { name: 'Map', path: '/user/map', icon: 'Map' },
    { name: 'AI Detection', path: '/user/ai-detection', icon: 'Camera' },
    { name: 'Suggestions', path: '/user/suggestions', icon: 'Lightbulb' },
    { name: 'Waste Pickup', path: '/user/pickup', icon: 'Truck' },
    { name: 'Alerts', path: '/user/alerts', icon: 'Bell' },
    { name: 'Profile / Eco Score', path: '/user/profile', icon: 'Award' },
];

export default function UserLayout() {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Sidebar title="Citizen Panel" links={userLinks} />
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
