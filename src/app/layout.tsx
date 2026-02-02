import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui/header-3";

export const metadata: Metadata = {
  title: "Demand Tech - Premium B2B Tech Insights",
  description: "Turn attention into pipeline. Blue-chip placements for B2B tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
