import { FaExclamationTriangle, FaBell, FaInfoCircle, FaCheckCircle } from "react-icons/fa";
import { FiAlertTriangle, FiAlertCircle, FiClock } from "react-icons/fi";

function AlertTable({ alerts }) {

    const getSeverityColor = (severity) => {
        switch (severity) {
            case "CRITICAL":
                return "bg-red-500/10 text-red-400 border border-red-500/30";
            case "WARNING":
                return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30";
            case "INFO":
                return "bg-blue-500/10 text-blue-400 border border-blue-500/30";
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
            case "INFO":
                return <FiInfoCircle className="text-blue-400" size={14} />;
            default:
                return <FaBell className="text-[#4a5a6a]" size={14} />;
        }
    };

    const getStatusDot = (severity) => {
        switch (severity) {
            case "CRITICAL":
                return "animate-pulse";
            default:
                return "";
        }
    };

    if (alerts.length === 0) {
        return (
            <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-10 text-center">
                <div className="flex flex-col items-center gap-3">
                    <FaCheckCircle className="text-green-400 text-3xl" />
                    <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm">
                        No Active Alerts
                    </p>
                    <p className="text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] text-xs">
                        System is operating normally
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl overflow-hidden shadow-lg">
            {/* Table Header with Count */}
            <div className="px-6 py-3 border-b border-[#2a3a4a] flex items-center justify-between bg-[#0d1624]">
                <div className="flex items-center gap-3">
                    <FaBell className="text-[#4a9aff] text-sm" />
                    <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                        Active Alerts
                    </span>
                    <span className="text-[10px] text-white font-['Segoe_UI','Arial',sans-serif] bg-[#2a4a6a] px-2 py-0.5 rounded">
                        {alerts.length}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-[8px] text-red-400 font-['Segoe_UI','Arial',sans-serif] font-semibold">
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
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                                Value
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                                Threshold
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                                Severity
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                                Time
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
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${
                                            alert.severity === "CRITICAL" ? "bg-red-500" :
                                            alert.severity === "WARNING" ? "bg-yellow-500" :
                                            "bg-blue-500"
                                        } ${getStatusDot(alert.severity)}`}></div>
                                        <span className="text-white font-['Segoe_UI','Arial',sans-serif] text-xs font-semibold">
                                            {alert.machine.machineCode}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        {getSeverityIcon(alert.severity)}
                                        <span className="text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] text-xs">
                                            {alert.title}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-4 py-3">
                                    <span className="text-white font-['Segoe_UI','Arial',sans-serif] text-xs">
                                        {alert.value}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    <span className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-xs">
                                        {alert.threshold}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    <span className={`px-2.5 py-0.5 rounded text-[9px] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider ${getSeverityColor(alert.severity)}`}>
                                        {alert.severity}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1.5">
                                        <FiClock className="text-[#4a5a6a] text-[10px]" />
                                        <span className="text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] text-[10px]">
                                            {new Date(alert.triggeredAt).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-2 border-t border-[#2a3a4a] bg-[#0d1624] flex items-center justify-between">
                <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                    {alerts.length} alert{alerts.length > 1 ? 's' : ''} • Last updated: {new Date().toLocaleTimeString()}
                </span>
                <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-green-500"></span>
                    <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                        CONNECTED
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AlertTable;