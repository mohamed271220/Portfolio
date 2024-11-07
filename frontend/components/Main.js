
import Certifications from '@/components/Certifications';
import EducationSection from '@/components/Educations';
import ExperiencesSection from '@/components/ExperiencesSection';
import Footer from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import { fetchData } from '@/lib/data';


export default async function Main() {
    try {
        const data = await fetchData();
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
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}
