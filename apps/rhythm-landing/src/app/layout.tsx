import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RHYTHM — Adaptive ERP System",
  description:
    "RHYTHM is an intelligent ERP platform that understands business flow, patterns, and execution.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
