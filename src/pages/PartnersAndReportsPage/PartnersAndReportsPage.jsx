import { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import Partners from "../../components/Partners";
import Search from "../../components/Search";
import { useAuth } from "../../contexts/AuthContext";
import FILTER_TYPE from "../../types/filterTypes";
import CreatePartner from "../../components/CreatePartner";
import useBreakpoints from "../../hooks/useBreakpoints";
import Reports from "../../components/Reports";
import CreateReport from "../../components/CreateReport";

const PartnersAndReportsPage = () => {
  const PAGES = {
    PARTNERS: 1,
    REPORTS: 2,
  };
  const [currentPage, setCurrentPage] = useState(PAGES.PARTNERS);

  const [partners, setPartners] = useState(null);
  const [filteredPartners, setFilteredPartners] = useState(null);
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [errorPartners, setErrorPartners] = useState(null);
  const [refreshPartners, setRefreshPartners] = useState(false);

  const [reports, setReports] = useState(null);
  const [filteredReports, setFilteredReports] = useState(null);
  const [loadingReports, setLoadingReports] = useState(false);
  const [errorReports, setErrorReports] = useState(null);
  const [refreshReports, setRefreshReports] = useState(false);

  const { user, accessToken } = useAuth();
  const { isLgBreakpoint } = useBreakpoints();

  const fetchPartners = async () => {
    setLoadingPartners(true);
    setPartners(null);
    setErrorPartners(null);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/api/partners/${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error();

      const result = await response.json();

      setPartners(result);
      setFilteredPartners(result);
    } catch (err) {
      setErrorPartners(err.message || "An error occurred.");
    } finally {
      setLoadingPartners(false);
    }
  };

  const fetchReports = async () => {
    setLoadingReports(true);
    setReports(null);
    setErrorReports(null);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/api/reports/${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error();

      const result = await response.json();

      setReports(result);
      setFilteredReports(result);
    } catch (err) {
      setErrorReports(err.message || "An error occurred.");
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    fetchPartners();
    fetchReports();
  }, []);

  useEffect(() => {
    fetchPartners();
  }, [refreshPartners]);

  useEffect(() => {
    fetchReports();
  }, [refreshReports]);

  return (
    <div>
      <Heading title={"Partners & Reports"} />
      <div className="dark:bg-dark-green rounded-xl md:p-6">
        <div className="flex flex-col lg:flex-row justify-between px-6 pt-6 md:p-0">
          <div className="flex justify-between">
            <div className="flex gap-5">
              <button
                className={
                  "text-lg border-b-3 font-bold cursor-pointer " +
                  (currentPage === PAGES.PARTNERS
                    ? " text-button-light-green border-button-light-green "
                    : " border-transparent")
                }
                onClick={() => {
                  if (currentPage != PAGES.PARTNERS) {
                    setCurrentPage(PAGES.PARTNERS);
                  }
                }}
              >
                Partners
              </button>
              <button
                className={
                  "text-lg border-b-3 font-bold cursor-pointer " +
                  (currentPage === PAGES.REPORTS
                    ? " text-button-light-green border-button-light-green "
                    : " border-transparent")
                }
                onClick={() => {
                  if (currentPage != PAGES.REPORTS) {
                    setCurrentPage(PAGES.REPORTS);
                  }
                }}
              >
                Reports
              </button>
            </div>
            {!isLgBreakpoint ? (
              currentPage === PAGES.PARTNERS ? (
                <CreatePartner setRefresh={setRefreshPartners} />
              ) : (
                <CreateReport setRefresh={setRefreshReports} />
              )
            ) : null}
          </div>

          <div className="flex mt-5 lg:mt-0 justify-center gap-4">
            <Search
              data={currentPage === PAGES.PARTNERS ? partners : reports}
              setFilteredData={
                currentPage === PAGES.PARTNERS
                  ? setFilteredPartners
                  : setFilteredReports
              }
              filters={
                currentPage === PAGES.PARTNERS
                  ? [
                      FILTER_TYPE.COLLABORATION_SCORE,
                      FILTER_TYPE.INSTITUTION_TYPE,
                    ]
                  : [FILTER_TYPE.DATE, FILTER_TYPE.VISIT_OUTCOME]
              }
            />
            {isLgBreakpoint ? (
              currentPage === PAGES.PARTNERS ? (
                <CreatePartner setRefresh={setRefreshPartners} />
              ) : (
                <CreateReport setRefresh={setRefreshReports} />
              )
            ) : null}
          </div>
        </div>
        {currentPage === PAGES.PARTNERS ? (
          <Partners
            partners={filteredPartners}
            loading={loadingPartners}
            setRefresh={setRefreshPartners}
          />
        ) : (
          <Reports
            reports={filteredReports}
            loading={loadingReports}
            setRefresh={setRefreshReports}
          />
        )}
      </div>
    </div>
  );
};

export default PartnersAndReportsPage;
