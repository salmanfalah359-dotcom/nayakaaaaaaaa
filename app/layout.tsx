import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./SmoothScroll";

export const metadata: Metadata = {
  title: "NAYAKA - Tingkatkan Kepatuhan Terapi Ambliopia Lewat Dichoptic Game Training",
  description:
    "NAYAKA membantu meningkatkan kepatuhan terapi ambliopia melalui dichoptic game training, kacamata anaglif 3D, pemantauan kepatuhan AI, dan platform digital terpadu.",
  keywords: [
    "NAYAKA",
    "ambliopia",
    "lazy eye",
    "dichoptic game training",
    "terapi ambliopia",
    "kacamata anaglif 3D",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "NAYAKA - Tingkatkan Kepatuhan Terapi Ambliopia",
    description:
      "Ekosistem terapi ambliopia terpadu dengan dichoptic game training, AI compliance monitoring, dan laporan kemajuan digital.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
