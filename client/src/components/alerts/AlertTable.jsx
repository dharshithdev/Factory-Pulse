import { acknowledgeAlert } from "../../services/alert.service";
import { getRelativeTime } from "../../utils/time";
import { useEffect, useState } from "react";

function AlertTable({ alerts, onRefresh }) {

    const handleAcknowledge = async (id) => {

        try {

            await acknowledgeAlert(id);

            onRefresh();

        } catch (error) {

            console.error(error);

        }

    };

    const getSeverityBadge = (severity) => {

        switch (severity) {

            case "CRITICAL":
                return "bg-red-500/20 text-red-400";

            case "WARNING":
                return "bg-yellow-500/20 text-yellow-400";

            default:
                return "bg-slate-500/20 text-slate-300";

        }

    };

    const getStatusBadge = (status) => {

        switch (status) {

            case "ACTIVE":
                return "bg-orange-500/20 text-orange-400";

            case "RESOLVED":
                return "bg-green-500/20 text-green-400";

            default:
                return "bg-slate-500/20 text-slate-300";

        }

    };

    if (alerts.length === 0) {

        return (

            <div className="text-center py-20 text-slate-400">

                No alerts found.

            </div>

        );

    }

    const [, setNow] = useState(Date.now());

useEffect(() => {

    const interval = setInterval(() => {

        setNow(Date.now());

    }, 60000);

    return () => clearInterval(interval);

}, []);

    return (

        <div className="bg-[#1E293B] border border-slate-700 rounded-2xl overflow-hidden">

            <table className="w-full">

                <thead>

                    <tr className="border-b border-slate-700">

                        <th className="text-left py-4 px-6 text-slate-400 font-semibold">Machine</th>

                        <th className="text-left py-4 text-slate-400 font-semibold">Alert</th>

                        <th className="text-center py-4 text-slate-400 font-semibold">Severity</th>

                        <th className="text-center py-4 text-slate-400 font-semibold">Status</th>

                        <th className="text-center py-4 text-slate-400 font-semibold">Triggered</th>

                        <th className="text-center py-4 text-slate-400 font-semibold">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        alerts.map((alert) => (

                            <tr
                                key={alert._id}
                                className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                            >

                                <td className="py-5 px-6 text-white font-semibold">

                                    {alert.machine?.machineCode || "Deleted Machine"}

                                </td>

                                <td>

                                    <div>

                                        <p className="text-white">

                                            {alert.title}

                                        </p>

                                        <p className="text-slate-400 text-sm">

                                            {alert.message}

                                        </p>

                                    </div>

                                </td>

                                <td className="text-center">

                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityBadge(alert.severity)}`}>

                                        {alert.severity}

                                    </span>

                                </td>

                                <td className="text-center">

                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(alert.status)}`}>

                                        {alert.status}

                                    </span>

                                </td>

                                <td className="text-center text-slate-300">

                                    {getRelativeTime(alert.triggeredAt)}

                                </td>

                                <td className="text-center">

                                    {

                                        !alert.isAcknowledged ?

                                        <button
                                            onClick={() => handleAcknowledge(alert._id)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                                        >

                                            Acknowledge

                                        </button>

                                        :

                                        <span className="text-green-400 font-semibold">

                                            Acknowledged

                                        </span>

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default AlertTable;