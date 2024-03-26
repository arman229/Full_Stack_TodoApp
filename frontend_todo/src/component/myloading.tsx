"use client";
import "@/app/globals.css";
import React from "react";
import { FidgetSpinner, Rings } from "react-loader-spinner";

const Myloading = () => {
  return (
    <FidgetSpinner
      visible={true}
      height="100"
      width="100"
      ariaLabel="fidget-spinner-loading"
      wrapperStyle={{}}
      wrapperClass="mycustomclass"
    />
  );
};
export const MyStatusloading = () => {
  return (
    <Rings
      visible={true}
      height="30"
      width="60"
      color="#4fa94d"
       
    />
  );
};
export default Myloading;
