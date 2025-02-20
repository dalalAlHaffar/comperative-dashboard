import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
function SuccessAlert(props) {
  return (
    <>
      <div className="flex items-center p-4">
        <CheckCircleIcon className="w-6 h-6 text-green-500" />
        <span className="ml-3 text-sm font-medium text-gray-500">
          {props.message}
        </span>
        <button
          onClick={props.onClose}
          className="ml-auto bg-white  text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
      </div>
      <div className="h-1 bg-green-500 rounded-b-lg"></div>
    </>
  );
}

export default SuccessAlert;
