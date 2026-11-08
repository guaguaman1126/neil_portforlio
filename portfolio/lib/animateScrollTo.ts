import { animate } from "motion";

// onComplete 可選，因此手機版原本的呼叫方式仍然能用。
export function animateScrollTo(
  targetY: number,
  onComplete?: () => void,
) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const animation = animate(window.scrollY, targetY, {
    duration: reduceMotion ? 0 : 0.9,
    ease: "easeInOut",

    onUpdate: (y) => {
      window.scrollTo({ top: y, behavior: "instant" });
    },

    onComplete,
  });

  return () => animation.stop();
}