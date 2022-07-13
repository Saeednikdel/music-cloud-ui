import { Close } from '@mui/icons-material';
import React from 'react';

export default function Popup({ title, children, openPopup, setOpenPopup }) {
  return (
    <div
      className={`${
        openPopup ? ' block ' : ' hidden '
      } fixed top-1/2 left-1/2 -translate-y-1/2 w-80 -translate-x-1/2 drop-shadow-lg z-50`}>
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => setOpenPopup(false)}
            type="button"
            className="absolute top-3 right-2.5 hover:bg-gray-200 dark:hover:bg-slate-500 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="authentication-modal">
            <Close className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
