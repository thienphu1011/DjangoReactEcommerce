import React, { useState } from "react";
import {useSearchParams,useNavigate,Link} from 'react-router-dom';
import apiInstance from '../../utils/axios';
function CreatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const otp= searchParams.get('otp');
    const uidb64= searchParams.get('uidb64');
    console.log("OTP:", otp);
console.log("UID:", uidb64);
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            setIsLoading(false);
            return;
        } else {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('password', password);
            formData.append('otp', otp);
            formData.append('uidb64', uidb64);

            try {
                await apiInstance.post(`user/password-change/`, formData).then((res) => {
                    console.log(res.data);
                    alert("Password has been reset successfully. Please log in with your new password.");
                    setIsLoading(false);
                    navigate('/login');
                })}
            
            catch (error) {
                alert("An error occurred while resetting the password. Please try again.");
                setIsLoading(false);
            }

        }

    }


    return (
         <>
                    <section>
                        <main
                            style={{
                                marginBottom: 100,
                                marginTop: 50
                            }}
                        >
                            <div className="container">
                                <section>
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-xl-5 col-md-8">
        
                                            <div className="card rounded-5">
                                                <div className="card-body p-4">
        
                                                    <h3 className="text-center">
                                                        Forgot Password
                                                    </h3>
        
                                                    <br />
        
                                                    <div className="tab-content text-start">
                                                        <div
                                                            className="tab-pane fade show active"
                                                            id="pills-login"
                                                            role="tabpanel"
                                                        >
        
                                                            <form onSubmit={handlePasswordSubmit}>
        
                                                                {/* Email */}
                                                                <div className="form-outline mb-4">
        
                                                                    <label
                                                                        className="form-label"
                                                                        htmlFor="password"
                                                                    >
                                                                        Password
                                                                    </label>
        
                                                                    <input
                                                                        type="password"
                                                                        
                                                                        name="password"
                                                                        value={password}
                                                                        className="form-control"
                                                                        placeholder="Enter your password"
                                                                        onChange={(e) =>
                                                                            setPassword(e.target.value)
                                                                        }
                                                                        required
                                                                    />
        
                                                                </div>
                                                                <div className="form-outline mb-4">
        
                                                                    <label
                                                                        className="form-label"
                                                                        htmlFor="confirmPassword"
                                                                    >
                                                                        Confirm Password
                                                                    </label>
        
                                                                    <input
                                                                        type="password"
                                                                        
                                                                        name="confirmPassword"
                                                                        value={confirmPassword}
                                                                        className="form-control"
                                                                        placeholder="Confirm your password"
                                                                        onChange={(e) =>
                                                                            setConfirmPassword(e.target.value)
                                                                        }
                                                                        required
                                                                    />
        
                                                                </div>
        
                                                                {/* Button */}
                                                                {isLoading == true 
                                                                 ? <button
                                                                    className="btn btn-primary w-100"
                                                                    disabled type="button">
                                                                    Processing...
                                                                </button>    
                                                                : <button
                                                                    className="btn btn-primary w-100"
                                                                    
                                                                    type="submit">
                                                                    Save Password <i className='fas fa-check-circle'/>
                                                    
                                                                </button>
                                                                } 
        
                                                                {/* Links */}
                                                                <div className="text-center">
        
                                                                    <p className="mt-4">
                                                                        Don't have an account?{" "}
                                                                        <Link to="/register">
                                                                            Register
                                                                        </Link>
                                                                    </p>
        
                                                                    <p className="mt-0">
                                                                        <Link
                                                                            to="/login"
                                                                            className="text-danger"
                                                                        >
                                                                            Back to Login
                                                                        </Link>
                                                                    </p>
        
                                                                </div>
        
                                                            </form>
        
                                                        </div>
                                                    </div>
        
                                                </div>
                                            </div>
        
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </main>
                    </section>
                </>
    )
}
export default CreatePassword
