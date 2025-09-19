'use client';
import Banner from '@/components/LoginSignup/components/banner';
import GoogleFacebookSignupButton from '@/components/LoginSignup/components/googleSignupButton';
import AuthHeader from '@/components/LoginSignup/components/header';
import ReCAPTCHA from 'react-google-recaptcha';
import React, { useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import InputPassword from '@/components/LoginSignup/components/inputPassword';
import InputEmail from '@/components/LoginSignup/components/inputEmail';
import useLogin from '../hooks/useLogin';
function Login({ setIsLogin }) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY; 
  const { register, handleSubmit, onSubmit, isLoading, errors, setValue } =
    useLogin();
  const recaptchaRef = useRef(null);

  return (
    <>
      <div className=" sm:p-0  p-2 h-full w-full bg-custom-gradient ">
        <AuthHeader />
        <Banner />

        <div className="sm:max-w-lg max-w-xl mx-auto">
          <form
            className="flex sm:max-w-lg  flex-col gap-2 sm:gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputEmail register={register} errors={errors} />
            <InputPassword register={register} errors={errors} />

            <div className="flex  flex-col items-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={recaptchaSiteKey}
                onChange={(token) =>
                  setValue('reCaptcha', token, { shouldValidate: true })
                }
                theme="light"
                size="normal"
                aria-label="Complete reCAPTCHA verification"
              />
              <input
                type="hidden"
                className="hidden"
                {...register('reCaptcha', {
                  required: 'Please complete the reCAPTCHA verification.',
                })}
              />
              {errors.reCaptcha && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors.reCaptcha.message}
                </p>
              )}
            </div>

            <div className=" flex flex-col items-center">
              <button
                className=" w-1/2 px-8 py-2 rounded-3xl bg-orange-600 border-b-8 border-orange-700 hover:bg-orange-700 text-white transition-all transform hover:scale-105"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Play Now...' : 'Play Now'}
              </button>
              <button
                className="text-white underline hover:bg-transparent "
                onClick={() => setIsLogin(false)}
              >
                Create an account
              </button>
            </div>
          </form>
        </div>

        <GoogleFacebookSignupButton />
      </div>
    </>
  );
}

export default Login;
