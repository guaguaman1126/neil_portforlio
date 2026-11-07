"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "motion/react";

export function useDesktopCatIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const sourceCatRef = useRef<HTMLDivElement>(null);
  const landingCatRef = useRef<HTMLDivElement>(null);
  const movingCatRef = useRef<HTMLDivElement>(null);
  const [introPhase, setIntroPhase] = useState<
    "waiting" | "falling" | "finished"
  >("waiting");

  // 開場貓咪下墜動畫
  useEffect(() => {
    const sourceCat = sourceCatRef.current;
    if (!sourceCat) return;

    // 記住貓咪上一次距離視窗頂端的位置
    let previousTop = sourceCat.getBoundingClientRect().top;

    // 元件卸載時，可以透過這個函式停止動畫
    let stopAnimation: (() => void) | undefined;

    // 阻止瀏覽器的預設捲動
    function preventScroll(event: Event) {
      event.preventDefault();
    }

    function preventScrollKeys(event: KeyboardEvent) {
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
        event.preventDefault();
      }
    }

    function lockScroll() {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventScrollKeys);
    }

    function unlockScroll() {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScrollKeys);
    }

    function handleScroll() {
      if (!sourceCat) return;

      const currentTop = sourceCat.getBoundingClientRect().top;
      const triggerY = window.innerHeight * 0.2;

      // 貓咪由觸發線下方往上跨過觸發線
      const crossed =
        previousTop > triggerY &&
        currentTop <= triggerY;

      previousTop = currentTop;

      if (!crossed) return;

      const movingCat = movingCatRef.current;
      const landingCat = landingCatRef.current;
      const section = sectionRef.current;
      const navbar = document.querySelector("header");

      // 必要的元素都存在，才開始動畫
      if (!movingCat || !landingCat || !section || !navbar) return;

      // 讀取出發貓咪與眼鏡貓咪目前的位置、尺寸
      const start = sourceCat.getBoundingClientRect();
      const landing = landingCat.getBoundingClientRect();

      // 動畫開始時，頁面已經捲動的距離
      const startScroll = window.scrollY;

      // section 上緣對齊 Navbar 下緣時的頁面捲動位置
      const targetScroll =
        startScroll +
        section.getBoundingClientRect().top -
        navbar.getBoundingClientRect().bottom;

      // 頁面接下來要捲動的距離
      const scrollDistance = targetScroll - startScroll;

      // 預測頁面捲完後，落地貓咪在視窗上的位置
      const endLeft = landing.left;
      const endTop = landing.top - scrollDistance;

      // 先把下墜貓咪放到出發貓咪的位置
      movingCat.style.left = `${start.left}px`;
      movingCat.style.top = `${start.top}px`;
      movingCat.style.width = `${start.width}px`;
      movingCat.style.height = `${start.height}px`;

      // 上方圖片變成貓咪走，並顯示下墜貓咪，開場只觸發一次
      setIntroPhase("falling");
      window.removeEventListener("scroll", handleScroll);
      lockScroll();

      const animation = animate(0, 1, {
        duration: 1.2,
        ease: "easeInOut",

        onUpdate: (progress) => {
          // 根據同一個進度，計算起點到終點之間的數值
          const mix = (from: number, to: number) =>
            from + (to - from) * progress;

          movingCat.style.left = `${mix(start.left, endLeft)}px`;
          movingCat.style.top = `${mix(start.top, endTop)}px`;
          movingCat.style.width =
            `${mix(start.width, landing.width)}px`;
          movingCat.style.height =
            `${mix(start.height, landing.height)}px`;

          window.scrollTo({
            top: mix(startScroll, targetScroll),
            behavior: "instant",
          });
        },

        onComplete: () => {
          setIntroPhase("finished");
          unlockScroll();
        },
      });

      stopAnimation = () => animation.stop();
    }

    // 開始監聽頁面的捲動
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 元件卸載時，取消監聽並停止未完成的動畫
    return () => {
      window.removeEventListener("scroll", handleScroll);
      stopAnimation?.();
      unlockScroll();
    };
  }, []);


  return { sectionRef, sourceCatRef, landingCatRef, movingCatRef, introPhase };
}
