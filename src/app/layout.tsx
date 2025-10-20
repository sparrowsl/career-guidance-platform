import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "CareerGuide AI",
  description: "AI-Powered Career Guidance Platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}


