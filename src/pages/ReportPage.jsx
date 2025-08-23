import {useState} from "react";
import Heading from "../components/Heading"
import Partners from "../components/Partners";

const ReportPage = () => {

    const PAGES = {
        PARTNERS: 1,
        REPORTS: 2
    }
    const [currentPage, setCurrentPage] = useState(PAGES.PARTNERS)


    return (
        <div>
            <Heading title={"Partners & Reports"}/>
            <div className="dark:bg-dark-green rounded-xl p-6">
                <div className="flex gap-5">
                    <button
                        className={"text-lg border-b-3 font-bold cursor-pointer " + (currentPage === PAGES.PARTNERS ? " text-button-light-green border-button-light-green " : " border-transparent")}
                        onClick={() => {
                            if (currentPage != PAGES.PARTNERS) {
                                setCurrentPage(PAGES.PARTNERS);
                            }
                        }}>
                        Partners
                    </button>
                    <button
                        className={"text-lg border-b-3 font-bold cursor-pointer " + (currentPage === PAGES.REPORTS ? " text-button-light-green border-button-light-green " : " border-transparent")}
                        onClick={() => {
                            if (currentPage != PAGES.REPORTS) {
                                setCurrentPage(PAGES.REPORTS);
                            }
                        }}>
                        Reports
                    </button>
                </div>
                {
                    currentPage === PAGES.PARTNERS ? <Partners/> : <p>Druga</p>
                }
            </div>
        </div>
    )
}

export default ReportPage