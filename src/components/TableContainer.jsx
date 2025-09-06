import useBreakpoints from "../hooks/useBreakpoints"

const TableContainer = ({children, desktopOffset="310", mobileoffset="440"}) => {
  const {isMdBreakpoint} = useBreakpoints();
  return (
    <div
        className="items-center space-y-3  md:mb-4 mt-8 bg-gray dark:bg-darker-green px-3 py-4 rounded-xl"
        style={{
          width: "100%",
          overflow: "auto",
          height: isMdBreakpoint ? `calc(100vh - ${desktopOffset}px)`: `calc(100vh - ${mobileoffset}px)`,
        }}
      >{children}</div>
  )
}

export default TableContainer