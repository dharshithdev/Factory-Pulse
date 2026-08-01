import { Link } from "react-router-dom";
import { FiLogIn, FiUser } from "react-icons/fi";

function Header() {
  return (
    <header className="relative z-50 pt-4 px-4">
      {/* Glass Container - Floating */}
      <div className="max-w-7xl mx-auto relative rounded-2xl overflow-hidden">
        {/* Glass Background */}
        <div className="absolute inset-0 bg-[#0d1624]/70 backdrop-blur-xl border border-[#2a3a4a]/40 shadow-2xl shadow-[#0d1624]/50"></div>
        
        {/* Glass Highlight - Top */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4a9aff]/30 to-transparent"></div>
        
        {/* Glass Highlight - Bottom */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
        
        {/* Content */}
        <div className="relative px-6 py-4 flex items-center justify-between">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Logo Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#4a9aff]/20 to-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img 
                src="/logosh.png" 
                alt="FactoryPulse" 
                className="relative h-11 w-auto object-contain drop-shadow-lg"
              />
            </div>
            <div className="flex items-center">
              <span className="text-white font-['Segoe_UI','Arial',sans-serif] font-bold text-xl tracking-tight drop-shadow-lg">
                FactoryPulse
              </span>
            </div>
          </Link>

          {/* Login Button with Glass Effect */}
          <Link
            to="/login"
            className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          >
            {/* Glass Background */}
            <div className="absolute inset-0 bg-[#2a4a6a]/40 backdrop-blur-sm border border-[#4a9aff]/20 rounded-xl group-hover:bg-[#2a4a6a]/60 group-hover:border-[#4a9aff]/40 transition-all duration-300"></div>
            
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4a9aff]/10 via-transparent to-cyan-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Border Glow */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-[#4a9aff]/0 group-hover:ring-[#4a9aff]/30 transition-all duration-300"></div>
            
            {/* Content */}
            <div className="relative flex items-center gap-2">
              <FiLogIn className="text-[#4a9aff] text-sm group-hover:scale-110 transition-transform duration-300" />
              <span className="text-white font-['Segoe_UI','Arial',sans-serif] font-medium text-sm">
                Login
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;