import { Download, FileText, Calendar as CalendarIcon, PieChart } from 'lucide-react';

export default function () {
  return (
    <AnimatedPage className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Exports 📄</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Generate and download systemic performance reports.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Weekly Summary</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 mb-6">Contains total collections, active trucks, and resolved alerts for the past 7 days.</p>
                    <button className="w-full mt-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition-colors">
                        <Download className="w-5 h-5" />
                        Download PDF
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-4">
                        <PieChart className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Analytics Report</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 mb-6">Deep dive into waste categories, heatmaps, and recycling percentages.</p>
                    <button className="w-full mt-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition-colors">
                        <Download className="w-5 h-5" />
                        Download PDF
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                        <CalendarIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Custom Date Range</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 mb-6">Select a specific date range to generate a tailored CSV export of raw system data.</p>
                    <button className="w-full mt-auto flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-2.5 rounded-xl font-medium transition-colors">
                        Configure Range
                    </button>
                </div>
            </div>

            {/* Table for recent generic reports */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mt-8">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <h2 className="font-semibold text-gray-900 dark:text-white">Recently Generated Reports</h2>
                </div>
                <div className="p-0">
                    <table className="w-full text-left text-sm">
                        <thead className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                            <tr>
                                <th className="py-4 px-6 font-medium">Report Name</th>
                                <th className="py-4 px-6 font-medium">Type</th>
                                <th className="py-4 px-6 font-medium">Generated On</th>
                                <th className="py-4 px-6 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-900 dark:text-white">
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                <td className="py-4 px-6 font-medium">October 2023 Monthly</td>
                                <td className="py-4 px-6"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">PDF</span></td>
                                <td className="py-4 px-6 text-gray-500">Nov 1, 2023, 10:00 AM</td>
                                <td className="py-4 px-6 text-right">
                                    <button className="text-blue-600 hover:text-blue-800 font-medium">Download</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                <td className="py-4 px-6 font-medium">Q3 Route Efficiency Data</td>
                                <td className="py-4 px-6"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">CSV</span></td>
                                <td className="py-4 px-6 text-gray-500">Oct 15, 2023, 2:30 PM</td>
                                <td className="py-4 px-6 text-right">
                                    <button className="text-blue-600 hover:text-blue-800 font-medium">Download</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AnimatedPage>
  );
}