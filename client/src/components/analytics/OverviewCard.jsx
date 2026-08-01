import { PiFactoryFill } from "react-icons/pi";
import { MdOutlineWarningAmber } from "react-icons/md";
import { FaIndustry } from "react-icons/fa";
import { HiOutlineCube } from "react-icons/hi";

function OverviewCards({ data }) {

    const cards = [

        {
            title: "Total Machines",
            value: data.totalMachines,
            icon: <PiFactoryFill size={26}/>,
            color: "from-blue-500 to-cyan-500",
            shadow: "shadow-blue-500/20"
        },

        {
            title: "Active Machines",
            value: data.activeMachines,
            icon: <FaIndustry size={24}/>,
            color: "from-green-500 to-emerald-500",
            shadow: "shadow-green-500/20"
        },

        {
            title: "Production",
            value: data.totalProduction,
            icon: <HiOutlineCube size={26}/>,
            color: "from-purple-500 to-pink-500",
            shadow: "shadow-purple-500/20"
        },

        {
            title: "Active Alerts",
            value: data.activeAlerts,
            icon: <MdOutlineWarningAmber size={26}/>,
            color: "from-orange-500 to-red-500",
            shadow: "shadow-red-500/20"
        }

    ];

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {

                cards.map((card) => (

                    <div
                        key={card.title}
                        className={`relative overflow-hidden rounded-2xl bg-[#1E293B] border border-slate-700 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-500 hover:shadow-2xl ${card.shadow}`}
                    >

                        <div
                            className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${card.color}`}
                        />

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-400 text-sm">

                                    {card.title}

                                </p>

                                <h2 className="text-4xl font-bold text-white mt-3">

                                    {card.value}

                                </h2>

                            </div>

                            <div
                                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-xl`}
                            >

                                {card.icon}

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default OverviewCards;