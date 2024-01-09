import React, { useContext, useState } from "react";
import { signupApi } from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import constant from "../common/constant";
import { UserContextData } from "../common/UserContext";

function Signup() {
    const [loader, setLoader] = useState(false);
    const { updateStoreData } = useContext(UserContextData);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [type, setType] = useState('user'); // Default type is 'user'
    const [signupResponse, setSignupResponse] = useState(null);

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoader(true);

        try {
            let jsonData = {
                "name": name,
                "mobile": mobile,
                "email": email,
                "password": password,
                "type": type,
            };

            const response = await signupApi(constant.signupUrl, jsonData, false);

            setSignupResponse(response);

            if (response.isSuccess) {
                let userInfo = [];
                userInfo.push(response);
                updateStoreData(userInfo);
                const token = response.accessToken
                localStorage.setItem('token', JSON.stringify(token));


                if (response.user.type === "user") {
                    console.log('Redirected to dashboard from signup page');
                    navigate('/dashboard');
                } else {
                    console.log('Redirected to home from signup page');
                    navigate('/home');
                }
            }

            setLoader(false);
        } catch (error) {
            console.error('Error during signup:', error);
            setLoader(false);
        }
    };

    return (
        <div className="signup">
            <h1>Sign Up</h1>

            <form onSubmit={submit}>
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input type="text" onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" />
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

                {/* Dropdown for the 'type' field */}
                <label htmlFor="type">Type:</label>
                <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="user">User</option>
                    <option value="guest">Guest</option>
                </select>

                <button type="submit">Sign Up</button>
            </form>

            {loader && <p>Loading...</p>}

            {signupResponse && (
                <div className={signupResponse.isSuccess ? "success-message" : "error-message"}>
                    {signupResponse.message}
                </div>
            )}

            <br />
            <p>OR</p>
            <br />
            <Link to="/">Login Page</Link>
        </div>
    );
}

export default Signup;
