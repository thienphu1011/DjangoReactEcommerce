import {useState} from 'react'
import apiInstance from '../../utils/axios';
import {useNavigate,Link} from 'react-router-dom'
function ForgotPassword() {
    const [email,setEmail]= useState("")
    const [isLoading,setIsLoading]= useState(false)
    const navigate = useNavigate()

    const handleSubmit= async () => {
        setIsLoading(true)
        try{
            await apiInstance.get(`user/password-reset/${email}/`).then((res)=> {
            alert("An email has been sent to your email address with instructions to reset your password.")
            setIsLoading(false)
            navigate( `/create-new-password?otp=${res.data.otp}&uidb64=${res.data.uidb64}`)
            })
        } catch (error){
            alert("Email not found. Please check the email address and try again.");
            setIsLoading(false)
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

                                                    <div onSubmit={handleSubmit}>

                                                        {/* Email */}
                                                        <div className="form-outline mb-4">

                                                            <label
                                                                className="form-label"
                                                                htmlFor="email"
                                                            >
                                                                Email Address
                                                            </label>

                                                            <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                value={email}
                                                                className="form-control"
                                                                placeholder="Enter your email"
                                                                onChange={(e) =>
                                                                    setEmail(e.target.value)
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
                                                            onClick={handleSubmit}
                                                            type="button">
                                                            Send Email <i className='fas fa-paper-plane'/>
                                            
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

                                                    </div>

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
    );
}

export default ForgotPassword