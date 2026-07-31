import { MdFactory } from "react-icons/md";
import { HiSignal } from "react-icons/hi2";

function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-[#111827]/90 backdrop-blur-md border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-8 h-18 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <MdFactory size={28} className="text-white"/>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-wide text-white">FactoryPulse</h1>
                        <p className="text-sm text-slate-400">Smart Manufacturing Monitoring Platform</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/15 border border-green-500/30">
                    <HiSignal className="text-green-400 animate-pulse" size={18}/>
                    <span className="text-green-400 font-semibold tracking-wide">LIVE</span>
                </div>
            </div>
        </header>
    );
}

export default Navbar;