'use client';
import Banner from '@/components/LoginSignup/components/banner';
import GoogleFacebookSignupButton from '@/components/LoginSignup/components/googleSignupButton';
import AuthHeader from '@/components/LoginSignup/components/header';
import Link from 'next/link';
import React, { useState } from 'react';

import InputPassword from '@/components/LoginSignup/components/inputPassword';
import InputEmail from '@/components/LoginSignup/components/inputEmail';
import useLogin from '../hooks/useLogin';
import CustomToast from '@/common/components/custom-toaster';

function Login({setIsLogin}) {
  const [toast, setToast] = useState({
    showToast: false,
    message: '',
  });
  const { register, handleSubmit, onSubmit, isLoading, errors } = useLogin({
    setToast,
  });
  
  return (
    <>
      <div className=" p-2 h-full w-full bg-custom-gradient ">
        <AuthHeader />
        <Banner />

        <div className="max-w-xl mx-auto">
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputEmail register={register} errors={errors} />
            <InputPassword register={register} errors={errors} />
            <div className=" flex flex-col items-center">
              <button
                className=" w-1/2 px-8 py-2 rounded-3xl bg-orange-600 border-b-8 border-orange-700 hover:bg-orange-700 text-white transition-all transform hover:scale-105"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Play Now...' : 'Play Now'}
              </button>
              <button className="text-white underline hover:bg-transparent " 
                onClick={() => setIsLogin(false) }>
                Create an account
              </button>
            </div>
          </form>
        </div>

        <GoogleFacebookSignupButton />
      </div>
      <CustomToast
        showToast={toast.showToast}
        setShowToast={(val) =>
          setToast((prev) => ({ ...prev, showToast: val }))
        }
        message={toast.message}
        status={toast.status}
        duration={2000}
      />
    </>
  );
}

export default Login;
