import ExperiencesSection from '@/components/ExperiencesSection';
import { HeroSection } from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import { fetchData } from '@/lib/data';

export const metadata = {
  title: "Mohamed Magdy",
  description: "A personal portfolio for the full-stack developer Mohamed Magdy",
  favicon: "/spaceman.png",
}

export default async function Home() {

  const data = await fetchData();
  console.log(data.projects);
  console.log(data.categories);



  return (
    <>
      <Navbar />
      <HeroSection name={data.me.name} profilePicture={data.me.profilePicture} currentPosition={data.me.currentPosition} resume={data.me.resume} />
      <ExperiencesSection experiencesData={data.experiences} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} categories={data.categories} />
    </>
  );
}