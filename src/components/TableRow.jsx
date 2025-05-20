const TableRow = ({ data = {} , color}) => {
    if (!Object.keys(data).length) return null;
  
    return (
      <div className="flex justify-around bg-stone-700 px-5 py-3 rounded-xl text-white">
        {Object.entries(data).map(([, value]) => (
          <p>
            {value}
          </p>
        ))}
      </div>
    );
  };
  
  export default TableRow;
  