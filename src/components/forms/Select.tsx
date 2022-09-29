import { ISelectProps } from "../../interfaces/inputs";

const Select = ({ value, options, handleSelectTeam }: ISelectProps) => {
  return (
    <select
      name="team"
      id="team"
      className="border border-gray-300 w-full h-10 px-3 outline-none focus:outline-none"
      onChange={(e) => handleSelectTeam(parseInt(e.target.value))}
      value={value}
    >
      {options.map((option, index: number) => (
        <option key={index} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
