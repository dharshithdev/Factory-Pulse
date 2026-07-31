import { FaTimes } from "react-icons/fa";
import MachineForm from "./MachineForm";

function MachineModal({
    machine,
    onClose,
    onSuccess
}) {

    return (

        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >

            <div
                className="w-full max-w-2xl bg-[#1E293B] border border-slate-700 rounded-2xl shadow-2xl animate-[fadeIn_.25s_ease]"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-700">

                    <div>

                        <h2 className="text-2xl font-bold text-white">

                            {
                                machine
                                    ? "Edit Machine"
                                    : "Add Machine"
                            }

                        </h2>

                        <p className="text-slate-400 mt-1">

                            {
                                machine
                                    ? "Update machine configuration."
                                    : "Create a new production machine."
                            }

                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition text-xl"
                    >

                        <FaTimes />

                    </button>

                </div>

                <div className="p-8">

                    <MachineForm
                        machine={machine}
                        onClose={onClose}
                        onSuccess={onSuccess}
                    />

                </div>

            </div>

        </div>

    );

}

export default MachineModal;