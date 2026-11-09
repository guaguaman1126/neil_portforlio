import WavyFrame from "../Share/WavyFrame";
import { FaGithub } from "react-icons/fa6";
import { LuExternalLink } from "react-icons/lu";
import Link from "next/link";

export default function DeskProject() {
  return (
    <main className="w-full min-h-screen grid-background flex flex-col gap-[2.22vw] py-[4.44vw] text-[#117A73]">

      <div className=" px-[8.88vw]  text-[2.77vw]">
        Project
      </div>

      <section className="grid grid-cols-2 items-center gap-[4.44vw] rounded-[5vw] bg-[#F5E8F2] px-[8.88vw] py-[4.44vw] text-[#117A73]">
        {/* 左側圖片 */}
        <div>
          <WavyFrame
            frameLength="short"
            orientation="horizontal"
            imageSrc="/圖片/作品集.png"
            className="w-full"
          />
        </div>

        {/* 右側內容 */}
        <div className="flex flex-col h-full">
          <div className="mb-[2.22vw]">
            <h2 className="text-[1.66vw]">合唱混音器</h2>
            <p className="text-[1.11vw]">2026 年 8 月｜個人專案</p>
          </div>

          <ul className="mb-[2.22vw] flex flex-col gap-[1.11vw] text-[1.11vw] list-disc list-outside pl-[1.5vw]">
            <li>負責：全端開發</li>
            <li>
              簡介：網頁式合唱練習工具，支援多聲部音軌的同步播放與混音與音檔上傳編輯
            </li>
            <li>
              主要貢獻：音訊播放控制、Express API 與 Firebase 整合、管理員介面開發
            </li>
          </ul>
          {/* 圖示與連結 */}
          <div className="flex items-start mt-auto gap-[2.22vw]">
            <div className="flex flex-col items-center  transition-transform hover:scale-110">
              <div
                className="radial-progress mb-[0.55vw]"
                style={
                  {
                    "--value": 70,
                    "--size": "4.44vw",
                    "--thickness": "0.44vw",
                  } as React.CSSProperties
                }
                role="progressbar"
                aria-label="AI 生成使用比例"
                aria-valuenow={70}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="flex flex-col items-center text-[0.97vw]">
                  <span>70%</span>
                  <span>SLOP</span>
                </div>
              </div>
              <span className="text-[0.97vw]">AI生成使用</span>
            </div>

            <Link
              href="https://github.com/guaguaman1126/culture_cup_mixer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transition-transform hover:scale-110"
            >
              <FaGithub className="text-[4.44vw] mb-[0.55vw]" />
              <span className="text-[0.97vw]">github開源</span>
            </Link>

            <Link
              href="https://culture-cup-mixer.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transition-transform hover:scale-110"
            >
              <LuExternalLink className="text-[4.44vw] mb-[0.55vw]" />
              <span className="text-[0.97vw]">網站連結</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
