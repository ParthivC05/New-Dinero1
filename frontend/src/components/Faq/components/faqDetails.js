import React from 'react';
import { FAQ_MAPPING } from '../constant';

function FaqDetails({ index }) {
  console.log(index);
  const faq = FAQ_MAPPING.en[index];
  const { title, description, questions, list } = faq;
  console.log('length of questions', questions.length);
  console.log('length of lists', list.length);
  return (
    <div className=" pl-4 text-white">
      <h2 className="sm:text-lg  py-4">
        The Orion starsis a FREE-TO-PLAY online platform that operates in 2
        different modes:
        <span className="text-yellow-500"> Game coins mode</span> &{' '}
        <span className="text-green-500">Sweepstake Cash mode.</span>
      </h2>
      <h1 className="sm:text-xl pb-6 ">{title}</h1>
      {questions.length > 0 && (
        <div className="flex flex-col gap-4">
          {questions.map((item, idx) => {
            const { question, answer } = item;
            return (
              <div key={idx} className="">
                <h2 className=" pb-4 text-amber-300">{question}</h2>
                <p>{answer}</p>
              </div>
            );
          })}
        </div>
      )}
      {list.length > 0 && (
        <div className="">
          <ol className=" flex flex-col gap-4 list-decimal list-inside text-white sm:text-lg">
            {list.map((item, idx) => {
              const { point, subPoint } = item;
              return (
                <li key={idx}>
                  <span>{point}</span>
                  <section className="pt-4">
                    <ul className="list-disc list-inside pl-4">
                      {subPoint.length > 0 &&
                        subPoint.map((item, idx) => {
                          const { option } = item;
                          return (
                            <li key={idx} className=" pb-4">
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
