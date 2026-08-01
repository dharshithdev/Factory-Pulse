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
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#F59E0B",
    "#EF4444",
    "#3B82F6",
    "#10B981",
    "#8B5CF6"
];

function AlertCharts({ data }) {

    return (

        <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6">

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-white">

                    Alert Analytics

                </h2>

                <p className="text-slate-400 mt-1">

                    Severity distribution and alert types

                </p>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div>

                    <h3 className="text-lg text-white font-semibold mb-4 text-center">

                        Severity

                    </h3>

                    <div className="h-72">

                        <ResponsiveContainer width="100%" height="100%">

                            <PieChart>

                                <Pie
                                    data={data.severity}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    label
                                >

                                    {

                                        data.severity.map((entry, index) => (

                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                            />

                                        ))

                                    }

                                </Pie>

                                <Tooltip/>

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                <div>

                    <h3 className="text-lg text-white font-semibold mb-4 text-center">

                        Alert Types

                    </h3>

                    <div className="h-72">

                        <ResponsiveContainer width="100%" height="100%">

                            <BarChart data={data.types}>

                                <CartesianGrid
                                    stroke="#334155"
                                    strokeDasharray="4 4"
                                />

                                <XAxis
                                    dataKey="type"
                                    stroke="#94A3B8"
                                    tick={{ fill: "#94A3B8" }}
                                />

                                <YAxis
                                    stroke="#94A3B8"
                                    tick={{ fill: "#94A3B8" }}
                                />

                                <Tooltip/>

                                <Bar
                                    dataKey="count"
                                    fill="#3B82F6"
                                    radius={[8, 8, 0, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AlertCharts;