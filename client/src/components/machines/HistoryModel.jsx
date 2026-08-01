import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiClock, FiActivity, FiCpu, FiTrendingUp, FiAlertCircle } from "react-icons/fi";
import { getMachineHistory } from "../../services/sensorReading.service";

function HistoryModal({ machine, onClose }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                setLoading(true);
                const data = await getMachineHistory(machine._id);
                setHistory(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, [machine]);

    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Running":
                return "text-green-400";
            case "Idle":
                return "text-yellow-400";
            case "Stopped":
                return "text-red-400";
            case "Maintenance":
                return "text-blue-400";
            default:
                return "text-slate-400";
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
            default:
                return "bg-slate-500";
        }
    };

    if (!machine) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-[#1a2332] w-full max-w-6xl rounded-xl border border-[#2a3a4a] shadow-2xl animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a3a4a] bg-[#0d1624] rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#2a4a6a] flex items-center justify-center border border-[#3a5a7a]">
                            <FiClock className="text-[#4a9aff] text-lg" />
                        </div>
                        <div>
                            <h2 className="text-white font-['Segoe_UI','Arial',sans-serif] font-bold text-lg tracking-tight">
                                {machine.machineCode} - History
                            </h2>
                            <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-xs">
                                Recent sensor readings and status history
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-[#2a3a4a] text-[#6a8a9a] hover:text-white transition-all duration-200"
                        title="Close"
                    >
                        <IoClose size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className="max-h-[600px] overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-lg bg-[#2a4a6a] flex items-center justify-center mx-auto border border-[#3a5a7a] animate-pulse">
                                    <FiActivity className="text-[#4a9aff] text-2xl" />
                                </div>
                                <p className="mt-4 text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm">
                                    Loading history...
                                </p>
                            </div>
                        </div>
                    ) : history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <FiAlertCircle className="text-[#4a5a6a] text-4xl mb-3" />
                            <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm">
                                No history records found
                            </p>
                            <p className="text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] text-xs mt-1">
                                Sensor data will appear here once available
                            </p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-[#0d1624] border-b border-[#2a3a4a] sticky top-0 z-10">
                                <tr className="text-left">
                                    <th className="px-4 py-2.5 text-[9px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                                        Time
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
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {history.map((reading, index) => (
                                    <tr
                                        key={reading._id}
                                        className={`border-b border-[#2a3a4a] hover:bg-[#2a3a4a]/30 transition-colors ${
                                            index % 2 === 0 ? 'bg-[#1a2332]' : 'bg-[#1e2838]'
                                        }`}
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <FiClock className="text-[#4a5a6a] text-[10px]" />
                                                <span className="text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] text-xs">
                                                    {new Date(reading.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <span className="text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-mono">
                                                {reading.temperature}°C
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <span className="text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-mono">
                                                {reading.pressure} PSI
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <span className="text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-mono">
                                                {reading.rpm}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <span className="text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-mono">
                                                {reading.power} kW
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(reading.status)}`}></span>
                                                <span className={`text-[10px] font-['Segoe_UI','Arial',sans-serif] font-semibold ${getStatusColor(reading.status)}`}>
                                                    {reading.status}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-2 border-t border-[#2a3a4a] bg-[#0d1624] rounded-b-xl flex items-center justify-between">
                    <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                        {history.length} record{history.length > 1 ? 's' : ''} • {machine.machineCode}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-green-500"></span>
                        <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                            HISTORICAL DATA
                        </span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .animate-slideUp {
                    animation: slideUp 0.2s ease-out;
                }
            `}</style>
        </div>
    );
}

export default HistoryModal;