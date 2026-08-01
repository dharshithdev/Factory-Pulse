import { FaTemperatureHigh, FaBolt, FaTachometerAlt } from "react-icons/fa";
import { GiPressureCooker } from "react-icons/gi";
import { PiFactoryFill } from "react-icons/pi";
import { FiActivity, FiCpu, FiAlertCircle } from "react-icons/fi";

function MachineCard({ machine }) {
    const { currentMetrics } = machine;

    const getStatusColor = (status) => {
        switch (status) {
            case "Running":
                return "bg-green-500";
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

    const getStatusTextColor = (status) => {
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
                return "animate-pulse";
            default:
                return "";
        }
    };

    const getPercentage = (value, max) => {
        if (!max || max <= 0) return 0;
        return Math.min((value / max) * 100, 100);
    };

    const getBarColor = (value, max, type) => {
        const percentage = getPercentage(value, max);
        if (percentage > 85) return "bg-red-500";
        if (percentage > 65) return "bg-yellow-500";
        return "bg-green-500";
    };

    const Metric = ({
        icon,
        title,
        value,
        displayValue,
        max,
        iconColor,
        unit
    }) => (
        <div className="bg-[#0d1624] rounded-lg p-3 border border-[#2a3a4a]">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className={`text-sm ${iconColor}`}>{icon}</span>
                    <span className="text-[#8a9aaa] text-[10px] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                        {title}
                    </span>
                </div>
                <span className="text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-semibold">
                    {displayValue}
                </span>
            </div>
            <div className="w-full h-1.5 bg-[#2a3a4a] rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${getBarColor(value, max)}`}
                    style={{
                        width: `${getPercentage(value, max)}%`
                    }}
                />
            </div>
            <div className="flex justify-between mt-1">
                <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                    0{unit}
                </span>
                <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                    {max}{unit}
                </span>
            </div>
        </div>
    );

    return (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl hover:border-[#4a9aff] transition-all duration-300 hover:shadow-lg hover:shadow-[#4a9aff]/5 hover:-translate-y-0.5">
            {/* Header */}
            <div className="p-5 border-b border-[#2a3a4a]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#2a4a6a] flex items-center justify-center border border-[#3a5a7a]">
                            <PiFactoryFill className="text-[#4a9aff] text-lg" />
                        </div>
                        <div>
                            <h2 className="text-white font-['Segoe_UI','Arial',sans-serif] font-bold text-sm tracking-wider">
                                {machine.machineCode}
                            </h2>
                            <p className="text-[#6a8a9a] text-[10px] font-['Segoe_UI','Arial',sans-serif] uppercase tracking-wider">
                                {machine.type || "Machine Unit"}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(currentMetrics.status)} ${getStatusDot(currentMetrics.status)}`}></span>
                        <span className={`text-[10px] font-['Segoe_UI','Arial',sans-serif] font-semibold ${getStatusTextColor(currentMetrics.status)}`}>
                            {currentMetrics.status.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="p-5 space-y-3">
                <Metric
                    icon={<FaTemperatureHigh />}
                    title="Temperature"
                    value={currentMetrics.temperature}
                    displayValue={`${currentMetrics.temperature.toFixed(1)}°C`}
                    max={machine.maxTemperature}
                    iconColor="text-red-400"
                    unit="°C"
                />

                <Metric
                    icon={<GiPressureCooker />}
                    title="Pressure"
                    value={currentMetrics.pressure}
                    displayValue={`${currentMetrics.pressure.toFixed(1)} bar`}
                    max={machine.maxPressure}
                    iconColor="text-cyan-400"
                    unit=" bar"
                />

                    <Metric
                        icon={<FaTachometerAlt />}
                        title="RPM"
                        value={currentMetrics.rpm}
                        displayValue={currentMetrics.rpm}
                        max={machine.maxRPM}
                        iconColor="text-orange-400"
                        unit=""
                    />

                    <Metric
                        icon={<FaBolt />}
                        title="Power"
                        value={currentMetrics.power}
                        displayValue={`${currentMetrics.power.toFixed(1)} kW`}
                        max={machine.maxPower}
                        iconColor="text-yellow-400"
                        unit=" kW"
                    />
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-[#2a3a4a] flex items-center justify-between bg-[#0d1624] rounded-b-xl">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <FiActivity className="text-[#4a9aff] text-xs" />
                        <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold">
                            PROD
                        </span>
                        <span className="text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-bold">
                            {currentMetrics.productionCount}
                        </span>
                    </div>
                    <div className="w-px h-4 bg-[#2a3a4a]"></div>
                    <div className="flex items-center gap-1.5">
                        <FiCpu className="text-[#4a9aff] text-xs" />
                        <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold">
                            EFF
                        </span>
                        <span className="text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-bold">
                            {Math.round((currentMetrics.productionCount / 100) * 100)}%
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <FiAlertCircle className="text-[#4a5a6a] text-[10px]" />
                    <span className="text-[9px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                        {new Date(currentMetrics.lastUpdated).toLocaleTimeString()}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MachineCard;