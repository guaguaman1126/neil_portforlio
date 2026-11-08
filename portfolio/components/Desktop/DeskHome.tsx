"use client";
import Image from "next/image";
import WavyFrame from "../Share/WavyFrame";
import SpecWavyFrame from "../Desktop/SpecWavyFrame";

import { animateScrollTo } from "@/lib/animateScrollTo";
import { useEffect, useRef } from "react";
import { useDesktopCatIntro } from "@/hooks/useDesktopCatIntro";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";



const stages = [
  {
    label: "國小",
    image: "/圖片/國小.jpg",
    title: "縣立二林國民小學",
    description: "於二林國小不知道第幾屆校際運動會不知道甚麼項目第三名",
  },
  {
    label: "國中",
    image: "/圖片/國中.jpg",
    title: "縣立竹塘國民中學",
    description: "直笛合奏比賽（安慰獎），直笛隊是猴子國中裡的淨土，愛直笛隊一生推",
  },
  {
    label: "高中",
    image: "/圖片/高中.jpg",
    title: "縣立員林高級中學",
    description: "高中在熱音社當公關，明明也沒多有趣但就超級無敵懷念到爆炸死",
  },
  {
    label: "大學",
    image: "/圖片/大學.jpg",
    title: "國立政治大學",
    description: "於校內文化盃合唱比賽擔任副招，好喜歡跟大家一起唱歌，很幸福~",
  },
];


export default function PCHome() {

  const { sectionRef, sourceCatRef, landingCatRef, movingCatRef, introPhase } =
    useDesktopCatIntro();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 5.55vw", "end end"],
  });

  const catLeft = useTransform(scrollYProgress, [0, 1], ["12.5%", "87.5%"]);
  // ponytail: 每張寬 64.44vw、間距 3vw；與下面的圖片列尺寸一起調整。
  const imagesX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `${-(64.44 + 3) * (stages.length - 1)}vw`],
  );

  

  useEffect(() => {
    // 開場完成後，才開始監聽吸附
    if (introPhase !== "finished") return;

    const SNAP_DELAY = 100;

    let isSnapping = false;
    let stopAnimation: (() => void) | undefined;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;

    function clearIdleTimer() {
      clearTimeout(idleTimer);
      idleTimer = undefined;
    }

    function snapToNearest() {
      idleTimer = undefined;

      const timeline = timelineRef.current;
      if (!timeline || isSnapping) return;

      const rect = timeline.getBoundingClientRect();
      const timelineTop = window.scrollY + rect.top;

      const startScroll =
        timelineTop - window.innerWidth * 0.0555;

      const endScroll =
        timelineTop + rect.height - window.innerHeight;

      // 輪播外不吸附，讓使用者可以正常離開
      if (
        window.scrollY <= startScroll ||
        window.scrollY >= endScroll
      ) {
        return;
      }

      // 等待結束後，才讀取最新位置
      const progress =
        (window.scrollY - startScroll) /
        (endScroll - startScroll);

      const nearestIndex = Math.round(
        progress * (stages.length - 1),
      );

      const targetProgress =
        nearestIndex / (stages.length - 1);

      const targetScroll =
        startScroll +
        (endScroll - startScroll) * targetProgress;

      if (Math.abs(targetScroll - window.scrollY) < 1) return;

      isSnapping = true;

      stopAnimation = animateScrollTo(targetScroll, () => {
        isSnapping = false;
        stopAnimation = undefined;
      });
    }

    function scheduleSnap() {
      clearIdleTimer();
      idleTimer = setTimeout(snapToNearest, SNAP_DELAY);
    }

    function handleScroll() {
      // 自動動畫產生的捲動，不安排下一次吸附
      if (isSnapping) return;

      scheduleSnap();
    }

    function handleUserInput() {
      // 使用者重新操作，立即停止動畫
      stopAnimation?.();
      stopAnimation = undefined;
      isSnapping = false;

      // 即使這次操作沒有造成位移，也重新等待
      scheduleSnap();
    }

    function handleKeyDown(event: KeyboardEvent) {
      const scrollKeys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ];

      if (scrollKeys.includes(event.key)) {
        handleUserInput();
      }
    }

    function handleResize() {
      clearIdleTimer();
      stopAnimation?.();
      stopAnimation = undefined;
      isSnapping = false;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserInput, { passive: true });
    window.addEventListener("touchmove", handleUserInput, { passive: true });
    window.addEventListener("pointerdown", handleUserInput, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      clearIdleTimer();
      stopAnimation?.();

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserInput);
      window.removeEventListener("touchmove", handleUserInput);
      window.removeEventListener("pointerdown", handleUserInput);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [introPhase]);

  return (
    <main className="h-full w-full grid-background pb-[8.8vw]">

      {/* 獨立動畫層下墜貓貓*/}
      <div
        ref={movingCatRef}
        className="pointer-events-none fixed z-40"
        style={{
          visibility: introPhase === "falling" ? "visible" : "hidden",
        }}
      >
        <Image
          src="/貓咪下墜.webp"
          alt=""
          fill
          unoptimized
          className="object-contain"
        />
      </div>

      <div className="@container w-full h-full px-[4.44vw] ">
        <WavyFrame frameLength="long" orientation="horizontal" imageSrc="/圖片/電腦首頁圖.webp" className="w-full" />
      </div>

      <section className=" w-full flex items-stretch justify-center px-[17.77vw] py-[8.88vw]">

        <div className="flex w-[50%] flex-col justify-between  pr-[4.44vw]">
          <Image
            src="/電腦貓貓.webp"
            alt="貓咪"
            width={160}
            height={160}
            sizes="11.1vw"
            className="h-auto w-[11.1vw] self-start"
          />

          <Image
            src="/電腦貓貓.webp"
            alt="貓咪"
            width={160}
            height={160}
            sizes="11.1vw"
            className="h-auto w-[11.1vw] self-center"
          />

          <div className="self-end"
            ref={sourceCatRef}>
            <Image
              src={
                introPhase === "waiting"
                  ? "/電腦貓貓.webp"
                  : "/貓咪走.webp"
              }
              alt="貓咪"
              width={160}
              height={160}
              sizes="11.1vw"
              className="h-auto w-[11.1vw]"
            />
          </div>

        </div>



        <div className="flex w-[50%] flex-col gap-[4.44vw] pl-[4.44vw]">
          <div className="text-[1.66vw] leading-[200%] w-full">
            <span className="box-decoration-clone bg-white px-[0.27vw] py-[0.27vw]">
              一個很愛亂焦慮的資管大學生。<br />
              焦慮驅動everything~<br />
              夢想是可以 Work Life Balance
              <br />保持美好精神狀態🤪<br />
            </span>
          </div>

          <p className="text-[1.11vw] w-full ">
            #活網仔<br />
            每天於 Threads、IG、Dcard 三點一線，照三餐滑。<br />
            最喜歡抽象腦腐的怪咚咚，<br />
            每日定時攝取迷因，保持身心靈富足。<br />
            <br />
            #真誠<br />
            自己講（？<br />
            喜歡理解不同人的想法，也重視每次與人相處。<br />
            我希望能坦率表達、仔細聆聽，<br />
            遇到不懂的事情也願意請教！<br />
            <br />
            #AI勒戒狀態<br />
            喜歡寫寫程式讓自己的怪點子實現。<br />
            但最近有點ai疲勞，<br />
            嘗試重零開始復興傳統手搓程式碼文化，<br />
            某方面也是怕自己被職場淘汰！？<br />
            <br />
            想認識和我一樣充滿奇思妙想的怪怪人類！
          </p>
        </div>
      </section>

      <div ref={timelineRef} className="relative h-[350vh]  ">
        <section
          className="sticky top-[5.55vw] flex h-[calc(100vh-5.55vw)] w-full flex-col items-center justify-center gap-[1.38vw] rounded-[5vw] bg-[#F5E8F2] py-[2.22vw] overflow-hidden"
          ref={sectionRef}
        >


          {/* 圖片列：只改變位置，頁面維持原生垂直捲動。 */}
          <div className="min-h-0 w-full flex-1 overflow-hidden">
            <motion.div
              className="flex h-full w-full gap-[3vw]"
              style={{
                x: imagesX,
                paddingLeft: "max(0px, calc((100% - 64.44vw) / 2))",
              }}
            >
              {stages.map((stage) => (
                <div key={stage.label} className="h-full w-[64.44vw] shrink-0">
                  <SpecWavyFrame
                    frameLength="long"
                    orientation="horizontal"
                    imageSrc={stage.image}
                  />
                </div>
              ))}
            </motion.div>
          </div>



          {/* 說明 */}
          <div className="grid w-[64.44vw] shrink-0 px-[4.44vw] text-center">
            {stages.map((stage, index) => (
              <StageDescription
                key={stage.label}
                stage={stage}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>

          {/* 貓咪移動區域 */}
          <div className="flex w-full shrink-0 flex-col items-center px-[4.44vw]">
            <div className="relative h-[8vw] w-full">
              {/* 白線 */}
              <div className="absolute left-1/2 top-1/2 h-[0.3vw] w-[91.11vw] -translate-x-1/2 -translate-y-1/2 bg-white rounded-full" />

              {/* 貓咪移動範圍：和下面標籤同寬 */}
              <div className="relative mx-auto h-full w-[64.44vw]">
                <motion.div
                  ref={landingCatRef}
                  className="absolute top-[50%] -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: catLeft,
                    visibility: introPhase === "falling" ? "hidden" : "visible",
                  }}
                >
                  <Image
                    src="/眼鏡貓貓.webp"
                    alt=""
                    width={160}
                    height={160}
                    className="h-auto w-[4.44vw]"
                  />
                </motion.div>
              </div>
            </div>

            <div className="grid w-[64.44vw] grid-cols-4 text-center text-[1.11vw]">
              {stages.map((stage) => (
                <div key={stage.label}>{stage.label}</div>
              ))}
            </div>
          </div>

        </section>
      </div>

    </main >


  );

}



function StageDescription({
  stage,
  index,
  progress,
}: {
  stage: (typeof stages)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, (value) => {
    const position = value * (stages.length - 1);

    return Math.max(0, 1 - Math.abs(position - index));
  });

  return (
    <motion.div
      className="col-start-1 row-start-1"
      style={{ opacity }}
    >
      <p className="mb-[1.11vw] text-[1.66vw]">
        {stage.title}
      </p>

      <p className="text-[1.38vw]">
        {stage.description}
      </p>
    </motion.div>
  );
}

