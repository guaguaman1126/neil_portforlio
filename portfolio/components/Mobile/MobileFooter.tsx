"use client";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import EmailLink from "./MobileEmailLink";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-[8.2vw] px-[4.1vw] py-[8.2vw] bg-[#FBF4F9] text-[#117A73]">
      <div className="flex flex-col text-center gap-[2vw]">
        <p className="text-[5.12vw]">許祐寧</p>
        <p className="text-[4.1vw]">"只要你很努力 你就會很努力"</p>
      </div>
      <div className="flex flex-col items-center gap-[2vw]">
        <div className="flex text-[6.16vw] gap-[5.12vw]">
          <Link href="https://www.instagram.com/neil_1126_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-transform hover:scale-110"><FaInstagram /></Link>
          <EmailLink />
          <Link href="https://github.com/guaguaman1126" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-transform hover:scale-110"><FaGithub /></Link>
          <Link href="https://www.linkedin.com/in/neil-hsu-867b91327/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-transform hover:scale-110"><FaLinkedin /></Link>
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
