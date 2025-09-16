import React from 'react';

function LineWithText({ title }) {
  return (
    <div className="flex pt-4 justify-center gap-2 items-center">
      <hr className="w-1/3" />
      <span className="text-white">{title}</span>
      <hr className="w-1/3" />
    </div>
  );
}

export default LineWithText;
