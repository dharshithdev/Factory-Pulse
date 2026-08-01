import { FiBell, FiSearch, FiChevronDown, FiSettings, FiUser, FiHelpCircle, FiActivity } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Navbar() {
    const location = useLocation();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const menuRef = useRef(null);

    const pageDetails = {
        "/": {
            title: "Dashboard",
            subtitle: "Monitor production and machine health in real time.",
            icon: "📊"
        },
        "/machines": {
            title: "Machines",
            subtitle: "Manage machines and configure threshold values.",
            icon: "🏭"
        },
        "/production": {
            title: "Production",
            subtitle: "Monitor production lines and output metrics.",
            icon: "⚙️"
        },
        "/analytics": {
            title: "Analytics",
            subtitle: "Analyze production trends and factory performance.",
            icon: "📈"
        },
        "/alerts": {
            title: "Alerts",
            subtitle: "View and manage system notifications and warnings.",
            icon: "🔔"
        },
        "/system": {
            title: "System",
            subtitle: "Monitor system health and performance metrics.",
            icon: "🖥️"
        },
        "/settings": {
            title: "Settings",
            subtitle: "Configure system preferences and user permissions.",
            icon: "⚙️"
        }
    };

    const currentPage = pageDetails[location.pathname] || {
        title: "FactoryPulse",
        subtitle: "Smart Manufacturing Platform",
        icon: "⚡"
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="h-16 bg-[#1a2332] border-b border-[#2a3a4a] flex items-center justify-between px-6">
            {/* Left Section - Page Title */}
            <div className="flex items-center gap-3">
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight">
                        {currentPage.title}
                    </h1>
                    <p className="text-[#6a8a9a] text-xs hidden md:block">
                        {currentPage.subtitle}
                    </p>
                </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                    searchFocused 
                        ? "bg-[#0d1624] ring-1 ring-[#4a9aff] w-56" 
                        : "bg-[#0d1624] w-40 hover:bg-[#2a3a4a]"
                } border border-[#2a3a4a]`}>
                    <FiSearch className={`transition-colors ${
                        searchFocused ? "text-[#4a9aff]" : "text-[#6a8a9a]"
                    }`} size={16} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent text-white placeholder-[#4a5a6a] outline-none w-full text-xs font-mono"
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                    />
                    <kbd className="hidden sm:block text-[10px] text-[#4a5a6a] bg-[#2a3a4a] px-1.5 py-0.5 rounded font-mono">
                        ⌘K
                    </kbd>
                </div>

                {/* Mobile Search */}
                <button className="md:hidden text-[#6a8a9a] hover:text-white transition p-1.5 rounded-lg hover:bg-[#2a3a4a]">
                    <FiSearch size={18} />
                </button>

                {/* Notification Bell */}
                <button className="relative text-[#6a8a9a] hover:text-white transition p-1.5 rounded-lg hover:bg-[#2a3a4a]">
                    <FiBell size={18} />
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#1a2332]"></span>
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold font-mono">
                        3
                    </span>
                </button>

                {/* User Profile */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-2 hover:bg-[#2a3a4a] rounded-lg px-2 py-1.5 transition-all duration-200 group border border-transparent hover:border-[#2a3a4a]"
                    >
                        <div className="w-8 h-8 rounded-lg bg-[#2a4a6a] flex items-center justify-center text-white font-bold text-xs shadow-sm border border-[#3a5a7a]">
                            A
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-white font-medium text-xs">
                                Admin User
                            </p>
                            <p className="text-[#6a8a9a] text-[10px] font-mono">
                                Factory Manager
                            </p>
                        </div>
                        <FiChevronDown 
                            size={14} 
                            className={`text-[#6a8a9a] transition-transform duration-200 ${
                                showProfileMenu ? "rotate-180" : ""
                            }`} 
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {showProfileMenu && (
                        <div className="absolute right-0 mt-1.5 w-52 bg-[#1a2332] rounded-lg shadow-2xl border border-[#2a3a4a] overflow-hidden z-50 animate-slideDown">
                            <div className="px-4 py-3 border-b border-[#2a3a4a]">
                                <p className="text-white font-medium text-sm">Admin User</p>
                                <p className="text-[#6a8a9a] text-xs font-mono">admin@factorypulse.com</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className="w-1 h-1 rounded-full bg-green-500"></span>
                                    <span className="text-[10px] text-green-400 font-mono">Active</span>
                                </div>
                            </div>
                            <div className="py-1">
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-xs text-[#8a9aaa] hover:bg-[#2a3a4a] hover:text-white transition-colors font-mono">
                                    <FiUser size={14} />
                                    Profile
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-xs text-[#8a9aaa] hover:bg-[#2a3a4a] hover:text-white transition-colors font-mono">
                                    <FiSettings size={14} />
                                    Settings
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-xs text-[#8a9aaa] hover:bg-[#2a3a4a] hover:text-white transition-colors font-mono">
                                    <FiHelpCircle size={14} />
                                    Help & Support
                                </button>
                            </div>
                            <div className="border-t border-[#2a3a4a] py-1">
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-xs text-[#8a6a6a] hover:bg-[#2a1a1a] hover:text-[#ff6a6a] transition-colors font-mono">
                                    <FiActivity size={14} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add animation keyframes */}
            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-8px) scale(0.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.15s ease-out;
                }
            `}</style>
        </header>
    );
}

export default Navbar;