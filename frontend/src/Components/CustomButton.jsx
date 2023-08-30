import React from 'react';

export default function CustomButton({ label, onClick, isProcessing }) {
  return (
    <button
      onClick={onClick}
      disabled={isProcessing}
      className={`w-full mt-6 font-bold bg-primary-200 ${isProcessing
          ? 'cursor-not-allowed opacity-70'
          : 'hover:bg-primary-300 focus:ring-primary-300'
        } text-white py-2.5 rounded-lg transition duration-300 ease-in-out`}
    >
      {isProcessing ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Please Wait
        </div>
      ) : (
        label
      )}
    </button>
  );
}
