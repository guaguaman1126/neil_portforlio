"use client";

import CatIcon from "../Share/CatIcon";

import Link from "next/link";


export default function MobileNavbar() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <>
     
      <header className="w-full sticky inset-x-0 top-0 z-50 bg-[#FBF4F9]">
        <div className="relative flex w-full items-center justify-center px-[4.44vw] py-[1.11vw] gap-[4.44vw]">
          
          <Link href="/Resume" className="text-[#91CAC4] hover:text-[#117A73] text-[1.11vw] transition duration-200 hover:scale-110 ">
            Resume
          </Link>
          <Link href="/" className="aspect-square w-[3.33vw] transition-transform duration-200 hover:scale-110">
            <CatIcon />
          </Link>
          <Link href="/Project" className="text-[#91CAC4] hover:text-[#117A73] text-[1.11vw] transition duration-200 hover:scale-110 ">
            Project
          </Link>


        </div>
      </header>


    </>
  );
}
