import Timeline from './Timeline'; // Adjust the import path as needed

const ExperiencesSection = ({ experiencesData }) => {
    return (
        <section id="experiences" className="py-10 bg-opacity-10">
            <h2 className="text-3xl font-bold text-center bg-green-600 mb-6">Experiences</h2>
            <Timeline experiences={experiencesData} />
        </section>
    );
};

export default ExperiencesSection;
