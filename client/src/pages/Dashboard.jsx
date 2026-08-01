import { useEffect, useMemo, useState } from "react";
import { FaExclamationTriangle, FaIndustry, FaPlayCircle } from "react-icons/fa";
import { PiFactoryFill } from "react-icons/pi";
import { FiActivity, FiCpu, FiTrendingUp, FiServer } from "react-icons/fi";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import MachineCard from "../components/MachineCard";
import AlertTable from "../components/AlertTable";
import { getDashboard } from "../services/dashboard.services";
import socket from "../socket/socket";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadDashboard = async () => {
        try {
            const data = await getDashboard();
            setDashboard(data);
        } catch (error) {
            console.error("Dashboard Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();

        socket.on("machineUpdated", () => {
            loadDashboard();
        });

        return () => {
            socket.off("machineUpdated");
        };
    }, []);

    const factoryHealth = useMemo(() => {
        if (!dashboard) return 100;

        let score = 100;
        score -= dashboard.alerts.warning * 5;
        score -= dashboard.alerts.critical * 15;
        score -= dashboard.machineSummary.stopped * 20;

        return Math.max(score, 0);
    }, [dashboard]);

    const getHealthColor = (health) => {
        if (health > 80) return "bg-green-500";
        if (health > 60) return "bg-yellow-500";
        return "bg-red-500";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 rounded-xl bg-[#2a4a6a] flex items-center justify-center mx-auto border border-[#3a5a7a] animate-pulse">
                        <PiFactoryFill className="text-4xl text-[#4a9aff]" />
                    </div>
                    <h2 className="mt-6 text-2xl font-bold text-white font-['Segoe_UI','Arial',sans-serif]">
                        FactoryPulse
                    </h2>
                    <p className="text-[#6a8a9a] mt-2 font-['Segoe_UI','Arial',sans-serif] text-sm">
                        Initializing system...
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#4a9aff] animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-[#4a9aff] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-[#4a9aff] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <MainLayout>
            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
                            Factory Overview
                        </h1>
                        <p className="text-[#6a8a9a] mt-1 font-['Segoe_UI','Arial',sans-serif] text-sm">
                            Real-time monitoring of machines, production and alerts
                        </p>
                    </div>

                    {/* Factory Health Card */}
                    <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl px-5 py-3 min-w-[200px]">
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                                Factory Health
                            </span>
                            <span className={`text-sm font-bold font-['Segoe_UI','Arial',sans-serif] ${
                                factoryHealth > 80 ? "text-green-400" :
                                factoryHealth > 60 ? "text-yellow-400" :
                                "text-red-400"
                            }`}>
                                {factoryHealth}%
                            </span>
                        </div>
                        <div className="h-1.5 bg-[#2a3a4a] rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-700 ${getHealthColor(factoryHealth)}`}
                                style={{
                                    width: `${factoryHealth}%`
                                }}
                            />
                        </div>
                        <div className="flex justify-between mt-1">
                            <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                                {factoryHealth > 80 ? "Optimal" : factoryHealth > 60 ? "Warning" : "Critical"}
                            </span>
                            <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                                {new Date().toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Machines"
                        value={dashboard.machineSummary.total}
                        subtitle="Registered machines"
                        icon={<FiServer />}
                        status="Online"
                        progressValue={(dashboard.machineSummary.running / dashboard.machineSummary.total) * 100}
                    />

                    <StatCard
                        title="Running"
                        value={dashboard.machineSummary.running}
                        subtitle="Currently operational"
                        icon={<FiActivity />}
                        status="Online"
                        trend="up"
                        trendValue={dashboard.machineSummary.running}
                        progressValue={(dashboard.machineSummary.running / dashboard.machineSummary.total) * 100}
                    />

                    <StatCard
                        title="Active Alerts"
                        value={dashboard.alerts.active}
                        subtitle="Needs attention"
                        icon={<FaExclamationTriangle />}
                        status={dashboard.alerts.active > 0 ? "Warning" : "Online"}
                        trend={dashboard.alerts.active > 0 ? "down" : "stable"}
                        trendValue={dashboard.alerts.active > 0 ? "-3" : "0"}
                        progressValue={dashboard.alerts.active > 0 ? 45 : 0}
                    />

                    <StatCard
                        title="Production"
                        value={dashboard.production.totalProduction}
                        subtitle="Units today"
                        icon={<FiTrendingUp />}
                        status="Online"
                        trend="up"
                        trendValue={" + " + dashboard.production.totalProduction / 24}
                        progressValue={dashboard.production.totalProduction / 24}
                    />
                </div>

                {/* Machine Status Section */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
                            Machine Status
                        </h2>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-mono">
                                    {dashboard.machines.length} Online
                                </span>
                            </div>
                            <div className="w-px h-4 bg-[#2a3a4a]"></div>
                            <span className="text-[10px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] font-mono">
                                {new Date().toLocaleTimeString()}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {dashboard.machines.map((machine) => (
                            <MachineCard
                                key={machine._id}
                                machine={machine}
                            />
                        ))}
                    </div>
                </div>

                {/* Alerts Section */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
                            Recent Alerts
                        </h2>
                        <span className="text-[10px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] font-mono">
                            Live monitoring
                        </span>
                    </div>
                    <AlertTable alerts={dashboard.recentAlerts} />
                </div>
            </div>
        </MainLayout>
    );
}

export default Dashboard;