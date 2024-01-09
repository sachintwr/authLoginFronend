import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContextData } from "../common/UserContext";
import constant from "../common/constant";
import { dashboardApi } from "../api/api";
function Dashboard() {
    const { storeData, updateStoreData } = useContext(UserContextData);
    const [suc, setSuc] = useState()

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const Navigate = useNavigate();

    const fetchDashboardData = async () => {
        setLoading(false);
        try {
            const token = localStorage.getItem('token');
            console.log("token: ========>", token);
            const dashboardResponse = await dashboardApi(constant.dashboardUrl, token);
            console.log("dashboardResponse: ========>", dashboardResponse)
            if (dashboardResponse === "success") {
                setSuc("Success Ok")
            } else {
                setError("Access denied. Redirecting to home.");
                Navigate('/home');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {

        fetchDashboardData()

    }, []);

    return (
        <div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <h1>hello im on dashboard</h1>
            <div>
                <h1>I am the Dashboard component !! Hello Mr.{suc}</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/">Login</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Dashboard;
