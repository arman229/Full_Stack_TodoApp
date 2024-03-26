"use client";
import React from "react";
import { FidgetSpinner, ProgressBar } from "react-loader-spinner";

const Myloading = () => {
  return (
    <FidgetSpinner
      visible={true}
      height="80"
      width="80"
      ariaLabel="fidget-spinner-loading"
      wrapperStyle={{}}
      wrapperClass="fidget-spinner-wrapper"
    />
  );
};
export const MyStatusloading = () => {
  return (
    <div style={{ backgroundColor: "red" }}>
      <ProgressBar
        visible={true}
        height="40"
        width="80"
        barColor="white"
        borderColor="green"
      />
    </div>
  );
};
export default Myloading;
