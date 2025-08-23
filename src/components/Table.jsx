import { CircularProgress } from "@mui/material";
import { useState, useMemo, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const Table = ({ headers, widths, data, showPartner, minWidth, loading = false }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const {theme} = useContext(ThemeContext);

    const columns = useMemo(() => {
        if (!data || data.length === 0) return [];
        return Object.keys(data[0]).filter(
            (key) => !key.toLowerCase().includes("id")
        );
    }, [data]);

    const sortedData = useMemo(() => {
        if (!data || data.length === 0) return [];

        return [...data].sort((a, b) => {
            if (!sortConfig.key) return 0;
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
    }, [data, sortConfig]);

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="flex flex-col gap-3 px-3" style={{width:"100%", minWidth:minWidth}}>
            <div className="sticky top-0 grid gap-4 items-center justify-around bg-menu-button-light dark:bg-button-dark-green shadow rounded-lg p-4 font-bold"
                 style={{ gridTemplateColumns: widths.join(" ") }}>
                {headers.map((col, idx) => (
                    <div
                        key={idx}
                        className="cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-300 text-center"
                        onClick={() => columns[idx] && requestSort(columns[idx])}
                    >
                        {col}{" "}
                        {columns[idx] && sortConfig.key === columns[idx] &&
                            (sortConfig.direction === "asc" ? "▲" : "▼")}
                    </div>
                ))}
            </div>


            {loading ? (
                <div className="p-6 text-center bg-gray dark:bg-deep-green rounded-lg shadow">
                    <CircularProgress size={60}
                                      sx={{
                                          color:
                                              theme === "dark"
                                                  ? "var(--color-menu-button-dark)"
                                                  : "var(--color-button-light-green)",
                                      }}/>
                    <p className="text-2xl mt-3">Loading...</p>
                </div>
            ) : !data || data.length === 0 ? (
                <div className="p-6 text-center text-2xl text-gray-500 dark:text-gray-400 bg-gray dark:bg-deep-green rounded-lg shadow">
                    No Data
                </div>
            ) : (
                sortedData.map((row, idx) => (
                    <div
                        key={idx}
                        className="grid gap-4 items-center justify-around shadow rounded-lg p-4 cursor-pointer transition-colors bg-gray dark:bg-deep-green dark:hover:text-gray-400 dark:active:bg-dark-green text-center"
                        style={{ gridTemplateColumns: widths.join(" ") }}
                        onClick={() => showPartner(row)}
                    >
                        {columns.map((col, i) => (
                            <div key={i}>{row[col]}</div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default Table;