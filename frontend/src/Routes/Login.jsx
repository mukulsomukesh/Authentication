import React, { useEffect, useState } from 'react';
import CustomInput from '../Components/CustomInput';
import { IoPersonOutline } from 'react-icons/io5';
import CustomButton from '../Components/CustomButton';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/AuthReducer/action';


export default function Login() {

  const isLoginMessage = useSelector((state) => state.AuthReducer.isLoginMessage);
  const isLoginFail = useSelector((state) => state.AuthReducer.isLoginFail);
  const isLoginSuccess = useSelector((state) => state.AuthReducer.isLoginSuccess);
  const isLoginProcess = useSelector((state) => state.AuthReducer.isLoginProcess);
  const [userInput, setUserInput] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handel custom input change
  const handelCustomInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }

  // handel Custom Button Click
  const handelCustomButtonClick = () => {

    // trim user input
    const data = {
      email: userInput.email.trim(),
      password: userInput.password.trim()
    }
  

    // check if all flelds are filled
    if (!data.email.trim() || !data.password.trim()) {
      toast.error('All fields are required.', { position: toast.POSITION.TOP_RIGHT });
      return;
    }

    // check for valid email
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      toast.error('Please enter a valid email address.', { position: toast.POSITION.TOP_RIGHT });
      return;
    }

    // dispatch login function
    dispatch(login(userInput))
  }


  // useEffect
  useEffect(()=>{

    // if login success
    if(!isLoginProcess && isLoginSuccess){
      toast.success( isLoginMessage , { position: toast.POSITION.TOP_RIGHT });

    //  redirect to home page
      navigate("/");
    }

    // if login fail
    else if(!isLoginProcess && isLoginFail){
      toast.error( isLoginMessage , { position: toast.POSITION.TOP_RIGHT });      
    }

  },[isLoginProcess, isLoginSuccess, isLoginFail])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        {/* heading */}
        <p className="text-center mb-4 text-2xl font-bold ">Login to continue.</p>


        {/* email input */}
        <CustomInput label={'Email'} type={"text"} value={userInput.email} onChange={handelCustomInputChange} placeholder={'Enter Email!'} icon={<IoPersonOutline />} />

        {/* password input */}
        <CustomInput label={'Password'} type={"password"} value={userInput.password} onChange={handelCustomInputChange} placeholder={'Enter Your Password'} icon={<IoPersonOutline />} />

        {/* login button */}
        <CustomButton onClick={handelCustomButtonClick} isProcessing={isLoginProcess} label="Login" />

        {/* redirect to login page */}
        <p className='mt-5' > Don't Have Account, <span onClick={() => { navigate("/signup") }} className='font-bold text-primary-200 cursor-pointer ' >Signup</span> </p>

      </div>

      <ToastContainer />
    </div>
  );
}