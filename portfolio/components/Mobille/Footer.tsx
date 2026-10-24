"use client";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-[8.2vw] px-[4.1vw] py-[8.2vw]">
      <div className="flex flex-col text-center gap-[2vw]">
        <p className="text-[5.12vw]">許祐寧</p>
        <p className="text-[4.1vw]">"只要你很努力 你就會很努力"</p>
      </div>
      <div className="flex flex-col items-center gap-[2vw]">
        <div className="flex text-[6.16vw] gap-[5.12vw]">
          <FaInstagram />
          <SiGmail />
          <FaGithub />
          <FaLinkedin />
        </div>

        <Image
          src="/電腦貓貓.webp"
          alt="電腦貓貓"
          width={100}
          height={100}
          className="h-auto w-[21.8vw]"
        />
        <p className="text-[3.6vw]">© 2026 許祐寧</p>


      </div>
    </footer>);
}