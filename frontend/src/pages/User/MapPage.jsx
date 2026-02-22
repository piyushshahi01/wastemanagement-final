import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Filter } from 'lucide-react';
import L from 'leaflet';
import AnimatedPage from '../../components/AnimatedPage';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const centers = [
    { id: 1, name: 'Central Plastic Recycling', type: 'Plastic', lat: 28.7041, lng: 77.1025, status: 'Open' },
    { id: 2, name: 'Green Earth Organic Compost', type: 'Organic', lat: 28.7100, lng: 77.1200, status: 'Open' },
    { id: 3, name: 'Tech E-Waste Facility', type: 'E-Waste', lat: 28.6900, lng: 77.0900, status: 'Closed' },
    { id: 4, name: 'City Center Paper Plant', type: 'Paper', lat: 28.7200, lng: 77.1100, status: 'Open' },
];

export default function MapPage() {
    const [filter, setFilter] = useState('All');

    const filteredCenters = filter === 'All'
        ? centers
        : centers.filter(c => c.type === filter);

    return (
        <AnimatedPage className="space-y-6 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recycling Centers 🗺️</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Find the nearest drop-off points for your sorted waste.</p>
                </div>

                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <Filter className="w-5 h-5 text-gray-400 ml-2" />
                    <select
                        className="bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-700 dark:text-gray-200 py-1"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Types</option>
                        <option value="Plastic">Plastic</option>
                        <option value="Organic">Organic</option>
                        <option value="E-Waste">E-Waste</option>
                        <option value="Paper">Paper</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-[500px]">
                {/* Map View */}
                <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden relative z-0">
                    <MapContainer center={[28.7041, 77.1025]} zoom={13} className="w-full h-full min-h-[400px]">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {filteredCenters.map(center => (
                            <Marker key={center.id} position={[center.lat, center.lng]}>
                                <Popup>
                                    <div className="p-1">
                                        <h3 className="font-semibold">{center.name}</h3>
                                        <p className="text-sm text-gray-600 mt-1">Type: {center.type}</p>
                                        <p className={`text-sm font-medium mt-1 ${center.status === 'Open' ? 'text-green-600' : 'text-red-500'}`}>
                                            {center.status}
                                        </p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                {/* Sidebar List */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 overflow-y-auto max-h-[600px] flex flex-col gap-3">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-2">Nearest Centers</h2>
                    {filteredCenters.map(center => (
                        <div key={center.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer border border-gray-100 dark:border-gray-600">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-blue-500" />
                                    <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1">{center.name}</h3>
                                </div>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-xs">
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-md font-medium">
                                    {center.type}
                                </span>
                                <span className={center.status === 'Open' ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
                                    {center.status}
                                </span>
                            </div>
                        </div>
                    ))}
                    {filteredCenters.length === 0 && (
                        <div className="text-center text-gray-500 dark:text-gray-400 py-8 text-sm">
                            No centers found for this type.
                        </div>
                    )}
                </div>
            </div>
        </AnimatedPage>
    );
}