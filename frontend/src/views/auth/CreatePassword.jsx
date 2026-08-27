import React, { useState } from "react";
import {useSearchParams,useNavigate} from 'react-router-dom';
import apiInstance from '../../utils/axios';
function CreatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const otp= searchParams.get('otp');
    const uidb64= searchParams.get('uidb64');
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        } else {
            const formData = new FormData();
            formData.append('password', password);
            formData.append('otp', otp);
            formData.append('uidb64', uidb64);

            try {
                await apiInstance.post(`user/password-change/`, formData).then((res) => {
                    console.log(res.data);
                    alert("Password has been reset successfully. Please log in with your new password.");
                    navigate('/login');
                })}
            
            catch (error) {
                alert("An error occurred while resetting the password. Please try again.");
            }

        }

    }


    return (
        <div>
            <h1>Create New Password</h1>
            <form onSubmit={handlePasswordSubmit}>
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter New Password' name='' id='' />
                <br /><br />
                <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='Confirm New Password' name='' id='' />
                <br /><br />
                <button type="submit">Save New Password</button>
            </form>
        </div>
    )
}
export default CreatePassword
