import React,{useState} from 'react'
import { eye, eyeOff } from '@/assets/svg';
import Image from 'next/image';

function InputPassword({ password, setPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
                <input
                  className="w-full pl-8 rounded-xl border  bg-stone-800 p-4 "
                  type={showPassword ? 'text' : 'password'}
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  id=""
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <Image src={eyeOff} alt="eye-off" />
                  ) : (
                    <Image src={eye} alt="eye" />
                  )}
                </div>
              </div>
  )
}

export default InputPassword
