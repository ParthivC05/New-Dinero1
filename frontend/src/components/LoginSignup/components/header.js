import Image from 'next/image';
import React from 'react';
import { X } from 'lucide-react';
import logo from '@/assets/png/logo-signup.png';
import Link from 'next/link';

function AuthHeader() {
  return (
    <header>
      <div className="flex  pl-6 items-left ">
        <Image src={logo} alt="logo" width={100} />
      </div>
    </header>
  );
}

export default AuthHeader;
