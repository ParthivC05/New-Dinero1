'use client';
import React, { useState } from 'react';
import FaqTab from './faqTab';
import FaqDetails from './faqDetails';
import FaqHeader from './faqHeader';

function Faq() {
  const [index, setIndex] = useState('getStart');

  return (
    <div className=" bg-black max-sm:bg-custom-gradient p-2">
      <div className="flex flex-col gap-2">
        <FaqHeader />
        <h1 className="pl-4 sm:text-2xl">Frequently asked questions</h1>
        <FaqTab setIndex={setIndex} index={index} />
        <FaqDetails index={index} />
      </div>
    </div>
  );
}

export default Faq;
