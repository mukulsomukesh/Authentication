import React from 'react';
import CustomButton from '../Components/CustomButton';
import { useSelector } from 'react-redux';

export default function Home() {
  const LoginUserData = useSelector((state) => state.AuthReducer.LoginUserData);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border-2 border-primary-300 bg-white p-8 rounded-lg shadow-lg w-96 text-primary-900">
        {/* display name */}
        <p className="text-2xl mb-4">
          Hi <strong  >{LoginUserData.name}</strong>
        </p>

        {/* display email */}
        <p className="">
          You are logged in with <strong>{LoginUserData.email}</strong>
        </p>

      </div>
    </div>
  );
}
