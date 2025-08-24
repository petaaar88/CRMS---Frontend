import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Button, Menu, MenuItem } from "@mui/material";
import FILTER_TYPE from "../types/filterTypes";
import DateFilter from "./DateFilter";
import OptionFilter from "./OptionFilter";
import INSITUTION_TYPE from "../types/institutionType";
import COLLABORATION_SCORE from "../types/collaborationScore";
import useBreakpoints from "../hooks/useBreakpoints";

const Search = ({ data, setFilteredData, filters }) => {
  const [value, setValue] = useState("");
  const [filtersValue, setFilterValues] = useState(null);
  const { theme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const paperRef = useRef(null);
  const {isLgBreakpoint} = useBreakpoints();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterClick = () => {
    setAnchorEl(paperRef.current);
  };

  useEffect(() => {
    if (!filtersValue?.date) {
      setFilterValues((prev) => ({ ...prev, date: { from: "", to: "" } }));
    }

    if (!filtersValue?.institutionType) {
      setFilterValues((prev) => ({ ...prev, institutionType: null }));
    }

    if (!filtersValue?.collaborationScore) {
      setFilterValues((prev) => ({ ...prev, collaborationScore: null }));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const filteredResult = applyFilters();

    if (!value || value.length === 0) return setFilteredData(filteredResult);

    if (!data || data.length == 0) return;

    const result = [];

    for (const item of filteredResult) {
      for (const itemValue of Object.values(item)) {
        if (
          itemValue
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase())
        ) {
          result.push(item);
          break;
        }
      }
    }

    setFilteredData(result);
  };

  const applyFilters = () => {
    if (!data) return [];

    let result = data;

    Object.entries(filtersValue).forEach(([key, value]) => {
      let stringKey = String(key);

      switch (stringKey) {
        case FILTER_TYPE.INSTITUTION_TYPE:
          result = optionFilterData(value, result);

          break;

        case FILTER_TYPE.COLLABORATION_SCORE:
          result = optionFilterData(value, result);
          break;
        case FILTER_TYPE.DATE:
          break;
      }
    });

    return result;
  };

  const optionFilterData = (filterValue, data) => {
    if (!filterValue || filterValue === "") return data;

    const updatedResult = [];

    for (const item of data) {
      for (const itemValue of Object.values(item)) {
        if (
          itemValue
            .toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase())
        ) {
          updatedResult.push(item);
          break;
        }
      }
    }

    data = updatedResult;

    return data;
  };

  const clearFilters = () => {
    const clearedFilters = {};
    Object.keys(filtersValue).forEach((filterValue) => {
      const stringFilterValue = String(filterValue);

      switch (stringFilterValue) {
        case FILTER_TYPE.INSTITUTION_TYPE:
          clearedFilters.institutionType = "";
          break;

        case FILTER_TYPE.COLLABORATION_SCORE:
          clearedFilters.collaborationScore = "";

        case FILTER_TYPE.DATE:
          clearedFilters.date = { from: "", to: "" };
          break;

        default:
          break;
      }
    });
    setFilterValues(clearedFilters);
  };

  const renderFilter = (filter) => {
    switch (filter) {
      case FILTER_TYPE.DATE:
        return (
          <DateFilter
            date={
              filtersValue?.date
                ? filtersValue.date
                : { from: "2010-10-10", to: "" }
            }
            setFilterValues={setFilterValues}
          />
        );
      case FILTER_TYPE.INSTITUTION_TYPE:
        return (
          <OptionFilter
            optionValue={
              filtersValue?.institutionType
                ? { institutionType: filtersValue.institutionType }
                : { institutionType: "" }
            }
            setFilterValues={setFilterValues}
            type={INSITUTION_TYPE}
            name={"Institution Type"}
          />
        );
      case FILTER_TYPE.COLLABORATION_SCORE:
        return (
          <OptionFilter
            optionValue={
              filtersValue?.collaborationScore
                ? { collaborationScore: filtersValue.collaborationScore }
                : { collaborationScore: "" }
            }
            setFilterValues={setFilterValues}
            type={COLLABORATION_SCORE}
            name={"Collaboration Score"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div style={{display:"flex", width: isLgBreakpoint ? "auto":"100%"}}>
        <Paper
          ref={paperRef}
          component="form"
          onSubmit={handleSearch}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            flex: 1,
            width: isLgBreakpoint? "100%": 330,
            background:
              theme === "dark"
                ? "var(--color-darker-green)"
                : "var(--color-light-gray)",
            borderRadius: "8px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, color: theme === "dark" ? "white" : "gray" }}
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="filter"
            onClick={handleFilterClick}
          >
            <FilterAltIcon sx={{ color: "var(--color-forest-green)" }} />
          </IconButton>
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleSearch}
          >
            <SearchIcon sx={{ color: "var(--color-forest-green)" }} />
          </IconButton>
        </Paper>

        <Menu
          id="base-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              className:
                " !bg-light-gray dark:!bg-deep-green dark:!text-white rounded-lg shadow-lg",
            },
          }}
        >
          {filters.map((filter) => (
            <MenuItem
              disableRipple
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&.Mui-selected": {
                  backgroundColor: "transparent",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "transparent",
                },
              }}
              key={filter}
            >
              {renderFilter(filter)}
            </MenuItem>
          ))}
          <MenuItem
            disableRipple
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&.Mui-selected": {
                backgroundColor: "transparent",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Button onClick={clearFilters}>Clear Filters</Button>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default Search;
