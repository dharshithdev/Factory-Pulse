import { FaTimes } from "react-icons/fa";
import { FiCpu } from "react-icons/fi";
import MachineForm from "./MachineForm";
import { useEffect, useState } from "react";

function MachineModal({
    machine,
    onClose,
    onSuccess
}) {
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

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-2xl bg-[#1a2332] border border-[#2a3a4a] rounded-xl shadow-2xl animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a3a4a] bg-[#0d1624] rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#2a4a6a] flex items-center justify-center border border-[#3a5a7a]">
                            <FiCpu className="text-[#4a9aff] text-lg" />
                        </div>
                        <div>
                            <h2 className="text-white font-['Segoe_UI','Arial',sans-serif] font-bold text-lg tracking-tight">
                                {machine ? "Edit Machine" : "Register New Machine"}
                            </h2>
                            <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-xs">
                                {machine 
                                    ? "Update machine configuration and parameters" 
                                    : "Add a new machine to the production line"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-[#2a3a4a] text-[#6a8a9a] hover:text-white transition-all duration-200"
                        title="Close"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <MachineForm
                        machine={machine}
                        onClose={onClose}
                        onSuccess={onSuccess}
                    />
                </div>

                {/* Footer - Optional status bar */}
                <div className="px-6 py-2 border-t border-[#2a3a4a] bg-[#0d1624] rounded-b-xl flex items-center justify-between">
                    <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                        {machine ? 'Editing existing machine' : 'Creating new machine'}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-green-500"></span>
                        <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                            SYSTEM READY
                        </span>
                    </div>
                </div>
            </div>

            {/* Add animation keyframes - Add this to your global CSS or tailwind config */}
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

export default MachineModal;