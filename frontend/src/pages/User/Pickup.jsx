import { useState } from 'react';
import { Calendar, MapPin, Truck, CheckCircle2 } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';

export default function Pickup() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        wasteType: 'General',
        address: '',
        date: '',
        time: 'Morning (8AM - 12PM)'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ wasteType: 'General', address: '', date: '', time: 'Morning (8AM - 12PM)' });
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <AnimatedPage>
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                        Schedule Waste Pickup <Truck className="w-8 h-8 text-blue-500" />
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Request a special pickup for bulky items, e-waste, or large quantities of recyclables.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {submitted ? (
                        <div className="p-12 text-center flex flex-col items-center justify-center h-full animate-in fade-in zoom-in duration-300">
                            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pickup Scheduled!</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Your request for {formData.wasteType} waste pickup has been confirmed for {formData.date}.
                            </p>
                            <p className="text-gray-500 text-sm mt-4">You will receive a notification when the truck is nearby.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Waste Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Type of Waste
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {['General', 'E-Waste', 'Furniture', 'Construction'].map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${formData.wasteType === type
                                                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-400 ring-1 ring-blue-500'
                                                : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                                                }`}
                                            onClick={() => setFormData({ ...formData, wasteType: type })}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Pickup Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        required
                                        className="pl-10 w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl py-3 px-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="123 Main St, Apartment 4B"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Preferred Date
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            required
                                            className="pl-10 w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl py-3 px-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            value={formData.date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Preferred Time Slot
                                    </label>
                                    <select
                                        name="time"
                                        required
                                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl py-3 px-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all"
                                        value={formData.time}
                                        onChange={handleChange}
                                    >
                                        <option>Morning (8AM - 12PM)</option>
                                        <option>Afternoon (12PM - 4PM)</option>
                                        <option>Evening (4PM - 8PM)</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-colors shadow-sm mt-8 flex items-center justify-center gap-2"
                            >
                                <Truck className="w-5 h-5" />
                                Schedule Pickup Now
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </AnimatedPage>
    );
}