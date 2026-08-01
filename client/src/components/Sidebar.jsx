import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FiMenu,
    FiChevronLeft,
    FiGrid,
    FiSettings,
    FiBell
} from "react-icons/fi";
import { PiFactoryFill } from "react-icons/pi";
import { MdOutlineAnalytics } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";

function Sidebar() {

    const [collapsed, setCollapsed] = useState(() => {
        return localStorage.getItem("sidebarCollapsed") === "true";
    });

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {

    logout();

    navigate("/login");

    };

    useEffect(() => {
        localStorage.setItem(
            "sidebarCollapsed",
            collapsed
        );
    }, [collapsed]);

    const menuItems = [
    {
        name: "Dashboard",
        icon: <FiGrid size={22} />,
        path: "/"
    },
    {
        name: "Machines",
        icon: <PiFactoryFill size={22} />,
        path: "/machines"
    },
    {
        name: "Analytics",
        icon: <MdOutlineAnalytics size={22} />,
        path: "/analytics"
    },
    {
        name: "Alerts",
        icon: <FiBell size={22} />,
        path: "/alerts"
    },
    {
        name: "Settings",
        icon: <FiSettings size={22} />,
        path: "/settings"
    }
];

    return (
        <aside
            className={`bg-[#111827] border-r border-slate-700 transition-all duration-300 flex flex-col ${
                collapsed ? "w-20" : "w-72"
           }`}
        >
            <div className="h-20 border-b border-slate-700 flex items-center justify-between px-5">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to from-blue-500 to-cyan-400 flex items-center justify-center">
                        <PiFactoryFill
                            className="text-white"
                            size={28}
                        />
                    </div>
                    {
                        !collapsed &&
                        <div>
                            <h2 className="text-white font-bold text-xl">
                                FactoryPulse
                            </h2>
                            <p className="text-slate-400 text-xs">
                                Manufacturing Platform
                            </p>
                        </div>
                    }
                </div>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                   className="text-slate-400 hover:text-white transition"
                >
                    {
                        collapsed ?
                            <FiMenu size={22} />
                            :
                            <FiChevronLeft size={22} />
                    }
                </button>
            </div>
           <nav className="flex-1 py-6 px-3 space-y-2">
    {
        menuItems.map((item) => (
            <NavLink
                key={item.name}
                to={item.path}
                title={collapsed ? item.name : ""}
                className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl px-4 py-3 transition-all ${
                        isActive
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`
                }
            >
                <span>
                    {item.icon}
                </span>
                {
                    !collapsed &&
                    <span className="font-medium">
                        {item.name}
                    </span>
                }
            </NavLink>
        ))
    }

    <button
        onClick={handleLogout}
        className="w-full flex items-center gap-4 rounded-xl px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
    >
        <FaSignOutAlt size={22} />
        {
            !collapsed &&
            <span className="font-medium">
                Logout
            </span>
        }
    </button>
</nav>
            <div className="border-t border-slate-700 p-5">
                <div
                    className={`flex items-center ${
                        collapsed
                            ? "justify-center"
                            : "justify-between"
                   }`}
                >
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;