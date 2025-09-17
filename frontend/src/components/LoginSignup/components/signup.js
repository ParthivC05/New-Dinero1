'use client';
import { useState } from 'react';
import Banner from './banner';
import GoogleFacebookSignupButton from './googleSignupButton';
import SignupStepper from './stepper';
import AuthHeader from './header';
import Link from 'next/link';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {};

  return (
    <div className="w-full h-[100lvh] bg-custom-gradient">
      <AuthHeader />
      <div className="flex justify-center items-center gap-2">
        <SignupStepper />
        <div className="flex-row  justify-center items-center">
          <Banner />
          <form className=" flex flex-col justify-center items-center gap-6">
            <input
              className="w-full pl-8 rounded-xl p-2 border  bg-stone-800 "
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            <input
              className="w-full pl-8 rounded-xl p-2 border bg-stone-800 "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <div className=" flex flex-col items-center">
              <button
                className="px-8 py-2 rounded-3xl bg-orange-600 border-b-8  border-orange-700 text-white"
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
          <GoogleFacebookSignupButton />
        </div>
      </div>
    </div>
  );
}

export default Signup;
