import { FaHome, FaInfoCircle, FaUserCircle, FaCalendar, FaBook, FaCertificate, FaSkiing, FaSquarespace, FaProjectDiagram } from 'react-icons/fa'; // Importing icons
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
    const isAuthenticated = useAuth();
    const user = useUser();


    const navItems = [
        { to: '/', label: 'Home', icon: FaHome, authRequired: false },
        { to: '/profile', label: 'Profile', icon: FaUserCircle, authRequired: true },
        { to: '/education', label: 'Education', icon: FaBook, authRequired: true },
        { to: '/certifications', label: 'Certifications', icon: FaCertificate, authRequired: true },
        { to: '/skills', label: 'Skills', icon: FaSkiing, authRequired: true },
        { to: '/categories', label: 'Categories', icon: FaSquarespace, authRequired: true },
        { to: '/projects', label: 'Projects', icon: FaProjectDiagram, authRequired: true },
        { to: '/testimonials', label: 'Testimonials', icon: FaInfoCircle, authRequired: true },
        { to: '/experiences', label: 'Experiences', icon: FaCalendar, authRequired: true },
        {
            to: "/blog",
            label: "Blog",
            icon: FaBook,
            authRequired: true
        }

    ];

    return (
        <aside
            className={`transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 p-4 bg-gradient-to-b fixed h-full`}
        >

            <nav>
                <ul>
                    {navItems.map((item, index) => {
                        if (item.authRequired && !isAuthenticated) return null;
                        return (
                            <NavLink
                                key={index}
                                to={item.to}
                                className="flex items-center mb-4 hover:bg-gray-300 dark:hover:bg-gray-700 bg-opacity-45 p-2 rounded"
                                activeClassName="bg-blue-500 text-white"
                            >
                                <li className="flex items-center w-full">
                                    <item.icon className="mr-3" />
                                    <span className="text-lg">{item.label}</span>
                                </li>
                            </NavLink>
                        );
                    })}
                    {/* {isAuthenticated && user?.roles.includes('admin') && (
                        <NavLink
                            key={'admin'}
                            to={'/admin'}
                            className="flex items-center mb-4 hover:bg-gray-300 dark:hover:bg-gray-700 bg-opacity-45 p-2 rounded"
                            activeClassName="bg-blue-500 text-white"
                        >
                            <li className="flex items-center w-full">
                                <FaCalendar className="mr-3" />
                                <span className="text-lg">
                                    Admin
                                </span>
                            </li>
                        </NavLink>
                    )
                    } */}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;