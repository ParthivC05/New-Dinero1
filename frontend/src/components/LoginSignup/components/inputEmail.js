import { message } from '@/assets/svg';
import React from 'react';

function InputEmail({ register, errors }) {
  return (
    <div className="relative">
      <input
        className="w-full pl-8 rounded-xl border  bg-stone-800 p-2 "
        type="text"
        name="username"
        {...register('username', { required: 'username is required' })}
        placeholder="Email Address"
        id="username"
      />
      {errors.username && (
        <p role="alert" className="text-red-500">
          {errors.username.message}
        </p>
      )}
    </div>
  );
}

export default InputEmail;
