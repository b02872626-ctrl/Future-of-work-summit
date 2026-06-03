import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pangram = localFont({
  src: [
    { path: "../public/fonts/Pangram-ExtraLight.otf", weight: "200", style: "normal" },
    { path: "../public/fonts/Pangram-Light.otf",      weight: "300", style: "normal" },
    { path: "../public/fonts/Pangram-Regular.otf",    weight: "400", style: "normal" },
    { path: "../public/fonts/Pangram-Medium.otf",     weight: "500", style: "normal" },
    { path: "../public/fonts/Pangram-Bold.otf",       weight: "700", style: "normal" },
    { path: "../public/fonts/Pangram-ExtraBold.otf",  weight: "800", style: "normal" },
    { path: "../public/fonts/Pangram-Black.otf",      weight: "900", style: "normal" },
  ],
  variable: "--font-pangram",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Future of Work Summit · Shaping how Ethiopia works",
  description:
    "Future of Work is a platform built to bring together the people shaping the next chapter of work in Ethiopia — at the intersection of jobs, skills, technology, innovation, entrepreneurship, and policy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pangram.variable}>
      <body>{children}</body>
    </html>
  );
}
