"use client";
import Image from "next/image";
import type { RefObject } from "react";

type CatStripProps = {
  middleCatRef: RefObject<HTMLDivElement | null>;
  changePic: boolean;
};

export default function CatStrip({ middleCatRef, changePic }: CatStripProps) {
  return (
     <div className="relative z-20 overflow-x-clip pb-[16.4vw]">
      <div className="relative left-1/2 flex w-max -translate-x-1/2 items-center gap-[4.1vw]">
        <Image
          src="/電腦貓貓.webp"
          alt="貓咪"
          width={100}
          height={100}
          sizes="21.8vw"
          className="w-[21.8vw] h-auto"
        />
        <Image
          src="/電腦貓貓.webp"
          alt="貓咪"
          width={100}
          height={100}
          sizes="21.8vw"
          className="w-[21.8vw] h-auto"
        />
        <div ref={middleCatRef}>
          <Image
            src={changePic ? "/貓咪走.webp" : "/電腦貓貓.webp"}
            alt="貓咪"
            width={100}
            height={100}
            sizes="21.8vw"
            className="w-[21.8vw] h-auto"
          />
        </div>
        <Image
          src="/電腦貓貓.webp"
          alt="貓咪"
          width={100}
          height={100}
          sizes="21.8vw"
          className="w-[21.8vw] h-auto"
        />
        <Image
          src="/電腦貓貓.webp"
          alt="貓咪"
          width={100}
          height={100}
          sizes="21.8vw"
          className="w-[21.8vw] h-auto"
        />



      </div>
    </div >
  );
}
