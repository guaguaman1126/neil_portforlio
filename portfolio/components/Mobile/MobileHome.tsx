"use client";
import Image from "next/image";
import WavyFrame from "../Share/WavyFrame";
import CatStrip from "./MobileCatStrip";
import { useCareerTimeline, TIMELINE_BTM } from "@/hooks/useCareerTimeline";

export default function MobileHome() {

  const { middleCatRef, movingCatRef, registerText, showCat, revealed, isFalling, finished } =
    useCareerTimeline();

  return (
    <main className="h-full w-full grid-background">
      {/* 移動貓咪 */}
      <div
        ref={movingCatRef}
        className="pointer-events-none  fixed left-1/2  z-50 -translate-x-1/2"
        style={{
          top: `${TIMELINE_BTM * 100}%`,
          opacity: (showCat || isFalling) && !finished ? 1 : 0,
        }}
      >
        <Image
          src={revealed[0] && !isFalling ? "/眼鏡貓貓.webp" : "/貓咪下墜.webp"}
          alt=""
          width={70}
          height={87}
          sizes="18vw"
          className={revealed[0] ? "h-auto w-[18vw]" : "h-auto w-[12vw]"}
        />
      </div>

      <div className="@container w-full h-full px-[4.1vw] ">
        <WavyFrame frameLength="short" orientation="vertical" imageSrc="/圖片/手機首頁圖.webp" className="w-full" />

        <section className=" w-full flex flex-col items-center justify-center py-[16.4vw] gap-[8.2vw]">

          <div className="text-[5.1vw] leading-[200%] w-full">
            <span className="box-decoration-clone bg-white px-[1vw] py-[1vw]">
              一個很愛亂焦慮的資管大學生。<br />
              焦慮驅動everything~<br />
              夢想是可以 Work Life Balance
              <br />保持美好精神狀態🤪<br />
            </span>
          </div>

          <p className="text-[4vw] w-full ">
            #活網仔<br />
            每天於 Threads、IG、Dcard 三點一線，照三餐滑。<br />
            最喜歡抽象腦腐的怪咚咚，<br />
            每日定時攝取迷因，保持身心靈富足。<br />
            <br />
            #真誠<br />
            自己講（？<br />
            喜歡理解不同人的想法，也重視每次跟人相處。<br />
            我希望能坦率表達、仔細聆聽，<br />
            遇到不懂的事情也願意請教！<br />
            <br />
            #AI勒戒狀態<br />
            喜歡寫寫程式讓自己的怪點子實現。<br />
            但最近有點ai疲勞，<br />
            嘗試重零開始復興傳統手搓程式碼文化，<br />
            某方面也是怕自己被職場淘汰。<br />
            <br />
            希望可以認識和我一樣充滿奇思妙想的怪怪人類！
          </p>
        </section>
      </div>
      <section className="relative">
        <CatStrip middleCatRef={middleCatRef} changePic={showCat || finished || isFalling} />

        <div className="flex w-full flex-col rounded-[13vw] bg-[#F5E8F2] px-[4.1vw] py-[16.4vw] ">
          <div className="w-full">

            <p className="text-center text-[5.1vw] ">我的生涯軌跡</p>

            <div className="relative  h-full px-[4.1vw] pt-[4.1vw] flex flex-col items-center gap-[4.1vw] ">

              <div className="pointer-events-none absolute inset-y-[10vw] left-1/2 w-[1vw]  -translate-x-1/2 bg-white z-0" />

              {/* 之後放照片與文字 */}

              <WavyFrame frameLength="short" orientation="horizontal" imageSrc="/圖片/國小.jpg"
                className={revealed[0] ? "opacity-100" : "opacity-0"}
              />
              <div
                ref={(element) => {
                  // React 掛上這個 div 時，將它存進第 0 格；移除時會收到 null。
                  registerText(0, element);
                }}
                className="relative z-10 transition-opacity duration-400 ease-in-out"
                style={{ opacity: revealed[0] ? 1 : 0 }}
              >
                <div className="flex flex-col gap-[2.05vw]  ">
                  <p className="text-center text-[4.1vw]">縣立二林國民小學</p>
                  <p className="text-center text-[3.6vw] leading-[1.25]">於二林國小不知道第幾屆校際運動會不知道甚麼項目第三名</p>
                </div>
              </div>


              <WavyFrame frameLength="short" orientation="horizontal" imageSrc="/圖片/國中.jpg"
                className={revealed[1] ? "opacity-100" : "opacity-0"} />
              <div
                ref={(element) => {
                  registerText(1, element);
                }}
                className="relative z-10 transition-opacity duration-400 ease-in-out"
                style={{ opacity: revealed[1] ? 1 : 0 }}
              >
                <div className="flex flex-col gap-[2.05vw] z-10 ">
                  <p className="text-center text-[4.1vw]">縣立竹塘國民中學</p>
                  <p className="text-center text-[3.6vw] leading-[1.25]">直笛合奏比賽（安慰獎），直笛隊是猴子國中裡的淨土，愛直笛隊一生推</p>
                </div>
              </div>


              <WavyFrame frameLength="short" orientation="horizontal" imageSrc="/圖片/高中.jpg"
                className={revealed[2] ? "opacity-100" : "opacity-0"} />
              <div
                ref={(element) => {
                  registerText(2, element);
                }}
                className="relative z-10 transition-opacity duration-400 ease-in-out"
                style={{ opacity: revealed[2] ? 1 : 0 }}
              >
                <div className="flex flex-col gap-[2.05vw] z-10 ">
                  <p className="text-center text-[4.1vw]">縣立員林高級中學</p>
                  <p className="text-center text-[3.6vw] leading-[1.25]">高中在熱音社當公關，明明也沒多有趣但就超級無敵懷念到爆炸死</p>
                </div>
              </div>

              <WavyFrame frameLength="short" orientation="horizontal" imageSrc="/圖片/大學.jpg"
                className={revealed[3] ? "opacity-100" : "opacity-0"} />

              <div
                ref={(element) => {
                  registerText(3, element);
                }}
                className="relative z-10 transition-opacity duration-400 ease-in-out "
                style={{ opacity: revealed[3] ? 1 : 0 }}
              >
                <div className="flex flex-col gap-[2.05vw] z-10 ">
                  <p className="text-center text-[4.1vw]">國立政治大學</p>
                  <p className="text-center text-[3.6vw] leading-[1.25]">於校內文化盃合唱比賽擔任副招，好喜歡跟大家一起唱歌，很幸福~</p>
                </div>
              </div>

              <div
                className="pointer-events-none  w-[18vw] z-10"
                style={{
                  opacity: finished ? 1 : 0,
                }}
              >
                <Image
                  src="/眼鏡貓貓.webp"
                  alt="眼鏡貓貓"
                  width={70}
                  height={87}
                  sizes="18vw"
                  className="block h-auto w-full"
                />
              </div>




            </div>

          </div>
        </div>
      </section>
      {/* 
        
       */}
    </main >
  );
}
