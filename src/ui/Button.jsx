import { LockRounded as Lock } from "@mui/icons-material";

function Button({
  children,
  type,
  disabled,
  buttonStyle,
  onClick,
  btnCounter,
  btnLocked,
}) {
  if (buttonStyle === "light")
    return (
      <button
        type={type}
        disabled={disabled}
        className="outline-blue w-full rounded-lg bg-dark-main p-3 font-medium text-dark-darkbg transition-all duration-300 hover:bg-dark-mainhover"
      >
        {children}
      </button>
    );

  if (buttonStyle === "border")
    return (
      <button
        type={type}
        disabled={disabled}
        className="outline-blue border-rounded cursor-pointer p-3 hover:border-dark-mainborderhover"
      >
        {children}
      </button>
    );

  if (buttonStyle === "border-light")
    return (
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className="outline-blue cursor-pointer rounded-lg border border-dark-mainborderlighter p-3 transition-all duration-300 hover:border-dark-mainborderhover"
      >
        {children}
      </button>
    );

  if (buttonStyle === "warning")
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="outline-red border-rounded w-fit bg-red-600 px-4 py-2 text-white hover:border-red-900 hover:bg-red-500"
      >
        {children}
      </button>
    );

  if (buttonStyle === "locked")
    return (
      <button
        type={type}
        disabled={btnLocked}
        onClick={onClick}
        className="flex w-fit cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-dark-mainborderhover bg-dark-mainborderlighter px-4 py-2 text-white transition-all duration-300"
      >
        <span>{btnCounter || 1}</span>
        <Lock color="#000" />
        {children}
      </button>
    );
}

export default Button;
