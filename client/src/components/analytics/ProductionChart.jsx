import {
    LineChart,
    Line,
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

            <p className="text-cyan-400 font-semibold">

                Production: {payload[0].value}

            </p>

        </div>

    );

}

function ProductionChart({ data }) {

    return (

        <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6">

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-white">

                    Production Trend

                </h2>

                <p className="text-slate-400 mt-1">

                    Production count over time

                </p>

            </div>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

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

                        <Line
                            type="monotone"
                            dataKey="production"
                            stroke="#06B6D4"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                fill: "#06B6D4"
                            }}
                            activeDot={{
                                r: 7
                            }}
                            animationDuration={1200}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default ProductionChart;