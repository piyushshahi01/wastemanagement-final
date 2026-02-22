import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import AnimatedPage from '../../components/AnimatedPage';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const weeklyWaste = [
    { name: 'Week 1', Plastic: 14, Organic: 25, Paper: 10, EWaste: 2 },
    { name: 'Week 2', Plastic: 12, Organic: 22, Paper: 15, EWaste: 0 },
    { name: 'Week 3', Plastic: 18, Organic: 28, Paper: 12, EWaste: 5 },
    { name: 'Week 4', Plastic: 10, Organic: 20, Paper: 8, EWaste: 1 },
];

const wasteTypeData = [
    { name: 'Plastic', value: 35 },
    { name: 'Organic', value: 45 },
    { name: 'Paper', value: 15 },
    { name: 'E-Waste', value: 5 },
];

const COLORS = ['#3B82F6', '#22C55E', '#EAB308', '#EF4444'];

// Custom Eco Score Circle Gauge Component
function EcoScoreGauge({ score }) {
    const [currentScore, setCurrentScore] = useState(0);
    const circleRef = useRef(null);

    useEffect(() => {
        // SVG Circle properties
        const circle = circleRef.current;
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        ScrollTrigger.create({
            trigger: "#eco-score-container",
            start: "top 85%",
            onEnter: () => {
                // Animate Score Number
                gsap.to({ val: 0 }, {
                    val: score,
                    duration: 2,
                    ease: "power3.out",
                    onUpdate: function () {
                        setCurrentScore(Math.round(this.targets()[0].val));
                    }
                });

                // Animate SVG Stroke
                const offset = circumference - (score / 100) * circumference;
                gsap.to(circle, {
                    strokeDashoffset: offset,
                    duration: 2,
                    ease: "elastic.out(1, 0.5)",
                    delay: 0.2
                });
            },
            once: true
        });
    }, [score]);

    return (
        <div id="eco-score-container" className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative group">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 w-full text-left">Your Eco Score</h2>
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100 dark:text-gray-700" />
                    {/* Animated Progress Circle */}
                    <circle
                        ref={circleRef}
                        cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
                        strokeLinecap="round"
                        className="text-green-500 transition-all drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-gray-900 dark:text-white">{currentScore}</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">out of 100</span>
                </div>
            </div>
        </div>
    );
}

export default function Analytics() {
    const chartsRef = useRef(null);

    useEffect(() => {
        // Scrollytelling for Charts
        const bars = document.querySelectorAll('.recharts-bar-rectangle');
        const pies = document.querySelectorAll('.recharts-pie-sector');

        // Initial invisible state
        gsap.set(bars, { scaleY: 0, transformOrigin: 'bottom center' });
        gsap.set(pies, { scale: 0, transformOrigin: 'center center' });

        ScrollTrigger.create({
            trigger: chartsRef.current,
            start: "top 75%",
            onEnter: () => {
                gsap.to(bars, {
                    scaleY: 1,
                    duration: 1,
                    stagger: 0.05,
                    ease: "elastic.out(1, 0.75)"
                });

                gsap.to(pies, {
                    scale: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "back.out(1.5)",
                    delay: 0.3
                });
            },
            once: true
        });
    }, []);

    return (
        <AnimatedPage>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Waste Analytics 📊</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Detailed breakdown of your waste generation and recycling habits over time.</p>
                </div>

                <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Eco Score Gauge */}
                    <EcoScoreGauge score={85} />

                    {/* Monthly Trend - Bar Chart */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 lg:col-span-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -z-10"></div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Monthly Waste Comparison (kg)</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weeklyWaste}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend iconType="circle" />
                                    <Bar dataKey="Organic" stackId="a" fill="#22C55E" />
                                    <Bar dataKey="Plastic" stackId="a" fill="#3B82F6" />
                                    <Bar dataKey="Paper" stackId="a" fill="#EAB308" />
                                    <Bar dataKey="EWaste" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Waste Distribution - Pie Chart */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 lg:col-span-3">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Waste Distribution</h2>
                        <div className="h-80 flex justify-center">
                            <ResponsiveContainer width="100%" height="100%" maxWidth={600}>
                                <PieChart>
                                    <Pie
                                        data={wasteTypeData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {wasteTypeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend iconType="circle" layout="vertical" verticalAlign="bottom" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-900/50">
                    <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-400">Monthly Insight</h3>
                    <p className="text-indigo-800 dark:text-indigo-300 mt-2">
                        Your organic waste generation has increased by 15% this month. Consider starting a home composting bin to turn this waste into nutrient-rich soil! 🌱
                    </p>
                </div>
            </div>
        </AnimatedPage>
    );
}