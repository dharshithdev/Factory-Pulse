import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import MachineTable from "../components/machines/MachineTable";
import MachineModal from "../components/machines/MachineModal";
import {getMachines, toggleMachineStatus, deleteMachine} from "../services/machine.services";
import socket from "../socket/socket";
import HistoryModal from "../components/machines/HistoryModel";

function Machines() {

    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);

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

    const handleRefresh = () => {

        loadMachines();

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

    if (!confirmed) {
        return;
    }

    try {

        await deleteMachine(id);

        loadMachines();

    } catch (error) {

        console.error(error);

    }

};

    return (

        <MainLayout>

            <div className="space-y-8">

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-4xl font-bold text-white">
                            Machines
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Manage machines and configure threshold values.
                        </p>

                    </div>

                    <button
                        onClick={handleAddMachine}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
                    >

                        <FaPlus />

                        <span>
                            Add Machine
                        </span>

                    </button>

                </div>

                <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6">

                    {

                        loading ?

                            <div className="text-center text-slate-400 py-16">

                                Loading Machines...

                            </div>

                            :

                            <MachineTable
                                machines={machines}
                                onEdit={handleEditMachine}
                                onToggle={handleToggleMachine}
                                onDelete={handleDeleteMachine}
                                onHistory={handleHistory}
                            />

                    }

                </div>

            </div>

            {

                showModal &&

                <MachineModal
                    machine={selectedMachine}
                    onClose={handleCloseModal}
                    onSuccess={handleRefresh}
                />

            }
            {
    showHistoryModal && selectedMachine && (
        <HistoryModal
            machine={selectedMachine}
            onClose={closeHistoryModal}
        />
    )
}
        </MainLayout>

    );

}

export default Machines;