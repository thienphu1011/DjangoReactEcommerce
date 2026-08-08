import { useEffect } from "react";
import {logout} from '../../utils/auth';
import { Link } from "react-router-dom";

function Logout() {
    useEffect(() => {
        logout();
    }, []);
    return (
        <div>
            <h2>Logout</h2>
           
            <Link to="/login">Go to Login</Link>
            <br />
            <Link to="/register">Go to Register</Link>
            <br />
            <p>You have been logged out.</p>
        </div>
    );
}
export default Logout;