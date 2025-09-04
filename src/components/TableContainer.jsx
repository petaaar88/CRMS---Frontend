import useBreakpoints from "../hooks/useBreakpoints"

const TableContainer = ({children}) => {
  const {isMdBreakpoint} = useBreakpoints();
  return (
    <div
        className="items-center space-y-3  md:mb-4 mt-8 bg-gray dark:bg-darker-green px-3 py-4 rounded-xl"
        style={{
          width: "100%",
          overflow: "auto",
          height: isMdBreakpoint ? "calc(100vh - 310px)": "calc(100vh - 440px)",
        }}
      >{children}</div>
  )
}

export default TableContainer