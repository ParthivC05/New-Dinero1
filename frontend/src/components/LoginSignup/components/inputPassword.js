import React, { useState } from 'react';
import { eye, eyeOff } from '@/assets/svg';
import Image from 'next/image';
import Link from 'next/link';

function InputPassword({ register, errors }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative ">
      <input
        className="w-full pl-8 rounded-xl border  bg-stone-800 p-2 "
        type={showPassword ? 'text' : 'password'}
        name="password"
        {...register('password', { required: 'Password is required' })}
        placeholder="Password"
        id="password"
      />
      <div className="flex justify-between items-center">
        {errors.password ? (
          <p role="alert" className="text-red-500">
            {errors.password.message}
          </p>
        ):(
            <p className='invisible'> </p>
              
          
        )}
        <Link className="text-white underline" href={'#'}>
          Forgot your password ?
        </Link>
      </div>
      <div
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-6 transform -translate-y-1/2 cursor-pointer"
      >
        {showPassword ? (
          <Image src={eyeOff} alt="eye-off" />
        ) : (
          <Image src={eye} alt="eye" />
        )}
      </div>
    </div>
  );
}

export default InputPassword;
