import { Lightbulb, ArrowRight, Zap, Target, Recycle, RefreshCw } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const allSuggestions = [
    { id: 1, title: "Switch to Reusable Bags", description: "You generate high plastic waste. Switching to reusable cloth bags can reduce your plastic footprint by 15% this month.", icon: Recycle, color: "blue", impact: "High Impact" },
    { id: 2, title: "Start Composting Food", description: "Your organic waste has increased. A small home compost bin can turn this into fertilizer instead of landfill waste.", icon: LeafIcon, color: "green", impact: "Medium Impact" },
    { id: 3, title: "E-Waste Collection Drive", description: "You haven't recycled any e-waste lately. There is a special drop-off point opening nearby this weekend!", icon: Zap, color: "yellow", impact: "Action Required" },
    { id: 4, title: "Ditch Single-Use Coffee Cups", description: "Bringing your own thermos saves an average of 23 lbs of waste per year. Local cafes often offer a discount for this!", icon: Lightbulb, color: "yellow", impact: "Easy Win" },
    { id: 5, title: "Bulk Buying Dry Goods", description: "Purchasing rice, pasta, and beans from bulk bins using your own jars eliminates 100% of the packaging waste.", icon: Target, color: "blue", impact: "High Impact" },
    { id: 6, title: "Recycle Soft Plastics", description: "Did you know bread bags and bubble wrap can be returned to grocery stores? Start a dedicated soft-plastic bin.", icon: Recycle, color: "green", impact: "Medium Impact" },
];

function LeafIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M11 20A7 7 0 0 1 14 6h7v7a7 7 0 0 1-7 7h-3Z" />
            <path d="M14 6v6a3 3 0 0 1-3 3h-4" />
        </svg>
    );
}

export default function Suggestions() {
    const [displayedTips, setDisplayedTips] = useState(allSuggestions.slice(0, 3));
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [goalProgress, setGoalProgress] = useState(80);

    const generateNewTips = () => {
        setIsRefreshing(true);
        // Randomly select 3 new tips
        setTimeout(() => {
            const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
            setDisplayedTips(shuffled.slice(0, 3));
            setGoalProgress(prev => Math.min(100, prev + 2)); // Increment goal progress slightly just for fun
            setIsRefreshing(false);
        }, 600);
    };

    return (
        <AnimatedPage>
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            Smart Suggestions <Lightbulb className="w-8 h-8 text-yellow-500 fill-yellow-500/20" />
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
                            Personalized AI-driven recommendations based on your waste gen.
                        </p>
                    </div>
                    <button
                        onClick={generateNewTips}
                        disabled={isRefreshing}
                        className="glass-card flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                        {isRefreshing ? 'AI Analyzing...' : 'Generate New Tips'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {displayedTips.map((sugg) => {
                            const IconComponent = sugg.icon;
                            const colorStyles = {
                                blue: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400',
                                green: 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/50 text-green-600 dark:text-green-400',
                                yellow: 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/50 text-yellow-600 dark:text-yellow-400'
                            };

                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    key={sugg.id}
                                    className="glass-card rounded-2xl p-6 flex flex-col h-full group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-gray-700/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>

                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 rounded-xl ${colorStyles[sugg.color]} border`}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300`}>
                                            {sugg.impact}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{sugg.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 flex-1">{sugg.description}</p>

                                    <button className="mt-6 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors group/btn">
                                        Learn how <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </button>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Progress to next goal */}
                <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                            <Target className="w-6 h-6 text-indigo-500" />
                            Monthly Goal Progress
                        </h2>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">10% Reduction</span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">You are currently reducing your waste at a steady rate this month. Just a little more effort to hit your 10% goal!</p>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${goalProgress}%` }}
                            transition={{ type: "spring", stiffness: 50 }}
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full"
                        />
                    </div>
                    <p className="text-right text-sm text-gray-500 dark:text-gray-400 font-medium">{goalProgress}% reached</p>
                </div>
            </div>
        </AnimatedPage>
    );
}