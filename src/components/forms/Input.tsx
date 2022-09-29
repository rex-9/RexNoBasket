import { IInputProps } from "../../interfaces/inputs";

const Input = ({
  required,
  type,
  name,
  label,
  placeholder,
  register,
  error,
  disabled,
}: IInputProps) => {
  return (
    <div>
      <div className="flex">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        {required && (
          <label className="block ml-1 text-sm font-medium text-danger">*</label>
        )}
      </div>
      <input
        {...register}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="block w-full h-10 px-3 my-1 placeholder-gray-400 border border-gray-300 appearance-none focus:outline-none sm:text-sm"
      />
      <p className="block text-xs font-medium text-danger">{error}</p>
    </div>
  );
};

export default Input;
