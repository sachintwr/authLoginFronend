import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContextData } from "../../common/UserContext";
import constant from "../../common/constant";
import { dashboardApi } from "../../api/api";
import './dashboard.css';

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
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link active">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/dashboard/users" className="nav-link">
                                    Users
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/dashboard/products" className="nav-link">
                                    Products
                                </Link>
                            </li>
                            {/* Add more navigation links as needed */}
                        </ul>
                    </div>
                </nav>

                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Dashboard</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group mr-2">
                                <button type="button" className="btn btn-sm btn-outline-secondary">Settings</button>
                            </div>
                        </div>
                    </div>

                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    <h1>hello I'm on the dashboard</h1>
                    <div>
                        <h1>I am the Dashboard component !! Hello Mr.{suc}</h1>
                        {/* Your dashboard content goes here */}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
