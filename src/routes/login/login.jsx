// Login.js

import React, { useContext, useState } from "react";
import { loginApi } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import constant from "../../common/constant";
import { UserContextData } from "../../common/UserContext";
import './login.css';

function Login() {
    const history = useNavigate();
    const { updateStoreData } = useContext(UserContextData);
    const [loader, SetLoader] = useState(false);
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(null);

    const handleSubmit = async () => {
        SetLoader(true);
        try {
            let jsonData = {
                "mobile": mobile,
                "password": password
            };
            const loginResponse = await loginApi(constant.loginUrl, jsonData, false);
            console.log('login responces: ' + loginResponse.isSuccess)
            if (loginResponse.isSuccess) {
                let userInfo = [];
                userInfo.push(loginResponse);
                updateStoreData(userInfo);
                console.log('userid=====>' + loginResponse.accessToken)
                const token = loginResponse.accessToken
                localStorage.setItem('token', JSON.stringify(token));

                if (loginResponse.user.type === "user") {
                    console.log('redirected to dashboard from login page')
                    history('/dashboard', { state: { id: loginResponse.user.name } })
                } else {
                    console.log('redirected to home from login page')
                    history('/home', { state: { id: loginResponse.user.name } })
                }
                SetLoader(false);
            } else {
                console.log('loginResponse.accessToken give error: ');
                setLoginError('Login failed. Please check your credentials.');
                SetLoader(false);
            }

        } catch (error) {
            console.error("Login error:", error);
            setLoginError('An error occurred during login. Please try again.');
            SetLoader(false);
        }
    };

    return (
        <div className="login container">
            <h1 className="text-center">Login</h1>

            <form>
                <div className="form-group">
                    <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="form-control"
                        placeholder="Mobile"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Password"
                    />
                </div>
                {loginError && <p className="text-center text-danger">{loginError}</p>}
                <button type="button" onClick={handleSubmit} className="btn btn-success btn-block">
                    {loader ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <div className="mt-3 text-center">
                <p>OR</p>
                <Link to="/signup" className="text-primary">Signup Page</Link>
            </div>
        </div>
    );
}

export default Login;
