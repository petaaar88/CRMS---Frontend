const TableRow = ({ data = {} , color}) => {
    if (!Object.keys(data).length) return null;
  
    return (
      <div className="flex justify-around bg-gray dark:bg-dark-green px-5 py-3 rounded-xl text-black dark:text-white">
        {Object.entries(data).map(([, value]) => (
          <p>
            {value}
          </p>
        ))}
      </div>
    );
  };
  
  export default TableRow;
  