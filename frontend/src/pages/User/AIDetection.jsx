import { useState } from 'react';
import { Upload, Camera, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIDetection() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (selectedFile) => {
        setFile(URL.createObjectURL(selectedFile));
        setResult(null);
        setAnalyzing(true);

        // Mock API call
        setTimeout(() => {
            setAnalyzing(false);
            setResult({
                type: 'Plastic Bottle',
                category: 'Recyclable Plastic',
                confidence: 96,
                suggestion: 'Please rinse and crush before placing in the blue recycling bin.'
            });
        }, 2000);
    };

    return (
        <AnimatedPage>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Waste Detection 🤖</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
                        Not sure how to dispose of an item? Upload a photo and our AI will tell you exactly what it is and how to recycle it.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Upload Area */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <form
                            className={`relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-xl transition-colors ${dragActive ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                                onChange={handleChange}
                            />

                            {file ? (
                                <div className="relative w-full h-full p-2 overflow-hidden rounded-lg group">
                                    <img src={file} alt="Preview" className="w-full h-full object-contain rounded-lg transition-transform duration-700 group-hover:scale-105" />

                                    {/* Scanning Laser Animation */}
                                    <AnimatePresence>
                                        {analyzing && (
                                            <motion.div
                                                initial={{ top: '0%' }}
                                                animate={{ top: ['0%', '100%', '0%'] }}
                                                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                                                className="absolute left-0 w-full h-1 bg-green-500 shadow-[0_0_20px_4px_rgba(34,197,94,0.6)] z-10"
                                            />
                                        )}
                                    </AnimatePresence>

                                    {/* Scanning Overlay */}
                                    <AnimatePresence>
                                        {analyzing && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 0.3 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 bg-green-500 mix-blend-overlay z-0"
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                                        <Upload className="w-8 h-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold text-green-600 dark:text-green-400">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                            )}
                        </form>

                        <div className="mt-4 flex justify-center gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors font-medium">
                                <Camera className="w-4 h-4" />
                                Take Photo
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors font-medium">
                                <ImageIcon className="w-4 h-4" />
                                Browse Gallery
                            </button>
                        </div>
                    </div>

                    {/* Results Area */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
                        {!file && !analyzing && !result && (
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-500 opacity-50" />
                                <p>Upload an image to see the analysis results here.</p>
                            </div>
                        )}

                        {analyzing && (
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                                <p className="text-gray-600 dark:text-gray-300 font-medium">AI is analyzing your image...</p>
                            </div>
                        )}

                        {result && !analyzing && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: 'spring', delay: 0.2 }}
                                    >
                                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                                    </motion.div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analysis Complete</h2>
                                </div>

                                <motion.div
                                    className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl space-y-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-2">
                                        <span className="text-gray-500 dark:text-gray-400 font-medium">Detected Item</span>
                                        <motion.span
                                            className="font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400 text-lg"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 0.5, delay: 0.6 }}
                                        >
                                            {result.type}
                                        </motion.span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-2">
                                        <span className="text-gray-500 dark:text-gray-400 font-medium">Category</span>
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">{result.category}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-1">
                                        <span className="text-gray-500 dark:text-gray-400 font-medium">AI Confidence</span>
                                        <span className="font-semibold text-green-600 dark:text-green-400">{result.confidence}%</span>
                                    </div>
                                </motion.div>

                                <motion.div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 p-4 rounded-xl"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h3 className="font-semibold text-green-800 dark:text-green-400 mb-1">How to Dispose:</h3>
                                    <p className="text-green-700 dark:text-green-300 text-sm leading-relaxed">
                                        {result.suggestion}
                                    </p>
                                </motion.div>

                                <button
                                    onClick={() => { setFile(null); setResult(null); }}
                                    className="w-full py-3 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-white text-white dark:text-gray-900 rounded-xl font-medium transition-colors"
                                >
                                    Scan Another Item
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}