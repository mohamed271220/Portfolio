import { useEffect, useState } from 'react';
import Login from '../components/Auth/Login';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthPage = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <Login />

        </div>
    );
};

export default AuthPage;
