import { Link } from "react-router-dom";
import { 
  FiHome, 
  FiArrowLeft, 
  FiAlertTriangle, 
  FiActivity,
  FiArrowRight
} from "react-icons/fi";
import { PiFactoryFill } from "react-icons/pi";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1624] p-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#4a9aff]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-2xl">
        {/* Error Card with Liquid Glass */}
        <div className="relative rounded-2xl p-8 md:p-12 text-center overflow-hidden">
          {/* Glass Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2332]/90 to-[#0d1624]/90 backdrop-blur-md border border-[#2a3a4a]/50"></div>
          
          {/* Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>

          {/* Content */}
          <div className="relative">
            {/* 404 Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a9aff]/20 to-cyan-400/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative w-32 h-32 rounded-full bg-[#1a2332]/80 backdrop-blur-sm border border-[#2a3a4a]/50 flex items-center justify-center">
                  <PiFactoryFill className="text-6xl text-[#4a9aff]" />
                </div>
              </div>
            </div>

            {/* Error Number */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4a9aff] to-cyan-400 font-['Segoe_UI','Arial',sans-serif] tracking-tight">
                4
              </span>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4a9aff]/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
                <span className="relative text-7xl md:text-8xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
                  0
                </span>
              </div>
              <span className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4a9aff] to-cyan-400 font-['Segoe_UI','Arial',sans-serif] tracking-tight">
                4
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight mt-2">
              Page Not Found
            </h1>
            
            {/* Description */}
            <p className="text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] text-sm md:text-base mt-3 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>

            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2a4a6a]/30 backdrop-blur-sm border border-[#4a9aff]/20 rounded-lg mt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                Error 404
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-[#2a4a6a] group-hover:bg-[#3a5a7a] transition-colors duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <FiHome className="relative text-white" size={16} />
                <span className="relative text-white font-['Segoe_UI','Arial',sans-serif] font-medium text-sm">
                  Go Home
                </span>
                <FiArrowRight className="relative text-white" size={14} />
              </Link>

              <button
                onClick={() => window.history.back()}
                className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-[#2a3a4a]/50 backdrop-blur-sm border border-[#3a4a5a] group-hover:border-[#4a9aff]/30 rounded-lg transition-all duration-300"></div>
                <FiArrowLeft className="relative text-[#8a9aaa] group-hover:text-white transition-colors duration-300" size={16} />
                <span className="relative text-[#8a9aaa] group-hover:text-white font-['Segoe_UI','Arial',sans-serif] font-medium text-sm transition-colors duration-300">
                  Go Back
                </span>
              </button>
            </div>

            {/* Help Links */}
            <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
              <Link to="/dashboard" className="hover:text-[#8a9aaa] transition-colors duration-300">
                Dashboard
              </Link>
              <span className="text-[#2a3a4a]">•</span>
              <Link to="/machines" className="hover:text-[#8a9aaa] transition-colors duration-300">
                Machines
              </Link>
              <span className="text-[#2a3a4a]">•</span>
              <Link to="/analytics" className="hover:text-[#8a9aaa] transition-colors duration-300">
                Analytics
              </Link>
              <span className="text-[#2a3a4a]">•</span>
              <Link to="/alerts" className="hover:text-[#8a9aaa] transition-colors duration-300">
                Alerts
              </Link>
            </div>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="relative mt-6 flex items-center justify-center gap-4 text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
          <div className="flex items-center gap-1.5">
            <span>SCADA: ONLINE</span>
          </div>
          <span className="text-[#2a3a4a]">|</span>
          <div className="flex items-center gap-1.5">
            <span>PLC: CONNECTED</span>
          </div>
          <span className="text-[#2a3a4a]">|</span>
          <span>v3.2.1</span>
          <span className="text-[#2a3a4a]">|</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}

export default NotFound;