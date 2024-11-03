import Head from 'next/head';
import Background from '@/components/Background';
import Moon from '@/components/Moon';
import ShootingStars from '@/components/ShootingStars';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <Head>
        <title>My Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background />
      <ShootingStars />
      <div className="absolute inset-0 flex items-center justify-center">
        {/* <Moon /> */}
      </div>
      {/* Other components like Hero, etc. */}
    </div>
  );
}
