import { FiSearch } from "react-icons/fi";

function AlertFilter({
    search,
    setSearch,
    status,
    setStatus,
    severity,
    setSeverity
}) {

    return (

        <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6 flex flex-col lg:flex-row gap-4">

            <div className="relative flex-1">

                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by machine..."
                    className="w-full bg-[#0F172A] border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />

            </div>

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            >

                <option value="ALL">All Status</option>

                <option value="ACTIVE">ACTIVE</option>

                <option value="RESOLVED">RESOLVED</option>

            </select>

            <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
            >

                <option value="ALL">All Severity</option>

                <option value="WARNING">WARNING</option>

                <option value="CRITICAL">CRITICAL</option>

            </select>

        </div>

    );

}

export default AlertFilter;