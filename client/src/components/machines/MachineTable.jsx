import { FaEdit, FaPowerOff, FaTrash, FaHistory } from "react-icons/fa";

function MachineTable({
    machines,
    onEdit,
    onToggle,
    onDelete,
    onHistory
}) {
    const getStatusBadge = (status) => {

        switch (status) {

            case "Running":
                return "bg-green-500/20 text-green-400";

            case "Idle":
                return "bg-yellow-500/20 text-yellow-400";

            case "Stopped":
                return "bg-red-500/20 text-red-400";

            case "Maintenance":
                return "bg-blue-500/20 text-blue-400";
                
            case "Disabled":
                return "bg-gray-500/20 text-gray-400";

            default:
                return "bg-slate-500/20 text-slate-300";

        }

    };

    if (machines.length === 0) {

        return (

            <div className="text-center py-20 text-slate-400">

                No machines found.

            </div>

        );

    }

    return (

        <div className="overflow-x-auto">

            <table className="w-full">

                <thead>

                    <tr className="border-b border-slate-700">

                        <th className="text-left py-4 text-slate-400 font-semibold">
                            Machine
                        </th>

                        <th className="text-center py-4 text-slate-400 font-semibold">
                            Status
                        </th>

                        <th className="text-center py-4 text-slate-400 font-semibold">
                            Temp
                        </th>

                        <th className="text-center py-4 text-slate-400 font-semibold">
                            Pressure
                        </th>

                        <th className="text-center py-4 text-slate-400 font-semibold">
                            RPM
                        </th>

                        <th className="text-center py-4 text-slate-400 font-semibold">
                            Power
                        </th>

                        <th className="text-center py-4 text-slate-400 font-semibold">
                            Production
                        </th>

                        <th className="text-center py-4 text-slate-400 font-semibold">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        machines.map((machine) => (

                            <tr
                                key={machine._id}
                                className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                            >

                                <td className="py-5">

                                    <div>

                                        <p className="text-white font-semibold text-lg">

                                            {machine.machineCode}

                                        </p>

                                        <p className="text-slate-400 text-sm">

                                            Last Updated •{" "}
                                            {new Date(
                                                machine.currentMetrics.lastUpdated
                                            ).toLocaleTimeString()}

                                        </p>

                                    </div>

                                </td>

                                <td className="text-center">

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(machine.currentMetrics.status)}`}
                                    >

                                        {
    machine.isActive
        ? machine.currentMetrics.status
        : "Disabled"
}

                                    </span>

                                </td>

                                <td className="text-center text-white">

                                    {machine.maxTemperature} °C

                                </td>

                                <td className="text-center text-white">

                                    {machine.maxPressure} PSI

                                </td>

                                <td className="text-center text-white">

                                    {machine.maxRPM}

                                </td>

                                <td className="text-center text-white">

                                    {machine.maxPower} kW

                                </td>

                                <td className="text-center text-white">

                                    {machine.maxProductionPerMinute}

                                </td>

                               <td>

    <div className="flex justify-center gap-3">

        <button
            onClick={() => onEdit(machine)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
        >
            <FaEdit />
        </button>

        <button
            onClick={() => onHistory(machine)}
            className="bg-slate-600 hover:bg-slate-700 text-white p-2 rounded-lg transition"
        >
            <FaHistory />
        </button>

        <button
            onClick={() => onToggle(machine._id)}
            className={`text-white p-2 rounded-lg transition ${
                machine.isActive
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "bg-green-600 hover:bg-green-700"
            }`}
            title={
                machine.isActive
                    ? "Disable Machine"
                    : "Enable Machine"
            }
        >
            <FaPowerOff />
        </button>

        <button
            onClick={() => onDelete(machine._id)}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
            title="Delete Machine"
        >
            <FaTrash />
        </button>

    </div>

</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default MachineTable;