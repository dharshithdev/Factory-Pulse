import { FiAlertCircle, FiCheckCircle, FiAlertTriangle, FiActivity, FiBell } from "react-icons/fi";

function AlertStats({ alerts }) {
    const total = alerts.length;
    const active = alerts.filter(alert => alert.status === "ACTIVE").length;
    const resolved = alerts.filter(alert => alert.status === "RESOLVED").length;
    const warning = alerts.filter(alert => alert.severity === "WARNING").length;
    const critical = alerts.filter(alert => alert.severity === "CRITICAL").length;

    // Calculate percentages for progress bars
    const activePercentage = total > 0 ? Math.round((active / total) * 100) : 0;
    const resolvedPercentage = total > 0 ? Math.round((resolved / total) * 100) : 0;
    const warningPercentage = total > 0 ? Math.round((warning / total) * 100) : 0;
    const criticalPercentage = total > 0 ? Math.round((critical / total) * 100) : 0;

    const Card = ({ title, value, color, icon, bgColor = "bg-[#0d1624]", progress, status }) => (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-5 transition-all duration-300 hover:border-[#4a9aff] hover:shadow-lg hover:shadow-[#4a9aff]/5 hover:-translate-y-0.5">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-sm ${color}`}>{icon}</span>
                        <p className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                            {title}
                        </p>
                    </div>
                    <h2 className={`text-3xl font-bold font-['Segoe_UI','Arial',sans-serif] tracking-tight ${color}`}>
                        {value}
                    </h2>
                    {status && (
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                                status === "Active" ? "bg-orange-500 animate-pulse" :
                                status === "Resolved" ? "bg-green-500" :
                                status === "Warning" ? "bg-yellow-500" :
                                status === "Critical" ? "bg-red-500 animate-pulse" :
                                "bg-slate-500"
                            }`}></span>
                            <span className={`text-[8px] font-['Segoe_UI','Arial',sans-serif] font-semibold ${
                                status === "Active" ? "text-orange-400" :
                                status === "Resolved" ? "text-green-400" :
                                status === "Warning" ? "text-yellow-400" :
                                status === "Critical" ? "text-red-400" :
                                "text-slate-400"
                            }`}>
                                {status}
                            </span>
                        </div>
                    )}
                </div>
                
                {/* Progress Ring Indicator */}
                {progress !== undefined && (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#2a3a4a] ml-3">
                        <span className={`text-sm font-['Segoe_UI','Arial',sans-serif] font-bold ${color}`}>
                            {progress}%
                        </span>
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            {progress !== undefined && (
                <div className="mt-3 pt-3 border-t border-[#2a3a4a]">
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-1 bg-[#2a3a4a] rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-700 ${
                                    title === "Critical" ? "bg-red-500" :
                                    title === "Warning" ? "bg-yellow-500" :
                                    title === "Active" ? "bg-orange-500" :
                                    title === "Resolved" ? "bg-green-500" :
                                    "bg-[#4a9aff]"
                                }`}
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                        </div>
                        <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] font-mono">
                            {progress}%
                        </span>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2a4a6a] flex items-center justify-center border border-[#3a5a7a]">
                    <FiBell className="text-[#4a9aff] text-sm" />
                </div>
                <div>
                    <h3 className="text-white font-['Segoe_UI','Arial',sans-serif] font-bold text-sm tracking-wide">
                        Alert Statistics
                    </h3>
                    <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-[10px]">
                        Real-time alert summary and distribution
                    </p>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <Card
                    title="Total Alerts"
                    value={total}
                    color="text-white"
                    icon={<FiActivity />}
                    progress={100}
                    status={total > 0 ? "Active" : "No Alerts"}
                />

                <Card
                    title="Active"
                    value={active}
                    color="text-orange-400"
                    icon={<FiAlertCircle />}
                    progress={activePercentage}
                    status={active > 0 ? "Active" : "None"}
                />

                <Card
                    title="Resolved"
                    value={resolved}
                    color="text-green-400"
                    icon={<FiCheckCircle />}
                    progress={resolvedPercentage}
                    status={resolved > 0 ? "Resolved" : "None"}
                />

                <Card
                    title="Warning"
                    value={warning}
                    color="text-yellow-400"
                    icon={<FiAlertTriangle />}
                    progress={warningPercentage}
                    status={warning > 0 ? "Warning" : "None"}
                />

                <Card
                    title="Critical"
                    value={critical}
                    color="text-red-400"
                    icon={<FiAlertCircle />}
                    progress={criticalPercentage}
                    status={critical > 0 ? "Critical" : "None"}
                />
            </div>
        </div>
    );
}

export default AlertStats;