"use client";

import { useEffect, useRef, useState } from "react";
import { animateScrollTo } from "@/lib/animateScrollTo";

// 貓咪與檢查點共用的螢幕基準線。
export const TIMELINE_BTM = 0.8;
const BTM = TIMELINE_BTM;

// 管理出場、顯隱、吸附與最後鎖定。
export function useCareerTimeline() {
  const middleCatRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    let done = false;
    let autoScrolling = false;
    let stopAnimation: (() => void) | undefined;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;

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

      const oldCat = middleCatRef.current;
      if (!oldCat) return false;

      const lineY = window.innerHeight * BTM;
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
    function snapToNearest() {
      if (done || !checkPosition()) return;

      const lineY = window.innerHeight * BTM;
      const points = getCheckpoints().filter(
        (point): point is number => point !== null
      );

      if (points.length === 0) return;

      const nearest = points.reduce((best, point) =>
        Math.abs(point - lineY) < Math.abs(best - lineY)
          ? point
          : best
      );

      const distance = nearest - lineY;

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

      if (active) {
        idleTimer = setTimeout(snapToNearest, SNAP_DELAY);
      }
    }

    function onResize() {
      if (done) return;

      cancelSnap();
      checkPosition();
    }

    function onUserInput() {
      if (!done) cancelSnap();
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

  return { middleCatRef, registerText, showCat, revealed, finished };
}
