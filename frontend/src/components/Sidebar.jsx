import { NavLink } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';

export default function Sidebar({ title, links }) {
    const { isMobileOpen, setIsMobileOpen } = useSidebar();
    return (
        <>
            {/* Mobile Backdrop */}
            {isMobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                ></div>
            )}

            {/* Sidebar Container */}
            <div className={`fixed inset-y-0 left-0 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-72 md:w-64 glass-panel border-r border-white/20 dark:border-gray-800/50 flex flex-col h-full shadow-2xl md:shadow-sm z-50`}>
                <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
                    <h2 className="text-2xl font-extrabold flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-300">
                        <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 rounded-xl shadow-lg shadow-green-500/30">
                            <Icons.Leaf className="w-6 h-6 text-white" />
                        </div>
                        {title}
                    </h2>
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <Icons.X className="w-5 h-5" />
                    </button>
                </div>
                <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto">
                    {links.map((link) => {
                        const IconComponent = Icons[link.icon] || Icons.Circle;
                        return (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMobileOpen(false)} // Close on navigation in mobile
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden active:scale-95 ${isActive
                                        ? 'bg-green-50/80 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-semibold shadow-[0_4px_20px_-4px_rgba(34,197,94,0.3)] dark:shadow-[0_4px_20px_-4px_rgba(34,197,94,0.15)] hover:bg-green-100/80 dark:hover:bg-green-900/40'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/30 hover:text-gray-900 dark:hover:text-gray-200 hover:-translate-y-0.5'
                                    }`
                                }
                            >
                                <IconComponent className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110`} />
                                <span className="relative z-10">{link.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>
                {/* Switch Panel Link */}
                <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <NavLink
                        to={title === 'Admin Panel' ? '/user/dashboard' : '/admin/dashboard'}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/30 hover:-translate-y-0.5 active:scale-95"
                    >
                        <Icons.SwitchCamera className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                        <span className="font-medium">Switch to {title === 'Admin Panel' ? 'User' : 'Admin'}</span>
                    </NavLink>
                </div>
            </div>
        </>
    );
}
