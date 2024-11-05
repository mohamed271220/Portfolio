import localFont from "next/font/local";
import { Pixelify_Sans } from 'next/font/google';
import "./globals.css";
import Background from "@/components/Background";
import ShootingStars from "@/components/ShootingStars";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const pixelify = Pixelify_Sans({ subsets: ['latin'] });

export const metadata = {
  title: "Specter",
  description: "A personal portfolio for the full-stack developer Mohamed Magdy",
  favicon: "/spaceman.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pixelify.className} antialiased`}
      >
        <div className="relative min-h-screen bg-black overflow-hidden">
          <Background />
          <ShootingStars />
          {children}
        </div>
      </body>
    </html>
  );
}
