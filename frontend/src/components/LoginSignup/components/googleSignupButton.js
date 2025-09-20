import React from 'react';
import LineWithText from './lineWithText';
import Image from 'next/image';

function GoogleFacebookSignupButton() {
  return (
    <div className="max-w-xl mx-auto">
      <LineWithText title="Or Register with" />
      <div className="flex gap-8 pt-4 sm:p-2 justify-center items-center">
        <button
          className="bg-slate-100 flex justify-center items-center hover:bg-gray-100 transition-colors  px-4 py-2 rounded "
          onClick={() => {
            window.location.href =
              process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/auth/sso/google';
          }}
        >
          <Image
            src="https://img.icons8.com/color/24/000000/google-logo.png"
            className="w-5 h-5 mr-3"
            width={5}
            height={5}
            alt="Google logo"
            aria-hidden="true"
          />
          <span>Google</span>
        </button>
        <button
          onClick={() => {
            window.location.href =
              process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/auth/sso/facebook';
          }}
          className="bg-slate-100 flex justify-center items-center hover:bg-gray-100 transition-colors  px-4 py-2 rounded"
        >
          <Image
            src="https://img.icons8.com/color/24/000000/facebook-new.png"
            className="w-5 h-5 mr-3"
            width={5}
            height={5}
            alt="Facebook logo"
            aria-hidden="true"
          />
          <span>Facebook</span>
        </button>
      </div>
    </div>
  );
}

export default GoogleFacebookSignupButton;
