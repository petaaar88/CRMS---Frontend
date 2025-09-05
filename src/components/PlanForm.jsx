import { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import { ThemeContext } from "../contexts/ThemeContext";
import useBreakpoints from "../hooks/useBreakpoints";
import FORM_TYPE from "../types/formType.js";

const PlanForm = ({
  type,
  open,
  setNewPlan,
  newPlan,
  handleClose,
  handleSubmit,
  handleDelete = null,
  loadingDelete = null,
  loadingUpdate = null,
  loadingCreate = null,
}) => {
  const { theme } = useContext(ThemeContext);
  const { isSmBreakpoint } = useBreakpoints();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog
      maxWidth={"900"}
      open={open}
      fullWidth={!isSmBreakpoint}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className="bg-light-gray dark:bg-deep-green border-transparent outline-0 ">
        <button
          onClick={handleClose}
          className="absolute top-5 right-6 cursor-pointer"
        >
          <CloseIcon
            fontSize="large"
            sx={{ color: theme === "dark" ? "white" : "black" }}
          />
        </button>
        <h3 className="text-left font-bold text-3xl sm:text-2xl mt-3 sm:mt-1 mb-12 sm:mb-4 text-black dark:text-white pe-6 whitespace-normal break-words">
          {type === FORM_TYPE.UPDATE ? "Edit Plan" : "Create New Plan"}
        </h3>
        <form onSubmit={handleSubmit}>
          {/* institutionName + plannedVisitDate */}
          <div className="flex flex-col sm:flex-row gap-7 mb-8 sm:mb-5">
            <input
              className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md mb-1 sm:mb-0 outline-0 w-full sm:w-110 "
              type="text"
              name="institutionName"
              placeholder="Institution Name"
              value={newPlan?.institutionName || ""}
              onChange={handleChange}
              minLength={3}
              maxLength={30}
              required
            />
            <input
              className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full sm:w-110 "
              type="date"
              name="plannedVisitDate"
              placeholder="Planned Visit Date"
              value={newPlan?.plannedVisitDate || ""}
              onChange={handleChange}
              minLength="3"
              maxLength="700"
              required
            />
          </div>

          {/* plannedActivities (širina preko celog reda) */}
          <div className="flex flex-col sm:flex-row gap-7 mb-8 sm:mb-5">
            <textarea
              className="bg-dark-gray text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 w-full"
              name="plannedActivities"
              placeholder="Planned Activities"
              value={newPlan?.plannedActivities || ""}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          {/* dugmad */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-5">
            {type === FORM_TYPE.UPDATE ? (
              <>
                <button
                  className="bg-menu-button-light order-2 sm:order-1 dark:bg-dark-green dark:active:bg-darker-green cursor-pointer text-red-600 dark:text-red-600 disabled:bg-gray-700 dark:disabled:bg-gray-700 py-2 px-7 rounded-md font-bold shadow-md"
                  onClick={handleDelete}
                  type="button"
                  disabled={loadingUpdate || loadingDelete}
                >
                  {loadingDelete ? (
                    <div className="flex justify-center items-center">
                      <CircularProgress
                        size={20}
                        sx={{
                          color:
                            theme === "dark"
                              ? "var(--color-menu-button-dark)"
                              : "var(--color-button-light-green)",
                        }}
                      />
                    </div>
                  ) : (
                    "Delete"
                  )}
                </button>
                <button
                  className="bg-menu-button-light order-1 sm:order-2 mb-12 mt-5 sm:mb-0 sm:mt-0 dark:disabled:bg-gray-700 disabled:bg-gray-700 dark:bg-forest-green cursor-pointer text-black dark:text-white py-2 px-7 rounded-md font-bold shadow-md"
                  autoFocus
                  disabled={loadingUpdate || loadingDelete}
                >
                  {loadingUpdate ? (
                    <div className="flex justify-center items-center">
                      <CircularProgress
                        size={20}
                        sx={{
                          color:
                            theme === "dark"
                              ? "var(--color-menu-button-dark)"
                              : "var(--color-button-light-green)",
                        }}
                      />
                    </div>
                  ) : (
                    "Update"
                  )}
                </button>
              </>
            ) : (
              <button
                autoFocus
                disabled={loadingCreate}
                className="bg-menu-button-light order-1 sm:order-2 mb-12 mt-5 sm:mb-0 sm:mt-0 dark:disabled:bg-gray-700 disabled:bg-gray-700 dark:bg-forest-green cursor-pointer text-black dark:text-white py-2 px-7 rounded-md font-bold shadow-md"
              >
                {loadingCreate ? (
                  <div className="flex justify-center items-center">
                    <CircularProgress
                      size={20}
                      sx={{
                        color:
                          theme === "dark"
                            ? "var(--color-menu-button-dark)"
                            : "var(--color-button-light-green)",
                      }}
                    />
                  </div>
                ) : (
                  "Create New Plan"
                )}
              </button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlanForm;
