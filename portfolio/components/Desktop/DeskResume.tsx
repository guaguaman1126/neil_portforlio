"use client";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { SiJavascript, SiNextdotjs, SiNodedotjs, SiReact, SiFigma, SiGithub } from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { GrMysql } from "react-icons/gr";
import EmailLink from "./DeskEmailLink";


export default function MobileResume() {
  return (
    <main className="w-full grid-background ">

      <section className="relative w-full h-[calc(100dvh-5.5vw-3vh)] overflow-hidden"
        role="img"
        aria-label="電腦貓貓"
        style={{
          backgroundImage: 'url("/電腦貓貓.webp")',
          backgroundSize: "auto 110%",
          backgroundPosition: "70% 8%",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 px-[0.86vw] py-[0.86vw] flex items-center justify-center rounded-[1vw] bg-white ">
          <span className="text-[4.44vw]  leading-tight">許祐寧</span>
        </div>
      </section>
      <section className="flex-col flex py-[8.88vw] px-[17.77vw]">
        <div className="pb-[vw] flex justify-between">
          <div className="relative left-[-0.4vw] text-[2.77vw]">自我介紹</div>
          <div className="flex text-[2.77vw] gap-[1.11vw]">
            <Link href="https://www.instagram.com/neil_1126_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-transform hover:scale-110"><FaInstagram /></Link>
            <EmailLink />
            <Link href="https://github.com/guaguaman1126" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-transform hover:scale-110"><FaGithub /></Link>
            <Link href="https://www.linkedin.com/in/neil-hsu-867b91327/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-transform hover:scale-110"><FaLinkedin /></Link>
          </div>
        </div>
        <div className="text-[1.11vw] mb-[2.22vw]">YU NING HSU | 26 November 2005</div>
        <div className=" w-full grid grid-cols-2 gap-0 ">
          <div className="text-[2.5vw] leading-[200%]">
            <span className="box-decoration-clone bg-white px-[vw] py-[vw]">
              我善於聆聽需求，
              <br />
              並將點子轉換為實際產品。
            </span>
          </div>
          <div className="text-[1.38vw] ">目前就讀國立政治大學資訊管理學系三年級，具備全端網頁開發、資料庫設計與 REST API 串接的實作經驗。
            <br />對系統分析、專案發想、使用者需求研究及人機介面充滿興趣。
          </div>
        </div>


      </section>
      <div className="flex">
        <div className=" w-[50vw] aspect-square overflow-hidden rounded-[5vw]"
          role="img"
          aria-label="我"
          style={{
            backgroundImage: 'url("/圖片/aboutMeMe.jpg")',
            backgroundSize: "auto 240%",
            backgroundPosition: "50% 45%",
            backgroundRepeat: "no-repeat",
          }}>
        </div>

        <div className="w-[50vw] aspect-square overflow-hidden rounded-[5vw] bg-[#F5E8F2]"
          role="img"
          aria-label="我"
          style={{
            backgroundImage: 'url("/眼鏡貓貓.webp")',
            backgroundSize: "auto 150%",
            backgroundPosition: "50% 0%",
            backgroundRepeat: "no-repeat",
          }}>
        </div>
      </div>

      <section className="w-full py-[8.88vw] px-[17.77vw]">
        <div>
          <div className="w-full border-t-[0.3vw] border-[#16877e] rounded-full"></div>
          <p className="text-[1.66vw] mb-[2.22vw]">技術技能</p>
          
          <div className="w-full flex justify-between gap-[4.44vw] mb-[8.88vw]">
          {/* <div className="grid w-full grid-cols-[4fr_6fr]  mb-[8.88vw]"> */}
            <div>
              <p className="text-[1.38vw] mb-[1.11vw]">Programming & Data</p>
              <div className=" flex items-center gap-[2.22vw] text-[5vw]">
                <SiJavascript title="JavaScript" />
                <GrMysql title="MySQL" />
                <FaJava title="Java" />
              </div>
            </div>


            <div>
              <p className="text-[1.38vw] mb-[1.11vw]">Web Development</p>
              <div className="flex items-center gap-[2.22vw] text-[5vw]">
                <SiNextdotjs title="Next.js" />
                <SiNodedotjs title="Node.js" />
                <SiReact title="React" />
                <SiFigma title="Figma" />
                <SiGithub title="GitHub" />
              </div>
            </div>
          </div>

        </div>


        <div className="w-full border-t-[0.3vw] border-[#16877e] rounded-full"></div>
        <p className="text-[1.66vw] mb-[2.22vw]">社團經歷</p>
        <p className="text-[1.38vw]  ">政大 Soobi 社 | 副社長</p>
        <p className="text-[1.11vw] mb-[1.11vw]">September 2025 - August 2026</p>
        <p className=" text-[1.11vw] ">
          • 運用 Meowbit 與 micro:bit 進行 STEM 課程教學。
          <br />• 為 30 名國小學童舉辦為期五天的營隊活動。</p>

      </section>

    </main>
  );
}
