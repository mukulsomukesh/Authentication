import React, { useEffect, useState } from 'react';
import CustomInput from '../Components/CustomInput';
import { IoPersonOutline } from 'react-icons/io5';
import CustomButton from '../Components/CustomButton';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../Redux/AuthReducer/action';


export default function Signup() {

  // define states
  const isSignupMessage = useSelector((state) => state.AuthReducer.isSignupMessage);
  const isSignupFail = useSelector((state) => state.AuthReducer.isSignupFail);
  const isSignupSuccess = useSelector((state) => state.AuthReducer.isSignupSuccess);
  const isSignupProcess = useSelector((state) => state.AuthReducer.isSignupProcess);
  const [userInput, setUserInput] = useState({ email: "", name: "", password: "" })
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
      name: userInput.name.trim(),
      email: userInput.email.trim(),
      password: userInput.password.trim()
    }


    // check if all flelds are filled
    if (!data.name.trim() || !data.email.trim() || !data.password.trim()) {
      toast.error('All fields are required.', { position: toast.POSITION.TOP_RIGHT });
      return;
    }

    // must must have atleastt 8 characters
    if (data.password.length < 8) {
      toast.error('Password must have at least 8 characters.', { position: toast.POSITION.TOP_RIGHT });
      return;
    }

    // check for valid email
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      toast.error('Please enter a valid email address.', { position: toast.POSITION.TOP_RIGHT });
      return;
    }

    // dispatch signup function
    dispatch(signUp(userInput))
  }


  // useEffect
  useEffect(() => {

    // signup success
    if (!isSignupProcess && isSignupSuccess) {
      toast.success(isSignupMessage + " Please Login!", { position: toast.POSITION.TOP_RIGHT });

      // reset user input
      setUserInput({ name: "", email: "", password: "" })
    }

    // signup fail
    else if (!isSignupProcess && isSignupFail) {
      toast.error(isSignupMessage, { position: toast.POSITION.TOP_RIGHT });
    }

  }, [isSignupProcess, isSignupSuccess, isSignupFail])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        {/* heading */}
        <p className="text-center mb-4 text-2xl font-bold ">Signup to continue.</p>

        {/* name input */}
        <CustomInput type={"text"} label={'Name'} value={userInput.name} onChange={handelCustomInputChange} placeholder={'Enter Your Full Name!'} icon={<IoPersonOutline />} />

        {/* email input */}
        <CustomInput type={"text"} label={'Email'} value={userInput.email} onChange={handelCustomInputChange} placeholder={'Enter Email!'} icon={<IoPersonOutline />} />

        {/* password input */}
        <CustomInput type={"password"} label={'Password'} value={userInput.password} onChange={handelCustomInputChange} placeholder={'Enter Your Password'} icon={<IoPersonOutline />} />

        {/* signup button */}
        <CustomButton onClick={handelCustomButtonClick} isProcessing={isSignupProcess} label="Signup" />

        {/* redirect to login page */}
        <p className='mt-5' > Already Have Account, <span onClick={() => { navigate("/login") }} className='font-bold text-primary-200 cursor-pointer ' >Login</span> </p>

      </div>

      <ToastContainer />
    </div>
  );
}