import Certifications from '@/components/Certifications';
import EducationSection from '@/components/Educations';
import ExperiencesSection from '@/components/ExperiencesSection';
import Footer from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import { fetchData } from '@/lib/data';
import { notFound } from 'next/navigation';


export const metadata = {
  title: "Mohamed Magdy",
  description: "A personal portfolio for the full-stack developer Mohamed Magdy",
}

export default async function Home() {
  const data = await fetchData();
  if (!data) {
    notFound();
  }
  
  return (
    <>
      <HeroSection name={data.me.name} profilePicture={data.me.profilePicture} currentPosition={data.me.currentPosition} resume={data.me.resume} />
      <ExperiencesSection experiencesData={data.experiences} />
      <Projects projects={data.projects} categories={data.categories} />
      <Skills skills={data.skills} />
      <EducationSection educationData={data.educations} type="education" />
      <Certifications certifications={data.certifications} />
      <Footer data={data.me} />
    </>
  );
}