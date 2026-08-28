import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../utils/auth";
import { useAuthStore } from "../../store/auth";

function Register() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = await register(
            fullname,
            email,
            mobile,
            password,
            confirmPassword
        );

        if (error) {
            alert(JSON.stringify(error));
        } else {
            navigate("/");
        }

        setIsLoading(false);
    };

    return (
        <>
            <main style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="container">
                    <section>
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-3">

                                        <h3 className="text-center">
                                            Register Account
                                        </h3>

                                        <br />

                                        <div className="tab-content text-start">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                            >
                                                <form onSubmit={handleSubmit}>

                                                    {/* Full Name */}
                                                    <div className="form-outline mb-4">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="fullname"
                                                        >
                                                            Full Name
                                                        </label>

                                                        <input
                                                            type="text"
                                                            id="fullname"
                                                            placeholder="Full Name"
                                                            required
                                                            className="form-control"
                                                            value={fullname}
                                                            onChange={(e) =>
                                                                setFullname(e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    {/* Email */}
                                                    <div className="form-outline mb-4">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="email"
                                                        >
                                                            Email
                                                        </label>

                                                        <input
                                                            type="email"
                                                            id="email"
                                                            placeholder="Email Address"
                                                            required
                                                            className="form-control"
                                                            value={email}
                                                            onChange={(e) =>
                                                                setEmail(e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    {/* Mobile */}
                                                    <div className="form-outline mb-4">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="phone"
                                                        >
                                                            Mobile Number
                                                        </label>

                                                        <input
                                                            type="number"
                                                            id="mobile"
                                                            placeholder="Mobile Number"
                                                            required
                                                            className="form-control"
                                                            value={mobile}
                                                            onChange={(e) =>
                                                                setMobile(e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    {/* Password */}
                                                    <div className="form-outline mb-4">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="password"
                                                        >
                                                            Password
                                                        </label>

                                                        <input
                                                            type="password"
                                                            id="password"
                                                            placeholder="Password"
                                                            required
                                                            className="form-control"
                                                            value={password}
                                                            onChange={(e) =>
                                                                setPassword(e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    {/* Confirm Password */}
                                                    <div className="form-outline mb-4">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="confirm-password"
                                                        >
                                                            Confirm Password
                                                        </label>

                                                        <input
                                                            type="password"
                                                            id="confirm-password"
                                                            placeholder="Confirm Password"
                                                            required
                                                            className="form-control"
                                                            value={confirmPassword}
                                                            onChange={(e) =>
                                                                setConfirmPassword(e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    {/* Submit */}
                                                    <button
                                                            className="btn btn-primary w-100"
                                                            type="submit"
                                                            disabled={isLoading}
                                                        >
                                                            <span className="mr-2">
                                                                {isLoading ? "Signing Up..." : "Sign Up"}
                                                            </span>

                                                            {isLoading ? (
                                                                <i className="fas fa-spinner fa-spin" />
                                                            ) : (
                                                                <i className="fas fa-user-plus" />
                                                            )}
                                                        </button>

                                                    <div className="text-center">
                                                        <p className="mt-4">
                                                            Already have an account?{" "}
                                                            <Link to="/login/">
                                                                Login
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
        </>
    );
}

export default Register;

