import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#dc2626",
};

export const metadata: Metadata = {
  title: "MeetAI - IA Avançada em Videoconferência",
  description:
    "Plataforma de videoconferência de próxima geração com IA integrada. Transcrições inteligentes, resumos automáticos e análises em tempo real com OpenAI.",
  manifest: "/manifest.json",
  keywords: [
    "ai",
    "videoconference",
    "transcription",
    "openai",
    "meetings",
    "productivity",
  ],
  robots: "index, follow",
  openGraph: {
    title: "MeetAI - IA Avançada em Videoconferência",
    description:
      "Transforme suas reuniões com IA de próxima geração. Transcrições automáticas, resumos inteligentes e insights em tempo real.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeetAI - IA Avançada em Videoconferência",
    description: "Videoconferência inteligente com IA de última geração",
  },
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
