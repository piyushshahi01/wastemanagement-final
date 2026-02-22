import { Battery, Thermometer, CloudFog, AlertTriangle, CheckCircle2 } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialBins = [
    { id: 'BIN-402', location: 'Downtown Market', fillLevel: 92, gasLevel: 45, temp: 32, status: 'Critical' },
    { id: 'BIN-105', location: 'Central Park West', fillLevel: 45, gasLevel: 12, temp: 28, status: 'Healthy' },
    { id: 'BIN-882', location: 'University Campus', fillLevel: 78, gasLevel: 80, temp: 35, status: 'Warning' },
    { id: 'BIN-304', location: 'Mall Avenue', fillLevel: 25, gasLevel: 10, temp: 25, status: 'Healthy' },
    { id: 'BIN-511', location: 'Hospital East Wing', fillLevel: 60, gasLevel: 25, temp: 29, status: 'Healthy' },
    { id: 'BIN-220', location: 'Tech Park Block B', fillLevel: 98, gasLevel: 55, temp: 34, status: 'Critical' },
];

export default function SmartBins() {
    const [bins, setBins] = useState(initialBins);

    useEffect(() => {
        // Simulate real-time IoT polling every 3 seconds
        const interval = setInterval(() => {
            setBins(currentBins => currentBins.map(bin => {
                // Randomly fluctuate values slightly to simulate live data
                const newFill = Math.min(100, Math.max(0, bin.fillLevel + (Math.random() > 0.5 ? 1 : -0.5))); // Mostly goes up
                const newGas = Math.max(0, bin.gasLevel + (Math.floor(Math.random() * 5) - 2));
                const newTemp = Math.max(0, bin.temp + (Math.floor(Math.random() * 3) - 1));

                // Recalculate status
                let newStatus = 'Healthy';
                if (newFill > 85 || newGas > 60 || newTemp > 45) newStatus = 'Critical';
                else if (newFill > 60 || newGas > 40 || newTemp > 35) newStatus = 'Warning';

                return { ...bin, fillLevel: parseFloat(newFill.toFixed(1)), gasLevel: newGas, temp: newTemp, status: newStatus };
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatedPage className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        Smart Bin Monitoring <span className="text-blue-500 text-3xl animate-pulse">📶</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Live IoT data from NodeMCU sensors across the city.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium text-sm border border-green-200 dark:border-green-800">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span> Live Updates Active
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bins.map(bin => {
                    const isCritical = bin.status === 'Critical';
                    const isWarning = bin.status === 'Warning';
                    const StatusIcon = isCritical || isWarning ? AlertTriangle : CheckCircle2;
                    const statusColor = isCritical ? 'text-red-500' : isWarning ? 'text-yellow-500' : 'text-green-500';
                    const borderColor = isCritical ? 'border-red-200 dark:border-red-900/50' : isWarning ? 'border-yellow-200 dark:border-yellow-900/50' : 'border-gray-100 dark:border-gray-700';
                    const bgColor = isCritical ? 'bg-red-50 dark:bg-red-900/10' : isWarning ? 'bg-yellow-50 dark:bg-yellow-900/10' : 'bg-white dark:bg-gray-800';

                    return (
                        <div key={bin.id} className={`${bgColor} rounded-2xl p-6 shadow-sm border ${borderColor} transition-all relative overflow-hidden group ${bin.fillLevel > 80 ? 'animate-heartbeat' : 'glass-card'}`}>
                            <div className="absolute top-0 right-0 p-4 z-10">
                                <StatusIcon className={`w-6 h-6 ${statusColor} ${isCritical ? 'animate-pulse' : ''}`} />
                            </div>

                            <div className="mb-4">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white font-mono">{bin.id}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate pr-8">{bin.location}</p>
                            </div>

                            <div className="space-y-4 relative z-10">
                                {/* Fill Level */}
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Fill Level</span>
                                        <motion.span
                                            key={bin.fillLevel}
                                            initial={{ scale: 1.2, color: '#3B82F6' }}
                                            animate={{ scale: 1, color: bin.fillLevel > 85 ? '#EF4444' : '' }}
                                            className={`text-sm font-bold ${bin.fillLevel > 85 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}
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
                                            className={`absolute bottom-0 w-full left-0 ${bin.fillLevel > 85 ? 'bg-red-500' : bin.fillLevel > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                        >
                                            <div className="liquid-wave opacity-50"></div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* IoT Metrics Grid */}
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                                        <CloudFog className={`w-5 h-5 ${bin.gasLevel > 60 ? 'text-red-500' : 'text-purple-500'}`} />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Harmful Gas</p>
                                            <motion.p
                                                key={bin.gasLevel}
                                                initial={{ scale: 1.1 }} animate={{ scale: 1 }}
                                                className={`font-bold text-sm ${bin.gasLevel > 60 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}
                                            >
                                                {bin.gasLevel} AQI
                                            </motion.p>
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                                        <Thermometer className="w-5 h-5 text-orange-500" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Temperature</p>
                                            <motion.p
                                                key={bin.temp}
                                                initial={{ scale: 1.1 }} animate={{ scale: 1 }}
                                                className="font-bold text-sm text-gray-900 dark:text-white"
                                            >
                                                {bin.temp}°C
                                            </motion.p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {isCritical && (
                                <button className="w-full mt-5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 font-semibold py-2 rounded-xl transition-colors text-sm">
                                    Dispatch Truck
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </AnimatedPage>
    );
}