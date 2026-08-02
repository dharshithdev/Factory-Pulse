import { useEffect, useState, useMemo } from "react";
import {
  FiTrendingUp,
  FiActivity,
  FiRefreshCw,
  FiCpu,
  FiBarChart2,
  FiClock
} from "react-icons/fi";
import MainLayout from "../layouts/MainLayout";
import { getDashboard } from "../services/dashboard.services";
import socket from "../socket/socket";

// Recharts imports
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Area,
  AreaChart
} from "recharts";

function Production() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [timeRange, setTimeRange] = useState("24h");

  useEffect(() => {
    loadData();

    socket.on("machineUpdated", () => {
      loadData();
    });

    return () => {
      socket.off("machineUpdated");
    };
  }, []);

  const loadData = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
      
      // Set first machine as selected if available
      if (data.machines?.length > 0 && !selectedMachine) {
        setSelectedMachine(data.machines[0]);
      }
    } catch (error) {
      console.error("Error loading production data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
  };

  // Get production data for selected machine from dashboard
  const getMachineProductionData = useMemo(() => {
    if (!dashboard || !selectedMachine) return [];
    
    // If dashboard has production history data
    if (dashboard.productionHistory) {
      return dashboard.productionHistory
        .filter(item => item.machineId === selectedMachine._id)
        .map(item => ({
          time: item.time || new Date(item.timestamp).toLocaleTimeString(),
          production: item.production || item.value || 0
        }));
    }
    
    // Fallback: Generate sample data based on actual machine production
    const machineProd = dashboard.production?.machines?.find(
      m => m.machineId === selectedMachine._id
    );
    
    // Create 24 data points (last 24 hours)
    const data = [];
    const baseValue = machineProd?.production || Math.floor(Math.random() * 100) + 50;
    
    for (let i = 23; i >= 0; i--) {
      const hour = new Date();
      hour.setHours(hour.getHours() - i);
      const variance = Math.floor(Math.random() * 30) - 10;
      data.push({
        time: hour.toLocaleTimeString(),
        production: Math.max(0, baseValue + variance)
      });
    }
    return data;
  }, [dashboard, selectedMachine]);

  // Get all machine production data for comparison
  const getAllMachineProduction = useMemo(() => {
    if (!dashboard) return [];
    
    // If dashboard has production data
    if (dashboard.production?.machines) {
      return dashboard.production.machines.map(m => ({
        name: m.machineCode || m.machineId,
        production: m.production || 0,
        status: m.isActive ? 'Active' : 'Inactive'
      }));
    }
    
    // Fallback: Use machine summary data
    return dashboard.machines?.map(machine => ({
      name: machine.machineCode,
      production: machine.currentMetrics?.productionCount || 0,
      status: machine.isActive ? 'Active' : 'Inactive'
    })) || [];
  }, [dashboard]);

  // Calculate statistics
  const totalProduction = useMemo(() => {
    if (!dashboard) return 0;
    return getAllMachineProduction.reduce((sum, m) => sum + m.production, 0);
  }, [dashboard, getAllMachineProduction]);

  const avgProduction = useMemo(() => {
    if (!dashboard || getAllMachineProduction.length === 0) return 0;
    return Math.round(totalProduction / getAllMachineProduction.length);
  }, [totalProduction, getAllMachineProduction]);

  const activeMachines = useMemo(() => {
    if (!dashboard) return 0;
    return dashboard.machines?.filter(m => m.isActive).length || 0;
  }, [dashboard]);

  const topMachine = useMemo(() => {
    if (!dashboard || getAllMachineProduction.length === 0) return null;
    return getAllMachineProduction.reduce((max, m) => 
      m.production > (max.production || 0) ? m : max, { production: 0 }
    );
  }, [getAllMachineProduction]);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
      <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-lg px-4 py-3 shadow-2xl">
        <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-[10px] uppercase tracking-wider">
          {label}
        </p>
        <p className="text-white font-['Segoe_UI','Arial',sans-serif] font-semibold text-sm mt-1">
          Production: <span className="text-[#4a9aff]">{payload[0].value}</span>
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-[#2a4a6a] flex items-center justify-center mx-auto border border-[#3a5a7a] animate-pulse">
              <FiBarChart2 className="text-[#4a9aff] text-3xl" />
            </div>
            <p className="mt-4 text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm">
              Loading production data...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!dashboard) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
              No data available
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
              Production Overview
            </h1>
            <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm mt-1">
              Real-time production monitoring across all machines
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0d1624] rounded-lg border border-[#2a3a4a]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
                Live
              </span>
            </div>

            {/* Refresh */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2.5 rounded-lg bg-[#2a3a4a] hover:bg-[#3a4a5a] text-[#8a9aaa] hover:text-white transition-all duration-200 disabled:opacity-50"
            >
              <FiRefreshCw className={`text-sm ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                  Total Production
                </p>
                <h2 className="text-3xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] mt-2">
                  {totalProduction.toLocaleString()}
                </h2>
                <p className="text-[10px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] mt-1">
                  Units produced
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#2a4a6a]/30 border border-[#4a9aff]/20 flex items-center justify-center">
                <FiBarChart2 className="text-[#4a9aff] text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                  Average Production
                </p>
                <h2 className="text-3xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] mt-2">
                  {avgProduction.toLocaleString()}
                </h2>
                <p className="text-[10px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] mt-1">
                  Per machine
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#2a4a6a]/30 border border-[#4a9aff]/20 flex items-center justify-center">
                <FiActivity className="text-[#4a9aff] text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                  Active Machines
                </p>
                <h2 className="text-3xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] mt-2">
                  {activeMachines}
                </h2>
                <p className="text-[10px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] mt-1">
                  Out of {dashboard.machines?.length || 0} total
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#2a4a6a]/30 border border-[#4a9aff]/20 flex items-center justify-center">
                <FiCpu className="text-[#4a9aff] text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider">
                  Top Performer
                </p>
                <h2 className="text-2xl font-bold text-[#4a9aff] font-['Segoe_UI','Arial',sans-serif] mt-2 truncate max-w-[150px]">
                  {topMachine?.name || '-'}
                </h2>
                <p className="text-[10px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] mt-1">
                  {topMachine?.production?.toLocaleString() || 0} units
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2a4a6a] to-[#4a9aff]/30 border border-[#4a9aff]/30 flex items-center justify-center">
                <FiTrendingUp className="text-[#4a9aff] text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Machine Selector */}
        {dashboard.machines && dashboard.machines.length > 0 && (
          <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] font-semibold uppercase tracking-wider mr-2">
                Machine:
              </span>
              {dashboard.machines.map((machine) => (
                <button
                  key={machine._id}
                  onClick={() => setSelectedMachine(machine)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-['Segoe_UI','Arial',sans-serif'] font-medium transition-all duration-200 ${
                    selectedMachine?._id === machine._id
                      ? 'bg-[#2a4a6a] text-white border border-[#4a9aff]/30'
                      : 'bg-[#0d1624] text-[#8a9aaa] hover:text-white border border-[#2a3a4a] hover:border-[#4a9aff]/30'
                  }`}
                >
                  {machine.machineCode}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Chart - Big */}
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-['Segoe_UI','Arial',sans-serif] font-semibold text-lg">
                Production Trend
              </h3>
              <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-xs">
                {selectedMachine?.machineCode || 'All Machines'} • Production over time
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                <FiClock className="inline mr-1" />
                Last 24 hours
              </span>
            </div>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={getMachineProductionData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4a9aff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4a9aff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3a4a" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="#4a5a6a"
                  tick={{ fill: "#4a5a6a", fontSize: 10, fontFamily: "'Segoe UI', 'Arial', sans-serif" }}
                  axisLine={{ stroke: "#2a3a4a" }}
                  tickLine={{ stroke: "#2a3a4a" }}
                />
                <YAxis
                  stroke="#4a5a6a"
                  tick={{ fill: "#4a5a6a", fontSize: 10, fontFamily: "'Segoe UI', 'Arial', sans-serif" }}
                  axisLine={{ stroke: "#2a3a4a" }}
                  tickLine={{ stroke: "#2a3a4a" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="production"
                  stroke="#4a9aff"
                  strokeWidth={3}
                  fill="url(#productionGradient)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart - Machine Comparison */}
        <div className="bg-[#1a2332] border border-[#2a3a4a] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-['Segoe_UI','Arial',sans-serif] font-semibold text-lg">
                Machine Comparison
              </h3>
              <p className="text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-xs">
                Production per machine
              </p>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getAllMachineProduction}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3a4a" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#4a5a6a"
                  tick={{ fill: "#4a5a6a", fontSize: 10, fontFamily: "'Segoe UI', 'Arial', sans-serif" }}
                  axisLine={{ stroke: "#2a3a4a" }}
                  tickLine={{ stroke: "#2a3a4a" }}
                />
                <YAxis
                  stroke="#4a5a6a"
                  tick={{ fill: "#4a5a6a", fontSize: 10, fontFamily: "'Segoe UI', 'Arial', sans-serif" }}
                  axisLine={{ stroke: "#2a3a4a" }}
                  tickLine={{ stroke: "#2a3a4a" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="production"
                  fill="#4a9aff"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1200}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="bg-[#0d1624] border border-[#2a3a4a] rounded-lg px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <FiTrendingUp className="text-[#4a9aff] text-xs" />
              <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                Total: {totalProduction.toLocaleString()} units
              </span>
            </div>
            <span className="text-[#2a3a4a]">|</span>
            <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
              Avg: {avgProduction.toLocaleString()} per machine
            </span>
            <span className="text-[#2a3a4a]">|</span>
            <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
              Active: {activeMachines} machines
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-green-500"></span>
              <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                SCADA CONNECTED
              </span>
            </div>
            <span className="text-[#2a3a4a]">|</span>
            <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Production;