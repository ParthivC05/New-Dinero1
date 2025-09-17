'use client';
import { useState } from 'react';
import Banner from './banner';
import GoogleFacebookSignupButton from './googleSignupButton';
import SignupStepper from './stepper';
import AuthHeader from './header';
import Link from 'next/link';
import InputEmail from './inputEmail';
import InputPassword from './inputPassword';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {};

  return (
    <div className="p-6 h-screen w-full bg-custom-gradient">
      <AuthHeader />
      <div className="flex justify-center items-center gap-2">
        <SignupStepper />
        <div className="flex-row  justify-center items-center">
          <Banner />
          <div className="max-w-xl mx-auto">
            <form className=" flex flex-col gap-4">
              <InputEmail email={email} setEmail={setEmail} />
              <InputPassword password={password} setPassword={setPassword} />
              <div className=" flex flex-col items-center">
                <button
                  className=" w-1/2 px-8 py-2 rounded-3xl bg-orange-600 border-b-8  border-orange-700 hover:bg-orange-700 text-white transition-all transform hover:scale-105"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Play Now
                </button>
                <p className="text-white">
                  Already got an account?{' '}
                  <Link className="underline" href={'/login'}>
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <GoogleFacebookSignupButton />
        </div>
      </div>
    </div>
  );
}

export default Signup;
