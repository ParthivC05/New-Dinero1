import Image from 'next/image';
import React from 'react';
import { X } from 'lucide-react';
import logo from '@/assets/png/logo-signup.png';
import Link from 'next/link';

function AuthHeader() {
  return (
    <header>
      <div className="flex p-0 items-center justify-between">
        <Image src={logo} alt="logo" width={100} />
        <Link href={'/'}>
          <X size={40} />
        </Link>
      </div>
    </header>
  );
}

export default AuthHeader;
