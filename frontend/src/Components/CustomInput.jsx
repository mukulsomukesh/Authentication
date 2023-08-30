import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function CustomInput({ label, placeholder, onChange, value, type }) {

// define states
  const [showPassword, setShowPassword] = useState(false);

  // toggle password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-start mt-5">
      <label className="w-32 text-sm font-medium text-primary-900 dark:text-white">{label}</label>

      <div className="relative w-full">
        {/* input */}
        <input
          value={value}
          type={showPassword ? 'text' : type}
          name={label.toLowerCase()}
          id="custom-input"
          placeholder={placeholder}
          onChange={onChange}
          className="w-full bg-primary-50 border border-primary-300 text-primary-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 dark:text-white dark:focus:ring-primary-800 dark:focus:border-primary-800"
        />

        {/* display only for type == password */}
        {/* hide or show password */}
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3 bg-transparent"
            onClick={handleTogglePassword}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        )}
      </div>
    </div>
  );
}
