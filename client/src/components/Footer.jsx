import { Link } from "react-router-dom";
import { FiHeart, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-[#0d1624]/60 backdrop-blur-sm border-t border-[#2a3a4a]/50"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <img 
              src="/logosh.png" 
              alt="FactoryPulse" 
              className="h-8 w-auto object-contain opacity-80"
            />
            <div className="text-[10px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
              <span className="text-white font-semibold">FactoryPulse</span>
              <span className="mx-2">•</span>
              <span>SCADA v3.2.1</span>
              <span className="mx-2">•</span>
              <span className="hidden sm:inline">Industrial Control System</span>
            </div>
          </div>

          {/* Center Section - Made with Love */}
          <div className="flex items-center gap-1.5 text-[10px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
          </div>

          {/* Right Section - Social Links & Copyright */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a 
                href="#" 
                className="text-[#4a5a6a] hover:text-[#8a9aaa] transition-colors duration-300"
                aria-label="Twitter"
              >
                <FiTwitter size={14} />
              </a>
              <a 
                href="#" 
                className="text-[#4a5a6a] hover:text-[#8a9aaa] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={14} />
              </a>
              <a 
                href="#" 
                className="text-[#4a5a6a] hover:text-[#8a9aaa] transition-colors duration-300"
                aria-label="GitHub"
              >
                <FiGithub size={14} />
              </a>
            </div>
            <span className="text-[#2a3a4a]">|</span>
            <span className="text-[9px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
              © 2026 All rights reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;