import { pascalCaseWord } from "../utils/textUtils";

const OptionFilter = ({ type, name, optionValue, setFilterValues }) => {

  const handleOnChange = (e) =>{

    setFilterValues(prev =>{
     let key = Object.keys(optionValue)[0];
      return { ...prev, [key]: e.target.value };
    })
  }

  return (
    <div>
      <select
        className="bg-gray-200 dark:bg-dark-gray dark:text-white p-5 sm:p-2 shadow-lg rounded-md outline-0 cursor-pointer  "
        name={name}
        value={Object.values(optionValue)[0]}
        onChange={handleOnChange}
      >
        <option value="">
          Choose {name}
        </option>
        {Object.entries(type).map(([key, value]) => (
          <option value={value} key={key}>
            {pascalCaseWord(key)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OptionFilter;
