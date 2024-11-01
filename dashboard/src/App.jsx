import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './Layouts/main';
import AuthPage from './pages/AuthPage';
import { queryClient } from './api';
import { QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import UserDetails from './pages/UserDetailsPage';
import EducationPage from './pages/EducationPage';
import HomePage from './pages/HomePage';
import CertificationsPage from './pages/CertificationsPage';
import SkillsPage from './pages/SkillPage';
import CategoriesPage from './pages/ProjectCategories';
import ProjectsPage from './pages/ProjectPage';
import TestimonialsPage from './pages/Testimonial';
import BlogPostPage from './pages/BlogPage';
import ExperiencePage from './pages/ExperiencePage';



const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/auth",
        element: <AuthPage />
      },
      {
        path: "/profile",
        element: <ProtectedRoute>
          <UserDetails />
        </ProtectedRoute>
      }, {
        path: "/education",
        element: <ProtectedRoute>
          <EducationPage />
        </ProtectedRoute>
      },
      {
        path: "/experiences",
        element: <ProtectedRoute>
          <ExperiencePage />
        </ProtectedRoute>
      },
      {
        path: "/certifications",
        element: <ProtectedRoute>
          <CertificationsPage />
        </ProtectedRoute>
      }
      , {
        path: "/skills",
        element: <ProtectedRoute>
          <SkillsPage />
        </ProtectedRoute>
      }, {
        path: "/categories",
        element: <ProtectedRoute>
          <CategoriesPage />
        </ProtectedRoute>
      },
      {
        path: "/projects",
        element: <ProtectedRoute>
          <ProjectsPage />
        </ProtectedRoute>
      },
      {
        path: "/testimonials",
        element: <ProtectedRoute>
          <TestimonialsPage />
        </ProtectedRoute>
      },
      {
        path: "/blog",
        element: <ProtectedRoute>
          <BlogPostPage />
        </ProtectedRoute>
      },
  
    ]
  }
])

function App() {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
}

export default App;
