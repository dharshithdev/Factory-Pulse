import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FiArrowRight, 
  FiCpu, 
  FiTrendingUp, 
  FiBell, 
  FiSettings,
  FiBarChart2,
  FiShield,
  FiClock,
  FiCheckCircle,
  FiActivity,
  FiAward
} from "react-icons/fi";
import { getDashboard } from "../services/dashboard.services";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const [stats, setStats] = useState({
    totalMachines: 0,
    activeMachines: 0,
    totalProduction: 0,
    activeAlerts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        //const data = await getDashboard();
        const data = {};
        setStats({
          totalMachines: data.machineSummary?.total || 10,
          activeMachines: data.machineSummary?.running || 8,
          totalProduction: data.production?.totalProduction || 1200,
          activeAlerts: data.alerts?.active || 1
        });
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const features = [
    {
      icon: <FiCpu className="text-[#4a9aff]" size={24} />,
      title: "Machine Monitoring",
      description: "Real-time monitoring of all machines with live metrics including temperature, pressure, RPM, and power consumption."
    },
    {
      icon: <FiBarChart2 className="text-[#4a9aff]" size={24} />,
      title: "Analytics Dashboard",
      description: "Comprehensive analytics with production trends, machine utilization, and performance metrics at a glance."
    },
    {
      icon: <FiBell className="text-[#4a9aff]" size={24} />,
      title: "Alert Management",
      description: "Instant alerts for critical issues, warnings, and maintenance requirements across your production floor."
    },
    {
      icon: <FiSettings className="text-[#4a9aff]" size={24} />,
      title: "System Control",
      description: "Complete control over machine configurations, thresholds, and system settings from a centralized interface."
    }
  ];

  const benefits = [
    {
      icon: <FiTrendingUp className="text-green-400" size={20} />,
      title: "Increased Efficiency",
      description: "Optimize production with real-time data insights"
    },
    {
      icon: <FiShield className="text-blue-400" size={20} />,
      title: "Predictive Maintenance",
      description: "Prevent downtime with early warning detection"
    },
    {
      icon: <FiClock className="text-cyan-400" size={20} />,
      title: "24/7 Monitoring",
      description: "Continuous monitoring with instant alerts"
    },
    {
      icon: <FiCheckCircle className="text-green-400" size={20} />,
      title: "Quality Assurance",
      description: "Maintain consistent production quality"
    }
  ];

  const statCards = [
    {
      label: "Total Machines",
      value: stats.totalMachines,
      color: "text-[#4a9aff]"
    },
    {
      label: "Active Machines",
      value: stats.activeMachines,
      color: "text-green-400"
    },
    {
      label: "Production Today",
      value: stats.totalProduction,
      color: "text-cyan-400"
    },
    {
      label: "Active Alerts",
      value: stats.activeAlerts,
      color: stats.activeAlerts > 0 ? "text-orange-400" : "text-green-400"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1624]">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Hero Section - Liquid Glass */}
        <div className="relative overflow-hidden rounded-2xl">
          {/* Glass Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2332]/90 to-[#0d1624]/90 backdrop-blur-sm border border-[#2a3a4a]/50"></div>
          
          {/* Glass Reflection Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
          
          {/* Content */}
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight leading-tight">
                  Smart Manufacturing
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4a9aff] to-cyan-400">
                    Control Platform
                  </span>
                </h1>
                
                <p className="mt-4 text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] text-base max-w-lg">
                  Monitor, analyze, and control your entire production floor in real-time. 
                  FactoryPulse brings industrial automation to your fingertips.
                </p>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/dashboard"
                    className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 bg-[#2a4a6a] group-hover:bg-[#3a5a7a] transition-colors duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative text-white font-['Segoe_UI','Arial',sans-serif] font-medium">
                      Go to Dashboard
                    </span>
                    <FiArrowRight className="relative text-white" size={16} />
                  </Link>
                  <Link
                    to="/machines"
                    className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 bg-[#2a3a4a]/50 backdrop-blur-sm border border-[#3a4a5a] group-hover:border-[#4a9aff]/30 rounded-lg transition-all duration-300"></div>
                    <span className="relative text-white font-['Segoe_UI','Arial',sans-serif] font-medium">
                      View Machines
                    </span>
                  </Link>
                </div>
              </div>

              {/* Stats Grid with Glass Effect */}
              <div className="grid grid-cols-2 gap-3 w-full lg:w-auto lg:min-w-[280px]">
                {statCards.map((stat, index) => (
                  <div key={index} className="relative rounded-lg p-4 text-center overflow-hidden group">
                    <div className="absolute inset-0 bg-[#0d1624]/60 backdrop-blur-sm border border-[#2a3a4a]/50 group-hover:border-[#4a9aff]/30 transition-colors duration-300"></div>
                    <div className="relative">
                      <p className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                        {stat.label}
                      </p>
                      {loading ? (
                        <div className="h-8 w-12 mx-auto mt-1 bg-[#2a3a4a]/50 animate-pulse rounded"></div>
                      ) : (
                        <p className={`text-2xl font-bold font-['Segoe_UI','Arial',sans-serif] ${stat.color}`}>
                          {stat.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
              Platform Features
            </h2>
            <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm mt-1">
              Everything you need to manage your manufacturing operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative rounded-xl p-5 transition-all duration-300 group hover:scale-[1.01] overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#1a2332]/80 backdrop-blur-sm border border-[#2a3a4a]/50 group-hover:border-[#4a9aff]/30 transition-colors duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0d1624]/80 backdrop-blur-sm border border-[#2a3a4a]/50 flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-['Segoe_UI','Arial',sans-serif] font-semibold text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-xs mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section with Glass */}
        <div className="mt-8">
          <div className="relative rounded-xl p-6 overflow-hidden">
            <div className="absolute inset-0 bg-[#1a2332]/60 backdrop-blur-sm border border-[#2a3a4a]/50"></div>
            <div className="relative">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
                  Why FactoryPulse?
                </h2>
                <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm mt-1">
                  Built for modern manufacturing environments
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-12 h-12 rounded-lg bg-[#0d1624]/80 backdrop-blur-sm border border-[#2a3a4a]/50 flex items-center justify-center mx-auto group-hover:border-[#4a9aff]/30 transition-colors duration-300">
                      {benefit.icon}
                    </div>
                    <h4 className="text-white font-['Segoe_UI','Arial',sans-serif] font-semibold text-sm mt-2">
                      {benefit.title}
                    </h4>
                    <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-xs mt-1">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section with Liquid Glass */}
        <div className="mt-8">
          <div className="relative rounded-xl p-8 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/90 via-[#0d1624]/90 to-[#1a2332]/90 backdrop-blur-sm border border-[#2a3a4a]/50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#4a9aff]/5 via-transparent to-cyan-400/5"></div>
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2a4a6a]/30 backdrop-blur-sm border border-[#4a9aff]/20 rounded-lg mb-4">
                <FiAward className="text-[#4a9aff] text-sm" />
                <span className="text-[10px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                  Enterprise Grade
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white font-['Segoe_UI','Arial',sans-serif]">
                Ready to optimize your production?
              </h3>
              <p className="text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] text-sm mt-2">
                Get started with FactoryPulse today and transform your manufacturing operations
              </p>
              
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to="/dashboard"
                  className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-[#2a4a6a] group-hover:bg-[#3a5a7a] transition-colors duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <FiActivity className="relative text-white" size={18} />
                  <span className="relative text-white font-['Segoe_UI','Arial',sans-serif] font-medium">
                    Launch Dashboard
                  </span>
                  <FiArrowRight className="relative text-white" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;