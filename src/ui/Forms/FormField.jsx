import React from "react";

function FormField({ label, id, error, children }) {
  return (
    <div className="relative flex flex-col space-y-1">
      <div className="flex items-end justify-between">
        <label htmlFor={id} className="text-dark-sec">
          {label}
        </label>
        {error && (
          <span className="inline-block whitespace-nowrap rounded-lg border border-red-500 bg-red-300 px-6 py-2 text-sm text-red-600">
            {error.message}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export default FormField;
