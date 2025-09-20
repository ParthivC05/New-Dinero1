'use client';
import React, { useState } from 'react';
import FaqTab from './faqTab';
import FaqDetails from './faqDetails';
import FaqHeader from './faqHeader';

function Faq() {
  const [index, setIndex] = useState('getStart');

  return (
    <div className=" bg-black max-sm:bg-custom-gradient p-2">
      <div className="flex flex-col  font-ubuntu ">
        <FaqHeader />
        <h1 className="pl-4 pb-[27px] pt-[49px] text-[20px] leading-[30px] text-white hidden sm:block">
          Frequently asked questions
        </h1>
        <h1 className="pl-4 pb-[27px] text-[20px] leading-[30px] text-white block sm:hidden">
          Responsible Gaming
        </h1>
        <FaqTab setIndex={setIndex} index={index} />
        <FaqDetails index={index} />
      </div>
    </div>
  );
}

export default Faq;
