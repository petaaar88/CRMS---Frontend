import { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import Search from "../../components/Search";
import { useAuth } from "../../contexts/AuthContext";
import FILTER_TYPE from "../../types/filterTypes";
import useBreakpoints from "../../hooks/useBreakpoints";
import Announcements from "../../components/Announcements ";
import CreateAnnouncement from "../../components/CreateAnnouncement";
import Pagination from "../../components/Pagination";
import usePagination from "../../hooks/usePagination";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState(null);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState(null);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
  const [errorAnnouncements, setErrorAnnouncements] = useState(null);

  const { accessToken } = useAuth();

  const {
    page,
    rowsPerPage,
    paginatedData,
    totalCount,
    handleChangePage,
    handleChangeRowsPerPage
  } = usePagination(filteredAnnouncements, 10);

  const fetchAnnouncements = async () => {
    setLoadingAnnouncements(true);
    setAnnouncements(null);
    setErrorAnnouncements(null);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/api/announcements`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error();

      const result = await response.json();

      setAnnouncements(result.announcements);
      setFilteredAnnouncements(result.announcements);
    } catch (err) {
      setErrorAnnouncements(err.message || "An error occurred.");
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <Heading title={"Announcements"} />
      <div className="dark:bg-dark-green rounded-xl md:p-6">
        <div className="flex flex-col lg:flex-row justify-between px-6 pt-6 md:p-0">
          <div className="mb-4 lg:mb-0">
            <CreateAnnouncement setAnnouncements={setAnnouncements} setFilteredAnnouncements={setFilteredAnnouncements} />
          </div>

          <Search
            data={announcements}
            setFilteredData={setFilteredAnnouncements}
            filters={[FILTER_TYPE.DATE]}
          />
        </div>

        <Announcements
          announcements={paginatedData || []}
          loading={loadingAnnouncements}
          setAnnouncements={setAnnouncements}
          setFilteredAnnouncements={setFilteredAnnouncements}
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

export default AnnouncementsPage;
