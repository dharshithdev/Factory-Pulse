import { FaExclamationTriangle } from "react-icons/fa";

function AlertTable({ alerts }) {

    const getSeverityColor = (severity) => {
        switch (severity) {
            case "CRITICAL":
                return "bg-red-500/20 text-red-400 border border-red-500/30";

            case "WARNING":
                return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";

            default:
                return "bg-slate-700 text-slate-300";
        }
    };

    if (alerts.length === 0) {
        return (
            <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-8 text-center text-slate-400">
                No alerts 🎉
            </div>
        );
    }

    return (
        <div className="bg-[#1E293B] border border-slate-700 rounded-2xl overflow-hidden shadow-lg">

            <table className="w-full">

                <thead className="bg-[#263449]">

                    <tr className="text-left">

                        <th className="px-6 py-4 text-slate-300 font-semibold">
                            Machine
                        </th>

                        <th className="px-6 py-4 text-slate-300 font-semibold">
                            Alert
                        </th>

                        <th className="px-6 py-4 text-slate-300 font-semibold">
                            Value
                        </th>

                        <th className="px-6 py-4 text-slate-300 font-semibold">
                            Threshold
                        </th>

                        <th className="px-6 py-4 text-slate-300 font-semibold">
                            Severity
                        </th>

                        <th className="px-6 py-4 text-slate-300 font-semibold">
                            Time
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {alerts.map((alert) => (

                        <tr
                            key={alert._id}
                            className="border-t border-slate-700 hover:bg-slate-800 transition-colors"
                        >

                            <td className="px-6 py-5 text-white font-semibold">
                                {alert.machine.machineCode}
                            </td>

                            <td className="px-6 py-5">

                                <div className="flex items-center gap-2 text-slate-300">

                                    <FaExclamationTriangle className="text-yellow-400"/>

                                    {alert.title}

                                </div>

                            </td>

                            <td className="px-6 py-5 text-white">
                                {alert.value}
                            </td>

                            <td className="px-6 py-5 text-white">
                                {alert.threshold}
                            </td>

                            <td className="px-6 py-5">

                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(alert.severity)}`}>
                                    {alert.severity}
                                </span>

                            </td>

                            <td className="px-6 py-5 text-slate-400">
                                {new Date(alert.triggeredAt).toLocaleString()}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default AlertTable;