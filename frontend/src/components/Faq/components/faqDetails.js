import React from 'react';
import { FAQ_MAPPING } from '../constant';

function FaqDetails({ index }) {
  const faq = FAQ_MAPPING.en[index];
  const { title, description, questions, list } = faq;

  return (
    <div className=" pl-4 pt-[44px] text-white text-[16px] leading-[24px] ">
      <h2 className="py-4">
        The Orion starsis a FREE-TO-PLAY online platform that operates in 2
        different modes:
        <span className="text-yellow-500"> Game coins mode</span> &{' '}
        <span className="text-green-500">Sweepstake Cash mode.</span>
      </h2>
      <h1 className="text-[20px] leading-[30px] pb-6 font-medium ">{title}</h1>
      {questions.length > 0 && (
        <div className="flex flex-col gap-4 list-decimal list-inside">
          {questions.map((item, idx) => {
            const { question, answer } = item;
            return (
              <div key={idx} className="">
                <li className=" pb-4 text-amber-300">{question}</li>
                <p className="text-[14px] leading-[24px] font-normal">
                  {answer}
                </p>
              </div>
            );
          })}
        </div>
      )}
      {list.length > 0 && (
        <div className="">
          <ol className=" flex flex-col gap-4 list-decimal list-inside text-white text-[16px] leading-[24px]">
            {list.map((item, idx) => {
              const { point, subPoint } = item;
              return (
                <li key={idx}>
                  <span className="text-[16px] leading-[21px] font-normal">
                    {point}
                  </span>
                  <section className="pt-4">
                    <ul className="list-disc list-inside pl-4">
                      {subPoint.length > 0 &&
                        subPoint.map((item, idx) => {
                          const { option } = item;
                          return (
                            <li
                              key={idx}
                              className=" text-[14px] leading-[21px] font-normal pb-4"
                            >
                              {option}
                            </li>
                          );
                        })}
                    </ul>
                  </section>
                </li>
              );
            })}
          </ol>
        </div>
      )}
      {/* {description && <p className="sm:text-lg ">{description}</p>} */}
    </div>
  );
}

export default FaqDetails;
