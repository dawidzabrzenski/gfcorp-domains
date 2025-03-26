import React from "react";

function SelectInput({
  name,
  register,
  validation,
  options,
  additionalClasses = "",
  error,
}) {
  return (
    <select
      id={name}
      className={`outline-blue border-rounded w-full cursor-pointer bg-dark-darkbg px-3 py-2 hover:border-dark-mainborderhover ${additionalClasses} ${error ? "border-red-500" : ""}`}
      {...register(name, validation)}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectInput;
