import { useEffect, useState } from "react";
import AnimatedPage from "../../components/AnimatedPage";
import { Battery, Thermometer, CloudFog, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SmartBins() {
    const [bins, setBins] = useState([]);

    useEffect(() => {
        const fetchBins = () => {
            fetch("http://localhost:5000/api/bins")
                .then(res => res.json())
                .then(data => setBins(data))
                .catch(err => console.error(err));
        };

        fetchBins();
        const interval = setInterval(fetchBins, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatedPage className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        Smart Bin Monitoring <span className="text-blue-500 text-3xl animate-pulse">📶</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Live IoT data from nearby Smart Dustbins.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium text-sm border border-green-200 dark:border-green-800">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span> Live Data Streams
                </div>
            </div>

            {/* Alert System */}
            <div className="space-y-2">
                {bins.filter(bin => bin.status !== "Normal").map(bin => (
                    <div key={`alert-${bin._id}`} className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-lg flex gap-2 items-center">
                        <AlertTriangle className="w-5 h-5" />
                        <div>
                            <strong>⚠️ {bin.status}</strong> at {bin.location}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bins.map(bin => {
                    const isCritical = bin.status !== 'Normal';
                    const isWarning = bin.fillLevel > 60 || bin.gasLevel > 400 || bin.temperature > 35;
                    const StatusIcon = isCritical || isWarning ? AlertTriangle : CheckCircle2;
                    const statusColor = isCritical ? 'text-red-500' : isWarning ? 'text-yellow-500' : 'text-green-500';
                    const borderColor = isCritical ? 'border-red-200 dark:border-red-900/50' : isWarning ? 'border-yellow-200 dark:border-yellow-900/50' : 'border-gray-100 dark:border-gray-700';
                    const bgColor = isCritical ? 'bg-red-50 dark:bg-red-900/10' : isWarning ? 'bg-yellow-50 dark:bg-yellow-900/10' : 'bg-white dark:bg-gray-800';

                    return (
                        <div key={bin._id} className={`${bgColor} rounded-2xl p-6 shadow-sm border ${borderColor} transition-all relative overflow-hidden group ${bin.fillLevel > 80 ? 'animate-pulse ring-4 ring-red-500/20' : 'glass-card'}`}>
                            <div className="absolute top-0 right-0 p-4 z-10">
                                <StatusIcon className={`w-6 h-6 ${statusColor} ${isCritical ? 'animate-bounce' : ''}`} />
                            </div>

                            <div className="mb-4">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white font-mono">{bin.location}</h3>
                                <p className={`text-sm mt-1 font-semibold ${statusColor}`}>{bin.status}</p>
                            </div>

                            <div className="space-y-4 relative z-10">
                                {/* Fill Level */}
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Fill Level</span>
                                        <motion.span
                                            key={bin.fillLevel}
                                            initial={{ scale: 1.2, color: '#3B82F6' }}
                                            animate={{ scale: 1, color: bin.fillLevel > 80 ? '#EF4444' : '' }}
                                            className={`text-sm font-bold ${bin.fillLevel > 80 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}
                                        >
                                            {bin.fillLevel}%
                                        </motion.span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-2xl h-16 overflow-hidden relative border border-gray-100 dark:border-gray-600 shadow-inner">
                                        {/* Background Liquid Layer */}
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${bin.fillLevel}%` }}
                                            transition={{ type: 'spring', stiffness: 50 }}
                                            className={`absolute bottom-0 w-full left-0 ${bin.fillLevel > 80 ? 'bg-red-500' : bin.fillLevel > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                        >
                                            <div className="liquid-wave opacity-50"></div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* IoT Metrics Grid */}
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                                        <CloudFog className={`w-5 h-5 ${bin.gasLevel > 500 ? 'text-red-500' : 'text-purple-500'}`} />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Harmful Gas</p>
                                            <motion.p
                                                key={bin.gasLevel}
                                                initial={{ scale: 1.1 }} animate={{ scale: 1 }}
                                                className={`font-bold text-sm ${bin.gasLevel > 500 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}
                                            >
                                                {bin.gasLevel} AQI
                                            </motion.p>
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                                        <Thermometer className={`w-5 h-5 ${bin.temperature > 40 ? 'text-red-500' : 'text-orange-500'}`} />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Temperature</p>
                                            <motion.p
                                                key={bin.temperature}
                                                initial={{ scale: 1.1 }} animate={{ scale: 1 }}
                                                className={`font-bold text-sm ${bin.temperature > 40 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}
                                            >
                                                {bin.temperature}°C
                                            </motion.p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AnimatedPage>
    );
}
