"use client";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import EmailLink from "../Share/EmailLink";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#FBF4F9] px-[17.77vw] py-[4.44vw] text-[#117A73]">
      {/* 第一個 div：姓名與社群連結 */}
      <div className="flex items-center justify-between">
        <p className="text-[1.38vw]">許祐寧</p>

        <div className="flex items-center gap-[1.11vw] text-[1.38vw]">
          <Link
            href="https://www.instagram.com/neil_1126_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-transform duration-300 hover:scale-110"
          >
            <FaInstagram />
          </Link>

          <EmailLink />

          <Link
            href="https://github.com/guaguaman1126"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-transform duration-300 hover:scale-110"
          >
            <FaGithub />
          </Link>

          <Link
            href="https://www.linkedin.com/in/neil-hsu-867b91327/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-transform duration-300 hover:scale-110"
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>

      {/* 第二個 div：貓咪置中 */}
      <div className="flex justify-center">
        <Image
          src="/電腦貓貓.webp"
          alt="電腦貓貓"
          width={90}
          height={90}
          className="h-auto w-[6.25vw]"
        />
      </div>

      {/* 第三個 div：句子與版權 */}
      <div className="flex items-center justify-between text-[1.11vw]">
        <p>&quot;只要你很努力 你就會很努力&quot;</p>
        <p>© 2026 許祐寧</p>
      </div>
    </footer>

  );
}
