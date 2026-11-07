"use client";

import CatIcon from "../Share/CatIcon";

import Link from "next/link";


export default function MobileNavbar() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <>
     
      <header className="w-full sticky inset-x-0 top-0 z-50 bg-[#FBF4F9]">
        <div className="relative flex w-full items-center justify-center px-[4.44vw] py-[1.11vw] gap-[4.44vw]">
          
          <Link href="/resume" className="text-[#91CAC4] hover:text-[#117A73] text-[1.11vw] transition-colors duration-300">
            Resume
          </Link>
          <div className="aspect-square w-[3.33vw]">
            <CatIcon />
          </div>
          <Link href="/project" className="text-[#91CAC4] hover:text-[#117A73] text-[1.11vw] transition-colors duration-300">
            Project
          </Link>


        </div>
      </header>


    </>
  );
}
