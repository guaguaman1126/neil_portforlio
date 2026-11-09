import WavyFrame from "../Share/WavyFrame";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { LuExternalLink } from "react-icons/lu";
import Link from "next/link";

export default function MobileProject() {
  return (
    <main className="w-full min-h-screen grid-background  py-[16.4vw] text-[#117A73]">
      <div className="mb-[8.2vw] text-[10.25vw] px-[4.1vw]">Project</div>
      <section>
        <div className=" collapse collapse-arrow py-[8.2vw] bg-[#F5E8F2] px-[4.1vw] rounded-[13vw]">
          <input type="checkbox" />
          <div className="collapse-title p-0">
            <div className="mb-[2vw] text-[5.12vw]">合唱混音器</div>
            <div className=" text-[4.1vw]">2026 年 8 月｜個人專案</div>
          </div>
          <div className="collapse-content p-0">
            <div className="py-[4.1vw] ">
              <WavyFrame
                frameLength="short"
                orientation="horizontal"
                imageSrc="/圖片/作品集.png"
                className="mb-[4.1vw]"
              />

              <div className="mb-[4.1vw] text-[4.1vw]">&nbsp;• 負責：全端開發</div>
              <div className="mb-[4.1vw] text-[4.1vw]">&nbsp;• 簡介：網頁式合唱練習工具，支援多聲部音軌的同步播放與混音與音檔上傳編輯</div>
              <div className="mb-[8.2vw] text-[4.1vw]">&nbsp;• 主要貢獻：音訊播放控制、Express API 與 Firebase 整合、管理員介面開發</div>

              <div className="flex justify-around text-[4.1vw]">
                <Link href="#" target="_blank" className="flex flex-col items-center transition-transform">
                  <div
                    className="radial-progress mb-[2vw]"
                    style={
                      {
                        "--value": 70,
                        "--size": "16.4vw",
                        "--thickness": "2vw",
                      } as React.CSSProperties
                    }
                    role="progressbar"
                  >
                    <div className="flex flex-col items-center text-[3vw]">
                      <div>70%</div>
                      <div>SLOP</div>
                    </div>
                  </div>
                  <div className="text-[4.1vw]">AI生成使用</div>
                </Link>

                <Link href="https://github.com/guaguaman1126/culture_cup_mixer" target="_blank" className="flex flex-col items-center transition-transform hover:scale-110">
                  <FaGithub className="mb-[2vw] text-[16.4vw]" />
                  <div className="text-[4.1vw]">github開源</div>
                </Link>

                <Link href="https://culture-cup-mixer.onrender.com/" target="_blank" className="flex flex-col items-center transition-transform hover:scale-110">
                  <LuExternalLink className="mb-[2vw] text-[16.4vw]" />
                  <div className="text-[4.1vw]">網站連結</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
