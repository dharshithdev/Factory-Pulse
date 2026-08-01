import { useEffect, useState } from "react";
import { FiDownload, FiRefreshCw, FiActivity, FiBarChart2, FiTrendingUp } from "react-icons/fi";
import MainLayout from "../layouts/MainLayout";
import OverviewCards from "../components/analytics/OverviewCard";
import ProductionChart from "../components/analytics/ProductionChart";
import TemperatureChart from "../components/analytics/TemperatureChart";
import AlertCharts from "../components/analytics/AlertCharts";
import UtilizationChart from "../components/analytics/UtilizationChart";
import { exportAnalytics } from "../services/analytics.service";

import {
    getOverview,
    getProduction,
    getTemperature,
    getAlerts,
    getUtilization
} from "../services/analytics.service";

function Analytics() {
    const [overview, setOverview] = useState(null);
    const [production, setProduction] = useState([]);
    const [temperature, setTemperature] = useState([]);
    const [alerts, setAlerts] = useState(null);
    const [utilization, setUtilization] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const loadAnalytics = async () => {
        try {
            const [
                overviewData,
                productionData,
                temperatureData,
                alertData,
                utilizationData
            ] = await Promise.all([
                getOverview(),
                getProduction(),
                getTemperature(),
                getAlerts(),
                getUtilization()
            ]);

            setOverview(overviewData);
            setProduction(productionData);
            setTemperature(temperatureData);
            setAlerts(alertData);
            setUtilization(utilizationData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async () => {
        try {
            setExporting(true);
            const blob = await exportAnalytics();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `factorypulse-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        } finally {
            setExporting(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadAnalytics();
        setTimeout(() => setRefreshing(false), 500);
    };

    useEffect(() => {
        loadAnalytics();
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-xl bg-[#2a4a6a] flex items-center justify-center mx-auto border border-[#3a5a7a] animate-pulse">
                            <FiBarChart2 className="text-[#4a9aff] text-3xl" />
                        </div>
                        <p className="mt-4 text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif] text-sm">
                            Loading analytics data...
                        </p>
                        <div className="mt-3 flex items-center justify-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4a9aff] animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4a9aff] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4a9aff] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white font-['Segoe_UI','Arial',sans-serif] tracking-tight">
                            Analytics
                        </h1>
                        <p className="text-[#6a8a9a] mt-1 font-['Segoe_UI','Arial',sans-serif] text-sm">
                            Production insights and factory performance metrics
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* System Status */}
                        <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-[#0d1624] rounded-lg border border-[#2a3a4a]">
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-[10px] text-[#6a8a9a] font-['Segoe_UI','Arial',sans-serif]">
                                    System Online
                                </span>
                            </div>
                            <span className="text-[#2a3a4a]">|</span>
                            <span className="text-[10px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif] font-mono">
                                {new Date().toLocaleTimeString()}
                            </span>
                        </div>

                        {/* Refresh Button */}
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="p-2.5 rounded-lg bg-[#2a3a4a] hover:bg-[#3a4a5a] text-[#8a9aaa] hover:text-white transition-all duration-200 disabled:opacity-50"
                            title="Refresh Data"
                        >
                            <FiRefreshCw className={`text-sm ${refreshing ? 'animate-spin' : ''}`} />
                        </button>

                        {/* Export Button */}
                        <button
                            onClick={handleExport}
                            disabled={exporting}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2a4a6a] hover:bg-[#3a5a7a] text-white font-['Segoe_UI','Arial',sans-serif] text-sm font-medium transition-all duration-200 disabled:opacity-50"
                        >
                            {exporting ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Exporting...
                                </>
                            ) : (
                                <>
                                    <FiDownload size={14} />
                                    Export CSV
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Overview Cards */}
                <OverviewCards data={overview} />

                {/* Charts Grid - Row 1 */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <ProductionChart data={production} />
                    <TemperatureChart data={temperature} />
                </div>

                {/* Charts Grid - Row 2 */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <AlertCharts data={alerts} />
                    <UtilizationChart data={utilization} />
                </div>

                {/* Footer Stats */}
                <div className="bg-[#0d1624] border border-[#2a3a4a] rounded-lg px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <FiTrendingUp className="text-[#4a9aff] text-xs" />
                            <span className="text-[8px] text-[#4a5a6a] font-['Segoe_UI','Arial',sans-serif]">
                                Data refreshed: {new Date().toLocaleString()}
                            </span>
                        </div>
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
                            v2.0.1
                        </span>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Analytics;