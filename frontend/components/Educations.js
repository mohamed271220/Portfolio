import Timeline from './Timeline'; // Adjust the import path as needed

const EducationSection = ({ educationData }) => {
    return (
        <section id="education" className="py-10 bg-opacity-10">
            <h2 className="text-3xl font-bold text-center bg-green-600 mb-6">Education</h2>
            <Timeline data={educationData} mode="educations" />
        </section>
    );
};

export default EducationSection;
