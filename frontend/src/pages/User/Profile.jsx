import { Award, Leaf, Star, Shield, TrendingUp, Lock } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile() {
    const [selectedBadge, setSelectedBadge] = useState(null);

    const badges = [
        { id: 1, name: 'Recycling Champion', icon: Leaf, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30', unlocked: true, desc: "Recycled over 100kg of waste." },
        { id: 2, name: 'Low Waste User', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30', unlocked: true, desc: "Generated less than 10kg of waste for 3 consecutive weeks." },
        { id: 3, name: 'Compost Master', icon: Leaf, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30', unlocked: true, desc: "Successfully maintained a compost bin for 6 months." },
        { id: 4, name: 'E-Waste Saver', icon: Shield, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30', unlocked: false, desc: "Drop off 5 electronic devices at a certified center." },
        { id: 5, name: 'Community Leader', icon: Award, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', unlocked: false, desc: "Invite 10 friends to the platform." },
    ];

    return (
        <AnimatedPage className="max-w-5xl mx-auto space-y-8">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/4 animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <motion.div whileHover={{ scale: 1.05 }} className="w-32 h-32 bg-white rounded-full p-1 shadow-2xl cursor-pointer">
                        <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center text-4xl text-green-600 font-bold overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                    </motion.div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-4xl font-bold mb-2">Alex Johnson</h1>
                        <p className="text-green-100 text-lg mb-4">Joined January 2024</p>

                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            <span className="bg-white/20 px-4 py-2 rounded-full font-medium flex items-center gap-2 backdrop-blur-sm shadow-sm">
                                <Shield className="w-5 h-5 text-blue-200 fill-blue-200" /> Eco Hero Level 4
                            </span>
                            <span className="bg-white/20 px-4 py-2 rounded-full font-medium flex items-center gap-2 backdrop-blur-sm shadow-sm">
                                <Leaf className="w-5 h-5 text-yellow-300 fill-yellow-300" /> 1,240 Eco Points
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Badges / Achievements */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Award className="w-6 h-6 text-yellow-500" />
                                Badges System & Achievements
                            </h2>
                            <span className="text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
                                3 / 5 Unlocked
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {badges.map((badge) => {
                                const Icon = badge.icon;
                                const isSelected = selectedBadge === badge.id;
                                return (
                                    <motion.div
                                        key={badge.id}
                                        onClick={() => setSelectedBadge(isSelected ? null : badge.id)}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex flex-col items-center text-center p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${isSelected ? 'border-green-500 bg-green-50/50 dark:bg-green-900/20 shadow-lg' : 'border-gray-100 dark:border-gray-700 glass-card hover:bg-white/50 dark:hover:bg-gray-700/50'}`}
                                    >
                                        {!badge.unlocked && (
                                            <div className="absolute inset-0 bg-gray-100/60 dark:bg-gray-900/70 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center">
                                                <Lock className="w-6 h-6 text-gray-500 dark:text-gray-400 mb-1" />
                                            </div>
                                        )}
                                        <div className={`w-14 h-14 ${badge.bg} rounded-full flex items-center justify-center mb-3 shadow-inner ${badge.unlocked ? 'shadow-[0_0_15px_rgba(34,197,94,0.3)]' : ''}`}>
                                            <Icon className={`w-7 h-7 ${badge.color}`} />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 z-0">{badge.name}</span>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <AnimatePresence>
                            {selectedBadge && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    className="bg-gray-50 dark:bg-gray-800/80 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center overflow-hidden"
                                >
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {badges.find(b => b.id === selectedBadge).desc}
                                    </p>
                                    {!badges.find(b => b.id === selectedBadge).unlocked && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">Keep up the good work to unlock this badge!</p>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                            <TrendingUp className="w-6 h-6 text-blue-500" />
                            Recent Activity
                        </h2>

                        <div className="space-y-4">
                            {[
                                { title: 'Recycled 4kg of Plastic', date: 'Yesterday at 4:30 PM', points: '+20' },
                                { title: 'Completed Profile Setup', date: '3 days ago', points: '+50' },
                                { title: 'Reported a full bin', date: 'Last Week', points: '+10' },
                            ].map((log, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                                    <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white">{log.title}</h4>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{log.date}</span>
                                    </div>
                                    <span className="font-bold text-green-600 dark:text-green-400">{log.points} pts</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar / Leaderboard */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Local Leaderboard 🏆</h2>

                        <div className="space-y-4">
                            {[
                                { pos: 1, name: 'Sarah M.', score: '2,450' },
                                { pos: 2, name: 'Alex J. (You)', score: '1,240', isYou: true },
                                { pos: 3, name: 'Mike T.', score: '1,100' },
                                { pos: 4, name: 'Emily R.', score: '950' },
                            ].map((user) => (
                                <div key={user.pos} className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${user.isYou ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono text-sm ${user.pos === 1 ? 'bg-yellow-200 text-yellow-700' :
                                        user.pos === 2 ? 'bg-gray-200 text-gray-700' :
                                            user.pos === 3 ? 'bg-amber-200 text-amber-800' :
                                                'bg-gray-100 text-gray-400'
                                        }`}>
                                        #{user.pos}
                                    </div>
                                    <div className="flex-1 font-medium text-gray-900 dark:text-white">
                                        {user.name}
                                    </div>
                                    <div className="font-bold text-gray-600 dark:text-gray-300">
                                        {user.score}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center shadow-md">
                        <h3 className="font-bold text-lg mb-2">Invite Friends</h3>
                        <p className="text-blue-100 text-sm mb-4">Earn 100 Eco Points for every friend who joins and recycles!</p>
                        <button className="bg-white text-blue-600 font-bold py-2 w-full rounded-xl hover:bg-gray-50 transition-colors">
                            Share Invite Link
                        </button>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}