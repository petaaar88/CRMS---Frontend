const TableRow = ({ data = {} , isHeader = false}) => {
    if (!Object.keys(data).length) return null;
  
    const classNameColor = isHeader ? 
    "flex justify-around bg-menu-button-light dark:bg-button-dark-green px-5 py-3 rounded-xl text-black dark:text-white":
    "flex justify-around bg-gray dark:bg-deep-green px-5 py-3 rounded-xl text-black dark:text-white" ;

    return (
      <div className = {classNameColor}>
        {Object.entries(data).map(([key, value]) => (
          <p key={key}>  
             {isHeader? key : value}
          </p>
        ))}
      </div>
    );
  };
  
  export default TableRow;
  