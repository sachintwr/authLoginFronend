import React from "react";
import { Link, useLocation } from "react-router-dom";

function Home() {
    const location = useLocation();

    return (
        <div>
            <h1>I am the Home component !! Hello Mr. {location.state && location.state.id}</h1>
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
    );
}

export default Home;
