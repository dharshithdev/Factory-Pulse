import { PiFactoryFill } from "react-icons/pi";
import { MdOutlineWarningAmber } from "react-icons/md";
import { FaIndustry } from "react-icons/fa";
import { HiOutlineCube } from "react-icons/hi";
import { FiTrendingUp, FiActivity } from "react-icons/fi";

function OverviewCards({ data }) {
    // Calculate trend percentages (example logic - adjust based on your data)
    const getTrend = (current, previous) => {
        if (!previous || previous === 0) return { value: "+0%", direction: "stable" };
        const change = ((current - previous) / previous) * 100;
        if (change > 0) return { value: `+${Math.round(change)}%`, direction: "up" };
        if (change < 0) return { value: `${Math.round(change)}%`, direction: "down" };
        return { value: "0%", direction: "stable" };
    };

    const cards = [
        {
            title: "Total Machines",
            value: data.totalMachines,
            icon: <PiFactoryFill size={22} />,
            subtitle: "Registered in system",
            trend: getTrend(data.totalMachines, data.previousTotalMachines || 0)
        },
        {
            title: "Active Machines",
            value: data.activeMachines,
            icon: <FaIndustry size={20} />,
            subtitle: "Currently operational",
            trend: getTrend(data.activeMachines, data.previousActiveMachines || 0)
        },
        {
            title: "Total Production",
            value: data.totalProduction,
            icon: <HiOutlineCube size={22} />,
            subtitle: "Units produced today",
            trend: getTrend(data.totalProduction, data.previousProduction || 0)
        },
        {
            title: "Active Alerts",
            value: data.activeAlerts,
            icon: <MdOutlineWarningAmber size={22} />,
            subtitle: "Requires attention",
            trend: getTrend(data.activeAlerts, data.previousAlerts || 0)
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {cards.map((card, index) => (
                <div
                    key={card.title}
                    className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-5 transition-all duration-300 hover:border-[#4a9aff] hover:shadow-lg hover:shadow-[#4a9aff]/5 hover:-translate-y-0.5"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            {/* Title */}
                            <p className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                                {card.title}
                            </p>
                            
                            {/* Value */}
                            <div className="flex items-baseline gap-2 mt-2.5">
                                <h2 className="text-3xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
                                    {card.value}
                                </h2>
                                
                                {/* Status indicator for alerts */}
                                {card.title === "Active Alerts" && card.value > 0 && (
                                    <span className="flex items-center gap-1 ml-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                        <span className="text-[9px] text-red-400 font-['Segoe_UI','Arial',sans-serif] font-semibold">
                                            {card.value > 5 ? "Critical" : "Warning"}
                                        </span>
                                    </span>
                                )}
                                
                                {/* Online indicator for active machines */}
                                {card.title === "Active Machines" && card.value > 0 && (
                                    <span className="flex items-center gap-1 ml-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        <span className="text-[9px] text-green-400 font-['Segoe_UI','Arial',sans-serif] font-semibold">
                                            Online
                                        </span>
                                    </span>
                                )}
                            </div>
                            
                            {/* Subtitle with trend */}
                            <div className="flex items-center gap-2 mt-2">
                                <p className="text-xs text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
                                    {card.subtitle}
                                </p>
                                {card.trend && (
                                    <span className={`flex items-center gap-0.5 text-[10px] font-['Segoe_UI','Arial',sans-serif] font-semibold ${
                                        card.trend.direction === "up" ? "text-green-400" : 
                                        card.trend.direction === "down" ? "text-red-400" : 
                                        "text-yellow-400"
                                    }`}>
                                        {card.trend.direction === "up" && "↑"}
                                        {card.trend.direction === "down" && "↓"}
                                        {card.trend.direction === "stable" && "→"}
                                        {card.trend.value}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Icon - Clean and non-colored */}
                        <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#2a3a4a] bg-[#0d1624] ml-3 transition-all duration-300 group-hover:border-[#4a9aff]">
                            <span className="text-[#6a8a9a] text-xl">
                                {card.icon}
                            </span>
                        </div>
                    </div>

                    {/* Progress bar for visual representation */}
                    {card.title === "Active Machines" && (
                        <div className="mt-4 pt-3 border-t border-[#2a3a4a]">
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1 bg-[#2a3a4a] rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-green-500 rounded-full transition-all duration-700"
                                        style={{ 
                                            width: `${data.totalMachines > 0 ? (data.activeMachines / data.totalMachines) * 100 : 0}%` 
                                        }}
                                    ></div>
                                </div>
                                <span className="text-[9px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] font-mono">
                                    {data.totalMachines > 0 ? Math.round((data.activeMachines / data.totalMachines) * 100) : 0}%
                                </span>
                            </div>
                        </div>
                    )}

                    {card.title === "Active Alerts" && card.value > 0 && (
                        <div className="mt-4 pt-3 border-t border-[#2a3a4a]">
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1 bg-[#2a3a4a] rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-red-500 rounded-full transition-all duration-700"
                                        style={{ 
                                            width: `${Math.min((card.value / 10) * 100, 100)}%` 
                                        }}
                                    ></div>
                                </div>
                                <span className="text-[9px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] font-mono">
                                    {Math.min(Math.round((card.value / 10) * 100), 100)}%
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default OverviewCards;