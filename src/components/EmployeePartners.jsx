import {useEffect, useState} from "react";
import useFetch from "../hooks/useFetch";
import Table from "./Table";
import {useAuth} from "../contexts/AuthContext";
import PartnerDetails from "./PartnerDetails";

const EmployeePartners = ({employeeId}) => {
    const [partnerDetails, setPartnerDetails] = useState(null);
    const {fetchedData, fetchData, loading} = useFetch();
    const {accessToken} = useAuth();
    const [openDetails, setOpenDetails] = useState(false);

    const showPartnerDetails = (partnerDetails) => {
        setOpenDetails(true);
        setPartnerDetails(partnerDetails);
    };

    useEffect(() => {
        if (employeeId)
            fetchData(
                import.meta.env.VITE_API_URL + `/api/partners/${employeeId}`,
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
        "Institution type",
        "Contact person",
        "Contact person postition",
        "Adress",
        "City",
        "Collaboration score",
    ];
    const widths = [
        "200px",
        "200px",
        "400px",
        "300px",
        "300px",
        "100px",
        "100px",
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
                showData={showPartnerDetails}
                minWidth={"1800px"}
                loading={loading}
            />
            <PartnerDetails
                open={openDetails}
                handleClose={() => setOpenDetails(false)}
                data={partnerDetails}
                canEdit={false}
            />
        </div>
    );
};

export default EmployeePartners;
