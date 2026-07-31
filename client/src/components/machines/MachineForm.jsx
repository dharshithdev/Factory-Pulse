import { useEffect, useState } from "react";
import { createMachine, updateMachine } from "../../services/machine.services";

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

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

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
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            <div className="grid grid-cols-2 gap-5">

                <div>

                    <label className="block text-slate-300 mb-2">
                        Machine Code
                    </label>

                    <input
                        type="text"
                        name="machineCode"
                        value={formData.machineCode}
                        onChange={handleChange}
                        disabled={!!machine}
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 disabled:opacity-60"
                    />

                </div>

                <div>

                    <label className="block text-slate-300 mb-2">
                        Max Temperature (°C)
                    </label>

                    <input
                        type="number"
                        name="maxTemperature"
                        value={formData.maxTemperature}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                    />

                </div>

                <div>

                    <label className="block text-slate-300 mb-2">
                        Max Pressure
                    </label>

                    <input
                        type="number"
                        name="maxPressure"
                        value={formData.maxPressure}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                    />

                </div>

                <div>

                    <label className="block text-slate-300 mb-2">
                        Max RPM
                    </label>

                    <input
                        type="number"
                        name="maxRPM"
                        value={formData.maxRPM}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                    />

                </div>

                <div>

                    <label className="block text-slate-300 mb-2">
                        Max Power
                    </label>

                    <input
                        type="number"
                        name="maxPower"
                        value={formData.maxPower}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                    />

                </div>

                <div>

                    <label className="block text-slate-300 mb-2">
                        Max Production / Min
                    </label>

                    <input
                        type="number"
                        name="maxProductionPerMinute"
                        value={formData.maxProductionPerMinute}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                    />

                </div>

            </div>

            <div className="flex justify-end gap-3 pt-4">

                <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition"
                >

                    Cancel

                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-60"
                >

                    {
                        loading
                            ? "Saving..."
                            : machine
                                ? "Update Machine"
                                : "Create Machine"
                    }

                </button>

            </div>

        </form>

    );

}

export default MachineForm;