import {useEffect, useState} from "react";
import Heading from "../components/Heading"
import Partners from "../components/Partners";
import Search from "../components/Search";
import { useAuth } from "../contexts/AuthContext";
import FILTER_TYPE from "../types/filterTypes";

const ReportPage = () => {

  const PAGES = {
    PARTNERS:1,
    REPORTS:2
  }
  const [currentPage, setCurrentPage] = useState(PAGES.PARTNERS)

  const [partners,setPartners] = useState(null);
  const [filteredPartners, setFilteredPartners] = useState(null);
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [errorPartners, setErrorPartners] = useState(null);
  const [refreshPartners, setRefreshPartners] = useState(false);
  const {user,accessToken} = useAuth();

  const fetchPartners = async () => {
    setLoadingPartners(true);
    setPartners(null);
    setErrorPartners(null);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + `/api/partners/${user.id}`,{
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${accessToken}`,
                            }
                          });

      if (!response.ok) 
        throw new Error();

      const result = await response.json();

      setPartners(result);
      setFilteredPartners(result);

    } catch (err) {
      setErrorPartners(err.message || "An error occurred.");
    } finally {
      setLoadingPartners(false);
    }
  };

  useEffect(()=>{
    fetchPartners();
  },[]);

  useEffect(()=>{
      fetchPartners();
  
  },[refreshPartners]);

  return (
    <div >
      <Heading title={"Partners & Reports"} />
      <div className="dark:bg-dark-green rounded-xl p-6" >
        <div className="flex justify-between">

          <div className="flex gap-5" >
            <button className={"text-lg border-b-3 font-bold cursor-pointer " + (currentPage === PAGES.PARTNERS ? " text-button-light-green border-button-light-green " : " border-transparent")} onClick={()=>{ if(currentPage != PAGES.PARTNERS){setCurrentPage(PAGES.PARTNERS);}}}>
              Partners
            </button>
            <button className={"text-lg border-b-3 font-bold cursor-pointer " + (currentPage === PAGES.REPORTS ? " text-button-light-green border-button-light-green " : " border-transparent")} onClick={()=>{ if(currentPage != PAGES.REPORTS){setCurrentPage(PAGES.REPORTS);}}}>
              Reports
            </button>
          </div>

          <div>
            <Search data={partners} setFilteredData={setFilteredPartners} filters={[FILTER_TYPE.COLLABORATION_SCORE, FILTER_TYPE.INSTITUTION_TYPE]}/>
          </div>
        </div>
        {
        currentPage === PAGES.PARTNERS ? <Partners partners={filteredPartners} loading={loadingPartners} setRefresh={setRefreshPartners}/> :<p>Druga</p>
        }
      </div>
    </div>
  )
}

export default ReportPage