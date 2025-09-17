import React from 'react';

function InputEmail({ email, setEmail }) {
  return (
    <input
      className="w-full pl-8 rounded-xl border  bg-stone-800 p-4 "
      type="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email Address"
      id=""
    />
  );
}

export default InputEmail;
