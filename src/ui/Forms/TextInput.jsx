import React from "react";

function TextInput({
  type = "text",
  name,
  placeholder,
  register,
  validation,
  additionalClasses = "",
  autoComplete,
}) {
  return (
    <input
      type={type}
      id={name}
      placeholder={placeholder}
      autoComplete={autoComplete || "off"}
      className={`outline-blue border-rounded w-full bg-dark-darkbg px-3 py-2 text-white placeholder:text-dark-placeholder hover:border-dark-mainborderhover ${additionalClasses}`}
      {...(register ? register(name, validation) : {})}
    />
  );
}

export default TextInput;
