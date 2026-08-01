import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

function CustomTooltip({ active, payload, label }) {

    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (

        <div className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 shadow-xl">

            <p className="text-slate-300 text-sm">

                Time: {label}

            </p>

            <p className="text-red-400 font-semibold">

                Temperature: {payload[0].value} °C

            </p>

        </div>

    );

}

function TemperatureChart({ data }) {

    return (

        <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6">

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-white">

                    Temperature Trend

                </h2>

                <p className="text-slate-400 mt-1">

                    Machine temperature over time

                </p>

            </div>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart data={data}>

                        <defs>

                            <linearGradient
                                id="temperatureGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop
                                    offset="5%"
                                    stopColor="#EF4444"
                                    stopOpacity={0.8}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#EF4444"
                                    stopOpacity={0}
                                />

                            </linearGradient>

                        </defs>

                        <CartesianGrid
                            stroke="#334155"
                            strokeDasharray="4 4"
                        />

                        <XAxis
                            dataKey="time"
                            stroke="#94A3B8"
                            tick={{ fill: "#94A3B8", fontSize: 12 }}
                        />

                        <YAxis
                            stroke="#94A3B8"
                            tick={{ fill: "#94A3B8", fontSize: 12 }}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                        />

                        <Area
                            type="monotone"
                            dataKey="temperature"
                            stroke="#EF4444"
                            strokeWidth={3}
                            fill="url(#temperatureGradient)"
                            animationDuration={1200}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default TemperatureChart;