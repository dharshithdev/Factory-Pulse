import { NavLink } from "react-router-dom";
import { MdFactory } from "react-icons/md";
import { HiSignal } from "react-icons/hi2";
import { RiDashboardFill } from "react-icons/ri";
import { FaCogs } from "react-icons/fa";

function Navbar() {

    const activeClass =
        "text-white bg-blue-600";

    const inactiveClass =
        "text-slate-300 hover:text-white hover:bg-slate-700";

    return (

        <header className="sticky top-0 z-50 bg-[#111827]/90 backdrop-blur-md border-b border-slate-700">

            <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

                <div className="flex items-center gap-10">

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">

                            <MdFactory
                                size={28}
                                className="text-white"
                            />

                        </div>

                        <div>

                            <h1 className="text-2xl font-bold text-white">

                                FactoryPulse

                            </h1>

                            <p className="text-sm text-slate-400">

                                Smart Manufacturing Monitoring Platform

                            </p>

                        </div>

                    </div>

                    <nav className="flex items-center gap-3">

                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                                    isActive
                                        ? activeClass
                                        : inactiveClass
                                }`
                            }
                        >

                            <RiDashboardFill />

                            Dashboard

                        </NavLink>

                        <NavLink
                            to="/machines"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                                    isActive
                                        ? activeClass
                                        : inactiveClass
                                }`
                            }
                        >

                            <FaCogs />

                            Machines

                        </NavLink>

                    </nav>

                </div>

                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/15 border border-green-500/30">

                    <HiSignal
                        className="text-green-400 animate-pulse"
                        size={18}
                    />

                    <span className="text-green-400 font-semibold">

                        LIVE

                    </span>

                </div>

            </div>

        </header>

    );

}

export default Navbar;