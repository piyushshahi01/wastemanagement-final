
import * as Icons from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSidebar } from '../context/SidebarContext';

export default function Topbar() {
    const [isDark, setIsDark] = useState(false);
    const { setIsMobileOpen } = useSidebar();

    useEffect(() => {
        // Only apply dark mode if explicitly set by the user, default to light mode
        if (localStorage.theme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    return (
        <header className="h-16 glass-panel border-b border-white/20 dark:border-gray-800/50 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
            <div className="flex items-center gap-4 flex-1">
                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="md:hidden p-2 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                    <Icons.Menu className="w-6 h-6" />
                </button>

                {/* Search Bar - Hidden on very small screens, visible on md+ */}
                <div className="relative group hidden sm:block w-64 lg:w-80">
                    <Icons.Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search dashboard..."
                        className="pl-10 pr-4 py-2 bg-gray-100/50 dark:bg-gray-800/50 border border-transparent dark:border-gray-700/50 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:bg-white dark:focus:bg-gray-900 transition-all text-sm backdrop-blur-md"
                    />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-700/80 text-gray-500 dark:text-gray-400 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 active:scale-90"
                >
                    {isDark ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
                </button>
                <button className="p-2.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-700/80 text-gray-500 dark:text-gray-400 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5 active:scale-90 relative">
                    <Icons.Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse ring-2 ring-white dark:ring-gray-900 border-none"></span>
                </button>
                <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
                <button className="flex items-center gap-3 p-1.5 pr-4 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/50 transition-all duration-300 group hover:-translate-y-0.5 active:scale-95">
                    <div className="w-9 h-9 rounded-xl shadow-sm border border-white/50 dark:border-gray-700 overflow-hidden relative">
                        <img
                            src="https://ui-avatars.com/api/?name=User&background=22c55e&color=fff"
                            alt="Profile"
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                    </div>
                </button>
            </div>
        </header>
    );
}
