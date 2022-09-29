import { IButtonProps } from "../../interfaces/inputs";

const Button = ({
  type,
  disabled,
  variant,
  isLoading = false,
  label,
  icon,
  handleClick,
}: IButtonProps) => {
  return (
    <>
      {variant === "icon" ? (
        <button
          className="p-2 border border-gray-300 hover:bg-gray-100"
          onClick={handleClick}
        >
          {icon}
        </button>
      ) : (
        <button
          type={type}
          disabled={disabled}
          onClick={handleClick}
          className={`w-full inline-flex items-center justify-center gap-2 h-10 py-2 px-4 text-sm font-semibold bg-primary rounded-lg focus:outline-none
            ${
              variant === "primary" &&
              "hover:bg-primaryHover border border-transparent text-white"
            }
            ${
              variant === "bordered" &&
              "bg-transparent hover:bg-gray-200 border border-gray-300 text-dark"
            }
            ${variant === "danger" && "bg-danger hover:bg-dangerHover text-white"}
          `}
        >
          {isLoading && (
            <div className="w-5 h-5 mr-2 rounded-full animate-ping bg-primary"></div>
          )}
          {label}
        </button>
      )}
    </>
  );
};

export default Button;
