import React from 'react';

const BtnPrimary = ({ children, onClick, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
      {children}
    </button>
  );
};

export default BtnPrimary;
