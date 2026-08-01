import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import OverviewCards from "../components/analytics/OverviewCard";
import ProductionChart from "../components/analytics/ProductionChart";
import TemperatureChart from "../components/analytics/TemperatureChart";
import AlertCharts from "../components/analytics/AlertCharts";
import UtilizationChart from "../components/analytics/UtilizationChart";

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

        }

    };

    useEffect(() => {

        loadAnalytics();

    }, []);

    if (!overview || !alerts) {

        return (

            <MainLayout>

                <div className="text-center text-slate-400 py-20">

                    Loading Analytics...

                </div>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-4xl font-bold text-white">

                        Analytics

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Production insights and factory performance.

                    </p>

                </div>

                <OverviewCards data={overview}/>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                    <ProductionChart data={production}/>

                    <TemperatureChart data={temperature}/>

                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                    <AlertCharts data={alerts}/>

                    <UtilizationChart data={utilization}/>

                </div>

            </div>

        </MainLayout>

    );

}

export default Analytics;