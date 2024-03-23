"use client";
import React from "react";
import { Circles } from "react-loader-spinner";

const Myloading = () => {
  return (
    <div className="flex flex-col  items-center justify-center mt-10 max-w- mx-auto    p-4 py-8  ">
      <Circles
        height={80}
        width={80}
        color="#325ff2"
        ariaLabel="circles-loading"
        visible={true}
      />
    </div>
  );
};

export default Myloading;
