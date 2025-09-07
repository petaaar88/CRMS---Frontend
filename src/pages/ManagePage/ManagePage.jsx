import {useEffect, useState} from "react";
import Heading from "../../components/Heading";
import Employees from "../../components/Employees";
import Search from "../../components/Search";
import {useAuth} from "../../contexts/AuthContext";
import FILTER_TYPE from "../../types/filterTypes";
import CreateEmployee from "../../components/CreateEmployee";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination";

const ManagePage = () => {

    const [employees, setEmployees] = useState(null);
    const [filteredEmployees, setFilteredEmployees] = useState(null);
    const [loadingEmployees, setLoadingEmployees] = useState(false);
    const [errorEmployees, setErrorEmployees] = useState(null);
    const [refreshEmployees, setRefreshEmployees] = useState(false);

    const {accessToken} = useAuth();

      const {
        page,
        rowsPerPage,
        paginatedData,
        totalCount,
        handleChangePage,
        handleChangeRowsPerPage
        } = usePagination(filteredEmployees, 10);

    const fetchEmployees = async () => {
        setLoadingEmployees(true);
        setEmployees(null);
        setErrorEmployees(null);

        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + `/api/users`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.ok) throw new Error();

            const result = await response.json();

            setEmployees(result.employees);
            setFilteredEmployees(result.employees);
        } catch (err) {
            setErrorEmployees(err.message || "An error occurred.");
        } finally {
            setLoadingEmployees(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [refreshEmployees]);


    return (
        <div>
            <Heading title={"Manage"}/>
            <div className="bg-white dark:bg-dark-green rounded-xl md:p-6">
                <div className="flex flex-col lg:flex-row justify-between px-6 pt-6 md:p-0">
                    <div className="mb-4 lg:mb-0">
                        <CreateEmployee setRefresh={setRefreshEmployees}/>
                    </div>

                    <Search
                        data={employees}
                        setFilteredData={setFilteredEmployees}
                        filters={[FILTER_TYPE.DATE]}
                    />
                </div>

                <Employees
                    employees={paginatedData || []}
                    loading={loadingEmployees}
                    setRefresh={setRefreshEmployees}
                />
                <Pagination 
                    totalCount={totalCount} 
                    page={page} 
                    handleChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
};

export default ManagePage;
