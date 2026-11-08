import type { Metadata } from "next";

import "./globals.css";
import MobileNavbar from "@/components/Mobile/MobileNavbar";
import MobileFooter from "@/components/Mobile/MobileFooter";
import DeskNavbar from "@/components/Desktop/DeskNavbar";
import DeskFooter from "@/components/Desktop/DeskFooter";

export const metadata: Metadata = {
  title: "祐寧的個人網站",
  description: "676767",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"

    >
      <body className="h-full w-full">

        {/* 手機版 Navbar：小於 md 時顯示 */}
        <div className="md:hidden"> 
          <MobileNavbar />
        </div> 

        {/* 電腦版 Navbar：md 以上顯示 */}
        <div className="hidden md:block">
          <DeskNavbar />
        </div>

        {children}

        {/* 手機版 Footer */}
        <div className="md:hidden">
          <MobileFooter />
        </div>

        {/* 電腦版 Footer */}
        <div className="hidden md:block">
          <DeskFooter />
        </div>

      </body>
    </html>
  );
}
