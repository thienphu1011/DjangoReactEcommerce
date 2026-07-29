import React, { useState , useEffect } from 'react';
import { login } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

function Login() {
    
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const {error} = await login(email, password);
        if (error) {
            alert(error);
        } else {
            navigate('/');
            resetForm();
        }
        setIsLoading(false);
    };

    return(
        <div>
            <h2>Login</h2>
            <p>welcome to the login page</p>
            <form onSubmit={handleLogin} > 
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" >Login</button>
            </form>
                

        </div>
    )
}
       

export default Login;