import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line
} from 'recharts';
import { Share2, Trash2, Leaf, Award, TrendingDown } from 'lucide-react';
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

const weeklyData = [
    { name: 'Mon', waste: 4 },
    { name: 'Tue', waste: 3 },
    { name: 'Wed', waste: 5 },
    { name: 'Thu', waste: 2 },
    { name: 'Fri', waste: 6 },
    { name: 'Sat', waste: 3 },
    { name: 'Sun', waste: 4 },
];

export default function Dashboard() {
    return (
        <AnimatedPage>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, Eco Hero! 🌱</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Here is an overview of your weekly waste management.</p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="glass-card px-5 py-3 rounded-2xl flex items-center gap-4 border-green-400/30"
                    >
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                            <TrendingDown className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Comparison</p>
                            <p className="text-green-600 dark:text-green-400 font-bold">You reduced 10% waste this month! 🎉</p>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Cards */}
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div variants={itemVariants} className="glass-card flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Waste</p>
                            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mt-2">12 <span className="text-lg font-normal text-gray-400">kg</span></p>
                        </div>
                        <div className="w-14 h-14 bg-red-100/50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner">
                            <Trash2 className="w-7 h-7" />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="glass-card flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Carbon Footprint</p>
                            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mt-2">20 <span className="text-lg font-normal text-gray-400">kg CO₂</span></p>
                        </div>
                        <div className="w-14 h-14 bg-gray-100/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner">
                            <Share2 className="w-7 h-7" />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="p-6 rounded-2xl shadow-lg border border-green-400/30 bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-between hover:shadow-green-500/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                        {/* Glow Effect behind text */}
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/20 blur-3xl rounded-full"></div>

                        <div className="relative z-10">
                            <p className="text-sm font-medium text-green-50">Eco Score</p>
                            <p className="text-4xl font-extrabold mt-1 tracking-tight">78 <span className="text-xl font-medium text-green-100/80">pts</span></p>
                        </div>
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner relative z-10 border border-white/30">
                            <Leaf className="w-7 h-7" />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="glass-card flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Recycled Waste</p>
                            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mt-2">65 <span className="text-lg font-normal text-gray-400">%</span></p>
                        </div>
                        <div className="w-14 h-14 bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner">
                            <Award className="w-7 h-7" />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Charts Section */}
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 rounded bg-green-500"></span> Weekly Waste Generation
                        </h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weeklyData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="waste" fill="#22C55E" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="glass-panel p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 rounded bg-blue-500"></span> Carbon Footprint Trend
                        </h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={weeklyData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Line type="monotone" dataKey="waste" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Smart Suggestions Teaser */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 p-6 rounded-2xl flex items-start gap-4 hover:shadow-md transition-shadow">
                    <div className="text-2xl mt-1">💡</div>
                    <div>
                        <h3 className="font-semibold text-yellow-800 dark:text-yellow-500">Smart Suggestion for You</h3>
                        <p className="text-yellow-700 dark:text-yellow-600/80 mt-1">You generate slightly more plastic waste on Wednesdays. Switching to reusable bags could reduce your footprint by 15% next week!</p>
                    </div>
                </motion.div>
            </div>
        </AnimatedPage>
    );
}
