import { AlertTriangle, Clock, CheckCircle, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import AnimatedPage from '../../components/AnimatedPage';

const alertData = [
    { id: 'ALT-01', location: 'Bin #402, Downtown', issue: 'Bin Overflow', priority: 'High', status: 'Pending', time: '10 mins ago' },
    { id: 'ALT-02', location: 'Truck #12', issue: 'Engine Trouble', priority: 'Critical', status: 'Resolved', time: '1 hr ago' },
    { id: 'ALT-03', location: 'Bin #105, Central Park', issue: 'Toxic Gas Detected', priority: 'Critical', status: 'In Progress', time: '2 hrs ago' },
    { id: 'ALT-04', location: 'Sector 4', issue: 'Missed Pickup Report', priority: 'Medium', status: 'Pending', time: '5 hrs ago' },
];

export default function AdminAlerts() {
    const [alerts, setAlerts] = useState(alertData);

    const resolveAlert = (id) => {
        setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'Resolved' } : a));
    };

    return (
        <AnimatedPage className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Alert Management ⚠️</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Review and resolve system anomalies and citizen reports.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-wrap gap-4 items-center justify-between bg-gray-50 dark:bg-gray-800/50">
                    <div className="relative flex-1 min-w-[250px] max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search alerts..."
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Filter className="w-5 h-5" />
                        Filter
                    </button>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {alerts.map(alert => (
                        <div key={alert.id} className="p-5 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                                <div className={`p-3 rounded-full flex-shrink-0 ${alert.priority === 'Critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                                    alert.priority === 'High' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                                        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                    }`}>
                                    {alert.priority === 'Critical' ? <AlertTriangle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{alert.issue}</h3>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${alert.status === 'Resolved' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' :
                                            alert.status === 'In Progress' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' :
                                                'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                                            }`}>
                                            {alert.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">{alert.location}</p>
                                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                                        <Clock className="w-4 h-4" /> {alert.time}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {alert.status !== 'Resolved' && (
                                    <button
                                        onClick={() => resolveAlert(alert.id)}
                                        className="flex items-center gap-2 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 text-green-700 dark:text-green-400 px-4 py-2 rounded-lg font-medium transition-colors border border-green-200 dark:border-green-800/50"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        Mark Resolved
                                    </button>
                                )}
                                <button className="text-blue-600 dark:text-blue-400 font-medium px-4 py-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                    Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedPage>
    );
}