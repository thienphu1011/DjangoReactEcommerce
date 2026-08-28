import React from "react";
import { useState,useEffect } from "react";

import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useAuthStore((state) => [
        state.isLoggedIn, 
        state.user,
    ]);
    
    return (
        <>
            {isLoggedIn()  
                ? <div>
                    <h1>Dashboard</h1>
                    <Link to="/logout">Logout</Link>
                </div>
                : <div>
                    <h1>Home Page</h1>
                    <div classname='d-flex justify-content-center'>
                        <Link to="/login" className="btn btn-primary">Login</Link>
                        <Link to="/register" className="btn btn-secondary">Register</Link>
                    </div>
                </div>
            }
        </>
    );
}
 export default Dashboard;