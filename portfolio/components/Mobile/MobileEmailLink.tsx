"use client";

import { useState } from "react";
import { SiGmail } from "react-icons/si";

const email = "n127036819@gmail.com";

export default function MobileEmailLink() {
  const [message, setMessage] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setMessage(`已複製到剪貼簿`);
    } catch {
      setMessage(`gmail複製失敗)`);
    }
    setTimeout(() => setMessage(""), 3000);
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={`複製信箱 ${email}`}
        className="block cursor-pointer transition-transform hover:scale-110 active:scale-110"
        onClick={copyEmail}
      >
        <SiGmail />
      </button>
      {message && (
        <div
          role="status"
          className="absolute  bottom-full left-1/2 z-50 w-max -translate-x-1/2  rounded-[2vw] bg-white/50 px-[2vw] py-[2vw] text-[4.1vw] text-[#91CAC4] animate-[fadeOut_2.7s_forwards]"
        >
          {message}
        </div>
      )}
    </div>
  );
}
