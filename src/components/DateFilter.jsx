const DateFilter = ({date, setFilterValues}) => {

  return (
    <div className="flex gap-4 justify-center items-center">
      <div className="flex gap-3 justify-center items-center"> 
        <p>From</p>
        <input type="date" value={date.from} onChange={(e) => setFilterValues(prev => ({...prev, date:{from:e.target.value, to: prev.date.to}}))} className="bg-gray-200 dark:bg-darker-green py-1 px-2 rounded-md shadow cursor-pointer" />
      </div>
      <div className="flex gap-3 justify-center items-center">
        <p>To</p>
        <input type="date" value={date.to} onChange={(e) => setFilterValues(prev => ({...prev, date:{from: prev.date.from, to:e.target.value}}))} className="bg-gray-200 dark:bg-darker-green py-1 px-2 rounded-md shadow cursor-pointer" />
      </div>
    </div>
  );
};

export default DateFilter;
