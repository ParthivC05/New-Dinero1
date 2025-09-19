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
import CoinToggler from './CoinToggler';
import BuyReedem from '../Buy-Reedem/components';
import useHeader from '../Header/hooks/useHeader';

export default function SidebarSection({ props }) {
  const { state } = useStateContext();
  const { handleClick, isOpen, clickedButton, handleButtonClick } = useHeader();
  const isMobile = useIsMobile();
  useEffect(() => {
    pixiApplicationInit();
  }, []);
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="!bg-new-primary"
      open={state.leftPanel}
    >
      {isMobile && <MobileCloseButton />}
      <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollable-Content-Home bg-new-primary">
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
            <CoinToggler />
            <div className="flex gap-2">
              <button
                className="flex-1 font-bold rounded-xl bg-[#C0013A] py-2 hover:bg-[#A8002F] transition-colors"
                onClick={() => handleButtonClick('buy')}
              >
                Get Coins
              </button>
              <button
                className="flex-1 font-bold rounded-xl bg-[#C0013A] py-2 hover:bg-[#A8002F] transition-colors"
                onClick={() => handleButtonClick('redeem')}
              >
                Redeem
              </button>
            </div>
          </div>

          {isOpen && (
            <BuyReedem
              isOpen={isOpen}
              handleClick={handleClick}
              buttonType={clickedButton}
            />
          )}

          <NavContent />
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
