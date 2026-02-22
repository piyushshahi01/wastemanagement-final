import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';
import { Users, Trash2, MapPin, AlertTriangle } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const collectionData = [
    { name: 'Mon', amount: 1200 },
    { name: 'Tue', amount: 1350 },
    { name: 'Wed', amount: 1100 },
    { name: 'Thu', amount: 1500 },
    { name: 'Fri', amount: 1800 },
    { name: 'Sat', amount: 2100 },
    { name: 'Sun', amount: 1900 },
];

export default function Dashboard() {
    return (
        <AnimatedPage className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Overview 📊</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">System-wide metrics and smart city performance.</p>
            </div>

            <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div variants={itemVariants} className="glass-card flex items-center justify-between p-6">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                        <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mt-2">12,450</p>
                    </div>
                    <div className="w-14 h-14 bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner">
                        <Users className="w-7 h-7" />
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="glass-card flex items-center justify-between p-6">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Waste (Week)</p>
                        <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mt-2">10.9 <span className="text-lg font-normal text-gray-400">Tons</span></p>
                    </div>
                    <div className="w-14 h-14 bg-purple-100/50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner">
                        <Trash2 className="w-7 h-7" />
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="glass-card flex items-center justify-between p-6">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Smart Bins</p>
                        <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mt-2">342<span className="text-lg font-normal text-gray-400">/350</span></p>
                    </div>
                    <div className="w-14 h-14 bg-green-100/50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner">
                        <MapPin className="w-7 h-7" />
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="glass-card flex items-center justify-between p-6 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-400/10 dark:bg-red-500/10 transition-colors group-hover:bg-red-400/20 dark:group-hover:bg-red-500/20 backdrop-blur-xl"></div>
                    <div className="relative z-10 w-full flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-red-600 dark:text-red-400">Active Alerts</p>
                            <p className="text-4xl font-extrabold text-red-700 dark:text-red-300 mt-1 tracking-tight">14</p>
                        </div>
                        <div className="w-14 h-14 bg-red-100/80 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center shadow-inner border border-red-200/50 dark:border-red-800/50 ring-4 ring-red-50 dark:ring-red-950">
                            <AlertTriangle className="w-7 h-7 animate-pulse" />
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl lg:col-span-2 hover:shadow-xl transition-all duration-300">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 rounded bg-green-500"></span> Daily Waste Collection (kg)
                    </h2>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={collectionData}>
                                <defs>
                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="amount" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 rounded bg-yellow-500"></span> Recent Alerts
                    </h2>
                    <div className="space-y-4">
                        {[
                            { id: 1, title: 'Bin #402 Full', time: '10 mins ago', type: 'critical' },
                            { id: 2, title: 'Truck #12 Delayed', time: '1 hour ago', type: 'warning' },
                            { id: 3, title: 'High Gas Level: Bin #105', time: '2 hours ago', type: 'critical' },
                            { id: 4, title: 'User Report: Fly Dumping', time: '5 hours ago', type: 'warning' },
                        ].map(alert => (
                            <div key={alert.id} className="flex justify-between items-start border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                                <div>
                                    <h4 className={`font-medium text-sm ${alert.type === 'critical' ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                                        {alert.title}
                                    </h4>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</span>
                                </div>
                                <button className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                                    Resolve
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors">
                        View All Alerts &rarr;
                    </button>
                </motion.div>
            </motion.div>
        </AnimatedPage>
    );
}