import React from 'react';
import useSignup from '../hooks/useSignup';

function Banner() {
  const { signupData, signupLoading, signupError } = useSignup();
  return (
    <div className="w-1/2">
      {signupError && <h1>{signupError}</h1>}
      {signupLoading ? (
        <h1>Loading</h1>
      ) : signupData?.length > 0 ? (
        signupData?.map((banner, index) => (
          <a
            key={index}
            href={banner?.imageUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <img
              src={
                banner?.imageUrl || 'https://luckybird.io/img/back.47e88397.png'
              }
              alt={`banner-${index}`}
              className="h-[434px] w-full max-h-[434px] object-cover object-right"
            />
          </a>
        ))
      ) : (
        <img
          src="https://luckybird.io/img/back.47e88397.png"
          alt="default banner"
          className="h-auto w-full max-h-[434px] object-cover"
        />
      )}
    </div>
  );
}

export default Banner;
