import { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, Search } from 'lucide-react';

const initialCenters = [
    { id: 1, name: 'Central Plastic Recycling', type: 'Plastic', lat: '28.7041', lng: '77.1025', status: 'Active' },
    { id: 2, name: 'Green Earth Organic Compost', type: 'Organic', lat: '28.7100', lng: '77.1200', status: 'Active' },
    { id: 3, name: 'Tech E-Waste Facility', type: 'E-Waste', lat: '28.6900', lng: '77.0900', status: 'Maintenance' },
    { id: 4, name: 'City Center Paper Plant', type: 'Paper', lat: '28.7200', lng: '77.1100', status: 'Active' },
];

import AnimatedPage from '../../components/AnimatedPage';

export default function ManageCenters() {
    const [centers, setCenters] = useState(initialCenters);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCenters = centers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AnimatedPage className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Recycling Centers 🏢</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Add, update, or remove recycling facilities from the network.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm whitespace-nowrap">
                    <Plus className="w-5 h-5" />
                    Add New Center
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search centers by name or type..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-gray-700">
                            <tr>
                                <th className="font-semibold py-4 px-6">Name</th>
                                <th className="font-semibold py-4 px-6">Type</th>
                                <th className="font-semibold py-4 px-6">Location (Lat, Lng)</th>
                                <th className="font-semibold py-4 px-6">Status</th>
                                <th className="font-semibold py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredCenters.map(center => (
                                <tr key={center.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="font-medium text-gray-900 dark:text-white flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            {center.name}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                                            {center.type}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400 font-mono text-sm">
                                        {center.lat}, {center.lng}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 w-fit ${center.status === 'Active'
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${center.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                            {center.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredCenters.length === 0 && (
                        <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                            No recycling centers found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </AnimatedPage>
    );
}