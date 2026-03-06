import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token.trim() !== '') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);
    
    if (isLoading) {
        return <div>Carregando...</div>;
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    
    return element;
}

export default ProtectedRoute;
