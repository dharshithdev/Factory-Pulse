import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    ReferenceLine
} from "recharts";
import { FiThermometer, FiActivity, FiAlertCircle } from "react-icons/fi";

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    const value = payload[0].value;
    const isHigh = value > 75;
    const isMedium = value > 55;

    return (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-lg px-4 py-3 shadow-2xl">
            <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-[10px] uppercase tracking-wider">
                {label}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
                <span className={`w-2 h-2 rounded-full ${isHigh ? 'bg-red-500' : isMedium ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                <p className="text-white font-['Segoe_UI','Arial',sans-serif] font-semibold text-sm">
                    Temperature: <span className={isHigh ? 'text-red-400' : isMedium ? 'text-yellow-400' : 'text-green-400'}>
                        {payload[0].value}°C
                    </span>
                </p>
            </div>
            <p className="text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] text-[9px] mt-1">
                {isHigh ? '⚠️ Above normal range' : isMedium ? '⚠️ Approaching limit' : '✅ Within normal range'}
            </p>
        </div>
    );
}

function TemperatureChart({ data, title = "Temperature Trend", subtitle = "Machine temperature over time", threshold = 75 }) {
    // Calculate statistics
    const avgTemp = data.length > 0 ? Math.round(data.reduce((sum, item) => sum + item.temperature, 0) / data.length) : 0;
    const maxTemp = data.length > 0 ? Math.max(...data.map(item => item.temperature)) : 0;
    const minTemp = data.length > 0 ? Math.min(...data.map(item => item.temperature)) : 0;
    const isCritical = maxTemp > threshold;

    return (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#2a3a4a] bg-[#0d1624]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${isCritical ? 'bg-red-500/20 border-red-500/30' : 'bg-[#2a4a6a] border-[#3a5a7a]'}`}>
                            <FiThermometer className={isCritical ? 'text-red-400' : 'text-[#4a9aff]'} />
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
                            <p className="text-white font-['Segoe_UI','Arial',sans-serif] font-bold text-sm">
                                {avgTemp}°C
                            </p>
                        </div>
                        <div className="w-px h-8 bg-[#2a3a4a]"></div>
                        <div className="text-right">
                            <p className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] uppercase tracking-wider">
                                Min
                            </p>
                            <p className="text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold text-sm">
                                {minTemp}°C
                            </p>
                        </div>
                        <div className="w-px h-8 bg-[#2a3a4a]"></div>
                        <div className="text-right">
                            <p className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] uppercase tracking-wider">
                                Peak
                            </p>
                            <p className={`font-['Segoe_UI','Arial',sans-serif] font-bold text-sm ${isCritical ? 'text-red-400' : 'text-[#4a9aff]'}`}>
                                {maxTemp}°C
                            </p>
                        </div>
                        {isCritical && (
                            <>
                                <div className="w-px h-8 bg-[#2a3a4a]"></div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                    <span className="text-[8px] text-red-400 font-['Segoe_UI','Arial',sans-serif] font-semibold">
                                        CRITICAL
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="p-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="temperatureGradientWarning" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="temperatureGradientNormal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                            </linearGradient>
                        </defs>

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
                            domain={[0, 'auto']}
                        />

                        {/* Reference Line for Threshold */}
                        <ReferenceLine
                            y={threshold}
                            stroke="#ef4444"
                            strokeDasharray="4 4"
                            strokeWidth={1.5}
                            label={{
                                value: `Threshold ${threshold}°C`,
                                fill: '#ef4444',
                                fontSize: 8,
                                fontFamily: "'Segoe UI', 'Arial', sans-serif",
                                position: 'right'
                            }}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: "#4a9aff",
                                strokeWidth: 1,
                                strokeDasharray: "4 4"
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="temperature"
                            stroke="#ef4444"
                            strokeWidth={2.5}
                            fill="url(#temperatureGradient)"
                            animationDuration={1500}
                            animationEasing="ease-in-out"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Footer */}
            <div className="px-6 py-2 border-t border-[#2a3a4a] bg-[#0d1624] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                            Normal
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                        <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                            Warning
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                            Critical
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <FiActivity className="text-[#4a5a6a] text-[10px]" />
                    <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                        {data.length} readings
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TemperatureChart;