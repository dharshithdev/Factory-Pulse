import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FiMenu,
    FiChevronLeft,
    FiGrid,
    FiSettings,
    FiBell,
    FiChevronRight,
    FiActivity,
    FiCpu,
    FiHardDrive,
    FiTrendingUp,
    FiAlertTriangle
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";

function Sidebar() {
    const [collapsed, setCollapsed] = useState(() => {
        return localStorage.getItem("sidebarCollapsed") === "true";
    });
    const [hoveredItem, setHoveredItem] = useState(null);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", collapsed);
    }, [collapsed]);

    const menuItems = [
        {
            name: "Dashboard",
            icon: <FiGrid size={20} />,
            path: "/",
            description: "Overview & metrics"
        },
        {
            name: "Machines",
            icon: <FiCpu size={20} />,
            path: "/machines",
            description: "Manage equipment"
        },
        {
            name: "Production",
            icon: <FiActivity size={20} />,
            path: "/production",
            description: "Production lines"
        },
        {
            name: "Analytics",
            icon: <FiTrendingUp size={20} />,
            path: "/analytics",
            description: "Data insights"
        },
        {
            name: "Alerts",
            icon: <FiAlertTriangle size={20} />,
            path: "/alerts",
            description: "System notifications"
        },
        {
            name: "System",
            icon: <FiHardDrive size={20} />,
            path: "/system",
            description: "System status"
        },
        {
            name: "Settings",
            icon: <FiSettings size={20} />,
            path: "/settings",
            description: "Preferences"
        }
    ];

    return (
        <aside
            className={`bg-[#1a2332] border-r border-[#2a3a4a] transition-all duration-300 ease-in-out flex flex-col h-screen sticky top-0 ${
                collapsed ? "w-20" : "w-64"
            }`}
        >
            {/* Toggle Button - Floating */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className={`absolute -right-3 top-20 z-10 bg-[#2a3a4a] hover:bg-[#3a4a5a] text-[#8a9aaa] hover:text-white rounded-full p-1.5 transition-all duration-300 border-2 border-[#1a2332] shadow-lg ${
                    collapsed ? "rotate-180" : ""
                }`}
            >
                {collapsed ? (
                    <FiChevronRight size={16} />
                ) : (
                    <FiChevronLeft size={16} />
                )}
            </button>

            {/* Header with Logo - Fixed */}
            <div className="h-20 border-b border-[#2a3a4a] flex items-center px-5 flex-shrink-0">
                <div className="flex items-center gap-3 overflow-hidden w-full">
                    <div className="flex-shrink-0">
                        <img 
                            src="/logosh.png" 
                            alt="FactoryPulse" 
                            className="h-10 w-auto object-contain"
                        />
                    </div>
                    {!collapsed && (
                        <div className="transition-opacity duration-300 flex-1 min-w-0">
                            <h2 className="text-white font-bold text-lg tracking-tight truncate">
                                FactoryPulse
                            </h2>
                            <p className="text-[#6a8a9a] text-[11px] uppercase tracking-wider">
                                Control System v3.0
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation - Grows to fill space */}
            <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
                {menuItems.map((item, index) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        title={collapsed ? item.name : ""}
                        className={({ isActive }) =>
                            `relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-150 group ${
                                isActive
                                    ? "bg-[#2a4a6a] text-white shadow-sm"
                                    : "text-[#8a9aaa] hover:text-white hover:bg-[#2a3a4a]"
                            }`
                        }
                        onMouseEnter={() => setHoveredItem(index)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        {({ isActive }) => (
                            <>
                                {/* Active Indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#4a9aff] rounded-r-full" />
                                )}
                                
                                <span className={`flex-shrink-0 transition-colors ${
                                    isActive ? "text-[#4a9aff]" : "text-[#6a8a9a]"
                                }`}>
                                    {item.icon}
                                </span>
                                
                                {!collapsed && (
                                    <span className="text-sm font-medium truncate">
                                        {item.name}
                                    </span>
                                )}
                                
                                {/* Tooltip for collapsed mode */}
                                {collapsed && hoveredItem === index && (
                                    <div className="absolute left-full ml-2 px-3 py-1.5 bg-[#2a3a4a] text-white text-xs rounded-lg shadow-xl whitespace-nowrap border border-[#3a4a5a] z-50">
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-[#6a8a9a] text-[10px]">{item.description}</div>
                                    </div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}

                {/* Divider */}
                <div className="my-3 border-t border-[#2a3a4a]"></div>

                {/* System Status - Only show when expanded */}
                {!collapsed && (
                    <div className="px-3 py-2 mb-2">
                        <div className="bg-[#0d1624] rounded-lg p-3 border border-[#2a3a4a]">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-[#6a8a9a] uppercase tracking-wider">System Status</span>
                                <span className="flex items-center gap-1.5">
                                    <span className="text-[10px] text-green-400">Online</span>
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Spacer to push logout to bottom */}
                <div className="flex-1"></div>

                {/* Logout Button - Pushed to bottom */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#8a6a6a] hover:text-[#ff6a6a] hover:bg-[#2a1a1a] transition-all duration-150 group mt-auto"
                >
                    <FaSignOutAlt 
                        size={18} 
                        className="transition-transform duration-150 group-hover:translate-x-0.5" 
                    />
                    {!collapsed && (
                        <span className="text-sm font-medium">Logout</span>
                    )}
                </button>
            </nav>

            {/* Footer - Fixed at bottom */}
            <div className="border-t border-[#2a3a4a] p-3 flex-shrink-0">
                {!collapsed ? (
                    <div className="text-[10px] text-[#4a5a6a] text-center">
                        <div className="flex items-center justify-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#2a3a4a]"></span>
                            <span>© 2026 FactoryPulse</span>
                            <span className="w-1 h-1 rounded-full bg-[#2a3a4a]"></span>
                        </div>
                        <div className="flex items-center justify-center gap-3 mt-0.5">
                            <span>SCADA v3.2.1</span>
                            <span className="text-[#2a3a4a]">|</span>
                            <span>PLC Connected</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <div className="w-1 h-1 rounded-full bg-[#2a3a4a]"></div>
                    </div>
                )}
            </div>
        </aside>
    );
}

export default Sidebar;