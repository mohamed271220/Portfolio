import { FaCode, FaCloud, FaUser } from 'react-icons/fa';

const HomePage = () => {
    return (
        <div className="bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <header className="bg-blue-600 text-white text-center py-20">
                <h1 className="text-5xl font-bold">Welcome to My Platform</h1>
                <p className="mt-4 text-lg">
                    Your one-stop solution for all your development needs.
                </p>
                <button className="mt-6 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold">
                    Get Started
                </button>
            </header>

            {/* About Section */}
            <section className="py-20 px-6 text-center">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">About Me</h2>
                <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    I&apos;m a dedicated developer with a passion for creating engaging and responsive websites. With a strong foundation in both front-end and back-end technologies, I strive to deliver seamless user experiences and robust functionality. My journey in web development began with a curiosity for how websites work, and over the years, it has evolved into a deep-seated passion for crafting digital solutions that not only meet but exceed client expectations.
                </p>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 text-center">My Services</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
                    <div className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 text-center dark:bg-gray-700">
                        <FaCode className="text-4xl text-blue-600 mx-auto" />
                        <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-200">Web Development</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Building responsive and engaging websites tailored to your needs.
                        </p>
                    </div>
                    <div className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 text-center dark:bg-gray-700">
                        <FaCloud className="text-4xl text-blue-600 mx-auto" />
                        <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-200">Cloud Solutions</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Scalable cloud services to enhance your application&apos;s performance.
                        </p>
                    </div>
                    <div className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 text-center dark:bg-gray-700">
                        <FaUser className="text-4xl text-blue-600 mx-auto" />
                        <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-gray-200">User Experience</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Designing intuitive and user-friendly interfaces for all devices.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-6 bg-gray-100 dark:bg-gray-900">
                <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200">What My Clients Say</h2>
                <div className="mt-10 max-w-2xl mx-auto">
                    <blockquote className="border-l-4 border-blue-600 pl-4 italic dark:border-blue-300">
                        &quot;Working with this team transformed my business. Their expertise in web development and user experience is unmatched!&quot;
                        <footer className="mt-2 text-right font-semibold text-gray-800 dark:text-gray-200">- Alex Johnson</footer>
                    </blockquote>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-600 text-white text-center py-6">
                <div className="">
                    <a href="/privacy" className="text-white hover:underline mx-2">Privacy Policy</a>
                    <a href="/terms" className="text-white hover:underline mx-2">Terms of Service</a>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
