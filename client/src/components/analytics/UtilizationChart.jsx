import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    ReferenceLine
} from "recharts";
import { FiTrendingUp, FiActivity, FiAlertCircle } from "react-icons/fi";

function CustomTooltip({ active, payload }) {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    const value = payload[0].value;
    const isHigh = value >= 70;
    const isMedium = value >= 40;

    return (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-lg px-4 py-3 shadow-2xl min-w-[150px]">
            <p className="text-white font-['Segoe_UI','Arial',sans-serif] font-semibold text-sm">
                {payload[0].payload.machine}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
                <span className={`w-2 h-2 rounded-full ${isHigh ? 'bg-green-500' : isMedium ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                <p className={`font-['Segoe_UI','Arial',sans-serif] font-bold text-sm ${
                    isHigh ? 'text-green-400' : isMedium ? 'text-yellow-400' : 'text-red-400'
                }`}>
                    {payload[0].value}% Utilization
                </p>
            </div>
            <p className="text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] text-[9px] mt-1">
                {isHigh ? '✅ Optimal performance' : isMedium ? '⚠️ Moderate efficiency' : '❌ Needs attention'}
            </p>
        </div>
    );
}

function UtilizationChart({ data, title = "Machine Utilization", subtitle = "Current production efficiency by machine" }) {
    // Calculate statistics
    const avgUtilization = data.length > 0 ? Math.round(data.reduce((sum, item) => sum + item.utilization, 0) / data.length) : 0;
    const highCount = data.filter(item => item.utilization >= 70).length;
    const mediumCount = data.filter(item => item.utilization >= 40 && item.utilization < 70).length;
    const lowCount = data.filter(item => item.utilization < 40).length;

    // Sort data by utilization (highest first)
    const sortedData = [...data].sort((a, b) => b.utilization - a.utilization);

    const getBarColor = (value) => {
        if (value >= 70) return "#22c55e";  // Green
        if (value >= 40) return "#eab308";  // Yellow
        return "#ef4444";                   // Red
    };

    return (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#2a3a4a] bg-[#0d1624]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#2a4a6a] flex items-center justify-center border border-[#3a5a7a]">
                            <FiTrendingUp className="text-[#4a9aff] text-sm" />
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
                                Avg
                            </p>
                            <p className={`font-['Segoe_UI','Arial',sans-serif] font-bold text-sm ${
                                avgUtilization >= 70 ? 'text-green-400' :
                                avgUtilization >= 40 ? 'text-yellow-400' :
                                'text-red-400'
                            }`}>
                                {avgUtilization}%
                            </p>
                        </div>
                        <div className="w-px h-8 bg-[#2a3a4a]"></div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span className="text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif]">
                                    {highCount}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                <span className="text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif]">
                                    {mediumCount}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <span className="text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif]">
                                    {lowCount}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="p-4 h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={sortedData}
                        layout="vertical"
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid
                            stroke="#2a3a4a"
                            strokeDasharray="3 3"
                            horizontal={false}
                        />

                        <XAxis
                            type="number"
                            domain={[0, 100]}
                            stroke="#4a5a6a"
                            tick={{ 
                                fill: "#4a5a6a",
                                fontSize: 9,
                                fontFamily: "'Segoe UI', 'Arial', sans-serif"
                            }}
                            axisLine={{ stroke: "#2a3a4a" }}
                            tickLine={{ stroke: "#2a3a4a" }}
                            tickFormatter={(value) => `${value}%`}
                        />

                        <YAxis
                            type="category"
                            dataKey="machine"
                            stroke="#4a5a6a"
                            tick={{ 
                                fill: "#4a5a6a",
                                fontSize: 9,
                                fontFamily: "'Segoe UI', 'Arial', sans-serif"
                            }}
                            axisLine={{ stroke: "#2a3a4a" }}
                            tickLine={{ stroke: "#2a3a4a" }}
                            width={80}
                        />

                        {/* Reference Lines */}
                        <ReferenceLine
                            x={70}
                            stroke="#22c55e"
                            strokeDasharray="4 4"
                            strokeWidth={1.5}
                            label={{
                                value: 'Optimal',
                                fill: '#22c55e',
                                fontSize: 8,
                                fontFamily: "'Segoe UI', 'Arial', sans-serif",
                                position: 'top'
                            }}
                        />
                        <ReferenceLine
                            x={40}
                            stroke="#eab308"
                            strokeDasharray="4 4"
                            strokeWidth={1.5}
                            label={{
                                value: 'Warning',
                                fill: '#eab308',
                                fontSize: 8,
                                fontFamily: "'Segoe UI', 'Arial', sans-serif",
                                position: 'top'
                            }}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                fill: '#2a3a4a',
                                opacity: 0.3
                            }}
                        />

                        <Bar
                            dataKey="utilization"
                            radius={[0, 6, 6, 0]}
                            barSize={24}
                            animationDuration={1200}
                            animationEasing="ease-in-out"
                        >
                            {sortedData.map((entry, index) => (
                                <Cell 
                                    key={index} 
                                    fill={getBarColor(entry.utilization)}
                                    className="transition-all duration-300 hover:opacity-80"
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Footer */}
            <div className="px-6 py-2 border-t border-[#2a3a4a] bg-[#0d1624] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                            ≥70% Optimal
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                        <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                            40-69% Moderate
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                            &lt;40% Critical
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <FiActivity className="text-[#4a5a6a] text-[10px]" />
                    <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                        {data.length} machines
                    </span>
                </div>
            </div>
        </div>
    );
}

export default UtilizationChart;