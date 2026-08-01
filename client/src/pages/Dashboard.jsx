import { useEffect, useMemo, useState } from "react";
import { FaExclamationTriangle, FaIndustry, FaPlayCircle } from "react-icons/fa";
import { PiFactoryFill } from "react-icons/pi";
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

    },[]);

    const factoryHealth = useMemo(() => {
        if (!dashboard) return 100;

        let score = 100;

        score -= dashboard.alerts.warning * 5;
        score -= dashboard.alerts.critical * 15;
        score -= dashboard.machineSummary.stopped * 20;

        return Math.max(score, 0);
    }, [dashboard]);
    

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
                <div className="text-center">
                    <PiFactoryFill className="mx-auto text-7xl text-blue-500 animate-pulse"/>
                    <h2 className="mt-6 text-3xl font-bold text-white">
                        FactoryPulse
                    </h2>
                    <p className="text-slate-400 mt-2">
                        Connecting to factory...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <MainLayout>

            <div className="space-y-10">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-4xl font-bold text-white">
                            Factory Overview
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Real-time monitoring of machines, production and alerts.
                        </p>

                    </div>

                    <div className="bg-[#1E293B] border border-slate-700 rounded-2xl px-6 py-4 min-w-[220px]">

                        <div className="flex justify-between mb-2">

                            <span className="text-slate-400">
                                Factory Health
                            </span>

                            <span className="text-white font-bold">
                                {factoryHealth}%
                            </span>

                        </div>

                        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">

                            <div
                                className="h-full bg-green-500 transition-all duration-500"
                                style={{
                                    width: `${factoryHealth}%`
                                }}
                            />

                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-4 gap-6">

                    <StatCard
                        title="Machines"
                        value={dashboard.machineSummary.total}
                        subtitle="Registered Machines"
                        icon={<FaIndustry/>}
                        iconBg="bg-blue-600"
                    />

                    <StatCard
                        title="Running"
                        value={dashboard.machineSummary.running}
                        subtitle="Currently Active"
                        icon={<FaPlayCircle/>}
                        iconBg="bg-green-600"
                    />

                    <StatCard
                        title="Alerts"
                        value={dashboard.alerts.active}
                        subtitle="Needs Attention"
                        icon={<FaExclamationTriangle/>}
                        iconBg="bg-red-600"
                    />

                    <StatCard
                        title="Production"
                        value={dashboard.production.totalProduction}
                        subtitle="Today's Output"
                        icon={<PiFactoryFill/>}
                        iconBg="bg-orange-600"
                    />

                </div>

                <div>

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-2xl font-bold text-white">
                            Machine Status
                        </h2>

                        <span className="text-slate-400">
                            {dashboard.machines.length} Machines Online
                        </span>

                    </div>

                    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

                        {dashboard.machines.map((machine) => (

                            <MachineCard
                                key={machine._id}
                                machine={machine}
                            />

                        ))}

                    </div>

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-white mb-6">
                        Recent Alerts
                    </h2>

                    <AlertTable
                        alerts={dashboard.recentAlerts}
                    />

                </div>

            </div>

        </MainLayout>
    );
}

export default Dashboard;