import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const userLinks = [
    { name: "Dashboard", path: "/user/dashboard", icon: "LayoutDashboard" },
    { name: "Smart Bins", path: "/user/smart-bins", icon: "Trash2" },
    { name: "Map", path: "/user/map", icon: "Map" },
    { name: "AI Detection", path: "/user/ai-detection", icon: "Scan" },
    { name: "Pickup", path: "/user/pickup", icon: "Truck" },
    { name: "Analytics", path: "/user/analytics", icon: "BarChart2" },
    { name: "Suggestions", path: "/user/suggestions", icon: "Lightbulb" },
    { name: "Alerts", path: "/user/alerts", icon: "Bell" },
    { name: "Rewards", path: "/user/rewards", icon: "Gift" },
    { name: "Impact Report", path: "/user/impact", icon: "TrendingUp" },
    { name: "Profile", path: "/user/profile", icon: "User" }
];

export default function UserLayout() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const [level, setLevel] = useState(1);

    useEffect(() => {
        if (token) {
            axios.get('https://wastemanagement-final-2.onrender.com/api/auth/me', {
                headers: { Authorization: token }
            }).then(res => {
                const pts = res.data.ecoPoints || 0;
                setLevel(Math.floor(pts / 100) + 1);
            }).catch(err => console.error("Could not fetch user level", err));
        }
    }, [token]);

    if (!token) return <Navigate to="/login" replace />;
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (role === "collector") return <Navigate to="/collector/dashboard" replace />;

    const bgClass = `bg-level-${level > 4 ? 4 : level}`;

    return (
        <div className="flex h-screen text-white overflow-hidden relative">
            <div className={`bg-animation ${bgClass}`}></div>
            <Sidebar title="User Panel" links={userLinks} />
            <div className="flex-1 overflow-y-auto relative z-10 flex flex-col">
                <main className="flex-1 w-full max-w-full">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
