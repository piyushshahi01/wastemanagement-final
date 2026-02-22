
import { AlertTriangle, Bell, Info, ShieldAlert } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';

const alerts = [
    {
        id: 1,
        type: 'critical',
        title: 'Bin Full Alert',
        message: 'Your neighborhood Smart Bin #402 is currently full. Please use Bin #405 until the pickup is complete.',
        time: '10 mins ago',
        icon: AlertTriangle,
        color: 'red'
    },
    {
        id: 2,
        type: 'warning',
        title: 'Upcoming Pickup Delay',
        message: 'Due to heavy rain, the scheduled organic waste pickup is delayed by 2 hours today.',
        time: '2 hours ago',
        icon: ShieldAlert,
        color: 'yellow'
    },
    {
        id: 3,
        type: 'info',
        title: 'New Eco Challenge',
        message: 'A new community challenge has started! Reduce plastic usage by 10% this week to earn 50 Eco Points.',
        time: '1 day ago',
        icon: Bell,
        color: 'blue'
    },
    {
        id: 4,
        type: 'success',
        title: 'Pickup Completed',
        message: 'Your requested E-Waste pickup was successfully completed. Thank you for recycling!',
        time: '3 days ago',
        icon: Info,
        color: 'green'
    }
];

export default function () {
    return (
        <AnimatedPage>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            Notifications & Alerts 🔔
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Stay updated on bin statuses, pickup schedules, and community news.
                        </p>
                    </div>
                    <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        Mark All as Read
                    </button>
                </div>

                <div className="space-y-4">
                    {alerts.map((alert) => {
                        const Icon = alert.icon;
                        const colorStyles = {
                            red: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400',
                            yellow: 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/50 text-yellow-600 dark:text-yellow-400',
                            blue: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400',
                            green: 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/50 text-green-600 dark:text-green-400'
                        };

                        return (
                            <div
                                key={alert.id}
                                className={`flex gap-4 p-5 rounded-2xl border ${alert.type === 'critical' ? 'border-red-200 dark:border-red-900 bg-white dark:bg-gray-800 shadow-sm' : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm'
                                    } transition-all hover:shadow-md cursor-pointer`}
                            >
                                <div className={`p-3 rounded-full h-fit ${colorStyles[alert.color]}`}>
                                    <Icon className="w-6 h-6" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{alert.title}</h3>
                                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{alert.time}</span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                                        {alert.message}
                                    </p>
                                    {alert.type === 'critical' && (
                                        <button className="mt-3 text-sm font-bold text-red-600 dark:text-red-400 hover:underline">
                                            View Nearest Bins
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AnimatedPage>
    );
}