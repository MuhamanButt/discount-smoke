import React, { useEffect } from "react";

const MyProgressBar = ({ width, flag }) => {
    useEffect(() => {
        console.log(width, flag);
    }, [width, flag]);
    
  return (
    <>
      {flag=="true" && (
        <div
          className="progress"
          role="progressbar"
          aria-label="Example 20px high"
          aria-valuenow={`${width}%`}
          aria-valuemin="0"
          aria-valuemax="100"
          styles={{ height: "5px" }}
        >
          <div className="progress-bar" styles={{ width: `${width}%` }}></div>
        </div>
      )}
    </>
  );
};

export default MyProgressBar;
