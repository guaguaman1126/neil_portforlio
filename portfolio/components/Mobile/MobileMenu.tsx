"use client";
import Home from "@/app/page";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose, }: MobileMenuProps) {
  const pathname = usePathname();
  const HOME = "/";
  const RESUME = "/Resume";
  const PROJECT = "/Project";
  return (
    <main
      className={`fixed inset-0 z-40 flex h-dvh w-full flex-col items-center overflow-y-auto bg-[#FBF4F9] text-[#117A73] px-[16.4vw] py-[32.8vw] transition-all duration-500 ease-out 
        ${isOpen
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0 pointer-events-none"
        }`}
    >

      <div className="flex flex-col items-center gap-[8.2vw]">
        <Link className="text-[10.2vw]" href={RESUME} onClick={(event) => {
          if (pathname === RESUME) {
            event.preventDefault();
          }
          onClose();
        }}>
          RESUME
        </Link>

        <Link className="text-[10.2vw]" href={PROJECT} onClick={(event) => {
          if (pathname === PROJECT) {
            event.preventDefault();
          }
          onClose();
        }}>
          PROJECT
        </Link>

        <Link className="text-[10.2vw]" href={HOME} onClick={(event) => {
          if (pathname === HOME) {
            event.preventDefault();
          }
          onClose();
        }}>
          HOME
        </Link>

      </div>

      <div className="flex h-full w-full flex-col items-center justify-end">
        <Image
          src="/眼鏡貓貓.webp"
          alt="眼鏡貓貓"
          width={179}
          height={179}
          sizes="18vw"
          style={{ width: "18vw", height: "auto" }}

        />
      </div>
    </main>
  );
}
