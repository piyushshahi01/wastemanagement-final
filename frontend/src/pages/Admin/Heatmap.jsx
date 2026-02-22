import { useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';


// Mock heatmap data
// Color scale: Red (High Waste), Yellow (Medium), Green (Low)
const heatZones = [
    { id: 1, lat: 28.7041, lng: 77.1025, radius: 800, intensity: 'high', name: 'Downtown Commercial', amount: '850 kg/day' },
    { id: 2, lat: 28.6900, lng: 77.0900, radius: 1200, intensity: 'medium', name: 'West Residential', amount: '450 kg/day' },
    { id: 3, lat: 28.7200, lng: 77.1200, radius: 600, intensity: 'low', name: 'North Park Area', amount: '120 kg/day' },
    { id: 4, lat: 28.6950, lng: 77.1300, radius: 900, intensity: 'high', name: 'Industrial Sector 4', amount: '920 kg/day' },
    { id: 5, lat: 28.7100, lng: 77.0800, radius: 750, intensity: 'medium', name: 'University Campus', amount: '380 kg/day' },
];

export default function Heatmap() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Resize canvas to parent
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let mouse = { x: -100, y: -100 };
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        canvas.addEventListener('mousemove', handleMouseMove);

        // Nodes based on the mock data, scaled to conceptual canvas coords
        const nodes = [
            { x: 300, y: 200, radius: 40, color: 'rgba(239, 68, 68, 0.6)', intensity: 1 }, // High
            { x: 500, y: 350, radius: 60, color: 'rgba(234, 179, 8, 0.4)', intensity: 0.6 },  // Med
            { x: 200, y: 400, radius: 30, color: 'rgba(34, 197, 94, 0.4)', intensity: 0.3 },  // Low
            { x: 600, y: 150, radius: 45, color: 'rgba(239, 68, 68, 0.5)', intensity: 0.9 }, // High
            { x: 400, y: 280, radius: 35, color: 'rgba(234, 179, 8, 0.5)', intensity: 0.7 },  // Med
        ];

        let time = 0;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw a subtle grid background
            ctx.strokeStyle = 'rgba(156, 163, 175, 0.1)';
            for (let i = 0; i < canvas.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
            for (let i = 0; i < canvas.height; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }

            time += 0.05;

            nodes.forEach((node, index) => {
                // Calculate distance from mouse
                const dx = mouse.x - node.x;
                const dy = mouse.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Hover effect: expand radius if mouse is close
                const isHovered = dist < node.radius * 2;
                const targetRadius = isHovered ? node.radius * 1.5 : node.radius;

                // Pulse animation base
                const pulse = Math.sin(time + index) * 5 * node.intensity;
                const currentRadius = targetRadius + pulse;

                // Draw main blob
                ctx.beginPath();
                ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, currentRadius);
                gradient.addColorStop(0, node.color.replace(/[\d.]+\)$/g, `${node.intensity})`));
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradient;
                ctx.fill();

                // Draw ripple rings if hovered
                if (isHovered) {
                    const rippleRadius = (time * 20 % 50) + currentRadius;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, rippleRadius, 0, Math.PI * 2);
                    ctx.strokeStyle = node.color.replace(/[\d.]+\)$/g, `${1 - (rippleRadius - currentRadius) / 50})`);
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <AnimatedPage className="space-y-6 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Waste Heatmap 🔥</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Identify high-waste generation areas for optimized resource allocation.</p>
                </div>

                <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="text-gray-600 dark:text-gray-300 font-medium">High</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="text-gray-600 dark:text-gray-300 font-medium">Medium</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-gray-600 dark:text-gray-300 font-medium">Low</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-[500px]">
                {/* Map View */}
                <div className="lg:col-span-3 bg-[#0a0f18] dark:bg-[#05000a] rounded-2xl shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] border border-gray-800 relative z-0 flex items-center justify-center overflow-hidden group cursor-crosshair">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full min-h-[500px]"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white/50 text-xs font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        LIVE_CANVAS_RENDER::OK
                    </div>
                </div>

                {/* Sidebar Insights */}
                <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-5 border border-red-200 dark:border-red-900/50">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-red-800 dark:text-red-400">Critical Area Alert</h3>
                                <p className="text-sm text-red-700 dark:text-red-300 mt-1 leading-relaxed">
                                    Downtown Commercial zone is showing a 25% spike in waste generation today. Suggest deploying an extra truck.
                                </p>
                                <button className="mt-3 text-sm font-bold bg-white dark:bg-red-950 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg shadow-sm w-full hover:bg-red-50 dark:hover:bg-red-900 transition-colors border border-red-100 dark:border-red-800">
                                    Optimize Route Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Top Generating Zones</h2>
                        <div className="space-y-4">
                            {heatZones.sort((a, b) => b.amount > a.amount ? 1 : -1).slice(0, 4).map((zone, i) => (
                                <div key={zone.id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-gray-400 dark:text-gray-500 w-4">{i + 1}.</span>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-1 truncate w-24 sm:w-32">{zone.name}</span>
                                    </div>
                                    <span className={`text-sm font-bold ${zone.intensity === 'high' ? 'text-red-500' : zone.intensity === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                                        {zone.amount.split(' ')[0]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
}