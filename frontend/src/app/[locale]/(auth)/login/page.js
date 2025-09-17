'use client';
import Banner from '@/components/LoginSignup/components/banner';
import GoogleFacebookSignupButton from '@/components/LoginSignup/components/googleSignupButton';
import AuthHeader from '@/components/LoginSignup/components/header';
import Link from 'next/link';
import React, { useState } from 'react';

import InputPassword from '@/components/LoginSignup/components/inputPassword';
import InputEmail from '@/components/LoginSignup/components/inputEmail';

function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className=" p-6 h-screen w-full bg-custom-gradient ">
      <AuthHeader />
      <Banner />

      <div className="max-w-xl mx-auto">
        <form className="flex flex-col gap-4 ">
          <InputEmail email={email} setEmail={setEmail} />
          <InputPassword password={password} setPassword={setPassword} />
          <div className=" flex flex-col items-center">
            <button
              className=" w-1/2 px-8 py-2 rounded-3xl bg-orange-600 border-b-8 border-orange-700 hover:bg-orange-700 text-white transition-all transform hover:scale-105"
              type="submit"
            >
              Play Now
            </button>
            <Link className="text-white underline pt-2" href={'#'}>
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>

      <GoogleFacebookSignupButton />
    </div>
  );
}

export default page;
