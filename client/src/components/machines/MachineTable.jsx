import { FaEdit, FaPowerOff, FaTrash, FaHistory } from "react-icons/fa";
import { FiActivity, FiClock } from "react-icons/fi";

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
                return "bg-green-500/10 text-green-400 border border-green-500/30";
            case "Idle":
                return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30";
            case "Stopped":
                return "bg-red-500/10 text-red-400 border border-red-500/30";
            case "Maintenance":
                return "bg-blue-500/10 text-blue-400 border border-blue-500/30";
            case "Disabled":
                return "bg-gray-500/10 text-gray-400 border border-gray-500/30";
            default:
                return "bg-slate-500/10 text-slate-300 border border-slate-500/30";
        }
    };

    const getStatusDot = (status) => {
        switch (status) {
            case "Running":
                return "bg-green-500 animate-pulse";
            case "Idle":
                return "bg-yellow-500";
            case "Stopped":
                return "bg-red-500";
            case "Maintenance":
                return "bg-blue-500";
            case "Disabled":
                return "bg-gray-500";
            default:
                return "bg-slate-500";
        }
    };

    if (machines.length === 0) {
        return (
            <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-10 text-center">
                <div className="flex flex-col items-center gap-3">
                    <FiActivity className="text-[#4a5a6a] text-3xl" />
                    <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm">
                        No Machines Found
                    </p>
                    <p className="text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] text-xs">
                        No machines are currently registered in the system
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl overflow-hidden shadow-lg">
            {/* Table Header with Count */}
            <div className="px-6 py-3 border-b border-[#2a3a4a] flex items-center justify-between bg-[#0d1624]">
                <div className="flex items-center gap-3">
                    <FiActivity className="text-[#4a9aff] text-sm" />
                    <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                        Machine Registry
                    </span>
                    <span className="text-[10px] text-white font-['Segoe_UI','Arial',sans-serif] bg-[#2a4a6a] px-2 py-0.5 rounded">
                        {machines.length}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[8px] text-green-400 font-['Segoe_UI','Arial',sans-serif] font-semibold">
                        LIVE
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#0d1624] border-b border-[#2a3a4a]">
                        <tr className="text-left">
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                                Machine
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider text-center">
                                Status
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider text-center">
                                Temp
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider text-center">
                                Pressure
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider text-center">
                                RPM
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider text-center">
                                Power
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider text-center">
                                Production
                            </th>
                            <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {machines.map((machine, index) => (
                            <tr
                                key={machine._id}
                                className={`border-b border-[#2a3a4a] hover:bg-[#2a3a4a]/30 transition-colors ${
                                    index % 2 === 0 ? 'bg-[#1a2332]' : 'bg-[#1e2838]'
                                }`}
                            >
                                {/* Machine Info */}
                                <td className="px-4 py-3">
                                    <div>
                                        <p className="text-white font-['Segoe_UI','Arial',sans-serif] font-semibold text-sm tracking-wide">
                                            {machine.machineCode}
                                        </p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <FiClock className="text-[#4a5a6a] text-[10px]" />
                                            <span className="text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] text-[10px]">
                                                {new Date(machine.currentMetrics.lastUpdated).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-3 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(
                                            machine.isActive ? machine.currentMetrics.status : "Disabled"
                                        )}`}></span>
                                        <span className={`px-2.5 py-0.5 rounded text-[9px] font-['Segoe_UI','Arial',sans-serif] font-semibold ${getStatusBadge(
                                            machine.isActive ? machine.currentMetrics.status : "Disabled"
                                        )}`}>
                                            {machine.isActive ? machine.currentMetrics.status : "Disabled"}
                                        </span>
                                    </div>
                                </td>

                                {/* Metrics */}
                                <td className="px-4 py-3 text-center">
                                    <span className="text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-mono">
                                        {machine.maxTemperature}°C
                                    </span>
                                </td>

                                <td className="px-4 py-3 text-center">
                                    <span className="text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-mono">
                                        {machine.maxPressure} PSI
                                    </span>
                                </td>

                                <td className="px-4 py-3 text-center">
                                    <span className="text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-mono">
                                        {machine.maxRPM}
                                    </span>
                                </td>

                                <td className="px-4 py-3 text-center">
                                    <span className="text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-mono">
                                        {machine.maxPower} kW
                                    </span>
                                </td>

                                <td className="px-4 py-3 text-center">
                                    <span className="text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-mono">
                                        {machine.maxProductionPerMinute}/min
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-3">
                                    <div className="flex justify-center gap-1.5">
                                        <button
                                            onClick={() => onEdit(machine)}
                                            className="p-1.5 rounded-lg bg-[#2a4a6a] hover:bg-[#3a5a7a] text-[#8a9aaa] hover:text-white transition-all duration-200"
                                            title="Edit Machine"
                                        >
                                            <FaEdit size={14} />
                                        </button>

                                        <button
                                            onClick={() => onHistory(machine)}
                                            className="p-1.5 rounded-lg bg-[#2a3a4a] hover:bg-[#3a4a5a] text-[#8a9aaa] hover:text-white transition-all duration-200"
                                            title="View History"
                                        >
                                            <FaHistory size={14} />
                                        </button>

                                        <button
                                            onClick={() => onToggle(machine._id)}
                                            className={`p-1.5 rounded-lg transition-all duration-200 ${
                                                machine.isActive
                                                    ? "bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 hover:text-orange-300"
                                                    : "bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300"
                                            }`}
                                            title={machine.isActive ? "Disable Machine" : "Enable Machine"}
                                        >
                                            <FaPowerOff size={14} />
                                        </button>

                                        <button
                                            onClick={() => onDelete(machine._id)}
                                            className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-all duration-200"
                                            title="Delete Machine"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-2 border-t border-[#2a3a4a] bg-[#0d1624] flex items-center justify-between">
                <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                    {machines.length} machine{machines.length > 1 ? 's' : ''} • Last updated: {new Date().toLocaleTimeString()}
                </span>
                <div className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-green-500"></span>
                    <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                        SCADA CONNECTED
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MachineTable;