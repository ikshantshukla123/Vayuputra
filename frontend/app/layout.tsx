import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VAYUPUTRA | Delhi Air Intelligence",
  description:
    "VAYUPUTRA predicts pollution before it harms you and guides safer action across Delhi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${spaceGrotesk.variable} bg-[#07090b] text-slate-100 antialiased font-sans`}
      >
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
