import { FaTemperatureHigh, FaBolt, FaTachometerAlt } from "react-icons/fa";
import { GiPressureCooker } from "react-icons/gi";
import { PiFactoryFill } from "react-icons/pi";

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

    const getPercentage = (value, max) => {
        if (!max || max <= 0) return 0;
        return Math.min((value / max) * 100, 100);
    };

    const Metric = ({
        icon,
        title,
        value,
        displayValue,
        max,
        iconColor,
        barColor
    }) => (
        <div>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className={`text-lg ${iconColor}`}>{icon}</span>
                    <span className="text-slate-300 text-sm">{title}</span>
                </div>

                <span className="text-white font-semibold">
                    {displayValue}
                </span>
            </div>

            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{
                        width: `${getPercentage(value, max)}%`
                    }}
                />
            </div>
        </div>
    );

    return (
        <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(37,99,235,0.25)]">

            <div className="flex items-center justify-between mb-6">

                <div>
                    <h2 className="text-2xl font-bold text-white">
                        {machine.machineCode}
                    </h2>

                    <p className="text-slate-400 text-sm mt-1">
                        Machine Monitoring
                    </p>
                </div>

                <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getStatusColor(currentMetrics.status)}`}>
                    {currentMetrics.status}
                </span>

            </div>

            <div className="space-y-5">

                <Metric
                    icon={<FaTemperatureHigh />}
                    title="Temperature"
                    value={currentMetrics.temperature}
                    displayValue={`${currentMetrics.temperature.toFixed(1)}°C`}
                    max={machine.maxTemperature}
                    iconColor="text-red-400"
                    barColor="bg-red-400"
                />

                <Metric
                    icon={<GiPressureCooker />}
                    title="Pressure"
                    value={currentMetrics.pressure}
                    displayValue={`${currentMetrics.pressure.toFixed(1)} bar`}
                    max={machine.maxPressure}
                    iconColor="text-cyan-400"
                    barColor="bg-cyan-400"
                />

                <Metric
                    icon={<FaTachometerAlt />}
                    title="RPM"
                    value={currentMetrics.rpm}
                    displayValue={currentMetrics.rpm}
                    max={machine.maxRPM}
                    iconColor="text-orange-400"
                    barColor="bg-orange-400"
                />

                <Metric
                    icon={<FaBolt />}
                    title="Power"
                    value={currentMetrics.power}
                    displayValue={`${currentMetrics.power.toFixed(1)} kW`}
                    max={machine.maxPower}
                    iconColor="text-yellow-400"
                    barColor="bg-yellow-400"
                />

            </div>

            <div className="mt-8 pt-5 border-t border-slate-700 flex items-center justify-between">

                <div className="flex items-center gap-2 text-slate-300">
                    <PiFactoryFill className="text-blue-400"/>
                    <span>Production</span>
                </div>

                <span className="text-2xl font-bold text-white">
                    {currentMetrics.productionCount}
                </span>

            </div>

            <p className="mt-5 text-xs text-slate-500">
                Last Updated • {new Date(currentMetrics.lastUpdated).toLocaleTimeString()}
            </p>

        </div>
    );
}

export default MachineCard;