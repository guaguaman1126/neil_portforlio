import { animate } from "motion";

// 只負責捲動動畫，不判斷檢查點。duration 的單位是秒。
export function animateScrollTo(targetY: number) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const animation = animate(window.scrollY, targetY, {
    duration: reduceMotion ? 0 : 0.9,
    ease: "easeInOut",
    onUpdate: (y) => {
      window.scrollTo({ top: y, behavior: "instant" });
    },
  });

  // 使用者重新操作、完成或離開頁面時，由 Hook 呼叫這個停止函式。
  return () => animation.stop();
}
