import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iPhone 17 Pro Max — Максимум технологий",
  description:
    "iPhone 17 Pro Max: чип A19 Pro, тройная система камер 48 МП, дисплей Super Retina XDR 6,9″, до 39 часов автономности. Самый мощный iPhone.",
  keywords:
    "iPhone 17 Pro Max, Apple, A19 Pro, камера 48 МП, Super Retina XDR, iOS 19",
  openGraph: {
    title: "iPhone 17 Pro Max — Максимум технологий",
    description:
      "Самый мощный iPhone с чипом A19 Pro, революционной камерой и непревзойдённой автономностью.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
