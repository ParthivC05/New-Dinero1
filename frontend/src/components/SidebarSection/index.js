'use client';
import { toggleLogo } from '@/assets/svg';
import { useIsMobile } from '@/hooks/use-mobile';
import { useStateContext } from '@/store';
import Image from 'next/image';
// import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { coins, usd } from '@/assets/svg';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from '../ui/sidebar';
import MobileCloseButton from './components/mobile-closebtn';
import NavContent from './components/nev-contwent';
import { pixiApplicationInit } from '@/pixi-js-scripts/bridge';
import Link from 'next/link';
// import Link from 'next/link';

export default function SidebarSection({ props }) {
  // const pathname = usePathname();
  // const isActive = pathname === '/get-coins';

  const { state } = useStateContext();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  const isMobile = useIsMobile();
  useEffect(() => {
    pixiApplicationInit();
  }, []);
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="bg-[hsl(var(--background))] !bg-[linear-gradient(rgb(24,17,26)_0%,rgb(27,15,26)_100%)]"
      open={state.leftPanel}
    >
      {/* <SidebarHeader className="shadow-xl hidden sm:block bg-[rgb(var(--header))] p-4">
        <SidebarTrigger
          className="ml-1 shiny-hover hover:border hover:border-white hover:bg-purple-900 group-data-[collapsible=icon]:ml-0"
          side="left"
          icon={
            <Image
              className="group-data-[collapsible=icon]:rotate-180 transition"
              src={toggleLogo}
              alt="logo"
              width={23}
              height={23}
            />
          }
          onClick={toggleSidebar}
        />
      </SidebarHeader> */}
      {isMobile && <MobileCloseButton />}
      <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollable-Content-Home bg-[linear-gradient(rgb(24,17,26)_0%,rgb(27,15,26)_100%)]">
        <SidebarContent className="p-2 group-data-[collapsible=icon]:px-2">
          <Link
            href={'/'}
            className="text-white font-bold cursor-pointer flex items-center justify-center"
          >
            <Image
              src="/logo.png"
              alt="company-logo"
              height={10}
              width={500}
              className="h-auto w-auto object-contain"
            />
          </Link>

          <div
            className="mb-6 mx-1 p-4 text-white border-2 border-yellow-400 rounded-2xl bg-[#18111A]"
            style={{ boxShadow: '0 0 16px 2px #FFD60088' }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-2">
                <Image
                  src={coins}
                  width={20}
                  height={20}
                  alt="CURRENCY"
                  className="transition-transform duration-300 ease-in-out h-[23] w-[23] sm:h-[20] sm:w-[20]"
                />
                <span className="font-bold text-lg">GC 7,500</span>
              </span>
              <span className="flex items-center gap-2">
                <Image
                  src={usd}
                  width={20}
                  height={20}
                  alt="CURRENCY"
                  className="transition-transform duration-300 ease-in-out h-[23] w-[23] sm:h-[20] sm:w-[20]"
                />
                <span className="font-bold text-lg">5.50</span>
              </span>
            </div>
            <div className="flex gap-2">
              {/* <Link
                href="/get-coins"
                className={`flex-1 font-bold rounded-xl bg-[#C0013A] py-2 hover:bg-[#A8002F] transition-colors text-center ${isActive && 'ring-2 ring-yellow-400'}`}
              >
                Get Coins
              </Link> */}
              <button className="flex-1 font-bold rounded-xl bg-[#C0013A] py-2 hover:bg-[#A8002F] transition-colors">
                Get Coins
              </button>
              <button className="flex-1 font-bold rounded-xl bg-[#C0013A] py-2 hover:bg-[#A8002F] transition-colors">
                Redeem
              </button>
            </div>
          </div>

          <NavContent isSidebarOpen={isOpen} />
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
