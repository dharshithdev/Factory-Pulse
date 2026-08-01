import { useEffect, useState } from "react";
import { FiBell, FiRefreshCw, FiActivity, FiAlertCircle } from "react-icons/fi";
import MainLayout from "../layouts/MainLayout";
import { getAlerts } from "../services/alert.service";
import AlertStats from "../components/alerts/AlertStats";
import AlertFilter from "../components/alerts/AlertFilter";
import AlertTable from "../components/alerts/AlertTable";
import socket from "../socket/socket";

function Alerts() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("ALL");
    const [severity, setSeverity] = useState("ALL");

    const loadAlerts = async () => {
        try {
            const data = await getAlerts();
            setAlerts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadAlerts();
        setTimeout(() => setRefreshing(false), 500);
    };

    useEffect(() => {
        loadAlerts();

        socket.on("alertCreated", (newAlert) => {
            setAlerts((previousAlerts) => [
                newAlert,
                ...previousAlerts
            ]);
        });

        socket.on("alertResolved", (resolvedAlert) => {
            setAlerts((previousAlerts) =>
                previousAlerts.map((alert) =>
                    alert._id === resolvedAlert._id
                        ? resolvedAlert
                        : alert
                )
            );
        });

        return () => {
            socket.off("alertCreated");
            socket.off("alertResolved");
        };
    }, []);

    const filteredAlerts = alerts.filter((alert) => {
        const machineMatch =
            alert.machine?.machineCode
                ?.toLowerCase()
                .includes(search.toLowerCase()) ?? false;

        const statusMatch =
            status === "ALL" ||
            alert.status === status;

        const severityMatch =
            severity === "ALL" ||
            alert.severity === severity;

        return machineMatch &&
            statusMatch &&
            severityMatch;
    });

    // Calculate live stats
    const activeCount = filteredAlerts.filter(a => a.status === "ACTIVE").length;
    const criticalCount = filteredAlerts.filter(a => a.severity === "CRITICAL").length;

    return (
        <MainLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
                            Alerts
                        </h1>
                        <p className="text-[#6a8a9a] mt-1 font-['Segoe_UI','Arial',sans-serif] text-sm">
                            Monitor and manage system alerts in real-time
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* System Status */}
                        <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-[#0d1624] rounded-lg border border-[#2a3a4a]">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
                                    Monitoring
                                </span>
                            </div>
                            <span className="text-[#2a3a4a]">|</span>
                            <span className="text-[10px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] font-mono">
                                {new Date().toLocaleTimeString()}
                            </span>
                        </div>

                        {/* Refresh Button */}
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="p-2.5 rounded-lg bg-[#2a3a4a] hover:bg-[#3a4a5a] text-[#8a9aaa] hover:text-white transition-all duration-200 disabled:opacity-50"
                            title="Refresh Alerts"
                        >
                            <FiRefreshCw className={`text-sm ${refreshing ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Alert Stats */}
                <AlertStats alerts={filteredAlerts} />

                {/* Alert Filter */}
                <AlertFilter
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                    severity={severity}
                    setSeverity={setSeverity}
                />

                {/* Alert Table */}
                {loading ? (
                    <div className="flex items-center justify-center py-20 bg-[#1a2332] border border-[#2a3a4a] rounded-xl">
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-lg bg-[#2a4a6a] flex items-center justify-center mx-auto border border-[#3a5a7a] animate-pulse">
                                <FiBell className="text-[#4a9aff] text-2xl" />
                            </div>
                            <p className="mt-4 text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm">
                                Loading alerts...
                            </p>
                            <div className="mt-3 flex items-center justify-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#4a9aff] animate-bounce" style={{ animationDelay: '0s' }}></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#4a9aff] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#4a9aff] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <AlertTable
                        alerts={filteredAlerts}
                        onRefresh={loadAlerts}
                    />
                )}

                {/* Footer Stats */}
                <div className="bg-[#0d1624] border border-[#2a3a4a] rounded-lg px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <FiActivity className="text-[#4a9aff] text-xs" />
                            <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                                {filteredAlerts.length} total alerts
                            </span>
                        </div>
                        {activeCount > 0 && (
                            <span className="text-[8px] text-orange-400 font-['Segoe_UI','Arial',sans-serif]">
                                ● {activeCount} active
                            </span>
                        )}
                        {criticalCount > 0 && (
                            <span className="text-[8px] text-red-400 font-['Segoe_UI','Arial',sans-serif]">
                                ● {criticalCount} critical
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-green-500"></span>
                            <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                                SCADA CONNECTED
                            </span>
                        </div>
                        <span className="text-[#2a3a4a]">|</span>
                        <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                            Socket: {socket.connected ? 'Connected' : 'Disconnected'}
                        </span>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Alerts;