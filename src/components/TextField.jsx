import React from 'react';

const TextField = ({
  type,
  name,
  id,
  value,
  onChange,
  placeholder,
  helperText,
  error,
  label,
  minLength,
  required,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={(e) => onChange(e)}
        className={`bg-gray-50 border dark:bg-gray-600 ${
          error
            ? ' border-red-600 dark:border-red-500'
            : ' border-gray-300 dark:border-gray-500 '
        } text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 `}
        placeholder={placeholder}
        minLength={minLength}
        required={required}
      />
      <p className="text-xs text-red-600 dark:text-red-500">{helperText}</p>
    </>
  );
};

export default TextField;
