import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Truck, Navigation, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';

const routes = [
    {
        id: 'RT-101',
        driver: 'Michael Scott',
        status: 'Active',
        truckId: 'TRK-4A',
        progress: 45,
        stops: 24,
        completed: 11,
        eta: '45 mins',
        path: [
            [28.7041, 77.1025], [28.7050, 77.1080], [28.7100, 77.1120], [28.7150, 77.1100]
        ]
    },
    {
        id: 'RT-102',
        driver: 'Dwight Schrute',
        status: 'Delayed',
        truckId: 'TRK-2B',
        progress: 20,
        stops: 30,
        completed: 6,
        eta: '1 hr 30 mins',
        path: [
            [28.6900, 77.0900], [28.6920, 77.0950], [28.6850, 77.1000]
        ]
    }
];

export default function RoutesPage() {
    const [selectedRoute, setSelectedRoute] = useState(routes[0]);

    return (
        <AnimatedPage className="space-y-6 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Route Optimization 🚚</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">AI-optimized paths for garbage trucks to save fuel and time.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
                    <Navigation className="w-5 h-5" />
                    Re-optimize All Routes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-[500px]">
                {/* Left Sidebar */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h2 className="font-semibold text-gray-900 dark:text-white">Active Fleets</h2>
                    </div>

                    <div className="overflow-y-auto flex-1 p-2 space-y-2">
                        {routes.map(route => (
                            <div
                                key={route.id}
                                onClick={() => setSelectedRoute(route)}
                                className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedRoute.id === route.id
                                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/50'
                                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <Truck className={`w-5 h-5 ${selectedRoute.id === route.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`} />
                                        <span className="font-bold text-gray-900 dark:text-white">{route.id}</span>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 ${route.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                                        }`}>
                                        {route.status}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">Driver: {route.driver}</div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-gray-500">Progress</span>
                                        <span className="text-gray-900 dark:text-white">{route.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                        <div className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full" style={{ width: `${route.progress}%` }}></div>
                                    </div>
                                </div>

                                {route.status === 'Delayed' && (
                                    <div className="mt-3 flex items-start gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                        <span>Heavy traffic detected ahead. Route penalized by +15 mins.</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map View */}
                <div className="col-span-1 lg:col-span-3 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden relative z-0 flex flex-col">
                    <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-100 dark:border-gray-700 flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 font-medium">Currently Tracking:</span>
                            <span className="font-bold text-blue-600 dark:text-blue-400">{selectedRoute.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span className="text-gray-900 dark:text-white font-medium">{selectedRoute.completed} / {selectedRoute.stops} Stops</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-purple-500" />
                            <span className="text-gray-900 dark:text-white font-medium">ETA: {selectedRoute.eta}</span>
                        </div>
                    </div>

                    <div className="flex-1 min-h-[400px]">
                        <MapContainer center={selectedRoute.path[0]} zoom={14} className="w-full h-full min-h-[400px]">
                            <TileLayer
                                attribution='&copy; OpenStreetMap contributors'
                                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                            />
                            <Polyline
                                positions={selectedRoute.path}
                                color="#3B82F6"
                                weight={5}
                                opacity={0.8}
                                dashArray="10, 10"
                            />

                            {/* Start Point */}
                            <Marker position={selectedRoute.path[0]}>
                                <Popup>Current Location of {selectedRoute.truckId}</Popup>
                            </Marker>

                            {/* End Point */}
                            <Marker position={selectedRoute.path[selectedRoute.path.length - 1]}>
                                <Popup>Final Destination</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}