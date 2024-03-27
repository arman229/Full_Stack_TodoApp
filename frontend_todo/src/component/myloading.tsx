"use client";
import "@/app/globals.css";
import React from "react";
import { FidgetSpinner, Rings } from "react-loader-spinner";

const Myloading = () => {
  return (
    <div className="  h-full w-full absolute top-0 left-0 flex justify-center items-center opacity-100">
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2   opacity-100">
        <FidgetSpinner
          visible={true}
          height="100"
          width="100"
          ballColors={["red", "blue", "green"]}
          wrapperClass="mycustomclass"
        />
      </div>
    </div>
  );
};
export const MyStatusloading = () => {
  return <Rings visible={true} height="30" width="60" color="#4fa94d" />;
};
export default Myloading;
