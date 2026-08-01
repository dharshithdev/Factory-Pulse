function AlertStats({ alerts }) {

    const total = alerts.length;

    const active = alerts.filter(
        alert => alert.status === "ACTIVE"
    ).length;

    const resolved = alerts.filter(
        alert => alert.status === "RESOLVED"
    ).length;

    const warning = alerts.filter(
        alert => alert.severity === "WARNING"
    ).length;

    const critical = alerts.filter(
        alert => alert.severity === "CRITICAL"
    ).length;

    const Card = ({ title, value, color }) => (

        <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6">

            <p className="text-slate-400 text-sm">

                {title}

            </p>

            <h2 className={`text-4xl font-bold mt-3 ${color}`}>

                {value}

            </h2>

        </div>

    );

    return (

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

            <Card
                title="Total Alerts"
                value={total}
                color="text-white"
            />

            <Card
                title="Active"
                value={active}
                color="text-orange-400"
            />

            <Card
                title="Resolved"
                value={resolved}
                color="text-green-400"
            />

            <Card
                title="Warning"
                value={warning}
                color="text-yellow-400"
            />

            <Card
                title="Critical"
                value={critical}
                color="text-red-500"
            />

        </div>

    );

}

export default AlertStats;