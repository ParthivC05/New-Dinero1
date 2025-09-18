'use client';
import { useState } from 'react';
import Banner from './banner';
import GoogleFacebookSignupButton from './googleSignupButton';
import SignupStepper from './stepper';
import AuthHeader from './header';
import Link from 'next/link';
import InputEmail from './inputEmail';
import InputPassword from './inputPassword';
import useSignupAuth from '../hooks/useSignupAuth';
import CustomToast from '@/common/components/custom-toaster';

function Signup() {
  const [toast, setToast] = useState({
    showToast: false,
    message: '',
  });
  const { register, handleSubmit, onSubmit, isLoading, errors } = useSignupAuth(
    { setToast }
  );

  return (
    <div className="p-6 h-screen w-full  bg-custom-gradient">
      <AuthHeader />
      <div className="md:flex md:justify-center md:items-center md:gap-2">
        <SignupStepper />
        <div>
          <Banner />
          <div className="max-w-xl mx-auto">
            <form
              className=" flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputEmail register={register} errors={errors} />
              <InputPassword register={register} errors={errors} />
              <div className=" flex flex-col items-center">
                <button
                  className=" w-1/2 px-8 py-2 rounded-3xl bg-orange-600 border-b-8  border-orange-700 hover:bg-orange-700 text-white transition-all transform hover:scale-105"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Play Now...' : 'Play Now'}
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
      <CustomToast
        showToast={toast.showToast}
        setShowToast={(val) =>
          setToast((prev) => ({ ...prev, showToast: val }))
        }
        message={toast.message}
        status={toast.status}
        duration={2000}
      />
    </div>
  );
}

export default Signup;
