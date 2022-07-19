import { Close } from '@mui/icons-material';
import React from 'react';

export default function Popup({ title, children, openPopup, setOpenPopup }) {
  return (
    <div
      className={`${
        openPopup ? ' block ' : ' hidden '
      } fixed top-1/2 left-1/2 -translate-y-1/2 w-80 -translate-x-1/2 drop-shadow-lg z-50`}>
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-center p-2">
            <h3 className=" mx-2 text-xl font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              onClick={() => setOpenPopup(false)}
              type="button"
              className="hover:bg-gray-200 dark:hover:bg-slate-500 rounded-lg text-sm p-1.5"
              data-modal-toggle="authentication-modal">
              <Close className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
          <div className="px-4 pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
