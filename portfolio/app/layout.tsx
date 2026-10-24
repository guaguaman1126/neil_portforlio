import type { Metadata } from "next";

import "./globals.css";
import MobileNavbar from "@/components/Mobille/MobileNavbar";
import Footer from "@/components/Mobille/Footer";

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
        <MobileNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
