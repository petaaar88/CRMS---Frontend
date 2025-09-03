import {useEffect} from "react";
import {useAuth} from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import Table from "./Table";

const EmployeeReports = ({employeeId}) => {
    const {fetchedData, fetchData, loading} = useFetch();
    const {accessToken} = useAuth();

    useEffect(() => {
        if (employeeId)
            fetchData(
                import.meta.env.VITE_API_URL + `/api/reports/${employeeId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
    }, [employeeId]);

    const headers = [
        "Institution name",
        "Sales Representative",
        "Visit Date",
        "Visit Outcome",
        "Report Text"
    ];

    const widths = [
        "200px",
        "200px",
        "400px",
        "300px",
        "300px",
    ];


    return (
        <div
            className="items-center space-y-3 mb-8 mt-8 bg-gray dark:bg-darker-green text-white  px-3 py-4 rounded-xl"
            style={{
                width: "100%",
                overflow: "auto",
                height: "calc(100vh - 450px)",
            }}
        >
            <Table
                headers={headers}
                widths={widths}
                data={fetchedData}
                showData={() => null}
                minWidth={"1800px"}
                loading={loading}
            />
        </div>
    )
}

export default EmployeeReports