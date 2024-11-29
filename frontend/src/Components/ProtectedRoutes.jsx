import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children,allowedRoles}) => {

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if (!user) {
        return <Navigate to="/login" />;
      }
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect unauthorized users to /home
        return <Navigate to="/home" />;
      }
    
      return children;
}

export default ProtectedRoutes;