import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sollvian AI Technologies",
  description:
    "Sollvian AI Tech turns ideas into intelligent solutions: proposal and ROI, installation tracking, solar structure design, CRM, and customer 360.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-[#fdfdfc] text-[#2c3327] m-0 font-sans">
        {children}
      </body>
    </html>
  );
}
