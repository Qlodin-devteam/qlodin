/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {  useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/app/store/store";
import { Loader } from "lucide-react";
import { setAuthData } from "@/app/store/authSlice";

const EmailVerificationPage = () => {

  const dispatch = useDispatch();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  // Fetch email from Redux store

  const email = useSelector((state: RootState) => state.auth.email);
  console.log(email); // Check if email is being retrieved

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Ensure only a single digit is stored

    setOtp(newOtp);

    if (value.length === 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otp[index]) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const otpValue = otp.join("");
      if (!email) {
        throw new Error("Email is not available. Please sign up again.");
      }
  
      const response = await axios.post(
        "https://qlodin-backend.onrender.com/api/user/auth/verify-email",
        { email, otp: otpValue },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API Response:", response);


      const { token, user } = response.data.data;

      // Save to Redux
      dispatch(
        setAuthData({
          token,
          userId: user._id,
          
        })
      );

      // Optionally save to localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", user._id);

    
  
      toast.success("Email verified successfully");
      router.push("/profile-set");
    } catch (error: any) {
      console.error("Verification Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to verify email");
    } finally {
      setLoading(false);
    }
  };
  
  // Auto-submit when all fields are filled
  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit") as unknown as React.FormEvent<HTMLFormElement>);
    }
  }, [otp]);


 




  
  const handleResendCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
       setLoading(true);

    try{
  

  
      const response = await axios.post(
        "https://qlodin-backend.onrender.com/api/user/auth/resend-otp",
        
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Verification code resent successfully");
    } catch (error: any) {
      console.error("Resend OTP  Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to Resend OTP ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <div className="flex flex-col items-center mt-10 justify-center">
        <a
          href="#"
          className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-10 h-10 my-2" src="/mail.png" alt="logo" />
        </a>
        <h1 className="text-[#1E1E1E] text-[30px] font-medium font-playfair">
          Qlodin.
        </h1>
        <h1 className="text-xl text-center text-black text-[28px] font-semibold font-['Quicksand'] leading-7 tracking-tight md:text-2xl dark:text-white">
          Verify Your Email
        </h1>
      </div>
      <p className="text-center text-black mb-6">
        Enter the 6-digit code sent to your email address.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <input
              type="text"
              value={otp[index]}
              key={index}
              maxLength={1}
              onChange={(e) => handleChange(index, e)}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 rounded-lg bg-gray-200 text-3xl font-bold text-center no-spinner"
            />
          ))}
        </div>

        <div className="px-8 py-4 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
    Didn’t receive the code?{" "}
    <button
      type="submit"
      
      className="text-black font-semibold hover:underline"
    >
      Resend Code
    </button>
  </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-black text-white font-bold py-3 px-4 rounded-lg shadow-lg
            hover:from-black hover:to-black focus:outline-none focus:ring-2
            focus:ring-yellow-500"
        >
              {" "}
            {loading ? (
              <Loader className=" text-white animate-spin mx-auto" size={24} />
            ) : (
              "Verify email"
            )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EmailVerificationPage;