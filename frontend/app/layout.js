import localFont from "next/font/local";
import { Pixelify_Sans } from 'next/font/google';
import "./globals.css";
import Background from "@/components/Background";
import ShootingStars from "@/components/ShootingStars";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pixelify.className} antialiased`}
      >
        <div className="relative z-0 min-h-screen bg-black overflow-hidden">
          <Navbar />
          <Background />
          <ShootingStars />
          {children}
        </div>
      </body>
    </html>
  );
}
