import React from "react";
import { useState,useEffect } from "react";
import { register } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

function Register() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
            if (isLoggedIn()) {
                navigate('/');
            }
        },[isLoggedIn, navigate]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const {error} = await register(fullname, email, mobile, password, confirmPassword);
        if (error) {
            alert(JSON.stringify(error));
        } else {
            navigate('/');
        }
        setIsLoading(false);
    };
  return (
    <>
    <div>Register Page</div>
    <form onSubmit={handleSubmit}>
        <input type="name" placeholder="Full name" name="" id="" onChange={(e) => setFullname(e.target.value)} /> <br /> <br />
        <input type="email" placeholder="Email" name="" id="" onChange={(e) => setEmail(e.target.value)} /> <br /><br />
        <input type="number" placeholder="Mobile Number" name="" id="" onChange={(e) => setMobile(e.target.value)} /> <br /><br />
        <input type="password" placeholder="Password" name="" id="" onChange={(e) => setPassword(e.target.value)} /> <br /><br />
        <input type="password" placeholder="Confirm Password" name="" id="" onChange={(e) => setConfirmPassword(e.target.value)} /> <br /><br />

        <button type="submit">Register</button>
    </form>
    </>
  )
}

export default Register;