import { acknowledgeAlert } from "../../services/alert.service";
import { getRelativeTime } from "../../utils/time";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiClock, FiActivity } from "react-icons/fi";

function AlertTable({ alerts, onRefresh }) {
    const handleAcknowledge = async (id) => {
        try {
            await acknowledgeAlert(id);
            onRefresh();
        } catch (error) {
            console.error(error);
        }
    };

    const getSeverityBadge = (severity) => {
        switch (severity) {
            case "CRITICAL":
                return "bg-red-500/10 text-red-400 border border-red-500/30";
            case "WARNING":
                return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30";
            default:
                return "bg-[#2a3a4a] text-[#8a9aaa] border border-[#2a3a4a]";
        }
    };

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case "CRITICAL":
                return <FiAlertCircle className="text-red-400" size={14} />;
            case "WARNING":
                return <FiAlertTriangle className="text-yellow-400" size={14} />;
            default:
                return <FiAlertCircle className="text-[#4a5a6a]" size={14} />;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "ACTIVE":
                return "bg-orange-500/10 text-orange-400 border border-orange-500/30";
            case "RESOLVED":
                return "bg-green-500/10 text-green-400 border border-green-500/30";
            default:
                return "bg-[#2a3a4a] text-[#8a9aaa] border border-[#2a3a4a]";
        }
    };

    const getStatusDot = (status) => {
        switch (status) {
            case "ACTIVE":
                return "bg-orange-500 animate-pulse";
            case "RESOLVED":
                return "bg-green-500";
            default:
                return "bg-slate-500";
        }
    };

    const [, setNow] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    if (alerts.length === 0) {
        return (
            <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-10 text-center">
                <div className="flex flex-col items-center gap-3">
                    <FiCheckCircle className="text-green-400 text-3xl" />
                    <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm">
                        No Alerts Found
                    </p>
                    <p className="text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] text-xs">
                        System is operating normally
                    </p>
                </div>
            </div>
        );
    }

    const activeCount = alerts.filter(a => a.status === "ACTIVE").length;
    const criticalCount = alerts.filter(a => a.severity === "CRITICAL").length;

    return (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl overflow-hidden shadow-lg">
            {/* Header */}
            <div className="px-6 py-3 border-b border-[#2a3a4a] flex items-center justify-between bg-[#0d1624]">
                <div className="flex items-center gap-3">
                    <FiActivity className="text-[#4a9aff] text-sm" />
                    <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                        Alert Log
                    </span>
                    <span className="text-[10px] text-white font-['Segoe_UI','Arial',sans-serif] bg-[#2a4a6a] px-2 py-0.5 rounded">
                        {alerts.length}
                    </span>
                    {activeCount > 0 && (
                        <span className="text-[9px] text-orange-400 font-['Segoe_UI','Arial',sans-serif] bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/30">
                            {activeCount} Active
                        </span>
                    )}
                    {criticalCount > 0 && (
                        <span className="text-[9px] text-red-400 font-['Segoe_UI','Arial',sans-serif] bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
                            {criticalCount} Critical
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[8px] text-green-400 font-['Segoe_UI','Arial',sans-serif] font-semibold">
                        LIVE
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#0d1624] border-b border-[#2a3a4a]">
                        <tr className="text-left">
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                                Machine
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                                Alert
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider text-center">
                                Severity
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider text-center">
                                Status
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider text-center">
                                Triggered
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider text-center">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {alerts.map((alert, index) => (
                            <tr
                                key={alert._id}
                                className={`border-b border-[#2a3a4a] hover:bg-[#2a3a4a]/30 transition-colors ${
                                    index % 2 === 0 ? 'bg-[#1a2332]' : 'bg-[#1e2838]'
                                }`}
                            >
                                {/* Machine */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-['Segoe_UI','Arial',sans-serif] font-semibold text-sm">
                                            {alert.machine?.machineCode || "Deleted Machine"}
                                        </span>
                                    </div>
                                </td>

                                {/* Alert */}
                                <td className="px-4 py-3">
                                    <div className="flex items-start gap-2">
                                        <span className="mt-0.5">{getSeverityIcon(alert.severity)}</span>
                                        <div>
                                            <p className="text-white font-['Segoe_UI','Arial',sans-serif] text-sm">
                                                {alert.title}
                                            </p>
                                            <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-[10px]">
                                                {alert.message}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Severity */}
                                <td className="px-4 py-3 text-center">
                                    <span className={`px-2.5 py-0.5 rounded text-[9px] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider ${getSeverityBadge(alert.severity)}`}>
                                        {alert.severity}
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-3 text-center">
                                    <div className="flex items-center justify-center gap-1.5">
                                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(alert.status)}`}></span>
                                        <span className={`text-[10px] font-['Segoe_UI','Arial',sans-serif] font-semibold ${getStatusBadge(alert.status)} px-2 py-0.5 rounded`}>
                                            {alert.status}
                                        </span>
                                    </div>
                                </td>

                                {/* Triggered */}
                                <td className="px-4 py-3 text-center">
                                    <div className="flex items-center justify-center gap-1.5">
                                        <FiClock className="text-[#4a5a6a] text-[10px]" />
                                        <span className="text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] text-xs">
                                            {getRelativeTime(alert.triggeredAt)}
                                        </span>
                                    </div>
                                </td>

                                {/* Action */}
                                <td className="px-4 py-3 text-center">
                                    {!alert.isAcknowledged ? (
                                        <button
                                            onClick={() => handleAcknowledge(alert._id)}
                                            className="px-3 py-1.5 rounded-lg bg-[#2a4a6a] hover:bg-[#3a5a7a] text-white font-['Segoe_UI','Arial',sans-serif] text-[10px] font-medium transition-all duration-200"
                                        >
                                            Acknowledge
                                        </button>
                                    ) : (
                                        <div className="flex items-center justify-center gap-1.5">
                                            <FiCheckCircle className="text-green-400 text-sm" />
                                            <span className="text-green-400 font-['Segoe_UI','Arial',sans-serif] text-[10px] font-semibold">
                                                Acknowledged
                                            </span>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-2 border-t border-[#2a3a4a] bg-[#0d1624] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                        {alerts.length} alert{alerts.length > 1 ? 's' : ''}
                    </span>
                    <span className="text-[#2a3a4a]">|</span>
                    <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                        {activeCount} active
                    </span>
                    {criticalCount > 0 && (
                        <>
                            <span className="text-[#2a3a4a]">|</span>
                            <span className="text-[8px] text-red-400 font-['Segoe_UI','Arial',sans-serif]">
                                {criticalCount} critical
                            </span>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                        REAL-TIME
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AlertTable;