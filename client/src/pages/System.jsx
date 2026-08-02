import React from "react";
import MainLayout from "../layouts/MainLayout";
import { 
  PiFactoryFill, 
  PiGearSix, 
  PiChartLine, 
  PiWarningCircle 
} from "react-icons/pi";
import { 
  FiCpu, 
  FiActivity, 
  FiDatabase, 
  FiShield, 
  FiBarChart2,
  FiTrendingUp,
  FiClock,
  FiZap,
  FiServer,
  FiLayers,
  FiRefreshCw
} from "react-icons/fi";
import { BsLightningCharge } from "react-icons/bs";

function System() {
  const features = [
    {
      icon: <FiCpu size={28} />,
      title: "Machine Monitoring",
      description: "Continuously monitors temperature, pressure, RPM, power consumption, production count, and operational status for every machine.",
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
      borderColor: "border-cyan-400/20",
      hoverBorder: "hover:border-cyan-400/40"
    },
    {
      icon: <FiDatabase size={28} />,
      title: "Historical Records",
      description: "Every sensor reading is stored for future analysis, allowing users to review machine history and production trends.",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
      hoverBorder: "hover:border-green-400/40"
    },
    {
      icon: <BsLightningCharge size={28} />,
      title: "Real-Time Updates",
      description: "Socket.IO instantly updates dashboards, machines, and alerts whenever new sensor readings are received.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/20",
      hoverBorder: "hover:border-yellow-400/40"
    },
    {
      icon: <FiActivity size={28} />,
      title: "Intelligent Alerts",
      description: "Machine values are automatically compared against configured thresholds to detect abnormal operating conditions and generate alerts.",
      color: "text-red-400",
      bgColor: "bg-red-400/10",
      borderColor: "border-red-400/20",
      hoverBorder: "hover:border-red-400/40"
    },
    {
      icon: <FiBarChart2 size={28} />,
      title: "Analytics Engine",
      description: "Visual dashboards provide production trends, temperature analysis, machine utilization, alert statistics, and exportable reports.",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/20",
      hoverBorder: "hover:border-purple-400/40"
    },
    {
      icon: <FiShield size={28} />,
      title: "Secure Access",
      description: "Administrator authentication is protected using JSON Web Tokens (JWT), ensuring only authorized users can access the platform.",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
      hoverBorder: "hover:border-blue-400/40"
    }
  ];

  const techStack = [
    { category: "Frontend", items: ["React", "Tailwind CSS", "Socket.IO Client", "Recharts"], color: "text-cyan-400" },
    { category: "Backend", items: ["Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT Authentication"], color: "text-green-400" }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
              System Overview
            </h1>
            <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm mt-1">
              Learn how FactoryPulse monitors machines, processes sensor data, and delivers real-time manufacturing insights.
            </p>
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0d1624] rounded-lg border border-[#2a3a4a]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
              System Online • v3.2.1
            </span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a2332] to-[#0d1624] border border-[#2a3a4a] p-8">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-[#2a4a6a] border border-[#3a5a7a] flex items-center justify-center">
                <PiFactoryFill size={30} className="text-[#4a9aff]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
                  FactoryPulse
                </h2>
                <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm">
                  Real-Time Manufacturing Monitoring Platform
                </p>
              </div>
            </div>

            <p className="text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] text-sm leading-7 max-w-3xl">
              FactoryPulse is a full-stack manufacturing monitoring platform built to simulate how modern factories 
              monitor production machines in real time. The application continuously receives machine sensor readings, 
              stores historical data, evaluates operational conditions, generates alerts, and updates dashboards 
              instantly using real-time communication.
            </p>

            {/* Quick Stats */}
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <FiZap className="text-yellow-400 text-sm" />
                <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
                  Real-time monitoring
                </span>
              </div>
              <span className="text-[#2a3a4a]">|</span>
              <div className="flex items-center gap-2">
                <FiDatabase className="text-green-400 text-sm" />
                <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
                  Historical data
                </span>
              </div>
              <span className="text-[#2a3a4a]">|</span>
              <div className="flex items-center gap-2">
                <PiWarningCircle className="text-red-400 text-sm" />
                <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
                  Smart alerts
                </span>
              </div>
              <span className="text-[#2a3a4a]">|</span>
              <div className="flex items-center gap-2">
                <PiChartLine className="text-blue-400 text-sm" />
                <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
                  Analytics
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl bg-[#1a2332] border ${feature.borderColor} p-5 transition-all duration-300 ${feature.hoverBorder} hover:shadow-lg hover:shadow-[#4a9aff]/5 hover:-translate-y-0.5 group`}
            >
              <div className={`w-12 h-12 rounded-lg ${feature.bgColor} border ${feature.borderColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <span className={feature.color}>
                  {feature.icon}
                </span>
              </div>
              <h3 className={`text-white font-['Segoe_UI','Arial',sans-serif] font-semibold text-sm tracking-wide mb-2`}>
                {feature.title}
              </h3>
              <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* System Workflow */}
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#2a4a6a] border border-[#3a5a7a] flex items-center justify-center">
              <FiLayers className="text-[#4a9aff] text-sm" />
            </div>
            <div>
              <h2 className="text-white font-['Segoe_UI','Arial',sans-serif] font-bold text-lg tracking-tight">
                System Workflow
              </h2>
              <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-xs">
                End-to-end data flow from machines to dashboards
              </p>
            </div>
          </div>

          <div className="bg-[#0d1624] border border-[#2a3a4a] rounded-lg p-6 overflow-x-auto">
            <div className="flex items-center justify-center gap-3 flex-wrap md:flex-nowrap">
              {[
                { label: "Sensor Data", icon: <FiActivity className="text-cyan-400" size={18} />, color: "border-cyan-400/30 bg-cyan-400/10" },
                { label: "Processing", icon: <FiCpu className="text-yellow-400" size={18} />, color: "border-yellow-400/30 bg-yellow-400/10" },
                { label: "Storage", icon: <FiDatabase className="text-green-400" size={18} />, color: "border-green-400/30 bg-green-400/10" },
                { label: "Evaluation", icon: <PiWarningCircle className="text-red-400" size={18} />, color: "border-red-400/30 bg-red-400/10" },
                { label: "Updates", icon: <BsLightningCharge className="text-yellow-400" size={18} />, color: "border-yellow-400/30 bg-yellow-400/10" },
                { label: "Dashboard", icon: <FiBarChart2 className="text-blue-400" size={18} />, color: "border-blue-400/30 bg-blue-400/10" }
              ].map((step, index, array) => (
                <React.Fragment key={index}>
                  <div className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-lg border ${step.color} min-w-[80px]`}>
                    {step.icon}
                    <span className="text-[9px] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                      {step.label}
                    </span>
                  </div>
                  {index < array.length - 1 && (
                    <div className="flex items-center gap-1">
                      <span className="text-[#2a3a4a] text-lg">→</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techStack.map((tech, index) => (
            <div key={index} className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <FiServer className={`${tech.color} text-sm`} />
                <h3 className={`font-['Segoe_UI','Arial',sans-serif'] font-semibold text-sm ${tech.color}`}>
                  {tech.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tech.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-[#0d1624] border border-[#2a3a4a] text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] text-[10px]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Simulation Mode */}
        <div className="relative overflow-hidden rounded-xl border border-blue-500/30 p-6">
          <div className="absolute inset-0 bg-blue-500/5"></div>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          
          <div className="relative flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <FiRefreshCw className="text-blue-400 text-lg animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-white font-['Segoe_UI','Arial',sans-serif] font-bold text-lg tracking-tight">
                Simulation Mode
              </h2>
              <p className="text-[#8a9aaa] font-['Segoe_UI','Arial',sans-serif] text-sm leading-7 mt-1">
                FactoryPulse currently operates in Simulation Mode, where a custom-built sensor simulator generates realistic machine readings at regular intervals. This allows the complete monitoring workflow—including live dashboards, historical data, analytics, alerts, and real-time updates—to function exactly as it would in a production environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default System;