import React, { FC } from "react";
import sunimg from "@/assets/image/sun.svg";
import moonimg from "@/assets/image/moon.svg";
import Image from "next/image";
import myimage from '@/assets/image/myimage1.jpg'

interface HearderType {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header: FC<HearderType> = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <>  <div  className={"flex justify-between  py-4 text-2xl p-3 dark:text-[#9eb8cf] dark:bg-[#091319] text-white bg-blue-500"}>
        <div>
          <span className="text-4xl font-semi-bold ">Todo</span>
        </div>

        <button onClick={toggleDarkMode} className={" "}>
          {" "}
          {!isDarkMode ? (
            <Image height={40} className="rounded-full" width={40} src={myimage} alt="Sun" />
          ) : (
            <Image src={myimage} alt="Moon" />
          )}{" "}
        </button>
      </div>
    </>
  );
};
export default Header;
