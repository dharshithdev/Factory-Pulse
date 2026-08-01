import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { FiAlertCircle, FiPieChart, FiBarChart2, FiActivity } from "react-icons/fi";

const COLORS = {
    CRITICAL: "#ef4444",
    WARNING: "#eab308",
    INFO: "#3b82f6",
    DEBUG: "#8b5cf6",
    ERROR: "#dc2626"
};

function CustomPieTooltip({ active, payload }) {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-lg px-4 py-3 shadow-2xl">
            <p className="text-white font-['Segoe_UI','Arial',sans-serif] font-semibold text-sm">
                {payload[0].name}
            </p>
            <p className="text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] text-xs">
                Count: <span className="text-white font-bold">{payload[0].value}</span>
            </p>
            <p className="text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] text-[9px] mt-1">
                {((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}% of total
            </p>
        </div>
    );
}

function CustomBarTooltip({ active, payload }) {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-lg px-4 py-3 shadow-2xl">
            <p className="text-white font-['Segoe_UI','Arial',sans-serif] font-semibold text-sm">
                {payload[0].payload.type}
            </p>
            <p className="text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] text-xs">
                Count: <span className="text-[#4a9aff] font-bold">{payload[0].value}</span>
            </p>
        </div>
    );
}

function AlertCharts({ data, title = "Alert Analytics", subtitle = "Severity distribution and alert types" }) {
    // Calculate totals
    const totalAlerts = data.severity.reduce((sum, item) => sum + item.value, 0);
    const criticalCount = data.severity.find(item => item.name === "CRITICAL")?.value || 0;
    const warningCount = data.severity.find(item => item.name === "WARNING")?.value || 0;

    // Prepare severity data with colors
    const severityData = data.severity.map(item => ({
        ...item,
        color: COLORS[item.name] || "#6b7280",
        total: totalAlerts
    }));

    // Sort types by count (descending)
    const sortedTypes = [...data.types].sort((a, b) => b.count - a.count);

    return (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#2a3a4a] bg-[#0d1624]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#2a4a6a] flex items-center justify-center border border-[#3a5a7a]">
                            <FiAlertCircle className="text-[#4a9aff] text-sm" />
                        </div>
                        <div>
                            <h2 className="text-white font-['Segoe_UI','Arial',sans-serif] font-bold text-sm tracking-wide">
                                {title}
                            </h2>
                            <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-[10px]">
                                {subtitle}
                            </p>
                        </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] uppercase tracking-wider">
                                Total Alerts
                            </p>
                            <p className="text-white font-['Segoe_UI','Arial',sans-serif] font-bold text-sm">
                                {totalAlerts}
                            </p>
                        </div>
                        {criticalCount > 0 && (
                            <>
                                <div className="w-px h-8 bg-[#2a3a4a]"></div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                    <div>
                                        <p className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] uppercase tracking-wider">
                                            Critical
                                        </p>
                                        <p className="text-red-400 font-['Segoe_UI','Arial',sans-serif] font-bold text-sm">
                                            {criticalCount}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                        {warningCount > 0 && (
                            <>
                                <div className="w-px h-8 bg-[#2a3a4a]"></div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                                    <div>
                                        <p className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] uppercase tracking-wider">
                                            Warnings
                                        </p>
                                        <p className="text-yellow-400 font-['Segoe_UI','Arial',sans-serif] font-bold text-sm">
                                            {warningCount}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pie Chart - Severity */}
                    <div className="bg-[#0d1624] border border-[#2a3a4a] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <FiPieChart className="text-[#4a9aff] text-xs" />
                            <h3 className="text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                                Severity Distribution
                            </h3>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={severityData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        innerRadius={50}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        labelLine={{ stroke: '#4a5a6a', strokeWidth: 1 }}
                                        animationDuration={1200}
                                        animationEasing="ease-in-out"
                                    >
                                        {severityData.map((entry, index) => (
                                            <Cell 
                                                key={index} 
                                                fill={entry.color}
                                                className="transition-all duration-300 hover:opacity-80"
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomPieTooltip />} />
                                    <Legend 
                                        verticalAlign="bottom"
                                        height={36}
                                        formatter={(value) => (
                                            <span className="text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif]">
                                                {value}
                                            </span>
                                        )}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bar Chart - Alert Types */}
                    <div className="bg-[#0d1624] border border-[#2a3a4a] rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <FiBarChart2 className="text-[#4a9aff] text-xs" />
                            <h3 className="text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                                Alert Types
                            </h3>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart 
                                    data={sortedTypes}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 0,
                                        bottom: 5
                                    }}
                                >
                                    <CartesianGrid
                                        stroke="#2a3a4a"
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="type"
                                        stroke="#4a5a6a"
                                        tick={{ 
                                            fill: "#4a5a6a",
                                            fontSize: 9,
                                            fontFamily: "'Segoe UI', 'Arial', sans-serif"
                                        }}
                                        axisLine={{ stroke: "#2a3a4a" }}
                                        tickLine={{ stroke: "#2a3a4a" }}
                                    />
                                    <YAxis
                                        stroke="#4a5a6a"
                                        tick={{ 
                                            fill: "#4a5a6a",
                                            fontSize: 9,
                                            fontFamily: "'Segoe UI', 'Arial', sans-serif"
                                        }}
                                        axisLine={{ stroke: "#2a3a4a" }}
                                        tickLine={{ stroke: "#2a3a4a" }}
                                    />
                                    <Tooltip content={<CustomBarTooltip />} />
                                    <Bar
                                        dataKey="count"
                                        fill="#4a9aff"
                                        radius={[4, 4, 0, 0]}
                                        barSize={32}
                                        animationDuration={1200}
                                        animationEasing="ease-in-out"
                                        className="transition-all duration-300 hover:opacity-80"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-2 border-t border-[#2a3a4a] bg-[#0d1624] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                            Critical
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                        <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                            Warning
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                            Info
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <FiActivity className="text-[#4a5a6a] text-[10px]" />
                    <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                        Last updated: {new Date().toLocaleTimeString()}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AlertCharts;