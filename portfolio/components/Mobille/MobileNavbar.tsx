"use client";
import { useState } from "react";
import CatIcon from "../Share/CatIcon";
import MobileMenu from "./MobileMenu";


export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <>
    <MobileMenu isOpen={isMenuOpen} />
      <header className="w-full">
        <div className="relative flex w-full items-center justify-center px-[8.2vw] py-[4.1vw]">

          <div className="aspect-square w-[12.8vw]">
            <CatIcon />
          </div>
          <label className="absolute right-[8.2vw] top-[5.125vw] h-[9vw] w-[10.2vw] cursor-pointer rounded-[3vw] bg-white text-[#117A73] z-50">
            <input className="peer sr-only" type="checkbox" aria-label="切換選單" onChange={(event) => setIsMenuOpen(event.target.checked)} />

            <svg
              className="absolute left-1/2 top-1/2 h-[5vw] w-[5vw] -translate-x-1/2 -translate-y-1/2 fill-current opacity-100 transition-opacity peer-checked:opacity-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            <svg
              className="absolute left-1/2 top-1/2 h-[5vw] w-[5vw] -translate-x-1/2 -translate-y-1/2 fill-current opacity-0 transition-opacity peer-checked:opacity-100"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>


        </div>
      </header>

     
    </>
  );
}
