import { FiSearch, FiFilter, FiX, FiActivity } from "react-icons/fi";

function AlertFilter({
    search,
    setSearch,
    status,
    setStatus,
    severity,
    setSeverity
}) {
    const clearFilters = () => {
        setSearch("");
        setStatus("ALL");
        setSeverity("ALL");
    };

    const hasActiveFilters = search !== "" || status !== "ALL" || severity !== "ALL";

    return (
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-2.5 border-b border-[#2a3a4a] bg-[#0d1624] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FiFilter className="text-[#4a9aff] text-sm" />
                    <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                        Filter Alerts
                    </span>
                    {hasActiveFilters && (
                        <span className="text-[9px] text-[#4a9aff] font-['Segoe_UI','Arial',sans-serif] bg-[#2a4a6a] px-1.5 py-0.5 rounded">
                            Active
                        </span>
                    )}
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-1 text-[10px] text-[#6a8a9a] hover:text-white transition-colors font-['Segoe_UI','Arial',sans-serif]"
                    >
                        <FiX size={12} />
                        Clear All
                    </button>
                )}
            </div>

            {/* Filters */}
            <div className="p-4 flex flex-col lg:flex-row gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5a6a] text-sm" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by machine code..."
                        className="w-full bg-[#0d1624] border border-[#2a3a4a] rounded-lg pl-9 pr-3 py-2 text-white font-['Segoe_UI','Arial',sans-serif] text-sm placeholder:text-[#4a5a6a] focus:outline-none focus:border-[#4a9aff] transition-colors"
                    />
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-[9px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider whitespace-nowrap">
                        Status
                    </span>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="bg-[#0d1624] border border-[#2a3a4a] rounded-lg px-3 py-2 text-white font-['Segoe_UI','Arial',sans-serif] text-sm focus:outline-none focus:border-[#4a9aff] transition-colors min-w-[120px] cursor-pointer"
                    >
                        <option value="ALL">All Status</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="RESOLVED">RESOLVED</option>
                    </select>
                </div>

                {/* Severity Filter */}
                <div className="flex items-center gap-2">
                    <span className="text-[9px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif'] font-semibold uppercase tracking-wider whitespace-nowrap">
                        Severity
                    </span>
                    <select
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value)}
                        className="bg-[#0d1624] border border-[#2a3a4a] rounded-lg px-3 py-2 text-white font-['Segoe_UI','Arial',sans-serif] text-sm focus:outline-none focus:border-[#4a9aff] transition-colors min-w-[120px] cursor-pointer"
                    >
                        <option value="ALL">All Severity</option>
                        <option value="WARNING">WARNING</option>
                        <option value="CRITICAL">CRITICAL</option>
                    </select>
                </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                    {search && (
                        <span className="inline-flex items-center gap-1 text-[9px] text-[#8a9aaa] bg-[#0d1624] px-2 py-0.5 rounded border border-[#2a3a4a] font-['Segoe_UI','Arial',sans-serif]">
                            Search: <span className="text-white">{search}</span>
                            <button
                                onClick={() => setSearch("")}
                                className="hover:text-white transition-colors"
                            >
                                <FiX size={10} />
                            </button>
                        </span>
                    )}
                    {status !== "ALL" && (
                        <span className="inline-flex items-center gap-1 text-[9px] text-[#8a9aaa] bg-[#0d1624] px-2 py-0.5 rounded border border-[#2a3a4a] font-['Segoe_UI','Arial',sans-serif]">
                            Status: <span className="text-white">{status}</span>
                            <button
                                onClick={() => setStatus("ALL")}
                                className="hover:text-white transition-colors"
                            >
                                <FiX size={10} />
                            </button>
                        </span>
                    )}
                    {severity !== "ALL" && (
                        <span className="inline-flex items-center gap-1 text-[9px] text-[#8a9aaa] bg-[#0d1624] px-2 py-0.5 rounded border border-[#2a3a4a] font-['Segoe_UI','Arial',sans-serif]">
                            Severity: <span className="text-white">{severity}</span>
                            <button
                                onClick={() => setSeverity("ALL")}
                                className="hover:text-white transition-colors"
                            >
                                <FiX size={10} />
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default AlertFilter;