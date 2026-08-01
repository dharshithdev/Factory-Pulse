import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { getMachineHistory } from "../../services/sensorReading.service";

function HistoryModal({ machine, onClose }) {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        const loadHistory = async () => {

            try {

                const data = await getMachineHistory(machine._id);
                setHistory(data);

            } catch (error) {

                console.error(error);

            }

        };

        loadHistory();

    }, [machine]);

    return (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-[#1E293B] w-5/6 max-w-6xl rounded-2xl border border-slate-700">

                <div className="flex items-center justify-between p-6 border-b border-slate-700">

                    <div>

                        <h2 className="text-2xl font-bold text-white">
                            {machine.machineCode} History
                        </h2>

                        <p className="text-slate-400">
                            Recent Sensor Readings
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white"
                    >

                        <IoClose size={28}/>

                    </button>

                </div>

                <div className="max-h-[600px] overflow-y-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-slate-700">

                                <th className="py-4">Time</th>
                                <th>Temp</th>
                                <th>Pressure</th>
                                <th>RPM</th>
                                <th>Power</th>
                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                history.map((reading) => (

                                    <tr
                                        key={reading._id}
                                        className="border-b border-slate-800 text-center"
                                    >

                                        <td className="py-4 text-slate-300">

                                            {new Date(reading.createdAt).toLocaleString()}

                                        </td>

                                        <td>{reading.temperature} °C</td>

                                        <td>{reading.pressure} PSI</td>

                                        <td>{reading.rpm}</td>

                                        <td>{reading.power} kW</td>

                                        <td>{reading.status}</td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default HistoryModal;