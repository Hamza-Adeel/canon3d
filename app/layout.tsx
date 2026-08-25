import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOVA X1 — Architectural Full-Frame Mirrorless System",
  description:
    "Precision engineered for the unseen. Experience the 61.2 MP NOVA X1 with 8K RAW recording, 17-element optical architecture, and real-time neural autofocus.",
  openGraph: {
    title: "NOVA X1 — Architectural Full-Frame Mirrorless System",
    description:
      "Precision engineered for the unseen. Explore the camera in interactive 3D with scroll storytelling.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA X1 — Architectural Full-Frame Mirrorless System",
    description:
      "Precision engineered for the unseen. Explore the camera in interactive 3D.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-[#09090c] text-[#f8fafc] font-sans antialiased overflow-x-hidden selection:bg-rose-500/25 selection:text-white">
        {children}
      </body>
    </html>
  );
}
