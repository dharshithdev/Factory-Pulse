import { useEffect, useState } from "react";
import { createMachine, updateMachine } from "../../services/machine.services";
import { FiSave, FiX, FiCpu, FiSettings, FiAlertCircle } from "react-icons/fi";

function MachineForm({
    machine,
    onClose,
    onSuccess
}) {
    const [formData, setFormData] = useState({
        machineCode: "",
        maxTemperature: "",
        maxPressure: "",
        maxRPM: "",
        maxPower: "",
        maxProductionPerMinute: ""
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!machine) return;

        setFormData({
            machineCode: machine.machineCode,
            maxTemperature: machine.maxTemperature,
            maxPressure: machine.maxPressure,
            maxRPM: machine.maxRPM,
            maxPower: machine.maxPower,
            maxProductionPerMinute: machine.maxProductionPerMinute
        });
    }, [machine]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error for this field
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        const fields = [
            { key: 'machineCode', label: 'Machine Code' },
            { key: 'maxTemperature', label: 'Max Temperature' },
            { key: 'maxPressure', label: 'Max Pressure' },
            { key: 'maxRPM', label: 'Max RPM' },
            { key: 'maxPower', label: 'Max Power' },
            { key: 'maxProductionPerMinute', label: 'Max Production' }
        ];

        fields.forEach(({ key, label }) => {
            if (!formData[key] || formData[key].toString().trim() === '') {
                newErrors[key] = `${label} is required`;
            } else if (key !== 'machineCode' && isNaN(Number(formData[key]))) {
                newErrors[key] = `${label} must be a valid number`;
            } else if (key !== 'machineCode' && Number(formData[key]) <= 0) {
                newErrors[key] = `${label} must be greater than 0`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            const payload = {
                ...formData,
                maxTemperature: Number(formData.maxTemperature),
                maxPressure: Number(formData.maxPressure),
                maxRPM: Number(formData.maxRPM),
                maxPower: Number(formData.maxPower),
                maxProductionPerMinute: Number(formData.maxProductionPerMinute)
            };

            if (machine) {
                await updateMachine(machine._id, payload);
            } else {
                await createMachine(payload);
            }

            onSuccess();
            onClose();

        } catch (error) {
            console.error(error);
            alert(
                error?.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#1a2332] rounded-xl border border-[#2a3a4a] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#2a3a4a] bg-[#0d1624] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#2a4a6a] flex items-center justify-center border border-[#3a5a7a]">
                        <FiCpu className="text-[#4a9aff] text-sm" />
                    </div>
                    <div>
                        <h3 className="text-white font-['Segoe_UI','Arial',sans-serif] font-semibold text-sm tracking-wide">
                            {machine ? 'Edit Machine' : 'Register New Machine'}
                        </h3>
                        <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-[10px]">
                            {machine ? 'Update machine specifications' : 'Configure new machine parameters'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg hover:bg-[#2a3a4a] text-[#6a8a9a] hover:text-white transition-colors"
                >
                    <FiX size={18} />
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Machine Code */}
                    <div>
                        <label className="block text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider mb-1.5">
                            Machine Code
                        </label>
                        <input
                            type="text"
                            name="machineCode"
                            value={formData.machineCode}
                            onChange={handleChange}
                            disabled={!!machine}
                            required
                            placeholder="e.g., MACH-001"
                            className={`w-full bg-[#0d1624] border ${errors.machineCode ? 'border-red-500' : 'border-[#2a3a4a]'} rounded-lg px-3 py-2 text-white font-['Segoe_UI','Arial',sans-serif] text-sm outline-none focus:border-[#4a9aff] transition-colors disabled:opacity-60 disabled:cursor-not-allowed placeholder:text-[#4a5a6a]`}
                        />
                        {errors.machineCode && (
                            <p className="mt-1 text-[10px] text-red-400 font-['Segoe_UI','Arial',sans-serif] flex items-center gap-1">
                                <FiAlertCircle size={10} />
                                {errors.machineCode}
                            </p>
                        )}
                    </div>

                    {/* Max Temperature */}
                    <div>
                        <label className="block text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider mb-1.5">
                            Max Temperature (°C)
                        </label>
                        <input
                            type="number"
                            name="maxTemperature"
                            value={formData.maxTemperature}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 100"
                            className={`w-full bg-[#0d1624] border ${errors.maxTemperature ? 'border-red-500' : 'border-[#2a3a4a]'} rounded-lg px-3 py-2 text-white font-['Segoe_UI','Arial',sans-serif] text-sm outline-none focus:border-[#4a9aff] transition-colors placeholder:text-[#4a5a6a]`}
                        />
                        {errors.maxTemperature && (
                            <p className="mt-1 text-[10px] text-red-400 font-['Segoe_UI','Arial',sans-serif] flex items-center gap-1">
                                <FiAlertCircle size={10} />
                                {errors.maxTemperature}
                            </p>
                        )}
                    </div>

                    {/* Max Pressure */}
                    <div>
                        <label className="block text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider mb-1.5">
                            Max Pressure (PSI)
                        </label>
                        <input
                            type="number"
                            name="maxPressure"
                            value={formData.maxPressure}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 150"
                            className={`w-full bg-[#0d1624] border ${errors.maxPressure ? 'border-red-500' : 'border-[#2a3a4a]'} rounded-lg px-3 py-2 text-white font-['Segoe_UI','Arial',sans-serif] text-sm outline-none focus:border-[#4a9aff] transition-colors placeholder:text-[#4a5a6a]`}
                        />
                        {errors.maxPressure && (
                            <p className="mt-1 text-[10px] text-red-400 font-['Segoe_UI','Arial',sans-serif] flex items-center gap-1">
                                <FiAlertCircle size={10} />
                                {errors.maxPressure}
                            </p>
                        )}
                    </div>

                    {/* Max RPM */}
                    <div>
                        <label className="block text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider mb-1.5">
                            Max RPM
                        </label>
                        <input
                            type="number"
                            name="maxRPM"
                            value={formData.maxRPM}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 3600"
                            className={`w-full bg-[#0d1624] border ${errors.maxRPM ? 'border-red-500' : 'border-[#2a3a4a]'} rounded-lg px-3 py-2 text-white font-['Segoe_UI','Arial',sans-serif] text-sm outline-none focus:border-[#4a9aff] transition-colors placeholder:text-[#4a5a6a]`}
                        />
                        {errors.maxRPM && (
                            <p className="mt-1 text-[10px] text-red-400 font-['Segoe_UI','Arial',sans-serif] flex items-center gap-1">
                                <FiAlertCircle size={10} />
                                {errors.maxRPM}
                            </p>
                        )}
                    </div>

                    {/* Max Power */}
                    <div>
                        <label className="block text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider mb-1.5">
                            Max Power (kW)
                        </label>
                        <input
                            type="number"
                            name="maxPower"
                            value={formData.maxPower}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 50"
                            className={`w-full bg-[#0d1624] border ${errors.maxPower ? 'border-red-500' : 'border-[#2a3a4a]'} rounded-lg px-3 py-2 text-white font-['Segoe_UI','Arial',sans-serif] text-sm outline-none focus:border-[#4a9aff] transition-colors placeholder:text-[#4a5a6a]`}
                        />
                        {errors.maxPower && (
                            <p className="mt-1 text-[10px] text-red-400 font-['Segoe_UI','Arial',sans-serif] flex items-center gap-1">
                                <FiAlertCircle size={10} />
                                {errors.maxPower}
                            </p>
                        )}
                    </div>

                    {/* Max Production */}
                    <div>
                        <label className="block text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider mb-1.5">
                            Max Production / Min
                        </label>
                        <input
                            type="number"
                            name="maxProductionPerMinute"
                            value={formData.maxProductionPerMinute}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 100"
                            className={`w-full bg-[#0d1624] border ${errors.maxProductionPerMinute ? 'border-red-500' : 'border-[#2a3a4a]'} rounded-lg px-3 py-2 text-white font-['Segoe_UI','Arial',sans-serif] text-sm outline-none focus:border-[#4a9aff] transition-colors placeholder:text-[#4a5a6a]`}
                        />
                        {errors.maxProductionPerMinute && (
                            <p className="mt-1 text-[10px] text-red-400 font-['Segoe_UI','Arial',sans-serif] flex items-center gap-1">
                                <FiAlertCircle size={10} />
                                {errors.maxProductionPerMinute}
                            </p>
                        )}
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#2a3a4a]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-[#2a3a4a] hover:bg-[#3a4a5a] text-[#8a9aaa] hover:text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-medium transition-all duration-200"
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-[#2a4a6a] hover:bg-[#3a5a7a] text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <FiSave size={16} />
                                {machine ? 'Update Machine' : 'Create Machine'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MachineForm;