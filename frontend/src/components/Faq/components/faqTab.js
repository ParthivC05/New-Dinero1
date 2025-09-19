import React from 'react';
import { TAB_CONTROLS } from '../constant';
import CustomSelect from '@/common/components/custom-select';

function FaqTab({ index, setIndex }) {
  return (
    <div className="pl-4  ">
      <div className=" hidden sm:block w-full bg-stone-800 sm:p-2 rounded ">
        <div className="flex justify-evenly">
          {TAB_CONTROLS.map((tab, idx) => {
            const { label, value } = tab;
            // const isActive = index === idx ? 'solid' : 'plain';
            const style =
              index === value
                ? 'bg-amber-300 text-white rounded-full p-2 px-4 hover:bg-amber-300 '
                : ' text-white hover:bg-amber-300 rounded-full p-2 px-4 ';
            return (
              <button
                key={idx}
                onClick={() => setIndex(value)}
                className={style}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="block sm:hidden  ">
        {/* <select className="bg-stone-800 text-white p-2 rounded-lg text-lg">
          <div className="w-1/2 rounded-lg  hover:bg-amber-300">
            {TAB_CONTROLS.map((tab, idx) => {
              const { label, value } = tab;
              return (
                <option key={idx} className="text-xs hover:bg-amber-300 ">
                  {label}
                </option>
              );
            })}
          </div>
        </select> */}
        <CustomSelect
          options={TAB_CONTROLS}
          selectedValue={index}
          onValueChange={setIndex}
          className="bg-stone-800 text-white p-6 text-md rounded-lg border-none"
          contentClassName="bg-stone-800 border-none hover:bg-amber-300"
        />
      </div>
    </div>
  );
}

export default FaqTab;
