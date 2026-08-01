import { FiCpu, FiActivity, FiAlertCircle, FiTrendingUp, FiServer, FiTool } from "react-icons/fi";

function StatCard({
    title,
    value,
    subtitle,
    icon,
    iconBg = "bg-[#0d1624]",
    iconColor = "text-[#6a8a9a]",
    trend,
    trendValue,
    status,
    showIcon = true,
    progressValue,
    progressType = "normal" // "normal" or "inverse" or "alert"
}) {
    // Map titles to default icons if not provided
    const getDefaultIcon = () => {
        if (icon) return icon;
        
        const iconMap = {
            "Total Machines": <FiServer />,
            "Running": <FiActivity />,
            "Active Alerts": <FiAlertCircle />,
            "Production": <FiTrendingUp />,
            "Maintenance": <FiTool />,
            "Machines": <FiCpu />
        };
        
        return iconMap[title] || <FiCpu />;
    };

    // Get progress bar color based on value and type
    const getProgressColor = (value, type) => {
        if (value === undefined || value === null) return "bg-green-500";
        
        const percentage = Math.min(value, 100);
        
        if (type === "alert") {
            // For alerts: LOW = Green (good), HIGH = Red (bad)
            if (percentage > 65) return "bg-red-500";
            if (percentage > 35) return "bg-yellow-500";
            return "bg-green-500";
        } else if (type === "inverse") {
            // For inverse: LOW = Red (bad), HIGH = Green (good)
            if (percentage > 65) return "bg-green-500";
            if (percentage > 35) return "bg-yellow-500";
            return "bg-red-500";
        } else {
            // For normal: LOW = Green (good), HIGH = Green (good) 
            // Actually normal should show performance - HIGH is good
            if (percentage > 65) return "bg-green-500";
            if (percentage > 35) return "bg-yellow-500";
            return "bg-red-500";
        }
    };

    // Get status color for progress
    const getProgressStatus = (value, type) => {
        if (value === undefined || value === null) return "Normal";
        
        const percentage = Math.min(value, 100);
        
        if (type === "alert") {
            if (percentage > 65) return "Critical";
            if (percentage > 35) return "Warning";
            return "Normal";
        } else {
            if (percentage > 65) return "Optimal";
            if (percentage > 35) return "Moderate";
            return "Critical";
        }
    };

    return (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-5 transition-all duration-300 hover:border-[#4a9aff] hover:shadow-lg hover:shadow-[#4a9aff]/5 hover:-translate-y-0.5">
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    {/* Title - Now more visible */}
                    <p className="text-xs text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                        {title}
                    </p>
                    
                    {/* Value with better readability */}
                    <div className="flex items-baseline gap-2 mt-2.5">
                        <h2 className="text-3xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
                            {value}
                        </h2>
                        {status && (
                            <span className="flex items-center gap-1.5 ml-1">
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                    status === "Online" ? "bg-green-500 animate-pulse" :
                                    status === "Warning" ? "bg-yellow-500" :
                                    status === "Critical" ? "bg-red-500 animate-pulse" :
                                    "bg-slate-500"
                                }`}></span>
                                <span className={`text-[9px] font-['Segoe_UI','Arial',sans-serif] font-semibold ${
                                    status === "Online" ? "text-green-400" :
                                    status === "Warning" ? "text-yellow-400" :
                                    status === "Critical" ? "text-red-400" :
                                    "text-slate-400"
                                }`}>
                                    {status}
                                </span>
                            </span>
                        )}
                    </div>
                    
                    {/* Subtitle with trend */}
                    <div className="flex items-center gap-2 mt-2">
                        <p className="text-xs text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
                            {subtitle}
                        </p>
                        {trend && trendValue !== undefined && (
                            <span className={`flex items-center gap-0.5 text-[10px] font-['Segoe_UI','Arial',sans-serif] font-semibold ${
                                trend === "up" ? "text-green-400" : 
                                trend === "down" ? "text-red-400" : 
                                "text-yellow-400"
                            }`}>
                                {trend === "up" && "↑"}
                                {trend === "down" && "↓"}
                                {trend === "stable" && "→"}
                                {trendValue}
                            </span>
                        )}
                    </div>
                </div>

                {/* Optional Icon - Clean and non-colored */}
                {showIcon && (
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#2a3a4a] ${iconBg} transition-all duration-300 group-hover:border-[#4a9aff] ml-3`}>
                        <span className={`text-xl ${iconColor}`}>
                            {getDefaultIcon()}
                        </span>
                    </div>
                )}
            </div>

            {/* Progress Bar with intelligent coloring */}
            {progressValue !== undefined && (
                <div className="mt-4 pt-3.5 border-t border-[#2a3a4a]">
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-1 bg-[#2a3a4a] rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-700 ${getProgressColor(progressValue, progressType)}`}
                                style={{ width: `${Math.min(progressValue, 100)}%` }}
                            ></div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[9px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] font-mono">
                                {Math.round(Math.min(progressValue, 100))}%
                            </span>
                            <span className={`text-[7px] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase ${
                                getProgressColor(progressValue, progressType) === "bg-green-500" ? "text-green-400" :
                                getProgressColor(progressValue, progressType) === "bg-yellow-500" ? "text-yellow-400" :
                                "text-red-400"
                            }`}>
                                {getProgressStatus(progressValue, progressType)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StatCard;