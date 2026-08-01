import { Link } from "react-router-dom";
import { FiLogIn, FiUser } from "react-icons/fi";

function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-[#0d1624]/80 backdrop-blur-md border-b border-[#2a3a4a]/50"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4a9aff]/20 to-cyan-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src="/logosh.png" 
              alt="FactoryPulse" 
              className="relative h-10 w-auto object-contain"
            />
          </div>
          <div>
            <span className="text-white font-['Segoe_UI','Arial',sans-serif] font-bold text-lg tracking-tight">
              FactoryPulse
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] text-[#4a9aff] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider border-l border-[#2a3a4a] pl-2">
              Control System
            </span>
          </div>
        </Link>

        {/* Login Button */}
        <Link
          to="/login"
          className="group relative flex items-center gap-2 px-5 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02]"
        >
          {/* Glass Background */}
          <div className="absolute inset-0 bg-[#2a4a6a]/30 backdrop-blur-sm border border-[#4a9aff]/20 rounded-lg group-hover:bg-[#2a4a6a]/50 group-hover:border-[#4a9aff]/40 transition-all duration-300"></div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {/* Content */}
          <div className="relative flex items-center gap-2">
            <FiLogIn className="text-[#4a9aff] text-sm group-hover:scale-110 transition-transform duration-300" />
            <span className="text-white font-['Segoe_UI','Arial',sans-serif] font-medium text-sm">
              Login
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;