"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "motion";
import { animateScrollTo } from "@/lib/animateScrollTo";


// 貓咪與檢查點共用的螢幕基準線。
export const TIMELINE_BTM = 0.8;
const BTM = TIMELINE_BTM;



// 管理出場、顯隱、吸附與最後鎖定。
export function useCareerTimeline() {
  const middleCatRef = useRef<HTMLDivElement>(null);

  const introPhase = useRef<"waiting" | "falling" | "landed" | "played">("waiting");

  // 依序存放國小、國中、高中、大學的文字容器
  const textRefs = useRef<(HTMLDivElement | null)[]>([
    null, null, null, null,
  ]);
  const [showCat, setShowCat] = useState(false);
  const [revealed, setRevealed] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [finished, setFinished] = useState(false);



  const SNAP_DELAY = 250; // 停止捲動 250ms 後吸附
  const TOLERANCE = 1; // 容許 1px 的小數誤差

  const movingCatRef = useRef<HTMLDivElement>(null);
  const [isFalling, setIsFalling] = useState(false);

  useEffect(() => {
    let done = false;
    let autoScrolling = false;
    let stopAnimation: (() => void) | undefined;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;

    let stopIntro: (() => void) | undefined;

    function clearIdleTimer() {
      if (idleTimer !== undefined) {
        clearTimeout(idleTimer);
        idleTimer = undefined;
      }
    }

    function cancelSnap() {
      clearIdleTimer();
      stopAnimation?.();
      stopAnimation = undefined;
      autoScrolling = false;
    }

    function lockPageScroll() {
      const html = document.documentElement;
      const body = document.body;
      const htmlOverflow = html.style.overflow;
      const bodyOverflow = body.style.overflow;

      function preventScroll(event: Event) {
        if (event.cancelable) event.preventDefault();
      }

      function preventScrollKeys(event: KeyboardEvent) {
        if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
          event.preventDefault();
        }
      }

      // ponytail: 先測試 overflow 鎖定；若手機仍保留慣性，再改固定頁面。
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("keydown", preventScrollKeys);

      return () => {
        html.style.overflow = htmlOverflow;
        body.style.overflow = bodyOverflow;
        window.removeEventListener("touchmove", preventScroll);
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("keydown", preventScrollKeys);
      };
    }

    // play開場
    function playIntro(oldCat: HTMLDivElement) {
      const cat = movingCatRef.current;
      if (!cat) return;

      if (getCheckpoints()[0] === null) return;

      introPhase.current = "falling";
      cancelSnap();
      const unlockScroll = lockPageScroll();
      let canceled = false;
      let stopMotion: (() => void) | undefined;

      // 鎖定後下一個畫面更新時機，重新量測再播放。
      const frameId = requestAnimationFrame(() => {
        if (canceled) return;
        const firstCheckpoint = getCheckpoints()[0];
        if (firstCheckpoint === null) {
          unlockScroll();
          introPhase.current = "waiting";
          stopIntro = undefined;
          return;
        }
        const start = oldCat.getBoundingClientRect();
        setIsFalling(true);

        const startScroll = window.scrollY;
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const targetScroll = Math.max(0, Math.min(startScroll + firstCheckpoint - window.innerHeight * BTM, maxScroll));

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        const startTop = Math.max(0, start.top);
        const endTop = window.innerHeight * BTM;
        const startLeft = start.left + start.width / 2;
        const endLeft = window.innerWidth / 2;
        // ponytail: 一個進度同時推動兩者，抵達第一站時不會錯開。
        const animation = animate(0, 1, {
          duration: reduceMotion ? 0 : 1.2,
          ease: "easeInOut",
          onUpdate: (progress) => {
            cat.style.top = `${startTop + (endTop - startTop) * progress}px`;
            cat.style.left = `${startLeft + (endLeft - startLeft) * progress}px`;
            window.scrollTo({ top: startScroll + (targetScroll - startScroll) * progress, behavior: "instant" });
          },
        });

        animation.then(() => {
          if (canceled) return;
          cat.style.top = `${BTM * 100}%`;
          cat.style.left = "50%";
          // 第一站先停住；下一次使用者操作才允許吸附到下一站。
          introPhase.current = "landed";
          setIsFalling(false);
          unlockScroll();
          stopIntro = undefined;
          checkPosition();
        });
        stopMotion = () => animation.stop();
      });

      stopIntro = () => {
        canceled = true;
        cancelAnimationFrame(frameId);
        stopMotion?.();
        unlockScroll();
        introPhase.current = "waiting";
        setIsFalling(false);
      };
    }

    // 四個檢查點在螢幕上的 Y 座標
    function getCheckpoints() {
      const offset = window.innerWidth * 0.04;

      return [0, 1, 2, 3].map((index) => {
        const element = textRefs.current[index];

        return element
          ? element.getBoundingClientRect().bottom + offset
          : null;
      });
    }

    // 更新貓咪與圖片文字的顯示狀態
    function checkPosition() {
      if (done) return false;
      if (introPhase.current === "falling") return false;

      const oldCat = middleCatRef.current;

      if (!oldCat) {
        return false;
      }

      const lineY = window.innerHeight * BTM;

      if (introPhase.current === "waiting") {
        setShowCat(false);

        if (oldCat.getBoundingClientRect().top <= window.innerHeight * 0.2) {
          playIntro(oldCat);
        }

        // 開場完成以前，不執行後面的顯示與吸附判斷。
        return false;
      }

      const active =
        oldCat.getBoundingClientRect().top <= lineY + TOLERANCE;

      const checkpoints = getCheckpoints();

      const nextRevealed = checkpoints.map(
        (point) =>
          active &&
          point !== null &&
          point <= lineY + TOLERANCE
      );

      // 最後一站完成，鎖定所有結果
      if (nextRevealed[3]) {
        done = true;
        cancelSnap();

        setFinished(true);
        setShowCat(false);
        setRevealed([true, true, true, true]);

        return false;
      }

      setShowCat(active);

      // 沒有變化時沿用原陣列，避免無謂更新
      setRevealed((previous) =>
        previous.every((value, index) => value === nextRevealed[index])
          ? previous
          : nextRevealed
      );

      return active;
    }

    // 將最近的文字檢查點捲到 BTM
    function snapToNext() {
      if (done || !checkPosition()) return;

      const lineY = window.innerHeight * BTM;
      const points = getCheckpoints().filter(
        (point): point is number => point !== null
      );

      const next = points.find((point) =>
        point > lineY + TOLERANCE
      );

      if (next === undefined) return;

      const distance = next - lineY;

      // 已對齊就不用再捲
      if (Math.abs(distance) <= TOLERANCE) return;

      // 頁面有最大捲動範圍，不能超過底部
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

      const targetScroll = Math.max(
        0,
        Math.min(window.scrollY + distance, maxScroll)
      );

      if (Math.abs(targetScroll - window.scrollY) <= TOLERANCE) {
        return;
      }

      autoScrolling = true;
      stopAnimation = animateScrollTo(targetScroll);

    }

    function onScroll() {
      if (done) return;

      const active = checkPosition();
      clearIdleTimer();

      if (done) return;

      // 自動捲動也會發生 scroll 事件，
      // 但結束後不能再觸發另一輪吸附
      if (autoScrolling) {
        return;
      }

      if (active && introPhase.current === "played") {
        idleTimer = setTimeout(snapToNext, SNAP_DELAY);
      }
    }

    function onResize() {
      if (done) return;

      cancelSnap();
      checkPosition();
    }

    function onUserInput() {
      if (done || introPhase.current === "falling") return;

      cancelSnap();
      if (introPhase.current === "landed") {
        introPhase.current = "played";
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        onUserInput();
      }
    }

    checkPosition();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("wheel", onUserInput, { passive: true });
    window.addEventListener("touchstart", onUserInput, { passive: true });
    window.addEventListener("pointerdown", onUserInput, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      stopIntro?.(); // 新增這行
      cancelSnap();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onUserInput);
      window.removeEventListener("touchstart", onUserInput);
      window.removeEventListener("pointerdown", onUserInput);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // 元素的登記也由 Hook 負責，畫面只需傳入索引和 div。
  const registerText = (index: number, element: HTMLDivElement | null) => {
    textRefs.current[index] = element;
  };

  return { middleCatRef, movingCatRef, registerText, showCat, revealed, isFalling, finished };
}
