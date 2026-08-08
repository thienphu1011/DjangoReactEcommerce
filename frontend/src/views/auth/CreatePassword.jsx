import React, { useState } from "react";

function CreatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <div>
            <h1>Create Password</h1>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Password' name='' id='' />
            <br /><br />
            <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='Confirm Password' name='' id='' />
            <br /><br />
            <button>Submit</button>
        </div>
    )
}
export default CreatePassword
