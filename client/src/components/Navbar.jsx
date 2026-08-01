import { FiBell, FiSearch } from "react-icons/fi";

function Navbar() {

    return (

        <header className="h-20 bg-[#111827] border-b border-slate-700 flex items-center justify-between px-8">

            <div>

                <h1 className="text-3xl font-bold text-white">

                    Factory Dashboard

                </h1>

                <p className="text-slate-400 text-sm mt-1">

                    Monitor production and machine health in real time.

                </p>

            </div>

            <div className="flex items-center gap-5">

                <button className="relative text-slate-400 hover:text-white transition">

                    <FiSearch size={22} />

                </button>

                <button className="relative text-slate-400 hover:text-white transition">

                    <FiBell size={22} />

                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>

                </button>

                <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">

                        A

                    </div>

                    <div>

                        <p className="text-white font-semibold">

                            Admin

                        </p>

                        <p className="text-slate-400 text-xs">

                            Factory Manager

                        </p>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Navbar;