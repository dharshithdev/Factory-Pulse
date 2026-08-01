import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area
} from "recharts";
import { FiTrendingUp, FiActivity } from "react-icons/fi";

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-lg px-4 py-3 shadow-2xl">
            <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-[10px] uppercase tracking-wider">
                {label}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4a9aff]"></span>
                <p className="text-white font-['Segoe_UI','Arial',sans-serif] font-semibold text-sm">
                    Production: <span className="text-[#4a9aff]">{payload[0].value}</span>
                </p>
            </div>
            <p className="text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] text-[9px] mt-1">
                Units produced
            </p>
        </div>
    );
}

function ProductionChart({ data, title = "Production Trend", subtitle = "Production count over time" }) {
    // Calculate statistics
    const totalProduction = data.reduce((sum, item) => sum + item.production, 0);
    const averageProduction = data.length > 0 ? Math.round(totalProduction / data.length) : 0;
    const maxProduction = data.length > 0 ? Math.max(...data.map(item => item.production)) : 0;

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
                                Total
                            </p>
                            <p className="text-white font-['Segoe_UI','Arial',sans-serif] font-bold text-sm">
                                {totalProduction}
                            </p>
                        </div>
                        <div className="w-px h-8 bg-[#2a3a4a]"></div>
                        <div className="text-right">
                            <p className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] uppercase tracking-wider">
                                Avg
                            </p>
                            <p className="text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold text-sm">
                                {averageProduction}
                            </p>
                        </div>
                        <div className="w-px h-8 bg-[#2a3a4a]"></div>
                        <div className="text-right">
                            <p className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] uppercase tracking-wider">
                                Peak
                            </p>
                            <p className="text-[#4a9aff] font-['Segoe_UI','Arial',sans-serif] font-bold text-sm">
                                {maxProduction}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="p-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid
                            stroke="#2a3a4a"
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="time"
                            stroke="#4a5a6a"
                            tick={{ 
                                fill: "#4a5a6a", 
                                fontSize: 9,
                                fontFamily: "'Segoe UI', 'Arial', sans-serif"
                            }}
                            axisLine={{ stroke: "#2a3a4a" }}
                            tickLine={{ stroke: "#2a3a4a" }}
                            dy={5}
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
                            dx={-5}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: "#4a9aff",
                                strokeWidth: 1,
                                strokeDasharray: "4 4"
                            }}
                        />

                        {/* Area under the line */}
                        <Area
                            type="monotone"
                            dataKey="production"
                            stroke="none"
                            fill="url(#colorGradient)"
                            fillOpacity={0.1}
                        />

                        <Line
                            type="monotone"
                            dataKey="production"
                            stroke="#4a9aff"
                            strokeWidth={2.5}
                            dot={{
                                r: 3,
                                fill: "#4a9aff",
                                stroke: "#1a2332",
                                strokeWidth: 1
                            }}
                            activeDot={{
                                r: 6,
                                fill: "#4a9aff",
                                stroke: "#1a2332",
                                strokeWidth: 2
                            }}
                            animationDuration={1500}
                            animationEasing="ease-in-out"
                        />

                        {/* Gradient Definition */}
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4a9aff" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#4a9aff" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Footer */}
            <div className="px-6 py-2 border-t border-[#2a3a4a] bg-[#0d1624] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FiActivity className="text-[#4a5a6a] text-[10px]" />
                    <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                        Live data • {data.length} data points
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-green-500"></span>
                    <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                        MONITORING
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductionChart;