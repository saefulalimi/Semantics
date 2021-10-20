import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const ErrorModal = ({ message, closeModal }) => {
  return (
    <div>
      <div className="flex w-full md:w-1/3 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className=" flex items-center justify-center w-12 bg-red-500">
          <svg
            className="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
          </svg>
        </div>
        <div className="flex w-full justify-between items-center px-2 py-2 md:px-4 ">
          <div className="mx-3 mt-2">
            <span className="font-semibold text-red-500 dark:text-red-400">
              Error
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-200">
              {message}
            </p>
          </div>
          <button onClick={closeModal}>
            <AiFillCloseCircle size="1.3rem" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
