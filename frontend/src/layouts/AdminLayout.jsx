import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "LayoutDashboard" },
    { name: "Manage Centers", path: "/admin/manage-centers", icon: "Settings" },
    { name: "Smart Bins", path: "/admin/smart-bins", icon: "Trash2" },
    { name: "Routes", path: "/admin/routes", icon: "Map" },
    { name: "Reports", path: "/admin/reports", icon: "FileText" },
    { name: "Heatmap", path: "/admin/heatmap", icon: "MapPin" },
    { name: "Alerts", path: "/admin/alerts", icon: "Bell" }
];

export default function AdminLayout() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) return <Navigate to="/login" replace />;
    if (role !== "admin") return <Navigate to="/user/dashboard" replace />;

    return (
        <div className="flex h-screen text-white overflow-hidden relative">
            <div className="bg-animation"></div>
            <Sidebar title="Admin Panel" links={adminLinks} />
            <div className="flex-1 overflow-y-auto relative z-10 flex flex-col">
                <main className="flex-1 w-full max-w-full">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
