import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getAlerts } from "../services/alert.service";
import AlertStats from "../components/alerts/AlertStats";
import AlertFilter from "../components/alerts/AlertFilter";
import AlertTable from "../components/alerts/AlertTable";

function Alerts() {

    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("ALL");
    const [severity, setSeverity] = useState("ALL");

    const loadAlerts = async () => {

        try {

            const data = await getAlerts();
            setAlerts(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadAlerts();

    }, []);

    const filteredAlerts = alerts.filter((alert) => {

    const machineMatch =
        alert.machine?.machineCode
            ?.toLowerCase()
            .includes(search.toLowerCase()) ?? false;

    const statusMatch =
        status === "ALL" ||
        alert.status === status;

    const severityMatch =
        severity === "ALL" ||
        alert.severity === severity;

    return machineMatch &&
        statusMatch &&
        severityMatch;

});

    return (

        <MainLayout>

            <div className="space-y-8">

                <AlertStats alerts={filteredAlerts} />

                <AlertFilter
    search={search}
    setSearch={setSearch}
    status={status}
    setStatus={setStatus}
    severity={severity}
    setSeverity={setSeverity}
/>

                {

                    loading ?

                    <div className="text-center py-20 text-slate-400">

                        Loading alerts...

                    </div>

                    :

                    <AlertTable
                        alerts={filteredAlerts}
                        onRefresh={loadAlerts}
                    />

                }

            </div>

        </MainLayout>

    );

}

export default Alerts;