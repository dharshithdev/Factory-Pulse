import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell
} from "recharts";

function CustomTooltip({ active, payload }) {

    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (

        <div className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 shadow-xl">

            <p className="text-white font-semibold">

                {payload[0].payload.machine}

            </p>

            <p className="text-green-400">

                Utilization: {payload[0].value}%

            </p>

        </div>

    );

}

function UtilizationChart({ data }) {

    return (

        <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6">

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-white">

                    Machine Utilization

                </h2>

                <p className="text-slate-400 mt-1">

                    Current production efficiency by machine

                </p>

            </div>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{
                            top: 5,
                            right: 20,
                            left: 20,
                            bottom: 5
                        }}
                    >

                        <CartesianGrid
                            stroke="#334155"
                            strokeDasharray="4 4"
                        />

                        <XAxis
                            type="number"
                            domain={[0, 100]}
                            stroke="#94A3B8"
                            tick={{ fill: "#94A3B8" }}
                        />

                        <YAxis
                            type="category"
                            dataKey="machine"
                            stroke="#94A3B8"
                            tick={{ fill: "#94A3B8" }}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                        />

                        <Bar
                            dataKey="utilization"
                            radius={[0, 8, 8, 0]}
                        >

                            {

                                data.map((entry, index) => {

                                    let color = "#22C55E";

                                    if (entry.utilization < 40) {
                                        color = "#EF4444";
                                    } else if (entry.utilization < 70) {
                                        color = "#F59E0B";
                                    }

                                    return (

                                        <Cell
                                            key={index}
                                            fill={color}
                                        />

                                    );

                                })

                            }

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default UtilizationChart;