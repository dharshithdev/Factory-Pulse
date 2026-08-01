import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiServer, FiRefreshCw, FiActivity } from "react-icons/fi";
import MainLayout from "../layouts/MainLayout";
import MachineTable from "../components/machines/MachineTable";
import MachineModal from "../components/machines/MachineModal";
import { getMachines, toggleMachineStatus, deleteMachine } from "../services/machine.services";
import socket from "../socket/socket";
import HistoryModal from "../components/machines/HistoryModel";

function Machines() {
    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const loadMachines = async () => {
        try {
            const response = await getMachines();
            setMachines(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleHistory = (machine) => {
        setSelectedMachine(machine);
        setShowHistoryModal(true);
    };

    const closeHistoryModal = () => {
        setSelectedMachine(null);
        setShowHistoryModal(false);
    };

    useEffect(() => {
        loadMachines();

        socket.on("machineUpdated", (updatedMachine) => {
            setMachines((previousMachines) =>
                previousMachines.map((machine) =>
                    machine._id === updatedMachine._id
                        ? updatedMachine
                        : machine
                )
            );
        });

        return () => {
            socket.off("machineUpdated");
        };
    }, []);

    const handleAddMachine = () => {
        setSelectedMachine(null);
        setShowModal(true);
    };

    const handleEditMachine = (machine) => {
        setSelectedMachine(machine);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMachine(null);
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadMachines();
        setTimeout(() => setRefreshing(false), 500);
    };

    const handleToggleMachine = async (id) => {
        try {
            await toggleMachineStatus(id);
            loadMachines();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteMachine = async (id) => {
        const confirmed = window.confirm(
            "Delete this machine permanently?"
        );

        if (!confirmed) return;

        try {
            await deleteMachine(id);
            loadMachines();
        } catch (error) {
            console.error(error);
        }
    };

    const runningCount = machines.filter(m => m.isActive && m.currentMetrics?.status === "Running").length;
    const totalCount = machines.length;

    return (
        <MainLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
                            Machines
                        </h1>
                        <p className="text-[#6a8a9a] mt-1 font-['Segoe_UI','Arial',sans-serif] text-sm">
                            Manage machines and configure threshold values
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* Stats Badge */}
                        <div className="hidden md:flex items-center gap-4 px-3 py-1.5 bg-[#0d1624] rounded-lg border border-[#2a3a4a]">
                            <div className="flex items-center gap-1.5">
                                <FiServer className="text-[#4a9aff] text-xs" />
                                <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
                                    Total: <span className="text-white font-semibold">{totalCount}</span>
                                </span>
                            </div>
                            <div className="w-px h-4 bg-[#2a3a4a]"></div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
                                    Running: {runningCount}
                                </span>
                            </div>
                        </div>

                        {/* Refresh Button */}
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="p-2.5 rounded-lg bg-[#2a3a4a] hover:bg-[#3a4a5a] text-[#8a9aaa] hover:text-white transition-all duration-200 disabled:opacity-50"
                            title="Refresh Machines"
                        >
                            <FiRefreshCw className={`text-sm ${refreshing ? 'animate-spin' : ''}`} />
                        </button>

                        {/* Add Machine Button */}
                        <button
                            onClick={handleAddMachine}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2a4a6a] hover:bg-[#3a5a7a] text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-medium transition-all duration-200"
                        >
                            <FaPlus size={14} />
                            <span>Add Machine</span>
                        </button>
                    </div>
                </div>

                {/* Machine Table */}
                <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <div className="w-12 h-12 rounded-lg bg-[#2a4a6a] flex items-center justify-center mx-auto border border-[#3a5a7a] animate-pulse">
                                    <FiActivity className="text-[#4a9aff] text-2xl" />
                                </div>
                                <p className="mt-4 text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm">
                                    Loading machines...
                                </p>
                            </div>
                        </div>
                    ) : (
                        <MachineTable
                            machines={machines}
                            onEdit={handleEditMachine}
                            onToggle={handleToggleMachine}
                            onDelete={handleDeleteMachine}
                            onHistory={handleHistory}
                        />
                    )}
                </div>
            </div>

            {/* Modals */}
            {showModal && (
                <MachineModal
                    machine={selectedMachine}
                    onClose={handleCloseModal}
                    onSuccess={handleRefresh}
                />
            )}

            {showHistoryModal && selectedMachine && (
                <HistoryModal
                    machine={selectedMachine}
                    onClose={closeHistoryModal}
                />
            )}
        </MainLayout>
    );
}

export default Machines;