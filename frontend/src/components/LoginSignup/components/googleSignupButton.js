import React from 'react';
import LineWithText from './lineWithText';

function GoogleFacebookSignupButton() {
  return (
    <div>
      <LineWithText title="Or Register with" />
      <div className="flex gap-8 pt-4 justify-center items-center">
        <button className="bg-slate-100 px-4 py-2 rounded ">
          <span className="text-red-500 font-bold">G</span> Google
        </button>
        <button className="bg-slate-100 px-4 py-2 rounded ">
          <span className="text-blue-500 font-bold">f</span> Facebook
        </button>
      </div>
    </div>
  );
}

export default GoogleFacebookSignupButton;
