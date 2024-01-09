import React, { useContext, useState } from "react";
import './loginSignup.css';
import userIcon from '../assets/person.jpg';
import passwordIcon from '../assets/password.png';
import emailIcon from '../assets/327339.png';
import { signupApi } from '../../api/api.js';
import constant from '../../common/constant.js';
import { UserContextData } from '../../common/UserContext.js';

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const { storeData, setstoreData } = useContext(UserContextData);
    const [dob, setDob] = useState(new Date());
    const [Fullname, SetFullname] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [loader, SetLoader] = useState(false);
    const [buttonStatus, setButtonStatus] = useState(false);

    const signup = async () => {
        SetLoader(true);
        console.log("addressCoordinates==>", constant.latLong,)
        let jsonData = {
            "name": Fullname,
            "mobile": Mobile,
            "email": Email,
            "password": Password,
            "addressCoordinates": constant.latLong,
            "dob": dob
        };

        const signupResponse = await signupApi(constant.signupUrl, jsonData, false);
        if (signupResponse.isSuccess) {
            let userInfo = [];
            userInfo.push(signupResponse);
            setstoreData(userInfo);

            // Assuming 'navigation' is available in your context or imported
            // navigation.navigate('HomeScreen');

            SetLoader(false);
        } else {
            console.log('signupResponse.error: ', signupResponse.error);
            SetLoader(false);
        }
        setButtonStatus(false);
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={userIcon} alt="" className="icon" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={Fullname}
                            onChange={(e) => SetFullname(e.target.value)}
                        />
                    </div>
                )}
                <div className="input">
                    <img src={emailIcon} alt="" className="icon" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={passwordIcon} alt="" className="icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {action === "Login" && (
                    <div className="forgot-password">Lost Password?</div>
                )}
                {action === "Sign Up" && (
                    <div className="input">
                        <label>Date of Birth:</label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                )}
                <div className="submit-container">
                    <div
                        className={action === "Login" ? "submit gray" : "submit"}
                        onClick={() => setAction("Sign Up")}
                    >
                        Sign Up
                    </div>
                    <div
                        className={action === "Sign Up" ? "submit gray" : "submit"}
                        onClick={() => setAction("Login")}
                    >
                        Login
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
